import { useQueryClient } from 'react-query';
import {
  useCreateDashboardMutation,
  useDeleteDashboardMutation,
  useGetDashboardsQuery,
  useUpdateDashboardMutation,
  useManageDashboardMetricsMutation,
} from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';

type ManageDashboardMetricsType = {
  input: {
    dashboardId: string;
    metricIds: string[];
  };
  options: {
    onSuccess?: () => void;
  };
};

const useDashboards = () => {
  const queryClient = useQueryClient();
  const {
    data: dashboardData,
    isLoading: isGettingDashboard,
    error: dashboardGetError,
  } = useGetDashboardsQuery({
    companyId: getCurrentUser()?.companyId,
  });
  const {
    mutateAsync: createDashboard,
    isLoading: isCreatingDashboard,
    error: dashboardCreateError,
  } = useCreateDashboardMutation({
    onSuccess: (data, variables) => {
      const res = data.insert_dashboards_one;
      queryClient.setQueryData(
        ['GetDashboards', { companyId: variables.companyId }],
        (prev: any) => {
          return { ...prev, dashboards: [...prev.dashboards, res] };
        }
      );
    },
  });
  const {
    mutateAsync: updateDashboard,
    isLoading: isUpdatingDashboard,
    error: dashboardUpdateError,
  } = useUpdateDashboardMutation({
    onSuccess: (data, variables) => {
      const res = data.update_dashboards_by_pk;
      queryClient.setQueryData(
        ['GetDashboards', { companyId: getCurrentUser()?.companyId }],
        (prev: any) => {
          const prevDashboards = prev?.dashboards;
          const index = prevDashboards?.findIndex(
            (dash: any) => dash.id === variables.id
          );
          if (index > -1) {
            prevDashboards[index].name = res?.name;
          }
          return { ...prev, dashboards: prevDashboards };
        }
      );
    },
  });
  const {
    mutateAsync: manageDashboardMetrics,
    isLoading: isManagingDashboard,
    error: dashboardManageError,
  } = useManageDashboardMetricsMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ['GetDashboardMetrics', { dashboardId: variables.dashboardId }],
        (prev: any) => {
          const updatedDashboards = prev?.dashboardMetrics?.filter(
            (dash: any) => dash.dashboardId !== variables.dashboardId
          );
          return { ...prev, dashboards: [...updatedDashboards] };
        }
      );
    },
  });
  const {
    mutateAsync: deleteDashboard,
    isLoading: isDeletingDashboard,
    error: dashboardDeleteError,
  } = useDeleteDashboardMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ['GetDashboards', { companyId: getCurrentUser()?.companyId }],
        (prev: any) => {
          const updatedDashboards = prev?.dashboards?.filter(
            (dash: any) => dash.id !== variables.id
          );
          return { ...prev, dashboards: [...updatedDashboards] };
        }
      );
    },
  });

  const manageDashboard = (
    { dashboardId, metricIds }: ManageDashboardMetricsType['input'],
    { onSuccess }: ManageDashboardMetricsType['options']
  ) => {
    manageDashboardMetrics(
      {
        dashboardId,
        metricIds,
      },
      {
        onSuccess,
      }
    );
  };
  return {
    createDashboard,
    isCreatingDashboard,
    dashboardCreateError,
    dashboards: dashboardData?.dashboards,
    isGettingDashboard,
    dashboardGetError,
    updateDashboard,
    isUpdatingDashboard,
    dashboardUpdateError,
    deleteDashboard,
    isDeletingDashboard,
    dashboardDeleteError,
    manageDashboard,
    isManagingDashboard,
    dashboardManageError,
  };
};

export default useDashboards;
