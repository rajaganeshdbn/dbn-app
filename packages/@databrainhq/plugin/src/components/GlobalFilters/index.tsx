/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect, useRef, useState } from 'react';
import styles from './filters.module.css';
import { Filters } from './Filters';
import { HorizontalFilters } from './HorizontalFilters';
import {
  PopoverMenu,
  Button,
  Text,
  Icons,
  Alert,
  FilterFieldType,
  isInFilterOperator,
  isNullFilterOperator,
  MetricCardProps,
} from '@/components';
import {
  FilterValueType,
  GlobalFilterColumn,
  GlobalFilterType,
} from '@/types/app';
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
import { onChangeGlobalFilter, replaceClientVariable } from '@/helpers';
import { setOnDateChange } from '@/helpers/setOnDateChange';

type GlobalFiltersProps = {
  filters: GlobalFilterType[];
  onApply: (filters: MetricCardProps['globalFilters']) => void;
  renderAdditionalHeaderContent?: () => JSX.Element;
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
  setSelectedFilterVal?: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        value: FilterValueType;
      }[]
    >
  >;
  appliedFilterPairs?: Record<string, string | string[]>;
  workspaceId?: string;
};

export const getFormattedFilterValue = (obj: {
  operator: string;
  value: any;
}) => {
  if (!obj.value) return obj.value;
  if (isInFilterOperator(obj.operator))
    return obj.value.map((v: string) => {
      if (['true', 'false'].includes(v)) return v === 'true';

      // if (!Number.isNaN(v) && Number(v)) return Number(v);

      return `'${v}'`;
    });
  if (obj.operator === LIKE) return `'%${obj.value}%'`;
  if (isNullFilterOperator(obj.operator)) return null;

  if (['true', 'false'].includes(obj.value)) return obj.value === 'true';

  if (!Number.isNaN(obj.value) && Number(obj.value)) return Number(obj.value);

  return `'${obj.value}'`;
};

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  filters,
  onApply,
  renderAdditionalHeaderContent,
  internal,
  clientId,
  isAllClient,
  theme,
  addGlobalFilter,
  filterOptions,
  tenancyLevel,
  setSelectedFilterVal,
  appliedFilterPairs,
  workspaceId,
}) => {
  const [appliedfilters, setAppliedFilters] = useState<FilterFieldType[]>([]);
  const globalFilterRef = useRef(null) as React.RefObject<HTMLDivElement>;
  const [filterList, setFilterList] = useState<GlobalFilterType['columns']>([]);

  const hasAddOnFilters = filters[0]?.columns?.filter(
    (col) => !col.isDefault && !col.isShowHorizontal
  ).length;

  // const filterClauses: FilterClausesType = (
  //   dependOn: FloatingDropDownOption[] = []
  // ) => {
  //   return (
  //     globalFilters?.filters
  //       ?.filter((f) => dependOn.map((v) => v.value).includes(f.column || ''))
  //       ?.map((f) => ({
  //         as: 'string',
  //         columnName: f.column,
  //         value: f.value as string[] | string,
  //       })) || []
  //   );
  // };
  const resetFilters = () => {
    setAppliedFilters([]);
    onApply({
      tableName: '',
      filters: [],
    });
    globalFilterRef.current?.click();
  };
  const onChangeFilters = (updatedFilters: FilterFieldType[]) => {
    const filterColumns = updatedFilters?.map((field) => {
      const col = {
        column: field.column,
        operator: field.operator,
        as: field.as,
        isVariableFilter: field.isVariableFilter,
        variableStrings: field.variableStrings,
        applyOnTables: field.applyOnTables || [],
        label: field.label || field.column,
        filterVariant: field.filterVariant,
      };
      const formattedValue =
        field.as === 'date' || field.as === 'number'
          ? field.value
          : getFormattedFilterValue({
              operator: field.operator,
              value: field.value,
            });
      if (formattedValue != null) {
        Object.assign(col, {
          ...col,
          value: formattedValue,
        });
      }
      return col;
    });
    onApply({ tableName: filters?.[0]?.tableName, filters: filterColumns });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedFilters((prev) => {
      return prev.map((itm) => ({ ...itm, isFilterApplied: true }));
    });

    globalFilterRef.current?.click();
  };

  useEffect(() => {
    onChangeFilters(
      appliedfilters.filter(
        (itm) =>
          (itm.filterType === 'horizontal' && itm.isFilterApplied) ||
          itm.isFilterApplied
      )
    );
  }, [appliedfilters]);
  useEffect(() => {
    if (filters?.[0]?.columns?.length === 0) {
      setFilterList([]);
      setAppliedFilters([]);
      return;
    }
    if (filters?.[0]?.columns?.length) {
      setFilterList(
        filters[0].columns.filter(
          (col) => col.isDefault && !col.isShowHorizontal
        )
      );
    }
    if (filters?.length && filters?.[0]?.columns?.length) {
      const updatedFilters: FilterFieldType[] =
        filters?.[0]?.columns
          ?.filter((column) => column.isShowHorizontal)
          ?.map((column) => {
            if (column.defaultValue) {
              let field;

              switch (column.as) {
                case 'string':
                  {
                    const isSingleStringFilterVariant =
                      column.filterVariant?.value &&
                      [EQUAL_OPERATOR, LIKE].includes(
                        column.filterVariant?.value
                      ) &&
                      Array.isArray(column.defaultValue);
                    const value = isSingleStringFilterVariant
                      ? (column?.defaultValue as string[])?.[0]
                      : (column.defaultValue as string[]);
                    field = {
                      column: column.name as string,
                      applyOnTables: column.applyOnTables,
                      operator: column.filterVariant?.value || 'IN',
                      value,
                      as: column.as,
                      filterType: (column.isShowHorizontal
                        ? 'horizontal'
                        : 'global') as 'global' | 'horizontal',
                      isFilterApplied: true,
                      isVariableFilter: column.isVariableFilter,
                      variableStrings: column.variableStrings || [],
                      label: column.label || column.name,
                      filterVariant: column.filterVariant,
                    };
                  }
                  break;
                case 'number':
                  field = {
                    column: column.name as string,
                    applyOnTables: column.applyOnTables,
                    operator: 'BETWEEN',
                    value: `${
                      (column.defaultValue as { min: number; max: number })?.min
                    } AND ${
                      (column.defaultValue as { min: number; max: number })?.max
                    }`,
                    as: column.as,
                    defaultValues: column.defaultValue,
                    filterType: (column.isShowHorizontal
                      ? 'horizontal'
                      : 'global') as 'global' | 'horizontal',
                    isFilterApplied: Boolean(column.isShowHorizontal),
                    isVariableFilter: column.isVariableFilter,
                    variableStrings: column.variableStrings || [],
                    label: column.label || column.name,
                    filterVariant: column.filterVariant,
                  };
                  break;
                case 'date': {
                  const defaultValue = column.defaultValue as
                    | {
                        startDate: Date | undefined;
                        endDate: Date | undefined;
                        timeGrainValue: string;
                        value: string;
                      }
                    | undefined;
                  const dateDefaultValue =
                    defaultValue?.endDate &&
                    defaultValue?.startDate &&
                    defaultValue?.timeGrainValue
                      ? {
                          startDate: new Date(defaultValue.startDate),
                          endDate: new Date(defaultValue.endDate),
                          timeGrainValue: defaultValue.timeGrainValue,
                        }
                      : undefined;
                  const value = defaultValue;
                  field = {
                    column: column.name as string,
                    applyOnTables: column.applyOnTables,
                    operator: 'BETWEEN',
                    value,
                    as: column.as,
                    defaultValues: dateDefaultValue,
                    filterType: (column.isShowHorizontal
                      ? 'horizontal'
                      : 'global') as 'global' | 'horizontal',
                    isFilterApplied: true,
                    isVariableFilter: column.isVariableFilter,
                    variableStrings: column.variableStrings || [],
                    label: column.label || column.name,
                    filterVariant: column.filterVariant,
                  };
                  break;
                }
                default:
                  field = {
                    column: column.name as string,
                    applyOnTables: column.applyOnTables,
                    operator: EQUAL_OPERATOR,
                    value: column.defaultValue as string,
                    as: column.as,
                    filterType: (column.isShowHorizontal
                      ? 'horizontal'
                      : 'global') as 'global' | 'horizontal',
                    isFilterApplied: true,
                    isVariableFilter: column.isVariableFilter,
                    variableStrings: column.variableStrings || [],
                    label: column.label || column.name,
                    filterVariant: column.filterVariant,
                  };
                  break;
              }
              return field;
            }
            return {
              column: 'none',
              operator: EQUAL_OPERATOR,
              value: undefined,
              as: column.as,
              filterType: (column.isShowHorizontal
                ? 'horizontal'
                : 'global') as 'global' | 'horizontal',
              isFilterApplied: false,
              isVariableFilter: column.isVariableFilter,
              variableStrings: column.variableStrings || [],
              label: column.label || column.name,
              filterVariant: column.filterVariant,
            };
          })
          ?.filter((field) => {
            return field.column !== 'none' && field.value !== undefined;
          }) || [];
      const globalVariableFilters =
        filters?.[0]?.columns?.filter(
          (column) => !column.defaultValue && !!column.isVariableFilter
        ) || [];
      const updatedVariableGlobalFilters = globalVariableFilters.map(
        (column) => {
          return {
            column: column.name as string,
            applyOnTables: column.applyOnTables,
            operator: '=',
            value: undefined,
            as: column.as,
            defaultValues: column.defaultValue,
            filterType: (column.isShowHorizontal ? 'horizontal' : 'global') as
              | 'global'
              | 'horizontal',
            isFilterApplied: Boolean(column.isShowHorizontal),
            isVariableFilter: column.isVariableFilter,
            variableStrings: column.variableStrings || [],
            label: column.label || column.name,
            filterVariant: column.filterVariant,
          };
        }
      );
      setAppliedFilters([...updatedFilters, ...updatedVariableGlobalFilters]);
    }
  }, [filters]);
  useEffect(() => {
    if (appliedfilters?.length) {
      setSelectedFilterVal?.(
        appliedfilters?.map((filter) => ({
          name: filter.label,
          value: filter.value as any,
        }))
      );
    }
  }, [appliedfilters]);
  useEffect(() => {
    if (Object.keys(appliedFilterPairs || [])?.length) {
      const filteredData = filters?.[0]?.columns?.filter((item) => {
        return Object.keys(appliedFilterPairs || {})?.some(
          (key) => key === item.label
        );
      });
      filteredData?.forEach((col) => {
        const options =
          appliedFilterPairs?.[
            Object.keys(appliedFilterPairs || {})?.filter(
              (key) => col.label === key
            )?.[0]
          ];
        switch (col.as) {
          case 'date': {
            if (options?.length) {
              const startDate = new Date(options?.[0] || '');
              const endDate = new Date(options?.[1] || '');
              const dateObj = setOnDateChange(startDate, endDate);
              onChangeGlobalFilter({
                column: col,
                operator: BETWEEN,
                setAppliedFilters,
                type: DATE_PICKER,
                value:
                  dateObj?.startDate && dateObj?.endDate ? dateObj : undefined,
              });
            }
            break;
          }
          case 'number': {
            const minMax = {
              min: options?.toString().split(' AND ')?.[0],
              max: options?.toString().split(' AND ')?.[1],
            };
            if (options?.length) {
              setAppliedFilters((prev: any[]) => {
                const field = {
                  column: col.name,
                  operator: BETWEEN,
                  value: options,
                  as: col.as,
                  defaultValues: minMax,
                  filterType: col.isShowHorizontal ? 'horizontal' : 'global',
                  isFilterApplied: Boolean(col.isShowHorizontal),
                  applyOnTables: col.applyOnTables,
                  isVariableFilter: col.isVariableFilter,
                  variableStrings: col.variableStrings || [],
                  label: col.label || col.name,
                };
                const index = prev.findIndex((f) => f.label === col.label);
                if (index === -1) return [...prev, field];
                const updated = [...prev];
                updated[index] = field;
                return updated;
              });
            }
            break;
          }
          default: {
            if (col?.filterVariant?.value) {
              switch (col.filterVariant?.value) {
                case IN: {
                  const selectedOptions = Array?.isArray(options)
                    ? options?.map((opt) => ({
                        value: opt,
                        label: opt,
                      }))
                    : [
                        {
                          value: options,
                          label: options,
                        },
                      ];
                  onChangeGlobalFilter({
                    column: col,
                    operator: IN,
                    setAppliedFilters,
                    type: MULTI_SELECT,
                    value: options?.length ? selectedOptions : undefined,
                  });
                  break;
                }
                case LIKE: {
                  onChangeGlobalFilter({
                    column: col,
                    operator: LIKE,
                    setAppliedFilters,
                    type: SEARCH,
                    value: options,
                  });
                  break;
                }
                default: {
                  onChangeGlobalFilter({
                    column: col,
                    operator: EQUAL_OPERATOR,
                    setAppliedFilters,
                    type: SINGLE_SELECT,
                    value: options
                      ? { value: options, label: options }
                      : undefined,
                  });
                }
              }
            } else if (col.as === 'string' && !col.isVariableFilter) {
              const selectedOptions = Array?.isArray(options)
                ? options?.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))
                : [
                    {
                      value: options,
                      label: options,
                    },
                  ];
              onChangeGlobalFilter({
                column: col,
                operator: IN,
                setAppliedFilters,
                type: MULTI_SELECT,
                value: selectedOptions?.length ? selectedOptions : undefined,
              });
            } else {
              onChangeGlobalFilter({
                column: col,
                operator: EQUAL_OPERATOR,
                setAppliedFilters,
                type: SINGLE_SELECT,
                value: options,
              });
            }
          }
        }
      });
    }
  }, [filters]);

  return (
    <>
      <>
        <div className={styles.filterContainer}>
          {filterList?.length ? (
            <FilterPopup
              globalFilterRef={globalFilterRef}
              appliedfilters={appliedfilters}
              setAppliedFilters={setAppliedFilters}
              handleSubmit={handleSubmit}
              resetFilters={resetFilters}
              renderAdditionalHeaderContent={renderAdditionalHeaderContent}
              filters={filters}
              setFilterList={setFilterList}
              filterList={filterList}
              internal={internal}
              clientId={clientId}
              isAllClient={isAllClient}
              theme={theme}
              filterOptions={filterOptions}
              tenancyLevel={tenancyLevel}
            />
          ) : hasAddOnFilters ? (
            <FilterPopup
              globalFilterRef={globalFilterRef}
              appliedfilters={appliedfilters}
              setAppliedFilters={setAppliedFilters}
              handleSubmit={handleSubmit}
              resetFilters={resetFilters}
              renderAdditionalHeaderContent={renderAdditionalHeaderContent}
              filters={filters}
              setFilterList={setFilterList}
              filterList={filterList}
              internal={internal}
              clientId={clientId}
              isAllClient={isAllClient}
              theme={theme}
              filterOptions={filterOptions}
              tenancyLevel={tenancyLevel}
            />
          ) : null}
          <HorizontalFilters
            appliedfilters={appliedfilters}
            setAppliedFilters={setAppliedFilters}
            filters={filters}
            internal={internal}
            clientId={clientId}
            isAllClient={isAllClient}
            theme={theme}
            addGlobalFilter={addGlobalFilter}
            filterOptions={filterOptions}
            tenancyLevel={tenancyLevel}
          />
        </div>
        {/* {appliedfilters.length ? (
          <AppliedFilter
            appliedFilter={appliedfilters}
            setAppliedFilters={setAppliedFilters}
            onChangeFilters={(updatedFilters) =>
              onChangeFilters(updatedFilters)
            }
          />
        ) : null} */}
      </>
      {appliedfilters?.find(
        (itm) => itm.filterType === 'global' && !itm.isFilterApplied
      ) ? (
        <div className={styles.alertContainer}>
          <Alert text="Global filter selected. Click apply to see the changes." />
        </div>
      ) : null}
    </>
  );
};

type FilterPopupProps = {
  filters: GlobalFilterType[];
  renderAdditionalHeaderContent?: () => JSX.Element;
  filterList: GlobalFilterColumn[];
  setFilterList: React.Dispatch<React.SetStateAction<GlobalFilterColumn[]>>;
  appliedfilters: FilterFieldType[];
  setAppliedFilters: (value: React.SetStateAction<FilterFieldType[]>) => void;
  globalFilterRef: React.RefObject<HTMLDivElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetFilters: () => void;
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

export const FilterPopup: React.FC<FilterPopupProps> = ({
  globalFilterRef,
  appliedfilters,
  setAppliedFilters,
  handleSubmit,
  resetFilters,
  renderAdditionalHeaderContent,
  filterList,
  filters,
  setFilterList,
  internal,
  clientId,
  isAllClient,
  theme,
  filterOptions,
  tenancyLevel,
}) => {
  return (
    <PopoverMenu
      position="bottom"
      tabMenu
      menuWidth="auto"
      buttonContent={
        <div className={styles.filterButton} ref={globalFilterRef}>
          <div className={styles.filterBtnText}>
            <Icons name="funnel" /> Filters
          </div>
          {appliedfilters?.length === 0 ? null : (
            <span className={styles.filterLength}>
              {appliedfilters?.length}
            </span>
          )}
        </div>
      }
    >
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onReset={resetFilters}
        >
          <div className={styles.filterHeader}>
            <div className={styles.titleContent}>
              <Text>Filters</Text>
              {renderAdditionalHeaderContent
                ? renderAdditionalHeaderContent()
                : null}
            </div>
          </div>
          <Filters
            filterList={filterList}
            appliedfilters={appliedfilters}
            filters={filters}
            setFilterList={setFilterList}
            setAppliedFilters={setAppliedFilters}
            internal={internal}
            clientId={clientId}
            isAllClient={isAllClient}
            theme={theme}
            filterOptions={filterOptions}
            tenancyLevel={tenancyLevel}
          />
          <div className={styles.buttons}>
            <Button
              type="reset"
              variant="tertiary"
              className="hover:dbn-bg-gray"
            >
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </PopoverMenu>
  );
};
