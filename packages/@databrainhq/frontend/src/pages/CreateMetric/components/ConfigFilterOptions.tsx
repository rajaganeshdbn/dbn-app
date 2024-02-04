/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/prefer-default-export */
import { Ui, consts, helpers, types } from '@databrainhq/plugin';
import { useMemo } from 'react';
import { CurrentMetricFilter } from 'types/metric';
import {
  DATATYPES,
  FILTER_TYPE,
  DEFAULT_DATE_OPTION,
  STRING_FILTER_VARIANT,
} from 'consts/application';
import {
  GUEST_TOKEN,
  MANUAL,
  RELATION_OPERATOR_LIST,
  RangeOptions,
  TimeOptions,
  metricFilterOperator,
} from 'consts/values';
import { FILTER_VARIANT_LABEL } from 'consts/labels';
import styles from './manageColumns.module.css';

type ConfigOptionsProps = {
  currentMetricFilter: CurrentMetricFilter;
  setCurrentMetricFilter: React.Dispatch<
    React.SetStateAction<CurrentMetricFilter>
  >;
  errors: Record<string, any> | undefined;
  isString: boolean;
  isDate: boolean;
  isNumber: boolean;
  tableListOptions: types.FloatingDropDownOption[];
  autoColumnOptions: types.FloatingDropDownOption[];
  rlsConditions: types.RlsCondition[];
  tenancyType: string;
  isCreateFilter: boolean;
};
type ConfigApplyOnProps = Pick<
  ConfigOptionsProps,
  | 'currentMetricFilter'
  | 'setCurrentMetricFilter'
  | 'errors'
  | 'isDate'
  | 'isCreateFilter'
> & {
  applyOnTableListOptions: types.FloatingDropDownOption[];
  isPythonMode: boolean;
  columnOptions: types.FloatingDropDownOption[];
};

type SavedFilterProps = {
  isApplied?: boolean;
  name?: string;
  type?: string;
  actions: {
    name: string;
    callbackFunction: (option?: Record<string, any>) => void;
    icon: types.IconType;
    color?: types.Colors;
  }[];
  option?: Record<string, any>;
  onChangeApply?: () => void;
  title?: string;
};
export const ConfigOptions = ({
  props: {
    currentMetricFilter,
    setCurrentMetricFilter,
    errors,
    isDate,
    isString,
    isNumber,
    autoColumnOptions,
    tableListOptions,
    rlsConditions,
    tenancyType,
    isCreateFilter,
  },
}: {
  props: ConfigOptionsProps;
}) => {
  const stringEnabledFilterTypes = ['auto', 'custom'];
  const isStringDataType =
    currentMetricFilter?.datatype?.value === DATATYPES?.[0]?.value;
  const isSearchStringVariant =
    isStringDataType &&
    currentMetricFilter.filterVariant?.value ===
      STRING_FILTER_VARIANT?.[2].value;
  return (
    <>
      {isCreateFilter && (
        <Ui.Alert text="Configure options for filter" variant="info" />
      )}

      <Ui.InputField
        type="text"
        placeholder="country"
        label="Filter Name"
        onChange={({ target: { value } }) =>
          setCurrentMetricFilter((prev) => ({
            ...prev,
            name: value,
            isAddOnMetrics: true,
          }))
        }
        value={currentMetricFilter.name}
        error={errors?.name}
      />
      <Ui.FloatingDropDown
        options={FILTER_TYPE}
        selectedOption={currentMetricFilter.filterType}
        buttonWidth="100%"
        menuWidth="345px"
        label="Filter Type"
        placeholder="Select Filter Type"
        onChange={(value) => {
          setCurrentMetricFilter((prev) => ({
            ...prev,
            filterType: value,
            datatype: stringEnabledFilterTypes.includes(value.value)
              ? { value: 'string', label: 'string' }
              : prev.datatype,
          }));
        }}
        isDisabled={!currentMetricFilter.name}
      />
      {errors?.filterType && (
        <Ui.Text variant="body-text-sm" color="alert">
          {errors.filterType}
        </Ui.Text>
      )}
      {errors?.dateOptionError && (
        <Ui.Text variant="body-text-sm" color="alert">
          {errors.dateOptionError}
        </Ui.Text>
      )}
      <Ui.FloatingDropDown
        options={DATATYPES}
        selectedOption={currentMetricFilter.datatype}
        buttonWidth="100%"
        menuWidth="345px"
        label="Datatype"
        onChange={(value) => {
          setCurrentMetricFilter((prev) => ({
            ...prev,
            datatype: value,
          }));
        }}
        isDisabled={stringEnabledFilterTypes.includes(
          currentMetricFilter?.filterType?.value || ''
        )}
      />
      {isStringDataType && (
        <div className="dbn-w-full">
          <Ui.FloatingDropDown
            label={FILTER_VARIANT_LABEL}
            onChange={(value) =>
              setCurrentMetricFilter((prev) => ({
                ...prev,
                filterVariant: value,
              }))
            }
            options={STRING_FILTER_VARIANT}
            selectedOption={
              currentMetricFilter.filterVariant || {
                value: '',
                label: '',
              }
            }
            buttonWidth="100%"
            menuWidth="345px"
          />
        </div>
      )}
      {errors?.datatype && (
        <Ui.Text variant="body-text-sm" color="alert">
          {errors.datatype}
        </Ui.Text>
      )}
      {!isSearchStringVariant && (
        <div className="dbn-w-full">
          {[MANUAL, GUEST_TOKEN].includes(
            currentMetricFilter.filterType.value
          ) && (
            <div className={styles.manualOptionContainer}>
              <Ui.Text variant="label">Add Options</Ui.Text>
              {isString &&
                currentMetricFilter.stringOptions.map((savedValue, index) => (
                  <div className={styles.manualOptions}>
                    <Ui.InputField
                      type="text"
                      placeholder="united states"
                      onChange={({ target: { value } }) =>
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          stringOptions: prev.stringOptions.map(
                            (optionValue, i) =>
                              i === index
                                ? {
                                    label:
                                      typeof optionValue === 'object'
                                        ? optionValue?.label
                                        : optionValue,
                                    value,
                                  }
                                : optionValue
                          ),
                        }))
                      }
                      value={
                        typeof currentMetricFilter?.stringOptions?.[0] ===
                        'object'
                          ? savedValue?.value
                          : (savedValue as unknown as string)
                      }
                      error={errors?.stringOptions?.[index]}
                    />
                    <Ui.InputField
                      type="text"
                      placeholder="label value"
                      onChange={({ target: { value } }) =>
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          stringOptions: prev.stringOptions.map(
                            (optionValue, i) =>
                              i === index
                                ? {
                                    label: value,
                                    value:
                                      typeof optionValue === 'object'
                                        ? optionValue.value
                                        : optionValue,
                                  }
                                : optionValue
                          ),
                        }))
                      }
                      value={
                        typeof currentMetricFilter?.stringOptions?.[0] ===
                        'object'
                          ? savedValue?.label
                          : (savedValue as unknown as string)
                      }
                      error={errors?.stringOptions?.[index]}
                    />
                    <Ui.Button
                      leftIcon={<Ui.Icons name="delete" color="alert" />}
                      variant="popover"
                      onClick={() =>
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          stringOptions: prev.stringOptions.filter(
                            (__, i) => i !== index
                          ),
                        }))
                      }
                    />
                  </div>
                ))}
              {isNumber &&
                currentMetricFilter.numberOptions.map((savedValue, index) => (
                  <div className={styles.manualOptions}>
                    <Ui.InputField
                      type="number"
                      placeholder="united states"
                      onChange={({ target: { value } }) =>
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          numberOptions: prev.numberOptions.map(
                            (optionValue, i) =>
                              i === index ? parseInt(value, 10) : optionValue
                          ),
                        }))
                      }
                      error={errors?.numberOptions?.[index]}
                      value={savedValue}
                    />
                    <Ui.Button
                      leftIcon={<Ui.Icons name="delete" color="alert" />}
                      variant="popover"
                      onClick={() =>
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          numberOptions: prev.numberOptions.filter(
                            (__, i) => i !== index
                          ),
                        }))
                      }
                    />
                  </div>
                ))}
              {isDate &&
                currentMetricFilter.dateOptions.map((option, index) => (
                  <div className={styles.timeOption}>
                    <div className={styles.timeOptionRange}>
                      <div>
                        <Ui.FloatingDropDown
                          onChange={(o) =>
                            setCurrentMetricFilter((prev) => ({
                              ...prev,
                              dateOptions: prev.dateOptions.map(
                                (optionValue, i) =>
                                  i === index
                                    ? {
                                        ...optionValue,
                                        range: o.value,
                                      }
                                    : optionValue
                              ),
                            }))
                          }
                          options={RangeOptions}
                          selectedOption={{
                            value: option.range,
                            label: option.range,
                          }}
                          label="Range"
                          buttonWidth={
                            option.range === 'Last' ? '200px' : '310px'
                          }
                        />
                        {errors?.dateOptions?.[index]?.range && (
                          <Ui.Text variant="body-text-sm" color="alert">
                            {errors.dateOptions?.[index]?.range}
                          </Ui.Text>
                        )}
                        {errors?.variableDateOptions?.[index]?.range && (
                          <Ui.Text variant="body-text-sm" color="alert">
                            {errors.variableDateOptions?.[index]?.range}
                          </Ui.Text>
                        )}
                      </div>

                      {option.range === 'Last' && (
                        <Ui.InputField
                          type="number"
                          min={1}
                          onChange={({ target: { value } }) =>
                            setCurrentMetricFilter((prev) => ({
                              ...prev,
                              dateOptions: prev.dateOptions.map(
                                (optionValue, i) =>
                                  i === index
                                    ? {
                                        ...optionValue,
                                        count: parseInt(value, 10),
                                      }
                                    : optionValue
                              ),
                            }))
                          }
                          value={option.count}
                          label="Count"
                          error={errors?.dateOptions?.[index]?.count}
                        />
                      )}
                    </div>
                    {['Custom', 'Date Range'].includes(option.range) && (
                      <div className="">
                        <Ui.DateRangePicker
                          label="Select default value"
                          onChange={(dateOption) => {
                            setCurrentMetricFilter((prev) => {
                              return {
                                ...prev,
                                dateOptions: prev.dateOptions.map(
                                  (optionValue, i) =>
                                    i === index
                                      ? {
                                          ...optionValue,
                                          startDate: dateOption?.startDate,
                                          endDate: dateOption?.endDate,
                                          timeGrain: dateOption?.timeGrainValue,
                                        }
                                      : optionValue
                                ),
                              };
                            });
                          }}
                          defaultValues={
                            option.startDate && option.endDate
                              ? {
                                  endDate: helpers.isValidDate(option.endDate)
                                    ? option.endDate
                                    : new Date(option.endDate),
                                  startDate: helpers.isValidDate(
                                    option.startDate
                                  )
                                    ? option.startDate
                                    : new Date(option.startDate),
                                  timeGrainValue: option.timeGrain || '',
                                }
                              : undefined
                          }
                        />
                      </div>
                    )}
                    {errors?.dateOptions?.[index]?.startDate && (
                      <Ui.Text variant="body-text-sm" color="alert">
                        {errors.dateOptions?.[index]?.startDate}
                      </Ui.Text>
                    )}
                    {errors?.dateOptions?.[index]?.endDate && (
                      <Ui.Text variant="body-text-sm" color="alert">
                        {errors.dateOptions?.[index]?.endDate}
                      </Ui.Text>
                    )}
                    {errors?.variableDateOptions?.[index]?.startDate && (
                      <Ui.Text variant="body-text-sm" color="alert">
                        {errors.variableDateOptions?.[index]?.startDate}
                      </Ui.Text>
                    )}
                    {errors?.variableDateOptions?.[index]?.endDate && (
                      <Ui.Text variant="body-text-sm" color="alert">
                        {errors.dateOptions?.[index]?.startDate ||
                          errors.variableDateOptions?.[index]?.endDate}
                      </Ui.Text>
                    )}
                    {['Custom Date'].includes(option.range) && (
                      <>
                        <Ui.DateRangePicker
                          label="Select default value"
                          placeholder="Default Date"
                          buttonWidth="310px"
                          isEnableSingleDate
                          onChange={(dates) => {
                            setCurrentMetricFilter((prev) => ({
                              ...prev,
                              dateOptions: prev.dateOptions.map(
                                (optionValue, i) =>
                                  i === index
                                    ? {
                                        ...optionValue,
                                        startDate: dates?.startDate,
                                        endDate: dates?.endDate,
                                      }
                                    : optionValue
                              ),
                            }));
                          }}
                          defaultValues={
                            option.startDate && option.endDate
                              ? {
                                  endDate: helpers.isValidDate(option.endDate)
                                    ? option.endDate
                                    : new Date(option.endDate),
                                  startDate: helpers.isValidDate(
                                    option.startDate
                                  )
                                    ? option.startDate
                                    : new Date(option.startDate),
                                  timeGrainValue: option.timeGrain || '',
                                }
                              : undefined
                          }
                        />
                      </>
                    )}
                    {!['Custom', 'Custom Date', 'Date Range'].includes(
                      option.range
                    ) && (
                      <>
                        <Ui.FloatingDropDown
                          onChange={(o) =>
                            setCurrentMetricFilter((prev) => ({
                              ...prev,
                              dateOptions: prev.dateOptions.map(
                                (optionValue, i) =>
                                  i === index
                                    ? {
                                        ...optionValue,
                                        time: o.value,
                                      }
                                    : optionValue
                              ),
                            }))
                          }
                          options={TimeOptions}
                          selectedOption={{
                            value: option.time,
                            label: option.time,
                          }}
                          label="Time"
                          buttonWidth="310px"
                        />
                        {errors?.dateOptions?.[index]?.time && (
                          <Ui.Text variant="body-text-sm" color="alert">
                            {errors.dateOptions?.[index]?.time}
                          </Ui.Text>
                        )}
                      </>
                    )}
                    <div className="dbn-flex dbn-items-end dbn-gap-4">
                      <Ui.InputField
                        type="text"
                        placeholder="last year"
                        onChange={({ target: { value } }) =>
                          setCurrentMetricFilter((prev) => ({
                            ...prev,
                            dateOptions: prev.dateOptions.map(
                              (optionValue, i) =>
                                i === index
                                  ? {
                                      ...optionValue,
                                      name: value,
                                    }
                                  : optionValue
                            ),
                          }))
                        }
                        value={option.name}
                        label="Save Condition As"
                        error={errors?.dateOptions?.[index]?.name}
                      />

                      <Ui.Button
                        leftIcon={<Ui.Icons name="delete" color="alert" />}
                        variant="popover"
                        onClick={() =>
                          setCurrentMetricFilter((prev) => ({
                            ...prev,
                            dateOptions: prev.dateOptions.filter(
                              (__, i) => i !== index
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}

              {errors?.manualOptionError && (
                <Ui.Text variant="body-text-sm" color="alert">
                  {errors.manualOptionError}
                </Ui.Text>
              )}
              {!currentMetricFilter.dateOptions.find(
                (o) => o.range === 'Custom Date' || o.range === 'Date Range'
              ) && (
                <Ui.Button
                  leftIcon={<Ui.Icons name="plus" />}
                  variant="tertiary"
                  onClick={() =>
                    setCurrentMetricFilter((prev) => ({
                      ...prev,
                      stringOptions: isString
                        ? [...prev.stringOptions, { value: '', label: '' }]
                        : [],
                      numberOptions: isNumber ? [...prev.numberOptions, 0] : [],
                      dateOptions: isDate
                        ? [
                            ...prev.dateOptions,
                            {
                              ...DEFAULT_DATE_OPTION,
                              id: `${prev.dateOptions.length}`,
                            },
                          ]
                        : [],
                    }))
                  }
                  className="dbn-w-full dbn-bg-gray dbn-border-secondary dbn-border dbn-rounded-md"
                >
                  Add Option
                </Ui.Button>
              )}
            </div>
          )}
          {currentMetricFilter.filterType.value === 'custom' && !isDate && (
            <div className={styles.manualOptionContainer}>
              <Ui.TextAreaField
                rows={4}
                label="Select query"
                id="s"
                rightIcon={
                  <Ui.NewTooltip
                    text="Select query will be used as subquery to fetch filter options"
                    position="right"
                    tooltipClass="dbn-w-[200px]"
                  >
                    <Ui.Icons name="info" />
                  </Ui.NewTooltip>
                }
                onChange={({ target: { value } }) =>
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    selectedCustomOptionTable: {
                      query: value,
                      columnName:
                        prev.selectedCustomOptionTable?.columnName || '',
                    },
                  }))
                }
                value={
                  currentMetricFilter.selectedCustomOptionTable?.query || ''
                }
                error={
                  errors?.selectedCustomOptionTableQuery
                    ? {
                        message: errors.selectedCustomOptionTableQuery,
                      }
                    : undefined
                }
              />
              <Ui.InputField
                label="Column Name"
                placeholder="enter column name or alias from select query"
                onChange={({ target: { value } }) =>
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    selectedCustomOptionTable: {
                      columnName: value,
                      query: prev.selectedCustomOptionTable?.query || '',
                    },
                  }))
                }
                value={
                  currentMetricFilter.selectedCustomOptionTable?.columnName ||
                  ''
                }
                error={errors?.selectedCustomOptionTableColumnName}
              />
              <Ui.InputField
                label="Label Column Name"
                placeholder="enter label column name or alias from select query"
                onChange={({ target: { value } }) =>
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    selectedLabelColumn: {
                      value,
                      label: value,
                    },
                  }))
                }
                value={currentMetricFilter.selectedLabelColumn?.value || ''}
              />
            </div>
          )}
          {currentMetricFilter.filterType.value === 'auto' && !isDate && (
            <div className={styles.manualOptionContainer}>
              <Ui.FloatingDropDown
                options={tableListOptions}
                selectedOption={currentMetricFilter.selectedOptionTable}
                buttonWidth="100%"
                menuWidth="325px"
                onChange={(value) => {
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    selectedOptionTable: value,
                  }));
                }}
                isSearchEnabled
                placeholder="Select Table"
                label="Choose a table from dataset"
                isDisabled={!tableListOptions.length}
              />
              {errors?.selectedOptionTable && (
                <Ui.Text variant="body-text-sm" color="alert">
                  {errors.selectedOptionTable}
                </Ui.Text>
              )}
              <Ui.FloatingDropDown
                options={autoColumnOptions}
                selectedOption={currentMetricFilter.selectedOptionColumn}
                buttonWidth="100%"
                menuWidth="325px"
                placeholder="Select Column"
                onChange={(value) => {
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    selectedOptionColumn: value,
                  }));
                }}
                isSearchEnabled
                isDisabled={!currentMetricFilter.selectedOptionTable.value}
                label="Choose a column from table"
              />
              {errors?.selectedOptionColumn && (
                <Ui.Text variant="body-text-sm" color="alert">
                  {errors.selectedOptionColumn}
                </Ui.Text>
              )}

              <Ui.FloatingDropDown
                options={autoColumnOptions}
                selectedOption={
                  currentMetricFilter.selectedLabelColumn || {
                    value: '',
                    label: '',
                  }
                }
                buttonWidth="100%"
                menuWidth="100%"
                placeholder="Select Label Column"
                onChange={(value) => {
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    selectedLabelColumn: value,
                  }));
                }}
                isSearchEnabled
                label="Choose a unique label column from table"
              />

              <Ui.FloatingDropDown
                options={rlsConditions
                  .filter(
                    (f) =>
                      f.datatype === 'string' &&
                      f.filterVariant?.value !== consts.LIKE
                  )
                  .map((option) => ({
                    value: option.name,
                    label: option.name,
                  }))}
                selectedOption={
                  currentMetricFilter.dependOn || {
                    value: '',
                    label: '',
                  }
                }
                buttonWidth="100%"
                menuWidth="325px"
                placeholder="Depend On"
                onChange={(value) => {
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    dependOn: value,
                  }));
                }}
                isSearchEnabled
                isDisabled={!currentMetricFilter.selectedOptionTable.value}
                label="Depend On"
              />

              {tenancyType !== 'DATABASE' && (
                <Ui.Checkbox
                  label="scope options to selected client?"
                  onClick={() =>
                    setCurrentMetricFilter((prev) => ({
                      ...prev,
                      isClientScopedOption: !prev.isClientScopedOption,
                    }))
                  }
                  checked={currentMetricFilter.isClientScopedOption}
                />
              )}
              {currentMetricFilter.isClientScopedOption && (
                <>
                  <Ui.FloatingDropDown
                    options={autoColumnOptions}
                    selectedOption={currentMetricFilter.clientColumn}
                    buttonWidth="100%"
                    menuWidth="325px"
                    onChange={(value) => {
                      setCurrentMetricFilter((prev) => ({
                        ...prev,
                        clientColumn: value,
                      }));
                    }}
                    isSearchEnabled
                    isDisabled={
                      !currentMetricFilter.selectedOptionTable.value ||
                      !currentMetricFilter.isClientScopedOption
                    }
                    label="Choose client column from table"
                  />
                  {errors?.clientColumn && (
                    <Ui.Text variant="body-text-sm" color="alert">
                      {errors.clientColumn}
                    </Ui.Text>
                  )}
                  <Ui.FloatingDropDown
                    options={DATATYPES.filter(
                      (o) => o.value === 'string' || o.value === 'number'
                    )}
                    selectedOption={currentMetricFilter.clientColumnDatatype}
                    buttonWidth="100%"
                    menuWidth="325px"
                    onChange={(value) => {
                      setCurrentMetricFilter((prev) => ({
                        ...prev,
                        clientColumnDatatype: value,
                      }));
                    }}
                    isSearchEnabled
                    isDisabled={
                      !currentMetricFilter.selectedOptionTable.value ||
                      !currentMetricFilter.isClientScopedOption
                    }
                    label="Choose datatype of client column"
                  />
                  {errors?.clientColumnDatatype && (
                    <Ui.Text variant="body-text-sm" color="alert">
                      {errors.clientColumnDatatype}
                    </Ui.Text>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const ConfigApplyOn = ({
  props: {
    currentMetricFilter,
    errors,
    isCreateFilter,
    isDate,
    setCurrentMetricFilter,
    applyOnTableListOptions,
    isPythonMode,
    columnOptions,
  },
}: {
  props: ConfigApplyOnProps;
}) => {
  const isShowOperatorDropdown = useMemo(
    () =>
      !currentMetricFilter.dateOptions.find((o) =>
        ['Last', 'This', 'Custom', 'Date Range'].includes(o.range)
      ),
    [currentMetricFilter]
  );
  return (
    <>
      {isCreateFilter && (
        <Ui.Alert
          variant="info"
          text="Configure how to apply the selected options"
        />
      )}
      <div className="dbn-flex dbn-items-center dbn-gap-5">
        {!isPythonMode && (
          <Ui.RadioButton
            type="radio"
            onChange={({ target: { checked } }) =>
              setCurrentMetricFilter((prev) => ({
                ...prev,
                isVariableFilter: !checked,
              }))
            }
            name="variableFilter"
            label="Apply on"
            checked={!currentMetricFilter.isVariableFilter}
          />
        )}
        <Ui.RadioButton
          type="radio"
          onChange={({ target: { checked } }) =>
            setCurrentMetricFilter((prev) => ({
              ...prev,
              isVariableFilter: checked,
            }))
          }
          name="variableFilter"
          label="Variable Filter"
          checked={currentMetricFilter.isVariableFilter}
        />
      </div>
      <div className={styles.chartFilterFormContainer}>
        {!currentMetricFilter.isVariableFilter && !isPythonMode ? (
          <>
            <Ui.FloatingDropDown
              options={applyOnTableListOptions}
              selectedOption={currentMetricFilter.selectedTable}
              buttonWidth="100%"
              menuWidth="325px"
              onChange={(value) => {
                setCurrentMetricFilter((prev) => ({
                  ...prev,
                  selectedTable: value,
                }));
              }}
              isSearchEnabled
              placeholder="Select Table"
              label="Choose a table from dataset"
            />
            {errors?.selectedTable && (
              <Ui.Text variant="body-text-sm" color="alert">
                {errors.selectedTable}
              </Ui.Text>
            )}
            <Ui.FloatingDropDown
              options={columnOptions}
              selectedOption={currentMetricFilter.selectedColumn}
              buttonWidth="100%"
              menuWidth="325px"
              placeholder="Select Column"
              onChange={(value) => {
                setCurrentMetricFilter((prev) => ({
                  ...prev,
                  selectedColumn: value,
                }));
              }}
              isSearchEnabled
              isDisabled={!currentMetricFilter.selectedTable.value}
              label="Choose a column from table"
            />
            {errors?.selectedColumn && (
              <Ui.Text variant="body-text-sm" color="alert">
                {errors.selectedColumn}
              </Ui.Text>
            )}
            {isDate && isShowOperatorDropdown && (
              <Ui.FloatingDropDown
                options={metricFilterOperator}
                selectedOption={
                  currentMetricFilter.comparisonOperator ||
                  metricFilterOperator[0]
                }
                labelVariant="floating"
                onChange={(value) => {
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    comparisonOperator: value,
                  }));
                }}
                isSearchEnabled
                isDisabled={!currentMetricFilter.datatype}
                buttonWidth="100%"
                menuWidth="325px"
              />
            )}
            {errors?.comparisonOperator && (
              <Ui.Text variant="body-text-sm" color="alert">
                {errors.comparisonOperator}
              </Ui.Text>
            )}
            {isDate &&
              isShowOperatorDropdown &&
              currentMetricFilter.applyOnColumns?.map((column, index) => (
                <>
                  <div className="dbn-w-full dbn-flex dbn-gap-2">
                    <Ui.FloatingDropDown
                      options={RELATION_OPERATOR_LIST}
                      selectedOption={
                        column.logicalOperator || RELATION_OPERATOR_LIST[0]
                      }
                      labelVariant="floating"
                      onChange={(value) => {
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          applyOnColumns:
                            prev.applyOnColumns?.map((f, i) =>
                              index === i ? { ...f, logicalOperator: value } : f
                            ) || [],
                        }));
                      }}
                      isSearchEnabled
                      buttonWidth="100px"
                      menuWidth="100px"
                    />
                    {errors?.applyOnColumns?.[index]?.logicalOperator && (
                      <Ui.Text variant="body-text-sm" color="alert">
                        {errors?.applyOnColumns?.[index]?.logicalOperator}
                      </Ui.Text>
                    )}
                    <Ui.FloatingDropDown
                      options={columnOptions}
                      selectedOption={column.columnName}
                      buttonWidth="220px"
                      menuWidth="220px"
                      placeholder="Select Column"
                      onChange={(value) => {
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          applyOnColumns:
                            prev.applyOnColumns?.map((f, i) =>
                              index === i ? { ...f, columnName: value } : f
                            ) || [],
                        }));
                      }}
                      isSearchEnabled
                      isDisabled={!currentMetricFilter.selectedTable.value}
                    />
                  </div>
                  {errors?.applyOnColumns?.[index]?.columnName && (
                    <Ui.Text variant="body-text-sm" color="alert">
                      {errors?.applyOnColumns?.[index]?.columnName}
                    </Ui.Text>
                  )}
                  <div className="dbn-w-full dbn-flex dbn-gap-2 dbn-items-center">
                    <Ui.FloatingDropDown
                      options={metricFilterOperator}
                      selectedOption={
                        column.comparisonOperator || metricFilterOperator[0]
                      }
                      labelVariant="floating"
                      onChange={(value) => {
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          applyOnColumns:
                            prev.applyOnColumns?.map((f, i) =>
                              index === i
                                ? {
                                    ...f,
                                    comparisonOperator: value,
                                  }
                                : f
                            ) || [],
                        }));
                      }}
                      isSearchEnabled
                      isDisabled={!currentMetricFilter.datatype}
                      buttonWidth="300px"
                      menuWidth="300px"
                    />
                    {errors?.applyOnColumns?.[index]?.comparisonOperator && (
                      <Ui.Text variant="body-text-sm" color="alert">
                        {errors?.applyOnColumns?.[index]?.comparisonOperator}
                      </Ui.Text>
                    )}
                    <Ui.Button
                      leftIcon={<Ui.Icons name="delete" color="alert" />}
                      variant="popover"
                      onClick={() =>
                        setCurrentMetricFilter((prev) => ({
                          ...prev,
                          applyOnColumns:
                            prev.applyOnColumns?.filter(
                              (__, i) => i !== index
                            ) || [],
                        }))
                      }
                    />
                  </div>
                </>
              ))}
            {isDate && isShowOperatorDropdown && (
              <Ui.Button
                variant="tertiary"
                leftIcon={<Ui.Icons name="plus" />}
                onClick={() => {
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    applyOnColumns: [
                      ...(prev.applyOnColumns || []),
                      {
                        columnName: { label: '', value: '' },
                        comparisonOperator: metricFilterOperator[0],
                        logicalOperator: RELATION_OPERATOR_LIST[0],
                      },
                    ],
                  }));
                }}
                className="dbn-w-full dbn-bg-gray dbn-border-secondary dbn-border dbn-rounded-md"
              >
                Add Column
              </Ui.Button>
            )}
          </>
        ) : (
          <>
            <div className="dbn-w-full dbn-flex dbn-gap-5">
              <Ui.InputField
                type="text"
                placeholder="country"
                label={!isDate ? 'Variable Value' : 'Variable From Value'}
                onChange={({ target: { value } }) =>
                  setCurrentMetricFilter((prev) => ({
                    ...prev,
                    variableStrings: [
                      value.replace('{{', '').replace('}}', ''),
                      prev.variableStrings?.[1]
                        ?.replace('{{', '')
                        ?.replace('}}', '') || '',
                    ],
                  }))
                }
                value={currentMetricFilter.variableStrings?.[0]
                  ?.replace('{{', '')
                  ?.replace('}}', '')}
                error={errors?.variableStrings?.[0]}
              />

              {isDate && (
                <Ui.InputField
                  type="text"
                  placeholder="country"
                  label="Variable To Value"
                  onChange={({ target: { value } }) =>
                    setCurrentMetricFilter((prev) => ({
                      ...prev,
                      variableStrings: [
                        prev.variableStrings?.[0]
                          ?.replace('{{', '')
                          ?.replace('}}', '') || '',
                        value.replace('{{', '').replace('}}', ''),
                      ],
                    }))
                  }
                  value={currentMetricFilter.variableStrings?.[1]
                    ?.replace('{{', '')
                    ?.replace('}}', '')}
                  error={errors?.variableStrings?.[1]}
                />
              )}
            </div>
            <div className="dbn-flex dbn-gap-2 dbn-items-center">
              {currentMetricFilter?.variableStrings?.[0] && (
                <Ui.Text variant="label">{`{{${currentMetricFilter?.variableStrings?.[0]
                  ?.replace('{{', '')
                  ?.replace('}}', '')}}}`}</Ui.Text>
              )}
              {currentMetricFilter?.variableStrings?.[1] &&
                ['date'].includes(currentMetricFilter.datatype.value) && (
                  <Ui.Text variant="label">{`{{${currentMetricFilter?.variableStrings?.[1]
                    ?.replace('{{', '')
                    ?.replace('}}', '')}}}`}</Ui.Text>
                )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const SavedFilter = ({
  props: { actions, title },
}: {
  props: SavedFilterProps;
}) => {
  return (
    <>
      {actions.length && (
        <Ui.PopoverMenu
          buttonContent={
            <Ui.Button variant="popover">
              <Ui.Icons name="kebab-menu-vertical" />
            </Ui.Button>
          }
          position="bottom-start"
          menuWidth="150px"
        >
          {title ? (
            <div className={styles.metricFilterPopUpTitle}>{title}</div>
          ) : null}
          {actions.map((a) => (
            <Ui.Button
              variant="tertiary"
              onClick={() => a.callbackFunction()}
              leftIcon={<Ui.Icons name={a.icon} color={a.color} />}
              color={a.color}
              className={styles.metricFilterPopUpBtn}
            >
              {a.name}
            </Ui.Button>
          ))}
        </Ui.PopoverMenu>
      )}
    </>
  );
};
