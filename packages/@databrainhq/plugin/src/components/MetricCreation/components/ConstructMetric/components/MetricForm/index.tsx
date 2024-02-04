/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import ReactAce from 'react-ace/lib/ace';
import styles from './metricform.module.css';
import {
  Tab,
  Text,
  Icons,
  Modal,
  Button,
  InputField,
  ModalFooter,
  InfoTooltip,
  TimeGrainField,
  FloatingDropDown,
  MultiSelectDropdown,
  // MultiFloatingDropDown,
} from '@/components';
import { FloatingDropDownOption } from '@/types/app';
import {
  ConstructMetricProps,
  DatasetSettings,
  MetricsValue,
} from '@/types/metricCreate';

import {
  AggregateList,
  operatorList,
  configTabs,
  RowLimitList,
} from '@/consts/metricOptions';
import { useGenerateDatasetMetrics } from '@/hooks';
import { getTimeFilterValue } from '@/helpers';
import { SOMETHING_WENT_WRONG } from '@/consts/app';
import AceEditorSql from '@/components/AceEditorSql/AceEditorSql';
import { useDashboardContext } from '@/hooks/useDashboardContext';

export const MetricForm = ({
  dateTimeColumnList,
  columnList,
  database,
  tableName,
  setData,
  setError,
  setLoading,
  setQuery,
  clientId,
  clientColumn,
  databaseId,
  datasetSettings,
  setDatasetSettings,
  setGroupByList,
}: ConstructMetricProps) => {
  const editorRef = useRef() as React.RefObject<ReactAce>;
  const { data: dashboardData, token } = useDashboardContext();
  const [metrics, setMetrics] = useState<MetricsValue[]>([]);

  const [timeGrainValue, setTimeGrainValue] = useState<string>('');
  const [timeColumn, setTimeColumn] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [columns, setColumns] = useState<MetricsValue[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<string>('');
  const [timeGrain, setTimeGrain] = useState<string>('');
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState<string[]>(
    []
  );

  const [isIncludeTime, setIncludeTime] = useState<boolean>(false);
  const [isSortDescending, setSortDescending] = useState<boolean>(false);
  const [filterColumnValues, setFilterColumnValues] = useState<
    FloatingDropDownOption[]
  >([]);
  const [aliasValue, setAliasValue] = useState('');
  const [metricColumn, setMetricColumn] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [column, setColumn] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [sortColumn, setSortColumn] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [rowLimit, setRowLimit] = useState<FloatingDropDownOption>({
    value: '10',
    label: '10',
  });
  const [filterColumn, setFilterColumn] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [metricAggregate, setMetricAggregate] =
    useState<FloatingDropDownOption>({
      value: '',
      label: '',
    });
  const [sortAggregate, setSortAggregate] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [operator, setOperator] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [filterValue, setFilterValue] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [fieldConfigModal, setFieldConfigModal] = useState({
    isShow: false,
    type: 'column',
  });
  const [selectedTab, setSeletedTab] = useState(configTabs[1]);
  const [customSql, setCustomSql] = useState({ name: '', sql: '' });
  const [customColumnList, setCustomColumnList] = useState<MetricsValue[]>([]);
  const [selectedCustomColumnList, setSelectedCustomColumnList] = useState<
    FloatingDropDownOption[]
  >([]);
  useEffect(() => {
    if (columnList.length) {
      setSelectedDimensions((prev) =>
        prev.filter((c) => columnList.map((col) => col.value).includes(c))
      );
      setMetrics((prev) =>
        prev.filter((c) =>
          columnList
            .map((col) => col.value)
            .includes(c.as.match(/\((.*?)\)/)?.[1] || '')
        )
      );
      setMetricColumn(columnList[0]);
      setColumns((prev) =>
        prev.filter((c) => columnList.map((col) => col.value).includes(c.value))
      );
      setColumn(columnList[0]);
      setFilterColumn(columnList[0]);
      setSort((prev) =>
        columnList.find((c) => prev.includes(c.value)) ? prev : ''
      );
      setSortColumn(columnList[0]);
      setFilters((prev) =>
        prev.filter((c) => columnList.find((col) => c.includes(col.value)))
      );
      setIncludeTime(false);
      setTimeGrain((prev) =>
        columnList.find((c) => prev.includes(c.value)) ? prev : ''
      );
      if (!timeGrain) {
        setTimeGrainValue('');
      }
    }
  }, [columnList]);
  useEffect(() => {
    if (dateTimeColumnList.length) {
      setTimeColumn({
        value: dateTimeColumnList[0].name,
        label: dateTimeColumnList[0].as,
      });
    } else {
      setTimeColumn({ value: '', label: '' });
    }
  }, [dateTimeColumnList]);
  const {
    generateDatasetMetric,
    isGeneratingDataset,
    generateError,
    fetchColumnValues,
  } = useGenerateDatasetMetrics();
  useEffect(() => {
    if (filterColumn.value) {
      setSelectedFilterValues([]);
      setFilterValue({ value: '', label: '' });
      fetchColumnValues(
        {
          wId: dashboardData?.workspace?.id,
          tableName,
          columnName: filterColumn.value,
        },
        {
          onSuccess(columnValueData) {
            const valueData =
              columnValueData?.data && Array.isArray(columnValueData?.data)
                ? columnValueData?.data
                : [];
            if (valueData?.length) {
              const list = valueData.map((obj: any) => ({
                value: obj?.value || '',
                label: obj?.label || '',
              }));
              setFilterColumnValues(list);
            }
          },
        }
      );
    }
  }, [filterColumn]);
  const isDisableGenerate = !metrics.length && !columns.length;
  const isDisableTimeColumn = !dateTimeColumnList.length;
  const isDiableTimeGrainField = !timeColumn.value;
  const isDisableAddColumn = !!metrics.length;
  const isDisableAddMetric = !!columns.length;
  const isBigQuery = database === 'Bigquery';
  const isMySql = database === 'MySql';
  const isMongoDb = database === 'MongoDB';
  const isPostgres = database === 'Postgres' || database === 'Redshift';
  const isAwsS3 = database === 'awss3';

  const isNullFilter =
    operator.value === 'IS NULL' || operator.value === 'IS NOT NULL';
  const isInFilter = operator.value === 'IN' || operator.value === 'NOT IN';
  const isFilterValue = isNullFilter
    ? true
    : isInFilter
    ? !!selectedFilterValues.length
    : !!filterValue.value;
  const isDisableSorting = !columns.length ? !sortAggregate.value : false;
  useEffect(() => {
    if (timeGrainValue && timeColumn.value && dateTimeColumnList.length) {
      const datatype = dateTimeColumnList.find(
        (val) => val.name === timeColumn.value
      )?.datatype;
      const value = getTimeFilterValue({
        timeGrainValue,
        isTimeStamp: datatype?.toLowerCase() !== 'date',
        col: timeColumn.value,
        database,
      });
      setTimeGrain(value);
    }
  }, [timeGrainValue, timeColumn]);
  useEffect(() => {
    if (columns.length) {
      setIncludeTime(false);
      setSelectedDimensions([]);
      setSort('');
    }
  }, [columns]);
  useEffect(() => {
    if (isNullFilter)
      setFilterValue({
        value: '',
        label: '',
      });
  }, [operator]);
  const getColumnString = (name: string) => {
    if (isBigQuery || isMySql || isAwsS3) return name;
    if (isMongoDb) return `\`${name}\``;
    return `"${name}"`;
  };
  const saveSelectedField = (type: string) => {
    switch (type) {
      case 'metric':
        setMetrics((prev) => [
          ...prev,
          {
            value: `${
              isPostgres && metricAggregate.value === 'COUNT_DISTINCT'
                ? `COUNT(DISTINCT "${metricColumn.value}" )`
                : `${metricAggregate.value}(${
                    isBigQuery || isMySql || isAwsS3
                      ? `${metricColumn.value}`
                      : isMongoDb
                      ? `\`${metricColumn.value}\``
                      : `"${metricColumn.value}"`
                  })`
            }`,
            as: isBigQuery
              ? aliasValue || `_result`
              : aliasValue ||
                `"${metricAggregate.value}(${metricColumn.value})"`,
          },
        ]);
        break;
      case 'column':
        if (!columns.find((c) => c.as === aliasValue))
          setColumns((prev) => [
            ...prev,
            {
              value: `${column.value}`,
              as: aliasValue || `${column.value}`,
            },
          ]);
        break;
      case 'sort':
        if (!columns.length) {
          setSort(
            `${
              isPostgres && sortAggregate.value === 'COUNT_DISTINCT'
                ? `COUNT(DISTINCT "${sortColumn.value}" )`
                : `${sortAggregate.value}(${
                    isBigQuery || isMySql || isAwsS3
                      ? `${sortColumn.value}`
                      : isMongoDb
                      ? `\`${sortColumn.value}\``
                      : `"${sortColumn.value}"`
                  })`
            }`
          );
        } else {
          setSort(
            `${
              isBigQuery || isMySql || isAwsS3
                ? `${sortColumn.value}`
                : isMongoDb
                ? `\`${sortColumn.value}\``
                : `${sortColumn.value}`
            }`
          );
        }
        break;
      case 'filter':
        setFilters((prev) => [
          ...prev,
          `${
            isBigQuery || isMySql || isAwsS3
              ? `${filterColumn.value}`
              : isMongoDb
              ? `\`${filterColumn.value}\``
              : `"${filterColumn.value}"`
          } ${operator.value} ${
            isInFilter
              ? `(${selectedFilterValues.map((f) => `'${f}'`).join(', ')})`
              : `${filterValue.value ? `'${filterValue.value}'` : ''}`
          }`,
        ]);
        break;
      default:
        break;
    }
  };
  const saveCustomField = (type: string) => {
    switch (type) {
      case 'metric':
        setMetrics((prev) => [
          ...prev,
          ...selectedCustomColumnList.map((option) => ({
            value: option.value.split('___')[0],
            as: option.label,
          })),
        ]);
        setSelectedCustomColumnList([]);
        break;
      case 'column':
        setColumns((prev) => [
          ...prev,
          ...selectedCustomColumnList.map((option) => ({
            value: option.value.split('___')[0],
            as: option.label,
          })),
        ]);
        setSelectedCustomColumnList([]);
        break;

      case 'filter':
        setFilters((prev) => [
          ...prev,
          ...selectedCustomColumnList.map(
            (value) => `${value.value.split('___')[0]}`
          ),
        ]);
        setSelectedCustomColumnList([]);
        break;
      case 'dimensions':
        setSelectedDimensions((prev) => [
          ...prev,
          ...selectedCustomColumnList.map(
            (value) => `${value.value.split('___')[0]}`
          ),
        ]);
        setSelectedCustomColumnList([]);
        break;
      default:
        break;
    }
  };
  const autoSelectField = (type: string) => {
    switch (type) {
      case 'metric':
        setMetrics((prev) => [
          ...prev,
          {
            value: customSql.sql,
            as: customSql.name,
          },
        ]);
        break;
      case 'column':
        setColumns((prev) => [
          ...prev,
          {
            value: customSql.sql,
            as: customSql.name,
          },
        ]);
        break;

      case 'filter':
        setFilters((prev) => [...prev, `${customSql.sql}`]);
        break;
      case 'dimensions':
        setSelectedDimensions((prev) => [...prev, `${customSql.sql}`]);
        break;
      default:
        break;
    }
  };
  const onSaveConfig = (type: string) => {
    if (selectedTab === 'custom') {
      setCustomColumnList((prevValue) => [
        ...prevValue,
        { as: customSql.name, value: customSql.sql },
      ]);
      autoSelectField(type);
    } else if (selectedTab === 'saved') {
      saveCustomField(type);
    } else {
      saveSelectedField(type);
    }
  };
  const onChangeCustomValue = (value: Record<string, string>) => {
    setCustomSql((prevValue) => ({ ...prevValue, ...value }));
  };
  const getConfigFieldModalHeader = (type: string) => {
    if (selectedTab === 'simple') {
      switch (type) {
        case 'column':
          return column.value ? `${column.value}` : 'Select Column';
        case 'metric':
          return metricColumn.value && metricAggregate.value
            ? `${metricAggregate.value}(${metricColumn.value})`
            : 'Create metric';
        case 'filter':
          return filterColumn.value && operator.value
            ? `${filterColumn.value} ${operator.value} ${
                isInFilter
                  ? `(${selectedFilterValues.map((f) => `'${f}'`).join(', ')})`
                  : `${filterValue.value ? `'${filterValue.value}'` : ''}`
              }`
            : 'Add Filter';
        default:
          if (!columns.length) {
            return sortColumn.value && sortAggregate.value
              ? `${
                  isPostgres && sortAggregate.value === 'COUNT_DISTINCT'
                    ? `COUNT(DISTINCT ${sortColumn.value})`
                    : `${sortAggregate.value}(${sortColumn.value})`
                }`
              : 'Create sort';
          }
          return sortColumn.value ? `${sortColumn.value}` : 'Create sort';
      }
    }
    if (selectedTab === 'saved') {
      return 'Select custom column';
    }
    return 'Create custom column';
  };
  const onGenerateMetric = () => {
    const settings = {
      timeColumn,
      timeGrainValue,
      columns,
      metrics,
      selectedDimensions,
      filters,
      sort,
      isIncludeTime,
      isSortDescending,
      selectTable: {
        value: tableName,
        label: tableName,
      },
      customColumnList,
      clientColumn,
    };
    if (setDatasetSettings) {
      setDatasetSettings(settings as unknown as DatasetSettings);
    }
    setError('');
    setLoading(true);
    setData([]);
    setQuery('');
    if (isGeneratingDataset) {
      setLoading(true);
    }
    generateDatasetMetric(
      {
        data: {
          integrationId: databaseId,
          integrationName: database,
          userInputs: {
            columns: columns.map((c) => `${c.value} AS ${c.as}`),
            dimensions: selectedDimensions.map((c) => ({
              name: c,
              as: getColumnString(c),
            })),
            metrics: metrics.map((m) => `${m.value} AS ${m.as}`),
            sort,
            isSortDescending,
            filters,
            tableName,
            rowLimit: rowLimit.value,
            appliedRlsFilters: [],
            timeFilter: {
              filter: timeGrain,
              column:
                isBigQuery || isMySql || isAwsS3
                  ? { name: timeColumn.value, as: timeColumn.value }
                  : isMongoDb
                  ? {
                      name: `\`${timeColumn.value}\``,
                      as: `\`${timeColumn.value}\``,
                    }
                  : {
                      name: `"${timeColumn.value}"`,
                      as: `"${timeColumn.value}"`,
                    },
              isInclude: isIncludeTime,
              clientColumnFilter: clientColumn
                ? {
                    value: Number(clientId) || clientId,
                    column:
                      isBigQuery || isMySql || isAwsS3
                        ? `${clientColumn}`
                        : isMongoDb
                        ? `\`${clientColumn}\``
                        : `"${clientColumn}"`,
                  }
                : undefined,
            },
          },
        },
        token: token as string,
      },
      {
        onSuccess(data: any) {
          if (!data) {
            setError(SOMETHING_WENT_WRONG);
            setLoading(false);
            setData([]);
            setQuery('');
            return;
          }
          const error = data?.generateDatasetMetrics?.error;
          const result = data?.generateDatasetMetrics?.result;
          const outputQuery = data?.generateDatasetMetrics?.query;
          const metaData = data?.generateDatasetMetrics?.metaData;
          if (error || generateError) {
            setError((error.message as string) || SOMETHING_WENT_WRONG);
            setLoading(false);
            setData([]);
            setQuery('');
          }
          if (result && outputQuery) {
            setError('');
            setLoading(false);
            setData(Array.isArray(result) ? result : []);
            setQuery(outputQuery);
            setGroupByList(
              metaData?.groupbyColumnList?.map((col: string) =>
                col.replace(/`/g, '')
              ) || []
            );
          }
        },
      }
    );
  };
  const disableBtn = () => {
    if (selectedTab === 'simple') {
      if (fieldConfigModal.type === 'column' && !column.value) {
        return true;
      }

      if (
        fieldConfigModal.type === 'metric' &&
        (!metricAggregate.value || !metricColumn.value)
      ) {
        return true;
      }

      if (
        fieldConfigModal.type === 'filter' &&
        (!filterColumn.value || !operator.value || !isFilterValue)
      ) {
        return true;
      }

      if (
        fieldConfigModal.type === 'sort'
          ? !sortColumn.value || isDisableSorting
          : false
      ) {
        return true;
      }
      return false;
    }
    if (selectedTab === 'custom' ? !customSql.name || !customSql.sql : false) {
      return true;
    }

    return false;
  };
  return (
    <>
      <div className={styles['form-container']}>
        {!isDisableTimeColumn && (
          <div className={styles['field-container']}>
            <Text variant="heading-lg">Time Filter</Text>
            <div className={styles['field-wrapper']}>
              <div className={styles['field-inner-container']}>
                <FloatingDropDown
                  onChange={setTimeColumn}
                  selectedOption={timeColumn}
                  options={dateTimeColumnList.map(({ name, as }: any) => ({
                    value: name,
                    label: as,
                  }))}
                  isDisabled={isDisableTimeColumn}
                  labelVariant="static"
                  label="Time Column"
                />
                <TimeGrainField
                  setTimeGrainValue={setTimeGrainValue}
                  timeGrainValue={timeGrainValue}
                  isShowlabel
                  isDisabled={isDiableTimeGrainField}
                />
                {timeGrainValue && (
                  <Button
                    type="button"
                    variant="tab"
                    onClick={() => setTimeGrainValue('')}
                    rightIcon={<Icons name="cross" />}
                  >
                    {timeGrainValue}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {!isDisableAddMetric && (
          <div className={styles['field-container']}>
            <Text variant="heading-lg">
              Metric Creation
              <InfoTooltip>configure metric columns</InfoTooltip>
            </Text>
            <div className={styles['field-wrapper']}>
              <div className={styles['field-inner-container']}>
                <Text variant="body-text-sm">Metric Fields</Text>
                <Button
                  type="button"
                  variant="tab"
                  onClick={() => {
                    setFieldConfigModal({ isShow: true, type: 'metric' });
                    setAliasValue('');
                  }}
                  isDisabled={isDisableAddMetric}
                  leftIcon={<Icons name="plus" />}
                >
                  Add Aggregate Column
                </Button>
                <div className={styles['field-value-container']}>
                  {metrics.map((metric) => (
                    <Button
                      type="button"
                      variant="tertiary"
                      onClick={() =>
                        setMetrics((prev) =>
                          prev.filter((m) => m.as !== metric.as)
                        )
                      }
                      key={metric.as}
                      rightIcon={<Icons name="cross" />}
                    >
                      {metric.as}
                    </Button>
                  ))}
                </div>

                <Text variant="body-text-sm">Group By</Text>

                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => {
                    setFieldConfigModal({ isShow: true, type: 'dimensions' });
                    setAliasValue('');
                  }}
                  isDisabled={!!columns.length}
                  leftIcon={<Icons name="plus" />}
                >
                  Add New
                </Button>
                {selectedDimensions.map((c, index) => (
                  <div className={styles['field-value-container']} key={index}>
                    <Text variant="body-text-sm">{c}</Text>
                    <Button
                      type="button"
                      variant="tertiary"
                      onClick={() =>
                        setSelectedDimensions((prev) =>
                          prev.filter((m) => m !== c)
                        )
                      }
                      leftIcon={<Icons name="cross" />}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!isDisableAddColumn && (
          <div className={styles['field-container']}>
            <Text variant="heading-lg">
              Columns
              <InfoTooltip>select columns for raw records query</InfoTooltip>
            </Text>

            <div className={styles['field-wrapper']}>
              <div className={styles['field-inner-container']}>
                <Text variant="body-text-sm">Select Columns</Text>
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => {
                    setFieldConfigModal({ isShow: true, type: 'column' });
                    setAliasValue('');
                  }}
                  isDisabled={isDisableAddColumn}
                  leftIcon={<Icons name="plus" />}
                >
                  Add Column
                </Button>
                <div className={styles['field-value-container']}>
                  {columns.map((c) => (
                    <Button
                      type="button"
                      variant="tertiary"
                      onClick={() =>
                        setColumns((prev) => prev.filter((m) => m.as !== c.as))
                      }
                      key={c.as}
                      rightIcon={<Icons name="cross" />}
                    >
                      {c.as}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={styles['field-container']}>
          <Text variant="heading-lg">category filters</Text>
          <div className={styles['field-wrapper']}>
            <div className={styles['field-inner-container']}>
              <Text variant="body-text-sm">Filter by</Text>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  setFieldConfigModal({ isShow: true, type: 'filter' });
                  setAliasValue('');
                }}
                leftIcon={<Icons name="plus" />}
              >
                Add Filter Category
              </Button>
              <div className={styles['field-value-container']}>
                {filters.map((filter) => (
                  <Button
                    type="button"
                    variant="tertiary"
                    onClick={() =>
                      setFilters((prev) => prev.filter((m) => m !== filter))
                    }
                    key={filter}
                    rightIcon={<Icons name="cross" />}
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <Text variant="body-text-sm">Sort By</Text>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  setFieldConfigModal({ isShow: true, type: 'sort' });
                  setSeletedTab('simple');
                }}
              >
                {sort ? (
                  <Icons name="not-found" />
                ) : (
                  <Icons name="plus" size="xs" />
                )}{' '}
                {sort ? 'Edit' : 'Add'} Sort Category
              </Button>
              {sort && (
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => setSort('')}
                  rightIcon={<Icons name="cross" />}
                >
                  {sort}
                </Button>
              )}
            </div>
          </div>
        </div>
        <FloatingDropDown
          onChange={setRowLimit}
          options={RowLimitList}
          selectedOption={rowLimit}
          labelVariant="static"
          label="Row Limit"
        />
        {!columns.length && !!dateTimeColumnList.length && (
          <Text variant="body-text-sm">
            <Button
              type="button"
              variant="tertiary"
              onClick={() => setIncludeTime((s) => !s)}
              isDisabled={!timeColumn.value || !!columns.length}
            >
              {isIncludeTime ? (
                <Icons name="not-found" />
              ) : (
                <Icons name="not-found" />
              )}
              {/* Checked unchecked icon */}
            </Button>
            Include Time
          </Text>
        )}
        <Text variant="body-text-sm">
          <Button
            type="button"
            variant="tertiary"
            onClick={() => setSortDescending((s) => !s)}
          >
            {isSortDescending ? (
              <Icons name="not-found" />
            ) : (
              <Icons name="not-found" />
            )}
            {/* Checked unchecked icon */}
          </Button>
          Sort Descending
        </Text>
        <Modal
          headerTitle={getConfigFieldModalHeader(fieldConfigModal.type)}
          isOpen={fieldConfigModal.isShow}
          onClose={() => setFieldConfigModal({ isShow: false, type: 'column' })}
        >
          {fieldConfigModal.type !== 'sort' && (
            <div>
              <Tab
                activeTab={selectedTab}
                options={configTabs}
                setActiveTab={setSeletedTab}
                className={styles['tab-border']}
              />
            </div>
          )}
          {selectedTab === 'simple' && (
            <div className={styles['modal-container']}>
              {fieldConfigModal.type === 'filter' && (
                <>
                  <FloatingDropDown
                    onChange={setFilterColumn}
                    selectedOption={filterColumn}
                    options={columnList}
                    labelVariant="static"
                    label="Column"
                  />
                  <FloatingDropDown
                    onChange={setOperator}
                    selectedOption={operator}
                    options={operatorList}
                    label="Operator"
                    labelVariant="static"
                  />
                  {isInFilter ? (
                    <div className={styles['filter-dropdown']}>
                      <Text variant="body-text-sm">Filter Value</Text>
                      <MultiSelectDropdown
                        label="Select Multiple Filters"
                        isShowSelectedOptions
                        options={filterColumnValues}
                        onChange={(option) => {
                          setSelectedFilterValues(option.map((o) => o.value));
                        }}
                        selectedOption={selectedFilterValues.map((value) => ({
                          value,
                          label: value,
                        }))}
                      />
                    </div>
                  ) : (
                    <FloatingDropDown
                      onChange={setFilterValue}
                      selectedOption={filterValue}
                      options={filterColumnValues}
                      isDisabled={isNullFilter}
                      label="Filter Value"
                      labelVariant="static"
                    />
                  )}
                </>
              )}
              {fieldConfigModal.type === 'sort' && (
                <>
                  <FloatingDropDown
                    onChange={setSortColumn}
                    selectedOption={sortColumn}
                    options={columnList}
                    label="Column"
                    labelVariant="static"
                  />
                  {!columns.length && (
                    <FloatingDropDown
                      onChange={setSortAggregate}
                      selectedOption={sortAggregate}
                      options={AggregateList}
                      label="Aggregate"
                      labelVariant="static"
                    />
                  )}
                </>
              )}
              {fieldConfigModal.type === 'metric' && (
                <>
                  <FloatingDropDown
                    onChange={setMetricColumn}
                    selectedOption={metricColumn}
                    options={columnList}
                    label="Columns"
                    labelVariant="static"
                  />
                  <FloatingDropDown
                    onChange={setMetricAggregate}
                    selectedOption={metricAggregate}
                    options={AggregateList}
                    label="Aggregate"
                    labelVariant="static"
                  />
                </>
              )}
              {fieldConfigModal.type === 'column' && (
                <FloatingDropDown
                  onChange={setColumn}
                  selectedOption={column}
                  options={columnList}
                  labelVariant="static"
                  label="Columns"
                />
              )}

              {fieldConfigModal.type === 'column' ||
              fieldConfigModal.type === 'metric' ? (
                <InputField
                  label="As"
                  type="text"
                  placeholder="Save as"
                  name="alias"
                  onChange={(e) =>
                    setAliasValue(getColumnString(e.target.value))
                  }
                />
              ) : null}
              {fieldConfigModal.type === 'dimensions' && (
                <>
                  <MultiSelectDropdown
                    label="Dimensions"
                    isShowSelectedOptions
                    options={columnList}
                    onChange={(option) => {
                      setSelectedDimensions(option.map((o) => o.value));
                    }}
                    selectedOption={selectedDimensions.map((value) => ({
                      value,
                      label: value,
                    }))}
                  />
                </>
              )}
            </div>
          )}
          {selectedTab === 'custom' && (
            <div className={styles['modal-container']}>
              <InputField
                label="name"
                type="text"
                placeholder="name"
                name="name"
                onChange={(e) =>
                  onChangeCustomValue({ name: getColumnString(e.target.value) })
                }
              />
              <div className={styles['editor-field']}>
                <Text variant="body-text-sm">SQL</Text>
                <AceEditorSql
                  editorRef={editorRef}
                  onChange={(value: string) => {
                    onChangeCustomValue({ sql: value });
                  }}
                  value={customSql.sql}
                />
              </div>
            </div>
          )}
          {selectedTab === 'saved' && (
            <div className={styles['modal-container']}>
              {/* <MultiFloatingDropDown
                onChange={(options) => setSelectedCustomColumnList(options)}
                selectedOptions={selectedCustomColumnList}
                options={customColumnList.map((value, index) => ({
                  label: value.as,
                  value: `${value.value}___${index}___${value.as}`,
                  key: `${value.as}_${value.value}`,
                }))}
                label="Saved"
                labelVariant="static"
              /> */}
              {selectedCustomColumnList.map((c) => (
                <div className={styles['field-value-container']} key={c.value}>
                  <Text variant="body-text-sm">
                    {c.label}::{c.value.split('___')[0]}
                  </Text>
                </div>
              ))}
            </div>
          )}
          <ModalFooter>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                onSaveConfig(fieldConfigModal.type);
                setFieldConfigModal({ isShow: false, type: 'column' });
              }}
              isDisabled={disableBtn()}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className={styles.generateButtonContainer}>
        <Button
          type="button"
          variant="primary"
          isDisabled={isGeneratingDataset || isDisableGenerate}
          onClick={() => onGenerateMetric()}
        >
          Generate
        </Button>
      </div>
    </>
  );
};
