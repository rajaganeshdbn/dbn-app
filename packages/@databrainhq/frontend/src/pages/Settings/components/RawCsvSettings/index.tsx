/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-relative-parent-imports */
import SettingsLayout from 'pages/Settings';
import { Ui } from '@databrainhq/plugin';
import { required } from 'consts/validations';
import CompletedStatus from 'components/CompletedStatus';
import useRawCsvSettings from 'hooks/useRawCsvSettings';
import styles from './rawcsv.module.css';
import useAccessControl from 'hooks/useAccessControl';
import AccessControl from 'components/AccessControl';

const ExpireTimeOptions = [
  { label: 'Seconds', value: 'Seconds' },
  { label: 'Minutes', value: 'Minutes' },
  { label: 'Hours', value: 'Hours' },
  { label: 'Days', value: 'Days' },
];

type RawCsvSettingsProps = {
  isShowLayout?: boolean;
};

const RawCsvSettings = ({ isShowLayout = true }: RawCsvSettingsProps) => {
  const {
    error,
    isDisableButton,
    isLoadingRawCsvSettings,
    isSuccess,
    onSubmit,
    register,
    setValue,
    watch,
    minExpireTime,
    isEnableDownloadSettings,
    setEnableDownloadSettings,
    errors,
  } = useRawCsvSettings();
  const { getIsCanAccess } = useAccessControl();

  const Content = (
    <div className="dbn-w-full dbn-h-full">
      <div className={styles.wrapper}>
        <form onSubmit={onSubmit} className={styles.formContainer}>
          <Ui.Text variant="heading-lg">Download Settings</Ui.Text>
          <Ui.Text variant="body-text-sm">
            Allow end user to do raw download by temporarily storing in our s3
          </Ui.Text>
          <Ui.Switch
            enabled={isEnableDownloadSettings}
            onChange={(value) => setEnableDownloadSettings(value)}
            placeholder={isEnableDownloadSettings ? 'Enabled' : 'Disabled'}
            defaultEnabled={isEnableDownloadSettings}
            isDisabled={!getIsCanAccess('downloadSettings', 'Edit')}
          />
          {isEnableDownloadSettings && (
            <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-items-end">
              <Ui.InputField
                register={register('expireTime', required)}
                label="Date Time of Expiry"
                type="number"
                min={minExpireTime}
                defaultValue={30}
                isDisabled={!getIsCanAccess('downloadSettings', 'Edit')}
                error={errors.expireTime?.message}
              />
              <Ui.FloatingDropDown
                selectedOption={{
                  label: watch('expireTimeIn') || 'Minutes',
                  value: watch('expireTimeIn') || 'Minutes',
                }}
                options={ExpireTimeOptions}
                onChange={(option) => setValue('expireTimeIn', option.value)}
                menuWidth="200px"
                isDisabled={!getIsCanAccess('downloadSettings', 'Edit')}
              />
            </div>
          )}
          {error && <Ui.Error message={error} />}
          <AccessControl feature="downloadSettings" permission="Edit">
            <div className="dbn-flex dbn-item-center dbn-justify-between">
              <Ui.Button
                variant="primary"
                type="submit"
                isDisabled={isDisableButton || isLoadingRawCsvSettings}
              >
                Save
              </Ui.Button>
              {isSuccess && (
                <CompletedStatus text="Saved settings successfully!" />
              )}
            </div>
          </AccessControl>
        </form>
      </div>
    </div>
  );
  return isShowLayout ? <SettingsLayout>{Content}</SettingsLayout> : Content;
};

export default RawCsvSettings;
