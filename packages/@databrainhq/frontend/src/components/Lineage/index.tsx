import { Ui } from '@databrainhq/plugin';
import TreeGraph from './components/TreeGraph';
import styles from './lineage.module.css';

const Lineage = ({ query, setLinegaeData, nodeList, edgesList }: any) => {
  return (
    <div className={styles['lineage-container']}>
      <div className={styles['lineage-header']}>
        <Ui.Text>Lineage</Ui.Text>
      </div>
      <div className={styles['lineage-wrapper']}>
        <TreeGraph
          query={query}
          setLinegaeData={setLinegaeData}
          edgesList={edgesList}
          nodeList={nodeList}
        />
      </div>
    </div>
  );
};

export default Lineage;
