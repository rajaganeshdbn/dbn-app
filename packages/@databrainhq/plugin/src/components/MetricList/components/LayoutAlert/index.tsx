import React from 'react';
import { Button, Alert } from '@/components';

export type LayoutAlertProps = {
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
};

export const LayoutAlert = ({
  onCancel,
  onSave,
  isLoading,
}: LayoutAlertProps) => {
  return (
    <>
      <Alert
        text="It seems like you have made changes to the layout. Please click on
            the save button to save the changes to the layout."
      >
        <Button variant="tab" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={onSave}
          isDisabled={isLoading}
        >
          Save
        </Button>
      </Alert>
    </>
  );
};
