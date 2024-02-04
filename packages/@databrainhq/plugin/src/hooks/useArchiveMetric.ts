import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useMarkArchivedMutation } from '@/queries/metric.mutation';
import { DASHBOARD_DATA_QUERY } from '@/consts/api';

type UseArchiveMetricProps = {
  dashboardId: string;
  clientId: string;
  metricId: string;
  onSuccess: () => void;
};

export const useArchiveMetric = ({
  dashboardId,
  clientId,
  metricId,
  onSuccess,
}: UseArchiveMetricProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: archiveMetric, isLoading } = useMarkArchivedMutation();

  const handleArchiveMetric = useCallback(async () => {
    if (!metricId || !clientId) return;
    await archiveMetric(
      { id: metricId, clientId },
      {
        onSuccess: (res: any) => {
          if (!res?.insert_clientDeletedMetrics_one) return;
          queryClient.setQueryData(
            [DASHBOARD_DATA_QUERY, { dashboardId }],
            (prev: any) => {
              const externalMetrics = prev?.externalMetrics?.filter(
                (exDm: any) => exDm.externalMetricId !== metricId
              );
              return { ...prev, externalMetrics };
            }
          );
          onSuccess();
        },
      }
    );
  }, [archiveMetric, metricId, clientId]);

  return { handleArchiveMetric, isLoading };
};
