import { useMemo } from 'react';
import { useGetExternalMetricsListQuery } from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';
import useWorkspace from './useWorkspace';

const useMetricStore = (
  isArchived?: boolean,
  clientId?: string,
  workspaceId?: string
) => {
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const { data, isLoading } = useGetExternalMetricsListQuery(
    {
      where: {
        companyId: { _eq: user?.companyId },
        companyIntegration: {
          companyWorkspace: { id: { _eq: workspace?.id } },
        },
        isMarkedDeleted: { _eq: false },
        ...(clientId
          ? {
              clientDeletedMetrics: {
                clientId: { _eq: clientId },
              },
            }
          : {
              isArchived: { _eq: Boolean(isArchived) },
            }),
      },
      workspaceId: workspaceId ?? workspace?.id,
    },
    {
      enabled: Boolean(user?.companyId && workspace?.id && isArchived),
    }
  );
  const { data: clientData, isLoading: clientDataLoading } =
    useGetExternalMetricsListQuery(
      {
        where: {
          companyId: { _eq: user?.companyId },
          companyIntegration: {
            companyWorkspace: { id: { _eq: workspace?.id } },
          },
          isMarkedDeleted: { _eq: false },
          ...(clientId
            ? {
                clientDeletedMetrics: {
                  clientId: { _eq: clientId },
                },
              }
            : {
                isArchived: { _eq: Boolean(isArchived) },
              }),
        },
        workspaceId: workspace?.id,
      },
      {
        enabled: Boolean(user?.companyId && workspace?.id && clientId),
      }
    );
  const metricList = useMemo(
    () =>
      (isArchived ? data : clientData)?.externalMetrics.map((metric) => ({
        id: metric.id,
        name: metric.name,
        description: metric.description,
        createdBy: metric.createdBy || '',
        dateCreated: metric.createdAt,
        dashboards: metric.externalDashboardMetrics.map((em) => ({
          name: em.externalDashboard.name,
          id: em.externalDashboard.id,
        })),
      })),
    [data?.externalMetrics, isArchived]
  );
  return {
    metricList,
    isLoading: isArchived ? isLoading : clientDataLoading,
  };
};

export default useMetricStore;
