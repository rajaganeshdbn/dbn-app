import { useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { useNavigate } from 'react-router-dom';
import { ExternalDashboardListQuery } from 'utils/generated/graphql';
import ExternalDashboardForm, {
  DashboardFormType,
} from 'components/ExternalDashboardForm';
import AccessControl from 'components/AccessControl';

type DashboardMenuProps = {
  dashboards: ExternalDashboardListQuery['externalDashboards'];
  currentDashboard?: ExternalDashboardListQuery['externalDashboards'][0];
  clientId: string;
};

const DashboardMenu = ({
  dashboards,
  currentDashboard,
  clientId,
}: DashboardMenuProps) => {
  const [dashboardModal, setDashboardModal] = useState<{
    show: boolean;
    type?: DashboardFormType;
  }>({
    show: false,
    type: DashboardFormType.create,
  });
  const navigate = useNavigate();
  return (
    <>
      <Ui.Menu
        items={dashboards.map((dash) => ({
          name: dash.name,
          isActive: dash.id === currentDashboard?.id,
          content: (
            <div className="dbn-w-full dbn-flex dbn-gap-1 dbn-justify-center dbn-items-center dbn-relative dbn-group">
              <div className="dbn-flex dbn-flex-col dbn-w-full dbn-justify-center dbn-text-sm">
                <span className="dbn-font-semibold">{dash.name}</span>
                <span className="dbn-text-gray-400">
                  ID: {dash.externalDashboardId}
                </span>
              </div>
              <AccessControl feature="dashboard" permission="Edit">
                <div className="dbn-absolute dbn-right-0 dbn-hidden group-hover:dbn-block">
                  <Ui.Button
                    variant="popover"
                    leftIcon={<Ui.Icons name="pencil-simple" />}
                    onClick={() =>
                      setDashboardModal({
                        show: true,
                        type: DashboardFormType.edit,
                      })
                    }
                  />
                </div>
              </AccessControl>
            </div>
          ),
          onClick: () =>
            navigate({
              pathname: `/externalDashboard/${dash.id}/`,
              search: `?wid=${dash.workspaceId}`,
            }),
        }))}
        menuWidth="258px"
        buttonContent={
          <>
            {currentDashboard?.name ? (
              <Ui.NewTooltip text={currentDashboard?.name || ''}>
                <div className="dbn-flex dbn-gap-1 dbn-items-center dbn-truncate dbn-border dbn-border-secondary dbn-rounded dbn-px-2 dbn-py-2.5 dbn-w-[258px]">
                  <span className="dbn-text-sm dbn-font-bold">Dashboard:</span>
                  <span className="dbn-font-semibold dbn-text-sm dbn-truncate">
                    {currentDashboard?.name || ''}
                  </span>
                  <span className="dbn-ml-auto">
                    <Ui.Icons name="caret-down-fill" size="xs" />
                  </span>
                </div>
              </Ui.NewTooltip>
            ) : (
              <div className="dbn-flex dbn-gap-1 dbn-items-center dbn-truncate dbn-border dbn-border-secondary dbn-rounded dbn-px-3 dbn-py-1.5 dbn-w-[258px]">
                <span className="dbn-text-sm dbn-font-bold">Dashboard:</span>
                <span className="dbn-font-semibold dbn-text-sm dbn-truncate">
                  {currentDashboard?.name || ''}
                </span>
                <span className="dbn-ml-auto">
                  <Ui.Icons name="chevron-down" size="xl" />
                </span>
              </div>
            )}
          </>
        }
      >
        <AccessControl feature="dashboard" permission="Create">
          <div className="dbn-p-3 dbn-border-t dbn-border-secondary/80">
            <Ui.Button
              fitContainer
              variant="primary"
              onClick={() => {
                setDashboardModal({
                  show: true,
                  type: DashboardFormType.create,
                });
              }}
            >
              Create New Dashboard
            </Ui.Button>
          </div>
        </AccessControl>
      </Ui.Menu>
      <Ui.Modal
        isOpen={dashboardModal.show}
        onClose={() => setDashboardModal({ show: false })}
        headerTitle={dashboardModal.type}
      >
        <ExternalDashboardForm
          type={dashboardModal.type}
          onSuccess={() => setDashboardModal({ show: false })}
          onCancel={() => setDashboardModal({ show: false })}
          DashboardId={currentDashboard?.id}
          WorkspaceId={currentDashboard?.workspaceId}
          clientId={clientId}
        />
      </Ui.Modal>
    </>
  );
};

export default DashboardMenu;
