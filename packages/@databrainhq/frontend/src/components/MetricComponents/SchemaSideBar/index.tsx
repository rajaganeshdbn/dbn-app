/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/order */
import { useMemo, useState } from 'react';
import { Ui, types } from '@databrainhq/plugin';
import SchemaTab from './SchemaTab';
import styles from './schemaSideBar.module.css';
import SchemaSearch from './SchemaSearch';
import { MetricsValue, SelectedColumns } from 'types';
import { TableColumn, TableType } from 'hooks/useCompanySchema';
import { Table } from 'hooks/useDatasets';
import Flex from 'components/Flex';
import CustomTableTab from './CustomTableTab';
import { DBN_SQL_TABLE } from 'consts/values';
import { DraggableMetricItemData } from 'types/metric';
import AccessControl from 'components/AccessControl';
import PythonColumns from './PythonColumns';

type Props = {
  setSelectedColumns?: React.Dispatch<
    React.SetStateAction<SelectedColumns[] | undefined>
  >;
  selectedColumns?: SelectedColumns[] | undefined;
  selectedDatabase?: string | undefined;
  dbName?: string;
  schemaList: TableType[];
  schemaMap: Record<string, TableType[]>;
  onClickVirtualTableCreate?: () => void;
  isCreateVirtualTable?: boolean;
  datasetTableList?: TableType[];
  selectedTable?: types.FloatingDropDownOption;
  sqlParams: {
    setOpenSqlPanel?: React.Dispatch<React.SetStateAction<boolean>>;
    isSqlTab?: boolean;
    sqlColumnList?: TableColumn[];
    query?: string;
    isSqlLoading?: boolean;
    error?: types.SqlError | undefined;
    setShowCustomSqlModal?: (value: React.SetStateAction<boolean>) => void;
    onPreview?: () => void;
    onDeletCustomColumn?: (
      column: TableColumn,
      table: TableType,
      onSuccess?: () => void
    ) => void;
  };
  pythonParams?: {
    setOpenPythonPanel?: React.Dispatch<React.SetStateAction<boolean>>;
    isPythonMode?: boolean;
    pythonColumns: TableColumn[];
    isPythonLoading?: boolean;
    error?: string;
  };
  customSqlColumns?: {
    tableName: string;
    list: MetricsValue[];
  }[];
  onSelectTable?: (table: TableType) => void;
  isDatasetMode?: boolean;
  selectedDataset?: string;
};
const SchemaSidebar = ({
  setSelectedColumns,
  selectedColumns,
  selectedDatabase,
  dbName,
  schemaList,
  schemaMap,
  onClickVirtualTableCreate,
  isCreateVirtualTable,
  datasetTableList,
  selectedTable,
  sqlParams: {
    setOpenSqlPanel,
    isSqlTab,
    sqlColumnList,
    query,
    isSqlLoading,
    error,
    setShowCustomSqlModal,
    onPreview,
    onDeletCustomColumn,
  },
  pythonParams,
  customSqlColumns,
  isDatasetMode,
  onSelectTable,
  selectedDataset,
}: Props) => {
  const [isOpenDeleteCustomColumnModal, setDeleteCustomColumnModal] =
    useState<boolean>(false);
  const [customColumnToDelete, setCustomColumnToDelete] = useState<
    | {
        column: TableColumn;
        table: TableType;
      }
    | undefined
  >();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isShowSqlOptions, setShowSqlOptions] = useState<boolean>(true);
  const {
    sqlColumnOptions,
    pythonColumnsList,
  }: { sqlColumnOptions: TableColumn[]; pythonColumnsList: TableColumn[] } =
    useMemo(() => {
      if (searchKeyword.length) {
        return {
          sqlColumnOptions:
            sqlColumnList?.filter((opt) => opt.name.includes(searchKeyword)) ||
            [],
          pythonColumnsList:
            pythonParams?.pythonColumns?.filter((opt) =>
              opt.name.includes(searchKeyword)
            ) || [],
        };
      }
      return {
        sqlColumnOptions: sqlColumnList || [],
        pythonColumnsList: pythonParams?.pythonColumns || [],
      };
    }, [sqlColumnList, searchKeyword, pythonParams?.pythonColumns]);
  return (
    <div className={styles['schemaSideBar-container']}>
      <div className={styles.heading}>
        <div className="dbn-flex dbn-gap-2">
          <Ui.Icons name="database" size="xl" />
          <Ui.Text variant="heading-lg">Dataset</Ui.Text>
        </div>
        <div className="dbn-flex dbn-items-center dbn-gap-2">
          <AccessControl feature="sql" permission="View">
            <Ui.Button
              variant="popover"
              isDisabled={pythonParams?.isPythonMode}
              leftIcon={
                <Ui.NewTooltip text="Sql">
                  <Ui.Icons name="file-sql" size="lg" />
                </Ui.NewTooltip>
              }
              onClick={() => setOpenSqlPanel?.(true)}
            />
          </AccessControl>
          <AccessControl feature="python" permission="View">
            {pythonParams && (
              <Ui.Button
                variant="popover"
                leftIcon={
                  <Ui.NewTooltip text="Python">
                    <Ui.Icons name="code" size="lg" />
                  </Ui.NewTooltip>
                }
                onClick={() => pythonParams.setOpenPythonPanel?.(true)}
              />
            )}
          </AccessControl>
        </div>
      </div>
      <div className={styles['schemaSideBar-wrapper']}>
        <div className="dbn-pr-4">
          <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
        </div>
        {isSqlLoading || pythonParams?.isPythonLoading ? (
          <div className="dbn-w-[98%]">
            <Ui.SkeletonLoader variant="list" />
          </div>
        ) : null}
        {pythonParams?.isPythonMode ? (
          <>
            {pythonParams?.error ? (
              <Ui.Text variant="body-text-sm" color="warning-dark">
                {`Error: ${pythonParams?.error}`}
              </Ui.Text>
            ) : null}
            <PythonColumns
              columns={pythonColumnsList}
              table={{
                id: 'python',
                columns:
                  pythonParams?.pythonColumns?.map((col) => col.name) || [],
                companyId: '',
                tableName: 'python_table',
                schemaName: 'python_schema',
                recentUpdatedAt: Date.now(),
                columnsWithDataType: pythonColumnsList,
              }}
            />
          </>
        ) : (
          <>
            {error?.errorMessage && isSqlTab ? (
              <Ui.Text variant="body-text-sm" color="warning-dark">
                {`Error: ${error.errorMessage}`}
              </Ui.Text>
            ) : null}
            {isSqlTab && !isSqlLoading && !error?.errorMessage ? (
              <div className="dbn-h-[calc(100%-4rem)] dbn-w-full dbn-overflow-hidden dbn-overflow-y-auto dbn-flex dbn-flex-col dbn-gap-4">
                <Ui.Button
                  variant="tertiary"
                  className="dbn-w-full hover:dbn-bg-gray-3 dbn-rounded-md dbn-bg-gray-3 dbn-text-sm dbn-font-bold"
                  title={DBN_SQL_TABLE}
                  onClick={() => setShowSqlOptions(!isShowSqlOptions)}
                >
                  <div className="dbn-w-full dbn-flex dbn-items-center dbn-justify-between">
                    <div className="dbn-flex dbn-items-center dbn-gap-2">
                      <Ui.Icons name="table" />
                      <span className="dbn-w-full dbn-truncate dbn-text-left">
                        {DBN_SQL_TABLE}
                      </span>
                    </div>
                    <div className="dbn-flex dbn-items-center dbn-gap-2">
                      <Ui.Button
                        variant="popover"
                        className="dbn-w-full dbn-truncate dbn-text-left"
                        onClick={() => {
                          setShowCustomSqlModal?.((prev) => !prev);
                          onPreview?.();
                        }}
                      >
                        Preview
                      </Ui.Button>
                      <span
                        className={isShowSqlOptions ? '' : '-dbn-rotate-90'}
                      >
                        <Ui.Icons name="chevron-down" />
                      </span>
                    </div>
                  </div>
                </Ui.Button>
                {isShowSqlOptions &&
                  sqlColumnOptions?.map((item) => {
                    const draggableItemData: DraggableMetricItemData = {
                      table: {
                        columns: sqlColumnList?.map((c) => c.name) || [],
                        columnsWithDataType: sqlColumnList || [],
                        companyId: '',
                        id: DBN_SQL_TABLE,
                        recentUpdatedAt: 0,
                        schemaName: '',
                        tableName: DBN_SQL_TABLE,
                        alias: DBN_SQL_TABLE,
                        sql: query || '',
                        type: 'custom',
                      },
                      column: item,
                    };
                    return (
                      <Ui.DraggableItem
                        data={draggableItemData}
                        identifier={{
                          id: item.name,
                          type: 'column',
                        }}
                        key={item.name}
                        CustomDragPreview={
                          <span className={styles.listVal}>{item.name}</span>
                        }
                        renderItem={(
                          setDragNodeRef: React.MutableRefObject<any>
                        ) => {
                          return (
                            <div
                              className={styles.column}
                              key={item.name}
                              ref={setDragNodeRef}
                            >
                              <span className="dbn-flex dbn-gap-2 dbn-w-full">
                                <span className={styles.handleIcon}>
                                  <Ui.Icons
                                    name="kebab-menu-vertical"
                                    size="xs"
                                  />
                                  <Ui.Icons
                                    name="kebab-menu-vertical"
                                    size="xs"
                                  />
                                </span>
                                <span className="dbn-w-[5%] dbn-flex dbn-items-center">
                                  <Ui.DataType datatype={item.dataType} />
                                </span>
                                <span className="dbn-max-w-[90%] dbn-truncate dbn-text-left dbn-text-sm dbn-font-semibold">
                                  {item.name}
                                </span>
                              </span>
                            </div>
                          );
                        }}
                      />
                    );
                  })}
              </div>
            ) : null}
            {!isSqlTab && !isSqlLoading ? (
              <div className="dbn-h-[calc(100%-4rem)] dbn-w-full dbn-overflow-hidden dbn-overflow-y-auto dbn-flex dbn-flex-col dbn-gap-4">
                {searchKeyword?.length <= 1 &&
                  schemaMap &&
                  Object.keys(schemaMap)
                    .filter((key: string) =>
                      selectedDatabase ? key === selectedDatabase : true
                    )
                    .map((key: string) => (
                      <SchemaTab
                        key={`${key}_tab`}
                        schemaTabProps={{
                          dbName: dbName || '',
                          name: key,
                          tableList: schemaMap[key],
                          selectedColumns,
                          setSelectedColumns,
                          customSqlColumns: customSqlColumns || [],
                          isDatasetMode,
                          onSelectTable,
                          selectedDataset,
                          onDeleteCustomColumn: (column, table) => {
                            setCustomColumnToDelete({ column, table });
                            setDeleteCustomColumnModal(true);
                          },
                        }}
                      />
                    ))}
                {searchKeyword?.length > 1 && (
                  <SchemaSearch
                    schemaSearchProps={{
                      dbName: dbName || '',
                      schemaList: schemaMap,
                      searchKeyword,
                      tableList: schemaList?.filter(({ schemaName }) =>
                        selectedDatabase
                          ? schemaName === selectedDatabase
                          : true
                      ),
                      selectedColumns,
                      setSelectedColumns,
                      customSqlColumns: customSqlColumns || [],
                      selectedDatabase,
                      selectedDataset,
                      isDatasetMode,
                      onSelectTable,
                      onDeleteCustomColumn: (column, table) => {
                        setCustomColumnToDelete({ column, table });
                        setDeleteCustomColumnModal(true);
                      },
                    }}
                  />
                )}
                {/* TODO */}
                {!isSqlTab && datasetTableList && (
                  <Flex direction="col" className="dbn-gap-2">
                    <div className={styles.heading}>
                      <div className="dbn-flex dbn-gap-2">
                        <Ui.Icons name="database" size="xl" />
                        <Ui.Text variant="heading-lg">Custom Dataset</Ui.Text>
                      </div>
                      {onClickVirtualTableCreate && (
                        <Ui.Button
                          variant={isCreateVirtualTable ? 'tab' : 'tertiary'}
                          leftIcon={
                            <Ui.NewTooltip
                              text="create custom Dataset"
                              position="left"
                            >
                              <Ui.Icons name="plus" />
                            </Ui.NewTooltip>
                          }
                          onClick={() => onClickVirtualTableCreate()}
                        />
                      )}
                    </div>

                    {!isSqlTab &&
                      datasetTableList
                        ?.filter((table) => table.type === 'subQuery')
                        ?.map((table) => {
                          const customColumns =
                            customSqlColumns?.find(
                              (t) =>
                                t.tableName ===
                                `${table.schemaName}.${table.tableName}`
                            )?.list || [];
                          const customColumnList: TableColumn[] =
                            customColumns
                              .filter(
                                (col) => col.isAggregate || col.isDimension
                              )
                              ?.map((col) => ({
                                name: col.as,
                                as: col.isAggregate ? 'number' : 'string',
                                dataType: col.isAggregate ? 'number' : 'string',
                                sql: col.value,
                                type: 'custom',
                                isAggregate: col.isAggregate,
                              })) || [];

                          return (
                            <CustomTableTab
                              key={`${table.schemaName}.${table.tableName}`}
                              table={{
                                ...table,
                                columnsWithDataType: [
                                  ...table.columnsWithDataType,
                                  ...customColumnList,
                                ],
                                type: 'custom',
                              }}
                              selectedTable={selectedTable}
                              setSelectedColumns={setSelectedColumns}
                            />
                          );
                        })}
                  </Flex>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
      <Ui.Modal
        headerTitle="Delete Custom Column"
        isOpen={isOpenDeleteCustomColumnModal}
        onClose={() => setDeleteCustomColumnModal(false)}
      >
        <div className={styles.deleteModal}>
          <Ui.Icons name="delete" color="alert" />
          {/* warning icon */}
          <Ui.Text variant="body-text-sm">
            Are you sure you want to delete the custom column?
          </Ui.Text>
        </div>
        <Ui.ModalFooter>
          <Ui.Button
            variant="tab"
            type="button"
            onClick={() => setDeleteCustomColumnModal(false)}
          >
            Cancel
          </Ui.Button>
          <Ui.Button
            variant="primary"
            type="button"
            onClick={() => {
              if (customColumnToDelete)
                onDeletCustomColumn?.(
                  customColumnToDelete.column,
                  customColumnToDelete.table,
                  () => {
                    setDeleteCustomColumnModal(false);
                    window.location.reload();
                  }
                );
            }}
          >
            Delete
          </Ui.Button>
        </Ui.ModalFooter>
      </Ui.Modal>
    </div>
  );
};

export default SchemaSidebar;
