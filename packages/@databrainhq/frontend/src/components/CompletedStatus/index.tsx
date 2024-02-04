import React from 'react';
import { Ui } from '@databrainhq/plugin';

type CompletedStatusProps = {
  text?: string;
};

const CompletedStatus: React.FC<CompletedStatusProps> = ({
  text = 'Completed',
}) => {
  return (
    <div className="dbn-flex dbn-items-center dbn-gap-2">
      <Ui.Text variant="body-text-sm" color="success">
        {text}
      </Ui.Text>
    </div>
  );
};

export default React.memo(CompletedStatus);
