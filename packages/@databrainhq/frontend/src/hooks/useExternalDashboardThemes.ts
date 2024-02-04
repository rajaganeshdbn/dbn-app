import { useQueryClient } from 'react-query';
import {
  useCreateExternalDashboardThemeMutation,
  useDeleteExternalDashboardThemeMutation,
  useUpdateExternalDashboardThemeClientsMutation,
  useUpdateExternalDashboardThemeMutation,
} from 'utils/generated/graphql';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'helpers/application/auth';

export interface ThemeType {
  id: string;
  name: string;
  colors: string[];
  clients: {
    id: string;
    clientId: string;
    clientName: string;
  }[];
}

interface UpdateThemeInputType extends ThemeType {
  selectedClients: {
    clientId: string;
    clientName: string;
  }[];
}

const useExternalDashboardThemes = () => {
  const companyId = getCurrentUser()?.companyId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: createExternalDashboardTheme,
    isLoading: isCreatingTheme,
    error: errorCreatingTheme,
  } = useCreateExternalDashboardThemeMutation({
    onSuccess: (res) => {
      const data = res.insert_externalDashboardThemes_one;
      queryClient.setQueryData(
        ['GetExternalDashboardThemes', { companyId }],
        (prev: any) => ({
          ...prev,
          externalDashboardThemes: [...prev.externalDashboardThemes, data],
        })
      );
    },
  });
  const {
    mutateAsync: updateTheme,
    isLoading: isUpdatingTheme,
    error: errorUpdatingTheme,
  } = useUpdateExternalDashboardThemeMutation({
    onSuccess: (res) => {
      const data = res.update_externalDashboardThemes_by_pk;
      queryClient.setQueryData(
        ['GetExternalDashboardThemes', { companyId }],
        (prev: any) => {
          const prevList = prev.externalDashboardThemes;
          const index = prevList.findIndex((item: any) => item.id === data?.id);
          if (index === -1) return prev;
          prevList[index] = { ...prevList[index], ...data };
          return {
            ...prev,
            externalDashboardThemes: [...prevList],
          };
        }
      );
    },
  });
  const {
    mutate: updateThemeClients,
    isLoading: isUpdatingThemeClients,
    error: errorUpdatingThemeClients,
  } = useUpdateExternalDashboardThemeClientsMutation();
  const {
    mutateAsync: deleteExternalDashboardTheme,
    isLoading: isDeletingTheme,
    error: errorDeletingTheme,
  } = useDeleteExternalDashboardThemeMutation({
    onSuccess: (res) => {
      const data = res.delete_externalDashboardThemes_by_pk;
      queryClient.setQueryData(
        ['GetExternalDashboardThemes', { companyId }],
        (prev: any) => ({
          ...prev,
          externalDashboardThemes: prev.externalDashboardThemes.filter(
            (item: any) => item.id !== data?.id
          ),
        })
      );
    },
  });

  const updateExternalDashboardTheme = async (
    input: UpdateThemeInputType,
    { onSuccess }: { onSuccess: () => void }
  ) => {
    await updateTheme(
      {
        id: input.id,
        name: input.name,
        colors: input.colors,
      },
      {
        onSuccess: () => {
          if (input.clients.length || input.selectedClients.length) {
            const idsToDelete: string[] = [];
            let themeClients = input.selectedClients;
            input.clients.forEach((client) => {
              const found = themeClients.find(
                (sc) => sc.clientId === client.clientId
              );
              if (!found) idsToDelete.push(client.id);
              else
                themeClients = themeClients.filter(
                  (ci) => ci.clientId !== client.clientId
                );
            });

            updateThemeClients(
              {
                idsToDelete,
                themeClients,
              },
              {
                onSuccess: () => {
                  onSuccess();
                  navigate(0);
                },
              }
            );
          } else onSuccess();
        },
      }
    );
  };

  return {
    createExternalDashboardTheme,
    updateExternalDashboardTheme,
    deleteExternalDashboardTheme,
    isMutatingExternalDashboardTheme:
      isCreatingTheme ||
      isUpdatingTheme ||
      isDeletingTheme ||
      isUpdatingThemeClients,
    errorMutatingExternalDashboardTheme: (
      (errorCreatingTheme ||
        errorUpdatingTheme ||
        errorDeletingTheme ||
        errorUpdatingThemeClients) as Error | null
    )?.message,
  };
};

export default useExternalDashboardThemes;
