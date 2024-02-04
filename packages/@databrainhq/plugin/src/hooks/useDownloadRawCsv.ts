/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { SOMETHING_WENT_WRONG } from '@/consts';
import { useMetricRawDownloadSettingsQuery } from '@/queries/metric.query';
import { useMetricShareCsvMutation } from '@/queries/metric.mutation';

// export const getSqlStatement = ({
//   query,
//   clientName,
//   tenancyType,
//   values,
// }: {
//   query: string;
//   clientName?: string;
//   tenancyType?: string;
//   values?: Record<string, string>;
// }) => {
//   const str = clientName
//     ? tenancyType === DATABASE
//       ? query.replace(new RegExp(DATABASE_NAME, 'g'), clientName)
//       : Number(clientName)
//       ? query.replace(new RegExp(CLIENT_NAME_VAR_NUM, 'g'), clientName)
//       : query.replace(new RegExp(CLIENT_NAME_VAR, 'g'), clientName)
//     : query;
//   if (!values) {
//     return str;
//   }
//   const replacedStr = str.replace(/[^']+_variable/g, (match) => {
//     const value = values[match];
//     return `${value}`;
//   });
//   return replacedStr;
// };

const validateEmails = (emails: string[]): boolean => {
  if (!emails.length) return false;
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emails.every((email) => emailRegex.test(email));
};

const useDownloadRawCsv = ({
  onCloseModal,
  sharingSettingsId,
  metricItem,
}: {
  onCloseModal: (value: boolean) => void;
  metricItem?: Record<string, any>;
  sharingSettingsId?: string;
}) => {
  const { data: rawCsvSettingsData } = useMetricRawDownloadSettingsQuery(
    metricItem?.companyIntegration?.workspaceId
  );

  const [isLoading, setLoading] = useState(false);
  const [downloadCsvError, setError] = useState('');

  const { mutate: invokeShareCsvUrlMutation } = useMetricShareCsvMutation();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const rawCsvSettings = useMemo(() => {
    const data = rawCsvSettingsData as any;
    return {
      expireTimeInMin: data?.expireTimeInMin || 30,
      isEnable: data?.isEnable,
    };
  }, [rawCsvSettingsData]);

  const onSumbitShareCsvUrl = ({
    values,
    query,
  }: {
    values: FieldValues;
    query: string;
  }) => {
    setLoading(true);
    setError('');
    const expirationMinutes = rawCsvSettings.expireTimeInMin || 30;
    const expirationDate = new Date(Date.now() + expirationMinutes * 60 * 1000);
    const modifiedQuery = query;
    const emails = values.emails;
    if (!validateEmails(emails)) {
      setLoading(false);
      setError('please enter valid email');
      return;
    }
    if (!sharingSettingsId) {
      setLoading(false);
      setError('no sharing settings are found');
      return;
    }
    invokeShareCsvUrlMutation(
      {
        configurations: {
          externalMetricId: metricItem?.id,
          integrationId: metricItem?.companyIntegrationId,
          integrationName: metricItem?.integrationName,
          name: metricItem?.name,
        },
        emails,
        expireCsvFileAt: expirationDate as unknown as string,
        expireUrlIn: expirationMinutes * 60,
        externalMetricId: metricItem?.id,
        integrationId: metricItem?.companyIntegrationId,
        integrationName: metricItem?.integrationName,
        query: modifiedQuery,
        sharingSettingsId,
        subject: values.subject,
      },
      {
        onSuccess(data) {
          if (data) {
            setLoading(false);
            setError('');
            onCloseModal(false);
          } else {
            setLoading(false);
            setError(SOMETHING_WENT_WRONG);
          }
        },
        onError() {
          setLoading(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  return {
    onSumbitSendCsvUrl: onSumbitShareCsvUrl,
    isDisableDownloadSettings: !sharingSettingsId || !rawCsvSettings.isEnable,
    downloadCsvError,
    handleSubmit,
    isLoading,
    register,
    control,
    setValue,
    errors,
  };
};

export default useDownloadRawCsv;
