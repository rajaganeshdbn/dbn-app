import { useEffect, useRef } from 'react';
import ReactAce from 'react-ace/lib/ace';
import { Ui } from '@databrainhq/plugin';
import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
import style from './QueryModal.module.css';

const QueryModal = ({
  setShowFullQuery,
  onChange,
  fullQuery,
  onExecute,
}: any) => {
  const wrapperRef = useRef(null);
  const useOutsideAlerter = (wrapRef: any) => {
    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
          setShowFullQuery(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [wrapRef]);
  };
  useOutsideAlerter(wrapperRef);
  const editorRef = useRef() as React.RefObject<ReactAce>;

  return (
    <div className={style['queryModal-container']}>
      <div className={style['queryModal-alt-container']} ref={wrapperRef}>
        <div className={style.header}>
          <Ui.Text variant="heading-lg">SQL Editor</Ui.Text>
        </div>
        <div className={style.body}>
          <AceEditorSql
            value={fullQuery}
            onChange={onChange}
            onExecute={onExecute}
            editorRef={editorRef}
          />
        </div>
        <div className={style.button}>
          <Ui.Button
            type="button"
            variant="tertiary"
            onClick={() => setShowFullQuery(false)}
          >
            <Ui.Icons name="arrow-left" />
            <Ui.Text variant="body-text-sm">Back</Ui.Text>
          </Ui.Button>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
