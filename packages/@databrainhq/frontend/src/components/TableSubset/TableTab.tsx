/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';

type Props = {
  name: string;
  columnList: { name: string; datatype: string; as: string }[];
};
const TableTab = ({ name, columnList }: Props) => {
  const [isShowTable, setShowTable] = useState(false);

  return (
    <div className="dbn-w-full">
      <Ui.Button type="button" variant="popover" title={name}>
        <Ui.Icons name="arrow-right" />
        <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-w-full">
          <Ui.Icons name="table" />
          <Ui.Text variant="body-text-sm">{name}</Ui.Text>
        </div>
      </Ui.Button>
    </div>
  );
};

export default TableTab;
