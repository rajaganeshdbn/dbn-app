import { useMemo } from 'react';
import { useGetExternalMetricsListQuery } from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';
import useWorkspace from './useWorkspace';

const useNewMetricStore = (isArchived?: boolean, clientId?: string) => {
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const { data, isLoading } = useGetExternalMetricsListQuery(
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
              isArchived: { _eq: Boolean(isArchived) },
            }),
      },
      workspaceId: workspace?.id,
    },
    {
      enabled: Boolean(user?.companyId && workspace?.id),
    }
  );
  const metricList = useMemo(
    () =>
      data?.externalMetrics.map((metric) => ({
        id: metric.id,
        name: metric.name,
        description: metric.description,
        createdBy: metric.createdBy || '',
        dateCreated: metric.createdAt,
        dashboards: metric.externalDashboardMetrics.map((em) => ({
          name: em.externalDashboard.name,
          id: em.externalDashboard.id,
        })),
        dataSourceId: metric.companyIntegrationId,
        updated: metric.updatedAt,
        metricId: metric.metricId,
        clientId: metric.clientId,
      })),
    [data?.externalMetrics]
  );
  const unpublishedMetrics = metricList?.filter(
    (item) => !item.dashboards?.length
  );
  return {
    metricList,
    isLoading,
    unpublishedMetrics,
  };
};

export default useNewMetricStore;
