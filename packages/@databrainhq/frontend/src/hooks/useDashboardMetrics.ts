import { useResizeDashboardMetricMutation } from 'utils/generated/graphql';
import { useQueryClient } from 'react-query';

const useDashboardMetrics = (dashboardId: string) => {
  const queryClient = useQueryClient();
  const { mutate: resizeDashboardMetric } = useResizeDashboardMetricMutation({
    onSuccess: (data, variables) => {
      const res = data.update_dashboardMetrics_by_pk;
      queryClient.setQueryData(
        ['GetDashboardMetrics', { dashboardId }],
        (prev: any) => {
          const metricItems = prev.dashboardMetrics;
          const index = metricItems.findIndex(
            (item: any) => item.id === variables.id
          );
          if (index > -1) {
            metricItems[index] = {
              ...metricItems[index],
              width: res?.width,
              height: res?.height,
              xAxis: res?.xAxis,
              yAxis: res?.yAxis,
            };
          }
          return { ...prev, dashboardMetrics: metricItems };
        }
      );
    },
  });

  return { resizeDashboardMetric };
};

export default useDashboardMetrics;
