import React from 'react';

import { StoryObj, Meta } from '@storybook/react';

import styles from './accordion.module.css';
import { Accordion, AccordionV2 } from './index';

import {
  Text,
  Icons,
  Switch,
  InputField,
  FloatingDropDown,
  Button,
} from '@/components';

const meta: Meta<typeof AccordionV2> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the accordion',
    },
    headerButton: {
      control: false,
      description: 'Button to be displayed on the accordion header',
    },
    content: {
      control: false,
      description: 'Content of the accordion.',
    },
    isOpen: {
      control: 'boolean',
      description:
        'Accordion component manages it own open/close state internally but if it is required to control the state from outside, use isOpen prop',
    },
    setIsOpen: {
      control: false,
      description: 'Set the state of the accordion from outside',
    },
    width: {
      control: 'text',
      description: 'Width of the accordion',
    },
    badge: {
      control: false,
      description: 'Badge to be displayed on the accordion',
    },
    footer: {
      control: false,
      description:
        'Footer to be displayed on the accordion. Only works with accordion with footer. Accepts a React Node.',
    },
  },
};

export default meta;

type AccordionStory = StoryObj<typeof Accordion>;
type AccordionV2Story = StoryObj<typeof AccordionV2>;

export const Accordions: AccordionV2Story = {
  render: (args) => {
    return (
      <div className={styles.AccordionsContainer}>
        <div>
          <Accordion
            title={args.title}
            content={
              <>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                qui fuga omnis mollitia amet nostrum obcaecati doloribus quasi
                corrupti magnam.
              </>
            }
            isOpen={args.isOpen}
            setIsOpen={undefined}
            width={args.width}
          />
        </div>
        <div>
          <AccordionV2
            title={args.title}
            headerButton={
              <Button variant="secondary" onClick={(e) => e.stopPropagation()}>
                Settings
              </Button>
            }
            content={
              <div className={styles.contentPadding}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                qui fuga omnis mollitia amet nostrum obcaecati doloribus quasi
                corrupti magnam.
              </div>
            }
            width={args.width}
            badge={<span className={styles.accordionV2Badge}>LIVE</span>}
            isOpen={args.isOpen}
            setIsOpen={undefined}
            footer={
              <div className={styles.footerStyling}>
                <Text
                  variant="body-text-sm"
                  children="Update user info"
                  color="info"
                />
                <Button variant="primary" children="Update" />
              </div>
            }
          />
        </div>
      </div>
    );
  },
  args: {
    title: 'Accordion',
    isOpen: false,
    width: '450px',
  },
};

export const For_Setting_Options: AccordionStory = {
  render: (args) => {
    const [horizontalAxis, setHorizontalAxis] = React.useState({
      axisLine: false,
      splitLine: false,
      label: true,
      labelRotation: 0,
      truncateLabel: 0,
    });

    const labelRotation = [
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

    const { title, isOpen, setIsOpen, width, badge } = args;

    return (
      <Accordion
        title={title}
        content={
          <>
            <div className={styles.accordionItem}>
              <Text variant="body-text" children="Axis Line" />
              <Switch
                name="axisLine"
                defaultEnabled={false}
                enabled={horizontalAxis.axisLine}
                onChange={() =>
                  setHorizontalAxis((prev: any) => ({
                    ...prev,
                    axisLine: !prev.axisLine,
                  }))
                }
              />
            </div>

            <div className={styles.accordionItem}>
              <Text variant="body-text" children="Split Line" />
              <Switch
                name="splitLine"
                defaultEnabled={false}
                enabled={horizontalAxis.splitLine}
                onChange={() =>
                  setHorizontalAxis((prev: any) => ({
                    ...prev,
                    splitLine: !prev.splitLine,
                  }))
                }
              />
            </div>

            <div className={styles.accordionItem}>
              <Text variant="body-text" children="Axis label" />
              <Switch
                name="Axis label"
                defaultEnabled={false}
                enabled={horizontalAxis.label}
                onChange={() =>
                  setHorizontalAxis((prev: any) => ({
                    ...prev,
                    label: !prev.label,
                  }))
                }
              />
            </div>

            <div className={styles.accordionItem}>
              <Text variant="body-text" children="Label Rotation" />
              <div>
                <FloatingDropDown
                  onChange={() => {}}
                  options={labelRotation}
                  selectedOption={labelRotation[0]}
                  menuWidth="150px"
                  buttonWidth="150px"
                />
              </div>
            </div>

            <div className={styles.accordionItem}>
              <Text variant="body-text" children="Label Rotation" />
              <div className="dbn-w-[150px]">
                <InputField
                  defaultValue={5}
                  onChange={function ro() {}}
                  type="text"
                />
              </div>
            </div>
          </>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width={width}
        badge={badge}
      />
    );
  },
  args: {
    title: 'Horizontal Axis',
    isOpen: false,
    setIsOpen: undefined,
    width: '350px',
    badge: undefined,
  },
};

export const Workspace_Accordion: AccordionV2Story = {
  render: (args) => {
    const { title, isOpen, setIsOpen, width, badge, footer } = args;
    return (
      <AccordionV2
        title={title}
        headerButton={
          <Button variant="secondary" onClick={(e) => e.stopPropagation()}>
            Settings
          </Button>
        }
        content={
          <>
            <section className={styles.WorkspaceAccordionContent}>
              <div>
                <Icons name="chart" />
                <Text variant="body-text-sm" children="Untitled Dashboard" />
              </div>
              <div>
                <Text
                  variant="body-text-sm"
                  children="id-1sr3yx4"
                  color="secondary-dark"
                />
              </div>
              <div>
                <Text variant="body-text-sm" children="AP" color="white" />
                <Text variant="body-text-sm" children="KV" color="white" />
              </div>
              <div>
                <Text variant="body-text-sm" children="8h ago" />
              </div>
              <div>
                <Icons name="kebab-menu-vertical" />
              </div>
            </section>
            <section className={styles.WorkspaceAccordionContent}>
              <div>
                <Icons name="chart" />
                <Text variant="body-text-sm" children="Sample task dashboard" />
              </div>
              <div>
                <Text
                  variant="body-text-sm"
                  children="id-cs3d131"
                  color="secondary-dark"
                />
              </div>
              <div>
                <Text variant="body-text-sm" children="AP" color="white" />
                <Text variant="body-text-sm" children="KV" color="white" />
              </div>
              <div>
                <Text variant="body-text-sm" children="4d ago" />
              </div>
              <div>
                <Icons name="kebab-menu-vertical" />
              </div>
            </section>
            <section className={styles.WorkspaceAccordionContent}>
              <div>
                <Icons name="chart" />
                <Text
                  variant="body-text-sm"
                  children="Spendflo Live V2 Dashboard"
                />
              </div>
              <div>
                <Text
                  variant="body-text-sm"
                  children="id-1sr3yx4"
                  color="secondary-dark"
                />
              </div>
              <div>
                <Text variant="body-text-sm" children="AP" color="white" />
                <Text variant="body-text-sm" children="KV" color="white" />
              </div>
              <div>
                <Text variant="body-text-sm" children="8h ago" />
              </div>
              <div>
                <Icons name="kebab-menu-vertical" />
              </div>
            </section>
          </>
        }
        width={width}
        badge={badge}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        footer={footer}
      />
    );
  },
  args: {
    title: 'Spendflow Production',
    isOpen: false,
    setIsOpen: undefined,
    width: '800px',
    badge: <span className={styles.accordionV2Badge}>LIVE</span>,
    footer: (
      <div className={styles.accordionFooterButton}>
        <Icons name="plus" color="info" />
        <Text
          variant="body-text-sm"
          color="info"
          children="Create a new dashboard"
        />
      </div>
    ),
  },
};
