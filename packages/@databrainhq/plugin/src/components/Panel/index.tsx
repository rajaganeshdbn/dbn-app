/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropsWithChildren } from 'react';
import styles from './panel.module.css';
import { Button, Icons, Portal } from '@/components';

export interface PanelProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  headerTitle?: string;
  icon?: any;
  hideHeader?: boolean;
  hideFooter?: boolean;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  side?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  zIndex?: number;
}

export const Panel = ({
  children,
  isOpen,
  onClose,
  headerTitle,
  icon,
  hideHeader,
  hideFooter,
  primaryActionText = 'Apply',
  onPrimaryAction,
  side = 'right',
  size = 'small',
  zIndex,
}: PanelProps) => {
  return (
    <Portal>
      {isOpen ? (
        <div className={styles.backdrop} style={{ zIndex }} onClick={onClose}>
          <div
            className={`${styles.panel} ${styles[side]} ${styles[size]}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!hideHeader && (
              <section className={styles.header}>
                <span className={styles.headerTitle}>
                  {icon}
                  {headerTitle}
                </span>
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={onClose}
                  leftIcon={<Icons name="cross" />}
                />
              </section>
            )}
            <section className={styles.content}>{children}</section>
            {!hideFooter && (
              <section className={styles.footer}>
                <Button type="button" variant="tab" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={onPrimaryAction}
                >
                  {primaryActionText}
                </Button>
              </section>
            )}
          </div>
        </div>
      ) : null}
    </Portal>
  );
};
