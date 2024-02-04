/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import {
  GetThemesQuery,
  useDeleteThemeMutation,
  useGetDefaultThemeQuery,
  useGetThemesQuery,
  useMarkDefaultThemeMutation,
  useResetThemeMutation,
  useSaveThemeMutation,
  useSaveWorkspaceThemeForAllMutation,
  useSaveWorkspaceThemeMutation,
  useUpdateThemeMutation,
} from 'utils/generated/graphql';
import { useQueryClient } from 'react-query';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import segmentEvent from 'utils/segmentEvent';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from 'helpers/application/auth';
import useThemeGlobalState from './useThemeGlobalState';
import useWorkspace from './useWorkspace';

const useTheme = () => {
  const queryClient = useQueryClient();
  const [isResetted, setResetted] = useState(false);
  const { name } = useParams();
  const { themeState, setTheme, setChartColors } = useThemeGlobalState();

  const { data: themesData, isLoading: isFetchingTheme } = useGetThemesQuery(
    {
      companyId: getCurrentUser()?.companyId,
    },
    { enabled: !!getCurrentUser()?.companyId }
  );

  const { data: defaultThemeData } = useGetDefaultThemeQuery(
    {
      companyId: getCurrentUser()?.companyId,
    },
    { enabled: !!getCurrentUser()?.companyId }
  );

  const { mutateAsync: saveThemeMutation, isLoading: isSavingTheme } =
    useSaveThemeMutation();

  const { mutateAsync: updateThemeMutation, isLoading: isUpdatingTheme } =
    useUpdateThemeMutation();

  const { mutateAsync: deleteThemeMutation, isLoading: isDeletingTheme } =
    useDeleteThemeMutation();

  const {
    mutateAsync: saveWorkspaceThemeMutation,
    isLoading: isSavingWorkspaceTheme,
  } = useSaveWorkspaceThemeMutation();

  const {
    mutateAsync: saveWorkspaceThemeForAllMutation,
    isLoading: isSavingWorkspaceThemeForAll,
  } = useSaveWorkspaceThemeForAllMutation();

  const { mutateAsync: resetThemeMutation, isLoading: isResettingTheme } =
    useResetThemeMutation();

  const { mutateAsync: markDefaultTheme, isLoading: isMarkingDefaultTheme } =
    useMarkDefaultThemeMutation({
      onSuccess: (res) => {
        if (res.update_companies_by_pk?.defaultTheme) {
          queryClient.setQueryData(
            ['GetDefaultTheme', { companyId: getCurrentUser()?.companyId }],
            (prev: any) => {
              return {
                ...prev,
                companies_by_pk: {
                  ...prev.companies_by_pk,
                  ...res.update_companies_by_pk,
                },
              };
            }
          );
        }
      },
    });

  const { workspace, workspaces } = useWorkspace();

  const workspaceTheme: any = useMemo(() => {
    return themesData?.themes?.find((theme) =>
      theme?.workspaceThemes?.some((val) => val.workspaceId === workspace?.id)
    );
  }, [themesData, workspace]);
  const userTheme: any = useMemo(() => {
    return themesData?.themes?.find((theme) => theme.general.name === name);
  }, [name]);

  const saveTheme = useCallback(
    async (values: FieldValues, onSuccess?: () => void) => {
      await saveThemeMutation(
        {
          object: {
            companyId: getCurrentUser()?.companyId,
            general: {
              name: values.name,
              fontFamily: values.fontFamily,
            },
            dashboard: {
              backgroundColor: values.bgColor,
              ctaColor: values.ctaColor,
              ctaTextColor: values.ctaTextColor,
              selectBoxSize: values.selectBoxSize,
              selectBoxVariant: values.selectBoxVariant,
              selectBoxBorderRadius: values.selectBoxBorderRadius,
              selectBoxTextColor: values.selectBoxTextColor,
            },
            cardTitle: {
              fontWeight: values.cardTitleFontWeight,
              fontSize: values.cardTitleFontSize,
              color: values.cardTitleTextColor,
            },
            cardDescription: {
              fontWeight: values.cardDescriptionFontWeight,
              fontSize: values.cardDescriptionFontSize,
              color: values.cardDescriptionTextColor,
            },
            cardCustomization: {
              borderRadius: values.cardCustomisationBorderRadius,
              padding: values.cardPadding,
              shadow: values.cardShadow,
            },
            chart: {
              selected: values.chartPalette,
              palettes: values.chartPalettes,
            },
          },
        },
        {
          onSuccess: (res, variables) => {
            if (!res.insert_themes_one) return;
            segmentEvent('theme created', {
              themeName: res.insert_themes_one.general.name,
            });
            queryClient.setQueryData(
              ['GetThemes', { companyId: variables.object.companyId }],
              (prev: any) => {
                return { ...prev, themes: [res.insert_themes_one] };
              }
            );
            onSuccess?.();
          },
        }
      );
    },
    []
  );

  const updateTheme = useCallback(
    async (values: FieldValues, id: string, onSuccess?: () => void) => {
      await updateThemeMutation(
        {
          id,
          _set: {
            general: {
              name: values.name,
              fontFamily: values.fontFamily,
            },
            dashboard: {
              backgroundColor: values.bgColor,
              ctaColor: values.ctaColor,
              ctaTextColor: values.ctaTextColor,
              selectBoxSize: values.selectBoxSize,
              selectBoxVariant: values.selectBoxVariant,
              selectBoxBorderRadius: values.selectBoxBorderRadius,
              selectBoxTextColor: values.selectBoxTextColor,
            },
            cardTitle: {
              fontWeight: values.cardTitleFontWeight,
              fontSize: values.cardTitleFontSize,
              color: values.cardTitleTextColor,
            },
            cardDescription: {
              fontWeight: values.cardDescriptionFontWeight,
              fontSize: values.cardDescriptionFontSize,
              color: values.cardDescriptionTextColor,
            },
            cardCustomization: {
              borderRadius: values.cardCustomisationBorderRadius,
              padding: values.cardPadding,
              shadow: values.cardShadow,
            },
            chart: {
              selected: values.chartPalette,
              palettes: values.chartPalettes,
            },
          },
        },
        {
          onSuccess: (res) => {
            if (!res.update_themes_by_pk) return;
            segmentEvent('theme created', {
              themeName: res.update_themes_by_pk.general.name,
            });
            queryClient.setQueryData(
              ['GetThemes', { companyId: res.update_themes_by_pk.companyId }],
              (prev: any) => {
                return { ...prev, themes: [res.update_themes_by_pk] };
              }
            );
            onSuccess?.();
          },
        }
      );
    },
    []
  );

  const updateChartTheme = useCallback(
    async (
      chartCustomizationValues: any,
      id: string,
      onSuccess?: () => void
    ) => {
      await updateThemeMutation(
        {
          id,
          _set: {
            chartCustomization: chartCustomizationValues,
          },
        },
        {
          onSuccess: (res) => {
            if (!res.update_themes_by_pk) return;
            segmentEvent('theme created', {
              themeName: res.update_themes_by_pk.general.name,
            });
            queryClient.setQueryData(
              ['GetThemes', { companyId: res.update_themes_by_pk.companyId }],
              (prev: any) => {
                return { ...prev, themes: [res.update_themes_by_pk] };
              }
            );
            onSuccess?.();
          },
        }
      );
    },
    []
  );

  const deleteTheme = useCallback(async (id: string) => {
    await deleteThemeMutation(
      {
        id,
      },
      {
        onSuccess: (res) => {
          if (!res.delete_themes_by_pk) return;
          segmentEvent('theme created', {
            themeName: res.delete_themes_by_pk.general.name,
          });
          queryClient.setQueryData(
            ['GetThemes', { companyId: res.delete_themes_by_pk.companyId }],
            (prev: any) => {
              const updatedThemes = prev?.themes?.filter(
                (theme: any) => theme.id !== id
              );
              return { ...prev, themes: updatedThemes };
            }
          );
        },
      }
    );
  }, []);

  const resetTheme = useCallback(async (id: string) => {
    await resetThemeMutation(
      {
        id,
      },
      {
        onSuccess: (res) => {
          if (!res.delete_themes_by_pk?.id) return;
          queryClient.setQueryData(
            ['GetThemes', { companyId: getCurrentUser()?.companyId }],
            (prev: any) => {
              return { ...prev, themes: [] };
            }
          );
          segmentEvent('theme resetted', {
            id: res.delete_themes_by_pk.id,
          });
          setResetted(true);
          setTimeout(() => {
            setResetted(false);
          }, 5000);
        },
      }
    );
  }, []);

  const saveWorkspaceTheme = useCallback(
    async (themeId: string, onSuccess: () => void) => {
      await saveWorkspaceThemeMutation(
        {
          themeId,
          workspaceId: workspace?.id,
        },
        {
          onSuccess: (res) => {
            if (!res.insert_workspaceThemes_one) return;
            onSuccess();
          },
        }
      );
    },
    [workspace]
  );

  const saveWorkspaceThemeForAll = useCallback(
    async (themeId: string, onSuccess?: () => void) => {
      const objects = workspaces?.map((w) => ({
        themeId,
        workspaceId: w?.id,
      }));
      await saveWorkspaceThemeForAllMutation(
        {
          objects,
        },
        {
          onSuccess: (res) => {
            if (!res.insert_workspaceThemes) return;
            onSuccess?.();
          },
        }
      );
    },
    [workspaces]
  );

  const setAdminTheme = (theme: any, isPlayground?: boolean) => {
    if (!theme) {
      const adminStyles = document.querySelector('#dbn-admin-styles');
      if (adminStyles) document.head.removeChild(adminStyles);
      return;
    }
    const adminStyles =
      document.getElementById('dbn-admin-styles') ||
      document.createElement('style');
    adminStyles.setAttribute('type', 'text/css');
    adminStyles.setAttribute('id', 'dbn-admin-styles');

    let style = '';
    if (theme.general.fontFamily?.trim()) {
      style = `
      #dbn-dashboard { 
        font-family: ${theme.general.fontFamily} !important;
      }`;
    }
    if (theme.dashboard.backgroundColor?.trim()) {
      style = `${style}
      #dbn-dashboard {
        background-color: ${theme.dashboard.backgroundColor} !important;
      }
      .dbn-selectBox {
        background-color: ${theme.dashboard.backgroundColor} !important;
      }`;
    }
    if (theme.dashboard.ctaColor?.trim()) {
      style = `${style} 
      #dbn-dashboard .dbn-btn-primary {
        background-color: ${theme.dashboard.ctaColor} !important;
      }`;
    }
    if (theme.dashboard.ctaTextColor?.trim()) {
      style = `${style} 
      #dbn-dashboard .dbn-btn-primary {
        color: ${theme.dashboard.ctaTextColor} !important;
      }`;
    }
    if (theme.cardTitle.fontWeight?.trim()) {
      style = `${style} 
      .dbn-metric-card-title {
        font-weight: ${theme.cardTitle.fontWeight} !important;
      }`;
    }
    if (theme.cardTitle.fontSize?.trim()) {
      style = `${style} 
      .dbn-metric-card-title {
        font-size: ${
          isPlayground
            ? theme.cardTitle.fontSize
              ? `${theme.cardTitle.fontSize}px`
              : 0
            : theme.cardTitle.fontSize
        } !important;
      }`;
    }
    if (theme.cardTitle.color?.trim()) {
      style = `${style} 
      .dbn-metric-card-title {
        color: ${theme.cardTitle.color} !important;
      }`;
    }
    if (theme.cardDescription.fontWeight?.trim()) {
      style = `${style} 
      .dbn-metric-card-description {
        font-weight: ${theme.cardDescription.fontWeight} !important;
      }`;
    }
    if (theme.cardDescription.fontSize?.trim()) {
      style = `${style} 
      .dbn-metric-card-description {
        font-size: ${
          isPlayground
            ? theme.cardDescription.fontSize
              ? `${theme.cardDescription.fontSize}px`
              : 0
            : theme.cardDescription.fontSize
        } !important;
      }`;
    }
    if (theme.cardDescription.color?.trim()) {
      style = `${style} 
      .dbn-metric-card-description {
        color: ${theme.cardDescription.color} !important;
      }`;
    }
    if (theme.cardCustomization.borderRadius?.trim()) {
      style = `${style}
      .dbn-metric-card {
        border-radius: ${
          isPlayground
            ? theme.cardCustomization.borderRadius
              ? `${theme.cardCustomization.borderRadius}px`
              : 0
            : theme.cardCustomization.borderRadius
        } !important;
      }
      .dbn-metric-card-container {
        border-radius: ${
          isPlayground
            ? theme.cardCustomization.borderRadius
              ? `${theme.cardCustomization.borderRadius}px`
              : 0
            : theme.cardCustomization.borderRadius
        } !important;
      }
      `;
    }
    if (theme.cardCustomization.padding?.trim()) {
      style = `${style}
      .dbn-metric-card {
        padding: ${
          isPlayground
            ? theme.cardCustomization.padding
              ? `${theme.cardCustomization.padding}px`
              : 0
            : theme.cardCustomization.padding
        } !important;
      }`;
    }
    if (theme.cardCustomization.shadow?.trim()) {
      style = `${style}
      .dbn-metric-card-container {
        box-shadow: ${theme.cardCustomization.shadow} !important;
      }`;
    }
    if (theme.dashboard.selectBoxTextColor?.trim()) {
      style = `${style}
      .dbn-selectBox {
        color: ${theme.dashboard.selectBoxTextColor} !important;
      }`;
    }
    if (document.head.querySelector('#dbn-admin-styles'))
      document.head.removeChild(adminStyles);
    adminStyles.innerHTML = '';
    adminStyles.innerHTML = style;
    document.head.appendChild(adminStyles);
  };

  const applyTheme = (theme?: GetThemesQuery['themes'][0]) => {
    setTheme(theme!);
    const colors = theme?.chart?.palettes?.find(
      (palette: { name: string; colors: string[] }) =>
        palette.name === theme?.chart?.selected
    )?.colors;

    setChartColors(colors);
  };

  const defaultTheme = useMemo(() => {
    return themesData?.themes.find(
      (thm) => thm.id === defaultThemeData?.companies_by_pk?.defaultTheme
    );
  }, [defaultThemeData?.companies_by_pk?.defaultTheme, themesData?.themes]);

  useEffect(() => {
    if (!workspaceTheme && !defaultTheme) return;
    const themeToApply = workspaceTheme || defaultTheme;
    setTheme(themeToApply);
    const colors = themeToApply?.chart?.palettes?.find(
      (palette: { name: string; colors: string[] }) =>
        palette.name === themeToApply?.chart?.selected
    )?.colors;
    setChartColors(colors);
    setAdminTheme(themeToApply);
  }, [workspaceTheme, defaultTheme]);

  return {
    theme: userTheme,
    themeChartColors: themeState.chartColors,
    saveTheme,
    deleteTheme,
    updateTheme,
    saveWorkspaceTheme,
    saveWorkspaceThemeForAll,
    isLoadingTheme:
      isFetchingTheme ||
      isSavingTheme ||
      isUpdatingTheme ||
      isResettingTheme ||
      isSavingWorkspaceTheme ||
      isSavingWorkspaceThemeForAll ||
      isMarkingDefaultTheme,
    isResetted,
    resetTheme,
    applyTheme,
    setAdminTheme,
    themesData,
    workspaceTheme,
    markDefaultTheme,
    defaultTheme: defaultThemeData?.companies_by_pk?.defaultTheme,
    updateChartTheme,
  };
};

export default useTheme;
