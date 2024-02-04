/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { Key } from 'react';
import styles from './table.module.css';
import { Text } from '@/components/Text';

type Props = {
  data: any;
  isError: boolean;
};
export const MetricTable = ({ data, isError }: Props) => {
  return (
    <div className={styles.container}>
      {!!data?.length && !isError && (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              {Object.keys(data[0]).map((item) => {
                return (
                  <th key={item} className={styles.tableHeadCol} scope="col">
                    <Text variant="heading-lg">{item}</Text>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map(
              (item: Record<string, any>, i: Key | null | undefined) => (
                <tr key={i}>
                  {Object.keys(data[0]).map((d, index) => (
                    <td className={styles.tableRowCol} key={index}>
                      <Text variant="body-text-sm">
                        {JSON.stringify(item[d])}
                      </Text>
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
      {!data?.length && !isError && (
        <div className={styles.empty}>Table is empty</div>
      )}
      {isError && <div className={styles.error}>{data.message}</div>}
    </div>
  );
};
