import React from 'react';
import { Dashboard } from '@databrainhq/plugin';
import { useSearchParams } from 'react-router-dom';

const EmbedDashboard = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dashboardId = searchParams.get('dashboardId');

  return (
    <Dashboard token={token as string} dashboardId={dashboardId as string} />
  );
};

export default React.memo(EmbedDashboard);
