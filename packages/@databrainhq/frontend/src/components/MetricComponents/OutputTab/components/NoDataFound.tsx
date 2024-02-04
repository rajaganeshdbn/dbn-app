import { Ui } from '@databrainhq/plugin';
// todo: fix file path
// eslint-disable-next-line import/no-relative-parent-imports
import NoData from '../../../Svg/No_data.svg';
import styles from './tab.module.css';

const NoDataFound = ({
  message,
  children,
}: {
  message: string;
  children?: JSX.Element;
}) => {
  return (
    <div className={styles.metricChartEmpty}>
      <img src={NoData} alt="no-data" width="300px" height="300px" />
      <div className={styles.chartButton}>
        <Ui.Text variant="heading">{message}</Ui.Text>
      </div>
      {children}
    </div>
  );
};

export default NoDataFound;
