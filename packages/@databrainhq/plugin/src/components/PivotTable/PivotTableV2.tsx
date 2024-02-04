/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useState } from 'react';
import styles from './pivotTable.module.css';
import { Button, Icons, SkeletonLoader } from '@/components';
import { Aggregate, OnDrillPivotTableParams, PivotDrillState } from '@/types';

const generateGrayShades = (numShades: number) => {
  const baseColor = 255; // White color
  const shades = [];

  for (let i = 0; i < numShades; i += 1) {
    const darkness = i * 0.03; // 10% darkness increment
    const shade = Math.round(baseColor - darkness * baseColor);
    shades.push(`rgb(${shade}, ${shade}, ${shade})`);
  }

  return shades.reverse();
};

type DataRow = Record<string, any>;
type PivotTableProps = {
  data: DataRow[];
  columns: string[];
  rows: string[];
  values: string[];
  headerSettings?: {
    textColor?: string;
    color?: string;
    isEnabled?: boolean;
  };
  measures: Aggregate[];
  isEnableStripedRows: boolean;
  dimensions: string[];
  onDrillPivotTable?: (value: OnDrillPivotTableParams) => void;
  pivotDrillState: PivotDrillState;
};
type RenderRowProps = {
  label: string;
  level: number;
  parentValues: { columnName: string; value: string }[];
  isEnableDrill: boolean;
  paddingLeft: number;
};

type NestedArray = {
  value: string;
  children: NestedArray;
  columnName: string;
  parents: { name: string; value: string }[];
}[];
type ConvertedColumn = {
  value: string;
  childrenLength: number;
  parents: { name: string; value: string }[];
  name: string;
};
type ConvertNestedArray = {
  values: ConvertedColumn[];
}[];
const isMatchingLabel = (row: DataRow, label: string, value: string): boolean =>
  row[label] === value;
const areParentRowValuesMatching = (
  row: DataRow,
  rows: string[],
  parentRowValues: string[]
): boolean => parentRowValues.every((value, i) => row[rows[i]] === value);
const areParentColumnValuesMatching = (
  row: DataRow,
  columns: string[],
  column: ConvertedColumn
): boolean =>
  columns
    .slice(0, columns.length - 1)
    .every(
      (col) => row[col] === column.parents.find((c) => c.name === col)?.value
    );
const isColumnValueMatching = (
  row: DataRow,
  column: ConvertedColumn
): boolean => row[column.name] === column.value;

const generateNestedArray = (
  data: DataRow[],
  columns: string[]
): NestedArray => {
  const root: NestedArray = [];

  data.forEach((record) => {
    let currentLevel: NestedArray = root;
    const parents: { name: string; value: string }[] = [];

    columns.forEach((column, index) => {
      const value = record[column];
      const existingNode = currentLevel.find((node) => node.value === value);

      if (existingNode) {
        currentLevel = existingNode.children || [];
        parents.push({ name: column, value });
      } else {
        const newNode: NestedArray = [
          {
            columnName: column,
            children: [],
            value,
            parents: columns.slice(0, index).map((parentColumn) => ({
              name: parentColumn,
              value: record[parentColumn],
            })),
          },
        ];
        currentLevel.push(newNode[0]);
        currentLevel = newNode[0].children || [];
      }
    });
  });

  return root;
};

const convertNestedArray = (nestedArray: NestedArray) => {
  const result: ConvertNestedArray = [];
  const convertLevel = (items: NestedArray) => {
    result.push({
      values: items.map((item) => ({
        value: item.value,
        childrenLength: item.children ? item.children.length : 0,
        parents: item.parents,
        name: item.columnName,
      })),
    });

    const nextLevel = items.reduce((acc: any, item) => {
      if (item.children) {
        acc = acc.concat(item.children);
      }
      return acc;
    }, []);

    if (nextLevel.length > 0) {
      convertLevel(nextLevel);
    }
  };

  convertLevel(nestedArray);

  return result;
};

const calculateAggregate = (
  data: DataRow[],
  measureKey: string,
  aggregate: string
) => {
  const values = data.map((item) =>
    Number.isNaN(item[measureKey]) ? 0 : Number(item[measureKey] || 0)
  );
  switch (aggregate?.toLowerCase()) {
    case 'sum':
      return values.reduce((total, value) => total + value, 0);
    case 'avg':
      return values.reduce((total, value) => total + value, 0)
        ? values.reduce((total, value) => total + value, 0) / values.length
        : 0;
    case 'min':
      return values.length ? Math.min(...values) : 0;
    case 'max':
      return values.length ? Math.max(...values) : 0;
    default:
      return values.reduce((total, value) => total + value, 0);
  }
};
const ExpandableTable = ({
  props: {
    rows,
    data,
    columns,
    values,
    headerSettings,
    measures,
    isEnableStripedRows,
    dimensions,
    pivotDrillState,
    onDrillPivotTable,
  },
}: {
  props: PivotTableProps;
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const grayShades: string[] = generateGrayShades(
    dimensions?.length - (columns?.length || 0)
  );
  const toggleRow = (key: string) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [key]: !prevExpandedRows[key],
    }));
  };
  // Extract unique values for each row item
  const uniqueRowValues: Record<string, string[]> = {};

  const nestedColumns = generateNestedArray(data, columns);
  rows.forEach((rowKey) => {
    uniqueRowValues[rowKey] = Array.from(
      new Set(data.map((row) => `${row[rowKey]}`))
    );
  });
  const convertedNestedColumns = convertNestedArray(nestedColumns);

  const renderColumnHeaders = (headers: ConvertNestedArray) => {
    return (
      <>
        {headers.map((head, i) => (
          <tr className={styles.rowP2}>
            {!!rows.length && (
              <th
                key=""
                className={styles.tableHeadColP2}
                style={{
                  backgroundColor: headerSettings?.isEnabled
                    ? headerSettings.color
                    : '',
                  color: headerSettings?.textColor,
                }}
              >
                {' '}
              </th>
            )}
            {head.values.map((val) => (
              <th
                className={styles.tableHeadColP2}
                colSpan={
                  i === headers.length - 1
                    ? values.length
                    : val.childrenLength * values.length
                }
                style={{
                  backgroundColor: headerSettings?.isEnabled
                    ? headerSettings.color
                    : '',
                  color: headerSettings?.textColor,
                }}
              >
                {val.value}
              </th>
            ))}
          </tr>
        ))}
      </>
    );
  };
  const renderRow = ({
    isEnableDrill,
    label,
    level,
    parentValues,
    paddingLeft,
  }: RenderRowProps): JSX.Element => {
    const key = parentValues
      .map((col) => `${col.columnName};;${col.value}`)
      .join(';;');
    return (
      <>
        {(level === 0
          ? uniqueRowValues?.[label]
          : Array.from(
              new Set(
                pivotDrillState?.data
                  ?.find((row) => row.key === key)
                  ?.data.map((row) => `${row[label]}`)
              )
            )
        )?.map((value, index) => {
          const bgColor = index % 2 !== 0 ? '#F4F4F4' : '';
          return (
            <>
              <tr
                className={`${styles.rowHoverP2}`}
                style={{
                  backgroundColor: !isEnableStripedRows
                    ? grayShades[level]
                    : bgColor,
                }}
              >
                <td key={value} className={styles.tableRowColP2}>
                  <div className="dbn-flex dbn-gap-3" style={{ paddingLeft }}>
                    {value}
                    {isEnableDrill && (
                      <Button
                        variant="popover"
                        onClick={() => {
                          if (isEnableDrill) {
                            toggleRow(value);
                            onDrillPivotTable?.({
                              filters: [
                                ...parentValues,
                                { columnName: label, value },
                              ],
                              nextLevel: level + 2,
                              currentValue: value,
                            });
                          }
                        }}
                        className="dbn-border-secondary dbn-border dbn-rounded"
                      >
                        {expandedRows?.[value] ? (
                          <Icons name="horizontal-rule" size="xs" />
                        ) : (
                          <Icons name="plus" size="xs" />
                        )}
                      </Button>
                    )}
                  </div>
                </td>
                {!!columns.length &&
                  convertedNestedColumns?.[
                    convertedNestedColumns.length - 1
                  ]?.values?.map((column) =>
                    values.map((val) => {
                      return (
                        <td className={styles.tableRowColP2}>
                          {calculateAggregate(
                            level === 0
                              ? data.filter(
                                  (row: DataRow) =>
                                    isMatchingLabel(row, label, value) &&
                                    areParentRowValuesMatching(
                                      row,
                                      rows,
                                      parentValues.map((col) => col.value)
                                    ) &&
                                    areParentColumnValuesMatching(
                                      row,
                                      columns,
                                      column
                                    ) &&
                                    isColumnValueMatching(row, column)
                                )
                              : pivotDrillState.data
                                  .find((d) => d.key === key)
                                  ?.data.filter(
                                    (row) =>
                                      isMatchingLabel(row, label, value) &&
                                      areParentColumnValuesMatching(
                                        row,
                                        columns,
                                        column
                                      ) &&
                                      isColumnValueMatching(row, column)
                                  ) || [],
                            val,
                            measures.find((col) => col.alias === val)?.method ||
                              'SUM'
                          )}
                        </td>
                      );
                    })
                  )}
                {!columns.length &&
                  values.map((val) => {
                    return (
                      <td className={styles.tableRowColP2}>
                        {calculateAggregate(
                          level === 0
                            ? data.filter(
                                (row: DataRow) =>
                                  isMatchingLabel(row, label, value) &&
                                  areParentRowValuesMatching(
                                    row,
                                    rows,
                                    parentValues?.map((col) => col.value)
                                  )
                              )
                            : pivotDrillState.data
                                .find((d) => d.key === key)
                                ?.data.filter((row) =>
                                  isMatchingLabel(row, label, value)
                                ) || [],
                          val,
                          measures.find((col) => col.alias === val)?.method ||
                            'SUM'
                        )}
                      </td>
                    );
                  })}
              </tr>
              {expandedRows?.[value] &&
              pivotDrillState.isLoading &&
              pivotDrillState.currentValue === value ? (
                <tr>
                  {!columns.length
                    ? values.map(() => (
                        <td>
                          <SkeletonLoader variant="list" />
                        </td>
                      ))
                    : convertedNestedColumns?.[
                        convertedNestedColumns.length - 1
                      ]?.values?.map(() =>
                        values.map(() => (
                          <td>
                            <SkeletonLoader variant="list" />
                          </td>
                        ))
                      )}

                  <td>
                    <SkeletonLoader variant="list" className="dbn-w-full" />
                  </td>
                </tr>
              ) : (
                expandedRows?.[value] &&
                renderRow({
                  label: rows[level + 1],
                  level: level + 1,
                  parentValues: [...parentValues, { columnName: label, value }],
                  isEnableDrill:
                    dimensions?.filter((dim) => !columns?.includes(dim))
                      ?.length >
                    level + 2,
                  paddingLeft: (level + 1) * 20,
                })
              )}
            </>
          );
        })}
      </>
    );
  };

  const renderColumnValues = () => {
    return (
      <>
        {convertedNestedColumns?.[
          convertedNestedColumns.length - 1
        ]?.values?.map((column) =>
          values.map((val) => {
            return (
              <td className={styles.tableRowColP2}>
                {calculateAggregate(
                  data.filter(
                    (row: DataRow) =>
                      areParentColumnValuesMatching(row, columns, column) &&
                      isColumnValueMatching(row, column)
                  ),
                  val,
                  measures.find((col) => col.alias === val)?.method || 'SUM'
                )}
              </td>
            );
          })
        )}
      </>
    );
  };
  return (
    <table className="dbn-w-full dbn-h-full">
      <thead>
        {values.length === 1 && (
          <tr className={styles.rowP2}>
            <>
              {values.map((val) => (
                <th
                  key={`${val}`}
                  colSpan={
                    columns.length
                      ? convertedNestedColumns?.[0]?.values?.length + 1
                      : values.length + 1
                  }
                  className={styles.tableHeadColP2}
                  style={{
                    backgroundColor: headerSettings?.isEnabled
                      ? headerSettings.color
                      : '',
                    color: headerSettings?.textColor,
                  }}
                >
                  {val}
                </th>
              ))}
            </>
          </tr>
        )}
        {!!columns.length && renderColumnHeaders(convertedNestedColumns)}

        {values.length > 1 && (
          <tr className={styles.rowP2}>
            <>
              {!!rows.length && (
                <th
                  className={styles.tableHeadColP2}
                  style={{
                    backgroundColor: headerSettings?.isEnabled
                      ? headerSettings.color
                      : '',
                    color: headerSettings?.textColor,
                  }}
                >
                  {' '}
                </th>
              )}
              {!!columns.length &&
                convertedNestedColumns?.[
                  convertedNestedColumns.length - 1
                ]?.values?.map((column) =>
                  values.map((val) => (
                    <th
                      key={`${column}_${val}`}
                      className={styles.tableHeadColP2}
                      style={{
                        backgroundColor: headerSettings?.isEnabled
                          ? headerSettings.color
                          : '',
                        color: headerSettings?.textColor,
                      }}
                    >
                      {val}
                    </th>
                  ))
                )}
              {!columns.length &&
                values.map((val) => (
                  <th
                    key={`${val}`}
                    className={styles.tableHeadColP2}
                    style={{
                      backgroundColor: headerSettings?.isEnabled
                        ? headerSettings.color
                        : '',
                      color: headerSettings?.textColor,
                    }}
                  >
                    {val}
                  </th>
                ))}
            </>
          </tr>
        )}
      </thead>
      <tbody>
        {!!rows.length &&
          renderRow({
            label: rows?.[0],
            level: 0,
            parentValues: [],
            isEnableDrill:
              dimensions?.filter((dim) => !columns?.includes(dim))?.length > 1,
            paddingLeft: 0,
          })}
        {!rows.length && renderColumnValues()}
      </tbody>
    </table>
  );
};

export const PivotTableV2 = ({
  props: {
    data,
    rows,
    columns,
    values,
    headerSettings,
    measures,
    isEnableStripedRows,
    dimensions,
    onDrillPivotTable,
    pivotDrillState,
  },
}: {
  props: PivotTableProps;
}) => {
  return (
    <div className={styles.tableData}>
      <div className={styles.tableScroll}>
        <div className={styles.tableSet}>
          <ExpandableTable
            props={{
              data,
              rows,
              columns,
              values,
              headerSettings,
              measures,
              isEnableStripedRows,
              dimensions,
              onDrillPivotTable,
              pivotDrillState,
            }}
          />
        </div>
      </div>
    </div>
  );
};
