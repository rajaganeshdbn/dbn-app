/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { List } from '.';

const meta: Meta<typeof List> = {
  title: 'components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Variant to show in the UI.',
    },
    headers: {
      control: false,
      description:
        'Array of object with header name and the column to show in the UI if needed any custom for any particular header columns.',
    },
    data: {
      control: false,
      description: 'Array of record.',
    },
    noDataText: {
      control: 'text',
      description: 'The text to show when there is no data.',
    },
    loadMoreText: {
      control: 'text',
      description: 'The text to show in the load more button.',
    },
    initialLimit: {
      control: 'number',
      description: 'Number of records to show initially.',
    },
    isDataLoading: {
      control: 'boolean',
      description: 'Control to show loader when loading.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const WithPrimaryVariant: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { variant } = args;
    return <List {...args} variant={variant} />;
  },
  args: {
    variant: 'primary',
    headers: [
      { name: 'Name', columnKey: 'name' },
      { name: 'Status', columnKey: 'status' },
      { name: 'Created', columnKey: 'created' },
      { name: 'Updated', columnKey: 'updated' },
    ],
    data: [
      {
        name: 'Postgres',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'MongoDB',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'MySQL',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'MsSQL',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'Redshift',
        status: 'failed',
        created: 'Today',
        updated: 'Today',
      },
    ],
  },
};
export const WithSecondaryVariant: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { variant } = args;
    return <List {...args} variant={variant} />;
  },
  args: {
    variant: 'secondary',
    headers: [
      { name: 'Name', columnKey: 'name' },
      { name: 'Status', columnKey: 'status' },
      { name: 'Created', columnKey: 'created' },
      { name: 'Updated', columnKey: 'updated' },
    ],
    data: [
      {
        name: 'Postgres',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'MongoDB',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'MySQL',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'MsSQL',
        status: 'success',
        created: 'Today',
        updated: 'Today',
      },
      {
        name: 'Redshift',
        status: 'failed',
        created: 'Today',
        updated: 'Today',
      },
    ],
  },
};
