/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useMemo, useRef, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import { ColumnSizingState } from '@tanstack/react-table';
import styles from './charttab.module.css';
import {
  Text,
  Chart,
  Icons,
  Button,
  ChartSettingsPopup,
  FullScreenChart,
  Loader,
} from '@/components';

import {
  ClickActionsConfig,
  ChartSettingsType,
  SelectedColumn,
  PivotDrillState,
} from '@/types';
import { getChartOptions } from '@/utils/getChartOptions';
import { MultiSelect } from '@/components/Select';
import { chartOptions } from '@/consts';
import NoData from '@/components/Svg/No_data.svg';
import { AutoCompleteDropdown } from '@/components/AutoCompleteDropdown';

type Props = {
  data?: Record<string, any>[];
  isLoading: boolean;
  headerChild?: JSX.Element;
  chartPopupChild?: JSX.Element;
  chartColors?: string[];
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  handleChartRightClick?: (params: any) => void;
  chartClickConfig?: ClickActionsConfig['chart'];
  isEnablePivotTable: boolean;
  groupbyList: any[];
  hasNumberKeys: boolean;
  isEnableGauge: boolean;
  error: string;
  pivotDrillState: PivotDrillState;
};
export const ChartTab = ({
  data,
  isLoading,
  headerChild,
  chartSettings,
  setChartSettings,
  chartColors,
  handleChartRightClick,
  chartClickConfig,
  chartPopupChild,
  isEnablePivotTable,
  groupbyList,
  hasNumberKeys,
  isEnableGauge,
  pivotDrillState,
  error,
}: Props) => {
  const chartRef = useRef<EChartsReact>(null);
  const options = useMemo(
    () =>
      getChartOptions({
        chartOptions: chartSettings,
        data: data || [],
        colors: chartColors,
      }),
    [data, chartSettings, chartColors]
  );
  return (
    <div className={styles['chartTab-container']}>
      <div className={styles.metricChartHeader}>
        {headerChild}
        {chartSettings.customSettings?.showSelectLegend ? (
          <MultiSelect
            name="legend"
            options={
              options?.legend?.data?.length
                ? options.legend.data?.map((option: any) => ({
                    value: option,
                    label: option,
                  }))
                : []
            }
            onChange={(value) => {
              setChartSettings((prev) => ({
                ...prev,
                selectedSeries: value,
              }));
            }}
            value={chartSettings.selectedSeries}
            isDisableShowSelectedTag
            isSearchEnabled
          />
        ) : null}
      </div>
      {isLoading && (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      )}
      {!error &&
        !chartSettings.xAxis &&
        !chartSettings.yAxisList?.length &&
        !isLoading && (
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
      {!!data?.length &&
      !isLoading &&
      (chartSettings.xAxis || chartSettings.yAxisList?.length) ? (
        <div className={styles.metricChart}>
          <div className={styles['chartTab-wrapper']}>
            {data.length ? (
              <div className={styles.labels}>
                <Chart
                  pivotDrillState={pivotDrillState}
                  chartOptions={chartSettings}
                  data={data}
                  filterValues={[]}
                  onMaximize={() => {}}
                  colors={chartColors}
                  events={{
                    click: (params: any) => {
                      if (handleChartRightClick) handleChartRightClick(params);
                    },
                    contextmenu: (params: any) => {
                      if (handleChartRightClick) handleChartRightClick(params);
                    },
                  }}
                  config={{
                    chartClickConfig,
                    ref: chartRef,
                    onColumnSizingChange: (columnSizing: ColumnSizingState) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        tableSettings: {
                          ...prev.tableSettings,
                          columnSizing,
                        },
                      })),
                  }}
                />
                {chartPopupChild}
              </div>
            ) : (
              <div className={styles.metricChartEmpty}>
                <div className={styles.searchWrapper}>
                  <Icons name="magnifying-glass" />
                </div>
                <div className={styles.message}>
                  <Text variant="body-text-sm">Uh-oh, Nothing to display</Text>
                </div>
                <div className={styles.chartButton}>
                  <Text variant="body-text-sm">
                    Choose an appropriate chart type and start visulaizing your
                    data
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {error && !isLoading ? (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-items-center dbn-justify-center">
          <Text variant="heading-lg" color="alert">
            {error}
          </Text>
        </div>
      ) : null}
    </div>
  );
};
