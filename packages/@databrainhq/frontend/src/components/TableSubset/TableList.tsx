import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import useAccessControl from 'hooks/useAccessControl';

const TableList = ({
  columnList,
  name,
  schemaName,
  setSelectedColumns,
  selectedColumns,
}: any) => {
  const [isShowTable, setShowTable] = useState(false);
  const { getIsCanAccess } = useAccessControl();

  return (
    <div className="dbn-w-full dbn-px-1">
      <Ui.Button
        type="button"
        variant="tertiary"
        onClick={() => setShowTable(!isShowTable)}
        title={name}
      >
        {isShowTable ? (
          <Ui.Icons name="arrow-down" />
        ) : (
          <Ui.Icons name="arrow-right" />
        )}
        <div className="dbn-flex dbn-items-center dbn-gap-2">
          <Ui.Icons name="table" />
          <Ui.Text variant="body-text-sm">{name}</Ui.Text>
        </div>
      </Ui.Button>

      {isShowTable && (
        <div className="dbn-w-full dbn-px-5">
          {columnList?.map((item: { name: string; dataType: string }) => (
            <Ui.Button
              type="button"
              variant="tertiary"
              key={`${name}.${item.name}`}
              title={item.name}
              onClick={
                getIsCanAccess('accessPermissions', 'Edit')
                  ? () => {
                      if (
                        !selectedColumns?.find(
                          (column: {
                            schemaName: string;
                            tableName: string;
                            column: string;
                          }) =>
                            column.schemaName === schemaName &&
                            column.tableName === name &&
                            column.column === item.name
                        )
                      ) {
                        setSelectedColumns((prevCol: any) => [
                          ...(prevCol || []),
                          {
                            schemaName,
                            tableName: name,
                            column: item.name,
                            datatype: item.dataType,
                          },
                        ]);
                      } else {
                        setSelectedColumns(
                          selectedColumns?.filter(
                            (column: {
                              schemaName: string;
                              tableName: string;
                              column: string;
                            }) =>
                              column.column !== item.name ||
                              column.schemaName !== schemaName ||
                              column.tableName !== name
                          )
                        );
                      }
                    }
                  : undefined
              }
            >
              {selectedColumns?.find(
                (column: {
                  schemaName: string;
                  tableName: string;
                  column: string;
                }) =>
                  column.schemaName === schemaName &&
                  column.tableName === name &&
                  column.column === item.name
              ) ? (
                <div className="dbn-flex dbn-gap-2 dbn-w-full dbn-text-sm">
                  <Ui.Icons name="not-found" />
                  {/* check icon */}
                  <Ui.DataType datatype={item.dataType} />

                  {item.name.length > 30
                    ? `${item.name.slice(0, 30)}...`
                    : item.name}
                </div>
              ) : (
                <div className="dbn-flex dbn-gap-2 dbn-items-center dbn-text-sm">
                  <Ui.Icons name="not-found" />
                  {/* uncheck icon */}
                  <Ui.DataType datatype={item.dataType} />
                  {item.name.length > 30
                    ? `${item.name.slice(0, 30)}...`
                    : item.name}
                </div>
              )}
            </Ui.Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableList;
