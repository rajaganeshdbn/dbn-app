/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import classNames from 'classnames';
import style from './Select.module.css';
import { Text, SearchTab, Button, Icons, Checkbox } from '@/components';
import { useOutsideAlerter } from '@/hooks';

type Option = {
  value: string;
  label: string;
};
type SelectInput = {
  label?: string;
  value: any;
  placeHolder?: string;
  options: Option[] | undefined;
  onChange?: (val: string | any) => void;
  isSearchEnabled?: boolean;
  searchIcon?: JSX.Element;
  labelVariant?: 'floating' | 'static';
};
type HookSelectInput = Omit<SelectInput, 'value'> & {
  control: Control;
  name: string;
};

export const Select = ({
  label,
  options = [],
  onChange,
  value,
  placeHolder,
  isSearchEnabled,
  searchIcon,
  labelVariant = 'static',
}: SelectInput) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [limit, setLimit] = useState(20);
  const [isOpen, setOpen] = useState(false);
  const wrapRef = useRef() as React.RefObject<HTMLDivElement>;
  const selectedOption = value
    ? options.find((i) => i.value === value)
    : { label: placeHolder || 'Select an option' };

  const filteredOptions = useMemo(() => {
    if (!searchKeyword) return options.slice(0, limit);
    return options
      .filter((opt) => opt.label.toLowerCase().includes(searchKeyword))
      .slice(0, limit);
  }, [searchKeyword, options, limit]);

  useOutsideAlerter({
    wrapRef,
    onOutsideClick: () => setOpen(false),
  });

  return (
    <div ref={wrapRef} className={style.listbox}>
      {label ? <label className={style['listBox-label']}>{label}</label> : null}
      <div className={style.listboxButtonWrapper}>
        <div
          className={style['listBoxButton-container']}
          onClick={() => setOpen((prev) => !prev)}
        >
          {selectedOption ? (
            <span className={style.selectedOptionText}>
              {selectedOption.label}
            </span>
          ) : (
            <span className={style.selectedOptionText}>{placeHolder}</span>
          )}
          <span className={style.listBoxButton}>
            <Icons name="chevron-down" />
          </span>
        </div>

        {isOpen && (
          <div className={style['listBox-options']}>
            <>
              {isSearchEnabled && (
                <div className={style.searchDiv}>
                  {searchIcon}
                  <SearchTab
                    className={style.search}
                    setSearchKeyword={setSearchKeyword}
                  />
                </div>
              )}
              {filteredOptions.length === 0 ? (
                <div className={style.notAvailable}>Not Available.</div>
              ) : (
                filteredOptions.map((item) => (
                  <div
                    className={classNames(
                      value === item.value
                        ? style.activeOption
                        : style.inactiveOption,
                      style.option
                    )}
                    onClick={() => {
                      onChange?.(item.value);
                      setOpen(false);
                    }}
                  >
                    <Button key={item.value} type="button" variant="tertiary">
                      <span className={style.optionLabel}>{item.label}</span>
                    </Button>
                  </div>
                ))
              )}
              {limit <= options.length && (
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => setLimit(limit + 30)}
                  rightIcon={<Icons name="chevron-down" />}
                >
                  Load More
                </Button>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export const HookSelect = ({ control, name, ...rest }: HookSelectInput) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select
          {...rest}
          onChange={onChange}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={value}
        />
      )}
    />
  );
};

type MultiSelectProps = {
  options: Option[];
  defaultValue?: Option['value'][];
  value?: Option['value'][];
  onChange?: (selected: Option['value'][]) => void;
  label?: string;
  name?: string;
  className?: string;
  containerClass?: string;
  children?: React.ReactNode;
  placeHolder?: string;
  onClick?: any;
  labelVariant?: 'floating' | 'static';
  isSearchEnabled?: boolean;
  icon?: JSX.Element;
  isDisableShowSelectedTag?: boolean;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  defaultValue,
  value,
  onChange,
  label,
  name,
  className = '',
  children,
  placeHolder,
  onClick,
  isSearchEnabled,
  containerClass = '',
  labelVariant = 'static',
  icon,
  isDisableShowSelectedTag,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [limit, setLimit] = useState(20);
  const [isOpen, setOpen] = useState(false);
  const wrapRef = useRef() as React.RefObject<HTMLDivElement>;

  const filteredOptions = useMemo(() => {
    if (!searchKeyword) return options.slice(0, limit);
    return options
      .filter((opt) => opt.label.toLowerCase().includes(searchKeyword))
      .slice(0, limit);
  }, [searchKeyword, options, limit]);

  useOutsideAlerter({
    wrapRef,
    onOutsideClick: () => setOpen(false),
  });

  useEffect(() => {
    if (defaultValue && defaultValue.length) onChange?.(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={wrapRef} className={`${style.listbox} ${containerClass}`}>
        {icon}
        {label ? (
          <label
            className={`${style['listBox-label']} ${
              labelVariant === 'floating' ? style['listBox-labelFloating'] : ''
            }`}
          >
            {label}
          </label>
        ) : null}
        <div className={style.listboxButtonWrapper}>
          <div
            className={`${style['listBoxButton-container']} ${className} ${
              labelVariant === 'floating'
                ? style['listBoxButton-containerFloating']
                : ''
            }`}
          >
            <Button
              variant="tertiary"
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              name={name}
            >
              <span className={style.selectedOptionText}>
                {placeHolder || 'Choose options from list'}
              </span>
              <span className={style.listBoxButton}>
                <Icons name="chevron-down" />
              </span>
            </Button>
          </div>
          {isOpen && (
            <div className={style['listBox-options']}>
              {isSearchEnabled && (
                <SearchTab
                  className={style.search}
                  setSearchKeyword={setSearchKeyword}
                />
              )}
              {filteredOptions.length === 0 ? (
                <div className={style.notAvailable}>Not Available.</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    className={classNames(
                      value?.includes(option.value) ? style.optionSelected : '',
                      style.option
                    )}
                    onClick={() => {
                      if (value?.find((v) => v === option.value))
                        onChange?.(value.filter((v) => v !== option.value));
                      else onChange?.([...(value || []), option.value]);
                      onClick?.();
                    }}
                  >
                    <Button
                      key={option.value as string}
                      type="button"
                      variant="tertiary"
                      onClick={() => {
                        if (value?.find((v) => v === option.value))
                          onChange?.(value.filter((v) => v !== option.value));
                        else onChange?.([...(value || []), option.value]);
                        onClick?.();
                      }}
                    >
                      <Checkbox
                        checked={value?.includes(option.value)}
                        onClick={() => {
                          if (value?.find((v) => v === option.value))
                            onChange?.(value.filter((v) => v !== option.value));
                          else onChange?.([...(value || []), option.value]);
                          onClick?.();
                        }}
                      />
                      {option.label}
                    </Button>
                  </div>
                ))
              )}
              {limit <= options.length && (
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => setLimit(limit + 30)}
                  rightIcon={<Icons name="chevron-down" />}
                >
                  Load More
                </Button>
              )}
              {children}
            </div>
          )}
        </div>
        {value?.length && !isDisableShowSelectedTag ? (
          <div className={style.selectedList}>
            {value.map((optionValue) => {
              return (
                <Text variant="body-text-sm" key={optionValue}>
                  {
                    options.find((option) => option.value === optionValue)
                      ?.label
                  }
                </Text>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

type HookMultiSelectProps = MultiSelectProps & {
  control: Control<FieldValues>;
  name: string;
};

export const HookMultiSelect: React.FC<HookMultiSelectProps> = ({
  control,
  name,
  isDisableShowSelectedTag,
  ...rest
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <MultiSelect
            // eslint-disable-next-line
            {...rest}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};
