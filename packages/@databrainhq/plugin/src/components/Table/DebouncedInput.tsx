/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-elements */
import React, { useEffect, useState } from 'react';
import styles from './table.module.css';
import { Icons } from '@/components';

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <div className={`${styles.searchTab} ${props.className || ''}`}>
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.searchTabInput}
      />
      {value.toString().length ? null : (
        <span className={styles.searchTabIcon}>
          <Icons name="magnifying-glass" />
        </span>
      )}
    </div>
  );
};
