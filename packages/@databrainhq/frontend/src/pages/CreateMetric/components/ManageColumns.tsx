/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui, types } from '@databrainhq/plugin';
import ReactAce from 'react-ace/lib/ace';
import { MetricsValue } from 'types';
import { useState } from 'react';
import { CreatedNewColumn } from 'types/metric';
import { DATASET_OTHER_HELPER_FUNCTIONS } from 'consts/values';
import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
import styles from './manageColumns.module.css';

type Props = {
  config: {
    selectedManageColumns: types.FloatingDropDownOption[];
    selectedNewManageColumns: types.FloatingDropDownOption[];
    columnOptions: types.FloatingDropDownOption[];
    createdNewColumnOptions: types.FloatingDropDownOption[];
    functionOptions: types.FloatingDropDownOption[];
    onChangeManageColumnSelection: (
      value: types.FloatingDropDownOption
    ) => void;
    onResetColumnSelection: (value: boolean) => void;
    createdNewColumn: CreatedNewColumn;
    setCreatedNewColumn: React.Dispatch<React.SetStateAction<CreatedNewColumn>>;
    onSaveCreatedColumn: () => void;
    onChangeNewManageColumnSelection: (
      option: types.FloatingDropDownOption
    ) => void;
    setShowManageColumnPanel: React.Dispatch<React.SetStateAction<boolean>>;
    createNewColumnError: string[];
    isSqlColumn: boolean;
    setSqlColumn: React.Dispatch<React.SetStateAction<boolean>>;
    editorRef: React.RefObject<ReactAce>;
    onRunSqlQuery: (query?: string) => void;
    onChangeCustomValue: (value: Record<string, string | boolean>) => void;
    customSql: {
      name: string;
      sql: string;
      isAggregate?: boolean;
    };
    customColumnList: MetricsValue[];
    onChangeCustomColumnSelection: (option: MetricsValue) => void;
    selectedCustomColumns: MetricsValue[];
    onGenerateDatasetmetric: () => void;
    isDisableGenerateMetric: boolean;
    joinTableOption: types.FloatingDropDownOption[];
    currentSelectedTable: types.FloatingDropDownOption;
    setCurrentSelectedTable: React.Dispatch<
      React.SetStateAction<types.FloatingDropDownOption>
    >;
  };
};

const ManageColumns = ({
  config: {
    selectedManageColumns,
    columnOptions,
    onChangeManageColumnSelection,
    onResetColumnSelection,
    createdNewColumn,
    setCreatedNewColumn,
    functionOptions,
    onSaveCreatedColumn,
    onChangeNewManageColumnSelection,
    selectedNewManageColumns,
    createdNewColumnOptions,
    setShowManageColumnPanel,
    createNewColumnError,
    isSqlColumn,
    setSqlColumn,
    customSql,
    editorRef,
    onRunSqlQuery,
    onChangeCustomValue,
    customColumnList,
    selectedCustomColumns,
    onChangeCustomColumnSelection,
    onGenerateDatasetmetric,
    isDisableGenerateMetric,
    joinTableOption,
    currentSelectedTable,
    setCurrentSelectedTable,
  },
}: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isShowAlertInfo, setShowAlertInfo] = useState<boolean>(true);
  return (
    <div className={styles['manageCol-wrapper']}>
      <div className={styles.columnContainer}>
        <div className={styles.heading}>
          <Ui.Text variant="heading-lg">Manage columns</Ui.Text>
          <Ui.PopoverMenu
            menuWidth="410px"
            tabMenu
            buttonContent={
              <>
                <Ui.Button
                  variant="tab"
                  rightIcon={<Ui.Icons name="chevron-down" />}
                >
                  Add New
                </Ui.Button>
              </>
            }
          >
            <>
              <div className={styles['metric-container']}>
                <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-5 dbn-relative dbn-pb-4">
                  <div className="dbn-w-full dbn-flex dbn-flex-row dbn-justify-between dbn-items-center">
                    <Ui.Text variant="heading-lg">Add new columns</Ui.Text>
                    <Ui.Switch
                      placeholder="SQL"
                      enabled={isSqlColumn}
                      onChange={(enabled) => setSqlColumn(enabled)}
                    />
                  </div>
                  {isSqlColumn ? (
                    <div className="dbn-flex dbn-flex-col dbn-gap-3">
                      {createNewColumnError.map((error) => (
                        <Ui.Alert text={error} variant="error" />
                      ))}
                      <div className={styles.createSqlTab}>
                        {isShowAlertInfo ? (
                          <Ui.Alert
                            text={
                              currentSelectedTable?.value?.split(
                                '^^^^^^'
                              )?.[3] === 'custom'
                                ? 'Column Format: tableName.columnName'
                                : 'Column Format: schemaName_tableName.columnName'
                            }
                            variant="info"
                            hideInfoIcon
                          >
                            <Ui.Button
                              variant="popover"
                              onClick={() => setShowAlertInfo(false)}
                            >
                              <Ui.Icons
                                name="cross"
                                size="xs"
                                color="infoAlert"
                              />
                            </Ui.Button>
                          </Ui.Alert>
                        ) : null}
                        {/* <Ui.Alert
                        text={`e.g. DISTINCT ${currentSelectedTable.value
                          ?.split('^^^^^^')
                          .join('_')}.columnName`}
                      /> */}
                        <div className={styles.customConfigEditor}>
                          <AceEditorSql
                            editorRef={editorRef}
                            onChange={(value: string) => {
                              onChangeCustomValue({ sql: value });
                            }}
                            value={customSql.sql}
                            onExecute={onRunSqlQuery}
                          />
                        </div>
                        <Ui.InputField
                          type="text"
                          label="Query Name"
                          placeholder="name"
                          onChange={(e) =>
                            onChangeCustomValue({ name: e.target.value })
                          }
                          value={customSql.name}
                        />
                        <Ui.Checkbox
                          label="Aggregate column"
                          onClick={() =>
                            onChangeCustomValue({
                              isAggregate: !customSql.isAggregate,
                            })
                          }
                          checked={customSql.isAggregate}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="dbn-flex dbn-flex-col dbn-gap-3">
                      {createNewColumnError.map((error) => (
                        <Ui.Alert text={error} variant="error" />
                      ))}
                      <Ui.FloatingDropDown
                        options={columnOptions}
                        labelVariant="static"
                        isSearchEnabled
                        selectedOption={
                          createdNewColumn.columnName || columnOptions[0]
                        }
                        onChange={(option) =>
                          setCreatedNewColumn((prev) => ({
                            ...prev,
                            columnName: option,
                            function: DATASET_OTHER_HELPER_FUNCTIONS[3],
                          }))
                        }
                        buttonWidth="100%"
                        menuWidth="100%"
                      />
                      <Ui.FloatingDropDown
                        options={functionOptions}
                        labelVariant="static"
                        isSearchEnabled
                        selectedOption={
                          createdNewColumn.function ||
                          DATASET_OTHER_HELPER_FUNCTIONS[3]
                        }
                        onChange={(option) =>
                          setCreatedNewColumn((prev) => ({
                            ...prev,
                            function: option,
                          }))
                        }
                        buttonWidth="100%"
                        menuWidth="100%"
                      />

                      <Ui.InputField
                        type="text"
                        placeholder="Save as"
                        onChange={({ target: { value } }) =>
                          setCreatedNewColumn((prev) => ({
                            ...prev,
                            alias: value,
                          }))
                        }
                        value={createdNewColumn.alias}
                      />
                    </div>
                  )}
                </div>
                <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-h-[50px] dbn-items-end dbn-justify-between">
                  <Ui.Button variant="secondary" data-closepopover>
                    Cancel
                  </Ui.Button>
                  <Ui.Button
                    variant="primary"
                    onClick={() => onSaveCreatedColumn()}
                  >
                    Add
                  </Ui.Button>
                </div>
              </div>
            </>
          </Ui.PopoverMenu>
        </div>
        <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
          {joinTableOption?.map((table) => (
            <Ui.Button
              variant={currentSelectedTable === table ? 'secondary' : 'tab'}
              onClick={() => setCurrentSelectedTable(table)}
            >
              {table.label}
              <Ui.Badge
                varaint="primary"
                size="xs"
                label={`${
                  selectedManageColumns?.filter((col) => {
                    const [
                      parentAlias,
                      columnName,
                      datatype,
                      schemaName,
                      tableName,
                    ] = col.value?.split('^^^^^^');
                    const [schema, name, alias, type] =
                      table.value?.split('^^^^^^');
                    if (type === 'custom') return alias === parentAlias;
                    return name === tableName && schema === schemaName;
                  }).length +
                  selectedNewManageColumns?.filter((col) => {
                    const [
                      parentAlias,
                      columnName,
                      datatype,
                      schemaName,
                      tableName,
                    ] = col.value?.split('^^^^^^');
                    const [schema, name, alias, type] =
                      table.value?.split('^^^^^^');
                    if (type === 'custom') return alias === parentAlias;
                    return name === tableName && schema === schemaName;
                  }).length +
                  selectedCustomColumns?.filter((col) =>
                    customColumnList.some((c) => c.as === col.as)
                  ).length
                }`}
              />
            </Ui.Button>
          ))}
        </div>
        <div className={styles.columns}>
          <div className={styles['column-head']}>
            <div className={styles['column-popover']}>
              <Ui.Checkbox
                onChange={({ target: { checked } }) => {
                  if (checked) {
                    onResetColumnSelection(true);
                  } else {
                    onResetColumnSelection(false);
                  }
                }}
                checked={
                  selectedManageColumns?.filter((col) => {
                    const [
                      parentAlias,
                      columnName,
                      datatype,
                      schemaName,
                      tableName,
                    ] = col.value?.split('^^^^^^');
                    const [schema, name] =
                      currentSelectedTable.value?.split('^^^^^^');
                    return name === tableName && schema === schemaName;
                  }).length +
                    selectedNewManageColumns?.filter((col) => {
                      const [
                        parentAlias,
                        columnName,
                        datatype,
                        schemaName,
                        tableName,
                      ] = col.value?.split('^^^^^^');
                      const [schema, name] =
                        currentSelectedTable.value?.split('^^^^^^');
                      return name === tableName && schema === schemaName;
                    }).length +
                    selectedCustomColumns?.filter((col) =>
                      customColumnList.some((c) => c.as === col.as)
                    ).length ===
                  columnOptions.length +
                    customColumnList.length +
                    createdNewColumnOptions.length
                }
              />
              <div className="dbn-w-4">
                <Ui.PopoverMenu
                  buttonContent={
                    <div className={styles.resetColumnPopBtn}>
                      <Ui.Icons name="caret-down-fill" />
                    </div>
                  }
                  position="bottom-start"
                  menuWidth="120px"
                >
                  <>
                    {/* TODO: add event to button  */}
                    <Ui.Button
                      variant="popover"
                      fitContainer
                      className={styles.popOption}
                      onClick={() => onResetColumnSelection(true)}
                    >
                      All
                    </Ui.Button>
                    <Ui.Button
                      variant="popover"
                      fitContainer
                      className={styles.popOption}
                      onClick={() => onResetColumnSelection(false)}
                    >
                      None
                    </Ui.Button>
                  </>
                </Ui.PopoverMenu>
              </div>
            </div>
            <Ui.Text variant="btn" color="secondary-dark">
              {`${
                selectedManageColumns?.length +
                selectedNewManageColumns?.length +
                selectedCustomColumns?.length
              } column selected`}
            </Ui.Text>
          </div>

          <div className={styles['select-column']}>
            <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
            {columnOptions
              .sort((a, b) => {
                const labelA = a.label.toLowerCase();
                const labelB = b.label.toLowerCase();
                if (labelA < labelB) {
                  return -1;
                }
                if (labelA > labelB) {
                  return 1;
                }
                return 0;
              })
              ?.filter((column) => column.label.includes(searchKeyword))
              .map((col) => {
                const columnName = col.label;
                const name =
                  columnName.length > 42
                    ? `${columnName.substring(0, 42)}...`
                    : columnName;
                const [parentAlias, column, datatype, schemaName, tableName] =
                  col.value?.split('^^^^^^');
                return (
                  <div className={styles.columnNameTab} title={col.label}>
                    <Ui.Checkbox
                      onChange={() => onChangeManageColumnSelection(col)}
                      checked={selectedManageColumns.some(
                        (prevOption) => prevOption.value === col.value
                      )}
                    />
                    <Ui.DataType datatype={datatype} />
                    <Ui.Text variant="body-text-sm">{name}</Ui.Text>
                  </div>
                );
              })}
            {createdNewColumnOptions
              ?.filter((column) => column.label.includes(searchKeyword))
              .map((col) => {
                const columnName = col.label;
                const name =
                  columnName.length > 42
                    ? `${columnName.substring(0, 42)}...`
                    : columnName;
                return (
                  <div className={styles.columnNameTab} title={col.label}>
                    <Ui.Checkbox
                      onChange={() => onChangeNewManageColumnSelection(col)}
                      checked={selectedNewManageColumns.some(
                        (prevOption) => prevOption.value === col.value
                      )}
                    />
                    <Ui.DataType datatype="unknown" />
                    <Ui.Text variant="body-text-sm">{name}</Ui.Text>
                  </div>
                );
              })}
            {customColumnList
              ?.filter((column) => column.as.includes(searchKeyword))
              .filter((c) => c.isAggregate || c.isDimension)
              .map((col) => {
                const columnName = col.as;
                const name =
                  columnName?.length > 42
                    ? `${columnName.substring(0, 42)}...`
                    : columnName;
                return (
                  <div className={styles.columnNameTab} title={col.as}>
                    <Ui.Checkbox
                      onChange={() => onChangeCustomColumnSelection(col)}
                      checked={selectedCustomColumns.some(
                        (prevOption) => prevOption.as === col.as
                      )}
                    />
                    <Ui.DataType datatype="unknown" />
                    <Ui.Text variant="body-text-sm">{name}</Ui.Text>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Ui.Button
          variant="secondary"
          fitContainer
          onClick={() => setShowManageColumnPanel(false)}
        >
          Cancel
        </Ui.Button>
        <Ui.Button
          variant="primary"
          fitContainer
          isDisabled={isDisableGenerateMetric}
          onClick={() => {
            onGenerateDatasetmetric();
          }}
        >
          Save
        </Ui.Button>
      </div>
    </div>
  );
};

export default ManageColumns;
