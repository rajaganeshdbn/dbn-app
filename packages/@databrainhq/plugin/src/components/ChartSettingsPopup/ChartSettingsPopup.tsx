/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/forbid-dom-props */
import React from 'react';
import styles from './chartSettings.module.css';
import { ChartSettings } from './components/ChartSettings';
import { ChartSettingsType, DatasetSettings, PivotSettingsType } from '@/types';
import { PopoverMenu, PopoverMenuProps, Icons } from '@/components';

export type ChartSettingsPopupProps = {
  data?: Record<string, any>[];
  settings: ChartSettingsType;
  setSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  isEnablePivotTable: boolean;
  groupbyList: any[];
  hasNumberKeys: boolean;
  isEnableGauge: boolean;
  isShowChartConfigTab?: boolean;
};

export const ChartSettingsPopup = ({
  data,
  settings,
  setSettings,
  isEnablePivotTable,
  groupbyList,
  hasNumberKeys,
  isEnableGauge,
  isShowChartConfigTab = true,
}: ChartSettingsPopupProps) => {
  return (
    <PopoverMenu
      buttonContent={
        <>
          <Icons name="not-found" /> {/* setup-icon */}
          <span>Chart Settings</span>
        </>
      }
    >
      <ChartSettings
        data={data}
        setChartSettings={setSettings}
        chartSettings={settings}
        isEnablePivotTable={isEnablePivotTable}
        groupbyList={groupbyList}
        hasNumberKeys={hasNumberKeys}
        isEnableGauge={isEnableGauge}
        isShowChartConfigTab={isShowChartConfigTab}
      />
    </PopoverMenu>
  );
};
