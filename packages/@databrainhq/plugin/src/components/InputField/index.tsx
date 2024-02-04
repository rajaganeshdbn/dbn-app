/* eslint-disable react/forbid-elements */
/* eslint-disable react/jsx-props-no-spreading */
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';
import React from 'react';
import styles from './input.module.css';
import { Text } from '@/components';

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  elementRef?: React.Ref<HTMLInputElement>;
  supportingText?: string | undefined;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  labelVariant?: 'floating' | 'static';
}

export const InputField = ({
  type = 'text',
  register,
  label,
  isDisabled,
  id,
  elementRef,
  error,
  supportingText,
  leftIcon,
  rightIcon,
  labelVariant = 'static',
  ...rest
}: Props) => {
  return (
    <div className={styles['inputField-container']}>
      <div className={styles.upperContainer}>
        {label ? (
          <label
            htmlFor={id}
            className={
              labelVariant === 'static' ? styles.label : styles.floatingLabel
            }
          >
            {label}
          </label>
        ) : null}
        <div className={styles.inputContainer}>
          {leftIcon}
          <input
            {...rest}
            ref={elementRef}
            id={id}
            type={type}
            className={`${styles.input} ${rest.className || ''} ${
              error ? styles.error : styles.noError
            }`}
            {...register}
            disabled={isDisabled}
          />
          {rightIcon}
        </div>
      </div>
      {supportingText && (
        <div className={styles.supportText}>{supportingText}</div>
      )}
      {error && (
        <Text variant="body-text-sm" color="alert">
          {error as string}
        </Text>
      )}
    </div>
  );
};
