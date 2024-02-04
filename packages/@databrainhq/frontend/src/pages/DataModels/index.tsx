import { Link } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import { useDataModelListQuery } from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';
import styles from './dataModels.module.css';

const DataModel = () => {
  const user = getCurrentUser();
  const { data, isLoading } = useDataModelListQuery(
    {
      companyId: user?.companyId,
    },
    { enabled: !!user?.companyId }
  );
  const dataModelList = data?.dataModels;
  return (
    <div className={styles['dataModels-container']}>
      <div className={styles['dataModels-btn']}>
        <Link to="/dataModel/new">
          <Ui.Button type="button" variant="primary">
            + New Model
          </Ui.Button>
        </Link>
      </div>
      {!!dataModelList?.length && !isLoading && (
        <div className={styles['dataModels-wrapper']}>
          <Ui.Text variant="heading">Data Models</Ui.Text>
          <div className={styles['dataModels-list-container']}>
            <div className={styles['dataModels-list-header']}>
              <Ui.Text variant="heading">Model</Ui.Text>
              <Ui.Text variant="heading">Description</Ui.Text>
              <Ui.Text variant="heading">Created Date</Ui.Text>
            </div>
            {dataModelList.length &&
              dataModelList.map((model) => (
                <Link
                  to={`/dataModel/preview/${model.id}`}
                  className={styles['dataModels-list-item']}
                  key={`${model.name}_${model.id}`}
                >
                  <Ui.Text variant="body-text-sm">{model.name}</Ui.Text>
                  <Ui.Text variant="body-text-sm">{model.description}</Ui.Text>
                  <Ui.Text variant="body-text-sm">{model.createdAt}</Ui.Text>
                </Link>
              ))}
          </div>
        </div>
      )}
      {!isLoading && !dataModelList?.length && (
        <div className={styles['dataModels-alt-container']}>
          <div className={styles['dataModels-alt-wrapper']}>
            <Ui.Text variant="heading">No Data models created yet</Ui.Text>
            <Ui.Text variant="body-text-sm">
              Start creating a new model by clicking the create new model button
            </Ui.Text>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={styles['dataModel-loader-container']}>
          <Ui.Icons name="not-found" /> {/* loading icon */}
        </div>
      )}
    </div>
  );
};

export default DataModel;
