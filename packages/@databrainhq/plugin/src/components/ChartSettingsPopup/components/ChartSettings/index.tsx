/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable import/no-relative-parent-imports */
import React, { useMemo, useState, useEffect } from 'react';
import { ChartConfigure } from '../ChartConfigure';
import styles from './settings.module.css';
import { ChartSettingsType } from '@/types/app';
import { CHART_TYPES, CONFIG, GENERAL } from '@/consts/app';
import { Button, Tab, ChartConfig, ChartModalOptions } from '@/components';
import { defaultChartProperties, getEnabledChart } from '@/helpers';

type Props = {
  data: any[] | undefined;
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  isEnablePivotTable: boolean;
  groupbyList: any[];
  hasNumberKeys: boolean;
  isEnableGauge: boolean;
  isShowChartConfigTab?: boolean;
};
const FIRST_TAB = 'Chart types';
const SECOND_TAB = 'Chart properties';
const buttonColor = {
  background: '#e5e7eb',
  width: '100%',
  height: '100%',
  paddingTop: '8px',
  paddingBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
export const ChartSettings = ({
  data,
  chartSettings,
  setChartSettings,
  isEnablePivotTable,
  groupbyList,
  hasNumberKeys,
  isEnableGauge,
  isShowChartConfigTab,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(GENERAL);
  const [activeTab, setActiveTab] = useState(FIRST_TAB);
  const enableCharts = useMemo(() => getEnabledChart(data || []), [data]);
  const [barRadius, setBarRadius] = useState({
    topRadius: chartSettings.customSettings?.barRadius?.[1] || 0,
    bottomRadius: chartSettings.customSettings?.barRadius?.[3] || 0,
  });
  useEffect(() => {
    if (
      chartSettings.chartType === CHART_TYPES.row ||
      chartSettings.chartType === CHART_TYPES.horizontalStack
    ) {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          barRadius: [
            barRadius.bottomRadius,
            barRadius.topRadius,
            barRadius.topRadius,
            barRadius.bottomRadius,
          ],
        },
      }));
    } else {
      setChartSettings((prev) => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          barRadius: [
            barRadius.topRadius,
            barRadius.topRadius,
            barRadius.bottomRadius,
            barRadius.bottomRadius,
          ],
        },
      }));
    }
  }, [
    barRadius.topRadius,
    barRadius.bottomRadius,
    setChartSettings,
    chartSettings.chartType,
  ]);
  return (
    <div className={styles.chartButtonContainer}>
      <div className={styles['settingsTab-header-control']}>
        <Button
          type="button"
          variant="tab"
          onClick={() => setSelectedTab(GENERAL)}
        >
          {selectedTab === GENERAL && <div style={buttonColor}>General</div>}
          {selectedTab !== GENERAL && 'General'}
        </Button>
        {isShowChartConfigTab && (
          <Button
            type="button"
            variant="tertiary"
            className={`${styles.chartButton} ${
              selectedTab === CONFIG && styles.chartButtonSelected
            } ${
              chartSettings.chartType === CHART_TYPES.pivot ||
              chartSettings.chartType === CHART_TYPES.treeMap
                ? styles.disable
                : ''
            }`}
            onClick={() => {
              chartSettings.chartType === CHART_TYPES.pivot ||
              chartSettings.chartType === CHART_TYPES.treeMap
                ? setSelectedTab(GENERAL)
                : setSelectedTab(CONFIG);
            }}
          >
            {selectedTab === CONFIG && (
              <div style={buttonColor}>Configuration</div>
            )}
            {selectedTab !== CONFIG && 'Configuration'}
          </Button>
        )}
      </div>
      {selectedTab === GENERAL && (
        <>
          <div className={styles.tabContainer}>
            <Tab
              activeTab={activeTab}
              options={[FIRST_TAB, SECOND_TAB]}
              setActiveTab={setActiveTab}
              className={styles.tab}
              tabText={styles.tabText}
            />
          </div>
          {activeTab === FIRST_TAB && (
            <div className={styles.button}>
              <ChartModalOptions
                chartType={chartSettings.chartType}
                onChartChange={(chartType) => {
                  defaultChartProperties({
                    chartType,
                    data: data || [],
                    setChartSettings,
                    groupbyList,
                  });
                }}
                isEnableTimeSeries={false}
                isEnablePivotTable={isEnablePivotTable}
                hasNumberKeys={hasNumberKeys}
                isEnableGauge={isEnableGauge}
                enableCharts={enableCharts}
              />
            </div>
          )}
          {activeTab === SECOND_TAB && (
            <>
              <div className={styles.button}>
                <ChartConfig
                  data={data}
                  chartSettings={chartSettings}
                  setChartSettings={setChartSettings}
                  groupbyList={groupbyList}
                />
              </div>
            </>
          )}
        </>
      )}
      {selectedTab === CONFIG && (
        <ChartConfigure
          chartSettings={chartSettings}
          setChartSettings={setChartSettings}
          setBarRadius={setBarRadius}
          onChangeTimeseriesFormat={() => {}}
        />
      )}
    </div>
  );
};
