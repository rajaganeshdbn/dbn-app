/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { PropsWithChildren } from 'react';
import styles from './style.module.css';
import { Icons } from '@/components/Icons';
import { IconConfig } from '@/types';

type TooltipProps = PropsWithChildren & {
  content?: JSX.Element;
  className?: string;
  text?: string;
  tooltipClass?: string;
  position?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'left-bottom-end'
    | 'right-bottom-end'
    | 'left-top-end'
    | 'right-top-end'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'left-bottom'
    | 'left-top'
    | 'right-bottom'
    | 'right-top'
    | 'center';
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className = '',
  position = 'bottom',
  text,
  tooltipClass,
}) => {
  return (
    <span className={`${styles.container} ${className}`}>
      {content}
      <span className={`${styles.tooltip} ${styles[position]} ${tooltipClass}`}>
        {text}
      </span>
    </span>
  );
};

export const NewTooltip = ({
  children,
  text,
  className,
  position = 'bottom',
  tooltipClass = '',
}: TooltipProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
      <span className={`${styles.tooltip} ${tooltipClass} ${styles[position]}`}>
        {text}
      </span>
    </div>
  );
};

export const InfoTooltip: React.FC<
  Omit<TooltipProps, 'content'> & {
    iconConfig?: IconConfig;
  }
> = ({ children, className, iconConfig, position, tooltipClass, text }) => {
  return (
    <NewTooltip
      className={className}
      position={position}
      tooltipClass={tooltipClass}
      text={text}
    >
      <Icons name="info" size={iconConfig?.size} color={iconConfig?.color} />
    </NewTooltip>
  );
};
