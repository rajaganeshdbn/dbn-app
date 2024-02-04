/* eslint-disable react/forbid-elements */
/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from 'react';
import styles from './card.module.css';
import { NoDataLoading } from './NoDataLoading';
import { ExternalMetrics } from '@/types/queryTypes';
import { ChartSettingsType, ClientType } from '@/types/app';
import {
  Icons,
  Chart,
  Button,
  ChartPopup,
  FilterFieldType,
  DrillBreadCrumb,
  FloatingDropDown,
  MetricFilterDropDown,
  NewTooltip,
  Menu,
  SkeletonLoader,
  Alert,
  Switch,
  InfoTooltip,
  MultiSelectDropdown,
} from '@/components';
import { handleCardClick } from '@/helpers/cardActions';
import {
  MetricFilterOptionsType,
  RlsCondition,
  TimeSeriesSettingsType,
} from '@/types';
import {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  CHART_TYPES,
  DOWNLOAD_DATA_OPTIONS,
  IS_SELF_HOSTED,
  TOP_LEFT,
  TOP_RIGHT,
} from '@/consts';
import { useMetricCard } from '@/hooks/useMetricCard';
import { RawCsvDownloadButton } from '@/components/MetricChart';
import AddMetricFilter from '@/components/MetricList/components/FullScreenView/AddMetricFilter';
import { getSqlStatement } from '@/helpers';

export type MetricCardProps = {
  globalFilters?: {
    tableName: string;
    filters: FilterFieldType[];
  };
  metricItem: any;
  client: ClientType['value'];
  encryptedClient?: ClientType['value'];
  onMaximize?: (
    metric: ExternalMetrics,
    rlsFilters?: {
      param: any;
      filterValues: Record<string, string>;
    },
    appFilters?: any
  ) => void;
  colors?: string[];
  param?: any;
  appFilters?: any;
  companyTenancyType: string;
  renderHeaderName?: (name: string) => JSX.Element;
  onArchive?: (metricId: string) => void;
  isDisableCardClick?: boolean;
  chartRendererType?: 'svg' | 'canvas';
  isDisableMorePopup?: boolean;
  isInternalApp?: boolean;
  setCrossDashboardFilters?: React.Dispatch<
    React.SetStateAction<RlsCondition[]>
  >;
  crossDashboardFilters?: RlsCondition[];
  metricFilterOptions?: MetricFilterOptionsType;
  onDownloadRawCsv?: (filterValues?: Record<string, any>) => void;
  enableDownloadCsv?: boolean;
  enableMultiMetricFilters?: boolean;
  disableActions?: boolean;
  metricFilterPosition?: 'outside' | 'inside';
  isAllClient?: boolean;
  dropdownTheme: {
    width: string;
    variant: 'static' | 'floating';
    radius: string;
  };
  optionsIcon?: 'kebab-menu-vertical' | 'download';
  downloadMetrics: {
    id: string;
    isInProgress: boolean;
  }[];
  onDownload: (id: string, isEnable: boolean) => void;
  appearanceOptions?: {
    appearanceOptionsPosition?:
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right';
    dynamicBehaviour?: {
      isEnabled?: boolean;
      label?: string;
    };
    cumulativeBar?: {
      isEnabled?: boolean;
      label?: string;
    };
    stackedBars?: {
      isEnabled?: boolean;
      label?: string;
    };
  };
  isFrontendApp: boolean;
  guestToken?: string;
};

export const MetricCard = ({
  globalFilters = { tableName: '', filters: [] },
  metricItem,
  onMaximize,
  client,
  colors,
  param,
  companyTenancyType,
  renderHeaderName,
  isDisableCardClick,
  onArchive,
  chartRendererType = 'canvas',
  isDisableMorePopup,
  appFilters,
  isInternalApp,
  setCrossDashboardFilters,
  crossDashboardFilters,
  metricFilterOptions,
  onDownloadRawCsv,
  enableDownloadCsv,
  enableMultiMetricFilters,
  disableActions,
  metricFilterPosition = 'inside',
  isAllClient,
  dropdownTheme,
  optionsIcon = 'kebab-menu-vertical',
  downloadMetrics,
  onDownload,
  appearanceOptions,
  isFrontendApp,
  guestToken,
  encryptedClient,
}: MetricCardProps) => {
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
    drillType,
    drillFilters,
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
    metric: metricItem,
    clientId: client,
    globalFilters,
    rlsFilters: param,
    tenancyLevel: companyTenancyType,
    appFilters,
    isInternalApp,
    crossDashboardFilters,
    setCrossDashboardFilters,
    metricFilterOptions,
    isAllClient,
    isFrontendApp,
    guestToken,
    encryptedClientId: encryptedClient,
  });

  const [isShowFullScreen, setShowFullScreen] = useState<boolean>(false);
  const isShowMoreIcon = useMemo(() => {
    if (onDownloadRawCsv) return true;
    if (enableDownloadCsv) return true;
    return false;
  }, [onDownloadRawCsv, enableDownloadCsv]);
  const chartSettingOptions: ChartSettingsType = useMemo(
    () =>
      metricItem?.drillDownSettings?.isEnableGroupBy &&
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
    [dimensions, drilledLevel, chartSettings, metricItem, dataDb]
  );
  const isTableChart = useMemo(
    () =>
      [
        CHART_TYPES.horizontalStackTable,
        CHART_TYPES.pivot,
        CHART_TYPES.pivotV2,
        CHART_TYPES.table,
      ].includes(chartSettings.chartType),
    [chartSettings.chartType]
  );
  const tableStyles = useMemo(() => {
    if (
      isTableChart &&
      metricFilters.length &&
      metricFilterPosition === 'inside' &&
      metricItem?.drillDownSettings?.isEnableGroupBy
    ) {
      return styles.tableWithFeatures;
    }
    if (
      isTableChart &&
      ((metricFilters.length && metricFilterPosition === 'inside') ||
        metricItem?.drillDownSettings?.isEnableGroupBy)
    ) {
      return styles.tableChart;
    }
    return '';
  }, [
    isTableChart,
    metricFilters.length,
    metricItem?.drillDownSettings?.isEnableGroupBy,
  ]);
  return (
    <>
      {!!metricFilters.length && metricFilterPosition === 'outside' && (
        <div className={styles.metricFilters}>
          {enableMultiMetricFilters && (
            <AddMetricFilter
              filters={metricFilters}
              updateFilter={updateFilter}
            />
          )}
          {leftPositionedMetricFilters.map((filter, index) => (
            <MetricFilterDropDown
              isAllClient={isAllClient}
              dropdownTheme={dropdownTheme}
              workspaceId={metricItem?.companyIntegration?.workspaceId}
              rlsConditions={filter}
              onChangeFilterValue={onChangeFilterValue}
              clientId={client}
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
              tenancyLevel={companyTenancyType}
            />
          ))}
          {rightPositionedMetricFilters.map((filter, index) => (
            <MetricFilterDropDown
              isAllClient={isAllClient}
              dropdownTheme={dropdownTheme}
              workspaceId={metricItem?.companyIntegration?.workspaceId}
              rlsConditions={filter}
              onChangeFilterValue={onChangeFilterValue}
              clientId={client}
              key={filter.name}
              className={index === 0 ? styles.filterTopRight : ''}
              rlsConditionList={[
                ...leftPositionedMetricFilters,
                ...rightPositionedMetricFilters,
              ]}
              tenancyLevel={companyTenancyType}
            />
          ))}
        </div>
      )}
      {Object.keys(appearanceOptions || {})?.length &&
      [TOP_LEFT, TOP_RIGHT].includes(
        appearanceOptions?.appearanceOptionsPosition || ''
      ) ? (
        <div
          className={`dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-4 ${
            appearanceOptions?.appearanceOptionsPosition === TOP_LEFT
              ? 'dbn-justify-start'
              : 'dbn-justify-end'
          }`}
        >
          {appearanceOptions?.cumulativeBar?.isEnabled ? (
            <span className="dbn-flex dbn-gap-1 dbn-items-center">
              <InfoTooltip
                position="bottom"
                text="It demonstrates the accumulated values, providing insights into the overall trend or pattern in the data"
              />
              <Switch
                enabled={chartSettings.customSettings?.cumulativeBar}
                name="cumulative"
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      cumulativeBar: !prev.customSettings?.cumulativeBar,
                    },
                  }))
                }
                placeholder={
                  appearanceOptions?.cumulativeBar?.label || 'Cumulative'
                }
              />
            </span>
          ) : null}
          {appearanceOptions?.dynamicBehaviour?.isEnabled ? (
            <span className="dbn-flex dbn-gap-1 dbn-items-center">
              <InfoTooltip
                position="bottom"
                text="It allows you to observe trends, fluctuations, or updates as they occur in a responsive visual representation"
              />
              <Switch
                enabled={chartSettings.customSettings?.showDynamicBehaviour}
                name="dynamic"
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      showDynamicBehaviour:
                        !prev.customSettings?.showDynamicBehaviour,
                    },
                  }))
                }
                placeholder={
                  appearanceOptions?.dynamicBehaviour?.label || 'Dynamic'
                }
              />
            </span>
          ) : null}
          {appearanceOptions?.stackedBars?.isEnabled ? (
            <span className="dbn-flex dbn-gap-1 dbn-items-center">
              <InfoTooltip
                position="bottom"
                text="It represent the percentage distribution of individual components relative to the whole"
              />
              <Switch
                name="full stacked"
                enabled={chartSettings.customSettings?.showFullStacked}
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      showFullStacked: !prev.customSettings?.showFullStacked,
                    },
                  }))
                }
                placeholder={
                  appearanceOptions?.stackedBars?.label || '100% stacked bars'
                }
              />
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        ref={containerRef}
        className={`${styles.cardContainer} dbn-metric-card`}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onMouseEnter={() => setShowFullScreen(true)}
        onMouseLeave={() => setShowFullScreen(false)}
      >
        {!isQueryLoading ? (
          <>
            <div className={styles.listHeader}>
              <div className={styles.metricName}>
                {renderHeaderName ? (
                  <div
                    className={`${styles.metricTitle} dbn-metric-card-title`}
                  >
                    {renderHeaderName(metricItem.name)}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (metricItem.clickActions.card.isEnable)
                        handleCardClick(
                          metricItem.clickActions,
                          metricItem.metricId,
                          metricItem.id
                        );
                      else onMaximize?.(metricItem, param, appFilters);
                    }}
                    disabled={isDisableCardClick}
                    className={`${styles.metricTitle} dbn-metric-card-title`}
                  >
                    {metricItem.name}
                  </button>
                )}
                {metricItem.description && (
                  <span
                    className={`${styles.metricDescription} dbn-metric-card-description`}
                  >
                    {metricItem.description}
                  </span>
                )}
              </div>
              {!disableActions && !isQueryLoading ? (
                <div className={styles.features}>
                  {chartSettings?.dynamicXAxis?.isEnabled ? (
                    <FloatingDropDown
                      buttonWidth={dropdownTheme?.width || '180px'}
                      menuWidth={dropdownTheme?.width || '180px'}
                      radius={dropdownTheme.radius}
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
                      label="x-axis"
                      labelVariant={dropdownTheme?.variant || 'floating'}
                    />
                  ) : null}
                  {chartSettings?.isDynamicSeries ? (
                    <FloatingDropDown
                      buttonWidth={dropdownTheme?.width || '180px'}
                      menuWidth={dropdownTheme?.width || '180px'}
                      radius={dropdownTheme.radius}
                      options={dynamicOptions}
                      onChange={(value) =>
                        setChartSettings((prev) => ({
                          ...(prev as ChartSettingsType),
                          seriesField: value.value,
                        }))
                      }
                      selectedOption={{
                        label:
                          chartSettings?.seriesField === 'ungrouped' &&
                          chartSettings.ungroupedAlias
                            ? chartSettings.ungroupedAlias
                            : chartSettings.seriesField || 'ungrouped',
                        value: chartSettings?.seriesField || 'ungrouped',
                      }}
                      label="group by"
                      labelVariant={dropdownTheme?.variant || 'floating'}
                    />
                  ) : null}
                  {chartSettings?.timeSeriesSettings?.groupBySettings
                    .isDynamic ? (
                    <FloatingDropDown
                      buttonWidth={dropdownTheme?.width || '180px'}
                      menuWidth={dropdownTheme?.width || '180px'}
                      radius={dropdownTheme.radius}
                      options={chartSettings?.timeSeriesSettings?.groupBySettings.options.map(
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
                            ...(prev?.timeSeriesSettings as TimeSeriesSettingsType),
                            groupBySettings: {
                              ...(prev?.timeSeriesSettings
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
                          chartSettings.timeSeriesSettings.groupBySettings.value.split(
                            '____'
                          ).length > 1
                            ? chartSettings.timeSeriesSettings.groupBySettings.value.split(
                                '____'
                              )[0]
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
                      }}
                      labelVariant={dropdownTheme?.variant || 'floating'}
                    />
                  ) : null}
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
                  {!!dataDb.length &&
                    !disableActions &&
                    !isDisableMorePopup &&
                    isShowMoreIcon && (
                      <Menu
                        menuWidth="dbn-w-[400px]"
                        buttonVariant="icon"
                        buttonIcon={
                          <span className={styles.morePopup}>
                            <Icons name={optionsIcon} size="xl" />
                          </span>
                        }
                        position="bottom-end"
                        items={[
                          ...(enableDownloadCsv
                            ? [
                                {
                                  name: DOWNLOAD_DATA_OPTIONS?.RAW_DATA,
                                  content: (
                                    <RawCsvDownloadButton
                                      updateDownloadProgress={(isEnable) =>
                                        onDownload(metricItem?.id, isEnable)
                                      }
                                      fileName={metricItem.name}
                                      companyIntegrationId={
                                        metricItem.companyIntegrationId
                                      }
                                      integrationName={
                                        metricItem.integrationName
                                      }
                                      query={getSqlStatement({
                                        query: metricItem?.query || '',
                                        dbName:
                                          metricItem?.integrationName || '',
                                        rlsConditions: appliedMetricFilters,
                                        tenancyLevel: companyTenancyType,
                                        clientId: client,
                                        globalFilters,
                                        values: filterValues,
                                        isAllClient,
                                      })}
                                      className={styles.popupItem}
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
                                      updateDownloadProgress={(isEnable) =>
                                        onDownload(metricItem?.id, isEnable)
                                      }
                                      fileName={metricItem.name}
                                      companyIntegrationId={
                                        metricItem.companyIntegrationId
                                      }
                                      integrationName={
                                        metricItem.integrationName
                                      }
                                      query={getSqlStatement({
                                        query: metricItem?.query || '',
                                        dbName:
                                          metricItem?.integrationName || '',
                                        rlsConditions:
                                          appliedMetricFilters?.filter(
                                            (f) => f.isVariableFilter
                                          ),
                                        tenancyLevel: companyTenancyType,
                                        clientId: client,
                                        values: filterValues,
                                        isAllClient,
                                        globalFilters: {
                                          ...globalFilters,
                                          filters:
                                            globalFilters?.filters?.filter(
                                              (f) => f.isVariableFilter
                                            ) || [],
                                        },
                                      })}
                                      className={styles.popupItem}
                                    >
                                      <Icons name="download" />
                                      Download Without Filters
                                    </RawCsvDownloadButton>
                                  ),
                                },
                              ]
                            : []),
                          ...(onDownloadRawCsv && !IS_SELF_HOSTED
                            ? [
                                {
                                  name: DOWNLOAD_DATA_OPTIONS?.EMAIL_RAW_DATA,
                                  leftIcon: <Icons name="table-view" />,
                                  onClick: () => onDownloadRawCsv(filterValues),
                                },
                              ]
                            : []),
                        ]}
                        disableAutoClose
                      />
                    )}
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
                </div>
              ) : null}
            </div>
            {chartSettings?.chartType && (
              <div
                className={`${styles.metricData} ${
                  metricItem.description.length
                    ? styles.chartWithDescHeight
                    : styles.chartHeight
                } dbn-chart ${
                  [
                    CHART_TYPES.horizontalStackTable,
                    CHART_TYPES.pivot,
                    CHART_TYPES.pivotV2,
                    CHART_TYPES.table,
                  ].includes(chartSettings.chartType)
                    ? styles.metricTable
                    : ''
                }`}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                {!disableActions && !isQueryLoading ? (
                  <>
                    {!!metricFilters.length &&
                      metricFilterPosition === 'inside' && (
                        <div
                          className={`${
                            chartSettings.chartType === CHART_TYPES.table
                              ? styles.tableMetricFilters
                              : styles.metricFilters
                          }`}
                        >
                          {enableMultiMetricFilters && (
                            <AddMetricFilter
                              filters={metricFilters}
                              updateFilter={updateFilter}
                            />
                          )}
                          {leftPositionedMetricFilters.map((filter, index) => (
                            <MetricFilterDropDown
                              isAllClient={isAllClient}
                              dropdownTheme={dropdownTheme}
                              workspaceId={
                                metricItem?.companyIntegration?.workspaceId
                              }
                              rlsConditions={filter}
                              onChangeFilterValue={onChangeFilterValue}
                              clientId={client}
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
                              tenancyLevel={companyTenancyType}
                            />
                          ))}
                          {rightPositionedMetricFilters.map((filter, index) => (
                            <MetricFilterDropDown
                              isAllClient={isAllClient}
                              dropdownTheme={dropdownTheme}
                              workspaceId={
                                metricItem?.companyIntegration?.workspaceId
                              }
                              rlsConditions={filter}
                              onChangeFilterValue={onChangeFilterValue}
                              clientId={client}
                              key={filter.name}
                              className={
                                index === 0 ? styles.filterTopRight : ''
                              }
                              rlsConditionList={[
                                ...leftPositionedMetricFilters,
                                ...rightPositionedMetricFilters,
                              ]}
                              tenancyLevel={companyTenancyType}
                            />
                          ))}
                        </div>
                      )}
                    {metricItem?.drillDownSettings?.isEnableGroupBy &&
                      !!dataDb.length && (
                        <>
                          <DrillBreadCrumb
                            dimensions={dimensions}
                            drilledLevel={
                              dimensions.length > drilledLevel
                                ? drilledLevel
                                : -1
                            }
                            onResetLevel={() => onDrillDown({}, [])}
                            onDrillLevelClick={(index: number) =>
                              onDrillLevelClick(index)
                            }
                            drillType={drillType || ''}
                            isMetricCard
                            isMetricFilter={!!metricFilters.length}
                            drillFilters={drillFilters}
                            isShowBreadCrumb={
                              !!dimensions?.length &&
                              ![
                                CHART_TYPES.horizontalStackTable,
                                CHART_TYPES.pivot,
                                CHART_TYPES.pivotV2,
                                CHART_TYPES.treeMap,
                                CHART_TYPES.sankey,
                              ].includes(chartSettings.chartType) &&
                              dimensions.length > drilledLevel
                            }
                          />
                        </>
                      )}
                  </>
                ) : null}
                <div className={`${tableStyles || styles.chart}`}>
                  <NoDataLoading
                    isLoading={isQueryLoading}
                    isDataLength={Boolean(dataDb?.length)}
                    isSingleValue={chartSettings.singleValue}
                    dataDb={dataDb[0]}
                    chartType={chartSettings.chartType}
                  />
                  <ChartPopup
                    isOpen={isShowChartPopup}
                    setOpen={setShowChartPopup}
                    value={chartParams?.name}
                    columnName={columnName}
                    getUnderlyingData={getUnderlyingData}
                    clickBehaviourConfigs={metricItem.clickActions.chart}
                    elementRef={{
                      containerRef,
                      event: chartParams?.event?.event,
                    }}
                    position="dynamic"
                    isSingleValueChart={
                      chartSettings.chartType === CHART_TYPES.singleValue
                    }
                  />
                  {dataDb?.length && !isSingleValueNull ? (
                    <Chart
                      isPythonMode={isPythonMode}
                      onDrillPivotTable={onDrillPivotTable}
                      pivotDrillState={pivotDrillState}
                      data={dataDb}
                      isShowFullScreen={Boolean(
                        onMaximize && isShowFullScreen && !disableActions
                      )}
                      isShowFullScreenEnabled
                      onMaximize={
                        disableActions || !onMaximize
                          ? undefined
                          : () => {
                              onMaximize?.(metricItem, param, appFilters);
                            }
                      }
                      chartOptions={
                        chartSettingOptions.customSettings?.chartZoom
                          ?.isZoomEnabled
                          ? {
                              ...chartSettingOptions,
                              customSettings: {
                                ...chartSettingOptions.customSettings,
                                chartZoom: {
                                  ...chartSettingOptions.customSettings
                                    ?.chartZoom,
                                  zoomAxis: isEnableZoom
                                    ? chartSettingOptions.customSettings
                                        ?.chartZoom?.zoomAxis
                                    : 'none',
                                  zoomOnMouseWheel: false,
                                },
                              },
                            }
                          : chartSettingOptions
                      }
                      events={
                        disableActions
                          ? undefined
                          : {
                              click: (
                                params: any,
                                rowFilters: { columnName: string; value: any }[]
                              ) => {
                                if (
                                  metricItem.drillDownSettings?.isEnableGroupBy
                                ) {
                                  const name =
                                    chartSettings.chartType === 'table'
                                      ? rowFilters?.find(
                                          (col) =>
                                            col.columnName ===
                                            dimensions?.[drilledLevel]
                                        )?.value
                                      : '';

                                  onDrillDown(
                                    chartSettings.chartType === 'table'
                                      ? { name }
                                      : params
                                  );
                                }
                              },
                              contextmenu: (params: any) => {
                                handleChartClick(params);
                                setShowChartPopup(true);
                              },
                            }
                      }
                      colors={colors || chartSettings.chartColors}
                      config={{
                        hideBorder: true,
                        chartClickConfig: metricItem.clickActions.chart,
                        onChartReady: () => setLoading(false),
                        opts: { renderer: chartRendererType },
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
            )}
            {downloadMetrics?.find((m) => m.id === metricItem?.id)
              ?.isInProgress ? (
              <Alert text="Download is in progress" variant="primary" />
            ) : null}
            {onMaximize &&
            !disableActions &&
            isShowFullScreen &&
            !(chartSettings.chartType === CHART_TYPES.table) ? (
              <Button
                type="button"
                variant="popover"
                onClick={() => {
                  onMaximize?.(metricItem, param, appFilters);
                }}
                leftIcon={
                  <div className={styles.fullscreenIcon}>
                    <NewTooltip text="Enter FullScreen" position="left">
                      <Icons name="fullscreen" />{' '}
                    </NewTooltip>
                  </div>
                }
              />
            ) : null}
          </>
        ) : (
          <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-2 dbn-p-4">
            <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
              <div className="dbn-w-1/4">
                <SkeletonLoader height="4" />
              </div>
              <div className="dbn-w-1/2">
                <SkeletonLoader height="3" />
              </div>
            </div>
            <SkeletonLoader height="full" />
          </div>
        )}
      </div>
      {Object.keys(appearanceOptions || {})?.length &&
      [BOTTOM_LEFT, BOTTOM_RIGHT].includes(
        appearanceOptions?.appearanceOptionsPosition || ''
      ) ? (
        <div
          className={`dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-4 ${
            appearanceOptions?.appearanceOptionsPosition === BOTTOM_LEFT
              ? 'dbn-justify-start'
              : 'dbn-justify-end'
          }`}
        >
          {appearanceOptions?.cumulativeBar?.isEnabled ? (
            <span className="dbn-flex dbn-gap-1 dbn-items-center">
              <InfoTooltip
                position="top"
                text="It demonstrates the accumulated values, providing insights into the overall trend or pattern in the data"
              />
              <Switch
                enabled={chartSettings.customSettings?.cumulativeBar}
                name="cumulative"
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      cumulativeBar: !prev.customSettings?.cumulativeBar,
                    },
                  }))
                }
                placeholder={
                  appearanceOptions?.cumulativeBar?.label || 'Cumulative'
                }
              />
            </span>
          ) : null}
          {appearanceOptions?.dynamicBehaviour?.isEnabled ? (
            <span className="dbn-flex dbn-gap-1 dbn-items-center">
              <InfoTooltip
                position="top"
                text="It allows you to observe trends, fluctuations, or updates as they occur in a responsive visual representation"
              />
              <Switch
                enabled={chartSettings.customSettings?.showDynamicBehaviour}
                name="dynamic"
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      showDynamicBehaviour:
                        !prev.customSettings?.showDynamicBehaviour,
                    },
                  }))
                }
                placeholder={
                  appearanceOptions?.dynamicBehaviour?.label || 'Dynamic'
                }
              />
            </span>
          ) : null}
          {appearanceOptions?.stackedBars?.isEnabled ? (
            <span className="dbn-flex dbn-gap-1 dbn-items-center">
              <InfoTooltip
                position="top"
                text="It represent the percentage distribution of individual components relative to the whole"
              />
              <Switch
                name="full stacked"
                enabled={chartSettings.customSettings?.showFullStacked}
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    customSettings: {
                      ...prev.customSettings,
                      showFullStacked: !prev.customSettings?.showFullStacked,
                    },
                  }))
                }
                placeholder={
                  appearanceOptions?.stackedBars?.label || '100% stacked bars'
                }
              />
            </span>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
