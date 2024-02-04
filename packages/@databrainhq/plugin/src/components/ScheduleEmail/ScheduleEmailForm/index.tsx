/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Controller } from 'react-hook-form';
import styles from './scheduleEmailForm.module.css';
import {
  Error,
  Button,
  Checkbox,
  Text,
  // MultiFloatingDropDown,
  InputField,
  HookMultiSelect,
  HookSelect,
  TagInputField,
  MultiSelectDropdown,
  FloatingDropDown,
} from '@/components';

import useScheduleEmail from '@/hooks/useScheduleEmail';
import { required } from '@/consts/validations';
import { DATE_NUM, FREQUENCY, TIME, TIME_ZONES, WEEK_DAYS } from '@/consts';
import { ModalFooter } from '@/components/Modal';

type Props = {
  onCancel: () => void;
};
const ScheduleEmailForm = ({ onCancel }: Props) => {
  const {
    control,
    getValues,
    register,
    setValue,
    watch,
    dashboardName,
    chartOptions,
    onSave,
    isLoading,
    error,
    isSuccess,
    scheduleReportConfig,
    onDelete,
    isDeleted,
    errors,
  } = useScheduleEmail({ onCancel });
  return (
    <form className={styles['form-container']} onSubmit={onSave}>
      <div className={styles['form-wrapper']}>
        <Text variant="body-text-sm">
          Schedule an email report for Dashboard:
          <Text>{dashboardName}</Text>
        </Text>
        <InputField
          label="Subject Line"
          placeholder="Weekly Report - Sales Overview 2023"
          register={register('subject', required)}
          error={errors.subject?.message}
        />

        <TagInputField
          control={control}
          type="text"
          label="Send to"
          placeholder="Enter email addresses"
          onChangeTags={(tags) => setValue('emails', tags)}
          defaultTagValue={scheduleReportConfig?.timeConfigurations?.emails}
        />
        <Controller
          control={control}
          name="charts"
          render={({ field }) => (
            <MultiSelectDropdown
              label="Charts to Attach"
              selectedOption={chartOptions}
              options={chartOptions}
              onChange={(values) => field.onChange(values)}
              buttonWidth="100%"
              menuWidth="100%"
            />
          )}
        />
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <FloatingDropDown
              label="Frequency of emails"
              options={FREQUENCY}
              selectedOption={{
                value: field.value,
                label: field.value,
              }}
              onChange={(option) => field.onChange(option.value)}
              buttonWidth="100%"
              menuWidth="100%"
            />
          )}
        />
        {watch().frequency !== 'Monthly' ? (
          <div className={styles['week-days-container']}>
            {WEEK_DAYS.map((day) => (
              <Checkbox
                label={day.label}
                register={register(`weekDays.${day.value}`)}
                isDisabled={watch().frequency === 'Daily'}
                key={day.value}
              />
            ))}
          </div>
        ) : // <div>
        //   <MultiFloatingDropDown
        //     label="Choose Dates"
        //     selectedOptions={getValues().date || []}
        //     options={DATE_NUM}
        //     onChange={(values) => setValue('date', values)}
        //   />
        // </div>
        null}
        <div className={styles['schedule-time']}>
          <Text variant="label">Scheduled Time</Text>
          <div className={styles['time-element']}>
            <InputField
              type="number"
              className={styles['field-width']}
              min={0}
              max={11}
              register={register('hours', required)}
              defaultValue={5}
              error={errors.hours?.message}
            />
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <FloatingDropDown
                  options={TIME}
                  selectedOption={{
                    value: field.value,
                    label: field.value,
                  }}
                  onChange={(option) => field.onChange(option.value)}
                  buttonWidth="150px"
                  menuWidth="150px"
                />
              )}
            />
            <Controller
              control={control}
              name="timezone"
              render={({ field }) => (
                <FloatingDropDown
                  options={TIME_ZONES}
                  selectedOption={{
                    value: field.value,
                    label: field.value,
                  }}
                  onChange={(option) => field.onChange(option.value)}
                  buttonWidth="150px"
                  menuWidth="150px"
                />
              )}
            />
          </div>
        </div>
        {error && <Error message={error} />}
        {isSuccess && (
          <Text variant="body-text-sm" color="success">
            Scheduled successfully!
          </Text>
        )}
        {isDeleted && (
          <Text variant="body-text-sm" color="success">
            Deleted successfully!
          </Text>
        )}
      </div>
      <ModalFooter>
        {scheduleReportConfig ? (
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              onDelete();
            }}
            isDisabled={isLoading}
          >
            Delete
          </Button>
        ) : (
          <Button
            type="reset"
            variant="tab"
            onClick={() => onCancel()}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit" isDisabled={isLoading}>
          {scheduleReportConfig ? 'Update' : 'Save'}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default ScheduleEmailForm;
