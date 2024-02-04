/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui, consts, types } from '@databrainhq/plugin';
import { ChartSettingsType } from '@databrainhq/plugin/src/types';
import { ComparisonLagProps, Icons } from '@databrainhq/plugin/src/components';
import { useEffect, useMemo, useState } from 'react';
import { ChartActions, ForcastType, SelectedColumns } from 'types';
import { DrillDownSettings } from 'types/metric';
import AccessControl from 'components/AccessControl';
import { TableType } from 'hooks/useCompanySchema';
import useTheme from 'hooks/useTheme';
import styles from './manageColumns.module.css';
import ChartActionPanel from './ChartActionPanel';

type Props = {
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  isOpen: boolean;
  onClose: () => void;
  setBarRadius: React.Dispatch<
    React.SetStateAction<{
      topRadius: number;
      bottomRadius: number;
    }>
  >;
  isPythonMode: boolean;
  comparisonLagProps: ComparisonLagProps;
  setClickBehaviourConfigs: React.Dispatch<React.SetStateAction<ChartActions>>;
  clickBehaviourConfigs: ChartActions;
  rlsConditions: types.RlsCondition[];
  setRlsConditions: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
  selectedColumns: SelectedColumns[];
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
  setResetPallete: React.Dispatch<React.SetStateAction<boolean>>;
  isAllowDrillDown: boolean;
  joinTableOption: types.FloatingDropDownOption[];
  isSqlTab: boolean;
  tenancyType: string;
  setEnableDefaultTheme?: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdatedChartTheme?: boolean;
  setUpdatedChartTheme?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisableChartDrillDown: boolean;
  onChangeTimeseriesFormat: (
    value: types.FloatingDropDownOption,
    seriesName?: string
  ) => void;
};

const ChartAppearancePanel = ({
  ChartAppearancePanelProps: {
    isDisableChartDrillDown,
    chartSettings,
    isOpen,
    onClose,
    setChartSettings,
    setBarRadius,
    comparisonLagProps,
    clickBehaviourConfigs,
    setClickBehaviourConfigs,
    rlsConditions,
    setRlsConditions,
    selectedColumns,
    groupbyList,
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
    setResetPallete,
    isAllowDrillDown,
    joinTableOption,
    isSqlTab,
    isPythonMode,
    tenancyType,
    setEnableDefaultTheme,
    isUpdatedChartTheme,
    setUpdatedChartTheme,
    onChangeTimeseriesFormat,
  },
}: {
  ChartAppearancePanelProps: Props;
}) => {
  const isAppearanceDisabled: boolean = useMemo(
    () =>
      !![consts.CHART_TYPES.pivot, consts.CHART_TYPES.treeMap].includes(
        chartSettings.chartType
      ),
    [chartSettings.chartType]
  );
  const [selectedAction, setSelectedAction] = useState<string>('appearance');
  useEffect(() => {
    if (isAppearanceDisabled) {
      setSelectedAction('actions');
    } else {
      setSelectedAction('appearance');
    }
  }, [isAppearanceDisabled]);
  useEffect(() => {
    if (isUpdatedChartTheme) {
      setTimeout(() => {
        setUpdatedChartTheme?.(false);
      }, 5000);
    }
  }, [isUpdatedChartTheme]);
  const isTableChart = useMemo(() => {
    return [
      consts.CHART_TYPES.table,
      consts.CHART_TYPES.horizontalStackTable,
    ].includes(chartSettings.chartType);
  }, [chartSettings.chartType]);
  return (
    <Ui.Panel
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      side="right"
      hideFooter
      hideHeader
    >
      <div className={styles.chartPropertiesPanel}>
        <div className="dbn-w-full dbn-flex dbn-items-center dbn-justify-center dbn-mb-4">
          <div className="dbn-w-[90%] dbn-flex dbn-gap-10 dbn-bg-gray dbn-items-center dbn-justify-center dbn-py-2 dbn-rounded-md">
            <AccessControl feature="appearance" permission="View">
              <Ui.Button
                variant="popover"
                onClick={() => setSelectedAction('appearance')}
                className={`${
                  selectedAction === 'appearance' ? 'dbn-bg-white' : ''
                } dbn-w-40 dbn-py-3 dbn-rounded-md`}
                isDisabled={isAppearanceDisabled}
              >
                Appearance
              </Ui.Button>
            </AccessControl>
            <AccessControl feature="actions" permission="View">
              <Ui.Button
                variant="popover"
                onClick={() => setSelectedAction('actions')}
                className={`${
                  selectedAction === 'actions' ? 'dbn-bg-white' : ''
                } dbn-w-40 dbn-py-3 dbn-rounded-md`}
              >
                Actions
              </Ui.Button>
            </AccessControl>
          </div>
        </div>
        {selectedAction === 'appearance' ? (
          <AccessControl feature="appearance" permission="View">
            <Ui.ChartConfigure
              onChangeTimeseriesFormat={onChangeTimeseriesFormat}
              chartSettings={chartSettings}
              setChartSettings={setChartSettings}
              setBarRadius={setBarRadius}
              comparisonLagProps={comparisonLagProps}
              setResetPallete={setResetPallete}
            />
            {!isTableChart ? (
              <div className="dbn-w-full dbn-flex dbn-justify-end dbn-p-4 dbn-gap-4 dbn-items-center">
                {isUpdatedChartTheme ? (
                  <Ui.Text variant="body-text-sm" color="success">
                    Updated the Theme successfully!
                  </Ui.Text>
                ) : null}
                <div className="dbn-flex dbn-items-center">
                  <Ui.InfoTooltip
                    position="top"
                    text="Add default chart customization, overrides the chart options of theme"
                  />
                  <Ui.Button
                    variant="tertiary"
                    onClick={() => setEnableDefaultTheme?.(true)}
                    className="hover:dbn-bg-gray"
                  >
                    Set as default
                  </Ui.Button>
                </div>
              </div>
            ) : null}
          </AccessControl>
        ) : (
          <AccessControl feature="actions" permission="View">
            <ChartActionPanel
              ChartActionPanelProps={{
                tenancyType,
                isSqlTab,
                isPythonMode,
                tableList,
                setTimeColumn,
                timeColumn,
                setTimeGrainVal,
                dateTimeColumnList,
                timeGrainVal,
                clickBehaviourConfigs,
                setClickBehaviourConfigs,
                rlsConditions,
                setRlsConditions,
                selectedColumns,
                chartSettings,
                setChartSettings,
                groupbyList,
                drillDownSettings,
                setDrillDownSettings,
                onChangeDrillDown,
                setForecast,
                forecast,
                onSaveForeCastAction,
                dataSecuritySettings,
                setDataSecuritySettings,
                switchAxisOptions,
                isAllowDrillDown,
                joinTableOption,
                isDisableChartDrillDown,
              }}
            />
          </AccessControl>
        )}
      </div>
    </Ui.Panel>
  );
};

export default ChartAppearancePanel;
