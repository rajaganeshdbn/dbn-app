/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui, types } from '@databrainhq/plugin';
import { useState } from 'react';
import { SelectedColumns } from 'types';
import { DraggableMetricItemData } from 'types/metric';
import { TableType } from 'hooks/useCompanySchema';
import styles from './schemaSideBar.module.css';

type Props = {
  selectedTable?: types.FloatingDropDownOption;
  table: TableType;
  setSelectedColumns?: React.Dispatch<
    React.SetStateAction<SelectedColumns[] | undefined>
  >;
};

const CustomTableTab = ({
  selectedTable,
  table,
  setSelectedColumns,
}: Props) => {
  const [isShowCustomTable, setShowCustomTable] = useState<boolean>(false);
  return (
    <div>
      <Ui.Button
        variant="tertiary"
        leftIcon={<Ui.Icons name="table" />}
        className={`dbn-w-full dbn-justify-start hover:dbn-bg-gray-3 dbn-rounded-md ${
          selectedTable?.label === table.tableName
            ? 'dbn-bg-gray-3 dbn-text-sm dbn-font-bold'
            : ''
        }`}
        onClick={() => {
          setSelectedColumns?.([]);
          // onChangeCustomTableSelection(table);
          setShowCustomTable(!isShowCustomTable);
        }}
      >
        <span className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
          {table.tableName}
          <span className={isShowCustomTable ? '' : '-dbn-rotate-90'}>
            <Ui.Icons name="chevron-down" />
          </span>
        </span>
      </Ui.Button>
      {isShowCustomTable && (
        <div className="dbn-w-full dbn-py-2 dbn-flex dbn-flex-col dbn-gap-2">
          {table?.columnsWithDataType?.map((col) => {
            const draggableItemData: DraggableMetricItemData = {
              table,
              column: col,
            };
            return (
              <Ui.DraggableItem
                key={`${table.id}__${table.tableName}__${col.name}__${col.dataType}`}
                data={draggableItemData}
                identifier={{
                  id: col.name,
                  type: 'column',
                }}
                modifiers={{
                  highlightDrop: {
                    onDrag: true,
                  },
                }}
                CustomDragPreview={
                  <span className={styles.listVal}>{col.name}</span>
                }
                renderItem={(setDragNodeRef: React.MutableRefObject<any>) => {
                  return (
                    <div
                      className={styles.column}
                      key={col.name}
                      ref={setDragNodeRef}
                    >
                      <span className="dbn-flex dbn-gap-2 dbn-w-full">
                        <span className={styles.handleIcon}>
                          <Ui.Icons name="kebab-menu-vertical" size="xs" />
                          <Ui.Icons name="kebab-menu-vertical" size="xs" />
                        </span>
                        <span className="dbn-w-[5%] dbn-flex dbn-items-center">
                          <Ui.DataType datatype={col.dataType} />
                        </span>
                        <span
                          className={`${
                            col.type === 'custom'
                              ? 'dbn-max-w-[70%] dbn-flex dbn-items-center'
                              : 'dbn-w-[90%]'
                          } dbn-truncate dbn-text-left dbn-text-sm dbn-font-semibold`}
                        >
                          {col.name}
                        </span>
                        {col.type === 'custom' && (
                          <Ui.Badge
                            varaint="primary"
                            label={col.type}
                            size="sm"
                          />
                        )}
                      </span>
                    </div>
                  );
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomTableTab;
