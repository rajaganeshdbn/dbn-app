/* eslint-disable import/no-relative-parent-imports */
import barChart from '../components/Svg/Chart.svg';
import lineChart from '../components/Svg/lineChart.svg';
import comboChart from '../components/Svg/comboChart.svg';
import scatterChart from '../components/Svg/scatterChart.svg';
import bubbleChart from '../components/Svg/bubbleChart.svg';
import rowChart from '../components/Svg/rowChart.svg';
import steppedChart from '../components/Svg/steppedChart.svg';
import stackChart from '../components/Svg/stackedBarChart.svg';
import histogramChart from '../components/Svg/histogramChart.svg';
import doughnutChart from '../components/Svg/doughnutChart.svg';
import areaChart from '../components/Svg/areaChart.svg';
import pieChart from '../components/Svg/pieChart.svg';
import waterfallChart from '../components/Svg/waterfallChart.svg';
import funnelChart from '../components/Svg/funnelChart.svg';
import gaugeChart from '../components/Svg/gaugeChart.svg';
import sankeyChart from '../components/Svg/sankeyChart.svg';
import singleValueChart from '../components/Svg/singleChart.svg';
import boxplotChart from '../components/Svg/boxplotChart.svg';
import tableChart from '../components/Svg/tableChart.svg';
import timeseriesChart from '../components/Svg/timeseriesChart.svg';
import pivotChart from '../components/Svg/pivotChart.svg';
import roseChart from '../components/Svg/roseChart.svg';
import horizontalStackChart from '../components/Svg/rowStackChart.svg';
import treeMapChart from '../components/Svg/treeMap.svg';
import horizontalStackTableChart from '../components/Svg/horizontalStackTable.svg';
import stackedAreaChart from '../components/Svg/stackedAreaChart.svg';
import geoChart from '../components/Svg/geoChart.svg';
import geoScatterChart from '../components/Svg/geoScatter.svg';
import geoBarChart from '../components/Svg/geoBar.svg';
import worldMapChart from '../components/Svg/worldMap.svg';

export const SOMETHING_WENT_WRONG = 'something went wrong, please try again';
export const CHART_TYPES = {
  line: 'line',
  stepped: 'stepped',
  bar: 'bar',
  stack: 'stack',
  histogram: 'histogram',
  bubble: 'bubble',
  scatter: 'scatter',
  row: 'row',
  area: 'area',
  stackedArea: 'stacked area',
  combo: 'combo',
  pie: 'pie',
  doughnut: 'doughnut',
  waterfall: 'waterfall',
  funnel: 'funnel',
  gauge: 'gauge',
  sankey: 'sankey',
  singleValue: 'single value',
  boxplot: 'boxplot',
  table: 'table',
  timeSeries: 'time series',
  pivot: 'pivot table',
  pivotV2: 'pivot table 2',
  rose: 'rose',
  horizontalStack: 'horizontal stack',
  treeMap: 'tree map',
  horizontalStackTable: 'horizontal stack table',
  geoMap: 'geo map',
  geoBarMap: 'geo map (with bar)',
  geoScatterMap: 'geo map (with scatter)',
  worldMap: 'world map',
};
export const chartOptions = [
  {
    name: 'Single Value',
    icon: singleValueChart,
    label: 'Single Value',
  },
  {
    name: 'Gauge',
    icon: gaugeChart,
    label: 'Gauge',
  },
  {
    name: 'Table',
    icon: tableChart,
    label: 'Table',
  },
  {
    name: 'Pivot Table',
    icon: pivotChart,
    label: 'Pivot Table',
  },
  {
    name: 'Pivot Table 2',
    icon: pivotChart,
    label: 'Pivot Table V-2',
  },
  {
    name: 'Line',
    icon: lineChart,
    label: 'Line',
  },
  {
    name: 'Time Series',
    icon: timeseriesChart,
    label: 'Time Series',
  },
  {
    name: 'Bar',
    icon: barChart,
    label: 'Bar',
  },
  {
    name: 'Stack',
    icon: stackChart,
    label: 'Bar Stack',
  },
  {
    name: 'Combo',
    icon: comboChart,
    label: 'Combo (Multi-Scales)',
  },
  {
    name: 'row',
    icon: rowChart,
    label: 'Horizontal Bar',
  },
  {
    name: 'Horizontal Stack',
    icon: horizontalStackChart,
    label: 'Horizontal Bar Stack',
  },
  {
    name: 'Horizontal Stack Table',
    icon: horizontalStackTableChart,
    label: 'Horizontal Stack Table',
  },
  {
    name: 'Area',
    icon: areaChart,
    label: 'Area',
  },
  {
    name: 'Stacked Area',
    icon: stackedAreaChart,
    label: 'Stacked Area',
  },
  {
    name: 'Pie',
    icon: pieChart,
    label: 'Pie',
  },
  {
    name: 'Rose',
    icon: roseChart,
    label: 'Rose',
  },
  {
    name: 'Doughnut',
    icon: doughnutChart,
    label: 'Doughnut',
  },
  {
    name: 'Stepped',
    icon: steppedChart,
    label: 'Step',
  },
  {
    name: 'Histogram',
    icon: histogramChart,
    label: 'Histogram',
  },
  {
    name: 'Funnel',
    icon: funnelChart,
    label: 'Funnel',
  },
  {
    name: 'Scatter',
    icon: scatterChart,
    label: 'Scatter',
  },
  {
    name: 'Bubble',
    icon: bubbleChart,
    label: 'Bubble',
  },
  {
    name: 'BoxPlot',
    icon: boxplotChart,
    label: 'BoxPlot',
  },
  {
    name: 'Waterfall',
    icon: waterfallChart,
    label: 'Waterfall',
  },
  {
    name: 'Sankey',
    icon: sankeyChart,
    label: 'Sankey',
  },
  {
    name: 'Tree map',
    icon: treeMapChart,
    label: 'Tree map',
  },
  {
    name: 'Geo map',
    icon: geoChart,
    label: 'Geo map',
  },
  {
    name: 'Geo map (with bar)',
    icon: geoBarChart,
    label: 'Geo map (with bar)',
  },
  {
    name: 'Geo map (with scatter)',
    icon: geoScatterChart,
    label: 'Geo map (with scatter)',
  },
  {
    name: 'World map',
    icon: worldMapChart,
    label: 'World map',
  },
];
export const timeStamp = {
  month: 'monthly',
  quarter: 'quarterly',
  daily: 'daily',
  weekly: 'weekly',
  yearly: 'yearly',
};
export const STATUS_TAB = 'STATUS_TAB';
export const STREAM_TAB = 'STREAM_TAB';
export const CLIENT_NAME_VAR = 'client_id_variable';
export const STACK_AXIS = 'stack';
export const RLS_CONDITIONS: Record<string, string> = {
  'is equal to': '=',
  'is not equal to': '!=',
  'is greater than': '>',
  'is less than': '<',
  'is greater than or equal to': '>=',
  'is less than or equal to': '<=',
};
export const CHART_TAB = 'CHART_TAB';
export const TABLE_TAB = 'TABLE_TAB';
export const QUERY_TAB = 'QUERY_TAB';
export const INPUT_TABLE = 'INPUT_TABLE';
export const OUTPUT_TABLE = 'OUTPUT_TABLE';
export const DOUGHNUT = 'doughnut';
export const PIE = 'pie';
export const SANKEY = 'sankey';
export const BOXPLOT = 'boxplot';
export const TABLE = 'table';
export const GENERAL = 'general';
export const CONFIG = 'configuration';
export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_LEFT = 'bottom-left';
export const BOTTOM_RIGHT = 'bottom-right';
export const DESTINATIONS: Record<string, string> = {
  Snowflake: 'Snowflake',
  Redshift: 'Redshift',
  BigQuery: 'BigQuery',
  Postges: 'Postgres',
};

export const DATABASE_NAME = '{{DATABASE_NAME}}';
export const CLIENT_NAME_VAR_NUM = "'client_id_variable'";
export const DATABASE = 'DATABASE';
export const WEEK_DAYS = [
  { value: 'Sun', label: 'Sun' },
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
  { value: 'Sat', label: 'Sat' },
];

export const TIME_ZONES = [
  { value: 'Asia/Kolkata', label: 'IST' },
  { value: 'America/Los_Angeles', label: 'PST' },
  { value: 'Europe/London', label: 'GMT' },
  { value: 'Australia/Sydney', label: 'AEST' },
  { value: 'America/New_York', label: 'EST' },
];

export const TIME = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
];

export const DATE_NUM = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
];

export const FREQUENCY = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
];

export const RAW_CSV_OPTIONS = ['Email'];
export const NONE = 'NONE';
export const REQUESTED = 'REQUESTED';
export const AVAILABLE = 'AVAILABLE';
export const NA_VALUE = 'N/A';

export const NUMBER_FORMAT = [
  {
    label: 'Original Value',
    value: 'original',
  },
  {
    label: 'Adaptive Formatting',
    value: 'adaptive',
  },
  { label: 'Percentage (%)', value: 'percent' },
  { label: 'Dollar ($)', value: 'dollar' },
  { label: '$(Adaptive Formatting)', value: '$(adaptive)' },
  {
    label: ',d (12345.432 => 12,345)',
    value: 'd',
  },
  {
    label: '.1s (12345.432 => 10k)',
    value: '1s',
  },
  {
    label: '.3s (12345.432 => 12.3k)',
    value: '3s',
  },
  {
    label: ',.1% (12345.432 => 1,234,543.2%)',
    value: '1%',
  },
  {
    label: ',.2% (12345.432 => 1234543.20%)',
    value: '2%',
  },
  {
    label: ',.3% (12345.432 => 1234543.200%)',
    value: '3%',
  },
  {
    label: '.4r (12345.432 => 12350)',
    value: '4r',
  },
  {
    label: ',.1f (12345.432 => 12,345.4)',
    value: '1f',
  },
  {
    label: ',.2f (12345.432 => 12,345.43)',
    value: '2f',
  },
  {
    label: ',.3f (12345.432 => 12,345.432)',
    value: '3f',
  },
  {
    label: '+, (12345.432 => +12,345.432)',
    value: '+',
  },
  {
    label: '$,.2f (12345.432 => $12,345.43)',
    value: '$',
  },
  {
    label: 'Duration In ms (66000 => 1m 6s)',
    value: 'ms1',
  },
  {
    label: `Duration In ms (1.40008 => 1ms 400μs 80ns)`,
    value: 'ms2',
  },
];

export const ICONS_LIST = [
  'people',
  'import',
  'new-window',
  'circle',
  'group-by',
  'undo',
  'redo',
  'maximize',
  'minimize',
  'fullscreen',
  'download',
  'archive',
  'format',
  'company',
  'profile',
  'users',
  'bar-chart',
  'bar-chart-2',
  'kebab-menu-horizontal',
  'kebab-menu-vertical',
  'paint-brush',
  'funnel',
  'funnel-simple',
  'cross',
  'columns',
  'gear',
  'presentation-chart',
  'chevron-down',
  'plus',
  'info',
  'arrow-down',
  'arrow-up',
  'arrow-left',
  'arrow-right',
  'double-arrow-left',
  'double-arrow-right',
  'expand-arrows',
  'eye',
  'eye-slash',
  'database',
  'magnifying-glass',
  'pencil-simple-line',
  'pencil-simple',
  'file-sql',
  'code',
  'sign-out',
  'save',
  'delete',
  'align-space-even',
  'align-bottom',
  'align-left',
  'align-right',
  'align-top',
  'trend-up',
  'trend-up-chart',
  'caret-down-fill',
  'caret-up-fill',
  'caret-up-down',
  'pie-chart',
  'table-view',
  'task-done-file',
  'right-angle',
  'text-rotation-angle-up',
  'text-rotation-none',
  'text-rotation-up',
  'preview-file',
  'share',
  'image',
  'text',
  'color-palette',
  'shuffle',
  'table',
  'chart',
  'calendar',
  'horizontal-rule',
  'short-text',
  'subheader',
  'copy',
  'timer',
  'link',
  'not-found',
  'bar-chart-horizontal',
  'line-chart',
  'line-chart-trend-up',
  'globe',
  'map',
  'leaderboard',
  'radar',
  'scale',
  'scatter-plot',
  'tree',
  'donut-chart',
  'scatter-chart',
  'waterfall-chart',
  'area-chart',
  'bubble-chart',
  'candlestick-chart',
  'string',
  'boolean',
  'date',
  'number',
  'unknown',
  'array',
  'right-join',
  'left-join',
  'outer-join',
  'right-full-join',
  'left-full-join',
  'inner-join',
  'full-join',
  'version-history',
  'roles',
] as const;

export const NUMBER = 'number';
export const STRING = 'string';
export const BOOLEAN = 'boolean';
export const DEFAULT = 'default';
export const DATE = 'date';
export const AND = 'AND';
export const IS_NOT_NULL = 'IS NOT NULL';
export const AS_SIGNED = 'AS SIGNED';
export const AS_BIGINT = 'AS BIGINT';
export const AS_VARCHAR = 'AS VARCHAR';
export const AS_CHAR = 'AS CHAR';
export const AS_STRING = 'AS STRING';
export const AS_DATE = 'AS DATE';
export const CAST = 'CAST';
export const IN = 'IN';
export const EQUAL_OPERATOR = '=';
export const YEAR = 'year';
export const LAST = 'last';
export const LIKE = 'like';
export const MULTI_SELECT = 'MULTI_SELECT';
export const SINGLE_SELECT = 'SINGLE_SELECT';
export const SEARCH = 'SEARCH';
export const DATE_PICKER = 'DATE_PICKER';
export const NUMBER_FIELD = 'NUMBER_FIELD';
export const BETWEEN = 'BETWEEN';
export const CUSTOM = 'custom';

export const IS_SELF_HOSTED = import.meta.env.VITE_IS_SELFHOSTED;
