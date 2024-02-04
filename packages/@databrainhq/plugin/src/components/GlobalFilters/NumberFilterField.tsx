/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './filters.module.css';
import { Button, InputField, Text, PopoverMenu, Icons } from '@/components';
import { GlobalFilterColumn } from '@/types';
import { BETWEEN } from '@/consts';

type NumberFieldProps = {
  setAppliedFilters?: any;
  column?: GlobalFilterColumn;
  defaultValues?: { min: number | null; max: number | null };
  className?: string;
  onChange?: (value: { min: number | null; max: number | null }) => void;
  label?: string;
  variant?: 'static' | 'floating';
  buttonWidth?: string;
  radius?: string;
  isFilter?: boolean;
};
export const NumberFilterField = ({
  setAppliedFilters,
  column,
  defaultValues,
  className = '',
  onChange,
  label,
  variant = 'static',
  buttonWidth = 'auto',
  radius,
  isFilter,
}: NumberFieldProps) => {
  const [minMax, setMinMax] = useState<{
    min: number | null;
    max: number | null;
  }>(
    defaultValues || {
      min: null,
      max: null,
    }
  );
  const isDefaultValueNull =
    defaultValues?.min === null || defaultValues?.max === null;
  const popupRef = useRef(null) as React.RefObject<HTMLDivElement>;
  const [selectedLabel, setSelectedLable] = useState('');
  const [error, setError] = useState('');

  const removeNumberFilter = () => {
    setMinMax({ min: null, max: null });
    setSelectedLable('');
    setError('');
    popupRef.current?.click();
    if (column?.isVariableFilter)
      setAppliedFilters((prev: any[]) => {
        return prev.map((itm) =>
          itm.label !== column?.label
            ? itm
            : { ...itm, value: undefined, defaultValues: undefined }
        );
      });
    else
      setAppliedFilters((prev: any[]) => {
        return prev.filter((itm) => itm.label !== column?.label);
      });
  };

  const setNumberFilter = () => {
    if (minMax.min === null || minMax.max === null) {
      setError('Invalid value');
      return;
    }
    if (column && setAppliedFilters)
      setAppliedFilters((prev: any[]) => {
        const field = {
          column: column.name,
          operator: BETWEEN,
          value: `${minMax.min} AND ${minMax.max}`,
          as: column.as,
          defaultValues: minMax,
          filterType: column.isShowHorizontal ? 'horizontal' : 'global',
          isFilterApplied: Boolean(column.isShowHorizontal),
          applyOnTables: column.applyOnTables,
          isVariableFilter: column.isVariableFilter,
          variableStrings: column.variableStrings || [],
          label: column.label || column.name,
        };
        const index = prev.findIndex((f) => f.label === column.label);
        if (index === -1) return [...prev, field];
        const updated = [...prev];
        updated[index] = field;
        return updated;
      });
    setSelectedLable(`Between ${minMax.min} to ${minMax.max}`);
    setError('');
    popupRef.current?.click();
  };
  useEffect(() => {
    setMinMax(defaultValues || { min: null, max: null });
    setSelectedLable(
      defaultValues && !isDefaultValueNull
        ? `${defaultValues.min} AND ${defaultValues.max}`
        : ''
    );
  }, [defaultValues?.max, defaultValues?.min, isDefaultValueNull]);

  return (
    <>
      <PopoverMenu
        position="bottom-start"
        buttonWidth={buttonWidth}
        menuWidth="200px"
        buttonContent={
          <>
            {variant === 'static' && (
              <span
                className={`dbn-text-sm dbn-leading-6 dbn-font-medium dbn-inline-block dbn-font-lato ${
                  isFilter ? 'dbn-selectBox' : ''
                }`}
              >
                {label || column?.label || column?.name}
              </span>
            )}
            <div
              className={styles.numberField}
              style={{ borderRadius: radius || '4px' }}
              ref={popupRef}
            >
              {/* {!selectedLabel && (
              <div className="dbn-mr-2">
                <Text variant="body-text-sm">
                  <Icons name="not-found" /> 
                </Text>
              </div>
            )} */}
              <div className={styles.numberFieldLabelText}>
                {variant === 'floating' && (
                  <span
                    className={`${[
                      styles.numberFieldLabel,
                      styles.selectedLabel,
                    ].join(' ')} ${isFilter ? 'dbn-selectBox' : ''}`}
                  >
                    {label || column?.label || column?.name}
                  </span>
                )}
                <span
                  className={`dbn-text-sm dbn-leading-5 dbn-font-normal dbn-font-lato ${
                    isFilter ? 'dbn-selectBox' : ''
                  }`}
                >
                  {selectedLabel || 'Select a value'}
                </span>
              </div>
              <span>
                <Icons name="caret-down-fill" size="xs" />
              </span>
            </div>
          </>
        }
      >
        <div className={styles.numberFieldWrapper}>
          <InputField
            label="minimum"
            type="number"
            defaultValue={minMax.min as number}
            onChange={({ target: { value } }) => {
              setMinMax((prev) => ({
                ...prev,
                min: Number(value),
              }));
              onChange?.({ min: Number(value), max: minMax.max });
            }}
          />
          <InputField
            label="maximum"
            type="number"
            defaultValue={minMax.max as number}
            onChange={({ target: { value } }) => {
              setMinMax((prev) => ({
                ...prev,
                max: Number(value),
              }));
              onChange?.({ min: minMax.min, max: Number(value) });
            }}
          />
          {error && (
            <Text variant="body-text-sm" color="alert">
              {error}
            </Text>
          )}
          <div className={styles.numberFieldFooter}>
            <Button
              type="button"
              variant="tertiary"
              onClick={removeNumberFilter}
            >
              Clear
            </Button>

            <Button variant="primary" type="button" onClick={setNumberFilter}>
              Save
            </Button>
          </div>
        </div>
      </PopoverMenu>
    </>
  );
};

export default NumberFilterField;
