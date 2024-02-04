/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import { useLocation } from 'react-router-dom';
import { BrandLogoCollapsed, BrandLogo } from 'components/BrandLogo/BrandLogo';
import DashboardForm from 'components/DashboardForm/DashboardForm';
import Account from 'components/Account/Account';
import ExternalDashboardForm from 'components/ExternalDashboardForm';
// import useDashboards from 'hooks/useDashboards';
import Workspaces from 'components/Workspaces';
import useExternalDashboards from 'hooks/useExternalDashboard';
import MainSidebarItem from './MainSidebarItem';
import style from './MainSidebar.module.css';
import ExternalDashboardMenu from './ExternalDashboardMenu';

type MainSidebarProps = {
  className?: string;
};

const MainSidebar: React.FC<MainSidebarProps> = ({ className }) => {
  // const [path, setPath] = useState('/integrations/connections');
  const [isCollapsed, setCollapsed] = useState(false);
  const match = useLocation();
  // const navigate = useNavigate();
  // const { dashboards } = useDashboards();
  const [isDashboardModal, setDashboardModal] = useState(false);
  const [isExternalDashboardModal, setisExternalDashboardModal] =
    useState(false);
  const { dashboards } = useExternalDashboards();
  // useEffect(() => {
  //   if (
  //     match.pathname === '/integrations/connections' ||
  //     match.pathname === '/integrations/sources' ||
  //     match.pathname === '/integrations/destinations'
  //   ) {
  //     setPath(match.pathname);
  //   }
  // }, [match.pathname, navigate, dashboards]);
  const externalDashboardList = dashboards;

  return (
    <>
      <aside
        className={`${style.sidebarContainer} ${className ?? ''} ${
          isCollapsed ? 'dbn-w-max' : 'dbn-w-64'
        }`}
      >
        <div className="dbn-flex dbn-items-center dbn-justify-center dbn-py-6">
          {isCollapsed ? (
            <BrandLogoCollapsed className="dbn-w-[28px] dbn-h-auto" />
          ) : (
            <BrandLogo className="dbn-w-[140px] dbn-h-auto" />
          )}
        </div>
        <Workspaces isCollapsed={isCollapsed} />
        <nav className="dbn-h-full dbn-flex dbn-flex-col dbn-justify-between dbn-overflow-hidden">
          <ul className="dbn-overflow-y-auto dbn-overflow-x-hiddden dbn-h-full dbn-px-1">
            {/* <MainSidebarItem
              to={`/${dashboards?.[0]?.id ?? ''}`}
              icon={<DashboardIcon size={60} />}
              isCollapsed={isCollapsed}
              hoverText="Dashboards"
              menu={<DashboardMenu />}
            >
              <span className="dbn-w-full">Dashboards</span>
              <Ui.Button
                variant="custom"
                type="button"
                className="dbn-rounded dbn-bg-white dbn-text-black"
                onClick={() => setDashboardModal(true)}
              >
                <AddIcon />
              </Ui.Button>
            </MainSidebarItem> */}
            <MainSidebarItem
              to={`/externalDashboard/${
                externalDashboardList?.length
                  ? externalDashboardList[0].id
                  : 'new'
              }`}
              icon={<Ui.Icons name="chart" size="lg" />}
              isCollapsed={isCollapsed}
              hoverText="Dashboards"
              menu={
                <ExternalDashboardMenu
                  externalDashboardList={externalDashboardList}
                  path={match.pathname}
                />
              }
            >
              <span className="dbn-w-full">Dashboards</span>
              <div className="dbn-bg-white dbn-w-3 dbn-h-3 dbn-rounded-sm dbn-flex dbn-justify-center dbn-items-center dbn-p-1.5 dbn-m-2">
                <Ui.Button
                  variant="tertiary"
                  type="button"
                  onClick={() => setisExternalDashboardModal(true)}
                >
                  <Ui.Icons name="not-found" />
                  {/* add icon */}
                </Ui.Button>
              </div>
            </MainSidebarItem>
            {/* <MainSidebarItem
              to={path}
              icon={
                <Ui.Icons
                  name="integration-icon"
                  className="dbn-w-6 dbn-h-6 dbn-text-inherit"
                />
              }
              isCollapsed={isCollapsed}
              hoverText="Integrations"
            >
              Integrations
            </MainSidebarItem> */}
            {/* <MainSidebarItem
              to="/dataModel"
              icon={
                <Ui.Icons
                  name="data-model-icon"
                  className="dbn-w-6 dbn-h-6 dbn-text-inherit"
                />
              }
              isCollapsed={isCollapsed}
              hoverText="Data Models"
            >
              Data Models
            </MainSidebarItem> */}
            <MainSidebarItem
              to="/metricStore"
              icon={<Ui.Icons name="not-found" size="lg" />}
              isCollapsed={isCollapsed}
              hoverText="Metric Store"
            >
              Metric Store
            </MainSidebarItem>
            {/* <MainSidebarItem
              to="/externalDataset/list"
              icon={<ExternalDatasetIcon size={28} />}
              isCollapsed={isCollapsed}
              hoverText="Dataset"
            >
              Dataset
            </MainSidebarItem> */}
          </ul>
          <ul className="dbn-px-1 dbn-border-t dbn-border-slate-500">
            <MainSidebarItem
              to="/dataSources"
              icon={
                <Ui.Icons name="not-found" size="lg" /> // setup-icon
              }
              isCollapsed={isCollapsed}
              hoverText="Data Sources"
            >
              Data Sources
            </MainSidebarItem>
            <MainSidebarItem
              to="/settings/general"
              icon={<Ui.Icons name="gear" size="lg" />}
              isCollapsed={isCollapsed}
              hoverText="Settings"
            >
              Settings
            </MainSidebarItem>
            <MainSidebarItem
              to="/archivedMetrics"
              icon={
                <Ui.Icons name="not-found" />
                // archive icon
              }
              isCollapsed={isCollapsed}
              hoverText="Archived Metrics"
            >
              Archived Metrics
            </MainSidebarItem>
          </ul>
          <Account isCollapsed={isCollapsed} />
        </nav>
        <div
          className={`${style.collapseButton} ${
            isCollapsed ? 'dbn-rotate-180' : ''
          }`}
        >
          <Ui.Button
            type="button"
            variant="primary"
            onClick={() => setCollapsed(!isCollapsed)}
            leftIcon={<Ui.Icons name="double-arrow-left" />}
          />
        </div>
      </aside>
      <Ui.Modal
        isOpen={isDashboardModal}
        onClose={() => setDashboardModal(false)}
        headerTitle="Create Dashboard"
      >
        <DashboardForm
          onSuccess={() => setDashboardModal(false)}
          onCancel={() => setDashboardModal(false)}
        />
      </Ui.Modal>
      <Ui.Modal
        isOpen={isExternalDashboardModal}
        onClose={() => setisExternalDashboardModal(false)}
        headerTitle="Create Dashboard"
      >
        <ExternalDashboardForm
          onSuccess={() => setisExternalDashboardModal(false)}
          onCancel={() => setisExternalDashboardModal(false)}
        />
      </Ui.Modal>
    </>
  );
};
export default MainSidebar;
