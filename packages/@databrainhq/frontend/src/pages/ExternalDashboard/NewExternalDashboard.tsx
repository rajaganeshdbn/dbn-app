/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { useNavigate } from 'react-router-dom';
import ExternalDashboardForm from 'components/ExternalDashboardForm';
import EmptyDashboard from 'components/Svg/Empty Dashboards.svg';
import Loader from 'components/Loader';
import useExternalDashboards from 'hooks/useExternalDashboard';
import style from './externaldashboard.module.css';
import useAccessControl from 'hooks/useAccessControl';

const NewExternalDashboard = () => {
  const [isDashboardModal, setDashboardModal] = useState(false);
  const { dashboards, isGettingDashboard } = useExternalDashboards();
  const { getIsCanAccess, isLoading } = useAccessControl();
  const navigate = useNavigate();

  useEffect(() => {
    if (dashboards?.length)
      navigate(
        `/externalDashboard/${dashboards.length ? dashboards[0].id : 'new'}`
      );
  }, [dashboards]);

  useEffect(() => {
    if (isLoading) return;
    if (!getIsCanAccess('dashboard', 'Create')) navigate('/');
  }, [isLoading]);

  return (
    <>
      {isGettingDashboard || isLoading ? <Loader /> : null}

      {!isGettingDashboard && !dashboards?.length ? (
        <div className="dbn-w-full dbn-h-screen dbn-bg-white dbn-overflow-hidden">
          <div className={style['externaldashboard-header']}>
            <span className="dbn-text-[#182C60] dbn-text-lg dbn-font-semibold">
              New External Dashboard
            </span>
          </div>
          <div
            className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-items-center dbn-overflow-y-auto"
            id="dbn-dashboard"
          >
            <img src={EmptyDashboard} alt="" width="600px" height="600px" />
            <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-5 dbn-justify-center dbn-items-center -dbn-mt-[170px]">
              <Ui.Text variant="heading">
                Create a new dashboard to start managing your charts.
              </Ui.Text>
              <Ui.Button
                variant="primary"
                type="button"
                onClick={() => setDashboardModal(true)}
              >
                Create New Dashboard
              </Ui.Button>
            </div>
          </div>
        </div>
      ) : null}
      <Ui.Modal
        isOpen={isDashboardModal}
        onClose={() => setDashboardModal(false)}
        headerTitle="Create External Dashboard"
      >
        <ExternalDashboardForm
          onSuccess={() => setDashboardModal(false)}
          onCancel={() => setDashboardModal(false)}
        />
      </Ui.Modal>
    </>
  );
};

export default React.memo(NewExternalDashboard);
