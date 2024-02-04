import { AWSS3, BIGQUERY, CLICKHOUSE, MONGODB, MSSQL, MYSQL } from '@/consts';
import { numberFormatter } from './numberFormatter';
import { tooltipFormatter } from './tooltipFormatter';
import {
  BackgroundSettings,
  ChartSettingsType,
  CustomSettings,
  FloatingDropDownOption,
  LabelSettings,
  LegendSettings,
  TimeSeriesGroupType,
  TimeSeriesType,
} from '@/types';
import { addPrefixAndSuffix, truncateText } from '@/utils';

// TODO: cumulative, percentage, dynamic & filter series
type DataRow = Record<string, any>;
type GetSeriesDataParams = {
  labelSettings: LabelSettings;
  backGroundColor: BackgroundSettings;
  customSettings: CustomSettings;
  datasets: Dataset[];
  type: TimeSeriesType;
  isShowPercentageFullStack: boolean;
};
type Dataset = { label: string; data: number[] };
type AxisSettings = {
  axis?: string | undefined;
};
type GetSeriesOptionParams = {
  chartOptions: ChartSettingsType;
  data: DataRow[];
  labelSettings: LabelSettings;
  backGroundColor: BackgroundSettings;
  customSettings: CustomSettings;
  colorOptions: Record<string, any>;
  defaultOptions: Record<string, any>;
  legendSettings: LegendSettings;
  axisSettings: AxisSettings;
  legendPosition: Record<string, any>;
};
type GetDatasetParams = {
  data: DataRow[];
  yAxisList: string[];
  seriesField: string;
  xAxisData: string[];
  isGroupBy: boolean;
  xAxis: string;
  groupByColumnUniqueValue: string[];
  isShowPercentageFullStack: boolean;
  format: TimeSeriesGroupType;
};
type GetXaxisDataParams = {
  data: DataRow[];
  xAxis: string;
  format: TimeSeriesGroupType;
  isGroupBy: boolean;
};

type GetFillXaxisDataParams = {
  data: DataRow[];
  format: TimeSeriesGroupType;
  isFillXaxisValue: boolean;
  xAxis: string;
  yAxisList: string[];
  seriesField: string;
  isGroupBy: boolean;
  groupByColumnUniqueValue: string[];
};
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const isMultiseries = (chartOptions: ChartSettingsType): boolean =>
  !!chartOptions.isMultiDimension && chartOptions.seriesField !== 'ungrouped';

const hasPercentSymbol = (
  chartOptions: ChartSettingsType,
  isMultiSeries: boolean
): boolean =>
  !isMultiSeries &&
  !!(chartOptions?.timeSeriesSettings?.seriesType?.[0]?.type === 'stack') &&
  !!chartOptions?.customSettings?.showFullStacked;

const formatXaxisValue = (format: TimeSeriesGroupType, value: any) => {
  switch (format) {
    case 'quarterly':
      return `Q${value}`;
    case 'weekly': {
      const values = value?.split('-');
      if (!values?.length) return value;
      const [year, month, week] = values;
      const firstDayOfWeek = new Date(
        Number(year),
        Number(month) - 1,
        1 + (Number(week) - 1) * 7
      )?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${firstDayOfWeek}`;
    }
    default:
      return value;
  }
};
const getXaxisData = ({
  data,
  format,
  isGroupBy,
  xAxis,
}: GetXaxisDataParams): string[] =>
  isGroupBy
    ? Array.from(
        new Set(
          data?.map((i) => {
            const value = i[xAxis];
            return formatXaxisValue(format, value);
          })
        )
      )
    : data.map((i) => {
        const value = i[xAxis];
        return formatXaxisValue(format, value);
      });
const sortData = (
  format: TimeSeriesGroupType,
  data: DataRow[],
  xAxis: string
) => {
  switch (format.toLowerCase()) {
    case 'monthly':
      return data?.sort((a, b) => {
        const valueA = a?.[xAxis]?.toString()?.split(' - ');
        const valueB = b?.[xAxis]?.toString()?.split(' - ');
        if (!valueA || !valueB) return 1;
        const [monthA, yearA] = valueA;
        const [monthB, yearB] = valueB;

        if (yearA !== yearB) {
          return parseInt(yearA, 10) - parseInt(yearB, 10);
        }
        return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
      });
    case 'quarterly':
      return data?.sort((a, b) => {
        const valueA = a?.[xAxis]?.toString()?.split(' ');
        const valueB = b?.[xAxis]?.toString()?.split(' ');
        if (!valueA || !valueB) return 1;
        const [quarterA, yearA] = valueA;
        const [quarterB, yearB] = valueB;

        if (yearA !== yearB) {
          return parseInt(yearA, 10) - parseInt(yearB, 10);
        }
        return parseInt(quarterA, 10) - parseInt(quarterB, 10);
      });
    default:
      return data;
  }
};

const getDataset = ({
  data,
  isGroupBy,
  seriesField,
  xAxis,
  xAxisData,
  yAxisList,
  groupByColumnUniqueValue,
  isShowPercentageFullStack,
  format,
}: GetDatasetParams): Dataset[] => {
  if (isGroupBy) {
    return groupByColumnUniqueValue?.map((yAxisValue) => {
      const yAxisDataFiltered = data?.filter(
        (item) => item[seriesField || ''] === yAxisValue
      );
      const yAxisDataArray = xAxisData?.map((xAxisValue) => {
        const filteredItems = yAxisDataFiltered?.filter((item) => {
          const itemValue = item[xAxis || ''];
          return formatXaxisValue(format, itemValue) === xAxisValue;
        });
        const measureSum = filteredItems?.reduce((sum, item) => {
          return sum + (Number(item[yAxisList?.[0] || '']) || 0);
        }, 0);
        return measureSum || 0;
      });
      return {
        label: isShowPercentageFullStack
          ? `percentage of ${yAxisValue}`
          : yAxisValue,
        data: yAxisDataArray,
      };
    });
  }
  return yAxisList.map((key) => ({
    label: isShowPercentageFullStack ? `percentage of ${key}` : key,
    data: data.map((item) => item[key]),
  }));
};
const getFillXaxisData = ({
  data,
  format,
  isFillXaxisValue,
  xAxis,
  groupByColumnUniqueValue,
  isGroupBy,
  seriesField,
  yAxisList,
}: GetFillXaxisDataParams) => {
  if (!isFillXaxisValue) return data;
  switch (format?.toLowerCase()) {
    case 'monthly': {
      const modifiedData = data;
      const xAxisData = data.map((key) => key[xAxis]);
      const years = Array.from(
        new Set(xAxisData.map((xData) => xData.split(' - ')[1]))
      ).sort();

      const startingMonth =
        monthNames.findIndex((month) => {
          return xAxisData.some((m) => m === `${month} - ${years[0]}`);
        }) + 1;
      const endingMonth =
        monthNames.findIndex((month) => {
          return xAxisData.some(
            (m) => m === `${month} - ${years[years.length - 1]}`
          );
        }) + 1;

      if (years.length > 1) {
        years.forEach((year) => {
          monthNames.forEach((month, index) => {
            const newData: DataRow = {};
            yAxisList.forEach((y) => (newData[y] = 0));
            const label: string = `${month} - ${year}`;
            if (!xAxisData.includes(label)) {
              if (index >= startingMonth || index < endingMonth) {
                if (isGroupBy) {
                  groupByColumnUniqueValue.forEach((col) => {
                    newData[xAxis] = label;
                    newData[seriesField] = col;
                    modifiedData.push(newData);
                  });
                } else {
                  newData[xAxis] = label;
                  modifiedData.push(newData);
                }
              }
            }
          });
        });
        return modifiedData;
      } else {
        monthNames.forEach((month, index) => {
          const newData: DataRow = {};
          yAxisList.forEach((y) => (newData[y] = 0));
          const label: any = `${month} - ${years[0]}`;
          if (!xAxisData.includes(label)) {
            if (index >= startingMonth || index < endingMonth) {
              if (isGroupBy) {
                groupByColumnUniqueValue.forEach((col) => {
                  newData[xAxis] = label;
                  newData[seriesField] = col;
                  modifiedData.push(newData);
                });
              } else {
                newData[xAxis] = label;
                modifiedData.push(newData);
              }
            }
          }
        });
        return modifiedData;
      }
    }
    case 'quarterly': {
      const modifiedData = data;
      const xAxisData = data.map((key) => key[xAxis]);
      const years = Array.from(
        new Set(xAxisData.map((xData) => xData.split(' ')[1]))
      ).sort();
      const quarters = Array.from(
        new Set(xAxisData.map((xData) => xData.split(' ')[0]))
      );

      years.forEach((year) => {
        quarters.forEach((quarter) => {
          const newData: DataRow = {};
          yAxisList.forEach((y) => (newData[y] = 0));
          const label = `${quarter} ${year}`;
          if (!xAxisData.includes(label)) {
            if (isGroupBy)
              groupByColumnUniqueValue.forEach((col) => {
                newData[xAxis] = label;
                newData[seriesField] = col;
                modifiedData.push(newData);
              });
            else {
              newData[xAxis] = label;
              modifiedData.push(newData);
            }
          }
        });
      });
      return modifiedData;
    }

    default:
      return data;
  }
};
const getSeriesType = (type: TimeSeriesType) => {
  switch (type) {
    case 'area':
      return 'line';
    case 'stack':
      return 'bar';
    default:
      return type;
  }
};

const getPercentageData = (datasets: Dataset[]) => {
  const percentages: Record<string, string[]> = {};
  datasets.forEach((dataset) => {
    const labelPercentages = dataset?.data?.map((value, index) => {
      const total = datasets.reduce((acc, currDataset) => {
        return acc + currDataset.data[index];
      }, 0);
      const percentageValue = (value / total) * 100;
      return Number.isNaN(percentageValue) ? '0' : percentageValue.toFixed(2);
    });
    percentages[dataset.label] = labelPercentages;
  });

  return percentages;
};

const getCumulativeBarData = (
  datasets: Dataset[],
  isShowCumulativeBar: boolean
): Dataset[] => {
  if (!isShowCumulativeBar) return datasets;
  return datasets?.map((dataset) => {
    let cumulativeSum = 0;
    const cumulativeArray = dataset?.data?.map((value) => {
      cumulativeSum += value;
      return cumulativeSum;
    });
    return {
      label: dataset.label,
      data: cumulativeArray,
    };
  });
};
const getSeriesData = ({
  labelSettings,
  backGroundColor,
  customSettings,
  datasets,
  type,
  isShowPercentageFullStack,
}: GetSeriesDataParams) => {
  const series = datasets.map((dataset) => ({
    data: isShowPercentageFullStack
      ? getPercentageData(datasets)[dataset.label] || 0
      : dataset.data,
    type: getSeriesType(type),
    name: dataset.label,
    label: {
      show: labelSettings.show,
      position: labelSettings.position,
      formatter(d: { data: any }) {
        return addPrefixAndSuffix(
          numberFormatter(d.data?.[1], customSettings.numberFormatter),
          customSettings.labelPrefix,
          customSettings.labelSuffix
        );
      },
    },
    emphasis: {
      focus: 'series',
    },
    ...(type === 'area' ? { areaStyle: {} } : { areaStyle: { opacity: 0 } }),
    ...(type === 'bar'
      ? {
          barWidth: `${customSettings?.barWidth || 0}%`,
          showBackground: backGroundColor?.show,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          itemStyle: {
            borderRadius: customSettings?.barRadius,
          },
        }
      : {}),
    ...(type === 'stack' ? { stack: 'total' } : {}),
  }));

  return series;
};

export const getSeriesOption = ({
  chartOptions,
  data,
  backGroundColor,
  customSettings,
  labelSettings,
  colorOptions,
  defaultOptions,
  legendSettings,
  axisSettings,
  legendPosition,
}: GetSeriesOptionParams) => {
  const timeSeriesSettings = chartOptions?.timeSeriesSettings;
  const yAxisList = chartOptions.yAxisList || [];
  const xAxis = chartOptions.xAxis || '';
  const type = timeSeriesSettings?.seriesType?.[0]?.type || 'bar';
  const isShowPercentageFullStack =
    !!customSettings?.showFullStacked && type === 'stack';
  const isShowCumulativeBar = !!customSettings?.cumulativeBar && type === 'bar';
  const seriesField = chartOptions.seriesField || '';
  const isGroupBy =
    !!chartOptions.isMultiDimension && seriesField !== 'ungrouped';
  const formatValue = timeSeriesSettings?.groupBySettings?.value;
  const format = (formatValue?.split('____')?.[0]?.toLowerCase() ||
    'monthly') as TimeSeriesGroupType;
  const isFillXaxisValue = !!timeSeriesSettings?.groupBySettings?.fillXAxis;
  const selectedSeries = chartOptions?.selectedSeries || [];
  const isShowLegendFilteredData =
    isGroupBy && customSettings?.showSelectLegend && selectedSeries?.length;
  const filteredData = isShowLegendFilteredData
    ? data.filter((row) => selectedSeries?.includes(row[seriesField]))
    : data;
  const finalData = isGroupBy && filteredData?.length ? filteredData : data;
  const groupByColumnUniqueValue: string[] = isGroupBy
    ? Array.from(
        new Set(
          finalData
            ?.map((item) => item[seriesField || ''])
            ?.filter((value) => value)
        )
      )
    : [];
  const fillXaxisData = getFillXaxisData({
    data: finalData,
    format,
    isFillXaxisValue,
    xAxis,
    yAxisList,
    groupByColumnUniqueValue,
    isGroupBy,
    seriesField,
  });
  const sortedData = sortData(format, fillXaxisData, xAxis);
  const xAxisData = getXaxisData({
    data: sortedData,
    xAxis,
    format,
    isGroupBy,
  });
  const datasets = getDataset({
    data: sortedData,
    yAxisList,
    isGroupBy,
    seriesField,
    xAxis,
    xAxisData,
    groupByColumnUniqueValue,
    isShowPercentageFullStack,
    format,
  });
  const cumulativeBarDataset = getCumulativeBarData(
    datasets,
    isShowCumulativeBar
  );
  const series = getSeriesData({
    backGroundColor,
    customSettings,
    datasets: cumulativeBarDataset,
    labelSettings,
    type,
    isShowPercentageFullStack,
  });
  const options = {
    ...colorOptions,
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
        tooltipFormatter(params, chartOptions, isShowPercentageFullStack),
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
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        show: !chartOptions.customSettings?.hideXAxisLabels,
        color: chartOptions.labelSettings?.XAxisStyle?.color || '#000000',
        fontSize: chartOptions.labelSettings?.XAxisStyle?.size || 14,
        fontWeight: chartOptions.labelSettings?.XAxisStyle?.weight || 400,
        fontFamily: chartOptions.labelSettings?.XAxisStyle?.family,
        interval: 0,
        rotate: customSettings.customRotation || customSettings.xRotation,
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
      data: xAxisData,
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
      data: !isGroupBy
        ? yAxisList?.map((value) =>
            isShowPercentageFullStack ? `percentage of ${value}` : value
          )
        : groupByColumnUniqueValue?.map((value) =>
            isShowPercentageFullStack ? `percentage of ${value}` : value
          ),
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
    series,
  };
  return options;
};

export const getFormat = (value: FloatingDropDownOption, dbName: string) => {
  const formatValue = value.value?.toLowerCase();
  const databaseName = dbName?.toLowerCase();
  const commonDatabase = [BIGQUERY, , MSSQL, MYSQL, MONGODB, CLICKHOUSE, AWSS3];
  switch (formatValue) {
    case 'monthly':
      if (commonDatabase.includes(databaseName)) return '%b - %Y';
      return 'Mon - yyyy';
    case 'yearly':
      if (commonDatabase.includes(databaseName)) return '%Y';
      return 'yyyy';
    case 'quarterly':
      if (commonDatabase.includes(databaseName)) return '%Q %Y';
      return 'Q yyyy';
    case 'daily':
      if (commonDatabase.includes(databaseName)) return '%Y-%m-%d';
      return 'yyyy-mm-dd';
    case 'weekly':
      if (commonDatabase.includes(databaseName)) return '%Y-%m-%W';
      return 'yyyy-mm-WW';
    default:
      if (commonDatabase.includes(databaseName)) return '%Y-%m-%d';
      return 'Mon - yyyy';
  }
};
