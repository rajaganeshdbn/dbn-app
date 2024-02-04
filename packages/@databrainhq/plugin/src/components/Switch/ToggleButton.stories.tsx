/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '.';

const meta: Meta<typeof Switch> = {
  title: 'components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    enabled: {
      control: 'boolean',
      description: 'Enable the toggle button',
    },
    defaultEnabled: {
      control: 'boolean',
      description: 'This will enable the switch by default',
    },
    placeholder: {
      control: 'text',
      description: 'Description for the toggle button',
    },
    onChange: {
      control: false,
      description: 'Do something when the button toggles',
    },
    name: {
      control: false,
      description: 'Provide name for the toggle button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Enabled: Story = {
  render: (args) => {
    return <Switch {...args} />;
  },
  args: {
    enabled: true,
  },
};

export const With_Text: Story = {
  render: (args) => {
    return <Switch {...args} />;
  },
  args: {
    placeholder: 'Switch',
    enabled: true,
  },
};

export const Disabled: Story = {
  render: (args) => {
    return <Switch {...args} />;
  },
  args: {
    enabled: false,
  },
};
