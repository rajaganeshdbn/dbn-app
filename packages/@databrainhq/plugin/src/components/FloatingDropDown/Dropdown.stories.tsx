/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import style from './dropdown.module.css';
import {
  FloatingDropDown,
  Button,
  Icons,
  Text,
  MultiSelectAccordianDropdown,
  MultiSelectDropdown,
  PopoverMenu,
} from '@/components';
import { FloatingDropDownOption } from '@/types';

const meta: Meta<typeof FloatingDropDown> = {
  title: 'components/Dropdown',
  component: FloatingDropDown,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the dropdown',
    },
    onChange: {
      control: false,
      description: 'Do something when the checkbox state changes',
    },
    labelVariant: {
      control: { type: 'radio' },
      options: ['static', 'floating'],
    },
    selectedOption: {
      control: false,
    },
    button: {
      control: false,
    },
    options: {
      control: false,
    },
    icon: {
      control: false,
    },
    buttonWidth: {
      control: { type: 'text' },
    },
    menuWidth: {
      control: { type: 'text' },
    },
    isSearchEnabled: {
      control: { type: 'boolean' },
    },
    searchPlaceholder: {
      control: { type: 'text' },
    },
  },
};

const options = [
  {
    label: 'Demo Workspace',
    value: 'demo',
    badge: 'dev',
    subValue: 'Databrain demo instance',
  },
  {
    label: 'Draft',
    value: 'draft',
    badge: 'staging',
    subValue: 'Red shift',
  },
];

const options2 = [
  {
    label: 'Dashboard 1',
    value: 'd1',
    subValue: 'ID: id-1234',
  },
  {
    label: 'Dashboard 2',
    value: 'd2',
    subValue: 'ID: id-2345',
  },
];

const options3 = [
  {
    label: 'Red shift',
    value: 'd1',
    badge: 'staging',
  },
  {
    label: 'Red shift',
    value: 'd2',
    badge: 'dev',
  },
];

const options4 = [
  {
    label: '0',
    value: '0',
    icon: 'text-rotation-none',
  },
  {
    label: '45',
    value: '45',
    icon: 'text-rotation-angle-up',
  },
  {
    label: '90',
    value: '90',
    icon: 'text-rotation-up',
  },
];

const options5 = [
  {
    label: 'public.cleaned_sales_data',
    value: 'public.cleaned_sales_data',
    columnList: [
      {
        datatype: 'character varying(65535)',
        name: 'city',
        as: 'city',
      },
      {
        datatype: 'character varying(65535)',
        name: 'phone',
        as: 'phone',
      },
      {
        datatype: 'double precision',
        name: 'sales',
        as: 'sales',
      },
      {
        datatype: 'character varying(65535)',
        name: 'state',
        as: 'state',
      },
      {
        datatype: 'character varying(65535)',
        name: 'status',
        as: 'status',
      },
      {
        datatype: 'character varying(65535)',
        name: 'country',
        as: 'country',
      },
      {
        datatype: 'bigint',
        name: 'quarter',
        as: 'quarter',
      },
      {
        datatype: 'character varying(65535)',
        name: 'deal_size',
        as: 'deal_size',
      },
      {
        datatype: 'character varying(65535)',
        name: 'territory',
        as: 'territory',
      },
      {
        datatype: 'timestamp without time zone',
        name: 'order_date',
        as: 'order_date',
      },
      {
        datatype: 'double precision',
        name: 'price_each',
        as: 'price_each',
      },
      {
        datatype: 'character varying(65535)',
        name: 'postal_code',
        as: 'postal_code',
      },
      {
        datatype: 'bigint',
        name: 'order_number',
        as: 'order_number',
      },
      {
        datatype: 'character varying(65535)',
        name: 'product_code',
        as: 'product_code',
      },
      {
        datatype: 'character varying(65535)',
        name: 'product_line',
        as: 'product_line',
      },
      {
        datatype: 'character varying(65535)',
        name: 'address_line1',
        as: 'address_line1',
      },
      {
        datatype: 'character varying(65535)',
        name: 'address_line2',
        as: 'address_line2',
      },
      {
        datatype: 'character varying(65535)',
        name: 'customer_name',
        as: 'customer_name',
      },
      {
        datatype: 'bigint',
        name: 'quantity_ordered',
        as: 'quantity_ordered',
      },
      {
        datatype: 'character varying(65535)',
        name: 'contact_last_name',
        as: 'contact_last_name',
      },
      {
        datatype: 'bigint',
        name: 'order_line_number',
        as: 'order_line_number',
      },
      {
        datatype: 'character varying(65535)',
        name: 'contact_first_name',
        as: 'contact_first_name',
      },
      {
        datatype: 'character varying(256)',
        name: '_airbyte_ab_id',
        as: '_airbyte_ab_id',
      },
      {
        datatype: 'timestamp with time zone',
        name: '_airbyte_emitted_at',
        as: '_airbyte_emitted_at',
      },
      {
        datatype: 'timestamp without time zone',
        name: '_airbyte_normalized_at',
        as: '_airbyte_normalized_at',
      },
      {
        datatype: 'character varying(32)',
        name: '_airbyte_cleaned_sales_data_hashid',
        as: '_airbyte_cleaned_sales_data_hashid',
      },
    ],
  },
  {
    label: 'databrain.order_purchased',
    value: 'databrain.order_purchased',
    columnList: [
      {
        datatype: 'character varying(65535)',
        name: 'city',
        as: 'city',
      },
      {
        datatype: 'character varying(65535)',
        name: 'phone',
        as: 'phone',
      },
      {
        datatype: 'double precision',
        name: 'sales',
        as: 'sales',
      },
      {
        datatype: 'character varying(65535)',
        name: 'state',
        as: 'state',
      },
      {
        datatype: 'character varying(65535)',
        name: 'status',
        as: 'status',
      },
      {
        datatype: 'character varying(65535)',
        name: 'country',
        as: 'country',
      },
      {
        datatype: 'bigint',
        name: 'quarter',
        as: 'quarter',
      },
      {
        datatype: 'character varying(65535)',
        name: 'deal_size',
        as: 'deal_size',
      },
      {
        datatype: 'character varying(65535)',
        name: 'territory',
        as: 'territory',
      },
      {
        datatype: 'timestamp without time zone',
        name: 'order_date',
        as: 'order_date',
      },
      {
        datatype: 'double precision',
        name: 'price_each',
        as: 'price_each',
      },
      {
        datatype: 'character varying(65535)',
        name: 'postal_code',
        as: 'postal_code',
      },
      {
        datatype: 'bigint',
        name: 'order_number',
        as: 'order_number',
      },
      {
        datatype: 'character varying(65535)',
        name: 'product_code',
        as: 'product_code',
      },
      {
        datatype: 'character varying(65535)',
        name: 'product_line',
        as: 'product_line',
      },
      {
        datatype: 'character varying(65535)',
        name: 'address_line1',
        as: 'address_line1',
      },
      {
        datatype: 'character varying(65535)',
        name: 'address_line2',
        as: 'address_line2',
      },
      {
        datatype: 'character varying(65535)',
        name: 'customer_name',
        as: 'customer_name',
      },
      {
        datatype: 'bigint',
        name: 'quantity_ordered',
        as: 'quantity_ordered',
      },
      {
        datatype: 'character varying(65535)',
        name: 'contact_last_name',
        as: 'contact_last_name',
      },
      {
        datatype: 'bigint',
        name: 'order_line_number',
        as: 'order_line_number',
      },
      {
        datatype: 'character varying(65535)',
        name: 'contact_first_name',
        as: 'contact_first_name',
      },
      {
        datatype: 'character varying(256)',
        name: '_airbyte_ab_id',
        as: '_airbyte_ab_id',
      },
      {
        datatype: 'timestamp with time zone',
        name: '_airbyte_emitted_at',
        as: '_airbyte_emitted_at',
      },
      {
        datatype: 'timestamp without time zone',
        name: '_airbyte_normalized_at',
        as: '_airbyte_normalized_at',
      },
      {
        datatype: 'character varying(32)',
        name: '_airbyte_cleaned_sales_data_hashid',
        as: '_airbyte_cleaned_sales_data_hashid',
      },
    ],
  },
];

export default meta;
type Story = StoryObj<typeof FloatingDropDown>;

export const With_Badge: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption>(
      options[0]
    );
    return (
      <FloatingDropDown
        label={args.label}
        labelVariant={args.labelVariant}
        options={options}
        isDisabled={isDisabled}
        selectedOption={selectedVal}
        onChange={(option) => setSelectedVal(option)}
        button={
          <Button variant="primary" fitContainer>
            Create New Workspace
          </Button>
        }
        isSearchEnabled={args.isSearchEnabled}
        buttonWidth={args.buttonWidth}
        menuWidth={args.menuWidth}
        searchPlaceholder={args.searchPlaceholder}
      />
    );
  },
  args: {
    isDisabled: false,
    label: 'Workspace',
    labelVariant: 'floating',
  },
};

export const With_Icon_and_Badge: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption>(
      options[0]
    );
    return (
      <FloatingDropDown
        label={args.label}
        labelVariant={args.labelVariant}
        options={options}
        isDisabled={isDisabled}
        selectedOption={selectedVal}
        onChange={(option) => setSelectedVal(option)}
        button={
          <Button variant="primary" fitContainer>
            Create New Workspace
          </Button>
        }
        icon={
          <PopoverMenu
            buttonContent={
              <span data-closepopover="remainOpen">
                <Icons name="gear" size="xs" />
              </span>
            }
            position="right-start"
            offset={[0, 30]}
            menuWidth="172px"
            autoCloseParent
          >
            <Button variant="popover" fitContainer>
              <div className={style.popOption}>
                <Text variant="body-text-sm">Access Permissions</Text>
              </div>
            </Button>
            <Button variant="popover" fitContainer>
              <div className={style.popOption}>
                <Text variant="body-text-sm">Manage Theme</Text>
              </div>
            </Button>
            <Button variant="popover" fitContainer>
              <div className={style.popOption}>
                <Text variant="body-text-sm">Manage Workspace</Text>
              </div>
            </Button>
            <Button variant="popover" fitContainer>
              <div className={style.popOption}>
                <Text variant="body-text-sm">Embed Settings</Text>
              </div>
            </Button>
          </PopoverMenu>
        }
        isSearchEnabled={args.isSearchEnabled}
        buttonWidth={args.buttonWidth}
        menuWidth={args.menuWidth}
        searchPlaceholder={args.searchPlaceholder}
      />
    );
  },
  args: {
    isDisabled: false,
    label: 'Workspace',
    labelVariant: 'floating',
  },
};

export const With_icon: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption>(
      options2[0]
    );
    return (
      <FloatingDropDown
        label={args.label}
        labelVariant={args.labelVariant}
        options={options2}
        isDisabled={isDisabled}
        selectedOption={selectedVal}
        onChange={(option) => setSelectedVal(option)}
        button={
          <Button variant="primary" fitContainer>
            Create New Dashboard
          </Button>
        }
        icon={<Icons name="pencil-simple" size="md" />}
        isSearchEnabled={args.isSearchEnabled}
        buttonWidth={args.buttonWidth}
        menuWidth={args.menuWidth}
        searchPlaceholder={args.searchPlaceholder}
      />
    );
  },
  args: {
    isDisabled: false,
    label: 'Dashboard',
    labelVariant: 'floating',
  },
};

export const Datasource: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption>(
      options3[0]
    );
    return (
      <FloatingDropDown
        label={args.label}
        labelVariant={args.labelVariant}
        options={options3}
        isDisabled={isDisabled}
        selectedOption={selectedVal}
        onChange={(option) => setSelectedVal(option)}
        button={
          <Button variant="secondary" fitContainer>
            Add New Datasource
          </Button>
        }
        buttonWidth={args.buttonWidth}
        menuWidth={args.menuWidth}
        isSearchEnabled={args.isSearchEnabled}
        searchPlaceholder={args.searchPlaceholder}
      />
    );
  },
  args: {
    isDisabled: false,
    label: 'Datasource',
    labelVariant: 'static',
    buttonWidth: '548px',
    menuWidth: '548px',
  },
};

export const Select_Dropdown: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption>(
      options4[0]
    );
    return (
      <FloatingDropDown
        label={args.label}
        labelVariant={args.labelVariant}
        isDisabled={isDisabled}
        isSearchEnabled={args.isSearchEnabled}
        onChange={(option) => setSelectedVal(option)}
        options={options4}
        selectedOption={selectedVal}
        searchPlaceholder={args.searchPlaceholder}
        menuWidth={args.menuWidth}
        buttonWidth={args.buttonWidth}
      />
    );
  },
  args: {
    isDisabled: false,
    searchPlaceholder: '0',
    isSearchEnabled: true,
    menuWidth: '150px',
    buttonWidth: '150px',
  },
};

export const MultiSelect_Accordian_Dropdown: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption>(
      options5[0]
    );
    return (
      <MultiSelectAccordianDropdown
        onChange={(option) => setSelectedVal(option)}
        options={options5}
        selectedOption={selectedVal}
        menuWidth={args.menuWidth}
        buttonWidth={args.buttonWidth}
        label={args.label}
        isSearchEnabled={args.isSearchEnabled}
        searchPlaceholder={args.searchPlaceholder}
        labelVariant={args.labelVariant}
        isDisabled={isDisabled}
      />
    );
  },
  args: {
    isDisabled: false,
    label: 'Table',
    labelVariant: 'static',
    menuWidth: '513px',
    buttonWidth: '513px',
  },
};

export const MultiSelect_Dropdown: Story = {
  render: (args) => {
    const { isDisabled } = args;
    const [selectedVal, setSelectedVal] = useState<FloatingDropDownOption[]>(
      []
    );
    return (
      <MultiSelectDropdown
        labelVariant={args.labelVariant}
        label={args.label}
        isSearchEnabled={args.isSearchEnabled}
        onChange={(options) => setSelectedVal(options)}
        options={options5}
        selectedOption={selectedVal}
        menuWidth={args.menuWidth}
        buttonWidth={args.buttonWidth}
        searchPlaceholder={args.searchPlaceholder}
        isDisabled={isDisabled}
      />
    );
  },
  args: {
    isDisabled: false,
    label: 'Table',
    labelVariant: 'static',
    isSearchEnabled: true,
    menuWidth: '513px',
    buttonWidth: '513px',
  },
};
