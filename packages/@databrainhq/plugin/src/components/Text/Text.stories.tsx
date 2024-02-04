import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styles from './text.module.css';

import { Text } from '.';
import { colorsArray } from '@/utils';

const meta: Meta<typeof Text> = {
  title: 'components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'heading-lg',
        'heading',
        'body-text',
        'body-text',
        'body-text-sm',
        'btn',
        'label',
        'display',
      ],
      control: { type: 'select' },
      description: 'Style variations of the text',
    },
    children: {
      control: 'text',
      description: 'Content inside the text',
    },
    color: {
      options: colorsArray,
      control: { type: 'select' },
      description: 'Color variations of the text',
    },
    display: {
      options: ['block', 'inline'],
      control: { type: 'radio' },
      description: 'Display variations of the text',
    },
    opacity: {
      options: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      control: { type: 'select' },
      description: 'Opacity variations of the text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  render: (args) => {
    const { variant, color, display, children, opacity } = args;
    return (
      <div className={styles.storyBookPrimary}>
        <Text
          variant={variant}
          color={color}
          opacity={opacity}
          display={display}
        >
          {children}
        </Text>
        {/* Alternatively, you can use the following: */}
        {/* <Text variant="" color="" display="" children="" /> */}
      </div>
    );
  },
  args: {
    variant: 'heading-lg',
    color: 'primary',
    children: 'Hello World',
  },
};

export const Text_Component: Story = {
  render: () => {
    return (
      <div className={styles.storyBookPrimary}>
        <h1 className={styles.primaryStoryHeading}>Text Component</h1>
        <section className={styles.primaryStorySection}>
          <div>
            <Text variant="display">Display Text</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Extra bold, 30, Line height : 36)
            </p>
          </div>

          <div>
            <Text variant="heading-lg">Heading 1</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Semi bold, 18, Line height : normal)
            </p>
          </div>

          <div>
            <Text variant="heading">Heading 2</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Medium, 16, Line height : normal)
            </p>
          </div>

          <div>
            <Text variant="body-text-lg">Body 1</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Regular, 18, Line height : normal)
            </p>
          </div>

          <div>
            <Text variant="body-text">Body 2</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Regular, 16, Line height : normal)
            </p>
          </div>

          <div>
            <Text variant="body-text-sm">Body 3</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Regular, 14, Line height : 20)
            </p>
          </div>

          <div>
            <Text variant="btn">Button Text</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Medium, 14, Line height : 20)
            </p>
          </div>

          <div>
            <Text variant="label">Label Text</Text>
            <p className={styles.primaryStoryTextInfo}>
              (Inter, Medium, 14, Line height : 24)
            </p>
          </div>
        </section>
      </div>
    );
  },
};
