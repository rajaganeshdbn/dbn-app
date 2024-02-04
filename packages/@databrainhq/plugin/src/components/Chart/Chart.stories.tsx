import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styles from './chart.module.css';
import { Chart } from '.';
import { ChartSettingsType } from '@/types';

export default {
  title: 'visualisation/Charts',
  tags: ['autodocs'],
  argTypes: {
    chartOptions: {
      control: false,
      description:
        'Provide the chart options such as chartType, legendSettings, margins etc to the chart in the form of an object',
    },
    data: {
      control: 'object',
      description: 'Data is an array of objects',
    },
    colors: {
      control: false,
      description:
        'Colors is an array of string <br/> for eg. [`#000000`, `#FFFFFF`]',
    },
  },
} as Meta;
type Story = StoryObj<typeof Chart>;

export const Bar_Chart: Story = {
  render: (args: any) => {
    const chartOptions: ChartSettingsType = {
      comboBarList: [],
      chartType: 'bar',
      xAxis: 'name',
      yAxisList: ['age'],
      margins: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
      },
      labelSettings: {
        axis: 'left',
        show: false,
        position: 'hidden',
        truncateLabelValue: 14,
      },
      legendSettings: {
        show: true,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'horizontal',
        truncateLegendValue: 14,
      },
      customSettings: {
        hideSplitLines: false,
        hideAxisLines: false,
        barWidth: 40,
        barRadius: [0, 0, 0, 0],
        axisLabels: false,
        numberFormatter: 'original',
        xRotation: 50,
        showLabelValues: false,
      },
      axisSettings: {
        axis: 'left',
      },
      backGroundColor: {
        show: false,
      },
    };
    const colorArr = ['#111827'];
    return (
      <div className={styles.chartDiv}>
        <Chart
          chartOptions={chartOptions}
          data={args.data}
          colors={colorArr}
          filterValues={{}}
          onMaximize={() => {}}
          pivotDrillState={{
            data: [],
            error: '',
            isLoading: false,
            currentValue: '',
          }}
        />
      </div>
    );
  },
  args: {
    data: [
      {
        name: 'Vansh',
        age: 20,
      },
      {
        name: 'Ansh',
        age: 22,
      },
      {
        name: 'Vanshika',
        age: 21,
      },
      {
        name: 'Anshika',
        age: 19,
      },
    ],
  },
};

export const Line_Chart: Story = {
  render: (args: any) => {
    const chartOptions: ChartSettingsType = {
      comboBarList: [],
      chartType: 'line',
      xAxis: 'name',
      yAxisList: ['age'],
      margins: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
      },
      labelSettings: {
        axis: 'left',
        show: false,
        position: 'hidden',
        truncateLabelValue: 14,
      },
      legendSettings: {
        show: true,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'horizontal',
        truncateLegendValue: 14,
      },
      customSettings: {
        hideSplitLines: false,
        hideAxisLines: false,
        axisLabels: false,
        numberFormatter: 'original',
        showLabelValues: false,
      },
      axisSettings: {
        axis: 'left',
      },
      backGroundColor: {
        show: false,
      },
    };
    const colorArr = ['#111827'];
    return (
      <div className={styles.chartDiv}>
        <Chart
          chartOptions={chartOptions}
          data={args.data}
          colors={colorArr}
          filterValues={{}}
          onMaximize={() => {}}
          pivotDrillState={{
            data: [],
            error: '',
            isLoading: false,
            currentValue: '',
          }}
        />
      </div>
    );
  },
  args: {
    data: [
      {
        name: 'Vansh',
        age: 20,
      },
      {
        name: 'Ansh',
        age: 22,
      },
      {
        name: 'Vanshika',
        age: 21,
      },
      {
        name: 'Anshika',
        age: 19,
      },
    ],
  },
};

export const Pie_Chart: Story = {
  render: (args: any) => {
    const chartOptions: ChartSettingsType = {
      comboBarList: [],
      chartType: 'pie',
      xAxis: 'name',
      yAxisList: ['age'],
      margins: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
      },
      labelSettings: {
        axis: 'left',
        show: true,
        position: 'hidden',
        truncateLabelValue: 14,
      },
      legendSettings: {
        show: true,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'vertical',
        truncateLegendValue: 14,
      },
      customSettings: {
        numberFormatter: 'original',
        showLabelValues: false,
      },
    };
    const colorArr = ['#111827', '#D0D4DA', '#222C3A', '#717171'];
    return (
      <div className={styles.chartDiv}>
        <Chart
          chartOptions={chartOptions}
          data={args.data}
          colors={colorArr}
          filterValues={{}}
          onMaximize={() => {}}
          pivotDrillState={{
            data: [],
            error: '',
            isLoading: false,
            currentValue: '',
          }}
        />
      </div>
    );
  },
  args: {
    data: [
      {
        name: 'Vansh',
        age: 20,
      },
      {
        name: 'Ansh',
        age: 22,
      },
      {
        name: 'Vanshika',
        age: 21,
      },
      {
        name: 'Anshika',
        age: 19,
      },
    ],
  },
};

export const Scatter_Chart: Story = {
  render: (args: any) => {
    const chartOptions: ChartSettingsType = {
      comboBarList: [],
      chartType: 'scatter',
      xAxis: 'name',
      yAxisList: ['age'],
      margins: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
      },
      labelSettings: {
        axis: 'left',
        show: false,
        position: 'hidden',
        truncateLabelValue: 14,
      },
      legendSettings: {
        show: true,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'horizontal',
        truncateLegendValue: 14,
      },
      customSettings: {
        hideSplitLines: false,
        hideAxisLines: false,
        axisLabels: false,
        numberFormatter: 'original',
        xRotation: 50,
        showLabelValues: false,
      },
      axisSettings: {
        axis: 'left',
      },
    };
    const colorArr = ['#111827'];
    return (
      <div className={styles.chartDiv}>
        <Chart
          chartOptions={chartOptions}
          data={args.data}
          colors={colorArr}
          filterValues={{}}
          onMaximize={() => {}}
          pivotDrillState={{
            data: [],
            error: '',
            isLoading: false,
            currentValue: '',
          }}
        />
      </div>
    );
  },
  args: {
    data: [
      {
        name: 'Vansh',
        age: 20,
      },
      {
        name: 'Ansh',
        age: 22,
      },
      {
        name: 'Vanshika',
        age: 21,
      },
      {
        name: 'Anshika',
        age: 19,
      },
    ],
  },
};
