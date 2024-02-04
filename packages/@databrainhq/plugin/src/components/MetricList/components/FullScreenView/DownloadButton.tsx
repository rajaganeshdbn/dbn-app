/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import EChartsReact from 'echarts-for-react';
import styles from './fullscreen.module.css';
import {
  ChartImageDownloadButton,
  CsvDownloadButton,
  Icons,
  Menu,
  NewTooltip,
  RawCsvDownloadButton,
  PivotDownloadButton,
} from '@/components';

import { ChartSettingsType } from '@/types';
import { CHART_TYPES, DOWNLOAD_DATA_OPTIONS, IS_SELF_HOSTED } from '@/consts';

export type DownloadButtonProps = {
  data: Record<string, any>[];
  chartRef?: React.RefObject<EChartsReact>;
  metricName: string;
  onRawCsvData: () => void;
  chartOptions?: ChartSettingsType;
  query: string;
  companyIntegrationId: string;
  integrationName: string;
  queryWithNoFilter: string;
  updateDownloadProgress: (isEnable: boolean) => void;
};

export const DownloadButton = ({
  data,
  chartRef,
  metricName,
  onRawCsvData,
  chartOptions,
  integrationName,
  companyIntegrationId,
  query,
  queryWithNoFilter,
  updateDownloadProgress,
}: DownloadButtonProps) => {
  const downloadItems = [
    {
      name: DOWNLOAD_DATA_OPTIONS?.RAW_DATA,
      content: (
        <RawCsvDownloadButton
          fileName={metricName}
          className={styles.popupItem}
          companyIntegrationId={companyIntegrationId}
          integrationName={integrationName}
          query={query}
          updateDownloadProgress={updateDownloadProgress}
        >
          <Icons name="download" />
          Download
        </RawCsvDownloadButton>
      ),
    },
    {
      name: DOWNLOAD_DATA_OPTIONS?.DOWNLOAD_WITHOUT_FILTERS,
      content: (
        <RawCsvDownloadButton
          fileName={metricName}
          className={styles.popupItem}
          companyIntegrationId={companyIntegrationId}
          integrationName={integrationName}
          query={queryWithNoFilter}
          updateDownloadProgress={updateDownloadProgress}
        >
          <Icons name="download" />
          Download Without Filters
        </RawCsvDownloadButton>
      ),
    },
    {
      name: DOWNLOAD_DATA_OPTIONS?.EMAIL_RAW_DATA,
      leftIcon: <Icons name="table-view" />,
      onClick: onRawCsvData,
    },

    ...(chartOptions?.chartType === CHART_TYPES.pivot
      ? [
          {
            name: DOWNLOAD_DATA_OPTIONS?.PIVOT_CSV,
            content: (
              <PivotDownloadButton
                text={DOWNLOAD_DATA_OPTIONS?.PIVOT_CSV}
                data={data}
                fileName={metricName}
                className={styles.popupItem}
                chartOptions={chartOptions}
              />
            ),
          },
        ]
      : []),
    ...(chartRef &&
    ![
      CHART_TYPES.pivot,
      CHART_TYPES.horizontalStackTable,
      CHART_TYPES.table,
    ].includes(chartOptions?.chartType || '')
      ? [
          {
            name: DOWNLOAD_DATA_OPTIONS?.SAVE_AS_PNG,
            content: (
              <ChartImageDownloadButton
                text={DOWNLOAD_DATA_OPTIONS?.SAVE_AS_PNG}
                chartRef={chartRef}
                className={styles.popupItem}
                fileName={metricName}
              />
            ),
          },
        ]
      : []),
  ];
  return (
    <>
      <Menu
        menuWidth="dbn-w-[400px]"
        items={
          IS_SELF_HOSTED
            ? downloadItems.filter(
                (item) => item.name !== DOWNLOAD_DATA_OPTIONS?.EMAIL_RAW_DATA
              )
            : downloadItems
        }
        buttonContent={
          <NewTooltip text="Download">
            <div className={styles.backButton}>
              <Icons name="download" />
            </div>
          </NewTooltip>
        }
        position="bottom-end"
        disableAutoClose
      />
    </>
  );
};
