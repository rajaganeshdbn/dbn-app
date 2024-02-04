/* eslint-disable import/no-cycle */
import type { ReactNode } from 'react';
import { ColumnSizingState } from '@tanstack/react-table';
import { SelectedColumn, TableObjectType, Aggregate } from './metricCreate';
import { CHART_TYPES, ICONS_LIST } from '@/consts';

export type ChildrenProps = {
  children: ReactNode;
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
  | FloatingDropDownOption[];

export type TableColumn = {
  name: string;
  dataType: string;
  isDefault?: boolean;
  label?: string;
  isShowHorizontal?: boolean;
  defaultValue?: GlobalFiltersDefaultValue;
  isClientScoped?: boolean;
  clientColumn?: string;
  clientColumnType?: string;
  isManualOptions?: boolean;
  manualOptions?: string[];
  as: string;
  sql?: string;
  type?: 'custom' | 'default' | 'python';
  isAggregate?: boolean;
};

export type TimeSeriesGroupType =
  | 'yearly'
  | 'monthly'
  | 'weekly'
  | 'daily'
  | 'quarterly';
export type TimeSeriesType = 'bar' | 'line' | 'area' | 'stack';
export type TimeSeriesSettingsType = {
  seriesType: { type: TimeSeriesType; column: string }[];
  groupBySettings: {
    isDynamic: boolean;
    options: string[];
    value: string | TimeSeriesGroupType;
    fillXAxis: boolean;
  };
};

export type TimeSeriesSettingsProps = {
  settings: TimeSeriesSettingsType;
  onChange: (
    timeSeriesSettings:
      | TimeSeriesSettingsType
      | ((ts: TimeSeriesSettingsType) => TimeSeriesSettingsType)
  ) => void;
  yAxisList: string[];
  onChangeTimeseriesFormat: (value: FloatingDropDownOption) => void;
};

export type TimeSeriesChartProps = {
  dataArray: Record<string, any>[];
  timeStampKey: string;
  valuekeys: string[];
  type: TimeSeriesType;
  groupBy: TimeSeriesGroupType;

  margins: Record<string, number>;
  legendSettings: LegendSettings;
  labelSettings: LabelSettings;
  axisSettings: AxisSettings;
  colors?: string[];
  customSettings: CustomSettings;
  backGroundColor: BackgroundSettings;
};

export type LegendSettings = {
  show?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  position?: string;
  truncateLegendValue?: number;
  legendShape?: string;
  customise?: boolean;
  fixedPosition?: string;
  disableScroll?: boolean;
};

export type MarginSettings = {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

export type CustomSettings = {
  hideXSplitLines?: boolean;
  hideYSplitLines?: boolean;
  hideXAxisLines?: boolean;
  hideYAxisLines?: boolean;
  isEnableLabelFormatting?: boolean;
  YaxislabelFormatters?: {
    upperLimit: number;
    lowerLimit: number;
    label: string;
    color?: string;
  }[];
  comboLabelFormatter?: {
    axis: string;
    formatter: {
      upperLimit: number;
      lowerLimit: number;
      label: string;
    }[];
  }[];
  barWidth?: number;
  barRadius?: number[];
  xRotation?: number;
  customRotation?: number;
  hideXAxisLabels?: boolean;
  hideYAxisLabels?: boolean;
  fontSize?: number;
  subHeaderShow?: boolean;
  comparisonValueShow?: boolean;
  displayText?: string;
  singleValueFontColor?: string;
  comparisonTimeColumn?: string;
  comparisonTimePeriod?: number;
  comparisonTimeGrain?: string;
  comparisonTableName?: string;
  comparisonValueFontSize?: number;
  singleValueSuffix?: string;
  singleValuePrefix?: string;
  singleValConditionalFormatter?: {
    min: number;
    max: number;
    color: string;
  }[];
  comparisonSuffix?: string;
  subHeaderFontSize?: number;
  dateFormatter?: string;
  numberFormatter?: string;
  isEnableLabelTooltip?: boolean;
  showLabelValues?: boolean;
  showFullStacked?: boolean;
  showConversionRate?: boolean;
  labelFormat?: string;
  isShowTrendLine?: boolean;
  hideNullValues?: boolean;
  chartZoom?: {
    isZoomEnabled?: boolean;
    zoomAxis?: string;
    zoomOnMouseWheel?: boolean;
  };
  showDynamicBehaviour?: boolean;
  roseType?: string;
  selectedMode?: string;
  selectedOffset?: number;
  comboAxisSymbols?: any;
  comboStackAxisSymbols?: { suffix: string; prefix: string; name: string };
  gradients?: {
    startColor: string;
    endColor: string;
    offset1: number;
    offset2: number;
    direction: string;
  }[];
  isShowBarGradient?: boolean;
  barGradient?: {
    startColor?: string;
    endColor?: string;
    offset1?: number;
    offset2?: number;
    direction?: string;
  };
  enableBackgroundGradient?: boolean;
  backgroundGradient?: {
    startColor?: string;
    endColor?: string;
    offset1?: number;
    offset2?: number;
    direction?: string;
  };
  labelPrefix?: string;
  labelSuffix?: string;
  enableTitleDesc?: boolean;
  chartTitle?: string;
  chartDesc?: string;
  titlePosition?: string;
  cumulativeBar?: boolean;
  stepPadding?: number;
  showFunnelShadow?: boolean;
  hideSplitLines?: boolean;
  hideAxisLines?: boolean;
  axisLabels?: boolean;
  isStackBar?: boolean;
  showSelectLegend?: boolean;
  showStackLabels?: boolean;
  coloredBars?: boolean;
};

export type Colors =
  | 'primary'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-dark'
  | 'alert'
  | 'alert-dark'
  | 'alert-light'
  | 'success'
  | 'success-dark'
  | 'success-light'
  | 'warning'
  | 'warning-dark'
  | 'info'
  | 'info-light'
  | 'white'
  | 'gray'
  | 'gray-dark'
  | 'light'
  | 'dark'
  | 'infoAlert'
  | 'cta';

export type IconType = (typeof ICONS_LIST)[number];

export type LogoType =
  | 'redshift'
  | 'postgres'
  | 'mysql'
  | 'mongodb'
  | 'bigquery'
  | 'snowflake'
  | 'microsoft'
  | 'google'
  | 'elasticsearch'
  | 'redis'
  | 'databricks'
  | 'clickhouse'
  | 'mssql'
  | 'awss3';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconConfig = { size: IconSizes; color: Colors };
export type IconsProps = {
  name: IconType;
  size?: IconSizes;
  color?: Colors;
  cumulativeBar?: boolean;
  showFunnelShadow?: boolean;
  stepPadding?: number;
  isStackBar?: boolean;
  showSelectLegend?: boolean;
  showStackLabels?: boolean;
  coloredBars?: boolean;
};

export type TableSettings = {
  headerFontBold?: boolean;
  contentAlignment?: string;
  hideTableHeader?: boolean;
  lineGap?: string;
  hideVerticalDivider?: boolean;
  hideHorizontalDivider?: boolean;
  badgeColumns?: string[];
  enableStripedRows?: boolean;
  showRowHover?: boolean;
  showTableTitle?: boolean;
  tableTitle?: string;
  showTableDesc?: boolean;
  enableTableSearch?: boolean;
  enableFilter?: boolean;
  enableSorting?: boolean;
  disablePagination?: boolean;
  defaultRowSize?: string;
  columnSizing?: ColumnSizingState;
  isServerSidePagination?: boolean;
  isSortAlphabetically?: boolean;
  conditionalFormatting?: {
    columnName: string;
    rules: {
      operator: string;
      value: string;
      styles: {
        backgroundColor?: string;
        color?: string;
      };
    }[];
  }[];
  badgeColors?: Record<string, string>;
  badgeTextColors?: Record<string, string>;
  badgeSeparator?: string;
  listColumns?: string[];
  listSeparator?: string;
  stackColAlias?: string;
  customHeaderColor?: {
    isEnabled?: boolean;
    color?: string;
    textColor?: string;
  };
};

export type BackgroundSettings = {
  show?: boolean;
};

export type LabelSettings = {
  axis?: string;
  show?: boolean;
  position?: string;
  truncateLabel?: boolean;
  truncateLabelValue?: number;
  showLabelLine?: boolean;
  isEnableValueSummation?: boolean;
  XAxisStyle?: {
    size?: number;
    family?: string;
    weight?: number;
    color?: string;
    axisName?: string;
    axisPadding?: number;
  };
  YAxisStyle?: {
    size?: number;
    family?: string;
    weight?: number;
    color?: string;
    axisName?: string;
    axisPadding?: number;
  };
};

export type AxisSettings = {
  axis?: string;
};

export type PivotSettingsType = {
  rows?: string[];
  columns?: string[];
};
export type PivotSettingsType2 = {
  measures?: string[];
  dimensions?: string[];
  headers?: string[];
  isDynamicHeaders?: boolean;
  aggregates?: Aggregate[]; // datasetmetric settings aggregates
  dims?: string[]; // selected column dimensions
};
export type GaugeSettingsType = {
  metric?: string;
  dimensions?: string[];
};

export type ChartSettingsType = {
  chartType: keyof typeof CHART_TYPES;
  margins?: MarginSettings;
  xAxis?: string;
  yAxisList?: string[];
  chartColors?: string[];
  stackTableCols?: string[];
  step?: string;
  measure?: string;
  singleValue?: string;
  sankeyValues?: string[];
  percentageSize?: number;
  selectedSeries?: string[];
  legendSettings?: LegendSettings;
  labelSettings?: LabelSettings;
  customSettings?: CustomSettings;
  tableSettings?: TableSettings;
  pivotTableSettings?: PivotSettingsType;
  pivotTableSettings2?: PivotSettingsType2;
  gaugeSettings?: GaugeSettingsType;
  axisSettings?: AxisSettings;
  backGroundColor?: BackgroundSettings;
  timeSeriesSettings?: TimeSeriesSettingsType;
  isMultiDimension?: boolean;
  isDynamicSeries?: boolean;
  seriesField?: string;
  seriesOptions?: string[];
  ungroupedAlias?: string;
  dynamicXAxis?: {
    isEnabled?: boolean;
    options?: FloatingDropDownOption[];
    selectedOption?: FloatingDropDownOption;
  };
  comboBarList: string[];
  isGroupXAxis?: boolean;
};

export type SelectedColumns = {
  column: string;
  datatype: string;
  schemaName: string;
  tableName: string;
};

export type Schema = {
  id: string;
  schemaName: string;
  tableName: string;
  columns: string[];
  columnsWithDataType: {
    as: any;
    dataType: string;
    name: string;
    label?: string;
    isDefault?: boolean;
    isShowHorizontal?: boolean;
    defaultValue?: string[] | string | number | number[] | Record<string, any>;
    options?: FloatingDropDownOption[];
    isClientScoped?: boolean;
    clientColumn?: string;
    clientColumnType?: string;
    isManualOptions?: boolean;
    manualOptions?: string[];
    dependOn?: FloatingDropDownOption[];
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
  labelColumnName?: string;
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
    }[]
  | undefined;

export type GroupBy = {
  column: string;
  parentColumn?: { column: string; value: string };
};

export type ClientType = {
  label: string;
  value: string;
};

export type DashboardType = {
  id: string;
  name: string;
};

export type FloatingDropDownOption = {
  key?: string;
  label: string;
  value: string;
  badge?: string;
  subValue?: string;
  icon?: string;
  columnList?: any;
  labelType?: string;
  aggregate?: string;
  alias?: string;
  table?: TableObjectType;
  isImportEnabled?: boolean;
  column?: SelectedColumn;
};

export type FilterType = {
  tableName: string;
  columns: Schema['columnsWithDataType'];
};

export type GlobalFilterColumn = {
  filterType?: string;
  selectedTable?: string;
  variableStrings?: string[];
  as: any;
  dataType: string;
  name: string;
  labelColumnName?: string;
  labelColumnDatatype?: string;
  customLabelColumn?: string;
  isDefault?: boolean;
  label?: string;
  isShowHorizontal?: boolean;
  defaultValue?: GlobalFiltersDefaultValue;
  isClientScoped?: boolean;
  clientColumn?: string;
  clientColumnType?: string;
  isManualOptions?: boolean;
  manualOptions?: string[];
  dependOn?: FloatingDropDownOption[];
  selectedCustomColumn?: {
    query: string;
    columnName: string;
  };
  options?: FloatingDropDownOption[];
  isVariableFilter?: boolean;
  applyOnTables?: { tableName: string; columnName: string; dataType: string }[];
  filterVariant?: FloatingDropDownOption;
};
export type GlobalFilterType = {
  tableName: string;
  columns: GlobalFilterColumn[];
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
export type DateOptionType = {
  id: string;
  range: string;
  time: string;
  format: string;
  name: string;
  count: number;
  endDate?: Date;
  startDate?: Date;
  fromDate?: Date;
  timeGrain?: string;
  toDate?: Date;
  minDate?: Date;
  maxDate?: Date;
};

export type CustomOption = {
  startDate?: Date;
  endDate?: Date;
  value: string | number;
  label: string;
  range?: string;
};
export type RlsCondition = {
  name: string;
  columnName: string;
  labelColumnName?: string;
  tableName: string;
  datatype: string;
  isAddOnMetrics: boolean;
  options: FloatingDropDownOption[] | number[] | DateOptionType[];
  value?: string | DateOptionType | string[];
  selectedDropdownValue?: FloatingDropDownOption[] | FloatingDropDownOption;
  dimensionColumn?: string;
  measureColumn?: string;
  client?: { isEnable: boolean; columnName: string; as?: string };
  isAppFilter?: boolean;
  position?: 'top-left' | 'top-right';
  isVariableFilter?: boolean;
  variableOptions?: CustomOption[];
  variableStrings?: string[];
  selectedVariableValue?: CustomOption;
  optionColumnName?: string;
  optionTableName?: string;
  filterType?: string;
  applyOnColumns?: {
    columnName: FloatingDropDownOption;
    logicalOperator: FloatingDropDownOption;
    comparisonOperator: FloatingDropDownOption;
  }[];
  comparisonOperator?: FloatingDropDownOption;
  dependOn?: FloatingDropDownOption;
  selectedCustomOptionTable?: { query: string; columnName: string };
  filterVariant?: FloatingDropDownOption;
};

export type PythonMetricFilter = {
  name: string;
  type: 'STRING' | 'DATE' | 'NUMBER';
  value: { startDate: Date; endDate: Date } | string | number;
};
export type MetricData = {
  id: string;
  name: string;
  dashboards: { name: string; id: string }[];
  description: string;
  createdBy: string;
  dateCreated: string;
};
export type GetUnderlyingData = ({
  columnName,
  value,
  setData,
  setLoading,
  isSingleValueChart,
}: {
  columnName: string | undefined;
  value: any | undefined;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSingleValueChart: boolean;
}) => void;

export type ConditionalFormattingParam = {
  value: any;
  rules: {
    operator: string;
    value: string;
    styles: any;
  }[];
};
export type DateTypeOptionType = {
  range: 'Last' | 'This' | 'Custom' | 'Custom Date';
  time?: 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year';
  name: string;
  count?: number;
  fromDate?: Date;
  toDate?: Date;
  minDate?: Date;
  maxDate?: Date;
};
export type MetricFilterOptionsType = Record<
  string,
  {
    options: string[] | number[] | DateTypeOptionType[];
    defaultOption?: string | number;
  }
>;

export type FilterClausesType = (dependOn: FloatingDropDownOption[]) => {
  as: string;
  columnName: string;
  value: string | string[];
}[];

export type AdminThemeOptionsType = {
  general: {
    name: string;
    fontFamily: string;
  };
  dashboard: {
    backgroundColor?: string;
    ctaColor?: string;
    ctaTextColor?: string;
    selectBoxSize?: 'small' | 'medium' | 'large';
    selectBoxVariant?: 'floating' | 'static';
    selectBoxBorderRadius?: string;
    selectBoxTextColor?: string;
  };
  cardDescription: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  cardTitle: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  chart: {
    palettes?: {
      name: string;
      colors: string[];
    }[];
    selected?: string;
  };
  cardCustomization: {
    padding?: string;
    borderRadius?: string;
    shadow?: string;
  };
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
export type PivotFilterType = { columnName: string; value: any };
export type OnDrillPivotTableParams = {
  filters: PivotFilterType[];
  nextLevel: number;
  currentValue: string;
};

export type PivotDrillState = {
  isLoading: boolean;
  error: string;
  data: {
    key: string;
    data: Record<string, any>[];
  }[];
  currentValue: string;
};
