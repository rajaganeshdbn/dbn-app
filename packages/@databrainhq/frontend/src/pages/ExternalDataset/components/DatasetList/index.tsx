/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui } from '@databrainhq/plugin';
import { Link, useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import { useCompanyIntegrationQuery } from 'utils/generated/graphql';
import { MONGODB } from 'consts/application';
import Loader from 'components/Loader';
import useExternalDatasetList from 'hooks/useExternalDatasetList';
import useWorkspace from 'hooks/useWorkspace';
import timeAgo from 'helpers/application/timesAgo';
import styles from './datasetlist.module.css';

const DatasetList = () => {
  const navigate = useNavigate();
  const { externalDatasetList, isLoading: isLoadingList } =
    useExternalDatasetList();
  const { workspace } = useWorkspace();
  const { data } = useCompanyIntegrationQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: !!workspace?.id }
  );
  const dbDetails = useMemo(
    () => ({
      name: data?.companyIntegrations?.[0]?.name,
      id: data?.companyIntegrations?.[0]?.id,
    }),
    [data?.companyIntegrations]
  );
  const tableHeader = ['Name', 'Type', 'Created'];
  const datasetList = useMemo(
    () =>
      externalDatasetList.map((d) => ({
        id: d.id,
        name: d.tableName,
        type: d.type,
        created: timeAgo(Date.parse(d.createdAt)),
      })),
    [externalDatasetList]
  );
  return (
    <>
      {dbDetails?.name?.toLowerCase() === MONGODB ? (
        <div className="dbn-h-full dbn-w-full dbn-flex dbn-items-center dbn-justify-center">
          <div className="dbn-flex dbn-flex-col dbn-gap-4 dbn-items-center dbn-justify-center dbn-w-[30%]">
            <Ui.Text>Not Supported Yet</Ui.Text>
            <Ui.Text variant="body-text-sm">
              creating dataset for Mongo DB is not supported yet.
            </Ui.Text>
          </div>
        </div>
      ) : (
        <div className="dbn-w-full dbn-h-full">
          <div className={styles['dataset-header']}>
            <Link to="/externalDataset/new">
              <Ui.Button type="button" variant="primary">
                Create Dataset
              </Ui.Button>
            </Link>
          </div>
          {datasetList.length > 0 && (
            <div className="dbn-w-full dbn-h-[90%] dbn-p-5">
              <Ui.Text variant="heading-lg">Dataset</Ui.Text>
              <div className={styles.tableDiv}>
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.tableHead}>
                      {tableHeader.map((item) => {
                        return (
                          <th className="dbn-px-4 dbn-text-left" scope="col">
                            <Ui.Text variant="heading-lg">{item}</Ui.Text>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {datasetList.map((item) => (
                      <tr
                        key={item.id}
                        className="dbn-border-t hover:dbn-cursor-pointer"
                        onClick={() => navigate(`/externalDataset/${item.id}`)}
                      >
                        <td className="dbn-px-4 dbn-text-left">
                          <Ui.Text variant="heading-lg">{item.name}</Ui.Text>
                        </td>
                        <td className="dbn-px-4 dbn-text-left">
                          {item.type === 'view' && (
                            <Ui.Text variant="heading-lg">
                              <Ui.Icons name="table" />
                              materialised
                            </Ui.Text>
                          )}
                          {item.type === 'raw' && (
                            <div className="dbn-text-sm dbn-px-2 dbn-py-1 dbn-rounded-full dbn-bg-green-200 dbn-flex dbn-gap-2 dbn-items-center dbn-cursor-default dbn-w-fit">
                              <Ui.Icons name="not-found" />
                              {/* raw table */}
                              raw table
                            </div>
                          )}
                        </td>
                        <td className="dbn-px-4 dbn-text-left">
                          <Ui.Text variant="body-text-sm">
                            {item.created}
                          </Ui.Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {datasetList.length === 0 && isLoadingList && (
            <div className="dbn-h-[90%] dbn-w-full dbn-flex dbn-items-center dbn-justify-center">
              <div className="dbn-flex dbn-flex-col dbn-gap-4">
                <Loader />
                <Ui.Text variant="body-text-sm">Loading datasets...</Ui.Text>
              </div>
            </div>
          )}
          {datasetList.length === 0 && !isLoadingList && (
            <div className="dbn-h-[90%] dbn-w-full dbn-flex dbn-items-center dbn-justify-center">
              <div className="dbn-flex dbn-flex-col dbn-gap-4 dbn-items-center dbn-justify-center dbn-w-[30%]">
                <Ui.Text>No dataset created yet</Ui.Text>
                <Ui.Text variant="body-text-sm">
                  Start creating a new dataset by clicking the create dataset
                  button
                </Ui.Text>
                <Link to="/externalDataset/new">
                  <Ui.Button type="button" variant="primary">
                    Create Dataset
                  </Ui.Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(DatasetList);
