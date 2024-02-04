/* eslint-disable no-param-reassign */
import React from 'react';
import styles from './text.module.css';
import { Colors } from '@/types';

interface Props {
  variant?:
    | 'heading-xl'
    | 'heading-lg'
    | 'heading'
    | 'body-text-lg'
    | 'body-text'
    | 'body-text-sm'
    | 'btn'
    | 'label'
    | 'sub-label'
    | 'display'
    | 'body-text-xs';
  color?: Colors;
  children: React.ReactNode;
  onClick?: () => void;
  display?: 'block' | 'inline';
  opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

const variants = {
  'heading-xl': 'h1',
  'heading-lg': 'h2',
  heading: 'h3',
  'body-text-lg': 'p',
  'body-text': 'p',
  'body-text-sm': 'p',
  display: 'p',
  btn: 'span',
  label: 'span',
  'sub-label': 'span',
  'body-text-xs': 'span',
};

type TagType = keyof JSX.IntrinsicElements;

export const Text = ({
  children = '',
  variant = 'body-text',
  color = 'primary',
  display,
  onClick,
  opacity = 1,
}: Props) => {
  if (!display) {
    display = variants[variant] === 'span' ? 'inline' : 'block';
  }
  const Tag = variants[variant] as TagType;
  const classes = [
    styles[variant],
    styles[color],
    styles[variants[variant] === 'span' ? 'inline' : 'block'],
    'truncate',
  ].join(' ');
  return (
    <Tag className={`${classes}`} style={{ opacity }} onClick={onClick}>
      {children}
    </Tag>
  );
};
