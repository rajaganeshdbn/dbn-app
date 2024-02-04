/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui, types } from '@databrainhq/plugin';
import { CreateNewSort } from 'types/metric';
import { SORT_TYPE } from 'consts/values';
import NoDataFound from 'components/MetricComponents/OutputTab/components/NoDataFound';
import useAccessControl from 'hooks/useAccessControl';
import AccessControl from 'components/AccessControl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  createdSorts: CreateNewSort[];
  setCreatedSorts: React.Dispatch<React.SetStateAction<CreateNewSort[]>>;
  columnOptions: types.FloatingDropDownOption[];
  onApplySort: (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => void;
  joinTableOption: types.FloatingDropDownOption[];
  currentSelectedTable: types.FloatingDropDownOption;
  setCurrentSelectedTable: React.Dispatch<
    React.SetStateAction<types.FloatingDropDownOption>
  >;
};
const SortPanel = ({
  SortPanelProps: {
    isOpen,
    onClose,
    createdSorts,
    setCreatedSorts,
    columnOptions,
    onApplySort,
    currentSelectedTable,
    joinTableOption,
    setCurrentSelectedTable,
  },
}: {
  SortPanelProps: Props;
}) => {
  const { getIsCanAccess } = useAccessControl();
  return (
    <Ui.Panel
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      side="right"
      hideFooter
      headerTitle="Sorts"
    >
      {createdSorts.length ? (
        <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-justify-between dbn-p-5">
          <div className="dbn-flex dbn-flex-col dbn-gap-4">
            <div className="dbn-w-full dbn-flex dbn-justify-between dbn-items-center">
              <div className="dbn-w-full dbn-flex dbn-flex-wrap dbn-gap-2">
                {joinTableOption?.map((table) => (
                  <Ui.Button
                    variant={
                      currentSelectedTable?.value === table?.value
                        ? 'secondary'
                        : 'tab'
                    }
                    onClick={() => setCurrentSelectedTable(table)}
                    isDisabled={!getIsCanAccess('sorts', 'Edit')}
                  >
                    {table.label}
                  </Ui.Button>
                ))}
              </div>
              <AccessControl feature="sorts" permission="Delete">
                <Ui.Button
                  variant="popover"
                  onClick={() => {
                    setCreatedSorts([]);
                    onApplySort(() => setCreatedSorts([]), true);
                  }}
                >
                  Clear all
                </Ui.Button>
              </AccessControl>
            </div>
            {createdSorts.map((sort, index) =>
              sort.tableName?.value !== currentSelectedTable.value ? (
                <></>
              ) : (
                <div
                  className="dbn-w-full dbn-flex dbn-gap-3 dbn-items-center"
                  key={`${sort.columnName.value}_${sort.tableName.value}_${
                    sort.method.value
                  }_${index?.toString()}`}
                >
                  <Ui.FloatingDropDown
                    onChange={(value) =>
                      setCreatedSorts((prev) =>
                        prev.map((s, i) =>
                          i === index ? { ...s, columnName: value } : s
                        )
                      )
                    }
                    options={columnOptions}
                    selectedOption={sort.columnName}
                    buttonWidth="300px"
                    menuWidth="300px"
                    isDisabled={!getIsCanAccess('sorts', 'Edit')}
                  />
                  <Ui.FloatingDropDown
                    onChange={(value) =>
                      setCreatedSorts((prev) =>
                        prev.map((s, i) =>
                          i === index ? { ...s, method: value } : s
                        )
                      )
                    }
                    options={SORT_TYPE}
                    selectedOption={sort.method}
                    buttonWidth="200px"
                    menuWidth="200px"
                    isDisabled={!getIsCanAccess('sorts', 'Edit')}
                  />
                  <AccessControl feature="sorts" permission="Delete">
                    <Ui.Button
                      variant="popover"
                      onClick={() => {
                        setCreatedSorts((prev) =>
                          prev.filter((f, i) => i !== index)
                        );
                        onApplySort(
                          () =>
                            setCreatedSorts(
                              createdSorts.filter((f, i) => i !== index)
                            ),
                          false,
                          index
                        );
                      }}
                    >
                      <Ui.Icons name="delete" />
                    </Ui.Button>
                  </AccessControl>
                </div>
              )
            )}
            <AccessControl feature="sorts" permission="Edit">
              <Ui.Button
                variant="popover"
                leftIcon={<Ui.Icons name="plus" />}
                onClick={() =>
                  setCreatedSorts((prev) => [
                    ...prev,
                    {
                      columnName: { label: '', value: '' },
                      method: SORT_TYPE[0],
                      tableName: currentSelectedTable,
                    },
                  ])
                }
              >
                Add Sort
              </Ui.Button>
            </AccessControl>
          </div>
          <div className="dbn-w-full dbn-flex  dbn-h-[50px] dbn-items-end dbn-justify-end dbn-gap-5">
            <Ui.Button variant="secondary" onClick={() => onClose()}>
              Cancel
            </Ui.Button>
            <AccessControl feature="sorts" permission="Edit">
              <Ui.Button variant="primary" onClick={() => onApplySort(onClose)}>
                Apply Sort
              </Ui.Button>
            </AccessControl>
          </div>
        </div>
      ) : (
        <>
          <NoDataFound message="No Sort Created">
            <div className="dbn-p-5">
              <AccessControl
                feature="sorts"
                permission="Edit"
                fallback={
                  <Ui.Alert
                    variant="error"
                    text="You don't have permission to add sort."
                  />
                }
              >
                <Ui.Button
                  variant="secondary"
                  leftIcon={<Ui.Icons name="plus" />}
                  onClick={() =>
                    setCreatedSorts((prev) => [
                      ...prev,
                      {
                        columnName: { label: '', value: '' },
                        method: SORT_TYPE[0],
                        tableName: currentSelectedTable,
                      },
                    ])
                  }
                >
                  Add Sort
                </Ui.Button>
              </AccessControl>
            </div>
          </NoDataFound>
        </>
      )}
    </Ui.Panel>
  );
};

export default SortPanel;
