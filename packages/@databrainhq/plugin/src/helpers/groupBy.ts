/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import { CHART_TYPES } from '@/consts';
import { ChartSettingsType, DrillDownSetting } from '@/types';

/* eslint-disable max-params */
export const groupByMultipleKeys = (
  rawData: any[] | undefined,
  keys: string[],
  measureKey: string
) => {
  const data = rawData?.map((d) => ({
    ...d,
    [measureKey]: parseInt(d[measureKey], 10),
  }));
  return data?.reduce((result, currentValue) => {
    const key = keys.reduce((key, k) => (key += currentValue[k]), '');
    if (!result[key]) {
      result[key] = { [measureKey]: 0 };
      keys.forEach((k) => (result[key][k] = currentValue[k]));
    }
    result[key][measureKey] += currentValue[measureKey];
    return result;
  }, {});
};
export const groupMeasures = (
  rawData: any[] | undefined,
  dimensionKey: string,
  measureKeys: string[]
) => {
  const data = rawData?.map((d) => {
    const newData = { ...d };
    measureKeys.forEach((measureKey) => {
      newData[measureKey] = Number(d[measureKey]);
    });
    return newData;
  });

  return data?.reduce((result, currentValue) => {
    const groupKey = currentValue[dimensionKey];
    if (!result[groupKey]) {
      result[groupKey] = { [dimensionKey]: groupKey };
      measureKeys.forEach((measureKey) => {
        result[groupKey][measureKey] = 0;
      });
    }
    measureKeys.forEach((measureKey) => {
      result[groupKey][measureKey] += currentValue[measureKey];
    });
    return result;
  }, {});
};

export const updateGroupData = (
  data: any[] | undefined,
  keys: string[],
  selectedGroupBy: string[],
  setGroupedData: (value: React.SetStateAction<Record<string, any>[]>) => void
) => {
  const measureKey = Object.keys(data?.[0] ?? []).filter(
    (key) => !selectedGroupBy.includes(key)
  );

  const groupedData = groupByMultipleKeys(data, keys, measureKey[0]);
  setGroupedData(Object.values(groupedData));
};
export const updateDrilledData = (
  data: any[] | undefined,
  setGroupedData: (value: React.SetStateAction<Record<string, any>[]>) => void,
  measureKeys: string[],
  dimenstionKey: string
) => {
  const groupedMeasuredData = groupMeasures(data, dimenstionKey, measureKeys);
  setGroupedData(Object.values(groupedMeasuredData));
};

export const findKeys = (arr: Record<string, any>[]) => {
  const filteredArr = arr.filter((obj) =>
    Object.values(obj).every((value) => value !== null)
  );
  const first10Objects = filteredArr.slice(0, 10);
  const allEntries = first10Objects.flatMap((obj) => Object.entries(obj));
  const keyCounts: Record<string, Record<string, number>> = {}; // A map of key -> value type counts

  // Count the number of occurrences of each value type for each key
  allEntries.forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (keyCounts[key]) {
      keyCounts[key][typeof value] = (keyCounts[key][typeof value] || 0) + 1;
    } else {
      keyCounts[key] = { [typeof value]: 1 };
    }
  });

  // Group keys by the majority value type
  const numberKeys: string[] = [];
  const stringKeys: string[] = [];
  Object.entries(keyCounts).forEach(([key, counts]) => {
    const majorityType = Object.entries(counts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    if (majorityType === 'number') {
      numberKeys.push(key);
    } else if (majorityType !== 'number') {
      stringKeys.push(key);
    }
  });
  return { numberKeys, stringKeys };
};

export const indentifyKeys = (arr: Record<string, any>[]) => {
  const first10Objects = arr.slice(0, 100);
  const allEntries = first10Objects.flatMap((obj) => Object.entries(obj));
  const keyCounts: Record<string, Record<string, number>> = {}; // A map of key -> value type counts

  // Count the number of occurrences of each value type for each key
  allEntries.forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (keyCounts[key]) {
      keyCounts[key][
        Number(value) || Number(value) === 0 ? 'number' : 'other'
      ] =
        (keyCounts[key][
          Number(value) || Number(value) === 0 ? 'number' : 'other'
        ] || 0) + 1;
    } else {
      keyCounts[key] = {
        [Number(value) || Number(value) === 0 ? 'number' : 'other']: 1,
      };
    }
  });

  // Group keys by the majority value type
  const numberKeys: string[] = [];
  const otherKeys: string[] = []; // Modified to store keys with types other than string
  Object.entries(keyCounts).forEach(([key, counts]) => {
    const majorityType = Object.entries(counts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    if (majorityType === 'number') {
      numberKeys.push(key);
    } else {
      otherKeys.push(key); // Modified to add keys with types other than string
    }
  });

  return { numberKeys, otherKeys }; // Modified to return both numberKeys and otherKeys
};

export const getEnabledChart = (data: any[]): string[] => {
  const { numberKeys, otherKeys } = indentifyKeys(data);
  const totalColumns = numberKeys.length + otherKeys.length;
  if (totalColumns === 1 && numberKeys.length) {
    return [CHART_TYPES.singleValue, CHART_TYPES.table, CHART_TYPES.gauge];
  }
  if (numberKeys.length === 0) {
    return [CHART_TYPES.table, CHART_TYPES.singleValue];
  }
  if (numberKeys.length >= 1) {
    const charts = Object.values(CHART_TYPES);
    if (totalColumns < 3)
      return charts.filter((chart) => chart !== CHART_TYPES.sankey);
    return charts;
  }
  return [];
};

export const autoDetectCharts = ({
  data,
  setChartSettings,
}: {
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  data: any[];
}) => {
  const { numberKeys, otherKeys } = indentifyKeys(data || []);
  const charts = getEnabledChart(data || []);

  if (numberKeys?.length === 1 && otherKeys?.length === 0) {
    setChartSettings((prev) => ({
      ...prev,
      chartType: charts
        .filter((c) => c !== CHART_TYPES.timeSeries)
        .includes(prev.chartType)
        ? prev.chartType
        : (CHART_TYPES.singleValue as 'singleValue'),
      singleValue: numberKeys.includes(prev.singleValue || '')
        ? prev.singleValue
        : numberKeys[0],
      yAxisList: prev.yAxisList?.filter((val) => numberKeys.includes(val))
        ?.length
        ? prev.yAxisList?.filter((val) => numberKeys.includes(val))
        : numberKeys,
      sankeyValues: [],
    }));
  } else if (numberKeys?.length === 0) {
    setChartSettings((prev) => ({
      ...prev,
      chartType: charts
        .filter((c) => c !== CHART_TYPES.timeSeries)
        .includes(prev.chartType)
        ? prev.chartType
        : 'table',
      yAxisList: prev.yAxisList?.filter((val) => otherKeys.includes(val))
        ?.length
        ? prev.yAxisList?.filter((val) => otherKeys.includes(val))
        : otherKeys,
      singleValue: otherKeys.includes(prev.singleValue || '')
        ? prev.singleValue
        : otherKeys[0],
      sankeyValues: [],
    }));
  } else {
    setChartSettings((prev) => ({
      ...prev,
      chartType: charts.includes(prev.chartType) ? prev.chartType : 'bar',
      yAxisList: prev.yAxisList?.filter((val) => numberKeys.includes(val))
        ?.length
        ? prev.yAxisList?.filter((val) => numberKeys.includes(val))
        : numberKeys,
      xAxis:
        otherKeys?.includes(prev.xAxis || '') ||
        numberKeys?.includes(prev.xAxis || '')
          ? prev.xAxis
          : otherKeys?.[0] || numberKeys?.[0],
      sankeyValues: [
        numberKeys?.[1] || otherKeys?.[0] || '',
        numberKeys?.[2] || otherKeys?.[1] || '',
        numberKeys?.[0] || '',
      ],
    }));
  }
};

export const defaultChartProperties = ({
  chartType,
  data,
  setChartSettings,
  groupbyList,
}: {
  data: any[];
  chartType: string;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  groupbyList: any[];
}) => {
  const { numberKeys, otherKeys } = indentifyKeys(data || []);
  const allKeys = [...numberKeys, otherKeys];
  const chartProperties = {
    yAxisList:
      chartType === CHART_TYPES.pie || chartType === CHART_TYPES.doughnut
        ? numberKeys.length
          ? [numberKeys?.[0]]
          : [otherKeys?.[0]]
        : chartType === CHART_TYPES.table
        ? [...numberKeys, ...otherKeys]
        : numberKeys.length
        ? numberKeys
        : [otherKeys?.[0]],
    stackTableCols:
      chartType === CHART_TYPES.horizontalStackTable
        ? numberKeys
        : [otherKeys?.[0]],
    xAxis: otherKeys?.[0] || numberKeys?.[0],
    singleValue: otherKeys?.[0] || numberKeys?.[0],
    step: otherKeys?.[0] || numberKeys?.[0],
    measure: numberKeys?.[0] || otherKeys?.[0],
    sankeyValues: [
      numberKeys?.[1] || otherKeys?.[0] || '',
      numberKeys?.[2] || otherKeys?.[1] || '',
      numberKeys?.[0] || '',
    ],
  };
  setChartSettings((prev) => ({
    ...prev,
    chartType: chartType as any,
    yAxisList: prev.yAxisList?.filter((v) =>
      chartProperties.yAxisList.includes(v)
    )?.length
      ? prev.yAxisList?.filter((v) => chartProperties.yAxisList.includes(v))
      : chartProperties.yAxisList,
    stackTableCols: prev.stackTableCols?.filter((v) =>
      chartProperties.stackTableCols.includes(v)
    )?.length
      ? prev.stackTableCols?.filter((v) =>
          chartProperties.stackTableCols.includes(v)
        )
      : chartProperties.stackTableCols,
    xAxis:
      prev.xAxis && [...otherKeys, ...numberKeys].includes(prev.xAxis)
        ? prev.xAxis
        : chartProperties.xAxis,
    singleValue:
      prev.singleValue &&
      [...otherKeys, ...numberKeys].includes(prev.singleValue)
        ? prev.singleValue
        : chartProperties.singleValue,
    measure:
      prev.measure && [...otherKeys, ...numberKeys].includes(prev.measure)
        ? prev.measure
        : chartProperties.measure,
    step:
      prev.step && [...otherKeys, ...numberKeys].includes(prev.step)
        ? prev.step
        : chartProperties.step,
    gaugeSettings: {
      ...prev.gaugeSettings,
      metric:
        prev.gaugeSettings?.metric &&
        [...otherKeys, ...numberKeys].includes(prev.gaugeSettings?.metric)
          ? prev.gaugeSettings?.metric
          : chartProperties.yAxisList?.[0],
      dimensions: groupbyList,
    },
    dynamicXAxis: {
      ...prev.dynamicXAxis,
      isEnabled: [
        CHART_TYPES.line,
        CHART_TYPES.bar,
        CHART_TYPES.area,
        CHART_TYPES.combo,
        CHART_TYPES.scatter,
        CHART_TYPES.bubble,
        CHART_TYPES.stack,
        CHART_TYPES.waterfall,
      ].includes(chartType)
        ? prev.dynamicXAxis?.isEnabled
        : false,
    },
    sankeyValues:
      prev.sankeyValues?.length &&
      allKeys.includes(prev.sankeyValues[0]) &&
      allKeys.includes(prev.sankeyValues[1]) &&
      allKeys.includes(prev.sankeyValues[2])
        ? prev.sankeyValues
        : chartProperties.sankeyValues,
  }));
};
export const drilldown = (
  // columnName: string | undefined,
  chartParams: any,
  drillDownSettings: DrillDownSetting | undefined,
  data: any[] | undefined,
  setDrilledLevel: React.Dispatch<React.SetStateAction<number>>,
  drilledLevel: number,
  setShowChartPopup: React.Dispatch<React.SetStateAction<boolean>>,
  setGroupedData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>
) => {
  const columnName =
    Array.isArray(data) && data.length && chartParams?.name
      ? data
          .map((obj) => {
            const entry = Object.entries(obj).find(
              ([, value]) => value === chartParams.name
            );
            return entry?.[0];
          })
          .filter((value) => value)[0]
      : '';
  if (
    columnName &&
    chartParams?.name &&
    drillDownSettings &&
    drillDownSettings.isEnableGroupBy
  ) {
    const filteredData = data?.filter(
      (obj: any) => obj[columnName] === chartParams?.name
    );
    const isLastLevel =
      drilledLevel === drillDownSettings.selectedDimensions.length - 1;
    const count = isLastLevel ? 0 : drilledLevel + 1;
    if (!isLastLevel) {
      updateDrilledData(
        filteredData,
        setGroupedData,
        drillDownSettings.selectedMeasures,
        drillDownSettings.selectedDimensions[count]
      );
    } else {
      updateDrilledData(
        data,
        setGroupedData,
        drillDownSettings.selectedMeasures,
        drillDownSettings.selectedDimensions[0]
      );
    }
    setDrilledLevel(count);
    setShowChartPopup(false);
  }
};
