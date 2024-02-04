/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { workspaceAtom } from 'atoms/application';
import { useAtom } from 'jotai';
import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  useGetGuestTokensQuery,
  useCreateGuestTokenMutation,
} from 'utils/generated/graphql';
import { useQueryClient } from 'react-query';
import segmentEvent from 'utils/segmentEvent';
import { consts } from '@databrainhq/plugin';
import { getCurrentUser } from 'helpers/application/auth';
import useDemoConfig from './useDemoConfig';

export type UseShareableLinkProps = {
  dashboardId: string;
  clientId: string;
  companyTenancyType?: string;
  clientName?: string;
  isAllClient?: boolean;
};

const useShareableLink = ({
  companyTenancyType = 'TABLE',
  clientId,
  dashboardId,
}: UseShareableLinkProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);
  const [demoLink, setDemoLink] = useState('');
  const companyId = getCurrentUser()?.companyId;
  const [workspace] = useAtom(workspaceAtom);
  const { data: guestTokensData } = useGetGuestTokensQuery(
    {
      clientId,
      companyId,
    },
    { enabled: Boolean(companyId && clientId) }
  );
  const { mutateAsync: createGuestToken } = useCreateGuestTokenMutation({
    onSuccess: (res) => {
      if (!res.insert_guestTokens_one) return;
      queryClient.setQueryData(
        ['GetGuestTokens', { companyId, clientId }],
        (prev: any) => {
          return {
            ...prev,
            guestTokens: [res.insert_guestTokens_one, ...prev.guestTokens],
          };
        }
      );
    },
  });
  const { demoConfig } = useDemoConfig();

  const token = useMemo(() => {
    const workspaceToken = guestTokensData?.guestTokens.find((guestToken) => {
      const params = JSON.parse(guestToken.params || '{}') || {};
      return params.workspace?.id === workspace?.id;
    });
    return workspaceToken;
  }, [guestTokensData, workspace]);

  const getDateString = (expire: number) => {
    const now = new Date();
    const expirationTimeMs = now.getTime() + expire;

    const expirationDate = new Date(expirationTimeMs);
    return expirationDate.toISOString();
  };

  // app build with VITE_IS_UAT env
  const isUatApp = import.meta.env.VITE_IS_UAT;
  const getPreviewLinkBaseUrl = () => {
    if (consts.IS_SELF_HOSTED)
      return `${window?.location?.protocol}//${window?.location?.host}/demo`;
    if (isUatApp) return 'https://demo-uat.usedatabrain.com';
    return 'https://demo.usedatabrain.com';
  };
  const generateDemoLink = useCallback(
    async (expiryTime: number) => {
      const expire = getDateString(expiryTime);
      setLoading(true);
      await createGuestToken(
        {
          companyId,
          clientId,
          params: JSON.stringify({
            companyTenancyType,
            workspace: {
              id: workspace?.id,
              name: workspace?.name,
            },
            dashboard: {
              id: dashboardId,
            },
          }),
          expire,
        },
        {
          onSuccess: (res) => {
            if (res.insert_guestTokens_one) {
              const link = new URL(
                `${getPreviewLinkBaseUrl()}/?token=${
                  res.insert_guestTokens_one.id
                }&dashboardId=${dashboardId}`
              );
              if (demoConfig) link.searchParams.set('configId', demoConfig.id);
              segmentEvent('share demo link generated', {
                dashboardId,
                link: link.toString(),
                workspaceId: workspace?.id,
                workspaceName: workspace?.name,
              });
              setDemoLink(link.toString());
            }
          },
        }
      );
      setLoading(false);
    },
    [token, companyTenancyType, clientId, workspace, demoConfig, dashboardId]
  );

  useEffect(() => {
    setDemoLink('');
  }, [clientId, workspace, dashboardId]);

  return { demoLink, isLoading, generateDemoLink };
};

export default useShareableLink;
