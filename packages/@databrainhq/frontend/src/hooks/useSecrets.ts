import { useQueryClient } from 'react-query';
import {
  useAddSecretMutation,
  useDeleteSecretMutation,
  useGetSecretsQuery,
  useUpdateSecretMutation,
} from 'utils/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from 'helpers/application/auth';

const useSecrets = () => {
  const queryClient = useQueryClient();
  const companyId = getCurrentUser()?.companyId;
  const [editSecret, setEditSecret] = useState<any>();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [secretValue, setSecretValue] = useState<{
    action: string;
    id: string;
  }>({
    action: '',
    id: '',
  });

  const { data: secretsData, isLoading: isLoadingSecrets } = useGetSecretsQuery(
    {
      companyId,
    },
    {
      enabled: !!companyId,
    }
  );
  const {
    mutateAsync: addSecret,
    isLoading: isAddingSecret,
    error: errorAdding,
  } = useAddSecretMutation({
    onSuccess: (res, variables) => {
      if (res.insert_secrets_one?.id) {
        queryClient.setQueryData(['GetSecrets', { companyId }], (prev: any) => {
          return {
            ...prev,
            secrets: [
              ...prev.secrets,
              {
                ...variables,
                ...res.insert_secrets_one,
              },
            ],
          };
        });
        reset();
      }
    },
  });
  const {
    mutateAsync: updateSecretMutation,
    isLoading: isUpdatingSecret,
    error: errorUpdating,
  } = useUpdateSecretMutation();
  const {
    mutateAsync: deleteSecretMutation,
    isLoading: isDeletingSecret,
    error: errorDeleting,
  } = useDeleteSecretMutation();

  const updateSecret = useCallback(
    async (id: string, name: string, value: string) => {
      await updateSecretMutation(
        {
          id,
          name,
          value,
        },
        {
          onSuccess: (res) => {
            if (!res.update_secrets_by_pk?.id) return;
            queryClient.setQueryData(
              ['GetSecrets', { companyId }],
              (prev: any) => {
                return {
                  ...prev,
                  secrets: prev.secrets.map((item: any) => {
                    if (item.id === id) {
                      return {
                        ...item,
                        name,
                        value,
                      };
                    }
                    return item;
                  }),
                };
              }
            );
            setEditSecret(null);
            reset();
            setSecretValue({
              action: '',
              id: '',
            });
          },
        }
      );
    },
    []
  );

  const deleteSecret = useCallback(async (id: string) => {
    await deleteSecretMutation(
      {
        id,
      },
      {
        onSuccess: (res) => {
          if (!res.delete_secrets_by_pk) return;
          queryClient.setQueryData(
            ['GetSecrets', { companyId }],
            (prev: any) => {
              return {
                ...prev,
                secrets: prev?.secrets?.filter(
                  (secret: any) => secret.id !== res?.delete_secrets_by_pk?.id
                ),
              };
            }
          );
          setSecretValue({
            action: '',
            id: '',
          });
        },
      }
    );
  }, []);
  useEffect(() => {
    if (secretValue.action === 'edit') {
      const secretOption = secretsData?.secrets.find(
        (item) => item.id === secretValue.id
      );
      setEditSecret(secretOption);
    }
  }, [secretValue, secretsData?.secrets]);

  return {
    secretValue,
    setSecretValue,
    editSecret,
    isLoadingSecrets,
    isAddingSecret,
    isDeletingSecret,
    isUpdatingSecret,
    addSecret,
    updateSecret,
    deleteSecret,
    error: errorAdding || errorDeleting || errorUpdating,
    secrets: secretsData?.secrets || [],
    handleSubmit,
    watch,
    register,
    setValue,
    errors,
    reset,
    setEditSecret,
  };
};

export default useSecrets;
