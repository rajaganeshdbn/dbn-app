/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui, consts, types } from '@databrainhq/plugin';
import {
  FieldValues,
  useFieldArray,
  Controller,
  useForm,
  FieldErrors,
  Control,
  UseFieldArrayRemove,
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
  UseFieldArrayAppend,
} from 'react-hook-form';
import segmentEvent from 'utils/segmentEvent';
import { useCompanyIntegrationQuery } from 'utils/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Schema } from 'types';
import {
  CAST_AS_LIST,
  ELASTICSEARCH,
  GLOBAL_FILTER_TYPE,
  STRING_FILTER_VARIANT,
} from 'consts/application';
import { required } from 'consts/validations';
import {
  ADD_YOUR_QUERY,
  APPLY_ON,
  AS,
  CHOOSE_A_COLUMN,
  CHOOSE_A_LABEL_COL,
  CLIENT_SCOPED,
  COLUMN_NAME,
  CONFIG_APPLY_ON_ALERT,
  DATASET,
  DATATYPE,
  DEPEND_ON_FILTER,
  FILTER_VARIANT_LABEL,
  LABEL,
  LABEL_COLUMN_INFO,
  OPTION_LABEL,
  OPTION_TYPE,
  OPTION_VALUE,
  SAVE_AS,
  SELECT_A_COLUMN,
  SELECT_A_LABEL_COL,
  SELECT_A_TABLE,
  SELECT_COLUMN_INFO,
  SELECT_QUERY,
  SELECT_QUERY_INFO,
  VARIABLE_FILTER_LABEL,
} from 'consts/labels';
import {
  AUTO,
  CLIENT_COLUMN,
  CLIENT_COLUMN_TYPE,
  COLUMN_NAME_VALUE,
  CONFI_OPTION_ALERT,
  CUSTOM,
  CUSTOM_LABEL_COL,
  DATABASE_NAME,
  DEFAULT_VALUE,
  DEPEND_ON,
  FILTER_TYPE,
  FILTER_VARIANT,
  IS_CLIENT_SCOPED,
  IS_VARIABLE_FILTER,
  LABEL_COL,
  MANUAL,
  NAME,
  QUERY,
  REMOVE_OPTION,
  VARIABLE_FILTER,
} from 'consts/values';
import Flex from 'components/Flex';
import DefaultValueField from 'components/ExternalDashboardForm/DefaultValueField';
import useExternalDashboards from 'hooks/useExternalDashboard';
import useCompanySchema, { TableColumn } from 'hooks/useCompanySchema';
import styles from './createGlobalFilter.module.css';

type TableType = Omit<Schema, 'columns' | 'id' | 'schemaName'> & {
  selectedColumns: Schema['columnsWithDataType'];
};
type CreateGlobalFilterProps = {
  onCancel: () => void;
  onSuccess: () => void;
  workspaceId: string;
  dashboard:
    | {
        __typename?: 'externalDashboards' | undefined;
        externalDashboardId: string;
        name: string;
        id: any;
        filters: any;
        defaultClientId?: string | null | undefined;
        layout: any;
        workspaceId: any;
      }
    | undefined;
  isHorizontalFilter: boolean;
  updateFilterName?: string;
  isNone: boolean;
  isDatabaseTenancy?: boolean;
  clientId?: string;
};
type ConfigOptionsProps = {
  setValue: UseFormSetValue<FieldValues>;
  currentFilter: FieldValues;
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
  schemaList: Schema[];
  tableListOptions: types.FloatingDropDownOption[];
  setSelectedTable: React.Dispatch<React.SetStateAction<TableType>>;
  selectedTable: TableType;
  isDatabaseTenancy: boolean;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  filterToUpdate: types.GlobalFilterColumn | undefined;
  isHorizontalFilter: boolean;
  isElasticSearch: boolean;
  appendManualOptions: UseFieldArrayAppend<FieldValues, 'options'>;
  manualOptions: Record<'id', string>[];
  removeManualOptions: UseFieldArrayRemove;
  filters: Record<string, any>[] | undefined;
};
type ConfigApplyOnProps = Pick<
  ConfigOptionsProps,
  | 'setValue'
  | 'control'
  | 'errors'
  | 'register'
  | 'watch'
  | 'isDatabaseTenancy'
  | 'isElasticSearch'
  | 'schemaList'
  | 'tableListOptions'
> & {
  removeApplyOnTables: UseFieldArrayRemove;
  appendApplyOnTables: UseFieldArrayAppend<FieldValues, 'applyOnTables'>;
  applyOnTables: Record<'id', string>[];
};
const error = (errors: FieldErrors<FieldValues>, field: string) => {
  return errors?.[field]?.message &&
    typeof errors?.[field]?.message === consts.STRING ? (
    <Flex className="dbn-flex dbn-items-center dbn-gap-1">
      <Ui.Icons name="info" size="xs" color="alert" />
      <Ui.Text variant="body-text-sm" color="alert">
        {(errors?.[field]?.message as string) || ''}
      </Ui.Text>
    </Flex>
  ) : (
    <></>
  );
};
const getFilteredStringColumns = (columns: TableColumn[]) => {
  return columns.filter(
    (col) =>
      consts.STRING_TYPES.includes(col?.dataType?.toLowerCase()) ||
      col?.dataType?.toLowerCase().toLowerCase().includes('char')
  );
};
const ColumnField = ({
  applyOnTableList,
  isElasticSearch,
  schemaList,
  index,
  errors,
  control,
  removeApplyOnTables,
  setValue,
}: {
  applyOnTableList: any[];
  isElasticSearch: boolean;
  schemaList: Schema[];
  index: number;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
  removeApplyOnTables: UseFieldArrayRemove;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const getColumnList = useCallback((i: number, tableList: any[]) => {
    return (
      schemaList
        ?.find((schema) =>
          isElasticSearch
            ? schema.tableName === tableList?.[i]?.tableName
            : `${schema.schemaName}.${schema.tableName}` ===
              tableList?.[i]?.tableName
        )
        ?.columnsWithDataType.map((col: any) => ({
          label: col.name,
          value: col.name,
          labelType: col.dataType,
        })) || []
    );
  }, []);
  return (
    <div className="dbn-w-full dbn-flex dbn-gap-2 dbn-items-end">
      <div className="dbn-flex dbn-flex-col dbn-gap-1">
        <Controller
          name={`applyOnTables[${index}].columnName`}
          control={control}
          rules={{
            required: 'Column is not selected',
          }}
          render={({ field }) => {
            return (
              <>
                <Ui.FloatingDropDown
                  buttonWidth="500px"
                  menuWidth="100%"
                  placeholder="Select a column"
                  label="Choose A Column"
                  isSearchEnabled
                  options={getColumnList(index, applyOnTableList)}
                  onChange={(option) => {
                    setValue(
                      `applyOnTables[${index}].columnName`,
                      option.value
                    );
                    setValue(
                      `applyOnTables[${index}].dataType`,
                      option.labelType
                    );
                  }}
                  selectedOption={{
                    label: field?.value || '',
                    value: field.value || '',
                  }}
                />
              </>
            );
          }}
        />
        {error((errors?.applyOnTables as any)?.[index], `columnName`)}
      </div>

      <Ui.Button
        type="button"
        variant="tertiary"
        className="dbn-flex hover:dbn-bg-gray dbn-text-blue-700 dbn-items-center dbn-ml-auto dbn-w-fit dbn-text-sm"
        onClick={() => removeApplyOnTables(index)}
        title="remove option"
      >
        <Ui.Icons name="delete" />
      </Ui.Button>
    </div>
  );
};
const ConfigOptions = ({
  props: {
    currentFilter,
    setValue,
    control,
    errors,
    schemaList,
    tableListOptions,
    selectedTable,
    setSelectedTable,
    isDatabaseTenancy,
    watch,
    filterToUpdate,
    register,
    isHorizontalFilter,
    isElasticSearch,
    appendManualOptions,
    manualOptions,
    removeManualOptions,
    filters,
  },
}: {
  props: ConfigOptionsProps;
}) => {
  const isStringDataType = watch(AS) === consts.STRING;
  const isSearchStringVariant =
    isStringDataType &&
    watch(FILTER_VARIANT)?.value === STRING_FILTER_VARIANT?.[2].value;
  const isOldManualOption =
    manualOptions?.length && Object.keys(manualOptions?.[0])?.[0] !== 'label';
  return (
    <Flex direction="col" className={styles.configOptionContainer}>
      <Ui.Alert text={CONFI_OPTION_ALERT} variant="info" />
      <div className={styles.configDropdownWrapper}>
        <Controller
          name={AS}
          control={control}
          rules={required}
          render={({ field }) => {
            return (
              <Ui.FloatingDropDown
                label={DATATYPE}
                options={CAST_AS_LIST}
                buttonWidth="100%"
                menuWidth="100%"
                onChange={(option) => {
                  setValue(field.name, option.value);
                  if (option.value !== consts.STRING)
                    setValue(FILTER_TYPE, GLOBAL_FILTER_TYPE[0]?.value);
                }}
                selectedOption={{
                  value: field.value,
                  label: field.value,
                }}
              />
            );
          }}
        />
        {error(errors, AS)}
      </div>
      {isStringDataType && (
        <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
          <Controller
            name={FILTER_VARIANT}
            control={control}
            rules={required}
            render={({ field }) => (
              <>
                <Ui.FloatingDropDown
                  label={FILTER_VARIANT_LABEL}
                  buttonWidth="100%"
                  menuWidth="100%"
                  options={STRING_FILTER_VARIANT}
                  onChange={(option) => {
                    setValue(field.name, option);
                  }}
                  selectedOption={field.value || { value: '', label: '' }}
                />
              </>
            )}
          />
          {error(errors, FILTER_VARIANT)}
        </div>
      )}
      {!isSearchStringVariant &&
      ![consts.DATE, consts.NUMBER].includes(watch(AS) || '') ? (
        <>
          <div className={styles.configDropdownWrapper}>
            <Controller
              name={FILTER_TYPE}
              control={control}
              rules={required}
              render={({ field }) => {
                return (
                  <Ui.FloatingDropDown
                    label={OPTION_TYPE}
                    options={
                      watch(AS) === consts.STRING
                        ? GLOBAL_FILTER_TYPE
                        : GLOBAL_FILTER_TYPE.filter(
                            (option) => option.value !== AUTO
                          )
                    }
                    buttonWidth="100%"
                    menuWidth="100%"
                    onChange={(option) => {
                      setValue(field.name, option.value);
                    }}
                    selectedOption={{
                      value: field.value,
                      label:
                        GLOBAL_FILTER_TYPE.find((f) => f.value === field.value)
                          ?.label || field.value,
                    }}
                  />
                );
              }}
            />
            {error(errors, FILTER_TYPE)}
          </div>
          {watch(FILTER_TYPE) === AUTO && (
            <>
              <Ui.FloatingDropDown
                buttonWidth="100%"
                menuWidth="100%"
                label={DATASET}
                placeholder={SELECT_A_TABLE}
                isSearchEnabled
                options={tableListOptions || []}
                onChange={(option) => {
                  const selected = schemaList?.find((schema: Schema) =>
                    isElasticSearch
                      ? schema.tableName === option.value
                      : `${schema.schemaName}.${schema.tableName}` ===
                        option.value
                  );
                  setSelectedTable({
                    tableName: option.value,
                    columnsWithDataType: getFilteredStringColumns(
                      selected!.columnsWithDataType || []
                    ),
                    selectedColumns: [],
                  });
                }}
                selectedOption={{
                  label:
                    isDatabaseTenancy && selectedTable.tableName
                      ? `${DATABASE_NAME}.${
                          selectedTable.tableName?.split('.')?.slice(-1)?.[0]
                        }`
                      : selectedTable.tableName || '',
                  value: selectedTable.tableName,
                }}
              />
              <Flex className="dbn-gap-2">
                <div className={styles.configDropdownWrapper}>
                  <Controller
                    name={NAME}
                    control={control}
                    rules={required}
                    render={({ field }) => {
                      return (
                        <>
                          <Ui.FloatingDropDown
                            buttonWidth="100%"
                            menuWidth="100%"
                            placeholder={SELECT_A_COLUMN}
                            label={CHOOSE_A_COLUMN}
                            isSearchEnabled
                            options={selectedTable.columnsWithDataType.map(
                              (col) => ({
                                label: col.name,
                                value: `${col.dataType}--${col.name}`,
                              })
                            )}
                            onChange={(option) => {
                              setValue(NAME, option.value);
                            }}
                            selectedOption={{
                              label: field?.value?.split('--')?.[1] || '',
                              value: field.value || '',
                            }}
                          />
                        </>
                      );
                    }}
                  />
                  {error(errors, NAME)}
                  <Controller
                    name={LABEL_COL}
                    control={control}
                    render={({ field }) => {
                      return (
                        <>
                          <Ui.FloatingDropDown
                            buttonWidth="100%"
                            menuWidth="100%"
                            placeholder={SELECT_A_LABEL_COL}
                            label={CHOOSE_A_LABEL_COL}
                            isSearchEnabled
                            options={selectedTable.columnsWithDataType.map(
                              (col) => ({
                                label: col.name,
                                value: `${col.dataType}--${col.name}`,
                              })
                            )}
                            onChange={(option) => {
                              setValue(LABEL_COL, option.value);
                            }}
                            selectedOption={{
                              label: field?.value?.split('--')?.[1] || '',
                              value: field.value || '',
                            }}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </Flex>
              {[consts.STRING, consts.DEFAULT, consts.BOOLEAN].includes(
                watch(AS) || ''
              ) && (
                <>
                  <>
                    {!isDatabaseTenancy && (
                      <>
                        <Ui.Checkbox
                          label={CLIENT_SCOPED}
                          onChange={({ target: { checked } }) =>
                            setValue(IS_CLIENT_SCOPED, checked)
                          }
                          checked={watch(IS_CLIENT_SCOPED)}
                        />
                        {watch(IS_CLIENT_SCOPED) && (
                          <div className={styles.configClientColumnContainer}>
                            <div className={styles.configClientColumnWrapper}>
                              <Controller
                                name={CLIENT_COLUMN}
                                control={control}
                                rules={required}
                                render={({ field }) => (
                                  <>
                                    <Ui.FloatingDropDown
                                      label="Column"
                                      buttonWidth="100%"
                                      menuWidth="100%"
                                      options={selectedTable.columnsWithDataType.map(
                                        (col) => ({
                                          label: col.name,
                                          value: col.name,
                                        })
                                      )}
                                      onChange={(option) => {
                                        setValue(field.name, option.value);
                                      }}
                                      selectedOption={{
                                        label: field.value || '',
                                        value: field.value || '',
                                      }}
                                    />
                                  </>
                                )}
                              />
                              {error(errors, CLIENT_COLUMN)}
                            </div>
                            <div className={styles.configClientColumnWrapper}>
                              <Controller
                                name={CLIENT_COLUMN_TYPE}
                                control={control}
                                rules={required}
                                render={({ field }) => (
                                  <>
                                    <Ui.FloatingDropDown
                                      label={DATATYPE}
                                      buttonWidth="100%"
                                      menuWidth="100%"
                                      options={CAST_AS_LIST.filter(
                                        (v) =>
                                          v.value === consts.STRING ||
                                          v.value === consts.NUMBER
                                      )}
                                      onChange={(option) => {
                                        setValue(field.name, option.value);
                                      }}
                                      selectedOption={{
                                        label: field.value || '',
                                        value: field.value || '',
                                      }}
                                    />
                                  </>
                                )}
                              />
                              {error(errors, CLIENT_COLUMN_TYPE)}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                  {(filterToUpdate?.isShowHorizontal || isHorizontalFilter) && (
                    <div className="">
                      <DefaultValueField
                        type={watch().as}
                        columnName={watch().name?.split('--')?.[1] || ''}
                        selectedValue={watch().defaultValue as any}
                        tableName={selectedTable.tableName}
                        onChange={(value) => setValue(DEFAULT_VALUE, value)}
                        clientColumn={watch().clientColumn}
                        clientColumnType={watch().clientColumnType}
                        isClientScoped={watch().isShowClientScoped}
                        clientId={watch().clientId}
                      />
                    </div>
                  )}
                  <Controller
                    name={DEPEND_ON}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Ui.MultiSelectDropdown
                          label={DEPEND_ON_FILTER}
                          options={
                            filters
                              ?.filter(
                                (f: any) =>
                                  [
                                    consts.STRING,
                                    consts.DEFAULT,
                                    consts.BOOLEAN,
                                  ].includes(f.as?.toLowerCase() || '') &&
                                  f.filterType === AUTO &&
                                  f?.applyOnTables?.length &&
                                  f.name !== watch(NAME)?.split('--')?.[1] &&
                                  f?.applyOnTables?.some(
                                    (t: any) =>
                                      t.tableName === selectedTable.tableName
                                  ) &&
                                  f.name &&
                                  f?.filterVariant?.value !== consts.LIKE
                              )
                              ?.map((f: any) => ({
                                value: f?.name,
                                label: f.label,
                              })) || []
                          }
                          buttonWidth="100%"
                          menuWidth="100%"
                          onChange={(option) => {
                            setValue(field.name, option);
                          }}
                          selectedOption={field.value || []}
                        />
                      );
                    }}
                  />
                </>
              )}
            </>
          )}
          {watch(FILTER_TYPE) === MANUAL && (
            <div className={styles.configManualOptionContainer}>
              {manualOptions?.map((op: any, optionIndex) => (
                <div
                  className={styles.configManualOptionWrapper}
                  key={`${op.id}`}
                >
                  <Ui.InputField
                    placeholder={OPTION_VALUE}
                    type="text"
                    value={watch(`options[${optionIndex}].value`)}
                    register={register(
                      `options[${optionIndex}].value`,
                      required
                    )}
                    error={
                      (errors?.manualOptions as any)?.[optionIndex]?.message
                    }
                  />
                  <Ui.InputField
                    placeholder={OPTION_LABEL}
                    type="text"
                    register={register(`options[${optionIndex}].label`)}
                    error={
                      (errors?.manualOptions as any)?.[optionIndex]?.message
                    }
                  />
                  <Ui.Button
                    type="button"
                    variant="tertiary"
                    className={styles.configRemoveManualOptionBtn}
                    onClick={() => removeManualOptions(optionIndex)}
                    title={REMOVE_OPTION}
                  >
                    <Ui.Icons name="delete" />
                  </Ui.Button>
                </div>
              ))}
              <div className={styles.configAddOptionBtnContainer}>
                <Ui.Button
                  type="button"
                  variant="tertiary"
                  onClick={() => appendManualOptions('')}
                  className="hover:dbn-bg-gray"
                >
                  <Ui.Icons name="plus" />
                  Add option
                </Ui.Button>
              </div>
            </div>
          )}
          {watch(FILTER_TYPE) === CUSTOM && (
            <Flex direction="col" className="dbn-gap-2">
              <Ui.TextAreaField
                rows={4}
                label={SELECT_QUERY}
                id="s"
                placeholder={ADD_YOUR_QUERY}
                rightIcon={
                  <Ui.NewTooltip
                    text={SELECT_QUERY_INFO}
                    position="right"
                    tooltipClass="dbn-w-[200px]"
                  >
                    <Ui.Icons name="info" />
                  </Ui.NewTooltip>
                }
                register={register(QUERY, required)}
                error={errors?.query}
              />
              <Ui.InputField
                label={COLUMN_NAME}
                placeholder={SELECT_COLUMN_INFO}
                register={register(COLUMN_NAME_VALUE, required)}
                error={errors?.columnName?.message}
              />
              <Ui.InputField
                label={LABEL}
                placeholder={LABEL_COLUMN_INFO}
                register={register(CUSTOM_LABEL_COL)}
                error={errors?.customLabelCol?.message}
              />
            </Flex>
          )}
          <div className={styles.configLabelContainer}>
            <Ui.InputField
              type="text"
              placeholder="eg: order purchased"
              label={SAVE_AS}
              register={register(LABEL, required)}
            />
            {error(errors, LABEL)}
          </div>
        </>
      ) : !isSearchStringVariant &&
        !!(filterToUpdate?.isShowHorizontal || isHorizontalFilter) ? (
        <div className={styles.configManualOptionContainer}>
          <DefaultValueField
            type={watch().as}
            columnName={watch().name?.split('--')?.[1] || ''}
            selectedValue={watch().defaultValue as any}
            tableName={selectedTable.tableName}
            onChange={(value) => setValue(DEFAULT_VALUE, value)}
            clientColumn={watch().clientColumn}
            clientColumnType={watch().clientColumnType}
            isClientScoped={watch().isShowClientScoped}
            clientId={watch().clientId}
          />
          <div className={styles.configLabelContainer}>
            <Ui.InputField
              type="text"
              placeholder="eg: order purchased"
              label={SAVE_AS}
              register={register(LABEL, required)}
            />
            {error(errors, LABEL)}
          </div>
        </div>
      ) : (
        <div className={styles.configLabelContainer}>
          <Ui.InputField
            type="text"
            placeholder="eg: order purchased"
            label={SAVE_AS}
            register={register(LABEL, required)}
          />
          {error(errors, LABEL)}
        </div>
      )}
    </Flex>
  );
};

const ConfigApplyOn = ({
  props: {
    setValue,
    control,
    errors,
    register,
    watch,
    isDatabaseTenancy,
    isElasticSearch,
    schemaList,
    tableListOptions,
    appendApplyOnTables,
    applyOnTables,
    removeApplyOnTables,
  },
}: {
  props: ConfigApplyOnProps;
}) => {
  return (
    <Flex direction="col" className={styles.applyOnContainer}>
      <Ui.Alert text={CONFIG_APPLY_ON_ALERT} variant="info" />

      <Flex className="dbn-gap-2">
        <Ui.RadioButton
          type="radio"
          onChange={({ target: { checked } }) =>
            setValue(IS_VARIABLE_FILTER, !checked)
          }
          checked={!watch(IS_VARIABLE_FILTER)}
          name={VARIABLE_FILTER}
          label={APPLY_ON}
        />
        <Ui.RadioButton
          type="radio"
          onChange={({ target: { checked } }) =>
            setValue(IS_VARIABLE_FILTER, checked)
          }
          checked={watch(IS_VARIABLE_FILTER)}
          name={VARIABLE_FILTER}
          label={VARIABLE_FILTER_LABEL}
        />
      </Flex>
      {!watch(IS_VARIABLE_FILTER) ? (
        <>
          {applyOnTables.map((_c, i) => (
            <Flex direction="col" className="dbn-gap-2" key={`${_c?.id}`}>
              <Flex direction="col" className="dbn-gap-1">
                <Controller
                  name={`applyOnTables[${i}].tableName`}
                  control={control}
                  rules={{
                    required: 'Table is not selected',
                  }}
                  render={({ field }) => {
                    return (
                      <>
                        <Ui.FloatingDropDown
                          buttonWidth="100%"
                          menuWidth="100%"
                          placeholder="Select a Table"
                          label="Dataset"
                          isSearchEnabled
                          options={tableListOptions || []}
                          onChange={(option) => {
                            setValue(
                              `applyOnTables[${i}].tableName`,
                              option.value
                            );
                          }}
                          selectedOption={{
                            label:
                              isDatabaseTenancy && field?.value
                                ? `${DATABASE_NAME}.${
                                    field?.value?.split('.')?.slice(-1)?.[0]
                                  }`
                                : field?.value || '',
                            value: field.value || '',
                          }}
                        />
                      </>
                    );
                  }}
                />
                {error((errors?.applyOnTables as any)?.[i], `tableName`)}
              </Flex>
              <ColumnField
                applyOnTableList={watch().applyOnTables}
                control={control}
                errors={errors}
                isElasticSearch={isElasticSearch}
                index={i}
                removeApplyOnTables={removeApplyOnTables}
                schemaList={schemaList}
                setValue={setValue}
              />
            </Flex>
          ))}
          <div className="dbn-w-full dbn-flex dbn-justify-end">
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={() => appendApplyOnTables('')}
              className="hover:dbn-bg-gray"
            >
              <Ui.Icons name="plus" />
              Add option
            </Ui.Button>
          </div>
        </>
      ) : (
        <Flex className="dbn-gap-2" direction="col">
          <Flex className="dbn-gap-2">
            <Ui.InputField
              type="text"
              register={register('variableStrings[0]', required)}
              label={
                [consts.DATE, consts.NUMBER].includes(watch(AS) || '')
                  ? 'From'
                  : 'Variable'
              }
            />
            {[consts.DATE, consts.NUMBER].includes(watch(AS) || '') && (
              <Ui.InputField
                type="text"
                register={register('variableStrings[1]', required)}
                label="To"
              />
            )}
          </Flex>
          <Flex className="dbn-gap-2">
            {watch()?.variableStrings?.[0] && (
              <Ui.Text variant="label">{`{{global_${watch()
                ?.variableStrings?.[0]?.replace('{{', '')
                ?.replace('}}', '')}}}`}</Ui.Text>
            )}
            {watch()?.variableStrings?.[1] &&
              [consts.DATE, consts.NUMBER].includes(watch(AS) || '') && (
                <Ui.Text variant="label">{`{{global_${watch()
                  ?.variableStrings?.[1]?.replace('{{', '')
                  ?.replace('}}', '')}}}`}</Ui.Text>
              )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
const CreateGlobalFilter = ({
  props: {
    onCancel,
    workspaceId,
    dashboard,
    isHorizontalFilter,
    updateFilterName,
    onSuccess,
    isNone,
    isDatabaseTenancy,
    clientId,
  },
}: {
  props: CreateGlobalFilterProps;
}) => {
  const [selectedTable, setSelectedTable] = useState<TableType>({
    tableName: '',
    columnsWithDataType: [],
    selectedColumns: [],
  });

  const [activeTab, setActiveTab] = useState<string>('filters');

  const [tab, setTab] = useState(0);
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {
    fields: manualOptions,
    append: appendManualOptions,
    remove: removeManualOptions,
  } = useFieldArray({
    control,
    name: `options`,
  });
  const {
    fields: applyOnTables,
    append: appendApplyOnTables,
    remove: removeApplyOnTables,
  } = useFieldArray({
    control,
    name: `applyOnTables`,
  });
  const { updateDashboard, isUpdatingDashboard } =
    useExternalDashboards(workspaceId);
  const { data } = useCompanyIntegrationQuery(
    {
      workspaceId,
    },
    { enabled: !!workspaceId }
  );

  const dbDetails = useMemo(
    () => ({
      name: data?.companyIntegrations?.[0]?.name,
      id: data?.companyIntegrations?.[0]?.id,
    }),
    [data?.companyIntegrations]
  );
  const filterToUpdate: types.GlobalFilterColumn | undefined = useMemo(
    () =>
      dashboard?.filters?.[0]?.columns?.find(
        (col: types.GlobalFilterColumn) => col.label === updateFilterName
      ),
    [updateFilterName, dashboard]
  );
  const onSubmitForm = async (values: FieldValues) => {
    if (tab === 0 && !updateFilterName) {
      if (!updateFilterName) {
        setValue('applyOnTables', [
          { tableName: '', columnName: '', dataType: '' },
        ]);
      }
      setTab(1);
      return;
    }
    const filterColumn: types.GlobalFilterColumn = {
      isVariableFilter: values.isVariableFilter,
      filterType: values.filterType,
      selectedTable: selectedTable.tableName,
      selectedCustomColumn:
        values.filterType === CUSTOM
          ? { columnName: values.columnName, query: values.query }
          : undefined,
      variableStrings:
        values?.variableStrings?.map(
          (v: string) =>
            `{{global_${v
              ?.replace('global_', '')
              .replace('{{', '')
              ?.replace('}}', '')}}}`
        ) || [],
      dataType: values.name?.split('--')?.[0] || '',
      name: values.name?.split('--')?.[1],
      customLabelColumn: values.customLabelCol || '',
      labelColumnName: values[LABEL_COL]?.split('--')?.[1] || '',
      labelColumnDatatype: values[LABEL_COL]?.split('--')?.[0] || '',
      as: values.as,
      isDefault: filterToUpdate
        ? filterToUpdate.isDefault
        : isNone
        ? false
        : !isHorizontalFilter || false,
      isShowHorizontal: filterToUpdate
        ? filterToUpdate.isShowHorizontal
        : isNone
        ? false
        : isHorizontalFilter || false,
      label: values.label || values.name?.split('--')?.[1],
      defaultValue:
        filterToUpdate?.isShowHorizontal || isHorizontalFilter
          ? values.defaultValue
          : undefined,
      isClientScoped: values.isClientScoped || false,
      clientColumn: values.clientColumn,
      clientColumnType: values.clientColumnType,
      isManualOptions:
        [consts.STRING, consts.BOOLEAN, consts.DEFAULT].includes(values.as) &&
        values.options?.length
          ? values.filterType === MANUAL || false
          : false,
      manualOptions: values.options || [],
      dependOn: values.dependOn || [],
      applyOnTables: values.applyOnTables || [],
      filterVariant: values.filterVariant || { value: '', label: '' },
    };
    const filters: types.GlobalFilterType[] = [
      {
        tableName:
          filterColumn?.selectedTable || dashboard?.filters?.[0]?.tableName,
        columns: dashboard?.filters?.[0]?.columns?.length
          ? [
              ...dashboard?.filters?.[0]?.columns?.filter(
                (col: types.GlobalFilterColumn) =>
                  col.label !== updateFilterName && col.label
              ),
              filterColumn,
            ]
          : [filterColumn],
      },
    ];
    if (!dashboard) return;
    await updateDashboard(
      {
        id: dashboard.id,
        set: {
          filters,
        },
      },
      {
        onSuccess: () => {
          segmentEvent('dashboard filters updated', {
            dashboardId: dashboard.id,
            dashboardName: dashboard?.name,
            isFilterEnabled: true,
            filterList: filters,
          });
          onSuccess();
        },
      }
    );
  };
  const { schemaList, isLoadingSchema } = useCompanySchema();
  const schemaTableList = useMemo(
    () =>
      !isDatabaseTenancy
        ? schemaList
        : schemaList?.filter((t) => t.schemaName === clientId),
    [clientId, isDatabaseTenancy, schemaList]
  );
  const tableListOptions = useMemo(
    () =>
      dbDetails?.name?.toLowerCase() === ELASTICSEARCH
        ? schemaTableList?.map((schema: Schema) => ({
            value: schema.tableName,
            label: schema.tableName,
          })) || []
        : schemaTableList?.map((schema: Schema) => ({
            value: `${schema.schemaName}.${schema.tableName}`,
            label: `${isDatabaseTenancy ? DATABASE_NAME : schema.schemaName}.${
              schema.tableName
            }`,
          })) || [],
    [schemaTableList, dbDetails, isDatabaseTenancy]
  );
  useEffect(() => {
    if (!filterToUpdate) return;
    const tableName =
      filterToUpdate.selectedTable || dashboard?.filters?.[0]?.tableName;
    const isAutoFilter = filterToUpdate?.filterType === 'auto';
    const currentSchema = schemaList?.find((schema: Schema) =>
      dbDetails?.name?.toLowerCase() === ELASTICSEARCH
        ? schema.tableName === tableName
        : `${schema.schemaName}.${schema.tableName}` === tableName
    );
    const applyOnTableList = filterToUpdate.applyOnTables?.length
      ? filterToUpdate.applyOnTables
      : [
          {
            tableName: dashboard?.filters?.[0]?.tableName,
            columnName: filterToUpdate.name,
            dataType: filterToUpdate.dataType,
          },
        ];
    if ((!currentSchema && isAutoFilter) || !applyOnTableList?.length) return;
    setSelectedTable({
      tableName,
      columnsWithDataType: getFilteredStringColumns(
        currentSchema?.columnsWithDataType || []
      ),
      selectedColumns: [],
    });
    const labelColName = filterToUpdate?.labelColumnName
      ? `${filterToUpdate?.labelColumnDatatype}--${filterToUpdate?.labelColumnName}`
      : '';
    const options =
      typeof (filterToUpdate.manualOptions || [])?.[0] === 'object'
        ? filterToUpdate.manualOptions || []
        : filterToUpdate.manualOptions?.map((o) => ({
            value: o,
            label: o,
          })) || [];
    const values = {
      name: `${filterToUpdate?.dataType}--${filterToUpdate?.name}`,
      as: filterToUpdate?.as,
      dataType: filterToUpdate?.dataType,
      isDefault: !!filterToUpdate?.isDefault,
      label: filterToUpdate?.label || filterToUpdate?.name,
      labelColumnName:
        filterToUpdate.filterType === 'custom'
          ? filterToUpdate?.customLabelColumn || ''
          : labelColName,
      customLabelCol: filterToUpdate?.customLabelColumn,
      isShowHorizontal: Boolean(filterToUpdate?.isShowHorizontal),
      defaultValue: filterToUpdate?.defaultValue,
      isClientScoped: Boolean(filterToUpdate?.isClientScoped),
      clientColumn: filterToUpdate?.clientColumn,
      clientColumnType: filterToUpdate?.clientColumnType,
      options: options || [],
      isManualOptions: Boolean(filterToUpdate?.isManualOptions) || false,
      dependOn: filterToUpdate?.dependOn || [],
      filterType: filterToUpdate?.filterType || AUTO,
      columnName: filterToUpdate?.selectedCustomColumn?.columnName || '',
      query: filterToUpdate?.selectedCustomColumn?.query || '',
      variableStrings:
        filterToUpdate?.variableStrings?.map(
          (v: string) =>
            `${v?.replace('{{', '')?.replace('}}', '')?.replace('global_', '')}`
        ) || [],
      isVariableFilter: filterToUpdate?.isVariableFilter,
      applyOnTables: applyOnTableList || [],
      filterVariant: filterToUpdate?.filterVariant || { value: '', label: '' },
    };
    Object.entries(values).forEach(([field, value]) => setValue(field, value));
  }, [
    filterToUpdate,
    dashboard?.filters?.[0]?.tableName,
    schemaList,
    dbDetails,
  ]);
  useEffect(() => {
    if (!updateFilterName) {
      setValue(FILTER_TYPE, AUTO);
      setValue(AS, consts.STRING);
    }
  }, [updateFilterName]);

  return (
    <div className={styles.createGlobalFilterContainer}>
      <Flex direction="col">
        {!isLoadingSchema && schemaList?.length && (
          <form
            className="dbn-w-full dbn-flex dbn-flex-col"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            {!updateFilterName ? (
              <>
                {tab === 0 && (
                  <ConfigOptions
                    props={{
                      appendManualOptions,
                      control,
                      currentFilter: watch(),
                      errors,
                      filters: dashboard?.filters?.[0]?.columns || [],
                      filterToUpdate,
                      isDatabaseTenancy: isDatabaseTenancy || false,
                      isElasticSearch: dbDetails?.name === ELASTICSEARCH,
                      isHorizontalFilter,
                      manualOptions,
                      register,
                      removeManualOptions,
                      schemaList,
                      selectedTable,
                      setSelectedTable,
                      setValue,
                      tableListOptions,
                      watch,
                    }}
                  />
                )}
                {tab === 1 && (
                  <ConfigApplyOn
                    props={{
                      appendApplyOnTables,
                      applyOnTables,
                      control,
                      errors,
                      isDatabaseTenancy: isDatabaseTenancy || false,
                      isElasticSearch: dbDetails?.name === ELASTICSEARCH,
                      register,
                      removeApplyOnTables,
                      schemaList,
                      setValue,
                      tableListOptions,
                      watch,
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <div className="dbn-w-full dbn-border-b dbn-border-secondary dbn-flex dbn-gap-0 dbn-px-4">
                  <Ui.Button
                    variant="popover"
                    className={`dbn-px-4 dbn-py-3 ${
                      activeTab === 'filters'
                        ? 'dbn-border-b-2 dbn-border-primary'
                        : ''
                    }`}
                    onClick={() => setActiveTab('filters')}
                  >
                    Filter Options
                  </Ui.Button>
                  <Ui.Button
                    variant="popover"
                    className={`dbn-px-4 dbn-py-3 ${
                      activeTab === 'apply'
                        ? 'dbn-border-b-2 dbn-border-primary'
                        : ''
                    }`}
                    onClick={() => setActiveTab('apply')}
                  >
                    Apply On
                  </Ui.Button>
                </div>
                {activeTab === 'filters' ? (
                  <ConfigOptions
                    props={{
                      appendManualOptions,
                      control,
                      currentFilter: watch(),
                      errors,
                      filters: dashboard?.filters?.[0]?.columns || [],
                      filterToUpdate,
                      isDatabaseTenancy: isDatabaseTenancy || false,
                      isElasticSearch: dbDetails?.name === ELASTICSEARCH,
                      isHorizontalFilter,
                      manualOptions,
                      register,
                      removeManualOptions,
                      schemaList,
                      selectedTable,
                      setSelectedTable,
                      setValue,
                      tableListOptions,
                      watch,
                    }}
                  />
                ) : (
                  <ConfigApplyOn
                    props={{
                      appendApplyOnTables,
                      applyOnTables,
                      control,
                      errors,
                      isDatabaseTenancy: isDatabaseTenancy || false,
                      isElasticSearch: dbDetails?.name === ELASTICSEARCH,
                      register,
                      removeApplyOnTables,
                      schemaList,
                      setValue,
                      tableListOptions,
                      watch,
                    }}
                  />
                )}
              </>
            )}
            <Flex
              justify="between"
              className="dbn-border-t dbn-border-secondary dbn-h-[60px] dbn-py-2 dbn-px-5"
            >
              {tab === 1 && !updateFilterName ? (
                <Ui.Button
                  type="reset"
                  variant="secondary"
                  onClick={() => setTab(0)}
                >
                  Prev
                </Ui.Button>
              ) : null}
              <div className="dbn-w-full dbn-flex dbn-justify-end">
                <Ui.Button
                  type="submit"
                  variant="primary"
                  isDisabled={isUpdatingDashboard}
                >
                  {tab === 0 && !updateFilterName
                    ? 'Next'
                    : isUpdatingDashboard
                    ? 'Saving...'
                    : 'Save'}
                </Ui.Button>
              </div>
            </Flex>
          </form>
        )}
        {isLoadingSchema && (
          <div className="dbn-w-full dbn-h-[300px] dbn-flex dbn-items-center dbn-justify-center">
            <Ui.Loader />
          </div>
        )}
      </Flex>
    </div>
  );
};

export default CreateGlobalFilter;
