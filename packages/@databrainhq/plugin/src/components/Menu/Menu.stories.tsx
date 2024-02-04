/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Menu } from '.';
import { Icons } from '@/components/Icons';
import { ICONS_LIST } from '@/consts';
import { IconType } from '@/types';

const meta: Meta<typeof Menu> = {
  title: 'components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    buttonVariant: {
      control: 'radio',
      options: [
        'outlined-text',
        'icon',
        'text-with-icon',
        'outlined-icon',
        'outlined-text-with-icon',
      ],
      description: 'Menu button variant to show in the UI.',
    },
    buttonText: {
      control: 'text',
      description:
        'Text to show when buttonVariant in outlined-text, text-with-icon, outlined-text-with-icon',
    },
    buttonIcon: {
      control: 'select',
      options: ICONS_LIST,
      description: 'Icon to show in the button.',
    },
    buttonContent: {
      control: false,
      description: 'Custom button to render.',
    },
    buttonWidth: {
      control: 'text',
      description: 'Menu button width.',
    },
    items: {
      control: false,
      description:
        'Array of object with name of the list item with other customization options like icons, text, custom item.',
    },
    position: {
      control: 'select',
      description: 'Menu position.',
      defaultValue: 'bottom-start',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
    menuWidth: {
      control: 'text',
      description: 'Menu width.',
    },
    offset: {
      control: 'array',
      description:
        'Offset Info - https://popper.js.org/docs/v2/modifiers/offset/',
    },
    children: {
      control: false,
      description: 'Anything else want to show in the menu other than list.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const WithOutlinedTextVariant: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      buttonVariant,
      buttonIcon,
      buttonWidth = 'fit-content',
      position = 'bottom-start',
    } = args;
    return (
      <Menu
        {...args}
        buttonVariant={buttonVariant}
        buttonIcon={
          buttonIcon ? (
            <Icons name={buttonIcon as unknown as IconType} />
          ) : undefined
        }
        buttonWidth={buttonWidth}
        position={position}
      />
    );
  },
  args: {
    buttonVariant: 'outlined-text',
    buttonText: 'Menu Button',
    items: [
      { name: 'Name' },
      { name: 'Status' },
      { name: 'Created' },
      { name: 'Updated' },
    ],
  },
};
export const WithIconVariant: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      buttonVariant,
      buttonIcon,
      buttonWidth = 'fit-content',
      position = 'bottom-start',
    } = args;
    return (
      <Menu
        {...args}
        buttonVariant={buttonVariant}
        buttonIcon={
          buttonIcon ? (
            <Icons name={buttonIcon as unknown as IconType} />
          ) : undefined
        }
        buttonWidth={buttonWidth}
        position={position}
      />
    );
  },
  args: {
    buttonVariant: 'icon',
    items: [
      { name: 'Name' },
      { name: 'Status' },
      { name: 'Created' },
      { name: 'Updated' },
    ],
  },
};
export const WithOutlinedIconVariant: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      buttonVariant,
      buttonIcon,
      buttonWidth = 'fit-content',
      position = 'bottom-start',
    } = args;
    return (
      <Menu
        {...args}
        buttonVariant={buttonVariant}
        buttonIcon={
          buttonIcon ? (
            <Icons name={buttonIcon as unknown as IconType} />
          ) : undefined
        }
        buttonWidth={buttonWidth}
        position={position}
      />
    );
  },
  args: {
    buttonVariant: 'outlined-icon',
    items: [
      { name: 'Name' },
      { name: 'Status' },
      { name: 'Created' },
      { name: 'Updated' },
    ],
  },
};
export const WithOutlinedTextIconVariant: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      buttonVariant,
      buttonIcon,
      buttonWidth = 'fit-content',
      position = 'bottom-start',
    } = args;
    return (
      <Menu
        {...args}
        buttonVariant={buttonVariant}
        buttonIcon={
          buttonIcon ? (
            <Icons name={buttonIcon as unknown as IconType} />
          ) : undefined
        }
        buttonWidth={buttonWidth}
        position={position}
      />
    );
  },
  args: {
    buttonVariant: 'outlined-text-with-icon',
    buttonText: 'Menu Button',
    items: [
      { name: 'Name' },
      { name: 'Status' },
      { name: 'Created' },
      { name: 'Updated' },
    ],
  },
};
