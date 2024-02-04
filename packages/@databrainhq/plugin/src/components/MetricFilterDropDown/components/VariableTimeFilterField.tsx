/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react';
import { DateRangePicker, FloatingDropDown } from '@/components';
import {
  CustomOption,
  FloatingDropDownOption,
  MetricFilterDemoThemeType,
  OnChangeFilterValueType,
  RlsCondition,
} from '@/types';

type VariableTimeFilterFieldProps = {
  filter: RlsCondition;
  dropdownTheme?: MetricFilterDemoThemeType;
  onChangeFilterValue: OnChangeFilterValueType;
};
export const VariableTimeFilterField = ({
  props: { filter, dropdownTheme, onChangeFilterValue },
}: {
  props: VariableTimeFilterFieldProps;
}) => {
  const isDate = filter?.datatype === 'date';
  const selectedValue = filter?.selectedVariableValue?.value as string;
  const selectedlabel = filter?.selectedVariableValue?.label as string;
  const options = isDate ? (filter.variableOptions as CustomOption[]) : [];
  const customSingleDate =
    isDate && options.find((o) => o.range === 'Custom Date');
  const dateRangePicker =
    isDate && options.find((o) => o.range === 'Date Range');
  const selectedOption: FloatingDropDownOption = {
    label: selectedValue || (options[0]?.value as string),
    value: selectedlabel || options[0]?.label,
  };
  if (!isDate) return <></>;

  return (
    <>
      {dateRangePicker && (
        <div>
          <DateRangePicker
            label={filter.name}
            variant={
              dropdownTheme?.variant === 'static' ? 'static' : 'floatingLabel'
            }
            buttonWidth={dropdownTheme?.width || '180px'}
            radius={dropdownTheme?.radius}
            onChange={(dates) => {
              onChangeFilterValue?.(
                filter.name,
                (dateRangePicker?.value as string) || '',
                '',
                {
                  startDate: dates?.startDate as Date,
                  endDate: dates?.endDate as Date,
                }
              );
            }}
            defaultValues={
              dateRangePicker?.startDate && dateRangePicker?.endDate
                ? {
                    startDate: new Date(dateRangePicker?.startDate),
                    endDate: new Date(dateRangePicker?.endDate),
                    timeGrainValue: '',
                  }
                : undefined
            }
          />
        </div>
      )}
      {customSingleDate && (
        <div>
          <DateRangePicker
            label={filter.name}
            variant={
              dropdownTheme?.variant === 'static' ? 'static' : 'floatingLabel'
            }
            buttonWidth={dropdownTheme?.width || '180px'}
            radius={dropdownTheme?.radius}
            isEnableSingleDate
            onChange={(dates) => {
              onChangeFilterValue?.(
                filter.name,
                (customSingleDate?.value as string) || '',
                '',
                {
                  startDate: dates?.startDate as Date,
                  endDate: dates?.endDate as Date,
                }
              );
            }}
            defaultValues={
              customSingleDate?.startDate && customSingleDate?.endDate
                ? {
                    startDate: new Date(customSingleDate?.startDate),
                    endDate: new Date(customSingleDate?.endDate),
                    timeGrainValue: '',
                  }
                : undefined
            }
          />
        </div>
      )}
      {!(customSingleDate || dateRangePicker) && (
        <FloatingDropDown
          label={filter.name}
          labelVariant={dropdownTheme?.variant || 'floating'}
          buttonWidth={dropdownTheme?.width || '180px'}
          menuWidth={dropdownTheme?.width || '180px'}
          radius={dropdownTheme?.radius}
          selectedOption={selectedOption}
          options={
            options.map((v) => ({
              value: v.value as string,
              label: v.label as string,
            })) || []
          }
          onChange={(option) => {
            const selectedDate = filter?.variableOptions?.find(
              (opt) => opt.value === option?.value
            );
            onChangeFilterValue?.(filter.name, option.value, '', {
              startDate: (selectedDate?.startDate as Date) || new Date(),
              endDate: (selectedDate?.endDate as Date) || new Date(),
            });
          }}
          isSearchEnabled
        />
      )}
    </>
  );
};
