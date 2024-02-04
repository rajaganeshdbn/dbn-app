/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable react/forbid-elements */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */

import classNames from 'classnames';
import React from 'react';
import styles from './button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  variant: 'primary' | 'secondary' | 'tertiary' | 'tab' | 'popover';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  fitContainer?: boolean;
}

/** A basic button. Any props that are not explicitly called out below will be passed through to the native Button component. */
export const Button = ({
  isDisabled = false,
  type = 'button',
  children = '',
  variant = 'primary',
  onClick,
  title,
  leftIcon,
  rightIcon,
  fitContainer = false,
  className,
  ...props
}: Props) => {
  const btnClasses = classNames(
    styles[`btn-${variant}`],
    `dbn-btn-${variant}`,
    fitContainer ? styles.fitContainer : styles.defaultWidth,
    className
  );

  return (
    <div className={styles.buttonContainer}>
      <button
        {...props}
        type={type}
        className={btnClasses}
        onClick={onClick}
        disabled={isDisabled}
        title={title}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    </div>
  );
};
