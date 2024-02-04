import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import useDashboards from 'hooks/useDashboards';
import { DashboardType } from 'hooks/useMetric';
import styles from './SaveMetricForm.module.css';

type SaveMetricFormProps = {
  onSubmit: (values: FieldValues) => void;
  metricName?: string;
  description?: string;
  dashboardIds: DashboardType['id'][];
  onDashboardChange: (selected: DashboardType['id'][]) => void;
};

const SaveMetricForm: React.FC<SaveMetricFormProps> = ({
  onSubmit,
  metricName,
  description,
  dashboardIds,
  onDashboardChange,
}) => {
  const { register, handleSubmit } = useForm();
  const { dashboards } = useDashboards();

  return (
    <form
      className={styles['saveMetric-wrapper']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="dbn-mt-2">
        <Ui.MultiSelect
          label="Dashboards"
          options={
            dashboards?.map((dash) => ({
              value: dash.id,
              label: dash.name,
            })) ?? []
          }
          name="dashboards"
          value={dashboardIds}
          onChange={onDashboardChange}
          placeHolder="Choose dashboard/s from the list"
        />
      </div>
      <Ui.InputField
        name="name"
        type="text"
        defaultValue={metricName}
        placeholder="What is the name of metric?"
        label="Name"
        register={register('name')}
      />
      <div className="dbn-mt-2">
        <Ui.TextAreaField
          id="desc"
          placeholder="Enter metric description"
          label="Description"
          rows={5}
          register={register('description')}
          defaultValue={description}
        />
      </div>
      <div className={styles['buttons-container']}>
        <Ui.Button type="submit" variant="primary">
          Save
        </Ui.Button>
      </div>
    </form>
  );
};

export default React.memo(SaveMetricForm);
