/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { UseFormRegisterReturn } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import styles from './checkbox.module.css';

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  register,
  label,
  isDisabled,
  id,
  checked,
  onChange,
  ...rest
}: Props) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    if (checked === true) setChecked(true);
    else setChecked(false);
  }, [checked]);
  const handleCheckboxClick = () => {
    setChecked((s) => !s);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();
  };
  // TODO: fix event listener
  return (
    <label
      htmlFor={id}
      className={styles.checkboxField}
      onClick={handleContainerClick}
    >
      <input
        {...rest}
        type="checkbox"
        id={id}
        disabled={isDisabled}
        checked={checked}
        onChange={onChange ? onChange : () => {}}
        {...register}
        className={styles.checkbox}
      />
      <span
        className={`${styles['checkbox-custom']} ${
          isDisabled ? styles.disabled : ''
        }`}
        onClick={isDisabled ? undefined : handleCheckboxClick}
      >
        {isChecked && <span className={styles.checkIcon} />}
      </span>
      {label && <span className={styles['checkbox-label']}>{label}</span>}
    </label>
  );
};
