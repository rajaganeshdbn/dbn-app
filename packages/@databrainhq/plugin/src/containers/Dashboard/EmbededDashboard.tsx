/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-dom-props */
import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from 'react-grid-layout';
import styles from './dashboard.module.css';
import {
  EmbeddedMetricCreation,
  GlobalFilters,
  Button,
  ExternalMetricList,
  ExternalMetricListProps,
  Text,
  Loader,
  Icons,
  Switch,
  Portal,
  SelfHostControl,
} from '@/components';
import { ThemeType } from '@/utils';
import ScheduleEmail from '@/components/ScheduleEmail';
import { useDashboardContext } from '@/hooks/useDashboardContext';
import { useClientDashboardLayout } from '@/hooks';
import { AdminThemeOptionsType, FilterValueType } from '@/types';
import { GenerateMetric } from '@/components/GenerateMetric';
import { useGetTheme } from '@/queries/externalDashboard.query';

export interface EmbeddedDashboardProps {
  options?: {
    disableMetricCreation?: boolean;
    disableMetricUpdation?: boolean;
    disableMetricDeletion?: boolean;
    disableLayoutCustomization?: boolean;
    disableSaveLayout?: boolean;
    disableScheduleEmailReports?: boolean;
    disableFullscreen?: boolean;
    chartColors?: string[];
    isHideChartSettings?: boolean;
    isHideTablePreview?: boolean;
    enableDownloadCsv?: boolean;
    enableEmailCsv?: boolean;
    enableMultiMetricFilters?: boolean;
    optionsIcon?: 'kebab-menu-vertical' | 'download';
  };
  theme?: ThemeType;
  adminThemeOption?: AdminThemeOptionsType;
  customMessages?: {
    tokenExpiry?: string;
  };
  themeName?: string;
  setAdminTheme: (theme?: AdminThemeOptionsType) => void;
  token: string;
  dashboardId?: string;
}

export const EmbeddedDashboard = React.memo(
  ({
    options,
    theme,
    adminThemeOption,
    customMessages,
    themeName,
    setAdminTheme,
    token,
    dashboardId,
  }: EmbeddedDashboardProps) => {
    const [url, setUrl] = useState<string>(window.location.search);
    const { data, isLoading, error } = useDashboardContext();
    const [isShowMetricCreateModal, setShowMetricCreateModal] = useState(false);
    const [isShowGenerateMetricModal, setShowGenerateMetricModal] =
      useState(false);
    const [selectedFilterVal, setSelectedFilterVal] = useState<
      {
        name: string;
        value: FilterValueType;
      }[]
    >([]);
    const [dropdownTheme, setDropdownTheme] = useState<{
      width: string;
      variant: 'static' | 'floating';
      radius: string;
    }>({
      width: '200px',
      variant: 'floating',
      radius: '6px',
    });
    const [editLayout, setEditLayout] = useState<{
      isEnabled: boolean;
      layout: Layout[];
    }>({
      isEnabled: false,
      layout: [],
    });
    const [globalFilters, setGlobalFilters] = useState<
      ExternalMetricListProps['globalFilters']
    >({
      tableName: '',
      filters: [],
    });

    const {
      saveLayout,
      layout: clientLayout,
      isLoadingLayout,
    } = useClientDashboardLayout({
      clientId: data?.clientId || '',
      externalDashboardId: data?.externalDashboard?.id,
    });

    const { data: themeNameData } = useGetTheme({
      token: data?.token || '',
      name: themeName || '',
      companyId: data?.companyId || '',
    });

    const applicableTheme = useMemo(
      () =>
        data?.adminTheme || adminThemeOption || (themeNameData as any)?.theme,
      [adminThemeOption, data?.adminTheme, themeNameData]
    );

    const adminThemeChartColors = useMemo(() => {
      const colors: string[] | undefined =
        applicableTheme?.chart?.palettes?.find(
          (palette: { name: string; colors: string[] }) =>
            palette.name === applicableTheme?.chart?.selected
        )?.colors;
      return colors;
    }, [applicableTheme]);
    const setSearchParams = (searchParam: any) => {
      const newUrl = `${window.location.pathname}?${searchParam}${window.location.hash}`;
      window.history.replaceState(null, '', newUrl);
    };
    useEffect(() => {
      if (applicableTheme?.dashboard.selectBoxSize) {
        switch (applicableTheme?.dashboard.selectBoxSize) {
          case 'small':
            setDropdownTheme((prev) => ({
              ...prev,
              width: '130px',
            }));
            break;
          case 'medium':
            setDropdownTheme((prev) => ({
              ...prev,
              width: '180px',
            }));
            break;
          case 'large':
            setDropdownTheme((prev) => ({
              ...prev,
              width: '250px',
            }));
            break;
          default:
            setDropdownTheme((prev) => ({
              ...prev,
              width: '200px',
            }));
        }
      }
      if (applicableTheme?.dashboard.selectBoxVariant) {
        setDropdownTheme((prev) => ({
          ...prev,
          variant: applicableTheme.dashboard.selectBoxVariant,
        }));
      }
      if (applicableTheme?.dashboard.selectBoxBorderRadius) {
        setDropdownTheme((prev) => ({
          ...prev,
          radius: applicableTheme.dashboard.selectBoxBorderRadius,
        }));
      }
    }, [applicableTheme]);
    const filters = useMemo(
      () =>
        data?.companyTenancyType === 'DATABASE'
          ? data?.externalDashboard?.filters?.map((filter: any) => ({
              ...filter,
              tableName: `${data?.clientId}.${
                filter.tableName.split(/\.(?=[^.]*$)/)?.[1]
              }`,
            })) || []
          : data?.externalDashboard?.filters || [],
      [
        data?.externalDashboard?.filters,
        data?.companyTenancyType,
        data?.clientId,
      ]
    );
    const extractQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const queryParamsObject: any = {};

      queryParams.forEach((value, key) => {
        if (value.includes(';;')) {
          const valueArray = value.split(';;');
          if (queryParamsObject[key]) {
            queryParamsObject[key] = [...queryParamsObject[key], ...valueArray];
          } else {
            queryParamsObject[key] = valueArray;
          }
        } else if (queryParamsObject[key]) {
          queryParamsObject[key] = [...queryParamsObject[key], value];
        } else {
          queryParamsObject[key] = value;
        }
      });

      return queryParamsObject;
    };
    const filterPairs = useMemo(() => extractQueryParams(), [url]);

    useEffect(() => {
      if (!filters?.length) {
        setGlobalFilters(undefined);
      }
    }, [filters]);

    useEffect(() => {
      setAdminTheme(applicableTheme);
    }, [applicableTheme]);
    useEffect(() => {
      if (selectedFilterVal.length) {
        const searchParam = new URLSearchParams();
        searchParam.set('token', token);
        searchParam.set('dashboardId', dashboardId || '');

        globalFilters?.filters?.forEach((element) => {
          if (Array.isArray(element.value)) {
            let valString = '';
            element.value.forEach((ele, index) => {
              const eleString = index === 0 ? '' : ';;';
              valString += `${eleString}${
                ele.toString().includes("'") ? ele.replace(/^'|'$/g, '') : ele
              }`;
            });
            searchParam.set(element.label, valString);
          } else if (
            typeof element.value === 'object' &&
            element.value?.value
          ) {
            searchParam.set(
              element.label,
              `${element.value?.startDate};;${element.value?.endDate}`
            );
          } else if (
            typeof element.value !== 'object' &&
            element.value !== null &&
            element.value !== undefined &&
            element.value !== ''
          ) {
            searchParam.set(
              element.label,
              element.value.toString().includes("'")
                ? element.value.toString().replace(/^'|'$/g, '')
                : element.value.toString()
            );
          }
        });
        setSearchParams(searchParam.toString());
      }
    }, [selectedFilterVal]);
    useEffect(() => {
      setUrl(window.location.search);
    }, [globalFilters]);

    return (
      <>
        <div className={`${styles['embedDashboard-container']} dbn-dashboard`}>
          {data?.externalDashboard?.id && !isLoading && (
            <>
              <div className={styles['embedDashboard-header']}>
                <Text variant="heading-lg">
                  {data.externalDashboard.name || 'Dashboard'}
                </Text>
                <div className={styles['embedDashboard-header-buttons']}>
                  {editLayout.isEnabled ? (
                    <>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          setEditLayout({ isEnabled: false, layout: [] })
                        }
                      >
                        Exit
                      </Button>
                      {!options?.disableSaveLayout && (
                        <Button
                          type="button"
                          variant="primary"
                          onClick={async () => {
                            await saveLayout(editLayout.layout, true);
                            setEditLayout({ isEnabled: false, layout: [] });
                          }}
                          isDisabled={
                            !editLayout.layout.length || isLoadingLayout
                          }
                        >
                          Save Layout
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      {data.isAllowedToChangeLayout &&
                        !options?.disableLayoutCustomization && (
                          <Switch
                            name="customise layout"
                            placeholder="Customize Layout"
                            enabled={editLayout.isEnabled}
                            onChange={(isEnabled) =>
                              setEditLayout({ isEnabled, layout: [] })
                            }
                          />
                        )}
                      {data.sharingSettingsId &&
                        data.isAllowedToEmailReports &&
                        !options?.disableScheduleEmailReports && (
                          <SelfHostControl>
                            <ScheduleEmail />
                          </SelfHostControl>
                        )}
                      {!options?.disableMetricCreation &&
                        data.isAllowedToCreateMetrics && (
                          <>
                            <Button
                              type="button"
                              variant="primary"
                              onClick={() => setShowMetricCreateModal(true)}
                              leftIcon={<Icons name="plus" color="light" />}
                            >
                              Create Metric
                            </Button>
                            <Portal>
                              {isShowMetricCreateModal && (
                                <EmbeddedMetricCreation
                                  clientId={data.clientId as string}
                                  companyId={data.companyId}
                                  isLiveMode={false}
                                  externalDashboardId={
                                    data.externalDashboard.id
                                  }
                                  chartColors={
                                    options?.chartColors ??
                                    adminThemeChartColors
                                  }
                                  isShowMetricCreateModal={
                                    isShowMetricCreateModal
                                  }
                                  setShowMetricCreateModal={
                                    setShowMetricCreateModal
                                  }
                                  workspaceId={data.workspace?.id}
                                  userProvidedDashboardId={
                                    data.externalDashboard.externalDashboardId
                                  }
                                />
                              )}
                            </Portal>
                          </>
                        )}
                      {!options?.disableMetricCreation &&
                        data.isAllowedToCreateMetrics && (
                          <>
                            <Button
                              type="button"
                              variant="tab"
                              onClick={() => setShowGenerateMetricModal(true)}
                            >
                              <Icons name="magnifying-glass" />
                            </Button>
                            <Portal>
                              {isShowGenerateMetricModal && (
                                <GenerateMetric
                                  clientId={data.clientId as string}
                                  companyId={data.companyId}
                                  isLiveMode={false}
                                  externalDashboardId={
                                    data.externalDashboard.id
                                  }
                                  chartColors={
                                    options?.chartColors ??
                                    adminThemeChartColors
                                  }
                                  isShowMetricCreateModal={
                                    isShowGenerateMetricModal
                                  }
                                  setShowMetricCreateModal={
                                    setShowGenerateMetricModal
                                  }
                                  workspaceId={data.workspace?.id}
                                  userProvidedDashboardId={
                                    data.externalDashboard.externalDashboardId
                                  }
                                />
                              )}
                            </Portal>
                          </>
                        )}
                    </>
                  )}
                </div>
              </div>
              <div className={styles['embedDashboard-wrapper']}>
                {!editLayout.isEnabled &&
                data.externalDashboard.filters.length ? (
                  <GlobalFilters
                    tenancyLevel={data.companyTenancyType}
                    appliedFilterPairs={filterPairs}
                    filters={filters}
                    onApply={(
                      values: ExternalMetricListProps['globalFilters']
                    ) => {
                      setGlobalFilters(values);
                    }}
                    theme={dropdownTheme}
                    internal={{
                      isInternal: true,
                      workspaceId: data.workspace?.id,
                    }}
                    setSelectedFilterVal={setSelectedFilterVal}
                  />
                ) : null}
                <ExternalMetricList
                  token={token}
                  client={data.clientId as string}
                  companyId={data.companyId}
                  optionsIcon={options?.optionsIcon}
                  externalDashboardId={
                    data.externalDashboard.externalDashboardId
                  }
                  externalDashboardPk={data.externalDashboard.id}
                  layout={{
                    adminLayout: data.externalDashboard.layout,
                    clientLayout,
                    isLocked:
                      !data.isAllowedToChangeLayout || !editLayout.isEnabled,
                    onChange: (newLayout) =>
                      setEditLayout((prev) => ({ ...prev, layout: newLayout })),
                  }}
                  isAllowedToDeleteMetrics={
                    !options?.disableMetricDeletion &&
                    data.isAllowedToDeleteMetrics
                  }
                  isAllowedToUpdateMetrics={
                    !options?.disableMetricUpdation &&
                    data.isAllowedToUpdateMetrics
                  }
                  isAllowedToChangeLayout={
                    !options?.disableLayoutCustomization &&
                    data.isAllowedToChangeLayout &&
                    editLayout.isEnabled
                  }
                  externalDashboardMetrics={data.externalDashboardMetrics}
                  isMetricListLoading={isLoading}
                  globalFilters={globalFilters}
                  breakpoint={theme?.breakpoint}
                  layoutCols={theme?.metricLayoutCols}
                  chartColors={options?.chartColors ?? adminThemeChartColors}
                  params={
                    Array.isArray(data.rlsSettings) ? data.rlsSettings : []
                  }
                  companyTenancyType={data.companyTenancyType}
                  sharingSettingsId={data.sharingSettingsId}
                  appFilters={data.appFilters}
                  isHideChartSettings={options?.isHideChartSettings}
                  isHideTablePreview={options?.isHideTablePreview}
                  enableDownloadCsv={options?.enableDownloadCsv}
                  enableEmailCsv={options?.enableEmailCsv}
                  enableMultiMetricFilters={options?.enableMultiMetricFilters}
                  disableFullscreen={options?.disableFullscreen}
                  dropdownTheme={dropdownTheme}
                />
              </div>
            </>
          )}
          {isLoading && (
            <div className={styles['alt-container']}>
              <Loader />
            </div>
          )}
          {!isLoading && !data?.externalDashboard?.id && (
            <div className={styles['alt-container']}>
              {(error === 'Expired Token!'
                ? customMessages?.tokenExpiry || error
                : error) || 'Invalid token or Dashboard id'}
            </div>
          )}
        </div>
      </>
    );
  }
);
