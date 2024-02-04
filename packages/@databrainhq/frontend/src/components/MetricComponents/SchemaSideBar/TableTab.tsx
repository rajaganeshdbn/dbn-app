/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable array-callback-return */
import { Ui } from '@databrainhq/plugin';
import { SelectedColumns } from 'types';
import segmentEvent from 'utils/segmentEvent';
import { useState } from 'react';
import { DraggableMetricItemData } from 'types/metric';
import { TableColumn, TableType } from 'hooks/useCompanySchema';
import styles from './schemaSideBar.module.css';

type Props = {
  setSelectedColumns?: React.Dispatch<
    React.SetStateAction<SelectedColumns[] | undefined>
  >;
  selectedColumns?: SelectedColumns[] | undefined;
  table: TableType;
  onSelectTable?: (table: TableType) => void;
  isDatasetMode?: boolean;
  selectedDataset?: string;
  onDeleteCustomColumn: (column: TableColumn, table: TableType) => void;
};
const TableTab = ({
  tableTabProps: {
    table,
    setSelectedColumns,
    selectedColumns,
    isDatasetMode,
    onSelectTable,
    selectedDataset,
    onDeleteCustomColumn,
  },
}: {
  tableTabProps: Props;
}) => {
  const [isShowTable, setShowTable] = useState<boolean>(false);
  return (
    <div className="dbn-w-full" key={`${table.schemaName}_${table.tableName}`}>
      <Ui.Button
        variant="tertiary"
        className={`dbn-w-full hover:dbn-bg-gray-3 dbn-rounded-md ${
          (selectedColumns?.[0]?.tableName === table.tableName &&
            selectedColumns?.[0]?.schemaName === table.schemaName) ||
          (isDatasetMode &&
            selectedDataset?.split('.')?.[0] === table.schemaName &&
            selectedDataset?.split('.')?.[1] === table.tableName)
            ? 'dbn-bg-gray-3 dbn-text-sm dbn-font-bold '
            : ''
        }`}
        onClick={() => {
          segmentEvent('dataset table selected');
          setSelectedColumns?.(
            table.columnsWithDataType?.map((col) => ({
              column: col.name,
              datatype: col.dataType,
              tableName: table.tableName,
              schemaName: table.schemaName,
            })) || []
          );
          onSelectTable?.(table);
          setShowTable(!isShowTable);
        }}
        title={table?.tableName}
      >
        <div className="dbn-w-full dbn-flex dbn-items-center dbn-gap-2">
          <span>
            <Ui.Icons name="table" />
          </span>
          <span className="dbn-w-full dbn-truncate dbn-text-left">
            {table?.tableName}
          </span>
          <span className={isShowTable ? '' : '-dbn-rotate-90'}>
            <Ui.Icons name="chevron-down" />
          </span>
        </div>
      </Ui.Button>
      {isShowTable && (
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
                      <span className="dbn-flex dbn-gap-2 dbn-w-full dbn-items-center">
                        {!isDatasetMode && (
                          <span className={styles.handleIcon}>
                            <Ui.Icons name="kebab-menu-vertical" size="xs" />
                            <Ui.Icons name="kebab-menu-vertical" size="xs" />
                          </span>
                        )}
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
                          <>
                            <Ui.Badge
                              varaint="primary"
                              label={col.type}
                              size="sm"
                            />
                            <Ui.Button
                              variant="popover"
                              className="dbn-pl-3"
                              onClick={() => onDeleteCustomColumn(col, table)}
                            >
                              <Ui.Icons name="cross" size="sm" />
                            </Ui.Button>
                          </>
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

export default TableTab;
