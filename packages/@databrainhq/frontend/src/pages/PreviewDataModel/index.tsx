/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/forbid-elements */
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  useCompanyIntegrationQuery,
  useGetDataModelQuery,
} from 'utils/generated/graphql';
import { types, Ui } from '@databrainhq/plugin';
import { required } from 'consts/validations';
import { DESTINATION_AIRBYTE_IDS } from 'consts/values';
import Lineage from 'components/Lineage';
import MetricSqlEditor from 'components/MetricSqlEditor';
import useDataModel from 'hooks/useDataModel';
import useExecuteSqlQuery from 'hooks/useExecuteSqlQuery';
import useWorkspace from 'hooks/useWorkspace';
import { getCurrentUser } from 'helpers/application/auth';
import styles from './previewDataModel.module.css';

const PreviewDataModel = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isEditorFullScreen, setEditorFullScreen] = useState(true);
  const [isShowUpdateForm, setShowUpdateForm] = useState(false);
  const [isModelCreating, setModelCreating] = useState(false);
  const [modelError, setModelError] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<types.SqlError>();
  const [data, setData] = useState<any[]>();
  const [lineageError, setLineageError] = useState('');
  const [dbName, setDbName] = useState('');

  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const {
    data: companyIntegrationData,
    isLoading: isCompanyIntegrationLoading,
  } = useCompanyIntegrationQuery({ workspaceId: workspace?.id });

  const destination = companyIntegrationData?.companyIntegrations[0];

  const [nodeList, setNodeList] = useState<any[]>();
  const [edgesList, setEdgeList] = useState<any[]>();
  const { updateViewDataModel } = useDataModel({
    companyId: user?.companyId,
    destinationId: destination?.id,
    query,
    setModelCreating,
    setModelError,
    nodeList,
    edgesList,
    id,
    dbName,
  });
  const { data: modelData } = useGetDataModelQuery({ id });
  const { onSqlQuerySubmit, executeQuery } = useExecuteSqlQuery({
    query: modelData?.dataModels_by_pk?.query as string,
    setData,
    setLoading,
    setError,
    destinationId: modelData?.dataModels_by_pk?.destinationId,
    dbName: modelData?.dataModels_by_pk?.dbName,
    setQuery,
    limit: '100',
    setEdgeList,
    setNodeList,
  });
  useEffect(() => {
    setQuery(modelData?.dataModels_by_pk?.query as string);
  }, [modelData?.dataModels_by_pk?.query]);
  useEffect(() => {
    try {
      setNodeList(
        JSON.parse(modelData?.dataModels_by_pk?.lineageData || []).nodeList
      );
      setEdgeList(
        JSON.parse(modelData?.dataModels_by_pk?.lineageData || []).edgesList
      );
    } catch (e) {
      setLineageError(e as string);
    }
  }, [modelData?.dataModels_by_pk?.lineageData]);
  useEffect(() => {
    setDbName(modelData?.dataModels_by_pk?.dbName as string);
  }, [modelData?.dataModels_by_pk?.dbName]);
  useEffect(() => {
    if (
      (modelData?.dataModels_by_pk?.destinationId,
      modelData?.dataModels_by_pk?.dbName)
    )
      onSqlQuerySubmit();
  }, [
    modelData?.dataModels_by_pk?.destinationId,
    modelData?.dataModels_by_pk?.dbName,
  ]);
  const wrapperRef = useRef(null);
  const useOutsideAlerter = (wrapRef: any) => {
    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
          setShowUpdateForm(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [wrapRef]);
  };
  useOutsideAlerter(wrapperRef);
  useEffect(() => {
    const name = modelData?.dataModels_by_pk?.name;
    const databaseName = modelData?.dataModels_by_pk?.databaseName;
    if (name) setValue('name', name);
    if (databaseName) setValue('databaseName', databaseName);
  }, [modelData?.dataModels_by_pk]);

  return (
    <>
      {!isCompanyIntegrationLoading && destination && (
        <div className={styles['previewDataModel-container']}>
          <div className={styles['previewDataModel-header']}>
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
                onClick={() => setShowUpdateForm(true)}
              >
                Update
              </Ui.Button>
            </div>
          </div>
          <div className={styles['previewDataModel-wrapper']}>
            <div className={styles['previewDataModel-top-container']}>
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
                  error={error?.errorMessage || ''}
                  isLoading={isLoading}
                  filterValues={[]}
                  onMaximize={() => {}}
                />
              </div>
            </div>
            <div className={styles['previewDataModel-bottom-container']}>
              <Lineage
                query={query}
                edgesList={edgesList}
                nodeList={nodeList}
              />
            </div>
          </div>
          {isShowUpdateForm && (
            <div className={styles['updateForm-container']}>
              <div className={styles['updateForm-wrapper']} ref={wrapperRef}>
                <div className={styles['updateForm-header']}>
                  <Ui.Text>Update Data Model</Ui.Text>
                  <Ui.Button
                    type="button"
                    variant="tertiary"
                    isDisabled={isModelCreating}
                    onClick={() => setShowUpdateForm(false)}
                    leftIcon={<Ui.Icons name="cross" />}
                  />
                </div>

                <form
                  className={styles['updateForm-form']}
                  onSubmit={handleSubmit(updateViewDataModel)}
                >
                  <div className="">
                    <Ui.InputField
                      label="Model Name"
                      type=""
                      placeholder="Enter name"
                      error={errors.name?.message}
                      register={register('name', required)}
                      defaultValue={modelData?.dataModels_by_pk?.name}
                      isDisabled={!!modelData?.dataModels_by_pk?.name}
                    />
                  </div>

                  <Ui.InputField
                    label="Description"
                    type=""
                    placeholder="Enter description here"
                    error={errors.description?.message}
                    register={register('description', required)}
                    defaultValue={modelData?.dataModels_by_pk?.description}
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
                  <div className={styles['updateForm-form-btn']}>
                    <div className="dbn-flex dbn-items-center dbn-gap-5">
                      {isModelCreating && (
                        <Ui.Text variant="body-text-sm" color="info">
                          model updating...
                        </Ui.Text>
                      )}
                      <Ui.Button
                        type="submit"
                        variant="primary"
                        isDisabled={isModelCreating}
                      >
                        update
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
          <Ui.Icons name="not-found" />\{/* loading icon */}
        </div>
      )}
      {!destination && !isCompanyIntegrationLoading && (
        <div className={styles['dataModel-alt-container']}>
          <div className={styles['dataModel-alt-wrapper']}>
            <Ui.Text variant="heading">
              No Datawarehouse(Snowflake) connected yet
            </Ui.Text>
            <Link to={`/destination/${DESTINATION_AIRBYTE_IDS.Snowflake}`}>
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

export default PreviewDataModel;
