/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-elements */
import React from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './textarea.module.css';
import { Error } from '@/components/Error';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  id: string;
  label: string;
  placeholder?: string;
  rows: number;
  cols?: number;
  resizable?: boolean;
  defaultValue?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  error?: any;
  onFocus?: any;
  onBlur?: any;
  className?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField = ({
  id,
  label,
  placeholder,
  rows,
  cols,
  resizable = true,
  register,
  error,
  defaultValue,
  value,
  onFocus,
  onBlur,
  className,
  leftIcon,
  rightIcon,
  ...rest
}: Props) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {leftIcon}
        {label}
        {rightIcon}
      </label>
      <textarea
        {...rest}
        id={id}
        name={id}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        className={classNames(
          styles.textarea,
          `${resizable ? null : styles.resizable}`,
          error ? styles.error : styles.noError
        )}
        defaultValue={defaultValue}
        {...register}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <Error message={error.message} />}
    </div>
  );
};
