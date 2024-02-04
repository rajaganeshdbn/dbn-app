import { useMemo } from 'react';
import { useExternalDatasetListQuery } from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';
import useWorkspace from './useWorkspace';

const useExternalDatasetList = () => {
  const user = getCurrentUser();
  const { workspace } = useWorkspace();
  const { data, isLoading } = useExternalDatasetListQuery(
    {
      companyId: user?.companyId,
      workspaceId: workspace?.id,
    },
    { enabled: !!user?.companyId && !!workspace?.id }
  );
  const externalDatasetList = useMemo(
    () => data?.externalDatasets || [],
    [data?.externalDatasets]
  );
  return { externalDatasetList, isLoading };
};

export default useExternalDatasetList;
