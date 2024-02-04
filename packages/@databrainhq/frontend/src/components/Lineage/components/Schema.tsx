import { Ui } from '@databrainhq/plugin';
import styles from './schema.module.css';

const Schema = ({ data }: any) => {
  return (
    <div className={styles['schema-container']}>
      <Ui.Text>{data.value}</Ui.Text>
      {data?.columns?.map((c: string) => (
        <Ui.Text variant="body-text-sm">{c}</Ui.Text>
      ))}
    </div>
  );
};

export default Schema;
