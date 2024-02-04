/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable max-params */
/* eslint-disable react/forbid-elements */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import SimpleBar from 'simplebar-react';
import EChartsReact from 'echarts-for-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  Table as RTable,
  OnChangeFn,
  ColumnSizingState,
  Row,
} from '@tanstack/react-table';
import styles from './horizontalStack.module.css';
import { DebouncedInput } from './DebouncedInput';
import { Loader } from '@/components/Loader';
import { Text } from '@/components/Text';
import { TableSettings } from '@/types';
import conditionalFormattingStyles from '@/helpers/conditionalFormatting';
import { Icons } from '@/components/Icons';
import NoData from '@/components/Svg/No_data.svg';

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
  className?: string;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onChartReady?: () => void;
  stackCols?: string[];
  rawData?: any;
  colors?: string[];
  showLabels?: boolean;
};
export const HorizontalStackTable = ({
  data,
  isLoading,
  error,
  tableSettings,
  className = '',
  onColumnSizingChange,
  onChartReady,
  stackCols,
  rawData,
  colors,
  showLabels,
}: Props) => {
  const chartColors = colors?.length
    ? colors
    : [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ];
  const [badgeSeparator, setBadgeSeparator] = useState<string>(',');
  const [listSeparator, setListSeparator] = useState<string>(',');
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
        ? '0.75rem'
        : tableSettings?.lineGap === 'medium'
        ? '0.85'
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
    };
    const header = {
      width: '100%',
      color: '#6B7280',
      fontSize: fontSizeValue,
      height: heightValue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '500',
    };
    return {
      badgeDivStyle: badgediv,
      listDivStyle: listDiv,
      headerStyle: header,
    };
  }, [tableSettings?.lineGap, tableSettings?.contentAlignment]);

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

  const [columnSizing, setColumnSizing] = useState<
    ColumnSizingState | undefined
  >(tableSettings?.columnSizing);
  const [globalFilter, setGlobalFilter] = useState('');
  // const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  //   const itemRank = rankItem(row.getValue(columnId), value);
  //   addMeta({
  //     itemRank,
  //   });
  //   return itemRank.passed;
  // };
  useEffect(() => {
    onColumnSizingChange?.(columnSizing as ColumnSizingState);
  }, [columnSizing]);

  const tableData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data;
  }, [data]);

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
      globalFilter,
      ...(columnSizing ? { columnSizing } : {}),
    },
    sortingFns: {
      manualSorting,
    },
    enableGlobalFilter: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: false,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onColumnSizingChange: setColumnSizing as OnChangeFn<ColumnSizingState>,
  });

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
        {stackCols?.length ||
        tableSettings?.enableTableSearch ||
        tableSettings?.showTableTitle ||
        tableSettings?.tableTitle ? (
          <div
            className={
              tableSettings?.tableTitle?.length
                ? styles.preview
                : styles.searchButton
            }
          >
            {tableSettings?.tableTitle?.length ? (
              <Text variant="body-text-sm">{tableSettings.tableTitle}</Text>
            ) : null}
            <div className="dbn-flex dbn-flex-col dbn-gap-2">
              {tableSettings?.enableTableSearch && (
                <div className="dbn-w-full dbn-flex dbn-justify-end">
                  <DebouncedInput
                    value={globalFilter}
                    onChange={(value: any) => setGlobalFilter(String(value))}
                    placeholder="Search"
                  />
                </div>
              )}
              {stackCols?.length ? (
                <div className="dbn-flex dbn-gap-2 dbn-justify-end">
                  {stackCols.map((col, index) => (
                    <div className={styles.legendContainer}>
                      <div
                        style={{
                          backgroundColor: chartColors[index] || '#000000',
                        }}
                        className={styles.legend}
                      />
                      <Text variant="label">{col}</Text>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        <div className={styles.tableData}>
          {isLoading && !data?.length && (
            <div className={styles['table-loader-container']}>
              <Loader />
            </div>
          )}
          {!!data?.length && !!stackCols?.length && stackCols.length > 0 ? (
            <SimpleBar style={{ height: '100%' }}>
              <table className={styles.table}>
                <thead className="dbn-relative dbn-z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className={styles.row}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={styles.tableHeadCol}
                          colSpan={header.colSpan}
                          style={{ width: header.getSize() }}
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
                          {header.isPlaceholder ? null : (
                            <div style={headerStyle}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </th>
                      ))}
                      {stackCols.length ? (
                        <th scope="col" className={styles.tableHeadCol}>
                          {tableSettings?.stackColAlias}
                        </th>
                      ) : null}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getSortedRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`${styles.tableRow} ${
                        tableSettings?.showRowHover ? styles.rowHover : ''
                      } ${
                        tableSettings?.enableStripedRows &&
                        Number(index) % 2 !== 0
                          ? styles.stripedRow
                          : ''
                      }`}
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
                                            typeof cell.getValue() === 'object'
                                              ? JSON.stringify(cell.getValue())
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
                                            typeof cell.getValue() === 'object'
                                              ? JSON.stringify(cell.getValue())
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
                                            <div className={styles.listItem} />
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
                                          <Icons name="horizontal-rule" />
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
                      {stackCols.length ? (
                        <td
                          key={row.id}
                          className={`${styles.tableRowCol} ${
                            !tableSettings?.hideVerticalDivider
                              ? styles.tableBorderRight
                              : ''
                          } ${
                            !tableSettings?.hideHorizontalDivider
                              ? styles.tableBorderBottom
                              : ''
                          }`}
                        >
                          <EChartsReact
                            style={{
                              width: '100%',
                              height: '40%',
                            }}
                            option={{
                              tooltip: {
                                show: true,
                                appendToBody: true,
                                confine: true,
                                backgroundColor: 'black',
                                textStyle: {
                                  color: 'white',
                                },
                              },
                              color: chartColors,
                              xAxis: {
                                show: false,
                                type: 'value',
                              },
                              yAxis: {
                                show: false,
                                type: 'category',
                              },
                              grid: {
                                left: '0%',
                                right: '0%',
                                top: '0%',
                                bottom: '0%',
                                containLabel: showLabels,
                              },
                              series: stackCols.map((item) => {
                                return {
                                  type: 'bar',
                                  data: [
                                    {
                                      name: item,
                                      value: rawData[index][item],
                                    },
                                  ],
                                  stack: 'stack1',
                                  label: {
                                    show: showLabels,
                                    position: 'bottom',
                                  },
                                  emphasis: {
                                    focus: 'series',
                                  },
                                  itemStyle: {
                                    borderRadius: [0, 0, 0, 0],
                                  },
                                };
                              }),
                            }}
                            className={className}
                            notMerge
                          />
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </SimpleBar>
          ) : null}
          {(!data?.length || !stackCols?.length) &&
            !isLoading &&
            !error.length && (
              <div className={styles.noData}>
                <img src={NoData} alt="no-data" width="200px" height="200px" />
                <Text variant="body-text">No data available</Text>
                <Text variant="body-text">
                  Generate your query to visualise data
                </Text>
              </div>
            )}

          {error && (
            <div className={styles.error}>
              <Text variant="body-text">{error}</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
