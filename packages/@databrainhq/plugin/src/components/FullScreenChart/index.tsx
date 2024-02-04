/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './fullscreen.module.css';
import { Modal, Chart, ChartProps } from '@/components';

type Props = ChartProps & {
  isShow: boolean;
  onCancel: () => void;
};
export const FullScreenChart = ({ isShow, onCancel, ...rest }: Props) => {
  return (
    <Modal isOpen={isShow} onClose={onCancel} headerTitle="Chart Preview">
      <div className={styles.fullscreen}>
        <Chart {...rest} />
      </div>
    </Modal>
  );
};
