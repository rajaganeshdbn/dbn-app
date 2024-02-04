import { types } from '@databrainhq/plugin';
import { CurrentMetricFilter } from 'types/metric';
import { metricFilterOperator } from './values';

export const TOKEN = '@app:token';
export const USER = '@app:user';
export const WORKSPACE = '@app:workspace';
export const HIDDEN_MAIN_SIDEBAR_ROUTES = [
  '/metric/',
  '/dataModel/new',
  '/dataModel/preview/',
  '/metric/new',
  '/externalMetric',
  '/connection/',
  '/onboarding',
  '/embedDashboards',
  '/externalDashboard',
  '/createMetric',
  '/externalDataset',
  '/playground',
];
export const NUMBER_TYPES = [
  'fixed',
  'real',
  'int',
  'bigint',
  'float',
  'number',
  'integer',
  'int64',
  'float64',
  'double precision',
  'smallint',
];
export const STRING_TYPES = [
  'varchar',
  'text',
  'char',
  'text',
  'character(36)',
  'string',
];
export const DATE_TYPES = [
  'timestamp_ltz',
  'date',
  'timestamp',
  'timestamp without time zone',
  'timestamp with time zone',
  'datetime',
];
export const ARRAY_TYPES = ['array', 'text[]'];
export const BOOLEAN_TYPES = ['boolean', 'bool'];
export const CAST_AS_LIST = [
  { value: 'string', label: 'string' },
  { value: 'date', label: 'date' },
  { value: 'number', label: 'number' },
  { value: 'default', label: 'default' },
  { value: 'boolean', label: 'boolean' },
];

export const DATATYPES = [
  { value: 'string', label: 'string' },
  { value: 'date', label: 'date' },
  { value: 'number', label: 'number' },
  { value: 'boolean', label: 'boolean' },
];

export const FILTER_TYPE: types.FloatingDropDownOption[] = [
  {
    value: 'manual',
    label: 'Manual',
    subValue: 'Manually define options for filtering',
  },
  {
    value: 'auto',
    label: 'Auto',
    subValue: 'Automatically select the columns from the provided table',
  },
  {
    value: 'guest_token',
    label: 'Guest Token',
    subValue: 'Use guest token values for filtering',
  },
  {
    value: 'custom',
    label: 'Custom',
    subValue: 'Custom filter options via SQL queries',
  },
];
export const STRING_FILTER_VARIANT: types.FloatingDropDownOption[] = [
  { value: '=', label: 'Select', icon: '' },
  { value: 'IN', label: 'Multi Select', icon: '' },
  { value: 'like', label: 'Search', icon: '' },
];

export const GLOBAL_FILTER_TYPE = [
  { value: 'manual', label: 'Manual' },
  { value: 'auto', label: 'Auto' },
  { value: 'custom', label: 'Custom' },
];

export const TABLE = 'TABLE';
export const DATABASE = 'DATABASE';
export const DateFilterOptions = [
  'This Month By Week',
  'This Month By Date',
  'Last Month By Week',
  'Last Month By Date',
  'This Year By Quarter',
  'This Year By Months',
  'This Quarter By Month',
  'Last Quarter By Month',
  'Last 6 Months',
  'Last Year By Quarter',
  'Last Year By Month',
  'This Week By Day',
  'Last Week By Day',
  'Yesterday',
  'Today',
];

export const EXPIRY_TIME = [
  {
    value: '1800000',
    label: '30 mins',
  },
  {
    value: '3600000',
    label: '1 hr',
  },
  {
    value: '86400000',
    label: '1 day',
  },
  {
    value: '2592000000',
    label: '30 days',
  },
  {
    value: '31536000000',
    label: '1 year',
  },
];

export const ELASTICSEARCH = 'elasticsearch';
export const REDSHIFT = 'redshift';
export const SNOWFLAKE = 'snowflake';
export const BIGQUERY = 'bigquery';
export const MYSQL = 'mysql';
export const POSTGRES = 'postgres';
export const MONGODB = 'mongodb';
export const DATABRICKS = 'databricks';
export const CLICKHOUSE = 'clickhouse';
export const POSTGRESQL = 'postgresql';
export const MSSQL = 'mssql';
export const AWSS3 = 'awss3';

export const INTEGRATION_LABEL: Record<string, string> = {
  BIGQUERY: 'BigQuery',
  REDSHIFT: 'Redshift',
  SNOWFLAKE: 'Snowflake',
  MYSQL: 'MySQL',
  POSTGRES: 'PostgreSQL',
  MONGODB: 'MongoDB',
  DATABRICKS: 'Databricks',
  CLICKHOUSE: 'ClickHouse',
  MSSQL: 'MSSQL',
  ELASTICSEARCH: 'Elasticsearch',
  AWSS3: 'AwsS3',
};

/**
 * Key will be used for comparison and database purpose
 * Label will be used for display text in UI
 * Permissions will be used to display and database purpose both so be careful
 */
export const FEATURE_PERMISSIONS = {
  workspace: {
    label: 'Workspace',
    permissions: ['Create', 'Edit', 'Delete', 'Settings'],
  },
  accessPermissions: {
    label: 'Access Permissions',
    permissions: [
      'View',
      'Edit',
      'Metric Creation',
      'Metric Updation',
      'Customize Layout',
      'Archive Metrics',
      'Schedule Reports',
    ],
  },
  cacheSettings: {
    label: 'Cache Settings',
    permissions: ['View', 'Edit', 'Connect'],
  },
  downloadSettings: {
    label: 'Download Settings',
    permissions: ['View', 'Edit'],
  },
  generalSettings: {
    label: 'General Settings',
    permissions: ['View', 'Creator Mode', 'Theme Settings'],
  },
  dashboard: {
    label: 'Dashboard',
    permissions: [
      'Create',
      'Edit',
      'Delete',
      'Manage Metrics',
      'Share',
      'Change Layout',
      'Set Default Client',
    ],
  },
  dashboardFilters: {
    label: 'Dashboard Filters',
    permissions: ['Create', 'Edit', 'Delete'],
  },
  fullscreen: {
    label: 'Fullscreen',
    permissions: [
      'View',
      'Preview Results',
      'Download Table Results',
      'Download Raw CSV',
      'Email CSV',
      'Save PNG',
    ],
  },
  metric: {
    label: 'Metric',
    permissions: ['Create', 'Edit', 'Delete', 'Archive', 'Clone', 'Auto Save'],
  },
  rowsAndColumns: {
    label: 'Rows And Columns',
    permissions: [
      'View Aggregate',
      'Select Aggregate',
      'View Custom SQL',
      'Edit Custom SQL',
    ],
  },
  sql: {
    label: 'Custom SQL',
    permissions: ['View', 'Edit'],
  },
  joins: {
    label: 'Joins',
    permissions: ['View', 'Create', 'Edit', 'Delete'],
  },
  filters: {
    label: 'Filters',
    permissions: [
      'View',
      'Create All',
      'Create Simple Filters',
      'Create Complex Filters',
      'Create Client Filters',
      'Edit',
      'Delete',
    ],
  },
  sorts: {
    label: 'Sort',
    permissions: ['View', 'Create', 'Edit', 'Delete'],
  },
  groupby: {
    label: 'Group By',
    permissions: ['View', 'Edit'],
  },
  appearance: {
    label: 'Chart Appearance',
    permissions: ['View', 'Edit'],
  },
  actions: {
    label: 'Chart Actions',
    permissions: ['View', 'Edit'],
  },
  chartClickAction: {
    label: 'Chart Click Action',
    permissions: ['View', 'Edit', 'Enable/Disable'],
  },
  cardClickAction: {
    label: 'Card Click Action',
    permissions: ['View', 'Edit', 'Enable/Disable'],
  },
  groupXAxis: {
    label: 'Group X-Axis',
    permissions: ['View', 'Edit', 'Enable/Disable'],
  },
  switchAxis: {
    label: 'Switch Axis',
    permissions: ['View', 'Edit', 'Enable/Disable'],
  },
  groupbyAxis: {
    label: 'Group By Chart Axis',
    permissions: ['View', 'Edit', 'Dynamic Options', 'Enable/Disable'],
  },
  drilldown: {
    label: 'Drilldown',
    permissions: ['View', 'Edit', 'Cross Filter Dashboard', 'Enable/Disable'],
  },
  forcast: {
    label: 'Forcast',
    permissions: ['View', 'Edit', 'Enable/Disable'],
  },
  dataSecuritySettings: {
    label: 'Data Security Settings',
    permissions: ['View', 'Edit'],
  },
  versionHistory: {
    label: 'Version History',
    permissions: ['View', 'Switch'],
  },
  metricFilters: {
    label: 'Metric Filters',
    permissions: [
      'View',
      'Create',
      'Edit',
      'Delete',
      'App Filters',
      'Manual Options',
      'Variable Filter',
    ],
  },
  python: {
    label: 'Python Editor',
    permissions: ['View', 'Edit'],
  },
  customDatasets: {
    label: 'Custom Datasets',
    permissions: ['View', 'Create', 'Edit', 'Delete'],
  },
  datasources: {
    label: 'Datasources',
    permissions: [
      'View',
      'Connect',
      'Sync',
      'Delete',
      'Edit Credentials',
      'Edit Tenancy Level',
      'Enable/Disable',
    ],
  },
  companyProfile: {
    label: 'Company Profile',
    permissions: ['View', 'Edit'],
  },
  users: {
    label: 'Users',
    permissions: ['View', 'Invite', 'Edit', 'Delete'],
  },
  metricsStore: {
    label: 'Metrics Store',
    permissions: ['View', 'Publish', 'Delete'],
  },
  archiveMetrics: {
    label: 'Archive Metrics',
    permissions: ['View', 'Unarchive', 'Delete', 'View Client Metrics'],
  },
  roles: {
    label: 'Roles',
    permissions: ['View', 'Create', 'Edit', 'Delete'],
  },
  secrets: {
    label: 'Secrets',
    permissions: ['View', 'Create', 'Edit', 'Delete'],
  },
  scheduledSettings: {
    label: 'Scheduled Settings',
    permissions: ['View', 'Edit', 'Delete'],
  },
  uiTheming: {
    label: 'UI Theming',
    permissions: ['View', 'Create', 'Edit', 'Delete', 'Mark Default'],
  },
  demoConfig: {
    label: 'Demo Config',
    permissions: ['View', 'Edit', 'Delete'],
  },
  apiTokens: {
    label: 'API Tokens',
    permissions: ['View', 'Create', 'Edit', 'Copy', 'Delete'],
  },
  whitelistedDomains: {
    label: 'Whitelisted Domains',
    permissions: ['View', 'Edit', 'Delete'],
  },
} as const;
export const COMPANY_SPECIFIC_FEATURES = [
  'whitelistedDomains',
  'apiTokens',
  'demoConfig',
  'uiTheming',
  'secrets',
  'roles',
  'companyProfile',
  'users',
];
export const DEFAULT_DATE_OPTION = {
  count: 0,
  format: 'Day',
  name: 'This Year',
  range: 'This',
  time: 'Year',
  id: '0',
};
export const DEFAULT_NEW_FILTER: CurrentMetricFilter = {
  name: '',
  filterType: FILTER_TYPE[0],
  selectedTable: { value: '', label: '' },
  selectedColumn: { value: '', label: '' },
  selectedLabelColumn: { value: '', label: '' },
  selectedOptionColumn: { value: '', label: '' },
  selectedOptionTable: { value: '', label: '' },
  clientColumn: { value: '', label: '' },
  clientColumnDatatype: { value: 'string', label: 'string' },
  datatype: DATATYPES[0],
  isClientScopedOption: false,
  isAppFilter: false,
  stringOptions: [],
  numberOptions: [0],
  dateOptions: [DEFAULT_DATE_OPTION],
  isVariableFilter: false,
  isAddOnMetrics: true,
  variableStrings: [''],
  applyOnColumns: [],
  comparisonOperator: metricFilterOperator[0],
};

export const STAGING = 'staging';
export const DRAGDROP = 'DRAG_DROP';
export const POINTCLICK = 'POINT_CLICK';

export const SIGNUP_RES_CODE = {
  INVALID_REQUEST_BODY: 'INVALID REQUEST BODY',
  USER_EXISTS: 'USER_EXISTS',
  COMPANY_EXISTS: 'COMPANY_EXISTS',
  INVALID_DOMAIN: 'INVALID DOMAIN',
  INVITE_REQUEST_SENT: 'INVITE REQUEST SENT',
  VERIFICATION_REQUEST_SENT: 'VERIFICATION REQUEST SENT',
  SIGNUP_SUCCEEDED: 'SIGNUP SUCCEEDED',
  INVALID_EMAIL_ADDRESS: 'INVALID EMAIL ADDRESS',
  INTERNAL_SERVER_ERROR: 'INTERNAL SERVER ERROR',
  INVALID_TOKEN: 'INVALID TOKEN',
  CREATE_USER_ERROR: 'CREATE USER ERROR',
};

export const SIGNUP_RES_MESSAGE = {
  SIGNUP_SUCCEEDED: 'Signup successful. Welcome aboard!',
};
export const DEFAULTCOLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];
