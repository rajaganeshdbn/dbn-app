import { MetricData } from 'types';
import { Ui } from '@databrainhq/plugin';
import MetricRow from './MetricRow';
import styles from './metrictable.module.css';

type Props = {
  metricList: MetricData[];
};

const MetricTable = ({ metricList }: Props) => {
  const header = [
    'Metric name',
    'Description',
    'Created by',
    'Date Created',
    'Manage',
  ];
  return (
    <div className={styles.tableDiv}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            {header.map((item) => {
              return (
                <th className="dbn-px-4 dbn-text-left" scope="col">
                  <Ui.Text variant="heading-lg">{item}</Ui.Text>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {metricList.map((item) => (
            <MetricRow
              id={item.id}
              name={item.name}
              createdBy={item.createdBy}
              dashboards={item.dashboards}
              dateCreated={item.dateCreated}
              description={item.description}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricTable;
