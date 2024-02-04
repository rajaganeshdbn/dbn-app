/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
import ReactAce from 'react-ace/lib/ace';
import React, { useState } from 'react';
import styles from './panels.module.css';
import { Button } from '@/components/Button';
import { FloatingDropDown } from '@/components/FloatingDropDown';
import { PopoverMenu } from '@/components/PopoverMenu';
import { Icons } from '@/components/Icons';
import { Tabs } from '@/components/Tabs';
import { Alert } from '@/components/Alert';
import { InputField } from '@/components/InputField';
import {
  FilterDropDown,
  MultiFilterDropdown,
} from '@/components/FilterDropDown';
import { TimeGrainField } from '@/components/TimeGrainField';
import { Panel } from '@/components/Panel';
import {
  CreateNewFilter,
  FloatingDropDownOption,
  GetFilterDropDownType,
} from '@/types';
import {
  DATE_TYPES,
  NUMBER_OPERATOR_LIST,
  NUMBER_TYPES,
  RELATION_OPERATOR_LIST,
  STRING_OPERATOR_LIST,
  STRING_TYPES,
  TIME_OPERATOR_LIST,
  operatorList,
} from '@/consts';
import AceEditorSql from '@/components/AceEditorSql/AceEditorSql';
import NoData from '@/components/Svg/No_data.svg';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: CreateNewFilter[];
  setCreatedFilters: React.Dispatch<React.SetStateAction<CreateNewFilter[]>>;
  columnOptions: FloatingDropDownOption[];
  getFilterDropDownType: GetFilterDropDownType;
  workspaceId: string;
  editorRef: React.RefObject<ReactAce>;
  onApplyFilter: (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => void;
  savedFilterListOptions: FloatingDropDownOption[];
  currentSelectedTable: FloatingDropDownOption;
  // onSaveCustomFilter: (filter: CreateNewFilter) => void;
};
const FiltersPanel = ({
  filtersPanelProps: {
    isOpen,
    onClose,
    filters,
    setCreatedFilters,
    columnOptions,
    getFilterDropDownType,
    editorRef,
    workspaceId,
    onApplyFilter,
    savedFilterListOptions,
    currentSelectedTable,
    // onSaveCustomFilter,
  },
}: {
  filtersPanelProps: Props;
}) => {
  const [isShowAlertInfo, setShowAlertInfo] = useState<boolean>(true);
  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      side="right"
      hideFooter
      headerTitle="Filters"
    >
      {filters.length ? (
        <div className="dbn-w-full dbn-h-full dbn-p-5 dbn-flex dbn-flex-col dbn-justify-between">
          <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-5">
            <div className="dbn-w-full dbn-flex dbn-justify-end dbn-items-center">
              <Button
                variant="popover"
                onClick={() => {
                  setCreatedFilters([]);
                  onApplyFilter(() => setCreatedFilters([]), true);
                }}
              >
                Clear all
              </Button>
            </div>
            {filters.map((filter, index) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [parentAlias, columnName, datatype, schemaName, tableName] =
                filter.columnName.value?.split('____');
              const filterFieldType = getFilterDropDownType({
                datatype,
                operator: filter.operator.value,
              });
              if (filter?.tableName?.value !== currentSelectedTable.value) {
                return <></>;
              }
              return (
                <div className="dbn-w-full dbn-h-full dbn-flex dbn-gap-3 dbn-flex-wrap dbn-items-center">
                  {index > 0 && (
                    <FloatingDropDown
                      options={RELATION_OPERATOR_LIST}
                      selectedOption={
                        filter.relationOperator || RELATION_OPERATOR_LIST[0]
                      }
                      labelVariant="floating"
                      onChange={(value) => {
                        setCreatedFilters((prev) =>
                          prev.map((f, i) =>
                            index === i ? { ...f, relationOperator: value } : f
                          )
                        );
                      }}
                      buttonWidth="100px"
                      menuWidth="100%"
                    />
                  )}
                  {/* {filter.type === 'custom' ? (
                    <>
                      <PopoverMenu
                        buttonContent={
                          <Button
                            variant="secondary"
                            rightIcon={<Icons name="chevron-down" />}
                          >
                            {filter.name || 'Advanced Filter'}
                          </Button>
                        }
                        tabMenu
                        menuWidth="400px"
                        position="bottom-start"
                      >
                        <div className="dbn-flex dbn-flex-col dbn-gap-3 dbn-p-3">
                          <Tabs.Context
                            variant="popoverTabs"
                            defaultActiveTab="create"
                          >
                            <Tabs.List background="#F4F4F7">
                              <Tabs.Tab tabId="saved" width="100%" grow>
                                Saved
                              </Tabs.Tab>
                              <Tabs.Tab tabId="create" width="100%" grow>
                                Create
                              </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel tabId="saved">
                              <FloatingDropDown
                                buttonWidth="280px"
                                menuWidth="280px"
                                options={savedFilterListOptions}
                                onChange={(value) => {
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  const [sql, indx, name] =
                                    value.value?.split('____');
                                  setCreatedFilters((prev) =>
                                    prev.map((f, i) =>
                                      index === i
                                        ? { ...f, sql, name, isSaved: true }
                                        : f
                                    )
                                  );
                                }}
                                selectedOption={
                                  savedFilterListOptions.find(
                                    (o) =>
                                      o.value.includes(filter.name) &&
                                      o.value.includes(filter.sql) &&
                                      filter.isSaved
                                  ) || {
                                    value: '',
                                    label: '',
                                  }
                                }
                                isDisabled={!savedFilterListOptions.length}
                              />
                            </Tabs.Panel>
                            <Tabs.Panel
                              tabId="create"
                              className="dbn-flex dbn-flex-col dbn-gap-[10px]"
                            >
                              {isShowAlertInfo ? (
                                <Alert
                                  text="Column Format: schemaName_tableName.columnName"
                                  variant="info"
                                  hideInfoIcon
                                >
                                  <Button
                                    variant="popover"
                                    onClick={() => setShowAlertInfo(false)}
                                  >
                                    <Icons
                                      name="cross"
                                      size="xs"
                                      color="infoAlert"
                                    />
                                  </Button>
                                </Alert>
                              ) : null}

                              <div className="dbn-w-full dbn-h-[150px] dbn-overflow-y-auto">
                                <AceEditorSql
                                  editorRef={editorRef}
                                  onChange={(value: string) => {
                                    setCreatedFilters((prev) =>
                                      prev.map((f, i) =>
                                        index === i ? { ...f, sql: value } : f
                                      )
                                    );
                                  }}
                                  value={filter.sql}
                                />
                              </div>
                              <InputField
                                type="text"
                                label="Filter Name"
                                placeholder="name"
                                onChange={({ target: { value } }) =>
                                  setCreatedFilters((prev) =>
                                    prev.map((f, i) =>
                                      index === i ? { ...f, name: value } : f
                                    )
                                  )
                                }
                                value={filter.name}
                              />
                            </Tabs.Panel>
                          </Tabs.Context>
                        </div>
                        <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-items-end dbn-justify-between dbn-p-3">
                          <Button variant="secondary" data-closepopover>
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => onSaveCustomFilter(filter)}
                            data-closepopover
                          >
                            Add
                          </Button>
                        </div>
                      </PopoverMenu>
                    </>
                  ) : ( */}
                  <>
                    <FloatingDropDown
                      options={columnOptions}
                      selectedOption={filter.columnName}
                      labelVariant="floating"
                      onChange={(value) => {
                        setCreatedFilters((prev) =>
                          prev.map((f, i) =>
                            index === i ? { ...f, columnName: value } : f
                          )
                        );
                      }}
                      isSearchEnabled
                      isDisabled={!columnOptions}
                      buttonWidth="250px"
                      menuWidth="250px"
                    />
                    {filter.type === 'default' && (
                      <>
                        {' '}
                        <FloatingDropDown
                          options={
                            DATE_TYPES.includes(datatype?.toLowerCase())
                              ? TIME_OPERATOR_LIST
                              : NUMBER_TYPES.includes(datatype?.toLowerCase())
                              ? NUMBER_OPERATOR_LIST
                              : STRING_TYPES.includes(
                                  datatype?.toLowerCase()
                                ) || datatype?.toLowerCase()?.includes('char')
                              ? STRING_OPERATOR_LIST
                              : operatorList
                          }
                          selectedOption={filter.operator || operatorList[0]}
                          labelVariant="floating"
                          onChange={(value) => {
                            setCreatedFilters((prev) =>
                              prev.map((f, i) =>
                                index === i ? { ...f, operator: value } : f
                              )
                            );
                          }}
                          isSearchEnabled
                          isDisabled={!datatype}
                          buttonWidth="250px"
                          menuWidth="250px"
                        />
                        {filterFieldType === 'MULTI_FILTER_DROPDOWN' && (
                          <MultiFilterDropdown
                            filter={{
                              tableName: `${schemaName}.${tableName}`,
                              columnName: `${columnName}`,
                            }}
                            workspaceId={workspaceId}
                            selectedOption={
                              filter.value.stringArray?.map((v: any) => ({
                                value: v,
                                label: v,
                              })) || []
                            }
                            onChange={(value) =>
                              setCreatedFilters((prev) =>
                                prev.map((f, i) =>
                                  index === i
                                    ? {
                                        ...f,
                                        value: {
                                          stringArray:
                                            value?.map((v) => v.value) || [],
                                        },
                                      }
                                    : f
                                )
                              )
                            }
                            isSearchEnabled
                            autoSelected={false}
                            isDisabled={!columnName}
                            isDisablelabel
                            buttonWidth="250px"
                            menuWidth="250px"
                          />
                        )}
                        {filterFieldType === 'FILTER_DROPDOWN' && (
                          <FilterDropDown
                            isDisableLabel
                            filter={{
                              tableName: `${schemaName}.${tableName}`,
                              columnName: `${columnName}`,
                            }}
                            workspaceId={workspaceId}
                            selectedOption={{
                              label: filter.value.stringValue || '',
                              value: filter.value.stringValue || '',
                            }}
                            onChange={(value) =>
                              setCreatedFilters((prev) =>
                                prev.map((f, i) =>
                                  index === i
                                    ? {
                                        ...f,
                                        value: { stringValue: value.value },
                                      }
                                    : f
                                )
                              )
                            }
                            isSearchEnabled
                            autoSelected={false}
                            isDisabled={!columnName}
                          />
                        )}
                        {filterFieldType === 'TIME_FILTER' && (
                          <TimeGrainField
                            isDisabled={!columnName || !datatype}
                            timeGrainValue={
                              filter.value.timeValue?.timeFilter || 'Last Year'
                            }
                            setTimeGrainValue={(value: string) =>
                              setCreatedFilters((prev) =>
                                prev.map((f, i) =>
                                  index === i
                                    ? {
                                        ...f,
                                        value: {
                                          timeValue: {
                                            endDate: '',
                                            startDate: '',
                                            timeFilter: value,
                                          },
                                        },
                                      }
                                    : f
                                )
                              )
                            }
                          />
                        )}
                        {filterFieldType === 'INPUT_NUMBER_FIELD' && (
                          <InputField
                            type="number"
                            onChange={({ target: { value } }) =>
                              setCreatedFilters((prev) =>
                                prev.map((f, i) =>
                                  index === i
                                    ? {
                                        ...f,
                                        value: { numberValue: Number(value) },
                                      }
                                    : f
                                )
                              )
                            }
                            value={filter?.value.numberValue || 0}
                          />
                        )}
                      </>
                    )}
                  </>
                  {/* )} */}
                  <Button
                    variant="popover"
                    onClick={() => {
                      onApplyFilter(
                        () =>
                          setCreatedFilters((prev) =>
                            prev.filter((f, i) => i !== index)
                          ),
                        false,
                        index
                      );
                    }}
                  >
                    <Icons name="delete" />
                  </Button>
                </div>
              );
            })}
            <div className="dbn-w-fit">
              <PopoverMenu
                buttonContent={
                  <Button variant="popover" leftIcon={<Icons name="plus" />}>
                    Add Filter
                  </Button>
                }
                position="bottom-start"
              >
                <div>
                  <Button
                    variant="popover"
                    onClick={() =>
                      setCreatedFilters((prev) => [
                        ...prev,
                        {
                          columnName: { value: '', label: '' },
                          operator: { label: '', value: '' },
                          value: { stringValue: '' },
                          sql: '',
                          name: '',
                          type: 'default',
                          tableName: currentSelectedTable,
                        },
                      ])
                    }
                    className={styles.popOption}
                  >
                    Simple Filter
                  </Button>
                  {/* <Button
                    variant="popover"
                    onClick={() =>
                      setCreatedFilters((prev) => [
                        ...prev,
                        {
                          columnName: { value: '', label: '' },
                          operator: { label: '', value: '' },
                          value: { stringValue: '' },
                          type: 'custom',
                          name: '',
                          sql: '',
                          tableName: currentSelectedTable,
                        },
                      ])
                    }
                    className={styles.popOption}
                  >
                    Complex Filter
                  </Button> */}
                </div>
              </PopoverMenu>
            </div>
          </div>
          <div className="dbn-w-full dbn-flex  dbn-h-[50px] dbn-items-end dbn-justify-end dbn-gap-5">
            <Button variant="secondary" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => onApplyFilter(onClose)}>
              Apply Filter
            </Button>
          </div>
        </div>
      ) : (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-items-center dbn-justify-center dbn-flex-col dbn-gap-4">
          <img
            src={NoData}
            alt="no data"
            style={{ width: '300px', height: '300px' }}
          />
          <div className="dbn-p-5">
            <PopoverMenu
              buttonContent={
                <Button variant="secondary" leftIcon={<Icons name="plus" />}>
                  Add Filter
                </Button>
              }
              position="bottom"
              menuWidth="120px"
              offset={[0, 10]}
            >
              <div className="dbn-p-2">
                <Button
                  variant="popover"
                  onClick={() =>
                    setCreatedFilters((prev) => [
                      ...prev,
                      {
                        columnName: { value: '', label: '' },
                        operator: { label: '', value: '' },
                        value: { stringValue: '' },
                        name: '',
                        sql: '',
                        type: 'default',
                        tableName: currentSelectedTable,
                      },
                    ])
                  }
                  className={styles.popOption}
                >
                  Simple Filter
                </Button>
                {/* <Button
                  variant="popover"
                  onClick={() =>
                    setCreatedFilters((prev) => [
                      ...prev,
                      {
                        columnName: { value: '', label: '' },
                        operator: { label: '', value: '' },
                        value: { stringValue: '' },
                        type: 'custom',
                        name: '',
                        sql: '',
                        tableName: currentSelectedTable,
                      },
                    ])
                  }
                  className={styles.popOption}
                >
                  Complex Filter
                </Button> */}
              </div>
            </PopoverMenu>
          </div>
        </div>
      )}
    </Panel>
  );
};

export default FiltersPanel;
