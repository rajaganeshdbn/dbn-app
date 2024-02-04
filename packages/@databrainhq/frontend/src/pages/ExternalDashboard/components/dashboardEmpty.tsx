/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui } from '@databrainhq/plugin';
import React from 'react';
import { NavLink } from 'react-router-dom';
import dashboardSvg from './dashboard.svg';

const DashboardEmpty = ({
  workspaceId,
  clientId,
}: {
  workspaceId?: string;
  clientId?: string;
}) => {
  return (
    <section className="dbn-w-full dbn-grow dbn-grid dbn-place-content-center dbn-bg-white dbn-relative dbn-overflow-hidden">
      <div className="dbn-bg-white dbn-z-10 dbn-border dbn-border-secondary dbn-shadow-md dbn-w-[400px] dbn-p-7 dbn-flex dbn-flex-col dbn-justify-center dbn-items-center dbn-rounded">
        <img className="dbn-mb-9" src={dashboardSvg} alt="dashboard SVG" />
        <div className="dbn-mb-4 dbn-flex dbn-flex-col dbn-items-center dbn-gap-1">
          <Ui.Text
            variant="heading"
            children="Add an element to your dashboard"
          />
          <Ui.Text
            variant="body-text-sm"
            children="Create your first metric by tapping the button below"
          />
        </div>
        <NavLink
          to={{
            pathname: '/createMetric/',
            search: `?wid=${workspaceId}${
              clientId ? `&client=${clientId}` : ''
            }`,
          }}
        >
          <Ui.Button variant="primary" children="Create Metric" />
        </NavLink>
      </div>
      <div className="dbn-absolute dbn-w-[97%] dbn-h-full dbn-mt-4 dbn-left-2/4 dbn--translate-x-1/2 dbn-flex dbn-flex-wrap dbn-gap-3 dbn-bg-white">
        {Array.from({ length: 500 }).map((_) => {
          return (
            <div className="dbn-w-10 dbn-h-10 dbn-rounded dbn-bg-secondary/20 dbn-grow" />
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(DashboardEmpty);
