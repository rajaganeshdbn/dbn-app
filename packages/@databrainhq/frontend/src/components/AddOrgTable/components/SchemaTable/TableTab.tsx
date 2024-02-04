/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { SelectedOrgTable } from 'types/integration';
import { ELASTICSEARCH } from 'consts/application';

type Props = {
  name: string;
  columnList: { name: string; dataType: string }[];
  isSelected: boolean;
  onSelect: (table: Pick<SelectedOrgTable, 'name' | 'columnList'>) => void;
  dbName?: string;
};
const TableTab = ({
  name: tableName,
  columnList,
  isSelected = false,
  onSelect,
  dbName,
}: Props) => {
  const [isShowTable, setShowTable] = useState<boolean>(false);
  const name =
    dbName?.toLowerCase() === ELASTICSEARCH
      ? tableName.split('.').slice(1).join('.')
      : tableName;
  return (
    <>
      <div className="dbn-flex">
        <Ui.Button
          type="button"
          variant="tertiary"
          onClick={() => onSelect({ name: tableName, columnList })}
        >
          {isSelected ? (
            <Ui.Icons name="not-found" />
          ) : (
            <Ui.Icons name="not-found" />
          )}
          {/* checked, unhchecked icon */}
        </Ui.Button>
        <Ui.Button
          type="button"
          variant="tertiary"
          onClick={() => setShowTable(!isShowTable)}
          title={name}
        >
          <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-w-full">
            <Ui.Icons name="table" />
            <Ui.Text variant="body-text-sm">
              {name?.length > 35 ? `${name?.slice(0, 35)}...` : name}
            </Ui.Text>
          </div>
          {isShowTable ? (
            <Ui.Icons name="arrow-down" />
          ) : (
            <Ui.Icons name="arrow-right" />
          )}
        </Ui.Button>
      </div>
      {isShowTable && (
        <ul className="dbn-w-full dbn-px-2 dbn-ml-10">
          {columnList?.map((item) => (
            <li
              key={item.name}
              className="hover:dbn-bg-gray-100 dbn-px-2 dbn-flex dbn-gap-2 dbn-py-2"
            >
              <Ui.DataType datatype={item.dataType} />
              <Ui.Text variant="body-text-sm">{item.name}</Ui.Text>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TableTab;
