import { Ui } from '@databrainhq/plugin';
import { DraggableMetricItemData } from 'types/metric';
import styles from './schemaSideBar.module.css';

const PythonColumns = ({
  columns,
  table,
}: {
  columns: DraggableMetricItemData['column'][];
  table: DraggableMetricItemData['table'];
}) => {
  return (
    <div className="dbn-w-full dbn-pb-1 dbn-flex dbn-flex-col dbn-gap-2 dbn-h-full dbn-overflow-auto">
      {columns.map((col) => {
        const draggableItemData: DraggableMetricItemData = {
          column: col,
          table,
        };
        return (
          <Ui.DraggableItem
            key={`${col.name}__${col.dataType}`}
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
                  <span className="dbn-flex dbn-gap-2">
                    <span className={styles.handleIcon}>
                      <Ui.Icons name="kebab-menu-vertical" size="xs" />
                      <Ui.Icons name="kebab-menu-vertical" size="xs" />
                    </span>
                    <span className="dbn-w-[10%]">
                      <Ui.DataType datatype={col.dataType} />
                    </span>
                    <span
                      className={`${
                        col.type === 'custom'
                          ? 'dbn-w-[50%]'
                          : 'dbn-max-w-[80%]'
                      } dbn-truncate dbn-text-left dbn-text-sm dbn-font-semibold`}
                    >
                      {col.name}
                    </span>
                    {col.type === 'custom' && (
                      <Ui.Badge varaint="primary" label={col.type} size="sm" />
                    )}
                  </span>
                </div>
              );
            }}
          />
        );
      })}
    </div>
  );
};

export default PythonColumns;
