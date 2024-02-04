/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useMemo, useState } from 'react';
import {
  useCacheIntegrationSchemaMutation,
  useCompanyIntegrationQuery,
  useCreateExternalDatsetMutation,
  useCreateViewInDbMutation,
  useDeleteExternalDatasetMutation,
  useExternalDatasetQuery,
  useSqlQueryMutation,
  useUpdateDatasetMutation,
} from 'utils/generated/graphql';
import { types, helpers } from '@databrainhq/plugin';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { SOMETHING_WENT_WRONG, SUCCEEDED } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';
import getColumnTypes from 'helpers/application/getColumnType';
import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';
import useCompanySchema from './useCompanySchema';
import useWorkspace from './useWorkspace';

export type CompanyIntegration =
  | {
      id: string;
      name: string;
    }
  | undefined;
export type Column = {
  selected: boolean;
  name: string;
  datatype: string;
  as: string;
};
const getSchemaList = (schema: any) => {
  try {
    const list = JSON.parse(schema || '');
    return list?.filter((item: any) => !item.tableName.includes('_airbyte'));
  } catch (error) {
    return schema?.filter((item: any) => !item.tableName.includes('_airbyte'));
  }
};
const useExternalDataset = (id: string, workspaceId?: string | null) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const queryClient = useQueryClient();

  const { workspaces, workspace, setWorkspace } = useWorkspace();
  useEffect(() => {
    if (workspaces.length && workspaceId !== undefined) {
      const selectedWorkspace = workspaces?.find((w) => w.id === workspaceId);
      if (workspaceId && selectedWorkspace) {
        setWorkspace(selectedWorkspace);
      }
      if (!selectedWorkspace) navigate('/');
    }
  }, [workspaceId, workspaces.length]);
  const { handleSubmit, control, watch, register, setValue } = useForm();
  const TABS =
    id !== 'new' && watch('type') === 'view'
      ? ['Materialise Table']
      : ['Materialise Table', 'Raw Table'];
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<types.SqlError>({
    errorMessage: '',
    explanation: '',
    solution: '',
  });
  const [selectedTableName, setSelectedTableName] = useState('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [queriedColumns, setQueriedColumns] = useState<Column[]>([]);
  const [companyIntegration, setCompanyIntegration] =
    useState<CompanyIntegration>();
  const [selectedTab, setSelectedTab] = useState(TABS[1]);
  const [isDisabledButton, setDisabledButton] = useState(false);
  const [createError, setCreateError] = useState('');
  const [limit, setLimit] = useState('100');

  const {
    data: companyIntegrationData,
    isLoading: isCompanyIntegrationLoading,
  } = useCompanyIntegrationQuery(
    { workspaceId: workspace?.id },
    { enabled: !!workspace?.id }
  );

  const { data: externalDatasetData, isLoading: isLoadingDataset } =
    useExternalDatasetQuery({ id }, { enabled: !!id && id !== 'new' });

  useEffect(() => {
    const compIntdata = companyIntegrationData?.companyIntegrations[0];
    if (compIntdata)
      setCompanyIntegration({ id: compIntdata.id, name: compIntdata.name });
  }, [companyIntegrationData?.companyIntegrations]);

  useEffect(() => {
    const externaldataset = externalDatasetData?.externalDatasets_by_pk;
    if (externaldataset) {
      setQuery(externaldataset.query);
      setSelectedTableName(externaldataset.tableName);
      setColumns(externaldataset.columns);
      setValue('type', externaldataset.type);
      setValue('tableName', externaldataset.tableName);
      setValue('clientColumn', externaldataset.clientColumn);
      if (externaldataset.type === 'view') setSelectedTab(TABS[0]);
    }
  }, [externalDatasetData?.externalDatasets_by_pk, setValue]);

  const { schemaList, schemaMap } = useCompanySchema();
  const tableList = useMemo(
    () =>
      schemaList?.map((s: { schemaName: string; tableName: string }) => ({
        value: `${s.schemaName}.${s.tableName}`,
        label: `${s.schemaName}.${s.tableName}`,
      })) || [],
    [schemaList]
  );

  useEffect(() => {
    const columnsData = schemaList
      ?.find(
        (s: { schemaName: any; tableName: any }) =>
          `${s.schemaName}.${s.tableName}` === selectedTableName
      )
      ?.columnsWithDataType?.map((c: { name: string; dataType: string }) => ({
        name: c.name,
        as: c.name,
        datatype: c.dataType,
        selected: true,
      }));
    setColumns(columnsData || []);
  }, [schemaList, selectedTableName]);

  useEffect(() => {
    const columnType = getColumnTypes(data);
    const columnArray: Column[] = Object.keys(columnType).map((key) => ({
      as: key,
      datatype: columnType[key],
      name: key,
      selected: true,
    }));
    setQueriedColumns(columnArray);
  }, [data]);

  const type = watch().type;
  const clientColumnOptions = useMemo(
    () =>
      type === 'view'
        ? queriedColumns.map((c) => ({ value: c.as, label: c.as }))
        : columns
            .filter((c) => c.selected)
            .map((c) => ({ value: c.name, label: c.name })),
    [columns, queriedColumns, type]
  );

  const sqlQueryMutation = useSqlQueryMutation();
  const { mutate: createView } = useCreateViewInDbMutation();
  const cacheIntegrationSchemaMutation = useCacheIntegrationSchemaMutation();
  const deleteExternalDatasetMutation = useDeleteExternalDatasetMutation();
  const { mutate: createExternalDatasetMutate } =
    useCreateExternalDatsetMutation();
  const { mutate: updateDataset } = useUpdateDatasetMutation();

  const executeQuery = (queryString: string) => {
    setLoading(true);
    setData([]);
    setError({
      errorMessage: '',
      explanation: '',
      solution: '',
    });
    if (companyIntegration) {
      sqlQueryMutation.mutate(
        {
          id: companyIntegration.id,
          dbName: companyIntegration.name,
          filters: [],
          query: getLimitSqlQuery({
            query: queryString,
            limit,
            dbName: companyIntegration.name,
          }),
        },
        {
          onSuccess(queryData) {
            const result =
              queryData?.sqlQuery?.data &&
              typeof queryData?.sqlQuery.data === 'string'
                ? JSON.parse(queryData?.sqlQuery?.data)
                : queryData?.sqlQuery?.data || [];
            if (
              result.code ||
              result.message ||
              result.errorObj ||
              result.sqlMessage
            ) {
              setData([]);
              setError(result.errorObj);
              setLoading(false);
            }
            if (Array.isArray(result) && result.length > 0) {
              setData(result);
              setError({
                errorMessage: '',
                explanation: '',
                solution: '',
              });
              setLoading(false);
            } else {
              setData([]);
              setLoading(false);
            }
          },
          onError() {
            setData([]);
            setError({
              errorMessage: SOMETHING_WENT_WRONG,
              explanation: '',
              solution: '',
            });
            setLoading(false);
          },
        }
      );
    }
  };
  const companyIntegrationName = companyIntegration?.name?.toLowerCase();
  // const isBigQuery = companyIntegrationName === 'bigquery';
  // const isMySql = companyIntegrationName === 'mysql';
  // const isMongoDb = companyIntegrationName === 'mongodb';

  // const getColumnString = (name: string) => {
  //   const columnName = name.replace(' ', '_');

  //   if (isBigQuery || isMySql) {
  //     return columnName;
  //   }

  //   if (isMongoDb) {
  //     return `\`${columnName}\``;
  //   }

  //   return `"${columnName}"`;
  // };
  const handlePreview = () => {
    const previewQuery = `Select ${columns
      .filter((c) => c.selected)
      .map(
        (c) =>
          `${helpers.nameSpace(
            c.name,
            companyIntegrationName || ''
          )} AS ${helpers.nameSpace(c.as, companyIntegrationName || '')}`
      )} from ${selectedTableName}`;
    executeQuery(previewQuery);
    setQuery(previewQuery);
  };
  const createExternalDataset = (values: FieldValues) => {
    if (companyIntegration) {
      setDisabledButton(true);
      setCreateError('');
      if (values.type === 'view') {
        createView(
          {
            viewName:
              id !== 'new'
                ? values.tableName
                : `${values.databaseName}.${values.tableName}`,
            companyIntegrationId: companyIntegration.id,
            dbName: companyIntegration.name,
            query,
          },
          {
            onSuccess(d) {
              if (d.createViewInDb?.status === SUCCEEDED) {
                setSelectedTableName(
                  id !== 'new'
                    ? values.tableName
                    : `${values.databaseName}.${values.tableName}`
                );
                cacheIntegrationSchemaMutation.mutate(
                  {
                    companyId: user?.companyId,
                    companyIntegrationId: companyIntegration.id,
                    workspaceId: workspace?.id,
                  },
                  {
                    onSuccess: (response) => {
                      if (response.cacheIntegrationSchema?.data?.id) {
                        const schema =
                          response.cacheIntegrationSchema?.data?.schema;
                        const newSchemaList = getSchemaList(schema);
                        const newColumns =
                          newSchemaList
                            ?.find(
                              (s: { schemaName: any; tableName: any }) =>
                                `${s.schemaName}.${s.tableName}` ===
                                `${values.databaseName}.${values.tableName}`
                            )
                            ?.columnsWithDataType?.map(
                              (c: { name: string; dataType: string }) => ({
                                name: c.name,
                                as: c.name,
                                datatype: c.dataType,
                                selected: true,
                              })
                            ) || [];
                        if (id === 'new') {
                          createExternalDatasetMutate(
                            {
                              clientColumn: values.clientColumn,
                              columns: newColumns,
                              companyId: user?.companyId,
                              tableName: `${values.databaseName}.${values.tableName}`,
                              type: values.type,
                              query,
                              workspaceId: workspace?.id,
                            },
                            {
                              onSuccess(createResponse) {
                                if (
                                  createResponse.insert_externalDatasets_one?.id
                                ) {
                                  setDisabledButton(false);
                                  setCreateError('');
                                  navigate('/');
                                } else {
                                  setDisabledButton(false);
                                  setCreateError(SOMETHING_WENT_WRONG);
                                }
                              },
                              onError: () => {
                                setDisabledButton(false);
                                setCreateError(SOMETHING_WENT_WRONG);
                              },
                            }
                          );
                        } else {
                          updateDataset(
                            {
                              clientColumn: values.clientClolumn,
                              columns: columns.filter((c) => c.selected),
                              id,
                              query,
                              type: values.type,
                            },
                            {
                              onSuccess(createResponse) {
                                if (
                                  createResponse.update_externalDatasets_by_pk
                                    ?.id
                                ) {
                                  setDisabledButton(false);
                                  setCreateError('');
                                  navigate('/');
                                } else {
                                  setDisabledButton(false);
                                  setCreateError(SOMETHING_WENT_WRONG);
                                }
                              },
                              onError: () => {
                                setDisabledButton(false);
                                setCreateError(SOMETHING_WENT_WRONG);
                              },
                            }
                          );
                        }
                      } else {
                        setDisabledButton(false);
                        setCreateError(SOMETHING_WENT_WRONG);
                      }
                    },
                    onError: () => {
                      setDisabledButton(false);
                      setCreateError(SOMETHING_WENT_WRONG);
                    },
                  }
                );
              } else {
                setCreateError(SOMETHING_WENT_WRONG);
                setDisabledButton(false);
              }
            },
            onError: () => {
              setDisabledButton(false);
              setCreateError(SOMETHING_WENT_WRONG);
            },
          }
        );
      }
    }
    if (values.type === 'raw')
      if (
        selectedTableName &&
        queriedColumns.filter((c) => c.selected).length
      ) {
        if (id === 'new') {
          createExternalDatasetMutate(
            {
              clientColumn: values.clientColumn,
              columns: columns.filter((c) => c.selected),
              companyId: user?.companyId,
              tableName: selectedTableName,
              type: values.type,
              query,
              workspaceId: workspace?.id,
            },
            {
              onSuccess(createResponse) {
                if (createResponse.insert_externalDatasets_one?.id) {
                  setDisabledButton(false);
                  setOpen(false);
                  setCreateError('');
                  navigate('/');
                } else {
                  setDisabledButton(false);
                  setCreateError(SOMETHING_WENT_WRONG);
                }
              },
            }
          );
        } else {
          updateDataset(
            {
              clientColumn: values.clientClolumn,
              columns: columns.filter((c) => c.selected),
              id,
              query,
              type: values.type,
            },
            {
              onSuccess(createResponse) {
                if (createResponse.update_externalDatasets_by_pk?.id) {
                  setDisabledButton(false);
                  setOpen(false);
                  setCreateError('');
                  navigate('/');
                } else {
                  setDisabledButton(false);
                  setCreateError(SOMETHING_WENT_WRONG);
                }
              },
              onError: () => {
                setDisabledButton(false);
                setCreateError(SOMETHING_WENT_WRONG);
              },
            }
          );
        }
      } else {
        setDisabledButton(false);
        setCreateError('select table & columns from raw table');
      }
  };
  const deleteExternalDataset = (datasetId: string, tableName?: string) => {
    const deleteRecordFromDataset = () =>
      deleteExternalDatasetMutation.mutate(
        { id: datasetId },
        {
          onSuccess(_, variables) {
            queryClient.setQueryData(
              [
                'ExternalDatasetList',
                { companyId: user?.companyId, workspaceId: workspace?.id },
              ],
              (prev: any) => {
                const updatedDataset = prev?.externalDatasets?.filter(
                  (dash: any) => dash.id !== variables.id
                );
                return { ...prev, externalDatasets: [...updatedDataset] };
              }
            );
          },
        }
      );
    if (tableName && companyIntegration) {
      sqlQueryMutation.mutate(
        {
          id: companyIntegration?.id,
          dbName: companyIntegration?.name,
          filters: [],
          query: `DROP VIEW ${tableName}`,
        },
        {
          onSettled() {
            cacheIntegrationSchemaMutation.mutate({
              companyId: user?.companyId,
              companyIntegrationId: companyIntegration.id,
              workspaceId: workspace?.id,
            });
            deleteRecordFromDataset();
          },
        }
      );
    } else {
      deleteRecordFromDataset();
    }
  };

  const onSumbitQuery = handleSubmit(() => executeQuery(query));
  const onPreview = handleSubmit(handlePreview);
  const onSave = handleSubmit(createExternalDataset);
  return {
    onSumbitQuery,
    executeQuery,
    query,
    setQuery,
    data,
    error,
    isLoadingDataset: isCompanyIntegrationLoading || isLoadingDataset,
    selectedTab,
    TABS,
    setSelectedTab,
    isLoading,
    tableList,
    onPreview,
    columns,
    setColumns,
    onSave,
    isDisabledButton,
    setSelectedTableName,
    selectedTableName,
    createError,
    queriedColumns,
    setOpen,
    isOpen,
    control,
    type,
    register,
    clientColumnOptions,
    isDisableSave: !queriedColumns.length,
    externalDatasetData,
    limit,
    setLimit,
    schemaList,
    schemaMap,
    deleteExternalDataset,
    setValue,
    watch,
  };
};

export default useExternalDataset;
