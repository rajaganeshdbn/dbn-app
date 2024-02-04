import { Ui } from '@databrainhq/plugin';
import { asEmail, required } from 'consts/validations';
import CompletedStatus from 'components/CompletedStatus';
import AccessControl from 'components/AccessControl';
import useSharingSettings from 'hooks/useSharingSettings';
import useAccessControl from 'hooks/useAccessControl';
import styles from './smtp.module.css';

const SmtpSettingsForm = () => {
  const {
    errors,
    register,
    error,
    onSumbit,
    isLoading,
    isSuccess,
    isLoadingSettings,
    isEnableScheduledSettings,
    setEnableScheduledSettings,
    onReset,
  } = useSharingSettings();
  const { getIsCanAccess } = useAccessControl();
  return (
    <div className={styles['form-container']}>
      <div>
        <Ui.Text variant="body-text">Email Settings</Ui.Text>
        <Ui.Text variant="body-text-sm">
          Configure email settings that appear during scheduled reports
        </Ui.Text>
      </div>
      <form
        className={styles['form-wrapper']}
        onSubmit={
          getIsCanAccess('scheduledSettings', 'Edit') ? onSumbit : undefined
        }
        onReset={
          getIsCanAccess('scheduledSettings', 'Delete') ? onReset : undefined
        }
      >
        <Ui.Switch
          enabled={isEnableScheduledSettings}
          onChange={(value) => setEnableScheduledSettings(value)}
          placeholder={isEnableScheduledSettings ? 'Enabled' : 'Disabled'}
          defaultEnabled={isEnableScheduledSettings}
          isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
        />
        {isEnableScheduledSettings && (
          <>
            <Ui.InputField
              label="SMTP Host"
              placeholder="email-smtp.us-east-1.amazonaws.com"
              type="text"
              required
              error={errors.host?.message}
              register={register('host', required)}
              isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
            />
            <Ui.InputField
              label="SMTP Port"
              placeholder="465"
              required
              type="number"
              error={errors.port?.message}
              register={register('port', required)}
              isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
            />
            <Ui.InputField
              label="SMTP Username"
              placeholder="AKIA54ZWWTSRGDPSIJY8"
              type="text"
              required
              error={errors.username?.message}
              register={register('username', required)}
              isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
            />
            <Ui.InputField
              label="SMTP Password"
              placeholder="***************************"
              type="password"
              required
              error={errors.password?.message}
              register={register('password', required)}
              isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
            />

            <Ui.InputField
              label="From Address"
              placeholder="support@domain.com"
              type="email"
              required
              error={errors.fromAddress?.message}
              register={register('fromAddress', asEmail)}
              isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
            />
            <Ui.InputField
              label="Reply-to Address"
              placeholder="reply@domain.com"
              type="email"
              required
              error={errors.replyToAddress?.message}
              register={register('replyToAddress', asEmail)}
              isDisabled={!getIsCanAccess('scheduledSettings', 'Edit')}
            />
            {error && <Ui.Error message={error} />}
          </>
        )}
        <AccessControl feature="scheduledSettings" permission="Edit">
          <div
            className={`dbn-flex dbn-justify-end dbn-items-center dbn-gap-2 ${
              isLoading
                ? 'disabled:dbn-cursor-progress'
                : 'disabled:dbn-cursor-not-allowed'
            }`}
          >
            <AccessControl feature="scheduledSettings" permission="Delete">
              <Ui.Button variant="tab" type="reset">
                Clear
              </Ui.Button>
            </AccessControl>
            <Ui.Button
              variant="primary"
              type="submit"
              isDisabled={isLoading || isLoadingSettings}
            >
              {isEnableScheduledSettings ? 'Authenticate' : 'Save'}
            </Ui.Button>
          </div>
          {isSuccess && (
            <CompletedStatus text="Scheduled Settings Updated Successfully!" />
          )}
        </AccessControl>
      </form>
    </div>
  );
};

export default SmtpSettingsForm;
