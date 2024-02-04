import React from 'react';
import styles from './tableViewModal.module.css';
import { Modal, Table } from '@/components';

type Props = {
  metricData?: Record<string, any>[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
};
export const TableViewModal = ({
  metricData,
  isOpen,
  onClose,
  title,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} headerTitle={title}>
      <div className={styles.fullscreen}>
        <Table
          data={metricData || []}
          isLoading={false}
          error=""
          filterValues={[]}
          onMaximize={() => {}}
        />
      </div>
    </Modal>
  );
};

export default TableViewModal;
