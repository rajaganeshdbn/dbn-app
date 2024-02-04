/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  useConnectedRedisQuery,
  useCreateCompanyRedisMutation,
  useResetCacheDataMutation,
  useUpdateCacheEnableMutation,
} from 'utils/generated/graphql';
import segmentEvent from 'utils/segmentEvent';
import { NONE, SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';
import useWorkspace from './useWorkspace';

const useCompanyMetricCache = () => {
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);
  const [connectionState, setConnectionState] = useState(NONE);
  const [connectionError, setConnectionError] = useState('');
  const [isConnected, setConnected] = useState(false);
  const [isEnableCaching, setEnableCaching] = useState(false);
  const [resetStatus, setResetStatus] = useState(NONE);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  const { data: connectedRedisData, isLoading } = useConnectedRedisQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: !!workspace?.id }
  );
  useEffect(() => {
    if (
      !isLoading &&
      connectedRedisData?.companyRedis_by_pk &&
      workspace?.id === connectedRedisData?.companyRedis_by_pk?.workspaceId
    ) {
      setValue('host', connectedRedisData.companyRedis_by_pk.host);
      setValue('port', connectedRedisData.companyRedis_by_pk.port);
      setValue('expire', connectedRedisData.companyRedis_by_pk.expire);
      setValue('password', connectedRedisData.companyRedis_by_pk.password);
      setValue(
        'isDatabrainCache',
        connectedRedisData.companyRedis_by_pk.isDatabrainCache
      );
      setConnected(true);
      setEnableCaching(connectedRedisData.companyRedis_by_pk.isEnabled);
    } else {
      setConnected(false);
      setEnableCaching(false);
      setValue('isDatabrainCache', false);
    }
  }, [connectedRedisData?.companyRedis_by_pk, isLoading]);

  const { mutate: createCompanyRedis } = useCreateCompanyRedisMutation();
  const { mutate: updateEnableCachingMutate } = useUpdateCacheEnableMutation();
  const { mutate: resetCacheDataMutate } = useResetCacheDataMutation();
  const handleCreateCompanyRedis = (values: FieldValues) => {
    setResetStatus('');
    setDisabledSubmitButton(true);
    setConnectionState('AUTHENTICATING');
    setConnectionError('');
    createCompanyRedis(
      {
        companyId: user?.companyId,
        expire: parseInt(values.expire, 10) || 86400,
        port: values.isDatabrainCache ? 0 : parseInt(values.port, 10),
        host: values.isDatabrainCache ? '' : values.host,
        password: values.isDatabrainCache ? '' : values.password,
        workspaceId: workspace?.id,
        isDatabrainCache: values.isDatabrainCache,
      },
      {
        onSuccess(data) {
          if (data.createCompanyRedis?.error) {
            segmentEvent('cache connection failed', {
              companyId: user?.companyId,
              error: data.createCompanyRedis.error.message,
            });
            setConnectionError(data.createCompanyRedis.error.message);
            setDisabledSubmitButton(false);
            setConnectionState(NONE);
          }
          if (data.createCompanyRedis?.success) {
            segmentEvent('cache connected', {
              companyId: user?.companyId,
            });
            setDisabledSubmitButton(false);
            setConnectionState('AUTHENTICATED');
            setConnected(true);
          }
        },
        onError() {
          segmentEvent('cache connection failed', {
            companyId: user?.companyId,
            error: SOMETHING_WENT_WRONG,
          });
          setConnectionError(SOMETHING_WENT_WRONG);
          setDisabledSubmitButton(false);
          setConnectionState(NONE);
        },
      }
    );
  };
  const updateEnableCaching = (value: boolean) => {
    if (isConnected) {
      updateEnableCachingMutate(
        { workspaceId: workspace?.id, isEnabled: value },
        {
          onSuccess(data) {
            if (value) {
              segmentEvent('cache enabled', {
                companyId: user?.companyId,
              });
            } else {
              segmentEvent('cache disabled', {
                companyId: user?.companyId,
              });
            }
            setEnableCaching(
              data.update_companyRedis_by_pk?.isEnabled as boolean
            );
          },
        }
      );
    } else {
      setEnableCaching(value);
    }
  };
  const resetCacheData = () => {
    setDisabledSubmitButton(true);
    setResetStatus('');
    setConnectionState(NONE);
    resetCacheDataMutate(
      { workspaceId: workspace?.id },
      {
        onSuccess(data) {
          setDisabledSubmitButton(false);
          segmentEvent('cache reset', {
            companyId: user?.companyId,
          });
          if (data.resetCompanyRedisData?.success) setResetStatus('SUCCESS');
        },
      }
    );
  };
  const onConnect = handleSubmit(handleCreateCompanyRedis);

  return {
    register,
    errors,
    isDisabledSubmitButton,
    connectionState,
    onConnect,
    connectionError,
    isConnected,
    isEnableCaching,
    updateEnableCaching,
    resetCacheData,
    resetStatus,
    watch,
    setValue,
  };
};

export default useCompanyMetricCache;
