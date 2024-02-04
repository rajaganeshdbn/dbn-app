/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactAce from 'react-ace/lib/ace';
import { useDashboardContext } from './useDashboardContext';
import {
  Aggregate,
  CreateNewFilter,
  CreateNewSort,
  DatasetConfig,
  DatasetMetricCreationConfiguration,
  Dimension,
  Filter,
  FloatingDropDownOption,
  MetricsValue,
  Order,
  PivotDrillState,
  SelectedColumn,
  TableType,
} from '@/types';
import {
  CHART_TYPES,
  DATABASE,
  DATASET_NUMBER_HELPER_FUNCTIONS,
  DATASET_OTHER_HELPER_FUNCTIONS,
  DATASET_STRING_HELPER_FUNCTIONS,
  DATASET_TIME_HELPER_FUNCTIONS,
  DATE_TYPES,
  DEFAULT_CREATE_DATSET_METRIC_CONFIG,
  NUMBER_TYPES,
  SOMETHING_WENT_WRONG,
  STRING_TYPES,
  aggregateStrings,
} from '@/consts';
import { useDatasetMetricMutation } from '@/queries/externalDashboard.mutation';
import { getColumnNameKeyString } from '@/helpers';

type TableList = {
  tableName: string;
  columns: { name: string; as: string; datatype: string }[];
  clientColumn: string;
}[];

const useDatasetMetric = ({ ...config }: DatasetConfig) => {
  const {
    clientId,
    setError,
    setLoading,
    setData,
    setQuery,
    setGroupByList,
    clientSubsetData,
    chart,
    setChartSettings,
    dbName,
  } = config;
  const [pivotDrillState, setPivotDrillState] = useState<PivotDrillState>({
    data: [],
    error: '',
    isLoading: false,
    currentValue: '',
  });
  const [selectedDimensions, setSelectedDimensions] = useState<
    FloatingDropDownOption[]
  >([]);
  const [columnList, setColumnList] = useState<FloatingDropDownOption[]>([]);
  const [createdFilters, setCreatedFilters] = useState<CreateNewFilter[]>([]);
  const [createdSorts, setCreatedSorts] = useState<CreateNewSort[]>([]);
  const [selectedTable, setselectedTable] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [clientColumn, setClientColumn] = useState<{
    name: string;
    datatype: string;
  }>({
    name: '',
    datatype: '',
  });
  const [metrics, setMetrics] = useState<FloatingDropDownOption[]>([]);
  const [configuration, setConfiguration] =
    useState<DatasetMetricCreationConfiguration>(
      DEFAULT_CREATE_DATSET_METRIC_CONFIG
    );
  const [customFilterList, setCustomFilterList] = useState<MetricsValue[]>([]);

  const [companySubsetTableList, setCompanySubsetTableList] =
    useState<TableList>([]);
  const {
    mutate: datasetMetricCreation,
    error: generateError,
    isLoading: isGenerating,
  } = useDatasetMetricMutation();
  const { data: dashboardData, token } = useDashboardContext();
  const editorRef = useRef() as React.RefObject<ReactAce>;

  useEffect(() => {
    const subsetError = clientSubsetData?.error;
    const companySubsetTableData = clientSubsetData;
    if (subsetError || !clientSubsetData) {
      setError(subsetError?.message as string);
    } else if (companySubsetTableData?.tableList?.length) {
      setCompanySubsetTableList(
        (companySubsetTableData?.tableList || []) as TableList
      );
    }
  }, [clientSubsetData]);

  const tableList = useMemo(
    () =>
      companySubsetTableList.map((table: { tableName: string }) => ({
        value: table.tableName,
        label: table.tableName,
      })),
    [companySubsetTableList]
  );

  const setChartFields = ({
    chartType,
    metricParams,
    dimensionParams,
  }: {
    chartType: string;
    metricParams?: FloatingDropDownOption[];
    dimensionParams?: FloatingDropDownOption[];
  }) => {
    if (chartType === CHART_TYPES.singleValue) {
      setChartSettings((prev) => {
        const data = {
          ...prev,
          singleValue:
            [
              ...(dimensionParams || selectedDimensions),
              ...(metricParams || metrics),
            ]?.[0]?.label || '',
        };
        return data;
      });
    } else if (chartType === CHART_TYPES.table) {
      const tableFields = [
        ...(dimensionParams || selectedDimensions)?.map(
          (val) => val.alias || val.label || ''
        ),
        ...(metricParams || metrics)?.map(
          (val) => val.alias || val.label || ''
        ),
      ];

      setChartSettings((prev: any) => ({
        ...prev,
        xAxis:
          (dimensionParams || selectedDimensions)?.[0]?.alias ||
          (dimensionParams || selectedDimensions)?.[0]?.label ||
          '',
        yAxisList: tableFields || [],
      }));
    } else if (chartType === CHART_TYPES.waterfall) {
      setChartSettings((prev: any) => ({
        ...prev,
        xAxis:
          (dimensionParams || selectedDimensions)?.[0]?.alias ||
          (dimensionParams || selectedDimensions)?.[0]?.label ||
          '',
        yAxisList:
          [
            (metricParams || metrics)?.[0]?.alias ||
              (metricParams || metrics)?.[0]?.label,
          ] || [],
      }));
    } else if (chartType === CHART_TYPES.sankey) {
      const arr = [
        ...(dimensionParams || selectedDimensions).map(
          (item) => item.alias || item.label || ''
        ),
      ];
      setChartSettings((prev) => ({
        ...prev,
        sankeyValues: [
          arr[0] || '',
          arr[1] || '',

          (metricParams || metrics)?.[0]?.alias ||
            (metricParams || metrics)?.[0]?.label ||
            '',
        ],
      }));
    } else if (
      chartType === CHART_TYPES.funnel ||
      chartType === CHART_TYPES.boxplot
    ) {
      setChartSettings((prev) => ({
        ...prev,
        step:
          (dimensionParams || selectedDimensions)?.[0]?.alias ||
          (dimensionParams || selectedDimensions)?.[0]?.label,
        measure:
          (metricParams || metrics)?.[0]?.alias ||
          (metricParams || metrics)?.[0]?.label,
      }));
    } else if (chartType === CHART_TYPES.gauge) {
      setChartSettings((prev) => ({
        ...prev,
        gaugeSettings: {
          metric:
            (metricParams || metrics)?.[0]?.alias ||
            (metricParams || metrics)?.[0]?.label,
          dimensions: (dimensionParams || selectedDimensions).filter(
            (val) => val.labelType === 'dimension_aggregate'
          )?.[0]?.aggregate
            ? (dimensionParams || selectedDimensions).map(
                (val) => val.alias || val.label
              )
            : [],
        },
      }));
    } else if (chartType === CHART_TYPES.horizontalStackTable) {
      setChartSettings((prev) => ({
        ...prev,
        stackTableCols: [
          ...(metricParams || metrics)?.map((v) => v.alias || v.label),
        ],
        yAxisList: [
          ...(dimensionParams || selectedDimensions)?.map(
            (v) => v.alias || v.label
          ),
        ],
      }));
    } else {
      setChartSettings((prev: any) => ({
        ...prev,
        xAxis:
          (dimensionParams || selectedDimensions)?.[0]?.alias ||
          (dimensionParams || selectedDimensions)?.[0]?.label ||
          '',
        yAxisList: [
          ...(metricParams || metrics)?.map((val) => val.alias || val.label),
        ],
      }));
    }
  };

  const onGenerateDatasetmetric = ({
    prevConfiguration,
    metricParams,
    dimensionParams,
  }: {
    prevConfiguration?: DatasetMetricCreationConfiguration;
    metricParams?: FloatingDropDownOption[];
    dimensionParams?: FloatingDropDownOption[];
  }) => {
    const newConfigration = prevConfiguration || configuration;
    const clientColumnFilter: Filter = {
      alias: clientColumn.name,
      columnName: clientColumn.name,
      dataType: clientColumn.datatype,
      method: '=',
      parentAlias: newConfigration.table.alias,
      type: 'client',
      value: clientId,
      relationOperator: 'AND',
    };
    const configWithClientFilter: DatasetMetricCreationConfiguration = {
      ...newConfigration,
      filters:
        dashboardData?.companyTenancyType !== DATABASE && clientColumn?.name
          ? [...newConfigration.filters, clientColumnFilter]
          : newConfigration.filters,
    };
    if (prevConfiguration) setConfiguration(prevConfiguration);
    setError('');
    setLoading(true);
    setData([]);
    setQuery('');
    datasetMetricCreation(
      {
        data: {
          cId: clientId,
          configuration: configWithClientFilter,
          id: dashboardData?.workspace?.id,
        },
        token: token as string,
      },
      {
        onSuccess(generateMetricResponse: any) {
          const error = generateMetricResponse?.error;
          const result = generateMetricResponse?.data;
          const outputQuery = generateMetricResponse?.query;
          const timeTaken = generateMetricResponse?.timeTaken;
          const metaData = generateMetricResponse?.metaData;
          if (error || generateError) {
            setError((error?.message as string) || SOMETHING_WENT_WRONG);
            setLoading(false);
            setData([]);
            setQuery('');
            setGroupByList([]);
          } else if (result && outputQuery) {
            setError('');
            setLoading(false);
            setData(Array.isArray(result) ? result : []);
            setChartFields({
              chartType: chart,
              metricParams,
              dimensionParams,
            });
            setQuery(outputQuery);
            setGroupByList?.(
              metaData?.groupbyColumnList?.map((col: string) =>
                col.replace(/`/g, '')
              ) || []
            );
          } else {
            setError(SOMETHING_WENT_WRONG);
            setLoading(false);
            setData([]);
            setQuery('');
            setGroupByList([]);
          }
        },
        onError() {
          setError(SOMETHING_WENT_WRONG);
          setLoading(false);
          setData([]);
          setQuery('');
          setGroupByList([]);
        },
      }
    );
  };

  const onChangeTableSelection = (table: TableType) => {
    const [schemaName, tableName] = table.split('.');
    const tableOption = {
      value: `${schemaName}____${tableName}`,
      label: `${schemaName}.${tableName}`,
      icon: 'table',
    };
    setselectedTable(tableOption);
    const selectedCurrentTable = companySubsetTableList.find(
      (t: any) => t.tableName === table
    );
    const selectedCurrentColumns = selectedCurrentTable?.columns || [];
    const currentTableColumns: FloatingDropDownOption[] =
      selectedCurrentColumns?.map((column: any) => ({
        value: `${schemaName}_${tableName}____${column.name}____${column.datatype}____${schemaName}____${tableName}`,
        label: column.name,
      })) || [];

    const currentTableClientColumn = selectedCurrentTable?.clientColumn;
    setClientColumn({
      name: currentTableClientColumn || '',
      datatype:
        selectedCurrentColumns?.find((c) => c.name === currentTableClientColumn)
          ?.datatype || '',
    });

    if (currentTableColumns?.length && !isGenerating) {
      const prevLimit = 100;
      setColumnList(currentTableColumns);
      setCreatedFilters([]);
      setCreatedSorts([]);
      setSelectedDimensions([]);
      setMetrics([]);
      setConfiguration({
        ...DEFAULT_CREATE_DATSET_METRIC_CONFIG,
        dimensions: [],
        limit: `${prevLimit}`,
        table: {
          ...DEFAULT_CREATE_DATSET_METRIC_CONFIG.table,
          alias: `${schemaName}_${tableName}`,
          // id: configId,
          schema: schemaName,
          name: tableName,
        },
        aggregates: [],
      });
    }
  };

  const onGenerateChart = ({
    param,
    metricParams,
    dimensionParams,
  }: {
    param?: DatasetMetricCreationConfiguration;
    metricParams?: FloatingDropDownOption[];
    dimensionParams?: FloatingDropDownOption[];
  }) => {
    onGenerateDatasetmetric({
      prevConfiguration: param || configuration,
      metricParams,
      dimensionParams,
    });
  };

  const onApplySort = (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => {
    if (isClear) {
      onGenerateDatasetmetric({
        prevConfiguration: { ...configuration, orders: [] },
      });
      onComplete();
      return;
    }
    const orders: Order[] = createdSorts
      .filter((o, i) => i !== index)
      .map((sort) => {
        const type = sort.columnName.badge?.toLowerCase();
        const method = sort.method.value;
        if (!sort.columnName.value) return { method: '', name: '' };
        if (type === 'custom' || type === 'new')
          return { method, name: sort.columnName.label };
        const [parentAlias, columnName] = sort.columnName.value?.split('____');

        return {
          method: sort.method.value,
          name: `${parentAlias}.${columnName}`,
        };
      });
    setConfiguration((prev) => ({
      ...prev,
      orders: orders.filter((o) => o.name),
    }));
    onGenerateDatasetmetric({
      prevConfiguration: {
        ...configuration,
        orders: orders.filter((o) => o.name),
      },
    });
    onComplete();
  };

  // { Add this when we include custom columns }
  // const onSaveCustomFilter = (filter: CreateNewFilter) => {
  //   const filterIndex = customFilterList.findIndex((f) => f.as === filter.name);

  //   const filters: MetricsValue[] =
  //     filterIndex !== -1
  //       ? customFilterList.map((f) =>
  //           f.as === filter.name
  //             ? {
  //                 as: filter.name,
  //                 value: filter.sql,
  //                 isAggregate: false,
  //                 isDimension: false,
  //                 isFilter: true,
  //               }
  //             : f
  //         )
  //       : [
  //           ...customFilterList,
  //           {
  //             as: filter.name,
  //             value: filter.sql,
  //             isAggregate: false,
  //             isDimension: false,
  //             isFilter: true,
  //           },
  //         ];
  //   onSaveCustomColumn(filters);
  // };
  const onApplyFilter = (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => {
    if (isClear) {
      onGenerateDatasetmetric({
        prevConfiguration: { ...configuration, filters: [] },
      });
      onComplete();
      return;
    }
    const filters: Filter[] = createdFilters
      .filter((f, i) => i !== index)
      .map((f) => {
        const [parentAlias, columnName, datatype] =
          f.columnName.value?.split('____');
        const method = f.operator.value || '=';
        // if (f.type === 'custom') {
        //   return {
        //     alias: f.name,
        //     columnName: f.sql,
        //     dataType: 'CUSTOM',
        //     parentAlias: 'NULL',
        //     type: 'custom',
        //     method: 'NONE',
        //     value: 'NULL',
        //     relationOperator: f.relationOperator
        //       ?.value as Filter['relationOperator'],
        //   };
        // }
        // if (f.type === 'client') {
        //   return {
        //     alias: f.columnName.value,
        //     columnName,
        //     dataType: datatype,
        //     method: '=',
        //     parentAlias,
        //     type: 'client',
        //     value: 'client_id_variable',
        //   };
        // }
        return {
          alias: '',
          columnName,
          dataType: f.value.timeValue ? 'TIME_COLUMN' : datatype,
          method,
          parentAlias,
          type: f.value.timeValue ? 'time' : 'default',
          value:
            f.value.stringValue ||
            f.value.stringArray ||
            f.value.timeValue ||
            f.value.numberArray ||
            f.value.numberValue ||
            '',
          relationOperator: f.relationOperator
            ?.value as Filter['relationOperator'],
        };
      });
    setConfiguration((prev) => ({ ...prev, filters }));
    onGenerateDatasetmetric({
      prevConfiguration: { ...configuration, filters },
    });
    onComplete();
    // }
  };

  useEffect(() => {
    const dimensions: Dimension[] = [];
    [...selectedDimensions, ...metrics].forEach((dimension) => {
      const [parentAlias, columnName, datatype, schema, table] =
        dimension.value.split('____');

      if (!aggregateStrings.includes(dimension.aggregate ?? '')) {
        dimensions.push({
          columnName,
          alias: dimension.alias || columnName,
          dataType: datatype,
          parentAlias,
          type: 'default',
          timeGrain: undefined,
          helperFunction: dimension.aggregate || undefined,
        });
      }
    });
    setConfiguration((prev) => ({
      ...prev,
      dimensions,
    }));
  }, [selectedDimensions, metrics]);

  useEffect(() => {
    const selectedMetrics: Aggregate[] = [];
    metrics
      .filter((val) => val.labelType === 'metric_aggregate')
      .forEach((opt) => {
        const [parentAlias, columnName, datatype, schema, table] =
          opt.value.split('____');
        selectedMetrics.push({
          columnName,
          alias: opt.alias || columnName,
          dataType: datatype,
          parentAlias,
          type: 'default',
          method: opt.aggregate || 'COUNT',
        });
      });
    setConfiguration((prev) => ({
      ...prev,
      aggregates: selectedMetrics,
    }));
  }, [metrics.length]);

  const getChartFields = (colList: SelectedColumn[]): string[] => {
    return colList.map((col) =>
      getColumnNameKeyString(col.alias, dbName || '')
    );
  };
  const functionOptions = (col: any) => {
    const value = col.value;
    if (value) {
      const [parentAlias, columnName, datatype] = value?.split('____');
      if (DATE_TYPES.includes(datatype.toLowerCase()))
        return DATASET_TIME_HELPER_FUNCTIONS;
      if (NUMBER_TYPES.includes(datatype.toLowerCase()))
        return DATASET_NUMBER_HELPER_FUNCTIONS;
      if (
        STRING_TYPES.includes(datatype.toLowerCase()) ||
        datatype.toLowerCase().includes('char')
      )
        return DATASET_STRING_HELPER_FUNCTIONS;
    }
    return DATASET_OTHER_HELPER_FUNCTIONS;
  };
  const getFilterDropDownType = ({
    datatype,
    operator,
  }: {
    datatype: string;
    operator: string;
  }) => {
    const isNullFilter = operator === 'IS NULL' || operator === 'IS NOT NULL';
    const isInFilter = operator === 'IN' || operator === 'NOT IN';
    if (
      DATE_TYPES.includes(datatype?.toLowerCase()) &&
      !isNullFilter &&
      !isInFilter
    )
      return 'TIME_FILTER';

    if (NUMBER_TYPES.includes(datatype?.toLowerCase()) && !isNullFilter) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'INPUT_NUMBER_FIELD';
    }
    if (!isNullFilter) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'FILTER_DROPDOWN';
    }
    return 'FILTER_DROPDOWN';
  };
  useEffect(() => {
    setChartFields({
      chartType: chart,
      metricParams: metrics,
      dimensionParams: selectedDimensions,
    });
  }, [chart, metrics, selectedDimensions]);

  return {
    configuration,
    setConfiguration,
    selectedDimensions,
    setSelectedDimensions,
    metrics,
    setMetrics,
    columnList,
    onChangeTableSelection,
    tableList,
    onGenerateChart,
    createdSorts,
    setCreatedSorts,
    onApplySort,
    createdFilters,
    setCreatedFilters,
    getFilterDropDownType,
    workspaceId: dashboardData?.workspace?.id,
    editorRef,
    savedFilterListOptions: customFilterList?.map((value, index) => ({
      label: value.as,
      value: `${value.value}____${index}____${value.as}`,
      key: `${value.as}_${value.value}`,
    })),
    onApplyFilter,
    functionOptions,
    getChartFields,
    pivotDrillState,
  };
};

export default useDatasetMetric;
