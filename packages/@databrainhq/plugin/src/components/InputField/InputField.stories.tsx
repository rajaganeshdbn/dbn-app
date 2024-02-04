/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { InputField } from '.';

const meta: Meta<typeof InputField> = {
  title: 'components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'number', 'date'],
      control: { type: 'radio' },
      description: 'Specify the type of the input field',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the input field by greying it out',
    },
    register: {
      control: false,
      description: 'Used with react form',
    },
    label: {
      control: 'text',
      description: 'Provide label to the input field',
    },
    supportingText: {
      control: 'text',
      description: 'Provide helping text for the input field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: (args) => {
    const { type, isDisabled } = args;
    return <InputField type={type} isDisabled={isDisabled} {...args} />;
  },
  args: {
    type: 'text',
  },
};

export const With_Label: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return <InputField isDisabled={isDisabled} {...args} />;
  },
  args: {
    label: 'Label',
    isDisabled: false,
  },
};

export const With_Supporting_Text: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return <InputField isDisabled={isDisabled} {...args} />;
  },
  args: {
    supportingText: 'Supporting Text',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return <InputField isDisabled={isDisabled} {...args} />;
  },
  args: {
    label: 'Label',
    supportingText: 'Supporting Text',
    isDisabled: true,
  },
};
