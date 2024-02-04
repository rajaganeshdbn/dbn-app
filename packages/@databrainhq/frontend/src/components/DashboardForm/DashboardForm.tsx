import React, { useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useGetDashboardMetricsQuery } from 'utils/generated/graphql';
import { useNavigate, useParams } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import Flex from 'components/Flex';
import useDashboards from 'hooks/useDashboards';
import { getCurrentUser } from 'helpers/application/auth';

export enum DashboardFormType {
  create = 'Create',
  rename = 'Rename Dashboard',
  delete = 'Delete Dashboard',
  manage = 'Manage Metrics',
}

export type DashboardFormProps =
  // Omit<
  //   FloatingDropDownProps,
  //   'selectedOption' | 'onChange' | 'options'
  // > &
  {
    onSuccess: () => void;
    onCancel: () => void;
    className?: string;
    type?: DashboardFormType;
  };

const DashboardForm: React.FC<DashboardFormProps> = ({
  onSuccess,
  onCancel,
  className,
  type = 'Create',
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
  } = useDashboards();
  const name = dashboards?.find((dash) => dash.id === id)?.name;
  const { data } = useGetDashboardMetricsQuery({
    dashboardId: id,
  });
  const dashboardMetrics = data?.dashboardMetrics;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isHeight, setHeight] = useState(false);

  useEffect(() => {
    if (!dashboardMetrics) return;
    setSelectedIds(dashboardMetrics.map((metricRow) => metricRow.metric.id));
  }, [dashboardMetrics]);

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
              navigate('/');
            },
          }
        );
        break;
      }
      case DashboardFormType.rename: {
        updateDashboard(
          {
            id,
            name: values.dashboardName,
          },
          {
            onSuccess,
          }
        );
        break;
      }
      case DashboardFormType.manage: {
        manageDashboard(
          {
            dashboardId: id ?? '',
            metricIds: selectedIds,
          },
          {
            onSuccess: () => {
              onSuccess();
              navigate(0);
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
            name: values.dashboardName,
          },
          {
            onSuccess: (createdData) => {
              onSuccess();
              const newDashboard = createdData.insert_dashboards_one?.id ?? '';
              navigate(`/${newDashboard}`);
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
      <form
        onSubmit={submitForm}
        className={`dbn-w-[500px] dbn-flex dbn-flex-col dbn-justify-between ${
          className ?? ''
        }`}
      >
        <div
          className={`dbn-px-5 dbn-py-3 dbn-flex dbn-flex-col dbn-gap-2${
            type === DashboardFormType.create ||
            type === DashboardFormType.rename
              ? 'dbn-mb-5'
              : ''
          } ${isHeight ? 'dbn-h-[320px]' : ''}`}
        >
          {type === DashboardFormType.delete && (
            <Flex
              justify="center"
              alignItems="center"
              direction="col"
              className="dbn-gap-2"
            >
              <span className="dbn-text-red-500 dbn-text-2xl">
                <Ui.Icons name="not-found" />
                {/* warning icon */}
              </span>
              <Ui.Text variant="body-text-sm">
                Are you sure you want to delete the Dashboard and its Metrics?
              </Ui.Text>
            </Flex>
          )}
          {type === DashboardFormType.manage && (
            <Ui.MultiSelect
              name="metrics"
              value={selectedIds}
              onChange={setSelectedIds}
              options={
                dashboardMetrics?.map((metricRow) => ({
                  label: metricRow.metric.name,
                  value: metricRow.metric.id,
                })) ?? []
              }
              onClick={() => setHeight((s) => !s)}
            />
          )}
          {(type === DashboardFormType.create ||
            type === DashboardFormType.rename) && (
            <Ui.InputField
              type="text"
              name="name"
              label="Dashboard Name"
              defaultValue={type === 'Rename Dashboard' ? name : ''}
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
          )}
          {isError ? (
            <Ui.Text variant="body-text-sm">
              Something went wrong! Please try again later!
            </Ui.Text>
          ) : null}
        </div>
        <Flex
          justify="center"
          alignItems="center"
          className="dbn-mt-2 dbn-border-t dbn-border-gray-300 dbn-p-2 dbn-gap-6 dbn-h-16"
        >
          <Ui.Button type="reset" variant="secondary" onClick={onCancel}>
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
        </Flex>
      </form>
    </>
  );
};

export default DashboardForm;
