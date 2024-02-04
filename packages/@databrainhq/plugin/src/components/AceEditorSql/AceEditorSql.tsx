import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import ReactAce from 'react-ace/lib/ace';

interface Props {
  onChange?: any;
  value?: string;
  onExecute?: (value?: string) => void;
  editorRef: React.RefObject<ReactAce>;
}

const AceEditorSql = ({ onChange, value, onExecute, editorRef }: Props) => {
  return (
    <>
      <AceEditor
        ref={editorRef}
        name="query"
        placeholder="Write your SQL query here"
        value={value}
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
          tabSize: 3,
          useWorker: true,
        }}
        wrapEnabled
      />
    </>
  );
};

export default AceEditorSql;
