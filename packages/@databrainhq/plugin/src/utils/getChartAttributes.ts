/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { colors } from './colors';
import { CHART_TYPES, timeStamp } from '@/consts';

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
const groupByMap = {
  yearly: (date: Date) => date.getFullYear(),
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

type GetLabelsParams = {
  data: Record<string, any>[] | undefined;
  xAxis: string | undefined;
  isDynamicXaxis: boolean;
  isGroupXAxis: boolean;
};
export const getLabels = ({
  data,
  xAxis,
  isDynamicXaxis,
  isGroupXAxis,
}: GetLabelsParams): string[] | undefined => {
  return Array.isArray(data)
    ? isDynamicXaxis || isGroupXAxis
      ? [...new Set(data?.map((i) => xAxis && i[xAxis]))]
      : data?.map((i) => xAxis && i[xAxis])
    : [];
};

export type GetDatasetsParams = {
  data: Record<string, any>[] | undefined;
  yAxisList: string[] | undefined;
  xAxis: string | undefined;
  isDynamicXaxis: boolean;
  isCumulativeBar: boolean;
  chartType: string;
  seriesType: string;
  isGroupXAxis: boolean;
};
export const getDatasets = ({
  data,
  yAxisList,
  xAxis,
  isDynamicXaxis,
  isCumulativeBar,
  chartType,
  seriesType,
  isGroupXAxis,
}: GetDatasetsParams):
  | {
      label: string;
      data: any[] | undefined;
      borderColor: string;
    }[]
  | undefined => {
  const labels = getLabels({ data, isDynamicXaxis, isGroupXAxis, xAxis });
  if (yAxisList === undefined) return undefined;
  let datasets = yAxisList.map((key, i) => ({
    label: key,
    data: Array.isArray(data)
      ? isDynamicXaxis || isGroupXAxis
        ? labels?.map((label) => {
            const filteredData = data.filter(
              (item) => item[xAxis || ''] === label
            );
            return filteredData.reduce(
              (sum, item) => sum + Number(item[yAxisList[i]]) || 0,
              0
            );
          })
        : data?.map((item) => item[yAxisList[i]])
      : [],
    borderColor: colors[i],
  }));
  if (
    isCumulativeBar &&
    (chartType === CHART_TYPES.bar ||
      (chartType === CHART_TYPES.timeSeries && seriesType === 'bar'))
  ) {
    datasets = datasets.map((dataset: any) => {
      let cumulativeSum = 0;
      const cumulativeArray = dataset?.data?.map((value: any) => {
        cumulativeSum += value;
        return cumulativeSum;
      });
      return {
        label: dataset.label,
        data: cumulativeArray,
        borderColor: dataset.borderColor,
      };
    });
  }
  return datasets;
};

type GetFunnelDataParams = {
  data: Record<string, any>[] | undefined;
  measure: string | undefined;
  step: string | undefined;
};
export const getFunnelData = ({ data, measure, step }: GetFunnelDataParams) => {
  return Array.isArray(data) && step && measure
    ? data?.map((item) => ({
        value: item[measure],
        name: item[step],
      }))
    : [];
};

type GetSingleValueDataParams = {
  data: Record<string, any>[] | undefined;
  singleValue: string | undefined;
};
export const getSingleValueData = ({
  data,
  singleValue,
}: GetSingleValueDataParams) => {
  return Array.isArray(data) && singleValue
    ? data?.map((item) => item[singleValue])
    : [];
};

type GetXaxisDataParams = {
  isTimeSeries: boolean;
  xAxis: string | undefined;
  data: Record<string, any>[] | undefined;
  selectedFormat: string | undefined;
  fillXAxis: boolean;
};
export const getXAxisData = ({
  isTimeSeries,
  xAxis,
  data,
  selectedFormat,
  fillXAxis,
}: GetXaxisDataParams) => {
  let xAxisData: any[];
  let xData = Array.from(
    new Set(
      data?.map((item) => {
        if (isTimeSeries && item[xAxis || '']) {
          const itemValue = item[xAxis || ''];
          const value =
            typeof itemValue === 'string'
              ? itemValue?.split('T')?.[0]
              : itemValue;
          const date = new Date(value);
          const groupByFunction = (groupByMap as any)[
            selectedFormat || 'monthly'
          ];
          return groupByFunction(date);
        }
        return item[xAxis || ''];
      })
    )
  );
  if (selectedFormat === timeStamp.daily) {
    xData = xData
      .map((dateString) => new Date(dateString))
      .sort((a: any, b: any) => a - b)
      .map((date) =>
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
  }
  xAxisData =
    isTimeSeries && selectedFormat === timeStamp.month
      ? xData?.sort((a, b) => {
          const [monthA, yearA] = a?.toString().split(' - ');
          const [monthB, yearB] = b?.toString().split(' - ');

          if (yearA !== yearB) {
            return parseInt(yearA, 10) - parseInt(yearB, 10);
          }
          return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
        })
      : xData;
  if (isTimeSeries && fillXAxis && selectedFormat === timeStamp.month) {
    const years = Array.from(
      new Set(xAxisData?.map((item) => item.split(' - ')[1]))
    ).sort();
    const startingMonth = monthNames.findIndex((month) => {
      return xAxisData.some((item) =>
        item.startsWith(`${month} - ${years[0]}`)
      );
    });
    const lastMonthPos = monthNames
      .slice()
      .reverse()
      .findIndex((month) => {
        return xAxisData.some((item) => {
          const [mon, year] = item.split(' - ');
          return (
            year === years[years.length - 1] &&
            item.endsWith(`${month} - ${year}`)
          );
        });
      });

    const endingMonth = monthNames.length - lastMonthPos;
    const modifiedData: any[] = [];
    if (years.length > 1) {
      years.forEach((year) => {
        monthNames.forEach((month, index) => {
          const label = `${month} - ${year}`;
          if (year === years[0] && index >= startingMonth) {
            modifiedData.push(label);
          } else if (year === years[years.length - 1] && index < endingMonth) {
            modifiedData.push(label);
          } else if (year !== years[0] && year !== years[years.length - 1]) {
            modifiedData.push(label);
          }
        });
      });
    } else {
      monthNames.forEach((month, index) => {
        const label = `${month} - ${years[0]}`;
        if (index >= startingMonth && index < endingMonth) {
          modifiedData.push(label);
        }
      });
    }
    xAxisData = [...modifiedData];
  } else if (
    isTimeSeries &&
    fillXAxis &&
    selectedFormat === timeStamp.quarter
  ) {
    const updatedArray: any[] = [];
    const quarters = Array.from(
      new Set(xAxisData?.map((quarter) => quarter.split(' ')[0]))
    );
    const years = Array.from(
      new Set(xAxisData?.map((quarter) => quarter.split(' ')[1]))
    ).sort();
    for (let year = 0; year < years.length; year += 1) {
      for (let quarter = 1; quarter <= 4; quarter += 1) {
        const quarterString = `Q${quarter} ${years[year]}`;
        updatedArray.push(quarterString);
      }
    }
    xAxisData = updatedArray;
  }
  return xAxisData;
};
const getYAxisData = ({
  data,
  seriesField,
}: {
  data: Record<string, any>[] | undefined;
  seriesField: string | undefined;
}) => {
  return Array.from(new Set(data?.map((item) => item[seriesField || ''])));
};

export type GetSeriesDataParams = {
  data: Record<string, any>[] | undefined;
  xAxis: string | undefined;
  yAxisList: string[] | undefined;
  seriesField: string | undefined;
  isTimeSeries: boolean;
  selectedFormat: string | undefined;
  fillXAxis: boolean;
  isCumulativeBar: boolean;
  chartType: string;
  seriesType: string;
};

export const getSeriesData = ({
  data,
  seriesField,
  isTimeSeries,
  xAxis,
  selectedFormat,
  fillXAxis,
  yAxisList,
  isCumulativeBar,
  chartType,
  seriesType,
}: GetSeriesDataParams) => {
  const yAxisData = getYAxisData({ data, seriesField });
  const xAxisData = getXAxisData({
    data,
    isTimeSeries,
    xAxis,
    selectedFormat,
    fillXAxis,
  });
  let seriesDataResult: any = yAxisData?.map((yAxisValue) => {
    const yAxisDataFiltered = data?.filter(
      (item) => item[seriesField || ''] === yAxisValue
    );
    const yAxisDataArray = xAxisData?.map((xAxisValue) => {
      if (isTimeSeries && xAxisValue) {
        const groupByFunction = (groupByMap as any)[
          selectedFormat || 'monthly'
        ];
        const filteredItems = yAxisDataFiltered?.filter((item) => {
          const itemValue = item[xAxis || ''];
          const value =
            typeof itemValue === 'string'
              ? itemValue?.split('T')?.[0]
              : itemValue;
          const date = new Date(value);
          return groupByFunction(date) === xAxisValue;
        });
        let measureSum: any;
        if (filteredItems?.length) {
          measureSum = filteredItems?.reduce((sum, item) => {
            return sum + (Number(item[yAxisList?.[0] || '']) || 0);
          }, 0);
        }
        const isValPresent = measureSum?.toString();
        return isValPresent ? measureSum : null;
      }
      const measureVal = yAxisDataFiltered?.find(
        (item) => item[xAxis || ''] === xAxisValue
      )?.[yAxisList?.[0] || ''];
      const isValPresent = measureVal?.toString();
      return isValPresent ? measureVal : null;
    });
    return {
      name: yAxisValue,
      data: yAxisDataArray,
    };
  });

  if (
    isCumulativeBar &&
    (chartType === CHART_TYPES.bar ||
      (chartType === CHART_TYPES.timeSeries && seriesType === 'bar'))
  ) {
    seriesDataResult = seriesDataResult?.map((dataset: any) => {
      let cumulativeSum = 0;
      const cumulativeArray = dataset?.data?.map((value: any) => {
        cumulativeSum += value;
        return cumulativeSum;
      });
      return {
        name: dataset.name,
        data: cumulativeArray,
      };
    });
  }
  return seriesDataResult;
};

export type GetChartAttributesParams = {
  data: Record<string, any>[] | undefined;
  yAxisList: string[] | undefined;
  xAxis: string | undefined;
  measure: string | undefined;
  step: string | undefined;
  singleValue: string | undefined;
  seriesField: string | undefined;
  isTimeSeries: boolean;
  selectedFormat: string | undefined;
  fillXAxis: boolean;
  isDynamicXaxis: boolean;
  isCumulativeBar: boolean;
  chartType: string;
  seriesType: string;
  isGroupXAxis: boolean;
};
export const getChartAttributes = ({
  data,
  measure,
  singleValue,
  step,
  xAxis,
  yAxisList,
  seriesField,
  isTimeSeries,
  selectedFormat,
  fillXAxis,
  isDynamicXaxis,
  isCumulativeBar,
  chartType,
  seriesType,
  isGroupXAxis,
}: GetChartAttributesParams) => {
  const labels: string[] | undefined = Array.isArray(data)
    ? isDynamicXaxis || isGroupXAxis
      ? [...new Set(data?.map((i) => xAxis && i[xAxis]))]
      : data?.map((i) => xAxis && i[xAxis])
    : [];
  let datasets: any = yAxisList?.map((key, i) => ({
    label: key,
    data: Array.isArray(data)
      ? isDynamicXaxis || isGroupXAxis
        ? labels?.map((label) => {
            const filteredData = data.filter(
              (item) => item[xAxis || ''] === label
            );
            return filteredData.reduce(
              (sum, item) => sum + Number(item[yAxisList[i]]) || 0,
              0
            );
          })
        : data?.map((item) => item[yAxisList[i]])
      : [],
    borderColor: colors[i],
  }));
  if (
    isCumulativeBar &&
    (chartType === CHART_TYPES.bar ||
      (chartType === CHART_TYPES.timeSeries && seriesType === 'bar'))
  ) {
    datasets = datasets?.map((dataset: any) => {
      let cumulativeSum = 0;
      const cumulativeArray = dataset?.data?.map((value: any) => {
        cumulativeSum += value;
        return cumulativeSum;
      });
      return {
        label: dataset.label,
        data: cumulativeArray,
        borderColor: dataset.borderColor,
      };
    });
  }

  const funnelData =
    Array.isArray(data) && step && measure
      ? data?.map((item) => ({
          value: item[measure],
          name: item[step],
        }))
      : [];
  const singleValueData =
    Array.isArray(data) && singleValue
      ? data?.map((item) => item[singleValue])
      : [];

  // const xAxisData = Array.from(new Set(data?.map((item) => item[xAxis || ''])));

  // const seriesData = yAxisData.map((yAxisValue) => {
  //   const yAxisDataFiltered = data?.filter(
  //     (item) => item[seriesField || ''] === yAxisValue
  //   );
  //   const yAxisDataArray = xAxisData.map((xAxisValue) => {
  //     const measureVal =
  //       yAxisDataFiltered?.find((item) => item[xAxis || ''] === xAxisValue)?.[
  //         yAxisList?.[0] || ''
  //       ] || 0;
  //     return measureVal;
  //   });
  //   return {
  //     name: yAxisValue,
  //     data: yAxisDataArray,
  //   };
  // });

  const yAxisData = Array.from(
    new Set(data?.map((item) => item[seriesField || '']))
  );
  let xAxisData: any[];
  let xData = Array.from(
    new Set(
      data?.map((item) => {
        if (isTimeSeries && item[xAxis || '']) {
          const itemValue = item[xAxis || ''];
          const value =
            typeof itemValue === 'string'
              ? itemValue?.split('T')?.[0]
              : itemValue;
          const date = new Date(value);
          const groupByFunction = (groupByMap as any)[
            selectedFormat || 'monthly'
          ];
          return groupByFunction(date);
        }
        return item[xAxis || ''];
      })
    )
  );
  if (selectedFormat === timeStamp.daily) {
    xData = xData
      .map((dateString) => new Date(dateString))
      .sort((a: any, b: any) => a - b)
      .map((date) =>
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
  }
  xAxisData =
    isTimeSeries && selectedFormat === timeStamp.month
      ? xData?.sort((a, b) => {
          const [monthA, yearA] = a?.toString().split(' - ');
          const [monthB, yearB] = b?.toString().split(' - ');

          if (yearA !== yearB) {
            return parseInt(yearA, 10) - parseInt(yearB, 10);
          }
          return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
        })
      : xData;
  if (isTimeSeries && fillXAxis && selectedFormat === timeStamp.month) {
    const years = Array.from(
      new Set(xAxisData?.map((item) => item.split(' - ')[1]))
    ).sort();
    const startingMonth = monthNames.findIndex((month) => {
      return xAxisData.some((item) =>
        item.startsWith(`${month} - ${years[0]}`)
      );
    });
    const lastMonthPos = monthNames
      .slice()
      .reverse()
      .findIndex((month) => {
        return xAxisData.some((item) => {
          const [mon, year] = item.split(' - ');
          return (
            year === years[years.length - 1] &&
            item.endsWith(`${month} - ${year}`)
          );
        });
      });

    const endingMonth = monthNames.length - lastMonthPos;
    const modifiedData: any[] = [];
    if (years.length > 1) {
      years.forEach((year) => {
        monthNames.forEach((month, index) => {
          const label = `${month} - ${year}`;
          if (year === years[0] && index >= startingMonth) {
            modifiedData.push(label);
          } else if (year === years[years.length - 1] && index < endingMonth) {
            modifiedData.push(label);
          } else if (year !== years[0] && year !== years[years.length - 1]) {
            modifiedData.push(label);
          }
        });
      });
    } else {
      monthNames.forEach((month, index) => {
        const label = `${month} - ${years[0]}`;
        if (index >= startingMonth && index < endingMonth) {
          modifiedData.push(label);
        }
      });
    }
    xAxisData = [...modifiedData];
  } else if (
    isTimeSeries &&
    fillXAxis &&
    selectedFormat === timeStamp.quarter
  ) {
    const updatedArray: any[] = [];
    const quarters = Array.from(
      new Set(xAxisData?.map((quarter) => quarter.split(' ')[0]))
    );
    const years = Array.from(
      new Set(xAxisData?.map((quarter) => quarter.split(' ')[1]))
    ).sort();
    for (let year = 0; year < years.length; year += 1) {
      for (let quarter = 1; quarter <= 4; quarter += 1) {
        const quarterString = `Q${quarter} ${years[year]}`;
        updatedArray.push(quarterString);
      }
    }
    xAxisData = updatedArray;
  }

  let seriesData: any = yAxisData?.map((yAxisValue) => {
    const yAxisDataFiltered = data?.filter(
      (item) => item[seriesField || ''] === yAxisValue
    );
    const yAxisDataArray = xAxisData?.map((xAxisValue) => {
      if (isTimeSeries && xAxisValue) {
        const groupByFunction = (groupByMap as any)[
          selectedFormat || 'monthly'
        ];
        const filteredItems = yAxisDataFiltered?.filter((item) => {
          const itemValue = item[xAxis || ''];
          const value =
            typeof itemValue === 'string'
              ? itemValue?.split('T')?.[0]
              : itemValue;
          const date = new Date(value);
          return groupByFunction(date) === xAxisValue;
        });
        const measureSum = filteredItems?.reduce((sum, item) => {
          return sum + (Number(item[yAxisList?.[0] || '']) || 0);
        }, 0);
        return measureSum || 0;
      }
      const measureVal =
        yAxisDataFiltered?.find((item) => item[xAxis || ''] === xAxisValue)?.[
          yAxisList?.[0] || ''
        ] || 0;
      return measureVal;
    });
    return {
      name: yAxisValue,
      data: yAxisDataArray,
    };
  });

  if (
    isCumulativeBar &&
    (chartType === CHART_TYPES.bar ||
      (chartType === CHART_TYPES.timeSeries && seriesType === 'bar'))
  ) {
    seriesData = seriesData?.map((dataset: any) => {
      let cumulativeSum = 0;
      const cumulativeArray = dataset?.data?.map((value: any) => {
        cumulativeSum += value;
        return cumulativeSum;
      });
      return {
        name: dataset.name,
        data: cumulativeArray,
      };
    });
  }

  return {
    labels,
    datasets,
    funnelData,
    singleValueData,
    xAxisData,
    seriesData,
  };
};

export const transformDataToSankey = ({
  data,
  source,
  target,
  value,
  sankeyColors,
}: {
  data: Record<string, any>[];
  source: string;
  target: string;
  value: any;
  sankeyColors: string[] | undefined;
}) => {
  // Remove duplicates from the data based on source, target, and values
  const uniqueData: Record<string, any>[] = [];
  const sankeyData: string[] = [];
  const uniqueNodes: string[] = [];
  data.forEach((item) => {
    if (item[source] !== item[target]) {
      let hasNoCycle: boolean = true;
      sankeyData?.map((val) => {
        const [src, tgt] = val.split('^^^^^^');
        if (tgt === item[source] && src === item[target]) {
          hasNoCycle = false;
        }
      });
      if (hasNoCycle) {
        sankeyData.push(`${item[source]}^^^^^^${item[target]}`);
        uniqueData.push({
          source: item[source].toString(),
          target: item[target].toString(),
          value: item[value],
        });
      }
    }
  });
  const sources = sankeyData?.map((item) => item.split('^^^^^^')[0]);
  const targets = sankeyData?.map((item) => item.split('^^^^^^')[1]);

  // Create nodes for sources
  sources.forEach((src) => {
    if (!uniqueNodes.includes(src)) {
      uniqueNodes.push(src);
    }
  });
  // Create nodes for targets
  targets.forEach((tgt) => {
    if (!uniqueNodes.includes(tgt)) {
      uniqueNodes.push(tgt);
    }
  });
  let k = -1;
  const nodes: { name: any }[] = uniqueNodes?.map((node) => {
    if (k === sankeyColors?.length) {
      k = 0;
    } else {
      k += 1;
    }
    return {
      name: node.toString(),
      ...(sankeyColors?.length
        ? {
            itemStyle: {
              color: sankeyColors[k],
            },
          }
        : {}),
    };
  });

  return { nodes, links: uniqueData };
};
