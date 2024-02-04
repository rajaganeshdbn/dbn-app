/* eslint-disable consistent-return */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  useCreateExternalMetricMutation,
  useCreateExternalMetricsRlsFiltersMutation,
  useUpdateExternalDashboardMetricsMutation,
  useUpdateExternalMetricMutation,
  useUpdateExternalMetricRlsFiltersMutation,
} from 'utils/generated/graphql';
import { FieldValues } from 'react-hook-form';
import {
  ChartActions,
  DatasetSettings,
  GroupBy,
  JoinField,
  RlsFilterObjectType,
  SelectedColumns,
} from 'types';
import { types } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import { DrillDownSettings } from 'types/metric';
import { getCurrentUser } from 'helpers/application/auth';
import { DashboardType } from './useMetric';
import useMetricVersions from './useMetricVersions';

type Params = {
  companyIntegrationId: string | undefined;
  selectedColumns: SelectedColumns[] | undefined;
  query: string;
  metricQuery: string | undefined;
  outputColumns: string | undefined;
  id?: string;
  workspaceId?: string;
  integrationName: string | undefined;
  clientId?: string | null;
  isEmbedded?: boolean;
  companyId?: string;
  timeGrain?: string;
  dashboardIds: DashboardType['id'][];
  isEnableGroupBy: boolean;
  selectedGroupBy: string[];
  groupBy: GroupBy | undefined;
  joinFields: JoinField[];
  rlsConditions: types.RlsCondition[];
  rlsFilters: RlsFilterObjectType[];
  datasetMetricSettings: DatasetSettings | undefined;
  chartSettings: types.ChartSettingsType;
  limit: number;
  drillDownSettings: DrillDownSettings;
  dataSecuritySettings?: {
    underlyingColumns: string[];
    csvColumns: string[];
  };
  clickBehaviourConfigs?: ChartActions;
  isUnpublishedMetric?: boolean;
};
const useExternalMetric = ({
  companyIntegrationId,
  selectedColumns,
  query,
  metricQuery,
  integrationName,
  outputColumns,
  id,
  clientId,
  isEmbedded,
  companyId,
  timeGrain,
  dashboardIds,
  isEnableGroupBy,
  groupBy,
  selectedGroupBy,
  joinFields,
  rlsConditions,
  rlsFilters,
  datasetMetricSettings,
  chartSettings,
  limit,
  drillDownSettings,
  dataSecuritySettings,
  clickBehaviourConfigs: clickActions,
  workspaceId,
  isUnpublishedMetric,
}: Params) => {
  const [isFirstTimeUpdate, setFirstTimeUpdate] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { metricVersions, upsertVersion, setMetricVersions, isUpserting } =
    useMetricVersions({});
  const createExternalMetricMutation = useCreateExternalMetricMutation();
  const updateExternalMetricMutation = useUpdateExternalMetricMutation();
  const { mutate: createRlsFilters } =
    useCreateExternalMetricsRlsFiltersMutation();
  const { mutate: updateRlsFilters } =
    useUpdateExternalMetricRlsFiltersMutation();
  const { mutate: updateExternalDashboardMetric } =
    useUpdateExternalDashboardMetricsMutation();

  const createExternalMetric = (data: FieldValues) => {
    setError('');
    setIsLoading(true);
    createExternalMetricMutation.mutate(
      {
        companyId: companyId || user?.companyId,
        companyIntegrationId,
        description: data.description,
        inputFields: selectedColumns,
        metricId: data.metricId,
        name: data.name,
        query,
        metricQuery,
        integrationName,
        outputColumns,
        createdBy: isEmbedded ? 'external user' : `${user?.username}`,
        isLive: false,
        chartOptions: chartSettings,
        clientId: clientId || null,
        isCreatedByClient: !!clientId,
        timeGrain: timeGrain || null,
        externalDashboardIds: dashboardIds.map((externalDashboardId) => ({
          externalDashboardId,
        })),
        isEnableGroupBy,
        groupBy: (isEnableGroupBy && groupBy) ?? {},
        selectedGroupBy: isEnableGroupBy ? selectedGroupBy : [],
        joinFields,
        rlsConditions,
        datasetMetricSettings,
        limit,
        drillDownSettings,
        dataSecuritySettings,
        clickActions,
      },
      {
        onSuccess: (res) => {
          if (res.insert_externalMetrics_one?.id) {
            if (isEmbedded) {
              window.location.reload();
              setIsLoading(false);
            } else {
              const dashboardId =
                res.insert_externalMetrics_one.externalDashboardMetrics[0]
                  .externalDashboardId;
              const metricId = res.insert_externalMetrics_one.id;
              if (rlsFilters.length)
                createRlsFilters({
                  objects: rlsFilters.map((filter) => ({
                    companyRlsFilterId: filter.id,
                    id: metricId,
                  })),
                });
              segmentEvent('metric created', {
                metricId,
                metricName: data.name,
                dashboardId,
              });
              setIsLoading(false);
              navigate({
                pathname: `/externalDashboard/${dashboardId}/`,
                search: `?wid=${workspaceId}`,
              });
            }
          }
        },
        onError: () => {
          segmentEvent('metric creation failed', {
            error: 'Metric Id already exists',
          });
          setIsLoading(false);
          setError('Metric Id already exists');
        },
      }
    );
  };
  const updateExternalMetric = async (
    data: FieldValues,
    stopNavigate?: boolean
  ) => {
    setError('');
    if (!dashboardIds.length && !isUnpublishedMetric) {
      return setError('Dashboard is not selected!');
    }
    const { currentVersion, latestVersion } = (() => {
      if (stopNavigate) {
        // auto save
        if (isFirstTimeUpdate) {
          // insert new version
          setFirstTimeUpdate(false);
          return {
            latestVersion: metricVersions.latest + 1,
            currentVersion: metricVersions.latest + 1,
          };
        }
        // update the above inserted version in this session
        return {
          latestVersion: metricVersions.latest,
          currentVersion: metricVersions.latest,
        };
      }
      // save metric by button clicking
      return {
        latestVersion: metricVersions.latest + 1,
        currentVersion: metricVersions.latest + 1,
      };
    })();
    const updatingMetric = {
      description: data.description,
      inputFields: selectedColumns,
      name: data.name,
      query,
      metricQuery,
      outputColumns,
      isLive: false,
      chartOptions: chartSettings,
      timeGrain: timeGrain || null,
      isEnableGroupBy,
      groupBy: groupBy ?? {},
      selectedGroupBy,
      joinFields,
      metricId: data.metricId,
      rlsConditions,
      datasetMetricSettings,
      limit,
      drillDownSettings,
      currentVersion,
      latestVersion,
      updatedAt: new Date().toISOString(),
      dataSecuritySettings,
      clickActions,
    };
    setIsLoading(true);
    updateExternalMetricMutation.mutate(
      {
        id,
        set: updatingMetric,
      },
      {
        onSuccess: async (res) => {
          if (res.update_externalMetrics_by_pk?.id) {
            const externalMetricId = res.update_externalMetrics_by_pk.id;
            await upsertVersion({
              version: latestVersion,
              metric: {
                ...updatingMetric,
                externalDashboardMetrics: isUnpublishedMetric
                  ? []
                  : dashboardIds.map((dashId) => ({
                      externalDashboardId: dashId,
                    })),
                externalMetricsRlsFilters: rlsFilters.map((filter) => ({
                  companyRlsFilter: filter,
                })),
              },
              about: data.about,
            });
            if (!isUnpublishedMetric)
              updateExternalDashboardMetric(
                {
                  externalMetricId,
                  externalDashboardMetricsObjects: dashboardIds.map(
                    (externalDashboardId) => ({
                      externalDashboardId,
                      externalMetricId,
                    })
                  ),
                },
                {
                  onSuccess: () => {
                    if (rlsFilters.length) {
                      updateRlsFilters({
                        metricId: id,
                        objects: rlsFilters.map((filter) => ({
                          companyRlsFilterId: filter.id,
                          id,
                        })),
                      });
                    }
                    segmentEvent('metric updated', {
                      metricId: externalMetricId,
                      metricName: data.name,
                      dashboardId: dashboardIds[0],
                    });
                    setIsLoading(false);
                    if (!stopNavigate) {
                      window.location.reload();
                      window.location.href = `/externalDashboard/${dashboardIds[0]}/?wid=${workspaceId}`;
                    }
                  },
                }
              );
            if (isUnpublishedMetric && !stopNavigate) {
              window.location.reload();
              window.location.href = `/?wid=${workspaceId}`;
            }
          }
        },
        onError: () => {
          segmentEvent('metric updation failed', {
            error: 'Metric Id already exists',
          });
          setIsLoading(false);
          setError('Metric Id already exists');
        },
      }
    );
  };
  return {
    createExternalMetric,
    updateExternalMetric,
    setMetricVersions,
    isFirstTimeUpdate,
    error,
    isLoading: isLoading || isUpserting,
  };
};

export default useExternalMetric;
