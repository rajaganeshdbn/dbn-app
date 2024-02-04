/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect } from 'react';
import { types, Ui } from '@databrainhq/plugin';
import {
  Control,
  Controller,
  FieldValues,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { DateOptionType } from 'types';
import { required } from 'consts/validations';
import { DATATYPES } from 'consts/application';
import ConditionGroup from './ConditionGroup';
import styles from './metricfilter.module.css';

export type RlsFilterType = types.RlsCondition & {
  name: string;
};

type CreateNewFilterProps = {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  selectedColumns: { tableName: string; columns: types.SelectedColumns[] }[];
  watch: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  defaultOption: DateOptionType | undefined;
  setDefaultOption: React.Dispatch<
    React.SetStateAction<DateOptionType | undefined>
  >;
  updateDateOptions: ({
    id,
    range,
    format,
    time,
    name,
  }: Partial<DateOptionType>) => void;
  dateOptions: DateOptionType[];
  setDateOptions: React.Dispatch<React.SetStateAction<DateOptionType[]>>;
  setAddManualOption: React.Dispatch<React.SetStateAction<boolean>>;
  isAddManualOptions: boolean;
  datatype: string;
  xAxisColumn: string;
  setClientScoped: React.Dispatch<React.SetStateAction<boolean>>;
  isClientScoped: boolean;
  isVariableFilter: boolean;
  variableStrings: { first: string; second: string };
};

const CreateNewFilter: React.FC<CreateNewFilterProps> = ({
  selectedColumns,
  register,
  control,
  setValue,
  watch,
  getValues,
  defaultOption,
  dateOptions,
  setDateOptions,
  setDefaultOption,
  updateDateOptions,
  setAddManualOption,
  isAddManualOptions,
  datatype,
  xAxisColumn,
  isClientScoped,
  setClientScoped,
  isVariableFilter,
  variableStrings,
}) => {
  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `variableOptions`,
  });
  useEffect(() => {
    if (isVariableFilter && optionFields.length === 0) {
      setValue('datatype', 'string');
      append('');
    }
  }, [isVariableFilter, append, optionFields, setValue]);
  return (
    <>
      <Ui.InputField
        label="Filter Name"
        type="text"
        placeholder="eg. Region Filter"
        register={register('name', required)}
      />
      <div className={styles.customFilterCheckBox}>
        <Ui.InputField
          type="checkbox"
          label="Metric variables"
          className={styles.checkboxTooltipWrapper}
          register={register('isVariableFilter')}
        />
      </div>
      <Ui.Text variant="label">Condition</Ui.Text>
      <div className="dbn-mt-3 dbn-p-5 dbn-border dbn-rounded-md">
        {!isVariableFilter ? (
          <ConditionGroup
            register={register}
            control={control}
            selectedColumns={selectedColumns}
            setValue={setValue}
            watch={watch}
            getValues={getValues}
            defaultOption={defaultOption}
            dateOptions={dateOptions}
            setDateOptions={setDateOptions}
            setDefaultOption={setDefaultOption}
            updateDateOptions={updateDateOptions}
            isAddManualOptions={isAddManualOptions}
            setAddManualOption={setAddManualOption}
            datatype={datatype}
            xAxisColumn={xAxisColumn}
            isClientScoped={isClientScoped}
            setClientScoped={setClientScoped}
          />
        ) : (
          <div className="dbn-flex dbn-flex-col dbn-gap-5">
            <div className="dbn-w-full">
              <Controller
                name="datatype"
                control={control}
                render={({ field }) => (
                  <Ui.FloatingDropDown
                    buttonWidth="100%"
                    label="Select Datatype"
                    options={DATATYPES}
                    selectedOption={{
                      value: field.value,
                      label: field.value,
                    }}
                    onChange={(option) => {
                      field.onChange(option.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="dbn-flex dbn-gap-5 dbn-items-center">
              <Ui.InputField
                label={
                  datatype === 'date'
                    ? 'Variable From string'
                    : 'Variable String'
                }
                type="text"
                placeholder={
                  datatype === 'date' ? 'eg. created_from' : 'eg. city_name'
                }
                register={register('variableStrings.first', required)}
              />
              {['date'].includes(datatype) && (
                <Ui.InputField
                  label={
                    datatype === 'date'
                      ? 'Variable To string'
                      : 'Variable String'
                  }
                  type="text"
                  placeholder={
                    datatype === 'date' ? 'eg. created_to' : 'eg. city_name'
                  }
                  register={register('variableStrings.second', required)}
                />
              )}
            </div>
            <div className="dbn-flex dbn-gap-2 dbn-items-center">
              {variableStrings?.first && (
                <Ui.Text variant="label">{`{{${variableStrings?.first}}}`}</Ui.Text>
              )}
              {variableStrings?.second && (
                <Ui.Text variant="label">{`{{${variableStrings?.second}}}`}</Ui.Text>
              )}
            </div>
            {['string', 'boolean', 'default', 'number'].includes(datatype) &&
              optionFields.map((field, i) => (
                <div
                  className="dbn-w-full dbn-flex dbn-gap-2 dbn-items-center"
                  key={field.id}
                >
                  <Ui.InputField
                    key={field.id}
                    name={`variableOptions.${i}.value`}
                    type={datatype === 'number' ? datatype : 'text'}
                    register={register(`variableOptions.${i}.value`, required)}
                    placeholder="enter a value"
                  />

                  <Ui.Button
                    type="button"
                    variant="tertiary"
                    className=""
                    onClick={() => remove(i)}
                  >
                    <Ui.Icons name="cross" />
                  </Ui.Button>
                </div>
              ))}
            {['date'].includes(datatype) && (
              <div className="dbn-flex dbn-items-center dbn-gap-5 dbn-w-full">
                <div className="dbn-w-1/2">
                  <Ui.DateRangePicker
                    label="Select default value"
                    onChange={(option) => {
                      setValue(
                        `variableOptions.0.startDate`,
                        option?.startDate
                      );
                      setValue(`variableOptions.0.endDate`, option?.endDate);
                    }}
                  />
                </div>
                <div className="dbn-w-1/2">
                  <Ui.InputField
                    type="text"
                    placeholder="Enter the condition name"
                    register={register(`variableOptions.0.label`, required)}
                    label="Save condition as"
                    defaultValue="Custom"
                  />
                </div>
              </div>
            )}
            {['string', 'boolean', 'default', 'number'].includes(datatype) && (
              <div className="dbn-w-full dbn-flex dbn-justify-center">
                <Ui.Button
                  variant="tertiary"
                  type="button"
                  onClick={() => append('')}
                >
                  <Ui.Icons name="plus" /> Add new condition group
                </Ui.Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(CreateNewFilter);
