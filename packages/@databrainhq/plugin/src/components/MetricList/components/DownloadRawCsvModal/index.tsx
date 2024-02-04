import React from 'react';
import styles from './rawCsv.module.css';
import { Button } from '@/components/Button';
import { Error } from '@/components/Error';
import { InputField } from '@/components/InputField';
import { Modal, ModalFooter } from '@/components/Modal';
import { Text } from '@/components/Text';
import useDownloadRawCsv from '@/hooks/useDownloadRawCsv';
import { required } from '@/consts/validations';
import { Icons } from '@/components/Icons';
import { ExternalMetrics } from '@/types/queryTypes';
import { TagInputField } from '@/components/TagInputField';

type Props = {
  onCloseModal: (value: boolean) => void;
  isShowRawCsvModal: boolean;
  metricItem?: ExternalMetrics;

  sharingSettingsId?: string;
  query: string;
};
export const DownloadRawCsvModal = ({
  onCloseModal,
  isShowRawCsvModal,
  metricItem,
  query,
  sharingSettingsId,
}: Props) => {
  // const [rawCsvType, setRawCsvType] = useState(RAW_CSV_OPTIONS[0]);

  const {
    downloadCsvError,
    handleSubmit,
    isLoading,
    onSumbitSendCsvUrl,
    register,
    control,
    setValue,
    isDisableDownloadSettings,
    errors,
  } = useDownloadRawCsv({
    onCloseModal,
    metricItem,
    sharingSettingsId,
  });

  const DownloadEmailCSVForm = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit((values) =>
            onSumbitSendCsvUrl({
              values,
              query,
            })
          )}
        >
          <div className={styles.downloadCsvWrapper}>
            <InputField
              type="subject"
              label="Subject"
              placeholder="enter a subject"
              register={register('subject', required)}
              defaultValue={metricItem?.name}
              error={errors.subject?.message}
            />
            <TagInputField
              control={control}
              type="text"
              label="Send to"
              placeholder="Enter email addresses separated by space or comma"
              onChangeTags={(tags) => setValue('emails', tags)}
            />
            {downloadCsvError && <Error message={downloadCsvError} />}
            <div className={styles.downloadCsvNote}>
              <Icons name="info" />
              <div className={styles.downloadCsvNoteText}>
                <Text variant="heading-lg">Note:</Text>
                <Text variant="body-text-sm">
                  You will shortly receive a mail with CSV download URL to the
                  above email id(s), once you click on Submit
                </Text>
              </div>
            </div>
          </div>
          <ModalFooter>
            <Button
              variant="tab"
              type="button"
              onClick={() => onCloseModal(false)}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              isDisabled={isLoading || isDisableDownloadSettings}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </>
    );
  };

  return (
    <Modal
      isOpen={isShowRawCsvModal}
      onClose={() => onCloseModal(false)}
      headerTitle="Download Raw CSV"
      zIndex={9999}
    >
      <div className={styles.downloadCsv}>
        <DownloadEmailCSVForm />
      </div>
    </Modal>
  );
};

export default React.memo(DownloadRawCsvModal);
