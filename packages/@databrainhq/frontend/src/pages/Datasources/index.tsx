/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-children-prop */
import { Ui } from '@databrainhq/plugin';
import { NavLink } from 'react-router-dom';
import { useConnectedCompanyIntegrationListQuery } from 'utils/generated/graphql';
import { encryption } from 'utils/encryption';
import { useMemo } from 'react';
import { WorkspaceType } from 'types';
import AccessControl from 'components/AccessControl';
import useWorkspace from 'hooks/useWorkspace';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';
import { setCurrentWorkspace } from 'helpers/application/workspace';
import styles from './datasources.module.css';

const Datasources: React.FC = () => {
  const user = getCurrentUser();
  const { setWorkspace, workspaces } = useWorkspace();
  const { getIsCanAccess } = useAccessControl();

  const { data: intergrationData, isLoading } =
    useConnectedCompanyIntegrationListQuery(
      {
        companyId: user?.companyId,
      },
      { enabled: !!user?.companyId }
    );

  const connectedIntegrations = useMemo(
    () =>
      intergrationData?.companyIntegrations.map((integration) => {
        const decryptedIntegration = encryption({
          type: 'decrypt',
          value: integration as Record<string, any>,
        }) as Record<string, any>;

        return integration?.isEncrypted
          ? {
              ...decryptedIntegration,
              id: integration?.id,
              workspaceId: integration?.workspaceId,
              integrationId: integration?.integrationId,
              companyId: integration?.companyId,
              createdAt: integration?.createdAt,
              updatedAt: integration?.updatedAt,
              name: decryptedIntegration.name,
              isAuthenticated: decryptedIntegration.isAuthenticated,
              dbName: integration.dbName,
            }
          : integration;
      }),
    [intergrationData?.companyIntegrations]
  );

  const headers = useMemo(() => {
    const isCanEditCredentials = getIsCanAccess(
      'datasources',
      'Edit Credentials'
    );
    const isCanEditTenancy = getIsCanAccess(
      'datasources',
      'Edit Tenancy Level'
    );
    const isCanEnableDisable = getIsCanAccess('datasources', 'Enable/Disable');
    return [
      {
        name: 'NAME',
        columnKey: 'name',
        columnCell: getIsCanAccess('datasources', 'Edit Credentials')
          ? (row: any) => (
              <NavLink
                to={`/integration/${row.integrationId}?id=${row.id}`}
                className="hover:dbn-underline"
                state={{ datasource: row }}
                onClick={() => {
                  setWorkspace(
                    workspaces.find((w) => w.id === row.workspaceId)
                  );
                  setCurrentWorkspace(
                    workspaces.find(
                      (w) => w.id === row.workspaceId
                    ) as WorkspaceType
                  );
                }}
              >
                {row?.name}
              </NavLink>
            )
          : undefined,
      },
      {
        name: 'CREATED',
        columnKey: 'createdAt',
        columnCell: (row: any) =>
          new Date(row?.createdAt).toDateString().slice(4),
      },
      {
        name: 'STATUS',
        columnKey: 'isAuthenticated',
        columnCell: (row: any) =>
          row?.isAuthenticated ? (
            <Ui.Text variant="body-text-sm" color="success">
              Active
            </Ui.Text>
          ) : (
            <Ui.Text variant="body-text-sm" color="alert">
              Failed
            </Ui.Text>
          ),
      },
      {
        name: 'LAST UPDATED',
        columnKey: 'updatedAt',
        columnCell: (row: any) =>
          new Date(row?.updatedAt).toDateString().slice(4),
      },
      {
        name: '',
        columnKey: 'menu',
        columnCell:
          isCanEditCredentials || isCanEditTenancy || isCanEnableDisable
            ? (row: any) => (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => {
                    setWorkspace(
                      workspaces.find((w) => w.id === row.workspaceId)
                    );
                    setCurrentWorkspace(
                      workspaces.find(
                        (w) => w.id === row.workspaceId
                      ) as WorkspaceType
                    );
                  }}
                  className="dbn-w-full dbn-flex dbn-justify-end"
                >
                  <Ui.PopoverMenu
                    buttonContent={
                      <Ui.Icons size="sm" name="kebab-menu-vertical" />
                    }
                    position="right-start"
                    offset={[0, 2]}
                    menuWidth="140px"
                  >
                    <div className={styles.popoverButtons}>
                      <AccessControl
                        feature="datasources"
                        permission="Edit Credentials"
                      >
                        <NavLink
                          to={`/integration/${row.integrationId}?id=${row.id}`}
                          state={{ datasource: row }}
                          onClick={() => {
                            setWorkspace(
                              workspaces.find((w) => w.id === row.workspaceId)
                            );
                            setCurrentWorkspace(
                              workspaces.find(
                                (w) => w.id === row.workspaceId
                              ) as WorkspaceType
                            );
                          }}
                        >
                          <Ui.Button variant="popover">
                            Edit Credentials
                          </Ui.Button>
                        </NavLink>
                      </AccessControl>
                      <AccessControl
                        feature="datasources"
                        permission="Edit Tenancy Level"
                      >
                        <NavLink to="/datasourceTableSettings">
                          <Ui.Button variant="popover">Edit Tenancy</Ui.Button>
                        </NavLink>
                      </AccessControl>
                      <AccessControl
                        feature="datasources"
                        permission="Enable/Disable"
                      >
                        <Ui.Button variant="popover">Disable</Ui.Button>
                      </AccessControl>
                    </div>
                  </Ui.PopoverMenu>
                </div>
              )
            : undefined,
      },
    ];
  }, [setWorkspace, workspaces, getIsCanAccess]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Datasources</div>
          <NavLink to="/configuration">
            <div className={styles.createBtn}>
              <Ui.Icons size="sm" name="plus" />

              <Ui.Text variant="btn">Add New Datasource</Ui.Text>
            </div>
          </NavLink>
        </div>
        <div className={styles.content}>
          <Ui.List
            variant="secondary"
            headers={headers}
            data={connectedIntegrations ?? []}
            isDataLoading={isLoading}
            showLogo
          />
        </div>
      </div>
    </div>
  );
};

export default Datasources;
