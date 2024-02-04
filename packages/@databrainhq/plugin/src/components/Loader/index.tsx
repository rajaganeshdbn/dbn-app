import React from 'react';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
      <div className={styles.loader}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
