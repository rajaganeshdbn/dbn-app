/* eslint-disable react-hooks/exhaustive-deps */
import { FieldValues, useForm } from 'react-hook-form';
import {
  useCompanyWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
} from 'utils/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { workspaceAtom } from 'atoms/application';
import { WorkspaceType } from 'types';
import { useQueryClient } from 'react-query';
import segmentEvent from 'utils/segmentEvent';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';
import { setCurrentWorkspace } from 'helpers/application/workspace';
import useAccessControl from './useAccessControl';
import useDefaultTheme from './useDefaultTheme';

const useWorkspace = () => {
  const user = getCurrentUser();
  const queryClient = useQueryClient();
  const { isViewMode, viewAsRoles } = useAccessControl();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    data,
    isLoading: isLoadingWorkspaces,
    refetch,
  } = useCompanyWorkspacesQuery({}, { enabled: !!user });
  const { mutate: updateWorkspace, isLoading: isCreatingWorkspace } =
    useUpdateWorkspaceMutation();
  const { mutate: createWorkspace, isLoading: isUpdatingWorkspace } =
    useCreateWorkspaceMutation();
  const { addDefaultThemeToWorkspace } = useDefaultTheme();
  const workspaces: WorkspaceType[] = useMemo(() => {
    if (isViewMode && viewAsRoles) {
      if (
        viewAsRoles.some(
          (userRole: any) => userRole.applyOn === 'All Workspaces'
        )
      )
        return (data?.getCompanyWorkspaces?.companyWorkspaces ||
          []) as WorkspaceType[];

      const companyWorkspaces =
        data?.getCompanyWorkspaces?.companyWorkspaces?.filter((workspace) => {
          const filters = viewAsRoles.map((userRole: any) => {
            let isIncluded = false;
            if (userRole.applyOn === 'Specific Workspaces')
              isIncluded = userRole.workspaces.includes(workspace.id as string);

            if (userRole.applyOn === 'All Workspaces Except')
              isIncluded = !userRole.workspaces.includes(
                workspace.id as string
              );

            return isIncluded;
          });
          return filters.includes(true);
        });
      return (companyWorkspaces || []) as WorkspaceType[];
    }
    return (data?.getCompanyWorkspaces?.companyWorkspaces ||
      []) as WorkspaceType[];
  }, [data?.getCompanyWorkspaces?.companyWorkspaces, isViewMode, viewAsRoles]);

  const [selectedSpace, setSelectedSpace] = useState<
    WorkspaceType | undefined
  >();
  const [selectedSetting, setSelectedSetting] = useState<
    'Create Workspace' | 'Update Workspace'
  >('Create Workspace');
  const [isSettingShow, setSetingShow] = useState<boolean>(false);
  const [isDisableButton, setDisableButton] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [workspace, setWorkspace] = useAtom(workspaceAtom);

  useEffect(() => {
    if (selectedSetting === 'Update Workspace' && selectedSpace) {
      setValue('name', selectedSpace.name);
      setValue('description', selectedSpace.description);
    } else {
      setValue('name', '');
      setValue('description', '');
    }
  }, [selectedSetting, selectedSpace]);

  useEffect(() => {
    if (!workspace) return;
    setSelectedSpace(workspace);
    setCurrentWorkspace(workspace);
  }, [workspace]);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => setError(''), 3000);
  }, [error]);

  const saveCreatorMode = (workspaceId: string, creatorMode: any) => {
    updateWorkspace(
      {
        set: {
          creatorMode,
        },
        id: workspaceId,
      },
      {
        onSuccess(updateData) {
          if (updateData.update_companyWorkspaces_by_pk?.id) {
            setError('');
          } else {
            setError(SOMETHING_WENT_WRONG);
          }
        },
        onError() {
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };

  const saveSettings = (values: FieldValues) => {
    setDisableButton(true);
    setError('');
    const name = values.name;
    const description = values.description;
    const worksapceDetails = {
      name,
      description,
    };
    switch (selectedSetting) {
      case 'Update Workspace':
        updateWorkspace(
          {
            set: {
              description,
              name,
            },
            id: selectedSpace?.id,
          },
          {
            onSuccess(updateData) {
              if (updateData.update_companyWorkspaces_by_pk?.id) {
                const updated = updateData.update_companyWorkspaces_by_pk;
                queryClient.setQueryData(
                  ['CompanyWorkspaces', { companyId: user?.companyId }],
                  (prev: any) => {
                    const companyWorkspaces =
                      prev?.getCompanyWorkspaces?.companyWorkspaces;
                    const index = companyWorkspaces?.findIndex(
                      (cw: any) => cw.id === updated.id
                    );
                    if (!index) return prev;
                    companyWorkspaces[index] = updated;
                    return {
                      ...prev,
                      getCompanyWorkspaces: {
                        companyWorkspaces: [...companyWorkspaces],
                      },
                    };
                  }
                );
                if (updated.id === workspace?.id) setWorkspace(updated);
                segmentEvent('worksapce updated', {
                  id: updated.id,
                  name: updated.name,
                  discription: updated.description,
                });
                setDisableButton(false);
                setError('');
                setSetingShow(false);
                setSelectedSpace(updated);
                setCurrentWorkspace(updated);
              } else {
                segmentEvent('workspace update failed', {
                  ...worksapceDetails,
                });
                setDisableButton(false);
                setError(SOMETHING_WENT_WRONG);
              }
            },
            onError() {
              segmentEvent('workspace update failed', {
                ...worksapceDetails,
              });
              setDisableButton(false);
              setError(SOMETHING_WENT_WRONG);
            },
          }
        );

        break;
      case 'Create Workspace':
        createWorkspace(
          { companyId: user?.companyId, description, name },
          {
            onSuccess: async (createData) => {
              if (createData.insert_companyWorkspaces_one?.id) {
                const inserted = createData.insert_companyWorkspaces_one;
                await addDefaultThemeToWorkspace(
                  createData?.insert_companyWorkspaces_one?.id
                );
                refetch();
                queryClient.setQueryData(
                  ['getCompanyWorkspaces', { companyId: user?.companyId }],
                  (prev: any) => {
                    const companyWorkspaces =
                      prev?.getCompanyWorkspaces?.companyWorkspaces;
                    companyWorkspaces?.push(inserted);
                    return {
                      ...prev,
                      getCompanyWorkspaces: {
                        companyWorkspaces: [...(companyWorkspaces || [])],
                      },
                    };
                  }
                );
                segmentEvent('workspace created', {
                  id: inserted.id,
                  name: inserted.name,
                });
                setDisableButton(false);
                setError('');
                setSetingShow(false);
              } else {
                segmentEvent('workspace create failed', {
                  ...worksapceDetails,
                });
                setDisableButton(false);
                setError(SOMETHING_WENT_WRONG);
              }
            },
            onError() {
              segmentEvent('workspace create failed', {
                ...worksapceDetails,
              });
              setDisableButton(false);
              setError(SOMETHING_WENT_WRONG);
            },
          }
        );
        break;
      default:
        break;
    }
  };
  const onSubmit = handleSubmit(saveSettings);
  return {
    isLoadingWorkspaces,
    workspaces,
    error,
    selectedSpace,
    isSettingShow,
    setSetingShow,
    selectedSetting,
    setSelectedSetting,
    register,
    onSubmit,
    isDisableButton,
    workspace,
    setSelectedSpace,
    setWorkspace,
    isSaving: isCreatingWorkspace || isUpdatingWorkspace,
    updateWorkspace,
    errors,
    saveCreatorMode,
    saveSettings,
  };
};

export default useWorkspace;
