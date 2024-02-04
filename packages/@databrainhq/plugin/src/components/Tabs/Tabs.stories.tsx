import React from 'react';

import type { Meta } from '@storybook/react';
import style from './tabs.module.css';
import { Tabs } from '.';

import { SearchTab, Tooltip, Icons, Button } from '@/components';

type TabsProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'popoverTabs';
  defaultActiveTab?: string | number;
  width?: string;
  grow?: boolean;
  tabId: string;
};

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content of the component',
    },
    variant: {
      description: 'Variant of the tabs: primary | popoverTabs',
    },
    defaultActiveTab: {
      description: 'Set the default active tab by setting the tabId',
    },
    width: {
      description: 'Set the width of the tabs and tablist',
    },
    grow: {
      description:
        'Set the tab to grow to fill the available space and align the tabs in the center',
    },
    tabId: {
      description: 'Set the tabId, Set same tabId for tab and panel',
    },
  },
};

export default meta;

export const primary = {
  render: (args: any) => {
    return (
      <Tabs.Context variant={args.variant} width={args.width}>
        <Tabs.List>
          <Tabs.Tab tabId="tab1" grow={args.grow}>
            Saved
          </Tabs.Tab>
          <Tabs.Tab tabId="tab2" grow={args.grow}>
            Create
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel tabId="tab1">
          <div>
            {' '}
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
          <div className="dbn-mb-2">
            <SearchTab setSearchKeyword={() => {}} placeholder="name" />
          </div>
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
    );
  },
  args: {
    variant: 'primary',
    defaultActiveTab: 'tab1',
    width: '100%',
    grow: false,
  },
};

export const PopoverTabs = {
  render: (args: any) => {
    return (
      <Tabs.Context variant={args.variant} width={args.width}>
        <Tabs.List>
          <Tabs.Tab tabId="tab1" grow={args.grow}>
            Tab 1
          </Tabs.Tab>
          <Tabs.Tab tabId="tab2" grow={args.grow}>
            Tab 2
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel tabId="tab1">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          aperiam. Illo vero optio inventore debitis, error nesciunt itaque
          labore unde ex. Iure inventore animi iste doloremque! Impedit eaque
          aliquid veritatis? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, error dolorum atque explicabo quo dolores totam
          eveniet aut veniam laboriosam quae ratione distinctio architecto
          praesentium modi alias necessitatibus
        </Tabs.Panel>
        <Tabs.Panel tabId="tab2">
          fugit rerum ipsam. Itaque, veniam blanditiis aperiam aliquid amet rem
          recusandae distinctio, eveniet obcaecati sunt consequuntur autem
          incidunt! Tempore, atque. Aspernatur aut totam, alias, omnis ipsam ut
          perspiciatis maiores nobis odio corporis sint nesciunt animi
          voluptates ad quas officiis hic, vero repellat unde dolorem
          asperiores. Id at maiores inventore adipisci nisi repudiandae, dicta
          esse quas. Exercitationem quam quod dolor possimus atque architecto
          maiores tempora, voluptate non quo totam, nemo cum similique
          dignissimos?
        </Tabs.Panel>
      </Tabs.Context>
    );
  },
  args: {
    variant: 'popoverTabs',
    defaultActiveTab: 'tab1',
    width: '500px',
    grow: true,
  },
};
