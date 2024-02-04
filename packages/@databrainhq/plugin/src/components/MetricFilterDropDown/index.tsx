/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/jsx-no-undef */
import React, { useMemo } from 'react';
import { StringAutoCustomFilterField } from './components/StringAutoCustomFilterField';
import { OldMetricFilterComponents } from './components/OldMetricFilterComponents';
import { StringManualFilterField } from './components/StringManualFilterField';
import { TimeFilterField } from './components/TimeFilterField';
import { VariableTimeFilterField } from './components/VariableTimeFilterField';
import {
  FloatingDropDown,
  MultiSelectDropdown,
  FilterDropDown,
  MultiFilterDropdown,
} from '@/components';
import {
  FloatingDropDownOption,
  MetricFilterDemoThemeType,
  RlsCondition,
} from '@/types';
import { CUSTOM_FILTER_TABLE_ALIAS, DATABASE, DATE, STRING } from '@/consts';
import { replaceClientVariable } from '@/helpers';

type Props = {
  rlsConditions: RlsCondition;
  onChangeFilterValue?: (
    name: string,
    value: string,
    labelValue?: string,
    customValue?: Record<string, Date>,
    stringValues?: FloatingDropDownOption[]
  ) => void;
  workspaceId: string;
  clientId?: string;
  className?: string;
  rlsConditionList: RlsCondition[];
  isAllClient?: boolean;
  dropdownTheme?: MetricFilterDemoThemeType;
  tenancyLevel?: string;
};
export type DateSelectedOption = {
  value: string;
  label: string;
  labelType?: string;
};
export const MetricFilterDropDown = ({
  rlsConditions,
  onChangeFilterValue,
  workspaceId,
  clientId,
  className,
  rlsConditionList,
  isAllClient,
  dropdownTheme,
  tenancyLevel = 'TABLE',
}: Props) => {
  const filterClause: {
    columnName?: string;
    value?: string | string[];
    as?: string;
  }[] = useMemo(() => {
    const dependedFilters = rlsConditions?.dependOn
      ? rlsConditionList?.filter(
          (f) =>
            f.isAddOnMetrics &&
            f.datatype === STRING &&
            rlsConditions?.dependOn?.value === f.name &&
            f.value &&
            f.columnName
        ) || []
      : [];
    const dependOnFilters =
      dependedFilters?.map((v) => ({
        columnName: v.columnName,
        value: Array.isArray(v.value)
          ? v.value.map((val) => (typeof val === STRING ? `'${val}'` : val))
          : (v.value as string | string[]),
        as: v.datatype,
      })) || [];
    return rlsConditions?.client?.isEnable && !isAllClient
      ? [
          {
            columnName: rlsConditions?.client?.columnName,
            value: clientId,
            as: rlsConditions?.client?.as,
          },
          ...dependOnFilters,
        ]
      : dependOnFilters;
  }, [
    rlsConditionList?.find(
      (f) =>
        f.isAddOnMetrics &&
        f.datatype === STRING &&
        rlsConditions?.dependOn?.value === f.name &&
        f.value &&
        f.columnName
    )?.value,
    rlsConditions?.dependOn,
    clientId,
    isAllClient,
  ]);

  const isFilterExists = useMemo(
    () => !!rlsConditions && !!onChangeFilterValue,
    [rlsConditions]
  );
  const isAutoCustom = useMemo(
    () =>
      isFilterExists &&
      ['auto', 'custom'].includes(rlsConditions?.filterType || ''),
    [isFilterExists, rlsConditions]
  );
  const isStringVariantFilter = useMemo(
    () =>
      rlsConditions?.datatype === STRING && rlsConditions?.filterVariant?.value,
    [rlsConditions]
  );
  const isVariableFilter = useMemo(
    () => rlsConditions?.isVariableFilter,
    [rlsConditions]
  );
  const isDateFilterType = useMemo(
    () => rlsConditions.datatype === DATE,
    [rlsConditions]
  );
  const isOldFilter = useMemo(
    () => !rlsConditions?.filterType,
    [rlsConditions]
  );
  const selectedValue =
    Array.isArray(rlsConditions.value) && rlsConditions.value.length
      ? rlsConditions.value.map((val) => ({
          label: val,
          value: val,
        }))
      : [];
  const selectedLabelValue =
    Array.isArray(rlsConditions.selectedDropdownValue) &&
    rlsConditions.selectedDropdownValue.length
      ? rlsConditions.selectedDropdownValue.map((val) => ({
          label: val.label || val.value,
          value: val.value,
        }))
      : [];
  // if filter is undefined
  if (!rlsConditions) return <></>;
  // Filters saved with old flow
  // We can remove OldMetricFilterComponents after
  if (isOldFilter) {
    return (
      <OldMetricFilterComponents
        props={{
          className: className || '',
          dropdownTheme,
          filter: rlsConditions,
          filterClause,
          isVariableFilter: isVariableFilter || false,
          onChangeFilterValue,
          workspaceId,
        }}
      />
    );
  }
  // if filter is Date type
  if (isDateFilterType) {
    return isVariableFilter ? (
      <VariableTimeFilterField
        props={{ filter: rlsConditions, dropdownTheme, onChangeFilterValue }}
      />
    ) : (
      <TimeFilterField
        props={{ dropdownTheme, filter: rlsConditions, onChangeFilterValue }}
      />
    );
  }

  // String filter saved with variant

  if (isStringVariantFilter) {
    return !isAutoCustom ? (
      <StringManualFilterField
        props={{
          dropdownTheme,
          filter: rlsConditions,
          onChangeFilterValue,
        }}
      />
    ) : (
      <StringAutoCustomFilterField
        props={{
          clientId: clientId || '',
          filter: rlsConditions,
          filterClause,
          isAllClient: isAllClient || false,
          onChangeFilterValue,
          tenancyLevel,
          workspaceId,
          dropdownTheme,
        }}
      />
    );
  }

  // OTHER TYPE OF FILTER saved with no variant
  if (isAutoCustom) {
    const query = rlsConditions?.selectedCustomOptionTable?.query;

    const customColumnName =
      rlsConditions?.selectedCustomOptionTable?.columnName;
    const isCustomTable = query && customColumnName;
    const isDatabaseTenancy = tenancyLevel === DATABASE;
    const datasetName =
      rlsConditions?.optionTableName || rlsConditions?.tableName || '';
    const tableName = isDatabaseTenancy
      ? `${clientId}.${datasetName?.split('.')?.slice(1)?.join('.')}`
      : datasetName;
    const customTable = isCustomTable
      ? {
          query: replaceClientVariable({
            query: query || '',
            tenancyLevel,
            clientId,
            isAllClient,
          }),
          alias: CUSTOM_FILTER_TABLE_ALIAS,
        }
      : undefined;
    const filterTableOption = {
      tableName: isCustomTable ? '' : tableName,
      columnName: isCustomTable
        ? customColumnName
        : rlsConditions?.optionColumnName || rlsConditions?.columnName,
    };
    const selectedOption =
      Array.isArray(rlsConditions?.value) && rlsConditions?.value.length
        ? rlsConditions?.value.map((val) => ({
            label: val,
            value: val,
          }))
        : [];
    return !isVariableFilter ? (
      <MultiFilterDropdown
        buttonWidth={dropdownTheme?.width || '180px'}
        menuWidth={dropdownTheme?.width || '180px'}
        radius={dropdownTheme?.radius}
        labelVariant={dropdownTheme?.variant || 'floating'}
        selectedOption={selectedOption}
        onChange={(options) =>
          onChangeFilterValue?.(rlsConditions.name, '', '', undefined, options)
        }
        filter={filterTableOption}
        isSearchEnabled
        label={rlsConditions.name}
        workspaceId={workspaceId}
        filterClause={filterClause}
        customTable={customTable}
      />
    ) : (
      <FilterDropDown
        buttonWidth={dropdownTheme?.width || '180px'}
        menuWidth={dropdownTheme?.width || '180px'}
        radius={dropdownTheme?.radius}
        labelVariant={dropdownTheme?.variant || 'floating'}
        selectedOption={{
          label: (rlsConditions?.selectedVariableValue?.value as string) || '',
          value: (rlsConditions?.selectedVariableValue?.value as string) || '',
        }}
        onChange={(option) =>
          onChangeFilterValue?.(rlsConditions.name, option.value)
        }
        autoSelected={false}
        filter={filterTableOption}
        customTable={customTable}
        label={rlsConditions.name}
        workspaceId={workspaceId}
        filterClause={filterClause}
        isSearchEnabled
        isClearEnabled
      />
    );
  }
  return !isVariableFilter ? (
    <MultiSelectDropdown
      buttonWidth={dropdownTheme?.width || '180px'}
      menuWidth={dropdownTheme?.width || '180px'}
      radius={dropdownTheme?.radius}
      labelVariant={dropdownTheme?.variant || 'floating'}
      selectedOption={
        selectedLabelValue?.length ? selectedLabelValue : selectedValue
      }
      options={rlsConditions.options.map((o: any) => ({
        value: o?.value || (o as string),
        label: o?.label || (o as string),
      }))}
      onChange={(options) =>
        onChangeFilterValue?.(rlsConditions.name, '', '', undefined, options)
      }
      label={rlsConditions.name}
      isSearchEnabled
    />
  ) : (
    <FloatingDropDown
      label={rlsConditions.name}
      labelVariant={dropdownTheme?.variant || 'floating'}
      buttonWidth={dropdownTheme?.width || '180px'}
      menuWidth={dropdownTheme?.width || '180px'}
      radius={dropdownTheme?.radius}
      selectedOption={{
        value: !Array.isArray(rlsConditions.selectedDropdownValue)
          ? rlsConditions.selectedDropdownValue?.value || ''
          : (rlsConditions.selectedVariableValue?.value as string),
        label: !Array.isArray(rlsConditions.selectedDropdownValue)
          ? rlsConditions.selectedDropdownValue?.label || ''
          : (rlsConditions.selectedVariableValue?.value as string),
      }}
      options={
        rlsConditions.variableOptions?.map((o: any) => ({
          value: o?.value || (o as string),
          label: o?.label || (o as string),
        })) || []
      }
      onChange={(option) =>
        onChangeFilterValue?.(rlsConditions.name, option.value)
      }
      isSearchEnabled
      isClearEnabled
    />
  );
};

export default React.memo(MetricFilterDropDown);
