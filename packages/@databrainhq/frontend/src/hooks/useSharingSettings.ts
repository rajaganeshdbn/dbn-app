/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  useDeleteScheduledSettingsMutation,
  useSaveSharingSettingsMutation,
  useSharingSettingsQuery,
  useTestSmtpSettingsMutation,
} from 'utils/generated/graphql';
import segmentEvent from 'utils/segmentEvent';
import { INVALID_CREDS, SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

const useSharingSettings = () => {
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const saveSharingSettingsMutation = useSaveSharingSettingsMutation();
  const [isEnableScheduledSettings, setEnableScheduledSettings] =
    useState(false);

  const testSmtpSettingsMutation = useTestSmtpSettingsMutation();
  const deleteScheduledSettingsMutation = useDeleteScheduledSettingsMutation();
  const { data: sharingData, isLoading: isLoadingSettings } =
    useSharingSettingsQuery(
      {
        companyId: getCurrentUser()?.companyId,
      },
      { enabled: !!getCurrentUser()?.companyId }
    );
  useEffect(() => {
    if (sharingData?.sharingSettings.length) {
      const values = sharingData.sharingSettings[0];
      setValue('host', values.host);
      setValue('port', values.port);
      setValue('username', values.username);
      setValue('password', values.password);
      setValue('fromAddress', values.fromAddress);
      setValue('replyToAddress', values.replyToAddress);
      setEnableScheduledSettings(true);
    } else {
      setEnableScheduledSettings(false);
    }
  }, [sharingData]);

  const insertSharingSettings = ({
    companyId,
    fromAddress,
    host,
    password,
    port,
    replyToAddress,
    secure,
    username,
  }: {
    companyId: string;
    fromAddress: string;
    host: string;
    password: string;
    port: number;
    replyToAddress: string;
    secure: boolean;
    username: string;
  }) => {
    if (!isEnableScheduledSettings && sharingData?.sharingSettings.length) {
      const values = sharingData.sharingSettings[0];
      deleteScheduledSettingsMutation.mutate(
        { id: values.id },
        {
          onSuccess({ delete_sharingSettings_by_pk }) {
            if (delete_sharingSettings_by_pk?.id) {
              setLoading(false);
              setSuccess(true);
              setError('');
              setEnableScheduledSettings(false);
            } else {
              setLoading(false);
              setError(SOMETHING_WENT_WRONG);
              setSuccess(false);
            }
          },
          onError() {
            setLoading(false);
            setError(SOMETHING_WENT_WRONG);
            setSuccess(false);
          },
        }
      );
    } else {
      saveSharingSettingsMutation.mutate(
        {
          companyId,
          fromAddress,
          host,
          password,
          port,
          replyToAddress,
          secure,
          username,
        },
        {
          onSuccess({ insert_sharingSettings_one }) {
            if (insert_sharingSettings_one?.id) {
              setLoading(false);
              setSuccess(true);
              setError('');
            } else {
              setLoading(false);
              setError(SOMETHING_WENT_WRONG);
              setSuccess(false);
            }
          },
          onError() {
            setLoading(false);
            setError(SOMETHING_WENT_WRONG);
            setSuccess(false);
          },
        }
      );
    }
  };
  const saveSmtpSettings = (data: FieldValues) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    testSmtpSettingsMutation.mutate(
      {
        host: data.host,
        port: parseInt(data.port, 10),
        password: data.password,
        secure: true,
        username: data.username,
      },
      {
        onSuccess({ testSmtpSettings }) {
          if (testSmtpSettings?.success) {
            segmentEvent('smtp settings saved', {
              companyId: getCurrentUser()?.companyId,
            });
            insertSharingSettings({
              companyId: getCurrentUser()?.companyId as string,
              fromAddress: data.fromAddress,
              replyToAddress: data.replyToAddress,
              host: data.host,
              password: data.password,
              username: data.username,
              port: parseInt(data.port, 10),
              secure: true,
            });
          } else {
            segmentEvent('smtp settings failed', {
              error: INVALID_CREDS,
            });
            setLoading(false);
            setError(INVALID_CREDS);
            setSuccess(false);
          }
        },
        onError() {
          segmentEvent('smtp settings failed', {
            error: SOMETHING_WENT_WRONG,
          });
          setLoading(false);
          setError(SOMETHING_WENT_WRONG);
          setSuccess(false);
        },
      }
    );
  };
  const onSumbit = handleSubmit(saveSmtpSettings);
  const onReset = () => reset();
  const sharingSettingsId = useMemo(
    () => sharingData?.sharingSettings?.[0]?.id,
    [sharingData?.sharingSettings]
  );
  return {
    register,
    errors,
    setValue,
    onReset,
    onSumbit,
    isLoading,
    isLoadingSettings,
    error,
    isSuccess,
    isEnableScheduledSettings,
    setEnableScheduledSettings,
    sharingSettingsId,
  };
};

export default useSharingSettings;
