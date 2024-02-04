import { Ui } from '@databrainhq/plugin';
import SettingsLayout from 'pages/Settings';
import React, { useMemo, useState } from 'react';
import ClientDropDown from 'components/ClientDropDown';
import DeleteModal from 'components/DeleteModal';
import useMetricStore from 'hooks/useMetricStore';
import useExternalArchiveMetric from 'hooks/useExternalArchiveMetric';
import useWorkspace from 'hooks/useWorkspace';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';

const Tabs = ['tab1', 'tab2'];
const ArchiveMetrics: React.FC<any> = () => {
  const [activeTab, setActiveTab] = useState<string | number>('tab1');
  const [client, setClient] = useState({ label: '', value: '' });
  const { getIsCanAccess } = useAccessControl();

  const { metricList, isLoading } = useMetricStore(
    activeTab === Tabs[0],
    activeTab === Tabs[1] ? client.value : undefined
  );

  const { workspace, workspaces, setWorkspace } = useWorkspace();

  const headers = useMemo(() => {
    const isCanUnArchive = getIsCanAccess('archiveMetrics', 'Unarchive');
    const isCanDelete = getIsCanAccess('archiveMetrics', 'Delete');
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
      ...(isCanUnArchive || isCanDelete
        ? [
            {
              name: 'ACTION',
              columnKey: 'action',
              columnCell: (row: any) => (
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                <ArchivedMetricsActions
                  clientId={activeTab === Tabs[1] ? client.value : undefined}
                  metric={row}
                />
              ),
            },
          ]
        : []),
    ];
  }, [client.value, activeTab, getIsCanAccess]);

  return (
    <SettingsLayout>
      <div className="dbn-w-full dbn-h-full dbn-px-5 dbn-pt-2">
        <Ui.Tabs.Context defaultActiveTab="tab1" setTab={setActiveTab}>
          <Ui.Tabs.List
            width="100%"
            className="!dbn-px-5"
            headerButton={
              <div className="dbn-ml-auto dbn-pb-2">
                <div className="dbn-flex dbn-gap-4">
                  <Ui.FloatingDropDown
                    isSearchEnabled
                    options={
                      workspaces.map((itm) => ({
                        label: itm.name,
                        value: itm.id,
                      })) || []
                    }
                    selectedOption={{
                      label: workspace?.name || '',
                      value: workspace?.id,
                    }}
                    onChange={(option) =>
                      setWorkspace(
                        workspaces.find((itm) => itm.id === option.value)
                      )
                    }
                    menuWidth="100%"
                  />
                  {activeTab === Tabs[1] && (
                    <ClientDropDown
                      client={client}
                      setClient={setClient}
                      isSearchEnabled
                    />
                  )}
                </div>
              </div>
            }
          >
            <Ui.Tabs.Tab tabId="tab1" className="dbn-px-2">
              Archived For All
            </Ui.Tabs.Tab>
            <AccessControl
              feature="archiveMetrics"
              permission="View Client Metrics"
            >
              <Ui.Tabs.Tab tabId="tab2" className="dbn-px-2">
                Archived By Client
              </Ui.Tabs.Tab>
            </AccessControl>
          </Ui.Tabs.List>

          <Ui.Tabs.Panel
            tabId={activeTab as string}
            className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-5 dbn-py-10 dbn-px-5"
          >
            <Ui.List
              headers={headers}
              data={metricList ?? []}
              isDataLoading={isLoading}
            />
          </Ui.Tabs.Panel>
        </Ui.Tabs.Context>
      </div>
    </SettingsLayout>
  );
};

export default ArchiveMetrics;

const ArchivedMetricsActions: React.FC<any> = ({ metric, clientId }) => {
  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'unarchive' | 'delete'>(
    'unarchive'
  );

  const { handleArchiveExternalMetric, handleDeleteExternalMetric, isLoading } =
    useExternalArchiveMetric({
      onSuccess: () => setShowDeleteModal(false),
      externalMetricId: metric.id,
      clientId,
    });
  return (
    <div className="dbn-flex">
      <AccessControl feature="archiveMetrics" permission="Unarchive">
        <Ui.Button
          variant="secondary"
          type="button"
          onClick={() => {
            setModalType('unarchive');
            setShowDeleteModal(true);
          }}
        >
          Unarchive
        </Ui.Button>
      </AccessControl>
      {/* 
        <AccessControl feature="archiveMetrics" permission="Delete">
          <Ui.Button
            variant="tertiary"
            type="button"
            onClick={() => {
              setModalType('delete');
              setShowDeleteModal(true);
            }}
          >
            <Ui.Icons name="delete" />
          </Ui.Button> 
        </AccessControl>
      */}
      <DeleteModal
        title={`${modalType === 'delete' ? 'Delete' : 'Unarchive'} Metric`}
        alertMessage={`Are you sure you want to ${
          modalType === 'delete' ? 'permanently delete' : 'unarchive'
        } this metric?`}
        isShowDeleteModal={isShowDeleteModal}
        onDelete={() => {
          if (modalType === 'delete') handleDeleteExternalMetric();
          else handleArchiveExternalMetric(true);
        }}
        setShowDeleteModal={setShowDeleteModal}
        actionTitle={modalType === 'unarchive' ? 'Unarchive' : 'Delete'}
        isLoading={isLoading}
      />
    </div>
  );
};
