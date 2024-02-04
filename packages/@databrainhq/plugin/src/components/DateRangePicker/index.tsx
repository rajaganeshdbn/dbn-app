/* eslint-disable react/forbid-dom-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import styles from './dateRangePicker.module.css';
import { PopoverMenu, Button, Text, Icons } from '@/components';

const options = [
  { type: 'day', label: 'Today', startOffset: 0, endOffset: 0 },
  { type: 'day', label: 'Yesterday', startOffset: -1, endOffset: -1 },
  { type: 'month', label: 'This Month', startOffset: 0, endOffset: 0 },
  { type: 'day', label: 'Last 7 Days', startOffset: -6, endOffset: 0 },
  { type: 'day', label: 'Last 30 Days', startOffset: -29, endOffset: 0 },
  { type: 'month', label: 'Last Month', startOffset: -1, endOffset: -1 },
  { type: 'month', label: 'Last 3 Months', startOffset: -3, endOffset: 0 },
  { type: 'month', label: 'Last 6 Months', startOffset: -6, endOffset: 0 },
  { type: 'year', label: 'Last Year', startOffset: -1, endOffset: 0 },
  { type: 'year', label: 'This Year', startOffset: 0, endOffset: 0 },
  { type: 'all_time', label: 'Life Time', startOffset: 0, endOffset: 0 },
];

export type DateOption =
  | {
      startDate: Date | undefined;
      endDate: Date | undefined;
      timeGrainValue: string;
      value: string;
    }
  | undefined;
type Props = {
  label: string;
  placeholder?: string;
  onChange?: (option: DateOption) => void;
  defaultValues?: {
    startDate: Date;
    endDate: Date;
    timeGrainValue: string;
  };
  isDateReset?: boolean;
  variant?: 'static' | 'floatingLabel';
  minDate?: Date;
  maxDate?: Date;
  buttonWidth?: string;
  isEnableSingleDate?: boolean;
  radius?: string;
  isFilter?: boolean;
};
export const DateRangePicker: React.FC<Props> = ({
  label: fieldLabel,
  placeholder = 'Select Date Range',
  onChange,
  defaultValues,
  isDateReset,
  variant = 'static',
  maxDate,
  minDate,
  buttonWidth = '100%',
  isEnableSingleDate = false,
  radius,
  isFilter,
}) => {
  const [timeGrainValue, setTimeGrainValue] = useState<string>(
    defaultValues?.timeGrainValue || 'between'
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    defaultValues?.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    defaultValues?.endDate
  );
  const datePickerRef = useRef(null) as React.RefObject<HTMLDivElement>;

  const setOnDateChange = (
    start: Date | null | undefined,
    end: Date | null | undefined,
    timeGrain?: string
  ) => {
    if (start && end) {
      const startDateValue = new Date(
        start.getTime() - start.getTimezoneOffset() * 60 * 1000
      );
      const endDateValue = new Date(
        end.getTime() - end.getTimezoneOffset() * 60 * 1000
      );
      const startDateFormat = startDateValue.toISOString().slice(0, 10);
      const endDateFormat = endDateValue.toISOString().slice(0, 10);
      onChange?.({
        value: `${startDateFormat} - ${endDateFormat}`,
        startDate: startDateValue,
        endDate: endDateValue,
        timeGrainValue: timeGrain || `${startDateFormat} - ${endDateFormat}`,
      });
    }
  };

  const handleOptionClick = ({
    endOffset,
    label,
    startOffset,
    type,
  }: {
    type: string;
    label: string;
    startOffset: number;
    endOffset: number;
  }) => {
    setTimeGrainValue(label);
    const start = new Date();
    const end = new Date();
    if (type === 'all_time') {
      start.setFullYear(1, 0, 1);
      setStartDate(start);
      setEndDate(end);
    } else if (type === 'month') {
      start.setMonth(start.getMonth() + startOffset);

      if (startOffset === 0) {
        start.setDate(1);
      }
      setStartDate(start);
      setEndDate(end);
    } else if (type === 'year') {
      start.setFullYear(start.getFullYear() + startOffset);
      if (startOffset === 0) {
        start.setMonth(0);
        start.setDate(1);
      }
      setStartDate(start);
      setEndDate(end);
    } else {
      start.setDate(start.getDate() + startOffset);
      end.setDate(end.getDate() + endOffset);
      setStartDate(start);
      setEndDate(end);
    }
    setOnDateChange(start, end, label);
    datePickerRef.current?.click();
  };

  useEffect(() => {
    setStartDate(defaultValues?.startDate);
    setEndDate(defaultValues?.endDate);
    setTimeGrainValue(
      defaultValues ? defaultValues.timeGrainValue : timeGrainValue
    );
  }, [
    defaultValues?.startDate,
    defaultValues?.endDate,
    defaultValues?.timeGrainValue,
  ]);

  const resetDate = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setTimeGrainValue('');
    onChange?.({
      value: '',
      startDate: undefined,
      endDate: undefined,
      timeGrainValue: '',
    });
  };

  useEffect(() => {
    if (isDateReset) {
      resetDate();
    }
  }, [isDateReset]);

  const onDateSelect = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (!isEnableSingleDate) {
      if (start) {
        const startDateFormat = start.toISOString().slice(0, 10);
        const endDateFormat = endDate?.toISOString().slice(0, 10);
        setTimeGrainValue(`${startDateFormat} - ${endDateFormat}`);
        setStartDate(start);
      } else {
        setStartDate(undefined);
      }

      if (end) {
        const endDateFormat = end.toISOString().slice(0, 10);
        const startDateFormat = startDate?.toISOString().slice(0, 10);
        setTimeGrainValue(`${startDateFormat} - ${endDateFormat}`);
        setEndDate(end);
      } else setEndDate(undefined);
    }

    if (isEnableSingleDate && start && end) {
      const startDateFormat = start.toISOString().slice(0, 10);
      const endDateFormat = end.toISOString().slice(0, 10);
      setTimeGrainValue(`${startDateFormat} - ${endDateFormat}`);
      setStartDate(start);
      setEndDate(end);
    }

    setOnDateChange(start, end);
  };

  return (
    <>
      <PopoverMenu
        tabMenu
        position="bottom-start"
        menuWidth="dbn-w-[600px]"
        buttonWidth={buttonWidth}
        buttonContent={
          <>
            {variant === 'static' && (
              <span
                className={`dbn-text-sm dbn-leading-6 dbn-font-medium dbn-inline-block dbn-font-lato ${
                  isFilter ? 'dbn-selectBox' : ''
                }`}
              >
                {fieldLabel}
              </span>
            )}
            <div
              className={styles.buttonWrapper}
              style={{ borderRadius: radius || '4px' }}
              ref={datePickerRef}
            >
              <div className={styles.innerContainer}>
                <span
                  className={`${classNames(styles.label, {
                    [styles.selectedLabel]: variant === 'floatingLabel',
                  })} ${isFilter ? 'dbn-selectBox' : ''}`}
                >
                  {fieldLabel}
                </span>
                <span
                  className={`${classNames(styles.text, {
                    [styles.staticText]:
                      variant === 'static' && startDate && endDate,
                    [styles.floatingText]: variant === 'floatingLabel',
                  })} ${isFilter ? 'dbn-selectBox' : ''}`}
                >
                  {startDate && endDate
                    ? isEnableSingleDate
                      ? `${startDate.toDateString().slice(4)}`
                      : `${startDate.toDateString().slice(4)} - ${endDate
                          .toDateString()
                          .slice(4)}`
                    : placeholder}
                </span>
              </div>
              <div>
                <Icons name="caret-down-fill" size="xs" />
              </div>
            </div>
          </>
        }
      >
        <div className={styles.datePickerContainer}>
          {!isEnableSingleDate ? (
            <div className={styles.datePickerOptionsWrapper}>
              {options.map(({ label, startOffset, endOffset, type }) => (
                <Button
                  key={label}
                  onClick={() =>
                    handleOptionClick({ startOffset, endOffset, type, label })
                  }
                  variant="popover"
                  className={
                    label !== timeGrainValue
                      ? styles.datePickerOption
                      : styles.checkedOption
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          ) : null}
          <div className={styles.datePickerCalContainer}>
            <div className={styles.datePickerCalendarWrapper}>
              {isEnableSingleDate ? (
                <DatePicker
                  selected={startDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  open
                  inline
                  onChange={(date) => onDateSelect([date, date])}
                  calendarClassName={styles.datePickerCalendar}
                />
              ) : (
                <DatePicker
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  minDate={minDate}
                  maxDate={maxDate}
                  open
                  inline
                  onChange={onDateSelect}
                  calendarClassName={styles.datePickerCalendar}
                />
              )}
            </div>
            <div className={styles.datePickerCalFooter}>
              {!isEnableSingleDate ? (
                <div className={styles.datePickerSelectedWrapper}>
                  <Text variant="body-text-sm">
                    <span>{startDate?.getDate() || 'D'}</span>/{' '}
                    <span>{startDate ? startDate.getMonth() + 1 : 'M'}</span> /{' '}
                    <span>{startDate?.getFullYear() || 'Y'}</span>
                  </Text>
                  -
                  <Text variant="body-text-sm">
                    <span>{endDate?.getDate() || 'D'}</span>/{' '}
                    <span>{endDate ? endDate.getMonth() + 1 : 'M'}</span> /{' '}
                    <span>{endDate?.getFullYear() || 'Y'}</span>
                  </Text>
                </div>
              ) : null}

              <div
                className={`dbn-flex dbn-gap-4 ${
                  isEnableSingleDate ? 'dbn-w-full dbn-justify-between' : ''
                }`}
              >
                <Button
                  variant="tab"
                  type="reset"
                  onClick={() => {
                    resetDate();
                  }}
                  leftIcon={<Icons name="delete" color="alert" />}
                />

                <Button
                  variant="primary"
                  type="button"
                  onClick={() => datePickerRef.current?.click()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverMenu>
    </>
  );
};

export default DateRangePicker;
