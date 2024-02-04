/* eslint-disable react/forbid-dom-props */
/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useMemo, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import styles from './metricList.module.css';
import {
  MetricCardProps,
  MetricCard,
  ArchiveMetricModal,
  FullScreenView,
  DownloadRawCsvModal,
} from './components';
import { Portal, Text, Icons } from '@/components';
import { ClientType } from '@/types/app';
import { ThemeType } from '@/utils/theme';
import { useArchiveMetric } from '@/hooks';
import { ExternalMetrics } from '@/types/queryTypes';
import { RlsCondition } from '@/types';
import { getSqlStatement } from '@/helpers';
import { CHART_TYPES } from '@/consts';

export const GridLayout = WidthProvider(Responsive);

export type ExternalMetricListProps = {
  chartColors?: string[];
  globalFilters?: MetricCardProps['globalFilters'];
  client: ClientType['value'];
  companyId: string;
  isAllowedToUpdateMetrics?: boolean;
  isAllowedToDeleteMetrics?: boolean;
  isAllowedToChangeLayout?: boolean;
  isMetricListLoading?: boolean;
  breakpoint: ThemeType['breakpoint'];
  layoutCols: ThemeType['metricLayoutCols'];
  externalDashboardMetrics?: any;
  params?: any;
  appFilters?: any;
  companyTenancyType: string;
  externalDashboardId: string;
  externalDashboardPk: string;
  sharingSettingsId?: string;
  isHideChartSettings?: boolean;
  isHideTablePreview?: boolean;
  enableDownloadCsv?: boolean;
  enableEmailCsv?: boolean;
  disableFullscreen?: boolean;
  enableMultiMetricFilters?: boolean;
  layout: {
    clientLayout: Layout[];
    adminLayout: Layout[];
    isLocked: boolean;
    onChange: (layout: Layout[]) => void;
  };
  dropdownTheme: {
    width: string;
    variant: 'static' | 'floating';
    radius: string;
  };
  optionsIcon?: 'kebab-menu-vertical' | 'download';
  token: string;
};

export const ExternalMetricList: React.FC<ExternalMetricListProps> = ({
  chartColors,
  globalFilters,
  client,
  companyId,
  isAllowedToUpdateMetrics,
  isAllowedToDeleteMetrics,
  isAllowedToChangeLayout,
  externalDashboardMetrics,
  isMetricListLoading,
  breakpoint,
  layoutCols,
  layout,
  params,
  companyTenancyType = 'TABLE',
  externalDashboardId,
  externalDashboardPk,
  sharingSettingsId,
  appFilters,
  isHideChartSettings,
  isHideTablePreview,
  enableDownloadCsv,
  enableEmailCsv,
  enableMultiMetricFilters,
  disableFullscreen,
  dropdownTheme,
  optionsIcon,
  token,
}) => {
  const [crossDashboardFilters, setCrossDashboardFilters] = useState<
    RlsCondition[]
  >([]);
  const [rawCsvModal, setRawCsvModal] = useState<{
    show: boolean;
    metric?: ExternalMetrics;
    filterValues?: Record<string, any>;
  }>({
    show: false,
    metric: undefined,
    filterValues: undefined,
  });
  const [archiveModal, setArchiveModal] = useState({ id: '', show: false });
  const [downloadMetrics, setDownloadMetrics] = useState<
    { id: string; isInProgress: boolean }[]
  >([]);
  const [fullScreenModal, setFullScreenModal] = useState<{
    metric?: ExternalMetrics;
    rlsFilters?: any;
    appFilters?: any;
    show: boolean;
  }>({ show: false });

  const { handleArchiveMetric, isLoading: isArchiving } = useArchiveMetric({
    dashboardId: externalDashboardId,
    clientId: client,
    metricId: archiveModal.id,
    onSuccess: () => {
      setArchiveModal({ id: '', show: false });
      window.location.reload();
    },
  });

  const metricsList = useMemo(() => {
    const metricListData = externalDashboardMetrics?.map(
      (data: any) => data.externalMetric
    );

    const adminMetrics = metricListData?.filter(
      (data: any) => !data.isCreatedByClient
    );
    const clientMetrics = metricListData?.filter(
      (data: any) => data.isCreatedByClient && data.clientId === client
    );
    const allMetricList = [
      ...(adminMetrics || []),
      ...(clientMetrics || []),
    ].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

    return allMetricList;
  }, [client, externalDashboardMetrics]);

  const metricsLayout = useMemo(() => {
    const layoutAttributes = metricsList.map((metric) => {
      const cardLayout = layout.clientLayout.find(
        (card) => card.i === metric.id
      );
      const adminCardLayout = layout.adminLayout.find(
        (card) => card.i === metric.id
      );
      return {
        i: cardLayout?.i || adminCardLayout?.i || metric.id,
        w:
          cardLayout?.w ||
          adminCardLayout?.w ||
          metric.resizeAttributes?.width ||
          5,
        h:
          cardLayout?.h ||
          adminCardLayout?.h ||
          metric.resizeAttributes?.height ||
          10,
        x:
          cardLayout?.x ||
          adminCardLayout?.x ||
          metric.resizeAttributes?.xAxis ||
          0,
        y:
          cardLayout?.y ||
          adminCardLayout?.y ||
          metric.resizeAttributes?.yAxis ||
          0,
        minW: [
          CHART_TYPES.singleValue,
          CHART_TYPES.pivot,
          CHART_TYPES.pivotV2,
        ].includes(metric.chartOptions.chartType)
          ? 2
          : 3,
        minH: [
          CHART_TYPES.singleValue,
          CHART_TYPES.pivot,
          CHART_TYPES.pivotV2,
        ].includes(metric.chartOptions.chartType)
          ? 2
          : 8,
        maxH: metric.chartOptions.chartType === 'table' ? Infinity : 15,
      };
    });
    return layoutAttributes;
  }, [metricsList, layout.adminLayout, layout.clientLayout]);
  useEffect(() => {
    setCrossDashboardFilters([]);
  }, [metricsList]);
  const metricCards = useMemo(() => {
    return metricsList.map((metricItem: any) => (
      <div
        className={`dbn-metric-card-container ${styles['MetricList-wrapper']} ${
          isAllowedToChangeLayout ? styles['MetricList-wrapper-move'] : ''
        }`}
        key={metricItem.id}
        id={metricItem.id}
      >
        <MetricCard
          guestToken={token}
          isFrontendApp={false}
          downloadMetrics={downloadMetrics}
          onDownload={(id: string, isEnable: boolean) => {
            if (!isEnable) {
              setDownloadMetrics((prev) => prev.filter((m) => m.id !== id));
            } else {
              setDownloadMetrics((prev) => [
                ...prev,
                { id, isInProgress: isEnable },
              ]);
            }
          }}
          metricItem={metricItem}
          dropdownTheme={dropdownTheme}
          optionsIcon={optionsIcon}
          onMaximize={
            !layout.isLocked || disableFullscreen
              ? undefined
              : (metric, rlsFilters, appFilter) =>
                  setFullScreenModal({
                    show: true,
                    metric,
                    rlsFilters,
                    appFilters: appFilter,
                  })
          }
          client={client}
          colors={chartColors}
          globalFilters={globalFilters}
          param={params?.find(
            (obj: { metricId: any }) => obj.metricId === metricItem.metricId
          )}
          appFilters={appFilters?.find(
            (obj: { metricId: any }) => obj.metricId === metricItem.metricId
          )}
          companyTenancyType={companyTenancyType}
          onArchive={
            isAllowedToDeleteMetrics
              ? (id) => setArchiveModal({ id, show: true })
              : undefined
          }
          disableActions={!layout.isLocked}
          isDisableMorePopup={!layout.isLocked}
          setCrossDashboardFilters={setCrossDashboardFilters}
          crossDashboardFilters={crossDashboardFilters}
          enableMultiMetricFilters={enableMultiMetricFilters}
          enableDownloadCsv={enableDownloadCsv}
          onDownloadRawCsv={
            enableEmailCsv
              ? (filterValues?: Record<string, any>) =>
                  setRawCsvModal({
                    show: true,
                    metric: metricItem,
                    filterValues,
                  })
              : undefined
          }
        />
      </div>
    ));
  }, [
    metricsList,
    downloadMetrics,
    isAllowedToChangeLayout,
    dropdownTheme,
    optionsIcon,
    layout.isLocked,
    disableFullscreen,
    client,
    chartColors,
    globalFilters,
    params,
    appFilters,
    companyTenancyType,
    isAllowedToDeleteMetrics,
    crossDashboardFilters,
    enableMultiMetricFilters,
    enableDownloadCsv,
    enableEmailCsv,
  ]);

  return (
    <>
      {metricsList.length && metricsLayout.length ? (
        <>
          <div
            className={styles['MetricList-container']}
            id="metric-list-container"
          >
            <GridLayout
              layouts={{
                lg: metricsLayout,
              }}
              onResizeStop={
                isAllowedToChangeLayout ? layout.onChange : undefined
              }
              onDragStop={isAllowedToChangeLayout ? layout.onChange : undefined}
              isDraggable={isAllowedToChangeLayout}
              isDroppable={isAllowedToChangeLayout}
              isResizable={isAllowedToChangeLayout}
              rowHeight={30}
              breakpoints={
                breakpoint ?? { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
              }
              cols={layoutCols ?? { lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
            >
              {metricCards}
            </GridLayout>
          </div>
          {isAllowedToDeleteMetrics ? (
            <ArchiveMetricModal
              isLoading={isArchiving}
              isOpen={archiveModal.show}
              onArchive={handleArchiveMetric}
              onClose={() => setArchiveModal({ id: '', show: false })}
            />
          ) : null}
          <Portal>
            {!disableFullscreen &&
              fullScreenModal.show &&
              fullScreenModal.metric && (
                <FullScreenView
                  guestToken={token}
                  isFrontendApp={false}
                  downloadMetrics={downloadMetrics}
                  globalFilters={globalFilters}
                  metric={fullScreenModal.metric}
                  rlsFilters={fullScreenModal.rlsFilters}
                  appFilters={fullScreenModal.appFilters}
                  colors={chartColors}
                  externalDashboardId={externalDashboardPk}
                  userProvidedDashboardId={externalDashboardId}
                  tenancyLevel={companyTenancyType}
                  isAllowedToUpdateMetrics={isAllowedToUpdateMetrics}
                  clientId={client}
                  companyId={companyId}
                  onMinimize={() =>
                    setFullScreenModal({
                      show: false,
                      metric: undefined,
                    })
                  }
                  onArchive={
                    isAllowedToDeleteMetrics
                      ? (metricId: string) =>
                          setArchiveModal({
                            id: metricId,
                            show: true,
                          })
                      : undefined
                  }
                  isShowChartConfigTab={false}
                  isHideChartSettings={isHideChartSettings}
                  isHideTablePreview={isHideTablePreview}
                  sharingSettingsId={sharingSettingsId}
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
                />
              )}
          </Portal>
          {enableEmailCsv && (
            <DownloadRawCsvModal
              metricItem={rawCsvModal.metric}
              isShowRawCsvModal={rawCsvModal.show}
              onCloseModal={() =>
                setRawCsvModal({
                  show: false,
                  metric: undefined,
                  filterValues: undefined,
                })
              }
              query={getSqlStatement({
                query: rawCsvModal.metric?.query || '',
                dbName: rawCsvModal.metric?.integrationName || '',
                rlsConditions:
                  rawCsvModal.metric?.rlsConditions?.filter(
                    (f: any) => f.isAddOnMetrics
                  ) || [],
                tenancyLevel: companyTenancyType,
                clientId: client,
                globalFilters,
                values: rawCsvModal.filterValues,
                isAllClient: false,
              })}
              sharingSettingsId={sharingSettingsId}
            />
          )}
        </>
      ) : (
        <>
          {!isMetricListLoading ? (
            <div className={styles['noMetric-container']}>
              <div className={styles['noMetric-wrapper']}>
                <Text variant="heading">No metrics created yet</Text>
              </div>
            </div>
          ) : (
            <div className={styles['alt-container']}>
              <Icons name="not-found" />
            </div>
          )}
        </>
      )}
    </>
  );
};
