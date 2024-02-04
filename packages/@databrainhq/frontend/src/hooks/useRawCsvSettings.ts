/* eslint-disable consistent-return */
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import {
  useRawCsvSettingsQuery,
  useUpdateRawCsvSettingsMutation,
} from 'utils/generated/graphql';
import segmentEvent from 'utils/segmentEvent';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import useWorkspace from 'hooks/useWorkspace';

const getExpireTimeInMinutes = (
  time: number,
  timeIn: 'Minutes' | 'Seconds' | 'Hours' | 'Days'
) => {
  switch (timeIn) {
    case 'Seconds':
      return time / 60;
    case 'Hours':
      return time * 60;
    case 'Days':
      return time * 60 * 24;
    case 'Minutes':
    default:
      return time;
  }
};

const useRawCsvSettings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { workspace } = useWorkspace();

  const [isDisableButton, setDisableButton] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isEnableDownloadSettings, setEnableDownloadSettings] = useState(false);

  const { mutate: updateRawCsvSettings } = useUpdateRawCsvSettingsMutation();
  const { data: rawCsvSettingsData, isLoading: isLoadingRawCsvSettings } =
    useRawCsvSettingsQuery({ id: workspace?.id }, { enabled: !!workspace?.id });

  useEffect(() => {
    const expireInMin =
      rawCsvSettingsData?.companyWorkspaces_by_pk?.rawCsvSettings
        ?.expireTimeInMin;
    if (expireInMin) {
      setValue('expireTime', expireInMin);
      setEnableDownloadSettings(true);
    } else {
      setValue('expireTime', 30);
      setEnableDownloadSettings(false);
    }
  }, [rawCsvSettingsData]);

  const minExpireTime = useMemo(() => {
    const timeIn = watch('expireTimeIn');
    if (!timeIn) return 10; // 10 minutes
    if (timeIn === 'Seconds') return 10 * 60; // 10 minutes
    if (timeIn === 'Hours' || timeIn === 'Days') return 1; // 1 hour or day
    return 10; // default 10 minutes
  }, [watch('expireTimeIn')]);

  const saveRawCsvSettings = (values: FieldValues) => {
    setDisableButton(true);
    setError('');
    setSuccess(false);
    if (Number(values.expireTime) < minExpireTime) {
      setDisableButton(false);
      return setError(
        `Expire time cannot be less than ${minExpireTime} ${
          watch('expireTimeIn') || 'Minutes'
        }.`
      );
    }
    updateRawCsvSettings(
      {
        id: workspace?.id,
        rawCsvSettings: isEnableDownloadSettings
          ? {
              expireTimeInMin: getExpireTimeInMinutes(
                parseInt(values.expireTime, 10),
                values.expireTimeIn || 'Minutes'
              ),
            }
          : {},
      },
      {
        onSuccess({ update_companyWorkspaces_by_pk }) {
          if (update_companyWorkspaces_by_pk?.id) {
            if (isEnableDownloadSettings) {
              segmentEvent('raw csv settings enabled');
            } else {
              segmentEvent('raw csv settings disabled');
            }
            setDisableButton(false);
            setError('');
            setSuccess(true);
          } else {
            segmentEvent('raw csv settings failed');
            setDisableButton(false);
            setError(SOMETHING_WENT_WRONG);
            setSuccess(false);
          }
        },
        onError() {
          segmentEvent('raw csv settings failed');
          setDisableButton(false);
          setError(SOMETHING_WENT_WRONG);
          setSuccess(false);
        },
      }
    );
  };

  const onSubmit = handleSubmit(saveRawCsvSettings);
  return {
    error,
    isDisableButton,
    isLoadingRawCsvSettings,
    onSubmit,
    isSuccess,
    register,
    watch,
    isEnableDownloadSettings,
    setEnableDownloadSettings,
    setValue,
    minExpireTime,
    errors,
  };
};

export default useRawCsvSettings;
