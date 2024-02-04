import React, { useEffect, useMemo, useState } from 'react';
import styles from './filterfield.module.css';
import { getFormattedDataType } from '@/utils';
import {
  PopoverMenu,
  Text,
  Icons,
  DataType,
  FilterDropDown,
  FloatingDropDown,
} from '@/components';

import { operatorList } from '@/consts/metricOptions';
import { FloatingDropDownOption } from '@/types';

export type FilterFieldType = {
  column: string;
  labelColumnName?: string;
  operator: string;
  applyOnTables?: { tableName: string; columnName: string; dataType: string }[];
  value?:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | null
    | Record<string, any>;
  as?: string;
  defaultValues?: any;
  filterType?: 'global' | 'horizontal';
  isFilterApplied?: boolean;
  isVariableFilter?: boolean;
  variableStrings?: string[];
  label: string;
  filterVariant?: FloatingDropDownOption;
  selectedDropdownValue?: FloatingDropDownOption | FloatingDropDownOption[];
};

export type FilterFieldProps = {
  tableName: string;
  filter: {
    name: string;
    dataType: string;
    as: string;
  };
  isResetted: boolean;
  onChange: (field: FilterFieldType) => void;
  workspaceId: string;
};

export const isInFilterOperator = (input: string) => {
  return ['IN', 'NOT IN'].includes(input);
};
export const isNullFilterOperator = (input: string) => {
  return ['IS NULL', 'IS NOT NULL'].includes(input);
};

export const FilterField: React.FC<FilterFieldProps> = ({
  filter,
  onChange,
  isResetted,
  workspaceId,
  tableName,
}) => {
  const [operator, setOperator] = useState<FloatingDropDownOption>({
    value: '=',
    label: 'Equal to (=)',
  });
  const [option, setOption] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [multiOptions, setMultiOptions] = useState<FloatingDropDownOption[]>(
    []
  );
  const type = useMemo(
    () => getFormattedDataType(filter.dataType),
    [filter.dataType]
  );

  useEffect(() => {
    if (!operator.value || (option.value !== '' && multiOptions.length)) return;
    onChange({
      column: filter.name,
      operator: operator.value,
      value: isNullFilterOperator(operator.value)
        ? null
        : option.value || multiOptions.map((op) => op.value),
      label: filter.name,
    });
  }, [operator, option.value, multiOptions]);

  useEffect(() => {
    if (!isResetted) return;
    setOperator({
      label: '',
      value: '',
    });
    setOption({
      label: '',
      value: '',
    });
    setMultiOptions([]);
  }, [isResetted]);

  return (
    <>
      <PopoverMenu
        buttonContent={
          <>
            <span className={styles.buttonText}>
              <DataType datatype={filter.as || type} />
              {filter.name}
            </span>
            <span className={styles.buttonIcon}>
              <Icons name="chevron-down" />
            </span>
          </>
        }
      >
        <Text variant="body-text-sm">{filter.name}</Text>
        <FloatingDropDown
          label="Operator"
          labelVariant="static"
          selectedOption={operator}
          onChange={(opt) => setOperator(opt)}
          options={operatorList}
        />
        {operator.value && !isNullFilterOperator(operator.value) ? (
          <>
            {type === 'boolean' ? (
              <FloatingDropDown
                options={[
                  { value: 'true', label: 'TRUE' },
                  { value: 'false', label: 'FALSE' },
                ]}
                selectedOption={option}
                onChange={setOption}
                label="Filter Value"
                labelVariant="static"
              />
            ) : (
              <>
                {isInFilterOperator(operator.value) ? null : ( // /> //   autoSelected={false} //   className={styles.filterDropdown} //   labelVariant="static" //   label="Filter Value" //   isSearchEnabled //   workspaceId={workspaceId} //   }} //     columnName: filter.name, //     tableName, //   filter={{ //   onChange={setMultiOptions} //   selectedOptions={multiOptions} // <MultiFilterDropdown
                  <FilterDropDown
                    selectedOption={option}
                    onChange={setOption}
                    filter={{
                      tableName,
                      columnName: filter.name,
                    }}
                    workspaceId={workspaceId}
                    isSearchEnabled
                    label="Filter Value"
                    labelVariant="static"
                    autoSelected={false}
                  />
                )}
              </>
            )}
          </>
        ) : null}
      </PopoverMenu>
    </>
  );
};
