/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect } from 'react';
import transformData, { ResultItem } from './transformData';
import styles from './pivotTable.module.css';
import { PivotSettingsType } from '@/types';
import { adaptiveFormatter } from '@/helpers/adaptiveFormatter';

const PivotTable = ({
  data,
  pivotTableSettings,
  onChartReady,
}: {
  data: any[];
  pivotTableSettings?: PivotSettingsType;
  onChartReady?: () => void;
}) => {
  useEffect(() => {
    if (data?.length || pivotTableSettings) onChartReady?.();
  }, [data, onChartReady, pivotTableSettings]);

  const metrics = pivotTableSettings?.rows || [];
  const groups = pivotTableSettings?.columns || [];
  const output = transformData(data, groups, metrics);
  return (
    <div className={styles.tableData}>
      <div className={styles.tableScroll}>
        <div className={styles.tableSet}>
          <table role="grid">
            <thead>
              <tr className={styles.row}>
                <td className={styles.tableHeadCol}>metric</td>
                {metrics.map((metric) => (
                  <td
                    colSpan={data.length}
                    rowSpan={1}
                    className={styles.tableMetricHeadCol}
                    key={metric}
                  >
                    {metric}
                  </td>
                ))}
              </tr>
              {groups.map((group, idx) => (
                <tr className={styles.row} key={idx}>
                  <td className={styles.tableHeadCol}>{group}</td>
                  {metrics.map(() =>
                    output[group].map((value, index) => (
                      <td
                        colSpan={(value as ResultItem).count}
                        rowSpan={1}
                        className={styles.tableHeadCol}
                        key={index}
                      >
                        {(value as ResultItem).name}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              <tr>
                <th colSpan={1} className={styles.tableHeadCol}>
                  value
                </th>
                {metrics.map((val) =>
                  output[val].map((value, idx) => (
                    <td
                      role="gridcell"
                      className={styles.tableRowCol}
                      key={idx}
                    >
                      {adaptiveFormatter(value.name as number, true)}
                    </td>
                  ))
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PivotTable;
