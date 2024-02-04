import { MetricData } from 'types';
import { Ui } from '@databrainhq/plugin';
import MetricRow from './MetricRow';
import styles from './metrictable.module.css';

type Props = {
  metricList: MetricData[];
  canPerformActions: boolean;
};

const MetricTable = ({ metricList, canPerformActions }: Props) => {
  const header = ['Metric name', 'Description', 'Created by', 'Date Created'];
  return (
    <div className={styles.tableDiv}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            {header.map((item) => {
              return (
                <th className="dbn-px-4 dbn-text-left" scope="col" key={item}>
                  <Ui.Text variant="heading-lg">{item}</Ui.Text>
                </th>
              );
            })}
            {canPerformActions ? (
              <th className="dbn-px-4 dbn-text-left" scope="col">
                <Ui.Text variant="heading-lg">Manage</Ui.Text>
              </th>
            ) : null}
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
              canPerformActions={canPerformActions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricTable;
