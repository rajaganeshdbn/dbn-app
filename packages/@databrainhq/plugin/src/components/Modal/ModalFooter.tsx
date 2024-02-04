import React from 'react';
import styles from './modal.module.css';

export type ModalFooterProps = React.PropsWithChildren & {
  className?: string;
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  return (
    <section className={`${styles.footer} ${className}`}>{children}</section>
  );
};
