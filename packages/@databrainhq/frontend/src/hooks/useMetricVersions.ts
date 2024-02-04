/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { metricVersionsAtom } from 'atoms/application';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useAtom } from 'jotai';
import {
  ExternalMetrics,
  MetricVersions,
  useListMetricVersionsQuery,
  useUpdateExternalDashboardMetricsMutation,
  useUpdateExternalMetricMutation,
  useUpdateExternalMetricRlsFiltersMutation,
  useUpsertMetricVersionMutation,
} from 'utils/generated/graphql';
import { FloatingDropDownOption } from '@databrainhq/plugin/src/types';
import { MetricVersionTableRowType } from 'types/metric';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

type UseMetricVersionsProps = {
  isEnabled?: boolean;
};

const useMetricVersions = ({ isEnabled }: UseMetricVersionsProps) => {
  const user = getCurrentUser();
  const [metricVersions, setMetricVersions] = useAtom(metricVersionsAtom);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateExternalMetric } =
    useUpdateExternalMetricMutation();
  const { mutateAsync: updateRlsFilters } =
    useUpdateExternalMetricRlsFiltersMutation();
  const { mutateAsync: updateExternalDashboardMetric } =
    useUpdateExternalDashboardMetricsMutation();

  const metricQueryClientData = useMemo(() => {
    const metricData = queryClient.getQueryData([
      'ExternalMetric',
      { id: metricVersions.id },
    ]) as any;
    return metricData?.externalMetrics_by_pk as ExternalMetrics | null;
  }, [metricVersions.id, queryClient]);

  const {
    data: metricVersionsData,
    isLoading: isListing,
    error: listingError,
  } = useListMetricVersionsQuery(
    {
      metricId: metricVersions.id,
      offset,
    },
    {
      enabled: Boolean(metricVersions.id && isEnabled),
    }
  );

  const {
    mutateAsync: upsertVersionMutation,
    isLoading: isUpserting,
    error: upsertError,
  } = useUpsertMetricVersionMutation();

  useEffect(() => {
    setLoading(isListing || isUpserting);
  }, [isListing, isUpserting]);

  useEffect(() => {
    if (isListing || !metricVersionsData) return;
    if (
      !metricVersionsData.metricVersions ||
      !metricVersionsData.metricVersions.length
    )
      return;
    const metricVersionList = metricVersionsData.metricVersions;
    setMetricVersions((prev) => {
      const versionsMap = new Map();
      [...prev.versions, ...metricVersionList].forEach((v) => {
        versionsMap.set(v.version, v);
      });
      return {
        ...prev,
        versions: ([...versionsMap.values()] as MetricVersions[]).sort(
          (v1, v2) => v2.version - v1.version
        ),
      };
    });
  }, [metricVersionsData, isListing]);

  const loadMore = useCallback(() => {
    setOffset((prev) => prev + 10);
  }, []);

  const { versionsTableData, versionsSelectOptions } = useMemo(() => {
    if (!metricVersions.versions.length && !isListing && !listingError) {
      return {
        versionsTableData: [
          {
            Version: 'v1 (latest) (current)',
            Description: 'Initial Version',
            'Updated At': metricQueryClientData?.updatedAt || '',
            'Updated By': metricQueryClientData?.createdBy || '',
            'Created At': metricQueryClientData?.createdAt || '',
            'Created By': metricQueryClientData?.createdBy || '',
          },
        ] as MetricVersionTableRowType[],
        versionsSelectOptions: [
          {
            label: 'v1 (latest) (current)',
            value: '1',
          },
        ] as FloatingDropDownOption[],
      };
    }
    return metricVersions.versions.reduce(
      (previousValue, currentValue) => {
        const row = {
          Version: `v${currentValue.version}${
            currentValue.version === metricVersions.latest ? ' (latest)' : ''
          }${
            currentValue.version === metricVersions.current ? ' (current)' : ''
          }`,
          Description: currentValue.changes || '',
          'Updated At': currentValue.updatedAt,
          'Updated By': currentValue.updatedBy,
          'Created At': currentValue.createdAt,
          'Created By': currentValue.createdBy,
        };
        const option = {
          label: `v${currentValue.version}${
            currentValue.version === metricVersions.latest ? ' (latest)' : ''
          }${
            currentValue.version === metricVersions.current ? ' (current)' : ''
          }`,
          value: currentValue.version.toString(),
        };
        return {
          versionsTableData: [...previousValue.versionsTableData, row],
          versionsSelectOptions: [
            ...previousValue.versionsSelectOptions,
            option,
          ],
        };
      },
      {
        versionsTableData: [] as MetricVersionTableRowType[],
        versionsSelectOptions: [] as FloatingDropDownOption[],
      }
    );
  }, [metricVersions, isListing]);

  const hasMoreData = useMemo(() => {
    return Boolean(metricVersionsData?.metricVersions?.length);
  }, [metricVersionsData?.metricVersions?.length]);

  useEffect(() => {
    if (!upsertError && !listingError) return;
    const errorMessage = ((upsertError || listingError) as Error | null)
      ?.message;
    if (!errorMessage) return;
    setError(errorMessage);
  }, [upsertError, listingError]);

  const getVersion = useCallback(
    (version: number) => {
      return metricVersions.versions.find((v) => v.version === version);
    },
    [metricVersions.versions]
  );

  const upsertVersion = useCallback(
    async ({
      version,
      metric,
      about,
      onSuccess,
    }: {
      version: number;
      about: string;
      metric: object;
      onSuccess?: () => void;
    }) => {
      setLoading(true);
      try {
        const updateVersionData = metricVersions.versions.find(
          (v) => v.version === version
        );
        if (updateVersionData) {
          // auto save second time
          const data = await upsertVersionMutation({
            metricId: metricVersions.id,
            version,
            metric,
            createdBy:
              updateVersionData?.createdBy ?? (user?.username as string),
            updatedBy: user?.username as string,
            changes:
              about ||
              updateVersionData?.changes ||
              `Update version v${version}`,
          });
          if (!data || !data?.insert_metricVersions_one)
            return setError(SOMETHING_WENT_WRONG);
          if (data.insert_metricVersions_one) {
            const updated = data.insert_metricVersions_one;
            const index = metricVersions.versions.findIndex(
              (v) => v.version === updated.version
            );
            if (index === -1) {
              return setError(SOMETHING_WENT_WRONG);
            }
            setMetricVersions((prev) => {
              prev.versions[index] = updated;
              return {
                ...prev,
                versions: prev.versions,
              };
            });
          }
        } else if (metricVersions.latest === 1) {
          // No versions created yet just default metric creation
          if (!metricQueryClientData) return setError(SOMETHING_WENT_WRONG);
          const data = await upsertVersionMutation({
            metricId: metricVersions.id,
            version: 1.0,
            metric: metricQueryClientData,
            createdBy: metricQueryClientData.createdBy as string,
            updatedBy: metricQueryClientData.createdBy as string,
            changes: 'Initial version',
          });
          if (!data || !data.insert_metricVersions_one) {
            return setError(SOMETHING_WENT_WRONG);
          }
          if (!data.insert_metricVersions_one) {
            return setError(SOMETHING_WENT_WRONG);
          }
          const inserted = data.insert_metricVersions_one;
          const newData = await upsertVersionMutation({
            metricId: inserted.metricId,
            version,
            metric,
            createdBy: user?.username as string,
            updatedBy: user?.username as string,
            changes: about || `New version v${inserted.version}`,
          });
          if (!newData || !newData.insert_metricVersions_one) {
            return setError(SOMETHING_WENT_WRONG);
          }
          if (!newData.insert_metricVersions_one) {
            return setError(SOMETHING_WENT_WRONG);
          }
          const newInserted = newData.insert_metricVersions_one;
          setMetricVersions((prev) => ({
            ...prev,
            latest: newInserted.version,
            versions: [newInserted, inserted, ...prev.versions],
          }));
        } else {
          const data = await upsertVersionMutation({
            metricId: metricVersions.id,
            version,
            metric,
            createdBy: user?.username as string,
            updatedBy: user?.username as string,
            changes: about || `New version v${version}`,
          });
          if (!data || !data.insert_metricVersions_one) {
            return setError(SOMETHING_WENT_WRONG);
          }
          if (!data.insert_metricVersions_one) {
            return setError(SOMETHING_WENT_WRONG);
          }
          const inserted = data.insert_metricVersions_one;
          setMetricVersions((prev) => ({
            ...prev,
            latest: inserted.version,
            versions: [inserted, ...prev.versions],
          }));
        }
        onSuccess?.();
      } catch (err) {
        setError(SOMETHING_WENT_WRONG);
      } finally {
        setLoading(false);
      }
    },
    [metricVersions, getVersion, metricQueryClientData]
  );

  const switchVersion = useCallback(
    async ({
      version,
      onSuccess,
    }: {
      version: number;
      onSuccess?: () => void;
    }) => {
      if (metricVersions.current === version) {
        return setError(
          `Cannot switch to version v${version}! Because already on the version v${version}.`
        );
      }
      const currentVersionData = getVersion(version);
      if (!currentVersionData || !currentVersionData.metric) {
        return setError(SOMETHING_WENT_WRONG);
      }
      setLoading(true);
      const metric = currentVersionData.metric;
      const updatingMetric = {
        description: metric.description,
        inputFields: metric.inputFields,
        name: metric.name,
        query: metric.query,
        metricQuery: metric.metricQuery,
        outputColumns: metric.outputColumns,
        chartOptions: metric.chartOptions,
        timeGrain: metric.timeGrain || null,
        isEnableGroupBy: metric.isEnableGroupBy,
        groupBy: metric.groupBy ?? {},
        selectedGroupBy: metric.selectedGroupBy,
        joinFields: metric.joinFields,
        metricId: metric.metricId,
        rlsConditions: metric.rlsConditions,
        datasetMetricSettings: metric.datasetMetricSettings,
        limit: metric.limit,
        drillDownSettings: metric.drillDownSettings,
        currentVersion: version,
        latestVersion: metricVersions.latest,
        updatedAt: new Date().toISOString(),
      };
      updateExternalMetric(
        {
          id: currentVersionData.metricId,
          set: updatingMetric,
        },
        {
          onSuccess: async (res) => {
            if (res.update_externalMetrics_by_pk?.id) {
              const externalMetricId = res.update_externalMetrics_by_pk.id;
              const promises: Promise<any>[] = [
                updateExternalDashboardMetric({
                  externalMetricId,
                  externalDashboardMetricsObjects:
                    metric.externalDashboardMetrics?.map(
                      ({
                        externalDashboardId,
                      }: {
                        externalDashboardId: string;
                      }) => ({
                        externalDashboardId,
                        externalMetricId,
                      })
                    ),
                }),
              ];
              if (metric.externalMetricsRlsFilters?.length)
                promises.push(
                  updateRlsFilters({
                    metricId: currentVersionData.metricId,
                    objects: metric.externalMetricsRlsFilters?.map(
                      (filter: { id: string }) => ({
                        companyRlsFilterId: filter.id,
                        id: currentVersionData.metricId,
                      })
                    ),
                  })
                );
              await Promise.all(promises);
              queryClient.setQueryData(
                ['ExternalMetric', { id: externalMetricId }],
                (prev: any) => {
                  return {
                    ...prev,
                    externalMetrics_by_pk: {
                      ...prev.externalMetrics_by_pk,
                      ...updatingMetric,
                      externalDashboardMetrics: metric.externalDashboardMetrics,
                      externalMetricsRlsFilters:
                        metric.externalMetricsRlsFilters,
                    },
                  };
                }
              );
              setMetricVersions((prev) => ({
                ...prev,
                current: version,
              }));
              setLoading(false);
              onSuccess?.();
            }
          },
          onError: (_err) => {
            setLoading(false);
            setError(SOMETHING_WENT_WRONG);
          },
        }
      );
    },
    [
      metricVersions.current,
      getVersion,
      updateExternalDashboardMetric,
      updateRlsFilters,
      updateExternalMetric,
      queryClient,
    ]
  );

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  return {
    metricVersions,
    upsertVersion,
    getVersion,
    switchVersion,
    isUpserting,
    error,
    isLoading,
    loadMore,
    hasMoreData,
    versionsTableData,
    versionsSelectOptions,
    setMetricVersions,
  };
};

export default useMetricVersions;
