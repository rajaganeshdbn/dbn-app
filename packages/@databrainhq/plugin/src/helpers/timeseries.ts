/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { numberFormatter } from './numberFormatter';
import { timeStamp } from '@/consts';
import {
  BackgroundSettings,
  CustomSettings,
  LabelSettings,
  TimeSeriesGroupType,
  TimeSeriesType,
} from '@/types';
import { addPrefixAndSuffix } from '@/utils';

interface TimeSeriesData {
  timeStampKey: string;
  data: Record<string, any>[];
  values?: string[];
}
type GetTimeSeriesData = {
  dataArray: Record<string, any>[];
  timeStampKey: string;
  valuekeys: string[];
  type: TimeSeriesType;
  groupBy: TimeSeriesGroupType;
  labelSettings: LabelSettings;
  customSettings: CustomSettings;
  backGroundColor: BackgroundSettings;
  fillXAxis: boolean;
  isCumulativeBar: boolean;
  customData: any;
  yAxisList: string[];
  hasPercentSymbol: boolean;
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
export const groupByMap = {
  yearly: (date: Date) => date.getFullYear().toString(),
  monthly: (date: Date) => {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} - ${year}`;
  },
  weekly: (date: Date) => {
    const firstDayOfWeek = new Date(date.getTime());
    firstDayOfWeek.setDate(date.getDate() - date.getDay());
    return firstDayOfWeek.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  },
  daily: (date: Date) => {
    return `${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`;
  },
  quarterly: (date: Date) => {
    const month = date.getMonth();
    const quarterNum = Math.floor(month / 3) + 1;
    const year = date.getFullYear();
    return `Q${quarterNum} ${year}`;
  },
};
const getDatasetArray = ({
  dataArray,
  groupBy,
  timeStampKey,
  valuekeys,
}: Pick<
  GetTimeSeriesData,
  'valuekeys' | 'dataArray' | 'timeStampKey' | 'groupBy'
>) => {
  const sortedDataArray = dataArray.sort(
    (a, b) =>
      new Date(a[timeStampKey]).getTime() - new Date(b[timeStampKey]).getTime()
  );
  const groupByFn = groupByMap[groupBy];
  return valuekeys.map((valuekey) =>
    sortedDataArray.reduce((acc, curr) => {
      const itemValue = curr[timeStampKey || ''];
      const value =
        typeof itemValue === 'string' ? itemValue?.split('T')?.[0] : itemValue;
      const date = new Date(value);
      const timeGrain = groupByFn(date);
      acc.set(timeGrain, (acc.get(timeGrain) || 0) + Number(curr[valuekey]));
      return acc;
    }, new Map())
  );
};

const getModifiedDatasetArray = ({
  dataset,
  groupBy,
  fillXAxis,
}: {
  dataset: Record<string, any>[];
} & Pick<GetTimeSeriesData, 'groupBy' | 'fillXAxis'>) => {
  const modifiedData: any[] = [];

  if (fillXAxis) {
    switch (groupBy) {
      case timeStamp.month:
        {
          const years = Array.from(
            new Set(Object.keys(dataset[0]).map((key) => key.split(' - ')[1]))
          ).sort();

          const startingMonth =
            monthNames.findIndex((month) => {
              return dataset[0][`${month} - ${years[0]}`] !== undefined;
            }) + 1;
          const endingMonth =
            monthNames.findIndex((month) => {
              return (
                dataset[0][`${month} - ${years[years.length - 1]}`] !==
                undefined
              );
            }) + 1;
          if (years.length > 1) {
            dataset.forEach((item) => {
              const newData: any = {};
              years.forEach((year) => {
                monthNames.forEach((month, index) => {
                  const label: any = `${month} - ${year}`;
                  if (monthNames.includes(month) && item[label] === undefined) {
                    if (year === years[0] && index >= startingMonth) {
                      newData[label] = 0;
                    } else if (
                      year === years[years.length - 1] &&
                      index < endingMonth
                    ) {
                      newData[label] = 0;
                    } else if (
                      year !== years[0] &&
                      year !== years[years.length - 1]
                    ) {
                      newData[label] = item[label] || 0;
                    }
                  } else {
                    newData[label] = item[label] || 0;
                  }
                });
              });
              modifiedData.push(newData);
            });
          } else {
            dataset.forEach((item) => {
              const newData: any = {};
              monthNames.forEach((month, index) => {
                const label: any = `${month} - ${years[0]}`;
                if (monthNames.includes(month) && item[label] === undefined) {
                  if (index >= startingMonth && index < endingMonth) {
                    newData[label] = 0;
                  }
                } else {
                  newData[label] = item[label] || 0;
                }
              });
              modifiedData.push(newData);
            });
          }
        }
        break;
      case timeStamp.quarter:
        {
          const quarters = Array.from(
            new Set(Object.keys(dataset[0]).map((key) => key.split(' ')[0]))
          );
          const years = Array.from(
            new Set(Object.keys(dataset[0]).map((key) => key.split(' ')[1]))
          ).sort();
          dataset.forEach((item) => {
            const newData: any = {};
            years.forEach((year) => {
              quarters.forEach((quarter) => {
                const label = `${quarter} ${year}`;
                newData[label] = item[label] || 0;
              });
            });
            modifiedData.push(newData);
          });
        }
        break;
      default:
        break;
    }
  }
  return modifiedData;
};
const calculateCumulativeSumArray = (data: any) => {
  let cumulativeSum = 0;
  const cumulativeSumArray = data.map((entry: any) => {
    cumulativeSum += entry[1];
    return [entry[0], cumulativeSum];
  });
  return cumulativeSumArray;
};
const getSeriesData = ({
  backGroundColor,
  customSettings,
  dataset,
  isCumulativeBar,
  labelSettings,
  type,
  valuekeys,
  yAxisList,
  customData,
  hasPercentSymbol,
}: { dataset: Record<string, any>[] } & Pick<
  GetTimeSeriesData,
  | 'customSettings'
  | 'yAxisList'
  | 'isCumulativeBar'
  | 'type'
  | 'labelSettings'
  | 'valuekeys'
  | 'backGroundColor'
  | 'customData'
  | 'hasPercentSymbol'
>) => {
  return dataset.map((set, i) => {
    const stackedData = customSettings?.showFullStacked
      ? customData[yAxisList[i]]
      : Object.entries(set);
    return {
      data:
        isCumulativeBar && type === 'bar'
          ? calculateCumulativeSumArray(Object.entries(set))
          : stackedData,
      type: type === 'area' ? 'line' : type === 'stack' ? 'bar' : type,
      name: hasPercentSymbol ? `percentage of ${valuekeys[i]}` : valuekeys[i],
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
    };
  });
};
export const getTimeSeriesData = ({
  dataArray,
  timeStampKey,
  type,
  valuekeys,
  groupBy,
  labelSettings,
  customSettings,
  backGroundColor,
  fillXAxis,
  isCumulativeBar,
  customData,
  yAxisList,
  hasPercentSymbol,
}: GetTimeSeriesData) => {
  const dataset = getDatasetArray({
    dataArray,
    groupBy,
    timeStampKey,
    valuekeys,
  }).map((map) => Object.fromEntries(map as any));
  const isFillAxisValue =
    fillXAxis && [timeStamp.month, timeStamp.quarter].includes(groupBy);
  const modifiedData = isFillAxisValue
    ? getModifiedDatasetArray({ dataset, fillXAxis, groupBy })
    : [];

  const series = isFillAxisValue
    ? modifiedData.map((set, i) => ({
        data:
          isCumulativeBar && type === 'bar'
            ? calculateCumulativeSumArray(Object.entries(set))
            : Object.entries(set).sort((a, b) => {
                const dateA: Date = new Date(a[0]);
                const dateB: Date = new Date(b[0]);
                return dateA.getFullYear() - dateB.getFullYear();
              }),
        type: type === 'area' ? 'line' : type === 'stack' ? 'bar' : type,
        name: hasPercentSymbol ? `percentage of ${valuekeys[i]}` : valuekeys[i],
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
        ...(type === 'area'
          ? { areaStyle: {} }
          : { areaStyle: { opacity: 0 } }),
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
      }))
    : getSeriesData({
        backGroundColor,
        customData,
        customSettings,
        dataset,
        isCumulativeBar,
        labelSettings,
        type,
        valuekeys,
        yAxisList,
        hasPercentSymbol,
      });
  return series;
};
export const isTimeSeriesDataValid = ({
  data,
  timeStampKey,
}: TimeSeriesData): boolean => {
  // Check if data is an array and contains at least one item
  if (!Array.isArray(data) || data.length < 1) {
    return false;
  }

  // Check if each item has a valid date and value

  return data.every((item) => {
    const date = new Date(item[timeStampKey]);
    return !Number.isNaN(date.getTime());
  });
};
