import {
  useGetDemoConfigQuery,
  useResetDemoConfigMutation,
  useSaveDemoConfigMutation,
} from 'utils/generated/graphql';
import { useQueryClient } from 'react-query';
import { useCallback, useMemo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import segmentEvent from 'utils/segmentEvent';
import { getCurrentUser } from 'helpers/application/auth';

const useDemoConfig = () => {
  const queryClient = useQueryClient();
  const [isResetted, setResetted] = useState(false);

  const { data: demoConfigData, isLoading: isFetchingDemoConfig } =
    useGetDemoConfigQuery(
      {
        companyId: getCurrentUser()?.companyId,
      },
      { enabled: !!getCurrentUser()?.companyId }
    );
  const { mutateAsync: saveDemoConfigMutation, isLoading: isSavingDemoConfig } =
    useSaveDemoConfigMutation();

  const {
    mutateAsync: resetDemoConfigMutation,
    isLoading: isResettingDemoConfig,
  } = useResetDemoConfigMutation();

  const demoConfig = useMemo(
    () => demoConfigData?.demoTheme[0],
    [demoConfigData?.demoTheme[0]]
  );

  const saveDemoConfig = useCallback(async (values: FieldValues) => {
    await saveDemoConfigMutation(
      {
        object: {
          companyId: getCurrentUser()?.companyId,
          dashboardTitle: values.dashboardTitle,
          logoUrl: values.logoUrl,
          primaryColor: values.primaryColor,
          textColor: values.textColor,
          navbarColor: values.navbarColor,
          highlightColor: values.highlightColor,
          settings: {
            isHideSettings: values.isHideSettings || false,
            isHideProfile: values.isHideProfile || false,
          },
        },
      },
      {
        onSuccess: (res, variables) => {
          if (!res.insert_demoTheme_one) return;
          segmentEvent('demo theme saved', {
            dashboardTitle: values.dashboardTitle,
            companyId: getCurrentUser()?.companyId,
          });
          queryClient.setQueryData(
            ['GetDemoConfig', { companyId: variables.object.companyId }],
            (prev: any) => {
              return { ...prev, demoTheme: [res.insert_demoTheme_one] };
            }
          );
        },
      }
    );
  }, []);

  const resetDemoConfig = useCallback(async (id: string) => {
    await resetDemoConfigMutation(
      {
        id,
      },
      {
        onSuccess: (res) => {
          if (!res.delete_demoTheme_by_pk?.id) return;
          segmentEvent('demo theme reset', {
            themeId: id,
            companyId: getCurrentUser()?.companyId,
          });
          queryClient.setQueryData(
            ['GetDemoConfig', { companyId: getCurrentUser()?.companyId }],
            (prev: any) => {
              return { ...prev, demoTheme: [] };
            }
          );
          setResetted(true);
          setTimeout(() => {
            setResetted(false);
          }, 5000);
        },
      }
    );
  }, []);

  return {
    demoConfig,
    saveDemoConfig,
    isLoadingDemoConfig:
      isFetchingDemoConfig || isSavingDemoConfig || isResettingDemoConfig,
    isResetted,
    resetDemoConfig,
  };
};

export default useDemoConfig;
