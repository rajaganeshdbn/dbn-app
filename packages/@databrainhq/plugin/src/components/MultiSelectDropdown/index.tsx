/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect, useMemo } from 'react';

import styles from './multiSelectDropdown.module.css';
import {
  Button,
  Text,
  SearchTab,
  Icons,
  Checkbox,
  Portal,
  PopoverMenu,
} from '@/components';

import { FloatingDropDownOption } from '@/types';

export type MultiSelectAccordianDropdownProps = {
  onChange: (options: FloatingDropDownOption) => void;
  selectedOption: FloatingDropDownOption;
  options: FloatingDropDownOption[];
  button?: JSX.Element;
  label?: string;
  labelVariant?: 'floating' | 'static';
  isDisabled?: boolean;
  isSearchEnabled?: boolean;
  icon?: JSX.Element;
  buttonWidth?: string;
  menuWidth?: string;
  searchIcon?: JSX.Element;
  closeControl?: {
    close: boolean;
  };
  searchPlaceholder?: string;
  radius?: string;
};

export type MultiSelectDropdownProps = Omit<
  MultiSelectAccordianDropdownProps,
  'selectedOption' | 'onChange'
> & {
  onChange: (options: FloatingDropDownOption[]) => void;
  selectedOption: FloatingDropDownOption[];
  options: FloatingDropDownOption[];
  isShowSelectedOptions?: boolean;
  radius?: string;
  isFilter?: boolean;
};

export const MultiSelectAccordianDropdown = ({
  label,
  labelVariant = 'static',
  selectedOption,
  onChange,
  button,
  options,
  isDisabled,
  icon,
  buttonWidth = '200px',
  menuWidth = '303px',
  isSearchEnabled,
  searchIcon,
  closeControl,
  searchPlaceholder,
  radius,
}: MultiSelectAccordianDropdownProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [limit, setLimit] = useState(20);

  const selectedValue = selectedOption.label || selectedOption.value;
  const selectedBadge = selectedOption.badge;
  const selectedIcon = selectedOption.icon;

  useEffect(() => {
    if (!closeControl?.close) return;
    setIsShow(false);
  }, [closeControl?.close]);
  const [isShowColumns, setShowColumns] = useState<Record<string, boolean>>({});
  const filteredOptions = useMemo(() => {
    if (!searchKeyword) return options.slice(0, limit);
    return options
      .filter((opt) => opt.label.toLowerCase().includes(searchKeyword))
      .slice(0, limit);
  }, [searchKeyword, options, limit]);

  return (
    <div className={styles.container} ref={wrapperRef}>
      <PopoverMenu
        position="bottom-start"
        menuWidth={menuWidth}
        offset={[0, 6]}
        tabMenu
        isDisabled={isDisabled}
        buttonContent={
          <>
            {label && labelVariant === 'static' ? (
              <Text variant="btn" color="primary">
                {label}
              </Text>
            ) : null}
            <div
              className={styles.wrapper}
              style={{ width: buttonWidth, borderRadius: radius || '4px' }}
              onClick={() => setIsShow(!isShow)}
            >
              <div className={styles.valueWrapper}>
                {label && labelVariant === 'floating' ? (
                  <div className={styles.floatingLabel}>
                    {label}
                    {selectedBadge ? (
                      <span className={styles.badge}>{selectedBadge}</span>
                    ) : null}
                  </div>
                ) : null}
                <div className={styles.value}>
                  {labelVariant === 'static'
                    ? (
                        <div className={styles.staticValueWrapper}>
                          <Icons name="table" />
                          <Text variant="body-text" color="primary">
                            {selectedValue}
                          </Text>
                        </div>
                      ) || 'Select an option'
                    : null}
                  {labelVariant === 'floating'
                    ? selectedValue || 'Select an option'
                    : null}
                </div>
              </div>
              <div>
                <Icons name="caret-down-fill" size="xs" />
              </div>
            </div>
          </>
        }
      >
        <div>
          <div className={styles.dropdown}>
            <div className={styles.options}>
              {isSearchEnabled && (
                <div className={styles.searchDiv}>
                  {searchIcon || null}
                  <SearchTab
                    className={styles.search}
                    setSearchKeyword={setSearchKeyword}
                    placeholder={searchPlaceholder}
                  />
                </div>
              )}
              {!filteredOptions.length && (
                <div className={styles.noOptions}>Not Available</div>
              )}
              {filteredOptions.map((option) => {
                const isSelected = option.value === selectedOption.value;
                const optionKey = option.key || option.value;
                return (
                  <div
                    className={
                      isSelected ? styles.checkedOption : styles.option
                    }
                    onClick={() => {
                      onChange(option);
                    }}
                    key={optionKey}
                  >
                    <div
                      className={styles.optionDiv}
                      onClick={() => {
                        onChange(option);
                      }}
                    >
                      <div className={styles.optionWrapper1}>
                        <div
                          className={styles.labelWithIcon}
                          onClick={() =>
                            setShowColumns((prevState) => ({
                              ...prevState,
                              [optionKey]: !prevState[optionKey],
                            }))
                          }
                        >
                          <div
                            className={
                              isShowColumns[optionKey] ? '' : styles.rotate
                            }
                          >
                            <Icons name="chevron-down" size="lg" />
                          </div>
                          <div className={styles.tableDiv}>
                            <Icons name="table" size="lg" />
                            <span className={styles.label}>{option.label}</span>
                          </div>
                        </div>
                        {option.columnList && isShowColumns[optionKey]
                          ? option.columnList.map((item: any) => (
                              <span className={styles.subValue}>
                                <Checkbox />
                                {item.name}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                );
              })}
              {limit <= options.length && (
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => setLimit((prev) => prev + 20)}
                  rightIcon={<Icons name="chevron-down" />}
                >
                  Load More
                </Button>
              )}
            </div>
            {button || null}
          </div>
        </div>
      </PopoverMenu>
    </div>
  );
};

export const MultiSelectDropdown = ({
  label,
  labelVariant = 'static',
  selectedOption,
  onChange,
  button,
  options,
  isDisabled,
  icon,
  buttonWidth = '220px',
  menuWidth,
  isSearchEnabled,
  searchIcon,
  closeControl,
  searchPlaceholder,
  isShowSelectedOptions = false,
  radius,
  isFilter,
}: MultiSelectDropdownProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [limit, setLimit] = useState(20);
  const selectedOptionsRef = useRef(null);
  const [offset, setOffset] = useState<[number, number]>([0, 6]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isExceeded, setExceeded] = useState(false);
  const [count, setCount] = useState(0);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [badgeWidths, setBadgeWidths] = useState<number[]>([]);

  const calculateBadgeCount = () => {
    const containerWidth = isShow
      ? 400
      : (containerRef.current?.offsetWidth || 0) -
        (moreRef.current?.offsetWidth || 0) -
        30;
    let badgesWidth = 0;
    let tempCount = selectedOption.length;
    let hasExceeded = false;

    for (let index = 0; index < tempCount; index += 1) {
      badgesWidth += badgeWidths[index] + 5;
      if (badgesWidth > containerWidth) {
        tempCount = index;
        hasExceeded = true;
        break;
      }
    }

    if (badgesWidth + (moreRef.current?.offsetWidth || 0) > containerWidth) {
      if (tempCount > 1) {
        tempCount = Math.max(0, tempCount - 1);
      }
      hasExceeded = true;
    }
    setExceeded(hasExceeded);
    setCount(tempCount);
  };

  useEffect(() => {
    calculateBadgeCount();
  }, [selectedOption, options, isShow]);

  useEffect(() => {
    if (!closeControl?.close) return;
    setIsShow(false);
  }, [closeControl?.close]);
  const filteredOptions = useMemo(() => {
    if (!searchKeyword) return options.slice(0, limit);
    return options
      .filter((opt) => opt.label.toLowerCase().includes(searchKeyword))
      .slice(0, limit);
  }, [searchKeyword, options, limit]);

  useEffect(() => {
    const selectedOptionsElement = selectedOptionsRef.current;
    if (!selectedOptionsElement) return;
    const selectedOptionsElementHeight = (
      selectedOptionsElement as any
    ).getBoundingClientRect().height;
    setOffset([0, -selectedOptionsElementHeight - 6]);
  }, [selectedOption]);

  return (
    <PopoverMenu
      position="bottom-start"
      menuWidth={menuWidth || 'auto'}
      buttonWidth={isShow ? 'auto' : buttonWidth}
      isDisabled={isDisabled}
      offset={offset}
      tabMenu
      getIsOpen={(isOpen) => {
        setIsShow(isOpen);
      }}
      buttonContent={
        <>
          {label && labelVariant === 'static' ? (
            <>
              {isFilter ? (
                <span className="dbn-text-sm dbn-leading-5 dbn-font-medium dbn-inline-block dbn-font-lato dbn-selectBox">
                  {label}
                </span>
              ) : (
                <Text variant="btn" color="primary">
                  {label}
                </Text>
              )}
            </>
          ) : null}
          <div
            className={`${styles.wrapper} ${isFilter ? 'dbn-selectBox' : ''}`}
            style={{
              opacity: isDisabled ? 0.6 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              borderRadius: radius || '4px',
              minWidth: buttonWidth,
              maxWidth: '500px',
            }}
            ref={containerRef}
          >
            <div className={styles.valueWrapper}>
              {label && labelVariant === 'floating' ? (
                <div
                  className={`${styles.floatingLabel} ${
                    isFilter ? 'dbn-selectBox' : ''
                  }`}
                >
                  {label}
                </div>
              ) : null}
              <div className={styles.value}>
                {labelVariant === 'static' ? (
                  <div className={styles.staticValueWrapper}>
                    {icon}
                    <div>
                      {selectedOption?.length > 0 ? (
                        selectedOption.map((opt, index) => (
                          <span
                            key={`badge-${index}`}
                            className={`${styles.badge} dbn-truncate`}
                            title={opt?.label}
                            ref={(el) => {
                              badgeRefs.current[index] = el;
                            }}
                          >
                            {opt?.label}
                          </span>
                        ))
                      ) : (
                        <span>Select Options</span>
                      )}
                    </div>
                    {isExceeded && (
                      <span
                        className={`${styles.badge} dbn-truncate`}
                        ref={moreRef}
                      >
                        +{selectedOption.length - count} more
                      </span>
                    )}
                  </div>
                ) : (
                  <span
                    className={`dbn-text-sm dbn-leading-5 dbn-font-normal dbn-font-lato ${
                      isFilter ? 'dbn-selectBox' : ''
                    }`}
                  >
                    {labelVariant === 'floating' ? (
                      <div className="dbn-flex">
                        {selectedOption?.length > 0 ? (
                          selectedOption.slice(0, count).map((opt, index) => {
                            const badgeElement = badgeRefs.current[index];
                            if (badgeElement && !badgeWidths[index]) {
                              setBadgeWidths((prevWidths) => [
                                ...prevWidths,
                                badgeElement.offsetWidth,
                              ]);
                            }

                            return (
                              <span
                                key={`badge-${index}`}
                                className={`${styles.badge} dbn-truncate`}
                                title={opt?.label}
                                ref={(el) => {
                                  badgeRefs.current[index] = el;
                                }}
                              >
                                {options?.find(
                                  (option) => option.value === opt?.value
                                )?.label || opt?.label}
                              </span>
                            );
                          })
                        ) : (
                          <span>Select Options</span>
                        )}
                        {isExceeded && (
                          <span
                            className={`${styles.badge} dbn-truncate`}
                            ref={moreRef}
                            title={selectedOption
                              .slice(count)
                              .map((opt) => opt?.label)
                              .join('\n')}
                          >
                            +{selectedOption.length - count} more
                          </span>
                        )}
                      </div>
                    ) : null}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Icons name="caret-down-fill" size="xs" />
            </div>
          </div>
          {isShowSelectedOptions && (
            <div
              className="dbn-flex dbn-gap-1 dbn-flex-wrap dbn-mt-4"
              ref={selectedOptionsRef}
            >
              {selectedOption.length > 0 &&
                selectedOption.map((option) => {
                  return (
                    <>
                      <div className={styles.selectedOption}>
                        {option.label}
                      </div>
                    </>
                  );
                })}
            </div>
          )}
        </>
      }
    >
      <div className={styles.dropdown}>
        <div className={styles.options}>
          {isSearchEnabled && (
            <div className={styles.searchDiv}>
              {searchIcon || null}
              <SearchTab
                setSearchKeyword={setSearchKeyword}
                placeholder={searchPlaceholder}
              />
            </div>
          )}
          {!filteredOptions.length && (
            <div className={styles.noOptions}>Not Available</div>
          )}
          <div className={styles.optionsWrapper}>
            {filteredOptions.map((option) => {
              const isSelected = !!selectedOption?.find(
                (opt) => opt.value === option.value
              );
              return (
                <div
                  className={isSelected ? styles.checkedOption : styles.option}
                  key={option.key || option.value}
                  onClick={() => {
                    const optionIndex = selectedOption?.findIndex(
                      (opt) => opt.value === option.value
                    );
                    if (optionIndex !== -1) {
                      const updatedOptions = selectedOption?.filter(
                        (opt, index) => index !== optionIndex
                      );
                      onChange(updatedOptions);
                    } else {
                      onChange([...selectedOption, option]);
                    }
                  }}
                >
                  <div className={styles.optionDiv}>
                    <div className={styles.optionWrapper1}>
                      <div className={styles.labelWithIcon}>
                        <Checkbox
                          onClick={() => {
                            const optionIndex = selectedOption?.findIndex(
                              (opt) => opt.value === option.value
                            );
                            if (optionIndex !== -1) {
                              const updatedOptions = selectedOption.filter(
                                (opt, index) => index !== optionIndex
                              );
                              onChange(updatedOptions);
                            } else {
                              onChange([...selectedOption, option]);
                            }
                          }}
                          checked={
                            selectedOption?.findIndex(
                              (opt) => opt.value === option.value
                            ) !== -1
                          }
                        />
                        <span className={`${styles.optionLabel}`}>
                          {option.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {limit <= options.length && (
              <Button
                variant="tab"
                type="button"
                onClick={() => setLimit((prev) => prev + 20)}
                rightIcon={<Icons name="chevron-down" />}
                fitContainer
                data-closepopover="remainOpen"
              >
                Load More
              </Button>
            )}
          </div>
          {selectedOption?.length > 0 && (
            <Button
              variant="tab"
              type="button"
              onClick={() => onChange([])}
              fitContainer
              data-closepopover="remainOpen"
            >
              Clear All
            </Button>
          )}
        </div>
        {button || null}
      </div>
    </PopoverMenu>
  );
};
