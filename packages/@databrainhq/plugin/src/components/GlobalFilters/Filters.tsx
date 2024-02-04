/* eslint-disable react/forbid-dom-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './filters.module.css';
import { NumberFilterField } from './NumberFilterField';
import AddFilter from './AddFilter';
import SearchField from './SearchField';
import {
  FilterFieldType,
  Text,
  DateRangePicker,
  FloatingDropDown,
  // MultiFloatingDropDown,
  FilterDropDown,
  MultiFilterDropdown,
  MultiSelectDropdown,
  getFormattedFilterValue,
  Flex,
  InputField,
  Button,
  Icons,
} from '@/components';
import {
  GlobalFilterType,
  FloatingDropDownOption,
  GlobalFilterColumn,
} from '@/types/app';
import { onChangeGlobalFilter, replaceClientVariable } from '@/helpers';
import {
  BETWEEN,
  DATE_PICKER,
  EQUAL_OPERATOR,
  IN,
  LIKE,
  MULTI_SELECT,
  SEARCH,
  SINGLE_SELECT,
} from '@/consts';

type FiltersProps = {
  filterList: GlobalFilterColumn[];
  setFilterList: React.Dispatch<React.SetStateAction<GlobalFilterColumn[]>>;
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
  filterOptions?: (column: string) => JSX.Element;
  tenancyLevel: string;
};

export const Filters: React.FC<FiltersProps> = ({
  filterList,
  setFilterList,
  appliedfilters,
  setAppliedFilters,
  filters,
  internal,
  clientId,
  isAllClient,
  theme,
  filterOptions,
  tenancyLevel,
}) => {
  const getSelectedOption = useCallback(
    (col: string, type: string) => {
      const colValue =
        appliedfilters?.find((filter) => filter.label === col)?.value || '';
      if (type === 'string') {
        if (Array.isArray(colValue)) {
          return colValue.map((v) => ({ label: v, value: v }));
        }
        return [];
      }

      return {
        label: colValue as string,
        value: colValue as string,
      };
    },
    [appliedfilters]
  );

  const defaultValues = useMemo(() => {
    return appliedfilters?.find(
      (filter) =>
        filter.label === filterList.find((itm) => itm.as === 'date')?.label
    )?.defaultValues;
  }, [filterList, appliedfilters]);
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
  const gridLength = useCallback(() => {
    if (filterList?.length <= 1) return 'repeat(1, minmax(0, 1fr))';
    if (filterList?.length === 2) return 'repeat(2, minmax(0, 1fr))';
    return 'repeat(3, minmax(0, 1fr))';
  }, [filterList.length]);
  return (
    <div className={styles.filterFieldsContainer}>
      <div className={styles.filterFields}>
        {filterList.length ? (
          <div
            className="dbn-gap-4"
            style={{
              display: 'grid',
              gridTemplateColumns: gridLength(),
            }}
          >
            {filterList.map((col) => (
              <div
                className={styles.filterDropdown}
                style={{ borderRadius: theme.radius }}
                key={col.label || col.name}
              >
                {filterOptions?.(col.label || col.name || '')}
                {col.as === 'date' && (
                  <>
                    <DateRangePicker
                      buttonWidth={theme.width}
                      label={col.label || col.name}
                      defaultValues={
                        appliedfilters?.find(
                          (filter) => filter.label === col.label
                        )?.defaultValues
                      }
                      variant={
                        theme.variant === 'static' ? 'static' : 'floatingLabel'
                      }
                      radius={theme.radius}
                      onChange={(option) => {
                        onChangeGlobalFilter({
                          column: col,
                          operator: BETWEEN,
                          setAppliedFilters,
                          type: DATE_PICKER,
                          value:
                            option?.startDate && option?.endDate
                              ? option
                              : undefined,
                        });
                      }}
                    />
                  </>
                )}
                {col.as === 'number' && (
                  <>
                    <NumberFilterField
                      buttonWidth={theme.width}
                      radius={theme.radius}
                      variant={theme.variant}
                      setAppliedFilters={setAppliedFilters}
                      column={col}
                      defaultValues={
                        appliedfilters.find(
                          (filter) => filter.label === col.label
                        )?.defaultValues
                      }
                    />
                  </>
                )}
                {col.as === 'string' &&
                  !col.filterVariant?.value &&
                  !col.isVariableFilter &&
                  (internal?.isInternal && !col.isManualOptions ? (
                    <MultiFilterDropdown
                      labelVariant={theme.variant}
                      radius={theme.radius}
                      buttonWidth={theme.width}
                      menuWidth={theme.width}
                      isFilter={false}
                      filter={{
                        columnName:
                          col.filterType === 'custom'
                            ? col?.selectedCustomColumn?.columnName || col.name
                            : col.name,
                        tableName:
                          col.filterType === 'auto'
                            ? col.selectedTable || filters?.[0]?.tableName
                            : filters?.[0]?.tableName,
                      }}
                      customTable={
                        col.filterType === 'custom' &&
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
                          ? col.manualOptions?.map((o) => ({
                              value: o,
                              label: o,
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

                {col.as === 'default' ||
                col.as === 'boolean' ||
                (['default', 'boolean', 'string'].includes(col.as || '') &&
                  col.isVariableFilter &&
                  !col.filterVariant?.value) ? (
                  internal?.isInternal && !col.isManualOptions ? (
                    <FilterDropDown
                      buttonWidth={theme.width}
                      menuWidth={theme.width}
                      radius={theme.radius}
                      isFilter={false}
                      filter={{
                        columnName:
                          col.filterType === 'custom'
                            ? col?.selectedCustomColumn?.columnName || col.name
                            : col.name,
                        tableName:
                          col.filterType === 'auto'
                            ? col.selectedTable || filters?.[0]?.tableName
                            : filters?.[0]?.tableName,
                      }}
                      customTable={
                        col.filterType === 'custom' &&
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
                      isClearEnabled
                      isSearchEnabled
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
                          ? col.manualOptions?.map((o) => ({
                              value: o,
                              label: o,
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
                              col.filterType === 'custom'
                                ? col?.selectedCustomColumn?.columnName ||
                                  col.name
                                : col.name,
                            tableName:
                              col.filterType === 'auto'
                                ? col.selectedTable || filters?.[0]?.tableName
                                : filters?.[0]?.tableName,
                          }}
                          customTable={
                            col.filterType === 'custom' &&
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
                              ? col.manualOptions?.map((o) => ({
                                  value: o,
                                  label: o,
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
                              col.filterType === 'custom'
                                ? col?.selectedCustomColumn?.columnName ||
                                  col.name
                                : col.name,
                            tableName:
                              col.filterType === 'auto'
                                ? col.selectedTable || filters?.[0]?.tableName
                                : filters?.[0]?.tableName,
                          }}
                          customTable={
                            col.filterType === 'custom' &&
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
                          isClearEnabled
                          isSearchEnabled
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
                              ? col.manualOptions?.map((o) => ({
                                  value: o,
                                  label: o,
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
          </div>
        ) : (
          <div className={styles.filterDropdowns}>
            <Text variant="label">No filter added!</Text>
          </div>
        )}
        <div className={styles.AddFilter}>
          <AddFilter
            columnList={
              filters?.[0]?.columns.filter(
                (col) => !col.isDefault && !col.isShowHorizontal
              ) || []
            }
            setFilterList={setFilterList}
            filterList={filterList}
          />
        </div>
      </div>
    </div>
  );
};
