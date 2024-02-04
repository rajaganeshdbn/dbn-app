import { useEffect, useMemo, useState } from 'react';
import { useEmbeddedMetricQuery } from '../queries/externalDashboard.query';

export interface UseEmbeddedMetricProps {
  token: string;
  metricId: string;
}

export const useEmbeddedMetric = ({
  token,
  metricId,
}: UseEmbeddedMetricProps) => {
  const [isLoading, setLoading] = useState(true);
  const { data: embeddedData, isLoading: isLoadingMetricData } =
    useEmbeddedMetricQuery(token, metricId);
  const {
    externalMetric,
    sharingSettingsId,
    adminTheme,
    params,
    companyId,
    clientId,
    errorMsg,
  } = useMemo(() => {
    const data = embeddedData as any;
    return {
      externalMetric: data?.externalMetric as any | undefined,
      adminTheme: data?.adminTheme as any | undefined,
      sharingSettingsId: data?.sharingSettingsId as string,
      errorMsg: data?.error?.message,
      params: data?.params as string,
      companyId: data?.companyId as string,
      clientId: data?.clientId as string,
    };
  }, [embeddedData]);

  const { rlsSettings, tenancyLevel } = useMemo(() => {
    if (!params) return { rlsSettings: undefined, tenancyLevel: 'TABLE' };
    const parsedParams = JSON.parse(params);
    return {
      rlsSettings: parsedParams.rlsSettings?.find(
        (obj: { metricId: string }) => obj.metricId === metricId
      ) as
        | {
            metricId: string;
            values: Record<string, any>;
          }
        | undefined,
      tenancyLevel: parsedParams.companyTenancyType || 'TABLE',
    };
  }, [params, metricId]);

  useEffect(() => {
    if (isLoadingMetricData) setLoading(true);
    if (externalMetric || errorMsg) setLoading(false);
  }, [isLoadingMetricData, externalMetric, errorMsg]);

  return {
    externalMetric,
    sharingSettingsId,
    companyId,
    clientId,
    rlsSettings,
    tenancyLevel,
    isLoading,
    errorMsg,
    adminTheme,
  };
};
