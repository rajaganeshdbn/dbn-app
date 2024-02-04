/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './card.module.css';
import NoData from '@/components/Svg/no-data.svg';
import { Loader } from '@/components/Loader';
import { SkeletonLoader } from '@/components/SkeletonLoader';

type NoDataLoadingProps = {
  isDataLength: boolean;
  isLoading: boolean;
  isSingleValue: string | undefined;
  dataDb: Record<string, any>;
  chartType?: string;
};

export const NoDataLoading = React.memo(
  ({
    isDataLength,
    isLoading,
    isSingleValue,
    dataDb,
    chartType,
  }: NoDataLoadingProps) => {
    const isSingleValueChart = chartType === 'singleValue';

    return (
      <>
        {!isLoading && !isDataLength ? (
          <div className={styles.noData}>
            <div className={styles.noDataContent}>
              <img src={NoData} alt="no data svg" />
              <div className={styles.noDataText}>No Data</div>
            </div>
          </div>
        ) : null}
        {!isLoading &&
          isDataLength &&
          isSingleValueChart &&
          dataDb[isSingleValue as string] === null && (
            <div className={styles.noData}>
              <div className={styles.noDataContent}>
                <img src={NoData} alt="no data svg" />
                <div className={styles.noDataText}>No Data</div>
              </div>
            </div>
          )}
        {isLoading && (
          <div className={styles.loading}>
            <SkeletonLoader height="full" />
          </div>
        )}
      </>
    );
  }
);
