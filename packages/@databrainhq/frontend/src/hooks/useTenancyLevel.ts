import { useNavigate } from 'react-router-dom';
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { types } from '@databrainhq/plugin';
import { useQueryClient } from 'react-query';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';
import useOrganizations from './useOrganizations';
import useWorkspace from './useWorkspace';

const useTenancyLevel = () => {
  const tenacyLevelList: types.FloatingDropDownOption[] = [
    { value: 'TABLE', label: 'table' },
    { value: 'DATABASE', label: 'database' },
  ];
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { workspace, updateWorkspace, setWorkspace } = useWorkspace();
  const queryClient = useQueryClient();
  const { deleteDefaultClient } = useOrganizations();
  const selectedTenancyLevel = useMemo(
    () =>
      workspace?.tenancyLevel
        ? {
            value: workspace.tenancyLevel,
            label: workspace.tenancyLevel.toLocaleLowerCase(),
          }
        : tenacyLevelList[0],
    [workspace?.tenancyLevel, tenacyLevelList]
  );

  const [level, setTenancyLevel] = useState(selectedTenancyLevel);
  const [isDisableBtn, setDisableBtn] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const updateTenacyLevel = ({
    onSuccess,
    onError,
    tenancyLevel = 'TABLE',
  }: {
    onSuccess?: () => void;
    onError?: () => void;
    tenancyLevel: string;
  }) => {
    updateWorkspace(
      { id: workspace?.id, set: { tenancyLevel } },
      {
        onSuccess: async (updateData) => {
          const updated = updateData.update_companyWorkspaces_by_pk;
          if (updated) {
            queryClient.setQueryData(
              ['CompanyWorkspaces', { companyId: user?.companyId }],
              (prev: any) => {
                const companyWorkspaces = prev?.companyWorkspaces;
                const index = companyWorkspaces?.findIndex(
                  (cw: any) => cw.id === updated.id
                );
                if (!index) return prev;
                companyWorkspaces[index] = updated;
                return {
                  ...prev,
                  companyWorkspaces: [...companyWorkspaces],
                };
              }
            );
            if (updated.id === workspace?.id) setWorkspace(updated);
            onSuccess?.();
          } else {
            onError?.();
          }
        },
        onError,
      }
    );
  };

  const saveDatabaseList = () => {
    setDisableBtn(true);
    updateTenacyLevel({
      tenancyLevel: level.value,
      onSuccess: async () => {
        await deleteDefaultClient({ companyId: user?.companyId });
        setDisableBtn(false);
        setCompleted(true);
        navigate('/');
      },
      onError: () => {
        setError(SOMETHING_WENT_WRONG);
        setDisableBtn(false);
      },
    });

    setDisableBtn(false);
  };
  const onSumbitDatabaseList = handleSubmit(saveDatabaseList);
  return {
    tenancyLevel: level,
    companyTenancyType: selectedTenancyLevel.value,
    setTenancyLevel,
    tenacyLevelList,
    register,
    isDisableBtn,
    onSumbitDatabaseList,
    isCompleted,
    error,
    updateTenacyLevel,
  };
};

export default useTenancyLevel;
