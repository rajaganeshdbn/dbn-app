import React, { useState } from 'react';
import ScheduleEmailForm from './ScheduleEmailForm';
import { Button, Modal } from '@/components';

const ScheduleEmail = () => {
  const [isShowSettings, setShowSettings] = useState<boolean>(false);
  return (
    <div>
      <Button
        variant="tab"
        type="button"
        onClick={() => setShowSettings(true)}
        title="email-sharing"
      >
        Schedule Reports
      </Button>
      <Modal
        isOpen={isShowSettings}
        onClose={() => setShowSettings(false)}
        headerTitle="Schedule Email Reports"
      >
        <ScheduleEmailForm onCancel={() => setShowSettings(false)} />
      </Modal>
    </div>
  );
};

export default ScheduleEmail;
