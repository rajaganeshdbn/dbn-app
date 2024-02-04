import React, { PropsWithChildren, useMemo } from 'react';
// import { useEmbeddedDashboard } from '@/hooks';
import { DashboardContext } from '@/hooks/useDashboardContext';
import useNewEmbeddedDashboard from '@/hooks/useNewEmbeddedDashboard';

type DashboardProviderProps = PropsWithChildren & {
  token: string;
  dashboardId?: string;
};

const DashboardProvider = ({
  token,
  dashboardId,
  children,
}: DashboardProviderProps) => {
  // const { data, isLoading } = useEmbeddedDashboard({
  //   token: token as string,
  //   dashboardId,
  // });
  const { data, isLoading, error } = useNewEmbeddedDashboard({
    token,
    dashboardId,
  });
  const contextValues = useMemo(
    () => ({ data, isLoading, token, error }),
    [data, isLoading, token, error]
  );

  return (
    <DashboardContext.Provider value={contextValues}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
