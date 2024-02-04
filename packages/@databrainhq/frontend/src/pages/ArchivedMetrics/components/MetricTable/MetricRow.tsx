import React, { useState } from 'react';
import { MetricData } from 'types';
import { Ui } from '@databrainhq/plugin';
import DeleteModal from 'components/DeleteModal';
import useExternalArchiveMetric from 'hooks/useExternalArchiveMetric';

type MetricRowProps = MetricData & {
  canPerformActions: boolean;
};

const MetricRow = ({
  id,
  createdBy,
  dashboards,
  dateCreated,
  description,
  name,
  canPerformActions,
}: MetricRowProps) => {
  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'unarchive' | 'delete'>(
    'unarchive'
  );

  const { handleArchiveExternalMetric, handleDeleteExternalMetric, isLoading } =
    useExternalArchiveMetric({
      onSuccess: () => setShowDeleteModal(false),
      externalMetricId: id,
    });

  return (
    <tr className="dbn-border-t">
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
      {canPerformActions && (
        <td className="dbn-px-4 dbn-text-left">
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
          <Ui.Button
            variant="tertiary"
            type="button"
            onClick={() => {
              setModalType('delete');
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Ui.Button>
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
        </td>
      )}
    </tr>
  );
};

export default React.memo(MetricRow);
