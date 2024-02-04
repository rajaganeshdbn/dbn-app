/* eslint-disable react/jsx-props-no-spreading */
import { Ui } from '@databrainhq/plugin';
import Results, { ResultsProp } from './Results';

type PreviewCustomSqlResultModalProps = {
  props: ResultsProp & { modalProp: Ui.ModalProps };
};

const PreviewCustomSqlResultModal = ({
  props: { config, modalProp },
}: PreviewCustomSqlResultModalProps) => {
  return (
    <Ui.Modal {...modalProp}>
      <div className="dbn-w-[95vw] dbn-h-[80vh]">
        <Results config={config} className="dbn-h-full" />
      </div>
    </Ui.Modal>
  );
};

export default PreviewCustomSqlResultModal;
