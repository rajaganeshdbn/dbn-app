/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Ui, types } from '@databrainhq/plugin';
import { DateOptionType } from 'types';
import { ELASTICSEARCH } from 'consts/application';
import CreateNewFilter from './CreateNewFilter';
import MetricFilterList from './MetricFilterList';

export type MetricFiltersProps = {
  onCancel: () => void;
  selectedColumns: { tableName: string; columns: types.SelectedColumns[] }[];
  metricFilters: types.RlsCondition[] | undefined;
  setMetricFilters: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  dbName?: string;
  xAxisColumn: string;
};

const MetricFilters: React.FC<MetricFiltersProps> = ({
  onCancel,
  selectedColumns,
  metricFilters,
  setMetricFilters,
  dbName,
  xAxisColumn,
}) => {
  const { register, control, setValue, handleSubmit, watch, getValues } =
    useForm();
  const [error, setError] = useState('');
  const [dateOptions, setDateOptions] = useState<DateOptionType[]>([]);
  const [defaultOption, setDefaultOption] = useState<DateOptionType>();
  const [isAddManualOptions, setAddManualOption] = useState<boolean>(false);
  const [isClientScoped, setClientScoped] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('Metric Filters');

  const updateDateOptions = useCallback(
    ({
      id,
      range,
      format,
      time,
      name,
      count,
      startDate,
      endDate,
    }: Partial<DateOptionType>) => {
      if (!id) return;
      setDateOptions((prev) => {
        const index = prev.findIndex((opt) => opt.id === id);
        if (index === -1) return prev;
        const prevOptions = prev;
        if (range) {
          prevOptions[index].range = range;
          prevOptions[index].name = `${prevOptions[index].range}${
            prevOptions[index].count > 1 ? ` ${prevOptions[index].count} ` : ' '
          }${prevOptions[index].time}`.trim();
        } else if (time) {
          prevOptions[index].time = time;
          prevOptions[index].name = `${prevOptions[index].range}${
            prevOptions[index].count > 1 ? ` ${prevOptions[index].count} ` : ' '
          }${prevOptions[index].time}`.trim();
        } else if (format) prevOptions[index].format = format;
        else if (name || name === '') prevOptions[index].name = name;
        else if (count) {
          prevOptions[index].count = count;
          prevOptions[index].name = `${prevOptions[index].range}${
            prevOptions[index].count > 1 ? ` ${prevOptions[index].count} ` : ' '
          }${prevOptions[index].time}`.trim();
        } else if (startDate && endDate) {
          prevOptions[index].startDate = startDate;
          prevOptions[index].endDate = endDate;
        }
        return [...prevOptions];
      });
    },
    []
  );

  const onSubmit = (values: FieldValues) => {
    setError('');
    if (!values.isVariableFilter) {
      if (
        (values.options.length <= 0 &&
          dateOptions.length <= 0 &&
          values.datatype !== 'string') ||
        (values.options.length <= 0 &&
          dateOptions.length <= 0 &&
          values.datatype === 'string' &&
          isAddManualOptions)
      ) {
        setError('filter condition should have at least one filter option');
        return;
      }
    }
    const newFilter: types.RlsCondition = {
      isAppFilter: values.isAppFilter || false,
      name: values.name,
      columnName: values.columnName || 'none',
      position: values.position || 'top-left',
      tableName:
        dbName?.toLowerCase() === ELASTICSEARCH
          ? values.tableName?.split('.')?.slice(1)?.join('.') || 'none'
          : values.tableName || 'none',
      options:
        values.datatype === 'date'
          ? dateOptions
          : values.datatype === 'string' && !isAddManualOptions
          ? []
          : values?.options?.map(
              (v: { value: string | number }) => Number(v.value) || v.value
            ) || [],
      datatype: values.datatype,
      isAddOnMetrics: false,
      value:
        values.datatype === 'date'
          ? defaultOption?.name || dateOptions?.[0]?.name
          : values.datatype === 'string' && !isAddManualOptions
          ? []
          : values.options[0].value,
      client: isClientScoped
        ? {
            columnName: values?.clientColumName,
            isEnable: isClientScoped,
            as: values?.clientColumType,
          }
        : undefined,
      isVariableFilter: values.isVariableFilter,
      variableOptions:
        values.variableOptions?.map((v: any) => ({
          ...v,
          value: values.datatype === 'date' ? 'Custom' : v.value,
        })) || [],
      variableStrings: [
        values.variableStrings?.first,
        values.variableStrings?.second,
      ]
        .filter((v) => !!v)
        ?.map((v) => `{{${v}}}`),
      selectedVariableValue: ['string', 'number', 'boolean'].includes(
        values.datatype
      )
        ? {
            label: values?.variableOptions?.[0]?.value,
            value: values?.variableOptions?.[0]?.value,
          }
        : {
            label: values?.variableOptions?.[0]?.label,
            value: values?.variableOptions?.[0]?.label,
            startDate: values?.variableOptions?.[0]?.startDate,
            endDate: values?.variableOptions?.[0]?.endDate,
          },
    };

    setMetricFilters((prev) => [...prev, newFilter]);
    setError('');
    setActiveTab('Metric Filters');
  };

  // useEffect(() => {
  //   if (!metricFilters?.length) return;
  //   setValue('columnName', metricFilters[0].columnName);
  //   setValue('datatype', metricFilters[0].datatype);
  //   setValue('tableName', metricFilters[0].tableName);
  //   setValue('name', metricFilters[0].name);
  //   if (metricFilters[0].datatype !== 'date') {
  //     setValue(
  //       'options',
  //       metricFilters[0].options.map((option) => ({ value: option }))
  //     );
  //     setValue('default', metricFilters[0].value);
  //   } else {
  //     setDateOptions(metricFilters[0].options as DateOptionType[]);
  //     setDefaultOption(metricFilters[0].value as DateOptionType);
  //   }
  // }, [metricFilters]);

  return (
    <>
      <Ui.Tab
        activeTab={activeTab}
        options={['Metric Filters', 'Create Filter']}
        setActiveTab={setActiveTab}
        className="dbn-boder-b dbn-divide-solid"
      />
      {activeTab === 'Metric Filters' ? (
        <MetricFilterList
          conditions={metricFilters || []}
          onApply={(condition) => {
            setMetricFilters((prev) =>
              prev.map((filter) =>
                filter.columnName === condition.columnName &&
                filter.name === condition.name &&
                filter.tableName === condition.tableName
                  ? { ...filter, isAddOnMetrics: true }
                  : {
                      ...filter,
                      isAddOnMetrics:
                        filter.isAppFilter || filter.isVariableFilter
                          ? filter.isAddOnMetrics
                          : false,
                    }
              )
            );
          }}
          onRemove={(condition) => {
            setMetricFilters((prev) =>
              prev.map((filter) =>
                filter.columnName === condition.columnName &&
                filter.name === condition.name &&
                filter.tableName === condition.tableName
                  ? { ...filter, isAddOnMetrics: false }
                  : { ...filter }
              )
            );
          }}
          onDelete={(condition) => {
            setMetricFilters((prev) =>
              prev.filter(
                (filter) =>
                  filter.columnName !== condition.columnName ||
                  filter.name !== condition.name ||
                  filter.tableName !== condition.tableName
              )
            );
          }}
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="dbn-w-[990px] dbn-h-[400px] dbn-flex dbn-flex-col dbn-justify-between dbn-overflow-hidden"
        >
          <div className="dbn-pt-2 dbn-px-5 dbn-h-[95%] dbn-text-[#182C60] dbn-overflow-y-auto">
            <CreateNewFilter
              selectedColumns={selectedColumns}
              register={register}
              control={control}
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
              datatype={watch().datatype}
              xAxisColumn={xAxisColumn}
              isClientScoped={isClientScoped}
              setClientScoped={setClientScoped}
              isVariableFilter={watch().isVariableFilter}
              variableStrings={{
                first: watch().variableStrings?.first,
                second: watch().variableStrings?.second,
              }}
            />
            {!!error && <Ui.Error message={error} />}
          </div>
          <Ui.ModalFooter>
            <div className="dbn-w-full dbn-flex dbn-flex-row dbn-justify-between">
              <div className="dbn-w-[20%]">
                <Ui.FloatingDropDown
                  options={[
                    {
                      value: 'top-left',
                      label: 'top-left',
                    },
                    {
                      value: 'top-right',
                      label: 'top-right',
                    },
                  ]}
                  onChange={(option: { value: string }) =>
                    setValue('position', option.value)
                  }
                  selectedOption={{
                    label: watch('position') || 'top-left',
                    value: watch('position') || 'top-left',
                  }}
                  label="positioning"
                />
              </div>
              <div className="dbn-flex dbn-gap-2">
                <Ui.Button
                  type="button"
                  variant="tab"
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </Ui.Button>
                <Ui.Button type="submit" variant="primary">
                  <Ui.Text variant="body-text-sm" color="white">
                    Save
                  </Ui.Text>
                </Ui.Button>
              </div>
            </div>
          </Ui.ModalFooter>
        </form>
      )}
    </>
  );
};

export default React.memo(MetricFilters);
