import { useCallback, useEffect, useState } from 'react';
import { rolesAtom, workspaceAtom } from 'atoms/application';
import { useAtom } from 'jotai';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { GetIsCanAccessParams, RolesAtomType } from 'types';
import {
  useAssignUserRolesMutation,
  useDeleteUserRolesMutation,
  useCreateCompanyRolesMutation,
  useDeleteCompanyRoleMutation,
  useGetCompanyRolesQuery,
  useUpdateCompanyRoleMutation,
  CompanyRoles,
  CompanyRoles_Insert_Input,
} from 'utils/generated/graphql';
import { COMPANY_SPECIFIC_FEATURES } from 'consts/application';
import { getCurrentUser } from 'helpers/application/auth';

const useAccessControl = () => {
  const { companyId, isAdmin, userRoles } = getCurrentUser() || {};
  const [workspace] = useAtom(workspaceAtom);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [roles, setRoles] = useAtom(rolesAtom);
  const { data: companyRolesData, isLoading } = useGetCompanyRolesQuery(
    {
      companyId,
    },
    {
      enabled: !!companyId && !roles.companyRoles,
    }
  );

  const { mutateAsync: createCompanyRoles, isLoading: isCreatingCompanyRole } =
    useCreateCompanyRolesMutation({
      onSuccess: (data, variables) => {
        if (!data.insert_companyRoles?.returning?.length) {
          setError('Role name should be unique!');
          return;
        }
        queryClient.setQueryData(
          ['GetCompanyRoles', { companyId }],
          (prev: any) => {
            const previousValue = prev || { companyRoles: [] };
            const createdRoles =
              data?.insert_companyRoles?.returning?.map((companyRole) => {
                const object = (
                  variables.objects as CompanyRoles_Insert_Input[]
                ).find((roleObject) => roleObject.name === companyRole.name);
                return {
                  ...object,
                  ...companyRole,
                };
              }) || [];
            return {
              ...previousValue,
              companyRoles: [...previousValue?.companyRoles, ...createdRoles],
            };
          }
        );
      },
    });
  const { mutateAsync: updateCompanyRole, isLoading: isUpdatingCompanyRole } =
    useUpdateCompanyRoleMutation({
      onSuccess: (data, variables) => {
        if (!data.update_companyRoles_by_pk?.id) {
          setError('Role name should be unique!');
          return;
        }
        queryClient.setQueryData(
          ['GetCompanyRoles', { companyId }],
          (prev: any) => {
            return {
              ...prev,
              companyRoles: prev.companyRoles?.map(
                (companyRole: CompanyRoles) =>
                  companyRole.id === variables.id
                    ? { ...companyRole, ...variables.set }
                    : companyRole
              ),
            };
          }
        );
      },
    });
  const { mutateAsync: deleteCompanyRole, isLoading: isDeletingCompanyRole } =
    useDeleteCompanyRoleMutation({
      onSuccess: (data, variables) => {
        if (!data.delete_companyRoles_by_pk?.id) return;
        queryClient.setQueryData(
          ['GetCompanyRoles', { companyId }],
          (prev: any) => {
            return {
              ...prev,
              companyRoles: prev.companyRoles?.filter(
                (companyRole: CompanyRoles) => companyRole.id !== variables.id
              ),
            };
          }
        );
      },
    });
  const { mutateAsync: assignUserRoles } = useAssignUserRolesMutation();
  const { mutateAsync: deleteUserRoles } = useDeleteUserRolesMutation();

  const getIsCanAccess = useCallback(
    <K extends keyof GetIsCanAccessParams>(
      feature: K,
      permission: GetIsCanAccessParams[K][number],
      currentWorkspace?: string
    ): boolean => {
      if (roles.isViewMode && roles.viewAsRoles) {
        if (
          roles.viewAsRoles?.some((role) => {
            return (
              role.companyRole?.permissions?.[feature]?.includes(permission) &&
              (COMPANY_SPECIFIC_FEATURES.includes(feature) ||
                role.applyOn === 'All Workspaces' ||
                (role.applyOn === 'All Workspaces Except' &&
                  !role.workspaces.includes(
                    currentWorkspace || workspace?.id
                  )) ||
                role.workspaces.includes(currentWorkspace || workspace?.id))
            );
          })
        )
          return true;
        return false;
      }
      if (isAdmin) return true;
      if (
        userRoles?.some((role) => {
          return (
            role.companyRole?.permissions?.[feature]?.includes(permission) &&
            (COMPANY_SPECIFIC_FEATURES.includes(feature) ||
              role.applyOn === 'All Workspaces' ||
              (role.applyOn === 'All Workspaces Except' &&
                !role.workspaces.includes(currentWorkspace || workspace?.id)) ||
              role.workspaces.includes(currentWorkspace || workspace?.id))
          );
        })
      )
        return true;
      return false;
    },
    [userRoles, roles.isViewMode, roles.viewAsRoles, workspace, isAdmin]
  );

  const setViewMode = useCallback(
    ({
      viewAsRoles,
      isExit,
      config,
    }: {
      viewAsRoles: RolesAtomType['viewAsRoles'];
      isExit?: boolean;
      config?: Record<string, any>;
    }) => {
      setRoles((prev) => ({
        ...prev,
        isViewMode: !isExit,
        viewAsRoles: isExit ? undefined : viewAsRoles,
      }));
      if (isExit) {
        navigate('/settings/users');
      } else {
        localStorage.setItem('@app:viewModeConfig', JSON.stringify(config));
        navigate('/');
      }
    },
    [setRoles, navigate]
  );

  useEffect(() => {
    if (companyRolesData?.companyRoles) {
      setRoles((prev) => ({
        ...prev,
        companyRoles: companyRolesData?.companyRoles,
      }));
    }
  }, [companyRolesData?.companyRoles]);

  return {
    getIsCanAccess,
    roles: roles.companyRoles || [],
    isLoading,
    createCompanyRoles,
    updateCompanyRole,
    deleteCompanyRole,
    assignUserRoles,
    deleteUserRoles,
    isCreatingCompanyRole,
    isUpdatingCompanyRole,
    isDeletingCompanyRole,
    setViewMode,
    isViewMode: roles.isViewMode,
    viewAsRoles: roles.viewAsRoles,
    error,
  };
};

export default useAccessControl;
