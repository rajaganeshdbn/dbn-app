/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader';
import useExternalDashboards from 'hooks/useExternalDashboard';
import { DashboardType } from 'hooks/useMetric';
import styles from './form.module.css';

type ExternalMetricProps = {
  onSubmit: (values: FieldValues) => void;
  defaultValues?: FieldValues;
  onCancel: () => void;
  isEmbedded?: boolean;
  error?: string;
  isSaving?: boolean;
  dashboardIds?: DashboardType['id'][];
  onDashboardChange?: (selected: DashboardType['id'][]) => void;
  dashboardId?: string | null;
  isPublished?: string | null;
};

const ExternalMetric: React.FC<ExternalMetricProps> = ({
  onSubmit,
  defaultValues,
  onCancel,
  isEmbedded,
  error,
  isSaving,
  dashboardIds,
  onDashboardChange,
  dashboardId,
  isPublished,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const scrollRef = useRef() as React.RefObject<HTMLDivElement>;

  const { dashboards } = useExternalDashboards();
  const options = isEmbedded
    ? dashboards
        ?.filter((d) => d.id === dashboardIds?.[0])
        .map((dash) => ({
          value: dash.id,
          label: dash.name,
        })) ?? []
    : dashboards?.map((dash) => ({
        value: dash.id,
        label: dash.name,
      })) ?? [];

  useEffect(() => {
    if (error) {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }, [error]);

  useEffect(() => {
    if (defaultValues?.metricId) {
      setValue('metricId', defaultValues.metricId);
      setValue('name', defaultValues.name);
      setValue('desc', defaultValues.description);
      setValue('about', defaultValues.about);
    }
  }, [defaultValues]);

  const submitForm = (values: FieldValues) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={styles.wrapper}>
        {!isPublished || isPublished !== 'false' ? (
          <Ui.MultiSelectDropdown
            buttonWidth="100%"
            menuWidth="100%"
            label="Dashboards"
            options={options}
            selectedOption={
              dashboardIds?.map((id) => {
                return options.find((option) => option.value === id) as {
                  value: string;
                  label: string;
                };
              }) || []
            }
            onChange={(onChangeOptions) => {
              onDashboardChange?.(
                onChangeOptions.map((option) => option.value)
              );
            }}
          />
        ) : null}
        <Ui.InputField
          name="name"
          type="text"
          placeholder="What Is The Name Of Metric?"
          label="Metric Name"
          register={register('name', {
            required: { value: true, message: 'Metric name is required' },
          })}
          error={errors.name?.message}
        />
        <Ui.InputField
          name="metricId"
          type="text"
          placeholder="Unique Id To Identify Metric"
          label="Metric ID"
          register={register('metricId', {
            required: { value: true, message: 'Metric ID is required' },
          })}
          error={errors.metricId?.message}
        />
        <Ui.TextAreaField
          id="desc"
          placeholder="Enter metric description"
          label="Description"
          rows={5}
          register={register('description')}
          defaultValue={defaultValues?.description}
        />
        {defaultValues?.about != null && (
          <Ui.TextAreaField
            id="about"
            placeholder="Enter a short description of the changes that you have added"
            label="Change Description"
            rows={5}
            register={register('about')}
            defaultValue={defaultValues.about}
          />
        )}
        {!!error && (
          <div ref={scrollRef}>
            <Ui.Error message={error} />
          </div>
        )}
      </div>
      {isSaving && (
        <div className="dbn-absolute dbn-w-full dbn-h-full dbn-top-0 dbn-bg-black/[0.1]">
          <Loader />
        </div>
      )}

      <Ui.ModalFooter>
        <Ui.Button type="reset" variant="tab" onClick={onCancel}>
          Cancel
        </Ui.Button>
        <Ui.Button
          type="submit"
          variant="primary"
          isDisabled={isSaving || !watch('name') || !watch('metricId')}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Ui.Button>
      </Ui.ModalFooter>
    </form>
  );
};

export default React.memo(ExternalMetric);
