import React, { useEffect, useMemo, useState } from 'react';
import styles from './metric.module.css';
import {
  DownloadRawCsvModal,
  FullScreenView,
  Loader,
  MetricCard,
  Portal,
} from '@/components';
import { useEmbeddedMetric } from '@/hooks';
import { AdminThemeOptionsType, MetricFilterOptionsType } from '@/types';
import { getSqlStatement } from '@/helpers';
import { useGetTheme } from '@/queries/externalDashboard.query';

export interface EmbeddedMetricProps {
  token: string;
  chartColors?: string[];
  metricId: string;
  chartRendererType?: 'svg' | 'canvas';
  variant?: 'card' | 'fullscreen';
  onMinimize?: () => void;
  isHideChartSettings?: boolean;
  isHideTablePreview?: boolean;
  enableDownloadCsv?: boolean;
  enableEmailCsv?: boolean;
  enableMultiMetricFilters?: boolean;
  metricFilterOptions?: MetricFilterOptionsType;
  metricFilterPosition?: 'outside' | 'inside';
  disableFullscreen?: boolean;
  optionsIcon?: 'kebab-menu-vertical' | 'download';
  customMessages?: {
    tokenExpiry?: string;
  };
  themeName?: string;
  setAdminTheme: (theme?: AdminThemeOptionsType) => void;
  appearanceOptions?: {
    appearanceOptionsPosition?:
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right';
    dynamicBehaviour?: {
      isEnabled?: boolean;
      label?: string | undefined;
    };
    cumulativeBar?: {
      isEnabled?: boolean;
      label?: string | undefined;
    };
    stackedBars?: {
      isEnabled?: boolean;
      label?: string;
    };
  };
}

export const EmbeddedMetric = React.memo(
  ({
    token,
    chartColors,
    metricId,
    chartRendererType = 'canvas',
    variant = 'card',
    onMinimize,
    isHideChartSettings,
    isHideTablePreview,
    enableDownloadCsv,
    enableEmailCsv,
    metricFilterOptions,
    enableMultiMetricFilters,
    metricFilterPosition = 'outside',
    disableFullscreen,
    optionsIcon,
    customMessages,
    themeName,
    setAdminTheme,
    appearanceOptions,
  }: EmbeddedMetricProps) => {
    const [fullScreen, setFullScreen] = useState<{
      rlsFilters?: any;
      isShow: boolean;
    }>({
      isShow: variant === 'fullscreen',
    });
    const [rawCsvModal, setRawCsvModal] = useState<{
      show: boolean;
      filterValues?: Record<string, any>;
    }>({
      show: false,
      filterValues: undefined,
    });
    const [downloadMetrics, setDownloadMetrics] = useState<
      { id: string; isInProgress: boolean }[]
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

    const {
      externalMetric,
      rlsSettings,
      sharingSettingsId,
      companyId,
      clientId,
      tenancyLevel,
      isLoading,
      errorMsg,
      adminTheme,
    } = useEmbeddedMetric({
      token,
      metricId,
    });

    const { data: themeNameData } = useGetTheme({
      token,
      name: themeName || '',
      companyId,
    });

    const applicableTheme = useMemo(
      () => (themeNameData as any)?.theme || adminTheme,
      [adminTheme, themeNameData]
    );

    const adminColors = useMemo(() => {
      const colors: string[] | undefined =
        applicableTheme?.chart?.palettes?.find(
          (palette: { name: string; colors: string[] }) =>
            palette.name ===
            ((themeNameData as any)?.theme || adminTheme)?.chart?.selected
        )?.colors;
      return colors;
    }, [applicableTheme]);
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

    useEffect(() => {
      setAdminTheme(applicableTheme);
    }, [applicableTheme]);

    return (
      <>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : null}
        {(errorMsg === 'Expired Token!'
          ? customMessages?.tokenExpiry || errorMsg
          : errorMsg) || null}
        {externalMetric && !isLoading ? (
          <>
            {variant === 'card' && (
              <MetricCard
                guestToken={token}
                isFrontendApp={false}
                downloadMetrics={downloadMetrics}
                appearanceOptions={appearanceOptions}
                onDownload={(id: string, isEnable: boolean) => {
                  if (!isEnable) {
                    setDownloadMetrics((prev) =>
                      prev.filter((m) => m.id !== id)
                    );
                  } else {
                    setDownloadMetrics((prev) => [
                      ...prev,
                      { id, isInProgress: isEnable },
                    ]);
                  }
                }}
                metricItem={externalMetric}
                client={clientId}
                dropdownTheme={dropdownTheme}
                colors={adminColors || chartColors}
                optionsIcon={optionsIcon}
                onMaximize={
                  disableFullscreen
                    ? undefined
                    : (_m, rlsFilters) =>
                        setFullScreen({ isShow: true, rlsFilters })
                }
                companyTenancyType={tenancyLevel}
                chartRendererType={chartRendererType}
                param={rlsSettings}
                metricFilterOptions={metricFilterOptions}
                enableDownloadCsv={enableDownloadCsv}
                enableMultiMetricFilters={enableMultiMetricFilters}
                metricFilterPosition={metricFilterPosition}
                onDownloadRawCsv={
                  enableEmailCsv
                    ? (filterValues) =>
                        setRawCsvModal({ show: true, filterValues })
                    : undefined
                }
              />
            )}
            <Portal>
              {(!disableFullscreen && fullScreen.isShow) ||
              variant === 'fullscreen' ? (
                <FullScreenView
                  guestToken={token}
                  isFrontendApp={false}
                  downloadMetrics={downloadMetrics}
                  onDownload={(id: string, isEnable: boolean) => {
                    if (!isEnable) {
                      setDownloadMetrics((prev) =>
                        prev.filter((m) => m.id !== id)
                      );
                    } else {
                      setDownloadMetrics((prev) => [
                        ...prev,
                        { id, isInProgress: isEnable },
                      ]);
                    }
                  }}
                  metric={externalMetric}
                  clientId={clientId}
                  colors={adminColors || chartColors}
                  onMinimize={() => {
                    setFullScreen({ isShow: false });
                    onMinimize?.();
                  }}
                  companyId={companyId}
                  tenancyLevel={tenancyLevel}
                  rlsFilters={fullScreen.rlsFilters}
                  sharingSettingsId={sharingSettingsId}
                  externalDashboardId=""
                  userProvidedDashboardId=""
                  isShowChartConfigTab={false}
                  isHideChartSettings={isHideChartSettings}
                  isHideTablePreview={isHideTablePreview}
                  metricFilterOptions={metricFilterOptions}
                />
              ) : null}
            </Portal>
            {enableEmailCsv && (
              <DownloadRawCsvModal
                metricItem={externalMetric}
                isShowRawCsvModal={rawCsvModal.show}
                onCloseModal={() =>
                  setRawCsvModal({
                    show: false,
                    filterValues: undefined,
                  })
                }
                sharingSettingsId={sharingSettingsId}
                query={getSqlStatement({
                  query: externalMetric?.query || '',
                  dbName: externalMetric?.integrationName || '',
                  rlsConditions:
                    externalMetric?.rlsConditions?.filter(
                      (f: any) => f.isAddOnMetrics
                    ) || [],
                  tenancyLevel,
                  clientId,
                  values: rawCsvModal.filterValues,
                  isAllClient: false,
                })}
              />
            )}
          </>
        ) : null}
      </>
    );
  }
);
