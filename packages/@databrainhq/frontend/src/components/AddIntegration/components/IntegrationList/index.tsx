/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui } from '@databrainhq/plugin';
import { NavLink } from 'react-router-dom';
import { Integration } from 'types/integration';
import IntegrationCard from 'components/IntegrationCard';
import styles from './integrationList.module.css';

type Props = {
  integrationDataList: Integration[];
};

const loaderDiv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const IntegrationList = ({ integrationDataList }: Props) => {
  return (
    <div className={styles['integrationList-container']}>
      <Ui.Text variant="heading-lg">Select your Data Warehouse</Ui.Text>
      <div className={styles['integrationList-card-container']}>
        {integrationDataList?.map((item) => (
          <IntegrationCard integration={item} key={item.id} />
        ))}
        {!integrationDataList?.length ? (
          <>
            {loaderDiv.map((item) => (
              <div className={styles['integrationCard-container']}>
                <div className={styles['integrationCard-inner-container']}>
                  <Ui.SkeletonLoader className="dbn-h-full" />
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default IntegrationList;
