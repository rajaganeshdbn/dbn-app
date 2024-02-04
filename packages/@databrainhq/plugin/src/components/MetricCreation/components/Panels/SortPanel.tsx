/* eslint-disable react/forbid-dom-props */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react';
import { Panel } from '@/components/Panel';
import { Button } from '@/components/Button';
import { FloatingDropDown } from '@/components/FloatingDropDown';
import { Icons } from '@/components/Icons';
import NoData from '@/components/Svg/No_data.svg';
import { CreateNewSort, FloatingDropDownOption } from '@/types';
import { SORT_TYPE } from '@/consts';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  createdSorts: CreateNewSort[];
  setCreatedSorts: React.Dispatch<React.SetStateAction<CreateNewSort[]>>;
  columnOptions: FloatingDropDownOption[];
  onApplySort: (
    onComplete: () => void,
    isClear?: boolean,
    index?: number
  ) => void;
  selectedTable: FloatingDropDownOption;
};
const SortPanel = ({
  SortPanelProps: {
    isOpen,
    onClose,
    createdSorts,
    setCreatedSorts,
    columnOptions,
    onApplySort,
    selectedTable,
  },
}: {
  SortPanelProps: Props;
}) => {
  return (
    <Panel
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
            <div className="dbn-w-full dbn-flex dbn-justify-end dbn-items-center">
              <Button
                variant="popover"
                onClick={() => {
                  setCreatedSorts([]);
                  onApplySort(() => setCreatedSorts([]), true);
                }}
              >
                Clear all
              </Button>
            </div>
            {createdSorts.map((sort, index) => (
              <div
                className="dbn-w-full dbn-flex dbn-gap-3 dbn-items-center"
                key={`${sort.columnName.value}_${sort.tableName.value}_${
                  sort.method.value
                }_${index?.toString()}`}
              >
                <FloatingDropDown
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
                />
                <FloatingDropDown
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
                />
                <Button
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
                  <Icons name="delete" />
                </Button>
              </div>
            ))}
            <Button
              variant="popover"
              leftIcon={<Icons name="plus" />}
              onClick={() =>
                setCreatedSorts((prev) => [
                  ...prev,
                  {
                    columnName: { label: '', value: '' },
                    method: SORT_TYPE[0],
                    tableName: selectedTable,
                  },
                ])
              }
            >
              Add Sort
            </Button>
          </div>
          <div className="dbn-w-full dbn-flex  dbn-h-[50px] dbn-items-end dbn-justify-end dbn-gap-5">
            <Button variant="secondary" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => onApplySort(onClose)}>
              Apply Sort
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="dbn-w-full dbn-h-full dbn-flex dbn-items-center dbn-justify-center dbn-flex-col dbn-gap-4">
            <img
              src={NoData}
              alt="no data"
              style={{ width: '300px', height: '300px' }}
            />
            <Button
              variant="secondary"
              leftIcon={<Icons name="plus" />}
              onClick={() =>
                setCreatedSorts((prev) => [
                  ...prev,
                  {
                    columnName: { label: '', value: '' },
                    method: SORT_TYPE[0],
                    tableName: selectedTable,
                  },
                ])
              }
            >
              Add Sort
            </Button>
          </div>
        </>
      )}
    </Panel>
  );
};

export default SortPanel;
