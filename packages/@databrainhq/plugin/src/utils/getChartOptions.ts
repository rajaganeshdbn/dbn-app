/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-namespace */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { graphic } from 'echarts';
import {
  GetChartAttributesParams,
  GetDatasetsParams,
  GetSeriesDataParams,
  getDatasets,
  getFunnelData,
  getLabels,
  getSeriesData,
  getSingleValueData,
  getXAxisData,
} from './getChartAttributes';
import { getNoAxisChartOptions } from './getNoAxisChartOptions';
import { CHART_TYPES, DEFAULT_CHART_SETTINGS, STACK_AXIS } from '@/consts';

import {
  ChartSettingsType,
  TimeSeriesGroupType,
  TimeSeriesType,
  // TimeSeriesGroupType,
  // TimeSeriesType,
} from '@/types';
import { numberFormatter } from '@/helpers/numberFormatter';
import { tooltipFormatter } from '@/helpers/tooltipFormatter';
import { getComboRangeLabel } from '@/helpers/getComboRangeLabel';
import { generateColorPalette } from '@/helpers/generateColorPalette';
import { getSeriesOption } from '@/helpers/timeseriesOption';
import { getTimeSeriesData, isTimeSeriesDataValid } from '@/helpers';

export const truncateText = (label: string, maxLength: number) => {
  if (label?.toString()?.length > maxLength) {
    return `${label.toString().slice(0, maxLength)}...`;
  }
  return label;
};

export const addPrefixAndSuffix = (
  val: any,
  prefix: any = '',
  suffix: any = ''
) => {
  return `${prefix}${val}${suffix}`;
};

const dataZoomFormatter = (chartZoom: any) => {
  return [
    {
      type: 'inside',
      xAxisIndex:
        chartZoom?.zoomAxis === 'x' || chartZoom?.zoomAxis === 'xy'
          ? [0]
          : 'none',
      yAxisIndex:
        chartZoom?.zoomAxis === 'y' || chartZoom?.zoomAxis === 'xy'
          ? [0]
          : 'none',
      start: 0,
      disabled: !chartZoom?.isZoomEnabled,
      zoomOnMouseWheel: chartZoom?.zoomOnMouseWheel || 'ctrl',
    },
  ];
};

export const findLegendPosition = (val: string | undefined) => {
  switch (val) {
    case 'top-left':
      return {
        top: '0',
        left: '0',
      };
    case 'top-center':
      return {
        top: '0',
        left: 'center',
      };
    case 'top-right':
      return {
        top: '0',
        right: '0',
      };
    case 'left-center':
      return {
        top: '50%',
        left: '0',
      };
    case 'right-center':
      return {
        top: '50%',
        right: '0',
      };
    case 'bottom-left':
      return {
        bottom: '0',
        left: '0',
      };
    case 'bottom-center':
      return {
        bottom: '0',
        left: 'center',
      };
    case 'bottom-right':
      return {
        bottom: '0',
        right: '0',
      };
    default:
      return {
        top: '0',
        left: '0',
      };
  }
};
export const validateColor = (color: any) => {
  const colorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  return colorRegex.test(color);
};

export type GetChartOptionsParams = {
  chartOptions: ChartSettingsType;
  data: Record<string, any>[];
  colors?: string[];
  geoJsonData?: any;
  isPythonMode?: boolean;
};
export const getLegendData = ({
  chartOptions,
  data,
}: {
  chartOptions: ChartSettingsType;
  data: Record<string, any>[];
}) => {
  const datasetsParams: GetDatasetsParams = {
    data,
    yAxisList: chartOptions.yAxisList,
    xAxis: chartOptions.xAxis,
    chartType: chartOptions.chartType,
    isGroupXAxis: !!chartOptions?.isGroupXAxis,
    isDynamicXaxis: !!chartOptions?.dynamicXAxis?.isEnabled,
    isCumulativeBar: chartOptions.customSettings?.cumulativeBar || false,
    seriesType: chartOptions.timeSeriesSettings?.seriesType?.[0]?.type || 'bar',
  };
  const seriesDataParams: GetSeriesDataParams = {
    data,
    xAxis: chartOptions.xAxis,
    yAxisList: chartOptions.yAxisList,
    isCumulativeBar: chartOptions.customSettings?.cumulativeBar || false,
    chartType: chartOptions.chartType,
    seriesType: chartOptions.timeSeriesSettings?.seriesType?.[0]?.type || 'bar',
    fillXAxis:
      chartOptions.timeSeriesSettings?.groupBySettings.fillXAxis || false,
    selectedFormat:
      chartOptions.timeSeriesSettings?.groupBySettings?.value.split('____')
        .length
        ? chartOptions.timeSeriesSettings?.groupBySettings?.value
            .split('____')[0]
            .toLowerCase()
        : chartOptions.timeSeriesSettings?.groupBySettings?.value.toLowerCase() ||
          'monthly',
    isTimeSeries: false,
    seriesField: chartOptions.seriesField,
  };
  const datasets = getDatasets(datasetsParams);
  switch (chartOptions.chartType) {
    case CHART_TYPES.line:
      return chartOptions.isMultiDimension &&
        chartOptions.seriesField !== 'ungrouped'
        ? getSeriesData(seriesDataParams)?.map(
            (d: any) => `${d.name}` || 'line'
          )
        : datasets?.map((val: { label: any }) => {
            return val.label;
          });

    case CHART_TYPES.bar:
      return chartOptions.isMultiDimension &&
        chartOptions.seriesField !== 'ungrouped'
        ? getSeriesData(seriesDataParams)?.map(
            (d: any) => `${d.name}` || 'series-bar'
          )
        : datasets?.map((val: { label: any }) => {
            return val.label;
          });

    case CHART_TYPES.stack:
      return chartOptions.isMultiDimension &&
        chartOptions.seriesField !== 'ungrouped'
        ? getSeriesData(seriesDataParams)?.map(
            (d: any) => `${d.name}` || 'series-stack'
          )
        : datasets?.map((val: { label: any }) => {
            return chartOptions?.customSettings?.showFullStacked
              ? `percentage of ${val.label}`
              : val.label;
          });
    case CHART_TYPES.area:
    case CHART_TYPES.stackedArea:
    case CHART_TYPES.boxplot:
    case CHART_TYPES.bubble:
    case CHART_TYPES.combo:
    case CHART_TYPES.row:
    case CHART_TYPES.histogram:
    case CHART_TYPES.horizontalStack:
    case CHART_TYPES.stepped:
    case CHART_TYPES.scatter:
      return datasets?.map((val: { label: any }) => {
        return val.label;
      });
    case CHART_TYPES.timeSeries:
      return chartOptions.isMultiDimension &&
        chartOptions.seriesField !== 'ungrouped'
        ? getSeriesData(seriesDataParams)?.map(
            (d: any) => `${d.name}` || 'series-bar'
          )
        : chartOptions.yAxisList?.map((val) => {
            return chartOptions?.customSettings?.showFullStacked
              ? `percentage of ${val}`
              : val;
          });
    default:
      return [];
  }
};
export const getChartOptions = ({
  chartOptions,
  data = [],
  colors,
  isPythonMode,
  geoJsonData,
}: GetChartOptionsParams): Record<string, any> => {
  const numberOfRecords = data?.length;
  const colorPalette =
    numberOfRecords > (colors?.length || 0)
      ? generateColorPalette(colors || [], numberOfRecords)
      : colors;
  const isTimeSeries =
    isPythonMode && chartOptions?.chartType === CHART_TYPES.timeSeries
      ? isTimeSeriesDataValid({
          data,
          timeStampKey: chartOptions.xAxis || '',
        })
      : false;
  const legendPosition = findLegendPosition(
    chartOptions.legendSettings?.fixedPosition
  );
  const titlePosition = findLegendPosition(
    chartOptions.customSettings?.titlePosition
  );
  const gradientArr =
    chartOptions.customSettings?.gradients?.map((val) => {
      const colorStops = [
        {
          offset: val.offset1 > 1 ? val.offset1 / 100 : val.offset1,
          color: val.startColor,
        },
        {
          offset: val.offset2 > 1 ? val.offset2 / 100 : val.offset2,
          color: val.endColor,
        },
      ];
      switch (val.direction) {
        case 'left':
          return new graphic.LinearGradient(1, 0, 0, 0, colorStops);
        case 'right':
          return new graphic.LinearGradient(0, 0, 1, 0, colorStops);
        case 'top':
          return new graphic.LinearGradient(0, 1, 0, 0, colorStops);
        case 'bottom':
          return new graphic.LinearGradient(0, 0, 0, 1, colorStops);
        default:
          return new graphic.LinearGradient(0, 0, 1, 0, colorStops);
      }
    }) || [];
  let barGradient: any = '';
  if (
    chartOptions.customSettings?.isShowBarGradient &&
    chartOptions.customSettings.barGradient?.offset1 !== undefined &&
    chartOptions.customSettings.barGradient?.offset2 !== undefined &&
    validateColor(chartOptions.customSettings.barGradient.startColor) &&
    validateColor(chartOptions.customSettings.barGradient.endColor)
  ) {
    const colorStops = [
      {
        offset:
          chartOptions.customSettings.barGradient?.offset1 > 1
            ? chartOptions.customSettings?.barGradient.offset1 / 100
            : chartOptions.customSettings.barGradient?.offset1,
        color: chartOptions.customSettings.barGradient.startColor || '#FF0000',
      },
      {
        offset:
          chartOptions.customSettings.barGradient?.offset2 > 1
            ? chartOptions.customSettings?.barGradient.offset2 / 100
            : chartOptions.customSettings.barGradient?.offset2,
        color: chartOptions.customSettings.barGradient.endColor || '#000000',
      },
    ];
    switch (chartOptions.customSettings.barGradient.direction) {
      case 'left':
        barGradient = new graphic.LinearGradient(1, 0, 0, 0, colorStops);
        break;
      case 'right':
        barGradient = new graphic.LinearGradient(0, 0, 1, 0, colorStops);
        break;
      case 'top':
        barGradient = new graphic.LinearGradient(0, 1, 0, 0, colorStops);
        break;
      case 'bottom':
        barGradient = new graphic.LinearGradient(0, 0, 0, 1, colorStops);
        break;
      default:
        barGradient = new graphic.LinearGradient(0, 0, 1, 0, colorStops);
    }
  }
  let backgroundGradient: any = '';
  if (
    chartOptions.customSettings?.enableBackgroundGradient &&
    chartOptions.customSettings.backgroundGradient?.offset1 !== undefined &&
    chartOptions.customSettings.backgroundGradient?.offset2 !== undefined &&
    validateColor(chartOptions.customSettings.backgroundGradient.startColor) &&
    validateColor(chartOptions.customSettings.backgroundGradient.endColor)
  ) {
    const colorStops = [
      {
        offset:
          chartOptions.customSettings.backgroundGradient?.offset1 > 1
            ? chartOptions.customSettings?.backgroundGradient.offset1 / 100
            : chartOptions.customSettings.backgroundGradient?.offset1,
        color:
          chartOptions.customSettings.backgroundGradient.startColor ||
          '#FF0000',
      },
      {
        offset:
          chartOptions.customSettings.backgroundGradient?.offset2 > 1
            ? chartOptions.customSettings?.backgroundGradient.offset2 / 100
            : chartOptions.customSettings.backgroundGradient?.offset2,
        color:
          chartOptions.customSettings.backgroundGradient.endColor || '#000000',
      },
    ];
    switch (chartOptions.customSettings.backgroundGradient.direction) {
      case 'left':
        backgroundGradient = new graphic.LinearGradient(1, 0, 0, 0, colorStops);
        break;
      case 'right':
        backgroundGradient = new graphic.LinearGradient(0, 0, 1, 0, colorStops);
        break;
      case 'top':
        backgroundGradient = new graphic.LinearGradient(0, 1, 0, 0, colorStops);
        break;
      case 'bottom':
        backgroundGradient = new graphic.LinearGradient(0, 0, 0, 1, colorStops);
        break;
      default:
        backgroundGradient = new graphic.LinearGradient(0, 0, 1, 0, colorStops);
    }
  }

  const getChartAttributesArgs: GetChartAttributesParams = {
    data,
    measure: chartOptions.measure,
    step: chartOptions.step,
    xAxis: chartOptions.xAxis,
    yAxisList: chartOptions.yAxisList,
    singleValue: chartOptions.singleValue,
    // sankeyValues: chartOptions.sankeyValues,
    seriesField: chartOptions.seriesField,
    seriesType: chartOptions.timeSeriesSettings?.seriesType?.[0]?.type || 'bar',
    isTimeSeries,
    fillXAxis:
      chartOptions.timeSeriesSettings?.groupBySettings.fillXAxis || false,
    selectedFormat:
      chartOptions.timeSeriesSettings?.groupBySettings?.value.split('____')
        .length
        ? chartOptions.timeSeriesSettings?.groupBySettings?.value
            .split('____')[0]
            .toLowerCase()
        : chartOptions.timeSeriesSettings?.groupBySettings?.value.toLowerCase() ||
          'monthly',
    isDynamicXaxis: !!chartOptions?.dynamicXAxis?.isEnabled,
    isCumulativeBar: chartOptions.customSettings?.cumulativeBar || false,
    chartType: chartOptions.chartType,
    isGroupXAxis: !!chartOptions?.isGroupXAxis,
  };
  const filteredArray = chartOptions.customSettings?.showSelectLegend
    ? getSeriesData({ ...getChartAttributesArgs }).filter((item: any) =>
        chartOptions?.selectedSeries?.includes(item.name)
      )
    : [];
  const margins = {
    ...DEFAULT_CHART_SETTINGS.margins,
    ...chartOptions.margins,
  };
  const labelSettings = {
    ...DEFAULT_CHART_SETTINGS.labelSettings,
    ...chartOptions.labelSettings,
  };
  const legendSettings = {
    ...DEFAULT_CHART_SETTINGS.legendSettings,
    ...chartOptions.legendSettings,
  };
  const customSettings = {
    ...DEFAULT_CHART_SETTINGS.customSettings,
    ...chartOptions.customSettings,
  };
  const axisSettings = {
    ...DEFAULT_CHART_SETTINGS.axisSettings,
    ...chartOptions.axisSettings,
  };
  const backGroundColor = {
    ...DEFAULT_CHART_SETTINGS.backGroundColor,
    ...chartOptions.backGroundColor,
  };
  const timeSeriesSettings = {
    ...DEFAULT_CHART_SETTINGS.timeSeriesSettings,
    seriesType:
      chartOptions.yAxisList?.map((column) => ({ column, type: 'bar' })) || [],
    ...chartOptions.timeSeriesSettings,
  };

  const option = {
    ...(colors?.length || gradientArr.length
      ? { color: [...(gradientArr || []), ...(colorPalette || [])] }
      : {}),
  };
  const customData = (() => {
    const datasets = getDatasets({ ...getChartAttributesArgs });
    if (!datasets) return;
    if (!customSettings.showFullStacked) return;
    const percentages: any = {};
    datasets.forEach((dataset: any) => {
      const labelPercentages = dataset?.data?.map((value: any, index: any) => {
        const total = datasets.reduce((acc: any, currDataset: any) => {
          return acc + currDataset.data[index];
        }, 0);
        return ((value / total) * 100).toFixed(2);
      });
      percentages[dataset.label] = labelPercentages;
    });

    return percentages;
  })();
  const chartZoom = customSettings?.chartZoom;
  const isNoAxisChart = [
    CHART_TYPES.pie,
    CHART_TYPES.doughnut,
    CHART_TYPES.rose,
    CHART_TYPES.funnel,
    CHART_TYPES.singleValue,
    CHART_TYPES.table,
    CHART_TYPES.pivot,
    CHART_TYPES.pivotV2,
    CHART_TYPES.horizontalStackTable,
    CHART_TYPES.geoBarMap,
    CHART_TYPES.geoMap,
    CHART_TYPES.geoScatterMap,
    CHART_TYPES.sankey,
    CHART_TYPES.gauge,
    CHART_TYPES.worldMap,
    CHART_TYPES.treeMap,
  ].includes(chartOptions.chartType);
  const defaultOptions = {
    title: chartOptions.customSettings?.enableTitleDesc
      ? {
          text: chartOptions.customSettings?.chartTitle,
          subtext: chartOptions.customSettings?.chartDesc,
          ...titlePosition,
        }
      : {},
    grid: {
      left: `${margins.marginLeft}%`,
      bottom: `${margins.marginBottom}%`,
      top: `${margins.marginTop}%`,
      right: `${margins.marginRight}%`,
      containLabel: true,
    },
    backgroundColor: chartOptions.customSettings?.enableBackgroundGradient
      ? backgroundGradient
      : '',
    dataZoom: dataZoomFormatter(chartZoom),
  };

  const getLabelForValue = (value: any) => {
    const matchingRange =
      chartOptions?.customSettings?.YaxislabelFormatters?.find((range) => {
        return value >= range.lowerLimit && value <= range.upperLimit;
      });
    const isUpperLimit = matchingRange && value === matchingRange.upperLimit;
    return isUpperLimit && matchingRange
      ? `${matchingRange.label}\n(${matchingRange.lowerLimit}-${matchingRange.upperLimit})`
      : matchingRange
      ? ''
      : value;
  };

  if (isNoAxisChart) {
    const datasets = getDatasets({ ...getChartAttributesArgs });
    const funnelData = getFunnelData({ ...getChartAttributesArgs });
    const labels = getLabels({ ...getChartAttributesArgs });
    const singleValueData = getSingleValueData({ ...getChartAttributesArgs });
    const noAxisOptions = getNoAxisChartOptions({
      chartOptions,
      data,
      colors: colorPalette,
      datasets,
      funnelData,
      labels,
      singleValueData,
      geoJsonData,
      mapColors: colors,
    });
    Object.assign(option, {
      ...option,
      ...noAxisOptions,
    });
  } else {
    switch (chartOptions.chartType) {
      case CHART_TYPES.line: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            width: '200px',
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'line',
              lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid',
              },
            },
            className: `getChartOptions-tooltip`,
            enterable: true,
            valueFormatter: (value: any) => {
              const val = numberFormatter(
                value,
                customSettings.numberFormatter
              );
              return addPrefixAndSuffix(
                val,
                customSettings.labelPrefix,
                customSettings.labelSuffix
              );
            },
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            boundaryGap: false,
            data:
              chartOptions.isMultiDimension &&
              chartOptions.seriesField !== 'ungrouped'
                ? getXAxisData({ ...getChartAttributesArgs }) || []
                : getLabels({ ...getChartAttributesArgs }) || [],
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                const val = numberFormatter(
                  value,
                  customSettings.numberFormatter
                );
                return addPrefixAndSuffix(
                  val,
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },

            data: getLegendData({
              chartOptions,
              data,
            }),
          },
          series:
            chartOptions.isMultiDimension &&
            chartOptions.seriesField !== 'ungrouped'
              ? filteredArray?.length
                ? filteredArray.map((i: any) => ({
                    data: i.data,
                    type: 'line',
                    showSymbol:
                      !chartOptions.customSettings?.showDynamicBehaviour,
                    name: i.name || 'line',
                    label: {
                      show: labelSettings.show,
                      position: labelSettings.position,
                      formatter(d: { data: any }) {
                        const val = numberFormatter(
                          d.data,
                          customSettings.numberFormatter
                        );
                        return addPrefixAndSuffix(
                          val,
                          customSettings.labelPrefix,
                          customSettings.labelSuffix
                        );
                      },
                    },
                    emphasis: {
                      focus: 'series',
                    },
                  }))
                : getSeriesData({ ...getChartAttributesArgs })?.map(
                    (i: any) => ({
                      data: i.data,
                      type: 'line',
                      showSymbol:
                        !chartOptions.customSettings?.showDynamicBehaviour,
                      connectNulls: false,
                      name: i.name || 'line',
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        formatter(d: { data: any }) {
                          const val = numberFormatter(
                            d.data,
                            customSettings.numberFormatter
                          );
                          return addPrefixAndSuffix(
                            val,
                            customSettings.labelPrefix,
                            customSettings.labelSuffix
                          );
                        },
                      },
                      emphasis: {
                        focus: 'series',
                      },
                    })
                  )
              : getDatasets({ ...getChartAttributesArgs })?.map(
                  (item: { data: any; label: any }) => {
                    return {
                      data: item.data,
                      type: 'line',
                      showSymbol:
                        !chartOptions.customSettings?.showDynamicBehaviour,
                      name: item.label,
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        formatter(d: { data: any }) {
                          const val = numberFormatter(
                            d.data,
                            customSettings.numberFormatter
                          );
                          return addPrefixAndSuffix(
                            val,
                            customSettings.labelPrefix,
                            customSettings.labelSuffix
                          );
                        },
                      },
                      emphasis: {
                        focus: 'series',
                      },
                    };
                  }
                ),
        });
        break;
      }
      case CHART_TYPES.bar: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'shadow',
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data:
              chartOptions.isMultiDimension &&
              chartOptions.seriesField !== 'ungrouped'
                ? getXAxisData({ ...getChartAttributesArgs }) || []
                : getLabels({ ...getChartAttributesArgs }) || [],

            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              interval: 0,
              rotate: customSettings.customRotation || customSettings.xRotation,
              hideOverlap: true,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          legend: {
            data: getLegendData({
              chartOptions,
              data,
            }),
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          series:
            chartOptions.isMultiDimension &&
            chartOptions.seriesField !== 'ungrouped'
              ? filteredArray?.length
                ? filteredArray.map((i: any) => ({
                    data: i.data,
                    type: 'bar',
                    showSymbol:
                      !chartOptions.customSettings?.showDynamicBehaviour,
                    name: i.name || 'line',
                    label: {
                      show: labelSettings.show,
                      position: labelSettings.position,
                      formatter(d: { data: any }) {
                        const val = numberFormatter(
                          d.data,
                          customSettings.numberFormatter
                        );
                        return addPrefixAndSuffix(
                          val,
                          customSettings.labelPrefix,
                          customSettings.labelSuffix
                        );
                      },
                    },
                    itemStyle: {
                      ...(customSettings.coloredBars
                        ? {
                            color: (params: any) => {
                              return colorPalette?.[params.dataIndex];
                            },
                          }
                        : {}),
                    },
                    emphasis: {
                      focus: 'series',
                    },
                  }))
                : getSeriesData({ ...getChartAttributesArgs })?.map(
                    (i: any) => ({
                      data: i.data,
                      type: 'bar',
                      name: i.name || '',
                      barWidth: `${customSettings.barWidth || 0}%`,
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        formatter(d: { data: any }) {
                          return addPrefixAndSuffix(
                            numberFormatter(
                              d.data,
                              customSettings.numberFormatter
                            ),
                            customSettings.labelPrefix,
                            customSettings.labelSuffix
                          );
                        },
                      },
                      showBackground: backGroundColor.show,
                      backgroundStyle: {
                        color: chartOptions.customSettings?.isShowBarGradient
                          ? barGradient
                          : 'rgba(180, 180, 180, 0.2)',
                      },
                      itemStyle: {
                        borderRadius: customSettings.barRadius,
                        ...(customSettings.coloredBars
                          ? {
                              color: (params: any) => {
                                return colorPalette?.[params.dataIndex];
                              },
                            }
                          : {}),
                      },
                    })
                  )
              : getDatasets({ ...getChartAttributesArgs })?.map(
                  (item: { data: any; label: any }) => {
                    return {
                      data: item.data,
                      type: 'bar',
                      name: item.label,
                      barWidth: `${customSettings.barWidth || 0}%`,
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        formatter(d: { data: any }) {
                          return addPrefixAndSuffix(
                            numberFormatter(
                              d.data,
                              customSettings.numberFormatter
                            ),
                            customSettings.labelPrefix,
                            customSettings.labelSuffix
                          );
                        },
                      },
                      showBackground: backGroundColor.show,
                      backgroundStyle: {
                        color: chartOptions.customSettings?.isShowBarGradient
                          ? barGradient
                          : 'rgba(180, 180, 180, 0.2)',
                      },
                      itemStyle: {
                        borderRadius: customSettings.barRadius,
                        ...(customSettings.coloredBars
                          ? {
                              color: (params: any) => {
                                return colors?.[
                                  params.dataIndex % colors.length
                                ];
                              },
                            }
                          : {}),
                      },
                    };
                  }
                ),
        });
        break;
      }
      case CHART_TYPES.stack: {
        let seriesSummation: any;
        let resultArray: any;
        const isMultiSeries =
          chartOptions.isMultiDimension &&
          chartOptions.seriesField !== 'ungrouped';
        const hasPercentSymbol =
          !isMultiSeries && chartOptions?.customSettings?.showFullStacked;
        if (
          chartOptions.isMultiDimension &&
          chartOptions.seriesField !== 'ungrouped'
        ) {
          if (filteredArray?.length) {
            const seriesData = getSeriesData({ ...getChartAttributesArgs });
            seriesSummation = seriesData.reduce((acc: any, obj: any) => {
              obj.data.forEach((value: any, i: any) => {
                acc[i] += value;
              });
              return acc;
            }, Array(seriesData[0].data.length).fill(0));
            const resultObject = seriesData.reduce(
              (result: any, { name, data: d }: any) => {
                d?.forEach((value: number, index: number) => {
                  if (value !== 0) {
                    result[index] = (result[index] || []).concat(name);
                  }
                });
                return result;
              },
              {}
            );
            resultArray = Object.values(resultObject).map(
              (namesArray: any) => namesArray?.slice(-1)[0]
            );
          } else {
            const seriesData = getSeriesData({ ...getChartAttributesArgs });
            seriesSummation = seriesData.reduce((acc: any, obj: any) => {
              obj.data.forEach((value: any, i: any) => {
                acc[i] += value;
              });
              return acc;
            }, Array(seriesData[0].data.length).fill(0));
            const resultObject = seriesData.reduce(
              (result: any, { name, data: d }: any) => {
                d?.forEach((value: number, index: number) => {
                  if (value !== 0) {
                    result[index] = (result[index] || []).concat(name);
                  }
                });
                return result;
              },
              {}
            );
            resultArray = Object.values(resultObject).map(
              (namesArray: any) => namesArray?.slice(-1)[0]
            );
          }
        } else {
          const numberOfElements =
            getDatasets({ ...getChartAttributesArgs })?.[0]?.data?.length || 0;
          seriesSummation = Array.from(
            { length: numberOfElements },
            (_, index) =>
              getDatasets({ ...getChartAttributesArgs })?.reduce(
                (acc: any, obj: any) => acc + obj.data[index],
                0
              )
          );
        }

        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'line',
            },
            className: `getChartOptions-tooltip`,
            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) =>
              tooltipFormatter(params, chartOptions, hasPercentSymbol),
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data:
              chartOptions.isMultiDimension &&
              chartOptions.seriesField !== 'ungrouped'
                ? getXAxisData({ ...getChartAttributesArgs }) || []
                : getLabels({ ...getChartAttributesArgs }) || [],
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            boundaryGap: [0, 0.01],
            max: customSettings.showFullStacked ? 100 : undefined,
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          series:
            chartOptions.isMultiDimension &&
            chartOptions.seriesField !== 'ungrouped'
              ? filteredArray?.length
                ? filteredArray.map((i: any) => {
                    return {
                      data: i.data,
                      type: 'bar',
                      stack: 'total',
                      name: i.name || '',
                      barWidth: `${customSettings.barWidth || 0}%`,
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        ...(chartOptions.labelSettings?.isEnableValueSummation
                          ? {
                              formatter: (d: any) => {
                                if (d.seriesName === resultArray[d.dataIndex]) {
                                  return addPrefixAndSuffix(
                                    numberFormatter(
                                      seriesSummation[d.dataIndex],
                                      customSettings.numberFormatter
                                    ),
                                    customSettings.labelPrefix,
                                    customSettings.labelSuffix
                                  );
                                } else return '';
                              },
                            }
                          : {
                              formatter(d: { data: any }) {
                                return addPrefixAndSuffix(
                                  numberFormatter(
                                    d.data,
                                    customSettings.numberFormatter
                                  ),
                                  customSettings.labelPrefix,
                                  customSettings.labelSuffix
                                );
                              },
                            }),
                      },
                      showBackground: backGroundColor.show,
                      backgroundStyle: {
                        color: chartOptions.customSettings?.isShowBarGradient
                          ? barGradient
                          : 'rgba(180, 180, 180, 0.2)',
                      },
                      itemStyle: {
                        borderRadius: customSettings.barRadius,
                      },
                      emphasis: {
                        focus: 'series',
                      },
                    };
                  })
                : getSeriesData({ ...getChartAttributesArgs })?.map(
                    (i: any) => {
                      return {
                        data: i.data,
                        type: 'bar',
                        stack: 'total',
                        name: i.name || '',
                        barWidth: `${customSettings.barWidth || 0}%`,
                        label: {
                          show: labelSettings.show,
                          position: labelSettings.position,
                          ...(chartOptions.labelSettings?.isEnableValueSummation
                            ? {
                                formatter: (d: any) => {
                                  if (
                                    d.seriesName === resultArray[d.dataIndex]
                                  ) {
                                    return addPrefixAndSuffix(
                                      numberFormatter(
                                        seriesSummation[d.dataIndex],
                                        customSettings.numberFormatter
                                      ),
                                      customSettings.labelPrefix,
                                      customSettings.labelSuffix
                                    );
                                  } else return '';
                                },
                              }
                            : {
                                formatter(d: { data: any }) {
                                  return addPrefixAndSuffix(
                                    numberFormatter(
                                      d.data,
                                      customSettings.numberFormatter
                                    ),
                                    customSettings.labelPrefix,
                                    customSettings.labelSuffix
                                  );
                                },
                              }),
                        },
                        showBackground: backGroundColor.show,
                        backgroundStyle: {
                          color: chartOptions.customSettings?.isShowBarGradient
                            ? barGradient
                            : 'rgba(180, 180, 180, 0.2)',
                        },
                        itemStyle: {
                          borderRadius: customSettings.barRadius,
                        },
                        emphasis: {
                          focus: 'series',
                        },
                      };
                    }
                  )
              : getDatasets({ ...getChartAttributesArgs })?.map(
                  (item: { data: any; label: any }) => {
                    const seriesName = chartOptions.customSettings
                      ?.showFullStacked
                      ? `percentage of ${item.label}`
                      : item.label;
                    return {
                      data: customSettings.showFullStacked
                        ? customData[item.label]
                        : item.data,
                      type: 'bar',
                      name: seriesName,
                      stack: 'x',
                      barWidth: `${customSettings.barWidth}%`,
                      emphasis: {
                        focus: 'series',
                      },
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        ...(chartOptions.labelSettings?.isEnableValueSummation
                          ? {
                              formatter: (d: any) => {
                                return d?.seriesName ===
                                  chartOptions.yAxisList?.[
                                    chartOptions.yAxisList?.length - 1
                                  ]
                                  ? addPrefixAndSuffix(
                                      numberFormatter(
                                        seriesSummation[d.dataIndex],
                                        customSettings.numberFormatter
                                      ),
                                      customSettings.labelPrefix,
                                      customSettings.labelSuffix
                                    )
                                  : '';
                              },
                            }
                          : {
                              formatter(d: { data: any }) {
                                return addPrefixAndSuffix(
                                  numberFormatter(
                                    d.data,
                                    customSettings.numberFormatter
                                  ),
                                  customSettings.labelPrefix,
                                  customSettings.labelSuffix
                                );
                              },
                            }),
                      },
                      showBackground: backGroundColor.show,
                      backgroundStyle: {
                        color: chartOptions.customSettings?.isShowBarGradient
                          ? barGradient
                          : 'rgba(180, 180, 180, 0.2)',
                      },
                      itemStyle: {
                        borderRadius: customSettings.barRadius,
                      },
                    };
                  }
                ),
        });
        break;
      }

      case CHART_TYPES.area: {
        getDatasets({ ...getChartAttributesArgs })?.map((obj: {}) =>
          Object.assign(obj, { fill: true })
        );
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'line',
              label: {
                backgroundColor: '#6a7985',
              },
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: [
            {
              name: chartOptions.labelSettings?.XAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'category',
              boundaryGap: false,
              data: getLabels({ ...getChartAttributesArgs }),
              splitLine: {
                show: !chartOptions.customSettings?.hideXSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideXAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideXAxisLabels,
                color:
                  chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.XAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
                rotate:
                  customSettings.customRotation || customSettings.xRotation,
                ...(labelSettings?.truncateLabel
                  ? {
                      formatter(value: any) {
                        return truncateText(
                          value,
                          labelSettings.truncateLabelValue || 22
                        );
                      },
                    }
                  : {}),
              },
            },
          ],
          yAxis: [
            {
              name: chartOptions.labelSettings?.YAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'value',
              position: axisSettings.axis,
              splitLine: {
                show: !chartOptions.customSettings?.hideYSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideYAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideYAxisLabels,
                color:
                  chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                formatter: (value: any) => {
                  if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                    return getLabelForValue(value);
                  }
                  if (value === null || value === 0) {
                    return '0';
                  }
                  return addPrefixAndSuffix(
                    numberFormatter(value, customSettings.numberFormatter),
                    customSettings.labelPrefix,
                    customSettings.labelSuffix
                  );
                },
              },
            },
          ],
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              return {
                data: item.data,
                type: 'line',
                name: item.label,
                areaStyle: {},
                emphasis: {
                  focus: 'series',
                },
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.stackedArea: {
        getDatasets({ ...getChartAttributesArgs })?.map((obj: {}) =>
          Object.assign(obj, { fill: true })
        );
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'line',
              label: {
                backgroundColor: '#6a7985',
              },
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: [
            {
              name: chartOptions.labelSettings?.XAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'category',
              boundaryGap: false,
              data: getLabels({ ...getChartAttributesArgs }),
              splitLine: {
                show: !chartOptions.customSettings?.hideXSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideXAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideXAxisLabels,
                color:
                  chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.XAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
                rotate:
                  customSettings.customRotation || customSettings.xRotation,
                ...(labelSettings?.truncateLabel
                  ? {
                      formatter(value: any) {
                        return truncateText(
                          value,
                          labelSettings.truncateLabelValue || 22
                        );
                      },
                    }
                  : {}),
              },
            },
          ],
          yAxis: [
            {
              name: chartOptions.labelSettings?.YAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'value',
              position: axisSettings.axis,
              splitLine: {
                show: !chartOptions.customSettings?.hideYSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideYAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideYAxisLabels,
                color:
                  chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                formatter: (value: any) => {
                  if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                    return getLabelForValue(value);
                  }
                  if (value === null || value === 0) {
                    return '0';
                  }
                  return addPrefixAndSuffix(
                    numberFormatter(value, customSettings.numberFormatter),
                    customSettings.labelPrefix,
                    customSettings.labelSuffix
                  );
                },
              },
            },
          ],
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              return {
                data: item.data,
                type: 'line',
                name: item.label,
                stack: 'Total',
                smooth: true,
                showSymbol: false,
                areaStyle: {},
                emphasis: {
                  focus: 'series',
                },
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.boxplot: {
        const modifiedData: any[][][] = [];
        const labelData: any[] = [];
        getDatasets({ ...getChartAttributesArgs })?.map((item: any) => {
          modifiedData.push(item.data);
          labelData.push(item.label);
        });
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          dataset: [
            {
              source: modifiedData,
            },
            {
              transform: {
                type: 'boxplot',
                config: { itemNameFormatter: 'expr {value}' },
              },
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1,
            },
          ],
          tooltip: {
            trigger: 'item',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'shadow',
            },
            className: `getChartOptions-tooltip`,

            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            boundaryGap: true,
            splitArea: {
              show: false,
            },
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitArea: {
              show: true,
            },
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              datasetIndex: 1,
            },
            {
              name: 'outlier',
              type: 'scatter',
              datasetIndex: 2,
            },
          ],
        });
        break;
      }
      case CHART_TYPES.bubble: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'shadow',
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data: getLabels({ ...getChartAttributesArgs }),
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              const sum = item.data.reduce(
                (total: any, num: any) => total + num,
                0
              );
              const avg = sum / item.data.length;
              return {
                symbolSize: (param: any) => {
                  return (param / avg) * (chartOptions.percentageSize || 20);
                },
                data: item.data,
                type: 'scatter',
                name: item.label,
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.combo: {
        let yAxis;
        const rangeAxis = chartOptions.customSettings?.comboLabelFormatter?.map(
          (opt) => opt.axis
        );
        const stackAxisName =
          customSettings.comboStackAxisSymbols?.name || STACK_AXIS;
        const lineOptions =
          chartOptions.yAxisList?.filter(
            (i) => !chartOptions?.comboBarList?.includes(i)
          ) || [];
        let series;
        if (customSettings?.isStackBar && chartOptions.comboBarList?.length) {
          yAxis = [
            {
              show: true,
              type: 'value',
              name: stackAxisName,
              min: 0,
              splitLine: {
                show: !chartOptions.customSettings?.hideXSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideYAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideYAxisLabels,
                color:
                  chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                formatter: (value: any) => {
                  if (rangeAxis?.includes(stackAxisName)) {
                    const formatter =
                      chartOptions.customSettings?.comboLabelFormatter?.find(
                        (opt) => opt.axis === stackAxisName
                      )?.formatter || [];
                    return getComboRangeLabel(value, formatter);
                  }
                  if (value === null || value === 0) {
                    return '0';
                  }
                  return addPrefixAndSuffix(
                    numberFormatter(value, customSettings.numberFormatter),
                    customSettings.comboStackAxisSymbols?.prefix || '',
                    customSettings.comboStackAxisSymbols?.suffix || ''
                  );
                },
              },
            },
          ];
          series = chartOptions.comboBarList?.map((item, index) => ({
            type: 'bar',
            ...(customSettings.isStackBar ? { stack: 'x' } : {}),
            data: data?.map((obj) => obj[item]),
            name: item,
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              ...(customSettings.isStackBar
                ? {
                    formatter(d: { data: any }) {
                      return addPrefixAndSuffix(
                        numberFormatter(d.data, customSettings.numberFormatter),
                        customSettings.comboStackAxisSymbols?.prefix,
                        customSettings.comboStackAxisSymbols?.suffix
                      );
                    },
                  }
                : {
                    formatter(d: { data: any }) {
                      return addPrefixAndSuffix(
                        numberFormatter(d.data, customSettings.numberFormatter),
                        customSettings.comboAxisSymbols[index]?.prefix,
                        customSettings.comboAxisSymbols[index]?.suffix
                      );
                    },
                  }),
            },
            showBackground: backGroundColor.show,
            backgroundStyle: {
              color: chartOptions.customSettings?.isShowBarGradient
                ? barGradient
                : 'rgba(180, 180, 180, 0.2)',
            },
          }));
          if (lineOptions.length) {
            yAxis.push(
              ...lineOptions.map((item: any, index: any) => {
                const symbolObj = customSettings.comboAxisSymbols.filter(
                  (obj: any) => obj.name === item
                );
                return {
                  show: true,
                  type: 'value',
                  name: item,
                  min: 0,
                  position: index > 1 ? 'left' : 'right',
                  offset: index > 0 ? 60 : 0,
                  splitLine: {
                    show: !chartOptions.customSettings?.hideYSplitLines,
                  },
                  axisLine: {
                    show: !chartOptions.customSettings?.hideYAxisLines,
                    lineStyle: {
                      color: colors?.[chartOptions.comboBarList.length + index],
                    },
                  },
                  axisLabel: {
                    show: !chartOptions.customSettings?.hideYAxisLabels,
                    color:
                      chartOptions.labelSettings?.YAxisStyle?.color ||
                      '#000000',
                    fontSize:
                      chartOptions.labelSettings?.YAxisStyle?.size || 14,
                    fontWeight:
                      chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                    fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                    formatter: (value: any) => {
                      if (rangeAxis?.includes(item)) {
                        const formatter =
                          chartOptions.customSettings?.comboLabelFormatter?.find(
                            (opt) => opt.axis === item
                          )?.formatter || [];
                        return getComboRangeLabel(value, formatter);
                      }
                      if (value === null || value === 0) {
                        return '0';
                      }
                      return addPrefixAndSuffix(
                        numberFormatter(value, customSettings.numberFormatter),
                        symbolObj[0]?.prefix || '',
                        symbolObj[0]?.suffix || ''
                      );
                    },
                  },
                };
              })
            );
            series.push(
              ...lineOptions.map((item, index) => ({
                type: 'line',
                yAxisIndex: index + 1,
                data: data?.map((obj) => obj[item]),
                name: item,
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.comboAxisSymbols[index]?.prefix,
                      customSettings.comboAxisSymbols[index]?.suffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
              }))
            );
          }
        } else {
          yAxis = chartOptions.yAxisList?.map((item: any, index: any) => {
            const symbolObj = customSettings.comboAxisSymbols.filter(
              (obj: any) => obj.name === item
            );
            return {
              show: true,
              type: 'value',
              name: item,
              min: 0,
              position: index > 2 ? 'left' : '',
              offset: index > 1 ? 60 : 0,
              splitLine: {
                show: !chartOptions.customSettings?.hideYSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideYAxisLines,
                lineStyle: {
                  color: colors?.[index],
                },
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideYAxisLabels,
                color:
                  chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                formatter: (value: any) => {
                  if (rangeAxis?.includes(item)) {
                    const formatter =
                      chartOptions.customSettings?.comboLabelFormatter?.find(
                        (opt) => opt.axis === item
                      )?.formatter || [];
                    return getComboRangeLabel(value, formatter);
                  }
                  if (value === null || value === 0) {
                    return '0';
                  }
                  return addPrefixAndSuffix(
                    numberFormatter(value, customSettings.numberFormatter),
                    symbolObj[0]?.prefix || '',
                    symbolObj[0]?.suffix || ''
                  );
                },
              },
            };
          });
          series = chartOptions.yAxisList?.map((item, index) => ({
            type: chartOptions?.comboBarList?.includes(item) ? 'bar' : 'line',
            ...(customSettings.isStackBar &&
            chartOptions?.comboBarList?.includes(item)
              ? { stack: 'x' }
              : { yAxisIndex: index }),
            data: data?.map((obj) => obj[item]),
            name: item,
            label: {
              show: labelSettings.show,
              position: labelSettings.position,
              formatter(d: { data: any }) {
                return addPrefixAndSuffix(
                  numberFormatter(d.data, customSettings.numberFormatter),
                  customSettings.comboAxisSymbols[index]?.prefix,
                  customSettings.comboAxisSymbols[index]?.suffix
                );
              },
            },
            showBackground: backGroundColor.show,
            backgroundStyle: {
              color: chartOptions.customSettings?.isShowBarGradient
                ? barGradient
                : 'rgba(180, 180, 180, 0.2)',
            },
          }));
        }
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            show: true,
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            className: `getChartOptions-tooltip`,
            enterable: true,
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: [
            {
              name: chartOptions.labelSettings?.XAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'category',
              data: getLabels({ ...getChartAttributesArgs }),
              axisPointer: {
                type: 'shadow',
              },
              splitLine: {
                show: !chartOptions.customSettings?.hideXSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideXAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideXAxisLabels,
                color:
                  chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.XAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
                rotate:
                  customSettings.customRotation || customSettings.xRotation,
                ...(labelSettings?.truncateLabel
                  ? {
                      formatter(value: any) {
                        return truncateText(
                          value,
                          labelSettings.truncateLabelValue || 22
                        );
                      },
                    }
                  : {}),
              },
            },
          ],
          yAxis,
          series,
        });
        break;
      }
      case CHART_TYPES.row: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'line',
              label: {
                backgroundColor: '#6a7985',
              },
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data: getLabels({ ...getChartAttributesArgs }),
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      if (
                        chartOptions?.customSettings?.isEnableLabelFormatting
                      ) {
                        return getLabelForValue(value);
                      }
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              return {
                data: item.data,
                type: 'bar',
                name: item.label,
                barWidth: `${customSettings.barWidth}%`,
                emphasis: {
                  focus: 'series',
                },
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
                itemStyle: {
                  borderRadius: customSettings.barRadius,
                  ...(customSettings.coloredBars
                    ? {
                        color: (params: any) => {
                          return colorPalette?.[params.dataIndex];
                        },
                      }
                    : {}),
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.histogram: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'shadow',
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings?.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: [
            {
              name: chartOptions.labelSettings?.XAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'category',
              data: getLabels({ ...getChartAttributesArgs }),
              axisTick: {
                alignWithLabel: true,
              },
              splitLine: {
                show: !chartOptions.customSettings?.hideXSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideXAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideXAxisLabels,
                color:
                  chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.XAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
                rotate:
                  customSettings.customRotation || customSettings.xRotation,
                ...(labelSettings?.truncateLabel
                  ? {
                      formatter(value: any) {
                        return truncateText(
                          value,
                          labelSettings.truncateLabelValue || 22
                        );
                      },
                    }
                  : {}),
              },
            },
          ],
          yAxis: [
            {
              name: chartOptions.labelSettings?.YAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'value',
              position: axisSettings.axis,
              splitLine: {
                show: !chartOptions.customSettings?.hideYSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideYAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideYAxisLabels,
                color:
                  chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                formatter: (value: any) => {
                  if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                    return getLabelForValue(value);
                  }
                  if (value === null || value === 0) {
                    return '0';
                  }
                  return addPrefixAndSuffix(
                    numberFormatter(value, customSettings.numberFormatter),
                    customSettings.labelPrefix,
                    customSettings.labelSuffix
                  );
                },
              },
            },
          ],
          series: [
            {
              name: getDatasets({ ...getChartAttributesArgs })?.[0]?.label,
              type: 'bar',
              barWidth: '100%',
              data: getDatasets({ ...getChartAttributesArgs })?.[0]?.data,
              label: {
                show: labelSettings.show,
                position: labelSettings.position,
                formatter(d: { data: any }) {
                  return numberFormatter(
                    d.data,
                    customSettings.numberFormatter
                  );
                },
              },
              showBackground: backGroundColor.show,
              backgroundStyle: {
                color: chartOptions.customSettings?.isShowBarGradient
                  ? barGradient
                  : 'rgba(180, 180, 180, 0.2)',
              },
              itemStyle: {
                ...(customSettings.coloredBars
                  ? {
                      color: (params: any) => {
                        return colorPalette?.[params.dataIndex];
                      },
                    }
                  : {}),
              },
            },
          ],
        });
        break;
      }
      case CHART_TYPES.waterfall: {
        let modifiedData;
        const datasets = getDatasets({ ...getChartAttributesArgs });
        if (datasets?.length) {
          const values = datasets[0]?.data as any;

          const convertedData = [values[0]];
          if (values.length)
            for (let i = 1; i < values.length - 1; i++) {
              convertedData.push(convertedData[i - 1] - values[i]);
            }
          convertedData.push(values[values.length - 1]);

          modifiedData = {
            labels: getLabels({ ...getChartAttributesArgs }),
            datasets: [values, convertedData],
            legend: datasets[0].label,
          };
        }
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'shadow',
            },
            className: `getChartOptions-tooltip`,

            formatter(params: any) {
              const tar = params[1];
              return `${tar.name}<br/>${addPrefixAndSuffix(
                numberFormatter(tar.value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              )}`;
            },
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings.disableScroll ? '' : 'scroll',
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data: modifiedData?.labels,
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          series: [
            {
              name: 'Placeholder',
              type: 'bar',
              stack: 'Total',
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent',
              },
              emphasis: {
                itemStyle: {
                  borderColor: 'transparent',
                  color: 'transparent',
                },
              },
              data: modifiedData?.datasets[1],
              showBackground: backGroundColor.show,
              backgroundStyle: {
                color: chartOptions.customSettings?.isShowBarGradient
                  ? barGradient
                  : 'rgba(180, 180, 180, 0.2)',
              },
            },
            {
              name: modifiedData?.legend,
              type: 'bar',
              stack: 'Total',
              label: {
                show: labelSettings.show,
                position: labelSettings.position,
                formatter(d: { data: any }) {
                  return addPrefixAndSuffix(
                    numberFormatter(d.data, customSettings.numberFormatter),
                    customSettings.labelPrefix,
                    customSettings.labelSuffix
                  );
                },
              },
              data: modifiedData?.datasets[0],
            },
          ],
        });
        break;
      }
      case CHART_TYPES.horizontalStack: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,

            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'line',
              label: {
                backgroundColor: '#6a7985',
              },
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings?.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            boundaryGap: [0, 0.01],
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data: getLabels({ ...getChartAttributesArgs }),
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            position: axisSettings.axis,
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      if (
                        chartOptions?.customSettings?.isEnableLabelFormatting
                      ) {
                        return getLabelForValue(value);
                      }
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              return {
                data: item.data,
                type: 'bar',
                stack: 'x',
                name: item.label,
                barWidth: `${customSettings.barWidth}%`,
                emphasis: {
                  focus: 'series',
                },
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
                itemStyle: {
                  borderRadius: customSettings.barRadius,
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.stepped: {
        const choice = ['start', 'middle', 'end'];
        let k = 2;
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,

            className: `getChartOptions-tooltip`,

            enterable: true,
            valueFormatter: (value: any) =>
              addPrefixAndSuffix(
                numberFormatter(value, customSettings.numberFormatter),
                customSettings.labelPrefix,
                customSettings.labelSuffix
              ),
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings?.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data: getLabels({ ...getChartAttributesArgs }),
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              if (k === 0) {
                k = 1;
              } else if (k === 1) {
                k = 2;
              } else {
                k = 0;
              }
              return {
                name: item.label,
                type: 'line',
                step: choice[k],
                data: item.data,
                areaStyle: {},
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.scatter: {
        Object.assign(option, {
          ...option,
          ...defaultOptions,
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,

            axisPointer: {
              type: chartOptions?.customSettings?.isEnableLabelTooltip
                ? 'cross'
                : 'shadow',
            },
            className: `getChartOptions-tooltip`,

            enterable: true,
            formatter: (params: any) => tooltipFormatter(params, chartOptions),
          },
          xAxis: {
            name: chartOptions.labelSettings?.XAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'category',
            data: getLabels({ ...getChartAttributesArgs }),
            splitLine: {
              show: !chartOptions.customSettings?.hideXSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideXAxisLabels,
              color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
              rotate: customSettings.customRotation || customSettings.xRotation,
              ...(labelSettings?.truncateLabel
                ? {
                    formatter(value: any) {
                      return truncateText(
                        value,
                        labelSettings.truncateLabelValue || 22
                      );
                    },
                  }
                : {}),
            },
          },
          yAxis: {
            name: chartOptions.labelSettings?.YAxisStyle?.axisName,
            nameLocation: 'center',
            nameGap: chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
            nameTextStyle: {
              fontSize: 14,
              color: '#222c3a',
              fontWeight: 500,
            },
            type: 'value',
            position: axisSettings.axis,
            splitLine: {
              show: !chartOptions.customSettings?.hideYSplitLines,
            },
            axisLine: {
              show: !chartOptions.customSettings?.hideYAxisLines,
            },
            axisLabel: {
              show: !chartOptions.customSettings?.hideYAxisLabels,
              color: chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
              fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
              fontWeight: chartOptions.labelSettings?.YAxisStyle?.weight || 400,
              fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
              formatter: (value: any) => {
                if (chartOptions?.customSettings?.isEnableLabelFormatting) {
                  return getLabelForValue(value);
                }
                if (value === null || value === 0) {
                  return '0';
                }
                return addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                );
              },
            },
          },
          legend: {
            show: legendSettings.show,
            ...(legendSettings.customise
              ? {
                  top: legendSettings.top,
                  left: legendSettings.left,
                  right: legendSettings.right,
                  bottom: legendSettings.bottom,
                }
              : { ...legendPosition }),
            orient: legendSettings.position,
            icon: legendSettings.legendShape,
            type: legendSettings?.disableScroll ? '' : 'scroll',
            data: getLegendData({
              chartOptions,
              data,
            }),
            formatter(value: any) {
              return `{a|${truncateText(
                value,
                legendSettings.truncateLegendValue || 22
              )}}`;
            },
            tooltip: {
              show: true,
              formatter(params: { name: any }) {
                return params.name;
              },
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: 12,
                  lineHeight: 4,
                },
              },
            },
          },
          series: getDatasets({ ...getChartAttributesArgs })?.map(
            (item: { data: any; label: any }) => {
              return {
                symbolSize: 10,
                data: item.data,
                type: 'scatter',
                name: item.label,
                label: {
                  show: labelSettings.show,
                  position: labelSettings.position,
                  formatter(d: { data: any }) {
                    return addPrefixAndSuffix(
                      numberFormatter(d.data, customSettings.numberFormatter),
                      customSettings.labelPrefix,
                      customSettings.labelSuffix
                    );
                  },
                },
                showBackground: backGroundColor.show,
                backgroundStyle: {
                  color: chartOptions.customSettings?.isShowBarGradient
                    ? barGradient
                    : 'rgba(180, 180, 180, 0.2)',
                },
              };
            }
          ),
        });
        break;
      }
      case CHART_TYPES.timeSeries: {
        if (isPythonMode) {
          if (!isTimeSeries) break;
          const isMultiSeries =
            chartOptions.isMultiDimension &&
            chartOptions.seriesField !== 'ungrouped';
          const hasPercentSymbol: boolean =
            !isMultiSeries &&
            !!(
              chartOptions?.timeSeriesSettings?.seriesType?.[0]?.type ===
              'stack'
            ) &&
            !!chartOptions?.customSettings?.showFullStacked;
          Object.assign(option, {
            ...option,
            ...defaultOptions,
            axisLine: {
              show: chartOptions.customSettings?.hideXAxisLines,
            },
            axisLabel: {
              show: chartOptions.customSettings?.hideXAxisLabels,
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              axisPointer: {
                type: chartOptions?.customSettings?.isEnableLabelTooltip
                  ? 'cross'
                  : 'shadow',
              },
              className: `getChartOptions-tooltip`,
              enterable: true,
              valueFormatter: (value: any) =>
                addPrefixAndSuffix(
                  numberFormatter(value, customSettings.numberFormatter),
                  customSettings.labelPrefix,
                  customSettings.labelSuffix
                ),
              formatter: (params: any) =>
                tooltipFormatter(params, chartOptions, hasPercentSymbol),
            },
            xAxis: {
              name: chartOptions.labelSettings?.XAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.XAxisStyle?.axisPadding || 40,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideXAxisLabels,
                color:
                  chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.XAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
                interval: 0,
                rotate:
                  customSettings.customRotation || customSettings.xRotation,
                hideOverlap: true,
                ...(labelSettings?.truncateLabel
                  ? {
                      formatter(value: any) {
                        return truncateText(
                          value,
                          labelSettings.truncateLabelValue || 22
                        );
                      },
                    }
                  : {}),
              },
              splitLine: {
                show: !chartOptions.customSettings?.hideXSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideXAxisLines,
              },
              data: getXAxisData({ ...getChartAttributesArgs }) || [],
            },
            yAxis: {
              name: chartOptions.labelSettings?.YAxisStyle?.axisName,
              nameLocation: 'center',
              nameGap:
                chartOptions.labelSettings?.YAxisStyle?.axisPadding || 80,
              nameTextStyle: {
                fontSize: 14,
                color: '#222c3a',
                fontWeight: 500,
              },
              type: 'value',
              position: axisSettings.axis,
              splitLine: {
                show: !chartOptions.customSettings?.hideYSplitLines,
              },
              axisLine: {
                show: !chartOptions.customSettings?.hideYAxisLines,
              },
              axisLabel: {
                show: !chartOptions.customSettings?.hideYAxisLabels,
                color:
                  chartOptions.labelSettings?.YAxisStyle?.color || '#000000',
                fontSize: chartOptions.labelSettings?.YAxisStyle?.size || 14,
                fontWeight:
                  chartOptions.labelSettings?.YAxisStyle?.weight || 400,
                fontFamily: chartOptions.labelSettings?.YAxisStyle?.family,
                formatter: (value: any) => {
                  if (value === null || value === 0) {
                    return '0';
                  }
                  return addPrefixAndSuffix(
                    numberFormatter(value, customSettings.numberFormatter),
                    customSettings.labelPrefix,
                    customSettings.labelSuffix
                  );
                },
              },
            },
            legend: {
              show: legendSettings.show,
              ...(legendSettings.customise
                ? {
                    top: legendSettings.top,
                    left: legendSettings.left,
                    right: legendSettings.right,
                    bottom: legendSettings.bottom,
                  }
                : { ...legendPosition }),
              orient: legendSettings.position,
              icon: legendSettings.legendShape,
              type: legendSettings?.disableScroll ? '' : 'scroll',
              data: getLegendData({
                chartOptions,
                data,
              }),
              formatter(value: any) {
                return `{a|${truncateText(
                  value || '',
                  legendSettings.truncateLegendValue || 22
                )}}`;
              },
              tooltip: {
                show: true,
                formatter(params: { name: any }) {
                  return params.name;
                },
              },
              textStyle: {
                rich: {
                  a: {
                    fontSize: 12,
                    lineHeight: 4,
                  },
                },
              },
            },
            series:
              chartOptions.isMultiDimension &&
              chartOptions.seriesField !== 'ungrouped'
                ? filteredArray?.length
                  ? filteredArray.map((item: any) => ({
                      data: item?.data || [],
                      type:
                        timeSeriesSettings?.seriesType?.[0]?.type === 'area'
                          ? 'line'
                          : timeSeriesSettings?.seriesType?.[0]?.type ===
                            'stack'
                          ? 'bar'
                          : timeSeriesSettings?.seriesType?.[0]?.type || 'bar',
                      name: item?.name || 'series',
                      ...(timeSeriesSettings?.seriesType?.[0]?.type === 'stack'
                        ? { stack: 'total' }
                        : {}),
                      label: {
                        show: labelSettings.show,
                        position: labelSettings.position,
                        formatter(d: { data: any }) {
                          return addPrefixAndSuffix(
                            numberFormatter(
                              d.data,
                              customSettings.numberFormatter
                            ),
                            customSettings.labelPrefix,
                            customSettings.labelSuffix
                          );
                        },
                      },
                      emphasis: {
                        focus: 'series',
                      },
                      ...(timeSeriesSettings?.seriesType?.[0]?.type === 'area'
                        ? { areaStyle: {} }
                        : { areaStyle: { opacity: 0 } }),
                      ...(timeSeriesSettings?.seriesType?.[0]?.type === 'bar'
                        ? {
                            barWidth: `${customSettings?.barWidth || 0}%`,
                            showBackground: backGroundColor?.show,
                            backgroundStyle: {
                              color: chartOptions.customSettings
                                ?.isShowBarGradient
                                ? barGradient
                                : 'rgba(180, 180, 180, 0.2)',
                            },
                            itemStyle: {
                              borderRadius: customSettings?.barRadius,
                            },
                          }
                        : {}),
                    }))
                  : getSeriesData({ ...getChartAttributesArgs })?.map(
                      (item: any) => ({
                        data: item.data || [],
                        type:
                          timeSeriesSettings?.seriesType?.[0]?.type === 'area'
                            ? 'line'
                            : timeSeriesSettings?.seriesType?.[0]?.type ===
                              'stack'
                            ? 'bar'
                            : timeSeriesSettings?.seriesType?.[0]?.type ||
                              'bar',
                        name: item?.name || 'series',
                        ...(timeSeriesSettings?.seriesType?.[0]?.type ===
                        'stack'
                          ? { stack: 'total' }
                          : {}),
                        label: {
                          show: labelSettings.show,
                          position: labelSettings.position,
                          formatter(d: { data: any }) {
                            return addPrefixAndSuffix(
                              numberFormatter(
                                d.data,
                                customSettings.numberFormatter
                              ),
                              customSettings.labelPrefix,
                              customSettings.labelSuffix
                            );
                          },
                        },
                        emphasis: {
                          focus: 'series',
                        },
                        ...(timeSeriesSettings?.seriesType?.[0]?.type === 'area'
                          ? { areaStyle: {} }
                          : { areaStyle: { opacity: 0 } }),
                        ...(timeSeriesSettings?.seriesType?.[0]?.type === 'bar'
                          ? {
                              barWidth: `${customSettings?.barWidth || 0}%`,
                              showBackground: backGroundColor?.show,
                              backgroundStyle: {
                                color: chartOptions.customSettings
                                  ?.isShowBarGradient
                                  ? barGradient
                                  : 'rgba(180, 180, 180, 0.2)',
                              },
                              itemStyle: {
                                borderRadius: customSettings?.barRadius,
                              },
                            }
                          : {}),
                      })
                    )
                : getTimeSeriesData({
                    dataArray: data,
                    timeStampKey: chartOptions.xAxis || '',
                    valuekeys: chartOptions.yAxisList || [],
                    customData,
                    type: (timeSeriesSettings.seriesType[0]?.type ||
                      'bar') as TimeSeriesType,
                    groupBy: (timeSeriesSettings.groupBySettings?.value.split(
                      '____'
                    ).length
                      ? timeSeriesSettings.groupBySettings?.value
                          .split('____')[0]
                          .toLowerCase()
                      : timeSeriesSettings.groupBySettings?.value.toLowerCase() ||
                        'monthly') as TimeSeriesGroupType,
                    yAxisList: chartOptions?.yAxisList || [],
                    labelSettings,
                    backGroundColor,
                    customSettings,
                    fillXAxis:
                      timeSeriesSettings.groupBySettings?.fillXAxis || false,
                    isCumulativeBar:
                      chartOptions.customSettings?.cumulativeBar || false,
                    hasPercentSymbol,
                  }),
          });
        } else
          Object.assign(
            option,
            getSeriesOption({
              axisSettings,
              backGroundColor,
              chartOptions,
              colorOptions: option,
              customSettings,
              data,
              defaultOptions,
              labelSettings,
              legendPosition,
              legendSettings,
            })
          );
        break;
      }
      default:
        break;
    }
  }
  return option;
};
