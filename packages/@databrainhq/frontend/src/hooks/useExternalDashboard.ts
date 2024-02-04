import { useQueryClient } from 'react-query';
import {
  useCreateExternalDashboardMutation,
  useExternalDashboardListQuery,
  useEditExternalDashboardMutation,
  useDeleteExternalDashboardMutation,
  useManageExternalDashboardMetricsMutation,
  useUpdateExternalDashboardFiltersMutation,
  usePublishExternalMetricMutation,
} from 'utils/generated/graphql';
import useWorkspace from './useWorkspace';

const useExternalDashboards = (workspaceId: string | undefined = undefined) => {
  const queryClient = useQueryClient();
  const { workspace } = useWorkspace();
  const {
    data: dashboardData,
    isLoading: isGettingDashboard,
    error: dashboardGetError,
  } = useExternalDashboardListQuery(
    {
      workspaceId: workspaceId ?? workspace?.id,
    },
    { enabled: !!(workspaceId ?? workspace?.id) }
  );
  const {
    mutateAsync: createDashboard,
    isLoading: isCreatingDashboard,
    error: dashboardCreateError,
  } = useCreateExternalDashboardMutation({
    onSuccess: (data, variables) => {
      const res = data.insert_externalDashboards_one;
      queryClient.setQueryData(
        ['ExternalDashboardList', { workspaceId: variables.workspaceId }],
        (prev: any) => {
          return {
            ...prev,
            externalDashboards: [...prev.externalDashboards, res],
          };
        }
      );
    },
  });
  const {
    mutateAsync: updateDashboard,
    isLoading: isUpdatingDashboard,
    error: dashboardUpdateError,
  } = useEditExternalDashboardMutation({
    onSuccess: (data, variables) => {
      const res = data.update_externalDashboards_by_pk;
      if (!res) return;
      queryClient.setQueryData(
        [
          'ExternalDashboardList',
          { workspaceId: workspaceId ?? workspace?.id },
        ],
        (prev: any) => {
          const prevDashboards = prev?.externalDashboards;
          const index = prevDashboards?.findIndex(
            (dash: any) => dash.id === variables.id
          );
          if (index > -1) {
            prevDashboards[index] = {
              ...prevDashboards[index],
              ...res,
            };
          }
          return { ...prev, externalDashboards: prevDashboards };
        }
      );
    },
  });
  const {
    mutateAsync: manageDashboard,
    isLoading: isManagingDashboard,
    error: dashboardManageError,
  } = useManageExternalDashboardMetricsMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [
          'ExternalDashboardMetrics',
          { externalDashboardId: variables.externalDashboardId },
        ],
        (prev: any) => {
          const updatedDashboards = prev?.externalDashboardMetrics?.filter(
            (dash: any) =>
              dash.externalDashboardId !== variables.externalDashboardId
          );
          return { ...prev, externalDashboardMetrics: [...updatedDashboards] };
        }
      );
    },
  });
  const {
    mutateAsync: deleteDashboard,
    isLoading: isDeletingDashboard,
    error: dashboardDeleteError,
  } = useDeleteExternalDashboardMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [
          'ExternalDashboardList',
          { workspaceId: workspaceId ?? workspace?.id },
        ],
        (prev: any) => {
          const updatedDashboards = prev?.externalDashboards?.filter(
            (dash: any) => dash.id !== variables.id
          );
          return { ...prev, externalDashboards: [...updatedDashboards] };
        }
      );
    },
  });
  const {
    mutateAsync: editDashboardFilters,
    isLoading: isEditingDashboardFilters,
    error: editDashboardFiltersErrors,
  } = useUpdateExternalDashboardFiltersMutation({
    onSuccess(data, variables) {
      const res = data.update_externalDashboards_by_pk;
      if (!res) return;
      queryClient.setQueryData(
        [
          'ExternalDashboardList',
          { workspaceId: workspaceId ?? workspace?.id },
        ],
        (prev: any) => {
          const prevDashboards = prev?.externalDashboards;
          const index = prevDashboards?.findIndex(
            (dash: any) => dash.id === variables.id
          );
          if (index > -1) {
            prevDashboards[index] = {
              ...prevDashboards[index],
              ...res,
            };
          }
          return { ...prev, externalDashboards: prevDashboards };
        }
      );
    },
  });

  const {
    mutate: publishExternalMetric,
    isLoading: isPublishing,
    error: publishExternalMetricError,
  } = usePublishExternalMetricMutation();
  return {
    createDashboard,
    isCreatingDashboard,
    dashboardCreateError,
    dashboards: dashboardData?.externalDashboards,
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
    editDashboardFilters,
    isEditingDashboardFilters,
    editDashboardFiltersErrors,
    publishExternalMetric,
    publishExternalMetricError,
    isPublishing,
  };
};

export default useExternalDashboards;
