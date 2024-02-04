/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-elements */
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './radio.module.css';

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: any;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  isDisabled?: boolean;
  labelClass?: string;
  inputClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  elementRef?: React.Ref<HTMLInputElement>;
}
export const RadioButton = ({
  type = 'radio',
  register,
  error,
  leftIcon,
  rightIcon,
  label,
  isDisabled,
  labelClass,
  inputClass,
  className,
  id,
  elementRef,
  ...rest
}: Props) => {
  return (
    <div className={styles.radioField}>
      <input
        {...rest}
        ref={elementRef}
        type={type}
        id={id}
        className={inputClass}
        {...register}
        disabled={isDisabled}
      />
      {label ? (
        <label htmlFor={id} className={`${styles.radioLabel} ${labelClass}`}>
          {leftIcon} {label}
          {rightIcon}
        </label>
      ) : null}
    </div>
  );
};

export default RadioButton;
