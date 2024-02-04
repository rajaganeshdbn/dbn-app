import { useCallback, useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import { useQueryClient } from 'react-query';
import { useDashboardLayoutQuery } from '@/queries/externalDashboard.query';
import { useSaveDashboardLayoutMutation } from '@/queries/externalDashboard.mutation';
import { DASHBOARD_LAYOUT_QUERY } from '@/consts/api';

export type UseClientDashboardLayoutProps = {
  externalDashboardId: string;
  clientId: string;
};

export const useClientDashboardLayout = ({
  externalDashboardId,
  clientId,
}: UseClientDashboardLayoutProps) => {
  const queryClient = useQueryClient();

  const { data: layoutData, isLoading: isQueryingLayout } =
    useDashboardLayoutQuery(externalDashboardId, clientId);
  const [layout, isLayoutLocked] = useMemo(() => {
    const data = layoutData as any;
    return [(data?.layout || []) as Layout[], Boolean(data?.isLocked)];
  }, [layoutData]);

  const { mutateAsync: saveLayoutMutation, isLoading: isMutatingLayout } =
    useSaveDashboardLayoutMutation();

  const saveLayout = useCallback(
    async (newLayout: Layout[], isChangedByClient?: boolean) => {
      await saveLayoutMutation(
        {
          clientId,
          externalDashboardId,
          layout: newLayout,
          isLocked: Boolean(isChangedByClient),
        },
        {
          onSuccess: (res) => {
            if (!res) return;
            const updatedLayout = res;
            queryClient.setQueryData(
              [
                DASHBOARD_LAYOUT_QUERY,
                { dashboardId: externalDashboardId, clientId },
              ],
              (prev: any) => ({
                ...prev,
                ...updatedLayout,
              })
            );
          },
        }
      );
    },
    [saveLayoutMutation, clientId, externalDashboardId]
  );
  return {
    saveLayout,
    layout,
    isLayoutLocked,
    isLoadingLayout: isQueryingLayout || isMutatingLayout,
  };
};
