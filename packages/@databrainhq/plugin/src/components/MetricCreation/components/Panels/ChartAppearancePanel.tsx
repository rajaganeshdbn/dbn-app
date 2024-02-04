import React from 'react';
import styles from './panels.module.css';
import { ChartSettingsType } from '@/types';
import {
  ChartConfigure,
  ComparisonLagProps,
} from '@/components/ChartSettingsPopup';
import { Panel } from '@/components/Panel';

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
  comparisonLagProps?: ComparisonLagProps | undefined;
  setResetPallete: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChartAppearancePanel = ({
  ChartAppearancePanelProps: {
    chartSettings,
    isOpen,
    onClose,
    setChartSettings,
    setBarRadius,
    comparisonLagProps,
    setResetPallete,
  },
}: {
  ChartAppearancePanelProps: Props;
}) => {
  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      side="right"
      hideFooter
      headerTitle="Appearance"
    >
      <div className={styles.chartPropertiesPanel}>
        <ChartConfigure
          chartSettings={chartSettings}
          setChartSettings={setChartSettings}
          setBarRadius={setBarRadius}
          comparisonLagProps={comparisonLagProps}
          onChangeTimeseriesFormat={() => {}}
          setResetPallete={setResetPallete}
        />
      </div>
    </Panel>
  );
};

export default ChartAppearancePanel;
