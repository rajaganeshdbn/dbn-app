/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { useDashboardContext } from './useDashboardContext';
import getNextScheduledTime from '@/helpers/getNextScheduledTime';
import { SOMETHING_WENT_WRONG } from '@/consts';
import { useDashboardScheduledReportQuery } from '@/queries/externalDashboard.query';
import {
  useDeleteDashboardScheduleReportMutation,
  useSaveDashboardScheduleReportMutation,
} from '@/queries/externalDashboard.mutation';

type Params = {
  onCancel: () => void;
};
const useScheduleEmail = ({ onCancel }: Params) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const { data, token } = useDashboardContext();
  const { data: scheduledReportData, isLoading: isLoadingData } =
    useDashboardScheduledReportQuery(token as string);

  const scheduleReportConfig = useMemo(() => {
    if ((scheduledReportData as any)?.scheduleEmailReports?.length) {
      return (scheduledReportData as any)?.scheduleEmailReports?.[0];
    }
    return undefined;
  }, [scheduledReportData]);
  useEffect(() => {
    if (scheduleReportConfig) {
      reset({
        ...scheduleReportConfig.timeConfigurations,
      });
    } else {
      setValue('time', 'PM');
      setValue('timezone', 'Asia/Kolkata');
      setValue('frequency', 'Monthly');
    }
  }, [scheduleReportConfig]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setSuccess] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const dashboardName = '';
  const chartOptions =
    data?.externalDashboardMetrics?.map((metric) => ({
      value: metric.externalMetric.id,
      label: metric.externalMetric.name,
    })) || [];
  const saveScheduleEmailMutation = useSaveDashboardScheduleReportMutation();

  const deleteScheduledReportMutation =
    useDeleteDashboardScheduleReportMutation();
  const validateScheduledSettings = (
    values: FieldValues,
    nextScheduledAt: Date | null
  ) => {
    if (values.charts.length === 0) {
      setError('please select at least one chart to share');
      setLoading(false);
      setSuccess(false);
      return false;
    }
    if (values.emails.length === 0) {
      setError('please add at least one email address');
      setLoading(false);
      setSuccess(false);
      return false;
    }
    if (!nextScheduledAt) {
      setError('invalid time configurations');
      setLoading(false);
      setSuccess(false);
      // eslint-disable-next-line no-useless-return
      return false;
    }
    return true;
  };
  const saveScheduleEmailSettings = (values: FieldValues) => {
    setError('');
    setLoading(true);
    setSuccess(false);
    const {
      subject,
      emails,
      frequency,
      weekDays,
      date,
      hours,
      time,
      timezone,
    } = values;
    const nextScheduledAt = getNextScheduledTime({
      date,
      frequency,
      hours,
      time,
      timezone,
      weekDays,
    });
    const isValid = validateScheduledSettings(values, nextScheduledAt);
    if (!isValid) {
      return;
    }
    const charts = values.charts?.map((externalMetricId: string) => ({
      externalMetricId,
    }));
    if (scheduleReportConfig) {
      deleteScheduledReportMutation.mutate(
        {
          id: scheduleReportConfig.id,
          token: token as string,
        },
        {
          onSuccess(res: any) {
            if (res?.delete_scheduleEmailReports_by_pk?.id) {
              saveScheduleEmailMutation.mutate(
                {
                  data: {
                    emails,
                    externalDashboardId: data?.externalDashboard?.id,
                    data: charts,
                    guestToken: token,
                    nextScheduledAt: nextScheduledAt as unknown as string,
                    sharingSettingsId: data?.sharingSettingsId,
                    subject,
                    timeConfigurations: values,
                  },
                  token: token as string,
                },
                {
                  onSuccess(saveRes: any) {
                    if (saveRes?.insert_scheduleEmailReports_one?.id) {
                      setError('');
                      setLoading(false);
                      setSuccess(true);
                      onCancel();
                    } else {
                      setError(SOMETHING_WENT_WRONG);
                      setLoading(false);
                      setSuccess(false);
                    }
                  },
                  onError() {
                    setError(SOMETHING_WENT_WRONG);
                    setLoading(false);
                    setSuccess(false);
                  },
                }
              );
            } else {
              setError(SOMETHING_WENT_WRONG);
              setLoading(false);
              setSuccess(false);
            }
          },
          onError() {
            setError(SOMETHING_WENT_WRONG);
            setLoading(false);
            setSuccess(false);
          },
        }
      );
    } else {
      saveScheduleEmailMutation.mutate(
        {
          data: {
            emails,
            externalDashboardId: data?.externalDashboard?.id,
            data: charts,
            guestToken: token,
            nextScheduledAt: nextScheduledAt as unknown as string,
            sharingSettingsId: data?.sharingSettingsId,
            subject,
            timeConfigurations: values,
          },
          token: token as string,
        },
        {
          onSuccess(saveRes: any) {
            if (saveRes?.insert_scheduleEmailReports_one?.id) {
              setError('');
              setLoading(false);
              setSuccess(true);
              onCancel();
            } else {
              setError(SOMETHING_WENT_WRONG);
              setLoading(false);
              setSuccess(false);
            }
          },
          onError() {
            setError(SOMETHING_WENT_WRONG);
            setLoading(false);
            setSuccess(false);
          },
        }
      );
    }
  };
  const deleteScheduledReport = () => {
    setError('');
    setLoading(true);
    setDeleted(false);
    setSuccess(false);
    deleteScheduledReportMutation.mutate(
      { id: scheduleReportConfig?.id, token: token as string },
      {
        onSuccess(res: any) {
          if (res?.delete_scheduleEmailReports_by_pk?.id) {
            setError('');
            setLoading(false);
            setDeleted(true);
            reset({ subject: '', emails: [], charts: [] });
            onCancel();
          } else {
            setError(SOMETHING_WENT_WRONG);
            setLoading(false);
            setDeleted(false);
          }
        },
        onError() {
          setError(SOMETHING_WENT_WRONG);
          setLoading(false);
          setDeleted(false);
        },
      }
    );
  };
  const onSave = handleSubmit(saveScheduleEmailSettings);
  const onDelete = handleSubmit(deleteScheduledReport);
  return {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset,
    dashboardName,
    chartOptions,
    onSave,
    isLoading,
    isSuccess,
    error,
    isLoadingData,
    scheduleReportConfig,
    onDelete,
    isDeleted,
    errors,
  };
};

export default useScheduleEmail;
