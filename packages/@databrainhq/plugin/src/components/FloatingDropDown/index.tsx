/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useMemo } from 'react';
import styles from './dropdown.module.css';
import { Button, Text, SearchTab, Icons, PopoverMenu } from '@/components';
import { FloatingDropDownOption, IconType } from '@/types';

export type FloatingDropDownProps = {
  onChange: (option: FloatingDropDownOption) => void;
  selectedOption: FloatingDropDownOption;
  options: FloatingDropDownOption[];
  button?: JSX.Element | React.ReactNode;
  label?: string;
  labelVariant?: 'floating' | 'static';
  isDisabled?: boolean;
  isSearchEnabled?: boolean;
  icon?: JSX.Element;
  buttonWidth?: string;
  menuWidth?: string;
  searchPlaceholder?: string;
  placeholder?: string;
  customButton?: JSX.Element;
  children?: React.ReactNode;
  disableAutoClose?: boolean;
  radius?: string;
  isFilter?: boolean;
  isClearEnabled?: boolean;
};

export const FloatingDropDown = ({
  label,
  labelVariant = 'static',
  selectedOption,
  onChange,
  button,
  options = [],
  isDisabled,
  customButton,
  icon,
  buttonWidth = '200px',
  menuWidth = '200px',
  isSearchEnabled,
  searchPlaceholder,
  placeholder,
  children,
  radius,
  isFilter,
  disableAutoClose = false,
  isClearEnabled,
}: FloatingDropDownProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [limit, setLimit] = useState(20);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const selectedLabel =
    options?.find((option) => option.value === selectedOption?.value)?.label ||
    selectedOption.label ||
    selectedOption.value;
  const selectedBadge = selectedOption.badge;
  const selectedIcon = selectedOption.icon;

  const optionStyle = {
    width: icon || options?.[0]?.badge ? '70%' : '100%',
  };

  const filteredOptions = useMemo(() => {
    if (!searchKeyword) return options?.slice(0, limit) || [];
    return (
      options
        .filter((opt) =>
          opt.label.toString().toLowerCase().includes(searchKeyword)
        )
        .slice(0, limit) || []
    );
  }, [searchKeyword, options, limit]);

  const hasCrossButton = useMemo(() => {
    return isClearEnabled && selectedOption?.value;
  }, [isClearEnabled, selectedOption?.value]);

  const valueWidth = useMemo(() => {
    if (hasCrossButton) {
      switch (buttonWidth) {
        case '130px':
          return 'dbn-w-[70%]';
        case '180px':
        case '250px':
        default:
          return 'dbn-w-[88%]';
      }
    }
    return '';
  }, [hasCrossButton, buttonWidth]);

  return (
    <PopoverMenu
      tabMenu={disableAutoClose}
      buttonWidth={buttonWidth}
      isDisabled={isDisabled}
      position="bottom-start"
      menuWidth={menuWidth}
      offset={[0, 6]}
      isClearEnabled={isClearEnabled}
      isMenuOpen={isClearEnabled ? isMenuOpen : undefined}
      setMenuOpen={setMenuOpen}
      buttonContent={
        <>
          {label && labelVariant === 'static' ? (
            <>
              {isFilter ? (
                <span className="dbn-text-sm dbn-leading-6 dbn-font-medium dbn-inline-block dbn-font-lato dbn-selectBox">
                  {label}
                </span>
              ) : (
                <Text variant="label" color="primary">
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
            }}
          >
            <div
              className={`${styles.valueWrapper} ${valueWidth}`}
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
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
                {customButton ? (
                  customButton
                ) : (
                  <>
                    {labelVariant === 'static' && (
                      <div className={styles.staticValueWrapper}>
                        {selectedIcon ? (
                          <Icons name={selectedIcon as IconType} />
                        ) : null}
                        <div
                          className={`${styles.staticLabel} ${
                            isFilter ? 'dbn-selectBox' : ''
                          }`}
                        >
                          {selectedLabel || placeholder || 'Select an option'}
                        </div>
                        {selectedBadge ? (
                          <span className={styles.badge}>{selectedBadge}</span>
                        ) : null}
                      </div>
                    )}
                    {labelVariant === 'floating' ? (
                      <div className={styles.floatingValueWrapper}>
                        <span className={isFilter ? 'dbn-selectBox' : ''}>
                          {selectedLabel || placeholder || 'Select an option'}
                        </span>
                        {selectedBadge ? (
                          <span className={styles.badge}>{selectedBadge}</span>
                        ) : null}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
            <div className="dbn-flex dbn-gap-1">
              {hasCrossButton ? (
                <Button
                  variant="popover"
                  leftIcon={<Icons name="cross" size="xs" />}
                  onClick={() =>
                    onChange({
                      value: '',
                      label: '',
                    })
                  }
                />
              ) : null}
              <Button
                variant="popover"
                className={
                  hasCrossButton
                    ? 'dbn-border-l dbn-border-secondary dbn-pl-1'
                    : ''
                }
                leftIcon={<Icons name="caret-down-fill" size="xs" />}
                onClick={() => setMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </>
      }
    >
      <div className={styles.dropdown}>
        {isSearchEnabled && (
          <div className={styles.searchTab}>
            <SearchTab
              setSearchKeyword={setSearchKeyword}
              placeholder={searchPlaceholder}
            />
          </div>
        )}
        <div className={styles.options}>
          {!filteredOptions?.length ? (
            <div className={styles.noOptions}>Not Available</div>
          ) : (
            <>
              {filteredOptions?.map((option) => {
                const isCustomLabel =
                  option?.labelType?.toLowerCase() === 'custom'
                    ? 'remainOpen'
                    : '';
                const isSelected = option.value === selectedOption.value;
                return (
                  <div
                    className={
                      isSelected ? styles.checkedOption : styles.option
                    }
                    data-closepopover={isCustomLabel}
                    key={option.key || option.value}
                    onClick={() => onChange(option)}
                  >
                    <div className={styles.optionDiv}>
                      <div
                        className={styles.optionWrapper1}
                        style={optionStyle}
                      >
                        <div className={styles.labelWithIcon}>
                          {option.icon ? (
                            <Icons name={option.icon as IconType} />
                          ) : null}
                          <span className={styles.label}>{option.label}</span>
                        </div>
                        {option.subValue ? (
                          <span className={styles.subValue}>
                            {option.subValue}
                          </span>
                        ) : null}
                      </div>
                      {icon || option.badge ? (
                        <div className={styles.optionWrapper2}>
                          {icon || null}
                          {option.badge ? (
                            <span className={styles.badge}>{option.badge}</span>
                          ) : null}
                        </div>
                      ) : null}
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
            </>
          )}
        </div>
        {children || button ? (
          <div className={styles.footerBtn}>{children || button || null}</div>
        ) : null}
      </div>
    </PopoverMenu>
  );
};
