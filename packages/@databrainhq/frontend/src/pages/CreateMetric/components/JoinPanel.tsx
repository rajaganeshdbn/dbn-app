import { Ui, types } from '@databrainhq/plugin';
import { MetricsValue } from 'types';
import { Join, JoinCondition, SelectedJoin } from 'types/metric';
import { JOIN_CONDITION_OPERATOR, JOIN_TYPES } from 'consts/values';
import NoDataFound from 'components/MetricComponents/OutputTab/components/NoDataFound';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';

type Props = {
  columnOptions: types.FloatingDropDownOption[];
  isOpen: boolean;
  onClose: () => void;
  tableListOptions: types.FloatingDropDownOption[];
  selectedJoins: SelectedJoin[];
  setSelectedJoins: React.Dispatch<React.SetStateAction<SelectedJoin[]>>;
  selectedTable: types.FloatingDropDownOption;
  configuration: types.DatasetMetricCreationConfiguration;
  onGenerateDatasetmetric: ({
    param,
    metricParams,
    dimensionParams,
    createdDimensionParams,
    createdMetricParams,
  }: {
    param?: types.DatasetMetricCreationConfiguration | undefined;
    metricParams?: types.FloatingDropDownOption[] | undefined;
    dimensionParams?: types.FloatingDropDownOption[] | undefined;
    createdMetricParams?: types.FloatingDropDownOption[] | undefined;
    createdDimensionParams?: types.FloatingDropDownOption[] | undefined;
    selectedCustomMetric?: MetricsValue[];
    selectedCustomDim?: MetricsValue[];
    onSuccess?: () => void;
  }) => void;
};

const JoinPanel = ({
  JoinPanelProps: {
    columnOptions,
    isOpen,
    onClose,
    tableListOptions,
    selectedJoins,
    setSelectedJoins,
    selectedTable,
    onGenerateDatasetmetric,
    configuration,
  },
}: {
  JoinPanelProps: Props;
}) => {
  const { getIsCanAccess } = useAccessControl();
  return (
    <Ui.Panel
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      side="right"
      hideFooter
      headerTitle="Join Data"
    >
      {selectedJoins.length ? (
        <>
          <div className="dbn-w-full dbn-h-full dbn-p-5 dbn-flex dbn-flex-col dbn-gap-5">
            <AccessControl feature="joins" permission="Delete">
              <div className="dbn-w-full dbn-flex dbn-justify-end">
                <Ui.Button
                  variant="popover"
                  onClick={() => setSelectedJoins([])}
                >
                  Clear all
                </Ui.Button>
              </div>
            </AccessControl>
            {selectedJoins.map((join, index) => (
              <div
                className="dbn-flex dbn-flex-col dbn-gap-3 dbn-p-5 dbn-bg-gray dbn-border dbn-border-secondary dbn-rounded"
                key={`${join.tableName.value}`}
              >
                <div className="dbn-flex dbn-items-center dbn-gap-3">
                  {index > 0 ? (
                    <>
                      <Ui.FloatingDropDown
                        buttonWidth="220px"
                        menuWidth="220px"
                        isSearchEnabled
                        onChange={() => {}}
                        options={[]}
                        selectedOption={{
                          label: 'Previous Join Data',
                          value: 'Previous Join Data',
                          icon: 'link',
                        }}
                        isDisabled
                      />
                    </>
                  ) : (
                    <>
                      <Ui.FloatingDropDown
                        buttonWidth="220px"
                        menuWidth="220px"
                        isSearchEnabled
                        onChange={() => {}}
                        options={[]}
                        selectedOption={selectedTable}
                        isDisabled
                      />
                    </>
                  )}
                  <Ui.PopoverMenu
                    buttonContent={
                      <Ui.Button
                        leftIcon={
                          <Ui.Icons
                            name={join.joinType.icon as types.IconType}
                          />
                        }
                        variant="tab"
                        className="dbn-bg-white"
                      />
                    }
                    position="bottom-start"
                  >
                    <div>
                      {JOIN_TYPES.map((type) => (
                        <Ui.Button
                          variant="tertiary"
                          onClick={() =>
                            setSelectedJoins((prev) =>
                              prev.map((j, i) =>
                                i === index ? { ...j, joinType: type } : j
                              )
                            )
                          }
                          className="hover:dbn-bg-gray dbn-w-full dbn-justify-start"
                          leftIcon={
                            <Ui.Icons name={type.icon as types.IconType} />
                          }
                          isDisabled={
                            !getIsCanAccess('joins', 'Create') &&
                            !getIsCanAccess('joins', 'Edit')
                          }
                        >
                          {type.label}
                        </Ui.Button>
                      ))}
                    </div>
                  </Ui.PopoverMenu>
                  <Ui.FloatingDropDown
                    buttonWidth="260px"
                    menuWidth="100%"
                    isSearchEnabled
                    onChange={(value) =>
                      setSelectedJoins((prev) =>
                        prev.map((j, i) =>
                          i === index ? { ...j, tableName: value } : j
                        )
                      )
                    }
                    options={tableListOptions}
                    selectedOption={join.tableName}
                    isDisabled={
                      !getIsCanAccess('joins', 'Create') &&
                      !getIsCanAccess('joins', 'Edit')
                    }
                  />
                  <AccessControl feature="joins" permission="Delete">
                    <Ui.Button
                      variant="tab"
                      className="dbn-bg-white"
                      onClick={() =>
                        setSelectedJoins((prev) =>
                          prev.filter((j, i) => i !== index)
                        )
                      }
                    >
                      <Ui.Icons name="delete" />
                    </Ui.Button>
                  </AccessControl>
                </div>
                <div className="dbn-flex dbn-flex-col dbn-gap-3">
                  {join.conditions.map((con, indx) => (
                    <div className="dbn-flex dbn-items-center dbn-gap-3">
                      {indx === 0 && <Ui.Text variant="heading">ON</Ui.Text>}
                      {indx > 0 && <Ui.Text variant="heading">AND</Ui.Text>}
                      <Ui.FloatingDropDown
                        buttonWidth="220px"
                        menuWidth="220px"
                        isSearchEnabled
                        onChange={(value) =>
                          setSelectedJoins((prev) =>
                            prev.map((j, i) =>
                              i === index
                                ? {
                                    ...j,
                                    conditions: j.conditions.map((c, k) =>
                                      k === indx
                                        ? { ...c, firstOperand: value }
                                        : c
                                    ),
                                  }
                                : j
                            )
                          )
                        }
                        isDisabled={
                          !getIsCanAccess('joins', 'Create') &&
                          !getIsCanAccess('joins', 'Edit')
                        }
                        options={columnOptions}
                        selectedOption={con.firstOperand}
                      />
                      <Ui.PopoverMenu
                        buttonContent={
                          <Ui.Text variant="heading">
                            {con.operator.value}
                          </Ui.Text>
                        }
                        position="bottom-start"
                      >
                        <div>
                          {JOIN_CONDITION_OPERATOR.map((op) => (
                            <Ui.Button
                              variant="tertiary"
                              onClick={() =>
                                setSelectedJoins((prev) =>
                                  prev.map((j, i) =>
                                    i === index
                                      ? {
                                          ...j,
                                          conditions: j.conditions.map((c, k) =>
                                            k === indx
                                              ? { ...c, operator: op }
                                              : c
                                          ),
                                        }
                                      : j
                                  )
                                )
                              }
                              isDisabled={
                                !getIsCanAccess('joins', 'Create') &&
                                !getIsCanAccess('joins', 'Edit')
                              }
                              className="hover:dbn-bg-gray dbn-w-full dbn-justify-start"
                            >
                              {op.label}
                            </Ui.Button>
                          ))}
                        </div>
                      </Ui.PopoverMenu>
                      <Ui.FloatingDropDown
                        buttonWidth="220px"
                        menuWidth="220px"
                        isSearchEnabled
                        onChange={(value) =>
                          setSelectedJoins((prev) =>
                            prev.map((j, i) =>
                              i === index
                                ? {
                                    ...j,
                                    conditions: j.conditions.map((c, k) =>
                                      k === indx
                                        ? { ...c, secondOperand: value }
                                        : c
                                    ),
                                  }
                                : j
                            )
                          )
                        }
                        options={columnOptions}
                        selectedOption={con.secondOperand}
                        isDisabled={
                          !getIsCanAccess('joins', 'Create') &&
                          !getIsCanAccess('joins', 'Edit')
                        }
                      />
                      <Ui.Button
                        variant="popover"
                        onClick={() =>
                          setSelectedJoins((prev) =>
                            prev.map((j, i) =>
                              i === index
                                ? {
                                    ...j,
                                    conditions: j.conditions.filter(
                                      (c, k) => k !== indx
                                    ),
                                  }
                                : j
                            )
                          )
                        }
                        isDisabled={!getIsCanAccess('joins', 'Delete')}
                      >
                        <Ui.Icons name="cross" />
                      </Ui.Button>
                      {join.conditions.length - 1 === indx && (
                        <Ui.Button
                          variant="tab"
                          isDisabled={
                            !getIsCanAccess('joins', 'Create') &&
                            !getIsCanAccess('joins', 'Edit')
                          }
                          leftIcon={<Ui.Icons name="plus" size="xs" />}
                          className="dbn-bg-white"
                          onClick={() =>
                            setSelectedJoins((prev) =>
                              prev.map((j, i) =>
                                i === index
                                  ? {
                                      ...j,
                                      conditions: [
                                        ...j.conditions,
                                        {
                                          firstOperand: {
                                            label: '',
                                            value: '',
                                          },
                                          secondOperand: {
                                            label: '',
                                            value: '',
                                          },
                                          operator: JOIN_CONDITION_OPERATOR[0],
                                        },
                                      ],
                                    }
                                  : j
                              )
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                  {!join.conditions.length && (
                    <Ui.Button
                      variant="tab"
                      leftIcon={<Ui.Icons name="plus" />}
                      isDisabled={
                        !getIsCanAccess('joins', 'Create') &&
                        !getIsCanAccess('joins', 'Edit')
                      }
                      onClick={() =>
                        setSelectedJoins((prev) =>
                          prev.map((j, i) =>
                            i === index
                              ? {
                                  ...j,
                                  conditions: [
                                    ...j.conditions,
                                    {
                                      firstOperand: {
                                        label: '',
                                        value: '',
                                      },
                                      secondOperand: {
                                        label: '',
                                        value: '',
                                      },
                                      operator: JOIN_CONDITION_OPERATOR[0],
                                    },
                                  ],
                                }
                              : j
                          )
                        )
                      }
                    />
                  )}
                </div>
              </div>
            ))}
            <AccessControl feature="joins" permission="Create">
              <Ui.Button
                variant="popover"
                className="dbn-font-bold dbn-text-base"
                leftIcon={<Ui.Icons name="plus" size="sm" />}
                onClick={() =>
                  setSelectedJoins((prev) => [
                    ...prev,
                    {
                      tableName: { label: '', value: '' },
                      conditions: [],
                      joinType: JOIN_TYPES[0],
                    },
                  ])
                }
              >
                Add Join
              </Ui.Button>
            </AccessControl>
            <div className="dbn-w-full dbn-flex  dbn-h-[50px] dbn-items-end dbn-justify-end dbn-gap-5">
              <Ui.Button variant="secondary" onClick={() => onClose()}>
                Cancel
              </Ui.Button>
              {getIsCanAccess('joins', 'Create') ||
              getIsCanAccess('joins', 'Edit') ? (
                <Ui.Button
                  variant="primary"
                  onClick={() => {
                    const joins: Join[] = selectedJoins
                      .filter((join) => {
                        const [schema, name] =
                          join.tableName.value?.split('^^^^^^');
                        return schema && name && join.conditions.length;
                      })
                      .map((join) => {
                        const [schema, name, alias, type] =
                          join.tableName.value?.split('^^^^^^');
                        const joinCondition: JoinCondition[] =
                          join.conditions.map((condition) => {
                            const { firstOperand, secondOperand, operator } =
                              condition;
                            const [
                              firstOperandParentAlias,
                              firstOperandColumnName,
                            ] = firstOperand.value?.split('^^^^^^');
                            const [
                              secondOperandParentAlias,
                              secondOperandColumnName,
                            ] = secondOperand.value?.split('^^^^^^');
                            return {
                              firstOperand: {
                                parentAlias: firstOperandParentAlias,
                                columnName: firstOperandColumnName,
                              },
                              secondOperand: {
                                parentAlias: secondOperandParentAlias,
                                columnName: secondOperandColumnName,
                              },
                              operator: operator.value,
                            };
                          });
                        const selectedJoin: Join = {
                          alias:
                            type === 'custom' ? alias : `${schema}_${name}`,
                          conditions: joinCondition,
                          name,
                          schema: type === 'custom' ? 'none' : schema,
                          joinType: join.joinType.value,
                          tableType: type === 'custom' ? 'custom' : 'default',
                        };
                        return selectedJoin;
                      });
                    onGenerateDatasetmetric({
                      param: {
                        ...configuration,
                        table: {
                          ...configuration.table,
                          joins,
                        },
                      },
                      onSuccess: onClose,
                    });
                  }}
                >
                  Apply Join
                </Ui.Button>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <>
          <NoDataFound message="No Join Created">
            <div className="dbn-p-5">
              <AccessControl
                feature="joins"
                permission="Create"
                fallback={
                  <Ui.Alert
                    text="You don't have permission to add joins."
                    variant="error"
                  />
                }
              >
                <Ui.Button
                  variant="secondary"
                  leftIcon={<Ui.Icons name="plus" />}
                  onClick={() =>
                    setSelectedJoins((prev) => [
                      ...prev,
                      {
                        tableName: { label: '', value: '' },
                        conditions: [],
                        joinType: JOIN_TYPES[0],
                      },
                    ])
                  }
                >
                  Add Join
                </Ui.Button>
              </AccessControl>
            </div>
          </NoDataFound>
        </>
      )}
    </Ui.Panel>
  );
};

export default JoinPanel;
