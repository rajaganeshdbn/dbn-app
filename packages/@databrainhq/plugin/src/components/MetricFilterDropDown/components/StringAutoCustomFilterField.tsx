import React from 'react';
import { SearchField } from './SearchField';
import {
  FilterClause,
  FilterDropDown,
  MultiFilterDropdown,
} from '@/components/FilterDropDown';
import { CUSTOM_FILTER_TABLE_ALIAS, DATABASE, IN, LIKE } from '@/consts';
import { replaceClientVariable } from '@/helpers';
import {
  MetricFilterDemoThemeType,
  OnChangeFilterValueType,
  RlsCondition,
} from '@/types';

type StringAutoCustomFilterFieldProps = {
  filter: RlsCondition;
  tenancyLevel: string;
  clientId: string;
  isAllClient: boolean;
  onChangeFilterValue: OnChangeFilterValueType;
  dropdownTheme?: MetricFilterDemoThemeType;
  workspaceId: string;
  filterClause: FilterClause[];
};
export const StringAutoCustomFilterField = ({
  props: {
    filter,
    tenancyLevel,
    clientId,
    isAllClient,
    onChangeFilterValue,
    dropdownTheme,
    workspaceId,
    filterClause,
  },
}: {
  props: StringAutoCustomFilterFieldProps;
}) => {
  if (!filter?.filterVariant?.value || !onChangeFilterValue) return <></>;
  const query = filter.selectedCustomOptionTable?.query;

  const customColumnName = filter.selectedCustomOptionTable?.columnName;
  const isCustomTable = query && customColumnName;
  const isDatabaseTenancy = tenancyLevel === DATABASE;
  const datasetName = filter?.optionTableName || filter.tableName || '';
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
      : filter.optionColumnName || filter.columnName,
    labelColumnName: filter?.labelColumnName || '',
  };
  const selectedFilterOption =
    filter?.selectedDropdownValue &&
    !Array.isArray(filter?.selectedDropdownValue)
      ? filter?.selectedDropdownValue
      : {
          label: (filter?.value as string) || '',
          value: (filter?.value as string) || '',
        };
  switch (filter?.filterVariant?.value) {
    case IN: {
      const labelValue =
        filter?.selectedDropdownValue &&
        Array.isArray(filter?.selectedDropdownValue)
          ? filter?.selectedDropdownValue
          : [];
      const value =
        Array.isArray(filter.value) && filter.value.length
          ? filter.value.map((val) => ({
              label: val,
              value: val,
            }))
          : [];
      const selectedOption = labelValue || value;
      return (
        <MultiFilterDropdown
          buttonWidth={dropdownTheme?.width || '180px'}
          menuWidth={dropdownTheme?.width || '180px'}
          radius={dropdownTheme?.radius}
          labelVariant={dropdownTheme?.variant || 'floating'}
          selectedOption={selectedOption}
          onChange={(options) =>
            onChangeFilterValue(filter.name, '', '', undefined, options)
          }
          filter={filterTableOption}
          isSearchEnabled
          label={filter.name}
          workspaceId={workspaceId}
          filterClause={filterClause}
          customTable={customTable}
        />
      );
    }
    case LIKE:
      return (
        <SearchField
          value={typeof filter.value === 'string' ? filter.value : ''}
          name={filter.name}
          onChangeFilterValue={onChangeFilterValue}
        />
      );
    default:
      return (
        <FilterDropDown
          buttonWidth={dropdownTheme?.width || '180px'}
          menuWidth={dropdownTheme?.width || '180px'}
          radius={dropdownTheme?.radius}
          labelVariant={dropdownTheme?.variant || 'floating'}
          selectedOption={selectedFilterOption}
          onChange={(option) =>
            onChangeFilterValue(filter.name, option.value, option.label)
          }
          autoSelected={false}
          filter={filterTableOption}
          customTable={customTable}
          label={filter.name}
          workspaceId={workspaceId}
          filterClause={filterClause}
          isSearchEnabled
          isClearEnabled
        />
      );
  }
};
