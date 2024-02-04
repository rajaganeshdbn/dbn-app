import { useMutation } from 'react-query';
import fetcher from '@/utils/fetcher';
import {
  METRIC_COLUMN_MUTATION,
  METRIC_COLUMN_PATH,
  METRIC_EXECUTE_PYTHON_CODE_MUTATION,
  METRIC_EXECUTE_PYTHON_CODE_PATH,
  METRIC_MARK_ARCHIVED_MUTATION,
  METRIC_MARK_ARCHIVED_PATH,
  METRIC_SHARE_CSV_MUTATION,
  METRIC_SHARE_CSV_PATH,
  METRIC_UNDERLYING_DATA_MUTATION,
  METRIC_UNDERLYING_DATA_PATH,
  NEW_METRIC_DATASET_METRIC_MUTATION,
  NEW_METRIC_DATASET_METRIC_PATH,
} from '@/consts/api';
import {
  UseMetricColumnMutationInputType,
  UseMetricUnderlyingDataMutationInputType,
  UseMetricShareCsvMutationInputType,
  UseMarkArchivedMutationInputType,
  UseExecutePythonMutationInputType,
  UseNewDatatsetMetricMutationInputType,
} from '@/types/queryTypes';

export const useMetricColumnMutation = () =>
  useMutation(
    METRIC_COLUMN_MUTATION,
    (data: UseMetricColumnMutationInputType) =>
      fetcher(METRIC_COLUMN_PATH, { method: 'POST', data })
  );

export const useMetricUnderlyingDataMutation = () =>
  useMutation(
    METRIC_UNDERLYING_DATA_MUTATION,
    (data: UseMetricUnderlyingDataMutationInputType) =>
      fetcher(METRIC_UNDERLYING_DATA_PATH, { method: 'POST', data })
  );

export const useMetricShareCsvMutation = () =>
  useMutation(
    METRIC_SHARE_CSV_MUTATION,
    (data: UseMetricShareCsvMutationInputType) =>
      fetcher(METRIC_SHARE_CSV_PATH, { method: 'POST', data })
  );

export const useMarkArchivedMutation = () =>
  useMutation(
    METRIC_MARK_ARCHIVED_MUTATION,
    (data: UseMarkArchivedMutationInputType) =>
      fetcher(METRIC_MARK_ARCHIVED_PATH, {
        method: 'POST',
        data,
      })
  );

export const useExecutePythonMutation = () =>
  useMutation(
    [METRIC_EXECUTE_PYTHON_CODE_MUTATION],
    (data: UseExecutePythonMutationInputType) =>
      fetcher(METRIC_EXECUTE_PYTHON_CODE_PATH, {
        method: 'POST',
        data,
      })
  );

export const useGenerateMetricDataMutation = () =>
  useMutation(
    NEW_METRIC_DATASET_METRIC_MUTATION,
    ({
      data,
      token,
      clientId,
      isFrontendApp,
    }: {
      data: UseNewDatatsetMetricMutationInputType;
      token: string;
      clientId: string;
      isFrontendApp: boolean;
    }) =>
      fetcher(NEW_METRIC_DATASET_METRIC_PATH, {
        method: 'POST',
        data,
        isFrontend: isFrontendApp,
        clientId,
        token,
      })
  );
