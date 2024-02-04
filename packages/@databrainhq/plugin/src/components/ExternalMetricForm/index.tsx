import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './metricForm.module.css';
import {
  Text,
  Button,
  InputField,
  TextAreaField,
  ModalFooter,
} from '@/components';

type ExternalMetricProps = {
  onSubmit: (values: FieldValues) => void;
  defaultValues?: FieldValues;
  onCancel: () => void;
  error?: string;
  isCreatingMetric?: boolean;
};

export const ExternalMetricForm: React.FC<ExternalMetricProps> = ({
  onSubmit,
  defaultValues,
  onCancel,
  error,
  isCreatingMetric,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!defaultValues) return;
    setValue('name', defaultValues.name);
    setValue('description', defaultValues.description);
    setValue('metricId', defaultValues.metricId);
  }, [defaultValues]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <InputField
          name="name"
          type="text"
          placeholder="What is the name of metric?"
          label="Metric Name"
          register={register('name', {
            required: {
              value: true,
              message: 'Metric name is required',
            },
          })}
          error={errors.name?.message}
          defaultValue={defaultValues?.name}
        />
        <InputField
          name="name"
          type="text"
          placeholder="Unique Id to identify metric"
          label="Metric ID"
          error={errors.metricId?.message}
          register={register('metricId', {
            required: {
              value: true,
              message: 'Metric ID is required',
            },
          })}
          defaultValue={defaultValues?.metricId}
        />
        <TextAreaField
          className={styles.field}
          id="desc"
          placeholder="What is the name of metric?"
          label="Description"
          rows={5}
          register={register('description')}
          defaultValue={defaultValues?.description}
        />
      </div>
      {!!error && (
        <Text variant="body-text-sm" color="alert">
          {error}
        </Text>
      )}
      <ModalFooter>
        <Button type="reset" variant="tab" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isDisabled={isCreatingMetric}>
          Save
        </Button>
      </ModalFooter>
    </form>
  );
};
