/* eslint-disable no-await-in-loop */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import EChartsReact from 'echarts-for-react';
import { ColumnSizingState } from '@tanstack/react-table';
import { useExternalMetric } from './useExternalMetric';
import {
  CHART_TYPES,
  DATASET_NUMBER_HELPER_FUNCTIONS,
  DATASET_OTHER_HELPER_FUNCTIONS,
  DATASET_STRING_HELPER_FUNCTIONS,
  DATASET_TIME_HELPER_FUNCTIONS,
  DATE_TYPES,
  DBN_SQL_TABLE,
  DEFAULT_CHART_SETTINGS,
  DEFAULT_CREATE_DATSET_METRIC_CONFIG,
  FUNCTIONS_SYNONYMNS,
  LEAST_USED_STRING_FUNCTIONS,
  NULL_FILTER_SYNONYMNS,
  NUMBER_FILTER_SYNONYMNS,
  NUMBER_TYPES,
  REDSHIFT,
  SOMETHING_WENT_WRONG,
  STRING_TYPES,
  TIME_FILTER_SYNONYMNS,
  aggregateStrings,
  questionKeywords,
} from '@/consts';
import {
  Aggregate,
  ChartSettingsType,
  CompanyIntegration,
  ConfigType,
  CustomTableObject,
  DatasetMetricCreationConfiguration,
  Dimension,
  Filter,
  FloatingDropDownOption,
  GenerateMetricState,
  OnChangeAliasParams,
  OnChangeHelperFunctionParams,
  Order,
  PivotDrillState,
  SelectedColumn,
  SetChartFieldParams,
  TableColumn,
  TableObjectType,
} from '@/types';
import {
  useChatApiResponse,
  useDatasetMetricMutation,
  useGenerateMetricDataMutation,
} from '@/queries/externalDashboard.mutation';
import {
  autoDetectCharts,
  getColumnNameKeyString,
  getEnabledChart,
  indentifyKeys,
} from '@/helpers';
import { ChatCompletionRequestMessage } from '@/types/queryTypes';
import { useMetricColumnMutation } from '@/queries/metric.mutation';

type GenerateMetricDataResponse =
  | {
      error: string;
      query?: undefined;
      queryData?: undefined;
      timeTaken?: undefined;
    }
  | {
      error: string;
      query: string;
      queryData?: undefined;
      timeTaken?: undefined;
    }
  | {
      queryData: any[];
      timeTaken: number;
      query: string;
      error?: undefined;
    };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useGenerateMetric = (config: ConfigType) => {
  const {
    clientId,
    companyId,
    externalDashboardId,
    isLiveMode,
    metric,
    setShowMetricCreateModal,
    userProvidedDashboardId,
  } = config;
  const [pivotDrillState, setPivotDrillState] = useState<PivotDrillState>({
    data: [],
    error: '',
    isLoading: false,
    currentValue: '',
  });
  const [companyIntegration, setCompanyIntegration] =
    useState<CompanyIntegration>();
  const [chartSettings, setChartSettings] = useState<ChartSettingsType>(
    DEFAULT_CHART_SETTINGS
  );
  const [isShowSaveMetricModal, setShowSaveMetricModal] =
    useState<boolean>(false);
  const [generateMetricState, setGenerateMetricState] =
    useState<GenerateMetricState>({
      data: [],
      error: '',
      isLoading: false,
      query: '',
    });
  const [groupByList, setGroupByList] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [aiResponseState, setAiResponseState] = useState<{
    isLoading: boolean;
    error: string;
  }>({ error: '', isLoading: false });
  const [selectedMainTable, setSelectedMainTable] = useState<TableObjectType>();
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumn[]>([]);
  const [isShowChartType, setShowChartType] = useState<boolean>(false);
  const [stringColumnValues, setStringColumnValues] = useState<
    {
      column: string;
      values: string[];
    }[]
  >([]);
  const [isRef, setRef] = useState<boolean>(false);
  const [configuration, setConfiguration] =
    useState<DatasetMetricCreationConfiguration>(
      DEFAULT_CREATE_DATSET_METRIC_CONFIG
    );
  // HOOKS

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const { mutate: generateMetricData } = useGenerateMetricDataMutation();
  const chartRef = useRef<EChartsReact>(null);
  const {
    createExternalMetric,
    error: saveError,
    updateExternalMetric,
    clientSubsetData,
    previewTable,
    token,
    dashboardOptions,
    isLoading: isCreatingMetric,
    workspaceId,
    isDatabaseTenancy,
  } = useExternalMetric({
    query: generateMetricState.query,
    chartSettings,
    companyIntegrationId: companyIntegration?.id,
    integrationName: companyIntegration?.name,
    metricQuery: watch('questionString'),
    datasetMetricSettings: undefined,
    outputColumns: undefined,
    selectedColumns: undefined,
    clientId,
    isEmbedded: true,
    companyId,
    isLiveMode,
    dashboardIds: [externalDashboardId],
    userProvidedDashboardId,
    isEnableGroupBy: false,
    groupBy: undefined,
    selectedGroupBy: [],
    metric,
    onSuccess: () => {
      setShowSaveMetricModal(false);
      setShowMetricCreateModal(false);
      window?.location?.reload?.();
    },
  });
  const reponseMutation = useChatApiResponse();
  const { mutate: datasetMetricCreation, error: generateError } =
    useDatasetMetricMutation();
  const { mutateAsync: fetchColumnValues } = useMetricColumnMutation();

  // UTILS

  const functionOptions = (
    col?: SelectedColumn,
    colDatatype?: string
  ): FloatingDropDownOption[] => {
    const datatype = colDatatype || col?.datatype || '';
    if (datatype) {
      if (DATE_TYPES.includes(datatype?.toLowerCase()))
        return DATASET_TIME_HELPER_FUNCTIONS;
      if (NUMBER_TYPES.includes(datatype?.toLowerCase()))
        return DATASET_NUMBER_HELPER_FUNCTIONS;
      if (
        STRING_TYPES.includes(datatype?.toLowerCase()) ||
        datatype?.toLowerCase()?.includes('char')
      )
        if (colDatatype)
          return DATASET_STRING_HELPER_FUNCTIONS.filter(
            (f) => !LEAST_USED_STRING_FUNCTIONS.includes(f.value)
          );
      return DATASET_STRING_HELPER_FUNCTIONS;
    }
    return DATASET_OTHER_HELPER_FUNCTIONS;
  };

  const getChartFields = (colList: SelectedColumn[]): string[] => {
    return colList.map((col) =>
      companyIntegration?.name?.toLowerCase() === REDSHIFT
        ? col.alias.toLowerCase()
        : col.alias
    );
  };
  const getSavedChartFields = (optionList: string[]): string[] => {
    if (generateMetricState?.data?.length) {
      const options = Object.keys(generateMetricState?.data?.[0] || {});
      return optionList.filter((o) => options.includes(o));
    }
    return [];
  };
  const setChartFields = ({
    chartType,
    chartDimensions,
    chartMetrics,
    chartAggregateColumns,
    configAggregates,
  }: SetChartFieldParams) => {
    const dims =
      chartDimensions ||
      getSavedChartFields(
        getChartFields(
          selectedColumns.filter((col) => col.configType === 'DIMENSION')
        )
      );
    const metrics =
      chartMetrics ||
      getSavedChartFields(
        getChartFields(
          selectedColumns.filter((col) => col.configType === 'AGGREGATE')
        )
      );
    const aggregateColumns =
      chartAggregateColumns ||
      getSavedChartFields(
        getChartFields(
          selectedColumns.filter((col) => col.configType === 'AGGREGATE')
        )
      );
    if (
      metrics.length === 0 &&
      ![CHART_TYPES.table, CHART_TYPES.singleValue].includes(
        chartType || chartSettings.chartType
      )
    ) {
      const { numberKeys, otherKeys } = indentifyKeys(generateMetricState.data);
      const xAxisCol = dims?.find((val) => otherKeys?.includes(val));
      if (chartType === CHART_TYPES.gauge) {
        setChartSettings((prev: any) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          gaugeSettings: {
            dimensions: otherKeys,
            metric: numberKeys?.[0],
          },
        }));
      } else if (chartType === CHART_TYPES.horizontalStackTable) {
        setChartSettings((prev) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          stackTableCols: numberKeys,
          yAxisList: otherKeys,
        }));
      } else if (
        [CHART_TYPES.funnel, CHART_TYPES.boxplot].includes(chartType || '')
      ) {
        setChartSettings((prev) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          step: otherKeys?.[0],
          measure: numberKeys?.[0],
        }));
      } else if (chartType === CHART_TYPES.sankey) {
        const isDimAval = otherKeys?.length > 1;
        const sankeyValues = isDimAval
          ? [otherKeys?.[0], otherKeys?.[1], numberKeys?.[0]]
          : [
              otherKeys?.[0] || numberKeys?.[0],
              numberKeys?.[0] || otherKeys?.[0],
              numberKeys?.[1],
            ];
        setChartSettings((prev) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          sankeyValues,
        }));
      } else {
        setChartSettings((prev: any) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          xAxis: xAxisCol,
          yAxisList: numberKeys,
        }));
      }
      return;
    }
    if (chartType === CHART_TYPES.singleValue) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        singleValue: metrics?.[0] || dims?.[0],
      }));
    } else if (
      aggregateColumns.length &&
      [CHART_TYPES.pivot, CHART_TYPES.treeMap].includes(chartType || '') &&
      generateMetricState?.data?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        pivotTableSettings: {
          ...chartSettings.pivotTableSettings,
          columns: dims,
          rows: aggregateColumns,
        },
      }));
    } else if (
      aggregateColumns.length &&
      [CHART_TYPES.pivotV2].includes(chartType || '') &&
      generateMetricState?.data?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        pivotTableSettings2: {
          ...chartSettings.pivotTableSettings2,
          dimensions: dims.slice(1),
          headers: dims.slice(0, 1),
          measures: aggregateColumns,
          aggregates: configAggregates || configuration.aggregates || [],
        },
      }));
    } else if (chartType === CHART_TYPES.table) {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        yAxisList: [...dims, ...metrics],
      }));
    } else if (chartType === CHART_TYPES.waterfall) {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        xAxis: dims?.[0],
        yAxisList: [metrics?.[0]],
      }));
    } else if (chartType === CHART_TYPES.sankey) {
      const isDimAval = dims?.length > 1;
      const sankeyValues = isDimAval
        ? [dims?.[0], dims?.[1], metrics?.[0]]
        : [dims?.[0] || metrics?.[0], metrics?.[1], metrics?.[2]];
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        sankeyValues,
      }));
    } else if (
      chartType === CHART_TYPES.funnel ||
      chartType === CHART_TYPES.boxplot
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        step: dims?.[0] || '',
        measure: metrics?.[0],
      }));
    } else if (chartType === CHART_TYPES.horizontalStackTable) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        stackTableCols: metrics || [],
        yAxisList: dims,
      }));
    } else {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        xAxis: dims?.[0],
        yAxisList: metrics,
      }));
    }
  };
  // CONSTANTS
  const chartOptions: FloatingDropDownOption[] = [
    { value: 'bar', label: 'Bar Chart', icon: 'bar-chart' },
    { value: 'line', label: 'Line Chart', icon: 'line-chart' },
    { value: 'table', label: 'Table Chart', icon: 'table' },
  ];

  const tableList: TableObjectType[] = useMemo(
    () =>
      (clientSubsetData?.tableList as CustomTableObject[])?.map((table) => {
        const t: TableObjectType = {
          columns: table?.columns?.map((c) => c.name) || [],
          columnsWithDataType: table?.columns?.map((c) => ({
            as: c.as,
            dataType: c.datatype,
            name: c.name,
          })),
          companyId: '',
          id: '',
          recentUpdatedAt: 0,
          schemaName: table?.tableName?.split('.')?.[0] || '',
          tableName: table?.tableName?.split('.')?.[1] || '',
          clientColumn: table?.clientColumn || '',
          alias: `${table?.tableName?.split('.')?.[0] || ''}_${
            table?.tableName?.split('.')?.[1] || ''
          }`,
        };

        return t;
      }) || [],
    [clientSubsetData]
  );
  const tableAlias = useMemo(
    () =>
      selectedMainTable?.type === 'custom'
        ? selectedMainTable?.alias || DBN_SQL_TABLE
        : `${selectedMainTable?.schemaName}_${selectedMainTable?.tableName}`,
    [selectedMainTable]
  );
  const autoCompleteDropdownOptions: SelectedColumn[] = useMemo(() => {
    const columns: SelectedColumn[][] =
      selectedMainTable?.columnsWithDataType?.map((column) => {
        const datatype = column?.dataType;
        const helperFunctionList = functionOptions(undefined, datatype);
        const isDate = DATE_TYPES.includes(datatype?.toLowerCase());
        const isNumber = NUMBER_TYPES.includes(datatype?.toLowerCase());
        const isString =
          STRING_TYPES.includes(datatype?.toLowerCase()) ||
          datatype?.toLowerCase()?.includes('char');
        const filterValues: string[] =
          stringColumnValues.find((col) => col.column === column.name)
            ?.values || [];
        const filterOptions: SelectedColumn[] = isDate
          ? TIME_FILTER_SYNONYMNS.map((func, i) => {
              const newAlias = getColumnNameKeyString(
                func.alias(column.name),
                companyIntegration?.name || ''
              );
              const option: SelectedColumn = {
                alias: newAlias,
                configType: 'FILTER',
                datatype: column.dataType,
                dropType: 'FILTER',
                index: i,
                name: column.name,
                parentAlias: tableAlias,
                table: selectedMainTable,
                type:
                  column.type === 'custom'
                    ? 'CUSTOM'
                    : column.type === 'python'
                    ? 'PYTHON'
                    : 'DEFAULT',
                helperFunction: undefined,
                sql: column.sql || '',
                draggableItemData: { column, table: selectedMainTable },
                synonyms: func.synonyms,
                filterMethod: '=',
                filterType: 'time',
                filterValue: {
                  timeValue: {
                    endDate: '',
                    startDate: '',
                    timeFilter: func.value,
                  },
                },
                relationOperator: 'AND',
              };
              return option;
            })
          : isNumber
          ? [
              {
                alias: column.name,
                configType: 'FILTER',
                datatype: column.dataType,
                dropType: 'FILTER',
                index: 0,
                name: column.name,
                parentAlias: tableAlias,
                table: selectedMainTable,
                type:
                  column.type === 'custom'
                    ? 'CUSTOM'
                    : column.type === 'python'
                    ? 'PYTHON'
                    : 'DEFAULT',
                helperFunction: undefined,
                sql: column.sql || '',
                draggableItemData: { column, table: selectedMainTable },
                synonyms: NUMBER_FILTER_SYNONYMNS.map(
                  (s) => s.synonymns
                ).flat(),
                filterMethod: '=',
                filterType: 'default',
                filterValue: {},
                relationOperator: 'AND',
              },
            ]
          : isString
          ? filterValues.map((value, i) => {
              const newAlias = getColumnNameKeyString(
                `${value} ${column.name}`,
                companyIntegration?.name || ''
              );
              const option: SelectedColumn = {
                alias: newAlias,
                configType: 'FILTER',
                datatype: column.dataType,
                dropType: 'FILTER',
                index: i,
                name: column.name,
                parentAlias: tableAlias,
                table: selectedMainTable,
                type:
                  column.type === 'custom'
                    ? 'CUSTOM'
                    : column.type === 'python'
                    ? 'PYTHON'
                    : 'DEFAULT',
                helperFunction: undefined,
                sql: column.sql || '',
                draggableItemData: { column, table: selectedMainTable },
                synonyms: [value],
                filterMethod: 'IN',
                filterType: 'default',
                filterValue: {
                  stringArray: [value],
                },
                relationOperator: 'AND',
              };
              return option;
            })
          : [];
        const columnOptions: SelectedColumn[] = helperFunctionList.map(
          (func, i) => {
            const isNone = func.value === 'NONE';
            const newAlias = `${
              isNone
                ? column.name
                : `${getColumnNameKeyString(
                    `${func.label.toLowerCase()} of`,
                    companyIntegration?.name || ''
                  )} ${column.name}`
            }`;
            const isAggregate = aggregateStrings.includes(func.value);
            const option: SelectedColumn = {
              alias: newAlias,
              configType:
                column.isAggregate || isAggregate ? 'AGGREGATE' : 'DIMENSION',
              datatype: column.dataType,
              dropType:
                column.isAggregate || isAggregate ? 'METRIC' : 'DIMENSION',
              index: i,
              name: column.name,
              parentAlias: tableAlias,
              table: selectedMainTable,
              type:
                column.type === 'custom'
                  ? 'CUSTOM'
                  : column.type === 'python'
                  ? 'PYTHON'
                  : isNone
                  ? 'DEFAULT'
                  : 'HELPER_FUNCTION',
              helperFunction: func.value,
              sql: column.sql || '',
              draggableItemData: { column, table: selectedMainTable },
              synonyms: FUNCTIONS_SYNONYMNS?.[func.value] || [],
              filterMethod: '',
              filterType: 'default',
              filterValue: {},
            };
            return option;
          }
        );
        const nullFilterOptions: SelectedColumn[] = NULL_FILTER_SYNONYMNS.map(
          (func) => ({
            alias: getColumnNameKeyString(
              func.alias(column.name),
              companyIntegration?.name || ''
            ),
            configType: 'FILTER',
            datatype: column.dataType,
            dropType: 'FILTER',
            index: 0,
            name: column.name,
            parentAlias: tableAlias,
            table: selectedMainTable,
            type:
              column.type === 'custom'
                ? 'CUSTOM'
                : column.type === 'python'
                ? 'PYTHON'
                : 'DEFAULT',
            helperFunction: undefined,
            sql: column.sql || '',
            draggableItemData: { column, table: selectedMainTable },
            synonyms: func.synonymns,
            filterMethod: func.value,
            filterType: 'default',
            filterValue: {},
            relationOperator: 'AND',
          })
        );
        return [...filterOptions, ...nullFilterOptions, ...columnOptions];
      }) || [];
    return columns.flat().reverse();
  }, [selectedMainTable, tableAlias, stringColumnValues]);

  const isDisableSaveBtn: boolean = useMemo(
    () =>
      !chartSettings.measure?.length &&
      !chartSettings.yAxisList?.filter((item) => item)?.length &&
      !chartSettings.singleValue,
    [chartSettings]
  );

  const enabledCharts = useMemo(() => {
    const charts = getEnabledChart(generateMetricState.data || []);
    const isTimeSeries = selectedColumns.some((dim) =>
      DATE_TYPES.includes(dim.datatype)
    );
    if (groupByList.length && isTimeSeries) {
      return [
        ...charts.filter(
          (chart) =>
            ![CHART_TYPES.pivot, CHART_TYPES.pivotV2].includes(chart) &&
            chart !== CHART_TYPES.timeSeries
        ),
        CHART_TYPES.pivot,
        CHART_TYPES.timeSeries,
        CHART_TYPES.pivotV2,
      ];
    }
    if (groupByList.length)
      return [
        ...charts.filter(
          (chart) =>
            ![CHART_TYPES.pivot, CHART_TYPES.pivotV2].includes(chart) &&
            chart !== CHART_TYPES.timeSeries
        ),
        CHART_TYPES.pivot,
        CHART_TYPES.pivotV2,
      ];
    if (isTimeSeries)
      return [
        ...charts.filter(
          (chart) =>
            ![CHART_TYPES.pivot, CHART_TYPES.pivotV2].includes(chart) &&
            chart !== CHART_TYPES.timeSeries
        ),
        CHART_TYPES.timeSeries,
      ];

    return charts.filter(
      (chart) =>
        ![CHART_TYPES.pivot, CHART_TYPES.pivotV2].includes(chart) &&
        chart !== CHART_TYPES.timeSeries
    );
  }, [generateMetricState.data, groupByList, chartSettings.xAxis]);

  const chartTabType: 'CHART' | 'ERROR' | 'LOADING' | 'INIT' = useMemo(() => {
    if (
      generateMetricState.data.length &&
      !!(chartSettings.xAxis || chartSettings.yAxisList?.length) &&
      !(
        chartSettings.chartType === CHART_TYPES.singleValue &&
        generateMetricState.data?.[0]?.[chartSettings.singleValue || ''] ===
          null
      )
    ) {
      return 'CHART';
    }
    if (generateMetricState.error) {
      return 'ERROR';
    }
    if (generateMetricState.isLoading) {
      return 'LOADING';
    }
    return 'INIT';
  }, [generateMetricState, chartSettings]);

  // FUNCTIONS
  const onSubmitSearch = () => {
    if (!selectedMainTable || !workspaceId) return;
    setGenerateMetricState({
      data: [],
      error: '',
      isLoading: true,
      query: '',
    });
    const dimensions: Dimension[] = [];
    const aggregates: Aggregate[] = [];
    const filters: Filter[] = [];

    const orders: Order[] = [];
    const limit: string | undefined = selectedColumns
      .find((dim) => dim.limit && dim.configType !== 'FILTER')
      ?.limit?.toString();
    selectedColumns.forEach((dim) => {
      if (dim.sortType) {
        const order: Order = {
          method: dim.sortType,
          name: dim.alias,
          type: 'selected_column',
        };
        orders.push(order);
      }
      if (dim.configType === 'FILTER') {
        const keywords = dim.keyword
          ? dim.keyword
              .toLowerCase()
              .trim()
              .split(' ')
              ?.filter((o) => !questionKeywords.includes(o) && o)
          : [];
        const isNumber = NUMBER_TYPES.includes(dim.datatype?.toLowerCase());

        const operator =
          NUMBER_FILTER_SYNONYMNS.find((s) =>
            keywords.some((key) => s.synonymns.includes(key))
          )?.value || '';
        const numValue = keywords.find((keyword) => Number(keyword)) || 0;
        const filter: Filter =
          dim.filterType === 'custom'
            ? {
                alias: dim.name,
                columnName: dim.sql,
                dataType: 'CUSTOM',
                parentAlias: 'NULL',
                type: 'custom',
                method: 'NONE',
                value: 'NULL',
                relationOperator: dim.relationOperator,
              }
            : dim.filterType === 'client'
            ? {
                alias: dim.name,
                columnName: dim.name,
                dataType: dim.datatype,
                method: '=',
                parentAlias: dim.parentAlias,
                type: 'client',
                value: 'client_id_variable',
              }
            : {
                alias: dim.name,
                columnName: dim.name,
                method: isNumber
                  ? operator || dim.filterMethod || '='
                  : dim.filterMethod || '=',
                parentAlias: dim.parentAlias,
                dataType: dim.filterValue?.timeValue
                  ? 'TIME_COLUMN'
                  : dim.datatype,
                type: dim.filterValue?.timeValue ? 'time' : 'default',
                value: NULL_FILTER_SYNONYMNS.find(
                  (f) => f.value === dim.filterMethod
                )
                  ? ''
                  : isNumber
                  ? Number(numValue)
                  : dim.filterValue?.stringValue ||
                    dim.filterValue?.stringArray ||
                    dim.filterValue?.timeValue ||
                    dim.filterValue?.numberArray ||
                    dim.filterValue?.numberValue ||
                    '',
                relationOperator: dim.relationOperator,
              };
        filters.push(filter);
      }
      if (dim.configType === 'AGGREGATE') {
        const aggregate: Aggregate = {
          alias: dim.alias,
          columnName:
            dim.type.toLowerCase() === 'custom' ? dim.sql || '' : dim.name,
          dataType: dim.datatype,
          parentAlias: dim.parentAlias,
          type: dim.type.toLowerCase() === 'custom' ? 'custom' : 'default',
          method: dim.helperFunction || 'SUM',
        };
        aggregates.push(aggregate);
      } else if (dim.configType === 'DIMENSION') {
        const dimension: Dimension = {
          alias: dim.alias,
          columnName:
            dim.type.toLowerCase() === 'custom' ? dim.sql || '' : dim.name,
          dataType: dim.datatype,
          parentAlias: dim.parentAlias,
          type: dim.type.toLowerCase() === 'custom' ? 'custom' : 'default',
          helperFunction: dim.helperFunction,
          timeGrain: undefined,
          functionConfiguration: dim.functionConfiguration,
        };
        dimensions.push(dimension);
      }
    });
    const clientColumn = {
      name: selectedMainTable?.clientColumn || '',
      datatype:
        selectedMainTable?.columnsWithDataType?.find(
          (c) => c.name === selectedMainTable.clientColumn
        )?.dataType || '',
    };
    const clientColumnFilter: Filter = {
      alias: clientColumn.name,
      columnName: clientColumn.name,
      dataType: clientColumn.datatype,
      method: '=',
      parentAlias: tableAlias,
      type: 'client',
      value: clientId,
      relationOperator: 'AND',
    };
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      orders,
      table: {
        alias: tableAlias,
        id: selectedMainTable?.id,
        joins: [],
        name:
          selectedMainTable?.type === 'custom'
            ? selectedMainTable?.sql || ''
            : selectedMainTable?.tableName,
        schema: selectedMainTable?.schemaName,
        type: selectedMainTable?.type === 'custom' ? 'custom' : 'default',
      },
      limit: limit || DEFAULT_CREATE_DATSET_METRIC_CONFIG.limit,
      filters:
        !isDatabaseTenancy && clientColumn?.name
          ? [...filters, clientColumnFilter]
          : filters,
    };
    setConfiguration(newConfiguration);
    datasetMetricCreation(
      {
        data: {
          cId: clientId,
          configuration: newConfiguration,
          id: workspaceId,
        },
        token: token as string,
      },
      {
        onSuccess(generateMetricResponse: any) {
          const error = generateMetricResponse?.error;
          const result = generateMetricResponse?.data;
          const outputQuery = generateMetricResponse?.query;
          // const timeTaken = generateMetricResponse?.timeTaken;
          const metaData = generateMetricResponse?.metaData;
          if (error || generateError) {
            setGenerateMetricState({
              data: [],
              error: (error?.message as string) || SOMETHING_WENT_WRONG,
              isLoading: false,
              query: '',
            });
          } else if (result && outputQuery) {
            setGenerateMetricState({
              data: Array.isArray(result) ? result : [],
              error: '',
              isLoading: false,
              query: outputQuery,
            });
            setGroupByList(
              metaData?.groupbyColumnList?.map((col: string) =>
                col.replace(/`/g, '')
              ) || []
            );

            setChartFields({
              chartType: 'table',
              chartAggregateColumns: getChartFields(
                selectedColumns.filter((col) => col.configType === 'AGGREGATE')
              ),
              chartMetrics: getChartFields(
                selectedColumns.filter((col) => col.configType === 'AGGREGATE')
              ),
              chartDimensions: getChartFields(
                selectedColumns.filter((col) => col.configType === 'DIMENSION')
              ),
              configAggregates: newConfiguration.aggregates,
            });
          } else {
            setGenerateMetricState({
              data: [],
              error: SOMETHING_WENT_WRONG,
              isLoading: false,
              query: '',
            });
          }
        },
        onError() {
          setGenerateMetricState({
            data: [],
            error: SOMETHING_WENT_WRONG,
            isLoading: false,
            query: '',
          });
        },
      }
    );
  };
  const onAiQuery = () => {
    setAiResponseState({ error: '', isLoading: true });
    const inputMessage: ChatCompletionRequestMessage = {
      content: `Here is the table: ${JSON.stringify(selectedMainTable || {})}.
      suggest list of dimensions and measures.`,
      role: 'user',
    };
    if (token)
      reponseMutation.mutate(
        {
          token,
          data: {
            messages: [...messages, inputMessage],
          },
        },
        {
          onSuccess(data: any) {
            const outputMessage = data.result as ChatCompletionRequestMessage;
            setAiResponseState({ error: '', isLoading: false });

            setMessages([...messages, inputMessage, outputMessage]);
            console.log({ inputMessage, outputMessage });

            try {
              console.log(outputMessage);
            } catch (error) {
              console.error(
                'Failed to parse the extracted string as JSON:',
                error
              );
            }
          },
        }
      );
  };
  const onGenerateMetricData = (values: FieldValues) => {
    const questionString = values.questionString;
    setGenerateMetricState({
      data: [],
      error: '',
      isLoading: true,
      query: '',
    });
    setChartSettings(DEFAULT_CHART_SETTINGS);
    if (token)
      generateMetricData(
        { data: { questionString }, token },
        {
          onSuccess(data: any) {
            const response = data as GenerateMetricDataResponse;
            if (response.queryData?.length && response.query) {
              setGenerateMetricState({
                data: response.queryData,
                error: '',
                isLoading: false,
                query: response.query,
              });
              autoDetectCharts({ data: response.queryData, setChartSettings });
            } else if (response.error) {
              setGenerateMetricState({
                data: [],
                error: response.error,
                isLoading: false,
                query: response.query || '',
              });
            } else {
              setGenerateMetricState({
                data: [],
                error: SOMETHING_WENT_WRONG,
                isLoading: false,
                query: '',
              });
            }
          },
          onError() {
            setGenerateMetricState({
              data: [],
              error: SOMETHING_WENT_WRONG,
              isLoading: false,
              query: '',
            });
          },
        }
      );
    else
      setGenerateMetricState({
        data: [],
        error: '',
        isLoading: false,
        query: '',
      });
  };

  const onSubmitQuery = handleSubmit(onGenerateMetricData);
  const onColumnSizingChange = useCallback(
    (columnSizing: ColumnSizingState) =>
      setChartSettings((prev) => ({
        ...prev,
        tableSettings: {
          ...prev.tableSettings,
          columnSizing,
        },
      })),
    []
  );
  const onChangeHelperFunction = ({
    column,
    helperFunction,
    functionConfiguration,
  }: OnChangeHelperFunctionParams) => {
    const isNone = helperFunction.value === 'NONE';
    const newAlias = `${
      isNone
        ? column.name
        : `${getColumnNameKeyString(
            `${helperFunction.label.toLowerCase()} of`,
            companyIntegration?.name || ''
          )} ${column.name}`
    }`;
    const isAggregate = aggregateStrings.includes(helperFunction.value);
    const updatedList: SelectedColumn[] = selectedColumns.map((col) =>
      col.alias === column.alias
        ? {
            ...col,
            helperFunction: helperFunction.value,
            alias: newAlias,
            configType: isAggregate ? 'AGGREGATE' : 'DIMENSION',
            dropType: isAggregate ? 'METRIC' : 'DIMENSION',
            type: isNone ? 'DEFAULT' : 'HELPER_FUNCTION',
            functionConfiguration,
          }
        : col
    );
    setSelectedColumns(updatedList);
  };

  const onChangeAlias = ({ alias, column }: OnChangeAliasParams) => {
    setSelectedColumns((prev) =>
      prev.map((col) =>
        col.alias === column.alias
          ? {
              ...col,
              alias,
            }
          : col
      )
    );
  };

  const getFilterColumnValues = async () => {
    setStringColumnValues([]);
    const stringColumns: TableColumn[] =
      selectedMainTable?.columnsWithDataType?.filter(
        (col) =>
          STRING_TYPES.includes(col?.dataType?.toLowerCase() || '') ||
          col?.dataType?.toLowerCase()?.includes('char')
      ) || [];
    if (stringColumns.length && token && selectedMainTable) {
      for (let index = 0; index < stringColumns.length; index += 1) {
        const columnName = stringColumns[index]?.name;
        const data = await fetchColumnValues({
          columnName,
          wId: workspaceId,
          tableName: `${selectedMainTable?.schemaName}.${selectedMainTable?.tableName}`,
        });
        const values: string[] =
          (data as any)?.data &&
          Array.isArray(data?.data) &&
          (data as any)?.data.length
            ? data.data.map((col) => col.value)
            : [];
        setStringColumnValues((prev) => [
          ...prev,
          { column: columnName, values },
        ]);
      }
    } else {
      setStringColumnValues([]);
    }
  };
  // USEEFFECTS

  useEffect(() => {
    if (
      !(
        chartSettings.chartType === CHART_TYPES.stack &&
        chartSettings.chartType === CHART_TYPES.timeSeries &&
        chartSettings?.timeSeriesSettings?.seriesType?.[0]?.type === 'stack' &&
        chartSettings.seriesField === 'ungrouped'
      )
    ) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          showFullStacked: false,
        },
      }));
    }
  }, [
    chartSettings?.chartType,
    chartSettings?.timeSeriesSettings,
    chartSettings.seriesField,
  ]);
  useEffect(() => {
    const subsetError = clientSubsetData?.error;
    const companySubsetTableData = clientSubsetData;
    if (subsetError || !clientSubsetData) {
      setGenerateMetricState((prev) => ({
        ...prev,
        error: subsetError?.message as string,
      }));
    } else if (companySubsetTableData?.tableList?.length) {
      setCompanyIntegration({
        id: companySubsetTableData?.companyIntegrationId as string,
        name: companySubsetTableData?.dbName as string,
      });
    }
  }, [clientSubsetData]);
  useEffect(() => {
    if (!metric) return;
    setChartSettings(metric.chartOptions);
    setCompanyIntegration(metric.companyIntegration);
  }, [metric]);
  useEffect(() => {
    if (selectedMainTable) return;
    if (tableList.length) setSelectedMainTable(tableList?.[0]);
  }, [tableList, selectedMainTable]);
  useEffect(() => {
    if (selectedMainTable) {
      getFilterColumnValues();
    } else {
      setStringColumnValues([]);
    }
  }, [selectedMainTable]);
  return {
    isDisableSaveBtn,
    setChartSettings,
    setShowSaveMetricModal,
    isShowSaveMetricModal,
    register,
    errors,
    onSubmitQuery,
    generateMetricState,
    chartTabType,
    chartSettings,
    chartRef,
    onColumnSizingChange,
    watch,
    createExternalMetric,
    saveError,
    updateExternalMetric,
    clientSubsetData,
    previewTable,
    token,
    dashboardOptions,
    isCreatingMetric,
    tableList,
    selectedMainTable,
    setSelectedMainTable,
    aiResponseState,
    onAiQuery,
    autoCompleteDropdownOptions,
    selectedColumns,
    setSelectedColumns,
    functionOptions,
    setChartFields,
    onSubmitSearch,
    onChangeHelperFunction,
    onChangeAlias,
    chartOptions,
    isShowChartType,
    setShowChartType,
    enabledCharts: enabledCharts.filter(
      (chart) => ![CHART_TYPES.pivotV2, CHART_TYPES.timeSeries].includes(chart)
    ),
    stringColumnValues,
    isRef,
    setRef,
    pivotDrillState,
  };
};

export default useGenerateMetric;
