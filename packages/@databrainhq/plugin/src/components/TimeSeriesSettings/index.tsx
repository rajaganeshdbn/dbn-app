/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect } from 'react';
import styles from './timeseriesSettings.module.css';
import {
  Text,
  InputField,
  FloatingDropDown,
  Switch,
  RadioButton,
  MultiSelectDropdown,
} from '@/components';
import { TimeSeriesSettingsProps, TimeSeriesType } from '@/types';
import { timeStamp } from '@/consts';

const TIMESERIES_SERIES_TYPE = [
  { value: 'line', label: 'line' },
  { value: 'bar', label: 'bar' },
  { value: 'area', label: 'area' },
  { value: 'stack', label: 'stack' },
];
const TIMESERIES_GROUP_OPTION = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'quarterly', label: 'Quarterly' },
];
const TimeSeriesSettings = ({
  onChange,
  settings: { groupBySettings, seriesType },
  yAxisList,
  onChangeTimeseriesFormat,
}: TimeSeriesSettingsProps) => {
  const handleInputChange = (index: any, value: string) => {
    if (groupBySettings.options[index].split('____').length) {
      groupBySettings.options[index] = `${
        groupBySettings.options[index].split('____')[0]
      }____${value}`;
      groupBySettings.value = `${
        groupBySettings.options[index].split('____')[0]
      }____${value}`;
    } else {
      groupBySettings.options[
        index
      ] = `${groupBySettings.options[index]}____${value}`;
      groupBySettings.value = `${groupBySettings.options[index]}____${value}`;
    }
  };

  return (
    <div className={styles.timeSeriesSettingsContainer}>
      <div className={styles.wrapper}>
        <Text variant="heading">Series type</Text>
        <FloatingDropDown
          options={TIMESERIES_SERIES_TYPE}
          selectedOption={{
            value: seriesType?.[0]?.type || 'bar',
            label: seriesType?.[0]?.type || 'bar',
          }}
          onChange={(value) => {
            onChange((prev) => ({
              ...prev,
              seriesType: yAxisList.map((column) => ({
                column,
                type: value.value as TimeSeriesType,
              })),
            }));
          }}
        />
      </div>
      <Text variant="label">Group format</Text>
      <div className={styles.timeSeriesSettingsType}>
        <RadioButton
          type="radio"
          onChange={({ target: { checked } }) =>
            checked &&
            onChange((prev) => ({
              ...prev,
              groupBySettings: {
                ...prev.groupBySettings,
                value: 'monthly',
                isDynamic: false,
                options: TIMESERIES_GROUP_OPTION.map((value) => value.value),
              },
            }))
          }
          name="isDynamic"
          label="default"
          defaultChecked={!groupBySettings.isDynamic}
        />
        <RadioButton
          type="radio"
          name="isDynamic"
          label="dynamic"
          checked={groupBySettings.isDynamic}
          defaultChecked={groupBySettings.isDynamic}
          onChange={({ target: { checked } }) =>
            checked &&
            onChange((prev) => ({
              ...prev,
              groupBySettings: {
                ...prev.groupBySettings,
                value: 'monthly',
                isDynamic: true,
                options: TIMESERIES_GROUP_OPTION.map((value) => value.value),
                fillXAxis: false,
              },
            }))
          }
        />
      </div>
      {!groupBySettings.isDynamic ? (
        <>
          <div className={styles.wrapper}>
            <Text variant="heading">Format type</Text>
            <FloatingDropDown
              options={TIMESERIES_GROUP_OPTION}
              selectedOption={{
                value: groupBySettings.value || '',
                label: groupBySettings.value || '',
              }}
              onChange={(value: any) => {
                onChange((prev) => ({
                  ...prev,
                  groupBySettings: {
                    ...prev.groupBySettings,
                    value: value.value,
                  },
                }));
                onChangeTimeseriesFormat(value);
              }}
            />
          </div>
          {[timeStamp.month, timeStamp.quarter].includes(
            groupBySettings.value
          ) && (
            <div className={styles.wrapper}>
              <Text variant="heading">Fill X-axis</Text>
              <Switch
                name="fill axis"
                enabled={groupBySettings.fillXAxis}
                onChange={() =>
                  onChange((prev) => ({
                    ...prev,
                    groupBySettings: {
                      ...prev.groupBySettings,
                      fillXAxis: !prev.groupBySettings.fillXAxis,
                    },
                  }))
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className={styles.dynamicFormat}>
          <MultiSelectDropdown
            buttonWidth="100%"
            menuWidth="100%"
            options={TIMESERIES_GROUP_OPTION}
            selectedOption={groupBySettings.options.map((item) =>
              item.split('____').length
                ? {
                    value: item.split('____')[0],
                    label: item.split('____')[0],
                  }
                : {
                    value: item,
                    label: item,
                  }
            )}
            label="Dynamic options"
            onChange={(value) =>
              onChange((prev) => ({
                ...prev,
                groupBySettings: {
                  ...prev.groupBySettings,
                  value:
                    Array.isArray(value) && value.length
                      ? value[0].value
                      : 'monthly',
                  options: value.map((val) => val.value) || ['monthly'],
                  fillXAxis: [
                    timeStamp.daily,
                    timeStamp.weekly,
                    timeStamp.yearly,
                  ].includes(
                    Array.isArray(value) && value.length
                      ? value[0].value
                      : 'monthly'
                  )
                    ? false
                    : prev.groupBySettings.fillXAxis,
                },
              }))
            }
            isShowSelectedOptions
          />
          {groupBySettings.options.map((val, index) => {
            return (
              <div className="dbn-flex dbn-flex-row dbn-justify-between">
                <Text variant="heading">
                  {val.split('____').length > 1 ? val.split('____')[0] : val}
                </Text>
                <div className={styles.inputWrapper}>
                  <InputField
                    type="text"
                    value={
                      val.split('____').length > 1 ? val.split('____')[1] : val
                    }
                    placeholder="Save as"
                    onChange={(e) => {
                      handleInputChange(index, e.target.value);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSeriesSettings;
