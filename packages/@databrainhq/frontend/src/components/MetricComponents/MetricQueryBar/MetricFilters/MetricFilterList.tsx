import { Ui, types } from '@databrainhq/plugin';
import { useState } from 'react';
import CompletedStatus from 'components/CompletedStatus';
import DeleteModal from 'components/DeleteModal';

const MetricFilterList = ({
  conditions,
  onApply,
  onRemove,
  onDelete,
}: {
  onApply: (condition: types.RlsCondition) => void;
  onRemove: (remove: types.RlsCondition) => void;
  onDelete: (condition: types.RlsCondition) => void;
  conditions: types.RlsCondition[];
}) => {
  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  return (
    <div className="dbn-w-[990px] dbn-h-[400px] dbn-flex dbn-flex-col dbn-justify-between dbn-overflow-y-auto dbn-p-5">
      <table className="dbn-w-full" cellPadding={5}>
        <thead className="dbn-text-left">
          <tr className="dbn-bg-slate-200">
            <th className="dbn-p-2.5 dbn-text-[#182C60]">Name</th>
            <th className="dbn-p-2.5 dbn-text-[#182C60]">Column</th>
            <th className="dbn-p-2.5 dbn-text-[#182C60]">Datatype</th>
            <th className="dbn-p-2.5 dbn-text-[#182C60]">Apply on metric</th>
            <th className="dbn-p-2.5 dbn-text-[#182C60]">App Filter</th>
            {/* <th className="dbn-p-2.5 dbn-text-[#182C60]">Update</th> */}
            <th className="dbn-p-2.5 dbn-text-[#182C60]">Delete</th>
          </tr>
        </thead>
        <tbody>
          {conditions.map((condition) => (
            <>
              <tr
                key={`${condition.name}_${condition.tableName}_${condition.columnName}`}
              >
                <td className="dbn-p-2.5 dbn-text-[#182C60]">
                  {condition.name}
                </td>
                <td className="dbn-p-2.5 dbn-text-[#182C60]">
                  {condition.columnName}
                </td>
                <td className="dbn-p-2.5 dbn-text-[#182C60]">
                  {condition.datatype}
                </td>

                <td className="dbn-p-2.5">
                  {condition.isAddOnMetrics ? (
                    <span className="dbn-flex dbn-items-center dbn-gap-5">
                      <CompletedStatus text="Applied" />
                      <Ui.Button
                        onClick={() => onRemove(condition)}
                        variant="tertiary"
                        type="button"
                        leftIcon={<Ui.Icons name="cross" />}
                      />
                    </span>
                  ) : (
                    <Ui.Checkbox onChange={() => onApply(condition)} />
                  )}
                </td>
                <td className="dbn-p-2.5 dbn-text-[#182C60]">
                  {condition.isAppFilter && (
                    <Ui.Text variant="body-text-sm">
                      {/* <CheckIcon /> */} <Ui.Checkbox />
                    </Ui.Text>
                  )}
                </td>
                {/* <td>update</td> */}
                <td>
                  <Ui.Button
                    variant="tertiary"
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    leftIcon={<Ui.Icons name="delete" />}
                  />
                </td>
              </tr>
              <DeleteModal
                isShowDeleteModal={isShowDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onDelete={() => {
                  onDelete(condition);
                  setShowDeleteModal(false);
                }}
                title="Delete Metric Filters"
                alertMessage="Are you sure you want to delete this metric filter?"
              />
            </>
          ))}
          {conditions.length === 0 && (
            <tr>
              <td colSpan={5} className="dbn-text-center">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MetricFilterList;
