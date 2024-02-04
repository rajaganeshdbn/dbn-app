/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-dom-props */
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { INPUT_TABLE, OUTPUT_TABLE } from '@/consts/app';
import { Table, Button, Icons, Text } from '@/components';
import NoData from '@/components/Svg/No_data.svg';

type Props = {
  // previewTableDataList: any[] | undefined;
  outpuTableData: any[] | undefined;
  isOutputLoading: boolean;
  outputError: string;
  isUpdateMetric?: boolean;
  isDisableSqlBtn: boolean;
  setShowSqlModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TableTab = ({
  outpuTableData,
  outputError,
  isOutputLoading,
  isUpdateMetric,
  isDisableSqlBtn,
  setShowSqlModal,
}: Props) => {
  return (
    <div className={styles.container}>
      {outpuTableData?.length && !outputError ? (
        <div className={styles.table}>
          <Table
            data={outpuTableData}
            filterValues={[]}
            onMaximize={() => {}}
            isLoading={isOutputLoading}
            error={outputError}
            tableSettings={{
              showTableTitle: false,
              hideVerticalDivider: false,
              showRowHover: false,
              enableStripedRows: false,
              enableTableSearch: false,
              contentAlignment: 'left',
              enableFilter: false,
              enableSorting: true,
              lineGap: '',
              showTableDesc: false,
            }}
            headerAlignment="left"
          />
        </div>
      ) : (
        <>
          {outputError ? (
            <div className="dbn-w-full dbn-h-full dbn-flex dbn-items-center dbn-justify-center">
              <Text variant="heading-lg" color="alert">
                {outputError}
              </Text>
            </div>
          ) : (
            <div className={styles.metricChartEmpty}>
              <img
                src={NoData}
                alt="no data"
                style={{ width: '300px', height: '300px' }}
              />
              <Text variant="heading-lg">
                Choose a table to create your metric
              </Text>
              <div className={styles.chartButton}>
                <Text variant="body-text-sm">
                  Drag and Drop columns to visualize the chart
                </Text>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
