import r2wc from '@r2wc/react-to-web-component';
import { Dashboard, DashboardProps } from './containers/Dashboard';
import { Chart, ChartProps } from './components';
import { Metric, MetricProps } from './containers/Metric';
import { CreateEmbedMetric } from './containers/CreateMetric';
import { CreateEmbedMetricProps } from './containers/CreateMetric/CreateEmbeddedMetric';

export type {
  CustomSettings,
  TableSettings,
  MarginSettings,
  AxisSettings,
  LegendSettings,
  LabelSettings,
  BackgroundSettings,
  PivotSettingsType,
  GaugeSettingsType,
  ChartSettingsType,
  TimeSeriesSettingsType,
  MetricFilterOptionsType,
  DateTypeOptionType,
} from '@/types';

const DbnDashboard = r2wc(Dashboard, {
  props: {
    token: 'string',
    dashboardId: 'string',
    options: 'json',
    theme: 'json',
    isHideChartSettings: 'boolean',
    isHideTablePreview: 'boolean',
    enableDownloadCsv: 'boolean',
    enableEmailCsv: 'boolean',
    enableMultiMetricFilters: 'boolean',
    disableFullscreen: 'boolean',
    optionsIcon: 'string',
    adminThemeOptions: 'json',
    customMessages: 'json',
    themeName: 'string',
  },
  shadow: 'open',
});
if (!customElements.get('dbn-dashboard'))
  customElements.define('dbn-dashboard', DbnDashboard);

const DbnMetric = r2wc(Metric, {
  props: {
    token: 'string',
    metricId: 'string',
    theme: 'json',
    chartRendererType: 'string',
    optionsIcon: 'string',
    chartColors: 'json',
    height: 'number',
    width: 'number',
    className: 'string',
    style: 'json',
    variant: 'string',
    onMinimize: 'function',
    isHideChartSettings: 'boolean',
    isHideTablePreview: 'boolean',
    metricFilterOptions: 'string',
    enableDownloadCsv: 'boolean',
    enableEmailCsv: 'boolean',
    disableFullscreen: 'boolean',
    enableMultiMetricFilters: 'boolean',
    metricFilterPosition: 'string',
    customMessages: 'json',
    themeName: 'string',
    appearanceOptions: 'json',
  },
  shadow: 'open',
});
if (!customElements.get('dbn-metric'))
  customElements.define('dbn-metric', DbnMetric);

const DbnChart = r2wc(Chart, {
  props: {
    chartOptions: 'json',
    data: 'json',
    events: 'json',
    config: 'json',
    className: 'string',
    colors: 'json',
  },
  shadow: 'open',
});
if (!customElements.get('dbn-chart'))
  customElements.define('dbn-chart', DbnChart);

const DbnCreateMetric = r2wc(CreateEmbedMetric, {
  props: {
    token: 'string',
    dashboardId: 'string',
    options: 'json',
    theme: 'json',
    themeName: 'string',
  },
  shadow: 'open',
});
if (!customElements.get('dbn-create-metric'))
  customElements.define('dbn-create-metric', DbnCreateMetric);

export declare namespace JSX {
  export interface IntrinsicElements {
    Tag: any; // Text component was giving some linting error therefore added this
    'dbn-dashboard': DashboardProps;
    'dbn-metric': MetricProps;
    'dbn-chart': ChartProps;
    'dbn-create-metric': CreateEmbedMetricProps;
  }
}

export type { DashboardProps, MetricProps, ChartProps, CreateEmbedMetricProps };
export { Chart };
