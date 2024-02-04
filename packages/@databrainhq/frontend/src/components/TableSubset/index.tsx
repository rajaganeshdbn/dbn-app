/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react';
import { SelectedTable } from 'types';
import { Ui } from '@databrainhq/plugin';
import { NavLink } from 'react-router-dom';
import { TABLE } from 'consts/application';
import useTenancyLevel from 'hooks/useTenancyLevel';
import SubsetTable from './SubsetTable';
import style from './tableSubset.module.css';
import AccessControl from 'components/AccessControl';

type Props = {
  schemaDataList: any[];
  setSelectedTable: React.Dispatch<React.SetStateAction<SelectedTable>>;
  selectedTable: SelectedTable;
  isLoadingList: any;
  isAllowMetricCreation: boolean;
  onDelete: (id: string, tableName?: string) => void;
  workspaceId: string;
};
const TableSubset = ({
  schemaDataList,
  selectedTable,
  setSelectedTable,
  isLoadingList,
  isAllowMetricCreation,
  onDelete,
  workspaceId,
}: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const { companyTenancyType } = useTenancyLevel();
  useEffect(() => {
    if (selectedTable?.length && isAllowMetricCreation) {
      selectedTable.map((v) => ({
        ...v,
        tableName: v.tableName,
      }));
    }
  }, [selectedTable, isAllowMetricCreation]);
  return (
    <>
      {isAllowMetricCreation && companyTenancyType === TABLE ? (
        <div className="dbn-w-full">
          <SubsetTable
            searchKeyword={searchKeyword}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            schemaDataList={schemaDataList}
            isLoadingList={isLoadingList}
            onDelete={onDelete}
            workspaceId={workspaceId}
          />
          <div className={style['dataset-header']}>
            <AccessControl feature="customDatasets" permission="Create">
              <NavLink
                to={{
                  pathname: '/externalDataset/new/',
                  search: `?wid=${workspaceId}`,
                }}
              >
                <Ui.Button
                  type="button"
                  variant="popover"
                  leftIcon={<Ui.Icons name="plus" size="xs" />}
                >
                  Create Dataset
                </Ui.Button>
              </NavLink>
            </AccessControl>
            <div className={style.search}>
              <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TableSubset;
