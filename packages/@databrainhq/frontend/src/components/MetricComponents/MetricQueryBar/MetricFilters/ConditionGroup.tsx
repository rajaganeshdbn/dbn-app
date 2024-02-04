/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/forbid-elements */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useRef, useState } from 'react';
import {
  useFieldArray,
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  UseFormGetValues,
  UseFormReset,
  Controller,
} from 'react-hook-form';
import { Ui, types, hooks } from '@databrainhq/plugin';
import { DateOptionType } from 'types';
import { DATATYPES } from 'consts/application';
import { required } from 'consts/validations';
import Flex from 'components/Flex';
import styles from './metricfilter.module.css';

type SelectedTableList = {
  tableName: string;
  columns: types.SelectedColumns[];
};
export type ConditionGroupType = {
  table: string;
  column: string;
  condition: string;
  defaultValue: string;
};

type ConditionGroupProps = {
  selectedColumns: SelectedTableList[];
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
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
    startDate,
    endDate,
  }: Partial<DateOptionType>) => void;
  dateOptions: DateOptionType[];
  setDateOptions: React.Dispatch<React.SetStateAction<DateOptionType[]>>;
  setAddManualOption: React.Dispatch<React.SetStateAction<boolean>>;
  isAddManualOptions: boolean;
  datatype: string;
  xAxisColumn: string;
  setClientScoped: React.Dispatch<React.SetStateAction<boolean>>;
  isClientScoped: boolean;
};

const TimeOptions = [
  { value: 'Day', label: 'Day' },
  { value: 'Week', label: 'Week' },
  { value: 'Month', label: 'Month' },
  { value: 'Quarter', label: 'Quarter' },
  { value: 'Year', label: 'Year' },
];
const RangeOptions = [
  { value: 'Last', label: 'Last' },
  { value: 'This', label: 'This' },
  { value: 'Custom', label: 'Custom' },
];

const ConditionGroup: React.FC<ConditionGroupProps> = ({
  selectedColumns,
  register,
  setValue,
  control,
  watch,
  getValues,
  defaultOption,
  setDefaultOption,
  updateDateOptions,
  dateOptions,
  setDateOptions,
  setAddManualOption,
  isAddManualOptions,
  datatype,
  xAxisColumn,
  isClientScoped,
  setClientScoped,
}) => {
  const [isShowSchema, setShowSchema] = useState(false);
  const [selectedTable, setSelectedTable] = useState<SelectedTableList>();
  const [searchKeyword, setSearchKeyword] = useState('');

  const ref = useRef() as React.RefObject<HTMLDivElement>;

  hooks.useOutsideAlerter({
    wrapRef: ref,
    onOutsideClick: () => setShowSchema(false),
  });
  const {
    fields: valueFields,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: `options`,
  });
  const getFormatOptions = (index: number) => {
    if (dateOptions[index].time.includes('Year')) {
      return [
        { value: 'Month', label: 'Month' },
        { value: 'Quarter', label: 'Quarter' },
      ];
    }
    if (
      dateOptions[index].time.includes('Month') &&
      dateOptions[index].count === 1
    ) {
      return [
        { value: 'Date', label: 'Date' },
        { value: 'Week', label: 'Week' },
      ];
    }
    if (
      dateOptions[index].time.includes('Month') &&
      dateOptions[index].count > 1
    ) {
      return [
        { value: 'Date', label: 'Date' },
        { value: 'Month', label: 'Month' },
      ];
    }
    if (dateOptions[index].time.includes('Quarter')) {
      return [{ value: 'Month', label: 'Month' }];
    }
    if (
      dateOptions[index].time.includes('Week') &&
      dateOptions[index].count === 1
    ) {
      return [{ value: 'Day', label: 'Day' }];
    }
    return [];
  };
  return (
    <>
      <li className="dbn-flex dbn-flex-col dbn-gap-5 dbn-items-center dbn-pt-5">
        <Flex
          justify="between"
          alignItems="center"
          className="dbn-gap-5 dbn-w-full"
        >
          <div
            className="dbn-relative dbn-w-full dbn-z-50"
            ref={ref}
            onFocus={() => setShowSchema(true)}
            onBlur={() => setShowSchema(false)}
          >
            <Ui.InputField
              type="text"
              placeholder="Choose a column from a table"
              register={register('columnName', required)}
              label="column"
            />

            {isShowSchema && (
              <div className="dbn-absolute dbn-bg-white dbn-w-[580px] dbn-top-20 dbn-left-0 dbn-shadow-bs-4 dbn-border">
                <div className="dbn-relative dbn-h-10 dbn-border-b dbn-text-slate-500">
                  <span className="dbn-absolute dbn-top-2 dbn-left-3 dbn-text-xl">
                    <Ui.Icons name="magnifying-glass" />
                  </span>
                  {/* eslint-disable-next-line */}
                  <input
                    className="dbn-w-full dbn-h-full dbn-outline-none dbn-px-10"
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </div>
                <div className="dbn-flex dbn-justify-between">
                  <div className="dbn-w-1/2 dbn-border-r dbn-overflow-y-auto dbn-max-h-40">
                    <Ui.Text variant="body-text-sm">Tables</Ui.Text>
                    <ul className="dbn-p-1 dbn-pt-0">
                      {selectedColumns
                        ?.filter(
                          (schema: {
                            tableName: string;
                            columns: types.SelectedColumns[];
                          }) => schema.tableName.includes(searchKeyword)
                        )
                        .map(
                          (schema: {
                            tableName: string;
                            columns: types.SelectedColumns[];
                          }) => (
                            <li key={`${schema.tableName}`}>
                              <Ui.Button
                                variant="tertiary"
                                type="button"
                                onClick={() => {
                                  setSelectedTable(schema);
                                  setValue('tableName', schema.tableName);
                                }}
                                leftIcon={<Ui.Icons name="table" />}
                              >
                                <span className="dbn-w-full dbn-truncate dbn-ml-2 dbn-text-left">
                                  {schema.tableName}
                                </span>
                                <Ui.Icons name="not-found" />{' '}
                                {/* chevron right */}
                              </Ui.Button>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                  <div className="dbn-w-1/2 dbn-border-l dbn-overflow-y-auto dbn-max-h-40">
                    <Ui.Text variant="body-text-sm">Columns</Ui.Text>
                    <ul className="dbn-p-1 dbn-pt-0">
                      {selectedTable?.columns.map((col) => (
                        <li key={col.column}>
                          <Ui.Button
                            variant="tertiary"
                            type="button"
                            onClick={() => {
                              setValue('columnName', col.column);
                            }}
                          >
                            <div className="dbn-w-full dbn-flex dbn-justify-center">
                              <Ui.DataType datatype={col.datatype} />
                              <span className="dbn-w-full dbn-truncate dbn-ml-2 dbn-text-left">
                                {col.column}
                              </span>
                            </div>
                          </Ui.Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="dbn-w-full">
            <Controller
              control={control}
              name="datatype"
              render={({ field }) => (
                <Ui.FloatingDropDown
                  options={DATATYPES}
                  label="datatype"
                  selectedOption={{
                    label: field.value || '',
                    value: field.value || '',
                  }}
                  onChange={(option) => {
                    field.onChange(option.value);
                  }}
                />
              )}
            />
          </div>
        </Flex>
        <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2">
          {datatype === 'string' && (
            <div className="dbn-flex dbn-flex-col dbn-gap-2">
              {!isAddManualOptions && (
                <>
                  <div
                    className={`dbn-flex  dbn-items-center dbn-gap-2 ${
                      isClientScoped && 'dbn-text-blue-700'
                    }`}
                  >
                    <Ui.Button
                      variant="tertiary"
                      type="button"
                      onClick={() => {
                        setClientScoped(!isClientScoped);
                      }}
                    >
                      {isClientScoped ? (
                        <Ui.Icons name="not-found" /> // check icon
                      ) : (
                        <Ui.Icons name="not-found" /> // uncheck icon
                      )}{' '}
                      scope options to selected client
                    </Ui.Button>
                  </div>
                  {isClientScoped && (
                    <>
                      <Controller
                        control={control}
                        name="clientColumName"
                        render={({ field }) => (
                          <Ui.FloatingDropDown
                            options={
                              selectedTable?.columns.map((col) => ({
                                label: col.column,
                                value: col.column,
                              })) || []
                            }
                            label="client column"
                            selectedOption={{
                              label: field.value || '',
                              value: field.value || '',
                            }}
                            onChange={(option) => {
                              field.onChange(option.value);
                            }}
                          />
                        )}
                      />
                    </>
                  )}
                </>
              )}
              <div
                className={`dbn-flex  dbn-items-center dbn-gap-2 ${
                  isAddManualOptions && 'dbn-text-blue-700'
                }`}
              >
                <Ui.Button
                  variant="tertiary"
                  type="button"
                  onClick={() => {
                    setAddManualOption(!isAddManualOptions);
                    setValue('options', []);
                    setClientScoped(false);
                    setValue('clientColumName', undefined);
                  }}
                >
                  {isAddManualOptions ? (
                    <Ui.Icons name="not-found" /> // check icon
                  ) : (
                    <Ui.Icons name="not-found" /> // uncheck icon
                  )}{' '}
                  add manual options
                </Ui.Button>
              </div>
            </div>
          )}
          {datatype !== 'date' ? (
            <>
              {valueFields.map((field, i) => (
                <div
                  className="dbn-w-full dbn-flex dbn-gap-2 dbn-items-center"
                  key={field.id}
                >
                  {datatype === 'string' && (
                    <Ui.InputField
                      key={field.id}
                      name={`options.${i}.value`}
                      type="text"
                      register={register(`options.${i}.value`, required)}
                      placeholder="enter a value"
                    />
                  )}
                  {datatype === 'boolean' && (
                    <Ui.InputField
                      key={field.id}
                      name={`options.${i}.value`}
                      type=""
                      register={register(`options.${i}.value`, required)}
                      placeholder="enter a value"
                    />
                  )}
                  {datatype === 'number' && (
                    <Ui.InputField
                      key={field.id}
                      name={`options.${i}.value`}
                      type="number"
                      register={register(`options.${i}.value`, required)}
                      placeholder="enter a value"
                    />
                  )}

                  <Ui.Button
                    type="button"
                    variant="tertiary"
                    onClick={() => remove(i)}
                    leftIcon={<Ui.Icons name="cross" />}
                  />
                </div>
              ))}

              {datatype === 'string' && isAddManualOptions ? (
                <div className="dbn-w-full dbn-flex dbn-justify-center">
                  <Ui.Button
                    variant="secondary"
                    type="button"
                    onClick={() => append('')}
                    leftIcon={<Ui.Icons name="plus" />}
                  >
                    Add new condition group
                  </Ui.Button>
                </div>
              ) : (
                datatype !== 'string' && (
                  <div className="dbn-w-full dbn-flex dbn-justify-center">
                    <Ui.Button
                      variant="secondary"
                      type="button"
                      onClick={() => append('')}
                      leftIcon={<Ui.Icons name="plus" />}
                    >
                      Add new condition group
                    </Ui.Button>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              {dateOptions.map((field, index) => (
                <>
                  <Flex
                    direction="col"
                    justify="center"
                    className="dbn-gap-5 dbn-border dbn-rounded-md dbn-divide-solid dbn-px-2 dbn-py-4"
                  >
                    <div className="dbn-flex dbn-gap-4 dbn-items-center">
                      {/* <Ui.Text variant="body-text-sm">
                        If
                      </Ui.Text> */}
                      {field.range === 'Custom' && (
                        <div className="dbn-w-1/2">
                          <Ui.DateRangePicker
                            label="Select default value"
                            onChange={(option) => {
                              updateDateOptions({
                                id: field.id,
                                startDate: option?.startDate,
                                endDate: option?.endDate,
                              });
                            }}
                          />
                        </div>
                      )}
                      <div className="dbn-w-1/2">
                        <Ui.FloatingDropDown
                          options={RangeOptions || []}
                          label="Range"
                          selectedOption={{
                            label: watch('range') || '',
                            value: watch('range') || '',
                          }}
                          onChange={(option) => {
                            setValue('range', option.value);
                            updateDateOptions({
                              id: field.id,
                              range: option.value,
                            });
                          }}
                          labelVariant="floating"
                        />
                      </div>

                      {/* <Ui.Text variant="body-text-sm">
                        is
                      </Ui.Text> */}
                      {dateOptions[index].range === 'Last' &&
                        dateOptions[index].time !== 'Quarter' && (
                          <>
                            <div className="dbn-w-1/2">
                              <Ui.InputField
                                type="number"
                                min={1}
                                value={field.count}
                                onChange={({ target: { value } }) =>
                                  updateDateOptions({
                                    id: field.id,
                                    count:
                                      Number(value) < 0
                                        ? -1 * Number(value)
                                        : Number(value),
                                  })
                                }
                                placeholder="Count: Number eg. 5"
                                onKeyDown={(e) => {
                                  if (e.key === '.') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </div>
                            {/* <Ui.Text variant="body-text-sm">
                              ,
                            </Ui.Text> */}
                          </>
                        )}
                      {dateOptions[index].range !== 'Custom' && (
                        <>
                          <div className="dbn-w-1/2">
                            <Ui.FloatingDropDown
                              options={TimeOptions}
                              label="Time"
                              selectedOption={{
                                label: watch('time') || '',
                                value: watch('time') || '',
                              }}
                              onChange={(option) => {
                                setValue('time', option.value);
                                updateDateOptions({
                                  id: field.id,
                                  time: option.value,
                                });
                              }}
                              labelVariant="floating"
                            />
                          </div>
                          {getFormatOptions(index).length > 0 && (
                            <>
                              {watch().columnName === xAxisColumn && (
                                <div className="dbn-w-1/2">
                                  <Ui.FloatingDropDown
                                    options={getFormatOptions(index)}
                                    label="Group By Format"
                                    selectedOption={{
                                      label: watch('format') || '',
                                      value: watch('format') || '',
                                    }}
                                    onChange={(option) => {
                                      setValue('format', option.value);
                                      updateDateOptions({
                                        id: field.id,
                                        format: option.value,
                                      });
                                    }}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div>
                      <div className="dbn-w-full">
                        <Ui.InputField
                          type="text"
                          placeholder="Enter the condition name"
                          onChange={({ target: { value } }) =>
                            updateDateOptions({ id: field.id, name: value })
                          }
                          label="Save condition as"
                          value={dateOptions[index].name}
                        />
                      </div>
                      <div className="dbn-w-full dbn-flex dbn-flex-row dbn-justify-between dbn-mt-2">
                        <Ui.Checkbox
                          checked={defaultOption?.id === field.id}
                          onChange={({ target: { checked } }) =>
                            checked && setDefaultOption(field)
                          }
                          label="Mark this condition as default"
                        />
                        <Ui.Button
                          type="button"
                          variant="tertiary"
                          onClick={() => {
                            setDateOptions((prev) =>
                              prev.filter((opt) => opt.id !== field.id)
                            );
                            if (field.id === defaultOption?.id)
                              setDefaultOption(dateOptions[0]);
                          }}
                          leftIcon={<Ui.Icons name="cross" />}
                        />
                      </div>
                    </div>
                  </Flex>
                </>
              ))}
              <div className="dbn-w-full dbn-flex dbn-justify-center">
                <Ui.Button
                  variant="tertiary"
                  type="button"
                  onClick={() =>
                    setDateOptions((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        range: '',
                        time: '',
                        format: '',
                        name: '',
                        count: 1,
                      },
                    ])
                  }
                  leftIcon={<Ui.Icons name="plus" />}
                >
                  Add new condition group
                </Ui.Button>
              </div>
            </>
          )}
          <div className={styles.appFilterCheckBox}>
            <Ui.InputField
              type="checkbox"
              label="App filter"
              register={register('isAppFilter')}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default React.memo(ConditionGroup);
