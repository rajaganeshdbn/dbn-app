/* eslint-disable react/forbid-dom-props */
/* eslint-disable react/forbid-elements */
import React from 'react';
import styles from './colorField.module.css';
import { InputField } from '@/components/InputField';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isDisabled?: boolean;
};

export const ColorField = ({
  name,
  value,
  onChange,
  defaultValue,
  placeholder,
  label,
  className = '',
  isDisabled,
}: Props) => {
  return (
    <div className={`${styles.colorField} ${className}`}>
      <label
        className={styles.label}
        style={{ backgroundColor: value || defaultValue }}
        htmlFor={`${name}-color`}
      >
        <input
          className={styles.field}
          type="color"
          name={name}
          id={`${name}-color`}
          defaultValue={defaultValue}
          value={value}
          disabled={isDisabled}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
      <InputField
        type="text"
        id={name}
        name={name}
        label={label}
        className={styles.textField}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        isDisabled={isDisabled}
      />
    </div>
  );
};
