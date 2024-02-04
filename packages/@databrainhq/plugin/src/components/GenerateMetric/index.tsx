/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './generateMetric.module.css';
import { AutoCompleteDropdown } from '@/components/AutoCompleteDropdown';
import {
  ChartSettingsType,
  EmbeddedMetricCreationProps,
  GenerateConfigType,
  IconType,
} from '@/types';
import useGenerateMetric from '@/hooks/useGenerateMetric';
import NoData from '@/components/Svg/No_data.svg';
import {
  Text,
  Chart,
  Loader,
  Modal,
  ExternalMetricForm,
  Header,
  Button,
  PopoverMenu,
  Icons,
  FloatingDropDown,
  Flex,
  ChartTypePanel,
  NewTooltip,
} from '@/components';
import { CHART_TYPES } from '@/consts';

export const GenerateMetric = ({
  clientId,
  companyId,
  externalDashboardId,
  isLiveMode,
  isShowMetricCreateModal,
  setShowMetricCreateModal,
  userProvidedDashboardId,
  workspaceId,
  chartColors,
  metric,
  metricData,
  variant,
}: EmbeddedMetricCreationProps) => {
  const config: GenerateConfigType = {
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
    workspaceId,
    variant,
  };
  const {
    isDisableSaveBtn,
    setShowSaveMetricModal,
    generateMetricState,
    chartTabType,
    chartSettings,
    onColumnSizingChange,
    chartRef,
    isCreatingMetric,
    isShowSaveMetricModal,
    saveError,
    updateExternalMetric,
    createExternalMetric,
    tableList,
    selectedMainTable,
    setSelectedMainTable,
    selectedColumns,
    setSelectedColumns,
    autoCompleteDropdownOptions,
    onSubmitSearch,
    setChartFields,
    functionOptions,
    onChangeHelperFunction,
    onChangeAlias,
    chartOptions,
    isShowChartType,
    setShowChartType,
    enabledCharts,
    setChartSettings,
    isRef,
    setRef,
    pivotDrillState,
  } = useGenerateMetric(config);
  return (
    <div className={styles.generateMetricModal}>
      <div className={styles.generateMetricModalHeader}>
        <Header
          heading={metric ? 'Update Metric' : 'Create Metric'}
          setShowMetricCreateModal={setShowMetricCreateModal}
          isDisableSaveBtn={isDisableSaveBtn}
          setShowSaveMetricModal={setShowSaveMetricModal}
        />
      </div>
      <div className={styles.generateMetricQuery}>
        <form
          className={styles.generateMetricQueryForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <Flex direction="row" alignItems="center">
            <FloatingDropDown
              options={tableList.map((t) => ({
                value: t.tableName,
                label: t.tableName,
                table: t,
                icon: 'table',
              }))}
              onChange={(option) => {
                setSelectedMainTable(option.table);
                setSelectedColumns([]);
              }}
              selectedOption={{
                label: selectedMainTable?.tableName || '',
                value: selectedMainTable?.tableName || '',
                icon: 'table',
              }}
              buttonWidth="250px"
              menuWidth="100%"
            />
            <div className="dbn-w-[800px]">
              <AutoCompleteDropdown
                selectedOption={selectedColumns}
                setSelectedOptions={setSelectedColumns}
                options={autoCompleteDropdownOptions}
                isDisabled={generateMetricState.isLoading || !selectedMainTable}
                functionOptions={functionOptions}
                onChangeHelperFunction={onChangeHelperFunction}
                onChangeAlias={onChangeAlias}
                isRef={isRef}
                setRef={setRef}
              />
            </div>
          </Flex>

          <Button
            variant="popover"
            type="button"
            isDisabled={
              generateMetricState.isLoading ||
              !selectedColumns?.filter((f) => f.configType !== 'FILTER').length
            }
            onClick={() => {
              setRef(false);
              onSubmitSearch();
            }}
            leftIcon={<Icons name="magnifying-glass" color="white" />}
            className="dbn-bg-primary dbn-text-white dbn-px-3 dbn-py-[0.65rem] dbn-rounded-l-none dbn-rounded-md"
          >
            Search
          </Button>
        </form>
        <div className="dbn-flex dbn-gap-3">
          {chartOptions.map((option) => (
            <Button
              variant="popover"
              className={`${
                chartSettings.chartType === option.value
                  ? 'dbn-bg-gray'
                  : 'dbn-bg-white'
              } dbn-h-8 dbn-w-8 dbn-flex dbn-items-center dbn-justify-center`}
              leftIcon={
                <NewTooltip text={option.value}>
                  <Icons name={option.icon as IconType} size="xl" />
                </NewTooltip>
              }
              onClick={() => {
                setChartFields({
                  chartType: option.value as ChartSettingsType['chartType'],
                });
              }}
            />
          ))}
          <Button
            variant="popover"
            leftIcon={
              <NewTooltip text="Chart Type">
                <Icons name="bar-chart-2" size="xl" />
              </NewTooltip>
            }
            onClick={() => setShowChartType(true)}
            className="dbn-h-8 dbn-w-8 dbn-flex dbn-items-center dbn-justify-center"
          />
        </div>
      </div>
      <div className={styles.generateMetricChart}>
        {chartTabType === 'INIT' && (
          <div className={styles.metricChartEmpty}>
            <img
              src={NoData}
              alt="no data"
              // eslint-disable-next-line react/forbid-dom-props
              style={{ width: '300px', height: '300px' }}
            />
            <Text variant="heading-lg">No Data</Text>
            <div className={styles.chartButton}>
              <Text variant="body-text-sm">Enter Your Query to Visualize </Text>
            </div>
          </div>
        )}
        {chartTabType === 'LOADING' && (
          <div className={styles.LoaderContainer}>
            <Loader />
          </div>
        )}
        {chartTabType === 'CHART' && (
          <div className={styles.chartWrapper}>
            <Chart
              pivotDrillState={pivotDrillState}
              chartOptions={chartSettings}
              data={generateMetricState.data}
              filterValues={[]}
              onMaximize={() => {}}
              colors={chartColors}
              config={{
                ref: chartRef,
                onColumnSizingChange,
              }}
            />
          </div>
        )}
        {chartTabType === 'ERROR' && (
          <Text variant="heading-lg" color="alert">
            {generateMetricState.error}
          </Text>
        )}
      </div>
      <ChartTypePanel
        chartTypePanelProps={{
          isOpen: isShowChartType,
          onClose: () => setShowChartType(false),
          enabledCharts,
          onChartChange: (option) => {
            setChartFields({ chartType: option });
          },
          selectedChart: chartSettings.chartType,
          zIndex: 9999,
        }}
      />
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
    </div>
  );
};
