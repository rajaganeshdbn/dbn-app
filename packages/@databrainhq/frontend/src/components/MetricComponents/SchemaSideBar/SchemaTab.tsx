/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { Ui } from '@databrainhq/plugin';
import { MetricsValue, SelectedColumns } from 'types';
import { ELASTICSEARCH } from 'consts/application';
import { TableColumn, TableType } from 'hooks/useCompanySchema';
import TableTab from './TableTab';

type Props = {
  name: string;
  tableList: TableType[];
  setSelectedColumns?: React.Dispatch<
    React.SetStateAction<SelectedColumns[] | undefined>
  >;
  selectedColumns?: SelectedColumns[] | undefined;
  dbName: string;
  onChangeTableSelection?: (table: TableType) => void;
  customSqlColumns: {
    tableName: string;
    list: MetricsValue[];
  }[];
  onSelectTable?: (table: TableType) => void;
  isDatasetMode?: boolean;
  selectedDataset?: string;
  onDeleteCustomColumn: (column: TableColumn, table: TableType) => void;
};
const SchemaTab = ({
  schemaTabProps: {
    name,
    tableList,
    selectedColumns,
    setSelectedColumns,
    dbName,
    isDatasetMode,
    onSelectTable,
    customSqlColumns,
    selectedDataset,
    onDeleteCustomColumn,
  },
}: {
  schemaTabProps: Props;
}) => {
  const [isShowSchema, setShowSchema] = useState(false);
  useEffect(() => {
    if (dbName && dbName.toLowerCase() === ELASTICSEARCH) {
      setShowSchema(true);
    }
  }, [dbName]);

  return (
    <div className="dbn-w-full dbn-pr-4" key={name}>
      {dbName.toLowerCase() !== ELASTICSEARCH && (
        <div
          className="dbn-w-full dbn-flex dbn-items-center dbn-justify-between dbn-cursor-pointer"
          onClick={() => setShowSchema(!isShowSchema)}
        >
          <span className="dbn-flex dbn-gap-2 dbn-items-center dbn-justify-center">
            <Ui.Icons name="database" size="md" />
            <Ui.Text variant="heading">
              {name.length > 22 ? `${name.slice(0, 22)}...` : name}
            </Ui.Text>
          </span>
          <Ui.Button type="button" variant="popover" title={name} fitContainer>
            <div className={isShowSchema ? '' : '-dbn-rotate-90'}>
              <Ui.Icons name="chevron-down" />
            </div>
          </Ui.Button>
        </div>
      )}
      <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2 dbn-mt-2">
        {isShowSchema &&
          tableList.map((table) => {
            const customColumns =
              customSqlColumns.find(
                (t) => t.tableName === `${table.schemaName}.${table.tableName}`
              )?.list || [];
            const customColumnList: TableColumn[] = customColumns.map(
              (col) => ({
                name: col.as,
                as: col.isAggregate ? 'number' : 'string',
                dataType: col.isAggregate ? 'number' : 'string',
                sql: col.value,
                type: 'custom',
                isAggregate: col.isAggregate,
              })
            );
            return (
              <TableTab
                key={`${table.schemaName}_${table.tableName}_tab`}
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
                  isDatasetMode,
                  onSelectTable,
                  selectedDataset,
                  onDeleteCustomColumn,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SchemaTab;
