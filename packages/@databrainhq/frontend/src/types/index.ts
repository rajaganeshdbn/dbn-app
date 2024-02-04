import { types } from '@databrainhq/plugin';
import type { ReactNode } from 'react';
import {
  MetricVersions,
  UserRoles,
  CompanyRoles,
  CompanyWorkspaces,
  CompanyIntegrations,
} from 'utils/generated/graphql';
import { FEATURE_PERMISSIONS } from 'consts/application';
import { TableColumn, TableType } from 'hooks/useCompanySchema';
import {
  CreateNewFilter,
  CreateNewSort,
  DatasetMetricCreationConfiguration,
  DraggableMetricItemData,
  SelectedJoin,
} from './metric';

export type ChildrenProps = {
  children: ReactNode;
};

export type LegendSettings = {
  show: boolean;
  top: number;
  bottom: number;
  left: number;
  right: number;
  position: string;
};

export type CustomSettings = {
  hideSplitLines: string;
  hideAxisLines: string;
  barWidth: number;
  barRadius: number;
  axisLabels: string;
};

export type TableSettings = {
  contentAlignment: string;
  lineGap: string;
  hideVerticalDivider: boolean;
  enableStripedRows: boolean;
  showRowHover: boolean;
  showTableTitle: boolean;
  showTableDesc: boolean;
  enableTableSearch: boolean;
  enableFilter: boolean;
  enableSorting: boolean;
};

export type BackgroundSettings = {
  show: boolean;
};

export type LabelSettings = {
  axis: string;
  show: boolean;
  position: string;
};

export type AxisSettings = {
  axis: string;
};

export type SelectedColumns = {
  column: string;
  datatype: string;
  schemaName: string;
  tableName: string;
};

export type GlobalFiltersDefaultValue =
  | string[]
  | string
  | number
  | number[]
  | {
      startDate: Date | undefined;
      endDate: Date | undefined;
      timeGrainValue: string;
      value: string;
    }
  | undefined
  | {
      min: number | null;
      max: number | null;
    }
  | types.FloatingDropDownOption[];
export type Schema = {
  id: string;
  schemaName: string;
  tableName: string;
  columns: string[];
  columnsWithDataType: {
    as: any;
    dataType: string;
    name: string;
    isDefault?: boolean;
    label?: string;
    isShowHorizontal?: boolean;
    defaultValue?: GlobalFiltersDefaultValue;
    isClientScoped?: boolean;
    clientColumn?: string;
    clientColumnType?: string;
    isManualOptions?: boolean;
    manualOptions?: string[];
    dependOn?: types.FloatingDropDownOption[];
  }[];
};

export type RlsFilterObjectType = {
  columnName: string;
  condition: string;
  createdAt: any;
  defaultValue?: string | null | undefined;
  value?: string;
  id: any;
  name: string;
  tableName: string;
  operator?: string | 'and' | 'or';
  user: {
    id: any;
    firstName: string;
    lastName: string;
  };
};

export type SelectedTable =
  | {
      tableName: string;
      columns: { name: string; datatype: string; as: string }[] | [];
      clientColumn: string;
      type?: string;
    }[]
  | [];

export type GroupBy = {
  column: string;
  parentColumn?: { column: string; value: string };
};

export type JoinField = {
  a: string;
  b: string;
};

export type SqlError = {
  errorMessage: string;
  explanation: string;
  solution: string;
};

export type RlsCondition = {
  name: string;
  columnName: string;
  tableName: string;
  datatype: string;
  isAddOnMetrics: boolean;
  options: string[] | number[];
  value?: string | string[];
};

export type MetricData = {
  id: string;
  name: string;
  dashboards: { name: string; id: string }[];
  description: string;
  createdBy: string;
  dateCreated: string;
};

export type ChartActions = {
  card: {
    isEnable: boolean;
    baseUrl: string;
    dynamic: string;
    route: string;
    routeType: string;
  };
  chart: {
    isEnable: boolean;
    baseUrl: string;
    dynamic: string;
    route: string;
    routeType: string;
  };
};

export type TimeFilterParams = {
  timeColumn: string;
  data: Record<string, any>[];
  dimensionColumn: string;
  measureColumn: string;
  filterBy:
    | 'This Month By Week'
    | 'This Month By Date'
    | 'Last Month By Week'
    | 'Last Month By Date'
    | 'This Year By Quarter'
    | 'This Year By Months'
    | 'This Quarter By Month'
    | 'Last Quarter By Month'
    | 'Last 6 Months'
    | 'Last 12 Months'
    | 'Last Year By Quarter'
    | 'Last Year By Month'
    | 'This Week By Day'
    | 'Yesterday'
    | 'Today';
};

export type DateOptionType = {
  id: string;
  range: string;
  time: string;
  format: string;
  name: string;
  count: number;
  startDate?: Date;
  endDate?: Date;
};

export type MetricVersionAtomType = {
  id: string;
  versions: Omit<MetricVersions, 'externalMetric' | 'externalMetrics'>[];
  current: number;
  latest: number;
  currentVersionData?: Omit<
    MetricVersions,
    'externalMetric' | 'externalMetrics'
  >;
};

export type WorkspaceType = Pick<
  CompanyWorkspaces,
  | 'companyId'
  | 'id'
  | 'name'
  | 'tenancyLevel'
  | 'description'
  | '__typename'
  | 'creatorMode'
> & { companyIntegrations?: Pick<CompanyIntegrations, 'id'>[] };

export type MetricsValue = {
  value: string;
  as: string;
  isAggregate?: boolean;
  isDimension?: boolean;
  isFilter?: boolean;
};
export type ForcastType = {
  isEnable: boolean;
  forecastPeriods: number;
  modelName: string;
  confidenceInterval: number;
  timeColumnName: string;
  measureColumnName: string;
  timeGrain: string;
  yearlySeasonality: boolean;
  weeklySeasonality: boolean;
  dailySeasonality: boolean;
  orderP: number;
  orderD: number;
  orderQ: number;
  trend: { value: string; label: string };
  growth: string;
};

export type SelectedColumn = {
  name: string;
  datatype: string;
  table?: TableType;
  alias: string;
  parentAlias: string;
  helperFunction?: string;
  type: 'DEFAULT' | 'HELPER_FUNCTION' | 'CUSTOM' | 'PYTHON';
  index?: number;
  configType: 'DIMENSION' | 'AGGREGATE';
  dropType?: 'METRIC' | 'DIMENSION';
  sql?: string;
  draggableItemData?: DraggableMetricItemData;
  functionConfiguration?: { dateFormat?: string };
};
export type NewDatasetSettings = {
  type?: 'NEW';
  selectedDims?: types.SelectedColumn[];
  selectedMainTable?: TableType;
  selectedMetrics?: types.SelectedColumn[];
  selectedGroupBy?: types.SelectedColumn[];
  metrics: MetricsValue[];
  selectedDimensions: string[];
  configuration?: DatasetMetricCreationConfiguration;
  sqlColumnList?: TableColumn[];
  isSqlMode?: boolean;
  subQuery?: string;
  isPythonMode?: boolean;
  pythonCode?: string;
  isAutoCompleteMode?: boolean;
  selectedAutoCompleteColumns?: types.SelectedColumn[];
};
export type DatasetSettings = {
  timeColumn: types.FloatingDropDownOption;
  timeGrainValue: string;
  metrics: MetricsValue[];
  selectedDimensions: string[];
  isIncludeTime: boolean;
  clientColumn: types.FloatingDropDownOption;
  customColumnList: MetricsValue[];
  timeGrainVal: types.FloatingDropDownOption;
  comparisonLag: number;
  forecast?: ForcastType;
  configuration?: DatasetMetricCreationConfiguration;
  isNewDataset: boolean;
  selectedManageColumns?: types.FloatingDropDownOption[];
  selectedGroupColumns?: types.FloatingDropDownOption[];
  selectedNewManageColumns?: types.FloatingDropDownOption[];
  selectedCustomColumns?: MetricsValue[];
  selectedCustomGroups?: MetricsValue[];
  createdNewColumnOptions?: types.FloatingDropDownOption[];
  createdFilters: CreateNewFilter[];
  createdSorts: CreateNewSort[];
  comparisonLagSettings: types.ComparisonLagSettings;
  selectedJoins: SelectedJoin[];
  selectedTable: types.FloatingDropDownOption;
  newDatasetSettings?: NewDatasetSettings;
};
export type GetIsCanAccessParams = {
  [T in keyof typeof FEATURE_PERMISSIONS]: (typeof FEATURE_PERMISSIONS)[T]['permissions'];
};
export type RolesAtomType = {
  companyRoles?: Pick<
    CompanyRoles,
    'id' | 'name' | 'permissions' | 'description' | 'companyId'
  >[];
  isViewMode: boolean;
  viewAsRoles?: (Pick<UserRoles, 'applyOn' | 'companyRoleId' | 'workspaces'> & {
    companyRole: Pick<CompanyRoles, 'id' | 'name' | 'permissions'>;
  })[];
};

export type FilterValueType =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | Record<string, any>;
