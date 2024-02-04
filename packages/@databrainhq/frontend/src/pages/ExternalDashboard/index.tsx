/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-children-prop */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Ui, hooks } from '@databrainhq/plugin';
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  ExternalDashboardMetrics,
  useExternalDashboardMetricsQuery,
  useGetOrganizationQuery,
  useCompanyIntegrationQuery,
} from 'utils/generated/graphql';
import { Layout } from 'react-grid-layout';
import segmentEvent from 'utils/segmentEvent';
import { useAtom } from 'jotai';
import { globalDashboardFiltersAtom } from 'atoms/application';
import { GlobalFilterType } from '@databrainhq/plugin/src/types';
import { FilterValueType } from '@root/types';
import { DATABASE, TABLE } from 'consts/application';
import ClientDropDown, { ClientType } from 'components/ClientDropDown';
import { getFilters } from 'components/ExternalDashboardForm';
import CreateGlobalFilter from 'components/CreateGlobalFilter/CreateGlobalFilter';
import AccessControl from 'components/AccessControl';
import useExternalDashboard from 'hooks/useExternalDashboard';
import useTenancyLevel from 'hooks/useTenancyLevel';
import useWorkspace from 'hooks/useWorkspace';
import useTheme from 'hooks/useTheme';
import useAccessControl from 'hooks/useAccessControl';
import ExternalMetricList, {
  ExternalMetricListProps,
} from './components/ExternalMetricList';
import SettingsButton from './components/SettingsButton';
import ShareDemoLink from './components/ShareDemoLink';
import styles from './externaldashboard.module.css';
import DashboardMenu from './components/DashboardMenu';

type EditLayoutType = {
  enabled: boolean;
  type: 'Client' | 'All';
  layout: Layout[];
  isShowModal: boolean;
};

const Externaldashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getIsCanAccess } = useAccessControl();
  const { workspace, workspaces, setWorkspace } = useWorkspace();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('wid');
  const { workspaceTheme: theme } = useTheme();
  const [globalFiltersAtom, setGlobalFilterAtom] = useAtom(
    globalDashboardFiltersAtom
  );
  const [client, setClient] = useState<ClientType>({ value: '', label: '' });
  const [markedClient, setMarkedClient] = useState('');
  const [isAllClient, setIsAllClient] = useState<boolean>(false);
  const [selectedFilterVal, setSelectedFilterVal] = useState<
    {
      name: string;
      value: FilterValueType;
    }[]
  >([]);
  const [isHorizontalFilter, setHorizontalFilter] = useState<{
    isOpen: boolean;
    isHorizontalFilter: boolean;
    isNone: boolean;
  }>({
    isOpen: false,
    isHorizontalFilter: false,
    isNone: false,
  });
  const [updateFilter, setUpdateFilter] = useState<{
    isUpdate: boolean;
    isDelete: boolean;
    name: string;
  }>({
    isUpdate: false,
    isDelete: false,
    name: '',
  });
  const [dropdownTheme, setDropdownTheme] = useState<{
    width: string;
    variant: 'static' | 'floating';
    radius: string;
  }>({
    width: '200px',
    variant: 'floating',
    radius: '6px',
  });
  const [globalFilters, setGlobalFilters] = useState<
    ExternalMetricListProps['globalFilters']
  >({
    tableName: '',
    filters: [],
  });
  const [editLayout, setEditLayout] = useState<EditLayoutType>({
    enabled: false,
    type: 'All',
    layout: [],
    isShowModal: false,
  });
  const [isHoveredFilter, setHoveredFilter] = useState<string>('');

  useEffect(() => {
    if (workspaces.length) {
      const selectedWorkspace = workspaces?.find((w) => w.id === workspaceId);
      if (workspaceId && selectedWorkspace) {
        setWorkspace(selectedWorkspace);
      }
      if (!selectedWorkspace) navigate('/');
    }
  }, [workspaceId, workspaces.length]);

  const {
    dashboards,
    isGettingDashboard,
    updateDashboard,
    isUpdatingDashboard,
  } = useExternalDashboard(workspaceId || undefined);

  const { companyTenancyType } = useTenancyLevel();
  const externalDashboard = dashboards?.find((dash) => dash.id === id);

  const { data: externalDashboardMetricsData, isLoading } =
    useExternalDashboardMetricsQuery(
      {
        externalDashboardId: id,
        clientId: client.value,
      },
      { enabled: !!id }
    );
  const { data: organizationData, isLoading: isLoadingTableSettigsConfigured } =
    useGetOrganizationQuery(
      {
        workspaceId: workspaceId ?? workspace?.id,
      },
      { enabled: !!workspace?.id }
    );

  const {
    data: companyIntergration,
    isLoading: isLoadingDatawarehouseConfigured,
  } = useCompanyIntegrationQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: !!workspace?.id }
  );

  const isDataLoading =
    isLoadingTableSettigsConfigured || isLoadingDatawarehouseConfigured;

  const isTableSettigsConfigured =
    Boolean(organizationData?.organizations.length) ||
    companyTenancyType === DATABASE;
  const isDatawarehouseConfigured = Boolean(
    companyIntergration?.companyIntegrations.length
  );

  const {
    isLayoutLocked,
    saveLayout,
    layout: clientLayout,
  } = hooks.useClientDashboardLayout({
    externalDashboardId: id as string,
    clientId: client.value,
  });

  const externalDashboardMetrics = useMemo(
    () => externalDashboardMetricsData?.externalDashboardMetrics,
    [externalDashboardMetricsData?.externalDashboardMetrics]
  );

  const handleEditLayout = useCallback(
    (fields: Partial<EditLayoutType>, isSetDefault?: boolean) => {
      if (isSetDefault)
        setEditLayout({
          enabled: false,
          layout: [],
          type: 'All',
          isShowModal: false,
        });
      else setEditLayout((prev) => ({ ...prev, ...fields }));
    },
    []
  );

  const handleSaveLayout = useCallback(async () => {
    if (editLayout.layout.length) {
      if (editLayout.type === 'All')
        await updateDashboard({
          id: externalDashboard?.id,
          set: {
            layout: editLayout.layout,
          },
        });
      else await saveLayout(editLayout.layout);
    }
    handleEditLayout({}, true);
  }, [
    editLayout.type,
    editLayout.layout,
    updateDashboard,
    saveLayout,
    externalDashboard?.id,
    handleEditLayout,
  ]);

  useEffect(() => {
    handleEditLayout({}, true);
  }, [id]);

  useEffect(() => {
    setMarkedClient(externalDashboard?.defaultClientId || '');
  }, [externalDashboard]);

  const filters = useMemo(
    () =>
      companyTenancyType === DATABASE
        ? externalDashboard?.filters?.map((filter: GlobalFilterType) => ({
            ...filter,
            tableName: `${client?.value}.${
              filter.tableName.split(/\.(?=[^.]*$)/)?.[1]
            }`,
            columns:
              filter?.columns?.map((f) => ({
                ...f,
                selectedTable: f?.selectedTable
                  ? `${client?.value}.${
                      f?.selectedTable?.split(/\.(?=[^.]*$)/)?.[1]
                    }`
                  : '',
                applyOnTables:
                  f?.applyOnTables?.map((t) => ({
                    ...t,
                    tableName: `${client?.value}.${
                      t?.tableName?.split(/\.(?=[^.]*$)/)?.[1]
                    }`,
                  })) || [],
              })) || [],
          })) || []
        : externalDashboard?.filters || [],
    [externalDashboard?.filters, companyTenancyType, client?.value]
  );

  useEffect(() => {
    if (theme?.dashboard?.selectBoxSize) {
      switch (theme?.dashboard.selectBoxSize) {
        case 'small':
          setDropdownTheme((prev) => ({
            ...prev,
            width: '130px',
          }));
          break;
        case 'medium':
          setDropdownTheme((prev) => ({
            ...prev,
            width: '180px',
          }));
          break;
        case 'large':
          setDropdownTheme((prev) => ({
            ...prev,
            width: '250px',
          }));
          break;
        default:
          setDropdownTheme((prev) => ({
            ...prev,
            width: '200px',
          }));
      }
    }
    if (theme?.dashboard?.selectBoxVariant) {
      setDropdownTheme((prev) => ({
        ...prev,
        variant: theme.dashboard.selectBoxVariant,
      }));
    }
    if (theme?.dashboard?.selectBoxBorderRadius) {
      setDropdownTheme((prev) => ({
        ...prev,
        radius: theme.dashboard.selectBoxBorderRadius,
      }));
    }
  }, [theme?.dashboard]);
  useEffect(() => {
    if (!filters?.length) {
      setGlobalFilters(undefined);
      setGlobalFilterAtom([]);
    } else {
      setGlobalFilterAtom(filters);
    }
  }, [filters]);
  const handleDelete = useCallback(
    async (column: string) => {
      await updateDashboard(
        {
          id,
          set: {
            filters: [
              {
                tableName: filters?.[0]?.tableName,
                columns: filters?.[0]?.columns?.filter(
                  (item: any) => item.label !== column
                ),
              },
            ],
          },
        },
        {
          onSuccess: () => {
            segmentEvent('dashboard filters updated', {
              dashboardId: id,
              dashboardName: externalDashboard?.name,
              workspaceName: workspace?.name,
              isFilterEnabled: true,
              filterList: getFilters(
                {
                  columns: [],
                  filters: [{ tableName: filters?.[0]?.tableName }],
                },
                filters?.[0]?.columns?.filter(
                  (item: any) => item.label !== column
                ),
                isHorizontalFilter.isHorizontalFilter
              ),
            });
          },
        }
      );
    },
    [
      externalDashboard?.name,
      filters,
      id,
      isHorizontalFilter.isHorizontalFilter,
      updateDashboard,
      workspace?.name,
    ]
  );
  useEffect(() => {
    if (selectedFilterVal?.length) {
      let navLink = `/externalDashboard/${id}/?wid=${workspaceId}`;
      selectedFilterVal.forEach((element) => {
        if (Array.isArray(element.value)) {
          if (element.value?.length) {
            let valString = `&${element.name}=`;
            element.value.forEach((ele, index) => {
              if (index === 0) {
                valString += ele;
              } else {
                valString += `;;${ele}`;
              }
            });
            navLink += valString;
          }
        } else if (typeof element.value === 'object' && element.value?.value) {
          navLink += `&${element.name}=`;
          navLink += `${element.value?.startDate};;${element.value?.endDate}`;
        } else if (typeof element.value !== 'object' && element.value) {
          navLink += `&${element.name}=`;
          navLink += element.value;
        }
      });
      navigate(navLink);
    }
  }, [selectedFilterVal]);
  const filterPairs = useMemo(() => {
    return Object.fromEntries(
      [...searchParams.entries()]
        .filter(([key]) => key !== 'wid')
        .map(([key, value]) => [
          key,
          value.includes(';;') ? value.split(';;') : value,
        ])
    );
  }, [searchParams]);

  return (
    <>
      <div className="dbn-w-full dbn-h-screen dbn-bg-white dbn-relative dbn-overflow-hidden">
        <section className={styles.header}>
          <div className={styles.headerContainer}>
            <section className={styles.headerContent}>
              {!editLayout.enabled ? (
                <>
                  <span
                    className={styles.headerIcon}
                    onClick={() => navigate(`/?wid=${workspace?.id}`)}
                  >
                    <Ui.Button
                      leftIcon={<Ui.Icons name="arrow-left" />}
                      variant="tertiary"
                    />
                  </span>
                  {dashboards?.length ? (
                    <DashboardMenu
                      dashboards={dashboards}
                      currentDashboard={externalDashboard}
                      clientId={client.value}
                    />
                  ) : null}
                  {companyTenancyType &&
                  !isAllClient &&
                  isDatawarehouseConfigured &&
                  isTableSettigsConfigured ? (
                    <ClientDropDown
                      client={client}
                      setClient={setClient}
                      defaultValue={externalDashboard?.defaultClientId || ''}
                      isDisabled={isDataLoading}
                      tenancyLevel={companyTenancyType}
                    >
                      <div className="dbn-p-2 dbn-border-t dbn-border-secondary dbn-flex dbn-flex-col dbn-gap-3">
                        <AccessControl
                          feature="dashboard"
                          permission="Set Default Client"
                        >
                          <div className="dbn-flex dbn-justify-between dbn-items-center">
                            <div
                              className={`dbn-w-full dbn-flex dbn-gap-1 dbn-items-center ${
                                externalDashboard?.defaultClientId ===
                                client.value
                                  ? 'dbn-font-bold'
                                  : ''
                              }`}
                            >
                              <Ui.Checkbox
                                onChange={({ target: { checked } }) =>
                                  updateDashboard({
                                    id: externalDashboard?.id,
                                    set: {
                                      defaultClientId: checked
                                        ? client.value
                                        : null,
                                    },
                                  })
                                }
                                isDisabled={isUpdatingDashboard}
                                checked={
                                  externalDashboard?.defaultClientId ===
                                  client.value
                                }
                              />
                              <Ui.Text variant="label">
                                Set Client As Default
                              </Ui.Text>
                            </div>
                            <Ui.InfoTooltip
                              position="right"
                              text="Set client as default means the client you often work
                          with in this dashboard."
                            />
                          </div>
                        </AccessControl>
                        {companyTenancyType === 'TABLE' && (
                          <div className="dbn-flex dbn-justify-between dbn-items-center">
                            <Ui.Switch
                              enabled={isAllClient}
                              onChange={() => setIsAllClient((prev) => !prev)}
                              placeholder="All Clients"
                            />
                            <Ui.InfoTooltip text="Toggle this to preview the view for all clients." />
                          </div>
                        )}
                      </div>
                    </ClientDropDown>
                  ) : null}
                  {isDatawarehouseConfigured &&
                    isTableSettigsConfigured &&
                    isAllClient &&
                    companyTenancyType === 'TABLE' && (
                      <Ui.Switch
                        enabled={isAllClient}
                        onChange={() => setIsAllClient((prev) => !prev)}
                        placeholder="All clients"
                      />
                    )}
                </>
              ) : null}
            </section>
            {editLayout.enabled && (
              <Ui.FloatingDropDown
                options={[
                  { label: client.label, value: 'Client' },
                  { label: 'All Clients', value: 'All' },
                ]}
                labelVariant="floating"
                label="Publish Layout For"
                selectedOption={{
                  value: editLayout.type,
                  label:
                    editLayout.type === 'All' ? 'All Clients' : client.label,
                }}
                onChange={({ value }) =>
                  handleEditLayout({ type: value as EditLayoutType['type'] })
                }
                menuWidth="200px"
                buttonWidth="200px"
              />
            )}
            <section className={styles.headerContent}>
              {editLayout.enabled ? (
                <>
                  <Ui.Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      segmentEvent('exited edit layout', {
                        dashboardId: externalDashboard?.id,
                        dashboardName: externalDashboard?.name,
                        workspaceName: workspace?.name,
                      });
                      handleEditLayout({}, true);
                    }}
                  >
                    Exit
                  </Ui.Button>
                  <Ui.Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      segmentEvent('layout saved', {
                        dashboardId: externalDashboard?.id,
                        dashboardName: externalDashboard?.name,
                        workspaceName: workspace?.name,
                      });
                      if (editLayout.type === 'Client') handleSaveLayout();
                      else handleEditLayout({ isShowModal: true });
                    }}
                    isDisabled={
                      !editLayout.layout.length || isUpdatingDashboard
                    }
                  >
                    Save Layout
                  </Ui.Button>
                </>
              ) : (
                <>
                  <SettingsButton
                    isEditingLayout={editLayout.enabled}
                    onChangeEditingLayout={(enabled) => {
                      segmentEvent('edit layout enabled', {
                        workspaceId: workspace?.id,
                        workspaceName: workspace?.name,
                        dashboardId: externalDashboard?.id,
                        dashboardName: externalDashboard?.name,
                      });
                      handleEditLayout({ enabled });
                    }}
                    isLayoutLocked={isLayoutLocked}
                    clientId={client.value}
                  />
                  <AccessControl feature="dashboard" permission="Share">
                    {externalDashboard && client.value ? (
                      <ShareDemoLink
                        dashboardId={externalDashboard.externalDashboardId}
                        clientId={client.value}
                        companyTenancyType={companyTenancyType}
                        clientName={client.label}
                        isAllClient={isAllClient}
                      />
                    ) : null}
                  </AccessControl>
                  <AccessControl feature="metric" permission="Create">
                    <NavLink
                      to={{
                        pathname: '/createMetric/',
                        search: `?wid=${workspace?.id}&dashboardId=${id}${
                          client.value ? `&client=${client.value}` : ''
                        }`,
                      }}
                    >
                      <Ui.Button
                        leftIcon={<Ui.Icons name="plus" color="light" />}
                        variant="primary"
                        children="Create Metric"
                      />
                    </NavLink>
                  </AccessControl>
                </>
              )}
            </section>
          </div>
        </section>
        <div
          className="dbn-p-5 dbn-flex dbn-h-[calc(100%-4rem)] dbn-flex-col dbn-gap-2.5 dbn-overflow-y-auto"
          id="dbn-dashboard"
        >
          {companyTenancyType !== DATABASE &&
            companyIntergration !== undefined && (
              <>
                {!isLoadingDatawarehouseConfigured &&
                !isDatawarehouseConfigured ? (
                  <div className={styles.alertContainer}>
                    <Ui.Alert
                      text="We're sorry, but it appears that there is not data available at this time. Please configure or update datawarehouse settings to continue using the application."
                      variant="error"
                    >
                      <AccessControl
                        feature="datasources"
                        permission="Edit Credentials"
                        fallback={
                          <Ui.InfoTooltip text="You don't have permission to configure it.">
                            <Ui.Button variant="tertiary" isDisabled>
                              Configure
                            </Ui.Button>
                          </Ui.InfoTooltip>
                        }
                      >
                        <NavLink to="/Configuration">
                          <Ui.Button variant="tertiary">Configure</Ui.Button>
                        </NavLink>
                      </AccessControl>
                    </Ui.Alert>
                  </div>
                ) : null}
              </>
            )}
          {externalDashboardMetrics?.length && !editLayout.enabled ? (
            <>
              <Ui.GlobalFilters
                filters={filters}
                setSelectedFilterVal={setSelectedFilterVal}
                workspaceId={workspaceId || ''}
                appliedFilterPairs={filterPairs}
                onApply={(values) => {
                  // segmentEvent('global filters updated', {
                  //   filters: values,
                  //   dashboardId: externalDashboard?.id,
                  //   dashboardName: externalDashboard?.name,
                  //   workspaceId: workspace?.id,
                  //   workspaceName: workspace?.name,
                  // });
                  setGlobalFilters(values);
                }}
                internal={{ isInternal: true, workspaceId: workspace?.id }}
                clientId={client.value}
                isAllClient={isAllClient}
                theme={dropdownTheme}
                tenancyLevel={companyTenancyType}
                addGlobalFilter={
                  <AccessControl feature="dashboardFilters" permission="Create">
                    <Ui.PopoverMenu
                      buttonContent={
                        <Ui.Button
                          variant="popover"
                          className="dbn-p-1.5 dbn-w-full dbn-border dbn-border-secondary dbn-rounded-md"
                          leftIcon={
                            <Ui.NewTooltip
                              text="Add a Dashboard Filter"
                              position="right"
                            >
                              <Ui.Icons name="plus" />
                            </Ui.NewTooltip>
                          }
                        />
                      }
                      menuWidth="120px"
                      position="bottom-start"
                    >
                      <Ui.Button
                        variant="popover"
                        className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                        onClick={() =>
                          setHorizontalFilter({
                            isOpen: true,
                            isHorizontalFilter: true,
                            isNone: false,
                          })
                        }
                      >
                        Select
                      </Ui.Button>
                      <Ui.Button
                        variant="popover"
                        className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                        onClick={() =>
                          setHorizontalFilter({
                            isOpen: true,
                            isHorizontalFilter: false,
                            isNone: false,
                          })
                        }
                      >
                        Switch Select
                      </Ui.Button>
                      <Ui.Button
                        variant="popover"
                        className="dbn-p-2 dbn-flex dbn-justify-start dbn-w-full hover:dbn-bg-gray"
                        onClick={() =>
                          setHorizontalFilter({
                            isOpen: true,
                            isHorizontalFilter: false,
                            isNone: true,
                          })
                        }
                      >
                        Other
                      </Ui.Button>
                    </Ui.PopoverMenu>
                  </AccessControl>
                }
                filterOptions={(column: string) => (
                  <>
                    {getIsCanAccess('dashboardFilters', 'Edit') ||
                    getIsCanAccess('dashboardFilters', 'Delete') ? (
                      <Ui.PopoverMenu
                        buttonContent={
                          <span
                            onMouseOver={() => setHoveredFilter(column)}
                            onMouseOut={() => setHoveredFilter('')}
                          >
                            <Ui.Icons
                              name="kebab-menu-vertical"
                              size="lg"
                              color={
                                isHoveredFilter === column
                                  ? 'primary'
                                  : 'secondary'
                              }
                            />
                          </span>
                        }
                        menuWidth="140px"
                        position="bottom-start"
                      >
                        <AccessControl
                          feature="dashboardFilters"
                          permission="Edit"
                        >
                          <Ui.Button
                            variant="popover"
                            leftIcon={<Ui.Icons name="pencil-simple" />}
                            className="dbn-w-full dbn-p-2 hover:dbn-bg-gray dbn-flex dbn-justify-start"
                            onClick={() =>
                              setUpdateFilter({
                                isDelete: false,
                                isUpdate: true,
                                name: column,
                              })
                            }
                          >
                            Edit
                          </Ui.Button>
                        </AccessControl>
                        <AccessControl
                          feature="dashboardFilters"
                          permission="Delete"
                        >
                          <Ui.Button
                            variant="popover"
                            leftIcon={<Ui.Icons name="delete" />}
                            className="dbn-w-full dbn-p-2 hover:dbn-bg-gray dbn-flex dbn-justify-start"
                            onClick={() => {
                              setUpdateFilter({
                                isDelete: true,
                                isUpdate: false,
                                name: column,
                              });
                              handleDelete(column);
                            }}
                          >
                            Delete
                          </Ui.Button>
                        </AccessControl>
                      </Ui.PopoverMenu>
                    ) : null}
                  </>
                )}
              />
            </>
          ) : null}
          <ExternalMetricList
            isAllClient={isAllClient}
            dropdownTheme={dropdownTheme}
            layout={{
              clientLayout,
              adminLayout: externalDashboard?.layout || [],
              isLocked: isLayoutLocked || !editLayout.enabled,
              onChange: (layout: Layout[]) => {
                handleEditLayout({ layout });
              },
            }}
            externalDashboardId={id || ''}
            userProvidedDashboardId={
              externalDashboard?.externalDashboardId || ''
            }
            client={client.value}
            externalDashboardMetrics={externalDashboardMetrics as any}
            isMetricListLoading={isLoading}
            globalFilters={globalFilters}
            workspaceId={workspace?.id}
            dashboardId={id}
          />
        </div>
      </div>
      <Ui.Modal
        isOpen={editLayout.isShowModal}
        onClose={() => handleEditLayout({ isShowModal: false })}
        headerTitle="Publish Layout"
      >
        <div className="dbn-w-[400px] dbn-h-[150px] dbn-flex dbn-justify-center dbn-items-center dbn-p-5">
          <Ui.Alert text="You are publishing the layout for all clients but it will not apply to the clients who have some layout saved specific to them." />
        </div>
        <Ui.ModalFooter>
          <Ui.Button
            type="button"
            variant="tab"
            onClick={() => handleEditLayout({ isShowModal: false })}
          >
            Cancel
          </Ui.Button>
          <Ui.Button
            type="button"
            variant="primary"
            onClick={handleSaveLayout}
            isDisabled={isUpdatingDashboard}
          >
            Publish
          </Ui.Button>
        </Ui.ModalFooter>
      </Ui.Modal>
      <Ui.Modal
        isOpen={isHorizontalFilter.isOpen || updateFilter.isUpdate}
        onClose={() => {
          setHorizontalFilter({
            isOpen: false,
            isHorizontalFilter: false,
            isNone: false,
          });
          setUpdateFilter({
            isUpdate: false,
            isDelete: false,
            name: '',
          });
        }}
        headerTitle="Dashboard Filters"
      >
        <CreateGlobalFilter
          props={{
            clientId: client?.value,
            onCancel: () =>
              setHorizontalFilter({
                isOpen: false,
                isHorizontalFilter: false,
                isNone: false,
              }),
            workspaceId: workspaceId || '',
            dashboard: externalDashboard,
            isHorizontalFilter: isHorizontalFilter.isHorizontalFilter,
            isNone: isHorizontalFilter.isNone,
            updateFilterName: updateFilter.isUpdate ? updateFilter.name : '',
            onSuccess: () => {
              setHorizontalFilter({
                isOpen: false,
                isHorizontalFilter: false,
                isNone: false,
              });
              setUpdateFilter({
                isUpdate: false,
                isDelete: false,
                name: '',
              });
            },
            isDatabaseTenancy: companyTenancyType !== TABLE,
          }}
        />
      </Ui.Modal>
    </>
  );
};

export default Externaldashboard;
