/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { SelectedOrgTable, StepProps } from 'types/integration';
import styles from './schemaTable.module.css';
import TableTab from './TableTab';

type Props = StepProps & {
  schemaList: any[];
  setSelectedTable: React.Dispatch<React.SetStateAction<SelectedOrgTable>>;
  selectedTable: SelectedOrgTable;
  isLoadingSchema: boolean;
  dbName?: string;
};
const SchemaTable = ({
  schemaList,
  selectedTable,
  setSelectedTable,
  onComplete,
  isLoadingSchema,
  dbName,
}: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  useEffect(() => {
    if (!selectedTable.name) return;
    onComplete?.();
  }, [selectedTable.name]);

  return (
    <div className={styles['schemaTable-container']}>
      <Ui.Text variant="body-text-sm">
        Select the table that contains your customers identifiable information.
      </Ui.Text>
      <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
      <div className={styles['']}>
        <Ui.Text variant="heading-lg">Tables</Ui.Text>
        <div className={styles['schemaTable-table']}>
          {isLoadingSchema ? (
            <div className="dbn-flex dbn-items-center dbn-justify-center">
              <Ui.Icons name="not-found" />
              {/* loading icon */}
            </div>
          ) : null}
          {schemaList
            ?.filter((table) =>
              table.tableName.toLowerCase().includes(searchKeyword)
            )
            ?.map((table) => (
              <TableTab
                key={table.id}
                name={`${table.schemaName}.${table.tableName}`}
                columnList={table.columnsWithDataType}
                isSelected={
                  selectedTable.name ===
                  `${table.schemaName}.${table.tableName}`
                }
                onSelect={(value) => {
                  setSelectedTable((prev) => ({ ...prev, ...value }));
                }}
                dbName={dbName}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SchemaTable;
