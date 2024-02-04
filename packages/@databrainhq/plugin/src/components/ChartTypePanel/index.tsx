import React from 'react';
import styles from './chartTypePanel.module.css';
import { Button, Panel, Text } from '@/components';
import { CHART_TYPES, chartOptions } from '@/consts';

type ChartType = keyof typeof CHART_TYPES;
type Props = {
  onChartChange: (chartType: ChartType) => void;
  selectedChart: ChartType;
  enabledCharts: string[];
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
};
export const ChartTypePanel = ({
  chartTypePanelProps: {
    onChartChange,
    enabledCharts,
    selectedChart,
    isOpen,
    onClose,
    zIndex,
  },
}: {
  chartTypePanelProps: Props;
}) => {
  return (
    <Panel
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      side="right"
      hideFooter
      headerTitle="Chart Types"
      zIndex={zIndex}
    >
      <div className={styles.chartOptions}>
        {chartOptions.map((option) => (
          <div className={styles.chartOption} key={option.name}>
            <Button
              type="button"
              variant="popover"
              onClick={() => {
                onChartChange(option.name.toLowerCase() as ChartType);
              }}
              key={option.name}
              isDisabled={!enabledCharts.includes(option.name.toLowerCase())}
              className="dbn-w-full"
            >
              <div
                className={`${styles.imgDiv} ${
                  option.name.toLowerCase() !== selectedChart
                    ? 'dbn-border-secondary'
                    : 'dbn-border-primary dbn-border-2'
                }`}
              >
                <img
                  src={option.icon}
                  alt=""
                  // eslint-disable-next-line react/forbid-dom-props
                  style={{ width: '150px', height: '100px' }}
                />
              </div>
            </Button>
            <Text variant="body-text-sm">{option.name}</Text>
          </div>
        ))}
      </div>
    </Panel>
  );
};
