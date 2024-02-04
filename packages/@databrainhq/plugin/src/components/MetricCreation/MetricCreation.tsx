/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import styles from './styles.module.css';
import { Dataset } from './components/Dataset';
import { MetricOutput } from './components/MetricOutput/MetricOutput';
import ChartAppearancePanel from './components/Panels/ChartAppearancePanel';
import SortPanel from './components/Panels/SortPanel';
import FiltersPanel from './components/Panels/FiltersPanel';
import {
  ConfigType,
  DatasetConfig,
  EmbeddedMetricCreationProps,
} from '@/types/metricCreate';
import { ChartTypePanel, ExternalMetricForm, Modal } from '@/components';
import useMetricConfig from '@/hooks/useMetricConfig';
import useDatasetMetric from '@/hooks/useDatasetMetric';

export const EmbeddedMetricCreation = ({
  clientId,
  companyId,
  isLiveMode,
  externalDashboardId,
  userProvidedDashboardId,
  chartColors,
  isShowMetricCreateModal,
  setShowMetricCreateModal,
  metric,
  metricData,
}: EmbeddedMetricCreationProps) => {
  const config: ConfigType = {
    clientId,
    companyId,
    isLiveMode,
    externalDashboardId,
    userProvidedDashboardId,
    chartColors,
    isShowMetricCreateModal,
    setShowMetricCreateModal,
    metric,
    metricData,
  };
  const {
    isLoading,
    chartSettings,
    setShowSaveMetricModal,
    data,
    error,
    previewTableData,
    query,
    isShowSqlModal,
    setShowSqlModal,
    isEnablePivotTable,
    isEnableGauge,
    groupByList,
    hasNumberKeys,
    setShowChartCustomProperties,
    selectTable,
    setSelectTable,
    isShowChartType,
    setShowChartType,
    isShowSaveMetricModal,
    updateExternalMetric,
    createExternalMetric,
    dashboardOptions,
    saveError,
    setChartSettings,
    isShowChartCustomProperties,
    setBarRadius,
    setError,
    setLoading,
    setData,
    setQuery,
    setGroupByList,
    clientSubsetData,
    isShowSortPanel,
    setShowSortPanel,
    isShowFilters,
    setShowFilters,
    isCreatingMetric,
    isEnableSingleDimension,
    isEnableSingleMetrics,
    enabledCharts,
    setResetPallete,
    dbName,
  } = useMetricConfig(config);
  const datasetConfig: DatasetConfig = {
    clientSubsetData,
    clientId,
    setError,
    setLoading,
    setData,
    setQuery,
    setGroupByList,
    chart: chartSettings.chartType,
    setChartSettings,
  };
  const {
    selectedDimensions,
    setSelectedDimensions,
    metrics,
    setMetrics,
    onChangeTableSelection,
    columnList,
    tableList,
    configuration,
    onGenerateChart,
    createdSorts,
    setCreatedSorts,
    onApplySort,
    createdFilters,
    setCreatedFilters,
    getFilterDropDownType,
    workspaceId,
    editorRef,
    savedFilterListOptions,
    onApplyFilter,
    functionOptions,
    pivotDrillState,
  } = useDatasetMetric(datasetConfig);
  return (
    <>
      <div className={styles.isShowMetricCreateModal}>
        <div className={styles.metricCreateModalHeader}>
          <Header
            heading={metric ? 'Update Metric' : 'Create Metric'}
            setShowMetricCreateModal={setShowMetricCreateModal}
            isDisableSaveBtn={
              !chartSettings.measure?.length &&
              !chartSettings.yAxisList?.filter((item) => item)?.length &&
              !chartSettings.singleValue
            }
            setShowSaveMetricModal={setShowSaveMetricModal}
          />
        </div>
        <div className={styles.metricCreateModalContent}>
          {!metric && (
            <>
              <Dataset
                setselectTable={setSelectTable}
                selectTable={selectTable}
                tableList={tableList}
                columnList={columnList}
                column={selectedDimensions?.[0] || { value: '', label: '' }}
                setColumn={setSelectedDimensions}
                metrics={metrics}
                setMetrics={setMetrics}
                onChangeTableSelection={onChangeTableSelection}
              />
            </>
          )}
          <MetricOutput
            pivotDrillState={pivotDrillState}
            data={data}
            isUpdateMetric={!!metric}
            error={error}
            isLoading={isLoading}
            previewTableDataList={previewTableData}
            chartColors={chartColors}
            chartSettings={chartSettings}
            setChartSettings={setChartSettings}
            isDisableSqlBtn={!query}
            setShowSqlModal={setShowSqlModal}
            isEnablePivotTable={isEnablePivotTable}
            groupbyList={groupByList}
            hasNumberKeys={hasNumberKeys}
            isEnableGauge={isEnableGauge}
            outputHeaderProps={{
              setShowChartCustomProperties,
              setShowChartType,
              setShowSortPanel,
              setShowFilters,
            }}
            metrics={metrics}
            dimensions={selectedDimensions}
            onGenerateChart={onGenerateChart}
            setMetrics={setMetrics}
            setColumn={setSelectedDimensions}
            isEnableSingleDimension={isEnableSingleDimension}
            isEnableSingleMetrics={isEnableSingleMetrics}
            functionOptions={functionOptions}
            configuration={configuration}
            dbName={dbName}
          />
        </div>
      </div>

      <Modal
        headerTitle="Generated Query"
        isOpen={isShowSqlModal}
        onClose={() => setShowSqlModal(false)}
      >
        <div className={styles['query-modal']}>{query}</div>
      </Modal>
      <Modal
        isOpen={isShowSaveMetricModal}
        onClose={() => setShowSaveMetricModal(false)}
        headerTitle="Save To Dashboard"
      >
        <ExternalMetricForm
          onCancel={() => setShowSaveMetricModal(false)}
          onSubmit={metric ? updateExternalMetric : createExternalMetric}
          error={saveError}
          defaultValues={
            metric
              ? {
                  name: metric.name,
                  description: metric.description,
                  isLive: metric.isLive,
                  metricId: metric.isCreatedByClient
                    ? metric.metricId
                    : `update_${metric.metricId}_by_${clientId}_${Date.now()}`,
                }
              : undefined
          }
          isCreatingMetric={isCreatingMetric}
        />
      </Modal>
      <FiltersPanel
        filtersPanelProps={{
          isOpen: isShowFilters,
          onClose: () => setShowFilters(false),
          filters: createdFilters,
          setCreatedFilters,
          columnOptions: columnList,
          getFilterDropDownType,
          editorRef,
          workspaceId,
          onApplyFilter,
          savedFilterListOptions,
          currentSelectedTable: selectTable,
          // onSaveCustomFilter,
        }}
      />
      <SortPanel
        SortPanelProps={{
          isOpen: isShowSortPanel,
          onClose: () => setShowSortPanel(false),
          createdSorts,
          setCreatedSorts,
          columnOptions: columnList,
          onApplySort,
          selectedTable: selectTable,
        }}
      />
      <ChartTypePanel
        chartTypePanelProps={{
          isOpen: isShowChartType,
          onClose: () => setShowChartType(false),
          enabledCharts,
          onChartChange: (option) => {
            setChartSettings((prev) => ({
              ...prev,
              chartType: option,
            }));
          },
          selectedChart: chartSettings.chartType,
        }}
      />
      <ChartAppearancePanel
        ChartAppearancePanelProps={{
          setChartSettings,
          chartSettings,
          isOpen: isShowChartCustomProperties,
          onClose: () => setShowChartCustomProperties(false),
          setBarRadius,
          setResetPallete,
        }}
      />
    </>
  );
};
