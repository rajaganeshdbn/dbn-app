/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './timegrain.module.css';
import {
  Icons,
  Text,
  Select,
  PopoverMenu,
  InputField,
  FloatingDropDown,
} from '@/components';

const timeGrainOptions = [
  {
    label: 'Last Week',
    value: 'Last Week',
  },
  {
    label: 'This Week',
    value: 'This Week',
  },
  {
    label: 'Last Month',
    value: 'Last Month',
  },
  {
    label: 'This Month',
    value: 'This Month',
  },
  {
    label: 'Last Year',
    value: 'Last Year',
  },
  {
    label: 'This Year',
    value: 'This Year',
  },
  {
    label: 'Yesterday',
    value: 'Yesterday',
  },
  {
    label: 'Today',
    value: 'Today',
  },
  {
    label: 'Custom',
    value: 'Custom',
  },
];

type Props = {
  isShowlabel?: boolean;
  timeGrainValue: string;
  setTimeGrainValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  register?: UseFormRegister<FieldValues>;
  className?: string;
  isDisabled?: boolean;
  containerClass?: string;
  onChange?: (value: string) => void;
  labelVariant?: 'floating' | 'static';
  label?: string;
};

const defaultValue = {
  value: '',
  from: '',
  to: '',
};
const getDefaultTimeGrain = (timeGrainValue?: string) => {
  if (!timeGrainValue) return defaultValue;

  if (timeGrainValue.includes(' - ')) {
    const [from, to] = timeGrainValue.split(' - ');
    return {
      ...defaultValue,
      value: timeGrainValue,
      from,
      to,
    };
  }
  return { ...defaultValue, value: timeGrainValue };
};

export const TimeGrainField = ({
  isShowlabel,
  timeGrainValue = '',
  setTimeGrainValue,
  register,
  className = '',
  isDisabled,
  containerClass = '',
  onChange,
  labelVariant,
  label,
}: Props) => {
  const [state, setState] = useState(getDefaultTimeGrain(timeGrainValue));

  useEffect(() => {
    if (state.value && state.value !== 'Custom') setTimeGrainValue(state.value);
    else if (state.from && state.to)
      setTimeGrainValue(`${state.from} - ${state.to}`);
  }, [state]);

  // useEffect(() => {
  //   if (!state.value) return;
  //   setTimeGrainValue(state.value);
  // }, [state.value]);

  // useEffect(() => {
  //   if (timeGrainValue) return;
  //   setState(defaultValue);
  // }, [timeGrainValue]);
  useEffect(() => {
    onChange?.(state.value);
  }, [state]);
  return (
    <>
      <div className={containerClass}>
        {isShowlabel ? (
          <Text variant="body-text-sm">{label || 'Time Filter'}</Text>
        ) : null}
        {/* <PopoverMenu
          isDisabled={isDisabled}
          buttonContent={
            <InputField
              label={label}
              type="text"
              placeholder="select time filter"
              register={register?.('timeGrain')}
              value={timeGrainValue}
              onChange={({ target: { value } }) =>
                setState((prev) => ({ ...prev, value }))
              }
              isDisabled
            />
          }
        > */}
        <div className={styles.container}>
          <FloatingDropDown
            options={timeGrainOptions}
            selectedOption={{ value: state.value, label: state.value }}
            onChange={(value) =>
              setState((prev) => ({ ...prev, value: value.value }))
            }
          />
          {state.value === 'Custom' ? (
            <>
              <InputField
                label="From Date"
                type="date"
                value={state.from}
                onChange={({ target: { value } }) =>
                  setState((prev) => ({ ...prev, from: value }))
                }
              />
              <InputField
                label="To Date"
                type="date"
                value={state.to}
                onChange={({ target: { value } }) =>
                  setState((prev) => ({ ...prev, to: value }))
                }
              />
            </>
          ) : null}
        </div>
        {/* </PopoverMenu> */}
      </div>
    </>
  );
};
