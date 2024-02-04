/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  useCacheIntegrationSchemaMutation,
  useCreateDatasetMutation,
  useDatasetMetricCreationMutation,
  useSaveCustomSqlColumnMutation,
  useSqlQueryMutation,
} from 'utils/generated/graphql';
import { DatasetSettings, ForcastType, MetricsValue } from 'types';
import { consts, helpers, hooks, queries, types } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import ReactAce from 'react-ace/lib/ace';
import { FieldValues } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { format } from 'sql-formatter';
import {
  DatasetMetricCreationConfiguration,
  DatasetMetricCreationProps,
  Dimension,
  OnDropColumnParams,
  OnGenerateMetric,
  OnRemoveColumnParams,
  SetChartFieldParams,
  OnChangeHelperFunctionParams,
  Aggregate,
  OnChangeAliasParams,
  SelectedJoin,
  Join,
  JoinCondition,
  CustomSqlType,
  CreateNewFilter,
  CreateNewSort,
  Filter,
  Order,
  GroupByColumn,
  OnChangeCustomSqlColumnParams,
} from 'types/metric';
import {
  DATABASE_NAME,
  DATASET_NUMBER_HELPER_FUNCTIONS,
  DATASET_OTHER_HELPER_FUNCTIONS,
  DATASET_STRING_HELPER_FUNCTIONS,
  DATASET_TIME_HELPER_FUNCTIONS,
  DBN_SQL_TABLE,
  DEFAULT_CREATE_DATSET_METRIC_CONFIG,
  DEFAULT_FORECAST_VALUES,
  TIME_GRAIN_OPTIONS,
  TIME_SERIES_HELPER_FUNCTIONS,
} from 'consts/values';

import {
  DATE_TYPES,
  DRAGDROP,
  NUMBER_TYPES,
  POINTCLICK,
  REDSHIFT,
  SNOWFLAKE,
  MSSQL,
  STRING_TYPES,
  TABLE,
} from 'consts/application';
import { getCurrentUser } from 'helpers/application/auth';
import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';
import { TableColumn, TableType } from './useCompanySchema';

const getDroppedColumnDataType = (column: types.SelectedColumn): string => {
  if (column.configType === 'AGGREGATE') return 'number';
  if (column.helperFunction) return 'string';
  if (column.cast?.value && column?.cast?.value !== 'NONE')
    return column?.cast?.value;
  return column.datatype;
};
const useDatasetMetricNew = ({ config }: DatasetMetricCreationProps) => {
  const {
    setDrillDown,
    companyIntegrationId,
    customSqlColumns,
    setChartSettings,
    workspaceId,
    datasetSettings,
    drillDownSettings,
    chartSettings,
    dbName,
    selectedSchemaList,
    metricFilters,
    setMetricFilters,
    appliedRlsFilters,
    clientId,
    groupbyList,
    setGroupByList,
    tenancy,
    limit,
    setData,
    setDatasetSettings,
    setError,
    setLoading,
    setQuery,
    setTimeTaken,
    rlsValues,
    id,
    tableList,
    query,
    data,
    customDatasetList,
    databaseName,
    pythonResult,
    isPythonMode,
    pythonCode,
    globalFilters,
    importedMetricId,
    creatorMode,
    setCreatorMode,
    setSqlModeResultState,
    onChangeDrillDown,
  } = config;
  const editorRef = useRef() as React.RefObject<ReactAce>;
  const queryClient = useQueryClient();

  const {
    mutate: datasetMetricCreation,
    error: generateError,
    isLoading: isGenerating,
  } = useDatasetMetricCreationMutation();
  const { mutate: createDatasetMutate, isLoading: isCreatingDataset } =
    useCreateDatasetMutation();

  const {
    mutate: saveCustomSqlColumn,
    isLoading: isSavingCustomSqlColumn,
    mutateAsync: saveCustomSqlColumnAsync,
  } = useSaveCustomSqlColumnMutation();
  const { mutate: cacheIntegrationSchemaMutate } =
    useCacheIntegrationSchemaMutation();

  const { mutate: executeQuery, mutateAsync: executeSqlQueyAsync } =
    useSqlQueryMutation();
  // states
  const [datasetCreateState, setDatasetCreateState] = useState({
    error: '',
    isLoading: false,
  });

  const [configuration, setConfiguration] =
    useState<DatasetMetricCreationConfiguration>(
      DEFAULT_CREATE_DATSET_METRIC_CONFIG
    );
  const [selectedMainTable, setSelectedMainTable] = useState<TableType>();
  const [selectedDims, setSelectedDims] = useState<types.SelectedColumn[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<
    types.SelectedColumn[]
  >([]);
  const [selectedAutoCompleteCols, setSelectedAutoCompleteCols] = useState<
    types.SelectedColumn[]
  >([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState<
    types.SelectedColumn[]
  >([]);
  const [selectedJoins, setSelectedJoins] = useState<SelectedJoin[]>([]);
  const [createdFilters, setCreatedFilters] = useState<CreateNewFilter[]>([]);
  const [createdSorts, setCreatedSorts] = useState<CreateNewSort[]>([]);
  const [isInvalidColModal, setInvalidColModal] = useState<boolean>(false);
  const [isApplySavedSettings, setApplySavedSettings] = useState<boolean>(true);
  const [isFetchSqlModeResults, setIsFetchSqlModeResults] =
    useState<boolean>(true);
  const [isDatasetCreateModalShow, setDatasetCreateModalShow] =
    useState<boolean>(false);
  const [isCreateVirtualTable, setCreateVirtualTable] =
    useState<boolean>(false);
  const [isAddRemainingCols, setAddRemainingCols] = useState<boolean>(false);
  const [stringColumnValues, setStringColumnValues] = useState<
    {
      column: string;
      values: string[];
    }[]
  >([]);

  const [customColumnList, setCustomColumnList] = useState<MetricsValue[]>([]);
  const [customFilterList, setCustomFilterList] = useState<MetricsValue[]>([]);
  const [createNewColumnError, setCreateNewColumnError] = useState<string[]>(
    []
  );
  const [isSqlLoading, setSqlLoading] = useState<boolean>(false);
  const [isSqlTab, setSqlTab] = useState<boolean>(false);
  const [forecast, setForecast] = useState<ForcastType>(
    DEFAULT_FORECAST_VALUES
  );
  const [sqlColumnList, setSqlColumnList] = useState<TableColumn[]>([]);
  const [subQuery, setSubQuery] = useState<string>('');
  const [currentSelectedTable, setCurrentSelectedTable] =
    useState<types.FloatingDropDownOption>({
      value: '',
      label: '',
    });
  const [timeColumn, setTimeColumn] = useState<types.FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [timeGrainVal, setTimeGrainVal] =
    useState<types.FloatingDropDownOption>({
      value: 'NONE',
      label: 'Original Value',
    });
  const [comparisonLagSettings, setComparisonLagSettings] =
    useState<types.ComparisonLagSettings>({
      column: {
        value: '',
        label: '',
      },
      timeGrain: {
        value: 'NONE',
        label: 'Original Value',
      },
      periodLag: 1,
    });
  const [customSql, setCustomSql] = useState<CustomSqlType>({
    name: '',
    sql: '',
    isAggregate: false,
    isDimension: false,
    isFilter: false,
    tableName: {
      value: '',
      label: '',
    },
  });
  const [pivotDrillState, setPivotDrillState] = useState<types.PivotDrillState>(
    {
      data: [],
      error: '',
      isLoading: false,
      currentValue: '',
    }
  );

  // constants
  const appliedMetricFilters = useMemo(
    () =>
      helpers.getAppliedFilters(
        metricFilters || [],
        tenancy || TABLE,
        clientId || ''
      ),
    [metricFilters, tenancy, clientId]
  );
  const dimModifiers: types.Modifiers = useMemo(
    () => ({
      sorting: {
        isEnabled: true,
        isEnabledAutoSort: false,
        sortingType: 'both-axis',
        list: selectedDims,
        setList: setSelectedDims,
      },
    }),
    [selectedDims]
  );

  const metricModifiers: types.Modifiers = useMemo(
    () => ({
      sorting: {
        isEnabled: true,
        isEnabledAutoSort: false,
        sortingType: 'both-axis',
        list: selectedMetrics,
        setList: setSelectedMetrics,
      },
    }),
    [selectedMetrics]
  );
  const isFirstDrop = useMemo(
    () => selectedDims.length + selectedMetrics.length === 0,
    [selectedDims, selectedMetrics]
  );
  const isAllowDrillDown: boolean = useMemo(
    () =>
      configuration.dimensions.length > 1 && !!configuration.aggregates.length,
    [configuration.dimensions, configuration.aggregates]
  );
  const isDatabaseTenancy = useMemo(() => tenancy !== TABLE, [tenancy]);
  const isDisableDrillDown = useMemo(
    () =>
      [
        consts.CHART_TYPES.boxplot,
        consts.CHART_TYPES.funnel,
        consts.CHART_TYPES.gauge,
        consts.CHART_TYPES.geoBarMap,
        consts.CHART_TYPES.geoMap,
        consts.CHART_TYPES.geoScatterMap,
        consts.CHART_TYPES.horizontalStackTable,
        consts.CHART_TYPES.pivot,
        consts.CHART_TYPES.pivotV2,
        consts.CHART_TYPES.sankey,
        consts.CHART_TYPES.singleValue,
        consts.CHART_TYPES.timeSeries,
        consts.CHART_TYPES.treeMap,
      ].includes(chartSettings.chartType),
    [chartSettings.chartType]
  );

  const schemaTableList = useMemo(
    () =>
      !isDatabaseTenancy
        ? tableList
        : tableList?.filter((t) => t.schemaName === clientId),
    [clientId, isDatabaseTenancy, tableList]
  );
  const tableListOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const defaultTableOptions =
      schemaTableList?.map((table) => ({
        value: `${table.schemaName}^^^^^^${table.tableName}`,
        label: `${isDatabaseTenancy ? DATABASE_NAME : table.schemaName}.${
          table.tableName
        }`,
        icon: 'table',
      })) || [];
    const customTableOptions =
      customDatasetList?.map((table) => ({
        value: `none^^^^^^${table.sql}^^^^^^${table.tableName}^^^^^^custom`,
        label: `${table.tableName}`,
        icon: 'table',
      })) || [];
    return [defaultTableOptions, customTableOptions].flat(1);
  }, [customDatasetList, isDatabaseTenancy, schemaTableList]);
  const columnOptions: types.FloatingDropDownOption[] = useMemo(() => {
    if (selectedMainTable) {
      const { schemaName, tableName, alias, type } = selectedMainTable;

      const currentTableColumns: types.FloatingDropDownOption[] =
        type === 'custom'
          ? customDatasetList
              ?.find((t) => t.tableName === alias)
              ?.columnsWithDataType?.map((column) => ({
                value: `${alias}^^^^^^${column.name}^^^^^^${
                  column.dataType || 'other'
                }^^^^^^${schemaName}^^^^^^${alias}`,
                label: `${alias}.${column.name}`,
              })) || []
          : schemaTableList
              .find(
                (t) => t.schemaName === schemaName && t.tableName === tableName
              )
              ?.columnsWithDataType.map((column) => ({
                value: `${schemaName}_${tableName}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^${schemaName}^^^^^^${tableName}`,
                label: `${tableName}.${column.name}`,
              })) || [];
      const joinTables = configuration.table.joins;
      const joinColumnOptions: types.FloatingDropDownOption[] = joinTables
        .map((table) => {
          if (table.tableType === 'custom') {
            const customTableColumns =
              customDatasetList.find((t) => t.tableName === table.alias)
                ?.columnsWithDataType || [];
            const options: types.FloatingDropDownOption[] =
              customTableColumns.map((column) => ({
                value: `${table.alias}^^^^^^${column.name}^^^^^^${
                  column.dataType || 'other'
                }^^^^^^${table.schema}^^^^^^${table.alias}`,
                label: `${table.alias}.${column.name}`,
              }));
            return options;
          }
          const filteredColumns =
            schemaTableList.find(
              (t) => t.schemaName === table.schema && t.tableName === table.name
            )?.columnsWithDataType || [];
          const filteredColumnOptions: types.FloatingDropDownOption[] =
            filteredColumns.map((column) => ({
              value: `${table.alias}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^${table.schema}^^^^^^${table.name}`,
              label: `${table.name}.${column.name}`,
            }));
          return filteredColumnOptions;
        })
        .flat();
      const options: types.FloatingDropDownOption[] =
        [currentTableColumns, joinColumnOptions].flat() || [];
      return options;
    }
    return [];
  }, [
    selectedMainTable,
    schemaTableList,
    configuration.table.joins,
    customDatasetList,
  ]);
  const dateTimeColumnList: types.FloatingDropDownOption[] = useMemo(
    () =>
      columnOptions.filter((option) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [parentAlias, columnName, datatype] =
          option.value.split('^^^^^^');
        return DATE_TYPES.includes(datatype.toLowerCase());
      }) || [],
    [columnOptions]
  );
  const selectedTable: types.FloatingDropDownOption = useMemo(
    () =>
      selectedMainTable
        ? selectedMainTable?.type === 'custom'
          ? {
              value: `none^^^^^^${selectedMainTable?.sql}^^^^^^${
                selectedMainTable?.alias || DBN_SQL_TABLE
              }^^^^^^custom`,
              label: selectedMainTable?.alias || DBN_SQL_TABLE,
              icon: 'table',
            }
          : {
              value: `${selectedMainTable?.schemaName}^^^^^^${selectedMainTable?.tableName}`,
              label: `${
                isDatabaseTenancy
                  ? DATABASE_NAME
                  : selectedMainTable?.schemaName
              }.${selectedMainTable?.tableName}`,
              icon: 'table',
            }
        : { value: '', label: '', icon: 'table' },
    [isDatabaseTenancy, selectedMainTable]
  );
  const joinTableOption: types.FloatingDropDownOption[] = useMemo(() => {
    if (selectedTable.value) {
      return [...selectedJoins.map((join) => join.tableName), selectedTable];
    }
    return [];
  }, [selectedJoins, selectedTable]);

  const selectedJoinColumnOptions = useMemo(() => {
    if (isSqlTab) {
      return (
        sqlColumnList?.map?.((column) => ({
          value: `${DBN_SQL_TABLE}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^none^^^^^^${DBN_SQL_TABLE}`,
          label: `${column.name}`,
        })) || []
      );
    }
    const [joinSchemaName, joinTableName, joinAlias, joinTableType] =
      currentSelectedTable.value?.split('^^^^^^');
    if (joinTableType === 'custom') {
      const customTableColumns =
        customDatasetList.find((table) => table.tableName === joinAlias)
          ?.columnsWithDataType || [];
      const options: types.FloatingDropDownOption[] = customTableColumns.map(
        (column) => ({
          value: `${joinAlias}^^^^^^${column.name}^^^^^^${
            column.dataType || ''
          }^^^^^^none^^^^^^${joinAlias}`,
          label: `${column.name}`,
        })
      );
      return options;
    }
    const options: types.FloatingDropDownOption[] =
      schemaTableList
        .find(
          (t) =>
            t.schemaName === joinSchemaName && t.tableName === joinTableName
        )
        ?.columnsWithDataType?.map?.((column) => ({
          value: `${joinSchemaName}_${joinTableName}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^${joinSchemaName}^^^^^^${joinTableName}`,
          label: `${column.name}`,
        })) || [];
    return options;
  }, [
    currentSelectedTable.value,
    schemaTableList,
    customDatasetList,
    isSqlTab,
    sqlColumnList,
  ]);

  const arithmeticColumnOptions: types.SelectedColumn[] = useMemo(() => {
    if (!selectedMainTable) return [];
    const joinTables = configuration.table.joins;
    const joinTableList: TableType[] =
      (joinTables
        .map((table) => {
          if (table.tableType === 'custom') {
            return customDatasetList.find((t) => t.tableName === table.alias);
          }
          return schemaTableList?.find(
            (t) => t.schemaName === table.schema && t.tableName === table.name
          );
        })
        ?.filter((table) => table) as TableType[]) || [];
    const options: types.SelectedColumn[] = [
      ...joinTableList,
      selectedMainTable,
    ]
      ?.map((table) => {
        const tableAlias =
          table?.type === 'custom'
            ? table?.alias || DBN_SQL_TABLE
            : `${table?.schemaName}_${table?.tableName}`;

        const mainTableColumnOptions: types.SelectedColumn[] =
          table?.columnsWithDataType?.map((column) => ({
            alias: column.name,
            configType: column.isAggregate ? 'AGGREGATE' : 'DIMENSION',
            datatype: column.dataType,
            draggableItemData: { column, table },
            dropType: 'DIMENSION',
            index: 0,
            name: column.name,
            parentAlias: tableAlias,
            sql: column.sql || '',
            table,
            type: column.type === 'custom' ? 'CUSTOM' : 'DEFAULT',
          })) || [];
        return mainTableColumnOptions;
      })
      .flat();
    return options;
  }, [
    configuration.table.joins,
    customDatasetList,
    schemaTableList,
    selectedMainTable,
  ]);

  const savedFilterListOptions: types.FloatingDropDownOption[] = useMemo(
    () =>
      customFilterList.map((value, index) => ({
        label: value.as,
        value: `${value.value}^^^^^^${index}^^^^^^${value.as}`,
        key: `${value.as}_${value.value}`,
      })),
    [customFilterList]
  );
  const sortColumnOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const pivotTableSettings2 = chartSettings?.pivotTableSettings2;
    const rows = pivotTableSettings2?.dimensions || [];
    const headers = pivotTableSettings2?.headers || [];
    const measures = pivotTableSettings2?.measures || [];
    const allowedRows = rows.slice(0, 1);
    const allowedColumns = [...headers, ...allowedRows, ...measures];
    const [joinSchemaName, joinTableName, joinAlias, joinTableType] =
      currentSelectedTable?.value?.split('^^^^^^');
    const tableAlias =
      joinTableType === 'custom'
        ? joinAlias || DBN_SQL_TABLE
        : `${joinSchemaName}_${joinTableName}`;
    const defaultOptions: types.FloatingDropDownOption[] =
      selectedJoinColumnOptions.map((o) => ({
        ...o,
        badge: 'Default',
      }));
    const groupbyOptions: types.FloatingDropDownOption[] = selectedGroupBy
      .filter((col) =>
        col.table?.type === 'custom'
          ? col.table?.alias === joinAlias
          : col.table?.tableName === joinTableName &&
            col.table?.schemaName === joinSchemaName
      )
      .map((column) => ({
        value: `${column.parentAlias}^^^^^^${
          column.type === 'CUSTOM' ? column.sql : column.name
        }^^^^^^${column.datatype}^^^^^^none^^^^^^${column.table?.tableName}`,
        label: `${column.alias}`,
        badge: 'Group By',
      }));
    const customColumns: types.FloatingDropDownOption[] = customColumnList.map(
      (column) => ({
        value: `${tableAlias}^^^^^^${column.value}^^^^^^${
          column.isAggregate ? 'number' : 'string'
        }^^^^^^${joinSchemaName}^^^^^^${joinTableName}`,
        label: `${column.as}`,
        badge: 'Custom',
      })
    );
    const newColumns: types.FloatingDropDownOption[] = [
      ...selectedMetrics,
      ...selectedDims?.filter((column) => {
        if (
          consts.DATE_TYPES.includes(
            column.cast?.value?.toLowerCase() || column.datatype?.toLowerCase()
          )
        )
          return false;
        return true;
      }),
    ]
      .filter((col) =>
        col.table?.type === 'custom'
          ? col.table?.alias === joinAlias
          : col.table?.tableName === joinTableName &&
            col.table?.schemaName === joinSchemaName
      )
      .map((column) => ({
        value: `${column.parentAlias}^^^^^^${column.name}^^^^^^${column.datatype}^^^^^^none^^^^^^${column.table?.tableName}`,
        label: `${column.alias}`,
        badge: 'New',
      }));
    const isPivotChart = chartSettings.chartType === consts.CHART_TYPES.pivotV2;
    const allowedNewColumns = isPivotChart
      ? newColumns?.filter((column) => allowedColumns.includes(column.label))
      : newColumns;
    return configuration.groupByColumnList?.length
      ? [...newColumns, ...groupbyOptions]
      : configuration.aggregates.length
      ? [...allowedNewColumns]
      : [...defaultOptions, ...newColumns, ...customColumns];
  }, [
    selectedMetrics,
    selectedDims,
    selectedJoinColumnOptions,
    configuration,
    currentSelectedTable,
    customColumnList,
    selectedGroupBy,
    chartSettings?.pivotTableSettings2,
  ]);
  const filterColumnOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const [joinSchemaName, joinTableName, joinAlias, joinTableType] =
      currentSelectedTable?.value?.split('^^^^^^');

    const defaultOptions: types.FloatingDropDownOption[] =
      selectedJoinColumnOptions.map((o) => ({
        ...o,
        badge: 'Default',
      }));

    const newColumns: types.FloatingDropDownOption[] = [
      ...selectedMetrics,
      ...selectedDims,
    ]
      .filter((col) =>
        col.table?.type === 'custom'
          ? col.table?.alias === joinAlias &&
            col.type !== 'CUSTOM' &&
            col.configType === 'AGGREGATE'
          : col.table?.tableName === joinTableName &&
            col.table?.schemaName === joinSchemaName &&
            col.type !== 'CUSTOM' &&
            col.configType === 'AGGREGATE'
      )
      .map((column) => {
        const datatype = getDroppedColumnDataType(column);
        return {
          value: `${column.parentAlias}^^^^^^${column.name}^^^^^^${datatype}^^^^^^none^^^^^^${column.table?.tableName}^^^^^^${column.helperFunction}^^^^^^${column.alias}^^^^^^${column.configType}`,
          label: `${column.alias}`,
          badge: 'New',
        };
      });
    return [...defaultOptions, ...newColumns];
  }, [
    selectedMetrics,
    selectedDims,
    selectedJoinColumnOptions,
    currentSelectedTable,
  ]);
  const groupByColumOptions: types.SelectedColumn[] = useMemo(() => {
    const [joinSchemaName, joinTableName, joinAlias, joinTableType] =
      currentSelectedTable?.value?.split('^^^^^^');
    const currentTable: TableType | undefined =
      joinTableType === 'custom'
        ? customDatasetList.find((table) => table.tableName === joinAlias)
        : schemaTableList.find(
            (t) =>
              t.schemaName === joinSchemaName && t.tableName === joinTableName
          );
    const tableAlias =
      currentTable?.type === 'custom'
        ? currentTable?.alias || DBN_SQL_TABLE
        : `${currentTable?.schemaName}_${currentTable?.tableName}`;
    const customColumns: TableColumn[] = customColumnList.map((col) => ({
      name: col.as,
      as: col.isAggregate ? 'number' : 'string',
      dataType: col.isAggregate ? 'number' : 'string',
      sql: col.value,
      type: 'custom',
      isAggregate: col.isAggregate,
    }));
    const columns: TableColumn[] = [
      ...(currentTable?.columnsWithDataType || []),
      ...customColumns,
    ];

    const defaultColumns: types.SelectedColumn[] = currentTable
      ? columns.map((column, i) => ({
          alias: column.name,
          configType: column.isAggregate ? 'AGGREGATE' : 'DIMENSION',
          datatype: column.dataType,
          dropType: 'DIMENSION',
          index: i,
          name: column.name,
          parentAlias: tableAlias,
          table: currentTable,
          type: column.type === 'custom' ? 'CUSTOM' : 'DEFAULT',
          helperFunction: undefined,
          sql: column.sql || '',
          draggableItemData: { column, table: currentTable },
        }))
      : [];
    return defaultColumns;
  }, [
    currentSelectedTable,
    customDatasetList,
    schemaTableList,
    customColumnList,
  ]);
  // utility functions

  const replaceUnderScore = (
    option: types.FloatingDropDownOption
  ): types.FloatingDropDownOption => {
    return {
      ...option,
      label: option?.label?.replace('____', '^^^^^^'),
      value: option?.value?.replace('____', '^^^^^^'),
    };
  };
  const clearSelection = () => {
    setQuery('');
    setLoading(false);
    setSelectedMainTable(undefined);
    setData([]);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setSelectedDims([]);
    setSelectedMetrics([]);
    setConfiguration(DEFAULT_CREATE_DATSET_METRIC_CONFIG);
  };

  const validateColumn = (table: TableType) => {
    return (
      !(
        table.schemaName === selectedMainTable?.schemaName &&
        table.tableName === selectedMainTable?.tableName
      ) &&
      !selectedJoins.find((opt) => {
        const [schemaName, tableName] = opt.tableName.value.split('^^^^^^');
        return table.schemaName === schemaName && table.tableName === tableName;
      })
    );
  };
  const getChartFields = (colList: types.SelectedColumn[]): string[] => {
    return colList.map((col) =>
      dbName.toLowerCase() === REDSHIFT ? col.alias.toLowerCase() : col.alias
    );
  };
  const getSavedChartFields = (optionList: string[]): string[] => {
    if (data?.length) {
      const options = Object.keys(data?.[0] || {});
      return optionList.filter((o) => options.includes(o));
    }
    return [];
  };
  const functionOptions = (
    col?: types.SelectedColumn,
    dataType?: string
  ): types.FloatingDropDownOption[] => {
    const castedDataType =
      col?.cast?.value === 'NONE' ? undefined : col?.cast?.value;
    const datatype = dataType || castedDataType || col?.datatype;
    if (datatype) {
      if (consts.DATE_TYPES.includes(datatype?.toLowerCase()))
        return chartSettings.chartType === consts.CHART_TYPES.timeSeries
          ? []
          : DATASET_TIME_HELPER_FUNCTIONS;
      if (consts.NUMBER_TYPES.includes(datatype?.toLowerCase()))
        return DATASET_NUMBER_HELPER_FUNCTIONS;
      if (
        consts.STRING_TYPES.includes(datatype?.toLowerCase()) ||
        datatype?.toLowerCase()?.includes('char')
      )
        if (dataType)
          return DATASET_STRING_HELPER_FUNCTIONS.filter(
            (f) => !consts.LEAST_USED_STRING_FUNCTIONS.includes(f.value)
          );
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
    const isEqual = operator === '=';
    const isEditableInput = operator === 'LIKE' || operator === 'REGEX';
    if (
      DATE_TYPES.includes(datatype?.toLowerCase()) &&
      !isNullFilter &&
      !isInFilter &&
      isEqual
    )
      return 'TIME_FILTER';

    if (
      consts.NUMBER_TYPES.includes(datatype?.toLowerCase()) &&
      !isNullFilter
    ) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'INPUT_NUMBER_FIELD';
    }
    if (isEditableInput) return 'INPUT_TEXT_FIELD';

    if (!isNullFilter) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'FILTER_DROPDOWN';
    }
    return 'FILTER_DROPDOWN';
  };
  const isDateStringValid = (dateString: string): string => {
    // Define a regular expression for common date formats (MM/DD/YYYY or YYYY-MM-DD).
    const dateRegex: RegExp = /^(\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})/;

    // Check if the string matches the date regular expression
    if (dateRegex.test(dateString)) {
      const date: Date = new Date(dateString);
      return !Number.isNaN(date) ? 'date' : 'string'; // Return true if the Date object is valid.
    }

    return 'string'; // Return false if the string doesn't match the date format.
  };

  // set state functions
  // TODO: sankey dag error
  // TODO: timeseries auto select date column from dims
  // TODO: forecast selected dimensions and metrics
  const setChartFields = ({
    chartType,
    chartDimensions,
    chartMetrics,
    chartAggregateColumns,
    resultData,
    configAggregates,
    pivotHeaderColumns,
  }: SetChartFieldParams) => {
    const isAutoCompleteMode = creatorMode !== DRAGDROP;
    const dims =
      chartDimensions ??
      (isAutoCompleteMode
        ? getSavedChartFields(
            getChartFields(
              selectedAutoCompleteCols?.filter(
                (col) => col.configType === 'DIMENSION'
              )
            )
          )
        : getSavedChartFields(getChartFields(selectedDims)));
    const metrics =
      chartMetrics ??
      (isAutoCompleteMode
        ? getSavedChartFields(
            getChartFields(
              selectedAutoCompleteCols.filter(
                (col) => col.configType === 'AGGREGATE'
              )
            )
          )
        : getSavedChartFields(getChartFields(selectedMetrics)));
    const aggregateColumns =
      chartAggregateColumns ??
      (isAutoCompleteMode
        ? getSavedChartFields(
            getChartFields(
              selectedAutoCompleteCols.filter(
                (col) => col.configType === 'AGGREGATE'
              )
            )
          )
        : getSavedChartFields(
            getChartFields(
              selectedMetrics.filter((col) => col.configType === 'AGGREGATE')
            )
          ));

    if (
      metrics.length === 0 &&
      ![consts.CHART_TYPES.table, consts.CHART_TYPES.singleValue].includes(
        chartType || chartSettings.chartType
      ) &&
      isAutoCompleteMode
    ) {
      const { numberKeys, otherKeys } = helpers.indentifyKeys(
        resultData || data || []
      );
      const xAxisCol = dims?.find((val) => otherKeys?.includes(val));
      if (chartType === consts.CHART_TYPES.gauge) {
        setChartSettings((prev: any) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          gaugeSettings: {
            dimensions: otherKeys,
            metric: numberKeys?.[0],
          },
        }));
      } else if (chartType === consts.CHART_TYPES.horizontalStackTable) {
        setChartSettings((prev) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          stackTableCols: numberKeys,
          yAxisList: otherKeys,
        }));
      } else if (
        [consts.CHART_TYPES.funnel, consts.CHART_TYPES.boxplot].includes(
          chartType || ''
        )
      ) {
        setChartSettings((prev) => ({
          ...prev,
          chartType: chartType || prev.chartType,
          step: otherKeys?.[0],
          measure: numberKeys?.[0],
        }));
      } else if (chartType === consts.CHART_TYPES.sankey) {
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
    if (chartType === consts.CHART_TYPES.singleValue) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        singleValue: metrics?.[0] || dims?.[0],
      }));
    } else if (
      aggregateColumns.length &&
      [consts.CHART_TYPES.pivot, consts.CHART_TYPES.treeMap].includes(
        chartType || ''
      ) &&
      (data?.length || resultData?.length)
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
      [consts.CHART_TYPES.pivotV2].includes(
        chartType || chartSettings.chartType
      ) &&
      (data?.length || resultData?.length)
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        pivotTableSettings2: {
          ...chartSettings.pivotTableSettings2,
          dimensions: dims,
          headers: pivotHeaderColumns || [],
          measures: aggregateColumns,
          dims: chartDimensions || getChartFields(selectedDims) || [],
          aggregates: configAggregates || configuration.aggregates || [],
        },
      }));
    } else if (chartType === consts.CHART_TYPES.table) {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        yAxisList: [...dims, ...metrics],
      }));
    } else if (chartType === consts.CHART_TYPES.waterfall) {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        xAxis: dims?.[0],
        yAxisList: [metrics?.[0]],
      }));
    } else if (chartType === consts.CHART_TYPES.sankey) {
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
      chartType === consts.CHART_TYPES.funnel ||
      chartType === consts.CHART_TYPES.boxplot
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        step: dims?.[0] || '',
        measure: metrics?.[0],
      }));
    } else if (chartType === consts.CHART_TYPES.horizontalStackTable) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        stackTableCols: metrics || [],
        yAxisList: dims,
      }));
    } else if (chartType === consts.CHART_TYPES.gauge) {
      setChartSettings((prev) => ({
        ...prev,
        chartType: chartType || prev.chartType,
        gaugeSettings: {
          dimensions: dims,
          metric: aggregateColumns?.[0] || metrics?.[0],
        },
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
  const onGenerateDatasetMetric = ({
    prevConfiguration: newConfig,
    onSuccess,
    prevLimit,
    chartFieldParams,
    updatedDims,
    updatedMetrics,
    selectedMainTable: mainTable,
    updatedAutoCompleteCols,
    isTimeseriesAction,
    isPivotAction,
  }: OnGenerateMetric) => {
    const selectedChart =
      chartFieldParams?.chartType || chartSettings.chartType;
    const chartType =
      !updatedMetrics?.length && selectedChart === consts.CHART_TYPES.combo
        ? (consts.CHART_TYPES.line as types.ChartSettingsType['chartType'])
        : selectedChart;
    const isNotPivotAction =
      !isPivotAction && chartType === consts.CHART_TYPES.pivotV2;
    const isNotTimeseriesAction =
      !isTimeseriesAction && chartType === consts.CHART_TYPES.timeSeries;
    if (isNotPivotAction) {
      setPivotDrillState({
        data: [],
        error: '',
        isLoading: false,
        currentValue: '',
      });
    }
    const prevConfiguration: DatasetMetricCreationConfiguration | undefined =
      newConfig
        ? {
            ...newConfig,
            rlsValues,
            rlsConditions: appliedMetricFilters || [],
            isAllClient: false,
            globalFilters,
          }
        : undefined;
    if (prevConfiguration) setConfiguration(prevConfiguration);
    const isAutoCompleteMode = creatorMode !== DRAGDROP;
    const settings: DatasetSettings = {
      selectedTable,
      selectedJoins,
      configuration: {
        ...(prevConfiguration || configuration),
        limit: prevLimit || limit,
      },
      clientColumn: { value: '', label: '' },
      comparisonLag: 0,
      customColumnList,
      isIncludeTime: false,
      isNewDataset: true,
      timeColumn,
      timeGrainValue: '',
      timeGrainVal,
      forecast,
      createdNewColumnOptions: [],
      selectedCustomColumns: [],
      selectedManageColumns: [],
      selectedNewManageColumns: [],
      createdFilters,
      createdSorts,
      comparisonLagSettings,
      selectedCustomGroups: [],
      selectedGroupColumns: [],
      metrics:
        (prevConfiguration || configuration).aggregates.map((agr) => ({
          as: agr.alias,
          value: agr.columnName,
        })) || [],
      selectedDimensions: (prevConfiguration || configuration).aggregates.length
        ? (prevConfiguration || configuration).dimensions.map(
            (dim) => dim.alias
          ) || []
        : [],
      newDatasetSettings: {
        configuration: {
          ...(prevConfiguration || configuration),
          limit: prevLimit || limit,
        },
        metrics:
          (prevConfiguration || configuration).aggregates.map((agr) => ({
            as: agr.alias,
            value: agr.columnName,
          })) || [],
        selectedDimensions:
          (prevConfiguration || configuration).dimensions.map(
            (dim) => dim.alias
          ) || [],
        selectedGroupBy,
        selectedDims: updatedDims || selectedDims,
        selectedMetrics: updatedMetrics || selectedMetrics,
        selectedAutoCompleteColumns:
          updatedAutoCompleteCols || selectedAutoCompleteCols,
        selectedMainTable: mainTable || selectedMainTable,
        type: 'NEW',
        sqlColumnList,
        isSqlMode: isSqlTab,
        subQuery,
        isPythonMode,
        pythonCode,
        isAutoCompleteMode,
      },
    };
    setDatasetSettings(settings);
    setError(undefined);
    setLoading(true);
    setData([]);
    setQuery('');
    if (
      !isAutoCompleteMode &&
      (settings.newDatasetSettings?.selectedDims?.length || 0) +
        (settings.newDatasetSettings?.selectedMetrics?.length || 0) ===
        0
    ) {
      clearSelection();
      return;
    }
    if (isPythonMode) {
      const dataColumns = Object.keys(pythonResult[0]).filter((col) =>
        settings.configuration?.dimensions.some((d) => d.columnName === col)
      );
      setData(
        pythonResult.map((row) => {
          const obj: Record<string, any> = {};
          dataColumns.forEach((key) => {
            obj[key] = row[key];
          });
          return obj;
        })
      );
      setChartFields({
        chartType,
        chartDimensions: chartFieldParams?.chartDimensions,
        chartMetrics: chartFieldParams?.chartMetrics,
        chartAggregateColumns: chartFieldParams?.chartAggregateColumns,
        configAggregates: prevConfiguration?.aggregates,
        pivotHeaderColumns: chartFieldParams?.pivotHeaderColumns,
      });
      setLoading(false);
    } else {
      let datasetConfiguration: DatasetMetricCreationConfiguration =
        prevConfiguration || configuration;
      let pivotDimensions: types.SelectedColumn[] = [];
      let pivotMetrics: types.SelectedColumn[] = [];
      let pivotHeaders: types.SelectedColumn[] = [];
      if (isNotPivotAction) {
        const headers = chartSettings.pivotTableSettings2?.headers || [];
        const { headerColumns, nonHeaderColumns } = (
          updatedDims || selectedDims
        ).reduce(
          (
            result: {
              headerColumns: types.SelectedColumn[];
              nonHeaderColumns: types.SelectedColumn[];
            },
            c: types.SelectedColumn
          ) => {
            if (headers.includes(c.alias)) {
              result.headerColumns.push(c);
            } else {
              result.nonHeaderColumns.push(c);
            }
            return result;
          },
          { headerColumns: [], nonHeaderColumns: [] }
        );
        pivotDimensions = nonHeaderColumns.slice(0, 1);
        pivotMetrics = updatedMetrics || selectedMetrics;
        pivotHeaders = headerColumns;
        const newColumnList: types.SelectedColumn[] = [
          ...pivotDimensions,
          ...(updatedMetrics || selectedMetrics),
          ...headerColumns,
        ];
        const { aggregates, dimensions } =
          helpers.getDimensionsAndAggregates(newColumnList);
        datasetConfiguration = {
          ...datasetConfiguration,
          dimensions,
          aggregates,
          orders: datasetConfiguration?.orders?.filter((order) => {
            if (order.type === 'selected_column') {
              return newColumnList.some(
                (column) => column.alias === order.name
              );
            }
            return true;
          }),
        };
        setConfiguration(datasetConfiguration);
      }
      const pivotChartFieldParams = {
        chartDimensions: chartFieldParams?.chartDimensions,
        chartMetrics: getChartFields(pivotMetrics),
        chartAggregateColumns: getChartFields(
          pivotMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
        pivotHeaderColumns: getChartFields(pivotHeaders),
      };
      let timeseriesDimensions: types.SelectedColumn[] = [];
      let timeseriesMetrics: types.SelectedColumn[] = [];
      if (isNotTimeseriesAction) {
        const seriesField = chartSettings?.seriesField || '';
        const format =
          chartSettings?.timeSeriesSettings?.groupBySettings?.value || 'montly';
        const isGroupBy = seriesField && seriesField !== 'ungrouped';
        const timeDimension = selectedDims.find((dim) =>
          consts.DATE_TYPES.includes(
            dim?.cast?.value?.toLowerCase() ||
              dim?.datatype?.toLowerCase() ||
              ''
          )
        );
        if (!timeDimension) return;
        const alias: string = `${format} of ${timeDimension.name}`;
        const newTimeDimension: types.SelectedColumn = {
          ...timeDimension,
          helperFunction: 'date format',
          functionConfiguration: {
            dateFormat: helpers.getFormat(
              { label: format, value: format },
              dbName
            ),
          },
          alias: `${format} of ${timeDimension.name}`,
        };
        setSelectedDims((prev) =>
          prev.map((dim) =>
            dim.alias === timeDimension.alias ? newTimeDimension : dim
          )
        );
        const seriesDimension = isGroupBy
          ? selectedDims.find((dim) => dim.alias === seriesField)
          : undefined;
        const updatedDimensions = seriesDimension
          ? [newTimeDimension, seriesDimension]
          : [newTimeDimension];
        timeseriesDimensions = updatedDimensions;
        timeseriesMetrics = updatedMetrics || selectedMetrics;
        const newColumnList: types.SelectedColumn[] = [
          ...updatedDimensions,
          ...selectedMetrics,
        ];
        const { aggregates, dimensions } =
          helpers.getDimensionsAndAggregates(newColumnList);
        const orders: Order[] = [
          { method: 'ASC', name: alias, type: 'selected_column' },
        ];

        datasetConfiguration = {
          ...configuration,
          dimensions,
          aggregates,
          orders: [
            ...orders,
            ...configuration?.orders?.filter((order) => {
              if (order.type === 'selected_column') {
                return newColumnList.some(
                  (column) => column.alias === order.name
                );
              }
              return true;
            }),
          ],
        };
        setConfiguration(datasetConfiguration);
      }
      const timeSeriesChartParams = {
        chartDimensions: getChartFields(timeseriesDimensions),
        chartMetrics: getChartFields(timeseriesMetrics),
        chartAggregateColumns: getChartFields(
          timeseriesMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
      };
      datasetMetricCreation(
        {
          cId: clientId,
          configuration: {
            ...datasetConfiguration,
            limit: prevLimit || limit,
          },
          id: workspaceId,
        },
        {
          onSuccess({ datasetMetricCreation: generateMetricResponse }) {
            const error = generateMetricResponse?.error;
            const result = generateMetricResponse?.data;
            const outputQuery = generateMetricResponse?.query;
            const timeTaken = generateMetricResponse?.timeTaken;
            const metaData = generateMetricResponse?.metaData;
            if (error || generateError) {
              setError({
                errorMessage:
                  (error?.message as string) || consts.SOMETHING_WENT_WRONG,
                explanation: '',
                solution: '',
              });
              segmentEvent('generate dataset metric failed', {
                error: error?.message || consts.SOMETHING_WENT_WRONG,
              });
              setLoading(false);
              setData([]);
              setQuery('');
            }
            if (result && outputQuery) {
              segmentEvent('generate dataset metric success', {
                timeTaken: timeTaken || 0,
              });
              setError(undefined);
              setLoading(false);
              setData(Array.isArray(result) ? result : []);
              setChartFields(
                isNotPivotAction
                  ? {
                      ...pivotChartFieldParams,
                      resultData: Array.isArray(result) ? result : [],
                      configAggregates: prevConfiguration?.aggregates,
                    }
                  : {
                      chartType,
                      chartDimensions: chartFieldParams?.chartDimensions,
                      chartMetrics: chartFieldParams?.chartMetrics,
                      chartAggregateColumns:
                        chartFieldParams?.chartAggregateColumns,
                      resultData: Array.isArray(result) ? result : [],
                      configAggregates: prevConfiguration?.aggregates,
                      pivotHeaderColumns: chartFieldParams?.pivotHeaderColumns,
                      ...(isNotTimeseriesAction ? timeSeriesChartParams : {}),
                    }
              );
              try {
                setQuery(
                  format(outputQuery, { language: databaseName || 'mysql' })
                );
              } catch {
                setQuery(outputQuery);
              }

              if (setTimeTaken) setTimeTaken(timeTaken || 0);
              setGroupByList?.(
                metaData?.groupbyColumnList?.map((col: string) =>
                  col.replace(/`/g, '')
                ) || []
              );
            }
            setDrillDown((prev) => ({
              ...prev,
              isEnableGroupBy: false,
              isEnableCrossFilter: false,
              drilldownChartSettings: undefined,
              drillType: '',
            }));
            onSuccess?.();
          },
        }
      );
    }
  };
  const onSelectTimeSeries = (
    chartType: types.ChartSettingsType['chartType']
  ) => {
    if (chartType !== consts.CHART_TYPES.timeSeries || isPythonMode) return;
    const timeDimension = selectedDims.find((dim) =>
      consts.DATE_TYPES.includes(
        dim?.cast?.value?.toLowerCase() || dim?.datatype?.toLowerCase() || ''
      )
    );
    if (!timeDimension) return;
    const alias: string = `monthly of ${timeDimension.name}`;
    const newDim: types.SelectedColumn = {
      ...timeDimension,
      // set monthly format
      helperFunction: 'date format',
      functionConfiguration: {
        dateFormat: helpers.getFormat(
          { value: 'monthly', label: 'monthly' },
          dbName
        ),
      },
      alias,
    };
    setSelectedDims((prev) =>
      prev.map((dim) => (dim.alias === timeDimension.alias ? newDim : dim))
    );
    const newColumnList: types.SelectedColumn[] = [
      ...[newDim],
      ...selectedMetrics,
    ];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const orders: Order[] = [
      { method: 'ASC', name: alias, type: 'selected_column' },
    ];
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      orders: [
        ...orders,
        ...configuration?.orders?.filter((order) => {
          if (order.type === 'selected_column') {
            return newColumnList.some((column) => column.alias === order.name);
          }
          return true;
        }),
      ],
      isApplyMetricFilter: true,
      rlsConditions: appliedMetricFilters,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      isTimeseriesAction: true,
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields([newDim]),
        chartMetrics: getChartFields(selectedMetrics),
        chartAggregateColumns: getChartFields(
          selectedMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
        chartType,
      },
      updatedDims: selectedDims,
    });
  };
  const onChangeTimeseriesFormat = (
    value: types.FloatingDropDownOption,
    seriesName?: string
  ) => {
    if (
      chartSettings.chartType !== consts.CHART_TYPES.timeSeries ||
      isPythonMode
    )
      return;
    const seriesField = seriesName || chartSettings?.seriesField || '';
    const isGroupBy = seriesField && seriesField !== 'ungrouped';
    const timeDimension = selectedDims.find((dim) =>
      consts.DATE_TYPES.includes(
        dim?.cast?.value?.toLowerCase() || dim?.datatype?.toLowerCase() || ''
      )
    );
    if (!timeDimension) return;
    const alias: string = `${value.value} of ${timeDimension.name}`;
    const newTimeDimension: types.SelectedColumn = {
      ...timeDimension,
      helperFunction: 'date format',
      functionConfiguration: { dateFormat: helpers.getFormat(value, dbName) },
      alias: `${value.value} of ${timeDimension.name}`,
    };
    setSelectedDims((prev) =>
      prev.map((dim) =>
        dim.alias === timeDimension.alias ? newTimeDimension : dim
      )
    );
    const seriesDimension = isGroupBy
      ? selectedDims.find((dim) => dim.alias === seriesField)
      : undefined;
    const updatedDimensions = seriesDimension
      ? [newTimeDimension, seriesDimension]
      : [newTimeDimension];
    const newColumnList: types.SelectedColumn[] = [
      ...updatedDimensions,
      ...selectedMetrics,
    ];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const orders: Order[] = [
      { method: 'ASC', name: alias, type: 'selected_column' },
    ];

    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      orders: [
        ...orders,
        ...configuration?.orders?.filter((order) => {
          if (order.type === 'selected_column') {
            return newColumnList.some((column) => column.alias === order.name);
          }
          return true;
        }),
      ],
      isApplyMetricFilter: true,
      rlsConditions: appliedMetricFilters,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      isTimeseriesAction: true,
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(updatedDimensions),
        chartMetrics: getChartFields(selectedMetrics),
        chartAggregateColumns: getChartFields(
          selectedMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims: selectedDims,
    });
  };
  const onSelectPivotTable = (
    chartType: types.ChartSettingsType['chartType'],
    headers: string[]
  ) => {
    setPivotDrillState({
      data: [],
      error: '',
      isLoading: false,
      currentValue: '',
    });
    const { headerColumns, nonHeaderColumns } = selectedDims.reduce(
      (
        result: {
          headerColumns: types.SelectedColumn[];
          nonHeaderColumns: types.SelectedColumn[];
        },
        c: types.SelectedColumn
      ) => {
        if (headers.includes(c.alias)) {
          result.headerColumns.push(c);
        } else {
          result.nonHeaderColumns.push(c);
        }
        return result;
      },
      { headerColumns: [], nonHeaderColumns: [] }
    );
    const updatedDimensions = nonHeaderColumns.slice(0, 1);
    const newColumnList: types.SelectedColumn[] = [
      ...updatedDimensions,
      ...selectedMetrics,
      ...headerColumns,
    ];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      orders: configuration?.orders?.filter((order) => {
        if (order.type === 'selected_column') {
          return newColumnList.some((column) => column.alias === order.name);
        }
        return true;
      }),
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(selectedDims),
        chartMetrics: getChartFields(selectedMetrics),
        chartAggregateColumns: getChartFields(
          selectedMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
        pivotHeaderColumns: headers,
        chartType,
      },
      updatedDims: selectedDims,
      updatedMetrics: selectedMetrics,
      isPivotAction: true,
    });
  };
  const resetCharSettings = (
    chartType: types.ChartSettingsType['chartType']
  ) => {
    const newColumnList: types.SelectedColumn[] = [
      ...selectedDims,
      ...selectedMetrics,
    ];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      orders: configuration?.orders?.filter((order) => {
        if (order.type === 'selected_column') {
          return newColumnList.some((column) => column.alias === order.name);
        }
        return true;
      }),
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(selectedDims),
        chartMetrics: getChartFields(selectedMetrics),
        chartAggregateColumns: getChartFields(
          selectedMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
        pivotHeaderColumns: [],
        chartType,
      },
      updatedDims: selectedDims,
      updatedMetrics: selectedMetrics,
    });
  };

  const onDrillPivotTable = ({
    filters,
    nextLevel,
    currentValue,
  }: types.OnDrillPivotTableParams) => {
    const { headerColumns, nonHeaderColumns } = selectedDims.reduce(
      (
        result: {
          headerColumns: types.SelectedColumn[];
          nonHeaderColumns: types.SelectedColumn[];
        },
        c: types.SelectedColumn
      ) => {
        if (chartSettings.pivotTableSettings2?.headers?.includes(c.alias)) {
          result.headerColumns.push(c);
        } else {
          result.nonHeaderColumns.push(c);
        }
        return result;
      },
      { headerColumns: [], nonHeaderColumns: [] }
    );
    const key = filters
      .map((col) => `${col.columnName};;${col.value}`)
      .join(';;');
    setPivotDrillState((prev) => ({
      ...prev,
      data: prev.data.filter((d) => d.key !== key),
      error: '',
      isLoading: true,
      currentValue,
    }));
    const updatedDimensions: types.SelectedColumn[] = nonHeaderColumns.slice(
      0,
      nextLevel
    );
    const newFilters: types.Filter[] = filters
      .map((filter) => {
        const column = selectedDims.find(
          (col) => col.alias === filter.columnName
        );
        if (column) {
          const filterColumn: types.Filter = {
            alias: column.alias || '',
            columnName: column.name,
            dataType: column.datatype,
            method: '=',
            parentAlias: column.parentAlias,
            type: 'dimension',
            value: filter.value,
            relationOperator: 'AND',
          };
          return filterColumn;
        }
        return undefined;
      })
      .filter((filter) => filter) as types.Filter[];
    const newColumnList: types.SelectedColumn[] = [
      ...updatedDimensions,
      ...selectedMetrics,
      ...headerColumns,
    ];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      filters: [...configuration.filters, ...newFilters],
      isApplyMetricFilter: true,
      rlsConditions: appliedMetricFilters,
      orders: configuration?.orders?.filter((order) => {
        if (order.type === 'selected_column') {
          return newColumnList.some((column) => column.alias === order.name);
        }
        return true;
      }),
    };
    datasetMetricCreation(
      {
        cId: clientId,
        configuration: newConfiguration,
        id: workspaceId,
      },
      {
        onSuccess({ datasetMetricCreation: generateMetricResponse }) {
          const error = generateMetricResponse?.error;
          const result = generateMetricResponse?.data;
          if (error?.message) {
            setPivotDrillState((prev) => ({
              ...prev,
              error: error?.message,
              isLoading: false,
              currentValue: '',
            }));
          } else {
            setPivotDrillState((prev) => ({
              data: [
                ...prev.data,
                { key, data: Array.isArray(result) ? result : [] },
              ],
              error: '',
              isLoading: false,
              currentValue: '',
            }));
            setChartSettings((prev) => ({
              ...prev,
              pivotTableSettings2: {
                ...chartSettings.pivotTableSettings2,
                dimensions: getChartFields(updatedDimensions),
                headers: getChartFields(headerColumns),
              },
            }));
          }
        },
      }
    );
  };
  const onDropColumn = ({
    column,
    table,
    sorting,
    type,
    identifier,
  }: OnDropColumnParams) => {
    let updateDims = [...selectedDims];
    let updateMetrics = [...selectedMetrics];
    const tableAlias =
      table.type === 'custom'
        ? table.alias || DBN_SQL_TABLE
        : `${table.schemaName}_${table.tableName}`;
    if (isFirstDrop) {
      const tableOption =
        table.type === 'custom'
          ? {
              value: `none^^^^^^${table.sql}^^^^^^${tableAlias}^^^^^^custom`,
              label: tableAlias,
              icon: 'table',
            }
          : {
              value: `${table.schemaName}^^^^^^${table.tableName}`,
              label: `${table.schemaName}.${table.tableName}`,
              icon: 'table',
            };
      setCurrentSelectedTable(tableOption);
      setSelectedMainTable(table);
      setSelectedDims([]);
      setSelectedMetrics([]);
      setSelectedJoins([]);
      setCreatedFilters([]);
      setCreatedSorts([]);
    }
    if (validateColumn(table) && !isFirstDrop) {
      setInvalidColModal(true);
      return;
    }

    const dropColumn: types.SelectedColumn = {
      alias: column.name,
      configType: column.isAggregate ? 'AGGREGATE' : 'DIMENSION',
      datatype: column.dataType,
      dropType: type,
      index:
        type === 'DIMENSION' ? selectedDims.length : selectedMetrics.length,
      name: column.name,
      parentAlias: tableAlias,
      table,
      type:
        column.type === 'custom'
          ? 'CUSTOM'
          : column.type === 'python'
          ? 'PYTHON'
          : 'DEFAULT',
      helperFunction: undefined,
      sql: column.sql || '',
      draggableItemData: { column, table },
    };
    switch (type) {
      case 'DIMENSION':
        setSelectedDims((prev) => {
          const index = prev.findIndex((col) => col.alias === column.name);
          if (identifier?.type === 'metrics') {
            setSelectedMetrics((metric) => {
              updateMetrics = [
                ...metric.filter((itm) => itm.alias !== column.name),
              ];
              return updateMetrics;
            });
          }
          const list = isFirstDrop
            ? [dropColumn]
            : index === -1
            ? [...prev, dropColumn]
            : prev;
          if (sorting) {
            const { before, after } = sorting.sortingIndexes;
            updateDims = [...sorting.ArrayElementSwap(before, after, list)];
            return updateDims;
          }
          updateDims = [...list];
          return list;
        });

        break;
      case 'METRIC':
        setSelectedMetrics((prev) => {
          const index = selectedMetrics.findIndex(
            (col) => col.alias === column.name
          );
          if (identifier?.type === 'dimensions') {
            setSelectedDims((dim) => {
              updateDims = [...dim.filter((itm) => itm.alias !== column.name)];
              return updateDims;
            });
          }
          const list = isFirstDrop
            ? [dropColumn]
            : index === -1
            ? [...prev, dropColumn]
            : prev;
          if (sorting) {
            const { before, after } = sorting.sortingIndexes;
            updateMetrics = [...sorting.ArrayElementSwap(before, after, list)];
            return updateMetrics;
          }
          updateMetrics = [...list];
          return list;
        });
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }

    const newColumnList: types.SelectedColumn[] = isFirstDrop
      ? [dropColumn]
      : [...updateDims, ...updateMetrics];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      table: isFirstDrop
        ? {
            alias: tableAlias,
            id: table.id,
            joins: isFirstDrop ? [] : configuration.table.joins,
            name: table.type === 'custom' ? table.sql || '' : table.tableName,
            schema: table.schemaName,
            type: table.type === 'custom' ? 'custom' : 'default',
          }
        : configuration.table,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(
          newColumnList.filter((col) => col.dropType === 'DIMENSION')
        ),
        chartMetrics: getChartFields(
          newColumnList.filter((col) => col.dropType === 'METRIC')
        ),
        chartAggregateColumns: getChartFields(
          newColumnList.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims:
        type === 'DIMENSION'
          ? isFirstDrop
            ? [dropColumn]
            : [...updateDims]
          : undefined,
      updatedMetrics:
        type === 'METRIC'
          ? isFirstDrop
            ? [dropColumn]
            : [...updateMetrics]
          : undefined,
      selectedMainTable: isFirstDrop ? table : undefined,
    });
  };
  const onRemoveColumn = ({ column, type }: OnRemoveColumnParams) => {
    const filteredSorts = createdSorts.filter((sort) => {
      if (!sort.columnName.value) return false;
      const sortType = sort.columnName.badge?.toLowerCase();
      if (sortType === 'new') return sort.columnName.label !== column.alias;
      const [parentAlias, columnName] = sort.columnName.value?.split('^^^^^^');
      if (sortType === 'custom' || sortType === 'group by')
        return column.sql !== columnName;
      return true;
    });
    setCreatedSorts(filteredSorts);
    switch (type) {
      case 'DIMENSION':
        setSelectedDims((prev) =>
          prev.filter((col) => col.alias !== column.alias)
        );

        break;
      case 'METRIC':
        setSelectedMetrics((prev) =>
          prev.filter((col) => col.alias !== column.alias)
        );
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }
    const newColumnList: types.SelectedColumn[] = [
      ...selectedDims,
      ...selectedMetrics,
    ];
    const orders: Order[] = filteredSorts.map((sort) => {
      const sortType = sort.columnName.badge?.toLowerCase();
      const method = sort.method.value;
      if (!sort.columnName.value) return { method: '', name: '' };

      if (sortType === 'new')
        return {
          method,
          name: sort.columnName.label,
          sortType: 'selected_column',
        };
      const [parentAlias, columnName] = sort.columnName.value?.split('^^^^^^');
      if (sortType === 'custom' || sortType === 'group by')
        return { method, name: columnName, sortType: 'custom' };

      return {
        method: sort.method.value,
        name: `${parentAlias}.${columnName}`,
      };
    });
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions: configuration.dimensions.filter(
        (dim) => dim.alias !== column.alias
      ),
      aggregates: configuration.aggregates.filter(
        (agr) => agr.alias !== column.alias
      ),
      orders: orders.filter((o) => o.name),
    };
    setConfiguration(newConfiguration);

    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(
          newColumnList
            .filter((col) => col.dropType === 'DIMENSION')
            .filter((col) => col.alias !== column.alias)
        ),
        chartMetrics: getChartFields(
          newColumnList
            .filter((col) => col.dropType === 'METRIC')
            .filter((col) => col.alias !== column.alias)
        ),
        chartAggregateColumns: getChartFields(
          newColumnList
            .filter(
              (col) =>
                col.dropType === 'METRIC' && col.configType === 'AGGREGATE'
            )
            .filter((col) => col.alias !== column.alias)
        ),
      },
      updatedDims:
        type === 'DIMENSION'
          ? selectedDims.filter((col) => col.alias !== column.alias)
          : undefined,
      updatedMetrics:
        type === 'METRIC'
          ? selectedMetrics.filter((col) => col.alias !== column.alias)
          : undefined,
    });
  };

  const onSaveCustomColumn = (
    customFiltersObjects?: MetricsValue[],
    onSuccess?: () => void
  ) => {
    const sqlColumns = customFiltersObjects?.length
      ? [...customColumnList, ...customFiltersObjects]
      : [
          ...customColumnList,
          ...customFilterList,
          {
            as: customSql.name,
            value: customSql.sql,
            isAggregate: customSql.isAggregate,
            isDimension: customSql.isDimension,
            isFilter: false,
          },
        ];
    saveCustomSqlColumn(
      {
        companyIntegrationId,
        sqlColumns,
        tableName: customFiltersObjects
          ? currentSelectedTable?.value?.split('^^^^^^')?.join('.')
          : customSql?.tableName?.value?.split('^^^^^^')?.join('.'),
      },
      {
        onSuccess({ insert_customSqlColumns_one }) {
          if (insert_customSqlColumns_one?.id) {
            queryClient.setQueryData(
              ['CustomSqlColumns', { companyIntegrationId }],
              (prev: any) => {
                const prevCustomSqlColumns = prev?.customSqlColumns;
                const index = prevCustomSqlColumns?.findIndex(
                  (t: any) =>
                    t?.tableName === insert_customSqlColumns_one?.tableName
                );
                if (index > -1) {
                  prevCustomSqlColumns[index] = insert_customSqlColumns_one;
                }
                return { ...prev, customSqlColumns: prevCustomSqlColumns };
              }
            );
            setCustomColumnList(
              sqlColumns?.filter((f) => f.isAggregate || f.isDimension)
            );
            setCustomFilterList(sqlColumns?.filter((f) => f.isFilter));
            setCustomSql({
              name: '',
              sql: '',
              isAggregate: false,
              isDimension: false,
              isFilter: false,
              tableName: {
                value: '',
                label: '',
              },
            });
            onSuccess?.();
          }
        },
      }
    );
  };

  const onChangeHelperFunction = ({
    column,
    helperFunction,
    type,
    functionConfiguration,
  }: OnChangeHelperFunctionParams) => {
    const isNone = helperFunction.value === 'NONE';
    const newAlias = `${
      isNone
        ? column.name
        : `${helpers.getColumnNameKeyString(
            `${helperFunction.label.toLowerCase()} of`,
            dbName || ''
          )} ${column.name}`
    }`;
    const newDims: types.SelectedColumn[] =
      type === 'DIMENSION'
        ? selectedDims.map((col) =>
            col.alias === column.alias
              ? {
                  ...col,
                  helperFunction: helperFunction.value,
                  alias: newAlias,
                  configType: 'DIMENSION',
                  type: isNone ? 'DEFAULT' : 'HELPER_FUNCTION',
                  functionConfiguration,
                }
              : col
          )
        : selectedDims;
    const newMetrics: types.SelectedColumn[] =
      type === 'METRIC'
        ? selectedMetrics.map((col) =>
            col.alias === column.alias
              ? {
                  ...col,
                  helperFunction: helperFunction.value,
                  alias: newAlias,
                  configType: isNone ? 'DIMENSION' : 'AGGREGATE',
                }
              : col
          )
        : selectedMetrics;
    switch (type) {
      case 'DIMENSION':
        setSelectedDims(newDims);

        break;
      case 'METRIC':
        setSelectedMetrics(newMetrics);
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }
    const newColumnList: types.SelectedColumn[] = [...newDims, ...newMetrics];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);

    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(newDims),
        chartMetrics: getChartFields(newMetrics),
        chartAggregateColumns: getChartFields(
          newMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims: type === 'DIMENSION' ? newDims : undefined,
      updatedMetrics: type === 'METRIC' ? newMetrics : undefined,
    });
  };
  const onChangeAutoCompleteHelperFunction = ({
    column,
    helperFunction,
    functionConfiguration,
  }: OnChangeHelperFunctionParams) => {
    const isNone = helperFunction.value === 'NONE';
    const newAlias = `${
      isNone
        ? column.name
        : `${helperFunction.label.toLowerCase()} of ${column.name}`
    }`;
    const isAggregate = consts.aggregateStrings.includes(helperFunction.value);
    const updatedList: types.SelectedColumn[] = selectedAutoCompleteCols.map(
      (col) =>
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
    setSelectedAutoCompleteCols(updatedList);
  };

  const onChangeAlias = ({
    alias,
    column,
    type,
    cast,
    isColumnCasted,
  }: OnChangeAliasParams) => {
    const newDims: types.SelectedColumn[] =
      type === 'DIMENSION'
        ? selectedDims.map((col) =>
            col.alias === column.alias
              ? {
                  ...col,
                  alias,
                  cast,
                  helperFunction: isColumnCasted
                    ? undefined
                    : col.helperFunction,
                  type:
                    isColumnCasted && col.type === 'HELPER_FUNCTION'
                      ? 'DEFAULT'
                      : col.type,
                }
              : col
          )
        : selectedDims;
    const newMetrics: types.SelectedColumn[] =
      type === 'METRIC'
        ? selectedMetrics.map((col) =>
            col.alias === column.alias
              ? {
                  ...col,
                  alias,
                  cast,
                  helperFunction: isColumnCasted
                    ? undefined
                    : col.helperFunction,
                  configType: isColumnCasted ? 'DIMENSION' : col.configType,
                }
              : col
          )
        : selectedMetrics;
    switch (type) {
      case 'DIMENSION':
        setSelectedDims(newDims);

        break;
      case 'METRIC':
        setSelectedMetrics(newMetrics);
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }
    const newColumnList: types.SelectedColumn[] = [...newDims, ...newMetrics];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(newDims),
        chartMetrics: getChartFields(newMetrics),
        chartAggregateColumns: getChartFields(
          newMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims: type === 'DIMENSION' ? newDims : undefined,
      updatedMetrics: type === 'METRIC' ? newMetrics : undefined,
    });
  };
  const onChangeAutoCompleteAlias = ({
    alias,
    column,
  }: OnChangeAliasParams) => {
    setSelectedAutoCompleteCols((prev) =>
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

  const onSaveArithMetricOption = ({
    alias,
    column,
    type,
  }: types.OnSaveArithmeticColumnParams) => {
    if (!column) return;
    const newColumn: types.SelectedColumn = {
      alias,
      configType: consts.aggregateStrings.includes(
        column?.firstOperand?.helperFunction ||
          column?.secondOperand?.helperFunction ||
          ''
      )
        ? 'AGGREGATE'
        : 'DIMENSION',
      datatype: '',
      draggableItemData: {
        column: { name: '', dataType: '', as: '' },
        table: column?.firstOperand.table,
      },
      dropType: type,
      index: 0,
      name: '',
      parentAlias: '',
      sql: '',
      table: column?.firstOperand?.table,
      type: 'ARITHMETIC',
      arithmeticConfig: column,
    };
    const newDims: types.SelectedColumn[] =
      type === 'DIMENSION' ? [...selectedDims, newColumn] : selectedDims;
    const newMetrics: types.SelectedColumn[] =
      type === 'METRIC' ? [...selectedMetrics, newColumn] : selectedMetrics;
    switch (type) {
      case 'DIMENSION':
        setSelectedDims(newDims);
        break;
      case 'METRIC':
        setSelectedMetrics(newMetrics);
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }
    const newColumnList: types.SelectedColumn[] = [...newDims, ...newMetrics];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(newDims),
        chartMetrics: getChartFields(newMetrics),
        chartAggregateColumns: getChartFields(
          newMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims: type === 'DIMENSION' ? newDims : undefined,
      updatedMetrics: type === 'METRIC' ? newMetrics : undefined,
    });
  };
  const onSaveCustomSQLColumn = (type: 'DIMENSION' | 'METRIC') => {
    setCreateNewColumnError([]);
    const saveErrors = [
      !customSql.sql ? 'please enter sql for column' : '',
      !customSql.name ? 'please enter name of the new column' : '',
      !customSql.tableName?.value ? 'please select table' : '',
    ];
    setCreateNewColumnError(saveErrors.filter((str) => str));
    if (saveErrors.filter((str) => str).length) {
      return;
    }
    const [schemaName, tableName, alias, tableType] =
      customSql?.tableName?.value?.split('^^^^^^');
    const tableAlias =
      tableType === 'custom'
        ? alias || DBN_SQL_TABLE
        : `${schemaName}_${tableName}`;
    const customTable = customDatasetList.find((t) => t.tableName === alias);
    const table = schemaTableList.find(
      (t) => t.tableName === tableName && t.schemaName === schemaName
    );
    const columnTable: TableType | undefined =
      tableType === 'custom'
        ? {
            columns: customTable?.columns || [],
            columnsWithDataType:
              customTable?.columnsWithDataType.map((c) => ({
                as: c.dataType || '',
                dataType: c.dataType || '',
                name: c.name,
              })) || [],
            companyId: '',
            id: tableAlias,
            recentUpdatedAt: 0,
            schemaName: '',
            tableName: customTable?.tableName || '',
            alias: customTable?.tableName || '',
            sql: customTable?.sql || '',
            type: 'custom',
          }
        : table;
    if (!columnTable) {
      return;
    }
    const newColumn: types.SelectedColumn = {
      alias: customSql.name,
      configType: type === 'DIMENSION' ? type : 'AGGREGATE',
      datatype: type === 'METRIC' ? 'number' : 'string',
      dropType: type,
      index:
        type === 'DIMENSION' ? selectedDims.length : selectedMetrics.length,
      name: customSql.name,
      parentAlias: tableAlias,
      table: columnTable,
      type: 'CUSTOM',
      helperFunction: undefined,
      sql: customSql.sql || '',
      draggableItemData: {
        column: {
          name: customSql.name,
          as: customSql.isAggregate ? 'number' : 'string',
          dataType: customSql.isAggregate ? 'number' : 'string',
          sql: customSql.sql,
          type: 'custom',
          isAggregate: customSql.isAggregate,
        },
        table: columnTable,
      },
    };
    switch (type) {
      case 'DIMENSION':
        setSelectedDims((prev) =>
          isFirstDrop ? [newColumn] : [...prev, newColumn]
        );

        break;
      case 'METRIC':
        setSelectedMetrics((prev) =>
          isFirstDrop ? [newColumn] : [...prev, newColumn]
        );
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }
    const newColumnList: types.SelectedColumn[] = isFirstDrop
      ? [newColumn]
      : [...selectedDims, ...selectedMetrics, newColumn];

    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart

    onSaveCustomColumn(undefined, () =>
      onGenerateDatasetMetric({
        prevConfiguration: newConfiguration,
        chartFieldParams: {
          chartDimensions: getChartFields(
            newColumnList.filter((col) => col.dropType === 'DIMENSION')
          ),
          chartMetrics: getChartFields(
            newColumnList.filter((col) => col.dropType === 'METRIC')
          ),
          chartAggregateColumns: getChartFields(
            newColumnList.filter((col) => col.configType === 'AGGREGATE')
          ),
        },
        updatedDims:
          type === 'DIMENSION'
            ? isFirstDrop
              ? [newColumn]
              : [...selectedDims, newColumn]
            : undefined,
        updatedMetrics:
          type === 'METRIC'
            ? isFirstDrop
              ? [newColumn]
              : [...selectedMetrics, newColumn]
            : undefined,
        selectedMainTable: isFirstDrop ? table : undefined,
      })
    );
  };

  const onUpdateCustomSqlColumn = ({
    column,
    sql,
    type,
  }: OnChangeCustomSqlColumnParams) => {
    const newDims: types.SelectedColumn[] =
      type === 'DIMENSION'
        ? selectedDims.map((col) =>
            col.alias === column.alias
              ? {
                  ...col,
                  sql,
                }
              : col
          )
        : selectedDims;
    const newMetrics: types.SelectedColumn[] =
      type === 'METRIC'
        ? selectedMetrics.map((col) =>
            col.alias === column.alias
              ? {
                  ...col,
                  sql,
                }
              : col
          )
        : selectedMetrics;
    switch (type) {
      case 'DIMENSION':
        setSelectedDims(newDims);

        break;
      case 'METRIC':
        setSelectedMetrics(newMetrics);
        break;

      default:
        console.warn('Invalid Drop');
        break;
    }
    const newColumnList: types.SelectedColumn[] = [...newDims, ...newMetrics];
    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(newDims),
        chartMetrics: getChartFields(newMetrics),
        chartAggregateColumns: getChartFields(
          newMetrics.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims: type === 'DIMENSION' ? newDims : undefined,
      updatedMetrics: type === 'METRIC' ? newMetrics : undefined,
    });
  };

  const onSaveCustomFilter = (filter: CreateNewFilter) => {
    const filterIndex = customFilterList.findIndex((f) => f.as === filter.name);

    const filters: MetricsValue[] =
      filterIndex !== -1
        ? customFilterList.map((f) =>
            f.as === filter.name
              ? {
                  as: filter.name,
                  value: filter.sql,
                  isAggregate: false,
                  isDimension: false,
                  isFilter: true,
                }
              : f
          )
        : [
            ...customFilterList,
            {
              as: filter.name,
              value: filter.sql,
              isAggregate: false,
              isDimension: false,
              isFilter: true,
            },
          ];
    onSaveCustomColumn(filters);
  };

  const onPreview = async () => {
    const previewQuery = helpers.replaceVariable({
      query: subQuery,
      rlsConditions: appliedMetricFilters || [],
      tenancyLevel: tenancy || TABLE,
      clientId,
      globalFilters,
      isAllClient: false,
      values: rlsValues as any,
    });
    setSqlModeResultState({ isLoading: true, error: '', data: [] });
    await executeSqlQueyAsync(
      {
        dbName,
        id: companyIntegrationId,
        query: helpers.replaceVariable({
          isAllClient: true,
          query: previewQuery,
          rlsConditions: appliedMetricFilters || [],
          tenancyLevel: tenancy || TABLE,
          clientId,
          values: rlsValues as any,
          globalFilters,
        }),
        // enable stringified response of synced data
        disableStringify: false,
      },
      {
        onSuccess: (response) => {
          const resultData = helpers.getExecuteSqlResponseData(response);
          const previewError = resultData?.errorObj?.errorMessage;
          if (previewError) {
            setSqlModeResultState({
              isLoading: false,
              error: previewError || consts.SOMETHING_WENT_WRONG,
              data: [],
            });
          } else {
            setSqlModeResultState({
              isLoading: false,
              error: '',
              data: Array.isArray(resultData) ? resultData : [],
            });
          }
        },
      }
    );
  };
  const onDeletCustomColumn = async (
    column: TableColumn,
    table: TableType,
    onSuccess?: () => void
  ) => {
    const sqlColumns =
      customSqlColumns?.find(
        (t) => t.tableName === `${table.schemaName}.${table.tableName}`
      )?.list || [];
    const filterdSqlColumns = sqlColumns.filter(
      (col) => col.as !== column.name
    );
    await saveCustomSqlColumnAsync(
      {
        companyIntegrationId,
        sqlColumns: filterdSqlColumns,
        tableName: `${table.schemaName}.${table.tableName}`,
      },
      {
        onSuccess: (customColumnResponse) => {
          queryClient.setQueryData(
            ['CustomSqlColumns', { companyIntegrationId }],
            (prev: any) => {
              const prevCustomSqlColumns = prev?.customSqlColumns;
              const index = prevCustomSqlColumns?.findIndex(
                (t: any) =>
                  t?.tableName ===
                  customColumnResponse?.insert_customSqlColumns_one?.tableName
              );
              if (index > -1) {
                prevCustomSqlColumns[index] =
                  customColumnResponse?.insert_customSqlColumns_one;
              }
              return { ...prev, customSqlColumns: prevCustomSqlColumns };
            }
          );
          onSuccess?.();
        },
      }
    );
  };
  const onSync = () => {
    const genQuery = getLimitSqlQuery({ query: subQuery, limit: '1', dbName });
    setData([]);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setConfiguration(DEFAULT_CREATE_DATSET_METRIC_CONFIG);
    setLoading(false);
    setSelectedMainTable(undefined);
    setSelectedDims([]);
    setSelectedMetrics([]);
    setSqlLoading(true);
    setError({
      errorMessage: '',
      explanation: '',
      solution: '',
    });
    if (subQuery) {
      executeQuery(
        {
          dbName,
          id: companyIntegrationId,
          query: helpers.replaceVariable({
            isAllClient: true,
            query: genQuery,
            rlsConditions: appliedMetricFilters || [],
            tenancyLevel: tenancy || TABLE,
            clientId,
            values: rlsValues as any,
            globalFilters,
          }),
          // enable stringified response of synced data
          disableStringify: false,
        },
        {
          onSuccess: async (resData) => {
            const responseData = helpers.getExecuteSqlResponseData(resData);
            const error = responseData?.errorObj?.errorMessage;
            if (error) {
              setError({
                errorMessage: genQuery.includes('{{')
                  ? `Metric filter variable is found. please, create & apply metric variable filter, before run. ${error}`
                  : error || consts.SOMETHING_WENT_WRONG,
                explanation: '',
                solution: '',
              });
              setSqlLoading(false);
              setSqlModeResultState({
                isLoading: false,
                error: error || consts.SOMETHING_WENT_WRONG,
                data: [],
              });
            } else if (responseData?.length) {
              const columnOpt = Object.keys(responseData[0]);
              setSqlColumnList(
                columnOpt.map((col) => ({
                  dataType:
                    typeof responseData?.[0]?.[col] === 'string'
                      ? isDateStringValid(responseData?.[0]?.[col])
                      : typeof responseData?.[0]?.[col],
                  name: col,
                  as:
                    typeof responseData?.[0]?.[col] === 'string'
                      ? isDateStringValid(responseData?.[0]?.[col])
                      : typeof responseData?.[0]?.[col],
                }))
              );
              setSqlLoading(false);
            } else if (responseData?.length === 0) {
              setError({
                errorMessage:
                  'No Results are found, please try with less filter.' ||
                  consts.SOMETHING_WENT_WRONG,
                explanation: '',
                solution: '',
              });
              setSqlLoading(false);
            }
          },
        }
      );
    }
  };

  const updateSavedMetricSqlModeResult = async () => {
    if (!isSqlTab) return;
    const genQuery = getLimitSqlQuery({ query: subQuery, limit, dbName });
    setSqlModeResultState({ isLoading: true, error: '', data: [] });
    await executeSqlQueyAsync(
      {
        dbName,
        id: companyIntegrationId,
        query: helpers.replaceVariable({
          isAllClient: true,
          query: genQuery,
          rlsConditions: appliedMetricFilters || [],
          tenancyLevel: tenancy || TABLE,
          clientId,
          values: rlsValues as any,
          globalFilters,
        }),
        // enable stringified response of synced data
        disableStringify: false,
      },
      {
        onSuccess: (resData) => {
          const respnseData = resData?.sqlQuery?.data;
          const responseData =
            typeof respnseData === 'string'
              ? JSON.parse(respnseData)
              : respnseData || [];
          const error = responseData?.errorObj?.errorMessage;
          if (error) {
            setSqlModeResultState({
              isLoading: false,
              error: error || consts.SOMETHING_WENT_WRONG,
              data: [],
            });
          }
          setSqlModeResultState({
            isLoading: false,
            error: '',
            data: Array.isArray(responseData) ? responseData : [],
          });
        },
        onError: () => {
          setSqlModeResultState({
            isLoading: false,
            error: consts.SOMETHING_WENT_WRONG,
            data: [],
          });
        },
      }
    );
    setIsFetchSqlModeResults(false);
  };
  const onApplyFilter = (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => {
    if (isClear) {
      onGenerateDatasetMetric({
        prevConfiguration: { ...configuration, filters: [] },
      });
      onComplete();
      return;
    }
    const filters: Filter[] = createdFilters
      .filter((f, i) => i !== index)
      .map((f) => {
        const [
          parentAlias,
          columnName,
          datatype,
          schemaName,
          tableName,
          helperFunction,
          alias,
          configType,
        ] = f.columnName.value?.split('^^^^^^');
        const method = f.operator.value || '=';
        let filterType: Filter['type'] = f.value.timeValue ? 'time' : 'default';
        if (f.columnName.badge === 'New') {
          filterType = configType === 'DIMENSION' ? 'dimension' : 'agr';
        }
        if (f.type === 'custom') {
          return {
            alias: f.name,
            columnName: f.sql,
            dataType: 'CUSTOM',
            parentAlias: 'NULL',
            type: 'custom',
            method: 'NONE',
            value: 'NULL',
            relationOperator: f.relationOperator
              ?.value as Filter['relationOperator'],
          };
        }
        if (f.type === 'client') {
          return {
            alias: f.columnName.value,
            columnName,
            dataType: datatype,
            method: '=',
            parentAlias,
            type: 'client',
            value: 'client_id_variable',
          };
        }
        return {
          alias: alias || '',
          columnName,
          dataType: f.value.timeValue ? 'TIME_COLUMN' : datatype,
          method,
          parentAlias,
          type: filterType,
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

    onGenerateDatasetMetric({
      prevConfiguration: { ...configuration, filters },
    });
    onComplete();
  };

  const onApplySort = (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => {
    if (isClear) {
      onGenerateDatasetMetric({
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

        if (type === 'new')
          return {
            method,
            name: sort.columnName.label,
            type: 'selected_column',
          };
        const [parentAlias, columnName] =
          sort.columnName.value?.split('^^^^^^');
        if (type === 'custom' || type === 'group by')
          return { method, name: columnName, type: 'custom' };

        return {
          method: sort.method.value,
          name: `${parentAlias}.${columnName}`,
        };
      });
    setConfiguration((prev) => ({
      ...prev,
      orders: orders.filter((o) => o.name),
    }));
    onGenerateDatasetMetric({
      prevConfiguration: {
        ...configuration,
        orders: orders.filter((o) => o.name),
      },
    });
    onComplete();
  };
  const onSaveForeCastAction = () => {
    const [parentAlias, columnName, datatype] =
      timeColumn.value.split('^^^^^^');
    const dimensions: Dimension[] = [
      {
        alias: '_timestamp',
        columnName,
        dataType: datatype,
        parentAlias,
        type: 'default',
        timeGrain:
          timeGrainVal.value !== 'NONE' ? timeGrainVal.value : undefined,
      },
    ];
    setConfiguration((prev) => ({
      ...prev,
      dimensions,
      forecast: {
        ...forecast,
        measureColumnName: forecast.isEnable
          ? configuration.aggregates?.[0]?.alias
          : '',
      },
    }));
    onGenerateDatasetMetric({
      prevConfiguration: {
        ...configuration,
        dimensions,
        forecast: {
          ...forecast,
          measureColumnName: forecast.isEnable
            ? configuration.aggregates?.[0]?.alias
            : '',
        },
      },
    });
  };
  const onSaveComparisonSettings = () => {
    const [parentAlias, columnName, datatype] =
      comparisonLagSettings.column.value?.split('^^^^^^');

    const dimension: Dimension = {
      alias: '_timestamp',
      columnName,
      dataType: datatype,
      parentAlias,
      type: 'default',
      timeGrain:
        comparisonLagSettings.timeGrain.value !== 'NONE'
          ? comparisonLagSettings.timeGrain.value
          : undefined,
    };
    setConfiguration((prev) => ({
      ...prev,
      dimensions: [dimension],
      aggregates: prev.aggregates.filter(
        (agr) => agr.alias === chartSettings.singleValue
      ),
      orders: [{ method: 'DESC', name: '_timestamp' }],
    }));
    setChartSettings((prev) => ({
      ...prev,
      customSettings: {
        ...prev.customSettings,
        comparisonTimePeriod: comparisonLagSettings.periodLag,
        comparisonTimeGrain: comparisonLagSettings.timeGrain.value,
      },
    }));
    onGenerateDatasetMetric({
      prevConfiguration: {
        ...configuration,
        dimensions: [dimension],
        aggregates: configuration.aggregates.filter(
          (agr) => agr.alias === chartSettings.singleValue
        ),
        orders: [{ method: 'DESC', name: '_timestamp' }],
      },
    });
  };

  const onChangeGroupColumnSelection = (column: types.SelectedColumn) => {
    setSelectedGroupBy((prev) => {
      const isAlreadySelected = prev.some(
        (prevOption) => prevOption.alias === column.alias
      );
      if (isAlreadySelected) {
        return prev.filter((prevOption) => prevOption.alias !== column.alias);
      }
      return [...prev, column];
    });
  };
  const onSaveGroupBy = () => {
    const groupByColumn: GroupByColumn[] = selectedGroupBy.map((column) => ({
      alias: column.alias,
      columnName:
        column.type.toLowerCase() === 'custom' ? column.sql || '' : column.name,
      dataType: column.datatype,
      parentAlias: column.parentAlias,
      type: column.type.toLowerCase() === 'custom' ? 'custom' : 'default',
      helperFunction: column.helperFunction,
      timeGrain: undefined,
    }));
    onGenerateDatasetMetric({
      prevConfiguration: { ...configuration, groupByColumnList: groupByColumn },
    });
  };

  const onSaveCreateDataset = (
    values: FieldValues,
    onComplete?: () => void
  ) => {
    const insertRecordInDatasetTable = () =>
      createDatasetMutate(
        {
          companyId: getCurrentUser()?.companyId,
          databaseName: values.schemaName,
          dbName,
          description: '',
          destinationId: companyIntegrationId,
          lineageData: {
            configuration,
            edgesList: [],
            nodeList: [],
            fieldValues: values,
            columnList:
              data && Array.isArray(data) && data.length
                ? Object.keys(data[0]).map((col) => ({
                    dataType:
                      typeof data?.[0]?.[col] === 'string'
                        ? isDateStringValid(data?.[0]?.[col])
                        : typeof data?.[0]?.[col],
                    name: col,
                    as:
                      typeof data?.[0]?.[col] === 'string'
                        ? isDateStringValid(data?.[0]?.[col])
                        : typeof data?.[0]?.[col],
                  }))
                : [],
          },
          modelType: values.materialise,
          name: values.name,
          query: query?.replace(/limit\s+\d+/i, ''),
          workspaceId,
        },
        {
          onSuccess({ insert_dataModels_one }) {
            if (insert_dataModels_one?.id) {
              setDatasetCreateState({ error: '', isLoading: false });
              setDatasetCreateModalShow(false);
              queryClient.setQueryData(
                ['DatasetList', { companyIntegrationId }],
                (prev: any) => {
                  return {
                    ...prev,
                    dataModels: [
                      ...(prev.dataModels || []),
                      insert_dataModels_one,
                    ],
                  };
                }
              );
              if (values.materialise !== 'view') {
                clearSelection();
                onComplete?.();
              } else {
                window.location.reload();
              }
            } else {
              setDatasetCreateState({
                error: consts.SOMETHING_WENT_WRONG,
                isLoading: false,
              });
            }
          },
          onError() {
            setDatasetCreateState({
              error: consts.SOMETHING_WENT_WRONG,
              isLoading: false,
            });
          },
        }
      );
    setDatasetCreateState({ error: '', isLoading: true });
    const viewQuery = `create or replace  view ${values.schemaName}.${
      values.name
    } as ( ${query?.replace(/limit\s+\d+/i, '')} )`;
    if (query) {
      if (values.materialise === 'subQuery') {
        insertRecordInDatasetTable();
      } else
        executeQuery(
          { dbName, id: companyIntegrationId, query: viewQuery },
          {
            onSuccess(resData) {
              const responseData =
                typeof resData?.sqlQuery?.data === 'string'
                  ? JSON.parse(resData?.sqlQuery?.data)
                  : resData?.sqlQuery?.data || [];
              const error = responseData?.errorObj?.errorMessage;
              if (error) {
                setDatasetCreateState({ error, isLoading: false });
              } else {
                cacheIntegrationSchemaMutate(
                  {
                    companyId: getCurrentUser()?.companyId,
                    companyIntegrationId,
                    workspaceId,
                  },
                  {
                    onSuccess: (response) => {
                      if (response.cacheIntegrationSchema?.data.id) {
                        insertRecordInDatasetTable();
                      }
                    },
                  }
                );
              }
            },
          }
        );
    }
  };
  const onRemainingColsSelection = () => {
    if (isFirstDrop && !isSqlTab) return;
    const table: TableType | undefined = isSqlTab
      ? {
          columns: sqlColumnList?.map((c) => c.name) || [],
          columnsWithDataType: sqlColumnList || [],
          companyId: '',
          id: DBN_SQL_TABLE,
          recentUpdatedAt: 0,
          schemaName: '',
          tableName: DBN_SQL_TABLE,
          alias: DBN_SQL_TABLE,
          sql: query?.replace(/limit\s+\d+/i, '') || '',
          type: 'custom',
        }
      : selectedMainTable;
    if (!table) return;
    const tableAlias =
      table.type === 'custom'
        ? table.alias || DBN_SQL_TABLE
        : `${table.schemaName}_${table.tableName}`;
    const filteredtSqlColList: TableColumn[] =
      table?.columnsWithDataType?.filter(
        (item) =>
          ![...selectedDims, ...selectedMetrics].some(
            (column) => column.alias === item.name
          ) && item.type !== 'custom'
      ) || [];
    const remainingCols: types.SelectedColumn[] = filteredtSqlColList.map(
      (column) => ({
        alias: column.name,
        configType: 'DIMENSION',
        datatype: column.dataType,
        dropType: 'DIMENSION',
        index: selectedDims.length,
        name: column.name,
        parentAlias: tableAlias,
        table,
        type: column.type === 'custom' ? 'CUSTOM' : 'DEFAULT',
        helperFunction: undefined,
        sql: column.sql || '',
        draggableItemData: { column, table },
      })
    );
    if (isFirstDrop) {
      const tableOption =
        table.type === 'custom'
          ? {
              value: `none^^^^^^${table.tableName}^^^^^^${tableAlias}^^^^^^custom`,
              label: tableAlias,
              icon: 'table',
            }
          : {
              value: `${table.schemaName}^^^^^^${table.tableName}`,
              label: `${table.schemaName}.${table.tableName}`,
              icon: 'table',
            };
      setCurrentSelectedTable(tableOption);
      setSelectedMainTable(table);
      setSelectedDims([]);
      setSelectedMetrics([]);
      setSelectedJoins([]);
      setCreatedFilters([]);
      setCreatedSorts([]);
    }
    const updateDims = [...selectedDims, ...remainingCols];
    setSelectedDims(updateDims);
    const newColumnList: types.SelectedColumn[] = isFirstDrop
      ? [...updateDims]
      : [...updateDims, ...selectedMetrics];

    const { aggregates, dimensions } =
      helpers.getDimensionsAndAggregates(newColumnList);
    const newConfiguration: DatasetMetricCreationConfiguration = {
      ...configuration,
      dimensions,
      aggregates,
      table: isFirstDrop
        ? {
            alias: tableAlias,
            id: table.id,
            joins: [],
            name: table.type === 'custom' ? table.sql || '' : table.tableName,
            schema: table.schemaName,
            type: table.type === 'custom' ? 'custom' : 'default',
          }
        : configuration.table,
    };
    setConfiguration(newConfiguration);
    // generateMetric and Chart
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartDimensions: getChartFields(
          newColumnList.filter((col) => col.dropType === 'DIMENSION')
        ),
        chartMetrics: getChartFields(
          newColumnList.filter((col) => col.dropType === 'METRIC')
        ),
        chartAggregateColumns: getChartFields(
          newColumnList.filter((col) => col.configType === 'AGGREGATE')
        ),
      },
      updatedDims: updateDims,
      updatedMetrics: isFirstDrop ? [] : selectedMetrics,
      selectedMainTable: isFirstDrop ? table : undefined,
    });
  };
  const { mutateAsync: fetchColumnValues } = queries.useMetricColumnMutation();
  const tableAlias = useMemo(
    () =>
      selectedMainTable?.type === 'custom'
        ? selectedMainTable?.alias || DBN_SQL_TABLE
        : `${selectedMainTable?.schemaName}_${selectedMainTable?.tableName}`,
    [selectedMainTable]
  );
  const getFilterColumnValues = async () => {
    if (creatorMode === DRAGDROP) return;
    setStringColumnValues([]);
    const stringColumns: TableColumn[] =
      selectedMainTable?.columnsWithDataType?.filter(
        (col) =>
          STRING_TYPES.includes(col?.dataType?.toLowerCase() || '') ||
          col?.dataType?.toLowerCase()?.includes('char')
      ) || [];
    if (stringColumns.length && selectedMainTable) {
      for (let index = 0; index < stringColumns.length; index += 1) {
        const columnName = stringColumns[index]?.name;
        const colData = await fetchColumnValues({
          columnName,
          wId: workspaceId,
          tableName: `${selectedMainTable?.schemaName}.${selectedMainTable?.tableName}`,
        });
        const values: string[] =
          (colData as any)?.data &&
          Array.isArray(colData?.data) &&
          (colData as any)?.data.length
            ? colData.data.map((col) => col.value)
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
  const autoCompleteDropdownOptions: types.SelectedColumn[] = useMemo(() => {
    if (creatorMode === DRAGDROP) return [];
    const columns: types.SelectedColumn[][] =
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
        const filterOptions: types.SelectedColumn[] = isDate
          ? consts.TIME_FILTER_SYNONYMNS.map((func, i) => {
              const newAlias = func.alias(column.name);
              const option: types.SelectedColumn = {
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
                synonyms: consts.NUMBER_FILTER_SYNONYMNS.map(
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
              const newAlias = `${value} ${column.name}`;
              const option: types.SelectedColumn = {
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
        const filteredColumnOptions: types.SelectedColumn[] =
          helperFunctionList.map((func, i) => {
            const isNone = func.value === 'NONE';
            const newAlias = `${
              isNone
                ? column.name
                : `${func.label.toLowerCase()} of ${column.name}`
            }`;
            const isAggregate = consts.aggregateStrings.includes(func.value);
            const option: types.SelectedColumn = {
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
              synonyms: consts.FUNCTIONS_SYNONYMNS?.[func.value] || [],
              filterMethod: '',
              filterType: 'default',
              filterValue: {},
            };
            return option;
          });
        const nullFilterOptions: types.SelectedColumn[] =
          consts.NULL_FILTER_SYNONYMNS.map((func) => ({
            alias: func.alias(column.name),
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
          }));
        return [
          ...filterOptions,
          ...nullFilterOptions,
          ...filteredColumnOptions,
        ];
      }) || [];
    return columns.flat().reverse();
  }, [selectedMainTable, tableAlias, stringColumnValues, creatorMode]);
  const onSubmitSearch = () => {
    if (!selectedMainTable || !workspaceId) return;
    const dimensions: Dimension[] = [];
    const aggregates: Aggregate[] = [];
    const filters: Filter[] = [];

    const orders: Order[] = [];
    const autoLimit: string | undefined = selectedAutoCompleteCols
      .find((dim) => dim.limit && dim.configType !== 'FILTER')
      ?.limit?.toString();
    selectedAutoCompleteCols.forEach((dim) => {
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
              ?.filter((o) => !consts.questionKeywords.includes(o) && o)
          : [];
        const isNumber = NUMBER_TYPES.includes(dim.datatype?.toLowerCase());

        const operator =
          consts.NUMBER_FILTER_SYNONYMNS.find((s) =>
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
                value: consts.NULL_FILTER_SYNONYMNS.find(
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
      limit: autoLimit || DEFAULT_CREATE_DATSET_METRIC_CONFIG.limit,
      filters,
    };
    setConfiguration(newConfiguration);
    onGenerateDatasetMetric({
      prevConfiguration: newConfiguration,
      chartFieldParams: {
        chartType: 'table',
        chartAggregateColumns: getChartFields(
          selectedAutoCompleteCols.filter(
            (col) => col.configType === 'AGGREGATE'
          )
        ),
        chartMetrics: getChartFields(
          selectedAutoCompleteCols.filter(
            (col) => col.configType === 'AGGREGATE'
          )
        ),
        chartDimensions: getChartFields(
          selectedAutoCompleteCols.filter(
            (col) => col.configType === 'DIMENSION'
          )
        ),
      },
      updatedAutoCompleteCols: selectedAutoCompleteCols,
      updatedDims: selectedAutoCompleteCols.filter(
        (col) => col.configType === 'DIMENSION'
      ),
      updatedMetrics: selectedAutoCompleteCols.filter(
        (col) => col.configType === 'AGGREGATE'
      ),
      selectedMainTable,
    });
  };

  // useEffects
  useEffect(() => {
    if (selectedMainTable) {
      getFilterColumnValues();
    } else {
      setStringColumnValues([]);
    }
  }, [selectedMainTable]);
  useEffect(() => {
    const joins: Join[] = selectedJoins
      .filter((join) => {
        const [schema, name] = join.tableName.value?.split('^^^^^^');
        return schema && name && join.conditions.length;
      })
      .map((join) => {
        const [schema, name, alias, type] =
          join.tableName.value?.split('^^^^^^');
        const joinCondition: JoinCondition[] = join.conditions.map(
          (condition) => {
            const { firstOperand, secondOperand, operator } = condition;
            const [firstOperandParentAlias, firstOperandColumnName] =
              firstOperand.value?.split('^^^^^^');
            const [secondOperandParentAlias, secondOperandColumnName] =
              secondOperand.value?.split('^^^^^^');
            return {
              firstOperand: {
                parentAlias: firstOperandParentAlias,
                columnName: firstOperandColumnName,
              },
              secondOperand: {
                parentAlias: secondOperandParentAlias,
                columnName: secondOperandColumnName,
              },
              operator: operator.value,
            };
          }
        );
        const selectedJoin: Join = {
          alias: type === 'custom' ? alias : `${schema}_${name}`,
          conditions: joinCondition,
          name,
          schema: type === 'custom' ? 'none' : schema,
          joinType: join.joinType.value,
          tableType: type === 'custom' ? 'custom' : 'default',
        };
        return selectedJoin;
      });
    setConfiguration((prev) => ({
      ...prev,
      table: {
        ...prev.table,
        joins,
      },
    }));
  }, [selectedJoins]);
  useEffect(() => {
    if (currentSelectedTable.value && customSqlColumns?.length) {
      setCustomColumnList([
        ...(customSqlColumns
          .find(
            (col) =>
              col.tableName ===
                currentSelectedTable?.value.split('^^^^^^')?.join('.') ||
              col.tableName ===
                currentSelectedTable?.value.split('____')?.join('.')
          )
          ?.list?.filter((f) => f.isAggregate || f.isDimension) || []),
      ]);
      setCustomFilterList([
        ...(customSqlColumns
          .find(
            (col) =>
              col.tableName ===
                currentSelectedTable?.value.split('^^^^^^')?.join('.') ||
              col.tableName ===
                currentSelectedTable?.value.split('____')?.join('.')
          )
          ?.list?.filter((f) => f.isFilter) || []),
      ]);
    }
  }, [currentSelectedTable, customSqlColumns]);
  useEffect(() => {
    if (isDisableDrillDown && drillDownSettings?.isEnableGroupBy)
      onChangeDrillDown({}, false);
  }, [isDisableDrillDown, drillDownSettings?.isEnableGroupBy]);
  useEffect(() => {
    if (currentSelectedTable.value && customSqlColumns?.length) {
      setCustomColumnList([
        ...(customSqlColumns
          .find(
            (col) =>
              col.tableName ===
                currentSelectedTable?.value.split('^^^^^^')?.join('.') ||
              col.tableName ===
                currentSelectedTable?.value.split('____')?.join('.')
          )
          ?.list?.filter((f) => f.isAggregate || f.isDimension) || []),
      ]);
      setCustomFilterList([
        ...(customSqlColumns
          .find(
            (col) =>
              col.tableName ===
                currentSelectedTable?.value.split('^^^^^^')?.join('.') ||
              col.tableName ===
                currentSelectedTable?.value.split('____')?.join('.')
          )
          ?.list?.filter((f) => f.isFilter) || []),
      ]);
    }
  }, [currentSelectedTable, customSqlColumns]);

  // on Update metric Page
  useEffect(() => {
    if (datasetSettings && (id || importedMetricId) && isApplySavedSettings) {
      setTimeColumn(replaceUnderScore(datasetSettings.timeColumn));
      setCustomColumnList(datasetSettings.customColumnList || []);
      setSelectedJoins(
        datasetSettings?.selectedJoins?.map((table) => ({
          ...table,
          tableName: replaceUnderScore(table.tableName),
          conditions: table.conditions.map((option) => ({
            ...option,
            firstOperand: replaceUnderScore(option.firstOperand),
            secondOperand: replaceUnderScore(option.secondOperand),
          })),
        })) || []
      );
      setTimeGrainVal(datasetSettings.timeGrainVal || TIME_GRAIN_OPTIONS[5]);
      setConfiguration(
        datasetSettings?.configuration || DEFAULT_CREATE_DATSET_METRIC_CONFIG
      );
      setForecast(datasetSettings?.forecast || DEFAULT_FORECAST_VALUES);

      setCreatedFilters(
        datasetSettings?.createdFilters?.map((f) => ({
          ...f,
          tableName: replaceUnderScore(f.tableName),
          columnName: replaceUnderScore(f.columnName),
        })) || []
      );
      setCreatedSorts(
        datasetSettings?.createdSorts?.map((s) => ({
          ...s,
          columnName: replaceUnderScore(s.columnName),
          tableName: replaceUnderScore(s.tableName),
        })) || []
      );
      setCurrentSelectedTable(
        datasetSettings.selectedTable
          ? replaceUnderScore(datasetSettings.selectedTable)
          : { label: '', value: '' }
      );
      setSelectedDims(datasetSettings?.newDatasetSettings?.selectedDims || []);
      setSelectedMetrics(
        datasetSettings?.newDatasetSettings?.selectedMetrics || []
      );
      setSelectedAutoCompleteCols(
        datasetSettings?.newDatasetSettings?.selectedAutoCompleteColumns || []
      );
      setCreatorMode?.(
        datasetSettings?.newDatasetSettings?.isAutoCompleteMode
          ? POINTCLICK
          : DRAGDROP
      );
      setSelectedMainTable(
        datasetSettings?.newDatasetSettings?.selectedMainTable
      );
      setSqlTab(datasetSettings?.newDatasetSettings?.isSqlMode || false);
      setSqlColumnList(
        datasetSettings?.newDatasetSettings?.sqlColumnList || []
      );
      setSelectedGroupBy(
        datasetSettings?.newDatasetSettings?.selectedGroupBy || []
      );
      setSubQuery(
        datasetSettings?.newDatasetSettings?.subQuery ||
          datasetSettings?.newDatasetSettings?.isSqlMode
          ? datasetSettings?.newDatasetSettings?.selectedMainTable?.sql || ''
          : ''
      );
      setApplySavedSettings(false);
    }
  }, [datasetSettings, id, isApplySavedSettings, importedMetricId]);
  useEffect(() => {
    if (importedMetricId) {
      setApplySavedSettings(true);
    }
  }, [importedMetricId]);
  useEffect(() => {
    setConfiguration((prev) => ({ ...prev, rlsValues }));
  }, [rlsValues]);
  useEffect(() => {
    setConfiguration((prev) => ({
      ...prev,
      rlsConditions: appliedMetricFilters,
    }));
  }, [appliedMetricFilters]);
  useEffect(() => {
    setConfiguration((prev) => ({
      ...prev,
      globalFilters,
    }));
  }, [globalFilters]);
  useEffect(() => {
    if (
      isSqlTab &&
      !!(id || importedMetricId) &&
      subQuery &&
      isFetchSqlModeResults
    ) {
      updateSavedMetricSqlModeResult();
    }
  }, [isSqlTab, id, importedMetricId, subQuery, isFetchSqlModeResults]);
  return {
    selectedMainTable,
    selectedDims,
    selectedMetrics,
    onDropColumn,
    isGenerating,
    isAllowDrillDown,
    onGenerateDatasetMetric,
    functionOptions,
    onRemoveColumn,
    onChangeHelperFunction,
    onChangeAlias,
    setSelectedJoins,
    selectedJoins,
    tableListOptions,
    configuration,
    columnOptions,
    selectedTable,
    isInvalidColModal,
    setInvalidColModal,
    customSql,
    setCustomSql,
    joinTableOption,
    onSaveCustomSQLColumn,
    currentSelectedTable,
    setCurrentSelectedTable,
    createdFilters,
    setCreatedFilters,
    onApplyFilter,
    onApplySort,
    selectedJoinColumnOptions,
    isDatabaseTenancy,
    onSaveCustomFilter,
    savedFilterListOptions,
    createdSorts,
    setCreatedSorts,
    getFilterDropDownType,
    editorRef,
    sortColumnOptions,
    isSqlLoading,
    sqlColumnList,
    onSync,
    isSqlTab,
    setSqlTab,
    clearSelection,
    setChartFields,
    setForecast,
    forecast,
    timeColumn,
    setTimeColumn,
    timeGrainVal,
    setTimeGrainVal,
    dateTimeColumnList,
    onSaveForeCastAction,
    createNewColumnError,
    setCreateNewColumnError,
    comparisonLagSettings,
    setComparisonLagSettings,
    onSaveComparisonSettings,
    datasetCreateState,
    isDatasetCreateModalShow,
    onSaveCreateDataset,
    isCreateVirtualTable,
    setCreateVirtualTable,
    setDatasetCreateModalShow,
    dimModifiers,
    metricModifiers,
    groupByColumOptions,
    selectedGroupBy,
    setSelectedGroupBy,
    onSaveGroupBy,
    onChangeGroupColumnSelection,
    isAddRemainingCols,
    setAddRemainingCols,
    onRemainingColsSelection,
    setSubQuery,
    subQuery,
    schemaTableList,
    setSelectedMainTable,
    selectedAutoCompleteCols,
    setSelectedAutoCompleteCols,
    autoCompleteDropdownOptions,
    onChangeAutoCompleteHelperFunction,
    onChangeAutoCompleteAlias,
    onSubmitSearch,
    isDisableChartDrillDown: isDisableDrillDown,
    onUpdateCustomSqlColumn,
    arithmeticColumnOptions,
    onSaveArithMetricOption,
    filterColumnOptions,
    onPreview,
    onDeletCustomColumn,
    onSelectTimeSeries,
    onSelectPivotTable,
    onDrillPivotTable,
    pivotDrillState,
    resetCharSettings,
    onChangeTimeseriesFormat,
  };
};

export default useDatasetMetricNew;
