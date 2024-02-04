import { useNavigate } from 'react-router-dom';
import {
  useCreateDashboardMetricsMutation,
  useCreateMetricMutation,
  useGetDashboardMetricsQuery,
  useGetMetricDashboardsQuery,
  useUpdateDashboardMetricsMutation,
  useUpdateMetricMutation,
} from 'utils/generated/graphql';
import { CHART_TYPES } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

export type DashboardType = {
  id: string;
  name: string;
};

const getChartOption = ({
  xAxis,
  yAxisList,
  chartType,
  step,
  measure,
  sankeyValues,
  singleValue,
  margins,
  legendSettings,
  labelSettings,
  axisSettings,
  backGroundColor,
  customSettings,
  tableSettings,
}: any) => {
  if (chartType === CHART_TYPES.funnel) {
    return {
      xAxis: '',
      yAxisList: [],
      chartType,
      step,
      measure,
      sankeyValues: [],
      singleValue: '',
      margins,
      legendSettings,
      labelSettings,
      axisSettings,
      customSettings,
    };
  }
  if (chartType === CHART_TYPES.gauge) {
    return {
      xAxis: '',
      yAxisList: [],
      chartType,
      step: '',
      measure,
      sankeyValues: [],
      singleValue: '',
      margins,
      legendSettings,
      labelSettings,
      axisSettings,
      customSettings,
    };
  }
  if (chartType === CHART_TYPES.singleValue) {
    return {
      xAxis: '',
      yAxisList: [],
      chartType,
      step: '',
      measure: '',
      sankeyValues: [],
      singleValue,
      margins,
      legendSettings,
      labelSettings,
      axisSettings,
      customSettings,
    };
  }
  if (chartType === CHART_TYPES.sankey) {
    return {
      xAxis: '',
      yAxisList: [],
      chartType,
      step: '',
      measure: '',
      sankeyValues,
      singleValue: '',
      margins,
      legendSettings,
      labelSettings,
      axisSettings,
      backGroundColor,
      customSettings,
    };
  }
  return {
    xAxis,
    yAxisList,
    chartType,
    step: '',
    measure: '',
    sankeyValues: [],
    singleValue: '',
    margins,
    legendSettings,
    labelSettings,
    axisSettings,
    backGroundColor,
    customSettings,
    tableSettings,
  };
};

const useMetric = ({
  actorId,
  xAxis,
  yAxisList,
  chartType,
  query,
  id,
  step,
  measure,
  sankeyValues,
  singleValue,
  dbName,
  dashboardId,
  dashboardIds,
  metricQuery,
  outputColumns,
  selectedColumns,
  margins,
  legendSettings,
  labelSettings,
  axisSettings,
  backGroundColor,
  customSettings,
  tableSettings,
}: any) => {
  const user = getCurrentUser();
  const { data: dashboardMetricsData, isLoading: isMetricListLoading } =
    useGetDashboardMetricsQuery({
      dashboardId,
    });
  const metricListData = dashboardMetricsData?.dashboardMetrics;

  const currentMetric = ({ metricId }: any) => {
    const metric = metricListData?.find(
      (metricItem) => metricItem.metric.id === metricId
    );
    return { metric, isMetricLoading: isMetricListLoading };
  };
  const { data: metricDashboardsData } = useGetMetricDashboardsQuery({
    metricId: id,
  });
  const metricDashboards = metricDashboardsData?.dashboardMetrics;

  const createMetricMutation = useCreateMetricMutation();
  const { mutate: createMetricDashboards } =
    useCreateDashboardMetricsMutation();
  const { mutate: updateMetricDashboards } =
    useUpdateDashboardMetricsMutation();
  const updateMetricMutation = useUpdateMetricMutation();
  const navigate = useNavigate();
  const createMetric = (data: any) => {
    createMetricMutation.mutate(
      {
        actorId,
        chartOption: getChartOption({
          xAxis,
          yAxisList,
          chartType,
          step,
          measure,
          sankeyValues,
          singleValue,
          margins,
          legendSettings,
          labelSettings,
          axisSettings,
          backGroundColor,
          customSettings,
          tableSettings,
        }),
        query,
        description: data.description,
        lock: false,
        name: data.name,
        publishType: 'test',
        trackLineage: false,
        verify: false,
        companyId: user?.companyId,
        dbName,
        metricQuery,
        outputColumns,
        inputFields: selectedColumns,
      },
      {
        onSuccess: (metricResponse) => {
          createMetricDashboards(
            {
              objects: dashboardIds.map((dashboard: DashboardType['id']) => ({
                dashboardId: dashboard,
                metricId: metricResponse.insert_metrics_one?.id,
              })),
            },
            {
              onSuccess: () => {
                navigate(`/${dashboardId ?? ''}`);
              },
            }
          );
        },
      }
    );
  };
  const updateMetric = (data: any) => {
    updateMetricMutation.mutate(
      {
        id,
        actorId,
        chartOption: getChartOption({
          xAxis,
          yAxisList,
          chartType,
          step,
          measure,
          sankeyValues,
          singleValue,
          margins,
          legendSettings,
          labelSettings,
          axisSettings,
          backGroundColor,
          customSettings,
          tableSettings,
        }),
        query,
        description: data.description,
        lock: false,
        name: data.name,
        publishType: 'test',
        trackLineage: false,
        verify: false,
        companyId: user?.companyId,
        dbName,
        metricQuery,
        outputColumns,
        inputFields: selectedColumns,
      },
      {
        onSuccess: () => {
          const objects = dashboardIds.map((dashId: string) => {
            const metricDashboard = metricDashboards?.find(
              (metricItem) => metricItem.dashboard.id === dashId
            );

            if (!metricDashboard) return { dashboardId: dashId, metricId: id };

            return {
              dashboardId: dashId,
              metricId: id,
              width: metricDashboard.width,
              height: metricDashboard.height,
              xAxis: metricDashboard.xAxis,
              yAxis: metricDashboard.yAxis,
            };
          });
          updateMetricDashboards(
            {
              metricId: id,
              objects,
            },
            {
              onSuccess() {
                navigate(`/${dashboardId ?? ''}`);
              },
            }
          );
        },
      }
    );
  };
  return {
    createMetric,
    updateMetric,
    currentMetric,
    metricListData,
    isMetricListLoading,
  };
};

export default useMetric;
