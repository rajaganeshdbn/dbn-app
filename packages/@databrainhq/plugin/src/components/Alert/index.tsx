import React from 'react';
import styles from './alert.module.css';
import { Icons } from '@/components';

export type AlertProps = {
  text: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'warning' | 'error' | 'success' | 'info';
  hideInfoIcon?: boolean;
};

export const Alert = ({
  variant = 'primary',
  text,
  children,
  hideInfoIcon,
}: AlertProps) => {
  return (
    <>
      <div className={`${styles.alert} ${styles[variant]}`}>
        <div className={styles.alertTextContent}>
          {hideInfoIcon ? null : (
            <span>
              <Icons name="info" size="xs" />
            </span>
          )}
          {text}
        </div>
        <div className={styles.alertButtons}>{children}</div>
      </div>
    </>
  );
};
