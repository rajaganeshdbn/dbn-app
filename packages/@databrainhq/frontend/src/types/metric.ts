import { types } from '@databrainhq/plugin';
import { DatasetSettings, MetricsValue, SelectedColumn } from 'types';
import { DndStateProp, UseDragProps } from '@databrainhq/plugin/src/types';
import { MetricCardProps } from '@databrainhq/plugin/src/components';
import { TableColumn, TableType } from 'hooks/useCompanySchema';

export type MetricVersionTableRowType = {
  Version: string;
  Description: string;
  'Updated At': string;
  'Updated By': string;
  'Created At': string;
  'Created By': string;
};

export type VisualizationProps = {
  onDrillLevelClick: (index: number) => void;
  noColsSelected: boolean;
  data: any[] | undefined;
  isLoading: boolean;
  chartPopupChild?: JSX.Element;
  isEnablePivotTable: boolean;
  groupbyList: any[];
  isEnableGauge: boolean;
  tableName?: string;
  handleChartRightClick?: (params: any) => void;
  chartClickConfig?: types.ClickActionsConfig['chart'];
  remainingMilliseconds: number;
  seconds: number;
  headerChild?: JSX.Element;
  moreOptions?: JSX.Element;
  drilldown?: (
    params: any,
    rowFilters?: { columnName: string; value: any }[]
  ) => void;
  setShowChartPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  chartSettings: types.ChartSettingsType;
  setChartSettings: React.Dispatch<
    React.SetStateAction<types.ChartSettingsType>
  >;
  datasetSettings: DatasetSettings | undefined;
  drillLevel: number;
  dimensions: string[];
  isEnableGroupBy: boolean;
  onChangePage?: (isPrev: boolean) => void;
  isExternalChart?: boolean;
  isEnablePrevBtn?: boolean;
  isEnableNextBtn?: boolean;
  paginationInfo?: { limit: number; offset: number; totalRecords: number };
  hasNumberKeys: boolean;
  themeChartColors: string[] | undefined;
  legendData: string[];
  filters: { columnName: string; value: any }[];
  drillType: string;
  onDrillPivotTable: (value: types.OnDrillPivotTableParams) => void;
  pivotDrillState: types.PivotDrillState;
  isPythonMode: boolean;
};

export type DrillDownSettings = {
  isEnableGroupBy: boolean;
  drilldownChartSettings?: {
    name: string;
    chartSettings: types.ChartSettingsType;
  }[];
  isEnableCrossFilter: boolean;
  drillType: string;
};

export type DatasetSecuritySettingsConfig = {
  databaseName: string;
  query: string;
};

export type GetUnderlyingColumnListParams = {
  query: string;
  databaseName: string;
};
export type CustomTable = {
  id: string;
  tableName: string;
  schemaName: string;
  columnList: { name: string; datatype: string }[];
  type: string;
  query: string;
  configuration: DatasetMetricCreationConfiguration;
};
export type OnDropColumnParams = {
  table: TableType;
  column: TableColumn;
  sorting: DndStateProp['sorting'];
  identifier?: UseDragProps['identifier'];
  type: 'METRIC' | 'DIMENSION';
};

export type OnRemoveColumnParams = {
  column: types.SelectedColumn;
  type: 'METRIC' | 'DIMENSION';
};

export type OnChangeHelperFunctionParams = {
  column: types.SelectedColumn;
  type?: 'METRIC' | 'DIMENSION';
  helperFunction: types.FloatingDropDownOption;
  functionConfiguration?: { dateFormat?: string };
};

export type OnChangeAliasParams = {
  column: types.SelectedColumn;
  type?: 'METRIC' | 'DIMENSION';
  alias: string;
  cast?: types.FloatingDropDownOption;
  isColumnCasted?: boolean;
};
export type OnChangeCustomSqlColumnParams = {
  column: types.SelectedColumn;
  type: 'METRIC' | 'DIMENSION';
  sql: string;
};
export type SetChartFieldParams = {
  chartMetrics?: string[];
  chartDimensions?: string[];
  chartAggregateColumns?: string[];
  chartType?: types.ChartSettingsType['chartType'];
  resultData?: any[];
  configAggregates?: types.Aggregate[];
  pivotHeaderColumns?: string[];
};
export type OnGenerateMetric = {
  prevConfiguration?: DatasetMetricCreationConfiguration;
  onSuccess?: () => void;
  prevLimit?: string;
  chartFieldParams?: SetChartFieldParams;
  updatedDims?: types.SelectedColumn[];
  updatedMetrics?: types.SelectedColumn[];
  updatedAutoCompleteCols?: types.SelectedColumn[];
  selectedMainTable?: TableType;
  isPivotAction?: boolean;
  isTimeseriesAction?: boolean;
};
export type DatasetMetricCreationProps = {
  config: {
    id?: string;
    creatorMode?: string;
    setCreatorMode?: React.Dispatch<React.SetStateAction<string>>;
    importedMetricId?: string | null;
    clientId?: string;
    setDrillDown: React.Dispatch<React.SetStateAction<DrillDownSettings>>;
    companyIntegrationId: string;
    dbName: string;
    customSqlColumns?: { tableName: string; list: MetricsValue[] }[];
    setChartSettings: React.Dispatch<
      React.SetStateAction<types.ChartSettingsType>
    >;
    workspaceId: string;
    datasetSettings: DatasetSettings | undefined;
    groupbyList: string[];
    setGroupByList: React.Dispatch<React.SetStateAction<string[]>>;
    drillDownSettings: DrillDownSettings | undefined;
    chartSettings: types.ChartSettingsType;
    selectedSchemaList: Record<string, types.SelectedColumns[]> | undefined;
    metricFilters?: types.RlsCondition[];
    setMetricFilters?: React.Dispatch<
      React.SetStateAction<types.RlsCondition[]>
    >;
    appliedRlsFilters?: {
      tableName: string;
      columnName: string;
      condition: string;
      name: string;
      operator: string;
    }[];
    tenancy?: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<types.SqlError | undefined>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
    setTimeTaken: React.Dispatch<React.SetStateAction<number>>;
    limit: string;
    setDatasetSettings: React.Dispatch<
      React.SetStateAction<DatasetSettings | undefined>
    >;
    rlsValues?: Record<string, string | number>;
    tableList: TableType[];
    query?: string;
    data?: any[];
    customDatasetList: TableType[];
    databaseName?: string;
    pythonResult: Record<string, any>[];
    pythonCode?: string;
    isPythonMode?: boolean;
    globalFilters?: MetricCardProps['globalFilters'];
    setSqlModeResultState: React.Dispatch<
      React.SetStateAction<SqlModeResultStateType>
    >;
    onChangeDrillDown: (params: any, isEnable: boolean) => void;
  };
};

export type CreatedNewColumn = {
  columnName: types.FloatingDropDownOption;
  function: types.FloatingDropDownOption;
  alias: string;
};

export type SelectedJoin = {
  tableName: types.FloatingDropDownOption;
  conditions: {
    firstOperand: types.FloatingDropDownOption;
    secondOperand: types.FloatingDropDownOption;
    operator: types.FloatingDropDownOption;
  }[];
  joinType: types.FloatingDropDownOption;
};
export type CreateNewFilter = {
  tableName: types.FloatingDropDownOption;
  columnName: types.FloatingDropDownOption;
  operator: types.FloatingDropDownOption;
  value: {
    stringValue?: string;
    numberValue?: number;
    stringArray?: string[];
    numberArray?: number[];
    timeValue?: { startDate: string; endDate: string; timeFilter: string };
  };
  relationOperator?: types.FloatingDropDownOption;
  type: 'custom' | 'default' | 'client';
  sql: string;
  name: string;
  isSaved?: boolean;
};

export type CreateNewSort = {
  columnName: types.FloatingDropDownOption;
  method: types.FloatingDropDownOption;
  tableName: types.FloatingDropDownOption;
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
  | 'FILTER_DROPDOWN'
  | 'INPUT_TEXT_FIELD';

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
  tableType?: 'custom' | 'default';
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
  type: 'custom' | 'default';
  dataType: string;
};
export type Dimension = {
  columnName: string;
  alias: string;
  parentAlias: string;
  timeGrain?: string;
  type: 'custom' | 'default';
  dataType: string;
  helperFunction?: string;
  functionConfiguration?: { dateFormat?: string };
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

export type GroupByColumn = {
  columnName: string;
  alias: string;
  parentAlias: string;
  timeGrain?: string;
  helperFunction?: string;
  type: 'custom' | 'default';
  dataType: string;
  functionConfiguration?: { dateFormat?: string };
};

export type DatasetMetricCreationConfiguration = {
  table: Table;
  aggregates: types.Aggregate[];
  dimensions: types.Dimension[];
  filters: Filter[];
  orders: Order[];
  limit: string;
  isEnableDrill: boolean;
  forecast?: Forcast;
  rlsValues?: Record<string, string | number>;
  groupByColumnList?: GroupByColumn[];
  rlsConditions?: types.RlsCondition[];
  isAllClient?: boolean;
  globalFilters?: MetricCardProps['globalFilters'];
  isApplyMetricFilter?: boolean;
  isApplyGlobalFilter?: boolean;
};

export type CustomSqlType = {
  name: string;
  sql: string;
  isAggregate: boolean;
  isDimension: boolean;
  isFilter: boolean;
  tableName: types.FloatingDropDownOption;
};
export type NewMetricConfigProps = {
  selectedMainTable?: TableType;
  setSelectedMainTable?: React.Dispatch<
    React.SetStateAction<TableType | undefined>
  >;
  selectedAutoCompleteCols: types.SelectedColumn[];
  setSelectedAutoCompleteCols: React.Dispatch<
    React.SetStateAction<types.SelectedColumn[]>
  >;
  autoCompleteDropdownOptions: types.SelectedColumn[];
  onChangeAutoCompleteHelperFunction: any;
  onSubmitSearch: () => void;
  onChangeAutoCompleteAlias: ({ alias, column }: OnChangeAliasParams) => void;
  onDropColumn: ({ column, table, type }: OnDropColumnParams) => void;
  selectedDims: types.SelectedColumn[];
  selectedMetrics: types.SelectedColumn[];
  tableList: TableType[];
  functionOptions: (
    col?: types.SelectedColumn,
    dataType?: string
  ) => types.FloatingDropDownOption[];
  onRemoveColumn: ({ column, type }: OnRemoveColumnParams) => void;
  onChangeHelperFunction: ({
    column,
    helperFunction,
    type,
  }: OnChangeHelperFunctionParams) => void;
  onChangeAlias: ({ alias, column, type }: OnChangeAliasParams) => void;
  isInvalidColModal: boolean;
  setInvalidColModal: React.Dispatch<React.SetStateAction<boolean>>;
  joinTableOption: types.FloatingDropDownOption[];
  customSql: CustomSqlType;
  setCustomSql: React.Dispatch<React.SetStateAction<CustomSqlType>>;
  onSaveCustomSQLColumn: (type: 'DIMENSION' | 'METRIC') => void;
  dimModifiers: types.Modifiers;
  metricModifiers: types.Modifiers;
  isAddRemainingCols: boolean;
  setAddRemainingCols: React.Dispatch<React.SetStateAction<boolean>>;
  onRemainingColsSelection: () => void;
  limit: string;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  onGenerateDatasetMetric: (value: OnGenerateMetric) => void;
  showFormContainer: ShowFormContainerType;
  setShowFormContainer: React.Dispatch<
    React.SetStateAction<ShowFormContainerType>
  >;
  currentMetricFilter: CurrentMetricFilter;
  setCurrentMetricFilter: React.Dispatch<
    React.SetStateAction<CurrentMetricFilter>
  >;
  switchAxisOptions?: {
    value: string;
    label: string;
  }[];
  creatorMode?: string;
  onUpdateCustomSqlColumn: (value: OnChangeCustomSqlColumnParams) => void;
  arithmeticColumnOptions: types.SelectedColumn[];
  onSaveArithMetricOption: (value: types.OnSaveArithmeticColumnParams) => void;
  onSelectPivotTable: (
    chartType: types.ChartSettingsType['chartType'],
    headers: string[]
  ) => void;
  onChangeTimeseriesFormat: (
    value: types.FloatingDropDownOption,
    seriesName?: string
  ) => void;
};
export type NewMetricDragDropConfigProps = {
  onDropColumn: ({ column, table, type }: OnDropColumnParams) => void;
  selectedDims: types.SelectedColumn[];
  selectedMetrics: types.SelectedColumn[];
  tableList: TableType[];
  functionOptions: (
    col?: types.SelectedColumn,
    dataType?: string
  ) => types.FloatingDropDownOption[];
  onRemoveColumn: ({ column, type }: OnRemoveColumnParams) => void;
  onChangeHelperFunction: ({
    column,
    helperFunction,
    type,
  }: OnChangeHelperFunctionParams) => void;
  onChangeAlias: ({ alias, column, type }: OnChangeAliasParams) => void;
  joinTableOption: types.FloatingDropDownOption[];
  customSql: CustomSqlType;
  setCustomSql: React.Dispatch<React.SetStateAction<CustomSqlType>>;
  onSaveCustomSQLColumn: (type: 'DIMENSION' | 'METRIC') => void;
  dimModifiers: types.Modifiers;
  metricModifiers: types.Modifiers;
  onUpdateCustomSqlColumn: (value: OnChangeCustomSqlColumnParams) => void;
  arithmeticColumnOptions: types.SelectedColumn[];
  onSaveArithMetricOption: (value: types.OnSaveArithmeticColumnParams) => void;
  isTimeSeries: boolean;
};
export type NewMetricPointClickConfigProps = {
  selectedMainTable?: TableType;
  setSelectedMainTable?: React.Dispatch<
    React.SetStateAction<TableType | undefined>
  >;
  selectedAutoCompleteCols: types.SelectedColumn[];
  setSelectedAutoCompleteCols: React.Dispatch<
    React.SetStateAction<types.SelectedColumn[]>
  >;
  autoCompleteDropdownOptions: types.SelectedColumn[];
  onChangeAutoCompleteHelperFunction: any;
  onSubmitSearch: () => void;
  onChangeAutoCompleteAlias: ({ alias, column }: OnChangeAliasParams) => void;
  tableList: TableType[];
  functionOptions: (
    col?: types.SelectedColumn,
    dataType?: string
  ) => types.FloatingDropDownOption[];
};

export type ShowFormContainerType = {
  isEnable: boolean;
  index: number;
  type: string;
};

export type CurrentMetricFilter = {
  name: string;
  filterType: types.FloatingDropDownOption;
  selectedTable: types.FloatingDropDownOption;
  selectedColumn: types.FloatingDropDownOption;
  selectedLabelColumn?: types.FloatingDropDownOption;
  selectedLabelColumnValue?: types.FloatingDropDownOption;
  selectedOptionTable: types.FloatingDropDownOption;
  selectedOptionColumn: types.FloatingDropDownOption;
  datatype: types.FloatingDropDownOption;
  stringOptions: types.FloatingDropDownOption[];
  numberOptions: number[];
  isClientScopedOption: boolean;
  isAppFilter: boolean;
  clientColumn: types.FloatingDropDownOption;
  clientColumnDatatype: types.FloatingDropDownOption;
  dateOptions: types.DateOptionType[];
  isVariableFilter: boolean;
  variableStrings: string[];
  applyOnColumns?: {
    columnName: types.FloatingDropDownOption;
    logicalOperator: types.FloatingDropDownOption;
    comparisonOperator: types.FloatingDropDownOption;
  }[];
  isAddOnMetrics: boolean;
  comparisonOperator?: types.FloatingDropDownOption;
  dependOn?: types.FloatingDropDownOption;
  selectedCustomOptionTable?: {
    query: string;
    columnName: string;
  };
  filterVariant?: types.FloatingDropDownOption;
};

export type DraggableMetricItemData = {
  table: TableType;
  column: TableColumn;
};

export type SqlModeResultStateType = {
  error: string;
  isLoading: boolean;
  data: Record<string, any>[];
};
