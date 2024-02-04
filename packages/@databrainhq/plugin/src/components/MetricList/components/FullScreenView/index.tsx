/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/no-relative-parent-imports */
import React, { useMemo, useRef, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import { ColumnSizingState } from '@tanstack/react-table';
import { DownloadRawCsvModal } from '../DownloadRawCsvModal';
import { NoDataLoading } from '../MetricCards/NoDataLoading';
import styles from './fullscreen.module.css';
import { DownloadButton } from './DownloadButton';
import AddMetricFilter from './AddMetricFilter';
import { ExternalMetrics } from '@/types/queryTypes';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Table } from '@/components/Table';
import { MetricFilterDropDown } from '@/components/MetricFilterDropDown';
import { Chart } from '@/components/Chart';
import {
  ChartSettingsType,
  DatasetSettings,
  MetricFilterOptionsType,
  TimeSeriesSettingsType,
} from '@/types';

import { useExternalMetric } from '@/hooks';
import { useMetricCard } from '@/hooks/useMetricCard';
import { CHART_TYPES } from '@/consts';
import { Icons } from '@/components/Icons';
import { FloatingDropDown } from '@/components/FloatingDropDown';
import { ChartPopup } from '@/components/ChartPopup';
import DrillBreadCrumb from '@/components/DrillBreadCrumb';
import { Modal } from '@/components/Modal';
import { ExternalMetricForm } from '@/components/ExternalMetricForm';
import { NewTooltip } from '@/components/InfoTooltip';
import { ChartTypePanel } from '@/components/ChartTypePanel';
import { areArraysEqual, getSqlStatement } from '@/helpers';
import { FilterFieldType } from '@/components/FilterField';
import { Alert } from '@/components/Alert';
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown';

export type FullScreenViewProps = {
  globalFilters?: {
    tableName: string;
    filters: FilterFieldType[];
  };
  metric: ExternalMetrics;
  colors?: string[];
  rlsFilters?: any;
  appFilters?: any;
  metricFilterOptions?: MetricFilterOptionsType;
  onMinimize: () => void;
  onArchive?: (metricId: string) => void;
  clientId: string;
  encryptedClient?: string;
  tenancyLevel: string;
  externalDashboardId: string;
  userProvidedDashboardId: string;
  companyId: string;
  isAllowedToUpdateMetrics?: boolean;
  sharingSettingsId?: string;
  isInternalApp?: boolean;
  isShowChartConfigTab?: boolean;
  isHideChartSettings?: boolean;
  isHideTablePreview?: boolean;
  isAllClient?: boolean;
  onDownload: (id: string, isEnable: boolean) => void;
  downloadMetrics: {
    id: string;
    isInProgress: boolean;
  }[];
  isFrontendApp: boolean;
  guestToken?: string;
};

export const FullScreenView = ({
  metric,
  colors,
  rlsFilters,
  metricFilterOptions,
  onMinimize,
  onArchive,
  clientId,
  tenancyLevel,
  companyId,
  externalDashboardId,
  userProvidedDashboardId,
  isAllowedToUpdateMetrics,
  sharingSettingsId,
  appFilters,
  isInternalApp,
  isShowChartConfigTab,
  isHideChartSettings,
  isHideTablePreview,
  isAllClient,
  globalFilters = { tableName: '', filters: [] },
  onDownload,
  downloadMetrics,
  isFrontendApp,
  guestToken,
  encryptedClient,
}: FullScreenViewProps) => {
  const chartRef = useRef() as React.RefObject<EChartsReact>;
  const [isShowRawCsvModal, setShowRawCsvModal] = useState(false);
  const [isShowChartTypePanel, setShowChartTypePanel] = useState(false);
  const [isShowSaveMetricModal, setShowSaveMetricModal] =
    useState<boolean>(false);

  const {
    dataDb,
    getUnderlyingData,
    handleChartClick,
    columnName,
    setShowChartPopup,
    isShowChartPopup,
    isQueryLoading,
    chartParams,
    onChangeFilterValue,
    onDrillDown,
    drilledLevel,
    dimensions,
    setLoading,
    setTableLimit,
    isEnableNextBtn,
    isEnablePrevBtn,
    paginationInfo,
    onChangePage,
    isExternalChart,
    onDrillLevelClick,
    metricFilters,
    filterValues,
    dynamicOptions,
    isSingleValueNull,
    isEnableZoom,
    containerRef,
    chartSettings,
    setChartSettings,
    leftPositionedMetricFilters,
    rightPositionedMetricFilters,
    updateFilter,
    drillFilters,
    drillType,
    tableResultsDownloadData,
    rlsConditions,
    appliedMetricFilters,
    pivotHeaderOptions,
    pivotDrillState,
    onDrillPivotTable,
    legendData,
    timeseriesDimension,
    isPythonMode,
  } = useMetricCard({
    metric,
    rlsFilters,
    tenancyLevel,
    clientId,
    appFilters,
    isInternalApp,
    metricFilterOptions,
    isAllClient,
    globalFilters,
    isFrontendApp,
    guestToken,
    encryptedClientId: encryptedClient,
  });
  // add global filter prompt
  const {
    updateExternalMetric,
    error: saveError,
    dashboardOptions,
    isLoading,
  } = useExternalMetric({
    onSuccess: () => {
      setShowSaveMetricModal(false);
    },
    selectedColumns: [],
    companyIntegrationId: metric.companyIntegrationId,
    query: metric.query,
    metricQuery: metric.metricQuery as string,
    integrationName: metric.integrationName,
    outputColumns: metric.outputColumns as string,
    chartSettings,
    datasetMetricSettings: metric.datasetMetricSettings as DatasetSettings,
    clientId,
    companyId,
    isLiveMode: metric.isLive,
    timeGrain: metric.timeGrain as string,
    dashboardIds: [externalDashboardId],
    isEnableGroupBy: metric.isEnableGroupBy,
    groupBy: metric.groupBy,
    selectedGroupBy: metric.selectedGroupBy,
    userProvidedDashboardId,
    metric,
    rlsFilters,
  });
  const chartSettingOptions: ChartSettingsType = useMemo(
    () =>
      metric?.drillDownSettings?.isEnableGroupBy &&
      !!dataDb.length &&
      drilledLevel === dimensions?.length
        ? {
            ...chartSettings,
            chartType: 'table',
            yAxisList: dimensions?.[0]
              ? [dimensions?.[0], ...(chartSettings.yAxisList || [])]
              : chartSettings.yAxisList,
          }
        : chartSettings,
    [dimensions, drilledLevel, chartSettings, metric, dataDb]
  );
  return (
    <dialog open className={styles.fullScreen}>
      <section className={styles.header}>
        <div className={styles.headerBlock}>
          <NewTooltip text="Back">
            <Button
              variant="popover"
              type="button"
              onClick={onMinimize}
              leftIcon={
                <div className={styles.backButton}>
                  <Icons name="arrow-left" />
                </div>
              }
            />
          </NewTooltip>
          <Text variant="body-text-lg">{metric.name}</Text>
          {globalFilters?.filters?.length ? (
            <Alert text="Global Filters are applied." variant="info" />
          ) : null}
          {downloadMetrics?.find((m) => m.id === metric?.id)?.isInProgress ? (
            <Alert text="Download is in progress" variant="primary" />
          ) : null}
        </div>
        <div className={`${styles.headerBlock} ${styles.headerBlockRight}`}>
          {!isHideChartSettings ? (
            <NewTooltip text="Chart Types">
              <Button
                variant="popover"
                type="button"
                onClick={() => setShowChartTypePanel(true)}
                leftIcon={
                  <div className={styles.backButton}>
                    <Icons name="bar-chart" />
                  </div>
                }
              />
            </NewTooltip>
          ) : null}
          {onArchive ? (
            <NewTooltip text="Archive Metric">
              <Button
                variant="popover"
                type="button"
                onClick={() => onArchive(metric.id)}
                leftIcon={
                  <div className={styles.backButton}>
                    <Icons name="archive" />
                  </div>
                }
              />
            </NewTooltip>
          ) : null}
          <DownloadButton
            data={tableResultsDownloadData}
            chartRef={chartRef}
            metricName={metric.name}
            onRawCsvData={() => setShowRawCsvModal(true)}
            chartOptions={chartSettings}
            companyIntegrationId={metric.companyIntegrationId}
            integrationName={metric.integrationName}
            query={getSqlStatement({
              query: metric?.query || '',
              dbName: metric?.integrationName || '',
              rlsConditions: appliedMetricFilters,
              tenancyLevel,
              clientId,
              globalFilters,
              values: rlsFilters?.filterValues,
              isAllClient,
            })}
            queryWithNoFilter={getSqlStatement({
              query: metric?.query || '',
              dbName: metric?.integrationName || '',
              rlsConditions: appliedMetricFilters.filter(
                (f) => f.isVariableFilter
              ),
              tenancyLevel,
              clientId,
              values: rlsFilters?.filterValues,
              isAllClient,
              globalFilters: {
                ...globalFilters,
                filters:
                  globalFilters?.filters?.filter((f) => f.isVariableFilter) ||
                  [],
              },
            })}
            updateDownloadProgress={(isEnable) =>
              onDownload(metric?.id, isEnable)
            }
          />
          {isAllowedToUpdateMetrics && (
            <Button
              type="button"
              variant="primary"
              onClick={() => setShowSaveMetricModal(true)}
            >
              Save Metric
            </Button>
          )}
        </div>
        <NewTooltip text="Close FS">
          <Button
            variant="popover"
            type="button"
            onClick={onMinimize}
            leftIcon={
              <div className={styles.backButton}>
                <Icons name="cross" />
              </div>
            }
          />
        </NewTooltip>
      </section>
      <section className={styles.body}>
        <div
          className={`${styles.metric} ${
            chartSettings.chartType === CHART_TYPES.table
              ? styles.tableMetric
              : ''
          } ${isHideTablePreview ? styles.fullMetric : ''}`}
          ref={containerRef}
        >
          <div className={styles.metricHeader}>
            <div className={styles.metricFilters}>
              {!!dataDb.length && (
                <>
                  {chartSettings?.dynamicXAxis?.isEnabled ? (
                    <FloatingDropDown
                      options={chartSettings.dynamicXAxis?.options || []}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...(prev as ChartSettingsType),
                          dynamicXAxis: {
                            ...prev.dynamicXAxis,
                            selectedOption: value,
                          },
                          xAxis: value.value,
                        }))
                      }
                      selectedOption={
                        chartSettings.dynamicXAxis.selectedOption || {
                          value: '',
                          label: '',
                        }
                      }
                      label="Dynamic x-axis"
                      labelVariant="floating"
                    />
                  ) : null}
                  {chartSettings?.isDynamicSeries ? (
                    <FloatingDropDown
                      options={dynamicOptions}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...(prev as ChartSettingsType),
                          seriesField: value.value,
                        }))
                      }
                      selectedOption={{
                        label: chartSettings?.seriesField || 'ungrouped',
                        value: chartSettings?.seriesField || 'ungrouped',
                      }}
                      label="Group by"
                      labelVariant="floating"
                    />
                  ) : null}
                  {chartSettings.timeSeriesSettings?.groupBySettings
                    .isDynamic ? (
                    <FloatingDropDown
                      options={chartSettings.timeSeriesSettings.groupBySettings.options.map(
                        (value) => ({
                          label:
                            value.split('____').length > 1
                              ? value.split('____')[1]
                              : value,
                          value,
                        })
                      )}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...(prev as ChartSettingsType),
                          timeSeriesSettings: {
                            ...(prev.timeSeriesSettings as TimeSeriesSettingsType),
                            groupBySettings: {
                              ...(prev.timeSeriesSettings
                                ?.groupBySettings as TimeSeriesSettingsType['groupBySettings']),
                              value: value.value,
                            },
                          },
                          xAxis: isPythonMode
                            ? prev.xAxis
                            : `${value.value} of ${timeseriesDimension}`,
                        }))
                      }
                      selectedOption={{
                        label:
                          chartSettings.timeSeriesSettings.groupBySettings.value.split(
                            '____'
                          ).length > 1
                            ? chartSettings.timeSeriesSettings.groupBySettings.value.split(
                                '____'
                              )[1]
                            : chartSettings.timeSeriesSettings.groupBySettings.value
                                .toString()
                                .substring(0, 1)
                                .toUpperCase() +
                              chartSettings.timeSeriesSettings.groupBySettings.value
                                .toString()
                                .substring(
                                  1,
                                  chartSettings.timeSeriesSettings
                                    .groupBySettings.value.length
                                ),
                        value:
                          chartSettings.timeSeriesSettings.groupBySettings
                            .value,
                      }}
                      labelVariant="floating"
                      label="Timeseries"
                    />
                  ) : null}
                  {chartSettings.pivotTableSettings2?.isDynamicHeaders &&
                    chartSettings.chartType === CHART_TYPES.pivotV2 && (
                      <MultiSelectDropdown
                        onChange={(options) => {
                          setChartSettings((prev) => ({
                            ...prev,
                            pivotTableSettings2: {
                              ...prev.pivotTableSettings2,
                              headers: options.map((c) => c.value),
                              dimensions: pivotHeaderOptions
                                .filter(
                                  (o) =>
                                    !options.some(
                                      (col) => col.value === o.value
                                    )
                                )
                                .map((o) => o.value),
                            },
                          }));
                        }}
                        options={pivotHeaderOptions}
                        selectedOption={
                          pivotHeaderOptions?.filter((col) =>
                            chartSettings.pivotTableSettings2?.headers?.includes(
                              col.value
                            )
                          ) || []
                        }
                        isSearchEnabled
                        menuWidth="300px"
                      />
                    )}
                  {chartSettings.customSettings?.showSelectLegend ? (
                    <MultiSelectDropdown
                      label="legend"
                      labelVariant="floating"
                      options={
                        legendData?.length
                          ? legendData?.map((option: any) => ({
                              value: option,
                              label: option,
                            }))
                          : []
                      }
                      onChange={(value) => {
                        setChartSettings((prev) => ({
                          ...prev,
                          selectedSeries: value?.map((v) => v.value) || [],
                        }));
                      }}
                      selectedOption={
                        legendData
                          ?.filter((v: string) =>
                            chartSettings?.selectedSeries?.some(
                              (val) => val === v
                            )
                          )
                          ?.map((v: string) => ({
                            value: v,
                            label: v,
                          })) || []
                      }
                      isSearchEnabled
                    />
                  ) : null}
                </>
              )}
            </div>
            {!!metricFilters.length && (
              <div className={styles.metricFilters}>
                <AddMetricFilter
                  filters={metricFilters}
                  updateFilter={updateFilter}
                />
                {leftPositionedMetricFilters.map((filter, index) => (
                  <MetricFilterDropDown
                    isAllClient={isAllClient}
                    workspaceId={metric?.companyIntegration?.workspaceId}
                    rlsConditions={filter}
                    onChangeFilterValue={onChangeFilterValue}
                    clientId={clientId}
                    key={filter.name}
                    className={
                      leftPositionedMetricFilters.length - 1 === index
                        ? styles.filterTopLeft
                        : ''
                    }
                    rlsConditionList={[
                      ...leftPositionedMetricFilters,
                      ...rightPositionedMetricFilters,
                    ]}
                    tenancyLevel={tenancyLevel}
                  />
                ))}
                {rightPositionedMetricFilters.map((filter, index) => (
                  <MetricFilterDropDown
                    isAllClient={isAllClient}
                    workspaceId={metric?.companyIntegration?.workspaceId}
                    rlsConditions={filter}
                    onChangeFilterValue={onChangeFilterValue}
                    clientId={clientId}
                    key={filter.name}
                    className={index === 0 ? styles.filterTopRight : ''}
                    rlsConditionList={[
                      ...leftPositionedMetricFilters,
                      ...rightPositionedMetricFilters,
                    ]}
                    tenancyLevel={tenancyLevel}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            className={`${styles.chartWrapper} ${
              chartSettings.chartType === CHART_TYPES.table
                ? styles.tableChartWrapper
                : ''
            }`}
          >
            {isShowChartPopup && (
              <ChartPopup
                isOpen={isShowChartPopup}
                setOpen={setShowChartPopup}
                value={chartParams?.name}
                columnName={columnName}
                getUnderlyingData={getUnderlyingData}
                clickBehaviourConfigs={metric.clickActions?.chart}
                elementRef={{ containerRef, event: chartParams?.event?.event }}
                position="dynamic"
                isSingleValueChart={
                  chartSettings.chartType === CHART_TYPES.singleValue
                }
              />
            )}
            <NoDataLoading
              isLoading={isQueryLoading}
              isDataLength={Boolean(dataDb.length)}
              isSingleValue={chartSettings.singleValue}
              dataDb={dataDb[0]}
              chartType=""
            />
            {metric?.drillDownSettings?.isEnableGroupBy && !!dataDb.length && (
              <>
                <DrillBreadCrumb
                  dimensions={dimensions}
                  drilledLevel={
                    dimensions.length > drilledLevel ? drilledLevel : -1
                  }
                  onResetLevel={() => onDrillDown({}, [])}
                  onDrillLevelClick={(index: number) =>
                    onDrillLevelClick(index)
                  }
                  isMetricCard
                  isMetricFilter={!!metricFilters.length}
                  drillFilters={drillFilters}
                  drillType={drillType || ''}
                  isShowBreadCrumb={
                    !!dimensions?.length &&
                    ![
                      CHART_TYPES.horizontalStackTable,
                      CHART_TYPES.pivot,
                      CHART_TYPES.pivotV2,
                      CHART_TYPES.treeMap,
                      CHART_TYPES.table,
                      CHART_TYPES.sankey,
                    ].includes(chartSettings.chartType) &&
                    dimensions.length > drilledLevel
                  }
                />
              </>
            )}
            {dataDb.length && !isSingleValueNull ? (
              <Chart
                isPythonMode={isPythonMode}
                onDrillPivotTable={onDrillPivotTable}
                pivotDrillState={pivotDrillState}
                chartOptions={chartSettingOptions}
                data={dataDb}
                colors={colors || chartSettings.chartColors}
                events={{
                  click: (
                    params: any,
                    rowFilters?: { columnName: string; value: any }[]
                  ) => {
                    if (metric.drillDownSettings?.isEnableGroupBy) {
                      const name =
                        chartSettings.chartType === 'table'
                          ? rowFilters?.find(
                              (col) =>
                                col.columnName === dimensions?.[drilledLevel]
                            )?.value
                          : '';

                      onDrillDown(
                        chartSettings.chartType === 'table' ? { name } : params
                      );
                    }
                  },
                  contextmenu: (params: any) => {
                    handleChartClick(params);
                    setShowChartPopup(true);
                  },
                }}
                className={
                  chartSettings.chartType === CHART_TYPES.table
                    ? ''
                    : styles.chart
                }
                config={{
                  ref: chartRef,
                  chartClickConfig: metric.clickActions?.chart,
                  onColumnSizingChange: (columnSizing: ColumnSizingState) =>
                    setChartSettings((prev) => ({
                      ...prev,
                      tableSettings: {
                        ...prev.tableSettings,
                        columnSizing,
                      },
                    })),
                  onChartReady: () => setLoading(false),
                  isInfiniteScroll: false,
                  onChangePage,
                  isExternalChart,
                  isEnableNextBtn,
                  isEnablePrevBtn,
                  paginationInfo,
                  setChartSettings,
                }}
              />
            ) : null}
          </div>
        </div>
        {!isHideTablePreview &&
        chartSettings.chartType !== 'table' &&
        !isSingleValueNull ? (
          <div>
            <Table
              data={dataDb}
              isLoading={isQueryLoading}
              error=""
              tableName="Table Preview"
              headerAlignment="left"
              tableSettings={{
                enableFilter: true,
                enableSorting: true,
                enableStripedRows: true,
                enableTableSearch: true,
                showRowHover: true,
                showTableTitle: true,
                showTableDesc: true,
                lineGap: 'medium',
                contentAlignment: 'left',
                hideVerticalDivider: false,
              }}
            />
          </div>
        ) : null}
      </section>
      <DownloadRawCsvModal
        metricItem={metric}
        isShowRawCsvModal={isShowRawCsvModal}
        onCloseModal={setShowRawCsvModal}
        sharingSettingsId={sharingSettingsId}
        query={getSqlStatement({
          query: metric?.query || '',
          dbName: metric?.integrationName || '',
          rlsConditions: appliedMetricFilters,
          tenancyLevel,
          clientId,
          globalFilters,
          values: rlsFilters?.filterValues,
          isAllClient,
        })}
      />
      <ChartTypePanel
        chartTypePanelProps={{
          selectedChart: chartSettings.chartType,
          onChartChange: (chartType) =>
            setChartSettings((prev) => ({
              ...prev,
              chartType,
            })),
          enabledCharts: [...Object.keys(CHART_TYPES)],
          isOpen: isShowChartTypePanel,
          onClose: () => setShowChartTypePanel(false),
          zIndex: 99999,
        }}
      />
      {isAllowedToUpdateMetrics && (
        <Modal
          isOpen={isShowSaveMetricModal}
          onClose={() => setShowSaveMetricModal(false)}
          headerTitle="Update Metric"
        >
          <ExternalMetricForm
            onCancel={() => setShowSaveMetricModal(false)}
            onSubmit={updateExternalMetric}
            error={saveError}
            isCreatingMetric={isLoading}
            defaultValues={{
              name: metric.name,
              description: metric.description,
              isLive: metric.isLive,
              metricId: metric.isCreatedByClient
                ? metric.metricId
                : `update_${metric.metricId}_by_${clientId}_${Date.now()}`,
            }}
          />
        </Modal>
      )}
    </dialog>
  );
};
