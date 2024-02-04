/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import { Ui, types } from '@databrainhq/plugin';
import { RLS_CONDITIONS } from 'consts/values';

export type ConditionGroupType = {
  table: string;
  column: string;
  condition: string;
  defaultValue: string;
};

type ConditionGroupProps = {
  group: ConditionGroupType;
  onChange: (group: Partial<ConditionGroupType>) => void;
  selectedTables: { tableName: string; columns: types.SelectedColumns[] }[];
};

const ConditionGroup: React.FC<ConditionGroupProps> = ({
  onChange,
  group,
  selectedTables,
}) => {
  const [selectedTable, setSelectedTable] = useState<{
    tableName: string;
    columns: types.SelectedColumns[];
  }>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isEnableStaticValue, setEnableStaticValue] = useState(false);

  return (
    <>
      <div className="dbn-flex dbn-gap-5 dbn-items-center dbn-border dbn-p-5 dbn-rounded-md">
        <Ui.PopoverMenu
          buttonContent={
            <Ui.InputField
              type="text"
              label="Column"
              placeholder="Choose a column from a table"
              value={group.column}
              onChange={(e) => onChange({ column: e.target.value })}
            />
          }
        >
          <div className="dbn-relative dbn-h-10 dbn-border-b dbn-text-slate-500">
            <span className="dbn-absolute dbn-top-2 dbn-left-3 dbn-text-xl">
              <Ui.Icons name="magnifying-glass" />
            </span>
            {/* eslint-disable-next-line */}
            <input
              className="dbn-w-full dbn-h-full dbn-outline-none dbn-px-10"
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="dbn-flex dbn-justify-between">
            <div className="dbn-w-1/2 dbn-border-r dbn-overflow-y-auto dbn-max-h-40">
              <Ui.Text variant="heading">Tables</Ui.Text>
              <ul className="dbn-p-1 dbn-pt-0">
                {selectedTables
                  ?.filter((table) => table.tableName.includes(searchKeyword))
                  .map((table) => (
                    <li key={table.tableName}>
                      <div
                        className={`hover:dbn-bg-slate-100 dbn-w-full dbn-rounded dbn-py-1 dbn-px-2 dbn-my-0.5 dbn-items-center dbn-flex dbn-cursor-pointer${
                          table.tableName === selectedTable?.tableName
                            ? ' dbn-bg-slate-100'
                            : ''
                        }`}
                      >
                        <Ui.Button
                          variant="tertiary"
                          type="button"
                          onClick={() => {
                            setSelectedTable(table);
                            onChange({
                              table: table.tableName,
                            });
                          }}
                          leftIcon={<Ui.Icons name="table" />}
                        >
                          <span className="dbn-w-full dbn-truncate dbn-ml-2 dbn-text-left">
                            {table.tableName}
                          </span>
                          <Ui.Icons name="not-found" />
                          {/* chevron right */}
                        </Ui.Button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="dbn-w-1/2 dbn-border-l dbn-overflow-y-auto dbn-max-h-40">
              <Ui.Text variant="heading">Columns</Ui.Text>
              <ul className="dbn-p-1 dbn-pt-0">
                {selectedTable?.columns.map((col) => (
                  <li key={col.column}>
                    <div
                      className={`hover:dbn-bg-slate-100 dbn-w-full dbn-rounded dbn-py-1 dbn-px-2 dbn-my-0.5 dbn-items-center dbn-flex dbn-cursor-pointer${
                        group.column === col.column ? ' dbn-bg-slate-100' : ''
                      }`}
                    >
                      <Ui.Button
                        variant="tertiary"
                        type="button"
                        onClick={() =>
                          onChange({
                            column: col.column,
                          })
                        }
                      >
                        <Ui.DataType datatype={col.datatype} />
                        <span className="dbn-w-full dbn-truncate dbn-ml-2 dbn-text-left">
                          {col.column}
                        </span>
                      </Ui.Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Ui.PopoverMenu>
        <Ui.FloatingDropDown
          label="Condition"
          options={Object.entries(RLS_CONDITIONS).map(([condition]) => ({
            value: condition,
            label: condition,
          }))}
          selectedOption={{
            value: group.condition,
            label: group.condition,
          }}
          onChange={(option) => onChange({ condition: option.value })}
        />

        <Ui.InputField
          type="text"
          label="Default Value"
          placeholder="Enter a value"
          value={group.defaultValue}
          onChange={({ target: { value } }) =>
            onChange({ defaultValue: value })
          }
          isDisabled={!isEnableStaticValue}
        />
        <Ui.Tooltip
          position="top"
          content={
            <Ui.Switch
              onChange={(enabled) => {
                setEnableStaticValue(enabled);
                if (!enabled) onChange({ defaultValue: '' });
              }}
              enabled={isEnableStaticValue}
            />
          }
        >
          Enable input
        </Ui.Tooltip>
      </div>
    </>
  );
};

export default React.memo(ConditionGroup);
