import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SingleValueChart from './SingleValueChart';

export default {
  title: 'visualisation/SingleValue',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Change value present at the middle of the card',
    },
    fontSize: {
      control: 'number',
      description: 'Add font size to the value',
    },
    subHeaderShow: {
      control: 'boolean',
      description: 'Enable or disable sub header',
    },
    subHeaderText: {
      control: 'text',
      description: 'Add sub header text to the chart',
    },
    comparisonValue: {
      control: 'text',
      description: 'Add comparison value to the chart',
    },
    comparisonValueFontSize: {
      control: 'number',
      description: 'Change comparison value font size',
    },
    comparisonValueSuffix: {
      control: 'text',
      description: 'Add suffix for comaprison value like Wow etc.',
    },
    comparisonTimePeriod: {
      control: 'number',
      description: 'Add comparison time period',
    },
    comparisonTimeGrain: {
      control: 'text',
      description:
        'Provide the time grain for comparison like days, weeks etc.',
    },
  },
} as Meta;
type Story = StoryObj<typeof SingleValueChart>;

export const Chart: Story = {
  render: (args: any) => {
    const settings = {
      fontSize: args.fontSize,
      subHeaderShow: args.subHeaderShow,
      displayText: args.subHeaderText,
      comparisonValueFontSize: args.comparisonValueFontSize,
      comparisonSuffix: args.comparisonValueSuffix,
      comparisonTimePeriod: args.comparisonTimePeriod,
      comparisonTimeGrain: args.comparisonTimeGrain,
    };
    return (
      <SingleValueChart
        value={args.value}
        comparisonValue={args.comparisonValue}
        settings={settings}
      />
    );
  },
  args: {
    value: '500',
  },
};
