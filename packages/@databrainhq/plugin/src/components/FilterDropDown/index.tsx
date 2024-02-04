/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  MultiSelectDropdown,
  MultiSelectDropdownProps,
} from '@/components/MultiSelectDropdown';
import { FloatingDropDownOption, RlsFilterObjectType } from '@/types/app';
import {
  FloatingDropDown,
  FloatingDropDownProps,
} from '@/components/FloatingDropDown';
import { useGenerateDatasetMetrics } from '@/hooks';

export type FilterClause = {
  columnName?: string;
  value?: string | string[];
  as?: string;
};
export type FilterDropDownProps = Omit<FloatingDropDownProps, 'options'> & {
  filter: Pick<
    RlsFilterObjectType,
    'columnName' | 'tableName' | 'defaultValue' | 'value' | 'labelColumnName'
  >;
  autoSelected?: boolean;
  workspaceId: string;
  filterClause?: FilterClause[];
  isDisableLabel?: boolean;
  customTable?: { query: string; alias: string };
  isFilter?: boolean;
};
export const FilterDropDown = React.memo(
  ({
    filter,
    onChange,
    selectedOption,
    autoSelected,
    workspaceId,
    filterClause,
    isDisableLabel,
    customTable,
    isFilter,
    ...rest
  }: FilterDropDownProps) => {
    const [data, setData] = useState<FloatingDropDownOption[]>([]);
    const { fetchColumnValues } = useGenerateDatasetMetrics();

    useEffect(() => {
      if (!rest.isDisabled)
        fetchColumnValues(
          {
            wId: workspaceId,
            tableName: customTable ? '' : filter.tableName,
            columnName: filter.columnName,
            filter:
              filterClause?.filter((f) =>
                Array.isArray(f.value)
                  ? f.value.length && f.columnName
                  : f.columnName && f.value
              ) || [],
            customTable,
            labelColumnName: filter?.labelColumnName,
          },
          {
            onSuccess: (res) => {
              if (!res?.data || !Array.isArray(res.data)) return;
              const colData: FloatingDropDownOption[] = [];
              res.data.forEach((col) => {
                if (col) {
                  colData.push({ label: col.label, value: col.value });
                }
              });
              setData(colData);
              const filterOption = colData?.find(
                (v) => v.value === selectedOption?.value
              );
              if (filterClause?.length && selectedOption?.value) {
                onChange(
                  filterOption || colData?.[0] || { value: '', label: '' }
                );
              }
            },
          }
        );
    }, [
      filter.tableName,
      filter.columnName,
      filter.labelColumnName,
      JSON.stringify(filterClause || []),
      JSON.stringify(customTable || []),
    ]);

    useEffect(() => {
      if (data.length && data[0] && autoSelected) {
        onChange(data[0]);
      }
    }, [
      data.length,
      data[0],
      autoSelected,
      JSON.stringify(filterClause || []),
    ]);

    return (
      <FloatingDropDown
        onChange={onChange}
        isFilter={isFilter}
        selectedOption={
          filter.defaultValue
            ? { label: filter.defaultValue, value: filter.defaultValue }
            : selectedOption
        }
        isDisabled={!!filter.defaultValue || rest.isDisabled}
        options={data}
        label={!isDisableLabel ? filter.columnName : undefined}
        {...rest}
      />
    );
  }
);

export type MultiFilterDropDownProps = Pick<
  FilterDropDownProps,
  | 'autoSelected'
  | 'filter'
  | 'label'
  | 'workspaceId'
  | 'filterClause'
  | 'customTable'
> &
  Omit<MultiSelectDropdownProps, 'options'> & {
    isDisablelabel?: boolean;
    radius?: string;
    isFilter?: boolean;
  };

export const MultiFilterDropdown: React.FC<MultiFilterDropDownProps> =
  React.memo(
    ({
      filter,
      autoSelected,
      label,
      workspaceId,
      filterClause,
      onChange,
      selectedOption,
      isDisabled,
      isDisablelabel,
      customTable,
      radius,
      isFilter,
      ...rest
    }) => {
      const [data, setData] = useState<FloatingDropDownOption[]>([]);
      const { fetchColumnValues } = useGenerateDatasetMetrics();

      useEffect(() => {
        if (!isDisabled)
          fetchColumnValues(
            {
              wId: workspaceId,
              tableName: customTable ? '' : filter.tableName,
              columnName: filter.columnName,
              filter:
                filterClause?.filter((f) =>
                  Array.isArray(f.value)
                    ? f.value.length && f.columnName
                    : f.columnName && f.value
                ) || [],
              customTable,
              labelColumnName: filter.labelColumnName,
            },
            {
              onSuccess: (res) => {
                if (!res?.data || !Array.isArray(res.data)) return;
                const colData: FloatingDropDownOption[] = [];
                res.data.forEach((col) => {
                  if (col) {
                    colData.push({ label: col.label, value: col.value });
                  }
                });
                setData(colData);
                const filterOptions = selectedOption?.filter((option) =>
                  colData.map((v) => v.value).includes(option.value)
                );
                if (filterClause?.length && selectedOption?.length) {
                  onChange(
                    filterOptions?.length
                      ? filterOptions
                      : colData?.[0]
                      ? [colData?.[0]]
                      : []
                  );
                }
              },
            }
          );
      }, [
        filter.tableName,
        filter.columnName,
        filter.labelColumnName,
        JSON.stringify(filterClause || []),
        JSON.stringify(customTable || []),
      ]);

      useEffect(() => {
        if (data.length && data[0] && autoSelected) onChange([data[0]]);
      }, [data.length, data[0], autoSelected, filter.columnName]);

      return (
        <MultiSelectDropdown
          onChange={onChange}
          selectedOption={
            filter.defaultValue
              ? [{ label: filter.defaultValue, value: filter.defaultValue }]
              : selectedOption
          }
          isDisabled={!!filter.defaultValue || isDisabled}
          options={data}
          radius={radius}
          isFilter={isFilter}
          label={isDisablelabel ? undefined : label || filter.columnName}
          {...rest}
        />
      );
    }
  );
