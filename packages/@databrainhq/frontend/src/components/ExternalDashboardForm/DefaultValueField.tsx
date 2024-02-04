/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui, types } from '@databrainhq/plugin';
import { GlobalFiltersDefaultValue } from 'types';
import { useEffect } from 'react';
import { DEFAULT_VALUE } from 'consts/labels';
import useWorkspace from 'hooks/useWorkspace';

type DefaultValueFieldProps = {
  type: string;
  tableName: string;
  columnName: string;
  selectedValue: GlobalFiltersDefaultValue;
  onChange: (value: GlobalFiltersDefaultValue) => void;
  isClientScoped?: boolean;
  clientColumn?: string;
  clientColumnType?: string;
  clientId?: string;
};

const DefaultValueField = ({
  type,
  columnName,
  selectedValue,
  tableName,
  onChange,
  clientColumn,
  clientColumnType,
  isClientScoped,
  clientId,
}: DefaultValueFieldProps) => {
  useEffect(() => {
    onChange(undefined);
  }, [type]);
  let inputField;
  const { workspace } = useWorkspace();
  switch (type) {
    case 'string':
      inputField = (
        <Ui.MultiFilterDropdown
          buttonWidth="100%"
          menuWidth="100%"
          workspaceId={workspace?.id}
          filter={{
            tableName,
            columnName,
            defaultValue: '',
            value: '',
          }}
          selectedOption={
            selectedValue && Array.isArray(selectedValue)
              ? (selectedValue.map((value) => ({
                  label: value,
                  value,
                })) as types.FloatingDropDownOption[])
              : []
          }
          autoSelected={false}
          onChange={(options: types.FloatingDropDownOption[]) => {
            onChange(options.map((v) => v.value) || []);
          }}
          isSearchEnabled
          label={DEFAULT_VALUE}
        />
      );
      break;
    case 'number':
      inputField = (
        <Ui.NumberFilterField
          className=""
          defaultValues={
            selectedValue as {
              min: number;
              max: number;
            }
          }
          onChange={(option) => onChange(option)}
          label={DEFAULT_VALUE}
        />
      );
      break;
    case 'date': {
      const value = selectedValue as
        | {
            startDate: Date | undefined;
            endDate: Date | undefined;
            timeGrainValue: string;
            value: string;
          }
        | undefined;
      const defaultValues =
        value?.endDate && value?.startDate && value?.timeGrainValue
          ? {
              startDate: new Date(value.startDate),
              endDate: new Date(value.endDate),
              timeGrainValue: value.timeGrainValue,
            }
          : undefined;
      inputField = (
        <Ui.DateRangePicker
          label={DEFAULT_VALUE}
          defaultValues={defaultValues}
          onChange={(option) => {
            onChange(option);
          }}
        />
      );
      break;
    }

    default:
      inputField = (
        <Ui.FilterDropDown
          buttonWidth="100%"
          menuWidth="615px"
          filter={{
            tableName,
            columnName,
            defaultValue: '',
            value: '',
          }}
          workspaceId={workspace?.id}
          selectedOption={{
            value: selectedValue as string,
            label: selectedValue as string,
          }}
          autoSelected={false}
          onChange={(option: types.FloatingDropDownOption) => {
            onChange(option.value || '');
          }}
          isSearchEnabled
          label={DEFAULT_VALUE}
          filterClause={
            clientColumn && isClientScoped && clientColumnType
              ? [
                  {
                    columnName: clientColumn,
                    value: clientId,
                    as: clientColumnType,
                  },
                ]
              : []
          }
        />
      );
      break;
  }

  return <div>{inputField}</div>;
};

export default DefaultValueField;
