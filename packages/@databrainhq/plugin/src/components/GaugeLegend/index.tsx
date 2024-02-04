/* eslint-disable react/forbid-dom-props */
import React from 'react';
import styles from './gaugeLegend.module.css';
import { darkColorIdentifier } from '@/helpers/darkColorIdentifier';

type Props = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

const GaugeLegend = ({ data }: Props) => {
  return (
    <div className={styles.mainContainer}>
      {data.map((val) => {
        const isDarkColor = darkColorIdentifier(val.color);
        return (
          <div className={styles.content}>
            <span
              style={{
                backgroundColor: val.color,
                color: isDarkColor ? 'white' : '',
              }}
              className={styles.contentValue}
            >
              {val.value || 0}
            </span>
            <span className={styles.contentText}>{val.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GaugeLegend;
