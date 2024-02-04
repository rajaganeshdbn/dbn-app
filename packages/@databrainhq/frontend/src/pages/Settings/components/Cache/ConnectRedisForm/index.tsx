import { Ui } from '@databrainhq/plugin';
import { required } from 'consts/validations';
import CompletedStatus from 'components/CompletedStatus';
import AccessControl from 'components/AccessControl';
import useCompanyMetricCache from 'hooks/useCompanyMetricCache';
import useAccessControl from 'hooks/useAccessControl';

const ConnectRedisForm = () => {
  const {
    register,
    errors,
    isDisabledSubmitButton,
    onConnect,
    connectionState,
    connectionError,
    isConnected,
    isEnableCaching,
    updateEnableCaching,
    resetCacheData,
    resetStatus,
    watch,
    setValue,
  } = useCompanyMetricCache();
  const { getIsCanAccess } = useAccessControl();
  return (
    <form
      className="dbn-max-w-md dbn-w-full dbn-flex dbn-flex-col dbn-gap-[22px]"
      onSubmit={onConnect}
    >
      <Ui.Switch
        enabled={isEnableCaching}
        onChange={(value) => updateEnableCaching(value)}
        placeholder={isEnableCaching ? 'Enabled' : 'Disabled'}
        defaultEnabled={isEnableCaching}
        isDisabled={!getIsCanAccess('cacheSettings', 'Edit')}
      />
      {isEnableCaching && (
        <>
          <Ui.InputField
            label="Host"
            placeholder="host"
            type="text"
            error={errors.host?.message}
            register={register('host', {
              required: !watch('isDatabrainCache') ? 'Host is required.' : '',
            })}
            isDisabled={
              !getIsCanAccess('cacheSettings', 'Edit') ||
              watch('isDatabrainCache')
            }
          />
          <Ui.InputField
            label="Port"
            placeholder="6379"
            type="number"
            error={errors.port?.message}
            register={register('port', {
              required: !watch('isDatabrainCache') ? 'Port is required.' : '',
            })}
            defaultValue={6379}
            isDisabled={
              !getIsCanAccess('cacheSettings', 'Edit') ||
              watch('isDatabrainCache')
            }
          />
          <Ui.InputField
            label="password"
            placeholder="accessKey, AUTH token"
            type="password"
            error={errors.password?.message}
            register={register('password', {
              required: !watch('isDatabrainCache')
                ? 'Password is required.'
                : '',
            })}
            isDisabled={
              !getIsCanAccess('cacheSettings', 'Edit') ||
              watch('isDatabrainCache')
            }
          />
          <Ui.InputField
            label="Expire Cache (sec)"
            placeholder="86400 sec"
            type="number"
            error={errors.expire?.message}
            register={register('expire', required)}
            defaultValue={86400}
            min={10}
            isDisabled={!getIsCanAccess('cacheSettings', 'Edit')}
          />
          <Ui.SelfHostControl>
            <Ui.Checkbox
              label="Use Databrain Caching"
              onChange={(e) => {
                if (e.target.checked) {
                  setValue('isDatabrainCache', true);
                } else {
                  setValue('isDatabrainCache', false);
                }
              }}
              // register={register('isDatabrainCache')}
              checked={watch('isDatabrainCache')}
            />
          </Ui.SelfHostControl>
          {connectionError && <Ui.Error message={connectionError} />}
          <div className="dbn-flex dbn-justify-between dbn-items-center">
            <AccessControl feature="cacheSettings" permission="Edit">
              <Ui.Button
                type="submit"
                variant="primary"
                isDisabled={isDisabledSubmitButton}
              >
                {isConnected ? 'Update' : 'Connect'}
              </Ui.Button>
            </AccessControl>
            {connectionState === 'AUTHENTICATED' && (
              <CompletedStatus text="Authenticated Successfully!" />
            )}
            {connectionState === 'AUTHENTICATING' && (
              <Ui.Text variant="body-text-sm">Authenticating...</Ui.Text>
            )}
          </div>
          <AccessControl feature="cacheSettings" permission="Delete">
            {isConnected && (
              <div className="dbn-flex dbn-justify-between dbn-items-center">
                <Ui.Button
                  type="button"
                  variant="popover"
                  onClick={() => resetCacheData()}
                  leftIcon={<Ui.Icons name="delete" color="alert" />} // reset-icon
                >
                  Reset Cache
                </Ui.Button>
                {resetStatus === 'SUCCESS' && (
                  <CompletedStatus text="Reset Successfully!" />
                )}
              </div>
            )}
          </AccessControl>
        </>
      )}
    </form>
  );
};

export default ConnectRedisForm;
