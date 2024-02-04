/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-children-prop */
import { Ui } from '@databrainhq/plugin';
import React, { useEffect, useMemo, useState } from 'react';
import {
  useConnectedCompanyIntegrationListQuery,
  useExternalDashboardListQuery,
  useGetOnboardingStatusQuery,
  useUsersIdQuery,
} from 'utils/generated/graphql';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { encryption } from 'utils/encryption';
import ExternalDashboardForm, {
  DashboardFormType,
} from 'components/ExternalDashboardForm';
import Loader from 'components/Loader';
import AccessControl from 'components/AccessControl';
import NoDataFound from 'components/MetricComponents/OutputTab/components/NoDataFound';
import Pagination from 'components/Pagination';
import useWorkspace from 'hooks/useWorkspace';
import useAccessControl from 'hooks/useAccessControl';
import useAuth from 'hooks/useAuth';
import useNewMetricStore from 'hooks/useNewMetricStore';
import formatTimeDifference from 'helpers/application/formatTimeDifference';
import { getCurrentUser } from 'helpers/application/auth';
import { setCurrentWorkspace } from 'helpers/application/workspace';
import styles from './homepage.module.css';
import WorkspaceSettingsPanel from './WorkspaceSettingsPanel';

const Homepage: React.FC = () => {
  const [isExternalDashboardModal, setisExternalDashboardModal] =
    useState(false);
  const [isWorkspaceModal, setisWorkspaceModal] = useState(false);
  const [isShowAllWorkspaces, setIsShowAllWorkspaces] = useState(true);
  const [, setParams] = useSearchParams(undefined);
  const [activeTab, setActiveTab] = useState('Dashboards');

  const {
    workspaces,
    setSetingShow,
    setSelectedSetting,
    setSelectedSpace,
    setWorkspace,
    isLoadingWorkspaces,
    workspace,
    isSettingShow,
    selectedSetting,
    register,
    errors,
    onSubmit,
    isDisableButton,
    isSaving,
    error,
  } = useWorkspace();
  const { unpublishedMetrics, isLoading: isMetricsLodaing } =
    useNewMetricStore();
  const unpublishedMetricsList = unpublishedMetrics
    ?.filter(
      (item) => item.dataSourceId === workspace?.companyIntegrations?.[0]?.id
    )
    ?.map((item) => ({
      metric: {
        id: item.id,
        metricId: item.metricId,
        name: item.name,
        updatedAt: item.updated,
        clientId: item.clientId,
      },
      workspaceId: workspace?.id,
      dashboardId: '',
      dashboard: '',
      isPublished: false,
    }));
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('wid');
  const { isSkippingWithDemo, onboardWithDemoDb } = useAuth();
  const { getIsCanAccess } = useAccessControl();
  const [isLoadingQueries, setLoadingQueries] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(30);
  const [hoveredWorkspace, setHoveredWorkspace] = useState<string>('');
  const navigate = useNavigate();

  const { data: onboardingData } = useGetOnboardingStatusQuery(
    {
      companyId: getCurrentUser()?.companyId,
    },
    {
      enabled: !!getCurrentUser()?.companyId,
    }
  );
  const { data: dashboardData, isLoading: isGettingDashboard } =
    useExternalDashboardListQuery(
      {
        workspaceId: workspace?.id,
      },
      { enabled: !!workspace?.id }
    );
  const user = getCurrentUser();
  const { data: intergrationData, isLoading } =
    useConnectedCompanyIntegrationListQuery(
      {
        companyId: user?.companyId,
      },
      { enabled: !!user?.companyId }
    );
  const { data: userData, isLoading: isUserLoading } = useUsersIdQuery(
    {
      id: user?.companyId,
    },
    { enabled: !!user?.companyId }
  );

  const metricList = useMemo(
    () => [
      ...(dashboardData?.externalDashboards?.flatMap((item) =>
        (item.externalDashboardMetrics ?? []).map((metric) => ({
          metric: metric.externalMetric,
          workspaceId: item.workspaceId,
          dashboardId: item.id,
          dashboard: item.name,
          isPublished: true,
        }))
      ) ?? []),
      ...(unpublishedMetricsList || []),
    ],
    [dashboardData, unpublishedMetricsList]
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
  const totalDashboards = useMemo(
    () =>
      dashboardData?.externalDashboards
        .sort((a, b) => a?.name?.localeCompare(b?.name))
        ?.filter((item) => item?.name?.toLowerCase().includes(searchKeyword))
        .length || 0,
    [dashboardData?.externalDashboards, searchKeyword]
  );
  const totalMetrics = useMemo(
    () =>
      metricList?.filter((item) =>
        item?.metric?.name.toLowerCase().includes(searchKeyword)
      ).length || 0,
    [metricList, searchKeyword]
  );

  const handlePageChange = (newPage: any, newRecordsPerPage: any) => {
    setCurrentPage(newPage);
    if (newRecordsPerPage) {
      setRecordsPerPage(newRecordsPerPage);
    }
  };
  const startRecord = useMemo(
    () => (currentPage - 1) * recordsPerPage,
    [currentPage, recordsPerPage]
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  useEffect(() => {
    if (workspaces?.length && !workspace && !workspaceId) {
      setWorkspace(workspaces?.[0]);
      setCurrentWorkspace(workspaces?.[0]);
      navigate(`/?wid=${workspaces?.[0]?.id}`);
    }
    if (onboardingData?.companies_by_pk && workspaces?.[0]?.id) {
      setLoadingQueries(false);
    }
    if (
      onboardingData?.companies_by_pk &&
      !onboardingData?.companies_by_pk?.isOnboarded &&
      !isSkippingWithDemo
    ) {
      onboardWithDemoDb(workspaces?.[0]?.id);
    }
  }, [
    onboardingData?.companies_by_pk?.isOnboarded,
    workspaces?.[0],
    isSkippingWithDemo,
    workspace,
  ]);
  useEffect(() => {
    if (workspaceId && workspaces?.length && workspace?.id !== workspaceId) {
      setWorkspace(
        workspaces.find((item) => item?.id === workspaceId) || workspaces?.[0]
      );
    }
  }, [workspaceId, workspaces, workspace]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.sidebar}>
        <div className="dbn-w-full dbn-max-h-[85%] dbn-flex dbn-flex-col dbn-gap-2">
          <div
            className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center dbn-font-semibold dbn-cursor-pointer dbn-text-base"
            onClick={() => setIsShowAllWorkspaces(!isShowAllWorkspaces)}
          >
            Workspaces
            <span className={isShowAllWorkspaces ? '' : '-dbn-rotate-90'}>
              <Ui.Icons name="chevron-down" />
            </span>
          </div>
          {isLoadingWorkspaces && !isSkippingWithDemo ? (
            <Ui.SkeletonLoader variant="list" />
          ) : null}
          {isShowAllWorkspaces && !isLoadingWorkspaces ? (
            <ul className="dbn-flex dbn-flex-col dbn-h-full dbn-overflow-y-auto">
              {workspaces?.map((item) => (
                <li
                  className={`${styles.listItem} ${
                    workspace?.id === item.id ? 'dbn-bg-gray' : ''
                  } ${hoveredWorkspace === item.id ? 'dbn-bg-gray' : ''}`}
                  onClick={() => {
                    navigate(`/?wid=${item?.id}`);
                    setWorkspace(item);
                    setActiveTab('Dashboards');
                  }}
                  onMouseOver={() => setHoveredWorkspace(item.id)}
                  onMouseOut={() => setHoveredWorkspace('')}
                  title={item.name}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <AccessControl feature="workspace" permission="Create">
          <Ui.Button
            variant="popover"
            onClick={() => {
              setSelectedSpace(undefined);
              setSelectedSetting('Create Workspace');
              setSetingShow(true);
            }}
            leftIcon={<Ui.Icons name="plus" size="sm" />}
          >
            Create New Workspace
          </Ui.Button>
        </AccessControl>
      </section>
      <section className={styles.container}>
        <div className="dbn-w-full dbn-h-[80%]">
          {!(isLoadingQueries || isSkippingWithDemo) && (
            <div className={styles.header}>
              <div className="dbn-flex dbn-gap-6 dbn-items-center">
                <span className={styles.title}>{workspace?.name}</span>
                <Ui.NewTooltip text="users">
                  <span className="dbn-flex dbn-gap-1 dbn-items-center dbn-text-gray-light">
                    <Ui.Icons name="people" size="lg" />
                    {userData?.users.length}
                  </span>
                </Ui.NewTooltip>
              </div>
              <div className="dbn-flex dbn-gap-2 dbn-items-center">
                <AccessControl feature="metric" permission="Create">
                  <NavLink
                    to={{
                      pathname: '/createMetric/',
                      search: `?wid=${workspace?.id}&dashboardId=${dashboardData?.externalDashboards?.[0]?.id}&client=${dashboardData?.externalDashboards?.[0]?.externalDashboardMetrics?.[0]?.externalMetric?.clientId}&parent=homepage`,
                    }}
                  >
                    <Ui.Button
                      variant="primary"
                      children="Metric"
                      isDisabled={!dashboardData?.externalDashboards.length}
                      leftIcon={<Ui.Icons name="plus" color="white" />}
                    />
                  </NavLink>
                </AccessControl>
                {getIsCanAccess('dashboard', 'Create') ? (
                  <Ui.Button
                    variant="secondary"
                    onClick={() => {
                      setisExternalDashboardModal(true);
                    }}
                    leftIcon={<Ui.Icons name="plus" />}
                  >
                    Dashboard
                  </Ui.Button>
                ) : null}
                <AccessControl
                  feature="workspace"
                  permission="Settings"
                  workspace={workspace?.id}
                >
                  <Ui.Button
                    variant="popover"
                    onClick={(e) => {
                      e.stopPropagation();
                      setisWorkspaceModal(true);
                      setParams({ wid: workspace?.id });
                    }}
                    leftIcon={<Ui.Icons name="gear" />}
                    className="dbn-border dbn-border-secondary dbn-px-3 dbn-py-2.5 dbn-rounded"
                  />
                </AccessControl>
              </div>
            </div>
          )}
          <div className="dbn-w-full dbn-h-[90%] dbn-px-8">
            {connectedIntegrations?.length === 0 ||
            (connectedIntegrations?.length === 1 &&
              connectedIntegrations[0].name === 'Databrain Demo Database') ? (
              <div className="dbn-my-3 dbn-w-full dbn-rounded-md dbn-flex dbn-flex-row dbn-py-2 dbn-items-center dbn-border dbn-border-secondary dbn-bg-info-light dbn-justify-between dbn-px-4">
                <div className="dbn-flex dbn-gap-2 dbn-items-center">
                  <Ui.Icons name="info" />
                  <Ui.Text variant="body-text-sm">
                    Please connect your own data source to continue further
                  </Ui.Text>
                </div>
                <Ui.Button
                  variant="primary"
                  leftIcon={<Ui.Icons name="plus" color="white" />}
                  onClick={() => navigate('/configuration')}
                  isDisabled={isLoadingQueries || isSkippingWithDemo}
                >
                  Add New Datasource
                </Ui.Button>
              </div>
            ) : null}
            {isLoadingQueries || isGettingDashboard ? (
              <div className="dbn-flex dbn-w-full dbn-h-full dbn-flex-col dbn-items-center dbn-gap-5 dbn-py-3 dbn-mt-10">
                <Loader />
              </div>
            ) : null}
            {isSkippingWithDemo &&
            !onboardingData?.companies_by_pk?.isOnboarded &&
            !isLoadingQueries ? (
              <div className="dbn-flex dbn-flex-col dbn-items-center dbn-gap-5 dbn-py-3 dbn-mt-10">
                <Loader />
                <Ui.Text variant="body-text-sm" color="secondary-dark">
                  Onboarding with demo workspace...
                </Ui.Text>
              </div>
            ) : null}
            {!isLoadingQueries &&
              !isGettingDashboard &&
              !isSkippingWithDemo &&
              onboardingData?.companies_by_pk?.isOnboarded && (
                <div className={styles.content}>
                  <div className="dbn-w-full dbn-flex dbn-justify-between">
                    <span className="dbn-w-[20%]">
                      <Ui.Tab
                        activeTab={activeTab}
                        options={['Dashboards', 'Metrics']}
                        setActiveTab={setActiveTab}
                        className="dbn-boder-b dbn-divide-solid"
                      />
                    </span>
                    <span className="dbn-w-[23%]">
                      <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
                    </span>
                  </div>
                  <ListItem
                    workspaceId={workspace?.id}
                    dashboardData={dashboardData?.externalDashboards
                      ?.filter((item) =>
                        item?.name?.toLowerCase().includes(searchKeyword)
                      )
                      ?.slice(
                        startRecord,
                        Math.min(currentPage * recordsPerPage, totalDashboards)
                      )}
                    isLoading={isGettingDashboard || isMetricsLodaing}
                    isDashboardTab={activeTab === 'Dashboards'}
                    metricList={metricList
                      ?.filter((item) =>
                        item?.metric?.name
                          ?.toLowerCase()
                          .includes(searchKeyword)
                      )
                      ?.slice(
                        startRecord,
                        Math.min(currentPage * recordsPerPage, totalMetrics)
                      )}
                  />
                </div>
              )}
          </div>
        </div>
        {!isLoadingQueries &&
        !isGettingDashboard &&
        !isSkippingWithDemo &&
        onboardingData?.companies_by_pk?.isOnboarded ? (
          <Pagination
            totalRecords={
              activeTab === 'Dashboards'
                ? dashboardData?.externalDashboards
                    .sort((a, b) => a.name.localeCompare(b.name))
                    ?.filter((item) =>
                      item.name.toLowerCase().includes(searchKeyword)
                    ).length || 0
                : metricList?.filter((item) =>
                    item.metric.name.toLowerCase().includes(searchKeyword)
                  ).length || 0
            }
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </section>
      <Ui.Modal
        isOpen={isExternalDashboardModal}
        onClose={() => setisExternalDashboardModal(false)}
        headerTitle="Create Dashboard"
      >
        <ExternalDashboardForm
          onSuccess={() => setisExternalDashboardModal(false)}
          onCancel={() => setisExternalDashboardModal(false)}
          WorkspaceId={workspace?.id}
        />
      </Ui.Modal>
      <Ui.Modal
        isOpen={isSettingShow}
        onClose={() => setSetingShow(false)}
        headerTitle={selectedSetting}
      >
        <form className={styles['workspace-settings-form']} onSubmit={onSubmit}>
          <div className={styles['workspace-settings-modal']}>
            <Ui.InputField
              type="text"
              placeholder="Product Development Staging"
              label="Workspace name"
              register={register('name', {
                required: {
                  value: true,
                  message: 'Workspace name is required',
                },
              })}
              error={errors.name?.message}
            />
            <Ui.TextAreaField
              label="Workspace Description"
              id="description"
              rows={6}
              register={register('description', {
                required: {
                  value: true,
                  message: 'Workspace Description is required',
                },
              })}
              placeholder="This workspace is about Product’s engineering managing metrics."
              error={errors.description?.message}
            />
            <Ui.Error message={error} />
          </div>
          <Ui.ModalFooter>
            <Ui.Button
              type="button"
              variant="tab"
              isDisabled={isDisableButton}
              onClick={() => setSetingShow(false)}
            >
              Cancel
            </Ui.Button>
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={isDisableButton || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Ui.Button>
          </Ui.ModalFooter>
        </form>
      </Ui.Modal>
      <WorkspaceSettingsPanel
        WorkspaceSettingsProps={{
          isOpen: isWorkspaceModal,
          onClose: () => {
            setisWorkspaceModal(false);
            setParams(undefined);
          },
        }}
      />
    </div>
  );
};

const ListItem: React.FC<{
  workspaceId?: string;
  isDashboardTab: boolean;
  dashboardData?: any;
  isLoading: boolean;
  metricList?: {
    metric: {
      __typename?: 'externalMetrics' | undefined;
      id: any;
      metricId: string;
      name: string;
      updatedAt: any;
      clientId?: string | null | undefined;
    };
    workspaceId: any;
    dashboardId: any;
    dashboard: string;
    isPublished: boolean;
  }[];
}> = ({
  workspaceId,
  isDashboardTab,
  dashboardData,
  isLoading,
  metricList,
}) => {
  const [isEditDashboardModal, setIsEditDashboardModal] = useState(false);
  const [isDeleteDashboardModal, setIsDeleteDashboardModal] = useState(false);
  const [dashboardId, setDashboardId] = useState('');
  const { getIsCanAccess } = useAccessControl();

  const { isShowPopup, isShowEditButton, isShowDeleteButton } = useMemo(() => {
    const isCanEdit = getIsCanAccess('dashboard', 'Edit');
    const isCanDelete = getIsCanAccess('dashboard', 'Delete');
    return {
      isShowPopup: isCanDelete || isCanEdit,
      isShowDeleteButton: isCanDelete,
      isShowEditButton: isCanEdit,
    };
  }, [getIsCanAccess]);

  const dashboardHeaders = useMemo(() => {
    return [
      {
        name: 'DASHBOARD NAME',
        columnKey: 'dashboard name',
        columnCell: (row: any) => (
          <NavLink
            to={{
              pathname: `/externalDashboard/${row.id}/`,
              search: `?wid=${workspaceId}`,
            }}
            className="hover:dbn-underline hover:dbn-underline-offset-4 dbn-flex dbn-gap-1 dbn-items-center"
          >
            <Ui.Icons name="chart" />
            {row?.name}
          </NavLink>
        ),
      },
      {
        name: 'METRICS',
        columnKey: 'metrics',
        columnCell: (row: any) =>
          `${row?.externalDashboardMetrics?.length || 0} Metrics`,
      },
      {
        name: 'LAST EDITED',
        columnKey: 'updatedAt',
        columnCell: (row: any) => (
          <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
            {formatTimeDifference(row?.updatedAt)}
            {isShowPopup && (
              <Ui.PopoverMenu
                overFlowDetection={false}
                position="right-start"
                menuWidth="100px"
                buttonContent={<Ui.Icons name="kebab-menu-vertical" />}
              >
                <div className={styles.popoverMenuBtn}>
                  {isShowEditButton && (
                    <Ui.Button
                      variant="popover"
                      onClick={() => {
                        setDashboardId(row.id);
                        setIsEditDashboardModal(true);
                      }}
                      fitContainer
                      className="dbn-justify-start"
                    >
                      Rename
                    </Ui.Button>
                  )}
                  {isShowDeleteButton && (
                    <Ui.Button
                      variant="popover"
                      onClick={() => {
                        setDashboardId(row.id);
                        setIsDeleteDashboardModal(true);
                      }}
                      className="dbn-justify-start"
                      fitContainer
                    >
                      Delete
                    </Ui.Button>
                  )}
                </div>
              </Ui.PopoverMenu>
            )}
          </div>
        ),
      },
    ];
  }, [isShowDeleteButton, isShowEditButton, isShowPopup, workspaceId]);
  const metricHeaders = useMemo(() => {
    return [
      {
        name: 'METRIC NAME',
        columnKey: 'name',
        columnCell: (row: any) => (
          <NavLink
            to={`/metric/${row?.metric?.id}/?wid=${row?.workspaceId}&dashboardId=${row?.dashboardId}&client=${row?.metric?.clientId}&parent=homepage&isPublished=${row?.isPublished}`}
            className="hover:dbn-underline hover:dbn-underline-offset-4 dbn-flex dbn-gap-1 dbn-items-center"
          >
            <Ui.Icons name="bar-chart" />
            {row?.metric?.name}
          </NavLink>
        ),
      },
      {
        name: 'DASHBOARD NAME',
        columnKey: 'dashboard',
        columnCell: (row: any) => (
          <span className="dbn-flex dbn-gap-1 dbn-items-center">
            {row?.dashboard ? (
              <>
                <Ui.Icons name="chart" />
                {row?.dashboard}
              </>
            ) : (
              '-'
            )}
          </span>
        ),
      },
      {
        name: 'LAST EDITED',
        columnKey: 'updatedAt',
        columnCell: (row: any) => formatTimeDifference(row?.metric?.updatedAt),
      },
    ];
  }, []);

  return (
    <>
      {(isDashboardTab && dashboardData?.length === 0) ||
      (!isDashboardTab && metricList?.length === 0) ? (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
          <NoDataFound message="No data found!" />
        </div>
      ) : null}
      {isLoading && !isDashboardTab ? (
        <div className="dbn-flex dbn-w-full dbn-h-full dbn-flex-col dbn-items-center dbn-gap-5 dbn-py-3 dbn-mt-10">
          <Loader />
        </div>
      ) : null}
      {(isDashboardTab && dashboardData?.length !== 0) ||
      (metricList?.length !== 0 && !isLoading) ? (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-justify-between">
          <div className="dbn-w-full dbn-max-h-[92%]">
            <Ui.List
              headers={isDashboardTab ? dashboardHeaders : metricHeaders}
              data={isDashboardTab ? dashboardData || [] : metricList || []}
              isDataLoading={false}
              isDisableMoreOption
            />
          </div>
        </div>
      ) : null}
      <Ui.Modal
        isOpen={isEditDashboardModal}
        onClose={() => setIsEditDashboardModal(false)}
        headerTitle="Edit External Dashboard"
      >
        <ExternalDashboardForm
          onSuccess={() => setIsEditDashboardModal(false)}
          onCancel={() => setIsEditDashboardModal(false)}
          type={DashboardFormType.edit}
          DashboardId={dashboardId}
        />
      </Ui.Modal>
      <Ui.Modal
        isOpen={isDeleteDashboardModal}
        onClose={() => setIsDeleteDashboardModal(false)}
        headerTitle="Delete External Dashboard"
      >
        <ExternalDashboardForm
          onSuccess={() => setIsDeleteDashboardModal(false)}
          onCancel={() => setIsDeleteDashboardModal(false)}
          type={DashboardFormType.delete}
          DashboardId={dashboardId}
        />
      </Ui.Modal>
    </>
  );
};

export default Homepage;
