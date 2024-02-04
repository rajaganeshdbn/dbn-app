/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-relative-parent-imports */
import { useState, useEffect, useMemo } from 'react';
import {
  useCompanySubsetTableListQuery,
  useSaveCompanySubsetMutation,
} from 'utils/generated/graphql';
import { SelectedTable } from 'types';
import { Ui } from '@databrainhq/plugin';
import { Link } from 'react-router-dom';
import SettingsLayout from 'pages/Settings';
import segmentEvent from 'utils/segmentEvent';
import { DATABASE, TABLE } from 'consts/application';
import Header from 'components/Header';
import TableSubset from 'components/TableSubset';
import useTenancyLevel from 'hooks/useTenancyLevel';
import useExternalDatasetList from 'hooks/useExternalDatasetList';
import useWorkspace from 'hooks/useWorkspace';
import useExternalDataset from 'hooks/useExternalDataset';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';

type AccessPermissionsProps = {
  isShowLayout?: boolean;
  onClose?: () => void;
};

const AccessPermissions = ({
  isShowLayout = true,
  onClose,
}: AccessPermissionsProps) => {
  const { workspace } = useWorkspace();
  const { getIsCanAccess } = useAccessControl();
  const [selectedTable, setSelectedTable] = useState<SelectedTable>([]);
  const [isAllowMetricCreation, setAllowMetricCreation] = useState(false);
  const [isAllowMetricDeletion, setAllowMetricDeletion] = useState(false);
  const [isAllowMetricUpdation, setAllowMetricUpdation] = useState(false);
  const [isAllowChangeLayout, setAllowChangeLayout] = useState(false);
  const [isAllowEmailReports, setAllowEmailReports] = useState(false);
  const { companyTenancyType } = useTenancyLevel();
  const { mutate: saveSchema, isLoading: isSaving } =
    useSaveCompanySubsetMutation();
  const { data: listData, isLoading: isLoadingList } =
    useCompanySubsetTableListQuery(
      {
        workspaceId: workspace?.id,
      },
      { enabled: !!workspace?.id }
    );
  const subsetTable = useMemo(
    () => listData?.companySubsetTables?.[0],
    [listData?.companySubsetTables?.[0]]
  );
  useEffect(() => {
    if (!subsetTable) return;
    setSelectedTable(subsetTable.tableList || []);
    setAllowMetricCreation(subsetTable.isAllowMetricCreation);
    setAllowMetricDeletion(subsetTable.isAllowMetricDeletion);
    setAllowMetricUpdation(subsetTable.isAllowMetricUpdation);
    setAllowChangeLayout(subsetTable.isAllowChangeLayout);
    setAllowEmailReports(subsetTable.isAllowEmailReports);
  }, [subsetTable]);
  const { externalDatasetList: schemaDataList, isLoading: isLoadingSchema } =
    useExternalDatasetList();
  const { deleteExternalDataset } = useExternalDataset('', workspace?.id);
  const content = (
    <div className="dbn-w-full dbn-h-full dbn-overflow-auto">
      <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-4 dbn-p-4">
        <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
          <div className="dbn-w-[80%] dbn-flex dbn-flex-col dbn-flex-wrap dbn-gap-2">
            <Ui.Text variant="heading-lg">
              Allow End-User Metric Creation
            </Ui.Text>
            <Ui.Text variant="body-text-sm">
              End-user metric creation allows your user to create metrics
            </Ui.Text>
          </div>
          <Ui.Switch
            name="allowMetricCreation"
            enabled={isAllowMetricCreation}
            onChange={setAllowMetricCreation}
            isDisabled={!getIsCanAccess('accessPermissions', 'Metric Creation')}
          />
        </div>
        {!!schemaDataList.length &&
          !isLoadingList &&
          companyTenancyType !== DATABASE && (
            <TableSubset
              schemaDataList={schemaDataList}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              isLoadingList={isLoadingList}
              isAllowMetricCreation={isAllowMetricCreation}
              onDelete={deleteExternalDataset}
              workspaceId={workspace?.id}
            />
          )}
        {companyTenancyType !== 'DATABASE' &&
          !schemaDataList.length &&
          !isLoadingList && (
            <Ui.Alert text="No dataset is created yet. Please click on the Create Dataset button to create it.">
              <Link
                to={{
                  pathname: '/externalDataset/new/',
                  search: `?wid=${workspace?.id}`,
                }}
              >
                <Ui.Button type="button" variant="primary">
                  Create Dataset
                </Ui.Button>
              </Link>
            </Ui.Alert>
          )}
        <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
          <div className="dbn-w-[80%] dbn-flex dbn-flex-col dbn-flex-wrap dbn-gap-2">
            <Ui.Text variant="heading-lg">
              Allow End-User Metric Deletion
            </Ui.Text>
            <Ui.Text variant="body-text-sm">
              End-user metric deletion allows your user to delete metrics
            </Ui.Text>
          </div>
          <Ui.Switch
            name="allowMetricDeletion"
            enabled={isAllowMetricDeletion}
            onChange={setAllowMetricDeletion}
            isDisabled={!getIsCanAccess('accessPermissions', 'Archive Metrics')}
          />
        </div>
        <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
          <div className="dbn-w-[80%] dbn-flex dbn-flex-col dbn-flex-wrap dbn-gap-2">
            <Ui.Text variant="heading-lg">
              Allow End-User Metric Updation
            </Ui.Text>
            <Ui.Text variant="body-text-sm">
              End-user metric updation allows your user to update metrics
            </Ui.Text>
          </div>
          <Ui.Switch
            name="allowMetricUpdation"
            enabled={isAllowMetricUpdation}
            onChange={setAllowMetricUpdation}
            isDisabled={!getIsCanAccess('accessPermissions', 'Metric Updation')}
          />
        </div>
        <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
          <div className="dbn-w-[80%] dbn-flex dbn-flex-col dbn-flex-wrap dbn-gap-2">
            <Ui.Text variant="heading-lg">
              Allow End-User Change Dashboard Layout
            </Ui.Text>
            <Ui.Text variant="body-text-sm">
              End-user change layout allows your user to change the dashboard
              layout
            </Ui.Text>
          </div>
          <Ui.Switch
            name="allowChangeLayout"
            enabled={isAllowChangeLayout}
            onChange={setAllowChangeLayout}
            isDisabled={
              !getIsCanAccess('accessPermissions', 'Customize Layout')
            }
          />
        </div>
        <Ui.SelfHostControl>
          <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
            <div className="dbn-w-[80%] dbn-flex dbn-flex-col dbn-flex-wrap dbn-gap-2">
              <Ui.Text variant="heading-lg">
                Allow End-User Schedule Email Reports
              </Ui.Text>
              <Ui.Text variant="body-text-sm">
                End-user schedule email reports allows your user to schedule
                email reports (you need to enable email settings also).
              </Ui.Text>
            </div>
            <Ui.Switch
              name="allowEmailReports"
              enabled={isAllowEmailReports}
              onChange={setAllowEmailReports}
              isDisabled={
                !getIsCanAccess('accessPermissions', 'Schedule Reports')
              }
            />
          </div>
        </Ui.SelfHostControl>
        <div className="dbn-w-full dbn-flex dbn-justify-end dbn-pb-5">
          <Ui.Button
            type="button"
            variant="primary"
            isDisabled={
              !getIsCanAccess('accessPermissions', 'Edit') || isSaving
            }
            onClick={
              getIsCanAccess('accessPermissions', 'Edit')
                ? () =>
                    saveSchema(
                      {
                        companyId: getCurrentUser()?.companyId,
                        tableList:
                          companyTenancyType !== DATABASE &&
                          isAllowMetricCreation
                            ? selectedTable?.filter((table) =>
                                schemaDataList?.some(
                                  (dataTable) =>
                                    dataTable.tableName === table.tableName
                                )
                              ) || []
                            : [],
                        isAllowMetricCreation,
                        isAllowMetricDeletion,
                        isAllowMetricUpdation,
                        isAllowChangeLayout,
                        isAllowEmailReports,
                        workspaceId: workspace?.id,
                      },
                      {
                        onSuccess(data) {
                          segmentEvent('access permissions saved', {
                            workspaceId: workspace?.id,
                            isAllowMetricCreation,
                            isAllowMetricDeletion,
                            isAllowMetricUpdation,
                            isAllowChangeLayout,
                            isAllowEmailReports,
                          });
                          setSelectedTable(
                            data.insert_companySubsetTables_one?.tableList
                          );
                          onClose?.();
                        },
                      }
                    )
                : undefined
            }
          >
            Save
          </Ui.Button>
        </div>
      </div>

      {(!schemaDataList.length && isLoadingList) ||
        (isLoadingSchema && <Ui.Loader />)}
    </div>
  );
  return isShowLayout ? <SettingsLayout>{content}</SettingsLayout> : content;
};

export default AccessPermissions;
