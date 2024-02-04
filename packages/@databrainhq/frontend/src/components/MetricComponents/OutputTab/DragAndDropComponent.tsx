/* eslint-disable import/no-named-as-default */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { consts, types, Ui, hooks } from '@databrainhq/plugin';
import ReactAce from 'react-ace/lib/ace';
import { DndStateProp } from '@databrainhq/plugin/src/types';
import {
  DraggableMetricItemData,
  NewMetricDragDropConfigProps,
} from 'types/metric';
import { DATE_FORMAT, METRIC_CREATE_MODES } from 'consts/values';
import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
import styles from './outputTab.module.css';
import ArithmeticFunctionPopup from './components/ArithmeticFunctionPopup';

type Props = {
  metricConfig: {
    createNewColumnError: string[];
    selectedTable: types.FloatingDropDownOption;
    editorRef: React.RefObject<ReactAce>;
    isSqlTab: boolean;
  };
  newMetricConfigProps: NewMetricDragDropConfigProps;
  isPythonMode: boolean;
};
const DragAndDropComponent = ({
  metricConfig: { createNewColumnError, selectedTable, editorRef, isSqlTab },
  newMetricConfigProps: {
    onDropColumn,
    selectedDims,
    selectedMetrics,
    functionOptions,
    onRemoveColumn,
    onChangeHelperFunction,
    onChangeAlias,
    customSql,
    joinTableOption,
    setCustomSql,
    onSaveCustomSQLColumn,
    dimModifiers,
    metricModifiers,
    onUpdateCustomSqlColumn,
    arithmeticColumnOptions,
    isTimeSeries,
    onSaveArithMetricOption,
  },
  isPythonMode,
}: Props) => {
  const [isDimensionHoveredState, setisDimensionHoveredState] = useState({
    isHovered: false,
    isPopoverOpen: false,
  });
  const [isMetricHoveredState, setIsMetricHoveredState] = useState({
    isHovered: false,
    isPopoverOpen: false,
  });
  const [isShowAlertInfo, setShowAlertInfo] = useState<boolean>(true);
  const [aliasColumn, setAliasColumn] = useState<types.FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [aliasColumnValue, setAliasColumnValue] = useState<string>();
  const [isColumnCasted, setIsColumnCasted] = useState<boolean>(false);
  const [castColumnAs, setCastColumnAs] =
    useState<types.FloatingDropDownOption>(
      consts.CAST_COLUMN_AS[consts.CAST_COLUMN_AS.length - 1]
    );
  const [columnSqlValue, setColumnSqlValue] = useState<string>('');
  const [dateFormatValue, setDateFormatValue] = useState<string>();

  const [isDimensionOverflow, setIsDimensionOverflow] = useState(false);
  const [isDimensionExpanded, setIsDimensionExpanded] = useState(false);
  const [isMetricOverflow, setIsMetricOverflow] = useState(false);
  const [isMetricExpanded, setIsMetricExpanded] = useState(false);

  const onDropDimension = (event: DragEvent, dropData: DndStateProp) => {
    const { column, table } = dropData.active?.data as DraggableMetricItemData;
    const { sorting } = dropData;
    const identifier = dropData.active?.identifier;
    onDropColumn({ column, table, sorting, identifier, type: 'DIMENSION' });
  };

  const onDropMetric = (event: DragEvent, dropData: DndStateProp) => {
    const { column, table } = dropData.active?.data as DraggableMetricItemData;
    const { sorting } = dropData;
    const identifier = dropData.active?.identifier;
    onDropColumn({ column, table, sorting, identifier, type: 'METRIC' });
  };

  const { setDropNodeRef: setDimensionRef } = hooks.useDrop({
    identifier: {
      id: 'dimensions',
      accepts: ['column', 'dimensions', 'metrics', 'aggregate_dimesions'],
    },
    events: {
      onDrop: onDropDimension,
    },
    modifiers: dimModifiers,
  });

  const { setDropNodeRef: setMetricRef } = hooks.useDrop({
    identifier: {
      id: 'metric',
      accepts: ['column', 'dimensions', 'metrics', 'aggregate_metrics'],
    },
    events: {
      onDrop: onDropMetric,
    },
    modifiers: metricModifiers,
  });

  const dragItemModifier = {
    highlightDrop: {
      onDrag: true,
    },
  };

  useEffect(() => {
    if (
      setDimensionRef.current.scrollHeight >
      setDimensionRef.current.clientHeight
    ) {
      setIsDimensionOverflow(true);
    } else {
      setIsDimensionOverflow(false);
      setIsDimensionExpanded(false);
    }
    if (setDimensionRef.current.offsetHeight < 60) {
      setIsDimensionOverflow(false);
      setIsDimensionExpanded(false);
    }
  }, [selectedDims.length]);

  useEffect(() => {
    if (setMetricRef.current.scrollHeight > setMetricRef.current.clientHeight) {
      setIsMetricOverflow(true);
    } else {
      setIsMetricOverflow(false);
      setIsMetricExpanded(false);
    }

    if (setMetricRef.current.offsetHeight < 60) {
      setIsMetricOverflow(false);
      setIsMetricExpanded(false);
    }
  }, [selectedMetrics.length]);

  useEffect(() => {
    if (!isDimensionHoveredState.isPopoverOpen) {
      setisDimensionHoveredState((prev) => ({
        ...prev,
        isHovered: false,
      }));
    }

    if (!isMetricHoveredState.isPopoverOpen) {
      setIsMetricHoveredState((prev) => ({
        ...prev,
        isHovered: false,
      }));
    }
  }, [
    isDimensionHoveredState.isPopoverOpen,
    isMetricHoveredState.isPopoverOpen,
  ]);
  const currentTableType = useMemo(
    () =>
      customSql?.tableName?.value?.includes('^^^^^^')
        ? customSql?.tableName?.value?.split('^^^^^^')?.[3]
        : customSql?.tableName?.value?.split('____')?.[3],
    [customSql?.tableName?.value]
  );

  return (
    <>
      <div className={styles.selectionContainer}>
        <span className={styles.selectedCol}>
          <Ui.Text variant="btn">Dimensions</Ui.Text>
        </span>
        <div
          className={styles.DroppableZone}
          onMouseEnter={() =>
            setisDimensionHoveredState((prev) => ({ ...prev, isHovered: true }))
          }
          onMouseLeave={() => {
            if (!isDimensionHoveredState.isPopoverOpen) {
              setisDimensionHoveredState((prev) => ({
                ...prev,
                isHovered: false,
              }));
            }
          }}
        >
          <div
            className={`${styles.listContainer} ${
              isDimensionExpanded
                ? 'dbn-relative dbn-h-min dbn-gap-y-7 dbn-z-elevated dbn-border dbn-border-dashed dbn-border-secondary dbn-rounded-lg dbn-m-2'
                : 'dbn-h-auto dbn-overflow-y-scroll dbn-z-base '
            }`}
            ref={setDimensionRef}
          >
            {isDimensionOverflow && !isMetricExpanded ? (
              <div className={styles.collapseButton}>
                {isDimensionExpanded ? (
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    className="dbn-p-1"
                    onClick={() => setIsDimensionExpanded(false)}
                  >
                    <Ui.Button
                      variant="popover"
                      className="dbn-rotate-90"
                      fitContainer
                    >
                      <Ui.Icons name="double-arrow-left" size="xxs" />
                    </Ui.Button>
                  </div>
                ) : (
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    className="dbn-p-1"
                    onClick={() => setIsDimensionExpanded(true)}
                  >
                    <Ui.Button
                      variant="popover"
                      className="-dbn-rotate-90"
                      fitContainer
                    >
                      <Ui.Icons name="double-arrow-left" size="xxs" />
                    </Ui.Button>
                  </div>
                )}
              </div>
            ) : null}
            {selectedDims.map((col, index) => (
              <Ui.DraggableItem
                key={col.alias}
                identifier={{
                  id: col.alias,
                  type:
                    col.type === 'HELPER_FUNCTION'
                      ? 'aggregate_dimensions'
                      : 'dimensions',
                }}
                data={col.draggableItemData}
                CustomDragPreview={
                  <span className={styles.dragPreview}>{col.alias}</span>
                }
                modifiers={dragItemModifier}
                renderItem={(setDragNodeRef: React.MutableRefObject<any>) => {
                  const aggregates = functionOptions(col);
                  const validHelpers = aggregates.filter(
                    (v) => !consts.aggregateStrings.includes(v.value)
                  );

                  return (
                    <span
                      className={styles.listVal}
                      ref={setDragNodeRef}
                      data-dbn-sorting-index={index}
                    >
                      {!METRIC_CREATE_MODES.includes(col.type) &&
                        !(
                          isTimeSeries &&
                          consts.DATE_TYPES.includes(
                            col.datatype?.toLowerCase() ||
                              col.cast?.value?.toLowerCase() ||
                              ''
                          )
                        ) && (
                          <Ui.PopoverMenu
                            buttonContent={
                              <Ui.Icons name="caret-down-fill" size="xs" />
                            }
                            position="bottom-start"
                            offset={[0, 10]}
                            autoCloseParent
                          >
                            <div className="dbn-p-2">
                              {validHelpers?.map((func) =>
                                func.value === DATE_FORMAT ? (
                                  <Ui.PopoverMenu
                                    tabMenu
                                    buttonContent={
                                      <Ui.Button
                                        data-closepopover="remainOpen"
                                        key={func.value}
                                        variant="popover"
                                        className={`dbn-justify-between dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1 ${
                                          col.helperFunction === func.value
                                            ? 'dbn-bg-gray-50'
                                            : ''
                                        }`}
                                        // onClick={() =>
                                        //   onChangeHelperFunction({
                                        //     column: col,
                                        //     helperFunction: func,
                                        //     type: 'DIMENSION',
                                        //   })
                                        // }
                                        rightIcon={
                                          <div className="-dbn-rotate-90">
                                            <Ui.Icons name="chevron-down" />
                                          </div>
                                        }
                                      >
                                        <span>{func.label}</span>
                                      </Ui.Button>
                                    }
                                    position="right-end"
                                    menuWidth="dbn-w-[300px]"
                                  >
                                    <div className="dbn-flex dbn-flex-col dbn-w-full dbn-items-center dbn-justify-center dbn-p-3 dbn-gap-3">
                                      <Ui.InputField
                                        label="Date Format"
                                        defaultValue={
                                          col.functionConfiguration?.dateFormat
                                        }
                                        onChange={(e) =>
                                          setDateFormatValue(e.target.value)
                                        }
                                        value={dateFormatValue}
                                        placeholder="%Y-%m-%d, yyyy-mm-dd"
                                      />
                                      <div className="dbn-flex  dbn-w-full dbn-items-center dbn-justify-between   dbn-gap-2">
                                        <Ui.Button
                                          variant="secondary"
                                          data-closepopover
                                        >
                                          Cancel
                                        </Ui.Button>
                                        <Ui.Button
                                          variant="primary"
                                          data-closepopover
                                          onClick={() => {
                                            onChangeHelperFunction({
                                              column: col,
                                              helperFunction: func,
                                              type: 'DIMENSION',
                                              functionConfiguration: {
                                                dateFormat: dateFormatValue,
                                              },
                                            });
                                          }}
                                        >
                                          Save
                                        </Ui.Button>
                                      </div>
                                    </div>
                                  </Ui.PopoverMenu>
                                ) : (
                                  <Ui.Button
                                    key={
                                      isTimeSeries ? func.subValue : func.value
                                    }
                                    variant="popover"
                                    className={`dbn-justify-between dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1 ${
                                      func.value === col.helperFunction
                                        ? 'dbn-bg-gray-500'
                                        : ''
                                    }`}
                                    onClick={() =>
                                      onChangeHelperFunction({
                                        column: col,
                                        helperFunction: func,
                                        type: 'DIMENSION',
                                      })
                                    }
                                  >
                                    <span>{func.label}</span>
                                  </Ui.Button>
                                )
                              )}
                            </div>
                          </Ui.PopoverMenu>
                        )}
                      {col.type === 'CUSTOM' && (
                        <Ui.PopoverMenu
                          buttonContent={
                            <Ui.Button
                              variant="popover"
                              onClick={() => setColumnSqlValue(col.sql || '')}
                            >
                              <Ui.Icons name="caret-down-fill" size="xs" />
                            </Ui.Button>
                          }
                          position="bottom-start"
                          offset={[0, 10]}
                          tabMenu
                          menuWidth="360px"
                        >
                          <div className={styles.sqlModal}>
                            <div className={styles.createSqlTab}>
                              <div className={styles.customConfigEditor}>
                                <AceEditorSql
                                  editorRef={editorRef}
                                  onChange={(value: string) => {
                                    setColumnSqlValue(value);
                                  }}
                                  value={columnSqlValue}
                                  onExecute={() => {}}
                                />
                              </div>
                            </div>
                            <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-h-[50px] dbn-items-end dbn-justify-between">
                              <Ui.Button variant="secondary" data-closepopover>
                                Cancel
                              </Ui.Button>
                              <Ui.Button
                                variant="primary"
                                data-closepopover
                                onClick={() =>
                                  onUpdateCustomSqlColumn({
                                    column: col,
                                    sql: columnSqlValue,
                                    type: 'DIMENSION',
                                  })
                                }
                              >
                                Save
                              </Ui.Button>
                            </div>
                          </div>
                        </Ui.PopoverMenu>
                      )}
                      {!isPythonMode ? (
                        <Ui.PopoverMenu
                          buttonContent={
                            <Ui.Button
                              variant="popover"
                              className="dbn-border-b dbn-border-b-transparent hover:dbn-border-b hover: dbn-border-black dbn-text-xs"
                              onClick={() => {
                                setAliasColumnValue(col.alias);
                                setCastColumnAs(
                                  col.cast ||
                                    consts.CAST_COLUMN_AS[
                                      consts.CAST_COLUMN_AS.length - 1
                                    ]
                                );
                                setIsColumnCasted(false);
                              }}
                            >
                              {col.alias}
                            </Ui.Button>
                          }
                          position="bottom-start"
                          menuWidth="dbn-w-[400px]"
                          tabMenu
                        >
                          <div className="dbn-flex dbn-flex-col dbn-w-full dbn-items-center dbn-justify-center dbn-p-3 dbn-gap-3">
                            <Ui.InputField
                              label={col?.name}
                              defaultValue={aliasColumn?.label}
                              onChange={(e) =>
                                setAliasColumnValue(e.target.value)
                              }
                              value={aliasColumnValue}
                            />
                            {!['CUSTOM', 'ARITHMETIC'].includes(col.type) && (
                              <Ui.FloatingDropDown
                                onChange={(option) => {
                                  setCastColumnAs(option);
                                  setIsColumnCasted(true);
                                }}
                                options={consts.CAST_COLUMN_AS}
                                selectedOption={castColumnAs}
                                label="Cast Column As"
                                buttonWidth="300px"
                                menuWidth="300px"
                              />
                            )}
                            <div className="dbn-flex  dbn-w-full dbn-items-center dbn-justify-between dbn-gap-3">
                              <Ui.Button variant="secondary" data-closepopover>
                                Cancel
                              </Ui.Button>
                              <Ui.Button
                                variant="primary"
                                data-closepopover
                                onClick={() => {
                                  onChangeAlias({
                                    alias: aliasColumnValue || col.alias,
                                    column: col,
                                    type: 'DIMENSION',
                                    cast: castColumnAs,
                                    isColumnCasted,
                                  });
                                }}
                              >
                                Save
                              </Ui.Button>
                            </div>
                          </div>
                        </Ui.PopoverMenu>
                      ) : (
                        <Ui.Button
                          variant="popover"
                          className="dbn-border-b dbn-border-b-transparent dbn-text-xs"
                        >
                          {col.alias}
                        </Ui.Button>
                      )}
                      <span
                        className={styles.removeColumn}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => {}}
                        onClick={() => {
                          onRemoveColumn({ column: col, type: 'DIMENSION' });
                        }}
                      >
                        X
                      </span>
                    </span>
                  );
                }}
              />
            ))}
            {selectedDims.length === 0 ? (
              <Ui.Text variant="body-text-sm" color="secondary">
                Drag and Drop your Rows here
              </Ui.Text>
            ) : null}
          </div>
          {/* {!(isSqlTab || isPythonMode) && (
            <Ui.Flex alignItems="center" justify="center">
              <ArithmeticFunctionPopup
                props={{
                  columnOptions: arithmeticColumnOptions,
                  isHovered: isDimensionHoveredState.isHovered,
                  type: 'DIMENSION',
                  onSaveArithMetricOption,
                }}
              />
            </Ui.Flex>
          )} */}
          {!(isSqlTab || isPythonMode) && (
            <div className={styles.sqlHoverBtn}>
              <>
                <Ui.PopoverMenu
                  tabMenu
                  getIsOpen={(isOpen) => {
                    setisDimensionHoveredState((prev) => ({
                      ...prev,
                      isPopoverOpen: isOpen,
                    }));
                  }}
                  menuWidth="360px"
                  offset={[18, 10]}
                  buttonContent={
                    isDimensionHoveredState.isHovered ? (
                      <Ui.Button
                        variant="popover"
                        className="dbn-bg-primary dbn-text-white dbn-text-xs dbn-px-2 dbn-py-1 dbn-rounded-xl dbn-flex dbn-gap-0.5"
                      >
                        <Ui.Icons name="plus" size="xs" color="white" />
                        SQL
                      </Ui.Button>
                    ) : (
                      <></>
                    )
                  }
                >
                  <div className={styles.sqlModal}>
                    <Ui.Text variant="heading-lg">Add new columns</Ui.Text>
                    {createNewColumnError.map((error) => (
                      <Ui.Alert text={error} variant="error" />
                    ))}
                    <div className={styles.createSqlTab}>
                      {isShowAlertInfo ? (
                        <Ui.Alert
                          text={
                            currentTableType === 'custom'
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

                      <Ui.FloatingDropDown
                        buttonWidth="100%"
                        menuWidth="100%"
                        isSearchEnabled
                        onChange={(value) =>
                          setCustomSql((prev) => ({
                            ...prev,
                            tableName: value,
                          }))
                        }
                        options={joinTableOption}
                        selectedOption={customSql?.tableName}
                      />
                      <div className={styles.customConfigEditor}>
                        <AceEditorSql
                          editorRef={editorRef}
                          onChange={(value: string) => {
                            setCustomSql((prev) => ({
                              ...prev,
                              sql: value,
                              isAggregate: false,
                              isDimension: true,
                              isFilter: false,
                            }));
                          }}
                          value={customSql?.sql}
                          onExecute={() => {}}
                        />
                      </div>
                      <Ui.InputField
                        type="text"
                        label="Query Name"
                        placeholder="name"
                        onChange={(e) =>
                          setCustomSql((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        value={customSql.name}
                      />
                    </div>
                    <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-h-[50px] dbn-items-end dbn-justify-between">
                      <Ui.Button variant="secondary" data-closepopover>
                        Cancel
                      </Ui.Button>
                      <Ui.Button
                        variant="primary"
                        onClick={() => onSaveCustomSQLColumn('DIMENSION')}
                      >
                        Add
                      </Ui.Button>
                    </div>
                  </div>
                </Ui.PopoverMenu>
              </>
            </div>
          )}
        </div>
      </div>
      <div className={styles.selectionContainer}>
        <span className={styles.selectedCol}>
          <Ui.Text variant="btn">Measures</Ui.Text>
        </span>
        <div
          className={styles.DroppableZone}
          onMouseEnter={() =>
            setIsMetricHoveredState((prev) => ({ ...prev, isHovered: true }))
          }
          onMouseLeave={() => {
            if (!isMetricHoveredState.isPopoverOpen) {
              setIsMetricHoveredState((prev) => ({
                ...prev,
                isHovered: false,
              }));
            }
          }}
        >
          <div
            className={`${styles.listContainer} ${
              isMetricExpanded
                ? 'dbn-relative dbn-h-min dbn-z-elevated dbn-border dbn-border-secondary dbn-rounded-lg dbn-m-2'
                : 'dbn-h-auto dbn-overflow-y-scroll dbn-z-base'
            }`}
            ref={setMetricRef}
          >
            {isMetricOverflow && !isDimensionExpanded ? (
              <div className={styles.collapseButton}>
                {isMetricExpanded ? (
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    className="dbn-p-1"
                    onClick={() => setIsMetricExpanded(false)}
                  >
                    <Ui.Button
                      variant="popover"
                      className="dbn-rotate-90"
                      fitContainer
                    >
                      <Ui.Icons name="double-arrow-left" size="xxs" />
                    </Ui.Button>
                  </div>
                ) : (
                  <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={() => {}}
                    className="dbn-p-1"
                    onClick={() => setIsMetricExpanded(true)}
                  >
                    <Ui.Button
                      variant="popover"
                      className="-dbn-rotate-90"
                      fitContainer
                    >
                      <Ui.Icons name="double-arrow-left" size="xxs" />
                    </Ui.Button>
                  </div>
                )}
              </div>
            ) : null}
            {selectedMetrics.map((col, index) => {
              const aggregates = functionOptions(col);
              const validAggregates = [
                ...aggregates.filter((v) =>
                  consts.aggregateStrings.includes(v.value)
                ),
                {
                  value: 'NONE',
                  label: 'Original Value',
                },
              ];
              return (
                <Ui.DraggableItem
                  key={col.alias}
                  identifier={{
                    id: col.alias,
                    type:
                      col.configType === 'AGGREGATE'
                        ? 'aggregate_metrics'
                        : 'metrics',
                  }}
                  data={col.draggableItemData}
                  CustomDragPreview={
                    <span className={styles.dragPreview}>{col.alias}</span>
                  }
                  modifiers={dragItemModifier}
                  renderItem={(setDragNodeRef: React.MutableRefObject<any>) => {
                    return (
                      <span
                        className={styles.listVal}
                        data-dbn-sorting-index={index}
                        ref={setDragNodeRef}
                      >
                        {!METRIC_CREATE_MODES.includes(col.type) && (
                          <Ui.PopoverMenu
                            buttonContent={
                              <Ui.Icons name="caret-down-fill" size="xs" />
                            }
                            position="bottom-start"
                            offset={[0, 10]}
                          >
                            <div className="dbn-p-2">
                              {validAggregates?.map((aggregate) => (
                                <Ui.Button
                                  key={aggregate.value}
                                  variant="popover"
                                  className={`dbn-justify-between dbn-w-full hover:dbn-bg-gray-3 dbn-px-2 dbn-py-1 ${
                                    col.helperFunction === aggregate.value
                                      ? 'dbn-bg-gray-50'
                                      : ''
                                  }`}
                                  onClick={() =>
                                    onChangeHelperFunction({
                                      column: col,
                                      helperFunction: aggregate,
                                      type: 'METRIC',
                                    })
                                  }
                                >
                                  <span>{aggregate.label}</span>
                                </Ui.Button>
                              ))}
                            </div>
                          </Ui.PopoverMenu>
                        )}
                        {col.type === 'CUSTOM' && (
                          <Ui.PopoverMenu
                            buttonContent={
                              <Ui.Button
                                variant="popover"
                                onClick={() => setColumnSqlValue(col.sql || '')}
                              >
                                <Ui.Icons name="caret-down-fill" size="xs" />
                              </Ui.Button>
                            }
                            position="bottom-start"
                            offset={[0, 10]}
                            tabMenu
                            menuWidth="360px"
                          >
                            <div className={styles.sqlModal}>
                              <div className={styles.createSqlTab}>
                                <div className={styles.customConfigEditor}>
                                  <AceEditorSql
                                    editorRef={editorRef}
                                    onChange={(value: string) => {
                                      setColumnSqlValue(value);
                                    }}
                                    value={columnSqlValue}
                                    onExecute={() => {}}
                                  />
                                </div>
                              </div>
                              <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-h-[50px] dbn-items-end dbn-justify-between">
                                <Ui.Button
                                  variant="secondary"
                                  data-closepopover
                                >
                                  Cancel
                                </Ui.Button>
                                <Ui.Button
                                  variant="primary"
                                  data-closepopover
                                  onClick={() =>
                                    onUpdateCustomSqlColumn({
                                      column: col,
                                      sql: columnSqlValue,
                                      type: 'METRIC',
                                    })
                                  }
                                >
                                  Save
                                </Ui.Button>
                              </div>
                            </div>
                          </Ui.PopoverMenu>
                        )}
                        {!isPythonMode ? (
                          <Ui.PopoverMenu
                            buttonContent={
                              <Ui.Button
                                variant="popover"
                                className="dbn-border-b dbn-border-b-transparent hover:dbn-border-b hover:dbn-border-b-black dbn-text-xs"
                                onClick={() => {
                                  setAliasColumnValue(col.alias);
                                  setCastColumnAs(
                                    col.cast ||
                                      consts.CAST_COLUMN_AS[
                                        consts.CAST_COLUMN_AS.length - 1
                                      ]
                                  );
                                  setIsColumnCasted(false);
                                }}
                              >
                                {col.alias}
                              </Ui.Button>
                            }
                            position="bottom-start"
                            menuWidth="dbn-w-[400px]"
                            tabMenu
                          >
                            <div className="dbn-flex dbn-flex-col dbn-w-full dbn-items-center dbn-justify-center dbn-p-3 dbn-gap-3">
                              <Ui.InputField
                                label={col?.name}
                                defaultValue={aliasColumn?.label}
                                onChange={(e) =>
                                  setAliasColumnValue(e.target.value)
                                }
                                value={aliasColumnValue}
                              />
                              {!['CUSTOM', 'ARITHMETIC'].includes(col.type) && (
                                <Ui.FloatingDropDown
                                  onChange={(option) => {
                                    setCastColumnAs(option);
                                    setIsColumnCasted(true);
                                  }}
                                  options={consts.CAST_COLUMN_AS}
                                  selectedOption={castColumnAs}
                                  label="Cast Column As"
                                  buttonWidth="300px"
                                  menuWidth="300px"
                                />
                              )}
                              <div className="dbn-flex  dbn-w-full dbn-items-center dbn-justify-between">
                                <Ui.Button
                                  variant="secondary"
                                  data-closepopover
                                >
                                  Cancel
                                </Ui.Button>
                                <Ui.Button
                                  variant="primary"
                                  data-closepopover
                                  onClick={() => {
                                    onChangeAlias({
                                      alias: aliasColumnValue || col.alias,
                                      column: col,
                                      type: 'METRIC',
                                      cast: castColumnAs,
                                      isColumnCasted,
                                    });
                                  }}
                                >
                                  Save
                                </Ui.Button>
                              </div>
                            </div>
                          </Ui.PopoverMenu>
                        ) : (
                          <Ui.Button
                            variant="popover"
                            className="dbn-border-b dbn-border-b-transparent dbn-text-xs"
                          >
                            {col.alias}
                          </Ui.Button>
                        )}
                        <span
                          className={styles.removeColumn}
                          role="button"
                          tabIndex={0}
                          onKeyDown={() => {}}
                          onClick={() => {
                            onRemoveColumn({
                              column: col,
                              type: 'METRIC',
                            });
                          }}
                        >
                          X
                        </span>
                      </span>
                    );
                  }}
                />
              );
            })}
            {selectedMetrics.length === 0 ? (
              <Ui.Text variant="body-text-sm" color="secondary">
                Drag and Drop your Columns here
              </Ui.Text>
            ) : null}
          </div>
          {!(isSqlTab || isPythonMode) && (
            <Ui.Flex alignItems="center" justify="center">
              <ArithmeticFunctionPopup
                props={{
                  columnOptions: arithmeticColumnOptions,
                  isHovered: isMetricHoveredState.isHovered,
                  type: 'METRIC',
                  onSaveArithMetricOption,
                }}
              />
            </Ui.Flex>
          )}
          {!(isSqlTab || isPythonMode) && (
            <div className={styles.sqlHoverBtn}>
              <>
                <Ui.PopoverMenu
                  tabMenu
                  getIsOpen={(isOpen) => {
                    setIsMetricHoveredState((prev) => ({
                      ...prev,
                      isPopoverOpen: isOpen,
                    }));
                  }}
                  menuWidth="360px"
                  offset={[18, 10]}
                  buttonContent={
                    isMetricHoveredState.isHovered ? (
                      <Ui.Button
                        variant="popover"
                        className="dbn-bg-primary dbn-text-white dbn-text-xs dbn-px-2 dbn-py-1 dbn-rounded-xl dbn-flex dbn-gap-0.5"
                      >
                        <Ui.Icons name="plus" size="xs" color="white" />
                        SQL
                      </Ui.Button>
                    ) : (
                      <></>
                    )
                  }
                >
                  <div className={styles.sqlModal}>
                    {createNewColumnError.map((error) => (
                      <Ui.Alert text={error} key={error} variant="error" />
                    ))}
                    <div className={styles.createSqlTab}>
                      {isShowAlertInfo ? (
                        <Ui.Alert
                          text={
                            currentTableType === 'custom'
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

                      <Ui.FloatingDropDown
                        buttonWidth="100%"
                        menuWidth="100%"
                        isSearchEnabled
                        onChange={(value) =>
                          setCustomSql((prev) => ({
                            ...prev,
                            tableName: value,
                          }))
                        }
                        options={joinTableOption}
                        selectedOption={customSql?.tableName}
                      />
                      <div className={styles.customConfigEditor}>
                        <AceEditorSql
                          editorRef={editorRef}
                          onChange={(value: string) => {
                            setCustomSql((prev) => ({
                              ...prev,
                              sql: value,
                              isAggregate: true,
                              isDimension: false,
                              isFilter: false,
                            }));
                          }}
                          value={customSql?.sql}
                          onExecute={() => {}}
                        />
                      </div>
                      <Ui.InputField
                        type="text"
                        label="Query Name"
                        placeholder="name"
                        onChange={(e) =>
                          setCustomSql((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        value={customSql.name}
                      />
                    </div>
                    <div className="dbn-w-full dbn-flex dbn-border-t dbn-border-secondary dbn-h-[50px] dbn-items-end dbn-justify-between">
                      <Ui.Button variant="secondary" data-closepopover>
                        Cancel
                      </Ui.Button>
                      <Ui.Button
                        variant="primary"
                        onClick={() => onSaveCustomSQLColumn('METRIC')}
                      >
                        Add
                      </Ui.Button>
                    </div>
                  </div>
                </Ui.PopoverMenu>
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragAndDropComponent;
