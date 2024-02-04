/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/dot-notation */
import { format } from 'sql-formatter';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactAce from 'react-ace/lib/ace';
import { Ui, consts, types } from '@databrainhq/plugin';
import { MetricsValue } from 'types';
import { DatasetMetricCreationConfiguration } from 'types/metric';
import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
import Flex from 'components/Flex';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';
import styles from './metricSqlEditor.module.css';

type Props = Pick<Ui.PanelProps, 'isOpen' | 'onClose' | 'side'> & {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  subQuery: string;
  setSubQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setSqlTab: React.Dispatch<React.SetStateAction<boolean>>;
  onSync: () => void;
  selectedTable: types.FloatingDropDownOption;
  onChangeMode: () => void;
  isSqlTab: boolean;
  limit?: string;
  setLimit?: React.Dispatch<React.SetStateAction<string>>;
  databaseName?: string;
  onGenerateChart: ({
    param,
    metricParams,
    dimensionParams,
    createdDimensionParams,
    createdMetricParams,
    prevLimit,
  }: {
    param?: DatasetMetricCreationConfiguration | undefined;
    metricParams?: types.FloatingDropDownOption[] | undefined;
    dimensionParams?: types.FloatingDropDownOption[] | undefined;
    createdMetricParams?: types.FloatingDropDownOption[] | undefined;
    createdDimensionParams?: types.FloatingDropDownOption[] | undefined;
    selectedCustomMetric?: MetricsValue[];
    selectedCustomDim?: MetricsValue[];
    prevLimit?: string;
  }) => void;
};
type SqlContainerProps = {
  isMaximized: boolean;
  setMaximize: React.Dispatch<React.SetStateAction<boolean>>;
  subQuery: string;
  setSubQuery: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  isLoading?: boolean;
  isSqlTab: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTable: types.FloatingDropDownOption;
  formatQuery: (value: string) => void;
  onSync: () => void;
  setSqlTab: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeMode: () => void;
};
type GeneratedSqlContainerProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isSqlTab: boolean;
  setSqlTab: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeMode: () => void;
  setSubQuery: React.Dispatch<React.SetStateAction<string>>;
};
const SqlContainer = ({
  props: {
    isMaximized,
    setMaximize,
    setSubQuery,
    onClose,
    subQuery,
    isLoading,
    isSqlTab,
    selectedTable,
    setShowAlert,
    formatQuery,
    onSync,
    onChangeMode,
    setSqlTab,
  },
}: {
  props: SqlContainerProps;
}) => {
  const editorRef = useRef() as React.RefObject<ReactAce>;
  const { getIsCanAccess } = useAccessControl();
  const handleUndo = useCallback(() => {
    if (editorRef.current) editorRef.current.editor.execCommand('undo');
  }, [subQuery]);
  const handleReDo = useCallback(() => {
    if (editorRef.current) editorRef.current.editor.execCommand('redo');
  }, [subQuery]);
  return (
    <div
      className={styles.sqlWriter}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.query}>
        <div className="dbn-flex dbn-w-full dbn-justify-end dbn-items-center">
          <Ui.NewTooltip position="left" text="Undo">
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={handleUndo}
              title="Undo"
            >
              <Ui.Icons name="undo" />
            </Ui.Button>
          </Ui.NewTooltip>
          <Ui.NewTooltip position="left" text="Redo">
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={handleReDo}
              title="Redo"
            >
              <Ui.Icons name="redo" />
            </Ui.Button>
          </Ui.NewTooltip>
          <Ui.NewTooltip
            position="left"
            text={isMaximized ? 'Minimize' : 'Maximize'}
          >
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={() => setMaximize((prev) => !prev)}
              title={isMaximized ? 'minimize' : 'maximize'}
              className="dbn-mt-2 dbn-ml-2 dbn-border-l"
            >
              <Ui.Icons name={isMaximized ? 'minimize' : 'maximize'} />
            </Ui.Button>
          </Ui.NewTooltip>
          {/* <Ui.NewTooltip position="left" text="Close Editor">
            <Ui.Button
              type="button"
              variant="tertiary"
              title="Close"
              onClick={onClose}
            >
              <Ui.Icons name="cross" />
            </Ui.Button>
          </Ui.NewTooltip> */}
        </div>
      </div>
      <div className={styles.editor}>
        <AceEditorSql
          value={subQuery}
          onChange={setSubQuery}
          // onExecute={onExecute}
          editorRef={editorRef}
          isDisabled={!getIsCanAccess('sql', 'Edit')}
        />
      </div>
      <div className={styles.runQuery}>
        <div className="dbn-flex dbn-gap-2 dbn-items-center dbn-w-full">
          <AccessControl feature="sql" permission="Edit">
            <Ui.Switch
              name="enable sql mode"
              placeholder="SQL Mode"
              onChange={() => {
                setSqlTab(!isSqlTab);
                onChangeMode();
              }}
              enabled={isSqlTab}
            />
            <Ui.InfoTooltip
              text="This action will reset all your previous selections"
              position="top"
            />
          </AccessControl>
        </div>
        <div className="dbn-flex dbn-w-full dbn-justify-end dbn-gap-2 dbn-items-center">
          {/* {limit && setLimit && (
              <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-w-full">
                <Ui.Text variant="body-text">
                  <span className="dbn-whitespace-nowrap">Apply Limit:</span>
                </Ui.Text>
                <Ui.FloatingDropDown
                  options={consts.RowLimitList}
                  selectedOption={{ label: limit, value: limit }}
                  onChange={(v) => {
                    setLimit(v.value);
                    onGenerateChart({
                      prevLimit: v.value,
                    });
                  }}
                  labelVariant="static"
                  buttonWidth="100px"
                  menuWidth="150px"
                />
              </div>
            )} */}
          <AccessControl feature="sql" permission="Edit">
            <Ui.Button
              type="button"
              variant="secondary"
              isDisabled={!subQuery || isLoading}
              onClick={() => {
                // formatQuery(query.replace(/"/g, '`'));
                formatQuery(subQuery);
              }}
              title="Format Query"
            >
              <Ui.Icons name="format" /> Format Query
            </Ui.Button>
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={!subQuery || isLoading || !isSqlTab}
              title="Run Query"
              fitContainer
              onClick={() => {
                if (selectedTable.value.length) {
                  setShowAlert(true);
                } else {
                  onSync();
                  setSqlTab(true);
                  setShowAlert(false);
                  onClose();
                }
              }}
            >
              Run Query
            </Ui.Button>
          </AccessControl>
        </div>
      </div>
    </div>
  );
};
const GeneratedSqlContainer = ({
  props: { isSqlTab, query, setQuery, setSqlTab, onChangeMode, setSubQuery },
}: {
  props: GeneratedSqlContainerProps;
}) => {
  const GenerateEditorRef = useRef() as React.RefObject<ReactAce>;

  return (
    <div
      className={styles.sqlWriter}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* <div className="dbn-flex dbn-justify-center dbn-items-center">
          <Ui.NewTooltip position="left" text="Undo">
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={handleUndo}
              title="Undo"
            >
              <Ui.Icons name="undo" />
            </Ui.Button>
          </Ui.NewTooltip>
          <Ui.NewTooltip position="left" text="Redo">
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={handleReDo}
              title="Redo"
            >
              <Ui.Icons name="redo" />
            </Ui.Button>
          </Ui.NewTooltip>
          <Ui.NewTooltip
            position="left"
            text={isMaximized ? 'Minimize' : 'Maximize'}
          >
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={() => setMaximize((prev) => !prev)}
              title={isMaximized ? 'minimize' : 'maximize'}
            >
              <Ui.Icons name={isMaximized ? 'minimize' : 'maximize'} />
            </Ui.Button>
          </Ui.NewTooltip>
          <Ui.NewTooltip position="left" text="Close Editor">
            <Ui.Button
              type="button"
              variant="tertiary"
              title="Close"
              onClick={onClose}
            >
              <Ui.Icons name="cross" />
            </Ui.Button>
          </Ui.NewTooltip>
        </div> */}
      <div className={styles.editor2}>
        <AceEditorSql
          value={query}
          onChange={setQuery}
          // onExecute={onExecute}
          isDisabled
          editorRef={GenerateEditorRef}
          placeholder="Drag & Drop rows or columns to get the generated SQL. Switch on SQL mode to customize."
        />
      </div>
      <div className={styles.runQuery}>
        <div className="dbn-flex dbn-gap-2 dbn-items-center">
          <Ui.Switch
            name="enable sql mode"
            placeholder="SQL Mode"
            onChange={() => {
              setSqlTab(!isSqlTab);
              if (!isSqlTab) setSubQuery(query);
              onChangeMode();
            }}
            enabled={isSqlTab}
          />
          <Ui.InfoTooltip
            text="This action will reset all your previous selections"
            position="top"
          />
        </div>
        {/* <div className="dbn-flex dbn-gap-2 dbn-items-center">
            {limit && setLimit && (
              <div className="dbn-flex dbn-items-center dbn-gap-2 dbn-w-full">
                <Ui.Text variant="body-text">
                  <span className="dbn-whitespace-nowrap">Apply Limit:</span>
                </Ui.Text>
                <Ui.FloatingDropDown
                  options={consts.RowLimitList}
                  selectedOption={{ label: limit, value: limit }}
                  onChange={(v) => {
                    setLimit(v.value);
                    onGenerateChart({
                      prevLimit: v.value,
                    });
                  }}
                  labelVariant="static"
                  buttonWidth="100px"
                  menuWidth="150px"
                />
              </div>
            )}
            <Ui.Button
              type="button"
              variant="secondary"
              isDisabled={!query || isLoading}
              onClick={() => {
                // formatQuery(query.replace(/"/g, '`'));
                formatQuery(query);
              }}
              title="Format Query"
            >
              <Ui.Icons name="format" /> Format Query
            </Ui.Button>
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={!query || isLoading || !isSqlTab}
              title="Run Query"
              fitContainer
              onClick={() => {
                if (selectedTable.value.length) {
                  setShowAlert(true);
                } else {
                  onSync();
                  setSqlTab(true);
                  setShowAlert(false);
                  onClose();
                }
              }}
            >
              Run Query
            </Ui.Button>
          </div> */}
      </div>
    </div>
  );
};

const SqlPanel = ({
  query,
  setQuery,
  isLoading,
  isOpen,
  onClose,
  setSqlTab,
  onSync,
  selectedTable,
  onChangeMode,
  isSqlTab,
  limit,
  setLimit,
  onGenerateChart,
  setSubQuery,
  subQuery,
  databaseName,
}: Props) => {
  const [isMaximized, setMaximize] = useState(false);
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const formatQuery = useCallback(
    (value: string) => {
      // setQuery(format(value, { language: 'mysql' }).replace(/`/g, '"'));
      setSubQuery(format(value, { language: databaseName || 'mysql' }));
    },
    [subQuery]
  );

  return (
    <>
      <Ui.Panel
        isOpen={isOpen}
        onClose={onClose}
        hideFooter
        side="right"
        size={isMaximized ? 'large' : 'medium'}
        hideHeader
      >
        <div className="dbn-h-full dbn-w-full">
          {isSqlTab ? (
            <Ui.Tabs.Context className="dbn-h-[90%]">
              <Ui.Tabs.List>
                <Ui.Tabs.Tab tabId="tab1" grow>
                  <Ui.Text variant="body-text-sm">SQL</Ui.Text>
                </Ui.Tabs.Tab>
                <Ui.Tabs.Tab tabId="tab2" grow>
                  <Ui.Text variant="body-text-sm">Generated SQL</Ui.Text>
                </Ui.Tabs.Tab>
                <div className="dbn-absolute dbn-right-0">
                  <Ui.NewTooltip position="left" text="Close Editor">
                    <Ui.Button
                      type="button"
                      variant="tertiary"
                      title="Close"
                      onClick={onClose}
                    >
                      <Ui.Icons name="cross" />
                    </Ui.Button>
                  </Ui.NewTooltip>
                </div>
              </Ui.Tabs.List>
              <Ui.Tabs.Panel tabId="tab1" className="dbn-h-full">
                <SqlContainer
                  props={{
                    onChangeMode,
                    formatQuery,
                    isLoading,
                    isMaximized,
                    isSqlTab,
                    onClose,
                    onSync,
                    selectedTable,
                    setMaximize,
                    setShowAlert,
                    setSqlTab,
                    setSubQuery,
                    subQuery,
                  }}
                />
              </Ui.Tabs.Panel>
              <Ui.Tabs.Panel tabId="tab2" className="dbn-h-full">
                <GeneratedSqlContainer
                  props={{
                    isSqlTab,
                    onChangeMode,
                    query,
                    setQuery,
                    setSqlTab,
                    setSubQuery,
                  }}
                />
              </Ui.Tabs.Panel>
            </Ui.Tabs.Context>
          ) : (
            <Flex direction="col" className="dbn-h-full">
              <div className="dbn-p-3 dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
                <Ui.Text variant="heading">Generated SQL</Ui.Text>
                <Ui.NewTooltip position="left" text="Close Editor">
                  <Ui.Button
                    type="button"
                    variant="tertiary"
                    title="Close"
                    onClick={onClose}
                  >
                    <Ui.Icons name="cross" />
                  </Ui.Button>
                </Ui.NewTooltip>
              </div>
              <GeneratedSqlContainer
                props={{
                  isSqlTab,
                  onChangeMode,
                  query,
                  setQuery,
                  setSqlTab,
                  setSubQuery,
                }}
              />
            </Flex>
          )}
        </div>
      </Ui.Panel>
      <Ui.Modal
        isOpen={isShowAlert && !!selectedTable.value}
        onClose={() => setShowAlert(!isShowAlert)}
        headerTitle="Sync Query"
      >
        <div className="dbn-w-[450px] dbn-p-4">
          <Ui.Alert
            text="This action will reset all your previous selections"
            variant="warning"
          />
        </div>
        <Ui.ModalFooter>
          <Ui.Button variant="secondary" onClick={() => setShowAlert(false)}>
            Cancel
          </Ui.Button>
          <Ui.Button
            variant="primary"
            onClick={() => {
              onSync();
              setShowAlert(false);
              onClose();
            }}
          >
            Sync
          </Ui.Button>
        </Ui.ModalFooter>
      </Ui.Modal>
    </>
  );
};

export default SqlPanel;
