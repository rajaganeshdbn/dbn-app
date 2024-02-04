import React, { useState } from 'react';
import { MetricData } from 'types';
import { useNavigate } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import CompletedStatus from 'components/CompletedStatus';
import useExternalDashboards from 'hooks/useExternalDashboard';
import { DashboardType } from 'hooks/useMetric';

const MetricRow = ({
  id,
  createdBy,
  dashboards,
  dateCreated,
  description,
  name,
}: MetricData) => {
  const navigate = useNavigate();
  const [dashboardIds, setDashboardIds] = useState<DashboardType['id'][]>([]);
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
    externalDashboardId: dId,
    externalMetricId: id,
  }));
  return (
    <tr key={id} className="dbn-border-t">
      <td className="dbn-px-4 dbn-py-4 dbn-text-left dbn-flex dbn-flex-col dbn-gap-2">
        <Ui.Text variant="body-text-sm">{name}</Ui.Text>
        <div className="dbn-flex dbn-gap-2 dbn-items-center dbn-justify-start">
          {dashboards.map((d) => (
            <span className="dbn-bg-[#F4F6FC] dbn-p-1 dbn-rounded dbn-font-normal dbn-text-xs">
              {d.name}
            </span>
          ))}
        </div>
      </td>
      <td className="dbn-px-4 dbn-text-left">
        <Ui.Text variant="body-text-sm">{description || 'N/A'}</Ui.Text>
      </td>
      <td className="dbn-px-4 dbn-text-left">
        <Ui.Text variant="body-text-sm">{createdBy}</Ui.Text>
      </td>
      <td className="dbn-px-4 dbn-text-left">
        <Ui.Text variant="body-text-sm">{dateCreated.substring(0, 10)}</Ui.Text>
      </td>
      <td className="dbn-px-4 dbn-text-left">
        {dashboards.length ? (
          <div className="">
            <CompletedStatus text="Published" />
          </div>
        ) : (
          <Ui.Button
            variant="primary"
            type="button"
            onClick={() => setShowForm(true)}
          >
            Publish
          </Ui.Button>
        )}
        <Ui.Modal
          headerTitle="Publish Metric To Dashboard"
          isOpen={isShow}
          onClose={() => setShowForm(false)}
        >
          <div className="dbn-p-5 dbn-rounded dbn-w-[400px] dbn-h-[200px]">
            <Ui.MultiSelect
              label="Dashboards"
              options={dashboardOptions}
              name="dashboards"
              placeHolder="Choose dashboard/s from the list"
              value={dashboardIds}
              onChange={setDashboardIds}
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
                      segmentEvent('metric published', {
                        id,
                        name,
                        description,
                      });
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
      </td>
    </tr>
  );
};

export default React.memo(MetricRow);
