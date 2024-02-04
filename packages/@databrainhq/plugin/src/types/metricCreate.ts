/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';
import { FieldValues } from 'react-hook-form';
import {
  RlsCondition,
  FloatingDropDownOption,
  ChartSettingsType,
  TableColumn,
  PivotDrillState,
} from '@/types';
import { ExternalMetrics } from '@/types/queryTypes';
import { MetricCardProps } from '@/components';

type ColumnData = { name: string; datatype: string; as: string };

export type EmbeddedMetricCreationProps = {
  clientId: string;
  companyId: string;
  isLiveMode: boolean;
  externalDashboardId: string;
  userProvidedDashboardId: string;
  variant?: 'static' | 'floating';
  chartColors?: string[];
  setShowMetricCreateModal: Dispatch<SetStateAction<boolean>>;
  isShowMetricCreateModal: boolean;
  metric?: ExternalMetrics;
  metricData?: Record<string, any>[];
  workspaceId: string;
};

export type HeaderProps = {
  heading: string;
  setShowMetricCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDisableSaveBtn: boolean;
  setShowSaveMetricModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DatasetProps = {
  setselectTable: React.Dispatch<React.SetStateAction<FloatingDropDownOption>>;
  selectTable: FloatingDropDownOption;
  tableList: FloatingDropDownOption[];
  columnList: FloatingDropDownOption[];
  column: FloatingDropDownOption;
  setColumn: React.Dispatch<React.SetStateAction<FloatingDropDownOption[]>>;
  onChangeTableSelection: (table: string) => void;
  metrics: {
    value: string;
    label: string;
  }[];
  setMetrics: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
};
export type MetricsValue = {
  value: string;
  as: string;
};

export type CustomTableObject = {
  tableName: string;
  columns: { name: string; as: string; datatype: string }[];
  clientColumn: string;
};
export type TableObjectType = {
  id: string;
  columns: string[];
  companyId: string;
  tableName: string;
  schemaName: string;
  recentUpdatedAt: number;
  columnsWithDataType: TableColumn[];
  type?: string;
  alias?: string;
  sql?: string;
  clientColumn?: string;
};
export type AiQueryType = {
  prompt: string;
  values: FieldValues;
  onSuccess: () => void;
};
export type DraggableMetricItemData = {
  table: TableObjectType;
  column: TableColumn;
};
export type SetChartFieldParams = {
  chartMetrics?: string[];
  chartDimensions?: string[];
  chartAggregateColumns?: string[];
  chartType?: ChartSettingsType['chartType'];
  configAggregates?: Aggregate[];
};
export type CastColumn = 'integer' | 'decimal' | 'date';
export type SelectedColumn = {
  name: string;
  datatype: string;
  table: TableObjectType;
  alias: string;
  parentAlias: string;
  helperFunction?: string;
  type: 'DEFAULT' | 'HELPER_FUNCTION' | 'CUSTOM' | 'PYTHON' | 'ARITHMETIC';
  index: number;
  configType: 'DIMENSION' | 'AGGREGATE' | 'FILTER';
  dropType: 'METRIC' | 'DIMENSION' | 'FILTER';
  sql: string;
  functionConfiguration?: { dateFormat?: string };
  synonyms?: string[];
  sortType?: 'ASC' | 'DESC';
  limit?: number;
  filterMethod?: string;
  filterType?:
    | 'custom'
    | 'default'
    | 'agr'
    | 'dimension'
    | 'time'
    | 'client'
    | 'rls_filter';
  filterValue?: {
    stringValue?: string;
    numberValue?: number;
    stringArray?: string[];
    numberArray?: number[];
    timeValue?: { startDate: string; endDate: string; timeFilter: string };
  };
  relationOperator?: 'AND' | 'OR';
  draggableItemData: DraggableMetricItemData;
  keyword?: string;
  cast?: FloatingDropDownOption;
  arithmeticConfig?: {
    firstOperand: SelectedColumn;
    secondOperand: SelectedColumn;
    operator: FloatingDropDownOption;
  };
};

export type SelectedFilter = {
  method: string;
  alias: string;
  parentAlias: string;
  type:
    | 'custom'
    | 'default'
    | 'agr'
    | 'dimension'
    | 'time'
    | 'client'
    | 'rls_filter';
  dataType: string;
  value: {
    stringValue?: string;
    numberValue?: number;
    stringArray?: string[];
    numberArray?: number[];
    timeValue?: { startDate: string; endDate: string; timeFilter: string };
  };
  relationOperator?: 'AND' | 'OR';
  sql: string;
  name: string;
  table: TableObjectType;
  draggableItemData: DraggableMetricItemData;
  filterSynonmns?: string[];
  keyword?: string;
};
export type DatasetSettings = {
  timeColumn: FloatingDropDownOption;
  timeGrainValue: string;
  columns: MetricsValue[];
  metrics: MetricsValue[];
  selectedDimensions: string[];
  filters: string[];
  sort: string;
  isIncludeTime: boolean;
  isSortDescending: boolean;
  selectTable: FloatingDropDownOption;
  clientColumn: FloatingDropDownOption;
  customColumnList: MetricsValue[];
};
export type ConstructMetricProps = {
  columnList: FloatingDropDownOption[];
  dateTimeColumnList: ColumnData[];
  companyId: string;
  tableName: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  database: string;
  clientId: string;
  clientColumn?: string;
  databaseId: string;
  datasetSettings?: DatasetSettings;
  setDatasetSettings?: React.Dispatch<
    React.SetStateAction<DatasetSettings | undefined>
  >;
  setGroupByList: React.Dispatch<React.SetStateAction<string[]>>;
};

export type MetricOutputProps = {
  data: any[] | undefined;
  isUpdateMetric?: boolean;
  query?: string;
  error: string;
  clientName?: string;
  isLoading: boolean;
  isEnablePivotTable: boolean;
  isEnableGauge: boolean;
  groupbyList: any[];
  hasNumberKeys: boolean;
  metrics: FloatingDropDownOption[];
  dimensions: FloatingDropDownOption[];
  configuration: DatasetMetricCreationConfiguration;
  functionOptions: (col: any) => {
    value: string;
    label: string;
  }[];
  onGenerateChart: ({
    param,
    metricParams,
    dimensionParams,
  }: {
    param?: DatasetMetricCreationConfiguration | undefined;
    metricParams?: FloatingDropDownOption[] | undefined;
    dimensionParams?: FloatingDropDownOption[] | undefined;
  }) => void;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  setData?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  isEnableSingleDimension?: boolean;
  isEnableSingleMetrics?: boolean;
  destinationId?: string;
  outputHeaderProps: {
    setShowChartCustomProperties: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChartType: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSortPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  };
  dbName?: string;
  previewTableDataList: any[] | undefined;
  enableQueryTab?: boolean;
  rlsConditions?: RlsCondition[] | undefined;
  onChangeFilterValue?: (name: string, value: string) => void;
  moreTabs?: {
    name: string;
    tab: JSX.Element;
    tabContent: JSX.Element;
  }[];
  chartColors?: string[];
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  isDisableSqlBtn: boolean;
  setShowSqlModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMetrics: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
  setColumn: React.Dispatch<React.SetStateAction<FloatingDropDownOption[]>>;
  pivotDrillState: PivotDrillState;
};

export type CompanyIntegration =
  | {
      id: string;
      name: string;
    }
  | undefined;

export type ClickActionsConfig = {
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

export type DrillDownSetting = {
  selectedMeasures: string[];
  selectedDimensions: string[];
  isEnableGroupBy: boolean;
};

export type ComparisonLagSettings = {
  column: FloatingDropDownOption;
  timeGrain: FloatingDropDownOption;
  periodLag: number;
};

export type CreatedNewColumn = {
  columnName: FloatingDropDownOption;
  function: FloatingDropDownOption;
  alias: string;
};

export type SelectedJoin = {
  tableName: FloatingDropDownOption;
  conditions: {
    firstOperand: FloatingDropDownOption;
    secondOperand: FloatingDropDownOption;
    operator: FloatingDropDownOption;
  }[];
  joinType: FloatingDropDownOption;
};
export type CreateNewFilter = {
  tableName: FloatingDropDownOption;
  columnName: FloatingDropDownOption;
  operator: FloatingDropDownOption;
  value: {
    stringValue?: string;
    numberValue?: number;
    stringArray?: string[];
    numberArray?: number[];
    timeValue?: { startDate: string; endDate: string; timeFilter: string };
  };
  relationOperator?: FloatingDropDownOption;
  type: 'custom' | 'default' | 'client';
  sql: string;
  name: string;
  isSaved?: boolean;
};

export type CreateNewSort = {
  columnName: FloatingDropDownOption;
  method: FloatingDropDownOption;
  tableName: FloatingDropDownOption;
};
export type GetFilterDropDownType = ({
  datatype,
  operator,
}: {
  datatype: string;
  operator: string;
}) =>
  | 'TIME_FILTER'
  | 'MULTI_FILTER_DROPDOWN'
  | 'INPUT_NUMBER_FIELD'
  | 'FILTER_DROPDOWN';

export type JoinCondition = {
  firstOperand: { parentAlias: string; columnName: string };
  secondOperand: { parentAlias: string; columnName: string };
  operator?: string;
};
export type Join = {
  conditions: JoinCondition[];
  name: string;
  alias: string;
  schema: string;
  joinType?: string;
};
export type Table = {
  name: string;
  alias: string;
  schema: string;
  id: string;
  joins: Join[];
  type?: 'custom' | 'default';
};

export type Aggregate = {
  method: string;
  columnName: string;
  alias: string;
  parentAlias: string;
  dataType: string;
  cast?: CastColumn;
  type: 'custom' | 'default' | 'arithmetic_column';
  arithmeticConfig?: {
    firstOperand: Aggregate;
    secondOperand: Aggregate;
    operator: string;
  };
};
export type Dimension = {
  columnName: string;
  alias: string;
  parentAlias: string;
  timeGrain?: string;
  dataType: string;
  helperFunction?: string;
  labelType?: string;
  functionConfiguration?: { dateFormat?: string };
  cast?: CastColumn;
  type: 'custom' | 'default' | 'arithmetic_column';
  arithmeticConfig?: {
    firstOperand: Dimension;
    secondOperand: Dimension;
    operator: string;
  };
};

export type Filter = {
  method: string;
  columnName: string;
  alias: string;
  parentAlias: string;
  value:
    | string
    | number
    | string[]
    | number[]
    | { startDate: string; endDate: string; timeFilter: string };
  type:
    | 'custom'
    | 'default'
    | 'agr'
    | 'dimension'
    | 'time'
    | 'client'
    | 'rls_filter';
  dataType: string;
  relationOperator?: 'AND' | 'OR';
};

export type Order = {
  method: string;
  name: string;
  type?: 'custom' | 'default' | 'selected_column';
};

export type Forcast = {
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

export type TableType = string;
export type GroupByColumn = {
  columnName: string;
  alias: string;
  parentAlias: string;
  timeGrain?: string;
  helperFunction?: string;
  type: 'custom' | 'default';
  dataType: string;
  functionConfiguration?: { dateFormat?: string };
  cast?: CastColumn;
};

export type DatasetMetricCreationConfiguration = {
  table: Table;
  aggregates: Aggregate[];
  dimensions: Dimension[];
  filters: Filter[];
  orders: Order[];
  limit: string;
  isEnableDrill: boolean;
  forecast?: Forcast;
  rlsValues?: Record<string, string | number>;
  groupByColumnList?: GroupByColumn[];
  rlsConditions?: RlsCondition[];
  isAllClient?: boolean;
  globalFilters?: MetricCardProps['globalFilters'];
  isApplyMetricFilter?: boolean;
  isApplyGlobalFilter?: boolean;
};

export type OnChangeHelperFunctionParams = {
  column: SelectedColumn;
  helperFunction: FloatingDropDownOption;
  functionConfiguration?: { dateFormat?: string };
  type?: 'METRIC' | 'DIMENSION';
};
export type OnChangeAliasParams = {
  column: SelectedColumn;
  alias: string;
  type?: 'METRIC' | 'DIMENSION';
};
export type ConfigType = {
  clientId: string;
  companyId: string;
  isLiveMode: boolean;
  externalDashboardId: string;
  userProvidedDashboardId: string;
  chartColors: string[] | undefined;
  isShowMetricCreateModal: boolean;
  setShowMetricCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  metric: ExternalMetrics | undefined;
  metricData: Record<string, any>[] | undefined;
};
export type GenerateConfigType = {
  clientId: string;
  companyId: string;
  isLiveMode: boolean;
  externalDashboardId: string;
  userProvidedDashboardId: string;
  chartColors: string[] | undefined;
  isShowMetricCreateModal: boolean;
  setShowMetricCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  metric: ExternalMetrics | undefined;
  metricData: Record<string, any>[] | undefined;
  workspaceId: string;
  variant: 'static' | 'floating' | undefined;
};
export type GenerateMetricState = {
  data: Record<string, any>[];
  error: string;
  query: string;
  isLoading: boolean;
};
export type DatasetConfig = {
  clientSubsetData: any;
  clientId: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setGroupByList: React.Dispatch<React.SetStateAction<string[]>>;
  chart: string;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  dbName?: string;
};

export type OnChangeFilterValueType =
  | ((
      name: string,
      value: string,
      labelValue?: string,
      customValue?: Record<string, Date>,
      stringValues?: FloatingDropDownOption[]
    ) => void)
  | undefined;

export type MetricFilterDemoThemeType = {
  width: string;
  variant: 'static' | 'floating';
  radius: string;
};

export type MetricConfigType = 'DIMENSION' | 'METRIC';

export type OnSaveArithmeticColumnParams = {
  column: SelectedColumn['arithmeticConfig'];
  type: MetricConfigType;
  alias: string;
};
