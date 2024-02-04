/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styles from './button.module.css';

import { Button } from '.';
import { Icons } from '@/components';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'tab'],
      control: { type: 'radio' },
      description: 'Style variations of the button',
    },
    children: {
      control: 'text',
      description: 'Text inside the button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the button by greying it out',
    },
    leftIcon: {
      control: false,
      description: 'The icon present at the left side inside the button',
    },
    rightIcon: {
      control: false,
      description: 'The icon present at the right side inside the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (args) => {
    const { variant, isDisabled } = args;
    return (
      <div className={styles.storyBookButton}>
        <Button {...args} variant={variant} isDisabled={isDisabled} />
        <Button
          {...args}
          variant={variant}
          leftIcon={<Icons name="copy" size="sm" color="white" />}
          isDisabled={isDisabled}
        />
        <Button
          {...args}
          variant={variant}
          leftIcon={<Icons name="copy" size="sm" color="white" />}
          rightIcon={<Icons name="cross" size="sm" color="white" />}
          isDisabled={isDisabled}
        />
        <Button
          {...args}
          variant={variant}
          rightIcon={<Icons name="cross" size="sm" color="white" />}
          isDisabled={isDisabled}
        />
        <Button
          variant={variant}
          leftIcon={<Icons name="copy" size="sm" color="white" />}
          isDisabled={isDisabled}
        />
      </div>
    );
  },
  args: {
    variant: 'primary',
    children: 'Hello!',
  },
};
export const Secondary: Story = {
  render: (args) => {
    const { variant, isDisabled } = args;
    return (
      <div className={styles.storyBookButton}>
        <Button {...args} variant={variant} isDisabled={isDisabled} />
        <Button
          {...args}
          variant={variant}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          isDisabled={isDisabled}
        />
        <Button
          {...args}
          variant={variant}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          rightIcon={<Icons name="cross" size="sm" color="primary" />}
          isDisabled={isDisabled}
        />
        <Button
          {...args}
          variant={variant}
          rightIcon={<Icons name="cross" size="sm" color="primary" />}
          isDisabled={isDisabled}
        />
        <Button
          variant={variant}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          isDisabled={isDisabled}
        />
      </div>
    );
  },
  args: {
    variant: 'secondary',
    children: 'Hello!',
  },
};
export const Tertiary: Story = {
  render: (args) => {
    const { isDisabled, variant } = args;
    return (
      <div className={styles.storyBookButton}>
        <Button {...args} isDisabled={isDisabled} variant={variant} />
        <Button
          {...args}
          isDisabled={isDisabled}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          variant={variant}
        />
        <Button
          {...args}
          isDisabled={isDisabled}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          rightIcon={<Icons name="cross" size="sm" color="primary" />}
          variant={variant}
        />
        <Button
          {...args}
          isDisabled={isDisabled}
          rightIcon={<Icons name="cross" size="sm" color="primary" />}
          variant={variant}
        />
        <Button
          isDisabled={isDisabled}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          variant={variant}
        />
      </div>
    );
  },
  args: {
    variant: 'tertiary',
    children: 'Hello!',
  },
};
export const Tab: Story = {
  render: (args) => {
    const { variant, isDisabled } = args;
    return (
      <div className={styles.storyBookButton}>
        <Button {...args} variant={variant} isDisabled={isDisabled} />
        <Button
          {...args}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          variant={variant}
          isDisabled={isDisabled}
        />
        <Button
          {...args}
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          rightIcon={<Icons name="cross" size="sm" color="primary" />}
          variant={variant}
          isDisabled={isDisabled}
        />
        <Button
          {...args}
          rightIcon={<Icons name="cross" size="sm" color="primary" />}
          variant={variant}
          isDisabled={isDisabled}
        />
        <Button
          leftIcon={<Icons name="copy" size="sm" color="primary" />}
          variant={variant}
          isDisabled={isDisabled}
        />
      </div>
    );
  },
  args: {
    variant: 'tab',
    children: 'Hello!',
  },
};
