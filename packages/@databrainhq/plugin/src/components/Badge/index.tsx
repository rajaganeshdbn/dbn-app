/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './badge.module.css';
import { Text } from '@/components';
import { Colors } from '@/types';

type Props = {
  label: string | number;
  varaint?: 'warning' | 'success' | 'danger' | 'primary' | 'secondary' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export const Badge: React.FC<Props> = ({
  label,
  varaint = 'success',
  size = 'sm',
  onClick,
}) => {
  const badgeSize = {
    xs: 'body-text-xs',
    sm: 'body-text-sm',
    md: 'body-text',
    lg: 'body-text-lg',
  };
  const baadgeColor = {
    warning: 'primary',
    success: 'white',
    danger: 'white',
    primary: 'white',
    secondary: 'primary',
    info: 'white',
  };
  //   TODO: Fix badge - missing information about the styles ( color)
  return (
    <div
      className={`${styles.badge} ${styles[varaint!]} ${styles[size]}`}
      onClick={onClick}
    >
      <Text
        variant={
          badgeSize[size] as
            | 'body-text-xs'
            | 'body-text-lg'
            | 'body-text'
            | 'body-text-sm'
        }
        color={baadgeColor[varaint!] as Colors}
        children={label}
      />
    </div>
  );
};
