import { Ui } from '@databrainhq/plugin';
import styles from './selectDatabase.module.css';

type Props = {
  databaseNameList: string[];
};
const SelectDatabase = ({ databaseNameList }: Props) => {
  return (
    <div className={styles['selectDatabase-container']}>
      <Ui.Text variant="heading-lg">
        Database list for customers identifiable information.
      </Ui.Text>
      <Ui.Text variant="body-text-sm" color="secondary-dark">
        Following database list will be use to identify your customers. Click
        complete to finish the setup.
      </Ui.Text>
      <div className="dbn-flex dbn-flex-col dbn-gap-2 dbn-max-h-[300px] dbn-overflow-auto dbn-mt-5">
        {databaseNameList.map((name) => (
          <div key={name} className="dbn-flex dbn-gap-2">
            <Ui.Icons name="database" />
            <Ui.Text variant="body-text-sm">{name}</Ui.Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDatabase;
