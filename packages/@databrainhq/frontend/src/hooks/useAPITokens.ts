import { useQueryClient } from 'react-query';
import {
  useCreateApiTokenMutation,
  useDeleteApiTokenMutation,
  useUpdateApiTokenMutation,
} from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';

const useAPITokens = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createAPIToken,
    isLoading: isCreatingAPIToken,
    error: errorCreatingAPIToken,
  } = useCreateApiTokenMutation({
    onSuccess: (data) => {
      const res = data.insert_apiTokens_one;
      queryClient.setQueryData(
        ['GetAPITokens', { companyId: getCurrentUser()?.companyId }],
        (prev: any) => {
          return { ...prev, apiTokens: [...prev?.apiTokens, res] };
        }
      );
    },
  });

  const {
    mutateAsync: updateAPIToken,
    isLoading: isUpdatingAPIToken,
    error: errorUpdatingAPIToken,
  } = useUpdateApiTokenMutation({
    onSuccess: (data, variables) => {
      const res = data.update_apiTokens_by_pk;
      queryClient.setQueryData(
        ['GetAPITokens', { companyId: getCurrentUser()?.companyId }],
        (prev: any) => {
          const prevTokens = prev?.apiTokens;
          const index = prevTokens?.findIndex(
            (token: any) => token.id === variables.id
          );
          if (index > -1) {
            prevTokens[index] = res;
          }
          return { ...prev, apiTokens: prevTokens };
        }
      );
    },
  });

  const {
    mutateAsync: deleteAPIToken,
    isLoading: isDeletingAPIToken,
    error: errorDeletingAPIToken,
  } = useDeleteApiTokenMutation({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ['GetAPITokens', { companyId: getCurrentUser()?.companyId }],
        (prev: any) => {
          const updatedTokens = prev?.apiTokens?.filter(
            (token: any) => token.id !== variables.id
          );
          return { ...prev, apiTokens: updatedTokens };
        }
      );
    },
  });

  return {
    createAPIToken,
    updateAPIToken,
    deleteAPIToken,
    isCreatingAPIToken,
    isUpdatingAPIToken,
    isDeletingAPIToken,
    errorCreatingAPIToken,
    errorUpdatingAPIToken,
    errorDeletingAPIToken,
  };
};

export default useAPITokens;
