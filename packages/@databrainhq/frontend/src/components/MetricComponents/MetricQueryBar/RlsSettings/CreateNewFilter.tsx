import React from 'react';
import { Ui, types } from '@databrainhq/plugin';
import ConditionGroup, { ConditionGroupType } from './ConditionGroup';

export type RlsFilterType = ConditionGroupType & {
  name: string;
};

type CreateNewFilterProps = {
  value: RlsFilterType;
  onChange: (value: Partial<RlsFilterType>) => void;
  selectedTables: { tableName: string; columns: types.SelectedColumns[] }[];
};

const CreateNewFilter: React.FC<CreateNewFilterProps> = ({
  value,
  onChange,
  selectedTables,
}) => {
  return (
    <>
      <Ui.InputField
        label="RLS Condition Name"
        type="text"
        placeholder="eg. Region Filter"
        value={value.name}
        onChange={({ target }) => onChange({ name: target.value })}
      />
      <div className="dbn-flex dbn-flex-col dbn-gap-3">
        <Ui.Text variant="body-text-sm">Condition</Ui.Text>
        <ConditionGroup
          group={{ ...value }}
          onChange={onChange}
          selectedTables={selectedTables}
        />
      </div>
    </>
  );
};

export default React.memo(CreateNewFilter);
