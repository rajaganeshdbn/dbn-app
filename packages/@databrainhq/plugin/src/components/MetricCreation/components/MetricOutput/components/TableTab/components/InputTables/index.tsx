import React from 'react';
import styles from './input.module.css';
import { Table } from '@/components/Table';

export const InputTables = ({ previewTableDataList }: any) => {
  return (
    <div className={styles.container}>
      {previewTableDataList?.map((table: any) => (
        <Table
          data={table.data}
          error={table.isError}
          filterValues={[]}
          onMaximize={() => {}}
          isLoading={false}
          tableName={table.name}
          key={table.name}
          tableSettings={{
            showTableTitle: true,
            hideVerticalDivider: false,
            showRowHover: false,
            enableStripedRows: false,
            enableTableSearch: false,
            contentAlignment: 'center',
            enableFilter: false,
            enableSorting: true,
            lineGap: '',
            showTableDesc: false,
          }}
        />
      ))}
    </div>
  );
};
