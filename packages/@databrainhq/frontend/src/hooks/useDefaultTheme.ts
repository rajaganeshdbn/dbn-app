import {
  useSaveWorkspaceThemeMutation,
  useSaveThemeMutation,
  useMarkDefaultThemeMutation,
  useGetDefaultThemeQuery,
} from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';

const useDefaultTheme = () => {
  const { mutateAsync: saveThemeMutation } = useSaveThemeMutation();
  const { mutateAsync: saveWorkspaceThemeMutation } =
    useSaveWorkspaceThemeMutation();
  const { mutateAsync: markDefaultTheme } = useMarkDefaultThemeMutation();
  const { data: defaultThemeData } = useGetDefaultThemeQuery(
    {
      companyId: getCurrentUser()?.companyId,
    },
    { enabled: !!getCurrentUser()?.companyId }
  );
  const defaultTheme = () => {
    return {
      companyId: getCurrentUser()?.companyId,
      general: {
        name: 'Default Theme',
        fontFamily: 'sans-serif',
      },
      dashboard: {
        selectBoxBorderRadius: '',
      },
      cardTitle: {
        fontSize: '',
      },
      cardDescription: {
        fontSize: '',
      },
      cardCustomization: {
        borderRadius: '',
        padding: '',
      },
      chart: {
        selected: 'Default',
        palettes: [
          {
            name: 'Default',
            colors: [
              '#5470c6',
              '#91cc75',
              '#fac858',
              '#ee6666',
              '#73c0de',
              '#3ba272',
              '#fc8452',
              '#9a60b4',
              '#ea7ccc',
            ],
          },
          {
            name: 'Dark',
            colors: [
              '#292929',
              '#4c4c4c',
              '#737373',
              '#9b9b9b',
              '#c6c6c6',
              '#919191',
              '#5f5e60',
              '#313033',
              '#010005',
            ],
          },
          {
            name: 'Pastel',
            colors: [
              '#00876c',
              '#5c9d72',
              '#90b280',
              '#bfc796',
              '#e8ddb3',
              '#e2bc87',
              '#e09766',
              '#dc6e53',
              '#d43d51',
            ],
          },
          {
            name: 'Bright',
            colors: [
              '#00876c',
              '#51a676',
              '#88c580',
              '#c2e38c',
              '#ffff9d',
              '#fdd172',
              '#f7a258',
              '#ea714e',
              '#d43d51',
            ],
          },
        ],
      },
    };
  };
  const addDefaultThemeToDemoWorkspace = async (
    workspaceId: string,
    themeId: string
  ) => {
    await saveWorkspaceThemeMutation({ themeId, workspaceId });
  };
  const addDefaultThemeToCompany = async (themeId: string) => {
    await markDefaultTheme({
      companyId: getCurrentUser()?.companyId,
      themeId,
    });
  };

  const addDefaultTheme = async (workspaceId: string) => {
    await saveThemeMutation(
      { object: defaultTheme() },
      {
        onSuccess: async ({ insert_themes_one }) => {
          const themeId = insert_themes_one?.id;
          if (themeId) {
            await addDefaultThemeToCompany(themeId);
            await addDefaultThemeToDemoWorkspace(workspaceId, themeId);
          }
        },
      }
    );
  };

  const saveDefaultTheme = async (workspaceId: string) => {
    try {
      await addDefaultTheme(workspaceId);
    } catch (error) {
      console.log(error);
    }
  };
  const addDefaultThemeToWorkspace = async (workspaceId: string) => {
    const themeId = defaultThemeData?.companies_by_pk?.defaultTheme;
    if (themeId)
      await saveWorkspaceThemeMutation({
        themeId,
        workspaceId,
      });
    else await saveDefaultTheme(workspaceId);
  };
  return { saveDefaultTheme, addDefaultThemeToWorkspace };
};

export default useDefaultTheme;
