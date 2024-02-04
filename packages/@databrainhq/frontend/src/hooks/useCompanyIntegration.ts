/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useCacheIntegrationSchemaMutation,
  useCreateCompanyIntegrationMutation,
  useDeleteCompanyIntegrationMutation,
  useDeleteIntegrationBasedDataMutation,
  useDeleteSchemaBasedDataMutation,
  useTestCompanyIntegrationMutation,
  useUpdateCompanyIntegrationCredsMutation,
} from 'utils/generated/graphql';
import { encryption } from 'utils/encryption';
import segmentEvent from 'utils/segmentEvent';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';
import useWorkspace from './useWorkspace';

type Props = {
  name?: string | undefined;
  integrationId?: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  companyIntegrationId?: string;
};
const useCompanyIntegration = ({
  name,
  integrationId,
  setError,
  setDisabled,
  companyIntegrationId,
}: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [searchParams] = useSearchParams();
  const [isFirstAttempt, setAttempt] = useState(true);
  const [connectedCompanyIntegrationId, setConnectedCompanyIntegrationId] =
    useState<string | null>(null);
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const testCompanyIntegrationMutation = useTestCompanyIntegrationMutation();
  const createCompanyIntegrationMutation =
    useCreateCompanyIntegrationMutation();
  const updateCredentialsMutation = useUpdateCompanyIntegrationCredsMutation();
  const deleteCompanyIntegrationMutation =
    useDeleteCompanyIntegrationMutation();
  const cacheIntegrationSchemaMutation = useCacheIntegrationSchemaMutation();
  const { mutate: cleanIntegrationBasedData } =
    useDeleteIntegrationBasedDataMutation();
  const { mutate: cleanSchemaBasedData } = useDeleteSchemaBasedDataMutation();

  const redirectToTableSettings = () => {
    setTimeout(() => {
      navigate('/datasourceTableSettings');
    }, 2000);
  };
  const setIntegrationIdSearchParam = (id: string) => {
    const navLink = `/integration/${integrationId}?id=${id}`;
    navigate(navLink);
    setConnectedCompanyIntegrationId(id);
  };
  const newIntegrationId = searchParams.get('id');
  const createCompanyIntegration = (data: any) => {
    const credentials = encryption({ value: data, type: 'encrypt' });
    setError('');
    setDisabled(true);
    setAuthenticated(false);
    testCompanyIntegrationMutation.mutate(
      { credentials, dbName: name },
      {
        onSuccess: (result) => {
          if (result.testIntegration?.result?.status) {
            if (
              (!isFirstAttempt && connectedCompanyIntegrationId) ||
              newIntegrationId
            ) {
              updateCredentialsMutation.mutate(
                {
                  credentials,
                  id: connectedCompanyIntegrationId || newIntegrationId,
                  isAuthenticated: true,
                },
                {
                  onSuccess: (res) => {
                    if (res.update_companyIntegrations_by_pk?.id) {
                      cleanSchemaBasedData({ workspaceId: workspace?.id });
                      cacheIntegrationSchemaMutation.mutate(
                        {
                          companyId: user?.companyId,
                          companyIntegrationId:
                            res.update_companyIntegrations_by_pk.id,
                          workspaceId: workspace?.id,
                        },
                        {
                          onSuccess: (response) => {
                            if (response.cacheIntegrationSchema?.data.id) {
                              setDisabled(false);
                              setError('');
                              setAuthenticated(true);
                              segmentEvent(
                                'datawarehouse integration updated',
                                {
                                  integration: name,
                                }
                              );
                              redirectToTableSettings();
                            } else if (
                              response.cacheIntegrationSchema?.data?.error
                            ) {
                              segmentEvent(
                                'datawarehouse integration schema update failed',
                                {
                                  integration: name,
                                }
                              );
                              setDisabled(false);
                              setError(
                                response.cacheIntegrationSchema?.data?.error
                              );
                            } else {
                              segmentEvent(
                                'datawarehouse integration update failed',
                                {
                                  integration: name,
                                }
                              );
                              setDisabled(false);
                              setError(SOMETHING_WENT_WRONG);
                            }
                          },
                          onError: () => {
                            setDisabled(false);
                            setError(SOMETHING_WENT_WRONG);
                          },
                        }
                      );
                    } else {
                      setDisabled(false);
                      setError(SOMETHING_WENT_WRONG);
                    }
                  },
                  onError: () => {
                    setDisabled(false);
                    setError(SOMETHING_WENT_WRONG);
                  },
                }
              );
            } else {
              createCompanyIntegrationMutation.mutate(
                {
                  companyId: user?.companyId,
                  integrationId,
                  name,
                  credentials,
                  workspaceId: workspace?.id,
                  isEncrypted: true,
                },
                {
                  onSuccess: (res) => {
                    if (res.insert_companyIntegrations_one?.id) {
                      setAttempt(false);
                      setIntegrationIdSearchParam(
                        res?.insert_companyIntegrations_one?.id
                      );
                      cacheIntegrationSchemaMutation.mutate(
                        {
                          companyId: user?.companyId,
                          companyIntegrationId:
                            res.insert_companyIntegrations_one.id,
                          workspaceId: workspace?.id,
                        },
                        {
                          onSuccess: (response) => {
                            if (response.cacheIntegrationSchema?.data.id) {
                              setDisabled(false);
                              setError('');
                              setAuthenticated(true);
                              segmentEvent(
                                'datawarehouse integration created',
                                {
                                  integration: name,
                                }
                              );

                              redirectToTableSettings();
                            } else if (
                              response.cacheIntegrationSchema?.data?.error
                            ) {
                              segmentEvent(
                                'datawarehouse integration schema update failed',
                                {
                                  integration: name,
                                }
                              );
                              setDisabled(false);
                              setError(
                                response.cacheIntegrationSchema?.data?.error
                              );
                            } else {
                              setDisabled(false);
                              setError(SOMETHING_WENT_WRONG);
                            }
                          },
                          onError: () => {
                            segmentEvent(
                              'datawarehouse integration creation failed',
                              {
                                integration: name,
                              }
                            );
                            setDisabled(false);
                            setError(SOMETHING_WENT_WRONG);
                          },
                        }
                      );
                    } else {
                      setDisabled(false);
                      setError(SOMETHING_WENT_WRONG);
                    }
                  },
                  onError: () => {
                    setDisabled(false);
                    setError(SOMETHING_WENT_WRONG);
                  },
                }
              );
            }
          } else if (isFirstAttempt) {
            createCompanyIntegrationMutation.mutate(
              {
                companyId: user?.companyId,
                integrationId,
                name,
                credentials,
                workspaceId: workspace?.id,
                isEncrypted: true,
                isAuthenticated: false,
              },
              {
                onSuccess: (res) => {
                  setDisabled(false);
                  setError(result?.testIntegration?.result?.message as string);
                  setAttempt(false);
                  setIntegrationIdSearchParam(
                    res?.insert_companyIntegrations_one?.id
                  );
                },
                onError: () => {
                  setDisabled(false);
                  setError(result?.testIntegration?.result?.message as string);
                  setAttempt(false);
                },
              }
            );
          } else {
            setDisabled(false);
            setError(result?.testIntegration?.result?.message as string);
          }
        },
        onError: () => {
          if (isFirstAttempt) {
            createCompanyIntegrationMutation.mutate(
              {
                companyId: user?.companyId,
                integrationId,
                name,
                credentials,
                workspaceId: workspace?.id,
                isEncrypted: true,
                isAuthenticated: false,
              },
              {
                onSuccess: (res) => {
                  setDisabled(false);
                  setError(SOMETHING_WENT_WRONG);
                  setAttempt(false);
                  setIntegrationIdSearchParam(
                    res?.insert_companyIntegrations_one?.id
                  );
                },
                onError: () => {
                  setDisabled(false);
                  setError(SOMETHING_WENT_WRONG);
                  setAttempt(false);
                },
              }
            );
          } else {
            setDisabled(false);
            setError(SOMETHING_WENT_WRONG);
          }
        },
      }
    );
  };
  const updateCompanyIntegration = (data: any) => {
    const credentials = encryption({ value: data, type: 'encrypt' });
    setDisabled(true);
    setError('');
    setAuthenticated(false);
    testCompanyIntegrationMutation.mutate(
      { credentials, dbName: name },
      {
        onSuccess: (result) => {
          if (result.testIntegration?.result?.status) {
            updateCredentialsMutation.mutate(
              {
                credentials,
                id: companyIntegrationId,
                isAuthenticated: true,
              },
              {
                onSuccess: (res) => {
                  if (res.update_companyIntegrations_by_pk?.id) {
                    cleanSchemaBasedData({ workspaceId: workspace?.id });
                    cacheIntegrationSchemaMutation.mutate(
                      {
                        companyId: user?.companyId,
                        companyIntegrationId:
                          res.update_companyIntegrations_by_pk.id,
                        workspaceId: workspace?.id,
                      },
                      {
                        onSuccess: (response) => {
                          if (response.cacheIntegrationSchema?.data?.id) {
                            setDisabled(false);
                            setError('');
                            setAuthenticated(true);
                            segmentEvent('datawarehouse integration updated', {
                              integration: name,
                            });
                            redirectToTableSettings();
                          } else if (
                            response.cacheIntegrationSchema?.data?.error
                          ) {
                            segmentEvent(
                              'datawarehouse integration schema update failed',
                              {
                                integration: name,
                              }
                            );
                            setDisabled(false);
                            setError(
                              response.cacheIntegrationSchema?.data?.error
                            );
                          } else {
                            segmentEvent(
                              'datawarehouse integration update failed',
                              {
                                integration: name,
                              }
                            );
                            setDisabled(false);
                            setError(SOMETHING_WENT_WRONG);
                          }
                        },
                        onError: () => {
                          setDisabled(false);
                          setError(SOMETHING_WENT_WRONG);
                        },
                      }
                    );
                  } else {
                    setDisabled(false);
                    setError(SOMETHING_WENT_WRONG);
                  }
                },
                onError: () => {
                  setDisabled(false);
                  setError(SOMETHING_WENT_WRONG);
                },
              }
            );
          } else {
            setDisabled(false);
            setError(result.testIntegration?.result?.message as string);
          }
        },
        onError: () => {
          setDisabled(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  const deleteCompanyIntegration = () => {
    deleteCompanyIntegrationMutation.mutate(
      { companyIntegrationId },
      {
        onSuccess: (res) => {
          if (res.delete_companyIntegrations_by_pk?.id) {
            setDisabled(false);
            setError('');
            cleanIntegrationBasedData({
              workspaceId: workspace?.id,
            });
            segmentEvent('datawarehouse integration deleted', {
              integration: name,
            });
            navigate('/datasources');
          } else {
            segmentEvent('datawarehouse integration deletion failed', {
              integration: name,
            });
            setDisabled(false);
            setError(SOMETHING_WENT_WRONG);
          }
        },
        onError: () => {
          setDisabled(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };

  const syncSchema = () => {
    setDisabled(true);
    setError('');
    setAuthenticated(false);
    // cleanSchemaBasedData({ workspaceId: workspace?.id });
    cacheIntegrationSchemaMutation.mutate(
      {
        companyId: user?.companyId,
        companyIntegrationId,
        workspaceId: workspace?.id,
      },
      {
        onSuccess: (response) => {
          if (response.cacheIntegrationSchema?.data.id) {
            setDisabled(false);
            setError('');
            setAuthenticated(true);
            segmentEvent('datawarehouse integration schema updated', {
              integration: name,
            });
            redirectToTableSettings();
          } else if (response.cacheIntegrationSchema?.data?.error) {
            segmentEvent('datawarehouse integration schema update failed', {
              integration: name,
            });
            setDisabled(false);
            setError(response.cacheIntegrationSchema?.data?.error);
          } else {
            segmentEvent('datawarehouse integration schema update failed', {
              integration: name,
            });
            setDisabled(false);
            setError(SOMETHING_WENT_WRONG);
          }
        },
        onError: () => {
          setDisabled(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  return {
    createCompanyIntegration,
    updateCompanyIntegration,
    deleteCompanyIntegration,
    isAuthenticated,
    syncSchema,
  };
};

export default useCompanyIntegration;
