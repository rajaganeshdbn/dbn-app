/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useExternalDashboardMetricsQuery } from 'utils/generated/graphql';
import { useNavigate, useParams } from 'react-router-dom';
import { Ui, types } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import { Schema } from 'types';
import Flex from 'components/Flex';
import useExternalDashboards from 'hooks/useExternalDashboard';
import useWorkspace from 'hooks/useWorkspace';
import { getCurrentUser } from 'helpers/application/auth';
import SchemaFields from './SchemaFields';

export enum DashboardFormType {
  create = 'Create',
  edit = 'Edit Dashboard',
  delete = 'Delete Dashboard',
  manage = 'Manage Metrics',
  filter = 'Dashboard Filters',
}

export type DashboardFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
  className?: string;
  type?: DashboardFormType | string;
  DashboardId?: string;
  WorkspaceId?: string;
  clientId?: string;
  isHorizontalFilter?: boolean;
  updateFilter?: {
    isUpdate: boolean;
    isDelete: boolean;
    name: string;
  };
};

export type FilterValue = {
  name: string;
  as: string;
  isDefault: boolean;
  isShowHorizontal: boolean;
  label: string;
  defaultValue?: string[] | string | number | number[];
  isClientScoped?: boolean;
  clientColumn?: string;
  clientColumnType?: string;
  isManualOptions?: boolean;
  manualOptions?: string[];
  dependOn?: types.FloatingDropDownOption[];
};
export const getFilters = (
  values: FieldValues,
  columns: Schema['columnsWithDataType'],
  isHorizontalFilter: boolean | undefined
) => {
  return values.filters?.map((f: any) => ({
    tableName: f.tableName,
    columns: [
      ...(columns?.map((col) => ({
        name: col.name,
        as: col.as,
        dataType: col.dataType || '',
        isDefault: !!col.isDefault,
        label: col.label || col.name,
        isShowHorizontal: Boolean(col.isShowHorizontal),
        defaultValue: col.defaultValue,
        isClientScoped: Boolean(col.isClientScoped),
        clientColumn: col.clientColumn,
        clientColumnType: col.clientColumnType,
        isManualOptions: Boolean(col.isManualOptions) || false,
        manualOptions: col.manualOptions || [],
        dependOn: col.dependOn || [],
      })) || []),
      ...values.columns
        .filter((el: FilterValue) => el.name)
        .map((el: FilterValue) => {
          return {
            dataType: el.name.split('--')[0],
            name: el.name.split('--')[1],
            as: el.as,
            isDefault: !isHorizontalFilter || false,
            isShowHorizontal: isHorizontalFilter || false,
            label: el.label || el.name.split('--')[1],
            defaultValue: isHorizontalFilter ? el.defaultValue : undefined,
            isClientScoped: el.isClientScoped || false,
            clientColumn: el.clientColumn,
            clientColumnType: el.clientColumnType,
            isManualOptions:
              ['string', 'boolean', 'default'].includes(el.as) &&
              el.manualOptions?.length
                ? el.isManualOptions || false
                : false,
            manualOptions: el.manualOptions || [],
            dependOn: el.dependOn || [],
          };
        }),
    ],
  }));
};
const ExternalDashboardForm: React.FC<DashboardFormProps> = ({
  onSuccess,
  onCancel,
  className = '',
  type = 'Create',
  DashboardId,
  WorkspaceId,
  clientId,
  isHorizontalFilter,
  updateFilter,
}) => {
  const { id = DashboardId } = useParams();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const {
    createDashboard,
    isCreatingDashboard,
    dashboards,
    updateDashboard,
    isUpdatingDashboard,
    deleteDashboard,
    isDeletingDashboard,
    manageDashboard,
    isManagingDashboard,
    dashboardCreateError,
    dashboardManageError,
    dashboardUpdateError,
  } = useExternalDashboards(WorkspaceId);
  const { workspace } = useWorkspace();
  const [isEnableFilters, setEnableFilters] = useState<boolean>(true);

  const dashboard = dashboards?.find((dash) => dash.id === id);
  const { data } = useExternalDashboardMetricsQuery(
    {
      externalDashboardId: id,
    },
    { enabled: !!id }
  );
  const dashboardMetrics = data?.externalDashboardMetrics;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useEffect(() => {
    if (!dashboardMetrics) return;
    setSelectedIds(
      dashboardMetrics.map((metricRow) => metricRow.externalMetric.id)
    );
  }, [dashboardMetrics]);
  useEffect(() => {
    if (dashboard?.filters.length) setEnableFilters(true);
  }, [dashboard]);
  const submitForm = handleSubmit(async (values: FieldValues) => {
    switch (type) {
      case DashboardFormType.delete: {
        deleteDashboard(
          {
            id,
          },
          {
            onSuccess: () => {
              onSuccess();
              segmentEvent('dashboard deleted', {
                dashboardId: id,
                dashboardName: dashboard?.name,
                workspaceName: workspace?.name,
              });
              navigate('/');
            },
          }
        );
        break;
      }
      case DashboardFormType.edit: {
        updateDashboard(
          {
            id,
            set: {
              name: (values.dashboardName as string).trim(),
              externalDashboardId: (values.dashboardId as string).trim(),
            },
          },
          {
            onSuccess: () => {
              onSuccess();
              segmentEvent('dashboard updated', {
                dashboardId: id,
                dashboardName: dashboard?.name,
                workspaceName: workspace?.name,
              });
            },
          }
        );
        break;
      }
      case DashboardFormType.filter: {
        updateDashboard(
          {
            id,
            set: {
              filters: isEnableFilters
                ? getFilters(
                    values,
                    updateFilter?.isUpdate
                      ? dashboard?.filters?.[0]?.columns?.filter(
                          (item: any) => item.name !== updateFilter.name
                        )
                      : dashboard?.filters?.[0]?.columns || [],
                    updateFilter?.isUpdate
                      ? dashboard?.filters?.[0]?.columns?.find(
                          (item: any) => item.name === updateFilter.name
                        )?.isShowHorizontal
                      : isHorizontalFilter
                  ) || []
                : [],
            },
          },
          {
            onSuccess: () => {
              onSuccess();
              segmentEvent('dashboard filters updated', {
                dashboardId: id,
                dashboardName: dashboard?.name,
                workspaceName: workspace?.name,
                isFilterEnabled: isEnableFilters,
                filterList: getFilters(
                  values,
                  updateFilter?.isUpdate
                    ? dashboard?.filters?.[0]?.columns?.filter(
                        (item: any) => item.name !== updateFilter.name
                      )
                    : dashboard?.filters?.[0]?.columns || [],
                  updateFilter?.isUpdate
                    ? dashboard?.filters?.[0]?.columns?.find(
                        (item: any) => item.name === updateFilter.name
                      )?.isShowHorizontal
                    : isHorizontalFilter
                ),
              });
            },
          }
        );
        break;
      }
      case DashboardFormType.manage: {
        manageDashboard(
          {
            externalDashboardId: id ?? '',
            externalMetricIds: selectedIds,
          },
          {
            onSuccess: () => {
              segmentEvent('manage metric saved', {
                dashboardId: id,
                dashboardName: dashboard?.name,
                workspaceName: workspace?.name,
                metricList: selectedIds,
              });
              onSuccess();
              navigate(0);
              navigate({
                pathname: `/externalDashboard/${id}/`,
                search: `?wid=${WorkspaceId}`,
              });
            },
          }
        );
        onSuccess();

        break;
      }
      default: {
        createDashboard(
          {
            companyId: getCurrentUser()?.companyId,
            name: (values.dashboardName as string).trim(),
            externalDashboardId: (values.dashboardId as string).trim(),
            workspaceId: WorkspaceId ?? workspace?.id,
          },
          {
            onSuccess: (createdData) => {
              if (createdData.insert_externalDashboards_one?.id) {
                onSuccess();
                segmentEvent('dashboard created', {
                  dashboardId: createdData.insert_externalDashboards_one.id,
                  dashboardName: createdData.insert_externalDashboards_one.name,
                });
                const newDashboard =
                  createdData.insert_externalDashboards_one.id ?? '';
                navigate({
                  pathname: `/externalDashboard/${newDashboard}/`,
                  search: `?wid=${WorkspaceId}`,
                });
              }
            },
          }
        );
      }
    }
  });

  const isSaving =
    isCreatingDashboard || isUpdatingDashboard || isManagingDashboard;
  const isError =
    dashboardCreateError || dashboardManageError || dashboardUpdateError;

  return (
    <>
      <form onSubmit={submitForm}>
        <div
          className={`dbn-p-5 dbn-overflow-y-auto dbn-w-[700px] dbn-max-h-[500px] dbn-min-h-[100px] dbn-flex dbn-flex-col dbn-gap-[22px] ${className}`}
        >
          {type === DashboardFormType.delete && (
            <Flex
              justify="center"
              alignItems="center"
              direction="col"
              className="dbn-gap-2 dbn-my-auto"
            >
              <span className="dbn-text-red-500 dbn-text-4xl">
                <Ui.Icons name="delete" color="alert" />
                {/* warning icon */}
              </span>
              <Ui.Text variant="body-text-sm">
                Are you sure you want to delete the Dashboard and its Metrics?
              </Ui.Text>
            </Flex>
          )}
          {type === DashboardFormType.manage && (
            <>
              <Ui.MultiSelectDropdown
                label="Metrics"
                labelVariant="floating"
                buttonWidth="100%"
                menuWidth="660px"
                isSearchEnabled
                isShowSelectedOptions
                options={
                  dashboardMetrics?.map(
                    (metricRow: {
                      externalMetric: { name: any; id: any };
                    }) => ({
                      label: metricRow.externalMetric.name,
                      value: metricRow.externalMetric.id,
                    })
                  ) ?? []
                }
                selectedOption={selectedIds.map((itm) => ({
                  label:
                    dashboardMetrics?.find(
                      (metricRow) => metricRow.externalMetric.id === itm
                    )?.externalMetric.name || '',
                  value: itm || '',
                }))}
                onChange={(selectedOptions) => {
                  setSelectedIds(selectedOptions.map((option) => option.value));
                }}
              />
            </>
          )}
          {(type === DashboardFormType.create ||
            type === DashboardFormType.edit) && (
            <>
              <Ui.InputField
                type="text"
                name="name"
                label="Dashboard Name"
                defaultValue={type === 'Edit Dashboard' ? dashboard?.name : ''}
                placeholder="Dashboard Name"
                register={register('dashboardName', {
                  required: {
                    value: true,
                    message: 'Dashboard name is required',
                  },
                  disabled: isSaving,
                })}
                error={errors.dashboardName?.message}
              />
              <Ui.InputField
                type="text"
                name="dashboardId"
                label="Dashboard ID"
                defaultValue={
                  type === 'Edit Dashboard'
                    ? dashboard?.externalDashboardId
                    : ''
                }
                placeholder="databrain-12"
                register={register('dashboardId', {
                  required: {
                    value: true,
                    message: 'Dashboard ID is required',
                  },
                  disabled: isSaving,
                })}
                error={errors.dashboardId?.message}
              />
            </>
          )}
          {type === DashboardFormType.filter && (
            <>
              {isEnableFilters ? (
                <SchemaFields
                  control={control}
                  setValue={setValue}
                  defaultValues={dashboard?.filters}
                  register={register}
                  globalFilters={watch().columns}
                  isHorizontalFilter={isHorizontalFilter}
                  updateFilter={updateFilter}
                  showDefaultValueField={(index: number) => {
                    const columnData = watch().columns?.[index];
                    return {
                      isShow: columnData?.isShowHorizontal,
                      isShowClientScoped: columnData?.isClientScoped,
                      type: columnData?.as,
                      value: columnData?.defaultValue,
                      name: columnData?.name?.split('--')?.[1],
                      isClientScoped: Boolean(columnData.isClientScoped),
                      clientColumn: columnData.clientColumn,
                      clientColumnType: columnData.clientColumnType,
                      clientId,
                      isManualOptions: columnData.isManualOptions,
                      manualOptions: columnData.manualOptions,
                      dependOn: columnData.dependOn || [],
                      label: columnData.label || '',
                      isShowHorizontal: columnData.isShowHorizontal,
                      isDefault: columnData.isDefault,
                    };
                  }}
                  error={errors}
                />
              ) : (
                <Ui.Alert text="Dashboard filters aren't enabled yet. Click enable filters to start adding dashboard filters." />
              )}
            </>
          )}
          {isError ? (
            <Ui.Text variant="body-text-sm" color="alert">
              Something went wrong! Please try again later!
            </Ui.Text>
          ) : null}
        </div>
        <Ui.ModalFooter className="dbn-justify-between">
          {/* {type === DashboardFormType.filter && (
            <div className="dbn-w-14">
              <Ui.Switch
                enabled={isEnableFilters}
                onChange={setEnableFilters}
                name="editingFilters"
              />
            </div>
          )} */}
          <div className="dbn-ml-auto dbn-flex dbn-gap-4">
            <Ui.Button type="reset" variant="tab" onClick={onCancel}>
              Cancel
            </Ui.Button>
            {type === DashboardFormType.delete ? (
              <Ui.Button type="submit" variant="primary">
                {isDeletingDashboard ? 'Deleting...' : 'Delete'}
              </Ui.Button>
            ) : (
              <Ui.Button type="submit" variant="primary" isDisabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Ui.Button>
            )}
          </div>
        </Ui.ModalFooter>
      </form>
    </>
  );
};

export default ExternalDashboardForm;
