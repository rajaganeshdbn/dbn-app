/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/forbid-elements */
import { useState, useRef, useEffect } from 'react';
import { types, Ui } from '@databrainhq/plugin';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCompanyIntegrationQuery } from 'utils/generated/graphql';
import { required } from 'consts/validations';
import Lineage from 'components/Lineage';
import MetricSqlEditor from 'components/MetricSqlEditor';
import useDataModel from 'hooks/useDataModel';
import useWorkspace from 'hooks/useWorkspace';
import useExecuteSqlQuery from 'hooks/useExecuteSqlQuery';
import { getCurrentUser } from 'helpers/application/auth';
import styles from './createDataModel.module.css';

const CreateDataModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEditorFullScreen, setEditorFullScreen] = useState(true);
  const [isShowSaveForm, setShowSaveForm] = useState(false);
  const [isModelCreating, setModelCreating] = useState(false);
  const [modelError, setModelError] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<types.SqlError>();
  const [data, setData] = useState<any[]>();
  const [nodeList, setNodeList] = useState<any[]>();
  const [edgesList, setEdgeList] = useState<any[]>();

  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const {
    data: companyIntegrationData,
    isLoading: isCompanyIntegrationLoading,
  } = useCompanyIntegrationQuery(
    { workspaceId: workspace?.id },
    { enabled: !!workspace?.id }
  );

  const destination = companyIntegrationData?.companyIntegrations[0];

  const { createViewDataModel } = useDataModel({
    companyId: user?.companyId,
    destinationId: destination?.id,
    query,
    setModelCreating,
    setModelError,
    nodeList,
    edgesList,
    dbName: destination?.name,
  });
  const wrapperRef = useRef(null);
  const useOutsideAlerter = (wrapRef: any) => {
    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
          setShowSaveForm(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [wrapRef]);
  };
  useOutsideAlerter(wrapperRef);
  const { onSqlQuerySubmit, executeQuery } = useExecuteSqlQuery({
    query,
    setData,
    setLoading,
    setError,
    setEdgeList,
    setNodeList,
    destinationId: destination?.id,
    dbName: destination?.name,
    limit: '100',
    setQuery,
  });
  return (
    <>
      {!isCompanyIntegrationLoading && destination && (
        <div className={styles['createDataModel-container']}>
          <div className={styles['createDataModel-header']}>
            <Link
              to="/dataModel"
              className="dbn-flex dbn-gap-2 dbn-items-center"
            >
              <Ui.Icons name="arrow-left" />
              <Ui.Text variant="heading-lg">Back</Ui.Text>
            </Link>
            <div className="dbn-flex dbn-gap-5 dbn-items-center">
              <Ui.Button
                type="submit"
                variant="primary"
                isDisabled={!query || !data?.length}
                onClick={() => setShowSaveForm(true)}
              >
                Save
              </Ui.Button>
            </div>
          </div>
          <div className={styles['createDataModel-wrapper']}>
            <div className={styles['createDataModel-top-container']}>
              <MetricSqlEditor
                query={query}
                setQuery={setQuery}
                onExecute={executeQuery}
                onSubmit={onSqlQuerySubmit}
                isLoading={isLoading}
              />
              <div
                className={
                  isEditorFullScreen
                    ? 'dbn-w-[60%] dbn-h-full'
                    : 'dbn-w-full dbn-h-full'
                }
              >
                <Ui.Table
                  data={Array.isArray(data) ? data : [{ sample: 'sample' }]}
                  isLoading={isLoading}
                  error={error?.errorMessage || ''}
                  filterValues={[]}
                  onMaximize={() => {}}
                />
              </div>
            </div>
            <div className={styles['createDataModel-bottom-container']}>
              <Lineage
                query={query}
                edgesList={edgesList}
                nodeList={nodeList}
              />
            </div>
          </div>
          {isShowSaveForm && (
            <div className={styles['saveform-container']}>
              <div className={styles['saveform-wrapper']} ref={wrapperRef}>
                <div className={styles['saveform-header']}>
                  <Ui.Text>Save Data Model</Ui.Text>
                  <Ui.Button
                    type="button"
                    variant="tertiary"
                    isDisabled={isModelCreating}
                    onClick={() => setShowSaveForm(false)}
                    leftIcon={<Ui.Icons name="cross" />}
                  />
                </div>

                <form
                  className={styles['saveform-form']}
                  onSubmit={handleSubmit(createViewDataModel)}
                >
                  <div className="">
                    <Ui.InputField
                      label="Model Name"
                      type=""
                      placeholder="Enter name"
                      error={errors.name?.message}
                      register={register('name', required)}
                    />
                  </div>
                  <div className="">
                    <Ui.InputField
                      label={
                        destination?.name?.toLowerCase() === 'bigquery'
                          ? 'dataset ID'
                          : 'schema name'
                      }
                      type=""
                      placeholder={
                        destination?.name?.toLowerCase() === 'bigquery'
                          ? 'Enter dataset ID'
                          : 'Enter schema name'
                      }
                      error={errors.databaseName?.message}
                      register={register('databaseName', required)}
                    />
                  </div>
                  <Ui.InputField
                    label="Description"
                    type=""
                    placeholder="Enter description here"
                    error={errors.description?.message}
                    register={register('description', required)}
                  />
                  <Ui.Text variant="body-text-sm">Materialise as a</Ui.Text>
                  <div className="dbn-flex dbn-gap-5 dbn-ml-1">
                    <div className="dbn-flex dbn-items-center dbn-gap-2">
                      <input type="radio" name="materialise" />
                      <Ui.Text variant="body-text-sm">View</Ui.Text>
                    </div>
                    <div className="dbn-flex dbn-items-center dbn-gap-2">
                      <input type="radio" name="materialise" />
                      <Ui.Text variant="body-text-sm">Table</Ui.Text>
                    </div>
                  </div>
                  {modelError && (
                    <Ui.Text variant="body-text-sm" color="alert">
                      {modelError}
                    </Ui.Text>
                  )}
                  <div className={styles['saveform-form-btn']}>
                    <div className="dbn-flex dbn-items-center dbn-gap-5">
                      {isModelCreating && (
                        <Ui.Text variant="body-text-sm" color="info">
                          model creating...
                        </Ui.Text>
                      )}
                      <Ui.Button
                        type="submit"
                        variant="primary"
                        isDisabled={isModelCreating}
                      >
                        Save
                      </Ui.Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {!destination && isCompanyIntegrationLoading && (
        <div className={styles['dataModel-loader-container']}>
          <Ui.Icons name="not-found" /> {/* loading icon */}
        </div>
      )}
      {!destination && !isCompanyIntegrationLoading && (
        <div className={styles['dataModel-alt-container']}>
          <div className={styles['dataModel-alt-wrapper']}>
            <Ui.Text variant="heading">No Datawarehouse connected yet</Ui.Text>
            <Link to="/integrations/destinations">
              <Ui.Button type="button" variant="primary">
                Connect
              </Ui.Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDataModel;
