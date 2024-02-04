/* eslint-disable @typescript-eslint/no-use-before-define */
import SettingsLayout from 'pages/Settings';
import { useEffect, useMemo, useState } from 'react';
import { Ui, types } from '@databrainhq/plugin';
import { useNavigate } from 'react-router-dom';
import { useConnectedCompanyIntegrationListQuery } from 'utils/generated/graphql';
import { encryption } from 'utils/encryption';
import { WorkspaceType } from 'types';
import AccessControl from 'components/AccessControl';
import useNewMetricStore from 'hooks/useNewMetricStore';
import useExternalDashboards from 'hooks/useExternalDashboard';
import useWorkspace from 'hooks/useWorkspace';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';
import { setCurrentWorkspace } from 'helpers/application/workspace';
import styles from './metricStore.module.css';

const MetricStore: React.FC<any> = () => {
  const user = getCurrentUser();

  const { metricList, isLoading } = useNewMetricStore();
  const { workspaces, setWorkspace, setSelectedSpace } = useWorkspace();
  const { getIsCanAccess } = useAccessControl();
  const { data: intergrationData, isLoading: isLoadingDataSources } =
    useConnectedCompanyIntegrationListQuery(
      {
        companyId: user?.companyId,
      },
      { enabled: !!user?.companyId }
    );
  // const [dashboards, setDashboards] = useState([
  //   {
  //     label: 'All',
  //     value: 'all',
  //   },
  // ]);

  const [selectedDataSource, setSelectedDataSource] =
    useState<types.FloatingDropDownOption>({ value: '', label: '' });
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
  const datasourceList: types.FloatingDropDownOption[] = useMemo(
    () =>
      connectedIntegrations?.map((i) => ({
        value: i.id,
        label: i.name,
        labelType: i.workspaceId,
      })) || [],
    [connectedIntegrations]
  );
  const filteredMetricList = useMemo(() => {
    if (!selectedDataSource.value) {
      return [];
    }
    return metricList?.filter(
      (item) => item.dataSourceId === selectedDataSource.value
    );
  }, [metricList?.length, selectedDataSource.value]);
  // const dashboardsWithDuplicates = metricList
  //   ?.map((item) => item.dashboards)
  //   .flat(1);

  useEffect(() => {
    if (metricList?.length && datasourceList.length) {
      if (!selectedDataSource.value) {
        setSelectedDataSource(datasourceList[0]);
        setWorkspace(
          (prev) =>
            workspaces.find((w) => w.id === datasourceList[0]?.labelType) ||
            prev
        );
        setSelectedSpace(
          workspaces.find((w) => w.id === datasourceList[0]?.labelType)
        );
        setCurrentWorkspace(
          workspaces.find(
            (w) => w.id === datasourceList[0]?.labelType
          ) as WorkspaceType
        );
      }
    }
  }, [
    metricList?.length,
    isLoading,
    datasourceList.length,
    isLoadingDataSources,
    workspaces,
  ]);

  const headers = useMemo(() => {
    return [
      {
        name: 'Metric NAME',
        columnKey: 'name',
        columnCell: (row: any) => (
          <div className="dbn-flex dbn-flex-col dbn-gap-1">
            <span>{row?.name}</span>
            <div className="dbn-flex dbn-gap-2">
              {row?.dashboards.map((dashboard: any) => (
                <>
                  <span className="dbn-flex dbn-text-[11px] dbn-rounded dbn-px-1.5 dbn-bg-gray dbn-text-secondary-dark dbn-border dbn-border-secondary">
                    {dashboard.name}
                  </span>
                </>
              ))}
            </div>
          </div>
        ),
      },
      {
        name: 'DESCRIPTION',
        columnKey: 'description',
      },
      {
        name: 'CREATED BY',
        columnKey: 'createdBy',
      },
      {
        name: 'DATE CREATED',
        columnKey: 'dateCreated',
        columnCell: (row: any) =>
          new Date(row?.dateCreated).toDateString().slice(4),
      },
      {
        name: 'ACTION',
        columnKey: 'action',
        columnCell: (row: any) => <PublishMetric metric={row} />,
      },
    ];
  }, [getIsCanAccess]);

  return (
    <SettingsLayout>
      <section className={styles.metricStore}>
        <div className={styles.header}>
          <Ui.Text variant="heading-lg">Metric Store</Ui.Text>
          <div className="dbn-flex dbn-gap-2">
            <Ui.FloatingDropDown
              label="Select Datasource"
              labelVariant="floating"
              isSearchEnabled
              options={datasourceList}
              selectedOption={selectedDataSource}
              onChange={(option) => {
                setWorkspace(
                  (prev) =>
                    workspaces.find((w) => w.id === option?.labelType) || prev
                );
                setSelectedDataSource(option);
                setSelectedSpace(
                  workspaces.find((w) => w.id === option?.labelType)
                );
                setCurrentWorkspace(
                  workspaces.find(
                    (w) => w.id === option?.labelType
                  ) as WorkspaceType
                );
              }}
              menuWidth="100%"
            />
            {/* <Ui.FloatingDropDown
              label="Select Dashboard"
              labelVariant="floating"
              isSearchEnabled
              options={dashboards}
              selectedOption={
                dashboards.length
                  ? selectedDashboard
                  : {
                      label: '',
                      value: '',
                    }
              }
              menuWidth="100%"
              onChange={(option) =>
                setSelectedDashboard({
                  label: option.label,
                  value: option.value,
                })
              }
            /> */}
          </div>
        </div>
        <Ui.List
          headers={headers}
          data={filteredMetricList ?? []}
          isDataLoading={isLoading || isLoadingDataSources}
          initialLimit={50}
        />
      </section>
    </SettingsLayout>
  );
};

export default MetricStore;

const PublishMetric: React.FC<any> = ({ metric }) => {
  const { id, dashboards } = metric;
  const navigate = useNavigate();
  const [dashboardIds, setDashboardIds] = useState<
    {
      value: any;
      label: string;
    }[]
  >([]);
  const [isShow, setShowForm] = useState<boolean>(false);
  const {
    dashboards: dashboardDataList,
    publishExternalMetric,
    publishExternalMetricError,
    isPublishing,
  } = useExternalDashboards();

  const dashboardOptions =
    dashboardDataList?.map((dash) => ({
      value: dash.id,
      label: dash.name,
    })) || [];
  const publishObject = dashboardIds.map((dId) => ({
    externalDashboardId: dId.value,
    externalMetricId: id,
  }));

  return (
    <>
      <div>
        {dashboards.length ? (
          <Ui.Button
            variant="tertiary"
            className="dbn-text-success"
            type="button"
          >
            Published
          </Ui.Button>
        ) : (
          <AccessControl
            feature="metricsStore"
            permission="Publish"
            fallback={
              <Ui.NewTooltip
                text="You are not allowed to publish."
                tooltipClass="dbn-min-w-[200px]"
              >
                <Ui.Button variant="primary" type="button" isDisabled>
                  Publish
                </Ui.Button>
              </Ui.NewTooltip>
            }
          >
            <Ui.Button
              variant="primary"
              type="button"
              onClick={() => setShowForm(true)}
            >
              Publish
            </Ui.Button>
          </AccessControl>
        )}
      </div>
      <Ui.Modal
        headerTitle="Publish Metric To Dashboard"
        isOpen={isShow}
        onClose={() => setShowForm(false)}
      >
        <div className="dbn-p-5 dbn-rounded dbn-w-[400px] dbn-h-[200px]">
          <Ui.MultiSelectDropdown
            buttonWidth="100%"
            menuWidth="100%"
            label="Dashboards"
            options={dashboardOptions}
            selectedOption={dashboardIds}
            onChange={(value) => {
              setDashboardIds(value);
            }}
            isShowSelectedOptions
          />
        </div>
        <Ui.Error message={publishExternalMetricError as string} />
        <Ui.ModalFooter>
          <Ui.Button
            variant="primary"
            type="button"
            isDisabled={isPublishing || !dashboardIds.length}
            onClick={() => {
              publishExternalMetric(
                { objects: publishObject },
                {
                  onSuccess() {
                    setShowForm(false);
                    navigate(0);
                  },
                }
              );
            }}
          >
            Save
          </Ui.Button>
        </Ui.ModalFooter>
      </Ui.Modal>
    </>
  );
};
