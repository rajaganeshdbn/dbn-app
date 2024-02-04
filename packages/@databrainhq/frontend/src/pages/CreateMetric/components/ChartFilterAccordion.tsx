/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui, types } from '@databrainhq/plugin';
import { useMemo, useState } from 'react';
import { CurrentMetricFilter, ShowFormContainerType } from 'types/metric';
import {
  DEFAULT_NEW_FILTER,
  STRING_FILTER_VARIANT,
  TABLE,
} from 'consts/application';
import {
  APPLY,
  DATABASE_NAME,
  EDIT,
  FILTER,
  FILTERS,
  GUEST_TOKEN,
  MANUAL,
  NEXT,
  SAVE,
} from 'consts/values';
import { TableType } from 'hooks/useCompanySchema';
import styles from './manageColumns.module.css';
import { ConfigApplyOn, ConfigOptions } from './ConfigFilterOptions';

type Props = {
  rlsConditions: types.RlsCondition[];
  setRlsConditions: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  tableList: TableType[];
  joinTableOption: types.FloatingDropDownOption[];
  isSqlTab: boolean;
  isPythonMode: boolean;
  tenancyType: string;
};

type ConfigFormProps = {
  rlsConditions: types.RlsCondition[];
  setRlsConditions: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  tableList: TableType[];
  joinTableOption: types.FloatingDropDownOption[];
  isSqlTab: boolean;
  isPythonMode: boolean;
  tenancyType: string;
  showFormContainer: ShowFormContainerType;
  setShowFormContainer: React.Dispatch<
    React.SetStateAction<ShowFormContainerType>
  >;
  currentMetricFilter: CurrentMetricFilter;
  setCurrentMetricFilter: React.Dispatch<
    React.SetStateAction<CurrentMetricFilter>
  >;
  title?: string;
  onClose: () => void;
};

type ValidationProps = {
  filter: CurrentMetricFilter;
  isString: boolean;
  isDate: boolean;
  isNumber: boolean;
};

const validation = ({
  filter,
  isDate,
  isNumber,
  isString,
}: ValidationProps) => {
  const isSearchStringVariant =
    isString &&
    filter.filterVariant?.value === STRING_FILTER_VARIANT?.[2].value;
  const isManualORGuestToken = [MANUAL, GUEST_TOKEN].includes(
    filter.filterType.value
  );
  const errors: Record<string, string | string[] | any> = {};
  if (!filter.name) {
    errors.name = 'please enter name of filter';
  }
  if (!filter.filterType.value) {
    errors.filterType = 'please select filter type';
  }
  if (!filter.datatype.value) {
    errors.datatype = 'please select datatype type';
  }
  if (
    !!(
      (isManualORGuestToken && isString && !filter.stringOptions.length) ||
      (isManualORGuestToken && isDate && !filter.dateOptions.length) ||
      (isManualORGuestToken && isNumber && !filter.numberOptions.length)
    ) &&
    !isSearchStringVariant
  ) {
    errors.manualOptionError = 'please add at least one manual option';
  }
  if (
    isManualORGuestToken &&
    isString &&
    filter.stringOptions.length &&
    !isSearchStringVariant
  ) {
    errors.stringOptions = filter.stringOptions
      .map((s) => (s ? '' : 'please enter a valid string in option'))
      ?.filter((v) => v).length
      ? filter.stringOptions.map((s) =>
          s ? '' : 'please enter a valid string in option'
        )
      : undefined;
  }
  if (isManualORGuestToken && isNumber && filter.numberOptions.length) {
    errors.numberOptions = filter.numberOptions
      .map((s) => (Number(s) ? '' : 'please enter a valid number in option'))
      .filter((v) => v).length
      ? filter.numberOptions.map((s) =>
          Number(s) ? '' : 'please enter a valid number in option'
        )
      : undefined;
  }
  if (filter.filterType.value === 'auto' && isDate) {
    errors.dateOptionError =
      'Only manual options are supported with date column';
  }
  if (isManualORGuestToken && isDate && filter.dateOptions.length) {
    const errorArray = filter.dateOptions.map((s) => ({
      range: !s.range ? 'please select range' : '',
      count: s.range === 'Last' && !s.count ? 'please enter a valid count' : '',
      time:
        !['Custom', 'Custom Date', 'Date Range'].includes(s.range) && !s.time
          ? 'please enter a valid time'
          : '',
      name: !s.name ? 'please enter a valid name' : '',
      startDate: '',
      endDate: '',
    }));
    errors.dateOptions = errorArray.filter((v) =>
      Object.values(v).some((error) => error !== '')
    )?.length
      ? errorArray
      : undefined;
  }
  if (
    isManualORGuestToken &&
    isDate &&
    filter.dateOptions.length &&
    filter.isVariableFilter
  ) {
    const errorArray = filter.dateOptions.map((s) => ({
      range: !['Custom', 'Custom Date', 'Date Range'].includes(s.range)
        ? 'Only Custom range or Date is supported'
        : '',
      name: !s.name ? 'please enter a valid name' : '',
      startDate: '',
      endDate: '',
    }));
    errors.variableDateOptions = errorArray.filter((v) =>
      Object.values(v).some((error) => error !== '')
    )?.length
      ? errorArray
      : undefined;
  }
  if (
    !filter.selectedOptionTable.value &&
    filter.filterType.value === 'auto' &&
    !isDate &&
    !isSearchStringVariant
  ) {
    errors.selectedOptionTable = 'please select table';
  }
  if (
    !filter.selectedOptionColumn.value &&
    filter.filterType.value === 'auto' &&
    !isDate &&
    !isSearchStringVariant
  ) {
    errors.selectedOptionColumn = 'please select column';
  }
  if (
    filter.filterType.value === 'auto' &&
    filter.isClientScopedOption &&
    !filter.clientColumn.value &&
    !isDate
  ) {
    errors.clientColumn = 'please select client column';
  }
  if (
    filter.filterType.value === 'auto' &&
    filter.isClientScopedOption &&
    !filter.clientColumnDatatype.value &&
    !isDate
  ) {
    errors.clientColumnDatatype = 'please select client column datatype';
  }
  if (
    filter.filterType.value === 'custom' &&
    !filter.selectedCustomOptionTable?.query &&
    !isSearchStringVariant
  ) {
    errors.selectedCustomOptionTableQuery = 'please add valid select query';
  }
  if (
    filter.filterType.value === 'custom' &&
    !filter.selectedCustomOptionTable?.columnName &&
    !isSearchStringVariant
  ) {
    errors.selectedCustomOptionTableColumnName =
      'please enter valid column name from query';
  }
  if (
    (filter.isVariableFilter && isString && !filter.variableStrings?.[0]) ||
    (filter.isVariableFilter && isNumber && !filter.variableStrings?.[0])
  ) {
    errors.variableStrings = ['please add a valid variable string'];
  }
  if (filter.isVariableFilter && isDate && !filter.variableStrings?.[0]) {
    errors.variableStrings = ['please add a valid variable string'];
  }
  if (filter.isVariableFilter && isDate && !filter.variableStrings?.[1]) {
    const errorArray = [
      filter.isVariableFilter && isDate && !filter.variableStrings?.[0]
        ? 'please add a valid variable string'
        : '',
      'please add a valid variable string',
    ];
    errors.variableStrings = errorArray?.filter((v) => v).length
      ? errorArray
      : undefined;
  }
  if (!filter.isVariableFilter && !filter.selectedTable.value) {
    errors.selectedTable = 'please select table';
  }
  if (!filter.isVariableFilter && !filter.selectedColumn.value) {
    errors.selectedColumn = 'please select column';
  }
  if (!filter.isVariableFilter && !filter.comparisonOperator?.value && isDate) {
    errors.comparisonOperator = 'please select comparison operator';
  }
  if (!filter.isVariableFilter && filter.applyOnColumns?.length && isDate) {
    const errorArray = filter.applyOnColumns?.map((v) => ({
      columnName: !v.columnName.value ? 'please select column' : '',
      logicalOperator: !v.logicalOperator.value
        ? 'please select logical operator'
        : '',
      comparisonOperator: !v.comparisonOperator.value
        ? 'please select comparison operator'
        : '',
    }));
    errors.applyOnColumns =
      errorArray.filter((v) => Object.values(v).some((error) => error !== ''))
        ?.length &&
      !filter?.dateOptions?.find((o) =>
        ['Last', 'This', 'Custom', 'Date Range'].includes(o.range)
      )
        ? errorArray
        : undefined;
  }
  return Object.values(errors).filter((v) => v).length ? errors : undefined;
};

// TODO: default value check
const onSaveFilter = ({
  filter,
  setRlsConditions,
  setShowFormContainer,
  setErrors,
  setCurrentMetricFilter,
  edit,
  onClose,
}: {
  filter: CurrentMetricFilter;
  setRlsConditions: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  setShowFormContainer: React.Dispatch<
    React.SetStateAction<ShowFormContainerType>
  >;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | string[]> | undefined>
  >;
  setCurrentMetricFilter: React.Dispatch<
    React.SetStateAction<CurrentMetricFilter>
  >;
  edit: { isEnable: boolean; index: number };
  onClose?: () => void;
}) => {
  setErrors(undefined);
  const isString = ['string', 'boolean'].includes(filter.datatype.value);

  const isNumber = ['number'].includes(filter.datatype.value);

  const isDate = ['date'].includes(filter.datatype.value);
  const isManualORGuestToken = [MANUAL, GUEST_TOKEN].includes(
    filter.filterType.value
  );
  const errors = validation({ filter, isDate, isNumber, isString });
  if (errors) {
    setErrors(errors);
    return;
  }

  const condition: types.RlsCondition = {
    columnName: filter.selectedColumn.value,
    labelColumnName: filter.selectedLabelColumn?.value,
    datatype: filter.datatype.value,
    isAddOnMetrics: true,
    name: filter.name,
    tableName: filter.selectedTable.value,
    client: filter.isClientScopedOption
      ? {
          columnName: filter.clientColumn.value,
          as: filter.clientColumnDatatype.value,
          isEnable: true,
        }
      : undefined,
    filterType: filter.filterType.value,
    optionColumnName: filter.selectedOptionColumn.value,
    optionTableName: filter.selectedOptionTable.value,
    isVariableFilter: filter.isVariableFilter,
    isAppFilter: filter.filterType.value === GUEST_TOKEN,
    variableStrings: filter.isVariableFilter
      ? filter.variableStrings.map(
          (v) => `{{${v?.replace('}}', '')?.replace('{{', '')}}}`
        )
      : [],
    variableOptions: filter.isVariableFilter
      ? isString
        ? typeof filter.stringOptions?.[0] === 'string'
          ? (filter.stringOptions.map((s) => ({
              value: s,
              label: s,
            })) as unknown as types.CustomOption[])
          : (filter.stringOptions.map((s) => ({
              value: s.value,
              label: s.label,
            })) as types.CustomOption[])
        : isNumber
        ? filter.numberOptions.map((s) => ({
            value: s,
            label: `${s}`,
          }))
        : isDate
        ? filter.dateOptions.map((d) => ({
            endDate: d.endDate,
            startDate: d.startDate,
            label: d.name,
            value: d.name,
            range: d.range,
          }))
        : []
      : [],
    options: isManualORGuestToken
      ? isString
        ? filter.stringOptions
        : isNumber
        ? filter.numberOptions
        : isDate
        ? filter.dateOptions
        : []
      : [],
    position: 'top-left',
    selectedVariableValue: undefined,
    value: undefined,
    applyOnColumns: isDate ? filter.applyOnColumns || [] : [],
    comparisonOperator: filter.comparisonOperator,
    dependOn: filter.dependOn || { value: '', label: '' },
    selectedCustomOptionTable: ['custom'].includes(filter.filterType.value)
      ? filter.selectedCustomOptionTable
      : undefined,
    filterVariant: filter.filterVariant,
  };
  if (edit.isEnable) {
    setRlsConditions((prev) =>
      prev.map((con, i) => (i === edit.index ? condition : con))
    );
  } else {
    setRlsConditions((prev) => [...prev, condition]);
  }
  setCurrentMetricFilter(DEFAULT_NEW_FILTER);
  setShowFormContainer({ isEnable: false, index: 0, type: 'Save' });
  onClose?.();
};

export const onClickEditFilter = ({
  rlsCondition: condition,
  setCurrentMetricFilter,
  setShowFormContainer,
  index,
  isDatabaseTenancy,
}: {
  setCurrentMetricFilter: React.Dispatch<
    React.SetStateAction<CurrentMetricFilter>
  >;
  setShowFormContainer: React.Dispatch<
    React.SetStateAction<ShowFormContainerType>
  >;
  rlsCondition: types.RlsCondition;
  index: number;
  isDatabaseTenancy: boolean;
}) => {
  const filter: CurrentMetricFilter = {
    datatype: {
      value: condition.datatype,
      label: condition.datatype,
    },
    name: condition.name,
    stringOptions: !condition.isVariableFilter
      ? (condition.options as types.FloatingDropDownOption[]) || []
      : (condition.variableOptions as unknown as types.FloatingDropDownOption[]) ||
        [],
    isAppFilter: !!condition.isAppFilter,
    selectedTable: {
      value: condition.tableName || '',
      label: isDatabaseTenancy
        ? `${DATABASE_NAME}.${condition?.tableName?.split('.')?.slice(-1)?.[0]}`
        : condition.tableName || '',
    },
    selectedColumn: {
      value: condition.columnName,
      label: condition.columnName,
    },
    selectedLabelColumn: {
      value: condition.labelColumnName || '',
      label: condition.labelColumnName || '',
    },
    isClientScopedOption: !!condition.client?.isEnable,
    clientColumn: {
      value: condition.client?.columnName || '',
      label: condition.client?.columnName || '',
    },
    clientColumnDatatype: {
      value: condition.client?.as || '',
      label: condition.client?.as || '',
    },
    numberOptions: !condition.isVariableFilter
      ? (condition.options as number[]) || []
      : condition.variableOptions?.map((o) => o.value as number) || [],
    dateOptions: !condition.isVariableFilter
      ? (condition.options as types.DateOptionType[]) || []
      : condition.variableOptions?.map((o) => ({
          name: o.value as string,
          label: o.label,
          endDate: o.startDate || new Date(),
          startDate: o.startDate || new Date(),
          count: 0,
          format: '',
          id: '',
          range: o.range || 'Custom',
          time: '',
        })) || [],
    isVariableFilter: !!condition.isVariableFilter,

    variableStrings: condition.variableStrings || [],

    filterType: {
      value: condition?.filterType || '',
      label: condition?.filterType || '',
    },
    selectedOptionColumn: {
      value: condition?.optionColumnName || condition.columnName,
      label: condition?.optionColumnName || condition.columnName,
    },
    selectedOptionTable: {
      value: condition?.optionTableName || condition.tableName || '',
      label: isDatabaseTenancy
        ? `${DATABASE_NAME}.${
            (condition?.optionTableName || condition?.tableName || '')
              ?.split('.')
              ?.slice(-1)?.[0]
          }`
        : condition?.optionTableName || condition.tableName || '',
    },
    isAddOnMetrics: condition?.isAddOnMetrics,
    applyOnColumns: condition.applyOnColumns || [],
    comparisonOperator: condition.comparisonOperator,
    dependOn: condition.dependOn || { value: '', label: '' },
    selectedCustomOptionTable: condition.selectedCustomOptionTable,
    filterVariant: condition.filterVariant,
  };

  setCurrentMetricFilter(filter);
  setShowFormContainer({ index, isEnable: true, type: 'Edit' });
};

export const ConfigForm = ({
  props: {
    rlsConditions,
    setRlsConditions,
    tableList,
    joinTableOption,
    isSqlTab,
    isPythonMode,
    tenancyType,
    showFormContainer,
    setShowFormContainer,
    currentMetricFilter,
    setCurrentMetricFilter,
    title,
    onClose,
  },
}: {
  props: ConfigFormProps;
}) => {
  const [step, setStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>(FILTER);
  const [errors, setErrors] =
    useState<Record<string, string | string[] | any>>();
  const isString = useMemo(
    () => ['string', 'boolean'].includes(currentMetricFilter.datatype.value),
    [currentMetricFilter.datatype.value]
  );
  const isNumber = useMemo(
    () => ['number'].includes(currentMetricFilter.datatype.value),
    [currentMetricFilter.datatype.value]
  );
  const isDate = useMemo(
    () => ['date'].includes(currentMetricFilter.datatype.value),
    [currentMetricFilter.datatype.value]
  );
  const isCreateFilter = useMemo(() => title === FILTERS, [title]);
  const tableListOptions: types.FloatingDropDownOption[] = useMemo(
    () =>
      Array.from(
        new Map(
          tableList?.map((table) => [
            `${table.schemaName}^^^^^^${table.tableName}`,
            {
              value: `${table.schemaName}.${table.tableName}`,
              label: `${
                tenancyType !== TABLE ? DATABASE_NAME : table.schemaName
              }.${table.tableName}`,
              icon: 'table',
            },
          ])
        ).values()
      ),
    [tableList, tenancyType]
  );
  // TODO: custom table and sql on apply
  const applyOnTableListOptions: types.FloatingDropDownOption[] = useMemo(
    () =>
      !isSqlTab
        ? joinTableOption
            .map((table) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [joinSchemaName, joinTableName, joinAlias, joinTableType] =
                table?.value?.split('^^^^^^');
              if (joinTableType === 'custom') {
                return { value: '', label: '', icon: 'table' };
              }
              const option: types.FloatingDropDownOption = {
                value: `${joinSchemaName}.${joinTableName}`,
                label: `${
                  tenancyType !== TABLE ? DATABASE_NAME : joinSchemaName
                }.${joinTableName}`,
                icon: 'table',
              };
              return option;
            })
            .filter((o) => o.value)
        : tableListOptions,
    [joinTableOption, isSqlTab, tableListOptions, tenancyType]
  );
  const columnOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const currentTableColumns: types.FloatingDropDownOption[] =
      tableList
        .find(
          (table) =>
            `${table.schemaName}.${table.tableName}` ===
            currentMetricFilter.selectedTable.value
        )
        ?.columnsWithDataType?.map((column) => ({
          value: column.name,
          label: column.name,
          icon: 'columns',
        })) || [];

    return currentTableColumns;
  }, [tableList, currentMetricFilter.selectedTable.value]);
  const autoColumnOptions: types.FloatingDropDownOption[] = useMemo(() => {
    const currentTableColumns: types.FloatingDropDownOption[] =
      tableList
        .find(
          (table) =>
            `${table.schemaName}.${table.tableName}` ===
            currentMetricFilter.selectedOptionTable.value
        )
        ?.columnsWithDataType?.map((column) => ({
          value: column.name,
          label: column.name,
          icon: 'columns',
        })) || [];

    return currentTableColumns;
  }, [tableList, currentMetricFilter.selectedOptionTable.value]);
  return (
    <div className={styles.metricFilterConfigContainer}>
      <div className={styles.chartFilterFormContainer}>
        {isCreateFilter ? (
          <div className={styles.metricFilterCreateContainer}>
            {step === 1 ? (
              <ConfigOptions
                props={{
                  autoColumnOptions,
                  currentMetricFilter,
                  errors,
                  isDate,
                  isNumber,
                  isString,
                  rlsConditions,
                  setCurrentMetricFilter,
                  tableListOptions,
                  tenancyType,
                  isCreateFilter: true,
                }}
              />
            ) : (
              <ConfigApplyOn
                props={{
                  applyOnTableListOptions,
                  columnOptions,
                  currentMetricFilter,
                  errors,
                  isCreateFilter,
                  isDate,
                  isPythonMode,
                  setCurrentMetricFilter,
                }}
              />
            )}
          </div>
        ) : (
          <div className={styles.metricFilterUpdateTabContainer}>
            <div className={styles.metricFilterUpdateTabWrapper}>
              <Ui.Button
                variant="popover"
                className={`dbn-px-6 dbn-py-2 ${
                  activeTab === FILTER
                    ? 'dbn-border-b-2 dbn-border-primary'
                    : ''
                }`}
                onClick={() => setActiveTab(FILTER)}
              >
                Filter Options
              </Ui.Button>
              <Ui.Button
                variant="popover"
                className={`dbn-px-6 dbn-py-2 ${
                  activeTab === APPLY ? 'dbn-border-b-2 dbn-border-primary' : ''
                }`}
                onClick={() => setActiveTab(APPLY)}
              >
                Apply On
              </Ui.Button>
            </div>
            <div className={styles.metricFilterUpdateContainer}>
              {activeTab === FILTER ? (
                <ConfigOptions
                  props={{
                    autoColumnOptions,
                    currentMetricFilter,
                    errors,
                    isDate,
                    isNumber,
                    isString,
                    rlsConditions,
                    setCurrentMetricFilter,
                    tableListOptions,
                    tenancyType,
                    isCreateFilter,
                  }}
                />
              ) : (
                <ConfigApplyOn
                  props={{
                    applyOnTableListOptions,
                    columnOptions,
                    currentMetricFilter,
                    errors,
                    isCreateFilter,
                    isDate,
                    isPythonMode,
                    setCurrentMetricFilter,
                  }}
                />
              )}
            </div>
          </div>
        )}
        <div className={styles.metricFilterBtnContainer}>
          {step === 2 ? (
            <Ui.Button variant="secondary" onClick={() => setStep(1)}>
              Prev
            </Ui.Button>
          ) : null}
          <div className={styles.metricFilterBtnWrapper}>
            <Ui.Button
              variant="primary"
              onClick={() => {
                if (step === 1 && isCreateFilter) {
                  setStep(2);
                } else {
                  onSaveFilter({
                    filter: currentMetricFilter,
                    setErrors,
                    setRlsConditions,
                    setShowFormContainer,
                    setCurrentMetricFilter,
                    edit: {
                      index: showFormContainer.index,
                      isEnable: showFormContainer.type === EDIT,
                    },
                    onClose,
                  });
                }
              }}
              className="dbn-w-[50%]"
            >
              {step === 1 && isCreateFilter ? NEXT : SAVE}
            </Ui.Button>
          </div>
        </div>
      </div>
    </div>
  );
};
