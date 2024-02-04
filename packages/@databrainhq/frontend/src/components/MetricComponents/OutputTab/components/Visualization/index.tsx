/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-relative-parent-imports */
import { Ui, consts, utils } from '@databrainhq/plugin';
import { useEffect, useMemo, useRef, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import { VisualizationProps } from 'types/metric';
import Loader from 'components/Loader';
import useTheme from 'hooks/useTheme';
import NoDataFound from '../NoDataFound';
import styles from './visualization.module.css';

const Visualization = ({
  data,
  isLoading,
  tableName,
  handleChartRightClick,
  chartClickConfig,
  chartPopupChild,
  remainingMilliseconds,
  seconds,
  headerChild,
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
  moreOptions,
  onDrillLevelClick,
  themeChartColors,
  legendData,
  filters,
  drillType,
  noColsSelected,
  onDrillPivotTable,
  pivotDrillState,
  isPythonMode,
}: VisualizationProps) => {
  const chartRef = useRef<EChartsReact>(null);
  const [isShowFullScreen, setShowFullScreen] = useState(false);
  const isSingleValueNull = useMemo(() => {
    const key = chartSettings.singleValue;
    const isSingleChart =
      chartSettings.chartType === consts.CHART_TYPES.singleValue;
    const isNull = key ? data?.[0]?.[key] === null : true;

    return isSingleChart && isNull;
  }, [chartSettings, data]);

  return (
    <>
      <div className={styles['chartTab-wrapper-head']}>
        <div className="dbn-flex dbn-gap-4 dbn-ml-3 dbn-items-end">
          {headerChild}
          {chartSettings.customSettings?.showSelectLegend ? (
            <Ui.MultiSelectDropdown
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
                    chartSettings?.selectedSeries?.some((val) => val === v)
                  )
                  ?.map((v: string) => ({
                    value: v,
                    label: v,
                  })) || []
              }
              isSearchEnabled
            />
          ) : null}
        </div>
        <div className={styles.chartButtons}>{moreOptions}</div>
      </div>
      {!data?.length && isLoading && (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      )}
      {noColsSelected && !data?.length && !isLoading && (
        <div className={styles.metricChartEmpty}>
          <NoDataFound message="Choose a table to create your metric" />
          <Ui.Text variant="body-text-sm">
            Drag and Drop columns to visualize the chart
          </Ui.Text>
        </div>
      )}
      {!noColsSelected && !data?.length && !isLoading && (
        <div className={styles.metricChartEmpty}>
          <NoDataFound message="No data found!" />
        </div>
      )}
      {!isLoading && isSingleValueNull && (
        <NoDataFound message="No data found! Drag and drop some different value" />
      )}
      {!!data?.length && !isLoading && (
        <div className={styles.metricChart}>
          <div className={styles['chartTab-wrapper']}>
            {data?.length ? (
              <>
                <div
                  className={`${
                    [
                      consts.CHART_TYPES.horizontalStackTable,
                      consts.CHART_TYPES.pivot,
                      consts.CHART_TYPES.table,
                      consts.CHART_TYPES.pivotV2,
                    ].includes(chartSettings.chartType)
                      ? ''
                      : 'dbn-px-6'
                  } ${styles.labels}`}
                >
                  {isEnableGroupBy && !!data.length && (
                    <>
                      <Ui.DrillBreadCrumb
                        dimensions={dimensions}
                        drilledLevel={
                          dimensions.length > drillLevel ? drillLevel : -1
                        }
                        onResetLevel={() => drilldown?.({}, [])}
                        onDrillLevelClick={(index: number) =>
                          onDrillLevelClick(index)
                        }
                        drillType={drillType || ''}
                        drillFilters={filters}
                        isShowBreadCrumb={
                          !!dimensions?.length &&
                          ![
                            consts.CHART_TYPES.horizontalStackTable,
                            consts.CHART_TYPES.pivot,
                            consts.CHART_TYPES.treeMap,
                            consts.CHART_TYPES.sankey,
                            consts.CHART_TYPES.pivotV2,
                          ].includes(chartSettings.chartType) &&
                          dimensions.length > drillLevel
                        }
                      />
                    </>
                  )}
                  <Ui.Chart
                    isPythonMode={isPythonMode}
                    pivotDrillState={pivotDrillState}
                    onDrillPivotTable={onDrillPivotTable}
                    data={data}
                    chartOptions={
                      isEnableGroupBy &&
                      dimensions.length === drillLevel &&
                      data?.length
                        ? {
                            ...chartSettings,
                            chartType: 'table',
                            yAxisList: dimensions?.[0]
                              ? [
                                  dimensions?.[0],
                                  ...(chartSettings.yAxisList || []),
                                ]
                              : chartSettings.yAxisList,
                          }
                        : chartSettings
                    }
                    colors={themeChartColors}
                    filterValues={[]}
                    onMaximize={() => {}}
                    events={{
                      click: (
                        params: any,
                        rowFilters?: { columnName: string; value: any }[]
                      ) => {
                        const name =
                          chartSettings.chartType === 'table'
                            ? rowFilters?.find(
                                (col) =>
                                  col.columnName === dimensions?.[drillLevel]
                              )?.value
                            : '';

                        // handleChartRightClick?.(params);
                        drilldown?.(
                          chartSettings.chartType === 'table'
                            ? { name }
                            : params
                        );
                      },
                      contextmenu: (params: any) => {
                        handleChartRightClick?.(params);
                        setShowChartPopup?.(true);
                      },
                    }}
                    config={{
                      ref: chartRef,
                      chartClickConfig,
                      onColumnSizingChange: (columnSizing: any) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          tableSettings: {
                            ...prev.tableSettings,
                            columnSizing,
                          },
                        })),
                      tableName,
                      onChangePage,
                      isExternalChart,
                      isEnableNextBtn,
                      isEnablePrevBtn,
                      paginationInfo,
                      setChartSettings,
                    }}
                  />
                  {chartPopupChild}
                </div>
                <Ui.FullScreenChart
                  pivotDrillState={pivotDrillState}
                  onDrillPivotTable={onDrillPivotTable}
                  isShow={isShowFullScreen}
                  filterValues={[]}
                  onMaximize={() => {}}
                  onCancel={() => setShowFullScreen(false)}
                  chartOptions={chartSettings}
                  colors={themeChartColors}
                  data={data}
                  events={{
                    click: (params: any) => {
                      handleChartRightClick?.(params);
                      drilldown?.(params);
                    },
                    contextmenu: (params: any) => {
                      handleChartRightClick?.(params);
                      setShowChartPopup?.(true);
                    },
                  }}
                  config={{
                    ref: chartRef,
                    chartClickConfig,
                    onColumnSizingChange: (columnSizing: any) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        tableSettings: {
                          ...prev.tableSettings,
                          columnSizing,
                        },
                      })),
                    tableName,
                    isExternalChart,
                    onChangePage,
                    isEnableNextBtn,
                    isEnablePrevBtn,
                    paginationInfo,
                  }}
                />
              </>
            ) : (
              <NoDataFound
                message="Choose an appropriate chart type and start visulaizing your
              data"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Visualization;
