/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { consts, types } from '@databrainhq/plugin';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { DatasetSettings, ForcastType, MetricsValue } from 'types';
import {
  useCacheIntegrationSchemaMutation,
  useCreateDatasetMutation,
  useDatasetMetricCreationMutation,
  useSaveCustomSqlColumnMutation,
  useSqlQueryMutation,
} from 'utils/generated/graphql';
import ReactAce from 'react-ace/lib/ace';
import segmentEvent from 'utils/segmentEvent';
import { useQueryClient } from 'react-query';
import {
  Aggregate,
  CreateNewFilter,
  CreatedNewColumn,
  DatasetMetricCreationConfiguration,
  DatasetMetricCreationProps,
  Dimension,
  Filter,
  Join,
  JoinCondition,
  Order,
  GroupByColumn,
  SelectedJoin,
  CreateNewSort,
} from 'types/metric';
import {
  AggregateList,
  DATASET_NUMBER_HELPER_FUNCTIONS,
  DATASET_OTHER_HELPER_FUNCTIONS,
  DATASET_STRING_HELPER_FUNCTIONS,
  DATASET_TIME_HELPER_FUNCTIONS,
  DATE_TYPES,
  DEFAULT_CREATE_DATSET_METRIC_CONFIG,
  DEFAULT_FORECAST_VALUES,
  RLS_CONDITIONS,
  TIME_GRAIN_OPTIONS,
  configTabs,
} from 'consts/values';
import { TABLE } from 'consts/application';
import { getCurrentUser } from 'helpers/application/auth';
import { TableType } from './useCompanySchema';
import { Table } from './useDatasets';

const useDatasetMetric = ({ config }: DatasetMetricCreationProps) => {
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
  } = config;
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    fields: valueFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `field`,
  });
  const DEFAULT_CREATE_NEW_COLUMN = {
    alias: '',
    columnName: { value: '', label: '' },
    function: DATASET_OTHER_HELPER_FUNCTIONS[3],
  };
  const { mutate: saveCustomSqlColumn, isLoading: isSavingCustomSqlColumn } =
    useSaveCustomSqlColumnMutation();
  const {
    mutate: datasetMetricCreation,
    error: generateError,
    isLoading: isGenerating,
  } = useDatasetMetricCreationMutation();
  const { mutate: createDatasetMutate, isLoading: isCreatingDataset } =
    useCreateDatasetMutation();
  const { mutate: executeQuery } = useSqlQueryMutation();
  const { mutate: cacheIntegrationSchemaMutate } =
    useCacheIntegrationSchemaMutation();
  const [isSqlTab, setSqlTab] = useState<boolean>(false);

  const [isShowManageColumnPanel, setShowManageColumnPanel] = useState(false);

  const editorRef = useRef() as React.RefObject<ReactAce>;
  const [customSql, setCustomSql] = useState({
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
  const [alert, setAlert] = useState({ isEnable: false, message: '' });
  const [isDatasetCreateModalShow, setDatasetCreateModalShow] =
    useState<boolean>(false);
  const [isCreateVirtualTable, setCreateVirtualTable] = useState(false);
  const [datasetCreateState, setDatasetCreateState] = useState({
    error: '',
    isLoading: false,
  });
  const [selectedJoins, setSelectedJoins] = useState<SelectedJoin[]>([]);
  const [selectedManageColumns, setSelectedManageColumns] = useState<
    types.FloatingDropDownOption[]
  >([]);
  const [selectedGroupColumns, setSelectedGroupColumns] = useState<
    types.FloatingDropDownOption[]
  >([]);
  const [selectedNewManageColumns, setSelectedNewManageColumns] = useState<
    types.FloatingDropDownOption[]
  >([]);

  const [selectedCustomColumns, setSelectedCustomColumns] = useState<
    MetricsValue[]
  >([]);
  const [selectedCustomGroups, setSelectedCustomGroups] = useState<
    MetricsValue[]
  >([]);
  const [createdNewColumnOptions, setCreatedNewColumnOptions] = useState<
    types.FloatingDropDownOption[]
  >([]);
  const [createdFilters, setCreatedFilters] = useState<CreateNewFilter[]>([]);
  const [createdSorts, setCreatedSorts] = useState<CreateNewSort[]>([]);
  const [createdNewColumn, setCreatedNewColumn] = useState<CreatedNewColumn>(
    DEFAULT_CREATE_NEW_COLUMN
  );
  const [customColumnList, setCustomColumnList] = useState<MetricsValue[]>([]);
  const [customFilterList, setCustomFilterList] = useState<MetricsValue[]>([]);
  const [selectedCustomColumnList, setSelectedCustomColumnList] = useState<
    types.FloatingDropDownOption[]
  >([]);

  const [selectedTab, setSeletedTab] = useState(configTabs[1]);

  const [isShowRlsSettings, setShowRlsSettings] = useState(false);
  const [isShowMetricFilters, setShowMetricFilters] = useState(false);
  const [isShowAddNew, setShowAddNew] = useState(false);
  const [isApplySavedSettings, setApplySavedSettings] = useState(true);
  const [createNewColumnError, setCreateNewColumnError] = useState<string[]>(
    []
  );
  const [sqlColumnList, setSqlColumnList] = useState<
    types.FloatingDropDownOption[]
  >([]);
  const [isSqlColumn, setSqlColumn] = useState(false);
  const [isShowDimSql, setShowDimSql] = useState<boolean>(false);
  const [isShowMetricSql, setShowMetricSql] = useState<boolean>(false);
  const [configModal, setConfigModal] = useState({
    isShow: false,
    type: 'JOIN',
  });
  const [clientColumn, setClientColumn] =
    useState<types.FloatingDropDownOption>({
      value: '',
      label: '',
    });
  const [selectedTable, setSelectedTable] =
    useState<types.FloatingDropDownOption>({
      value: '',
      label: '',
    });
  const [timeColumn, setTimeColumn] = useState<types.FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [isSqlLoading, setSqlLoading] = useState<boolean>(false);

  const [currentSelectedTable, setCurrentSelectedTable] =
    useState<types.FloatingDropDownOption>({
      value: '',
      label: '',
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

  const [comparisonLag, setComparisonLag] = useState<number>(0);

  const [timeFilter, setTimeFilter] = useState<string>('');
  const [timeConfigFilter, setTimeConfigFilter] = useState<string>('');
  const [isIncludeTime, setIncludeTime] = useState<boolean>(false);
  const [timeGrainVal, setTimeGrainVal] =
    useState<types.FloatingDropDownOption>({
      value: 'NONE',
      label: 'Original Value',
    });
  const [forecast, setForecast] = useState<ForcastType>(
    DEFAULT_FORECAST_VALUES
  );
  const [configuration, setConfiguration] =
    useState<DatasetMetricCreationConfiguration>(
      DEFAULT_CREATE_DATSET_METRIC_CONFIG
    );

  const isDatabaseTenancy = useMemo(() => tenancy !== TABLE, [tenancy]);

  const tableListOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const defaultTableOptions =
      tableList?.map((table) => ({
        value: `${table.schemaName}^^^^^^${table.tableName}`,
        label: `${table.schemaName}.${table.tableName}`,
        icon: 'table',
      })) || [];
    const customTableOptions =
      customDatasetList?.map((table) => ({
        value: `none^^^^^^${table.sql}^^^^^^${table.tableName}^^^^^^custom`,
        label: `${table.tableName}`,
        icon: 'table',
      })) || [];
    return [defaultTableOptions, customTableOptions].flat(1);
  }, [customDatasetList, tableList]);
  // const currentJoinTable = watch().selectedJoinTable || '';
  const filterColumn = watch().filterColumn;
  const filterOperator = watch().filterOperator;

  const columnOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const [schemaName, tableName, alias, type] =
      selectedTable?.value?.split('^^^^^^');

    const currentTableColumns: types.FloatingDropDownOption[] =
      type === 'custom'
        ? customDatasetList
            ?.find((t) => t.tableName === alias)
            ?.columnsWithDataType?.map((column) => ({
              value: `${alias}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^${schemaName}^^^^^^${alias}`,
              label: `${alias}.${column.name}`,
            })) || []
        : tableList
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
              value: `${table.alias}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^${table.schema}^^^^^^${table.alias}`,
              label: `${table.alias}.${column.name}`,
            }));
          return options;
        }
        const filteredColumns =
          tableList.find(
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
  }, [
    selectedTable?.value,
    tableList,
    configuration.table.joins,
    customDatasetList,
  ]);
  useEffect(() => {
    if (
      datasetSettings?.configuration?.table.id &&
      !currentSelectedTable.value
    ) {
      setCurrentSelectedTable({
        icon: 'table',
        value: `${datasetSettings?.configuration?.table.schema}^^^^^^${datasetSettings?.configuration?.table.name}`,
        label: `${datasetSettings?.configuration?.table.schema}.${datasetSettings?.configuration?.table.name}`,
      });
    }
  }, [datasetSettings?.configuration?.table, currentSelectedTable]);

  const selectedJoinColumnOptions = useMemo(() => {
    if (isSqlTab) {
      return sqlColumnList;
    }
    const [joinSchemaName, joinTableName, joinAlias, joinTableType] =
      currentSelectedTable.value?.split('^^^^^^');
    if (joinTableType === 'custom') {
      const customTableColumns =
        customDatasetList.find((table) => table.tableName === joinAlias)
          ?.columnsWithDataType || [];
      const options: types.FloatingDropDownOption[] = customTableColumns.map(
        (column) => ({
          value: `${joinAlias}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^none^^^^^^${joinAlias}`,
          label: `${column.name}`,
        })
      );
      return options;
    }
    const options: types.FloatingDropDownOption[] =
      tableList
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
    isSqlTab,
    currentSelectedTable.value,
    tableList,
    sqlColumnList,
    customDatasetList,
  ]);

  const selectedJoinNewColumnOptions = useMemo(
    () =>
      selectedNewManageColumns.filter((column) => {
        const [parentAlias, columnName, datatype, schemaName, tableName] =
          column.value?.split('^^^^^^');
        const [schema, name, alias, type] =
          currentSelectedTable.value?.split('^^^^^^');
        if (type === 'custom') return alias === parentAlias;
        return schema === schemaName && name === tableName;
      }),
    [selectedNewManageColumns, currentSelectedTable]
  );
  const sortColumnOptions = useMemo(() => {
    const defaultOptions: types.FloatingDropDownOption[] =
      selectedJoinColumnOptions.map((o) => ({
        ...o,
        badge: 'Default',
      }));
    const newColumns: types.FloatingDropDownOption[] =
      selectedJoinNewColumnOptions.map((o) => ({ ...o, badge: 'New' }));
    const customColumns: types.FloatingDropDownOption[] = customColumnList.map(
      (v) => ({ label: v.as, value: v.value, badge: 'Custom' })
    );
    const aggregateOptions: types.FloatingDropDownOption[] = [
      ...defaultOptions.filter((col) =>
        selectedManageColumns.some(
          (prevOption) => prevOption.value === col.value
        )
      ),
      ...newColumns.filter((col) =>
        selectedNewManageColumns.some(
          (prevOption) => prevOption.value === col.value
        )
      ),
      ...customColumns.filter((col) =>
        selectedCustomColumns.some((prevOption) => prevOption.as === col.label)
      ),
    ];
    const groupbyOptions = [
      ...defaultOptions.filter(
        (col) =>
          selectedManageColumns.some(
            (prevOption) => prevOption.value === col.value
          ) ||
          selectedGroupColumns.some(
            (prevOption) => prevOption.value === col.value
          )
      ),
      ...newColumns.filter(
        (col) =>
          selectedNewManageColumns.some(
            (prevOption) => prevOption.value === col.value
          ) ||
          selectedGroupColumns.some(
            (prevOption) => prevOption.value === col.value
          )
      ),
      ...customColumns.filter(
        (col) =>
          selectedCustomColumns.some(
            (prevOption) => prevOption.as === col.label
          ) ||
          selectedCustomGroups.some((prevOption) => prevOption.as === col.label)
      ),
    ];

    return configuration.aggregates.length &&
      configuration.groupByColumnList?.length
      ? groupbyOptions
      : configuration.aggregates.length
      ? aggregateOptions
      : [...defaultOptions, ...newColumns, ...customColumns];
  }, [
    selectedJoinColumnOptions,
    selectedJoinNewColumnOptions,
    customColumnList,
    configuration.aggregates.length,
    configuration.groupByColumnList?.length,
    selectedManageColumns,
    selectedNewManageColumns,
    selectedCustomColumns,
    selectedGroupColumns,
    selectedCustomGroups,
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
  const selectedFilterColumnInfo = useMemo(() => {
    if (filterColumn) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [parentAlias, columnName, datatype, schemaName, tableName] =
        filterColumn.split('^^^^^^');
      return { parentAlias, columnName, datatype, schemaName, tableName };
    }
    return undefined;
  }, [filterColumn]);
  const isAllowComparisonLag = useMemo(
    () =>
      !!configuration.dimensions.find(
        (dim) => dim.alias === '_timestamp' && dim.timeGrain
      ),
    [configuration.dimensions]
  );
  const isAllowDrillDown = useMemo(
    () =>
      configuration.dimensions.length > 1 && !!configuration.aggregates.length,
    [configuration.dimensions, configuration.aggregates]
  );
  const isAllowForecast = useMemo(
    () =>
      !!configuration.dimensions.find(
        (dim) => dim.alias === '_timestamp' && dim.timeGrain
      ) && configuration.aggregates.length,
    [configuration.dimensions, configuration.aggregates]
  );
  const isComparisonValue = useMemo(
    () => !!isAllowComparisonLag && comparisonLag > 0,
    [isAllowComparisonLag, comparisonLag]
  );
  const selectedFilterOperator = useMemo(
    () => filterOperator || '=',
    [filterOperator]
  );
  const filterFieldType = useMemo(() => {
    const datatype = selectedFilterColumnInfo?.datatype;
    const isNullFilter =
      selectedFilterOperator === 'IS NULL' ||
      selectedFilterOperator === 'IS NOT NULL';
    const isInFilter =
      selectedFilterOperator === 'IN' || selectedFilterOperator === 'NOT IN';
    if (
      DATE_TYPES.includes(datatype?.toLowerCase()) &&
      !isNullFilter &&
      !isInFilter
    )
      return 'TIME_FILTER';

    if (
      consts.NUMBER_TYPES.includes(datatype?.toLowerCase()) &&
      !isNullFilter
    ) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'INPUT_NUMBER_FIELD';
    }
    if (!isNullFilter) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'FILTER_DROPDOWN';
    }
    return undefined;
  }, [selectedFilterColumnInfo?.datatype, selectedFilterOperator]);

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
    if (!isNullFilter) {
      if (isInFilter) return 'MULTI_FILTER_DROPDOWN';
      return 'FILTER_DROPDOWN';
    }
    return 'FILTER_DROPDOWN';
  };

  const functionOptions = (val: types.FloatingDropDownOption) => {
    const value = val?.value;
    if (value) {
      const [parentAlias, columnName, datatype] = value?.split('^^^^^^');
      if (consts.DATE_TYPES.includes(datatype?.toLowerCase()))
        return DATASET_TIME_HELPER_FUNCTIONS;
      if (consts.NUMBER_TYPES.includes(datatype?.toLowerCase()))
        return DATASET_NUMBER_HELPER_FUNCTIONS;
      if (
        consts.STRING_TYPES.includes(datatype?.toLowerCase()) ||
        datatype?.toLowerCase()?.includes('char')
      )
        return DATASET_STRING_HELPER_FUNCTIONS;
    }
    return DATASET_OTHER_HELPER_FUNCTIONS;
  };

  const joinTableOption = useMemo(() => {
    if (selectedTable.value) {
      return [...selectedJoins.map((join) => join.tableName), selectedTable];
    }
    return [];
  }, [selectedJoins, selectedTable]);

  const onSaveJoin = (values: FieldValues) => {
    const { selectedJoinTable, field: conditions } = values;
    const joinCondition: JoinCondition[] = conditions.map((condition: any) => {
      const { firstOperand, secondOperand } = condition;
      const [firstOperandParentAlias, firstOperandColumnName] =
        firstOperand.split('^^^^^^');
      const [secondOperandParentAlias, secondOperandColumnName] =
        secondOperand.split('^^^^^^');
      return {
        firstOperand: {
          parentAlias: firstOperandParentAlias,
          columnName: firstOperandColumnName,
        },
        secondOperand: {
          parentAlias: secondOperandParentAlias,
          columnName: secondOperandColumnName,
        },
      };
    });
    const [schema, name] = selectedJoinTable.split('^^^^^^');

    const join: Join = {
      alias: `${schema}_${name}`,
      conditions: joinCondition,
      name,
      schema,
    };
    setConfiguration((prev) => ({
      ...prev,
      table: {
        ...prev.table,
        joins: [...prev.table.joins, join],
      },
    }));
    setConfigModal({ isShow: false, type: 'JOIN' });
  };
  const onRemoveJoin = (value: Join) => {
    setConfiguration((prev) => ({
      ...prev,
      table: {
        ...prev.table,
        joins: prev.table.joins.filter((join) => join.alias !== value.alias),
      },
    }));
  };
  const onSaveColumn = (values: FieldValues) => {
    const selectedColumnList = values.selectedColumns;
    const newDimensions = selectedColumnList?.map((column: any) => {
      const [parentAlias, columnName, datatype] = column.name.split('^^^^^^');
      const dimension: Dimension = {
        alias: column.alias,
        columnName,
        dataType: datatype,
        parentAlias,
        type: 'default',
        timeGrain: undefined,
        helperFunction: column.helperFunction,
      };
      return dimension;
    });
    setConfiguration((prev) => ({
      ...prev,
      dimensions: [...prev.dimensions, ...newDimensions],
    }));
    setValue('selectedColumns', []);
    setConfigModal({ isShow: false, type: 'JOIN' });
  };
  const onRemoveColumn = (value: Dimension) => {
    setConfiguration((prev) => ({
      ...prev,
      dimensions: prev.dimensions.filter((dim) => dim.alias !== value.alias),
    }));
    if (value.alias === '_timestamp') {
      setIncludeTime(false);
    }
    setDrillDown({
      isEnableGroupBy: false,
      isEnableCrossFilter: false,
      drillType: '',
    });
    setForecast((prev) => ({ ...prev, isEnable: false }));
    setComparisonLag(0);
  };
  const onSaveAggregate = (values: FieldValues) => {
    const [parentAlias, columnName, datatype] = values.metricColumn
      ? values.metricColumn?.split('^^^^^^')
      : ['', '', ''];
    const method = values.metricAggregate;
    const alias = values.metricAlias;
    setConfiguration((prev) => ({
      ...prev,
      aggregates: [
        ...prev.aggregates,
        {
          alias,
          columnName,
          dataType: datatype,
          method,
          parentAlias,
          type: 'default',
        },
      ],
    }));
    setConfigModal({ isShow: false, type: 'JOIN' });
  };
  const onRemoveAggregate = (value: Aggregate) => {
    setConfiguration((prev) => ({
      ...prev,
      aggregates: prev.aggregates.filter((agr) => agr.alias !== value.alias),
    }));
    setDrillDown({
      isEnableGroupBy: false,
      isEnableCrossFilter: false,
      drillType: '',
    });
    setForecast((prev) => ({ ...prev, isEnable: false }));
  };
  const onSaveFilterConfig = (values: FieldValues) => {
    const [parentAlias, columnName, datatype] =
      values.filterColumn.split('^^^^^^');
    const filterValue = values.filterValue;
    const method = values.filterOperator || '=';

    setConfiguration((prev) => ({
      ...prev,
      filters: [
        ...prev.filters,
        {
          alias: '',
          columnName,
          dataType:
            filterFieldType === 'TIME_FILTER' ? 'TIME_COLUMN' : datatype,
          method,
          parentAlias,
          type: filterFieldType === 'TIME_FILTER' ? 'time' : 'default',
          value:
            filterFieldType === 'MULTI_FILTER_DROPDOWN'
              ? filterValue?.array || []
              : filterFieldType === 'INPUT_NUMBER_FIELD'
              ? filterValue?.number || 0
              : filterFieldType === 'TIME_FILTER'
              ? {
                  endDate: '',
                  startDate: '',
                  timeFilter: timeConfigFilter || 'Last Year',
                }
              : filterValue?.string || '',
        },
      ],
    }));
    setConfigModal({ isShow: false, type: 'JOIN' });
  };
  const onRemoveFilter = (value: Filter) => {
    if (value.type === 'client') {
      setClientColumn({ label: '', value: '' });
    }
    setConfiguration((prev) => ({
      ...prev,
      filters: prev.filters.filter(
        (filter) =>
          filter.columnName !== value.columnName ||
          filter.method !== value.method
      ),
    }));
  };

  const onSaveSortConfig = (values: FieldValues) => {
    const [parentAlias, columnName] = values.sortColumn.split('^^^^^^');
    const method = values.sortDesc ? 'DESC' : 'ASC';
    setConfiguration((prev) => ({
      ...prev,
      orders: [{ method, name: `${parentAlias}.${columnName}` }],
    }));
    setConfigModal({ isShow: false, type: 'JOIN' });
  };
  const onRemoveSortConfig = () => {
    setConfiguration((prev) => ({
      ...prev,
      orders: [],
    }));
  };
  const onChangeSelectAllColumn = (value: boolean) => {
    if (value) {
      setValue(
        'selectedColumns',
        columnOptions.map((option) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [parentAlias, columnName, datatype] =
            option.value.split('^^^^^^');
          return { name: option.value, alias: columnName };
        })
      );
    } else {
      setValue('selectedColumns', []);
    }
  };
  const onChangeColumnSelection = (value: string[]) => {
    setValue(
      'selectedColumns',
      value.map((option) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [parentAlias, columnName, datatype] = option.split('^^^^^^');
        return { name: option, alias: columnName };
      })
    );
  };
  const onResetColumnSelection = (isSelectAll: boolean) => {
    // const filteredOptions = selectedManageColumns.filter((col) => {
    //   const [parentAlias, columnName, datatype, schemaName, tableName] =
    //     col.value?.split('^^^^^^');
    //   const [schema, name] = currentSelectedTable.value?.split('^^^^^^');

    //   return schema !== schemaName || name !== tableName;
    // });
    // const filteredNewOptions = selectedNewManageColumns.filter((col) => {
    //   const [parentAlias, columnName, datatype, schemaName, tableName] =
    //     col.value?.split('^^^^^^');
    //   const [schema, name] = currentSelectedTable.value?.split('^^^^^^');

    //   return schema !== schemaName || name !== tableName;
    // });
    // const selectedNewOptions = createdNewColumnOptions.filter((col) => {
    //   const [parentAlias, columnName, datatype, schemaName, tableName] =
    //     col.value?.split('^^^^^^');
    //   const [schema, name] = currentSelectedTable.value?.split('^^^^^^');
    //   return schema === schemaName && name === tableName;
    // });
    // const filteredCustomOptions = selectedCustomColumns.filter((col) => {
    //   const [parentAlias, val] = col.value?.split(' ');
    //   const [tableSchema, column] = val.split('.');
    //   const tableArr = tableSchema.replace(/"/g, '').split('_');
    //   const tableName = tableArr.slice(1, tableArr.length).join('_');
    //   const [schema, name] = currentSelectedTable.value?.split('^^^^^^');
    //   return tableName !== name || tableArr[0] !== schema;
    // });
    // const selectedCustomOptions = customColumnList.filter((col) => {
    //   const [parentAlias, val] = col.value?.split(' ');
    //   const [tableSchema, column] = val.split('.');
    //   const tableArr = tableSchema.replace(/"/g, '').split('_');
    //   const tableName = tableArr.slice(1, tableArr.length).join('_');
    //   const [schema, name] = currentSelectedTable.value?.split('^^^^^^');
    //   return tableName === name && tableArr[0] === schema;
    // });
    // if (isSelectAll) {
    //   setSelectedManageColumns([
    //     ...filteredOptions,
    //     ...selectedJoinColumnOptions,
    //   ]);
    //   setSelectedNewManageColumns([
    //     ...filteredNewOptions,
    //     ...selectedNewOptions,
    //   ]);
    //   setSelectedCustomColumns([
    //     ...filteredCustomOptions,
    //     ...selectedCustomOptions,
    //   ]);
    // } else {
    //   setSelectedManageColumns(filteredOptions);
    //   setSelectedNewManageColumns(filteredNewOptions);
    //   setSelectedCustomColumns(filteredCustomOptions);
    // }
    const filteredOptions = selectedManageColumns.filter((col) => {
      const [parentAlias, columnName, datatype, schemaName, tableName] =
        col.value?.split('^^^^^^');
      const [schema, name, alias, type] =
        currentSelectedTable.value?.split('^^^^^^');
      if (type === 'custom') {
        return alias !== parentAlias;
      }
      return schema !== schemaName || name !== tableName;
    });
    const filteredNewOptions = selectedNewManageColumns.filter((col) => {
      const [parentAlias, columnName, datatype, schemaName, tableName] =
        col.value?.split('^^^^^^');
      const [schema, name, alias, type] =
        currentSelectedTable.value?.split('^^^^^^');
      if (type === 'custom') {
        return alias !== parentAlias;
      }
      return schema !== schemaName || name !== tableName;
    });
    const filteredCustomOptions = selectedCustomColumns.filter(
      (col) => !customColumnList.some((c) => c.as === col.as)
    );
    if (isSelectAll) {
      setSelectedManageColumns([
        ...filteredOptions,
        ...selectedJoinColumnOptions,
      ]);
      setSelectedNewManageColumns([
        ...filteredNewOptions,
        ...selectedJoinNewColumnOptions,
      ]);
      setSelectedCustomColumns([...filteredCustomOptions, ...customColumnList]);
    } else {
      setSelectedManageColumns(filteredOptions);
      setSelectedNewManageColumns(filteredNewOptions);
      setSelectedCustomColumns(filteredCustomOptions);
    }
  };
  const onChangeManageColumnSelection = (
    option: types.FloatingDropDownOption
  ) => {
    setSelectedManageColumns((prev) => {
      const isAlreadySelected = prev.some(
        (prevOption) => prevOption.value === option.value
      );
      if (isAlreadySelected) {
        return prev.filter((prevOption) => prevOption.value !== option.value);
      }
      return [...prev, option];
    });
  };
  const onChangeGroupColumnSelection = (
    option: types.FloatingDropDownOption
  ) => {
    setSelectedGroupColumns((prev) => {
      const isAlreadySelected = prev.some(
        (prevOption) => prevOption.value === option.value
      );
      if (isAlreadySelected) {
        return prev.filter((prevOption) => prevOption.value !== option.value);
      }
      return [...prev, option];
    });
  };
  const onChangeNewManageColumnSelection = (
    option: types.FloatingDropDownOption
  ) => {
    setSelectedNewManageColumns((prev) => {
      const isAlreadySelected = prev.some(
        (prevOption) => prevOption.value === option.value
      );
      if (isAlreadySelected) {
        return prev.filter((prevOption) => prevOption.value !== option.value);
      }
      return [...prev, option];
    });
  };
  const onChangeCustomColumnSelection = (option: MetricsValue) => {
    setSelectedCustomColumns((prev) => {
      const isAlreadySelected = prev.some(
        (prevOption) => prevOption.as === option.as
      );
      if (isAlreadySelected) {
        return prev.filter((prevOption) => prevOption.as !== option.as);
      }
      return [...prev, option];
    });
  };
  const onChangeCustomGroupSelection = (option: MetricsValue) => {
    setSelectedCustomGroups((prev) => {
      const isAlreadySelected = prev.some(
        (prevOption) => prevOption.as === option.as
      );
      if (isAlreadySelected) {
        return prev.filter((prevOption) => prevOption.as !== option.as);
      }
      return [...prev, option];
    });
  };
  const onChangeFilterValue = (value: any, type: string) => {
    switch (type) {
      case 'MULTI_FILTER_DROPDOWN':
        setValue(
          'filterValue.array',
          consts.NUMBER_TYPES.includes(
            selectedFilterColumnInfo?.datatype?.toLowerCase() || ''
          )
            ? value?.map((val: any) => Number(val))
            : value
        );
        break;
      case 'INPUT_NUMBER_FIELD':
        setValue('filterValue.number', Number(value));
        break;

      default:
        setValue('filterValue.string', value);

        break;
    }
  };
  const onChangeIncludeTime = (value: boolean) => {
    const [parentAlias, columnName, datatype] =
      timeColumn.value.split('^^^^^^');
    if (value && timeColumn) {
      setIncludeTime(true);
      setComparisonLag(0);
      setConfiguration((prev) => ({
        ...prev,
        dimensions: [
          ...prev.dimensions.filter((dim) => dim.alias !== '_timestamp'),
          {
            alias: '_timestamp',
            columnName,
            dataType: datatype,
            parentAlias,
            type: 'default',
            timeGrain:
              timeGrainVal.value !== 'NONE' ? timeGrainVal.value : undefined,
          },
        ],
      }));
    } else {
      setIncludeTime(false);
      setComparisonLag(0);
      setConfiguration((prev) => ({
        ...prev,
        dimensions: prev.dimensions.filter((dim) => dim.alias !== '_timestamp'),
        orders: prev.orders.filter((filter) => filter.name !== '_timestamp'),
      }));
      setComparisonLag(0);
    }
  };

  const onChangeCustomValue = (value: Record<string, string | boolean>) => {
    setCustomSql((prevValue) => ({ ...prevValue, ...value }));
  };
  const onSaveConfig = (values: FieldValues) => {
    switch (configModal.type) {
      // case 'JOIN':
      //   return onSaveJoin(values);
      case 'COLUMN':
        return onSaveColumn(values);
      case 'METRIC':
        return onSaveAggregate(values);
      case 'FILTER':
        return onSaveFilterConfig(values);
      case 'SORT':
        return onSaveSortConfig(values);
      default:
        return console.warn('not a valid type');
    }
  };

  // const autoSelectCustomField = () => {
  //   switch (configModal.type) {
  //     case 'COLUMN':
  //       setConfiguration((prev) => ({
  //         ...prev,
  //         dimensions: [
  //           ...prev.dimensions,
  //           {
  //             alias: customSql.name,
  //             columnName: customSql.sql,
  //             dataType: 'CUSTOM',
  //             parentAlias: 'NULL',
  //             type: 'custom',
  //             timeGrain: undefined,
  //           },
  //         ],
  //       }));
  //       break;
  //     case 'METRIC':
  //       setConfiguration((prev) => ({
  //         ...prev,
  //         aggregates: [
  //           ...prev.aggregates,
  //           {
  //             alias: customSql.name,
  //             columnName: customSql.sql,
  //             dataType: 'CUSTOM',
  //             parentAlias: 'NULL',
  //             type: 'custom',
  //             method: 'NONE',
  //           },
  //         ],
  //       }));
  //       break;
  //     case 'FILTER':
  //       setConfiguration((prev) => ({
  //         ...prev,
  //         filters: [
  //           ...prev.filters,
  //           {
  //             alias: customSql.name,
  //             columnName: customSql.sql,
  //             dataType: 'CUSTOM',
  //             parentAlias: 'NULL',
  //             type: 'custom',
  //             method: 'NONE',
  //             value: 'NULL',
  //           },
  //         ],
  //       }));
  //       break;
  //     default:
  //       console.warn('not a valid type');
  //       break;
  //   }
  // };
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
            isAggregate: isShowMetricSql,
            isDimension: isShowDimSql,
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
            setCustomColumnList(
              sqlColumns?.filter((f) => f.isAggregate || f.isDimension)
            );
            setCustomFilterList(sqlColumns?.filter((f) => f.isFilter));
            // autoSelectCustomField();
            if (!customFiltersObjects?.length)
              setSelectedCustomColumns((prevValue) => [
                ...prevValue,
                {
                  as: customSql.name,
                  value: customSql.sql,
                  isAggregate: isShowMetricSql,
                  isDimension: isShowDimSql,
                  isFilter: false,
                },
              ]);
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
            setConfigModal({ isShow: false, type: 'JOIN' });
            setShowAddNew(false);
            setSqlColumn(false);
            onSuccess?.();
          }
        },
      }
    );
  };
  const onApplySavedCustomColumn = () => {
    switch (configModal.type) {
      case 'COLUMN':
        setConfiguration((prev) => ({
          ...prev,
          dimensions: [
            ...prev.dimensions,
            ...selectedCustomColumnList.map((custom) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [columnName, index, alias] = custom?.value?.split('^^^^^^');
              const dimension: Dimension = {
                alias,
                columnName,
                dataType: 'CUSTOM',
                parentAlias: 'NULL',
                type: 'custom',
                timeGrain: undefined,
              };
              return dimension;
            }),
          ],
        }));
        break;
      case 'METRIC':
        setConfiguration((prev) => ({
          ...prev,
          aggregates: [
            ...prev.aggregates,
            ...selectedCustomColumnList.map((custom) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [columnName, index, alias] = custom?.value?.split('^^^^^^');
              const aggregate: Aggregate = {
                alias,
                columnName,
                dataType: 'CUSTOM',
                parentAlias: 'NULL',
                type: 'custom',
                method: 'NONE',
              };
              return aggregate;
            }),
          ],
        }));
        break;
      case 'FILTER':
        setConfiguration((prev) => ({
          ...prev,
          filters: [
            ...prev.filters,
            ...selectedCustomColumnList.map((custom) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [columnName, index, alias] = custom?.value?.split('^^^^^^');
              const filter: Filter = {
                alias,
                columnName,
                dataType: 'CUSTOM',
                parentAlias: 'NULL',
                type: 'custom',
                method: 'NONE',
                value: 'NULL',
              };
              return filter;
            }),
          ],
        }));
        break;
      default:
        console.warn('not a valid type');
        break;
    }
    setSelectedCustomColumnList([]);
    setConfigModal({ isShow: false, type: 'JOIN' });
  };

  const setChartFields = ({
    chartType,
    metricParams,
    dimensionParams,
    createdDimensionParams,
    createdMetricParams,
    selectedCustomDim,
    selectedCustomMetric,
  }: {
    chartType: types.ChartSettingsType['chartType'];
    metricParams?: types.FloatingDropDownOption[];
    dimensionParams?: types.FloatingDropDownOption[];
    createdMetricParams?: types.FloatingDropDownOption[];
    createdDimensionParams?: types.FloatingDropDownOption[];
    selectedCustomDim?: MetricsValue[];
    selectedCustomMetric?: MetricsValue[];
  }) => {
    if (chartType === consts.CHART_TYPES.singleValue) {
      setChartSettings((prev) => ({
        ...prev,
        chartType,
        singleValue:
          (selectedCustomDim ||
            selectedCustomColumns.filter((opt) => opt.isDimension))?.[0]?.as ||
          (createdDimensionParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          (dimensionParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          (selectedCustomMetric ||
            selectedCustomColumns.filter((opt) => opt.isAggregate))?.[0]?.as ||
          (createdMetricParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType === 'metric'
            ))?.[0]?.label ||
          (metricParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType === 'metric'
            ))?.[0]?.label,
      }));
    } else if (
      (createdMetricParams?.length ||
        selectedNewManageColumns.filter((opt) => opt.labelType === 'metric')
          .length) &&
      (chartType === consts.CHART_TYPES.pivot ||
        chartType === consts.CHART_TYPES.treeMap) &&
      data?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType,
        pivotTableSettings: {
          ...chartSettings.pivotTableSettings,
          columns: [
            ...(
              selectedCustomDim ||
              selectedCustomColumns.filter((opt) => opt.isDimension)
            ).map((opt) => opt.as),
            ...(
              createdDimensionParams ||
              selectedNewManageColumns.filter(
                (opt) => opt.labelType !== 'metric'
              )
            ).map((opt) => opt.label),
            ...(
              dimensionParams ||
              selectedManageColumns.filter((opt) => opt.labelType !== 'metric')
            ).map((opt) => opt.label),
          ],
          rows: [
            ...(
              createdMetricParams ||
              selectedNewManageColumns.filter(
                (opt) => opt.labelType === 'metric'
              )
            ).map((opt) => opt.label),
          ],
        },
      }));
    } else if (chartType === consts.CHART_TYPES.table) {
      const tableFields = [
        ...(
          selectedCustomDim ||
          selectedCustomColumns.filter((opt) => opt.isDimension)
        ).map((opt) => opt.as),
        ...(
          createdDimensionParams ||
          selectedNewManageColumns.filter((opt) => opt.labelType !== 'metric')
        ).map((val) => val.label),
        ...(
          dimensionParams ||
          selectedManageColumns.filter((opt) => opt.labelType !== 'metric')
        )?.map((val) => val.label),
        ...(
          selectedCustomMetric ||
          selectedCustomColumns.filter((opt) => opt.isAggregate)
        )?.map((val) => val.as),
        ...(
          createdMetricParams ||
          selectedNewManageColumns.filter((opt) => opt.labelType === 'metric')
        )?.map((val) => val.label),
        ...(
          metricParams ||
          selectedManageColumns.filter((opt) => opt.labelType === 'metric')
        )?.map((val) => val.label),
      ];
      setChartSettings((prev: any) => ({
        ...prev,
        chartType,
        xAxis:
          (selectedCustomDim ||
            selectedCustomColumns.filter((opt) => opt.isDimension))?.[0]?.as ||
          (createdDimensionParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          (dimensionParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          '',
        yAxisList: tableFields || [],
      }));
    } else if (chartType === consts.CHART_TYPES.waterfall) {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType,
        xAxis:
          (selectedCustomDim ||
            selectedCustomColumns.filter((opt) => opt.isDimension))?.[0]?.as ||
          (createdDimensionParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          (dimensionParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label,
        yAxisList:
          [
            (selectedCustomMetric ||
              selectedCustomColumns.filter((opt) => opt.isAggregate))?.[0].as ||
              (createdMetricParams ||
                selectedNewManageColumns.filter(
                  (opt) => opt.labelType === 'metric'
                ))?.[0]?.label ||
              (metricParams ||
                selectedManageColumns.filter(
                  (opt) => opt.labelType === 'metric'
                ))?.[0]?.label,
          ] || [],
      }));
    } else if (chartType === consts.CHART_TYPES.sankey) {
      const arr = [
        ...(
          selectedCustomDim ||
          selectedCustomColumns.filter((opt) => opt.isDimension)
        )?.map((opt) => opt.as),
        ...(
          createdDimensionParams ||
          selectedNewManageColumns.filter((opt) => opt.labelType !== 'metric')
        ).map((item) => item.label),
        ...(
          dimensionParams ||
          selectedManageColumns.filter((opt) => opt.labelType !== 'metric')
        ).map((item) => item.label),
      ];
      const arr2 = [
        ...(
          selectedCustomMetric ||
          selectedCustomColumns.filter((opt) => opt.isAggregate)
        ).map((item) => item.as),
        ...(
          metricParams ||
          selectedManageColumns.filter((opt) => opt.labelType === 'metric')
        ).map((item) => item.label),
        ...(
          createdMetricParams ||
          selectedNewManageColumns.filter((opt) => opt.labelType === 'metric')
        ).map((item) => item.label),
      ];
      setChartSettings((prev) => ({
        ...prev,
        chartType,
        sankeyValues: [
          arr[0] || arr2[0],
          arr[1] || arr2[1] || arr[0],
          (selectedCustomMetric ||
            selectedCustomColumns.filter((opt) => opt.isAggregate))?.[0]?.as ||
            (createdMetricParams ||
              selectedNewManageColumns.filter(
                (opt) => opt.labelType === 'metric'
              ))?.[0]?.label ||
            (metricParams ||
              selectedManageColumns.filter(
                (opt) => opt.labelType === 'metric'
              ))?.[0]?.label ||
            '',
        ],
      }));
    } else if (
      chartType === consts.CHART_TYPES.funnel ||
      chartType === consts.CHART_TYPES.boxplot
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartType,
        step:
          (selectedCustomDim ||
            selectedCustomColumns.filter((opt) => opt.isDimension))?.[0]?.as ||
          (createdDimensionParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          (dimensionParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label,
        measure:
          (selectedCustomMetric ||
            selectedCustomColumns.filter((opt) => opt.isAggregate))?.[0]?.as ||
          (createdMetricParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType === 'metric'
            ))?.[0]?.label ||
          (metricParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType === 'metric'
            ))?.[0]?.label,
      }));
    } else if (chartType === consts.CHART_TYPES.gauge && data?.length) {
      if (
        !createdMetricParams?.length ||
        !selectedNewManageColumns.map((opt) => opt.labelType === 'metric')
          .length
      ) {
        setChartSettings((prev) => ({
          ...prev,
          chartType,
          gaugeSettings: {
            metric:
              (selectedCustomMetric ||
                selectedCustomColumns.filter((opt) => opt.isAggregate))?.[0]
                ?.as ||
              (metricParams ||
                selectedManageColumns.filter(
                  (opt) => opt.labelType === 'metric'
                ))?.[0]?.label,
            dimensions: [],
          },
        }));
      } else {
        setChartSettings((prev) => ({
          ...prev,
          chartType,
          gaugeSettings: {
            metric: (createdMetricParams ||
              selectedNewManageColumns.filter(
                (opt) => opt.labelType === 'metric'
              ))?.[0]?.label,
            dimensions:
              [
                ...(
                  selectedCustomDim ||
                  selectedCustomColumns.filter((opt) => opt.isDimension)
                )?.map((opt) => opt.as),
                ...(
                  createdDimensionParams ||
                  selectedNewManageColumns.filter(
                    (opt) => opt.labelType !== 'metric'
                  )
                ).map((val) => val.label),
                ...(
                  dimensionParams ||
                  selectedManageColumns.filter(
                    (opt) => opt.labelType !== 'metric'
                  )
                ).map((val) => val.label),
              ] || [],
          },
        }));
      }
    } else if (chartType === consts.CHART_TYPES.horizontalStackTable) {
      setChartSettings((prev) => ({
        ...prev,
        chartType,
        stackTableCols: [
          ...(
            selectedCustomMetric ||
            selectedCustomColumns.filter((opt) => opt.isAggregate)
          )?.map((v) => v.as || ''),
          ...(
            createdMetricParams ||
            selectedNewManageColumns.filter((opt) => opt.labelType === 'metric')
          )?.map((v) => v.label || ''),
          ...(
            metricParams ||
            selectedManageColumns.filter((opt) => opt.labelType === 'metric')
          )?.map((v) => v.label),
        ],
        yAxisList: [
          ...(
            selectedCustomDim ||
            selectedCustomColumns.filter((opt) => opt.isDimension)
          )?.map((v) => v.as || ''),
          ...(
            createdDimensionParams ||
            selectedNewManageColumns.filter((opt) => opt.labelType !== 'metric')
          )?.map((v) => v.label || ''),
          ...(
            dimensionParams ||
            selectedManageColumns.filter((opt) => opt.labelType !== 'metric')
          )?.map((v) => v.label),
        ],
      }));
    } else {
      setChartSettings((prev: any) => ({
        ...prev,
        chartType,
        xAxis:
          (selectedCustomDim ||
            selectedCustomColumns.filter((opt) => opt.isDimension))?.[0]?.as ||
          (createdDimensionParams ||
            selectedNewManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          (dimensionParams ||
            selectedManageColumns.filter(
              (opt) => opt.labelType !== 'metric'
            ))?.[0]?.label ||
          '',
        yAxisList:
          [
            ...(
              selectedCustomMetric ||
              selectedCustomColumns.filter((opt) => opt.isAggregate)
            )?.map((val) => val.as),
            ...(
              createdMetricParams ||
              selectedNewManageColumns.filter(
                (opt) => opt.labelType === 'metric'
              )
            )?.map((val) => val.label),
            ...(
              metricParams ||
              selectedManageColumns.filter((opt) => opt.labelType === 'metric')
            )?.map((val) => val.label),
          ] || [],
      }));
    }
  };

  const onGenerateDatasetmetric = ({
    prevConfiguration,
    metricParams,
    dimensionParams,
    createdDimensionParams,
    createdMetricParams,
    selectedCustomDim,
    selectedCustomMetric,
    onSuccess,
    prevLimit,
  }: {
    prevConfiguration?: DatasetMetricCreationConfiguration;
    metricParams?: types.FloatingDropDownOption[];
    dimensionParams?: types.FloatingDropDownOption[];
    createdMetricParams?: types.FloatingDropDownOption[];
    createdDimensionParams?: types.FloatingDropDownOption[];
    selectedCustomDim?: MetricsValue[];
    selectedCustomMetric?: MetricsValue[];
    onSuccess?: () => void;
    prevLimit?: string;
  }) => {
    if (prevConfiguration) setConfiguration(prevConfiguration);
    const settings: DatasetSettings = {
      selectedTable,
      selectedJoins,
      configuration: {
        ...(prevConfiguration || configuration),
        limit: prevLimit || limit,
      },
      clientColumn,
      comparisonLag,
      customColumnList,
      isIncludeTime,
      metrics: isAllowDrillDown
        ? (prevConfiguration || configuration).aggregates.map((agr) => ({
            as: agr.alias,
            value: agr.columnName,
          }))
        : [],
      selectedDimensions: isAllowDrillDown
        ? (prevConfiguration || configuration).dimensions.map(
            (dim) => dim.alias
          )
        : [],
      isNewDataset: true,
      timeColumn,
      timeGrainValue: timeFilter,
      timeGrainVal,
      forecast,
      createdNewColumnOptions,
      selectedCustomColumns,
      selectedManageColumns,
      selectedNewManageColumns,
      createdFilters,
      createdSorts,
      comparisonLagSettings,
      selectedCustomGroups,
      selectedGroupColumns,
    };
    setDatasetSettings(settings);
    setError(undefined);
    setLoading(true);
    setData([]);
    setQuery('');
    datasetMetricCreation(
      {
        cId: clientId,
        configuration: {
          ...(prevConfiguration || configuration),
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
            // setPreview(false);
          }
          if (result && outputQuery) {
            segmentEvent('generate dataset metric success', {
              timeTaken: timeTaken || 0,
            });
            setError(undefined);
            setLoading(false);
            setData(Array.isArray(result) ? result : []);
            setChartFields({
              chartType: chartSettings.chartType,
              metricParams,
              dimensionParams,
              createdMetricParams,
              createdDimensionParams,
              selectedCustomDim,
              selectedCustomMetric,
            });
            setQuery(outputQuery);
            if (setTimeTaken) setTimeTaken(timeTaken || 0);
            setGroupByList?.(
              metaData?.groupbyColumnList?.map((col: string) =>
                col.replace(/`/g, '')
              ) || []
            );
            // setPreview(false);
          }
          onSuccess?.();
        },
      }
    );
  };
  const onGenerateChart = ({
    param,
    metricParams,
    dimensionParams,
    createdDimensionParams,
    createdMetricParams,
    selectedCustomDim,
    selectedCustomMetric,
    prevLimit,
  }: {
    param?: DatasetMetricCreationConfiguration;
    metricParams?: types.FloatingDropDownOption[];
    dimensionParams?: types.FloatingDropDownOption[];
    createdMetricParams?: types.FloatingDropDownOption[];
    createdDimensionParams?: types.FloatingDropDownOption[];
    selectedCustomDim?: MetricsValue[];
    selectedCustomMetric?: MetricsValue[];
    prevLimit?: string;
  }) => {
    onGenerateDatasetmetric({
      prevConfiguration: param || configuration,
      metricParams,
      dimensionParams,
      createdDimensionParams,
      createdMetricParams,
      selectedCustomDim,
      selectedCustomMetric,
      prevLimit,
    });
  };
  const onSaveCreatedColumn = () => {
    setCreateNewColumnError([]);
    if (isShowDimSql || isShowMetricSql) {
      const onSuccess = () => {
        onGenerateChart({
          param: {
            ...configuration,
            dimensions: isShowDimSql
              ? [
                  ...configuration.dimensions,
                  {
                    alias: customSql.name,
                    columnName: customSql.sql,
                    dataType: 'CUSTOM',
                    parentAlias: 'NULL',
                    type: 'custom',
                    timeGrain: undefined,
                  },
                ]
              : configuration.dimensions,
            aggregates: isShowMetricSql
              ? [
                  ...configuration.aggregates,
                  {
                    alias: customSql.name,
                    columnName: customSql.sql,
                    dataType: 'CUSTOM',
                    parentAlias: 'NULL',
                    type: 'custom',
                    method: '',
                  },
                ]
              : configuration.aggregates,
          },
          selectedCustomDim: isShowDimSql
            ? [
                ...selectedCustomColumns.filter((opt) => opt.isDimension),
                {
                  as: customSql.name,
                  value: customSql.sql,
                  isAggregate: isShowMetricSql,
                  isDimension: isShowDimSql,
                  isFilter: false,
                },
              ]
            : selectedCustomColumns.filter((opt) => opt.isDimension),
          selectedCustomMetric: isShowMetricSql
            ? [
                ...selectedCustomColumns.filter((opt) => opt.isAggregate),
                {
                  as: customSql.name,
                  value: customSql.sql,
                  isAggregate: isShowMetricSql,
                  isDimension: isShowDimSql,
                  isFilter: false,
                },
              ]
            : selectedCustomColumns.filter((opt) => opt.isAggregate),
        });
      };
      if (customSql.sql && customSql.name)
        onSaveCustomColumn(undefined, onSuccess);
      else {
        const saveErrors = [
          !customSql.sql ? 'please enter sql for column' : '',
          !customSql.name ? 'please enter name of the new column' : '',
        ];
        setCreateNewColumnError(saveErrors.filter((str) => str));
      }
    } else if (
      createdNewColumn.columnName.value &&
      createdNewColumn.alias &&
      createdNewColumn.function.value
    ) {
      setCreateNewColumnError([]);
      const newColumn = {
        value: `${createdNewColumn.columnName.value}^^^^^^${createdNewColumn.function.value}^^^^^^${createdNewColumn.alias}`,
        label: createdNewColumn.alias,
      };
      setCreatedNewColumnOptions((prev) => [...prev, newColumn]);
      setSelectedNewManageColumns((prev) => [...prev, newColumn]);
      setShowAddNew(false);
      setSqlColumn(false);
      setCreatedNewColumn(DEFAULT_CREATE_NEW_COLUMN);
    } else {
      const saveErrors = [
        !createdNewColumn.columnName.value
          ? 'please select a column from dropdown'
          : '',
        !createdNewColumn.alias ? 'please enter name of the new column' : '',
        !createdNewColumn.function.value
          ? 'please select a function from dropdown'
          : '',
      ];
      setCreateNewColumnError(saveErrors.filter((str) => str));
    }
  };
  const onChangeTableSelection = (table: TableType) => {
    const { schemaName, tableName, id: configId } = table;
    const tableOption =
      table.type === 'custom'
        ? {
            value: `none^^^^^^${table.tableName}^^^^^^dbn_sql_table^^^^^^custom`,
            label: 'dbn_sql_table',
            icon: 'table',
          }
        : {
            value: `${table.schemaName}^^^^^^${table.tableName}`,
            label: `${table.schemaName}.${table.tableName}`,
            icon: 'table',
          };
    setSelectedTable(tableOption);
    setCurrentSelectedTable(tableOption);

    setSelectedManageColumns([]);
    setCreatedNewColumnOptions([]);
    setSelectedNewManageColumns([]);
    setSelectedCustomColumns([]);
    setSelectedGroupColumns([]);
    setSelectedCustomGroups([]);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setCreatedNewColumn(DEFAULT_CREATE_NEW_COLUMN);
    // const currentTableColumns: types.FloatingDropDownOption[] =
    //   tableList
    //     .find((t) => t.schemaName === schemaName && t.tableName === tableName)
    //     ?.columnsWithDataType?.map?.((column) => ({
    //       value: `${schemaName}_${tableName}^^^^^^${column.name}^^^^^^${column.dataType}^^^^^^${schemaName}^^^^^^${tableName}`,
    //       label: `${schemaName}_${tableName}.${column.name}`,
    //     })) || [];
    // if (currentTableColumns?.length && !isGenerating) {
    //   // const prevColumns = currentTableColumns.slice(0, 4);
    //   setSelectedManageColumns([]);
    //   setSelectedCustomColumns([]);
    //   setSelectedCustomGroups([]);
    //   setSelectedNewManageColumns([]);
    //   setSelectedGroupColumns([]);
    // }
    const prevLimit = 100;
    setForecast(DEFAULT_FORECAST_VALUES);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setConfiguration(
      table.type === 'custom'
        ? {
            ...DEFAULT_CREATE_DATSET_METRIC_CONFIG,
            dimensions: [],
            limit: `100`,
            table: {
              ...DEFAULT_CREATE_DATSET_METRIC_CONFIG.table,
              alias: 'dbn_sql_table',
              id: 'dbn_sql_table',
              schema: 'none',
              name: table.tableName,
              type: 'custom',
            },
          }
        : {
            ...DEFAULT_CREATE_DATSET_METRIC_CONFIG,
            dimensions: [],
            limit: `${prevLimit}`,
            table: {
              ...DEFAULT_CREATE_DATSET_METRIC_CONFIG.table,
              alias: `${schemaName}_${tableName}`,
              id: configId,
              schema: schemaName,
              name: tableName,
            },
          }
    );
    // setPreview(true);
  };
  const validateColumn = (table: TableType) => {
    const [schema, name] = selectedTable.value.split('^^^^^^');
    return (
      !(table.schemaName === schema && table.tableName === name) &&
      !selectedJoins.find((opt) => {
        const [schemaName, tableName] = opt.tableName.value.split('^^^^^^');
        return table.schemaName === schemaName && table.tableName === tableName;
      })
    );
  };
  const onChangeCustomTableSelection = (table: Table) => {
    const tableOption = {
      value: `none^^^^^^${table.query}^^^^^^${table.tableName}^^^^^^custom`,
      label: `${table.tableName}`,
      icon: 'table',
    };
    setSelectedManageColumns([]);
    setCreatedNewColumnOptions([]);
    setSelectedNewManageColumns([]);
    setSelectedCustomColumns([]);
    setSelectedGroupColumns([]);
    setSelectedCustomGroups([]);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setCreatedNewColumn(DEFAULT_CREATE_NEW_COLUMN);

    setSelectedTable(tableOption);
    setCurrentSelectedTable(tableOption);
    setSelectedManageColumns(
      table?.columnList?.map((column) => ({
        value: `${table.tableName}^^^^^^${column.name}^^^^^^${column.datatype}^^^^^^none^^^^^^${table.tableName}`,
        label: `${column.name}`,
      })) || []
    );
    setConfiguration({
      ...DEFAULT_CREATE_DATSET_METRIC_CONFIG,
      dimensions: [],
      limit: `100`,
      table: {
        ...DEFAULT_CREATE_DATSET_METRIC_CONFIG.table,
        alias: `${table.tableName}`,
        id: table.id,
        schema: 'none',
        name: table.query,
        type: 'custom',
      },
    });
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
    onGenerateDatasetmetric({
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
          f.columnName.value?.split('^^^^^^');
        const method = f.operator.value || '=';
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
    // const customFilters = createdFilters.filter(
    //   (f) => f.type === 'custom' && !f.isSaved
    // );
    // const customFiltersObjects = customFilters.map((f) => ({
    //   as: f.name,
    //   value: f.sql,
    //   isAggregate: false,
    //   isDimension: false,
    //   isFilter: true,
    // }));
    setConfiguration((prev) => ({ ...prev, filters }));

    // if (customFiltersObjects.length) {
    //   onSaveCustomColumn(customFiltersObjects, () => {
    //     onGenerateDatasetmetric({ ...configuration, filters });
    //     onComplete();
    //   });
    // } else {
    onGenerateDatasetmetric({
      prevConfiguration: { ...configuration, filters },
    });
    onComplete();
    // }
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
        const [parentAlias, columnName] =
          sort.columnName.value?.split('^^^^^^');

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
    onGenerateDatasetmetric({
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
                    name: col,
                    datatype: configuration?.aggregates?.find(
                      (agr) => agr.alias === col
                    )
                      ? 'number'
                      : configuration?.dimensions?.find(
                          (dim) => dim.alias === col && !dim.helperFunction
                        )?.dataType || 'other',
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
                const d = insert_dataModels_one;
                const table: Table = {
                  columnList: d?.lineageData?.columnList || [],
                  id: d.id,
                  schemaName: d.databaseName || '',
                  tableName: d.name,
                  type: d.modelType,
                  query: d.query || '',
                  configuration: d.lineageData?.configuration,
                };
                onChangeCustomTableSelection(table);
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
  const clearSelection = () => {
    setQuery('');
    setSelectedTable({
      value: '',
      label: '',
    });
    setData([]);
    setSelectedManageColumns([]);
    setCreatedNewColumnOptions([]);
    setSelectedNewManageColumns([]);
    setSelectedCustomColumns([]);
    setSelectedGroupColumns([]);
    setSelectedCustomGroups([]);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setCreatedNewColumn(DEFAULT_CREATE_NEW_COLUMN);
    setForecast(DEFAULT_FORECAST_VALUES);
    setConfiguration(DEFAULT_CREATE_DATSET_METRIC_CONFIG);
  };
  const onSync = () => {
    let sqlQuery = query;
    const genQuery = sqlQuery?.toLowerCase()?.includes('limit')
      ? sqlQuery?.replace(/limit\s+\d+/i, 'limit 1')
      : (sqlQuery += ' limit 1');
    setData([]);
    setSelectedManageColumns([]);
    setCreatedNewColumnOptions([]);
    setSelectedNewManageColumns([]);
    setSelectedCustomColumns([]);
    setSelectedGroupColumns([]);
    setSelectedCustomGroups([]);
    setSelectedJoins([]);
    setCreatedFilters([]);
    setCreatedSorts([]);
    setCreatedNewColumn(DEFAULT_CREATE_NEW_COLUMN);
    setForecast(DEFAULT_FORECAST_VALUES);
    setConfiguration(DEFAULT_CREATE_DATSET_METRIC_CONFIG);
    setSqlLoading(true);
    if (query) {
      executeQuery(
        { dbName, id: companyIntegrationId, query: genQuery },
        {
          onSuccess(resData) {
            const responseData =
              typeof resData?.sqlQuery?.data === 'string'
                ? JSON.parse(resData?.sqlQuery?.data)
                : resData?.sqlQuery?.data || [];
            const error = responseData?.errorObj?.errorMessage;
            if (error) {
              setError({
                errorMessage: error || consts.SOMETHING_WENT_WRONG,
                explanation: '',
                solution: '',
              });
              setSqlLoading(false);
            } else {
              const columnOpt = Object.keys(responseData[0]);
              setSqlColumnList(
                columnOpt.map((col) => ({
                  label: col,
                  value: `dbn_sql_table^^^^^^${col}^^^^^^${
                    typeof responseData[0][col] === 'string'
                      ? isDateStringValid(responseData[0][col])
                      : typeof responseData[0][col]
                  }^^^^^^none^^^^^^dbn_sql_table`,
                }))
              );
              setSqlLoading(false);
            }
          },
        }
      );
    }
  };
  useEffect(() => {
    if (clientColumn.value) {
      const [parentAlias, columnName, datatype] =
        clientColumn.value.split('^^^^^^');
      setConfiguration((prev) => ({
        ...prev,
        filters: [
          ...prev.filters.filter((filter) => filter.type !== 'client'),
          {
            alias: clientColumn.value,
            columnName,
            dataType: datatype,
            method: '=',
            parentAlias,
            type: 'client',
            value: 'client_id_variable',
          },
        ],
      }));
    } else {
      setConfiguration((prev) => ({
        ...prev,
        filters: prev.filters.filter((filter) => filter.type !== 'client'),
      }));
    }
  }, [clientColumn]);
  // useEffect(() => {
  //   if (timeColumn.value && timeFilter) {
  //     const [parentAlias, columnName, datatype] =
  //       timeColumn.value.split('^^^^^^');
  //     setConfiguration((prev) => ({
  //       ...prev,
  //       filters: [
  //         ...prev.filters.filter(
  //           (filter) =>
  //             filter.type !== 'time' || filter.dataType === 'TIME_COLUMN'
  //         ),
  //         {
  //           alias: timeColumn.value,
  //           columnName,
  //           dataType: datatype,
  //           method: '=',
  //           parentAlias,
  //           type: 'time',
  //           value: { timeFilter, endDate: '', startDate: '' },
  //         },
  //       ],
  //     }));
  //   } else {
  //     setConfiguration((prev) => ({
  //       ...prev,
  //       filters: prev.filters.filter(
  //         (filter) =>
  //           filter.type !== 'time' || filter.dataType === 'TIME_COLUMN'
  //       ),
  //     }));
  //   }
  // }, [timeColumn, timeFilter]);
  useEffect(() => {
    if (appliedRlsFilters?.length) {
      const filters = appliedRlsFilters.map((rlsFilter) => {
        const { columnName, condition, name, tableName } = rlsFilter;

        const filter: Filter = {
          columnName,
          alias: 'NULL',
          dataType: 'NONE',
          method: RLS_CONDITIONS[condition],
          parentAlias: tableName.replace(/\.(?=[^.]*$)/, '_'),
          type: 'rls_filter',
          value: `${name}_variable`,
        };
        return filter;
      });
      setConfiguration((prev) => ({
        ...prev,
        filters: [
          ...prev.filters.filter((filter) => filter.type !== 'rls_filter'),
          ...filters,
        ],
      }));
    } else {
      setConfiguration((prev) => ({
        ...prev,
        filters: prev.filters.filter((filter) => filter.type !== 'rls_filter'),
      }));
    }
  }, [appliedRlsFilters]);

  // useEffect(() => {
  //   if (dateTimeColumnList.length) {
  //     setTimeColumn(dateTimeColumnList[0]);
  //   } else {
  //     setTimeColumn({ value: '', label: '' });
  //   }
  // }, [dateTimeColumnList]);
  // useEffect(() => {
  //   if (columnOptions?.length) {
  //     setConfiguration((prev) => ({
  //       ...prev,
  //       aggregates: prev.aggregates.filter((agr) =>
  //         columnOptions.find(
  //           (value) =>
  //             agr.type !== 'custom' && value.value.includes(agr.columnName)
  //         )
  //       ),
  //       dimensions: prev.dimensions.filter((dim) =>
  //         columnOptions.find(
  //           (value) =>
  //             dim.type !== 'custom' && value.value.includes(dim.columnName)
  //         )
  //       ),
  //       filters: prev.filters.filter((dim) =>
  //         columnOptions.find(
  //           (value) =>
  //             dim.type !== 'custom' && value.value.includes(dim.columnName)
  //         )
  //       ),
  //       orders: prev.orders.filter(
  //         (sort) =>
  //           !!columnOptions.find((value) => value.value.includes(sort.name))
  //       ),
  //     }));
  //   }
  // }, [columnOptions]);

  // useEffect(() => {
  //   setConfiguration((prev) => ({
  //     ...prev,
  //     forecast,
  //   }));
  // }, [forecast]);

  useEffect(() => {
    setConfiguration((prev) => ({
      ...prev,
      isEnableDrill: drillDownSettings?.isEnableGroupBy || false,
    }));
  }, [drillDownSettings]);

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
  // useEffect(() => {
  //   setChartSettings((prev) => ({
  //     ...prev,
  //     customSettings: {
  //       ...prev.customSettings,
  //       comparisonTimePeriod: isComparisonValue ? comparisonLag : 0,
  //       comparisonTimeGrain: isComparisonValue
  //         ? configuration.dimensions.find((dim) => dim.alias === '_timestamp')
  //             ?.timeGrain || TIME_GRAIN_OPTIONS[5].value
  //         : TIME_GRAIN_OPTIONS[5].value,
  //     },
  //   }));
  // }, [
  //   comparisonLag,
  //   timeGrainVal,
  //   isComparisonValue,
  //   configuration.dimensions,
  //   setChartSettings,
  // ]);

  // TODO: on update
  const replaceUnderScore = (
    option: types.FloatingDropDownOption
  ): types.FloatingDropDownOption => {
    return {
      ...option,
      label: option?.label?.replace('____', '^^^^^^'),
      value: option?.value?.replace('____', '^^^^^^'),
    };
  };
  useEffect(() => {
    if (datasetSettings && id && isApplySavedSettings) {
      setIncludeTime(datasetSettings.isIncludeTime);
      setTimeColumn(replaceUnderScore(datasetSettings.timeColumn));
      setTimeFilter(datasetSettings.timeGrainValue);
      setCustomColumnList(datasetSettings.customColumnList || []);
      setSelectedManageColumns(
        datasetSettings.selectedManageColumns?.map((option) =>
          replaceUnderScore(option)
        ) || []
      );
      setSelectedGroupColumns(
        datasetSettings.selectedGroupColumns?.map((option) =>
          replaceUnderScore(option)
        ) || []
      );
      setSelectedNewManageColumns(
        datasetSettings?.selectedNewManageColumns?.map((option) =>
          replaceUnderScore(option)
        ) || []
      );
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
      setSelectedCustomColumns(datasetSettings.selectedCustomColumns || []);
      setCreatedNewColumnOptions(
        datasetSettings?.createdNewColumnOptions?.map((option) =>
          replaceUnderScore(option)
        ) || []
      );
      setClientColumn(
        replaceUnderScore(datasetSettings.clientColumn) || {
          value: '',
          label: '',
        }
      );
      setTimeGrainVal(datasetSettings.timeGrainVal || TIME_GRAIN_OPTIONS[5]);
      setComparisonLag(datasetSettings.comparisonLag || 0);
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
      setSelectedTable(
        datasetSettings.selectedTable
          ? replaceUnderScore(datasetSettings.selectedTable)
          : { label: '', value: '' }
      );
      setCurrentSelectedTable(
        datasetSettings.selectedTable
          ? replaceUnderScore(datasetSettings.selectedTable)
          : { label: '', value: '' }
      );
      setApplySavedSettings(false);
    }
  }, [datasetSettings, id, isApplySavedSettings]);
  useEffect(() => {
    setConfiguration((prev) => ({ ...prev, limit }));
  }, [limit]);
  useEffect(() => {
    setConfiguration((prev) => ({ ...prev, rlsValues }));
  }, [rlsValues]);
  // useEffect(() => {
  //   if (tableListOptions?.length) {
  //     const [schema, name] = tableListOptions?.[0]?.value?.split('^^^^^^');
  //     setConfiguration((prev) => ({
  //       ...prev,
  //       table: {
  //         ...prev.table,
  //         alias: `${schema}_${name}`,
  //         id: name,
  //         schema,
  //         name,
  //       },
  //     }));
  //   } else {
  //     // setPreview(true);
  //   }
  // }, [tableListOptions]);

  useEffect(() => {
    const dimensions: Dimension[] = [];
    const aggregates: Aggregate[] = [];
    const groupByColumnList: GroupByColumn[] = [];
    selectedManageColumns.forEach((column) => {
      const [parentAlias, columnName, datatype] = column.value.split('^^^^^^');
      const dimension: Dimension = {
        alias: columnName,
        columnName,
        dataType: datatype,
        parentAlias,
        type: 'default',
        timeGrain: undefined,
        helperFunction: undefined,
      };
      dimensions.push(dimension);
    });

    selectedNewManageColumns.forEach((column) => {
      const [
        parentAlias,
        columnName,
        datatype,
        schemaName,
        tableName,
        helperFunction,
        alias,
      ] = column.value.split('^^^^^^');
      if (AggregateList.map((v) => v.value).includes(helperFunction)) {
        const aggregate: Aggregate = {
          alias,
          columnName,
          dataType: datatype,
          method: helperFunction,
          parentAlias,
          type: 'default',
        };
        aggregates.push(aggregate);
      } else {
        const dimension: Dimension = {
          alias,
          columnName,
          dataType: datatype,
          parentAlias,
          type: 'default',
          timeGrain: undefined,
          helperFunction:
            helperFunction === 'NONE' ? undefined : helperFunction,
        };
        dimensions.push(dimension);
      }
    });
    selectedCustomColumns.forEach((column) => {
      if (column.isAggregate) {
        const aggregate: Aggregate = {
          alias: column.as,
          columnName: column.value,
          dataType: 'CUSTOM',
          parentAlias: 'NULL',
          type: 'custom',
          method: 'NONE',
        };
        aggregates.push(aggregate);
      } else if (column.isDimension) {
        const dimension: Dimension = {
          alias: column.as,
          columnName: column.value,
          dataType: 'CUSTOM',
          parentAlias: 'NULL',
          type: 'custom',
          timeGrain: undefined,
        };
        dimensions.push(dimension);
      }
    });

    selectedGroupColumns.forEach((column) => {
      const [
        parentAlias,
        columnName,
        datatype,
        schemaName,
        tableName,
        helperFunction,
        alias,
      ] = column.value.split('^^^^^^');
      const groupByColumn: GroupByColumn = {
        alias,
        columnName,
        dataType: datatype,
        helperFunction,
        parentAlias,
        type: 'default',
        timeGrain: undefined,
      };
      groupByColumnList.push(groupByColumn);
    });

    selectedCustomGroups.forEach((column) => {
      const groupByColumn: GroupByColumn = {
        alias: column.as,
        columnName: column.value,
        dataType: 'CUSTOM',
        parentAlias: 'NULL',
        type: 'custom',
        timeGrain: undefined,
      };
      groupByColumnList.push(groupByColumn);
    });

    setConfiguration((prev) => ({
      ...prev,
      dimensions:
        !forecast.isEnable || chartSettings.customSettings?.comparisonValueShow
          ? dimensions
          : prev.dimensions.filter((dim) => dim.alias === '_timestamp'),
      aggregates,
      groupByColumnList:
        !forecast.isEnable || chartSettings.customSettings?.comparisonValueShow
          ? groupByColumnList
          : [],
    }));
  }, [
    selectedManageColumns,
    selectedNewManageColumns,
    selectedCustomColumns,
    forecast.isEnable,
    chartSettings.customSettings?.comparisonValueShow,
    selectedGroupColumns,
    selectedCustomGroups,
  ]);
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

  // useEffect(() => {
  //   if (
  //     !joinTableOption.find((o) => o.value === currentSelectedTable.value) &&
  //     joinTableOption.length
  //   ) {
  //     setSelectedManageColumns([]);
  //     setCreatedNewColumnOptions([]);
  //     setSelectedNewManageColumns([]);
  //     setSelectedCustomColumns([]);
  //     setSelectedGroupColumns([]);
  //     setSelectedCustomGroups([]);
  //     setSelectedJoins([]);
  //     setCreatedFilters([]);
  //     setCreatedSorts([]);
  //   }
  // }, [joinTableOption, currentSelectedTable]);
  // useEffect(() => {
  //   if (
  //     isPreview &&
  //     columnOptions?.length &&
  //     !isGenerating &&
  //     tableListOptions?.length &&
  //     !id
  //   ) {
  //     const prevColumns = columnOptions.slice(0, 4);
  //     const prevLimit = 100;
  //     setSelectedManageColumns(prevColumns);
  //     setSelectedJoins([]);
  //     setCreatedFilters([]);
  //     setCreatedSorts([]);
  //     setSelectedCustomColumns([]);
  //     setSelectedCustomGroups([]);
  //     setSelectedNewManageColumns([]);
  //     setSelectedGroupColumns([]);
  //     setForecast(DEFAULT_FORECAST_VALUES);
  //     const [schema, name] = (
  //       selectedTable || tableListOptions?.[0]
  //     )?.value?.split('^^^^^^');

  //     const previewDimensions = prevColumns.map((column) => {
  //       const [parentAlias, columnName, datatype] = column.value.split('^^^^^^');
  //       const dimension: Dimension = {
  //         alias: columnName,
  //         columnName,
  //         dataType: datatype,
  //         parentAlias,
  //         type: 'default',
  //         timeGrain: undefined,
  //         helperFunction: undefined,
  //       };
  //       return dimension;
  //     });

  //     onGenerateDatasetmetric({
  //       ...DEFAULT_CREATE_DATSET_METRIC_CONFIG,
  //       dimensions: previewDimensions,
  //       limit: `${prevLimit}`,
  //       table: {
  //         ...DEFAULT_CREATE_DATSET_METRIC_CONFIG.table,
  //         alias: `${schema}_${name}`,
  //         id: name,
  //         schema,
  //         name,
  //       },
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [columnOptions, isPreview, isGenerating, selectedTable, tableListOptions]);
  return {
    configModal,
    setConfigModal,
    tableListOptions,
    setConfiguration,
    configuration,
    onChangeTableSelection,
    selectedTable,
    onSaveConfig: handleSubmit(onSaveConfig),
    register,
    control,
    columnOptions,
    onRemoveJoin,
    valueFields,
    append,
    remove,
    setClientColumn,
    clientColumn,
    dateTimeColumnList,
    timeColumn,
    setTimeColumn,
    timeFilter,
    setTimeFilter,
    selectedColumnList: watch().selectedColumns || [],
    onChangeSelectAllColumn,
    onChangeColumnSelection,
    onRemoveColumn,
    errors,
    onRemoveAggregate,
    selectedFilterColumnInfo,
    selectedFilterOperator,
    filterFieldType,
    onChangeFilterValue,
    selectedfilterValue: watch().filterValue,
    onRemoveFilter,
    setTimeConfigFilter,
    timeConfigFilter,
    onRemoveSortConfig,
    setIncludeTime,
    isIncludeTime,
    timeGrainVal,
    setTimeGrainVal,
    onChangeIncludeTime,
    isAllowComparisonLag,
    comparisonLag,
    setComparisonLag,
    isAllowDrillDown,
    forecast,
    setForecast,
    isAllowForecast,
    customSql,
    setCustomSql,
    onChangeCustomValue,
    selectedTab,
    setSeletedTab,
    customColumnList,
    setCustomColumnList,
    selectedCustomColumnList,
    setSelectedCustomColumnList,
    onSaveCustomColumn,
    isDisableCustomSave:
      !customSql.name || !customSql.sql || !isSavingCustomSqlColumn,
    onApplySavedCustomColumn,
    alert,
    setAlert,
    editorRef,
    workspaceId,
    isShowRlsSettings,
    setShowRlsSettings,
    isShowMetricFilters,
    setShowMetricFilters,
    setDrillDown,
    drillDownSettings,
    setChartSettings,
    chartSettings,
    dbName,
    selectedSchemaList,
    setMetricFilters,
    metricFilters,
    appliedRlsFilters,
    clientId,
    tenancy,
    setGroupByList,
    onGenerateDatasetmetric,
    isDisableGenerateMetric: isGenerating,
    selectedManageColumns,
    setSelectedManageColumns,
    onChangeManageColumnSelection,
    onResetColumnSelection,
    isShowAddNew,
    setShowAddNew,
    createdNewColumn,
    setCreatedNewColumn,
    functionOptions,
    onSaveCreatedColumn,
    createdNewColumnOptions: selectedJoinNewColumnOptions,
    onChangeNewManageColumnSelection,
    selectedNewManageColumns,
    createNewColumnError,
    isSqlColumn,
    setSqlColumn,
    selectedCustomColumns,
    onChangeCustomColumnSelection,
    isShowManageColumnPanel,
    setShowManageColumnPanel,
    onSaveForeCastAction,
    createdFilters,
    setCreatedFilters,
    getFilterDropDownType,
    onApplyFilter,
    createdSorts,
    setCreatedSorts,
    onApplySort,
    savedFilterListOptions: customFilterList.map((value, index) => ({
      label: value.as,
      value: `${value.value}^^^^^^${index}^^^^^^${value.as}`,
      key: `${value.as}_${value.value}`,
    })),
    setCustomFilterList,
    comparisonLagSettings,
    setComparisonLagSettings,
    onSaveComparisonSettings,
    selectedGroupColumns,
    setSelectedGroupColumns,
    selectedCustomGroups,
    setSelectedCustomGroups,
    onChangeCustomGroupSelection,
    onChangeGroupColumnSelection,
    selectedJoins,
    setSelectedJoins,
    joinTableOption,
    currentSelectedTable,
    setCurrentSelectedTable,
    selectedJoinColumnOptions,
    isDatabaseTenancy,
    onSaveCustomFilter,
    sortColumnOptions,
    onSaveCreateDataset,
    isDatasetCreateModalShow,
    setDatasetCreateModalShow,
    isCreateVirtualTable,
    setCreateVirtualTable,
    datasetCreateState,
    setDatasetCreateState,
    onChangeCustomTableSelection,
    onGenerateChart,
    setSelectedNewManageColumns,
    setChartFields,
    isShowDimSql,
    setShowDimSql,
    isShowMetricSql,
    setShowMetricSql,
    setSelectedCustomColumns,
    validateColumn,
    setSelectedTable,
    isSqlTab,
    setSqlTab,
    onSync,
    sqlColumnList,
    isSqlLoading,
    clearSelection,
  };
};

export default useDatasetMetric;
