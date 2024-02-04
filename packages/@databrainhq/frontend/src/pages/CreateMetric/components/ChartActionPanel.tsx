/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui, consts, types } from '@databrainhq/plugin';
import { ChartActions, ForcastType, SelectedColumns } from 'types';
import { useMemo, useEffect } from 'react';
import { DrillDownSettings } from 'types/metric';
import {
  RE_DIRECT_ROUTE_TYPE,
  SUB_ROUTE,
  TIME_GRAIN_OPTIONS,
} from 'consts/values';
import { DISABLED_CHART_DRILL, DISABLED_METRIC_DRILL } from 'consts/labels';
import AccessControl from 'components/AccessControl';
import { TableType } from 'hooks/useCompanySchema';
import useAccessControl from 'hooks/useAccessControl';
import { getForeCastTimeGrain } from 'helpers/application/datasetMetricCreation';
import styles from './manageColumns.module.css';
// import { ChartFilterAccordion } from './ChartFilterAccordion';

type Props = {
  setClickBehaviourConfigs: React.Dispatch<React.SetStateAction<ChartActions>>;
  clickBehaviourConfigs: ChartActions;
  rlsConditions: types.RlsCondition[];
  setRlsConditions: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  selectedColumns: SelectedColumns[];
  chartSettings: types.ChartSettingsType;
  setChartSettings: React.Dispatch<
    React.SetStateAction<types.ChartSettingsType>
  >;
  groupbyList: string[];
  drillDownSettings: DrillDownSettings;
  setDrillDownSettings: React.Dispatch<React.SetStateAction<DrillDownSettings>>;
  onChangeDrillDown: (params: any, isEnable: boolean) => void;
  setForecast: React.Dispatch<React.SetStateAction<ForcastType>>;
  forecast: ForcastType;
  setTimeColumn: React.Dispatch<
    React.SetStateAction<types.FloatingDropDownOption>
  >;
  timeColumn: types.FloatingDropDownOption;
  dateTimeColumnList: types.FloatingDropDownOption[];
  setTimeGrainVal: React.Dispatch<
    React.SetStateAction<types.FloatingDropDownOption>
  >;
  timeGrainVal: types.FloatingDropDownOption;
  onSaveForeCastAction: () => void;
  dataSecuritySettings: {
    underlyingColumns: types.FloatingDropDownOption[];
    csvColumns: types.FloatingDropDownOption[];
  };
  setDataSecuritySettings: React.Dispatch<
    React.SetStateAction<{
      underlyingColumns: types.FloatingDropDownOption[];
      csvColumns: types.FloatingDropDownOption[];
    }>
  >;
  tableList: TableType[];
  switchAxisOptions: any;
  isAllowDrillDown: boolean;
  joinTableOption: types.FloatingDropDownOption[];
  isSqlTab: boolean;
  isPythonMode: boolean;
  tenancyType: string;
  isDisableChartDrillDown: boolean;
};

const ChartActionPanel = ({
  ChartActionPanelProps: {
    isDisableChartDrillDown,
    clickBehaviourConfigs,
    setClickBehaviourConfigs,
    rlsConditions,
    setRlsConditions,
    selectedColumns,
    chartSettings,
    groupbyList,
    setChartSettings,
    drillDownSettings,
    setDrillDownSettings,
    onChangeDrillDown,
    setForecast,
    forecast,
    setTimeColumn,
    timeColumn,
    dateTimeColumnList,
    setTimeGrainVal,
    timeGrainVal,
    onSaveForeCastAction,
    dataSecuritySettings,
    setDataSecuritySettings,
    tableList,
    switchAxisOptions,
    isAllowDrillDown,
    joinTableOption,
    isSqlTab,
    isPythonMode,
    tenancyType,
  },
}: {
  ChartActionPanelProps: Props;
}) => {
  const { getIsCanAccess } = useAccessControl();
  const groupByOptions: types.FloatingDropDownOption[] = useMemo(
    () =>
      [
        ...(groupbyList?.map((g) => ({ value: g, label: g })) || []),
        {
          value: 'ungrouped',
          label: chartSettings.ungroupedAlias || 'ungrouped',
        },
      ] || [
        {
          value: 'ungrouped',
          label: chartSettings.ungroupedAlias || 'ungrouped',
        },
      ],
    [groupbyList, chartSettings.ungroupedAlias]
  );

  const securityColumnOptions = useMemo(() => {
    if (!selectedColumns) return [];
    return selectedColumns.map((col) => ({
      label: col.column,
      value: col.column,
    }));
  }, [selectedColumns]);

  return (
    <div className={styles.chartActionPanel}>
      <AccessControl feature="chartClickAction" permission="View">
        <Ui.AccordionV3
          width="100%"
          content={
            <div className={styles.accordionContent}>
              <Ui.FloatingDropDown
                options={RE_DIRECT_ROUTE_TYPE}
                selectedOption={{
                  label: clickBehaviourConfigs.chart.routeType,
                  value: clickBehaviourConfigs.chart.routeType,
                }}
                buttonWidth="350px"
                menuWidth="350px"
                label="Re-Direct Type"
                onChange={(value) => {
                  setClickBehaviourConfigs((prevValue) => ({
                    ...prevValue,
                    chart: { ...prevValue.chart, routeType: value.value },
                  }));
                }}
                isDisabled={!getIsCanAccess('cardClickAction', 'Edit')}
              />

              <Ui.InputField
                type="text"
                placeholder="eg: /Metric"
                label="Destination base url"
                isDisabled={!getIsCanAccess('cardClickAction', 'Edit')}
                onChange={({ target: { value } }) => {
                  setClickBehaviourConfigs((prevValue) => ({
                    ...prevValue,
                    chart: {
                      ...prevValue.chart,
                      baseUrl: value,
                      route: `${value}/{{value}}`,
                    },
                  }));
                }}
              />
              <Ui.Text variant="body-text-sm">
                Route: {clickBehaviourConfigs.chart.route}
              </Ui.Text>
            </div>
          }
          header={
            <div className={styles.accordionHeader}>
              <Ui.Text variant="heading">Chart Click Action</Ui.Text>
              <Ui.InfoTooltip
                text="Navigates you to the configured page when clicked on any area on the chart/graph"
                position="bottom"
                tooltipClass="dbn-w-[200px]"
              />
            </div>
          }
          headerButton={
            <Ui.Switch
              name="chart click"
              defaultEnabled
              enabled={clickBehaviourConfigs.chart.isEnable}
              onChange={() =>
                setClickBehaviourConfigs((prevValue) => ({
                  ...prevValue,
                  chart: {
                    ...prevValue.chart,
                    isEnable: !prevValue.chart.isEnable,
                  },
                }))
              }
              isDisabled={!getIsCanAccess('chartClickAction', 'Enable/Disable')}
            />
          }
        />
      </AccessControl>
      <AccessControl feature="cardClickAction" permission="View">
        <Ui.AccordionV3
          width="100%"
          content={
            <div className={styles.accordionContent}>
              <Ui.FloatingDropDown
                options={RE_DIRECT_ROUTE_TYPE}
                selectedOption={{
                  label: clickBehaviourConfigs.card.routeType,
                  value: clickBehaviourConfigs.card.routeType,
                }}
                buttonWidth="350px"
                menuWidth="350px"
                label="Re-Direct Type"
                onChange={(value) => {
                  setClickBehaviourConfigs((prevValue) => ({
                    ...prevValue,
                    card: { ...prevValue.card, routeType: value.value },
                  }));
                }}
                isDisabled={!getIsCanAccess('cardClickAction', 'Edit')}
              />
              <Ui.FloatingDropDown
                options={SUB_ROUTE}
                onChange={(value) => {
                  setClickBehaviourConfigs((prevValue) => ({
                    ...prevValue,
                    card: {
                      ...prevValue.card,
                      dynamic: value.value,
                      route: `${
                        value.value !== 'none'
                          ? `${clickBehaviourConfigs.card.baseUrl}/{{metric.${value.value}}}`
                          : `${clickBehaviourConfigs.card.baseUrl}`
                      }`,
                    },
                  }));
                }}
                isDisabled={!getIsCanAccess('cardClickAction', 'Edit')}
                selectedOption={{
                  value: clickBehaviourConfigs.card.dynamic,
                  label: clickBehaviourConfigs.card.dynamic,
                }}
                label="Identifier type"
                buttonWidth="350px"
                menuWidth="350px"
              />
              <Ui.InputField
                type="text"
                placeholder="eg: /Metric"
                label="Destination base url"
                isDisabled={!getIsCanAccess('cardClickAction', 'Edit')}
                onChange={({ target: { value } }) => {
                  setClickBehaviourConfigs((prevValue) => ({
                    ...prevValue,
                    card: {
                      ...prevValue.card,
                      baseUrl: value,
                      route: `${
                        clickBehaviourConfigs.card.dynamic !== 'none'
                          ? `${value}/{{metric.${clickBehaviourConfigs.card.dynamic}}}`
                          : `${value}`
                      }`,
                    },
                  }));
                }}
              />
              <Ui.Text variant="body-text-sm">
                Route: {clickBehaviourConfigs.card.route}
              </Ui.Text>
            </div>
          }
          header={
            <div className={styles.accordionHeader}>
              <Ui.Text variant="heading">Card Click Action</Ui.Text>
              <Ui.InfoTooltip
                text="Navigates you to the configured page when clicked on a card in the dashboard"
                position="bottom"
                tooltipClass="dbn-w-[200px]"
              />
            </div>
          }
          headerButton={
            <Ui.Switch
              name="card click"
              defaultEnabled
              enabled={clickBehaviourConfigs.card.isEnable}
              isDisabled={!getIsCanAccess('cardClickAction', 'Enable/Disable')}
              onChange={() =>
                setClickBehaviourConfigs((prevValue) => ({
                  ...prevValue,
                  card: {
                    ...prevValue.card,
                    isEnable: !prevValue.card.isEnable,
                  },
                }))
              }
            />
          }
        />
      </AccessControl>
      <div className="dbn-px-5">
        <Ui.Text variant="label">Add Actions On Current Card</Ui.Text>
      </div>
      {/* Group x Axis */}
      {[
        consts.CHART_TYPES.line,
        consts.CHART_TYPES.bar,
        consts.CHART_TYPES.area,
        consts.CHART_TYPES.combo,
        consts.CHART_TYPES.scatter,
        consts.CHART_TYPES.bubble,
        consts.CHART_TYPES.stack,
        consts.CHART_TYPES.waterfall,
        consts.CHART_TYPES.stackedArea,
        consts.CHART_TYPES.pie,
        consts.CHART_TYPES.doughnut,
        consts.CHART_TYPES.rose,
        consts.CHART_TYPES.stack,
      ].includes(chartSettings.chartType) ? (
        <AccessControl feature="groupXAxis" permission="View">
          <Ui.AccordionV3
            width="100%"
            content={<></>}
            header={
              <div className={styles.accordionHeader}>
                <Ui.Text variant="heading">Group X-axis</Ui.Text>
                <Ui.InfoTooltip
                  text="Group x-axis"
                  position="top"
                  tooltipClass="dbn-w-[100px]"
                />
              </div>
            }
            headerButton={
              <AccessControl feature="groupXAxis" permission="Enable/Disable">
                <Ui.Switch
                  name="group x-axis"
                  defaultEnabled
                  enabled={chartSettings.isGroupXAxis}
                  onChange={() =>
                    setChartSettings((prev) => ({
                      ...prev,
                      isGroupXAxis: !prev.isGroupXAxis,
                    }))
                  }
                />
              </AccessControl>
            }
          />
        </AccessControl>
      ) : null}
      {/* METRIC FILTER */}
      {/* <ChartFilterAccordion
        chartFilterAccordionProps={{
          rlsConditions,
          setRlsConditions,
          tableList,
          joinTableOption,
          isSqlTab,
          isPythonMode,
          tenancyType,
        }}
      /> */}
      {/* Switch Axis */}
      {[
        consts.CHART_TYPES.line,
        consts.CHART_TYPES.bar,
        consts.CHART_TYPES.area,
        consts.CHART_TYPES.combo,
        consts.CHART_TYPES.scatter,
        consts.CHART_TYPES.bubble,
        consts.CHART_TYPES.stack,
        consts.CHART_TYPES.waterfall,
        consts.CHART_TYPES.stackedArea,
      ].includes(chartSettings.chartType) ? (
        <AccessControl feature="switchAxis" permission="View">
          <Ui.AccordionV3
            width="100%"
            content={
              <div className={styles.accordionContent}>
                {chartSettings.dynamicXAxis?.isEnabled && (
                  <>
                    <Ui.MultiSelectDropdown
                      buttonWidth="100%"
                      menuWidth="100%"
                      label="Horizontal Axis options"
                      options={switchAxisOptions}
                      onChange={(option) => {
                        setChartSettings((prev) => ({
                          ...prev,
                          dynamicXAxis: {
                            isEnabled: !!prev.dynamicXAxis?.isEnabled,
                            options: option.map((o) => ({
                              value: o.value,
                              label: o.value,
                            })),
                            selectedOption: {
                              value: option[0]?.value || '',
                              label: option[0]?.value || '',
                            },
                          },
                          xAxis: option[0]?.value || '',
                        }));
                      }}
                      isDisabled={!getIsCanAccess('switchAxis', 'Edit')}
                      selectedOption={
                        chartSettings.dynamicXAxis?.options
                          ?.filter((v) =>
                            switchAxisOptions
                              .map((val: any) => val.value)
                              ?.includes(v.value)
                          )
                          ?.map((v) => {
                            return { value: v.value, label: v.value };
                          }) || []
                      }
                    />
                  </>
                )}
              </div>
            }
            header={
              <div className={styles.accordionHeader}>
                <Ui.Text variant="heading">Switch Axis</Ui.Text>
                <Ui.InfoTooltip
                  text="Switch axis"
                  position="top"
                  tooltipClass="dbn-w-[100px]"
                />
              </div>
            }
            headerButton={
              <Ui.Switch
                name="switch axis"
                defaultEnabled
                enabled={chartSettings.dynamicXAxis?.isEnabled}
                onChange={() =>
                  setChartSettings((prev) => ({
                    ...prev,
                    dynamicXAxis: {
                      isEnabled: !prev.dynamicXAxis?.isEnabled,
                      options: [],
                      selectedOption: { value: '', label: '' },
                    },
                  }))
                }
                isDisabled={!getIsCanAccess('switchAxis', 'Enable/Disable')}
              />
            }
          />
        </AccessControl>
      ) : null}
      {/* Group BY */}
      <AccessControl feature="groupbyAxis" permission="View">
        <Ui.AccordionV3
          width="100%"
          content={
            <div className={styles.accordionContent}>
              <div className={styles.manualOptionSwitch}>
                <Ui.Switch
                  name="dynamic series"
                  enabled={chartSettings?.isDynamicSeries}
                  onChange={() =>
                    setChartSettings((prev) => ({
                      ...prev,
                      isDynamicSeries: !prev.isDynamicSeries,
                      seriesField: 'ungrouped',
                    }))
                  }
                  isDisabled={!getIsCanAccess('groupbyAxis', 'Dynamic Options')}
                />
                <Ui.Text variant="label">Dynamic Options</Ui.Text>
              </div>

              {chartSettings.isDynamicSeries ? (
                <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2">
                  <Ui.InputField
                    type="text"
                    label="Alias for Ungrouped"
                    placeholder="add alias for ungrouped"
                    onChange={(e) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        ungroupedAlias: e.target.value,
                      }))
                    }
                    value={chartSettings.ungroupedAlias}
                    isDisabled={!getIsCanAccess('groupbyAxis', 'Edit')}
                  />
                  <Ui.MultiSelectDropdown
                    label="Series Column"
                    options={groupByOptions}
                    onChange={(value) =>
                      setChartSettings((prev) => ({
                        ...prev,
                        seriesField: value?.[0]?.value || 'ungrouped',
                        seriesOptions: value?.map((v) => v.value) || [],
                      }))
                    }
                    selectedOption={
                      chartSettings.seriesOptions
                        ?.filter((v) =>
                          groupByOptions.map((val) => val.value)?.includes(v)
                        )
                        ?.map((v) => ({ value: v, label: v })) || []
                    }
                    isDisabled={!getIsCanAccess('groupbyAxis', 'Edit')}
                    isSearchEnabled
                    buttonWidth="350px"
                    menuWidth="350px"
                  />
                </div>
              ) : (
                <Ui.FloatingDropDown
                  options={groupByOptions}
                  selectedOption={{
                    label: chartSettings.seriesField || 'ungrouped',
                    value: chartSettings.seriesField || 'ungrouped',
                  }}
                  buttonWidth="350px"
                  menuWidth="350px"
                  label="Series Column"
                  isDisabled={!getIsCanAccess('groupbyAxis', 'Edit')}
                  onChange={(value) => {
                    setChartSettings((prevValue) => ({
                      ...prevValue,
                      seriesField: value.value,
                    }));
                  }}
                />
              )}
            </div>
          }
          header={
            <div className={styles.accordionHeader}>
              <Ui.Text variant="heading">Group By</Ui.Text>
              <Ui.InfoTooltip
                text="Multi Series"
                position="top"
                tooltipClass="dbn-w-[100px]"
              />
            </div>
          }
          headerButton={
            <Ui.Switch
              defaultEnabled
              name="multi dimension"
              enabled={chartSettings.isMultiDimension}
              onChange={() =>
                setChartSettings((prevValue) => ({
                  ...prevValue,
                  isMultiDimension: !prevValue.isMultiDimension,
                  customSettings: {
                    ...prevValue.customSettings,
                    showSelectLegend: false,
                  },
                }))
              }
              isDisabled={!getIsCanAccess('groupbyAxis', 'Edit')}
            />
          }
        />
      </AccessControl>
      {/* DRILL DOWN */}
      <AccessControl feature="drilldown" permission="View">
        <Ui.AccordionV3
          width="100%"
          content={
            <div className={styles.accordionContent}>
              {isAllowDrillDown && !isDisableChartDrillDown ? (
                <div className={styles.manualOptionSwitch}>
                  <Ui.Switch
                    defaultEnabled
                    name="cross filter"
                    enabled={drillDownSettings.isEnableCrossFilter}
                    onChange={() =>
                      setDrillDownSettings((prevValue) => ({
                        ...prevValue,
                        isEnableCrossFilter: !prevValue.isEnableCrossFilter,
                      }))
                    }
                    isDisabled={
                      !getIsCanAccess('drilldown', 'Cross Filter Dashboard') ||
                      !isAllowDrillDown ||
                      isDisableChartDrillDown
                    }
                  />
                  <Ui.Text variant="label">Cross Filter Dashboard</Ui.Text>
                </div>
              ) : (
                <Ui.Alert
                  text={
                    isDisableChartDrillDown
                      ? DISABLED_CHART_DRILL
                      : DISABLED_METRIC_DRILL
                  }
                  variant="error"
                />
              )}
            </div>
          }
          header={
            <div className={styles.accordionHeader}>
              <Ui.Text variant="heading">DrillDown</Ui.Text>
              <Ui.InfoTooltip
                text="Drill Down with group by columns"
                position="top"
                tooltipClass="dbn-w-[100px]"
              />
            </div>
          }
          headerButton={
            <Ui.Switch
              name="enable drill"
              defaultEnabled
              enabled={drillDownSettings.isEnableGroupBy}
              onChange={() => {
                onChangeDrillDown({}, !drillDownSettings.isEnableGroupBy);
              }}
              isDisabled={
                !getIsCanAccess('drilldown', 'Enable/Disable') ||
                !isAllowDrillDown ||
                isDisableChartDrillDown
              }
            />
          }
        />
      </AccessControl>
      {/* FORECAST */}
      <AccessControl feature="forcast" permission="View">
        <Ui.AccordionV3
          width="100%"
          content={
            <div className={styles.accordionContent}>
              <div className="dbn-flex dbn-flex-col dbn-gap-3">
                <>
                  <Ui.FloatingDropDown
                    onChange={setTimeColumn}
                    selectedOption={timeColumn}
                    options={dateTimeColumnList}
                    isDisabled={
                      !getIsCanAccess('forcast', 'Edit') ||
                      !dateTimeColumnList.length
                    }
                    labelVariant="static"
                    label="Time Column"
                    buttonWidth="350px"
                    menuWidth="350px"
                  />

                  <Ui.FloatingDropDown
                    onChange={(value) => {
                      setTimeGrainVal(value);
                      setForecast((prev) => ({
                        ...prev,
                        timeGrain: getForeCastTimeGrain(value.value),
                      }));
                    }}
                    selectedOption={timeGrainVal}
                    options={TIME_GRAIN_OPTIONS}
                    isDisabled={
                      !getIsCanAccess('forcast', 'Edit') ||
                      !dateTimeColumnList.length
                    }
                    labelVariant="static"
                    label="Time Grain"
                    buttonWidth="350px"
                    menuWidth="350px"
                  />
                </>
                <Ui.FloatingDropDown
                  onChange={(value) =>
                    setForecast((prev) => ({
                      ...prev,
                      modelName: value.value,
                    }))
                  }
                  options={[
                    { value: 'ARIMA', label: 'ARIMA' },
                    { value: 'prophet', label: 'prophet' },
                  ]}
                  selectedOption={{
                    value: forecast.modelName,
                    label: forecast.modelName,
                  }}
                  isDisabled={!getIsCanAccess('forcast', 'Edit')}
                  label="Forecast Model"
                  labelVariant="static"
                  buttonWidth="350px"
                  menuWidth="350px"
                />
                <Ui.InputField
                  type="number"
                  min={1}
                  label="Forecast periods"
                  onChange={({ target: { value } }) =>
                    setForecast((prev) => ({
                      ...prev,
                      forecastPeriods: parseInt(value, 10),
                    }))
                  }
                  value={forecast.forecastPeriods}
                  isDisabled={!getIsCanAccess('forcast', 'Edit')}
                />
                {forecast.modelName === 'prophet' ? (
                  <>
                    <Ui.InputField
                      type="number"
                      min={0}
                      max={1}
                      label="Confidence Intervals"
                      onChange={({ target: { value } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          confidenceInterval: Number(value),
                        }))
                      }
                      value={forecast.confidenceInterval}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                    <Ui.FloatingDropDown
                      onChange={(value) =>
                        setForecast((prev) => ({
                          ...prev,
                          growth: value.value,
                        }))
                      }
                      options={[
                        { value: 'linear', label: 'linear' },
                        { value: 'flat', label: 'flat' },
                      ]}
                      selectedOption={{
                        value: forecast.growth,
                        label: forecast.growth,
                      }}
                      label="Growth"
                      labelVariant="static"
                      buttonWidth="350px"
                      menuWidth="350px"
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />

                    <Ui.Checkbox
                      label="Yearly Seasonality"
                      onChange={({ target: { checked } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          yearlySeasonality: checked,
                        }))
                      }
                      checked={forecast.yearlySeasonality}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                    <Ui.Checkbox
                      label="Weekly Seasonality"
                      onChange={({ target: { checked } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          weeklySeasonality: checked,
                        }))
                      }
                      checked={forecast.weeklySeasonality}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                    <Ui.Checkbox
                      label="Daily Seasonality"
                      onChange={({ target: { checked } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          dailySeasonality: checked,
                        }))
                      }
                      checked={forecast.dailySeasonality}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                  </>
                ) : (
                  <>
                    <Ui.FloatingDropDown
                      onChange={(value) =>
                        setForecast((prev) => ({
                          ...prev,
                          trend: value,
                        }))
                      }
                      options={[
                        { value: 't', label: 'linear' },
                        { value: 'c', label: 'constant' },
                        {
                          value: 'ct',
                          label: 'constant plus linear',
                        },
                      ]}
                      selectedOption={forecast.trend}
                      label="Trend"
                      labelVariant="static"
                      buttonWidth="350px"
                      menuWidth="350px"
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                    <Ui.InputField
                      type="number"
                      min={0}
                      label="Auto Regressive Order"
                      onChange={({ target: { value } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          orderP: parseInt(value, 10),
                        }))
                      }
                      value={forecast.orderP}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                    <Ui.InputField
                      type="number"
                      min={0}
                      label="Order Of Differencing"
                      onChange={({ target: { value } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          orderD: parseInt(value, 10),
                        }))
                      }
                      value={forecast.orderD}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                    <Ui.InputField
                      type="number"
                      min={0}
                      label="Moving Average Order"
                      onChange={({ target: { value } }) =>
                        setForecast((prev) => ({
                          ...prev,
                          orderQ: parseInt(value, 10),
                        }))
                      }
                      value={forecast.orderQ}
                      isDisabled={!getIsCanAccess('forcast', 'Edit')}
                    />
                  </>
                )}
              </div>
              <AccessControl feature="forcast" permission="Edit">
                <div className={styles.manualOptionSwitchOne}>
                  <Ui.Button
                    variant="primary"
                    onClick={() => onSaveForeCastAction()}
                  >
                    save
                  </Ui.Button>
                </div>
              </AccessControl>
            </div>
          }
          header={
            <div className={styles.accordionHeader}>
              <Ui.Text variant="heading">Forecast</Ui.Text>
              <Ui.InfoTooltip
                text="Forecast"
                position="top"
                tooltipClass="dbn-w-[100px]"
              />
            </div>
          }
          headerButton={
            <Ui.Switch
              defaultEnabled
              name="forecast enable"
              enabled={forecast.isEnable}
              onChange={() => {
                setForecast((prev) => ({
                  ...prev,
                  isEnable: !prev.isEnable,
                }));
              }}
              isDisabled={!getIsCanAccess('forcast', 'Enable/Disable')}
            />
          }
        />
      </AccessControl>
      {/* DATA SECURITY */}

      <div className="dbn-px-5">
        <Ui.Text variant="label">Security Actions</Ui.Text>
      </div>
      <AccessControl feature="dataSecuritySettings" permission="View">
        <Ui.AccordionV3
          width="100%"
          content={
            <div className={styles.accordionContent}>
              <Ui.MultiSelectDropdown
                options={securityColumnOptions}
                selectedOption={dataSecuritySettings.underlyingColumns}
                buttonWidth="350px"
                menuWidth="350px"
                label="Hide column from underlying data"
                onChange={(value) => {
                  setDataSecuritySettings((prev) => ({
                    ...prev,
                    underlyingColumns: value,
                  }));
                }}
                isDisabled={!getIsCanAccess('dataSecuritySettings', 'Edit')}
              />
              <Ui.MultiSelectDropdown
                options={securityColumnOptions}
                selectedOption={dataSecuritySettings.csvColumns}
                buttonWidth="350px"
                menuWidth="350px"
                label="Hide column from csv data"
                onChange={(value) => {
                  setDataSecuritySettings((prev) => ({
                    ...prev,
                    csvColumns: value,
                  }));
                }}
                isDisabled={!getIsCanAccess('dataSecuritySettings', 'Edit')}
              />
            </div>
          }
          header={
            <div className={styles.accordionHeader}>
              <Ui.Text variant="heading">
                Data Security Settings for the Metric
              </Ui.Text>
              <Ui.InfoTooltip
                text="Data security settings"
                position="top"
                tooltipClass="dbn-w-[200px]"
              />
            </div>
          }
          headerButton={<></>}
        />
      </AccessControl>
    </div>
  );
};

export default ChartActionPanel;
