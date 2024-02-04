import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import ReactAce from 'react-ace/lib/ace';
import { useEffect } from 'react';

interface Props {
  onChange?: any;
  value?: string;
  defaultValue?: string;
  onExecute?: (value?: string) => void;
  editorRef: React.RefObject<ReactAce>;
  placeholder?: string;
  isDisabled?: boolean;
}

const AceEditorSql = ({
  onChange,
  value,
  onExecute,
  editorRef,
  placeholder,
  isDisabled,
  defaultValue,
}: Props) => {
  return (
    <>
      <AceEditor
        ref={editorRef}
        name="query"
        placeholder={placeholder || 'Write your code here'}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        commands={
          onExecute
            ? [
                {
                  name: 'submit',
                  bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
                  exec: () => onExecute(editorRef.current?.props.value),
                },
              ]
            : undefined
        }
        mode="mysql"
        theme="tomorrow"
        fontSize={16}
        showPrintMargin
        showGutter
        highlightActiveLine
        key="query"
        height="100%"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: true,
        }}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        style={{
          lineHeight: '1.7',
          flex: 1,
          borderRadius: '6px',
          border: '1px solid #0D0D0D1A',
          overflow: 'hidden',
        }}
        wrapEnabled
        readOnly={isDisabled}
      />
    </>
  );
};

export const AceEditorPython = ({
  onChange,
  value,
  onExecute,
  editorRef,
  placeholder,
  isDisabled,
  defaultValue,
}: Props) => {
  return (
    <>
      <AceEditor
        ref={editorRef}
        name="code"
        placeholder={placeholder || 'Write your code here'}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        commands={
          onExecute
            ? [
                {
                  name: 'submit',
                  bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
                  exec: () => onExecute(editorRef.current?.props.value),
                },
              ]
            : undefined
        }
        mode="python"
        theme="monakai"
        fontSize={16}
        showPrintMargin
        showGutter
        highlightActiveLine
        key="code"
        height="100%"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: true,
        }}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        style={{
          lineHeight: '1.7',
          flex: 1,
          borderRadius: '6px',
          border: '1px solid #0D0D0D1A',
          overflow: 'hidden',
        }}
        wrapEnabled
        readOnly={isDisabled}
      />
    </>
  );
};

export default AceEditorSql;
