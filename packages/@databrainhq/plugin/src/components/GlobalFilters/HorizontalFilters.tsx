/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useCallback, useState } from 'react';
import styles from './filters.module.css';
import { NumberFilterField } from './NumberFilterField';
import SearchField from './SearchField';
import {
  GlobalFilterType,
  FloatingDropDownOption,
  GlobalFilterColumn,
} from '@/types/app';
import {
  FilterFieldType,
  DateRangePicker,
  FloatingDropDown,
  // MultiFloatingDropDown,
  FilterDropDown,
  MultiFilterDropdown,
  MultiSelectDropdown,
  getFormattedFilterValue,
  Button,
  Icons,
  PopoverMenu,
  Flex,
  InputField,
} from '@/components';
import { onChangeGlobalFilter, replaceClientVariable } from '@/helpers';
import {
  BETWEEN,
  CUSTOM,
  DATE_PICKER,
  EQUAL_OPERATOR,
  IN,
  LIKE,
  MULTI_SELECT,
  SEARCH,
  SINGLE_SELECT,
} from '@/consts';

type HorizontalFiltersProps = {
  appliedfilters: FilterFieldType[];
  setAppliedFilters: (value: React.SetStateAction<FilterFieldType[]>) => void;
  filters: GlobalFilterType[];
  internal?: { isInternal: boolean; workspaceId: string };
  clientId?: string;
  isAllClient?: boolean;
  theme: {
    width: string;
    variant: 'static' | 'floating';
    radius: string;
  };
  addGlobalFilter?: JSX.Element;
  filterOptions?: (column: string) => JSX.Element;
  tenancyLevel: string;
};

export const HorizontalFilters: React.FC<HorizontalFiltersProps> = ({
  appliedfilters,
  setAppliedFilters,
  filters,
  internal,
  clientId,
  isAllClient,
  theme,
  addGlobalFilter,
  filterOptions,
  tenancyLevel,
}) => {
  const getSelectedOption = useCallback(
    (col: string, type: string) => {
      const colValue =
        appliedfilters.find((filter) => filter.label === col)?.value || '';
      const colArray = appliedfilters.find(
        (filter) => filter.label === col
      )?.selectedDropdownValue;
      let colLabel: string = '';
      if (colArray && !Array.isArray(colArray)) {
        colLabel = colArray.label || '';
      }
      if (type === 'string') {
        if (Array.isArray(colArray)) {
          return colArray;
        }
        return [];
      }

      return {
        label: (colLabel || colValue) as string,
        value: colValue as string,
      };
    },
    [appliedfilters]
  );
  const filterClause = useCallback(
    (col: GlobalFilterColumn) => {
      const appliedFilterValues =
        appliedfilters
          ?.filter((f) =>
            col.dependOn?.map((v) => v.value).includes(f.column || '')
          )
          ?.map((f) => {
            const value = getFormattedFilterValue({
              operator: f.operator,
              value: f.value,
            });
            return {
              as: 'string',
              columnName: f.column,
              value:
                typeof value === 'string' ? value.replace(/'/g, '') : value,
            };
          }) || [];
      if (
        col.clientColumn &&
        col.isClientScoped &&
        col.clientColumnType &&
        !isAllClient
      )
        return [
          {
            columnName: col.clientColumn,
            value: clientId,
            as: col.clientColumnType,
          },
          ...appliedFilterValues,
        ];
      return appliedFilterValues;
    },
    [appliedfilters, clientId, isAllClient]
  );

  type DateType =
    | {
        startDate: Date | undefined;
        endDate: Date | undefined;
        value: string;
        timeGrainValue: string;
      }
    | undefined;
  const datepickerOnChange = (option: DateType, col: any) => {
    if (option) {
      setAppliedFilters((prev: any[]) => {
        const field = {
          column: col.name,
          operator: 'BETWEEN',
          value: option,
          as: col.as,
          defaultValues: option,
          filterType: col.isShowHorizontal ? 'horizontal' : 'global',
          isFilterApplied: option?.startDate ? true : false,
          applyOnTables: col.applyOnTables,
          isVariableFilter: col.isVariableFilter,
          variableStrings: col.variableStrings || [],
          label: col.label || col.name,
          filterVariant: col.filterVariant,
        };
        const index = prev.findIndex((f) => f.label === col.label);
        if (index === -1) return [...prev, field];
        const updated = [...prev];
        updated[index] = field;
        return updated;
      });
    }
  };

  return (
    <>
      {filters?.[0]?.columns
        ?.filter((col) => col.isShowHorizontal)
        ?.map((col) => (
          <div
            className={styles.filterDropdown}
            style={{ borderRadius: theme.radius }}
            key={col.label || col.name}
          >
            {filterOptions?.(col.label || col.name || '')}
            {col.as === 'date' && (
              <>
                <DateRangePicker
                  label={col.label || col.name}
                  isFilter
                  variant={
                    theme.variant === 'static' ? 'static' : 'floatingLabel'
                  }
                  buttonWidth={theme.width}
                  radius={theme.radius}
                  defaultValues={
                    appliedfilters.find((filter) => filter.label === col.label)
                      ?.defaultValues
                  }
                  isDateReset={Boolean(
                    !appliedfilters.filter((itm) => itm.as === 'date').length
                  )}
                  onChange={(option) =>
                    onChangeGlobalFilter({
                      column: col,
                      operator: BETWEEN,
                      setAppliedFilters,
                      type: DATE_PICKER,
                      value:
                        option?.startDate && option?.endDate
                          ? option
                          : undefined,
                    })
                  }
                />
              </>
            )}
            {col.as === 'number' && (
              <NumberFilterField
                variant={theme.variant}
                isFilter
                buttonWidth={theme.width}
                radius={theme.radius}
                setAppliedFilters={setAppliedFilters}
                column={col}
                defaultValues={
                  appliedfilters.find((filter) => filter.label === col.label)
                    ?.defaultValues
                }
              />
            )}
            {col.as === 'string' &&
              !col.isVariableFilter &&
              !col.filterVariant?.value &&
              (internal?.isInternal && !col.isManualOptions ? (
                <MultiFilterDropdown
                  filter={{
                    columnName:
                      col.filterType === CUSTOM
                        ? col?.selectedCustomColumn?.columnName || col.name
                        : col.name,
                    tableName:
                      col.filterType === 'auto'
                        ? col.selectedTable || filters?.[0]?.tableName
                        : filters?.[0]?.tableName,
                  }}
                  customTable={
                    col.filterType === CUSTOM &&
                    col?.selectedCustomColumn?.columnName &&
                    col?.selectedCustomColumn?.query
                      ? {
                          alias: 'custom_dbn_table',
                          query: replaceClientVariable({
                            query: col.selectedCustomColumn.query,
                            tenancyLevel,
                            clientId,
                            isAllClient,
                          }),
                        }
                      : undefined
                  }
                  buttonWidth={theme.width}
                  isFilter
                  menuWidth={theme.width}
                  radius={theme.radius}
                  workspaceId={internal?.workspaceId}
                  labelVariant={theme.variant}
                  selectedOption={
                    (getSelectedOption(
                      col.label || col.name,
                      'string'
                    ) as FloatingDropDownOption[]) || []
                  }
                  autoSelected={false}
                  onChange={(options) => {
                    onChangeGlobalFilter({
                      column: col,
                      operator: IN,
                      setAppliedFilters,
                      type: MULTI_SELECT,
                      value: options?.length ? options : undefined,
                    });
                  }}
                  isSearchEnabled
                  label={col.label || col.name}
                  filterClause={filterClause(col)}
                />
              ) : (
                <MultiSelectDropdown
                  buttonWidth={theme.width}
                  menuWidth={theme.width}
                  isFilter
                  options={
                    col.isManualOptions
                      ? col.manualOptions?.map((o) => ({
                          value: o,
                          label: o,
                        })) || []
                      : col.options || []
                  }
                  labelVariant={theme.variant}
                  radius={theme.radius}
                  selectedOption={
                    (getSelectedOption(
                      col.label || col.name,
                      'string'
                    ) as FloatingDropDownOption[]) || []
                  }
                  onChange={(options) => {
                    onChangeGlobalFilter({
                      column: col,
                      operator: IN,
                      setAppliedFilters,
                      type: MULTI_SELECT,
                      value: options?.length ? options : undefined,
                    });
                  }}
                  isSearchEnabled
                  label={col.label || col.name}
                />
              ))}
            {col.as === 'default' ||
            col.as === 'boolean' ||
            (['default', 'boolean', 'string'].includes(col.as || '') &&
              col.isVariableFilter &&
              !col.filterVariant?.value) ? (
              internal?.isInternal && !col.isManualOptions ? (
                <FilterDropDown
                  buttonWidth={theme.width}
                  menuWidth={theme.width}
                  isFilter
                  filter={{
                    columnName:
                      col.filterType === CUSTOM
                        ? col?.selectedCustomColumn?.columnName || col.name
                        : col.name,
                    tableName:
                      col.filterType === 'auto'
                        ? col.selectedTable || filters?.[0]?.tableName
                        : filters?.[0]?.tableName,
                  }}
                  customTable={
                    col.filterType === CUSTOM &&
                    col?.selectedCustomColumn?.columnName &&
                    col?.selectedCustomColumn?.query
                      ? {
                          alias: 'custom_dbn_table',
                          query: replaceClientVariable({
                            query: col.selectedCustomColumn.query,
                            tenancyLevel,
                            clientId,
                            isAllClient,
                          }),
                        }
                      : undefined
                  }
                  workspaceId={internal?.workspaceId}
                  labelVariant={theme.variant}
                  radius={theme.radius}
                  autoSelected={false}
                  selectedOption={
                    getSelectedOption(
                      col.label || col.name,
                      'boolean'
                    ) as FloatingDropDownOption
                  }
                  onChange={(option) => {
                    onChangeGlobalFilter({
                      column: col,
                      operator: EQUAL_OPERATOR,
                      setAppliedFilters,
                      type: SINGLE_SELECT,
                      value: option?.value ? option : undefined,
                    });
                  }}
                  isSearchEnabled
                  label={col.label || col.name}
                  filterClause={filterClause(col)}
                  isClearEnabled
                />
              ) : (
                <FloatingDropDown
                  buttonWidth={theme.width}
                  menuWidth={theme.width}
                  isFilter
                  options={
                    col.isManualOptions
                      ? typeof col.manualOptions?.[0] === 'object'
                        ? col.manualOptions?.map((o: any) => ({
                            value: o.value,
                            label: o.label,
                          })) || []
                        : col.manualOptions?.map((o: any) => ({
                            value: o,
                            label: o,
                          })) || []
                      : col.options || []
                  }
                  labelVariant={theme.variant}
                  radius={theme.radius}
                  selectedOption={
                    getSelectedOption(
                      col.label || col.name,
                      'boolean'
                    ) as FloatingDropDownOption
                  }
                  onChange={(option) => {
                    onChangeGlobalFilter({
                      column: col,
                      operator: EQUAL_OPERATOR,
                      setAppliedFilters,
                      type: SINGLE_SELECT,
                      value: option?.value ? option : undefined,
                    });
                  }}
                  isClearEnabled
                  isSearchEnabled
                  label={col.label || col.name}
                />
              )
            ) : null}
            {!!(col.as === 'string' && col.filterVariant?.value) && (
              <>
                {col.filterVariant?.value === 'like' && (
                  <SearchField
                    column={col}
                    selectedValue={
                      getSelectedOption(
                        col.label || col.name,
                        'boolean'
                      ) as FloatingDropDownOption
                    }
                    onClickSearch={(value) =>
                      onChangeGlobalFilter({
                        column: col,
                        operator: LIKE,
                        setAppliedFilters,
                        type: SEARCH,
                        value,
                      })
                    }
                  />
                )}
                {col.filterVariant?.value === 'IN' &&
                  (!col.isManualOptions && internal?.workspaceId ? (
                    <MultiFilterDropdown
                      labelVariant={theme.variant}
                      radius={theme.radius}
                      buttonWidth={theme.width}
                      menuWidth={theme.width}
                      isFilter={false}
                      filter={{
                        columnName:
                          col.filterType === CUSTOM
                            ? col?.selectedCustomColumn?.columnName || col.name
                            : col.name,
                        tableName:
                          col.filterType === 'auto'
                            ? col.selectedTable || filters?.[0]?.tableName
                            : filters?.[0]?.tableName,
                        labelColumnName:
                          col.filterType === CUSTOM
                            ? col.customLabelColumn || ''
                            : col.labelColumnName || '',
                      }}
                      customTable={
                        col.filterType === CUSTOM &&
                        col?.selectedCustomColumn?.columnName &&
                        col?.selectedCustomColumn?.query
                          ? {
                              alias: 'custom_dbn_table',
                              query: replaceClientVariable({
                                query: col.selectedCustomColumn.query,
                                tenancyLevel,
                                clientId,
                                isAllClient,
                              }),
                            }
                          : undefined
                      }
                      workspaceId={internal?.workspaceId}
                      selectedOption={
                        (getSelectedOption(
                          col.label || col.name,
                          'string'
                        ) as FloatingDropDownOption[]) || []
                      }
                      onChange={(options) => {
                        onChangeGlobalFilter({
                          column: col,
                          operator: IN,
                          setAppliedFilters,
                          type: MULTI_SELECT,
                          value: options?.length ? options : undefined,
                        });
                      }}
                      isSearchEnabled
                      label={col.label || col.name}
                      filterClause={filterClause(col)}
                    />
                  ) : (
                    <MultiSelectDropdown
                      buttonWidth={theme.width}
                      menuWidth={theme.width}
                      isFilter={false}
                      radius={theme.radius}
                      options={
                        col.isManualOptions
                          ? col.manualOptions?.map((o: any) => ({
                              value: o.value || o,
                              label: o.label || o.value || o,
                            })) || []
                          : col.options || []
                      }
                      labelVariant={theme.variant}
                      selectedOption={
                        (getSelectedOption(
                          col.label || col.name,
                          'string'
                        ) as FloatingDropDownOption[]) || []
                      }
                      onChange={(options) => {
                        onChangeGlobalFilter({
                          column: col,
                          operator: IN,
                          setAppliedFilters,
                          type: MULTI_SELECT,
                          value: options?.length ? options : undefined,
                        });
                      }}
                      isSearchEnabled
                      label={col.label || col.name}
                    />
                  ))}
                {col.filterVariant?.value === '=' &&
                  (!col.isManualOptions && internal?.workspaceId ? (
                    <FilterDropDown
                      buttonWidth={theme.width}
                      menuWidth={theme.width}
                      radius={theme.radius}
                      isFilter={false}
                      filter={{
                        columnName:
                          col.filterType === CUSTOM
                            ? col?.selectedCustomColumn?.columnName || col.name
                            : col.name,
                        tableName:
                          col.filterType === 'auto'
                            ? col.selectedTable || filters?.[0]?.tableName
                            : filters?.[0]?.tableName,
                        labelColumnName:
                          col.filterType === CUSTOM
                            ? col.customLabelColumn || ''
                            : col.labelColumnName || '',
                      }}
                      customTable={
                        col.filterType === CUSTOM &&
                        col?.selectedCustomColumn?.columnName &&
                        col?.selectedCustomColumn?.query
                          ? {
                              alias: 'custom_dbn_table',
                              query: replaceClientVariable({
                                query: col.selectedCustomColumn.query,
                                tenancyLevel,
                                clientId,
                                isAllClient,
                              }),
                            }
                          : undefined
                      }
                      workspaceId={internal?.workspaceId}
                      labelVariant={theme.variant}
                      autoSelected={false}
                      selectedOption={
                        getSelectedOption(
                          col.label || col.name,
                          'boolean'
                        ) as FloatingDropDownOption
                      }
                      onChange={(option) =>
                        onChangeGlobalFilter({
                          column: col,
                          operator: EQUAL_OPERATOR,
                          setAppliedFilters,
                          type: SINGLE_SELECT,
                          value: option?.value ? option : undefined,
                        })
                      }
                      isSearchEnabled
                      isClearEnabled
                      label={col.label || col.name}
                      filterClause={filterClause(col)}
                    />
                  ) : (
                    <FloatingDropDown
                      buttonWidth={theme.width}
                      menuWidth={theme.width}
                      radius={theme.radius}
                      isFilter={false}
                      options={
                        col.isManualOptions
                          ? col.manualOptions?.map((o: any) => ({
                              value: o.value || o,
                              label: o.label || o.value || o,
                            })) || []
                          : col.options || []
                      }
                      labelVariant={theme.variant}
                      selectedOption={
                        getSelectedOption(
                          col.label || col.name,
                          'boolean'
                        ) as FloatingDropDownOption
                      }
                      onChange={(option) =>
                        onChangeGlobalFilter({
                          column: col,
                          operator: EQUAL_OPERATOR,
                          setAppliedFilters,
                          type: SINGLE_SELECT,
                          value: option?.value ? option : undefined,
                        })
                      }
                      isSearchEnabled
                      isClearEnabled
                      label={col.label || col.name}
                    />
                  ))}
              </>
            )}
          </div>
        ))}
      {addGlobalFilter}
    </>
  );
};
