/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styles from './panel.module.css';

import { Panel } from '.';
import {
  Button,
  FloatingDropDown,
  Icons,
  NewTooltip,
  Text,
} from '@/components';
import { ICONS_LIST, RowLimitList } from '@/consts';

const meta: Meta<typeof Panel> = {
  title: 'components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    side: {
      options: ['right', 'left'],
      control: { type: 'radio' },
      description: 'Which side to open the panel defaults to left.',
    },
    children: {
      control: 'text',
      description: 'Any jsx or component to show inside the panel.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Control to show and hide the panel.',
    },
    onClose: {
      control: false,
      description: 'Callback when clicked outside or cross icon button.',
    },
    icon: {
      control: { type: 'select' },
      options: ICONS_LIST,
      description: 'The icon present at the right side inside the button',
    },
    headerTitle: {
      control: 'text',
      description: 'The title of the panel.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'The size of the panel, defaults to small.',
    },
    hideFooter: {
      control: 'boolean',
      description: 'Hide the footer incase needs a custom footer.',
    },
    hideHeader: {
      control: 'boolean',
      description: 'Hide the header incase needs a custom header.',
    },
    primaryActionText: {
      control: 'text',
      description:
        'If the footer is not hidden then the text label to display for the primary action button.',
    },
    zIndex: {
      control: 'number',
      description:
        'Control the z-index value when rendered in fullscreen or something similar.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const WithCustomHeader: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { hideHeader } = args;
    return <Panel {...args} hideHeader={hideHeader} />;
  },
  args: {
    hideHeader: true,
    children: (
      <div className={styles.panelStory}>
        <header className={styles.panelStoryHeader}>
          <Text variant="heading-lg">SQL</Text>
          <div className={styles.panelStoryHeaderRight}>
            <NewTooltip position="left" text="Undo">
              <Button type="button" variant="tertiary" title="Undo">
                <Icons name="undo" />
              </Button>
            </NewTooltip>
            <NewTooltip position="left" text="Redo">
              <Button type="button" variant="tertiary" title="Redo">
                <Icons name="redo" />
              </Button>
            </NewTooltip>
            <NewTooltip position="left" text="Minimize">
              <Button
                type="button"
                variant="tertiary"
                className="dbn-mt-2 dbn-ml-2 dbn-border-l"
              >
                <Icons name="minimize" />
              </Button>
            </NewTooltip>
            <NewTooltip position="left" text="Close Editor">
              <Button type="button" variant="tertiary" title="Close">
                <Icons name="cross" />
              </Button>
            </NewTooltip>
          </div>
        </header>
        <main className={styles.panelStoryContent}>Main Panel Content</main>
      </div>
    ),
  },
};
export const WithCustomFooter: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { hideFooter } = args;
    return <Panel {...args} hideFooter={hideFooter} />;
  },
  args: {
    hideHeader: true,
    children: (
      <div className={styles.panelStory}>
        <main className={styles.panelStoryContent}>Main Panel Content</main>
        <footer className={styles.panelStoryFooter}>
          <div className={styles.panelStoryFooterLeft}>
            <div className={styles.panelStoryFooterLeftWrapper}>
              <Text variant="body-text">
                <span className="dbn-whitespace-nowrap">Apply Limit:</span>
              </Text>
              <FloatingDropDown
                options={RowLimitList}
                selectedOption={{ label: '', value: '' }}
                onChange={() => {}}
                labelVariant="static"
                buttonWidth="100px"
                menuWidth="150px"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              title="Format Query"
              leftIcon={<Icons name="format" />}
            >
              Format Query
            </Button>
          </div>
          <Button
            type="submit"
            variant="primary"
            title="Run Query"
            fitContainer
          >
            Run Query
          </Button>
        </footer>
      </div>
    ),
  },
};
