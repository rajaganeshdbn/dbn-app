/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-namespace */
/* eslint-disable consistent-return */
/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useEffect, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import { HorizontalStackTable } from '../HorizontalStackTable';
import GaugeLegend from '../GaugeLegend';
import SingleValueChart from './SingleValueChart';
import style from './chart.module.css';
import {
  Button,
  List,
  ListHeaderType,
  Loader,
  PivotTableV2,
  Table,
} from '@/components';
import PivotTable from '@/components/PivotTable';
import { getChartOptions } from '@/utils/getChartOptions';
import { CHART_TYPES } from '@/consts';
import {
  ChartSettingsType,
  OnDrillPivotTableParams,
  PivotDrillState,
} from '@/types';

export type ChartProps = {
  chartOptions: ChartSettingsType;
  data: Record<string, any>[];
  events?: Record<string, Function>;
  config?: Record<string, any>;
  className?: string;
  colors?: string[];
  isShowFullScreen?: boolean;
  isShowFullScreenEnabled?: boolean;
  filterValues?: Record<string, any>;
  onMaximize?: () => void;
  onDrillPivotTable?: (value: OnDrillPivotTableParams) => void;
  pivotDrillState: PivotDrillState;
  isPythonMode?: boolean;
};

/**
 * @name Chart - The metric visualization component.
 * @prop chartOptions - the chart properties saved in the database.
 * @prop data - the array of objects/records returned by the querying.
 * @prop events (optional) - the click, change, etc. events to be added to the chart.
 * @prop config (optional) - any additional chart specific props to be passed to the respective charts e.g. table, single value.
 * @prop className (optional) - the usual className prop to provide styles.
 * @prop colors (optional) - the admin provided chart color palettes.
 * @returns JSX - chart visaulization content.
 */
export const Chart = React.memo(
  ({
    chartOptions,
    data,
    events,
    colors,
    config,
    className,
    isShowFullScreen,
    isShowFullScreenEnabled,
    onMaximize,
    onDrillPivotTable,
    pivotDrillState,
    isPythonMode,
  }: ChartProps) => {
    const [geoJsonData, setGeoJsonData] = useState<any>();
    const options = useMemo(
      () =>
        getChartOptions({
          chartOptions,
          data,
          colors,
          geoJsonData,
          isPythonMode,
        }),
      [data, JSON.stringify(chartOptions), JSON.stringify(colors), geoJsonData]
    );
    const [dynamicOptions, setDynamicOptions] = useState(options);
    const [geoOptions, setGeoOptions] = useState(options?.geoOption);
    const [geoTableData, setGeoTableData] = useState<
      { name: string; value: number }[]
    >([]);
    const [isGeoTable, setGeoTable] = useState<boolean>(false);
    const isGeoMap = useMemo(
      () =>
        [
          CHART_TYPES.geoBarMap,
          CHART_TYPES.geoMap,
          CHART_TYPES.geoScatterMap,
          CHART_TYPES.worldMap,
        ].includes(chartOptions.chartType),
      [chartOptions.chartType]
    );
    const isValidForGeoTable = useMemo(
      () =>
        chartOptions.chartType === CHART_TYPES.worldMap &&
        geoJsonData &&
        data.length &&
        chartOptions?.xAxis,
      [geoJsonData, data.length, chartOptions?.xAxis, chartOptions.chartType]
    );
    useEffect(() => {
      if (isGeoMap) {
        const isNotWorldMap = [
          CHART_TYPES.geoBarMap,
          CHART_TYPES.geoMap,
          CHART_TYPES.geoScatterMap,
        ].includes(chartOptions.chartType);
        setGeoJsonData(null);
        if (isNotWorldMap) {
          import('../../utils/usa.json').then((result) =>
            setGeoJsonData(result.default)
          );
        } else {
          import('../../utils/world.json').then((result) =>
            setGeoJsonData(result.default)
          );
        }
      }
    }, [chartOptions.chartType]);
    useEffect(() => {
      if (
        chartOptions.customSettings?.showDynamicBehaviour &&
        chartOptions.chartType
      )
        setDynamicOptions(
          getChartOptions({
            chartOptions,
            data: data.slice(0, 10),
            colors,
            isPythonMode,
          })
        );
    }, [chartOptions, colors, data]);

    useEffect(() => {
      let upperLimit = 10;
      let lowerLimit = 0;
      if (chartOptions.customSettings?.showDynamicBehaviour) {
        const interval = setInterval(() => {
          if (upperLimit >= data.length) {
            setDynamicOptions((prev) => ({ ...prev, animation: false }));
            clearInterval(interval);
            return;
          }
          const newData = data.slice(lowerLimit, upperLimit + 10);
          const newOptions = getChartOptions({
            chartOptions,
            data: newData,
            colors,
            isPythonMode,
          });
          setDynamicOptions(newOptions);
          upperLimit += 10;
          lowerLimit += 5;
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [chartOptions, data, colors]);
    const [isShowAnimation, setShowAnimation] = useState(true);
    useEffect(() => {
      setShowAnimation(false);
    }, []);
    let isGeoOption = true;
    let interval: any;

    useEffect(() => {
      if (chartOptions.chartType === CHART_TYPES.geoBarMap) {
        interval = setInterval(() => {
          setGeoOptions(isGeoOption ? options.geoOption : options.barOption);
          isGeoOption = !isGeoOption;
        }, 2000);
      } else {
        clearInterval(interval);
      }
    }, [chartOptions.chartType]);
    const { ref, ...chartConfig } = config || {};

    useEffect(() => {
      if (isValidForGeoTable) {
        const extraCountries: {
          name: string;
          value: number;
        }[] = [];
        const countries = geoJsonData?.features?.map(
          (item: any) => item.properties.name
        );
        data.forEach((element: any) => {
          if (!countries.includes(element[chartOptions.xAxis || ''])) {
            extraCountries.push(element);
          }
        });
        setGeoTableData(extraCountries);
      }
    }, [isValidForGeoTable]);
    const headers = useMemo(() => {
      return [
        {
          name: chartOptions?.xAxis,
          columnKey: chartOptions?.xAxis,
          colSpan: 1,
          columnCell: (row) => row[chartOptions?.xAxis || ''],
        },
        {
          name: chartOptions?.yAxisList?.[0],
          columnKey: chartOptions?.yAxisList?.[0],
          colSpan: 1,
          columnCell: (row) => row[chartOptions?.yAxisList?.[0] || ''] || '0',
        },
      ] as ListHeaderType[];
    }, [chartOptions?.xAxis, chartOptions?.yAxisList]);

    if (
      [
        CHART_TYPES.geoBarMap,
        CHART_TYPES.geoMap,
        CHART_TYPES.geoScatterMap,
        CHART_TYPES.worldMap,
      ].includes(chartOptions.chartType) &&
      !geoJsonData
    ) {
      return <Loader />;
    }

    if (chartOptions.chartType === CHART_TYPES.singleValue) {
      return (
        <SingleValueChart
          {...chartConfig}
          value={options.value}
          settings={options.settings}
          className={className}
          comparisonValue={options.comparisonValue}
          trendLineOptions={options.trendLineOptions}
          events={events}
        />
      );
    }
    if (chartOptions.chartType === CHART_TYPES.horizontalStackTable) {
      return (
        <HorizontalStackTable
          {...chartConfig}
          data={options.data}
          rawData={data}
          error=""
          isLoading={false}
          tableSettings={options.tableSettings}
          className={className}
          stackCols={chartOptions.stackTableCols || []}
          colors={options.colors}
          showLabels={chartOptions.customSettings?.showStackLabels}
        />
      );
    }
    if (chartOptions.chartType === CHART_TYPES.table) {
      return (
        <Table
          {...chartConfig}
          events={events}
          data={options.data}
          error=""
          isLoading={false}
          tableSettings={options.tableSettings}
          className={className}
          isExternalChart={config?.isExternalChart}
          onChangePage={config?.onChangePage}
          isEnableNextBtn={config?.isEnableNextBtn}
          isEnablePrevBtn={config?.isEnablePrevBtn}
          paginationInfo={config?.paginationInfo}
          setChartSettings={config?.setChartSettings}
          isShowFullScreen={isShowFullScreen}
          isShowFullScreenEnabled={isShowFullScreenEnabled}
          onMaximize={onMaximize}
        />
      );
    }
    if (chartOptions.chartType === CHART_TYPES.pivot) {
      return (
        <PivotTable
          {...chartConfig}
          data={data}
          pivotTableSettings={options.pivotTableSettings}
        />
      );
    }
    if (chartOptions.chartType === CHART_TYPES.pivotV2) {
      return (
        <PivotTableV2
          props={{
            columns: options?.pivotTableSettings2?.headers || [],
            data,
            rows: options?.pivotTableSettings2?.dimensions || [],
            values: options?.pivotTableSettings2?.measures || [],
            headerSettings: options?.pivotTableSettings2?.headerSettings,
            measures: options?.pivotTableSettings2?.aggregates || [],
            isEnableStripedRows:
              options?.pivotTableSettings2?.isEnableStripedRows,
            dimensions: options?.pivotTableSettings2?.dims || [],
            onDrillPivotTable,
            pivotDrillState,
          }}
        />
      );
    }
    if (
      [
        CHART_TYPES.bar,
        CHART_TYPES.line,
        CHART_TYPES.area,
        CHART_TYPES.stackedArea,
        CHART_TYPES.timeSeries,
      ].includes(chartOptions.chartType) &&
      chartOptions.customSettings?.showDynamicBehaviour
    ) {
      return (
        <EChartsReact
          style={{
            width: '100%',
            height: '100%',
          }}
          {...config}
          option={{ ...dynamicOptions }}
          className={className}
          onEvents={events}
          notMerge
        />
      );
    }
    if (chartOptions.chartType === CHART_TYPES.geoBarMap) {
      return (
        <EChartsReact
          style={{
            width: '100%',
            height: '100%',
          }}
          {...config}
          option={{ ...(geoOptions || options?.geoOption), animation: true }}
          className={className}
          onEvents={events}
          notMerge
        />
      );
    }
    return (
      <div className="dbn-w-full dbn-h-full dbn-relative dbn-flex dbn-gap-3 dbn-flex-col dbn-items-end">
        {chartOptions.chartType === CHART_TYPES.gauge ? (
          <GaugeLegend data={options?.legendData} />
        ) : null}
        {chartOptions.chartType === CHART_TYPES.worldMap ? (
          <Button
            variant="popover"
            onClick={() => setGeoTable(!isGeoTable)}
            className={style.buttonText}
          >
            Go To Geo {isGeoTable ? 'Map >' : 'Table >'}
          </Button>
        ) : null}
        {chartOptions.chartType === CHART_TYPES.worldMap && isGeoTable ? (
          <List data={geoTableData} headers={headers} />
        ) : (
          <EChartsReact
            style={{
              width: '100%',
              height: '100%',
            }}
            {...config}
            option={{ ...options, animation: isShowAnimation }}
            className={className}
            onEvents={events}
            notMerge
          />
        )}
      </div>
    );
  }
);
