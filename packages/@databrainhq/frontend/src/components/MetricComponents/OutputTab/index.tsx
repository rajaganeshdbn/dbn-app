/* eslint-disable import/no-named-as-default */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';
import { consts, types, Ui, hooks } from '@databrainhq/plugin';
import { DatasetSettings } from 'types';
import Results, { ResultsProp } from 'pages/CreateMetric/components/Results';
import ReactAce from 'react-ace/lib/ace';
import {
  ConfigForm,
  onClickEditFilter,
} from 'pages/CreateMetric/components/ChartFilterAccordion';
import { SavedFilter } from 'pages/CreateMetric/components/ConfigFilterOptions';
import { NewMetricConfigProps } from 'types/metric';
import { DEFAULT_NEW_FILTER, DRAGDROP, TABLE } from 'consts/application';
import useWorkspace from 'hooks/useWorkspace';
import styles from './outputTab.module.css';
import Visualization from './components/Visualization';
import MetricFilterPopup from './components/Visualization/MetricFilterPopup';
import DragAndDropComponent from './DragAndDropComponent';
import AutoCompleteComponent from './AutoCompleteComponent';

type Props = {
  data: any[] | undefined;
  clientName?: string;
  isLoading: boolean;

  timeTaken: number;
  rlsConditions: types.RlsCondition[];
  setRlsConditions: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  onChangeFilterValue?: (
    name: string,
    value: string,
    labelValue?: string,
    customValue?: Record<string, Date>,
    stringValues?: types.FloatingDropDownOption[]
  ) => void;

  chartPopupChild?: JSX.Element | undefined;
  handleChartRightClick?: (params: any) => void;
  chartClickConfig?: types.ClickActionsConfig['chart'];
  drilldown?: (
    params: any,
    rowFilters?: { columnName: string; value: any }[]
  ) => void;
  setShowChartPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  chartSettings: types.ChartSettingsType;
  setChartSettings: React.Dispatch<
    React.SetStateAction<types.ChartSettingsType>
  >;
  datasetSettings: DatasetSettings | undefined;
  drillLevel: number;
  dimensions: string[];
  isEnableGroupBy: boolean;
  onChangePage?: (isPrev: boolean) => void;
  isExternalChart?: boolean;
  isEnablePrevBtn?: boolean;
  isEnableNextBtn?: boolean;
  paginationInfo?: { limit: number; offset: number; totalRecords: number };
  isEnablePivotTable: boolean;
  groupbyList: any[];
  hasNumberKeys: boolean;
  isEnableGauge: boolean;

  onDrillLevelClick: (index: number) => void;
  onDrillPivotTable: (value: types.OnDrillPivotTableParams) => void;
  pivotDrillState: types.PivotDrillState;
  resultsProps: ResultsProp;
  onClickSqlTab?: () => void;
  outputHeaderProps: {
    isShowResults: boolean;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChartType: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChartActions: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChartCustomProperties: React.Dispatch<React.SetStateAction<boolean>>;
    setShowFiltersPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSortPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setShowGroupByPanel: React.Dispatch<React.SetStateAction<boolean>>;
    setShowJoinPanel: React.Dispatch<React.SetStateAction<boolean>>;
    isCreateVirtualTable?: boolean;
  };
  buttonBadgeProps: {
    filters: number;
    joins: number;
    sort: number;
    groupBy: number;
  };
  legendData: string[];
  metricConfig: {
    createNewColumnError: string[];
    selectedTable: types.FloatingDropDownOption;
    editorRef: React.RefObject<ReactAce>;
    isSqlTab: boolean;
  };
  drillFilters: { columnName: string; value: any }[];
  drillType: string;
  newMetricConfigProps: NewMetricConfigProps;
  isAllClient?: boolean;
  isPythonMode: boolean;
  tenancyLevel?: string;
};
const OutputTab = ({
  data,
  isLoading,
  clientName,
  timeTaken,
  rlsConditions,
  setRlsConditions,
  onChangeFilterValue,
  chartPopupChild,
  handleChartRightClick,
  chartClickConfig,
  drilldown,
  setShowChartPopup,
  chartSettings,
  setChartSettings,
  datasetSettings,
  dimensions,
  drillLevel,
  isEnableGroupBy,
  isEnableNextBtn,
  isEnablePrevBtn,
  isExternalChart,
  onChangePage,
  paginationInfo,
  isEnablePivotTable,
  groupbyList,
  hasNumberKeys,
  isEnableGauge,
  onDrillLevelClick,
  resultsProps,
  onClickSqlTab,
  outputHeaderProps: {
    isShowResults,
    setShowResults,
    setShowChartType,
    setShowChartCustomProperties,
    setShowFiltersPanel,
    setShowSortPanel,
    setShowJoinPanel,
    isCreateVirtualTable,
    setShowGroupByPanel,
  },
  buttonBadgeProps: { filters, joins, sort, groupBy },
  legendData,
  metricConfig: { createNewColumnError, selectedTable, editorRef, isSqlTab },
  drillFilters,
  drillType,
  newMetricConfigProps: {
    onDropColumn,
    selectedDims,
    selectedMetrics,
    functionOptions,
    onRemoveColumn,
    onChangeHelperFunction,
    tableList,
    onChangeAlias,
    isInvalidColModal,
    setInvalidColModal,
    customSql,
    joinTableOption,
    setCustomSql,
    onSaveCustomSQLColumn,
    dimModifiers,
    metricModifiers,
    isAddRemainingCols,
    setAddRemainingCols,
    onRemainingColsSelection,
    onGenerateDatasetMetric,
    limit,
    setLimit,
    currentMetricFilter,
    setCurrentMetricFilter,
    setShowFormContainer,
    showFormContainer,
    switchAxisOptions,
    creatorMode,
    selectedMainTable,
    setSelectedMainTable,
    autoCompleteDropdownOptions,
    selectedAutoCompleteCols,
    setSelectedAutoCompleteCols,
    onChangeAutoCompleteHelperFunction,
    onChangeAutoCompleteAlias,
    onSubmitSearch,
    onUpdateCustomSqlColumn,
    arithmeticColumnOptions,
    onSaveArithMetricOption,
    onSelectPivotTable,
    onChangeTimeseriesFormat,
  },
  isAllClient,
  isPythonMode,
  tenancyLevel,
  onDrillPivotTable,
  pivotDrillState,
}: Props) => {
  const seconds = Math.floor(timeTaken / 1000);
  const remainingMilliseconds = timeTaken % 1000;
  const { workspace } = useWorkspace();

  const [isOpenModal, setOpenModal] = useState<{
    isOpen: boolean;
    name: string;
  }>({
    isOpen: false,
    name: '',
  });

  const isFiltersPopoverDisabled = useMemo(
    () => !data?.length && !isSqlTab && !isPythonMode,
    [data, isSqlTab, isPythonMode]
  );

  const pivotHeaderOptions = useMemo(
    () =>
      selectedMetrics.some((col) => col.configType === 'AGGREGATE')
        ? selectedDims.map((col) => ({ value: col.alias, label: col.alias }))
        : [],
    [selectedMetrics, selectedDims]
  );
  const groupByOptions: types.FloatingDropDownOption[] = useMemo(
    () =>
      [
        ...pivotHeaderOptions,
        {
          value: 'ungrouped',
          label: chartSettings.ungroupedAlias || 'ungrouped',
        },
      ] || [
        {
          value: 'ungrouped',
          label: chartSettings.ungroupedAlias || 'ungrouped',
        },
      ],
    [pivotHeaderOptions, chartSettings.ungroupedAlias]
  );
  const isEnableSelectAll = useMemo(
    () =>
      [...selectedDims, ...selectedMetrics].length &&
      !joins &&
      chartSettings.chartType === consts.CHART_TYPES.table &&
      creatorMode === DRAGDROP,
    [selectedDims, selectedMetrics, chartSettings.chartType, creatorMode, joins]
  );
  const isPivotTable2 = useMemo(
    () => chartSettings.chartType === consts.CHART_TYPES.pivotV2,
    [chartSettings.chartType]
  );

  const modalHeaderTitle = useMemo(() => {
    switch (isOpenModal.name) {
      case 'filters':
      case 'edit filters':
        return 'Metric Filters';
      case 'pivot2':
        return 'Pivot Settings';
      default:
        return 'Group By';
    }
  }, [isOpenModal.name]);
  const isTimeSeries = useMemo(
    () => chartSettings.chartType === consts.CHART_TYPES.timeSeries,
    [chartSettings.chartType]
  );
  return (
    <div className={styles['outputTab-container']}>
      {creatorMode === DRAGDROP ? (
        <DragAndDropComponent
          isPythonMode={isPythonMode}
          newMetricConfigProps={{
            isTimeSeries,
            onChangeHelperFunction,
            onRemoveColumn,
            onDropColumn,
            selectedDims,
            selectedMetrics,
            functionOptions,
            onChangeAlias,
            customSql,
            joinTableOption,
            setCustomSql,
            onSaveCustomSQLColumn,
            dimModifiers,
            metricModifiers,
            tableList,
            onUpdateCustomSqlColumn,
            arithmeticColumnOptions,
            onSaveArithMetricOption,
          }}
          metricConfig={{
            createNewColumnError,
            selectedTable,
            editorRef,
            isSqlTab,
          }}
        />
      ) : (
        <AutoCompleteComponent
          newMetricConfigProps={{
            onChangeAutoCompleteAlias,
            onChangeAutoCompleteHelperFunction,
            functionOptions,
            tableList,
            setSelectedMainTable,
            selectedMainTable,
            selectedAutoCompleteCols,
            setSelectedAutoCompleteCols,
            autoCompleteDropdownOptions,
            onSubmitSearch,
          }}
        />
      )}
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          {creatorMode === DRAGDROP ? (
            <>
              <div className="dbn-relative">
                <Ui.NewTooltip
                  text={
                    isPythonMode
                      ? 'Joins are disabled for python mode.'
                      : !data && !isSqlTab
                      ? 'Joins will be enabled after dragging and dropping a column'
                      : !isSqlTab
                      ? 'Joins'
                      : 'Joins is disabled for sql tab'
                  }
                  position="right"
                >
                  <Ui.Button
                    variant="popover"
                    leftIcon={<Ui.Icons name="full-join" />}
                    onClick={() => setShowJoinPanel?.((s) => !s)}
                    isDisabled={isPythonMode || !data?.length || isSqlTab}
                  />
                  {joins ? (
                    <span className="dbn-absolute dbn-top-0 dbn-right-0 dbn-w-1 dbn-h-3">
                      <Ui.Icons name="circle" color="primary" />
                    </span>
                  ) : null}
                </Ui.NewTooltip>
              </div>
              <div className="dbn-relative">
                <Ui.NewTooltip
                  text={
                    isPythonMode
                      ? 'Group by is disabled for python mode.'
                      : 'Group By'
                  }
                  position={isPythonMode ? 'right' : 'bottom'}
                >
                  <Ui.Button
                    variant="popover"
                    leftIcon={<Ui.Icons name="group-by" />}
                    onClick={() => setShowGroupByPanel?.((s) => !s)}
                    isDisabled={isPythonMode || !data?.length}
                  />
                </Ui.NewTooltip>
                {groupBy ? (
                  <span className="dbn-absolute dbn-top-0 dbn-right-0 dbn-w-1 dbn-h-3">
                    <Ui.Icons name="circle" color="primary" />
                  </span>
                ) : null}
              </div>
              <div className="dbn-relative">
                <Ui.NewTooltip
                  text={
                    isPythonMode
                      ? 'Filters are disabled for python mode.'
                      : 'Filters'
                  }
                  position={isPythonMode ? 'right' : 'bottom'}
                >
                  <Ui.Button
                    variant="popover"
                    isDisabled={
                      isPythonMode ||
                      (!selectedMetrics.length && !selectedDims.length)
                    }
                    leftIcon={<Ui.Icons name="funnel" />}
                    onClick={() => setShowFiltersPanel((s) => !s)}
                  />
                </Ui.NewTooltip>
                {filters ? (
                  <span className="dbn-absolute dbn-top-0 dbn-right-0 dbn-w-1 dbn-h-3">
                    <Ui.Icons name="circle" color="primary" />
                  </span>
                ) : null}
              </div>
              <div className="dbn-relative">
                <Ui.NewTooltip
                  text={
                    isPythonMode ? 'Sort is disabled for python mode.' : 'Sort'
                  }
                  position={isPythonMode ? 'right' : 'bottom'}
                >
                  <Ui.Button
                    variant="popover"
                    leftIcon={<Ui.Icons name="funnel-simple" />}
                    onClick={() => setShowSortPanel?.((s) => !s)}
                    isDisabled={isPythonMode || !data?.length}
                  />
                </Ui.NewTooltip>
                {sort ? (
                  <span className="dbn-absolute dbn-top-0 dbn-right-0 dbn-w-1 dbn-h-3">
                    <Ui.Icons name="circle" color="primary" />
                  </span>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
        <div className={styles.buttonWrapper}>
          {!isPythonMode && (
            <Ui.FloatingDropDown
              options={consts.RowLimitList}
              selectedOption={{ label: limit, value: limit }}
              onChange={(v) => {
                setLimit(v.value);
                onGenerateDatasetMetric({
                  prevLimit: v.value,
                });
              }}
              labelVariant="floating"
              buttonWidth="90px"
              menuWidth="150px"
              label="Limit"
            />
          )}
          <Ui.Button
            variant="popover"
            className="dbn-border dbn-border-transparent"
            leftIcon={
              <Ui.NewTooltip text="Chart Type">
                <span className="dbn-flex dbn-gap-1">
                  <Ui.Icons name="bar-chart-2" />
                  Charts
                </span>
              </Ui.NewTooltip>
            }
            onClick={() => setShowChartType((s) => !s)}
          />
          <Ui.Button
            variant="popover"
            className="dbn-border dbn-border-transparent"
            leftIcon={
              <Ui.NewTooltip text="Appearance & Actions" position="bottom">
                <span className="dbn-flex dbn-gap-1">
                  <Ui.Icons name="gear" />
                  Settings
                </span>
              </Ui.NewTooltip>
            }
            onClick={() => setShowChartCustomProperties((s) => !s)}
          />
          {!isCreateVirtualTable ? (
            <div className="dbn-flex dbn-gap-4 dbn-justify-center dbn-items-center">
              <Ui.Button
                variant="popover"
                onClick={() => setShowResults(!isShowResults)}
                className={`${
                  isShowResults ? 'dbn-underline dbn-underline-offset-4' : ''
                }`}
              >
                Results
              </Ui.Button>
              {isEnableSelectAll ? (
                <Ui.NewTooltip text="Select the remaining columns of the table">
                  <Ui.Button
                    variant="popover"
                    onClick={() => onRemainingColsSelection()}
                    className="dbn-text-xs dbn-text-secondary-dark dbn-font-semibold hover:dbn-border hover:dbn-border-secondary hover:dbn-rounded-md dbn-p-1"
                  >
                    Select *columns
                  </Ui.Button>
                </Ui.NewTooltip>
              ) : null}
            </div>
          ) : (
            <Ui.Button
              variant={isShowResults ? 'secondary' : 'tertiary'}
              leftIcon={<Ui.Icons name="task-done-file" />}
              onClick={() => setShowResults(!isShowResults)}
            >
              Results
            </Ui.Button>
          )}
        </div>
      </div>
      {isInvalidColModal ? (
        <Ui.Modal
          isOpen={isInvalidColModal}
          onClose={() => setInvalidColModal(!isInvalidColModal)}
          headerTitle="Add Join"
        >
          <div className="dbn-flex dbn-items-center dbn-justify-center dbn-p-6">
            <Ui.Alert
              variant="error"
              text="Please add a join before dragging and dropping columns from another table"
            />
          </div>
          <Ui.ModalFooter>
            <Ui.Button
              variant="secondary"
              onClick={() => setInvalidColModal(false)}
            >
              Cancel
            </Ui.Button>
            <Ui.Button
              variant="primary"
              onClick={() => {
                setInvalidColModal(false);
                setShowJoinPanel(true);
              }}
            >
              Continue
            </Ui.Button>
          </Ui.ModalFooter>
        </Ui.Modal>
      ) : null}

      {isShowResults ? (
        <Results config={resultsProps.config} />
      ) : (
        <div className={styles['visualization-tab']}>
          <Visualization
            isPythonMode={isPythonMode}
            onDrillPivotTable={onDrillPivotTable}
            pivotDrillState={pivotDrillState}
            drillType={drillType}
            filters={drillFilters}
            legendData={legendData}
            themeChartColors={chartSettings.chartColors}
            data={data}
            onDrillLevelClick={onDrillLevelClick}
            isLoading={isLoading}
            chartSettings={chartSettings}
            setChartSettings={setChartSettings}
            isEnablePivotTable={isEnablePivotTable}
            groupbyList={groupbyList}
            chartPopupChild={chartPopupChild}
            handleChartRightClick={handleChartRightClick}
            chartClickConfig={chartClickConfig}
            remainingMilliseconds={remainingMilliseconds}
            seconds={seconds}
            drilldown={drilldown}
            datasetSettings={datasetSettings}
            setShowChartPopup={setShowChartPopup}
            dimensions={dimensions}
            drillLevel={drillLevel}
            hasNumberKeys={hasNumberKeys}
            isEnableGauge={isEnableGauge}
            isEnableGroupBy={isEnableGroupBy}
            noColsSelected={!(selectedDims?.length + selectedMetrics?.length)}
            headerChild={
              <div className="dbn-flex dbn-flex-wrap dbn-items-center dbn-gap-2.5">
                {rlsConditions
                  ?.filter((rls) => rls.isAddOnMetrics && !rls.isAppFilter)
                  .map((rls, index) => (
                    <div className="dbn-flex dbn-gap-1 dbn-items-center">
                      <SavedFilter
                        props={{
                          title: 'Metric Filter',
                          actions: [
                            {
                              callbackFunction: () => {
                                onClickEditFilter({
                                  rlsCondition: rls,
                                  setCurrentMetricFilter,
                                  setShowFormContainer,
                                  index,
                                  isDatabaseTenancy: tenancyLevel !== TABLE,
                                });
                                setOpenModal({
                                  isOpen: true,
                                  name: 'edit filters',
                                });
                              },
                              name: 'Edit',
                              icon: 'pencil-simple',
                            },
                            {
                              callbackFunction: () =>
                                setRlsConditions((prev) =>
                                  prev.filter((_, i) => i !== index)
                                ),
                              name: 'Delete',
                              icon: 'delete',
                              color: 'alert',
                            },
                          ],
                        }}
                      />
                      <Ui.MetricFilterDropDown
                        key={rls.columnName}
                        onChangeFilterValue={onChangeFilterValue}
                        rlsConditions={rls}
                        workspaceId={workspace?.id || ''}
                        clientId={clientName}
                        rlsConditionList={rlsConditions}
                        isAllClient={isAllClient}
                        tenancyLevel={tenancyLevel}
                      />
                    </div>
                  ))}
                {chartSettings?.dynamicXAxis?.isEnabled ? (
                  <div className="dbn-flex dbn-gap-1 dbn-items-center">
                    <SavedFilter
                      props={{
                        title: 'Switch Axis',
                        actions: [
                          {
                            callbackFunction: () =>
                              setChartSettings((prev) => ({
                                ...(prev as types.ChartSettingsType),
                                dynamicXAxis: {
                                  ...prev.dynamicXAxis,
                                  isEnabled: false,
                                },
                              })),
                            name: 'Delete',
                            icon: 'delete',
                            color: 'alert',
                          },
                        ],
                      }}
                    />
                    <Ui.FloatingDropDown
                      options={switchAxisOptions || []}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...(prev as types.ChartSettingsType),
                          dynamicXAxis: {
                            ...prev.dynamicXAxis,
                            selectedOption: value,
                          },
                          xAxis: value.value,
                        }))
                      }
                      selectedOption={
                        chartSettings.dynamicXAxis?.selectedOption || {
                          value: '',
                          label: '',
                        }
                      }
                    />
                  </div>
                ) : null}
                {chartSettings?.isMultiDimension &&
                chartSettings?.isDynamicSeries ? (
                  <div className="dbn-flex dbn-gap-1 dbn-items-center">
                    <SavedFilter
                      props={{
                        title: 'Group By',
                        actions: [
                          {
                            callbackFunction: () => {
                              setOpenModal({
                                isOpen: true,
                                name: 'edit group',
                              });
                            },
                            name: 'Edit',
                            icon: 'pencil-simple',
                          },
                          {
                            callbackFunction: () =>
                              setChartSettings((prevValue) => ({
                                ...prevValue,
                                isMultiDimension: false,
                                isDynamicSeries: false,
                                seriesField: 'ungrouped',
                                customSettings: {
                                  ...prevValue.customSettings,
                                  showSelectLegend: false,
                                },
                              })),
                            name: 'Delete',
                            icon: 'delete',
                            color: 'alert',
                          },
                        ],
                      }}
                    />
                    <Ui.FloatingDropDown
                      options={[
                        ...(chartSettings?.seriesOptions?.map((group) => ({
                          value: group,
                          label:
                            group === 'ungrouped'
                              ? chartSettings.ungroupedAlias || 'ungrouped'
                              : group,
                        })) || []),
                      ]}
                      onChange={(value) => {
                        setChartSettings((prev) => ({
                          ...prev,
                          seriesField: value.value,
                        }));
                        onChangeTimeseriesFormat(
                          {
                            value:
                              chartSettings?.timeSeriesSettings?.groupBySettings
                                ?.value || 'monthly',
                            label:
                              chartSettings?.timeSeriesSettings?.groupBySettings
                                ?.value || 'monthly',
                          },
                          value.value
                        );
                      }}
                      selectedOption={{
                        label:
                          chartSettings?.seriesField ||
                          chartSettings?.seriesOptions?.[0] ||
                          'ungrouped',
                        value:
                          chartSettings?.seriesField ||
                          chartSettings?.seriesOptions?.[0] ||
                          'ungrouped',
                      }}
                      label="Group by"
                      labelVariant="floating"
                    />
                  </div>
                ) : null}

                {chartSettings.timeSeriesSettings?.groupBySettings.isDynamic ? (
                  <Ui.FloatingDropDown
                    options={chartSettings.timeSeriesSettings.groupBySettings.options.map(
                      (value) => ({
                        label:
                          value.split('____').length > 1
                            ? value.split('____')[1]
                            : value,
                        value,
                      })
                    )}
                    onChange={(value) => {
                      setChartSettings((prev) => ({
                        ...prev,
                        timeSeriesSettings: {
                          ...(prev.timeSeriesSettings as types.TimeSeriesSettingsType),
                          groupBySettings: {
                            ...(prev.timeSeriesSettings
                              ?.groupBySettings as types.TimeSeriesSettingsType['groupBySettings']),
                            value: value.value,
                          },
                        },
                      }));
                      onChangeTimeseriesFormat(value);
                    }}
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
                                chartSettings.timeSeriesSettings.groupBySettings
                                  .value.length
                              ),
                      value:
                        chartSettings.timeSeriesSettings.groupBySettings.value,
                    }}
                  />
                ) : undefined}
                {chartSettings.pivotTableSettings2?.isDynamicHeaders &&
                  chartSettings.chartType === consts.CHART_TYPES.pivotV2 && (
                    <Ui.MultiSelectDropdown
                      onChange={(options) => {
                        setChartSettings((prev) => ({
                          ...prev,
                          pivotTableSettings2: {
                            ...prev.pivotTableSettings2,
                            headers: options.map((c) => c.value),
                            dimensions: pivotHeaderOptions
                              .filter(
                                (o) =>
                                  !options.some((col) => col.value === o.value)
                              )
                              .map((o) => o.value),
                          },
                        }));
                        onSelectPivotTable(
                          chartSettings.chartType,
                          options.map((o) => o.value)
                        );
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
                <Ui.PopoverMenu
                  buttonContent={
                    <Ui.Button
                      variant="popover"
                      className="dbn-p-2.5 dbn-w-full dbn-border dbn-border-secondary dbn-rounded-md"
                      leftIcon={<Ui.Icons name="plus" />}
                      isDisabled={isFiltersPopoverDisabled}
                    />
                  }
                  menuWidth="120px"
                  position="right-start"
                  isDisabled={isFiltersPopoverDisabled}
                >
                  <Ui.Button
                    variant="popover"
                    className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                    onClick={() => {
                      setOpenModal({
                        isOpen: true,
                        name: 'filters',
                      });
                      setShowFormContainer({
                        isEnable: false,
                        index: 0,
                        type: 'Save',
                      });
                    }}
                  >
                    Metric Filters
                  </Ui.Button>
                  {[
                    consts.CHART_TYPES.line,
                    consts.CHART_TYPES.bar,
                    consts.CHART_TYPES.area,
                    consts.CHART_TYPES.combo,
                    consts.CHART_TYPES.scatter,
                    consts.CHART_TYPES.bubble,
                    consts.CHART_TYPES.stack,
                    consts.CHART_TYPES.waterfall,
                    consts.CHART_TYPES.stackedArea,
                  ].includes(chartSettings.chartType) ? (
                    <Ui.Button
                      variant="popover"
                      isDisabled={chartSettings.dynamicXAxis?.isEnabled}
                      className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                      onClick={() => {
                        setChartSettings((prev) => ({
                          ...prev,
                          dynamicXAxis: {
                            isEnabled: true,
                            options: switchAxisOptions?.map((o) => ({
                              value: o.value,
                              label: o.value,
                            })),
                            selectedOption: {
                              value: switchAxisOptions?.[0]?.value || '',
                              label: switchAxisOptions?.[0]?.value || '',
                            },
                          },
                          xAxis: switchAxisOptions?.[0]?.value || '',
                        }));
                      }}
                    >
                      Switch Axis
                    </Ui.Button>
                  ) : null}
                  {!isPivotTable2 && (
                    <Ui.Button
                      variant="popover"
                      isDisabled={
                        chartSettings.isMultiDimension &&
                        chartSettings.isDynamicSeries
                      }
                      className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                      onClick={() => {
                        setChartSettings((prevValue) => ({
                          ...prevValue,
                          isMultiDimension: true,
                          customSettings: {
                            ...prevValue.customSettings,
                            showSelectLegend: false,
                          },
                        }));
                        setOpenModal({
                          isOpen: true,
                          name: 'group',
                        });
                      }}
                    >
                      Group By
                    </Ui.Button>
                  )}
                  {isPivotTable2 && (
                    <Ui.Button
                      variant="popover"
                      className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                      onClick={() => {
                        setOpenModal({
                          isOpen: true,
                          name: 'pivot2',
                        });
                      }}
                    >
                      Pivot Settings
                    </Ui.Button>
                  )}
                </Ui.PopoverMenu>
              </div>
            }
            isExternalChart={isExternalChart}
            onChangePage={onChangePage}
            isEnableNextBtn={isEnableNextBtn}
            isEnablePrevBtn={isEnablePrevBtn}
            paginationInfo={paginationInfo}
            moreOptions={
              <MetricFilterPopup
                onChangeFilterValue={onChangeFilterValue}
                appFilters={
                  rlsConditions?.filter(
                    (filter) => filter.isAddOnMetrics && filter.isAppFilter
                  ) || []
                }
                workspaceId={workspace?.id || ''}
                clientName={clientName}
                rlsConditions={rlsConditions || []}
                isAllClient={isAllClient}
                tenancyLevel={tenancyLevel}
              />
            }
          />
        </div>
      )}
      <Ui.Modal
        isOpen={isOpenModal.isOpen}
        onClose={() => {
          if (
            isOpenModal.name === 'filters' ||
            isOpenModal.name === 'edit filters'
          ) {
            setCurrentMetricFilter(DEFAULT_NEW_FILTER);
          }
          setOpenModal({
            isOpen: false,
            name: '',
          });
        }}
        headerTitle={modalHeaderTitle}
      >
        <div className={styles.chartFilterContent}>
          {(isOpenModal.name === 'filters' ||
            isOpenModal.name === 'edit filters') && (
            <ConfigForm
              props={{
                rlsConditions,
                setRlsConditions,
                tableList,
                joinTableOption,
                isSqlTab,
                isPythonMode,
                tenancyType: tenancyLevel || 'TABLE',
                currentMetricFilter,
                setCurrentMetricFilter,
                setShowFormContainer,
                showFormContainer,
                title: isOpenModal.name,
                onClose: () =>
                  setOpenModal({
                    isOpen: false,
                    name: '',
                  }),
              }}
            />
          )}
          {(isOpenModal.name === 'group' ||
            isOpenModal.name === 'edit group') && (
            <div className={styles.accordionContent}>
              <div className={styles.manualOptionSwitch}>
                <Ui.Switch
                  name="dynamic series"
                  enabled={chartSettings?.isDynamicSeries}
                  onChange={() =>
                    setChartSettings((prev) => ({
                      ...prev,
                      isDynamicSeries: !prev.isDynamicSeries,
                      seriesField: 'ungrouped',
                    }))
                  }
                />
                <Ui.Text variant="label">Dynamic Options</Ui.Text>
              </div>

              {chartSettings.isDynamicSeries ? (
                <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2">
                  <Ui.InputField
                    type="text"
                    label="Alias for Ungrouped"
                    placeholder="add alias for ungrouped"
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        ungroupedAlias: e.target.value,
                      }))
                    }
                    value={chartSettings.ungroupedAlias}
                  />
                  <Ui.MultiSelectDropdown
                    label="Series Column"
                    options={groupByOptions}
                    onChange={(value) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        seriesField: value?.[0]?.value || 'ungrouped',
                        seriesOptions: value?.map((v) => v.value) || [],
                      }))
                    }
                    selectedOption={
                      chartSettings.seriesOptions
                        ?.filter((v) =>
                          groupByOptions.map((val) => val.value)?.includes(v)
                        )
                        ?.map((v) => ({ value: v, label: v })) || []
                    }
                    isSearchEnabled
                    buttonWidth="100%"
                    menuWidth="100%"
                  />
                </div>
              ) : (
                <Ui.FloatingDropDown
                  options={groupByOptions}
                  selectedOption={{
                    label: chartSettings.seriesField || 'ungrouped',
                    value: chartSettings.seriesField || 'ungrouped',
                  }}
                  buttonWidth="410px"
                  menuWidth="100%"
                  label="Series Column"
                  onChange={(value) => {
                    setChartSettings((prevValue) => ({
                      ...prevValue,
                      seriesField: value.value,
                    }));
                    onChangeTimeseriesFormat(
                      {
                        value:
                          chartSettings?.timeSeriesSettings?.groupBySettings
                            ?.value || 'monthly',
                        label:
                          chartSettings?.timeSeriesSettings?.groupBySettings
                            ?.value || 'monthly',
                      },
                      value.value
                    );
                  }}
                />
              )}
            </div>
          )}
          {isOpenModal.name === 'pivot2' && (
            <div className="dbn-w-full dbn-p-5">
              <div className={styles.manualOptionSwitch}>
                <Ui.Switch
                  name="dynamic columns"
                  enabled={chartSettings?.pivotTableSettings2?.isDynamicHeaders}
                  onChange={() =>
                    setChartSettings((prev) => ({
                      ...prev,
                      pivotTableSettings2: {
                        ...prev.pivotTableSettings2,
                        isDynamicHeaders:
                          !prev.pivotTableSettings2?.isDynamicHeaders,
                      },
                    }))
                  }
                />
                <Ui.Text variant="label">Dynamic columns</Ui.Text>
              </div>
              <Ui.MultiSelectDropdown
                onChange={(options) => {
                  setChartSettings((prev) => ({
                    ...prev,
                    pivotTableSettings2: {
                      ...prev.pivotTableSettings2,
                      headers: options.map((c) => c.value),
                      dimensions: pivotHeaderOptions
                        .filter(
                          (o) => !options.some((col) => col.value === o.value)
                        )
                        .map((o) => o.value),
                    },
                  }));
                  onSelectPivotTable(
                    chartSettings.chartType,
                    options.map((o) => o.value)
                  );
                }}
                options={pivotHeaderOptions}
                selectedOption={
                  pivotHeaderOptions?.filter((col) =>
                    chartSettings.pivotTableSettings2?.headers?.includes(
                      col.value
                    )
                  ) || []
                }
                label="Columns"
                isSearchEnabled
                buttonWidth="100%"
                menuWidth="100%"
              />
            </div>
          )}
        </div>
      </Ui.Modal>
    </div>
  );
};

export default OutputTab;
