export {};
// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// /* eslint-disable no-plusplus */
// import React from 'react';
// import EChartsReact from 'echarts-for-react';
// import styles from './metric-chart.module.css';
// import {
//   AxisSettings,
//   LabelSettings,
//   LegendSettings,
//   BackgroundSettings,
//   CustomSettings,
//   TableSettings,
// } from '@/types/app';
// import { CHART_TYPES } from '@/consts/app';
// import AreaChart from '@/components/Charts/AreaChart';
// import BarChart from '@/components/Charts/BarChart';
// import ComboChart from '@/components/Charts/ComboChart';
// import LineChart from '@/components/Charts/LineChart';
// import PieChart from '@/components/Charts/PieChart';
// import RowChart from '@/components/Charts/RowChart';
// import ScatterChart from '@/components/Charts/ScatterChart';
// import WaterFallChart from '@/components/Charts/WaterfallChart';
// import FunnelChart from '@/components/Charts/FunnelChart';
// import BubbleChart from '@/components/Charts/BubbleChart';
// import DoughnutChart from '@/components/Charts/DoughnutChart';
// import SteppedAreaChart from '@/components/Charts/SteppedAreaChart';
// import Histogram from '@/components/Charts/Histogram';
// import GaugeChart from '@/components/Charts/GaugeChart';
// import SankeyChart from '@/components/Charts/SankeyChart';
// import StackedBarChart from '@/components/Charts/StackedBarChart';
// import SingleValueChart from '@/components/Charts/SingleValueChart';
// import BoxPlot from '@/components/Charts/BoxPlot';
// import TableChart from '@/components/Charts/Table/TableChart';
// import {
//   ClickActionsConfig,
//   TimeSeriesGroupType,
//   TimeSeriesSettingsType,
// } from '@/types';
// import TimeSeriesChart from '@/components/Charts/TimeSeriesChart';

// export type MetricChartProps = {
//   data: {
//     labels: string[] | undefined;
//     datasets:
//       | {
//           label: string;
//           data: any[] | undefined;
//           borderColor: string;
//         }[]
//       | undefined;
//   };
//   labels: string[] | undefined;
//   funnelData:
//     | (
//         | ''
//         | {
//             value: any;
//             name: any;
//           }
//         | undefined
//       )[]
//     | undefined;
//   chartType: string;

//   sankeyData: (any[] | undefined)[] | undefined;

//   singleValueData:
//     | ('' | { value: any; label: string } | undefined)[]
//     | undefined;
//   margins: Record<string, number>;
//   legendSettings: LegendSettings;
//   labelSettings: LabelSettings;
//   axisSettings: AxisSettings;
//   customSettings: CustomSettings;
//   enableSaveAs: boolean;
//   colors?: string[];
//   backGroundColor: BackgroundSettings;
//   chartClickConfig: ClickActionsConfig['chart'];
//   tableSettings: TableSettings;
//   chartRef: React.RefObject<EChartsReact>;
//   tableName?: string;
//   handleChartClick?: (params: any) => void;
//   drilldown?: () => void;
//   setShowChartPopup?: React.Dispatch<React.SetStateAction<boolean>>;
//   rawData: Record<string, any>[];
//   timeSeriesSettings: TimeSeriesSettingsType;
//   xAxis: string;
//   yAxisList: string[];
// };
// export const MetricChart = ({
//   labels,
//   data,
//   chartType,
//   funnelData,
//   sankeyData,
//   singleValueData,
//   margins,
//   legendSettings,
//   labelSettings,
//   axisSettings,
//   customSettings,
//   enableSaveAs,
//   colors,
//   backGroundColor,
//   chartClickConfig,
//   tableSettings,
//   chartRef,
//   tableName,
//   handleChartClick,
//   drilldown,
//   setShowChartPopup,
//   rawData,
//   timeSeriesSettings,
//   xAxis,
//   yAxisList,
// }: MetricChartProps) => {
//   if (chartType === CHART_TYPES.line) {
//     return (
//       <LineChart
//         data={data}
//         colors={colors}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.stepped) {
//     return (
//       <SteppedAreaChart
//         labels={labels}
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         customSettings={customSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.bar) {
//     return (
//       <BarChart
//         data={data}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         customSettings={customSettings}
//         margins={margins}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.stack) {
//     return (
//       <StackedBarChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.histogram) {
//     return (
//       <Histogram
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.bubble) {
//     return (
//       <BubbleChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.scatter) {
//     return (
//       <ScatterChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.row) {
//     return (
//       <RowChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.area) {
//     data.datasets?.map((obj: {}) => Object.assign(obj, { fill: true }));
//     return (
//       <AreaChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.combo) {
//     if (data.datasets?.length) {
//       const obj = data.datasets[0];
//       Object.assign(obj, { type: 'line' as const });
//     }

//     return (
//       <ComboChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.pie) {
//     return (
//       <PieChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.doughnut) {
//     return (
//       <DoughnutChart
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.waterfall) {
//     let modifiedData;
//     if (data.datasets?.length) {
//       const values = data.datasets[0]?.data;

//       const convertedData = [values?.[0]];
//       if (values?.length)
//         for (let i = 1; i < values.length - 1; i++) {
//           convertedData.push(convertedData[i - 1] - values[i]);
//         }
//       convertedData.push(values?.[values.length - 1]);

//       modifiedData = {
//         labels: data.labels,
//         datasets: [values, convertedData],
//       };
//     }

//     return (
//       <WaterFallChart
//         data={modifiedData || data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.funnel) {
//     return (
//       <FunnelChart
//         funnelData={funnelData}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         colors={colors}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         customSettings={customSettings}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.gauge) {
//     let modifiedData;
//     if (data.datasets?.length) {
//       const values = data.datasets[0]?.data;

//       const convertedData = [values?.[0]];
//       if (values?.length)
//         for (let i = 1; i < values.length - 1; i++) {
//           convertedData.push(convertedData[i - 1] - values[i]);
//         }
//       convertedData.push(values?.[values.length - 1]);

//       modifiedData = {
//         labels: data.labels,
//         datasets: [values, convertedData],
//       };
//     }
//     return (
//       <GaugeChart
//         gaugeData={modifiedData}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.sankey) {
//     return (
//       <SankeyChart
//         data={sankeyData}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         backGroundColor={backGroundColor}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.singleValue) {
//     return (
//       <SingleValueChart
//         data={singleValueData}
//         margins={margins}
//         labelSettings={labelSettings}
//         customSettings={customSettings}
//         chartClickConfig={chartClickConfig}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.boxplot) {
//     return (
//       <BoxPlot
//         data={data}
//         margins={margins}
//         legendSettings={legendSettings}
//         labelSettings={labelSettings}
//         axisSettings={axisSettings}
//         enableSaveAs={enableSaveAs}
//         colors={colors}
//         customSettings={customSettings}
//         chartRef={chartRef}
//         handleChartClick={handleChartClick}
//         drilldown={drilldown}
//         setShowChartPopup={setShowChartPopup}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.table) {
//     return (
//       <TableChart
//         data={data}
//         chartClickConfig={chartClickConfig}
//         tableSettings={tableSettings}
//         tableName={tableName}
//       />
//     );
//   }
//   if (chartType === CHART_TYPES.timeSeries) {
//     return (
//       <TimeSeriesChart
//         dataArray={rawData}
//         groupBy={
//           (timeSeriesSettings.groupBySettings.value.split('____').length > 1
//             ? timeSeriesSettings.groupBySettings.value.split('____')[0]
//             : timeSeriesSettings.groupBySettings.value) as TimeSeriesGroupType
//         }
//         timeStampKey={xAxis}
//         type={timeSeriesSettings.seriesType?.[0]?.type || 'bar'}
//         valuekeys={yAxisList}
//         axisSettings={axisSettings}
//         customSettings={customSettings}
//         labelSettings={labelSettings}
//         legendSettings={legendSettings}
//         margins={margins}
//         colors={colors}
//         backGroundColor={backGroundColor}
//       />
//     );
//   }
//   return <div className={styles.noChart}>No chart selected</div>;
// };
