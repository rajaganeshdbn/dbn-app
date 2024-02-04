/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui } from '@databrainhq/plugin';
import { MetricsValue, SelectedColumns } from 'types';
import { TableColumn, TableType } from 'hooks/useCompanySchema';
import SchemaTab from './SchemaTab';
import TableTab from './TableTab';

type Props = {
  schemaList: Record<string, TableType[]>;
  setSelectedColumns?: React.Dispatch<
    React.SetStateAction<SelectedColumns[] | undefined>
  >;
  selectedColumns?: SelectedColumns[] | undefined;
  dbName: string;
  searchKeyword: string;
  tableList: TableType[];
  onChangeTableSelection?: (table: TableType) => void;
  customSqlColumns: {
    tableName: string;
    list: MetricsValue[];
  }[];
  selectedDatabase?: string;
  onSelectTable?: (table: TableType) => void;
  isDatasetMode?: boolean;
  selectedDataset?: string;
  onDeleteCustomColumn: (column: TableColumn, table: TableType) => void;
};
const SchemaSearch = ({
  schemaSearchProps: {
    schemaList,
    setSelectedColumns,
    selectedColumns,
    searchKeyword,
    tableList,
    dbName,
    onChangeTableSelection,
    customSqlColumns,
    selectedDatabase,
    isDatasetMode,
    onSelectTable,
    selectedDataset,
    onDeleteCustomColumn,
  },
}: {
  schemaSearchProps: Props;
}) => {
  return (
    <div>
      {schemaList &&
        !selectedDatabase &&
        Object.keys(schemaList)
          ?.filter((schema) => schema.toLowerCase().includes(searchKeyword))
          ?.map((key) => (
            <SchemaTab
              schemaTabProps={{
                dbName: dbName || '',
                name: key,
                onChangeTableSelection,
                tableList: schemaList[key],
                selectedColumns,
                setSelectedColumns,
                customSqlColumns: customSqlColumns || [],
                isDatasetMode,
                onSelectTable,
                selectedDataset,
                onDeleteCustomColumn,
              }}
            />
          ))}
      {tableList
        ?.filter(({ tableName }) =>
          tableName.toLowerCase().includes(searchKeyword)
        )
        ?.map((table) => {
          const customColumns =
            customSqlColumns.find(
              (t) => t.tableName === `${table.schemaName}.${table.tableName}`
            )?.list || [];
          const customColumnList: TableColumn[] = customColumns.map((col) => ({
            name: col.as,
            as: col.isAggregate ? 'number' : 'string',
            dataType: col.isAggregate ? 'number' : 'string',
            sql: col.value,
            type: 'custom',
            isAggregate: col.isAggregate,
          }));
          return (
            <div key={`${table.schemaName}_${table.tableName}_search`}>
              <Ui.Button type="button" variant="tertiary">
                <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-w-full ">
                  <Ui.Icons name="database" size="md" /> {/* schema-icon */}
                  <Ui.Text>
                    {table.schemaName.length > 22
                      ? `${table.schemaName.slice(0, 22)}...`
                      : table.schemaName}
                  </Ui.Text>
                </div>
              </Ui.Button>

              <TableTab
                tableTabProps={{
                  table: {
                    ...table,
                    columnsWithDataType: [
                      ...table.columnsWithDataType,
                      ...customColumnList,
                    ],
                  },
                  selectedColumns,
                  setSelectedColumns,
                  onSelectTable,
                  isDatasetMode,
                  selectedDataset,
                  onDeleteCustomColumn,
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default SchemaSearch;
