/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Description for the checkbox',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the checkbox by greying it out',
    },
    register: {
      control: false,
      description: 'Used with react form',
    },
    onChange: {
      control: false,
      description: 'Do something when the checkbox state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return <Checkbox {...args} isDisabled={isDisabled} />;
  },
  args: {
    isDisabled: false,
  },
};

export const With_Text: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return <Checkbox {...args} isDisabled={isDisabled} />;
  },
  args: {
    isDisabled: false,
    label: 'Checkbox',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return <Checkbox {...args} isDisabled={isDisabled} />;
  },
  args: {
    isDisabled: true,
  },
};
