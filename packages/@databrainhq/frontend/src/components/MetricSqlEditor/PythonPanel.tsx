/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/dot-notation */
import { useCallback, useRef, useState } from 'react';
import ReactAce from 'react-ace/lib/ace';
import { Ui } from '@databrainhq/plugin';
import { AceEditorPython } from 'components/AceEditorSql/AceEditorSql';
import styles from './metricSqlEditor.module.css';
import useAccessControl from 'hooks/useAccessControl';
import AccessControl from 'components/AccessControl';

const DEFAULT_INSTRUCTIONS = `
'''
Please follow the instructions below -
import requests
The above requests module is already available for you in scope.

To use variables please use -
client_id # string 
metric_filters # object with key as filter name and value as the applied value of the filter


typescript representation of metric_filters
type MetricFilters = Record<string, { startDate: Date; endDate: Date } | string | number>;

filter name is to define filter uniquely.
Based on type of filter the value will be of following type: 
STRING: string
DATE: { startDate: Date; endDate: Date }
NUMBER: number

Python typings for the metric filters - 

from typing import Dict, Optional, Union
import datetime

class DateDict:
    startDate: datetime.date
    endDate: datetime.date
    
MetricFilters = Dict[str, Union[DateDict, str, int]]
    
To use Secrets -

secrets['Name of the secret variable']

'secrets' is a dictionary with key as name of the variable and value the value of the variable

e.g. 
url = secrets['BASE_URL']
res = requests.get(url).json()

Please assign your data in result variable like below -
result = [{'key': 'value'}, ...] # and should be array of objects or list of dictonaries
result = requests.get('SOME URL').json()

'''
`;

type Props = Pick<Ui.PanelProps, 'isOpen' | 'onClose' | 'side'> & {
  code: string;
  isLoading?: boolean;
  onChangeMode: (enabled: boolean) => void;
  isPythonMode: boolean;
  onRunCode: (code: string) => void;
};

const PythonPanel = ({
  code,
  isLoading,
  isOpen,
  onClose,
  isPythonMode,
  onChangeMode,
  onRunCode,
}: Props) => {
  const [isMaximized, setMaximize] = useState(false);
  const editorRef = useRef() as React.RefObject<ReactAce>;
  const { getIsCanAccess } = useAccessControl();
  const handleUndo = useCallback(() => {
    if (editorRef.current) editorRef.current.editor.execCommand('undo');
  }, []);
  const handleReDo = useCallback(() => {
    if (editorRef.current) editorRef.current.editor.execCommand('redo');
  }, []);

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
          <div className={styles.sqlWriter}>
            <div className={styles.query}>
              <Ui.Text variant="heading">Python Editor</Ui.Text>
              <div className="dbn-flex dbn-justify-end dbn-items-center">
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
            </div>
            <div className={styles.editor}>
              <AceEditorPython
                onExecute={(value) => onRunCode(value || '')}
                defaultValue={code || DEFAULT_INSTRUCTIONS}
                editorRef={editorRef}
                isDisabled={!getIsCanAccess('python', 'Edit')}
              />
            </div>
            <div className={styles.runQuery}>
              <div className="dbn-flex dbn-gap-2 dbn-items-center dbn-w-full">
                <AccessControl feature="python" permission="Edit">
                  <Ui.Switch
                    name="enable python mode"
                    placeholder="Python Mode"
                    onChange={(enabled) => onChangeMode(enabled)}
                    enabled={isPythonMode}
                  />
                  <Ui.InfoTooltip
                    text="This action will reset all your previous selections"
                    position="top"
                  />
                </AccessControl>
              </div>
              <div className="dbn-flex dbn-w-full dbn-justify-end dbn-gap-2 dbn-items-center">
                <AccessControl feature="python" permission="Edit">
                  <Ui.Button
                    type="button"
                    variant="primary"
                    title="Run Code"
                    fitContainer
                    isDisabled={!isPythonMode || isLoading}
                    onClick={() =>
                      onRunCode(editorRef.current?.editor.getValue() || '')
                    }
                  >
                    Run Code
                  </Ui.Button>
                </AccessControl>
              </div>
            </div>
          </div>
        </div>
      </Ui.Panel>
    </>
  );
};

export default PythonPanel;
