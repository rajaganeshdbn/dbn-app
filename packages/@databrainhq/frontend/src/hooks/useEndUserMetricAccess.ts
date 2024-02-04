import { useMemo } from 'react';
import { useEndUserMetricAccessQuery } from 'utils/generated/graphql';

const useEndUserMetricAccess = (companyId: string) => {
  const { data, isLoading } = useEndUserMetricAccessQuery(
    {
      companyId,
    },
    { enabled: !!companyId }
  );
  const isAllowMetricCreation = useMemo(
    () => data?.companySubsetTables[0]?.isAllowMetricCreation || false,
    [data?.companySubsetTables]
  );
  const isAllowMetricDeletion = useMemo(
    () => data?.companySubsetTables[0]?.isAllowMetricDeletion || false,
    [data?.companySubsetTables]
  );
  return { isAllowMetricCreation, isAllowMetricDeletion, isLoading };
};

export default useEndUserMetricAccess;
