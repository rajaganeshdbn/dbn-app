import React from 'react';

type SwitchProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  name?: string;
  styles: Record<string, string>;
  placeholder?: string | [string, string];
  enabled?: boolean;
};

export const SwitchButton: React.FC<SwitchProps> = ({
  name,
  styles,
  placeholder,
  enabled,
}) => {
  return (
    <label htmlFor={name} className={`${styles.button}`}>
      {typeof placeholder === 'string' && (
        <>
          <span
            className={` ${styles.switch} ${
              enabled ? styles.enabled : styles.notenabled
            }`}
          />
          <span className={styles.label}>{placeholder}</span>
        </>
      )}

      {!Array.isArray(placeholder) && typeof placeholder !== 'string' && (
        <span
          className={` ${styles.switch} ${
            enabled ? styles.enabled : styles.notenabled
          }`}
        />
      )}
    </label>
  );
};
