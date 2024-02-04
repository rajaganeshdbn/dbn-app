import {
  useGetWhitelistedDomainsQuery,
  useSaveWhitelistedDomainsMutation,
} from 'utils/generated/graphql';
import { useQueryClient } from 'react-query';
import { useCallback, useMemo } from 'react';
import { DATABRAIN_DOMAINS } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

const useWhitelistedDomains = () => {
  const queryClient = useQueryClient();
  const companyId = getCurrentUser()?.companyId;

  const {
    data: whitelistedDomainsData,
    isLoading: isFetchingWhitelistedDomains,
  } = useGetWhitelistedDomainsQuery(
    {
      companyId,
    },
    { enabled: !!companyId }
  );
  const {
    mutateAsync: saveWhitelistedDomainsMutation,
    isLoading: isSavingWhitelistedDomains,
  } = useSaveWhitelistedDomainsMutation();

  const whitelistedDomains = useMemo(() => {
    const domains = (whitelistedDomainsData?.whitelistedDomains_by_pk
      ?.domains || []) as string[];
    return domains.filter((domain) => !DATABRAIN_DOMAINS.includes(domain));
  }, [whitelistedDomainsData?.whitelistedDomains_by_pk]);

  const saveWhitelistedDomains = useCallback(
    async (domains: string[]) => {
      await saveWhitelistedDomainsMutation(
        {
          companyId,
          domains,
        },
        {
          onSuccess: (res) => {
            if (!res.insert_whitelistedDomains_one) return;
            queryClient.setQueryData(
              ['GetWhitelistedDomains', { companyId }],
              (prev: any) => {
                return {
                  ...prev,
                  whitelistedDomains_by_pk: res.insert_whitelistedDomains_one,
                };
              }
            );
          },
        }
      );
    },
    [companyId, saveWhitelistedDomainsMutation, queryClient]
  );

  return {
    whitelistedDomains,
    saveWhitelistedDomains,
    isLoadingWhitelistedDomains:
      isFetchingWhitelistedDomains || isSavingWhitelistedDomains,
  };
};

export default useWhitelistedDomains;
