/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './chartModal.module.css';
import {
  MultiSelect,
  Checkbox,
  InputField,
  Text,
  FloatingDropDown,
  Switch,
  MultiSelectDropdown,
} from '@/components';
import { CHART_TYPES, DOUGHNUT, PIE, SANKEY } from '@/consts/app';
import { ChartSettingsType, FloatingDropDownOption } from '@/types';

type Props = {
  data?: Record<string, any>[];
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  groupbyList: any[];
};

export const ChartConfig = ({
  data,
  chartSettings,
  setChartSettings,
  groupbyList,
}: Props) => {
  // TODO : fix ui
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [values, setValues] = useState('');

  useEffect(() => {
    if (!chartSettings.sankeyValues || source || target || values) return;
    const [savedSource, savedTarget, savedValues] = chartSettings.sankeyValues;
    if (!savedSource || !savedTarget || !savedValues) return;
    setSource(savedSource);
    setTarget(savedTarget);
    setValues(savedValues);
  }, [chartSettings.sankeyValues]);

  const options = useMemo(() => {
    const opts = data
      ? Object.keys(data[0] || {}).map((d) => ({
          value: d,
          label: d,
        }))
      : [];
    opts.push({ value: 'NONE', label: 'NONE' });
    return opts;
  }, [data]);
  const metricsList: FloatingDropDownOption[] = useMemo(
    () => options?.filter((option) => !groupbyList.includes(option.value)),
    [options]
  );
  const groupByList: FloatingDropDownOption[] = useMemo(
    () => options?.filter((option) => groupbyList.includes(option.value)),
    [options]
  );
  const setYAxisList = useCallback(
    (list: string[]) => {
      const yAxisList =
        list?.filter(
          (item) =>
            item &&
            item !== 'NONE' &&
            options.map((o) => o.value).includes(item)
        ) || [];

      setChartSettings((prev) => ({
        ...prev,
        yAxisList,
      }));
    },
    [options]
  );

  const setPivotRows = useCallback(
    (list: string[]) => {
      setChartSettings((prev) => ({
        ...prev,
        pivotTableSettings: {
          ...chartSettings.pivotTableSettings,
          rows: list.filter(
            (item) =>
              item &&
              item !== 'NONE' &&
              metricsList?.map((o: { value: any }) => o.value).includes(item)
          ),
        },
      }));
    },
    [chartSettings.pivotTableSettings, options, setChartSettings]
  );
  const setPivotColumns = useCallback(
    (list: string[]) => {
      setChartSettings((prev) => ({
        ...prev,
        pivotTableSettings: {
          ...chartSettings.pivotTableSettings,
          columns: list.filter(
            (item) =>
              item &&
              item !== 'NONE' &&
              groupByList?.map((o: { value: any }) => o.value).includes(item)
          ),
        },
      }));
    },
    [chartSettings.pivotTableSettings, options, setChartSettings]
  );
  const setGaugeDimensions = useCallback(
    (list: string[]) => {
      setChartSettings((prev) => ({
        ...prev,
        gaugeSettings: {
          ...chartSettings.gaugeSettings,
          dimensions: list.filter(
            (item) =>
              item &&
              item !== 'NONE' &&
              groupByList?.map((o: { value: any }) => o.value).includes(item)
          ),
        },
      }));
    },
    [chartSettings.gaugeSettings, options, setChartSettings]
  );

  useEffect(() => {
    if (source && target && values)
      setChartSettings((prev) => ({
        ...prev,
        sankeyValues: [source, target, values],
      }));
  }, [source, target, values]);

  if (chartSettings.chartType === SANKEY) {
    return (
      <div className={styles.container}>
        <Text variant="heading">Required Axis</Text>
        <FloatingDropDown
          label="Source"
          options={options}
          onChange={(src) => {
            if (src.value === target) setTarget('');
            setSource(src.value);
          }}
          selectedOption={{ value: source || '', label: source || '' }}
          isSearchEnabled
          buttonWidth="100%"
          menuWidth="100%"
        />
        <FloatingDropDown
          label="Target"
          options={options.filter((opt) => opt.value !== source)}
          onChange={(e) => setTarget(e.value)}
          selectedOption={{ value: target || '', label: target || '' }}
          isSearchEnabled
          buttonWidth="100%"
          menuWidth="100%"
        />
        <FloatingDropDown
          label="Value"
          options={options.filter(
            (opt) => opt.value !== source && opt.value !== target
          )}
          onChange={(e) => setValues(e.value)}
          selectedOption={{ value: values || '', label: values || '' }}
          isSearchEnabled
          buttonWidth="100%"
          menuWidth="100%"
        />
      </div>
    );
  }
  if (
    chartSettings.chartType === CHART_TYPES.pivot ||
    chartSettings.chartType === CHART_TYPES.treeMap
  ) {
    return (
      <div className={styles.container}>
        <Text variant="heading">Required Axis</Text>
        <MultiSelectDropdown
          buttonWidth="100%"
          menuWidth="100%"
          label="Metrics"
          options={metricsList || []}
          selectedOption={
            metricsList?.map((option) => ({
              value: option.value,
              label: option.value,
            })) || []
          }
          onChange={(option) => {
            setPivotRows(option.map((o) => o.value));
          }}
          isShowSelectedOptions
        />

        <MultiSelectDropdown
          buttonWidth="100%"
          menuWidth="100%"
          label="Group by"
          isShowSelectedOptions
          options={groupByList || []}
          selectedOption={
            groupByList?.map((option) => ({
              value: option.value,
              label: option.value,
            })) || []
          }
          onChange={(option) => {
            setPivotColumns(option.map((o) => o.value));
          }}
        />
      </div>
    );
  }
  if (chartSettings.chartType === CHART_TYPES.gauge) {
    return (
      <div className={styles.container}>
        <Text variant="heading">Required Axis</Text>
        <FloatingDropDown
          label="Metric"
          options={metricsList || []}
          onChange={(e) =>
            setChartSettings((prev) => ({
              ...prev,
              gaugeSettings: {
                ...chartSettings.gaugeSettings,
                metric: e.value,
              },
            }))
          }
          selectedOption={{
            value: chartSettings?.gaugeSettings?.metric || '',
            label: chartSettings?.gaugeSettings?.metric || '',
          }}
          isSearchEnabled
          buttonWidth="100%"
          menuWidth="100%"
        />
        <MultiSelectDropdown
          buttonWidth="100%"
          menuWidth="100%"
          label="Dimensions"
          isShowSelectedOptions
          options={groupByList || []}
          selectedOption={
            chartSettings.gaugeSettings?.dimensions?.map((option) => ({
              value: option,
              label: option,
            })) || []
          }
          onChange={(option) => {
            setGaugeDimensions(option.map((o) => o.value));
          }}
        />
      </div>
    );
  }
  if (chartSettings.chartType === DOUGHNUT) {
    return (
      <>
        {!!(chartSettings.chartType === DOUGHNUT || PIE) && (
          <div className={styles.container}>
            <Text variant="heading">Required Axis</Text>
            <FloatingDropDown
              label="Dimension"
              options={options}
              onChange={(value) =>
                setChartSettings((prev) => ({ ...prev, xAxis: value.value }))
              }
              selectedOption={{
                value: chartSettings.xAxis || '',
                label: chartSettings.xAxis || '',
              }}
              isSearchEnabled
              buttonWidth="100%"
              menuWidth="100%"
            />
            <MultiSelectDropdown
              buttonWidth="100%"
              menuWidth="100%"
              label="Measure"
              isShowSelectedOptions
              options={options}
              selectedOption={
                chartSettings?.yAxisList?.map((y) => ({
                  value: y,
                  label: y,
                })) || []
              }
              onChange={(option) => {
                setYAxisList(option.map((o) => o.value));
              }}
            />
          </div>
        )}
      </>
    );
  }
  if (chartSettings.chartType === PIE) {
    return (
      <>
        <div className={styles.container}>
          <Text variant="heading">Required Axis</Text>
          <FloatingDropDown
            label="Dimension"
            options={options}
            onChange={(value) =>
              setChartSettings((prev) => ({ ...prev, xAxis: value.value }))
            }
            selectedOption={{
              value: chartSettings.xAxis || '',
              label: chartSettings.xAxis || '',
            }}
            isSearchEnabled
            buttonWidth="100%"
            menuWidth="100%"
          />
          <MultiSelectDropdown
            buttonWidth="100%"
            menuWidth="100%"
            label="Measure"
            isShowSelectedOptions
            options={options}
            selectedOption={
              chartSettings?.yAxisList?.map((y) => ({
                value: y,
                label: y,
              })) || []
            }
            onChange={(option) => {
              setYAxisList(option.map((o) => o.value));
            }}
          />
        </div>
      </>
    );
  }
  if (chartSettings.chartType === CHART_TYPES.singleValue) {
    return (
      <div className={styles.container}>
        <Text variant="heading">Required Axis</Text>
        <FloatingDropDown
          label="Measure"
          options={options}
          onChange={(value) =>
            setChartSettings((prev) => ({ ...prev, singleValue: value.value }))
          }
          selectedOption={{
            value: chartSettings.singleValue || '',
            label: chartSettings.singleValue || '',
          }}
          isSearchEnabled
          buttonWidth="100%"
          menuWidth="100%"
        />
      </div>
    );
  }
  return (
    <>
      <div className={styles.container}>
        <Text variant="heading">Required Axis</Text>
        {![
          CHART_TYPES.gauge,
          CHART_TYPES.boxplot,
          CHART_TYPES.table,
          CHART_TYPES.horizontalStackTable,
        ].includes(chartSettings.chartType) && (
          <>
            {chartSettings.chartType === CHART_TYPES.funnel ? (
              <FloatingDropDown
                label="Step"
                options={options}
                onChange={(value) =>
                  setChartSettings((prev) => ({ ...prev, step: value.value }))
                }
                selectedOption={{
                  value: chartSettings.step || '',
                  label: chartSettings.step || '',
                }}
                isSearchEnabled
                buttonWidth="100%"
                menuWidth="100%"
              />
            ) : (
              <FloatingDropDown
                label={
                  chartSettings.chartType === CHART_TYPES.row
                    ? 'Vertical Axis'
                    : 'Horizontal Axis'
                }
                options={options}
                onChange={(value) =>
                  setChartSettings((prev) => ({ ...prev, xAxis: value.value }))
                }
                selectedOption={{
                  value: chartSettings.xAxis || '',
                  label: chartSettings.xAxis || '',
                }}
                isSearchEnabled
                buttonWidth="100%"
                menuWidth="100%"
              />
            )}
          </>
        )}
        {[CHART_TYPES.funnel, CHART_TYPES.boxplot].includes(
          chartSettings.chartType
        ) ? (
          <FloatingDropDown
            label="Measure"
            options={options}
            onChange={(value) =>
              setChartSettings((prev) => ({ ...prev, measure: value.value }))
            }
            selectedOption={{
              value: chartSettings.measure || '',
              label: chartSettings.measure || '',
            }}
            isSearchEnabled
            buttonWidth="100%"
            menuWidth="100%"
          />
        ) : (
          <>
            {chartSettings.chartType !== CHART_TYPES.waterfall ? (
              <MultiSelectDropdown
                buttonWidth="100%"
                menuWidth="100%"
                label={
                  // eslint-disable-next-line no-nested-ternary
                  chartSettings.chartType === CHART_TYPES.row
                    ? 'Horizontal Axis'
                    : chartSettings.chartType === CHART_TYPES.table ||
                      chartSettings.chartType ===
                        CHART_TYPES.horizontalStackTable
                    ? 'Measure'
                    : 'Vertical Axis'
                }
                options={options}
                onChange={(option) => {
                  setYAxisList(option.map((o) => o.value));
                }}
                selectedOption={
                  chartSettings?.yAxisList?.map((y) => ({
                    value: y,
                    label: y,
                  })) || []
                }
                isSearchEnabled
                isShowSelectedOptions
              />
            ) : (
              <FloatingDropDown
                label="Vertical Axis"
                options={options}
                onChange={(value) =>
                  setChartSettings((prev) => ({
                    ...prev,
                    yAxisList: [value.value],
                  }))
                }
                selectedOption={{
                  value: chartSettings.yAxisList?.[0] || '',
                  label: chartSettings.yAxisList?.[0] || '',
                }}
                isSearchEnabled
                buttonWidth="100%"
                menuWidth="100%"
              />
            )}
            {chartSettings.chartType === 'bubble' ? (
              <InputField
                type="number"
                label="Constant for bubble size"
                min={0}
                onChange={(e) =>
                  setChartSettings((prev) => ({
                    ...prev,
                    percentageSize: Number(e.target.value),
                  }))
                }
                value={chartSettings.percentageSize}
              />
            ) : null}
            {chartSettings.chartType === CHART_TYPES.combo && (
              <MultiSelectDropdown
                selectedOption={
                  chartSettings.comboBarList
                    ?.filter((i) => chartSettings.yAxisList?.includes(i))
                    ?.map((v) => ({ value: v, label: v })) || []
                }
                label="Combo Bar"
                options={
                  chartSettings.yAxisList?.map((v) => ({
                    value: v,
                    label: v,
                  })) || []
                }
                onChange={(value) =>
                  setChartSettings((prev) => ({
                    ...prev,
                    comboBarList:
                      value
                        ?.filter((v) =>
                          chartSettings.yAxisList?.includes(v.value)
                        )
                        ?.map((v) => v.value) || [],
                  }))
                }
                menuWidth="100%"
                buttonWidth="100%"
              />
            )}
            {/* {[
              CHART_TYPES.line,
              CHART_TYPES.bar,
              CHART_TYPES.timeSeries,
              CHART_TYPES.stack,
            ].includes(chartSettings.chartType) ? (
              <>
                <Checkbox
                  label="Multi Series"
                  checked={chartSettings?.isMultiDimension}
                  onChange={(e) =>
                    setChartSettings((prev) => ({
                      ...prev,
                      isMultiDimension: e.target.checked,
                      isDynamicSeries: false,
                    }))
                  }
                />
                {chartSettings?.isMultiDimension && (
                  <Checkbox
                    label="dynamic group"
                    checked={chartSettings?.isDynamicSeries}
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        isDynamicSeries: e.target.checked,
                        seriesField: 'ungrouped',
                      }))
                    }
                  />
                )}
                {chartSettings.isDynamicSeries && (
                  <InputField
                    type="text"
                    label="Alias for Ungrouped"
                    placeholder="add alias for ungrouped"
                    className={styles.checkboxTooltipWrapper}
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        ungroupedAlias: e.target.value,
                      }))
                    }
                    value={chartSettings.ungroupedAlias}
                  />
                )}
              </>
            ) : null} */}
            {/* {[
              CHART_TYPES.line,
              CHART_TYPES.bar,
              CHART_TYPES.timeSeries,
              CHART_TYPES.stack,
            ].includes(chartSettings.chartType) &&
            chartSettings.isMultiDimension ? (
              chartSettings.isDynamicSeries ? (
                <MultiSelect
                  label="Series Column"
                  options={groupByList}
                  onChange={(value) =>
                    setChartSettings((prev) => ({
                      ...prev,
                      seriesField: value?.[0] || 'ungrouped',
                      seriesOptions:
                        value?.filter((v) => v !== 'ungrouped') || [],
                    }))
                  }
                  value={
                    chartSettings.seriesOptions?.filter((v) =>
                      groupByList.map((val) => val.value)?.includes(v)
                    ) || []
                  }
                  isSearchEnabled
                />
              ) : (
                <FloatingDropDown
                  label="Series Column"
                  options={[
                    { value: 'ungrouped', label: 'ungrouped' },
                    ...groupByList,
                  ]}
                  onChange={(value) =>
                    setChartSettings((prev) => ({
                      ...prev,
                      seriesField: value.value,
                    }))
                  }
                  selectedOption={{
                    value: chartSettings.seriesField || '',
                    label: chartSettings.seriesField || '',
                  }}
                  isSearchEnabled
                  buttonWidth="400px"
                  menuWidth="400px"
                />
              )
            ) : null} */}
            {chartSettings.chartType === CHART_TYPES.horizontalStackTable ? (
              <MultiSelectDropdown
                options={options}
                label="Satck Bar Columns"
                onChange={(value) =>
                  setChartSettings((prev) => ({
                    ...prev,
                    stackTableCols: value?.map((v) => v.value),
                  }))
                }
                selectedOption={
                  chartSettings.stackTableCols?.map((v) => ({
                    value: v,
                    label: v,
                  })) || []
                }
                buttonWidth="100%"
                menuWidth="100%"
              />
            ) : null}
          </>
        )}
      </div>
    </>
  );
};
