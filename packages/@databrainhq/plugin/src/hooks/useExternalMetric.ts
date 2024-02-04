/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useDashboardContext } from './useDashboardContext';
import {
  useUpdateMetricMutation,
  useUpdateAdminMetricMutation,
  usePreviewTableMutation,
  useCreateMetricMutation,
} from '@/queries/externalDashboard.mutation';

import {
  DashboardType,
  GroupBy,
  RlsFilterObjectType,
  SelectedColumns,
  ChartSettingsType,
} from '@/types/app';
import { DatasetSettings } from '@/types';
import { DATABASE } from '@/consts';

type Params = {
  onSuccess: () => void;
  companyIntegrationId: string | undefined;
  selectedColumns: SelectedColumns[] | undefined;
  query: string;
  metricQuery: string | undefined;
  outputColumns: string | undefined;
  id?: string;
  chartSettings: ChartSettingsType;
  integrationName: string | undefined;
  clientId?: string | null;
  isEmbedded?: boolean;
  rlsFilters?: RlsFilterObjectType[];
  companyId: string;
  isLiveMode?: boolean;
  timeGrain?: string;
  dashboardIds: DashboardType['id'][];
  userProvidedDashboardId: string;
  isEnableGroupBy: boolean;
  selectedGroupBy: string[];
  groupBy: GroupBy | undefined;
  metric?: Record<string, any>;
  datasetMetricSettings?: DatasetSettings;
};
export const useExternalMetric = ({
  onSuccess,
  companyIntegrationId,
  selectedColumns,
  query,
  metricQuery,
  integrationName,
  outputColumns,
  chartSettings,
  clientId,
  companyId,
  isLiveMode,
  timeGrain,
  dashboardIds,
  isEnableGroupBy,
  groupBy,
  selectedGroupBy,
  metric,
  datasetMetricSettings,
}: Params) => {
  const { token, data: clientDashboardData } = useDashboardContext();
  const [error, setError] = useState('');
  const { mutate: createExternalMetricMutation, isLoading: isCreatingMetric } =
    useCreateMetricMutation();
  const { mutate: previewTable } = usePreviewTableMutation();

  const createExternalMetric = (data: FieldValues) => {
    setError('');
    createExternalMetricMutation(
      {
        data: {
          companyId,
          companyIntegrationId,
          description: data.description,
          inputFields: selectedColumns,
          metricId: data.metricId,
          name: data.name,
          query,
          metricQuery,
          integrationName,
          outputColumns,
          createdBy: clientId || 'external user',
          isLive: isLiveMode || false,
          chartOptions: chartSettings,
          datasetMetricSettings,
          clientId: clientId || null,
          isCreatedByClient: !!clientId,
          timeGrain: timeGrain || null,
          externalDashboardIds: dashboardIds.map((externalDashboardId) => ({
            externalDashboardId,
          })),
          isEnableGroupBy,
          groupBy: groupBy ?? {},
          selectedGroupBy,
        },
        token: token as string,
      },
      {
        onSuccess: (res: any) => {
          if (res?.insert_externalMetrics_one?.id) {
            onSuccess();
          } else {
            setError('Metric Id already exists');
          }
        },
        onError: () => {
          if (setError) {
            setError('Metric Id already exists');
          }
        },
      }
    );
  };

  const { mutateAsync: updateAdminMetric, isLoading: isUpdatingAdminMetric } =
    useUpdateAdminMetricMutation();
  const { mutateAsync: updateMetric, isLoading: isUpdatingMetric } =
    useUpdateMetricMutation();

  const updateExternalMetric = useCallback(
    (data: FieldValues) => {
      setError('');
      if (!metric?.isCreatedByClient)
        updateAdminMetric(
          {
            data: {
              externalMetricId: metric?.id,
              clientId: clientId as string,
              object: {
                companyId,
                companyIntegrationId:
                  companyIntegrationId || metric?.companyIntegrationId,
                description: data.description,
                inputFields: selectedColumns,
                metricId:
                  data.metricId === metric?.metricId
                    ? `update_${data.metricId}_by_${clientId}_${Date.now()}`
                    : data.metricId,
                name: data.name,
                query,
                metricQuery,
                datasetMetricSettings,
                integrationName,
                outputColumns,
                createdBy: clientId || 'external user',
                isCreatedByClient: !!clientId,
                resizeAttributes: metric?.resizeAttributes,
                externalDashboardMetrics: {
                  data: dashboardIds.map((externalDashboardId) => ({
                    externalDashboardId,
                  })),
                },
                isLive: isLiveMode || data.isLive,
                chartOptions: chartSettings,
              },
            },
            token: token as string,
          },
          {
            onSuccess: (res: any) => {
              if (
                !res?.insert_clientDeletedMetrics_one ||
                !res?.insert_externalMetrics_one
              )
                return;
              setError('');
              onSuccess();
            },
            onError: () => {
              setError('Something went wrong! Please try again later.');
            },
          }
        );
      else {
        const set: Record<string, any> = {
          chartOptions: chartSettings,
          datasetMetricSettings,
        };
        if (data.description) set.description = data.description;
        if (data.metricId) set.metricId = data.metricId;
        if (data.name) set.name = data.name;
        updateMetric(
          {
            data: { externalMetricId: metric?.id, set },
            token: token as string,
          },
          {
            onSuccess: (res: any) => {
              console.log(res);
              if (!res?.update_externalMetrics_by_pk?.id) return;
              setError('');
              onSuccess();
            },
            onError: () => {
              setError('Something went wrong! Please try again later.');
            },
          }
        );
      }
    },
    [
      chartSettings,
      metric,
      updateMetric,
      updateAdminMetric,
      clientId,
      companyId,
      companyIntegrationId,
      integrationName,
      isLiveMode,
      dashboardIds,
      query,
      selectedColumns,
      outputColumns,
      metricQuery,
      datasetMetricSettings,
    ]
  );

  return {
    createExternalMetric,
    updateExternalMetric,
    error,
    isLoading: isCreatingMetric || isUpdatingAdminMetric || isUpdatingMetric,
    clientSubsetData: clientDashboardData?.clientSubsetData,
    previewTable,
    token,
    workspaceId: clientDashboardData?.workspace?.id,
    dashboardOptions: [
      {
        value: clientDashboardData?.externalDashboard?.id,
        label: clientDashboardData?.externalDashboard?.name || 'Dashboard',
      },
    ],
    isDatabaseTenancy: clientDashboardData?.companyTenancyType === DATABASE,
  };
};
