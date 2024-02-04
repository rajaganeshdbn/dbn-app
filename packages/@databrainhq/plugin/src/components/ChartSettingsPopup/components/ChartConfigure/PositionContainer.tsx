/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './configure.module.css';

type Props = {
  val: string | undefined;
  onClick: (value: string) => void;
};

const PositionContainer = ({ val, onClick }: Props) => {
  return (
    <div className={styles.positionButtonContainer}>
      <div className={styles.positionButtonAlt}>
        <div className={styles.positionButtonWrapper}>
          <span
            className={`${styles.positionButton} ${
              val === 'top-left' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('top-left')}
          />
          <span
            className={`${styles.positionButton} ${
              val === 'top-center' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('top-center')}
          />
          <span
            className={`${styles.positionButton} ${
              val === 'top-right' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('top-right')}
          />
        </div>
        <div className={styles.positionButtonWrapper}>
          <span
            className={`${styles.positionButton} ${
              val === 'left-center' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('left-center')}
          />
          <span
            className={`${styles.positionButton} ${
              val === 'right-center' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('right-center')}
          />
        </div>
        <div className={styles.positionButtonWrapper}>
          <span
            className={`${styles.positionButton} ${
              val === 'bottom-left' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('bottom-left')}
          />
          <span
            className={`${styles.positionButton} ${
              val === 'bottom-center' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('bottom-center')}
          />
          <span
            className={`${styles.positionButton} ${
              val === 'bottom-right' ? 'dbn-bg-black' : ''
            }`}
            onClick={() => onClick('bottom-right')}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionContainer;
