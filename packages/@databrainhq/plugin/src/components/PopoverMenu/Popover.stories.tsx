/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import style from './PopoverMenu.module.css';
import { PopoverMenu } from '.';
import { Text, Icons, Button, SearchTab, Tooltip, Tabs } from '@/components';

const meta: Meta<typeof PopoverMenu> = {
  title: 'components/Popover',
  component: PopoverMenu,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    children: {
      control: false,
    },
    position: {
      control: { type: 'select' },
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
    offset: {
      control: 'array',
      description:
        'Offset Info - https://popper.js.org/docs/v2/modifiers/offset/',
    },
    overFlowDetection: {
      control: 'boolean',
      description:
        'Detects if the menu is overflowing the viewport and reposition it if so.',
    },
    menuWidth: {
      control: 'text',
      description: 'Width of the popover menu',
    },
    buttonContent: {
      control: false,
    },
    tabMenu: {
      control: 'boolean',
      description:
        'Set this prop to true when using Tabs in popover menu so that the tabs are not closed when clicked on them. Can also be used with other components that need to be clicked on without closing the popover menu.',
    },
    autoCloseParent: {
      control: 'boolean',
      description:
        'In case if the popover menus are nested this props help in deciding the outside click close behaviour of the parent popover menu. If set to true it will close the parent popover menu when the child popover menu is close when clicked outside else if set to false when clicked outside it will one by one close the popover starting from child to parent .',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PopoverMenu>;

export const ChartPopover: Story = {
  render: (args) => {
    const { isDisabled } = args;
    return (
      <div className={style.popContainer}>
        <div className={style.barButtonContainer}>
          <div className={style.barButtonWrapper}>
            <Icons name="bar-chart-2" size="xl" />
            Basic Bar Chart
          </div>
          <PopoverMenu
            buttonContent={
              <Icons
                name="kebab-menu-vertical"
                size="sm"
                color="secondary-dark"
              />
            }
            overFlowDetection={args.overFlowDetection}
            position={args.position}
            menuWidth={args.menuWidth}
            isDisabled={isDisabled}
            offset={args.offset}
          >
            <Button
              type="button"
              variant="popover"
              onClick={() => {}}
              fitContainer
            >
              <div className={style.popOption2}>
                <Icons name="pencil-simple-line" size="md" />
                Edit
              </div>
            </Button>
            <Button
              type="button"
              variant="popover"
              onClick={() => {}}
              fitContainer
            >
              <div className={style.popOption2}>
                <Icons name="delete" size="md" />
                Delete
              </div>
            </Button>
            <Button
              type="button"
              variant="popover"
              onClick={() => {}}
              fitContainer
            >
              <div className={style.popOption2}>
                <Icons name="eye-slash" size="md" />
                Hide view
              </div>
            </Button>
          </PopoverMenu>
        </div>
      </div>
    );
  },
  args: {
    isDisabled: false,
    menuWidth: '169px',
    offset: [-10, 15],
    position: 'right-start',
  },
};

export const Popover: Story = {
  render: (args) => {
    const [, setSearchKeyword] = useState('');
    return (
      <div className={style.popContainer}>
        <PopoverMenu
          buttonContent={
            <div className={style.popButton}>
              <Text variant="label">3</Text>
              <Icons name="chevron-down" />
            </div>
          }
          position={args.position}
          offset={args.offset}
        >
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption}>Draft</div>
          </Button>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption}>Product Details</div>
          </Button>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption}>Sales</div>
          </Button>
        </PopoverMenu>
        <PopoverMenu
          buttonContent={
            <div className={style.popButton}>
              <Text variant="label">Saved queries</Text>
              <Icons name="chevron-down" />
            </div>
          }
          position={args.position}
          offset={args.offset}
        >
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption}>
              Amount
              <Icons name="info" size="md" />
            </div>
          </Button>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption}>
              Data
              <Icons name="info" size="md" />
            </div>
          </Button>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption}>
              Hide view
              <Icons name="info" size="md" />
            </div>
          </Button>
        </PopoverMenu>
        <PopoverMenu
          buttonContent={
            <div className={style.popButton2}>
              <Icons name="caret-down-fill" color="primary" />
            </div>
          }
          position={args.position}
          offset={args.offset}
          menuWidth="274px"
        >
          <div className={style.searchDiv}>
            <Icons name="pencil-simple-line" />
            <SearchTab setSearchKeyword={setSearchKeyword} placeholder="name" />
          </div>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption2}>
              <Icons name="arrow-up" size="md" />
              Sort ascending
            </div>
          </Button>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption2}>
              <Icons name="arrow-down" size="md" />
              Sort descending
            </div>
          </Button>
          <Button
            type="button"
            variant="popover"
            onClick={() => {}}
            fitContainer
          >
            <div className={style.popOption2}>
              <Icons name="info" size="md" />
              Hide view
            </div>
          </Button>
        </PopoverMenu>
      </div>
    );
  },
  args: {
    isDisabled: false,
    offset: [0, 10],
  },
};

export const PopoverTab: Story = {
  render: (args) => {
    return (
      <PopoverMenu
        tabMenu={args.tabMenu}
        offset={args.offset}
        position={args.position}
        menuWidth={args.menuWidth}
        overFlowDetection={args.overFlowDetection}
        buttonContent={<Button variant="primary">Popover Tab</Button>}
      >
        <div className={style.tabsContainer}>
          <Tabs.Context variant="popoverTabs">
            <Tabs.List>
              <Tabs.Tab tabId="tab1" grow>
                Sort
              </Tabs.Tab>
              <Tabs.Tab tabId="tab2" grow>
                Option
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel tabId="tab1">
              <div data-test>
                <Button
                  type="button"
                  variant="popover"
                  onClick={() => {}}
                  fitContainer
                >
                  <div className={style.popOption2}>
                    <Icons name="arrow-up" size="md" />
                    Sort ascending
                  </div>
                </Button>
                <Button
                  type="button"
                  variant="popover"
                  onClick={() => {}}
                  fitContainer
                >
                  <div className={style.popOption2}>
                    <Icons name="arrow-down" size="md" />
                    Sort descending
                  </div>
                </Button>
                <Button
                  type="button"
                  variant="popover"
                  onClick={() => {}}
                  fitContainer
                >
                  <div className={style.popOption2}>
                    <Icons name="info" size="md" />
                    Hide view
                  </div>
                </Button>
              </div>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab2">
              <SearchTab setSearchKeyword={() => {}} placeholder="name" />
              <Button
                type="button"
                variant="popover"
                onClick={() => {}}
                fitContainer
              >
                <div className={style.popOption}>
                  Amount
                  <div>
                    <Tooltip content={<Icons name="info" size="md" />}>
                      Test
                    </Tooltip>
                  </div>
                </div>
              </Button>
              <Button
                type="button"
                variant="popover"
                onClick={() => {}}
                fitContainer
              >
                <div className={style.popOption}>
                  Data
                  <div>
                    <Tooltip content={<Icons name="info" size="md" />}>
                      Test
                    </Tooltip>
                  </div>
                </div>
              </Button>
              <Button
                type="button"
                variant="popover"
                onClick={() => {}}
                fitContainer
              >
                <div className={style.popOption}>
                  Hide View
                  <div>
                    <Tooltip content={<Icons name="info" size="md" />}>
                      Test
                    </Tooltip>
                  </div>
                </div>
              </Button>
            </Tabs.Panel>
          </Tabs.Context>
        </div>
      </PopoverMenu>
    );
  },
  args: {
    isDisabled: false,
    offset: [0, 10],
    position: 'bottom-start',
    menuWidth: '400px',
    tabMenu: true,
  },
};

export const nestedPopover: Story = {
  render: (args) => {
    return (
      <div>
        <PopoverMenu
          tabMenu={args.tabMenu}
          offset={args.offset}
          position={args.position}
          menuWidth={args.menuWidth}
          overFlowDetection={args.overFlowDetection}
          buttonContent={<Button variant="primary">Nested Popover</Button>}
        >
          <div className={style.tabsContainer}>
            <Tabs.Context variant="popoverTabs">
              <Tabs.List>
                <Tabs.Tab tabId="tab1" grow>
                  Auto close true
                </Tabs.Tab>
                <Tabs.Tab tabId="tab2" grow>
                  Auto close false
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel tabId="tab1">
                <Text variant="body-text-sm">
                  This is a nested popover menu with autoCloseParent prop set to
                  true. Open the popover and try clicking outside the boundary
                  of both the popover menus to see the difference.
                </Text>
                <div className={style.tabsContainer}>
                  <PopoverMenu
                    buttonContent={
                      <Button variant="primary">Child popover</Button>
                    }
                    autoCloseParent
                    position="right-start"
                    buttonWidth="110px"
                  >
                    <Button
                      type="button"
                      variant="popover"
                      onClick={() => {}}
                      fitContainer
                    >
                      <div className={style.popOption2}>
                        <Icons name="pencil-simple-line" size="md" />
                        Edit
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="popover"
                      onClick={() => {}}
                      fitContainer
                    >
                      <div className={style.popOption2}>
                        <Icons name="delete" size="md" />
                        Delete
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="popover"
                      onClick={() => {}}
                      fitContainer
                    >
                      <div className={style.popOption2}>
                        <Icons name="eye-slash" size="md" />
                        Hide view
                      </div>
                    </Button>
                  </PopoverMenu>
                </div>
              </Tabs.Panel>
              <Tabs.Panel tabId="tab2">
                <Text variant="body-text-sm">
                  This is a nested popover menu with autoCloseParent prop set to
                  false (default). This is a nested popover menu with
                  autoCloseParent prop set to true. Open the popover and try
                  clicking outside the boundary of both the popover menus to see
                  the difference.
                </Text>
                <div className={style.tabsContainer}>
                  <PopoverMenu
                    buttonContent={
                      <Button variant="primary">Child popover</Button>
                    }
                    autoCloseParent={false}
                    position="right-start"
                    buttonWidth="110px"
                  >
                    <Button
                      type="button"
                      variant="popover"
                      onClick={() => {}}
                      fitContainer
                    >
                      <div className={style.popOption2}>
                        <Icons name="pencil-simple-line" size="md" />
                        Edit
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="popover"
                      onClick={() => {}}
                      fitContainer
                    >
                      <div className={style.popOption2}>
                        <Icons name="delete" size="md" />
                        Delete
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="popover"
                      onClick={() => {}}
                      fitContainer
                    >
                      <div className={style.popOption2}>
                        <Icons name="eye-slash" size="md" />
                        Hide view
                      </div>
                    </Button>
                  </PopoverMenu>
                </div>
              </Tabs.Panel>
            </Tabs.Context>
          </div>
        </PopoverMenu>
      </div>
    );
  },
  args: {
    isDisabled: false,
    offset: [0, 10],
    position: 'bottom-start',
    menuWidth: '400px',
    tabMenu: true,
  },
};
