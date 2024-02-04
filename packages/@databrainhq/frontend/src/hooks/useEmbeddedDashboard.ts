import {
  useEmbeddedDashboardMetricsQuery,
  useGetExternalDashboardIdQuery,
  useGuestTokenParamsQuery,
} from 'utils/generated/graphql';
import useEndUserMetricAccess from './useEndUserMetricAccess';

const useEmbeddedDashboard = (token: string) => {
  const { data: tokenParamsData, isLoading: isParamsLoading } =
    useGuestTokenParamsQuery({ id: token });
  const tokenParams = tokenParamsData?.guestTokens_by_pk;
  const params = tokenParams?.params ? JSON.parse(tokenParams.params) : {};
  const externalDashboardId = params.dashboard?.id;
  const companyId = tokenParams?.companyId;
  const clientId = tokenParams?.clientId;

  const mode = params?.dashboard?.isLive;
  const rlsSettings = params?.rlsSettings;
  const {
    data: externalDashboardMetricsData,
    isLoading: isExternalDashboardMetricsDataLoading,
  } = useEmbeddedDashboardMetricsQuery(
    {
      where: {
        externalDashboard: {
          externalDashboardId: { _eq: externalDashboardId },
        },
      },
    },
    { enabled: !!externalDashboardId }
  );
  const { data: idData, isLoading: isLoadingId } =
    useGetExternalDashboardIdQuery({ externalDashboardId });
  const externalDashboardMetrics =
    externalDashboardMetricsData?.externalDashboardMetrics;
  const { isAllowMetricCreation, isAllowMetricDeletion, isLoading } =
    useEndUserMetricAccess(companyId);
  return {
    isLoading:
      isParamsLoading ||
      isExternalDashboardMetricsDataLoading ||
      isLoadingId ||
      isLoading,
    data: {
      clientId,
      companyId,
      mode,
      externalDashboardMetrics,
      externalDashboard: idData?.externalDashboards[0],
      rlsSettings,
      isAllowMetricCreation,
      isAllowMetricDeletion,
    },
  };
};

export default useEmbeddedDashboard;
