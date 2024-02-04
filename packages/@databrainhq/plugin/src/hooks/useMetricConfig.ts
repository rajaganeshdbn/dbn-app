/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { useEffect, useMemo, useState } from 'react';
import { useExternalMetric } from './useExternalMetric';
import { CHART_TYPES, DATE_TYPES, DEFAULT_CHART_SETTINGS } from '@/consts';
import {
  ChartSettingsType,
  ConfigType,
  DatasetSettings,
  EmbeddedMetricCreationProps,
  FloatingDropDownOption,
} from '@/types';
import {
  areArraysEqual,
  autoDetectCharts,
  findKeys,
  getEnabledChart,
} from '@/helpers';
import { useDatasetMetricMutation } from '@/queries/externalDashboard.mutation';

/* eslint-disable no-nested-ternary */
export type CompanyIntegration =
  | {
      id: string;
      name: string;
    }
  | undefined;

const useMetricConfig = ({ ...config }: ConfigType) => {
  const {
    clientId,
    companyId,
    isLiveMode,
    externalDashboardId,
    userProvidedDashboardId,
    setShowMetricCreateModal,
    metric,
    metricData,
    chartColors,
  } = config;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any[]>();
  const [chartSettings, setChartSettings] = useState<ChartSettingsType>(
    DEFAULT_CHART_SETTINGS
  );
  const [isResetPallete, setResetPallete] = useState<boolean>(false);
  const [hasNumberKeys, setNumberKeys] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [datasetSettings, setDatatsetSettings] = useState<DatasetSettings>();

  const [isShowSqlModal, setShowSqlModal] = useState<boolean>(false);
  const [isShowSaveMetricModal, setShowSaveMetricModal] =
    useState<boolean>(false);
  const [selectTable, setSelectTable] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [groupByList, setGroupByList] = useState<string[]>([]);

  // const dateTimeColumnList = useMemo(
  //   () =>
  //     selectedTableData?.columns.filter(({ datatype }: any) =>
  //       DATE_TYPES.includes(datatype.toLowerCase())
  //     ) || [],
  //   [selectedTableData]
  // );
  const [companyIntegration, setCompanyIntegration] =
    useState<CompanyIntegration>();

  const [metricQuery] = useState<string>();
  const [isEnablePivotTable, setEnablePivotTable] = useState<boolean>(false);
  const [isEnableGauge, setEnableGauge] = useState<boolean>(false);

  const [previewTableData, setPreviewTableData] = useState<any[]>();
  const [isShowChartCustomProperties, setShowChartCustomProperties] =
    useState<boolean>(false);
  const [barRadius, setBarRadius] = useState({
    topRadius: chartSettings.customSettings?.barRadius?.[1] || 0,
    bottomRadius: chartSettings.customSettings?.barRadius?.[3] || 0,
  });
  const [isShowFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [isShowChartType, setShowChartType] = useState<boolean>(false);
  const [isShowSortPanel, setShowSortPanel] = useState<boolean>(false);
  const [isShowFilters, setShowFilters] = useState<boolean>(false);
  const [isEnableSingleDimension, setEnableSingleDimension] =
    useState<boolean>(true);
  const [isEnableSingleMetrics, setEnableSingleMetrics] =
    useState<boolean>(false);

  const {
    createExternalMetric,
    error: saveError,
    updateExternalMetric,
    clientSubsetData,
    previewTable,
    token,
    dashboardOptions,
    isLoading: isCreatingMetric,
  } = useExternalMetric({
    query,
    chartSettings,
    companyIntegrationId: companyIntegration?.id,
    integrationName: companyIntegration?.name,
    metricQuery,
    datasetMetricSettings: datasetSettings,
    outputColumns: undefined,
    selectedColumns: undefined,
    clientId,
    isEmbedded: true,
    companyId,
    isLiveMode,
    dashboardIds: [externalDashboardId],
    userProvidedDashboardId,
    isEnableGroupBy: false,
    groupBy: undefined,
    selectedGroupBy: [],
    metric,
    onSuccess: () => {
      setShowSaveMetricModal(false);
      setShowMetricCreateModal(false);
      window?.location?.reload?.();
    },
  });

  useEffect(() => {
    const subsetError = clientSubsetData?.error;
    const companySubsetTableData = clientSubsetData;
    if (subsetError || !clientSubsetData) {
      setError(subsetError?.message as string);
    } else if (companySubsetTableData?.tableList?.length) {
      setCompanyIntegration({
        id: companySubsetTableData?.companyIntegrationId as string,
        name: companySubsetTableData?.dbName as string,
      });
    }
  }, [clientSubsetData]);

  useEffect(() => {
    if (selectTable.value) {
      previewTable(
        {
          data: {
            integrationId: companyIntegration?.id,
            integrationName: companyIntegration?.name,
            tableName: selectTable.value,
            limit: 10,
          },
          token: token as string,
        },
        {
          onSuccess(prevTableData: any) {
            const prevData = prevTableData?.previewTable?.data;
            if (prevData) {
              setPreviewTableData([prevData]);
            } else {
              setPreviewTableData(undefined);
            }
          },
        }
      );
    }
  }, [selectTable]);
  useEffect(() => {
    if (
      [
        CHART_TYPES.table,
        CHART_TYPES.horizontalStackTable,
        CHART_TYPES.treeMap,
        CHART_TYPES.pivot,
        CHART_TYPES.gauge,
        CHART_TYPES.sankey,
      ].includes(chartSettings.chartType)
    ) {
      setEnableSingleDimension(false);
    } else {
      setEnableSingleDimension(true);
    }
    if (
      [
        CHART_TYPES.waterfall,
        CHART_TYPES.funnel,
        CHART_TYPES.gauge,
        CHART_TYPES.singleValue,
        CHART_TYPES.sankey,
      ].includes(chartSettings.chartType)
    )
      setEnableSingleMetrics(true);
    else setEnableSingleMetrics(false);
  }, [chartSettings.chartType]);
  const enabledCharts = useMemo(() => {
    const charts = getEnabledChart(data || []);
    const isTimeSeries = false;
    const groupedCharts = [
      CHART_TYPES.pivot,
      CHART_TYPES.pivotV2,
      CHART_TYPES.timeSeries,
      CHART_TYPES.treeMap,
      CHART_TYPES.geoBarMap,
      CHART_TYPES.geoMap,
      CHART_TYPES.geoScatterMap,
      CHART_TYPES.worldMap,
    ];
    if (groupByList.length && isTimeSeries) {
      return [
        ...charts.filter((chart) => !groupedCharts.includes(chart)),
        ...groupedCharts,
      ];
    }
    if (groupByList.length)
      return [
        ...charts.filter((chart) => !groupedCharts.includes(chart)),
        ...groupedCharts.filter((opt) => opt !== CHART_TYPES.timeSeries),
      ];
    if (isTimeSeries)
      return [
        ...charts.filter((chart) => !groupedCharts.includes(chart)),
        CHART_TYPES.timeSeries,
      ];

    return charts.filter((chart) => !groupedCharts.includes(chart));
  }, [data, groupByList, chartSettings.xAxis]);
  useEffect(() => {
    if (data?.length && groupByList.length) {
      setEnablePivotTable(true);
    } else {
      setEnablePivotTable(false);
    }
  }, [data, groupByList.length, query]);
  // useEffect(() => {
  //   const keys = findKeys(data || []);
  //   if (keys?.numberKeys?.length) {
  //     setNumberKeys(true);
  //     setEnableGauge(true);
  //     if (keys?.stringKeys?.length) {
  //       setChartSettings((prev) => ({
  //         ...prev,
  //         gaugeSettings: {
  //           ...chartSettings.gaugeSettings,
  //           metric: keys.numberKeys[0],
  //           dimensions: keys.stringKeys,
  //         },
  //       }));
  //     } else {
  //       setChartSettings((prev) => ({
  //         ...prev,
  //         gaugeSettings: {
  //           ...chartSettings.gaugeSettings,
  //           metric: keys.numberKeys[0],
  //         },
  //       }));
  //     }
  //   } else {
  //     setEnableGauge(false);
  //     setNumberKeys(false);
  //   }
  // }, [data]);
  useEffect(() => {
    if (
      !(
        chartSettings.chartType === CHART_TYPES.stack &&
        chartSettings.chartType === CHART_TYPES.timeSeries &&
        chartSettings?.timeSeriesSettings?.seriesType?.[0]?.type === 'stack' &&
        chartSettings.seriesField === 'ungrouped'
      )
    ) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          showFullStacked: false,
        },
      }));
    }
  }, [
    chartSettings?.chartType,
    chartSettings?.timeSeriesSettings,
    chartSettings.seriesField,
  ]);

  useEffect(() => {
    if (
      groupByList.length &&
      chartSettings.chartType === CHART_TYPES.pivot &&
      data?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        pivotTableSettings: {
          ...chartSettings.pivotTableSettings,
          columns: Object.keys(data[0]).filter((value) =>
            groupByList.includes(value)
          ),
          rows: Object.keys(data[0]).filter(
            (value) => !groupByList.includes(value)
          ),
        },
      }));
    }
  }, [data, groupByList.length, chartSettings.chartType]);
  useEffect(() => {
    if (
      groupByList.length &&
      chartSettings.chartType === CHART_TYPES.pivotV2 &&
      data?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        pivotTableSettings2: {
          ...chartSettings.pivotTableSettings2,
          dimensions: Object.keys(data[0]).filter((value) =>
            groupByList.includes(value)
          ),
          measures: Object.keys(data[0]).filter(
            (value) => !groupByList.includes(value)
          ),
          headers: Object.keys(data[0]).filter((value) =>
            groupByList.includes(value)
          ),
        },
      }));
    }
  }, [data, groupByList.length, chartSettings.chartType]);
  useEffect(() => {
    if (isResetPallete) {
      setChartSettings((prev) => ({
        ...prev,
        chartColors,
      }));
      setResetPallete(false);
    }
  }, [isResetPallete]);
  useEffect(() => {
    if (
      (!chartSettings.chartColors?.length ||
        areArraysEqual(chartColors, chartSettings.chartColors)) &&
      chartColors?.length
    ) {
      setChartSettings((prev) => ({
        ...prev,
        chartColors,
      }));
    }
  }, [chartColors, chartSettings.chartColors]);

  useEffect(() => {
    if (chartSettings.chartType === CHART_TYPES.row) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          barRadius: [
            barRadius.bottomRadius,
            barRadius.topRadius,
            barRadius.topRadius,
            barRadius.bottomRadius,
          ],
        },
      }));
    } else {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          barRadius: [
            barRadius.topRadius,
            barRadius.topRadius,
            barRadius.bottomRadius,
            barRadius.bottomRadius,
          ],
        },
      }));
    }
  }, [
    barRadius.topRadius,
    barRadius.bottomRadius,
    setChartSettings,
    chartSettings.chartType,
  ]);

  useEffect(() => {
    if (!metric) return;
    setChartSettings(metric.chartOptions);
    setCompanyIntegration(metric.companyIntegration);
  }, [metric]);
  useEffect(() => {
    if (!metricData) return;
    const queryData = Array.isArray(metricData) ? metricData : [];
    setData(queryData);
    // autoDetectCharts({ data: queryData, setChartSettings });
  }, [metricData]);
  useEffect(() => {
    if (chartSettings.chartType !== CHART_TYPES.timeSeries) {
      setChartSettings((prev) => ({
        ...prev,
        timeSeriesSettings: {
          ...prev.timeSeriesSettings,
          groupBySettings: {
            isDynamic: false,
            options: [],
            value: 'monthly',
            fillXAxis: false,
          },
          seriesType:
            prev.yAxisList?.map((column) => ({ column, type: 'bar' })) || [],
        },
      }));
    }
  }, [chartSettings.chartType]);

  return {
    isLoading,
    chartSettings,
    setShowSaveMetricModal,
    setSelectTable,
    selectTable,
    data,
    error,
    previewTableData,
    query,
    isShowSqlModal,
    setShowSqlModal,
    isEnablePivotTable,
    isEnableGauge,
    groupByList,
    hasNumberKeys,
    setShowChartCustomProperties,
    isShowFullScreen,
    setShowFullScreen,
    isShowChartType,
    setShowChartType,
    isShowSaveMetricModal,
    updateExternalMetric,
    createExternalMetric,
    dashboardOptions,
    saveError,
    setChartSettings,
    isShowChartCustomProperties,
    setBarRadius,
    setError,
    setLoading,
    setData,
    setQuery,
    setGroupByList,
    clientSubsetData,
    isShowSortPanel,
    setShowSortPanel,
    isShowFilters,
    setShowFilters,
    isCreatingMetric,
    isEnableSingleDimension,
    isEnableSingleMetrics,
    enabledCharts: enabledCharts.filter(
      (chart) => ![CHART_TYPES.pivotV2, CHART_TYPES.timeSeries].includes(chart)
    ),
    setResetPallete,
    dbName: companyIntegration?.name || '',
  };
};

export default useMetricConfig;
