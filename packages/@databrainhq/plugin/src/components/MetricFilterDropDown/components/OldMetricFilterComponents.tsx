/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react';
import styles from './metricFilterDropDownComp.module.css';
import {
  DateRangePicker,
  FilterClause,
  FloatingDropDown,
  MultiFilterDropdown,
  MultiSelectDropdown,
} from '@/components';
import {
  DateOptionType,
  MetricFilterDemoThemeType,
  OnChangeFilterValueType,
  RlsCondition,
} from '@/types';
import { STRING } from '@/consts';

type OldMetricFilterComponentProps = {
  filter: RlsCondition;
  onChangeFilterValue: OnChangeFilterValueType;
  className: string;
  isVariableFilter: boolean;
  dropdownTheme?: MetricFilterDemoThemeType;
  workspaceId: string;
  filterClause: FilterClause[];
};

// TODO: DELETE OLD COMPONENTS LATER
export const OldMetricFilterComponents = ({
  props: {
    filter,
    onChangeFilterValue,
    className,
    isVariableFilter,
    dropdownTheme,
    filterClause,
    workspaceId,
  },
}: {
  props: OldMetricFilterComponentProps;
}) => {
  const selected = (filter?.options as unknown as DateOptionType[])?.find(
    (opt: any) => opt.name === filter?.value
  );
  const selectedVariableOption = filter?.variableOptions?.find(
    (opt) => opt.value === filter.selectedVariableValue?.value
  );
  const [dateSelectedOption, setDateSelectedOption] = React.useState<{
    value: string;
    label: string;
    labelType?: string;
  }>({
    value: (filter?.value as string) || selected?.name || '',
    label: (filter?.value as string) || selected?.name || '',
    labelType: selected?.range || '',
  });
  return (
    <>
      {!!filter && onChangeFilterValue ? (
        <div className={className}>
          {isVariableFilter ? (
            [STRING, 'number', 'boolean', 'default'].includes(
              filter.datatype
            ) ? (
              <>
                <FloatingDropDown
                  label={filter.name}
                  labelVariant={dropdownTheme?.variant || 'floating'}
                  buttonWidth={dropdownTheme?.width || '180px'}
                  menuWidth={dropdownTheme?.width || '180px'}
                  radius={dropdownTheme?.radius}
                  selectedOption={
                    filter.selectedVariableValue?.value
                      ? {
                          value: filter.selectedVariableValue?.value as string,
                          label: filter.selectedVariableValue?.value as string,
                        }
                      : { value: '', label: '' }
                  }
                  options={
                    filter.variableOptions?.map((o) => ({
                      value: o?.value as string,
                      label: o?.value as string,
                    })) || []
                  }
                  isSearchEnabled
                  onChange={(option) =>
                    onChangeFilterValue?.(filter.name, option.value)
                  }
                />
              </>
            ) : (
              <>
                <FloatingDropDown
                  label={filter.name}
                  labelVariant={dropdownTheme?.variant || 'floating'}
                  buttonWidth={dropdownTheme?.width || '180px'}
                  menuWidth={dropdownTheme?.width || '180px'}
                  radius={dropdownTheme?.radius}
                  selectedOption={
                    {
                      value: filter.selectedVariableValue?.value as string,
                      label: filter?.selectedVariableValue?.label as string,
                    } || { value: '', label: '' }
                  }
                  options={
                    filter.variableOptions?.map?.((v) => ({
                      value: v.value as string,
                      label: v.label as string,
                    })) || []
                  }
                  isSearchEnabled
                  onChange={(option) => {
                    const selectedDate = filter?.variableOptions?.find(
                      (opt) => opt.value === option?.value
                    );
                    onChangeFilterValue?.(filter.name, option.value, '', {
                      startDate: selectedDate?.startDate as Date,
                      endDate: selectedDate?.endDate as Date,
                    });
                  }}
                />
              </>
            )
          ) : filter.datatype !== 'date' ? (
            filter.datatype === STRING ? (
              filter.options.length ? (
                <MultiSelectDropdown
                  labelVariant={dropdownTheme?.variant || 'floating'}
                  buttonWidth={dropdownTheme?.width || '180px'}
                  menuWidth={dropdownTheme?.width || '180px'}
                  radius={dropdownTheme?.radius}
                  selectedOption={
                    Array.isArray(filter.value) && filter.value.length
                      ? filter.value.map((val) => ({
                          label: val,
                          value: val,
                        }))
                      : []
                  }
                  options={filter.options.map((o: any) => ({
                    value: o.value || (o as string),
                    label: o.label || (o as string),
                  }))}
                  isSearchEnabled
                  onChange={(options) =>
                    onChangeFilterValue?.(
                      filter.name,
                      '',
                      '',
                      undefined,
                      options
                    )
                  }
                  label={filter.name}
                />
              ) : (
                <MultiFilterDropdown
                  labelVariant={dropdownTheme?.variant || 'floating'}
                  buttonWidth={dropdownTheme?.width || '180px'}
                  menuWidth={dropdownTheme?.width || '180px'}
                  radius={dropdownTheme?.radius}
                  selectedOption={
                    Array.isArray(filter.value) && filter.value.length
                      ? filter.value.map((val) => ({
                          label: val,
                          value: val,
                        }))
                      : []
                  }
                  onChange={(options) =>
                    onChangeFilterValue?.(
                      filter.name,
                      '',
                      '',
                      undefined,
                      options
                    )
                  }
                  filter={{
                    tableName: filter.tableName,
                    columnName: filter.columnName,
                  }}
                  isSearchEnabled
                  label={filter.name}
                  workspaceId={workspaceId}
                  filterClause={filterClause}
                />
              )
            ) : (
              <FloatingDropDown
                labelVariant={dropdownTheme?.variant || 'floating'}
                buttonWidth={dropdownTheme?.width || '180px'}
                menuWidth={dropdownTheme?.width || '180px'}
                radius={dropdownTheme?.radius}
                label={filter.name}
                selectedOption={{
                  value: filter.value as string,
                  label: filter.value as string,
                }}
                options={filter.options.map((o: any) => ({
                  value: o?.value || (o as string),
                  label: o?.label || (o as string),
                }))}
                isSearchEnabled
                onChange={(option) =>
                  onChangeFilterValue?.(filter.name, option.value)
                }
                disableAutoClose={['custom', 'custom date'].includes(
                  selected?.range?.toLowerCase() || ''
                )}
              >
                {filter.datatype === 'date' &&
                (selectedVariableOption?.value as string)?.toLowerCase() ===
                  'custom' &&
                !(
                  selectedVariableOption?.startDate &&
                  selectedVariableOption?.endDate
                ) ? (
                  <div className={styles.customContainer}>
                    <DateRangePicker
                      label="Date Range"
                      onChange={(option) => {
                        onChangeFilterValue?.(
                          filter.name,
                          (selectedVariableOption as any)?.value || 'Custom',
                          '',
                          {
                            startDate: option?.startDate as Date,
                            endDate: option?.endDate as Date,
                          }
                        );
                      }}
                      defaultValues={{
                        startDate: filter?.selectedVariableValue?.startDate
                          ? new Date(filter?.selectedVariableValue?.startDate)
                          : new Date(),
                        endDate: filter?.selectedVariableValue?.endDate
                          ? new Date(filter?.selectedVariableValue?.endDate)
                          : new Date(),
                        timeGrainValue: '',
                      }}
                    />
                  </div>
                ) : null}
              </FloatingDropDown>
            )
          ) : (
            <FloatingDropDown
              label={filter.name}
              labelVariant={dropdownTheme?.variant || 'floating'}
              buttonWidth={dropdownTheme?.width || '180px'}
              menuWidth={dropdownTheme?.width || '180px'}
              radius={dropdownTheme?.radius}
              selectedOption={dateSelectedOption}
              options={(filter.options as DateOptionType[]).map((o) => ({
                value: o.name as string,
                label: o.name as string,
                labelType: o.range,
              }))}
              isSearchEnabled
              onChange={(option) => {
                setDateSelectedOption(option);
                onChangeFilterValue(filter.name, option.value);
              }}
              disableAutoClose={['custom', 'custom date'].includes(
                selected?.range?.toLowerCase() || ''
              )}
            >
              {filter.datatype === 'date' &&
              dateSelectedOption.labelType?.toLowerCase() === 'custom' &&
              !(selected?.fromDate && selected?.toDate) ? (
                <div className={styles.customContainer}>
                  <DateRangePicker
                    label="Date Range"
                    onChange={(option) => {
                      onChangeFilterValue(
                        filter.name,
                        selected?.name || 'Custom',
                        '',
                        {
                          startDate: option?.startDate as Date,
                          endDate: option?.endDate as Date,
                        }
                      );
                    }}
                    minDate={selected?.minDate}
                    maxDate={selected?.maxDate}
                    defaultValues={{
                      startDate: selected?.startDate
                        ? new Date(selected?.startDate)
                        : new Date(),
                      endDate: selected?.endDate
                        ? new Date(selected?.endDate)
                        : new Date(),
                      timeGrainValue: '',
                    }}
                  />
                </div>
              ) : null}
            </FloatingDropDown>
          )}
        </div>
      ) : null}
    </>
  );
};
