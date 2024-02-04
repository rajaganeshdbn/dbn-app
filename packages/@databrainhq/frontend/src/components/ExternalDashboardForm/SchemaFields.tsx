/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { Schema } from 'types';
import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  Controller,
} from 'react-hook-form';
import { useCompanyIntegrationQuery } from 'utils/generated/graphql';
import { Ui, types } from '@databrainhq/plugin';
import { CAST_AS_LIST, ELASTICSEARCH } from 'consts/application';
import {
  CLIENT_SCOPED,
  FILTERDEFAULT,
  HORIZONTAL,
  MANUAL_OPTION,
} from 'consts/labels';
import { required } from 'consts/validations';
import useCompanySchema from 'hooks/useCompanySchema';
import useWorkspace from 'hooks/useWorkspace';
import DefaultValueField from './DefaultValueField';

// TODO test if selected datatype is supported by column
type TableType = Omit<Schema, 'columns' | 'id' | 'schemaName'> & {
  selectedColumns: Schema['columnsWithDataType'];
};

export type FilterType = {
  tableName: string;
  columns: Schema['columnsWithDataType'];
  as: string;
};

type SchemaFieldsProps = {
  control: Control<FieldValues>;
  defaultValues?: FilterType[];
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  showDefaultValueField: (index: number) => {
    isShow: boolean;
    type: string;
    value?: string;
    name: string;
    isShowClientScoped?: boolean;
    clientColumn?: string;
    clientColumnType?: string;
    clientId?: string;
    isManualOptions?: boolean;
    manualOptions?: string[];
    dependOn?: types.FloatingDropDownOption[];
    label?: string;
    isShowHorizontal?: boolean;
    isDefault?: boolean;
  };
  isHorizontalFilter?: boolean;
  error?: any;
  globalFilters: Schema['columnsWithDataType'];
  updateFilter?: {
    isUpdate: boolean;
    isDelete: boolean;
    name: string;
  };
};

const SchemaFields: React.FC<SchemaFieldsProps> = ({
  control,
  defaultValues,
  setValue,
  register,
  showDefaultValueField,
  error,
  globalFilters,
  isHorizontalFilter,
  updateFilter,
}) => {
  const [selectedTable, setSelectedTable] = useState<TableType>({
    tableName: '',
    columnsWithDataType: [],
    selectedColumns: [],
  });
  const { schemaList, isLoadingSchema } = useCompanySchema();
  const { workspace } = useWorkspace();
  const {
    fields: columnFields,
    append: appendColumnField,
    remove: removeColumnField,
    insert: insertColumnField,
  } = useFieldArray({
    control,
    name: `columns`,
  });

  control.register('filters');
  const { data } = useCompanyIntegrationQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: !!workspace?.id }
  );

  const dbDetails = useMemo(
    () => ({
      name: data?.companyIntegrations[0]?.name,
      id: data?.companyIntegrations[0]?.id,
    }),
    [data?.companyIntegrations]
  );
  useEffect(() => {
    if (!defaultValues || !defaultValues.length) return;
    const currentSchema = schemaList?.find((schema: Schema) =>
      dbDetails?.name?.toLowerCase() === ELASTICSEARCH
        ? schema.tableName === defaultValues[0].tableName
        : `${schema.schemaName}.${schema.tableName}` ===
          defaultValues[0].tableName
    );
    if (!currentSchema) return;
    setSelectedTable({
      tableName: defaultValues[0].tableName,
      columnsWithDataType: currentSchema.columnsWithDataType,
      selectedColumns: defaultValues[0].columns,
    });
    setValue('filters', [
      {
        tableName: defaultValues[0].tableName,
        columns: [],
      },
    ]);
    // setValue(
    //   'columns',
    // defaultValues[0].columns.map((col) => ({
    //   name: `${col.dataType}--${col.name}`,
    //   as: col.as,
    //   isDefault: !!col.isDefault,
    //   label: col.label || col.name,
    //   isShowHorizontal: Boolean(col.isShowHorizontal),
    //   defaultValue: col.defaultValue,
    //   isClientScoped: Boolean(col.isClientScoped),
    //   clientColumn: col.clientColumn,
    //   clientColumnType: col.clientColumnType,
    //   manualOptions: col.manualOptions || [],
    //   isManualOptions: Boolean(col.isManualOptions) || false,
    //   dependOn: col.dependOn || [],
    // }))
    // );
    const updateCol = defaultValues?.[0]?.columns?.find(
      (item) => item.name === updateFilter?.name
    );
    if (defaultValues?.[0]?.columns?.length && !columnFields.length) {
      insertColumnField(
        0,
        updateFilter?.name && updateCol
          ? {
              name: `${updateCol?.dataType}--${updateCol?.name}`,
              as: updateCol?.as,
              dataType: updateCol?.dataType,
              isDefault: !!updateCol?.isDefault,
              label: updateCol?.label || updateCol?.name,
              isShowHorizontal: Boolean(updateCol?.isShowHorizontal),
              defaultValue: updateCol?.defaultValue,
              isClientScoped: Boolean(updateCol?.isClientScoped),
              clientColumn: updateCol?.clientColumn,
              clientColumnType: updateCol?.clientColumnType,
              manualOptions: updateCol?.manualOptions || [],
              isManualOptions: Boolean(updateCol?.isManualOptions) || false,
              dependOn: updateCol?.dependOn || [],
            }
          : ''
      );
    }
  }, [defaultValues, schemaList]);

  useEffect(() => {
    if (selectedTable.tableName)
      setValue('filters', [
        {
          tableName: selectedTable.tableName,
        },
      ]);
    else setValue('filters', []);
  }, [selectedTable]);
  const addOption = (columnIndex: number) => {
    setValue(`columns[${columnIndex}].manualOptions`, [
      ...(showDefaultValueField(columnIndex).manualOptions || []),
      '',
    ]);
  };
  const removeOption = (columnIndex: number, optionIndex: number) => {
    const updatedOptions =
      showDefaultValueField(columnIndex).manualOptions || [];
    if (optionIndex >= 0 && optionIndex < updatedOptions.length)
      updatedOptions.splice(optionIndex, 1);
    setValue(`columns[${columnIndex}].manualOptions`, updatedOptions);
  };
  return (
    <div className="dbn-flex dbn-flex-col dbn-gap-[22px] dbn-min-h-[300px]">
      {!isLoadingSchema && (
        <Ui.FloatingDropDown
          buttonWidth="100%"
          menuWidth="550px"
          label="Dataset"
          placeholder="Select A Table"
          isSearchEnabled
          isDisabled={!!defaultValues?.[0]?.tableName}
          options={
            dbDetails?.name?.toLowerCase() === ELASTICSEARCH
              ? schemaList?.map((schema: Schema) => ({
                  value: schema.tableName,
                  label: schema.tableName,
                })) || []
              : schemaList?.map((schema: Schema) => ({
                  value: `${schema.schemaName}.${schema.tableName}`,
                  label: `${schema.schemaName}.${schema.tableName}`,
                })) || []
          }
          onChange={(option) => {
            removeColumnField(columnFields.map((v, i) => i));
            const selected = schemaList?.find((schema: Schema) =>
              dbDetails?.name?.toLowerCase() === ELASTICSEARCH
                ? schema.tableName === option.value
                : `${schema.schemaName}.${schema.tableName}` === option.value
            );
            setSelectedTable({
              tableName: option.value,
              columnsWithDataType: selected!.columnsWithDataType,
              selectedColumns: [],
            });
            if (selected?.columnsWithDataType) {
              insertColumnField(0, '');
            }
          }}
          selectedOption={{
            label: selectedTable.tableName,
            value: selectedTable.tableName,
          }}
        />
      )}

      <div className="dbn-flex dbn-flex-col dbn-gap-3 dbn-grow">
        {(!!isLoadingSchema || !selectedTable.tableName) && (
          <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-5 dbn-items-center dbn-justify-center dbn-grow">
            {isLoadingSchema && <Ui.Loader />}
            {!isLoadingSchema && !selectedTable.tableName && (
              <Ui.Alert text="Please select a table" />
            )}
          </div>
        )}
        {!isLoadingSchema && selectedTable.tableName && (
          <>
            {columnFields.length ? (
              <div className="dbn-flex dbn-flex-col dbn-gap-3">
                {columnFields?.map((columnField, index) => {
                  return (
                    <div
                      className="dbn-border dbn-border-blue-h5/[30%] dbn-border-dashed dbn-rounded-sm dbn-p-4 dbn-flex dbn-gap-2 dbn-flex-col"
                      key={columnField.id}
                    >
                      <div
                        className="dbn-w-full dbn-flex dbn-gap-2 dbn-flex-col"
                        key={columnField.id}
                      >
                        <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
                          <Controller
                            name={`columns.${index}.name`}
                            control={control}
                            rules={{ required: 'Column is not selected' }}
                            render={() => {
                              return (
                                <>
                                  <Ui.FloatingDropDown
                                    buttonWidth="100%"
                                    menuWidth="615px"
                                    placeholder="Select a column"
                                    label="Choose A Column"
                                    isSearchEnabled
                                    options={selectedTable.columnsWithDataType.map(
                                      (col) => ({
                                        label: col.name,
                                        value: `${col.dataType}--${col.name}`,
                                      })
                                    )}
                                    onChange={(option) => {
                                      setValue(
                                        `columns[${index}].name`,
                                        option.value
                                      );
                                    }}
                                    selectedOption={{
                                      label:
                                        showDefaultValueField(index).name || '',
                                      value:
                                        showDefaultValueField(index).name || '',
                                    }}
                                  />
                                </>
                              );
                            }}
                          />
                          {error?.columns?.[`${index}`]?.name && (
                            <div className="dbn-flex dbn-items-center dbn-gap-1">
                              <Ui.Icons name="info" size="xs" color="alert" />
                              <Ui.Text variant="body-text-sm" color="alert">
                                {error.columns[`${index}`].name.message}
                              </Ui.Text>
                            </div>
                          )}
                        </div>
                        <div className="dbn-w-full dbn-flex dbn-gap-4">
                          <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
                            <Controller
                              name={`columns[${index}].as`}
                              control={control}
                              rules={{ required: 'Datatype is required' }}
                              render={({ field }) => {
                                return (
                                  <Ui.FloatingDropDown
                                    label="Datatype"
                                    options={CAST_AS_LIST}
                                    buttonWidth="100%"
                                    menuWidth="300px"
                                    onChange={(option) => {
                                      setValue(field.name, option.value);
                                    }}
                                    selectedOption={{
                                      label:
                                        showDefaultValueField(index).type || '',
                                      value:
                                        showDefaultValueField(index).type || '',
                                    }}
                                  />
                                );
                              }}
                            />
                            {error.columns?.[`${index}`]?.as && (
                              <div className="dbn-flex dbn-items-center dbn-gap-1">
                                <Ui.Icons name="info" size="xs" color="alert" />
                                <Ui.Text variant="body-text-sm" color="alert">
                                  {error.columns[`${index}`].as.message}
                                </Ui.Text>
                              </div>
                            )}
                          </div>
                          <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
                            <Ui.InputField
                              type="text"
                              placeholder="eg: order purchased"
                              label="Save As"
                              register={register(
                                `columns.${index}.label`,
                                required
                              )}
                            />
                            {error?.columns?.[`${index}`]?.label && (
                              <div className="dbn-flex dbn-items-center dbn-gap-1">
                                <Ui.Icons name="info" size="xs" color="alert" />
                                <Ui.Text variant="body-text-sm" color="alert">
                                  {error.columns[`${index}`].label.message}
                                </Ui.Text>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <Ui.Checkbox
                          label={FILTERDEFAULT}
                          onChange={({ target: { checked } }) =>
                            setValue(`columns.${index}.isDefault`, checked)
                          }
                          checked={showDefaultValueField(index).isDefault}
                        />
                        <Ui.Checkbox
                          label={HORIZONTAL}
                          onChange={({ target: { checked } }) =>
                            setValue(
                              `columns.${index}.isShowHorizontal`,
                              checked
                            )
                          }
                          checked={
                            showDefaultValueField(index).isShowHorizontal
                          }
                        /> */}
                        {['string', 'default', 'boolean'].includes(
                          showDefaultValueField(index).type
                        ) && (
                          <>
                            <Ui.Checkbox
                              label={MANUAL_OPTION}
                              onChange={({ target: { checked } }) =>
                                setValue(
                                  `columns.${index}.isManualOptions`,
                                  checked
                                )
                              }
                              checked={
                                showDefaultValueField(index).isManualOptions
                              }
                            />

                            {showDefaultValueField(index).isManualOptions && (
                              <div className="dbn-flex dbn-flex-col dbn-gap-2">
                                {showDefaultValueField(
                                  index
                                ).manualOptions?.map((op, optionIndex) => (
                                  <div className="dbn-flex dbn-gap-5 dbn-items-center">
                                    <Ui.InputField
                                      placeholder="option value"
                                      type="text"
                                      register={register(
                                        `columns[${index}].manualOptions[${optionIndex}]`
                                      )}
                                    />
                                    <Ui.Button
                                      type="button"
                                      variant="tertiary"
                                      className="dbn-flex dbn-text-blue-700 dbn-items-center dbn-ml-auto dbn-w-fit dbn-text-sm"
                                      onClick={() =>
                                        removeOption(index, optionIndex)
                                      }
                                      title="remove option"
                                    >
                                      <Ui.Icons name="delete" />
                                    </Ui.Button>
                                  </div>
                                ))}
                                <div className="dbn-w-full dbn-flex dbn-justify-end">
                                  <Ui.Button
                                    type="button"
                                    variant="tertiary"
                                    onClick={() => addOption(index)}
                                  >
                                    <Ui.Icons name="plus" />
                                    Add option
                                  </Ui.Button>
                                </div>
                              </div>
                            )}
                            {!showDefaultValueField(index).isManualOptions && (
                              <>
                                <Ui.Checkbox
                                  label={CLIENT_SCOPED}
                                  onChange={({ target: { checked } }) =>
                                    setValue(
                                      `columns.${index}.isClientScoped`,
                                      checked
                                    )
                                  }
                                  checked={
                                    showDefaultValueField(index)
                                      .isShowClientScoped
                                  }
                                />

                                {showDefaultValueField(index)
                                  .isShowClientScoped && (
                                  <div className="dbn-w-full dbn-flex dbn-gap-4">
                                    <div className="dbn-w-1/2 dbn-flex dbn-flex-col dbn-gap-1">
                                      <Controller
                                        name={`columns.${index}.clientColumn`}
                                        control={control}
                                        rules={{
                                          required: 'Column is not selected',
                                        }}
                                        render={({ field }) => (
                                          <>
                                            <Ui.FloatingDropDown
                                              label="Column"
                                              buttonWidth="100%"
                                              menuWidth="300px"
                                              options={selectedTable.columnsWithDataType.map(
                                                (col) => ({
                                                  label: col.name,
                                                  value: col.name,
                                                })
                                              )}
                                              onChange={(option) => {
                                                setValue(
                                                  field.name,
                                                  option.value
                                                );
                                              }}
                                              selectedOption={{
                                                label:
                                                  showDefaultValueField(index)
                                                    .clientColumn || '',
                                                value:
                                                  showDefaultValueField(index)
                                                    .clientColumn || '',
                                              }}
                                            />
                                          </>
                                        )}
                                      />
                                      {error?.columns?.[`${index}`]
                                        ?.clientColumn && (
                                        <Ui.Text variant="label">
                                          <Ui.Icons name="info" />
                                          {
                                            error.columns[`${index}`]
                                              .clientColumn.message
                                          }
                                        </Ui.Text>
                                      )}
                                    </div>
                                    <div className="dbn-w-1/2 dbn-flex dbn-flex-col dbn-gap-1">
                                      <Controller
                                        name={`columns[${index}].clientColumnType`}
                                        control={control}
                                        rules={{
                                          required: 'Datatype is required',
                                        }}
                                        render={({ field }) => (
                                          <>
                                            <Ui.FloatingDropDown
                                              label="Datatype"
                                              buttonWidth="100%"
                                              menuWidth="300px"
                                              options={CAST_AS_LIST.filter(
                                                (v) =>
                                                  v.value === 'string' ||
                                                  v.value === 'number'
                                              )}
                                              onChange={(option) => {
                                                setValue(
                                                  field.name,
                                                  option.value
                                                );
                                              }}
                                              selectedOption={{
                                                label:
                                                  showDefaultValueField(index)
                                                    .clientColumnType || '',
                                                value:
                                                  showDefaultValueField(index)
                                                    .clientColumnType || '',
                                              }}
                                            />
                                          </>
                                        )}
                                      />
                                      {error.columns?.[`${index}`]
                                        ?.clientColumnType && (
                                        <Ui.Text variant="label">
                                          <Ui.Icons name="info" />
                                          {
                                            error.columns[`${index}`]
                                              .clientColumnType.message
                                          }
                                        </Ui.Text>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            {!showDefaultValueField(index).isManualOptions && (
                              <Controller
                                name={`columns[${index}].dependOn`}
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <Ui.MultiSelectDropdown
                                      label="Depend On"
                                      options={
                                        globalFilters
                                          ?.map((filter) => ({
                                            label: filter.label || '',
                                            value:
                                              filter?.name?.split('--')?.[1] ||
                                              '',
                                            labelType: filter.as,
                                          }))
                                          ?.filter(
                                            (f) =>
                                              [
                                                'string',
                                                'default',
                                                'boolean',
                                              ].includes(
                                                f.labelType?.toLowerCase() || ''
                                              ) &&
                                              f.label &&
                                              f.value &&
                                              showDefaultValueField(index)
                                                .label !== f.label
                                          ) || []
                                      }
                                      buttonWidth="100%"
                                      menuWidth="615px"
                                      onChange={(option) => {
                                        setValue(field.name, option);
                                      }}
                                      selectedOption={
                                        showDefaultValueField(index).dependOn ||
                                        []
                                      }
                                    />
                                  );
                                }}
                              />
                            )}
                          </>
                        )}
                        {showDefaultValueField(index).isShow &&
                          !showDefaultValueField(index).isManualOptions && (
                            <div className="dbn-mt-0.5">
                              <DefaultValueField
                                type={showDefaultValueField(index).type}
                                columnName={showDefaultValueField(index).name}
                                selectedValue={
                                  showDefaultValueField(index).value as any
                                }
                                tableName={selectedTable.tableName}
                                onChange={(value) =>
                                  setValue(
                                    `columns.${index}.defaultValue`,
                                    value
                                  )
                                }
                                clientColumn={
                                  showDefaultValueField(index).clientColumn
                                }
                                clientColumnType={
                                  showDefaultValueField(index).clientColumnType
                                }
                                isClientScoped={
                                  showDefaultValueField(index)
                                    .isShowClientScoped
                                }
                                clientId={showDefaultValueField(index).clientId}
                              />
                            </div>
                          )}

                        {/* <div className="dbn-flex dbn-justify-end dbn-mt-4">
                          <Ui.Button
                            type="button"
                            variant="popover"
                            color="alert"
                            onClick={() => removeColumnField(index)}
                            leftIcon={<Ui.Icons name="delete" color="alert" />}
                          >
                            <Ui.Text color="alert" variant="body-text-sm">
                              Remove Filter
                            </Ui.Text>
                          </Ui.Button>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-5 dbn-items-center dbn-justify-center dbn-grow">
                <Ui.Alert text="Please add a filter to proceed" />
              </div>
            )}
          </>
        )}
      </div>
      {/* {selectedTable.columnsWithDataType.length > columnFields.length ? (
        <div className="dbn-w-full dbn-flex dbn-justify-end">
          <Ui.Button
            type="button"
            variant="tertiary"
            onClick={() => appendColumnField('')}
          >
            <Ui.Icons name="plus" /> Add Another Filter
          </Ui.Button>
        </div>
      ) : null} */}
    </div>
  );
};

export default React.memo(SchemaFields);
