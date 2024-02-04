import React, { useEffect, useState } from 'react';
import styles from './underlyingData.module.css';
import { Modal, Table, Loader } from '@/components';
import { GetUnderlyingData } from '@/types';

type UnderlyingDataProps = {
  setShowUnderlyingData: React.Dispatch<React.SetStateAction<boolean>>;
  isShowUnderlyingData: boolean;
  value: any;
  getUnderlyingData: GetUnderlyingData;
  columnName: string | undefined;
  isSingleValueChart: boolean;
};
const UnderlyingData = ({
  isShowUnderlyingData,
  setShowUnderlyingData,
  getUnderlyingData,
  columnName,
  value,
  isSingleValueChart,
}: UnderlyingDataProps) => {
  const [underlyingData, setUnderlyingData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (columnName && value && isShowUnderlyingData && !isSingleValueChart) {
      getUnderlyingData({
        columnName,
        setData: setUnderlyingData,
        setLoading,
        value,
        isSingleValueChart,
      });
    }
    if (isShowUnderlyingData && isSingleValueChart) {
      getUnderlyingData({
        columnName,
        setData: setUnderlyingData,
        setLoading,
        value,
        isSingleValueChart,
      });
    }
  }, [columnName, value, isShowUnderlyingData, isSingleValueChart]);

  return (
    <Modal
      isOpen={isShowUnderlyingData}
      onClose={() => setShowUnderlyingData(false)}
      headerTitle="View Underlying Data"
    >
      <div className={styles.fullscreen}>
        {!!underlyingData.length && (
          <Table
            data={underlyingData}
            isLoading={false}
            error=""
            filterValues={[]}
            onMaximize={() => {}}
          />
        )}
        {!underlyingData.length && !isLoading && (
          <div className={styles.loading}>No Data Available</div>
        )}
        {isLoading && !underlyingData.length && (
          <div className={styles.loading}>
            <Loader />
            {/* Loading animation icon */}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(UnderlyingData);
