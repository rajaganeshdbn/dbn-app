import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styles from './icons.module.css';

import { Icons, Logo } from './index';
import { IconType, IconsProps, LogoType } from '@/types';
import { colorsArray } from '@/utils/colors';
import { ICONS_LIST } from '@/consts';

const LogoList = [
  'redshift',
  'postgres',
  'mysql',
  'mongodb',
  'bigquery',
  'snowflake',
  'microsoft',
  'google',
  'elasticsearch',
  'redis',
  'databrick',
  'clickhouse',
];

// test
const meta: Meta<typeof Icons> = {
  title: 'components/Icons',
  component: Icons,
  tags: ['autodocs'],
};

const IconArgsType = {
  name: {
    options: ICONS_LIST,
    control: { type: 'select' },
    description: 'Icons',
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'select' },
    description: 'Size',
  },
  color: {
    options: colorsArray,
    control: { type: 'select' },
    description: 'Color',
  },
};

const LogoArgsType = {
  name: {
    options: LogoList,
    control: { type: 'select' },
    description: 'Logo list',
  },
  width: {
    control: { type: 'range', min: 20, max: 100, step: 1 },
    description: 'Width',
  },
};

export default meta;
type Story = StoryObj<typeof Icons>;

type StoryLogo = StoryObj<typeof Logo>;

const defaultArgs = {
  name: 'table',
  size: 'md',
  color: 'primary',
} as IconsProps;

export const Icon: Story = {
  render: (args) => {
    const { name, size, color } = args;
    return (
      <div className={styles.storyContainer}>
        <Icons name={name} size={size} color={color} />
      </div>
    );
  },
  argTypes: IconArgsType,
  args: defaultArgs,
};

export const Logos: StoryLogo = {
  render: (args) => {
    const { name, width } = args;
    return (
      <div className={styles.storyContainer}>
        <Logo name={name} width={width} />
      </div>
    );
  },
  argTypes: LogoArgsType,
  args: {
    name: 'redshift',
    width: 48,
  },
};

export const IconsList: Story = {
  render: (args) => {
    const { size, color } = args;
    return (
      <>
        <div className={styles.storyContainer}>
          Total Icons: {ICONS_LIST.length}
        </div>
        <div className={styles.storyContainer}>
          {ICONS_LIST.map((iconName) => {
            return (
              <div className={styles.Icon}>
                <Icons name={iconName as IconType} size={size} color={color} />
                <div className={`${styles.IconName}`}>{iconName}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  },
  argTypes: IconArgsType,
  args: defaultArgs,
};

export const LogosList: StoryLogo = {
  render: (args) => {
    const { width } = args;
    return (
      <div className={styles.storyContainer}>
        {LogoList.map((logoName) => {
          return (
            <div className={styles.Icon}>
              <Logo name={logoName as LogoType} width={width} />
              <div className={`${styles.IconName}`}>{logoName}</div>
            </div>
          );
        })}
      </div>
    );
  },
  argTypes: LogoArgsType,
  args: {
    width: 48,
  },
};
