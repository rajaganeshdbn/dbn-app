import { useQuery } from 'react-query';
import fetcher from '@/utils/fetcher';
import {
  NEW_METRIC_QUERY_PATH,
  METRIC_QUERY_QUERY,
  METRIC_RAW_DOWNLOAD_SETTINGS_PATH,
  METRIC_RAW_DOWNLOAD_SETTINGS_QUERY,
} from '@/consts/api';
import { UseMetricQueryQueryInputType } from '@/types/queryTypes';

export const useMetricDataQuery = ({
  clientId,
  data,
  token,
  isFrontendApp,
}: {
  data: UseMetricQueryQueryInputType;
  clientId: string;
  token?: string;
  isFrontendApp: boolean;
}) =>
  useQuery(
    [METRIC_QUERY_QUERY, data],
    () =>
      fetcher(NEW_METRIC_QUERY_PATH, {
        method: 'POST',
        data,
        isFrontend: isFrontendApp,
        clientId,
        token,
      }),
    { enabled: !!data.id }
  );

export const useMetricRawDownloadSettingsQuery = (workspaceId: string) =>
  useQuery(
    [METRIC_RAW_DOWNLOAD_SETTINGS_QUERY, workspaceId],
    () =>
      fetcher(`${METRIC_RAW_DOWNLOAD_SETTINGS_PATH}?id=${workspaceId}`, {
        method: 'GET',
      }),
    { enabled: !!workspaceId }
  );
