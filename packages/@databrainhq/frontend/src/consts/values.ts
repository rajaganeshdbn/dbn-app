import { types } from '@databrainhq/plugin';
import {
  Datawarehouse,
  Destination,
  Source,
  SourceType,
} from 'types/integration';
import { DatasetMetricCreationConfiguration } from 'types/metric';

export const DBN_SQL_TABLE = 'dbn_sql_table';

export const DESTINATIONS: Record<Datawarehouse, Datawarehouse> = {
  Snowflake: 'Snowflake',
  Redshift: 'Redshift',
  BigQuery: 'BigQuery',
};
export const SOURCES: Record<SourceType, SourceType> = {
  Salesforce: 'Salesforce',
  Postgres: 'Postgres',
  HubSpot: 'HubSpot',
  GoogleAds: 'GoogleAds',
  Stripe: 'Stripe',
};
export const DESTINATION_AIRBYTE_IDS: Destination = {
  Snowflake: '424892c4-daac-4491-b35d-c6688ba547ba',
  BigQuery: '22f6c74f-5699-40ff-833c-4a879ea40133',
  Redshift: 'f7a7d195-377f-cf5b-70a5-be6b819019dc',
};

export const SOURCE_AIRBYTE_IDS: Source = {
  Salesforce: 'b117307c-14b6-41aa-9422-947e34922962',
  HubSpot: '36c891d9-4bd9-43ac-bad2-10e12756272c',
  Postgres: 'decd338e-5647-4c0b-adf4-da0e75f5a750',
  GoogleAds: '253487c0-2246-43ba-a21f-5116b20a2c50',
  Stripe: 'e094cb9a-26de-4645-8761-65c0c425d1de',
};
// These UUIDs remain constant in every Airbyte instance.

export const SOURCE_DEFINITIONS = 'source_definitions';
export const DESTINATION_DEFINITIONS = 'destination_definitions';
export const SUCCEEDED = 'succeeded';
export const INVALID_CREDS = 'invalid credentials, please check & try again';
export const SOMETHING_WENT_WRONG = 'something went wrong, please try again';
export const SALESFORCE = 'SALESFORCE';
export const HUBSPOT = 'HUBSPOT';
export const POSTGRES = 'POSTGRES';
export const GOOGLEADS = 'GOOGLEADS';
export const STRIPE = 'STRIPE';
export const DATABRAIN = 'DATABRAIN';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NONE = 'NONE';
export const TESTED = 'TESTED';
export const INVALID_INPUT = 'invalid input, please check & try again';
export const SOURCE = 'source';
export const AIRBYTE_RAW = '_AIRBYTE_RAW_';
export const AIRBYTE = '_AIRBYTE_';
export const OTHERS = 'OTHERS';
export const GOOGLE_ADS = 'Google Ads';
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
};

export const STATUS_TAB = 'STATUS_TAB';
export const STREAM_TAB = 'STREAM_TAB';
export const CLIENT_NAME_VAR = 'client_id_variable';
export const CLIENT_NAME_VAR_NUM = "'client_id_variable'";
export const RLS_CONDITIONS: Record<string, string> = {
  'is equal to': '=',
  'is not equal to': '!=',
  'is greater than': '>',
  'is less than': '<',
  'is greater than or equal to': '>=',
  'is less than or equal to': '<=',
};

export const DATABASE_NAME = '{{DATABASE_NAME}}';
export const TIME_GRAIN_OPTIONS = [
  {
    value: 'day',
    label: 'Day',
  },
  {
    value: 'week',
    label: 'Week',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'quarter',
    label: 'Quarter',
  },
  {
    value: 'year',
    label: 'Year',
  },
  {
    value: 'NONE',
    label: 'Original Value',
  },
];

export const DATASET_TIME_HELPER_FUNCTIONS: types.FloatingDropDownOption[] = [
  {
    value: 'minute',
    label: 'Minute',
  },
  {
    value: 'hours',
    label: 'Hours',
  },
  {
    value: 'day',
    label: 'Day',
  },
  {
    value: 'week',
    label: 'Week',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'quarter',
    label: 'Quarter',
  },
  {
    value: 'year',
    label: 'Year',
  },
  {
    value: 'minute of hour',
    label: 'Minute of Hour',
  },
  {
    value: 'hour of day',
    label: 'Hour of Day',
  },
  {
    value: 'day of week',
    label: 'Day of Week',
  },
  {
    value: 'day of month',
    label: 'Day of Month',
  },
  {
    value: 'day of year',
    label: 'Day of Year',
  },
  {
    value: 'week of year',
    label: 'Week of Year',
  },
  {
    value: 'month of year',
    label: 'Month of Year',
  },
  {
    value: 'quarter of year',
    label: 'Quarter of Year',
  },
  {
    value: 'year of date',
    label: 'Year of Date or Timestamp',
  },
  {
    value: 'to_char(month)',
    label: 'Month Name',
  },
  { value: 'ALL', label: 'COUNT ROW' },
  { value: 'COUNT', label: 'COUNT' },
  { value: 'COUNT_DISTINCT', label: 'COUNT_DISTINCT' },
  {
    value: 'date format',
    label: 'Format Date',
    subValue: 'Default: yyyy-mm-dd',
  },
  {
    value: 'NONE',
    label: 'Original Value',
  },
];
export const TIME_SERIES_HELPER_FUNCTIONS: types.FloatingDropDownOption[] = [
  {
    value: 'date format',
    label: 'Monthly',
    subValue: 'Mon-yyyy',
  },
  {
    value: 'date format',
    label: 'Yearly',
    subValue: 'yyyy',
  },
  {
    value: 'date format',
    label: 'Weekly',
    subValue: 'Mon',
  },
  {
    value: 'date format',
    label: 'Quaterly',
    subValue: 'Q yyyy',
  },
  {
    value: 'date format',
    label: 'Daily',
    subValue: 'yyyy-mm-dd',
  },
];
export const METRIC_CREATE_MODES = ['CUSTOM', 'PYTHON', 'ARITHMETIC'];
export const DATE_FORMAT = 'date format';
export const DATASET_STRING_HELPER_FUNCTIONS = [
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'ALL', label: 'COUNT ROW' },
  { value: 'COUNT', label: 'COUNT' },
  { value: 'COUNT_DISTINCT', label: 'COUNT_DISTINCT' },
  {
    value: 'NONE',
    label: 'Original Value',
  },
];
export const DATASET_NUMBER_HELPER_FUNCTIONS = [
  { value: 'round', label: 'Round' },
  { value: 'floor', label: 'Floor' },
  { value: 'abs', label: 'Absolute' },
  { value: 'ceil', label: 'Ceil' },
  { value: 'sqrt', label: 'Square root' },
  { value: 'exp', label: 'Exponent' },
  { value: 'log', label: 'Log' },
  { value: 'log10', label: 'Log 10' },
  { value: 'ALL', label: 'COUNT ROW' },
  { value: 'AVG', label: 'AVG' },
  { value: 'SUM', label: 'SUM' },
  { value: 'COUNT', label: 'COUNT' },
  { value: 'COUNT_DISTINCT', label: 'COUNT_DISTINCT' },
  { value: 'MAX', label: 'MAX' },
  { value: 'MIN', label: 'MIN' },
  {
    value: 'NONE',
    label: 'Original Value',
  },
];

export const DATASET_OTHER_HELPER_FUNCTIONS = [
  { value: 'ALL', label: 'COUNT ROW' },
  { value: 'COUNT', label: 'COUNT' },
  { value: 'COUNT_DISTINCT', label: 'COUNT_DISTINCT' },
  {
    value: 'NONE',
    label: 'Original Value',
  },
];
export const DATASET_NUM_HELPER_FUNCTIONS = [
  {
    value: 'auto',
    label: 'Auto bin',
  },
  {
    value: '10 bins',
    label: '10 bins',
  },
  {
    value: '50 bins',
    label: '50 bins',
  },
  {
    value: '100 bins',
    label: '100 bins',
  },
  {
    value: 'NONE',
    label: "Don't bin",
  },
];
export const DEFAULT_FORECAST_VALUES = {
  isEnable: false,
  forecastPeriods: 10,
  modelName: 'ARIMA',
  confidenceInterval: 0.95,
  timeColumnName: '_timestamp',
  measureColumnName: '',
  timeGrain: 'Y',
  yearlySeasonality: false,
  weeklySeasonality: false,
  dailySeasonality: false,
  orderP: 1,
  orderD: 1,
  orderQ: 1,
  trend: { value: 't', label: 'linear' },
  growth: 'linear',
};

export const metricFilterOperator = [
  {
    value: '=',
    label: 'Equal to (=)',
  },
  {
    value: '<>',
    label: 'Not equal to (!=)',
  },
  {
    value: '<',
    label: 'Less than (<)',
  },
  {
    value: '<=',
    label: 'Less or equal (<=)',
  },
  {
    value: '>',
    label: 'Greater than (>)',
  },
  {
    value: '>=',
    label: 'Greater or equal (>=)',
  },
];
export const operatorList = [
  {
    value: '=',
    label: 'Equal to (=)',
  },
  {
    value: '<>',
    label: 'Not equal to (!=)',
  },
  {
    value: '<',
    label: 'Less than (<)',
  },
  {
    value: '<=',
    label: 'Less or equal (<=)',
  },
  {
    value: '>',
    label: 'Greater than (>)',
  },
  {
    value: '>=',
    label: 'Greater or equal (>=)',
  },
  {
    value: 'IN',
    label: 'In',
  },
  {
    value: 'NOT IN',
    label: 'Not in',
  },
  {
    value: 'LIKE',
    label: 'Like (case sensitive)',
  },
  {
    value: 'REGEX',
    label: 'Regex',
  },
  {
    value: 'IS NOT NULL',
    label: 'Is not null',
  },
  {
    value: 'IS NULL',
    label: 'Is null',
  },
];

export const RELATION_OPERATOR_LIST = [
  { value: 'AND', label: 'AND' },
  { label: 'OR', value: 'OR' },
];

export const STRING_OPERATOR_LIST = [
  {
    value: '=',
    label: 'Equal to (=)',
  },
  {
    value: '<>',
    label: 'Not equal to (!=)',
  },
  {
    value: 'IN',
    label: 'In',
  },
  {
    value: 'NOT IN',
    label: 'Not in',
  },
  {
    value: 'LIKE',
    label: 'Like (case sensitive)',
  },
  {
    value: 'REGEX',
    label: 'Regex',
  },
  {
    value: 'IS NOT NULL',
    label: 'Is not null',
  },
  {
    value: 'IS NULL',
    label: 'Is null',
  },
];

export const NUMBER_OPERATOR_LIST = [
  {
    value: '=',
    label: 'Equal to (=)',
  },
  {
    value: '<>',
    label: 'Not equal to (!=)',
  },
  {
    value: '<',
    label: 'Less than (<)',
  },
  {
    value: '<=',
    label: 'Less or equal (<=)',
  },
  {
    value: '>',
    label: 'Greater than (>)',
  },
  {
    value: '>=',
    label: 'Greater or equal (>=)',
  },
  {
    value: 'IN',
    label: 'In',
  },
  {
    value: 'NOT IN',
    label: 'Not in',
  },
  {
    value: 'IS NOT NULL',
    label: 'Is not null',
  },
  {
    value: 'IS NULL',
    label: 'Is null',
  },
];
export const TIME_OPERATOR_LIST = [
  {
    value: '=',
    label: 'Equal to (=)',
  },
  {
    value: '<>',
    label: 'Not equal to (!=)',
  },
  {
    value: '<',
    label: 'Less than (<)',
  },
  {
    value: '<=',
    label: 'Less or equal (<=)',
  },
  {
    value: '>',
    label: 'Greater than (>)',
  },
  {
    value: '>=',
    label: 'Greater or equal (>=)',
  },
  {
    value: 'IN',
    label: 'In',
  },
  {
    value: 'NOT IN',
    label: 'Not in',
  },
  {
    value: 'IS NOT NULL',
    label: 'Is not null',
  },
  {
    value: 'IS NULL',
    label: 'Is null',
  },
];
export const AggregateList = [
  { value: 'ALL', label: 'COUNT ROW' },
  { value: 'AVG', label: 'AVG' },
  { value: 'SUM', label: 'SUM' },
  { value: 'COUNT', label: 'COUNT' },
  { value: 'COUNT_DISTINCT', label: 'COUNT_DISTINCT' },
  { value: 'MAX', label: 'MAX' },
  { value: 'MIN', label: 'MIN' },
];
export const SORT_TYPE = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];
export const configTabs = ['saved', 'simple', 'custom'];
export const DATABRAIN_DOMAINS = [
  'demo.usedatabrain.com',
  'app.usedatabrain.com',
  'uat.usedatabrain.com',
  'uat1.usedatabrain.com',
  'usedatabrain.com',
];

export const DEFAULT_CREATE_DATSET_METRIC_CONFIG: DatasetMetricCreationConfiguration =
  {
    aggregates: [],
    dimensions: [],
    filters: [],
    isEnableDrill: false,
    limit: '100',
    orders: [],
    table: { name: '', alias: '', id: '', joins: [], schema: '' },
    forecast: DEFAULT_FORECAST_VALUES,
    groupByColumnList: [],
    isAllClient: false,
    rlsConditions: [],
  };
export const JOIN_TYPES = [
  { value: 'INNER JOIN', label: 'Inner Join', icon: 'inner-join' },
  { value: 'LEFT JOIN', label: 'Left Join', icon: 'left-join' },
  { value: 'RIGHT JOIN', label: 'Right Join', icon: 'right-join' },
  { value: 'FULL JOIN', label: 'Full Join', icon: 'link' },
];

export const JOIN_CONDITION_OPERATOR = [
  {
    value: '=',
    label: 'Equal to (=)',
  },
  {
    value: '<>',
    label: 'Not equal to (!=)',
  },
  {
    value: '<',
    label: 'Less than (<)',
  },
  {
    value: '<=',
    label: 'Less or equal (<=)',
  },
  {
    value: '>',
    label: 'Greater than (>)',
  },
  {
    value: '>=',
    label: 'Greater or equal (>=)',
  },
];
export const DEFAULT_CLICK_ACTION_CONFIG: types.ClickActionsConfig = {
  card: {
    isEnable: false,
    baseUrl: '',
    dynamic: 'none',
    route: '',
    routeType: 'internal',
  },
  chart: {
    isEnable: false,
    baseUrl: '',
    dynamic: '{{value}}',
    route: '/{{value}}',
    routeType: 'internal',
  },
};

export const DATE_TYPES = [
  'timestamp_ltz',
  'date',
  'timestamp',
  'timestamp without time zone',
  'timestamp with time zone',
  'datetime',
];

export const RE_DIRECT_ROUTE_TYPE = [
  {
    value: 'internal',
    label: 'Re-direct to internal route',
  },
  {
    value: 'external',
    label: 'Re-direct to external website',
  },
];

export const SUB_ROUTE = [
  {
    value: 'metricid',
    label: 'metricid',
  },
  {
    value: 'uuid',
    label: 'uuid',
  },
  {
    value: 'none',
    label: 'none',
  },
];

export const TimeOptions = [
  { value: 'Day', label: 'Day' },
  { value: 'Week', label: 'Week' },
  { value: 'Month', label: 'Month' },
  { value: 'Quarter', label: 'Quarter' },
  { value: 'Year', label: 'Year' },
];
export const RangeOptions = [
  { value: 'Last', label: 'Last' },
  { value: 'This', label: 'This' },
  { value: 'Custom', label: 'Custom Range' },
  { value: 'Custom Date', label: 'Custom Date' },
  { value: 'Date Range', label: 'Date Range' },
];

export const MANUAL = 'manual';
export const GUEST_TOKEN = 'guest_token';
export const FILTERS = 'filters';
export const NEXT = 'Next';
export const SAVE = 'Save';
export const EDIT = 'Edit';
export const FILTER = 'filter';
export const APPLY = 'apply';
export const CONFI_OPTION_ALERT = 'Configure options for filter';
export const FILTER_TYPE = 'filterType';
export const AUTO = 'auto';
export const NAME = 'name';
export const LABEL_COL = 'labelColumnName';
export const CUSTOM_LABEL_COL = 'customLabelCol';
export const IS_CLIENT_SCOPED = 'isClientScoped';
export const CLIENT_COLUMN = 'clientColumn';
export const CLIENT_COLUMN_TYPE = 'clientColumnType';
export const DEFAULT_VALUE = 'defaultValue';
export const DEPEND_ON = 'dependOn';
export const REMOVE_OPTION = 'remove option';
export const CUSTOM = 'custom';
export const QUERY = 'query';
export const COLUMN_NAME_VALUE = 'columnName';
export const IS_VARIABLE_FILTER = 'isVariableFilter';
export const VARIABLE_FILTER = 'variableFilter';
export const FILTER_VARIANT = 'filterVariant';
export const ShadowOptions = [
  { label: 'None', value: '0' },
  { label: 'Small', value: '0px 2px 4px rgba(0, 0, 0, 0.5)' },
  { label: 'Medium', value: '0px 4px 8px rgba(0, 0, 0, 0.5)' },
  { label: 'Large', value: '0px 8px 16px rgba(0, 0, 0, 0.5)' },
];
export const FontWeightOptions = [
  { label: 'Light', value: 'lighter' },
  { label: 'Regular', value: 'normal' },
  { label: 'Semi-bold', value: '500' },
  { label: 'Bold', value: 'bold' },
  { label: 'Extra-bold', value: 'bolder' },
];

export const SizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

export const Variants = [
  { label: 'Floating', value: 'floating' },
  { label: 'Static', value: 'static' },
];

export const RadiusOptions = [
  { label: 'None', unitValue: '0', value: '0' },
  { label: 'Small', unitValue: '6px', value: '6' },
  { label: 'Medium', unitValue: '16px', value: '16' },
  { label: 'Large', unitValue: '26px', value: '26' },
];

export const CreatorModes = [
  { label: 'Power Mode', value: 'DRAG_DROP' },
  { label: 'Light Weight Mode', value: 'POINT_CLICK' },
];
