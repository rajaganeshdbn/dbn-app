/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui, consts, types } from '@databrainhq/plugin';
import { SelectedColumn } from 'types';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';
import styles from './manageColumns.module.css';

type Props = {
  columnOptions: types.SelectedColumn[];
  isOpen: boolean;
  onClose: () => void;
  onChangeGroupColumnSelection: (column: types.SelectedColumn) => void;
  onSaveGroupBy: () => void;
  joinTableOption: types.FloatingDropDownOption[];
  currentSelectedTable: types.FloatingDropDownOption;
  setCurrentSelectedTable: React.Dispatch<
    React.SetStateAction<types.FloatingDropDownOption>
  >;
  selectedGroupBy: types.SelectedColumn[];
};

const GroupByPanel = ({
  GroupByPanelProps: {
    isOpen,
    onClose,
    columnOptions,
    onChangeGroupColumnSelection,
    onSaveGroupBy,
    currentSelectedTable,
    joinTableOption,
    setCurrentSelectedTable,
    selectedGroupBy,
  },
}: {
  GroupByPanelProps: Props;
}) => {
  const { getIsCanAccess } = useAccessControl();
  return (
    <Ui.Panel
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      side="right"
      hideFooter
      headerTitle="Group By"
    >
      <div className={styles.groups}>
        <div className={styles['select-column']}>
          <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
            {joinTableOption?.map((table) => (
              <Ui.Button
                variant={currentSelectedTable === table ? 'secondary' : 'tab'}
                onClick={() => setCurrentSelectedTable(table)}
                isDisabled={!getIsCanAccess('groupby', 'Edit')}
                key={table.label}
              >
                {table.label}
                <Ui.Badge
                  varaint="primary"
                  size="xs"
                  label={`${
                    selectedGroupBy?.filter((col) => {
                      const [schema, name, alias, type] =
                        table.value?.split('^^^^^^');
                      if (type === 'custom') return alias === col?.table?.alias;
                      return (
                        name === col?.table?.tableName &&
                        schema === col?.table?.schemaName
                      );
                    }).length
                  }`}
                />
              </Ui.Button>
            ))}
          </div>
          {columnOptions.map((col) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const columnName = col.alias;
            const name =
              columnName.length > 42
                ? `${columnName.substring(0, 42)}...`
                : columnName;
            return (
              <div
                className={styles.columnNameTab}
                title={col.name}
                key={`${col.name}_group_column`}
              >
                <Ui.Checkbox
                  onChange={() => onChangeGroupColumnSelection(col)}
                  checked={selectedGroupBy.some(
                    (prevOption) => col.alias === prevOption.alias
                  )}
                  isDisabled={!getIsCanAccess('groupby', 'Edit')}
                />
                <Ui.DataType datatype={col.datatype} />

                <Ui.Text variant="body-text-sm">{name}</Ui.Text>
              </div>
            );
          })}
          {/* {createdNewColumnOptions.map((col) => {
            const columnName = col.label;
            const [
              parentAlias,
              nameOfCol,
              datatype,
              schemaName,
              tableName,
              helperFunction,
              alias,
            ] = col.value.split('^^^^^^');
            const name =
              columnName.length > 42
                ? `${columnName.substring(0, 42)}...`
                : columnName;
            if (
              !consts.AggregateList.map((v) => v.value).includes(
                helperFunction || ''
              )
            )
              return (
                <div
                  className={styles.columnNameTab}
                  title={col.label}
                  key={`${col.value}_new_group_col`}
                >
                  <Ui.Checkbox
                    onChange={() => onChangeGroupColumnSelection(col)}
                    checked={selectedGroupColumns.some(
                      (prevOption) => prevOption.value === col.value
                    )}
                  />
                  <Ui.Text variant="body-text-sm">{name}</Ui.Text>
                </div>
              );
            return <></>;
          })}
          {customColumnList
            .filter((c) => c.isDimension)
            .map((col) => {
              const columnName = col.as;
              const name =
                columnName?.length > 42
                  ? `${columnName.substring(0, 42)}...`
                  : columnName;
              return (
                <div
                  className={styles.columnNameTab}
                  title={col.as}
                  key={`${col.as}_group_custom`}
                >
                  <Ui.Checkbox
                    onChange={() => onChangeCustomGroupSelection(col)}
                    checked={selectedCustomGroups.some(
                      (prevOption) => prevOption.as === col.as
                    )}
                  />
                  <Ui.Text variant="body-text-sm">{name}</Ui.Text>
                </div>
              );
            })} */}
        </div>
        <div className={styles.buttonContainer}>
          <Ui.Button variant="secondary" fitContainer onClick={() => onClose()}>
            Cancel
          </Ui.Button>
          <AccessControl feature="groupby" permission="Edit">
            <Ui.Button
              variant="primary"
              fitContainer
              onClick={() => {
                onSaveGroupBy();
              }}
            >
              Save
            </Ui.Button>
          </AccessControl>
        </div>
      </div>
    </Ui.Panel>
  );
};

export default GroupByPanel;
