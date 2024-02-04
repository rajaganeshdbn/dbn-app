/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './dataset.module.css';
import {
  Text,
  FloatingDropDown,
  DataType,
  Icons,
  SearchTab,
} from '@/components';
import { DatasetProps } from '@/types/metricCreate';
import { DraggableItem } from '@/components/DraggableItem';

export const Dataset = ({
  setselectTable,
  selectTable,
  tableList,
  columnList,
  onChangeTableSelection,
}: DatasetProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Icons name="database" size="xl" />
        <Text variant="heading-lg">Data</Text>
      </div>
      <div className={styles.header}>
        <SearchTab setSearchKeyword={setSearchKeyword} />
        <div className="dbn-w-full">
          <FloatingDropDown
            onChange={(value) => {
              setselectTable(value);
              onChangeTableSelection(value.value);
            }}
            selectedOption={selectTable}
            options={tableList}
            customButton={
              <div className={styles.customButton}>
                <Icons name="table" />{' '}
                {selectTable.label
                  ? selectTable.label
                  : 'Select table from dropdown'}
              </div>
            }
            labelVariant="static"
            buttonWidth="100%"
            menuWidth="100%"
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles['col-container']}>
          {columnList
            .filter((col) => col.label.includes(searchKeyword))
            .map((col) => {
              const [, colName, datatype] = col?.value?.split('____');
              return (
                <DraggableItem
                  data={col}
                  identifier={{
                    id: col.value,
                    type: 'column',
                  }}
                  CustomDragPreview={
                    <span className={styles.listVal}>{col.label}</span>
                  }
                  modifiers={{
                    highlightDrop: {
                      onDrag: true,
                    },
                  }}
                  renderItem={(setDragNodeRef: React.MutableRefObject<any>) => {
                    return (
                      <div
                        className={styles.column}
                        key={colName}
                        ref={setDragNodeRef}
                      >
                        <span className={styles.handleIcon}>
                          <Icons name="kebab-menu-vertical" size="xs" />
                          <Icons name="kebab-menu-vertical" size="xs" />
                        </span>
                        <span className="dbn-flex dbn-items-end dbn-gap-2 dbn-truncate">
                          <span>
                            <DataType datatype={datatype} />
                          </span>
                          <Text variant="body-text-sm">{colName}</Text>
                        </span>
                      </div>
                    );
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
