import React from 'react';
import { SearchField } from './SearchField';
import { FloatingDropDown, MultiSelectDropdown } from '@/components';
import { IN, LIKE } from '@/consts';
import {
  MetricFilterDemoThemeType,
  OnChangeFilterValueType,
  RlsCondition,
} from '@/types';

type StringManualFilterFieldProps = {
  filter: RlsCondition;
  onChangeFilterValue: OnChangeFilterValueType;
  dropdownTheme?: MetricFilterDemoThemeType;
};
export const StringManualFilterField = ({
  props: { filter, onChangeFilterValue, dropdownTheme },
}: {
  props: StringManualFilterFieldProps;
}) => {
  const variant = filter?.filterVariant?.value;
  if (!variant || !onChangeFilterValue || !filter) return <></>;
  const optionList = filter?.isVariableFilter
    ? filter?.variableOptions?.map((o) => ({
        value: o.value as string,
        label: o.label as string,
      })) || []
    : filter?.options?.map((o: any) => ({
        value: o?.value || (o as string),
        label: o?.label || o?.value || (o as string),
      })) || [];
  switch (variant) {
    case IN: {
      const selectedOption =
        Array.isArray(filter.value) && filter.value.length
          ? filter.value.map((val) => ({
              label: val,
              value: val,
            }))
          : [];
      const selectedLabelOption =
        Array.isArray(filter.selectedDropdownValue) &&
        filter.selectedDropdownValue.length
          ? filter.selectedDropdownValue.map((val) => ({
              label: val.label || val.value,
              value: val.value,
            }))
          : [];

      return (
        <MultiSelectDropdown
          buttonWidth={dropdownTheme?.width || '180px'}
          menuWidth={dropdownTheme?.width || '180px'}
          radius={dropdownTheme?.radius}
          labelVariant={dropdownTheme?.variant || 'floating'}
          selectedOption={
            selectedLabelOption.length ? selectedLabelOption : selectedOption
          }
          options={optionList}
          onChange={(options) =>
            onChangeFilterValue?.(filter.name, '', '', undefined, options)
          }
          label={filter.name}
          isSearchEnabled
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
        <FloatingDropDown
          label={filter.name}
          labelVariant={dropdownTheme?.variant || 'floating'}
          buttonWidth={dropdownTheme?.width || '180px'}
          menuWidth={dropdownTheme?.width || '180px'}
          radius={dropdownTheme?.radius}
          selectedOption={{
            label: !Array.isArray(filter.selectedDropdownValue)
              ? filter.selectedDropdownValue?.label || ''
              : (filter?.value as string) || '',
            value: !Array.isArray(filter.selectedDropdownValue)
              ? filter.selectedDropdownValue?.value || ''
              : (filter?.value as string) || '',
          }}
          options={optionList}
          onChange={(option) =>
            onChangeFilterValue?.(filter.name, option.value, option.label)
          }
          isSearchEnabled
          isClearEnabled
        />
      );
  }
};
