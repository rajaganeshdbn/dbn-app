import React from 'react';
import { NavLink } from 'react-router-dom';
import segmentEvent from 'utils/segmentEvent';

type Props = {
  externalDashboardList:
    | {
        __typename?: 'externalDashboards' | undefined;
        externalDashboardId: string;
        name: string;
        id: any;
      }[]
    | undefined;
  path: string;
};
const ExternalDashboardMenu = ({ externalDashboardList, path }: Props) => {
  if (!externalDashboardList?.length) return null;

  return (
    <div className="dbn-flex dbn-flex-col dbn-ml-8 dbn-my-3 dbn-gap-2">
      {externalDashboardList.map((dashboard) => (
        <>
          {dashboard.name && (
            <NavLink
              end
              key={dashboard.id}
              to={`/externalDashboard/${dashboard.id}`}
              className={({ isActive }) =>
                `dbn-text-xs dbn-tracking-wider hover:dbn-text-white ${
                  isActive || path === `/externalDashboard/${dashboard.id}/`
                    ? 'dbn-font-semibold'
                    : 'dbn-font-normal dbn-text-slate-200'
                }`
              }
              onClick={() =>
                segmentEvent(`dashboard selected: ${dashboard.name}`, {
                  id: dashboard.id,
                  name: dashboard.name,
                })
              }
            >
              {dashboard.name}
            </NavLink>
          )}
        </>
      ))}
    </div>
  );
};

export default React.memo(ExternalDashboardMenu);
