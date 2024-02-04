/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-elements */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import styles from './autoComplete.module.css';
import {
  Button,
  DataType,
  Icons,
  InputField,
  PopoverMenu,
  Text,
} from '@/components';
import {
  FloatingDropDownOption,
  OnChangeAliasParams,
  OnChangeHelperFunctionParams,
  SelectedColumn,
} from '@/types';
import {
  NULL_FILTER_SYNONYMNS,
  NUMBER_SYNONYMNS,
  SORT_SYNONYMNS,
  questionKeywords,
} from '@/consts';
import useDebounce from '@/hooks/useDebounce';
import { useOutsideAlerter } from '@/hooks';

export type AutoCompleteDropdownProps = {
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedColumn[]>>;
  selectedOption: SelectedColumn[];
  options: SelectedColumn[];
  label?: string;
  isDisabled?: boolean;
  placeholder?: string;
  functionOptions?: (
    col?: SelectedColumn | undefined,
    colDatatype?: string | undefined
  ) => FloatingDropDownOption[];
  onChangeHelperFunction?: ({
    column,
    helperFunction,
    functionConfiguration,
    type,
  }: OnChangeHelperFunctionParams) => void;
  onChangeAlias: ({ alias, column }: OnChangeAliasParams) => void;
  isRef?: boolean;
  setRef?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AutoCompleteDropdown = ({
  label,
  selectedOption,
  setSelectedOptions,
  options,
  isDisabled,
  placeholder,
  functionOptions,
  onChangeHelperFunction,
  onChangeAlias,
  isRef,
  setRef,
}: AutoCompleteDropdownProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hoveredBadge, setHoveredBadge] = useState<string>('');
  const [isFocus, setFocus] = useState<boolean>(false);
  const [aliasColumnValue, setAliasColumnValue] = useState<string>();
  const debounceValue = useDebounce(searchKeyword, 200);
  const [optionLimit, setOptionLimit] = useState(10);
  const [currentOption, setCurrentOption] = useState<
    | {
        column: SelectedColumn;
        index: number;
      }
    | undefined
  >();
  const [aggregateList, setAggregateList] = useState<FloatingDropDownOption[]>(
    []
  );
  const [dateFormatValue, setDateFormatValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter({
    wrapRef: dropdownContentRef,
    onOutsideClick: () => setFocus(false),
  });
  const isKeywordIncluded = useCallback(
    (field: keyof SelectedColumn, opt: SelectedColumn, keyword: string) => {
      const option = opt?.[field];
      if (typeof option === 'string') {
        return (
          option?.toLowerCase().includes(keyword) ||
          option?.toLowerCase() === keyword
        );
      }
      if (Array.isArray(option)) {
        return option.map((o) => o.toLowerCase()).includes(keyword);
      }
      return false;
    },
    []
  );
  const filterByKeyword = useCallback(
    (opt: SelectedColumn, keyword: string) => {
      return (
        isKeywordIncluded('name', opt, keyword) ||
        isKeywordIncluded('alias', opt, keyword) ||
        isKeywordIncluded('synonyms', opt, keyword) ||
        isKeywordIncluded('helperFunction', opt, keyword)
      );
    },
    []
  );
  const isFilterOptions = useCallback(
    (opt: SelectedColumn, keyword: string) => {
      return (
        !!(
          isKeywordIncluded('name', opt, keyword) ||
          isKeywordIncluded('alias', opt, keyword)
        ) && opt.configType === 'FILTER'
      );
    },
    []
  );
  const parseNumberName = useCallback((keywords: string[]) => {
    let number = 0;

    for (const keyword of keywords) {
      if (Number(keyword)) {
        number = Number(keyword);
        break;
      }
      const synonym = NUMBER_SYNONYMNS?.[keyword.toLowerCase()];

      if (synonym !== undefined) {
        break;
      }

      number += synonym;
    }

    return number;
  }, []);
  const filteredOptions = useMemo(() => {
    if (!debounceValue)
      return options?.filter(
        (o) => o.type !== 'HELPER_FUNCTION' && o.configType !== 'FILTER'
      );
    const keywordList = debounceValue?.toLowerCase()?.trim()?.split(' ');
    const keywords = keywordList?.filter(
      (o) => !questionKeywords.includes(o) && o
    );
    const isQuestion = keywordList?.some(
      (o) => questionKeywords.includes(o) && o
    );

    if (!keywords.length)
      return options?.filter(
        (o) => o.type !== 'HELPER_FUNCTION' && o.configType !== 'FILTER'
      );

    const isASC = keywords.some((key) => SORT_SYNONYMNS?.ASC.includes(key));
    const isDESC = keywords.some((key) => SORT_SYNONYMNS?.DESC.includes(key));
    const filteredKeywords = keywords.filter(
      (key) =>
        !Number(key) &&
        !NUMBER_SYNONYMNS?.[key] &&
        !SORT_SYNONYMNS?.ASC.includes(key) &&
        !SORT_SYNONYMNS?.DESC.includes(key)
    );

    const filterOptionList = options?.filter((opt) =>
      filteredKeywords.every((keyword) =>
        isQuestion
          ? isFilterOptions(opt, keyword)
          : filterByKeyword(opt, keyword)
      )
    );

    const limit = parseNumberName(keywords);
    const sortEnabledList: SelectedColumn[] = filterOptionList.map((o) => ({
      ...o,
      sortType: isASC || isDESC ? (isASC ? 'ASC' : 'DESC') : undefined,
      limit,
    }));

    return sortEnabledList;
  }, [options, debounceValue]);

  const handleInputClick = useCallback(() => {
    setFocus(true);
  }, []);
  const handleButtonClick = useCallback(
    (val: SelectedColumn) => {
      if (!val) return;
      if (
        val?.filterValue?.stringArray &&
        val.configType === 'FILTER' &&
        selectedOption.find(
          (col) =>
            col.name === val.name &&
            col.configType === 'FILTER' &&
            col?.filterValue?.stringArray
        )
      ) {
        setSelectedOptions((prev) =>
          prev.map((col) =>
            col.name === val.name &&
            col.configType === 'FILTER' &&
            col?.filterValue?.stringArray
              ? {
                  ...val,
                  alias: `${[
                    ...new Set([
                      ...(val?.filterValue?.stringArray || []),
                      ...(col?.filterValue?.stringArray || []),
                    ]),
                  ].join(',')} ${col.name}`,
                  filterValue: {
                    stringArray: [
                      ...new Set([
                        ...(val?.filterValue?.stringArray || []),
                        ...(col?.filterValue?.stringArray || []),
                      ]),
                    ],
                  },
                }
              : col
          )
        );
      } else {
        setSelectedOptions((prev) => [
          ...prev,
          {
            ...val,
            alias:
              val.configType === 'FILTER' &&
              val.filterType !== 'time' &&
              !NULL_FILTER_SYNONYMNS.find(
                (f) => f.value === val.filterMethod
              ) &&
              !val.filterValue?.stringArray
                ? searchKeyword
                : val.alias,
            keyword: searchKeyword,
          },
        ]);
      }
      setSearchKeyword('');
      setCurrentOption(undefined);
      setOptionLimit(10);
      setTimeout(() => setFocus(false), 240);
    },
    [selectedOption, searchKeyword]
  );
  const getTabColor = (item: any) => {
    return {
      backgroundColor:
        item.configType === 'AGGREGATE'
          ? '#0D0D0D'
          : item.configType === 'FILTER'
          ? '#222c3a'
          : '#D0D4DA',
      color: item.configType === 'AGGREGATE' ? 'white' : '',
    };
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !searchKeyword) {
      setSelectedOptions((prev) => prev.slice(0, -1));
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const list = filteredOptions?.slice(0, optionLimit);
      if (list.length > 0) {
        const currentIndex = currentOption ? currentOption.index : -1;

        const nextIndex =
          event.key === 'ArrowDown'
            ? (currentIndex + 1) % list.length
            : (currentIndex - 1 + list.length) % list.length;

        setCurrentOption({
          column: list[nextIndex],
          index: nextIndex,
        });
      } else {
        setCurrentOption(undefined);
      }
    }

    if (event.key === 'Enter') {
      if (currentOption?.column) {
        event?.preventDefault();
        handleButtonClick(currentOption.column);
      }
    }
  };

  return (
    <>
      {label ? (
        <Text variant="btn" color="primary">
          {label}
        </Text>
      ) : null}
      <div
        className={`${
          isDisabled ? 'dbn-cursor-not-allowed' : ''
        } dbn-w-full dbn-flex dbn-gap-0 dbn-border dbn-border-secondary dbn-border-l-0`}
      >
        <div
          className="dbn-w-full dbn-flex dbn-gap-2 dbn-px-3 dbn-py-2"
          style={{
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          <div className="dbn-flex dbn-gap-2 dbn-flex-grow-0 dbn-items-center">
            {selectedOption?.map((item) => (
              <span
                key={`${item.alias}_${item.configType}`}
                onMouseOver={() => setHoveredBadge(item.alias)}
                onMouseOut={() => setHoveredBadge('')}
                style={getTabColor(item)}
                className="dbn-w-auto dbn-px-2 dbn-pl-2.5 dbn-flex dbn-gap-1 dbn-items-center dbn-justify-center dbn-font-semibold dbn-rounded-[250px] dbn-text-xs"
              >
                {item.configType !== 'FILTER' && (
                  <PopoverMenu
                    buttonContent={
                      <Button
                        variant="popover"
                        onClick={() =>
                          setAggregateList(functionOptions?.(item) || [])
                        }
                        leftIcon={
                          <Icons
                            name="caret-down-fill"
                            size="xs"
                            color={
                              item.configType === 'AGGREGATE'
                                ? 'white'
                                : 'primary'
                            }
                          />
                        }
                      />
                    }
                    position="bottom-start"
                    offset={[0, 10]}
                  >
                    <div className="dbn-p-2">
                      {aggregateList?.map((func) =>
                        func.value === 'date format' ? (
                          <PopoverMenu
                            tabMenu
                            buttonContent={
                              <Button
                                data-closepopover="remainOpen"
                                key={func.value}
                                variant="popover"
                                className="dbn-justify-between dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1"
                                rightIcon={
                                  <div className="-dbn-rotate-90">
                                    <Icons name="chevron-down" />
                                  </div>
                                }
                              >
                                <span>{func.label}</span>
                              </Button>
                            }
                            position="right-end"
                            menuWidth="dbn-w-[300px]"
                          >
                            <div className="dbn-flex dbn-flex-col dbn-w-full dbn-items-center dbn-justify-center dbn-p-3 dbn-gap-3">
                              <InputField
                                label="Date Format"
                                defaultValue={
                                  item.functionConfiguration?.dateFormat
                                }
                                onChange={(e) =>
                                  setDateFormatValue(e.target.value)
                                }
                                value={dateFormatValue}
                                placeholder="%Y-%m-%d, yyyy-mm-dd"
                              />
                              <div className="dbn-flex  dbn-w-full dbn-items-center dbn-justify-between   dbn-gap-2">
                                <Button variant="secondary" data-closepopover>
                                  Cancel
                                </Button>
                                <Button
                                  variant="primary"
                                  data-closepopover
                                  onClick={() => {
                                    onChangeHelperFunction?.({
                                      column: item,
                                      helperFunction: func,
                                      functionConfiguration: {
                                        dateFormat: dateFormatValue,
                                      },
                                    });
                                  }}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </PopoverMenu>
                        ) : (
                          <Button
                            key={func.value}
                            variant="popover"
                            className="dbn-justify-start dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1"
                            onClick={() =>
                              onChangeHelperFunction?.({
                                column: item,
                                helperFunction: func,
                              })
                            }
                          >
                            <span>{func.label}</span>
                          </Button>
                        )
                      )}
                    </div>
                  </PopoverMenu>
                )}
                {item.configType === 'FILTER' ? (
                  <Button
                    variant="popover"
                    className="dbn-text-white dbn-bg-tertiary dbn-border-b-transparent hover:dbn-border-black dbn-text-sm dbn-font-lato"
                  >
                    {item.alias}
                  </Button>
                ) : (
                  <PopoverMenu
                    buttonContent={
                      <Button
                        variant="popover"
                        className={`${
                          item.configType === 'AGGREGATE'
                            ? 'dbn-text-white'
                            : ''
                        } hover:dbn-border-b dbn-border-b-transparent hover:dbn-border-black dbn-text-sm dbn-font-lato`}
                        onClick={() => {
                          setAliasColumnValue(item.alias);
                        }}
                      >
                        {item.alias}
                      </Button>
                    }
                    position="bottom-start"
                    menuWidth="dbn-w-[300px]"
                  >
                    <div className="dbn-flex dbn-flex-col dbn-w-full dbn-items-center dbn-justify-center dbn-p-3 dbn-gap-3">
                      <InputField
                        label={item?.name}
                        onChange={(e) => setAliasColumnValue(e.target.value)}
                        value={aliasColumnValue}
                      />
                      <div className="dbn-flex  dbn-w-full dbn-items-center dbn-justify-between dbn-gap-3">
                        <Button variant="secondary" data-closepopover>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          data-closepopover
                          onClick={() => {
                            onChangeAlias({
                              alias: aliasColumnValue || item.alias,
                              column: item,
                            });
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </PopoverMenu>
                )}
                {hoveredBadge === item.alias ? (
                  <Button
                    variant="popover"
                    leftIcon={
                      <Icons
                        name="cross"
                        color={
                          item.configType === 'AGGREGATE' ||
                          item.configType === 'FILTER'
                            ? 'white'
                            : 'primary'
                        }
                      />
                    }
                    className="dbn-w-3 dbn-h-3"
                    onClick={() => {
                      setSelectedOptions((prev) =>
                        prev.filter((val) => val.alias !== item.alias)
                      );
                    }}
                  />
                ) : null}
              </span>
            ))}
          </div>
          <div
            className="dbn-flex dbn-flex-grow dbn-relative"
            onClick={(e) => e.preventDefault()}
          >
            <input
              value={searchKeyword}
              name="search"
              onChange={(e) => {
                e.preventDefault();
                setFocus(true);
                setSearchKeyword(e.target.value);
              }}
              className={`${isDisabled ? 'dbn-cursor-not-allowed' : ''} ${
                styles.autoCompleteInput
              } `}
              placeholder={placeholder}
              disabled={isDisabled}
              onKeyDown={handleKeyDown}
              onClick={(e) => {
                e.preventDefault();
                handleInputClick();
              }}
              autoComplete="off"
              id="autoCompleteInput"
              ref={inputRef}
              // onFocus={() => setFocus(true)}
              // onBlur={() =>
              //   setTimeout(() => {
              //     setFocus(false);
              //   }, 240)
              // }
            />
            {isFocus && filteredOptions?.length ? (
              <div className={styles.dropdownMenu} ref={dropdownContentRef}>
                {filteredOptions?.slice(0, optionLimit)?.map((val) => (
                  <span
                    onClick={() => {
                      handleButtonClick(val);
                    }}
                    id="autoCompleteItem"
                    className={`${styles.autoCompleteItem} ${
                      currentOption?.column?.alias === val.alias
                        ? 'dbn-bg-gray'
                        : ''
                    }`}
                    key={`${val.alias}_${val.name}`}
                  >
                    <span className="dbn-w-[10%]">
                      {val.configType === 'AGGREGATE' ? (
                        <DataType datatype="number" />
                      ) : val.configType === 'FILTER' ? (
                        <Icons name="funnel" />
                      ) : (
                        <DataType datatype={val.datatype} />
                      )}
                    </span>
                    {val.alias}
                  </span>
                ))}
                {optionLimit <= filteredOptions.length && (
                  <div
                    className="dbn-w-full dbn-justify-center dbn-p-2"
                    ref={loadMoreRef}
                  >
                    <Button
                      variant="tab"
                      type="button"
                      onClick={() => {
                        setFocus(true);
                        setOptionLimit((prev) => prev + 20);
                      }}
                      rightIcon={<Icons name="chevron-down" />}
                      fitContainer
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
