import React from 'react';
import { NavLink } from 'react-router-dom';
import useDashboards from 'hooks/useDashboards';

const DashboardMenu = () => {
  const { dashboards } = useDashboards();
  if (!dashboards || !dashboards.length) return null;
  return (
    <div className="dbn-flex dbn-flex-col dbn-ml-8 dbn-my-3 dbn-gap-2">
      {dashboards
        .filter((dashboard) => dashboard.name !== 'Main')
        .map((dashboard) => (
          <NavLink
            end
            key={dashboard.id}
            to={`/${dashboard.id}`}
            className={({ isActive }) =>
              `dbn-text-xs dbn-tracking-wider dbn-hover:text-white ${
                isActive
                  ? 'dbn-font-semibold'
                  : 'dbn-font-normal dbn-text-slate-200'
              }`
            }
          >
            {dashboard.name}
          </NavLink>
        ))}
    </div>
  );
};

export default React.memo(DashboardMenu);
