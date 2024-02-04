import { Ui } from '@databrainhq/plugin';
import { ChartSettingsType } from '@databrainhq/plugin/src/types';
import styles from './manageColumns.module.css';

type Props = {
  data: Record<string, any>[];
  chartSettings: ChartSettingsType;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettingsType>>;
  groupbyList: string[];
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
};

const ChartPropertiesPanel = ({
  ChartPropertiesPanelProps: {
    chartSettings,
    data,
    groupbyList,
    isOpen,
    onClose,
    setChartSettings,
    onBack,
  },
}: {
  ChartPropertiesPanelProps: Props;
}) => {
  return (
    <Ui.Panel
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      side="right"
      hideFooter
      headerTitle={`${chartSettings.chartType} chart`}
      icon={
        <Ui.Button variant="tertiary" onClick={() => onBack()}>
          <Ui.Icons name="arrow-left" />
        </Ui.Button>
      }
    >
      <div className={styles.chartPropertiesPanel}>
        <Ui.ChartConfig
          data={data}
          chartSettings={chartSettings}
          setChartSettings={setChartSettings}
          groupbyList={groupbyList}
        />
      </div>
    </Ui.Panel>
  );
};

export default ChartPropertiesPanel;
