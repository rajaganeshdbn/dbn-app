import { useMutation } from 'react-query';
import {
  DASHBOARD_CHAT_RESPONSE_MUTATION,
  DASHBOARD_CHAT_RESPONSE_PATH,
  DASHBOARD_CREATE_METRIC_MUTATION,
  DASHBOARD_CREATE_METRIC_PATH,
  DASHBOARD_DATASET_METRIC_MUTATION,
  DASHBOARD_DATASET_METRIC_PATH,
  DASHBOARD_DELETE_SCHEDULED_REPORT_MUTATION,
  DASHBOARD_DELETE_SCHEDULED_REPORT_PATH,
  DASHBOARD_GENERATE_METRIC_MUTATION,
  DASHBOARD_GENERATE_METRIC_PATH,
  DASHBOARD_GEN_METRIC_DATA_MUTATION,
  DASHBOARD_GEN_METRIC_DATA_PATH,
  DASHBOARD_PREVIEW_TABLE_MUTATION,
  DASHBOARD_PREVIEW_TABLE_PATH,
  DASHBOARD_SAVE_LAYOUT_MUTATION,
  DASHBOARD_SAVE_LAYOUT_PATH,
  DASHBOARD_SAVE_SCHEDULED_REPORT_MUTATION,
  DASHBOARD_SAVE_SCHEDULED_REPORT_PATH,
  DASHBOARD_UPDATE_ADMIN_METRIC_MUTATION,
  DASHBOARD_UPDATE_ADMIN_METRIC_PATH,
  DASHBOARD_UPDATE_METRIC_MUTATION,
  DASHBOARD_UPDATE_METRIC_PATH,
} from '@/consts/api';
import fetcher from '@/utils/fetcher';
import {
  UseChatApiResponseType,
  UseCreateMetricMutationInputType,
  UseDatatsetMetricMutationInputType,
  UseDeleteDashboardScheduleReportMutationInputType,
  UseGenerateMetricDataMutationInputType,
  UseGenerateMetricMutationInputType,
  UsePreviewTableMutationInputType,
  UseSaveDashboardLayoutMutationInputType,
  UseSaveDashboardScheduleReportMutationInputType,
  UseUpdateAdminMetricMutationInputType,
  UseUpdateMetricMutationInputType,
} from '@/types/queryTypes';

export const useSaveDashboardLayoutMutation = () =>
  useMutation(
    DASHBOARD_SAVE_LAYOUT_MUTATION,
    (data: UseSaveDashboardLayoutMutationInputType) =>
      fetcher(DASHBOARD_SAVE_LAYOUT_PATH, { method: 'POST', data })
  );

export const useSaveDashboardScheduleReportMutation = () =>
  useMutation(
    DASHBOARD_SAVE_SCHEDULED_REPORT_MUTATION,
    (data: {
      data: UseSaveDashboardScheduleReportMutationInputType;
      token: string;
    }) =>
      fetcher(DASHBOARD_SAVE_SCHEDULED_REPORT_PATH, {
        method: 'POST',
        data: data.data,
        token: data.token,
      })
  );

export const useDeleteDashboardScheduleReportMutation = () =>
  useMutation(
    DASHBOARD_DELETE_SCHEDULED_REPORT_MUTATION,
    (data: UseDeleteDashboardScheduleReportMutationInputType) =>
      fetcher(DASHBOARD_DELETE_SCHEDULED_REPORT_PATH, {
        method: 'POST',
        data,
        token: data.token,
      })
  );

export const useCreateMetricMutation = () =>
  useMutation(
    DASHBOARD_CREATE_METRIC_MUTATION,
    ({
      data,
      token,
    }: {
      data: UseCreateMetricMutationInputType;
      token: string;
    }) => fetcher(DASHBOARD_CREATE_METRIC_PATH, { method: 'POST', data, token })
  );

export const useUpdateMetricMutation = () =>
  useMutation(
    DASHBOARD_UPDATE_METRIC_MUTATION,
    ({
      data,
      token,
    }: {
      data: UseUpdateMetricMutationInputType;
      token: string;
    }) => fetcher(DASHBOARD_UPDATE_METRIC_PATH, { method: 'POST', data, token })
  );
export const useUpdateAdminMetricMutation = () =>
  useMutation(
    DASHBOARD_UPDATE_ADMIN_METRIC_MUTATION,
    ({
      data,
      token,
    }: {
      data: UseUpdateAdminMetricMutationInputType;
      token: string;
    }) =>
      fetcher(DASHBOARD_UPDATE_ADMIN_METRIC_PATH, {
        method: 'POST',
        data,
        token,
      })
  );
export const useGenerateMetricMutation = () =>
  useMutation(
    DASHBOARD_GENERATE_METRIC_MUTATION,
    ({
      data,
      token,
    }: {
      data: UseGenerateMetricMutationInputType;
      token: string;
    }) =>
      fetcher(DASHBOARD_GENERATE_METRIC_PATH, { method: 'POST', data, token })
  );

export const useDatasetMetricMutation = () =>
  useMutation(
    DASHBOARD_DATASET_METRIC_MUTATION,
    ({
      data,
      token,
    }: {
      data: UseDatatsetMetricMutationInputType;
      token: string;
    }) =>
      fetcher(DASHBOARD_DATASET_METRIC_PATH, { method: 'POST', data, token })
  );
export const usePreviewTableMutation = () =>
  useMutation(
    DASHBOARD_PREVIEW_TABLE_MUTATION,
    ({
      data,
      token,
    }: {
      data: UsePreviewTableMutationInputType;
      token: string;
    }) => fetcher(DASHBOARD_PREVIEW_TABLE_PATH, { method: 'POST', data, token })
  );

export const useGenerateMetricDataMutation = () =>
  useMutation(
    DASHBOARD_GEN_METRIC_DATA_MUTATION,
    ({
      data,
      token,
    }: {
      data: UseGenerateMetricDataMutationInputType;
      token: string;
    }) =>
      fetcher(DASHBOARD_GEN_METRIC_DATA_PATH, {
        method: 'POST',
        data,
        token,
      })
  );

export const useChatApiResponse = () =>
  useMutation(
    DASHBOARD_CHAT_RESPONSE_MUTATION,
    ({ data, token }: { data: UseChatApiResponseType; token: string }) =>
      fetcher(DASHBOARD_CHAT_RESPONSE_PATH, { method: 'POST', data, token })
  );
