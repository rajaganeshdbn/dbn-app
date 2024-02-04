/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
import { Ui, consts, helpers, types } from '@databrainhq/plugin';
import ReactAce from 'react-ace/lib/ace';
import { useMemo, useState } from 'react';
import { CreateNewFilter, GetFilterDropDownType } from 'types/metric';
import {
  NUMBER_OPERATOR_LIST,
  RELATION_OPERATOR_LIST,
  STRING_OPERATOR_LIST,
  TIME_OPERATOR_LIST,
  operatorList,
} from 'consts/values';
import { DATABASE, TABLE } from 'consts/application';
import NoDataFound from 'components/MetricComponents/OutputTab/components/NoDataFound';
import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';
import styles from './manageColumns.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: CreateNewFilter[];
  setCreatedFilters: React.Dispatch<React.SetStateAction<CreateNewFilter[]>>;
  columnOptions: types.FloatingDropDownOption[];
  getFilterDropDownType: GetFilterDropDownType;
  workspaceId: string;
  editorRef: React.RefObject<ReactAce>;
  onApplyFilter: (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => void;
  savedFilterListOptions: types.FloatingDropDownOption[];
  isDatabaseTenancy: boolean;
  joinTableOption: types.FloatingDropDownOption[];
  currentSelectedTable: types.FloatingDropDownOption;
  setCurrentSelectedTable: React.Dispatch<
    React.SetStateAction<types.FloatingDropDownOption>
  >;
  onSaveCustomFilter: (filter: CreateNewFilter) => void;
  clientId?: string;
  rlsConditions: types.RlsCondition[];
  globalFilters: Ui.MetricCardProps['globalFilters'];
  rlsValues: Record<string, string>;
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
    isDatabaseTenancy,
    currentSelectedTable,
    joinTableOption,
    setCurrentSelectedTable,
    onSaveCustomFilter,
    clientId,
    globalFilters,
    rlsConditions,
    rlsValues,
  },
}: {
  filtersPanelProps: Props;
}) => {
  const [isShowAlertInfo, setShowAlertInfo] = useState<boolean>(true);
  const filterTableName = useMemo(() => {
    const [schema, name, alias, type] =
      currentSelectedTable?.value?.split('^^^^^^');
    if (type === 'custom')
      return {
        query: helpers.replaceVariable({
          query: name,
          tenancyLevel: isDatabaseTenancy ? DATABASE : TABLE,
          clientId,
          isAllClient: false,
          rlsConditions,
          globalFilters,
          values: rlsValues,
        }),
        alias,
      };
    return `${schema}.${name}`;
  }, [
    clientId,
    currentSelectedTable?.value,
    globalFilters,
    isDatabaseTenancy,
    rlsConditions,
    rlsValues,
  ]);
  const { getIsCanAccess } = useAccessControl();
  return (
    <Ui.Panel
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
            <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
              <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
                {joinTableOption?.map((table) => (
                  <Ui.Button
                    variant={
                      currentSelectedTable?.value === table?.value
                        ? 'secondary'
                        : 'tab'
                    }
                    onClick={() => setCurrentSelectedTable(table)}
                    isDisabled={
                      !getIsCanAccess('filters', 'Edit') &&
                      !getIsCanAccess('filters', 'Create Simple Filters') &&
                      !getIsCanAccess('filters', 'Create Complex Filters') &&
                      !getIsCanAccess('filters', 'Create Client Filters')
                    }
                  >
                    {table.label}
                  </Ui.Button>
                ))}
              </div>
              <AccessControl feature="filters" permission="Delete">
                <Ui.Button
                  variant="popover"
                  onClick={() => {
                    setCreatedFilters([]);
                    onApplyFilter(() => setCreatedFilters([]), true);
                  }}
                >
                  Clear all
                </Ui.Button>
              </AccessControl>
            </div>
            {filters.map((filter, index) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [parentAlias, columnName, datatype, schemaName, tableName] =
                filter.columnName.value?.split('^^^^^^');
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
                    <Ui.FloatingDropDown
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
                      buttonWidth="80px"
                      menuWidth="100%"
                      isDisabled={
                        !getIsCanAccess('filters', 'Create All') &&
                        !getIsCanAccess('filters', 'Create Complex Filters') &&
                        !getIsCanAccess('filters', 'Create Complex Filters') &&
                        !getIsCanAccess('filters', 'Create Client Filters') &&
                        !getIsCanAccess('filters', 'Edit')
                      }
                    />
                  )}
                  {filter.type === 'custom' ? (
                    <>
                      <Ui.PopoverMenu
                        buttonContent={
                          <Ui.Button
                            variant="secondary"
                            rightIcon={<Ui.Icons name="chevron-down" />}
                          >
                            {filter.name || 'Advanced Filter'}
                          </Ui.Button>
                        }
                        tabMenu
                        menuWidth="400px"
                        position="bottom-start"
                      >
                        <div className="dbn-flex dbn-flex-col dbn-gap-3 dbn-p-3">
                          <Ui.Tabs.Context
                            variant="popoverTabs"
                            defaultActiveTab="create"
                          >
                            <Ui.Tabs.List background="#F4F4F7">
                              <Ui.Tabs.Tab tabId="saved" width="100%" grow>
                                Saved
                              </Ui.Tabs.Tab>
                              <Ui.Tabs.Tab tabId="create" width="100%" grow>
                                Create
                              </Ui.Tabs.Tab>
                            </Ui.Tabs.List>
                            <Ui.Tabs.Panel tabId="saved">
                              <Ui.FloatingDropDown
                                buttonWidth="280px"
                                menuWidth="280px"
                                options={savedFilterListOptions}
                                onChange={(value) => {
                                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                  const [sql, indx, name] =
                                    value.value?.split('^^^^^^');
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
                            </Ui.Tabs.Panel>
                            <Ui.Tabs.Panel
                              tabId="create"
                              className="dbn-flex dbn-flex-col dbn-gap-[10px]"
                            >
                              {isShowAlertInfo ? (
                                <Ui.Alert
                                  text={
                                    currentSelectedTable?.value?.split(
                                      '^^^^^^'
                                    )?.[3] === 'custom'
                                      ? 'Column Format: tableName.columnName'
                                      : 'Column Format: schemaName_tableName.columnName'
                                  }
                                  variant="info"
                                  hideInfoIcon
                                >
                                  <Ui.Button
                                    variant="popover"
                                    onClick={() => setShowAlertInfo(false)}
                                  >
                                    <Ui.Icons
                                      name="cross"
                                      size="xs"
                                      color="infoAlert"
                                    />
                                  </Ui.Button>
                                </Ui.Alert>
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
                              <Ui.InputField
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
                            </Ui.Tabs.Panel>
                          </Ui.Tabs.Context>
                        </div>
                        <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-items-end dbn-justify-between dbn-p-3">
                          <Ui.Button variant="secondary" data-closepopover>
                            Cancel
                          </Ui.Button>
                          <Ui.Button
                            variant="primary"
                            onClick={() => onSaveCustomFilter(filter)}
                            data-closepopover
                          >
                            Add
                          </Ui.Button>
                        </div>
                      </Ui.PopoverMenu>
                    </>
                  ) : (
                    <>
                      <Ui.FloatingDropDown
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
                          <Ui.FloatingDropDown
                            options={
                              consts.DATE_TYPES.includes(
                                datatype?.toLowerCase()
                              )
                                ? TIME_OPERATOR_LIST
                                : consts.NUMBER_TYPES.includes(
                                    datatype?.toLowerCase()
                                  )
                                ? NUMBER_OPERATOR_LIST
                                : consts.STRING_TYPES.includes(
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
                            <Ui.MultiFilterDropdown
                              filter={{
                                tableName:
                                  typeof filterTableName === 'object'
                                    ? ''
                                    : filterTableName,
                                columnName: `${columnName}`,
                              }}
                              customTable={
                                typeof filterTableName === 'object'
                                  ? filterTableName
                                  : undefined
                              }
                              workspaceId={workspaceId}
                              selectedOption={
                                filter.value.stringArray?.map((v) => ({
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
                            <Ui.FilterDropDown
                              isDisableLabel
                              filter={{
                                tableName:
                                  typeof filterTableName === 'object'
                                    ? ''
                                    : filterTableName,
                                columnName: `${columnName}`,
                              }}
                              customTable={
                                typeof filterTableName === 'object'
                                  ? filterTableName
                                  : undefined
                              }
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
                            <Ui.TimeGrainField
                              isDisabled={!columnName || !datatype}
                              timeGrainValue={
                                filter.value.timeValue?.timeFilter ||
                                'Last Year'
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
                            <Ui.InputField
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
                          {filterFieldType === 'INPUT_TEXT_FIELD' && (
                            <Ui.InputField
                              type="text"
                              onChange={({ target: { value } }) =>
                                setCreatedFilters((prev) =>
                                  prev.map((f, i) =>
                                    index === i
                                      ? {
                                          ...f,
                                          value: { stringValue: value },
                                        }
                                      : f
                                  )
                                )
                              }
                              value={filter?.value?.stringValue}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                  <Ui.Button
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
                    <Ui.Icons name="delete" />
                  </Ui.Button>
                </div>
              );
            })}
            <div className="dbn-w-fit">
              {getIsCanAccess('filters', 'Create All') ||
              getIsCanAccess('filters', 'Create Complex Filters') ||
              getIsCanAccess('filters', 'Create Complex Filters') ||
              getIsCanAccess('filters', 'Create Client Filters') ? (
                <Ui.PopoverMenu
                  buttonContent={
                    <Ui.Button
                      variant="popover"
                      leftIcon={<Ui.Icons name="plus" />}
                    >
                      Add Filter
                    </Ui.Button>
                  }
                  position="bottom-start"
                >
                  <div>
                    {(getIsCanAccess('filters', 'Create All') ||
                      getIsCanAccess('filters', 'Create Simple Filters')) && (
                      <Ui.Button
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
                      </Ui.Button>
                    )}
                    {(getIsCanAccess('filters', 'Create All') ||
                      getIsCanAccess('filters', 'Create Complex Filters')) && (
                      <Ui.Button
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
                      </Ui.Button>
                    )}
                    {(getIsCanAccess('filters', 'Create All') ||
                      getIsCanAccess('filters', 'Create Client Filters')) &&
                      !isDatabaseTenancy && (
                        <Ui.Button
                          variant="popover"
                          onClick={() =>
                            setCreatedFilters((prev) => [
                              ...prev,
                              {
                                columnName: { value: '', label: '' },
                                operator: { label: '', value: '' },
                                value: { stringValue: '' },
                                type: 'client',
                                name: '',
                                sql: '',
                                tableName: currentSelectedTable,
                              },
                            ])
                          }
                          className={styles.popOption}
                        >
                          Client Filter
                        </Ui.Button>
                      )}
                  </div>
                </Ui.PopoverMenu>
              ) : (
                <Ui.Alert
                  variant="error"
                  text="You don't have permission to create filters."
                />
              )}
            </div>
          </div>
          <div className="dbn-w-full dbn-flex  dbn-h-[50px] dbn-items-end dbn-justify-end dbn-gap-5">
            <Ui.Button variant="secondary" onClick={() => onClose()}>
              Cancel
            </Ui.Button>
            {getIsCanAccess('filters', 'Create All') ||
            getIsCanAccess('filters', 'Create Complex Filters') ||
            getIsCanAccess('filters', 'Create Complex Filters') ||
            getIsCanAccess('filters', 'Create Client Filters') ? (
              <Ui.Button
                variant="primary"
                onClick={() => onApplyFilter(onClose)}
              >
                Apply Filter
              </Ui.Button>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <NoDataFound message="No Filters Created">
            <div className="dbn-p-5">
              <Ui.PopoverMenu
                buttonContent={
                  <Ui.Button
                    variant="secondary"
                    leftIcon={<Ui.Icons name="plus" />}
                  >
                    Add Filter
                  </Ui.Button>
                }
                position="bottom"
                menuWidth="120px"
                offset={[0, 10]}
              >
                <div className="dbn-p-2">
                  <Ui.Button
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
                  </Ui.Button>
                  <Ui.Button
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
                  </Ui.Button>
                  {!isDatabaseTenancy && (
                    <Ui.Button
                      variant="popover"
                      onClick={() =>
                        setCreatedFilters((prev) => [
                          ...prev,
                          {
                            columnName: { value: '', label: '' },
                            operator: { label: '', value: '' },
                            value: { stringValue: '' },
                            type: 'client',
                            name: '',
                            sql: '',
                            tableName: currentSelectedTable,
                          },
                        ])
                      }
                      className={styles.popOption}
                    >
                      Client Filter
                    </Ui.Button>
                  )}
                </div>
              </Ui.PopoverMenu>
            </div>
          </NoDataFound>
        </>
      )}
    </Ui.Panel>
  );
};

export default FiltersPanel;
