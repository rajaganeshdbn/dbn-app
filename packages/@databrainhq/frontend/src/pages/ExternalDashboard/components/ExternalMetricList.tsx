/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from 'react';
import { Ui, consts, types } from '@databrainhq/plugin';
import { NavLink } from 'react-router-dom';
import { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import {
  ExternalDashboardMetrics,
  ExternalMetrics,
} from 'utils/generated/graphql';
import segmentEvent from 'utils/segmentEvent';
import { encrypt } from 'utils/encryption';
import { ClientType } from 'components/ClientDropDown';
import NoMetrics from 'components/Svg/No metrics.svg';
import useTenancyLevel from 'hooks/useTenancyLevel';
import useSharingSettings from 'hooks/useSharingSettings';
import useArchiveExternalMetric from 'hooks/useExternalArchiveMetric';
import useTheme from 'hooks/useTheme';
import useAccessControl from 'hooks/useAccessControl';
import styles from './externalDashboardComponents.module.css';
import DashboardEmpty from './dashboardEmpty';

export type ExternalMetricListProps = {
  globalFilters?: Ui.MetricCardProps['globalFilters'];
  client: ClientType['value'];
  params?: any;
  externalDashboardId: string;
  userProvidedDashboardId: string;
  isMetricListLoading?: boolean;
  externalDashboardMetrics?: ExternalDashboardMetrics[];
  layout: {
    clientLayout: Layout[];
    adminLayout: Layout[];
    isLocked: boolean;
    onChange: (layout: Layout[]) => void;
  };
  workspaceId?: string;
  isAllClient?: boolean;
  dropdownTheme: {
    width: string;
    variant: 'static' | 'floating';
    radius: string;
  };
  dashboardId?: string;
};

const ExternalMetricList: React.FC<ExternalMetricListProps> = ({
  globalFilters,
  client,
  params,
  externalDashboardMetrics,
  isMetricListLoading,
  externalDashboardId,
  userProvidedDashboardId,
  layout,
  workspaceId,
  isAllClient,
  dropdownTheme,
  dashboardId,
}) => {
  const [crossDashboardFilters, setCrossDashboardFilters] = useState<
    types.RlsCondition[]
  >([]);
  const { themeChartColors } = useTheme();
  const [fullScreenModal, setFullScreenModal] = useState<{
    metric?: ExternalMetrics;
    rlsFilters?: any;
    show: boolean;
  }>({ show: false });
  const [archiveModal, setArchiveModal] = useState<{
    metricId: string;
    show: boolean;
  }>({ show: false, metricId: '' });
  const [downloadMetrics, setDownloadMetrics] = useState<
    { id: string; isInProgress: boolean }[]
  >([]);
  const { companyTenancyType } = useTenancyLevel();

  const { handleArchiveExternalMetric, isLoading: isArchivingMetric } =
    useArchiveExternalMetric({
      externalDashboardId,
      externalMetricId: archiveModal.metricId,
      clientId: client,
      onSuccess: () => setArchiveModal({ show: false, metricId: '' }),
    });

  const { getIsCanAccess } = useAccessControl();

  const metricsList = useMemo(() => {
    const metricListData = externalDashboardMetrics?.map(
      (data) => data.externalMetric
    );

    const adminMetrics = metricListData?.filter(
      (data) => !data.isCreatedByClient
    );
    const clientMetrics = metricListData?.filter(
      (data) => data.isCreatedByClient && data.clientId === client
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
  }, [externalDashboardMetrics, client]);

  const metricsLayout = useMemo(() => {
    const layoutAttributes = metricsList.map((metric) => {
      const cardLayout = layout.clientLayout.find(
        (card) => card.i === metric.id
      );
      const adminCardLayout = layout.adminLayout.find(
        (card) => card.i === metric.id
      );
      return {
        i: cardLayout?.i ?? adminCardLayout?.i ?? metric.id,
        w:
          cardLayout?.w ??
          adminCardLayout?.w ??
          metric.resizeAttributes.width ??
          5,
        h:
          cardLayout?.h ??
          adminCardLayout?.h ??
          metric.resizeAttributes.height ??
          10,
        x:
          cardLayout?.x ??
          adminCardLayout?.x ??
          metric.resizeAttributes.xAxis ??
          0,
        y:
          cardLayout?.y ??
          adminCardLayout?.y ??
          metric.resizeAttributes.yAxis ??
          0,
        minW: [
          consts.CHART_TYPES.singleValue,
          consts.CHART_TYPES.pivot,
          consts.CHART_TYPES.pivotV2,
        ].includes(metric.chartOptions.chartType)
          ? 2
          : 3,
        minH: [
          consts.CHART_TYPES.singleValue,
          consts.CHART_TYPES.pivot,
          consts.CHART_TYPES.pivotV2,
        ].includes(metric.chartOptions.chartType)
          ? 2
          : 8,
        maxH: metric.chartOptions.chartType === 'table' ? Infinity : 15,
      };
    });
    return layoutAttributes;
  }, [layout.adminLayout, layout.clientLayout, metricsList]);

  const { sharingSettingsId } = useSharingSettings();
  useEffect(() => {
    setCrossDashboardFilters([]);
  }, [metricsList]);

  const metricCards = useMemo(() => {
    return metricsList.map((metricItem: any) => {
      return (
        <div
          className={`dbn-metric-card-container ${
            styles['MetricList-wrapper']
          } ${layout.isLocked ? '' : 'hover:dbn-cursor-move'}`}
          key={metricItem.id}
          id={metricItem.id}
          tabIndex={0}
          role="button"
        >
          <Ui.MetricCard
            encryptedClient={encrypt(client)}
            isFrontendApp
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
            isAllClient={isAllClient}
            setCrossDashboardFilters={
              !layout.isLocked ? undefined : setCrossDashboardFilters
            }
            dropdownTheme={dropdownTheme}
            disableActions={!layout.isLocked}
            crossDashboardFilters={crossDashboardFilters}
            metricItem={metricItem}
            onMaximize={
              getIsCanAccess('fullscreen', 'View') && !layout.isLocked
                ? undefined
                : (_metric, rlsFilters) => {
                    segmentEvent('metric maximized', {
                      metricId: metricItem.metricId,
                      metricName: metricItem.name,
                    });
                    setFullScreenModal({
                      show: true,
                      metric: metricItem,
                      rlsFilters,
                    });
                  }
            }
            onArchive={
              getIsCanAccess('metric', 'Archive') && !layout.isLocked
                ? undefined
                : (metricId) => {
                    segmentEvent('metric archived', {
                      metricId: metricItem.metricId,
                      metricName: metricItem.name,
                      dashboardId: externalDashboardId,
                    });
                    setArchiveModal({ show: true, metricId });
                  }
            }
            client={client}
            colors={themeChartColors}
            globalFilters={globalFilters}
            param={params?.find(
              (obj: { metricId: any }) => obj.metricId === metricItem.metricId
            )}
            isDisableCardClick
            isDisableMorePopup
            isInternalApp
            companyTenancyType={companyTenancyType as string}
            renderHeaderName={
              getIsCanAccess('metric', 'Edit') && !layout.isLocked
                ? undefined
                : () => (
                    <NavLink
                      to={{
                        pathname: `/metric/${metricItem.id}/`,
                        search: `?wid=${workspaceId}&dashboardId=${dashboardId}&client=${client}`,
                      }}
                      className="hover:dbn-underline"
                      onClick={() => {
                        segmentEvent(
                          'metric update',
                          {
                            metricId: metricItem.metricId,
                            metricName: metricItem.name,
                          },
                          'page'
                        );
                      }}
                    >
                      {metricItem.name}
                    </NavLink>
                  )
            }
          />
        </div>
      );
    });
  }, [
    metricsList,
    downloadMetrics,
    layout.isLocked,
    client,
    globalFilters,
    params,
    companyTenancyType,
    themeChartColors,
    crossDashboardFilters,
    getIsCanAccess,
    isAllClient,
    dropdownTheme,
  ]);

  return (
    <>
      {metricsList.length && metricsLayout.length ? (
        <>
          <div className={styles['MetricList-container']}>
            <Ui.GridLayout
              layouts={{
                lg: metricsLayout,
              }}
              rowHeight={30}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
              onResizeStop={layout.isLocked ? undefined : layout.onChange}
              onDragStop={layout.isLocked ? undefined : layout.onChange}
              isDraggable={!layout.isLocked}
              isResizable={!layout.isLocked}
              isDroppable={!layout.isLocked}
            >
              {metricCards}
            </Ui.GridLayout>
          </div>
          <Ui.Portal>
            {fullScreenModal.show && fullScreenModal.metric && (
              <Ui.FullScreenView
                encryptedClient={encrypt(client)}
                isFrontendApp
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
                globalFilters={globalFilters}
                isAllClient={isAllClient}
                metric={fullScreenModal.metric as any}
                rlsFilters={fullScreenModal.rlsFilters}
                externalDashboardId={externalDashboardId}
                userProvidedDashboardId={userProvidedDashboardId}
                tenancyLevel={companyTenancyType as string}
                clientId={client}
                companyId={fullScreenModal.metric.companyId}
                colors={themeChartColors}
                onMinimize={() =>
                  setFullScreenModal({
                    show: false,
                    metric: undefined,
                  })
                }
                onArchive={
                  getIsCanAccess('metric', 'Archive')
                    ? (metricId: string) =>
                        setArchiveModal({
                          metricId,
                          show: true,
                        })
                    : undefined
                }
                sharingSettingsId={sharingSettingsId}
                isInternalApp
                isHideChartSettings
              />
            )}
          </Ui.Portal>
          <Ui.ArchiveMetricModal
            isOpen={archiveModal.show}
            onClose={() => setArchiveModal({ show: false, metricId: '' })}
            onArchive={() => handleArchiveExternalMetric(false)}
            isLoading={isArchivingMetric}
          />
        </>
      ) : (
        <>
          {!isMetricListLoading ? (
            <DashboardEmpty workspaceId={workspaceId} clientId={client} />
          ) : (
            <div className={styles['createMetric-message']}>
              <Ui.Loader />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(ExternalMetricList);
