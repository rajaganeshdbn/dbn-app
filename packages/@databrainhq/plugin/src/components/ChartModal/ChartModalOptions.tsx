/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './chartModal.module.css';
import { Button, Text, Icons } from '@/components';
import { CHART_TYPES } from '@/consts';
import Chart from '@/components/Svg/Chart.svg';

type ChartType = keyof typeof CHART_TYPES;
type Props = {
  onChartChange: (chartType: ChartType) => void;
  chartType: ChartType;
  isEnableTimeSeries: boolean;
  isEnablePivotTable: boolean;
  hasNumberKeys: boolean;
  isEnableGauge: boolean;
  enableCharts: string[];
};
export const ChartModalOptions = ({
  chartType,
  onChartChange,
  isEnableTimeSeries,
  isEnablePivotTable,
  hasNumberKeys,
  isEnableGauge,
  enableCharts,
}: Props) => {
  const chartOptions = [
    {
      name: 'Line',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Bar',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Combo',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Scatter',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Row',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Area',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Pie',
      icon: <Icons name="pie-chart" size="xl" />,
    },
    {
      name: 'Waterfall',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Funnel',
      icon: <Icons name="funnel" size="xl" />,
    },
    {
      name: 'Bubble',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Doughnut',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Stepped',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Histogram',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Gauge',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Sankey',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Stack',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Single value',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'BoxPlot',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Table',
      icon: <Icons name="table" size="xl" />,
    },
    {
      name: 'Time series',
      icon: <Icons name="bar-chart" size="xl" />,
    },
    {
      name: 'Pivot Table',
      icon: <Icons name="bar-chart" size="xl" />,
    },
  ];
  return (
    <div className={styles.chartOptions}>
      {chartOptions.map((option) => (
        <div className={styles.chartOption} key={option.name}>
          <Button
            type="button"
            variant="popover"
            onClick={() => {
              onChartChange(option.name.toLowerCase() as ChartType);
            }}
            key={option.name}
            isDisabled={
              (option.name.toLowerCase() === CHART_TYPES.timeSeries &&
                !isEnableTimeSeries) ||
              ((option.name.toLowerCase() === CHART_TYPES.pivot ||
                option.name.toLowerCase() === CHART_TYPES.treeMap) &&
                !isEnablePivotTable) ||
              !enableCharts.includes(option.name.toLowerCase())
            }
          >
            <div className={styles.imgDiv}>
              <img
                src={Chart}
                alt=""
                style={{ width: '180px', height: '100px' }}
              />
            </div>
          </Button>
          <Text variant="body-text-sm">{option.name}</Text>
        </div>
      ))}
    </div>
  );
};
