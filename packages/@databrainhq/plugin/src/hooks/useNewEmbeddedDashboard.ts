import { useEffect, useMemo, useState } from 'react';
import { useDashboardDataQuery } from '@/queries/externalDashboard.query';
import { UseDashboardDataQueryOutputType } from '@/types/queryTypes';

const useNewEmbeddedDashboard = ({
  token,
  dashboardId,
}: {
  token: string;
  dashboardId?: string;
}) => {
  const [isLoading, setLoading] = useState(false);

  const {
    data: embeddedData,
    isLoading: isFetching,
    isError,
  } = useDashboardDataQuery({
    token,
    dashboardId,
  });

  const {
    externalDashboard,
    externalDashboardMetrics,
    adminTheme,
    workspace,
    companyId,
    clientId,
    isAllowedToChangeLayout,
    isAllowedToCreateMetrics,
    isAllowedToDeleteMetrics,
    isAllowedToUpdateMetrics,
    isAllowedToEmailReports,
    sharingSettingsId,
    rlsSettings,
    appFilters,
    companyTenancyType,
    error,
    clientSubsetData,
  } = useMemo(() => {
    const data = embeddedData as UseDashboardDataQueryOutputType;
    return {
      externalDashboardMetrics: (data?.externalMetrics || []) as any,
      externalDashboard: data?.externalDashboard as any,
      adminTheme: data?.adminTheme as any,
      sharingSettingsId: data?.sharingSettingsId || '',
      companyTenancyType: data?.companyTenancyType || 'TABLE',
      companyId: data?.companyId || '',
      clientId: data?.clientId || '',
      isAllowedToCreateMetrics: data?.isAllowedToCreateMetrics || false,
      isAllowedToUpdateMetrics: data?.isAllowedToUpdateMetrics || false,
      isAllowedToDeleteMetrics: data?.isAllowedToDeleteMetrics || false,
      isAllowedToChangeLayout: data?.isAllowedToChangeLayout || false,
      isAllowedToEmailReports: data?.isAllowedToEmailReports || false,
      workspace: data?.workspace,
      rlsSettings: data?.rlsSettings,
      error: data?.error?.message,
      appFilters: data?.appFilters,
      clientSubsetData: data?.clientSubsetData,
    };
  }, [embeddedData]);

  useEffect(() => {
    if (isFetching) setLoading(true);
    if (
      !isFetching &&
      (isError || externalDashboardMetrics.length || externalDashboard || error)
    )
      setLoading(false);
  }, [isError, externalDashboardMetrics, isFetching, externalDashboard, error]);

  return {
    isLoading: isFetching || isLoading,
    error,
    data: {
      token,
      externalDashboard,
      externalDashboardMetrics,
      isAllowedToChangeLayout,
      isAllowedToCreateMetrics,
      isAllowedToDeleteMetrics,
      isAllowedToUpdateMetrics,
      isAllowedToEmailReports,
      companyId,
      clientId,
      workspace,
      rlsSettings,
      appFilters,
      sharingSettingsId,
      adminTheme,
      companyTenancyType,
      clientSubsetData,
    },
  };
};

export default useNewEmbeddedDashboard;
