import React from 'react';
import styles from './archive.module.css';
import {
  ModalProps,
  Modal,
  ModalFooter,
  Text,
  Button,
  Icons,
} from '@/components';

export interface ArchiveMetricModalProps
  extends Omit<ModalProps, 'headerTitle'> {
  onArchive: () => void;
  isLoading: boolean;
}

export const ArchiveMetricModal = ({
  isOpen,
  onClose,
  onArchive,
  isLoading,
}: ArchiveMetricModalProps) => {
  return (
    <Modal headerTitle="Archive Metric" isOpen={isOpen} onClose={onClose}>
      <div className={styles.deleteModal}>
        <Icons name="not-found" />
        {/* warning icon */}
        <Text variant="body-text-sm">
          Are you sure you want to archive the metric?
        </Text>
      </div>
      <ModalFooter>
        <Button variant="tab" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="button"
          isDisabled={isLoading}
          onClick={onArchive}
        >
          {isLoading ? 'Archiving...' : 'Archive'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
