/* eslint-disable react/forbid-elements */
import React from 'react';
import { SwitchButton } from './SwitchInput';
import styles from './toggle.module.css';

type SwitchButtonProps = {
  onChange?: (enabled: boolean) => void;
  enabled?: boolean;
  placeholder?: string;
  defaultEnabled?: boolean;
  name?: string;
  isDisabled?: boolean;
};

export const Switch: React.FC<SwitchButtonProps> = ({
  enabled,
  onChange,
  placeholder,
  defaultEnabled,
  name = `toggle-${Date.now()}`,
  isDisabled,
}) => {
  return (
    <div className={styles.group}>
      <input
        type="checkbox"
        id={name}
        checked={defaultEnabled}
        onChange={({ target }) => onChange?.(target.checked)}
        className={styles.checkbox}
        disabled={isDisabled}
      />
      <SwitchButton
        name={name}
        styles={styles}
        placeholder={placeholder}
        enabled={enabled}
      />
    </div>
  );
};
