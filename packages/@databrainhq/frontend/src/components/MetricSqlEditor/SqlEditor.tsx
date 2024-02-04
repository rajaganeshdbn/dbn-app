/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/dot-notation */
import { format } from 'sql-formatter';
import { useCallback, useRef } from 'react';
import ReactAce from 'react-ace/lib/ace';
import { Ui, consts } from '@databrainhq/plugin';
import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
import styles from './metricSqlEditor.module.css';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  setLimit?: React.Dispatch<React.SetStateAction<string>>;
  limit?: string;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  onExecute: (queryValue?: string) => void;
};
const SqlEditor = ({
  query,
  setQuery,
  isLoading,
  limit,
  setLimit,
  onSubmit,
  onExecute,
}: Props) => {
  const formatQuery = useCallback((value: string) => {
    // setQuery(format(value, { language: 'mysql' }).replace(/`/g, '"'));
    setQuery(format(value, { language: 'mysql' }));
  }, []);

  const editorRef = useRef() as React.RefObject<ReactAce>;
  const handleUndo = useCallback(() => {
    if (editorRef.current) editorRef.current.editor.execCommand('undo');
  }, []);
  const handleReDo = useCallback(() => {
    if (editorRef.current) editorRef.current.editor.execCommand('redo');
  }, []);
  return (
    <>
      <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-relative">
        <form className={`${styles.sqlWriter}`} onSubmit={onSubmit}>
          <div className={styles.query}>
            <Ui.Text variant="heading-lg">SQL Query</Ui.Text>
            <div className="dbn-flex dbn-items-center">
              <Ui.Button
                type="button"
                variant="tertiary"
                onClick={handleUndo}
                leftIcon={
                  <Ui.NewTooltip text="undo">
                    <Ui.Icons name="undo" />
                  </Ui.NewTooltip>
                }
              />
              <Ui.Button
                type="button"
                variant="tertiary"
                onClick={handleReDo}
                leftIcon={
                  <Ui.NewTooltip text="redo">
                    <Ui.Icons name="redo" />
                  </Ui.NewTooltip>
                }
              />
            </div>
          </div>
          <div className={styles.editor}>
            <AceEditorSql
              value={query}
              onChange={setQuery}
              onExecute={onExecute}
              editorRef={editorRef}
            />
          </div>
          <div className={styles.runQuery}>
            {limit && setLimit && (
              <div className="dbn-w-full dbn-flex dbn-gap-2 dbn-items-center">
                <Ui.Text>Apply Limit:</Ui.Text>
                <div className="dbn-w-full">
                  <Ui.FloatingDropDown
                    options={consts.RowLimitList}
                    selectedOption={{ label: limit, value: limit }}
                    onChange={(v) => setLimit(v.value)}
                    labelVariant="static"
                  />
                </div>
              </div>
            )}
            <Ui.Button
              type="button"
              variant="tertiary"
              isDisabled={!query || isLoading}
              onClick={() => {
                // formatQuery(query.replace(/"/g, '`'));
                formatQuery(query);
              }}
            >
              Format Query
            </Ui.Button>
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={!query || isLoading}
            >
              Run Query
            </Ui.Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SqlEditor;
