import { workspaceAtom } from 'atoms/application';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import {
  useArchiveExternalMetricMutation,
  useDeleteExternalMetricMutation,
  useUnarchiveClientMetricMutation,
} from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';

type UseArchiveExternalMetricProps = {
  externalDashboardId?: string;
  clientId?: string;
  externalMetricId: string;
  onSuccess: () => void;
};

const useArchiveExternalMetric = ({
  externalDashboardId,
  clientId,
  externalMetricId,
  onSuccess,
}: UseArchiveExternalMetricProps) => {
  const queryClient = useQueryClient();
  const user = getCurrentUser();
  const [workspace] = useAtom(workspaceAtom);
  const { mutateAsync: archiveMetric, isLoading } =
    useArchiveExternalMetricMutation({
      onSuccess: (res) => {
        if (!res.update_externalMetrics_by_pk) return onSuccess();
        if (res.update_externalMetrics_by_pk.isArchived)
          queryClient.setQueryData(
            ['ExternalDashboardMetrics', { externalDashboardId, clientId }],
            (prev: any) => {
              const externalDashboardMetrics =
                prev?.externalDashboardMetrics?.filter(
                  (exDm: any) => exDm.externalMetricId !== externalMetricId
                );
              return { ...prev, externalDashboardMetrics };
            }
          );

        if (!res.update_externalMetrics_by_pk.isArchived)
          queryClient.setQueryData(
            [
              'GetExternalMetricsList',
              {
                where: {
                  companyId: { _eq: user?.companyId },
                  isMarkedDeleted: { _eq: false },
                  isArchived: { _eq: true },
                },
                workspaceId: workspace?.id,
              },
            ],
            (prev: any) => {
              const externalMetrics = prev?.externalMetrics?.filter(
                (metric: any) => metric.id !== externalMetricId
              );
              return { ...prev, externalMetrics };
            }
          );
        return onSuccess();
      },
    });

  const { mutateAsync: deleteMetric, isLoading: isDeleting } =
    useDeleteExternalMetricMutation({
      onSuccess: (res) => {
        if (!res.update_externalMetrics_by_pk?.isMarkedDeleted)
          return onSuccess();
        queryClient.setQueryData(
          [
            'GetExternalMetricsList',
            {
              where: {
                companyId: { _eq: user?.companyId },
                isMarkedDeleted: { _eq: false },
                ...(clientId
                  ? {
                      clientDeletedMetrics: {
                        clientId: { _eq: clientId },
                      },
                    }
                  : {
                      isArchived: { _eq: true },
                    }),
              },
              workspaceId: workspace?.id,
            },
          ],
          (prev: any) => {
            const externalMetrics = prev?.externalMetrics?.filter(
              (metric: any) => metric.id !== externalMetricId
            );
            return { ...prev, externalMetrics };
          }
        );
        return onSuccess();
      },
    });

  const {
    mutateAsync: unarchiveClientMetric,
    isLoading: isArchivingClientMetric,
  } = useUnarchiveClientMetricMutation({
    onSuccess: (res) => {
      if (!res.delete_clientDeletedMetrics) return onSuccess();

      if (!res.delete_clientDeletedMetrics.returning.length) return onSuccess();

      queryClient.setQueryData(
        [
          'GetExternalMetricsList',
          {
            where: {
              companyId: { _eq: user?.companyId },
              isMarkedDeleted: { _eq: false },
              clientDeletedMetrics: {
                clientId: { _eq: clientId },
              },
            },
            workspaceId: workspace?.id,
          },
        ],
        (prev: any) => {
          const externalMetrics = prev?.externalMetrics?.filter(
            (metric: any) => metric.id !== externalMetricId
          );
          return { ...prev, externalMetrics };
        }
      );
      return onSuccess();
    },
  });

  const handleArchiveExternalMetric = useCallback(
    async (unarchive: boolean) => {
      if (!externalMetricId) return;
      if (clientId && unarchive) {
        await unarchiveClientMetric({
          id: externalMetricId,
          clientId,
        });
      } else {
        await archiveMetric({
          id: externalMetricId,
          isArchived: !unarchive,
        });
      }
    },
    [archiveMetric, externalMetricId, clientId]
  );

  const handleDeleteExternalMetric = useCallback(async () => {
    if (!externalMetricId) return;
    await deleteMetric({
      id: externalMetricId,
    });
  }, [archiveMetric, externalMetricId]);

  return {
    handleArchiveExternalMetric,
    handleDeleteExternalMetric,
    isLoading: isLoading || isDeleting || isArchivingClientMetric,
  };
};

export default useArchiveExternalMetric;
