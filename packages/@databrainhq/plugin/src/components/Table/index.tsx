/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable max-params */
/* eslint-disable react/forbid-elements */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import SimpleBar from 'simplebar-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  PaginationState,
  Table as RTable,
  OnChangeFn,
  ColumnSizingState,
  Row,
} from '@tanstack/react-table';
import TableIcon from '../Svg/Empty No tables preview.svg';
import styles from './table.module.css';
import { DebouncedInput } from './DebouncedInput';
import {
  Button,
  Text,
  Icons,
  FloatingDropDown,
  Loader,
  NewTooltip,
  SkeletonLoader,
} from '@/components';
import {
  ChartSettingsType,
  FloatingDropDownOption,
  TableSettings,
} from '@/types';
import { DEFAULT_CHART_SETTINGS, TableRowsList } from '@/consts';
import conditionalFormattingStyles from '@/helpers/conditionalFormatting';
import { ExternalMetrics } from '@/types/queryTypes';
import { adaptiveFormatter } from '@/helpers/adaptiveFormatter';

const columnHelper = createColumnHelper();

const manualSorting = (rowA: Row<any>, rowB: Row<any>, columnId: string) => {
  const valueA = rowA.getValue(columnId);
  const valueB = rowB.getValue(columnId);
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueA < valueB ? -1 : 1;
  }
  if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
    return valueA ? 1 : -1;
  }
  const dateA = new Date(valueA as string);
  const dateB = new Date(valueB as string);
  if (dateA.toString() !== 'Invalid Date') {
    return dateA.getTime() < dateB.getTime() ? -1 : 1;
  }
  return (valueA as string) < (valueB as string) ? -1 : 1;
};

type Props = {
  data?: any[];
  isLoading: boolean;
  error: string;
  tableSettings?: TableSettings;
  tableName?: string;
  className?: string;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onChartReady?: () => void;
  onChangePage?: (isPrev: boolean, resetValue?: number) => void;
  isExternalChart?: boolean;
  isEnablePrevBtn?: boolean;
  isEnableNextBtn?: boolean;
  paginationInfo?: { limit: number; offset: number; totalRecords: number };
  setChartSettings?: (value: React.SetStateAction<ChartSettingsType>) => void;
  isInfiniteScroll?: boolean;
  onLoadMore?: () => void;
  hasMoreData?: boolean;
  isShowFullScreen?: boolean;
  isShowFullScreenEnabled?: boolean;
  filterValues?: Record<string, any>;
  onMaximize?: () => void;
  headerAlignment?: 'left' | 'center' | 'right';
  events?: Record<string, Function>;
};
export const Table = ({
  data,
  isLoading,
  error,
  tableSettings,
  tableName,
  className = '',
  onColumnSizingChange,
  onChartReady,
  onChangePage,
  isExternalChart,
  isEnableNextBtn,
  isEnablePrevBtn,
  paginationInfo = { limit: 10, offset: 0, totalRecords: 10 },
  setChartSettings,
  isInfiniteScroll,
  onLoadMore,
  hasMoreData,
  isShowFullScreen,
  isShowFullScreenEnabled = false,
  onMaximize,
  headerAlignment = 'center',
  events,
}: Props) => {
  const [badgeSeparator, setBadgeSeparator] = useState<string>(',');
  const [listSeparator, setListSeparator] = useState<string>(',');
  const sortObjectKeysAlphabetically = (obj: any) => {
    const sortedObj: any = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sortedObj[key] = obj[key];
      });
    return sortedObj;
  };

  const sortedData = useMemo(
    () =>
      tableSettings?.isSortAlphabetically
        ? data?.map((item) => sortObjectKeysAlphabetically(item))
        : data,
    [data, tableSettings?.isSortAlphabetically]
  );
  useEffect(() => {
    if (tableSettings?.badgeSeparator)
      setBadgeSeparator(tableSettings.badgeSeparator);
    else setBadgeSeparator(',');
  }, [tableSettings?.badgeSeparator]);
  useEffect(() => {
    if (tableSettings?.listSeparator)
      setListSeparator(tableSettings.listSeparator);
    else setListSeparator(',');
  }, [tableSettings?.listSeparator]);
  const { badgeDivStyle, listDivStyle, headerStyle } = useMemo(() => {
    const heightValue =
      tableSettings?.lineGap === 'small'
        ? '1rem'
        : tableSettings?.lineGap === 'medium'
        ? '1.9rem'
        : '2.5rem';

    const fontSizeValue =
      tableSettings?.lineGap === 'small'
        ? '0.90rem'
        : tableSettings?.lineGap === 'medium'
        ? '0.95rem'
        : '1rem';

    const badgediv = {
      width: '100%',
      height: heightValue,
      fontSize: fontSizeValue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: tableSettings?.contentAlignment
        ? `${tableSettings.contentAlignment}`
        : '',
      gap: 1,
    };
    const listDiv = {
      width: '100%',
      fontSize: fontSizeValue,
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 1,
      height: '80px',
      // flexWrap: 'wrap',
    };
    const header = {
      width: '100%',
      color: '#6B7280',
      fontSize: `calc(${fontSizeValue} + 0.10rem)`,
      height: `calc(${heightValue} + 0.20rem)`,
      'text-align': headerAlignment,
      fontWeight: tableSettings?.headerFontBold ? '700' : '500',
    };
    return {
      badgeDivStyle: badgediv,
      listDivStyle: listDiv,
      headerStyle: header,
    };
  }, [
    tableSettings?.lineGap,
    tableSettings?.contentAlignment,
    tableSettings?.headerFontBold,
  ]);

  const bgColorStyle = (id: string, badgeArr: any, textArr: any) => {
    if (
      badgeArr &&
      textArr &&
      Object.keys(badgeArr).includes(id) &&
      Object.keys(textArr).includes(id)
    ) {
      return {
        backgroundColor: badgeArr[id],
        color: textArr[id],
      };
    }
    if (badgeArr && Object.keys(badgeArr).includes(id)) {
      return {
        backgroundColor: badgeArr[id],
      };
    }
    if (textArr && Object.keys(textArr).includes(id)) {
      return {
        color: textArr[id],
      };
    }
    return undefined;
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [rowSize, setRowSize] = useState({
    label: DEFAULT_CHART_SETTINGS.tableSettings?.defaultRowSize || '10',
    value: DEFAULT_CHART_SETTINGS.tableSettings?.defaultRowSize || '10',
  });
  const [infiniteScrollRecordCount, setInfiniteScrollRecordCount] =
    useState(50);
  const [columnSizing, setColumnSizing] = useState<
    ColumnSizingState | undefined
  >(tableSettings?.columnSizing);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    onColumnSizingChange?.(columnSizing as ColumnSizingState);
  }, [columnSizing]);
  useEffect(() => {
    if (!tableSettings?.defaultRowSize) return;
    const defaultRowSize = TableRowsList.find(
      (row) => row.value === tableSettings.defaultRowSize
    );
    if (!defaultRowSize) {
      const fallbackRowSize = TableRowsList.find(
        (row) =>
          row.value === DEFAULT_CHART_SETTINGS.tableSettings?.defaultRowSize
      );
      setRowSize(fallbackRowSize as FloatingDropDownOption);
    } else if (Number(defaultRowSize.value) > 1000) {
      setRowSize(TableRowsList.at(-1) as FloatingDropDownOption);
    } else setRowSize(defaultRowSize);
  }, [tableSettings?.defaultRowSize]);

  const tableData = useMemo(() => {
    if (
      !data ||
      !sortedData ||
      !Array.isArray(data) ||
      !Array.isArray(sortedData)
    )
      return [];
    return sortedData;
  }, [data, sortedData]);

  const columns = useMemo(() => {
    return Object.keys(tableData[0] || {}).map((colName: any) =>
      columnHelper.accessor(colName, {
        header: () => colName,
        cell: (info) => {
          const value = (info.row.original as any)[colName];
          if (typeof value === 'object') {
            return JSON.stringify(value);
          }
          if (typeof value === 'boolean') return value ? 'true' : 'false';
          return value;
        },
        // @ts-ignore
        sortingFn: 'manualSorting',
      })
    );
  }, [tableData[0]]);
  const table: RTable<any> = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
      ...(columnSizing ? { columnSizing } : {}),
    },
    sortingFns: {
      manualSorting,
    },
    enableGlobalFilter: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    // globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    manualPagination: true,
    debugTable: false,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onColumnSizingChange: setColumnSizing as OnChangeFn<ColumnSizingState>,
  });
  useEffect(() => {
    table.setPageSize(Number(rowSize.value));
  }, [rowSize, table]);
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageMetaData = useMemo(() => {
    const total = globalFilter
      ? table.getRowModel().rows.length
      : data?.length || 0;

    const from = total === 0 ? 0 : pageSize * pageIndex + 1;

    const to =
      total <= pageSize * (pageIndex + 1) ? total : pageSize * (pageIndex + 1);

    return {
      from,
      to,
      total,
    };
  }, [table, globalFilter, data?.length, pageIndex, pageSize]);
  let val: any;
  if (isExternalChart) {
    const formattedVal = adaptiveFormatter(paginationInfo.totalRecords, true)
      .toString()
      .split('.');
    if (formattedVal.length > 1) {
      if ([...formattedVal[1]].some((digit) => parseInt(digit, 10) > 0)) {
        val = adaptiveFormatter(paginationInfo.totalRecords, true);
      } else val = adaptiveFormatter(paginationInfo.totalRecords, false);
    } else val = adaptiveFormatter(paginationInfo.totalRecords, false);
  }
  useEffect(() => {
    if (table.getIsSomeColumnsVisible()) onChartReady?.();
  }, [table.getIsSomeColumnsVisible()]);
  const constructBadgeClass = (id: string, badgeArr: string[] | undefined) => {
    if (badgeArr?.includes(id)) return styles.badge;
    return '';
  };
  const constructListClass = (id: string, listArr: string[] | undefined) => {
    if (listArr?.includes(id)) return styles.list;
    return '';
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.previewTable}>
        {tableSettings?.enableTableSearch || tableSettings?.showTableTitle ? (
          <div
            className={
              tableSettings.showTableTitle
                ? styles.preview
                : styles.searchButton
            }
          >
            {tableSettings.showTableTitle && (
              <Text variant="heading-lg">{tableSettings.tableTitle}</Text>
            )}
            {tableSettings.enableTableSearch && (
              <DebouncedInput
                value={globalFilter}
                onChange={(value: any) => setGlobalFilter(String(value))}
                placeholder="Search"
              />
            )}
          </div>
        ) : null}
        <div className={styles.tableData}>
          {isLoading && !data?.length ? (
            <SkeletonLoader variant="table" />
          ) : null}
          {!!sortedData?.length && (
            <SimpleBar style={{ height: '100%' }}>
              <table className={styles.table}>
                {!tableSettings?.hideTableHeader ? (
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className={styles.row}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className={styles.tableHeadCol}
                            colSpan={header.colSpan}
                            style={{
                              width: header.getSize(),
                              backgroundColor: tableSettings?.customHeaderColor
                                ?.isEnabled
                                ? tableSettings.customHeaderColor?.color
                                : '',
                              color:
                                tableSettings?.customHeaderColor?.textColor,
                            }}
                          >
                            <button
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                              onDoubleClick={header.column.resetSize}
                              className={`${styles.resizer} ${
                                header.column.getIsResizing()
                                  ? styles.resizing
                                  : ''
                              }`}
                              type="button"
                              title="Resize Column"
                            />
                            {!tableSettings?.enableSorting ? (
                              <>
                                {header.isPlaceholder ? null : (
                                  <div
                                    style={headerStyle}
                                    className="dbn-truncate"
                                  >
                                    <span
                                      style={{
                                        color:
                                          tableSettings?.customHeaderColor
                                            ?.textColor,
                                      }}
                                    >
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? styles.sortButton
                                    : '',
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {header.isPlaceholder ? null : (
                                  <span
                                    style={{
                                      ...headerStyle,
                                      color:
                                        tableSettings?.customHeaderColor
                                          ?.textColor,
                                    }}
                                    className={styles.truncateText}
                                  >
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                  </span>
                                )}
                                <div className={styles.sortIcon}>
                                  {{
                                    asc: <Icons name="caret-up-fill" />, // sort up icon
                                    desc: <Icons name="caret-down-fill" />, // sort down icon
                                  }[header.column.getIsSorted() as string] ?? (
                                    <Icons name="caret-up-down" />
                                  )}
                                </div>
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                ) : null}
                <tbody>
                  {table
                    .getSortedRowModel()
                    .rows.slice(
                      isInfiniteScroll && !tableSettings?.isServerSidePagination
                        ? 0
                        : pagination.pageSize * pagination.pageIndex,
                      isInfiniteScroll && !tableSettings?.isServerSidePagination
                        ? onLoadMore
                          ? undefined
                          : infiniteScrollRecordCount
                        : pagination.pageSize * (1 + pagination.pageIndex)
                    )
                    .map((row, index) => (
                      <tr
                        key={row.id}
                        style={
                          events?.click ? { cursor: 'pointer' } : undefined
                        }
                        className={`${
                          tableSettings?.showRowHover ? styles.rowHover : ''
                        } ${
                          tableSettings?.enableStripedRows &&
                          Number(index) % 2 !== 0
                            ? styles.stripedRow
                            : ''
                        }`}
                        onClick={() => {
                          events?.click(
                            {},
                            Object.keys(row.original ?? {}).map((key) => ({
                              columnName: key,
                              value: row.original?.[key],
                            }))
                          );
                        }}
                      >
                        {row.getVisibleCells().map((cell) => {
                          let valArr: any[] = [];
                          let valStr: string = '';
                          let arr: any[] = [];
                          if (
                            constructBadgeClass(
                              cell.column.id,
                              tableSettings?.badgeColumns
                            )
                          ) {
                            valStr =
                              typeof cell.getValue() === 'object'
                                ? JSON.stringify(cell.getValue())
                                : (cell.getValue() as string);
                            if (valStr.toString().includes(badgeSeparator)) {
                              valArr = valStr.toString().split(badgeSeparator);
                            } else valArr = [valStr];
                          } else if (
                            constructListClass(
                              cell.column.id,
                              tableSettings?.listColumns
                            )
                          ) {
                            valStr =
                              typeof cell.getValue() === 'object'
                                ? JSON.stringify(cell.getValue())
                                : (cell.getValue() as string);
                            if (valStr.toString().includes(listSeparator)) {
                              arr = valStr
                                .toString()
                                .split(tableSettings?.listSeparator || ',');
                              valArr =
                                arr.length > 3 ? [arr[0], arr[1], arr[2]] : arr;
                            } else valArr = [valStr];
                          }
                          return (
                            <td
                              key={cell.id}
                              className={`${styles.tableRowCol} ${
                                !tableSettings?.hideVerticalDivider
                                  ? styles.tableBorderRight
                                  : ''
                              } ${
                                !tableSettings?.hideHorizontalDivider
                                  ? styles.tableBorderBottom
                                  : ''
                              }`}
                              title={
                                typeof cell.getValue() === 'object'
                                  ? JSON.stringify(cell.getValue())
                                  : `${cell.getValue() as string}`
                              }
                              onContextMenu={() => {
                                if (typeof cell.getValue() === 'string')
                                  events?.contextmenu({
                                    name: `${cell.getValue()}`,
                                  });
                              }}
                            >
                              {!!tableSettings && (
                                <div
                                  style={
                                    constructBadgeClass(
                                      cell.column.id,
                                      tableSettings.listColumns
                                    )
                                      ? {
                                          ...listDivStyle,
                                          ...conditionalFormattingStyles({
                                            rules:
                                              tableSettings.conditionalFormatting?.find(
                                                ({ columnName }) =>
                                                  columnName === cell.column.id
                                              )?.rules || [],
                                            value:
                                              typeof cell.getValue() ===
                                              'object'
                                                ? JSON.stringify(
                                                    cell.getValue()
                                                  )
                                                : cell.getValue(),
                                          }),
                                        }
                                      : {
                                          ...badgeDivStyle,
                                          ...conditionalFormattingStyles({
                                            rules:
                                              tableSettings.conditionalFormatting?.find(
                                                ({ columnName }) =>
                                                  columnName === cell.column.id
                                              )?.rules || [],
                                            value:
                                              typeof cell.getValue() ===
                                              'object'
                                                ? JSON.stringify(
                                                    cell.getValue()
                                                  )
                                                : cell.getValue(),
                                          }),
                                        }
                                  }
                                >
                                  {valStr.toString().includes(badgeSeparator) ||
                                  valStr.toString().includes(listSeparator) ? (
                                    <>
                                      {valArr.map((value) => (
                                        <>
                                          {constructBadgeClass(
                                            cell.column.id,
                                            tableSettings.badgeColumns
                                          ) ? (
                                            <span
                                              className={`${
                                                styles.truncateText
                                              } ${constructBadgeClass(
                                                cell.column.id,
                                                tableSettings.badgeColumns
                                              )}`}
                                              key={value}
                                              style={
                                                tableSettings.badgeColumns?.includes(
                                                  cell.column.id
                                                )
                                                  ? bgColorStyle(
                                                      cell.column.id,
                                                      tableSettings.badgeColors,
                                                      tableSettings.badgeTextColors
                                                    )
                                                  : {}
                                              }
                                            >
                                              {value}
                                            </span>
                                          ) : (
                                            <div
                                              className={`${styles.truncateText} ${styles.listItemDiv}`}
                                              key={value}
                                            >
                                              <div
                                                className={styles.listItem}
                                              />
                                              <div className={styles.listVal}>
                                                {value}
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      ))}
                                      {constructBadgeClass(
                                        cell.column.id,
                                        tableSettings.listColumns
                                      ) &&
                                        arr.length > 3 && (
                                          <span className={styles.truncateIcon}>
                                            <Icons
                                              name="kebab-menu-horizontal"
                                              size="xs"
                                            />
                                          </span>
                                        )}
                                    </>
                                  ) : (
                                    <span
                                      className={`${
                                        styles.truncateText
                                      } ${constructBadgeClass(
                                        cell.column.id,
                                        tableSettings.badgeColumns
                                      )}`}
                                      style={
                                        tableSettings.badgeColumns?.includes(
                                          cell.column.id
                                        )
                                          ? bgColorStyle(
                                              cell.column.id,
                                              tableSettings.badgeColors,
                                              tableSettings.badgeTextColors
                                            )
                                          : {}
                                      }
                                    >
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                              {!tableSettings && (
                                <div
                                  style={{ textAlign: 'center', width: '100%' }}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </SimpleBar>
          )}
          {!data?.length && !isLoading && !error.length && (
            <div className={styles.noData}>
              <img src={TableIcon} alt="no-data" width="400px" height="400px" />
              <Text variant="heading-lg">No data tables queried</Text>
              <Text variant="body-text-sm">
                Type your query and input fields beside to generate results and
                explore data
              </Text>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <Text>{error}</Text>
            </div>
          )}
        </div>
        {data &&
          !tableSettings?.disablePagination &&
          (!isInfiniteScroll || tableSettings?.isServerSidePagination) && (
            <div className={styles.pagination}>
              <div className={styles.rowStyle}>
                <FloatingDropDown
                  onChange={(value) => {
                    setRowSize(value);
                    if (isExternalChart) {
                      onChangePage?.(false, parseInt(value.value, 10));
                      setChartSettings?.((prev) => ({
                        ...prev,
                        tableSettings: {
                          ...prev.tableSettings,
                          defaultRowSize: value.value,
                        },
                      }));
                    }
                  }}
                  selectedOption={rowSize}
                  options={TableRowsList}
                  labelVariant="static"
                  menuWidth="120px"
                  buttonWidth="120px"
                />
              </div>
              {isExternalChart ? (
                <span className={styles.pageStyle}>
                  {paginationInfo.offset + 1}-
                  {paginationInfo.offset + data.length} of {val}
                </span>
              ) : (
                <span className={styles.pageStyle}>
                  {pageMetaData.from}-{pageMetaData.to} of {pageMetaData.total}
                </span>
              )}
              <div className="dbn-flex dbn-gap-2">
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.btnHover}
                    variant="popover"
                    type="button"
                    onDoubleClick={() => {
                      table.setPageIndex(0);
                    }}
                    onClick={() => {
                      if (isExternalChart) {
                        onChangePage?.(true);
                      } else {
                        table.previousPage();
                      }
                    }}
                    isDisabled={
                      isExternalChart
                        ? !isEnablePrevBtn
                        : pageMetaData.from <= 1
                    }
                  >
                    <Icons size="xs" name="arrow-left" />
                  </Button>

                  {table.getPageCount() >= 2 && (
                    <Button
                      className={styles.btnHover}
                      variant="popover"
                      type="button"
                      onClick={() => {
                        if (isExternalChart) {
                          onChangePage?.(true);
                        }
                      }}
                      isDisabled={
                        isExternalChart
                          ? !isEnablePrevBtn
                          : pageMetaData.from <= 1
                      }
                    >
                      {pageIndex + 1}
                    </Button>
                  )}

                  {(table.getPageCount() === 1 ||
                    table.getPageCount() >= 3) && (
                    <Button
                      className={styles.btnHover}
                      variant="popover"
                      type="button"
                      onClick={() => {
                        if (isExternalChart) {
                          onChangePage?.(true);
                        } else {
                          table.nextPage();
                        }
                      }}
                      isDisabled={
                        isExternalChart
                          ? !isEnableNextBtn
                          : !table.getCanNextPage()
                      }
                    >
                      {table.getPageCount() === 1 ? 1 : pageIndex + 2}
                    </Button>
                  )}

                  {table.getPageCount() >= 2 && (
                    <Button
                      className={styles.btnHover}
                      variant="popover"
                      type="button"
                      onClick={() => {
                        if (isExternalChart) {
                          onChangePage?.(true);
                        } else {
                          if (table.getPageCount() === 2) {
                            table.nextPage();
                            return;
                          }
                          table.nextPage();
                          table.nextPage();
                        }
                      }}
                      isDisabled={
                        isExternalChart
                          ? !isEnableNextBtn
                          : table.getPageCount() === 2
                          ? !table.getCanNextPage()
                          : pageIndex + 3 > table.getPageCount()
                      }
                    >
                      {pageIndex + 3 > table.getPageCount()
                        ? table.getPageCount() === 2
                          ? pageIndex + 2
                          : pageIndex + 3
                        : pageIndex + 3}
                    </Button>
                  )}
                  <Button
                    className={styles.btnHover}
                    variant="popover"
                    type="button"
                    onDoubleClick={() => {
                      table.setPageIndex(table.getPageCount() - 1);
                    }}
                    onClick={() => {
                      if (isExternalChart) {
                        onChangePage?.(false);
                      } else {
                        table.nextPage();
                      }
                    }}
                    isDisabled={
                      isExternalChart
                        ? !isEnableNextBtn
                        : pageMetaData.to >= pageMetaData.total
                    }
                  >
                    <Icons size="xs" name="arrow-right" />
                  </Button>
                </div>

                {isShowFullScreenEnabled && (
                  <div className={styles.isFullScreenEnabled}>
                    {isShowFullScreen && (
                      <Button
                        type="button"
                        variant="popover"
                        onClick={onMaximize}
                        leftIcon={
                          <div className={styles.fullScreenBtn}>
                            <Icons name="fullscreen" />
                          </div>
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        {isInfiniteScroll &&
        !tableSettings?.isServerSidePagination &&
        data &&
        (data.length > infiniteScrollRecordCount ||
          (hasMoreData && data.length)) ? (
          <div className="dbn-p-2.5 dbn-px-5 dbn-flex dbn-justify-end">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                if (onLoadMore) onLoadMore();
                else setInfiniteScrollRecordCount((prev) => prev + 50);
              }}
              className={styles.loadMore}
            >
              Load More
              <Icons name="double-arrow-right" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
