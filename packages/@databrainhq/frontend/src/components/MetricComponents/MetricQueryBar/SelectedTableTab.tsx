/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import styles from './metricQueryBar.module.css';

const SelectedTableTab = ({ name, list }: any) => {
  return (
    <div className={styles.selectedTableTab}>
      <div className="dbn-flex dbn-w-full dbn-flex-wrap dbn-gap-1">
        <div className="dbn-flex dbn-flex-row dbn-gap-1 dbn-font-bold">
          <Ui.Text variant="body-text-sm">{name}</Ui.Text>
          <Ui.Icons name="arrow-right" />
        </div>
        {list?.map((column: { datatype: string; column: string }) => (
          <div
            className="dbn-flex dbn-items-center dbn-justify-center dbn-text-sm"
            key={column.column}
          >
            <Ui.DataType datatype={column.datatype} />
            {column.column?.length > 18
              ? `${column.column.slice(0, 18)}...`
              : column.column}
            ,
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTableTab;
