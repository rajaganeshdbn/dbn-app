import { useQuery } from 'react-query';
import {
  DASHBOARD_DATA_QUERY,
  DASHBOARD_EMBEDDED_METRIC_PATH,
  DASHBOARD_EMBEDDED_METRIC_QUERY,
  DASHBOARD_LAYOUT_PATH,
  DASHBOARD_LAYOUT_QUERY,
  DASHBOARD_PATH,
  DASHBOARD_SCHEDULED_REPORT_PATH,
  DASHBOARD_SCHEDULED_REPORT_QUERY,
  DASHBOARD_THEME_PATH,
  DASHBOARD_THEME_QUERY,
} from '../consts/api';
import fetcher from '../utils/fetcher';
import { UseDashboardDataQueryInputType } from '../types/queryTypes';

export const useDashboardDataQuery = ({
  token,
  dashboardId,
}: UseDashboardDataQueryInputType) =>
  useQuery(
    [DASHBOARD_DATA_QUERY, { dashboardId }],
    () => {
      const url = dashboardId
        ? `${DASHBOARD_PATH}?dashboardId=${dashboardId}`
        : DASHBOARD_PATH;
      return fetcher(url, {
        method: 'GET',
        token,
      });
    },
    { enabled: !!token }
  );

export const useDashboardLayoutQuery = (
  dashboardId: string,
  clientId: string
) =>
  useQuery(
    [DASHBOARD_LAYOUT_QUERY, { dashboardId, clientId }],
    () =>
      fetcher(
        `${DASHBOARD_LAYOUT_PATH}?id=${dashboardId}&clientId=${clientId}`,
        {
          method: 'GET',
        }
      ),
    { enabled: !!dashboardId && !!clientId }
  );

export const useDashboardScheduledReportQuery = (token: string) =>
  useQuery(
    DASHBOARD_SCHEDULED_REPORT_QUERY,
    () => fetcher(DASHBOARD_SCHEDULED_REPORT_PATH, { method: 'GET', token }),
    { enabled: !!token }
  );

export const useEmbeddedMetricQuery = (token: string, id: string) =>
  useQuery(
    [DASHBOARD_EMBEDDED_METRIC_QUERY, { id }],
    () =>
      fetcher(`${DASHBOARD_EMBEDDED_METRIC_PATH}?metricId=${id}`, {
        method: 'GET',
        token,
      }),
    { enabled: !!token }
  );

export const useGetTheme = ({
  token,
  name,
  companyId,
}: {
  token: string;
  name: string;
  companyId: string;
}) =>
  useQuery(
    [DASHBOARD_THEME_QUERY, { name }],
    () =>
      fetcher(DASHBOARD_THEME_PATH, {
        method: 'POST',
        token,
        data: {
          name,
          companyId,
        },
      }),
    { enabled: Boolean(name && token && companyId) }
  );
