/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ChartTab } from './components/ChartTab';
import { TableTab } from './components/TableTab';
import styles from './visual.module.css';
import { MetricOutputProps } from '@/types/metricCreate';
import { FloatingDropDown } from '@/components/FloatingDropDown';
import { TimeSeriesType, TimeSeriesGroupType, UseDropProps } from '@/types';
import { Switch } from '@/components/Switch';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Icons } from '@/components/Icons';
import { NewTooltip } from '@/components/InfoTooltip';
import useDrop from '@/hooks/useDrop';
import { DraggableItem } from '@/components/DraggableItem';
import { PopoverMenu } from '@/components/PopoverMenu';
import { aggregateStrings } from '@/consts';
import { getColumnNameKeyString } from '@/helpers';

export const MetricOutput = ({
  data,
  error,
  isLoading,
  previewTableDataList,
  moreTabs,
  chartColors,
  chartSettings,
  setChartSettings,
  isUpdateMetric = false,
  isDisableSqlBtn,
  setShowSqlModal,
  isEnablePivotTable,
  groupbyList,
  hasNumberKeys,
  isEnableGauge,
  outputHeaderProps,
  metrics,
  dimensions,
  onGenerateChart,
  setMetrics,
  setColumn,
  isEnableSingleDimension,
  isEnableSingleMetrics,
  functionOptions,
  configuration,
  dbName,
  pivotDrillState,
}: MetricOutputProps) => {
  const [isShowTable, setShowTable] = useState<boolean>(false);

  const { setDropNodeRef: setDimensionNodeRef, setIsEnableDrop } = useDrop({
    identifier: {
      id: 'Dimensions',
      accepts: ['column', 'metrics', 'dimensions', 'dimension_aggregate'],
    },
    events: {
      onDrop: (event, dropData) => {
        const colData = dropData.active?.data;
        colData.labelType = colData.labelType ?? 'dimensions';

        setColumn((prev) => {
          return prev.findIndex((val) => val.value === colData.value) === -1
            ? [...prev, colData]
            : prev;
        });
        const [parentAlias, columnName, datatype, schema, table] =
          colData?.value?.split('____');
        if (
          configuration.dimensions.findIndex(
            (item) =>
              item.alias === colData.label && item.labelType !== 'metrics'
          ) === -1 &&
          !colData.aggregate
        ) {
          onGenerateChart({
            param: {
              ...configuration,
              dimensions: [
                ...configuration.dimensions,
                {
                  columnName,
                  alias: columnName,
                  dataType: datatype,
                  parentAlias,
                  type: 'default',
                  timeGrain: undefined,
                  helperFunction: undefined,
                  labelType: colData.labelType,
                },
              ],
            },
            metricParams: metrics,
            dimensionParams:
              dimensions.findIndex((val) => val.value === colData.value) === -1
                ? [...dimensions, colData]
                : dimensions,
          });
        } else {
          onGenerateChart({
            param: {
              ...configuration,
            },
            metricParams: metrics,
            dimensionParams:
              dimensions.findIndex((val) => val.value === colData.value) === -1
                ? [...dimensions, colData]
                : dimensions,
          });
        }

        // if (dropData.active?.identifier.type === 'metrics' && !event.shiftKey) {
        //   setMetrics((prev) => {
        //     return prev.filter((val) => val.value !== colData.value);
        //   });
        // }
      },
    },
    modifiers: {
      sorting: {
        isEnabled: true,
        isEnabledAutoSort: true,
        sortingType: 'horizontal',
        list: dimensions,
        setList: setColumn,
      },
    },
  });
  const { setDropNodeRef: setMetricNodeRef } = useDrop({
    identifier: {
      id: 'Metrics',
      accepts: ['column', 'dimensions', 'metrics', 'metric_aggregate'],
    },
    events: {
      onDrop: (event, dropData) => {
        const colData = dropData.active?.data;
        colData.labelType = colData.labelType ?? 'metrics';
        setMetrics((prev) => {
          return prev.findIndex((val) => val.value === colData.value) === -1
            ? [...prev, colData]
            : prev;
        });

        const [parentAlias, columnName, datatype, schema, table] =
          colData?.value?.split('____');

        if (
          configuration.dimensions.findIndex(
            (item) =>
              item.alias === colData.label && item.labelType === 'metrics'
          ) === -1 &&
          !colData.aggregate
        ) {
          onGenerateChart({
            param: {
              ...configuration,
              dimensions: [
                ...configuration.dimensions,
                {
                  columnName,
                  alias: columnName,
                  dataType: datatype,
                  parentAlias,
                  type: 'default',
                  timeGrain: undefined,
                  helperFunction: undefined,
                  labelType: colData.labelType,
                },
              ],
            },
            metricParams:
              metrics.findIndex((val) => val.value === colData.value) === -1
                ? [...metrics, colData]
                : metrics,
            dimensionParams: dimensions,
          });
        } else {
          onGenerateChart({
            param: {
              ...configuration,
            },
            metricParams:
              metrics.findIndex((val) => val.value === colData.value) === -1
                ? [...metrics, colData]
                : metrics,
            dimensionParams: dimensions,
          });
        }
        // if (
        //   dropData.active?.identifier.type === 'dimensions' &&
        //   !event.shiftKey
        // ) {
        //   setColumn((prev) => {
        //     return prev.filter((val) => val.value !== colData.value);
        //   });
        // }
      },
    },
    modifiers: {
      sorting: {
        isEnabled: true,
        isEnabledAutoSort: true,
        sortingType: 'horizontal',
        list: metrics,
        setList: setMetrics,
      },
    },
  });

  // useEffect(() => {
  //   if (dimensions.length >= 1 && isEnableSingleDimension) {
  //     setIsEnableDrop(false);
  //   } else setIsEnableDrop(true);
  // }, [dimensions.length]);

  return (
    <div className={`${styles['main-container']}`}>
      <div className={styles.selection}>
        <div className={styles.selectionContainer}>
          <span className={styles.selectedCol}>
            <Text variant="btn">Dimensions</Text>
          </span>
          <div className={styles.columnContainer} ref={setDimensionNodeRef}>
            {dimensions?.length ? (
              <div className={styles.listContainer}>
                {dimensions?.map((val, index) => {
                  const aggregates = functionOptions(val);
                  const validAggregates = aggregates.filter(
                    (v) => !aggregateStrings.includes(v.value)
                  );
                  const dimensionName =
                    val.labelType === 'dimension_aggregate'
                      ? val.alias
                      : val.label;
                  const isDimensionAggregate =
                    val.labelType === 'dimension_aggregate';
                  return (
                    <DraggableItem
                      modifiers={{
                        highlightDrop: {
                          onDrag: true,
                        },
                      }}
                      identifier={{
                        id: val.value,
                        type: val.labelType,
                      }}
                      data={val}
                      CustomDragPreview={
                        <span className={styles.listVal}>{dimensionName}</span>
                      }
                      renderItem={(
                        setDragNodeRef: React.MutableRefObject<any>
                      ) => {
                        return (
                          <div
                            className={`${styles.listVal} `}
                            data-dbn-sorting-index={index}
                            ref={setDragNodeRef}
                          >
                            {dimensionName}
                            <PopoverMenu
                              buttonContent={
                                <Icons name="caret-down-fill" size="xs" />
                              }
                              position="bottom-start"
                              offset={[0, 5]}
                            >
                              <div className="dbn-p-2">
                                {validAggregates?.map((aggregate) => (
                                  <Button
                                    variant="popover"
                                    className="dbn-justify-start dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1"
                                    onClick={() => {
                                      setColumn((prev) =>
                                        prev.map((option) => {
                                          if (option.value === val.value) {
                                            return {
                                              ...option,
                                              labelType: 'dimension_aggregate',
                                              aggregate: aggregate.value,
                                              alias: `${getColumnNameKeyString(
                                                `${aggregate.value?.toLowerCase()} of`,
                                                dbName || ''
                                              )} ${val.label}`,
                                            };
                                          }
                                          return option;
                                        })
                                      );
                                      const [
                                        parentAlias,
                                        columnName,
                                        datatype,
                                        schema,
                                        table,
                                      ] = val?.value?.split('____');
                                      onGenerateChart({
                                        param: {
                                          ...configuration,
                                          dimensions:
                                            configuration.dimensions.map(
                                              (dim) =>
                                                dim.alias ===
                                                (isDimensionAggregate
                                                  ? val.alias
                                                  : val.label)
                                                  ? {
                                                      columnName,
                                                      alias:
                                                        `${getColumnNameKeyString(
                                                          `${aggregate.value?.toLowerCase()} of`,
                                                          dbName || ''
                                                        )} ${val.label}` ||
                                                        columnName,
                                                      dataType: datatype,
                                                      parentAlias,
                                                      type: 'default',
                                                      timeGrain: undefined,
                                                      helperFunction:
                                                        aggregate.value,
                                                      labelType:
                                                        'dimension_aggregate',
                                                    }
                                                  : dim
                                            ),
                                        },
                                        metricParams: metrics,
                                        dimensionParams: dimensions.map(
                                          (option) => {
                                            if (option.value === val.value) {
                                              return {
                                                ...option,
                                                labelType:
                                                  'dimension_aggregate',
                                                aggregate: aggregate.value,
                                                alias: `${getColumnNameKeyString(
                                                  `${aggregate.value?.toLowerCase()} of`,
                                                  dbName || ''
                                                )} ${val.label}`,
                                              };
                                            }
                                            return option;
                                          }
                                        ),
                                      });
                                    }}
                                  >
                                    <span>{aggregate.label}</span>
                                  </Button>
                                ))}
                              </div>
                            </PopoverMenu>
                            <span
                              className={styles.removeColumn}
                              role="button"
                              tabIndex={0}
                              onKeyDown={() => {}}
                              onClick={() => {
                                setColumn((prev) =>
                                  prev.filter(
                                    (option) => option.value !== val.value
                                  )
                                );
                                onGenerateChart({
                                  param: {
                                    ...configuration,
                                    dimensions: configuration.dimensions.filter(
                                      (dim) =>
                                        dim.alias !==
                                        (isDimensionAggregate
                                          ? val.alias
                                          : val.label)
                                    ),
                                  },
                                  metricParams: metrics,
                                  dimensionParams: dimensions.filter(
                                    (opt) => opt.value !== val.value
                                  ),
                                });
                              }}
                            >
                              <Icons name="cross" size="xxs" />
                            </span>
                          </div>
                        );
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <Text variant="body-text-sm" color="secondary">
                Drag and Drop your Rows here
              </Text>
            )}
          </div>
        </div>
        <div className={styles.selectionContainer}>
          <span className={styles.selectedCol}>
            <Text variant="btn">Metrics</Text>
          </span>
          <div className={styles.columnContainer} ref={setMetricNodeRef}>
            {metrics?.length ? (
              <div className={styles.listContainer}>
                {metrics?.map((val, index) => {
                  const aggregates = functionOptions(val);
                  const validAggregates = aggregates.filter((v) =>
                    aggregateStrings.includes(v.value)
                  );
                  const metricName =
                    val.labelType === 'metric_aggregate'
                      ? val.alias
                      : val.label;
                  const isMetricAggregate =
                    val.labelType === 'metric_aggregate';
                  return (
                    <DraggableItem
                      modifiers={{
                        highlightDrop: {
                          onDrag: true,
                        },
                      }}
                      identifier={{
                        id: val.value,
                        type: val.labelType,
                      }}
                      data={val}
                      CustomDragPreview={
                        <span className={styles.listVal}>{metricName}</span>
                      }
                      renderItem={(
                        setDragNodeRef: React.MutableRefObject<any>
                      ) => {
                        return (
                          <div
                            className={styles.listVal}
                            data-dbn-sorting-index={index}
                            ref={setDragNodeRef}
                          >
                            {metricName}
                            <PopoverMenu
                              buttonContent={
                                <Icons name="caret-down-fill" size="xs" />
                              }
                              position="bottom-start"
                              offset={[0, 5]}
                            >
                              <div className="dbn-p-2">
                                {validAggregates?.map((aggregate) => (
                                  <Button
                                    variant="popover"
                                    className="dbn-justify-start dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1"
                                    onClick={() => {
                                      setMetrics((prev) =>
                                        prev.map((option) => {
                                          if (option.value === val.value) {
                                            return {
                                              value: val.value,
                                              label: val.label,
                                              labelType: 'metric_aggregate',
                                              aggregate: aggregate.value,
                                              alias: `${getColumnNameKeyString(
                                                `${aggregate.value?.toLowerCase()} of`,
                                                dbName || ''
                                              )} ${val.label}`,
                                            };
                                          }
                                          return option;
                                        })
                                      );
                                      const [
                                        parentAlias,
                                        columnName,
                                        datatype,
                                        schema,
                                        table,
                                      ] = val?.value?.split('____');
                                      onGenerateChart({
                                        param: {
                                          ...configuration,
                                          dimensions:
                                            configuration.dimensions.filter(
                                              (dim) =>
                                                dim.alias !==
                                                (isMetricAggregate
                                                  ? val.alias
                                                  : val.label)
                                            ),
                                          aggregates: [
                                            ...configuration.aggregates,
                                            {
                                              columnName,
                                              alias:
                                                `${getColumnNameKeyString(
                                                  `${aggregate.value?.toLowerCase()} of`,
                                                  dbName || ''
                                                )} ${val.label}` || columnName,
                                              dataType: datatype,
                                              parentAlias,
                                              type: 'default',
                                              method: aggregate.value,
                                            },
                                          ],
                                        },
                                        metricParams: metrics.map((v, i) =>
                                          index === i
                                            ? {
                                                ...v,
                                                labelType: 'metric_aggregate',
                                                aggregate: aggregate.value,
                                                alias: `${getColumnNameKeyString(
                                                  `${aggregate.value?.toLowerCase()} of`,
                                                  dbName || ''
                                                )} ${val.label}`,
                                              }
                                            : v
                                        ),
                                        dimensionParams: dimensions,
                                      });
                                    }}
                                  >
                                    <span>{aggregate.label}</span>
                                  </Button>
                                ))}
                              </div>
                            </PopoverMenu>

                            <span
                              className={styles.removeColumn}
                              role="button"
                              tabIndex={0}
                              onKeyDown={() => {}}
                              onClick={() => {
                                setMetrics((prev) =>
                                  prev.filter(
                                    (option) => option.value !== val.value
                                  )
                                );

                                onGenerateChart({
                                  param: isMetricAggregate
                                    ? {
                                        ...configuration,
                                        aggregates:
                                          configuration.aggregates.filter(
                                            (dim) => dim.alias !== val.alias
                                          ),
                                      }
                                    : {
                                        ...configuration,
                                        dimensions:
                                          configuration.dimensions.filter(
                                            (dim) => dim.alias !== val.label
                                          ),
                                      },
                                  metricParams: metrics.filter(
                                    (opt) => opt.value !== val.value
                                  ),
                                  dimensionParams: dimensions,
                                });
                              }}
                            >
                              <Icons name="cross" size="xxs" />
                            </span>
                          </div>
                        );
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <Text variant="body-text-sm" color="secondary">
                Drag and Drop your Columns here
              </Text>
            )}
          </div>
        </div>
      </div>
      <div className={`${styles.wrapper}`}>
        <div className={styles.wrapperHead}>
          <div className="dbn-flex dbn-gap-4 dbn-justify-center">
            <Switch
              enabled={isShowTable}
              placeholder="Table View"
              onChange={() => setShowTable(!isShowTable)}
            />
          </div>
          <div className={styles.features}>
            <Button
              variant="popover"
              leftIcon={
                <NewTooltip text="Chart Type">
                  <Icons name="bar-chart-2" size="lg" />
                </NewTooltip>
              }
              onClick={() => outputHeaderProps.setShowChartType(true)}
            />
            <Button
              variant="popover"
              leftIcon={
                <NewTooltip text="Filters">
                  <span className={!data ? 'hover:dbn-cursor-not-allowed' : ''}>
                    <Icons name="funnel" size="lg" />
                  </span>
                </NewTooltip>
              }
              onClick={() => outputHeaderProps.setShowFilters(true)}
              isDisabled={!data}
            />
            <Button
              variant="popover"
              leftIcon={
                <NewTooltip text="Sort">
                  <span className={!data ? 'hover:dbn-cursor-not-allowed' : ''}>
                    <Icons name="funnel-simple" size="lg" />
                  </span>
                </NewTooltip>
              }
              onClick={() => outputHeaderProps.setShowSortPanel(true)}
              isDisabled={!data}
            />
            <Button
              variant="popover"
              leftIcon={
                <NewTooltip text="Chart Appearance" position="left">
                  <span className={!data ? 'hover:dbn-cursor-not-allowed' : ''}>
                    <Icons name="color-palette" size="lg" />
                  </span>
                </NewTooltip>
              }
              onClick={() =>
                outputHeaderProps.setShowChartCustomProperties(true)
              }
              isDisabled={!data}
            />
          </div>
        </div>
        {isShowTable ? (
          <div className={styles.tableTab}>
            <TableTab
              outpuTableData={data}
              isOutputLoading={isLoading}
              outputError={error}
              isUpdateMetric={isUpdateMetric}
              isDisableSqlBtn={isDisableSqlBtn}
              setShowSqlModal={setShowSqlModal}
            />
          </div>
        ) : (
          <div className={styles.visualization}>
            <ChartTab
              pivotDrillState={pivotDrillState}
              chartSettings={chartSettings}
              setChartSettings={setChartSettings}
              data={data}
              error={error}
              isLoading={isLoading}
              chartColors={chartColors || chartSettings?.chartColors}
              isEnablePivotTable={isEnablePivotTable}
              groupbyList={groupbyList}
              hasNumberKeys={hasNumberKeys}
              isEnableGauge={isEnableGauge}
              headerChild={
                chartSettings.timeSeriesSettings?.groupBySettings.isDynamic ? (
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
                    onChange={(value) => {
                      const defaultTs = {
                        groupBySettings: {
                          isDynamic: false,
                          options: [],
                          value: 'monthly' as TimeSeriesGroupType,
                        },
                        seriesType:
                          chartSettings.yAxisList?.map((column) => ({
                            column,
                            type: 'bar' as TimeSeriesType,
                          })) || [],
                      };
                      setChartSettings((prev) => ({
                        ...prev,
                        timeSeriesSettings: {
                          ...(prev.timeSeriesSettings || defaultTs),
                          groupBySettings: {
                            ...(prev.timeSeriesSettings?.groupBySettings ||
                              defaultTs.groupBySettings),
                            value: value.value,
                            fillXAxis: false,
                          },
                        },
                      }));
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
                    label="group"
                  />
                ) : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
