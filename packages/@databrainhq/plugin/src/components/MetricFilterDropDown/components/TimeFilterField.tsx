import React from 'react';
import styles from './metricFilterDropDownComp.module.css';
import { DateRangePicker, FloatingDropDown } from '@/components';
import {
  DateOptionType,
  FloatingDropDownOption,
  MetricFilterDemoThemeType,
  OnChangeFilterValueType,
  RlsCondition,
} from '@/types';

type TimeFilterFieldProps = {
  filter: RlsCondition;
  dropdownTheme?: MetricFilterDemoThemeType;
  onChangeFilterValue: OnChangeFilterValueType;
};

export const TimeFilterField = ({
  props: { filter, dropdownTheme, onChangeFilterValue },
}: {
  props: TimeFilterFieldProps;
}) => {
  const isDate = filter?.datatype === 'date';
  const selectedValue = filter?.value as string;
  const options = isDate ? (filter.options as DateOptionType[]) : [];
  const customSingleDate =
    isDate && options.find((o) => o.range === 'Custom Date');
  const dateRangePicker =
    isDate && options.find((o) => o.range === 'Date Range');
  const selectedOption: FloatingDropDownOption = {
    label: selectedValue || '',
    value: selectedValue || '',
  };
  const selectedDateOption = (
    filter?.options as unknown as DateOptionType[]
  ).find((opt: any) => opt.name === filter?.value);
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
                dateRangePicker?.name || '',
                '',
                {
                  startDate: dates?.startDate as Date,
                  endDate: dates?.endDate as Date,
                }
              );
            }}
            minDate={dateRangePicker?.minDate}
            maxDate={dateRangePicker?.maxDate}
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
                customSingleDate?.name || '',
                '',
                {
                  startDate: dates?.startDate as Date,
                  endDate: dates?.endDate as Date,
                }
              );
            }}
            minDate={customSingleDate?.minDate}
            maxDate={customSingleDate?.maxDate}
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
      {!(dateRangePicker || customSingleDate) && (
        <>
          <FloatingDropDown
            label={filter.name}
            labelVariant={dropdownTheme?.variant || 'floating'}
            buttonWidth={dropdownTheme?.width || '180px'}
            menuWidth={dropdownTheme?.width || '180px'}
            radius={dropdownTheme?.radius}
            selectedOption={selectedOption}
            options={options.map((o) => ({
              value: o?.name as string,
              label: o?.name as string,
              labelType: o?.range as string,
            }))}
            onChange={(option) => {
              onChangeFilterValue?.(filter.name, option.value);
            }}
            disableAutoClose={['custom', 'custom date'].includes(
              selectedDateOption?.range?.toLowerCase() || ''
            )}
            isSearchEnabled
          >
            {filter.datatype === 'date' &&
              selectedDateOption?.range?.toLowerCase() === 'custom date' && (
                <>
                  <DateRangePicker
                    label={filter.name}
                    variant={
                      dropdownTheme?.variant === 'static'
                        ? 'static'
                        : 'floatingLabel'
                    }
                    buttonWidth={dropdownTheme?.width || '180px'}
                    radius={dropdownTheme?.radius}
                    isEnableSingleDate
                    onChange={(dates) => {
                      onChangeFilterValue?.(
                        filter.name,
                        selectedDateOption?.name || 'Custom Date',
                        '',
                        {
                          startDate: dates?.startDate as Date,
                          endDate: dates?.endDate as Date,
                        }
                      );
                    }}
                    minDate={selectedDateOption?.minDate}
                    maxDate={selectedDateOption?.maxDate}
                    defaultValues={
                      selectedDateOption?.startDate &&
                      selectedDateOption?.endDate
                        ? {
                            startDate: new Date(selectedDateOption?.startDate),
                            endDate: new Date(selectedDateOption?.endDate),
                            timeGrainValue: '',
                          }
                        : undefined
                    }
                  />
                </>
              )}
            {filter.datatype === 'date' &&
            selectedDateOption?.range?.toLowerCase() === 'custom' &&
            !(selectedDateOption?.fromDate && selectedDateOption?.toDate) ? (
              <div className={styles.customContainer}>
                <DateRangePicker
                  label="Date Range"
                  onChange={(option) => {
                    onChangeFilterValue?.(
                      filter.name,
                      selectedDateOption?.name || 'Custom',
                      '',
                      {
                        startDate: option?.startDate as Date,
                        endDate: option?.endDate as Date,
                      }
                    );
                  }}
                  minDate={selectedDateOption?.minDate}
                  maxDate={selectedDateOption?.maxDate}
                  defaultValues={
                    selectedDateOption?.startDate && selectedDateOption?.endDate
                      ? {
                          startDate: new Date(selectedDateOption?.startDate),
                          endDate: new Date(selectedDateOption?.endDate),
                          timeGrainValue: '',
                        }
                      : undefined
                  }
                />
              </div>
            ) : null}
          </FloatingDropDown>
        </>
      )}
    </>
  );
};
