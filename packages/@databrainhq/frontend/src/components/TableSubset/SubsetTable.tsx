/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { SelectedTable } from 'types';
import { Ui } from '@databrainhq/plugin';
import { Link, NavLink } from 'react-router-dom';
import style from './tableSubset.module.css';
import TableTab from './TableTab';
import useAccessControl from 'hooks/useAccessControl';
import AccessControl from 'components/AccessControl';

type Props = {
  searchKeyword: string;
  setSelectedTable: React.Dispatch<React.SetStateAction<SelectedTable>>;
  selectedTable: SelectedTable;
  schemaDataList: any[];
  isLoadingList: any;
  onDelete: (id: string, tableName?: string) => void;
  workspaceId: string;
};

const SubsetTable = ({
  searchKeyword,
  selectedTable,
  setSelectedTable,
  schemaDataList,
  isLoadingList,
  onDelete,
  workspaceId,
}: Props) => {
  const [hoveredTable, setHovered] = useState<string>('');
  const { getIsCanAccess } = useAccessControl();
  return (
    <div className={style.tableDiv}>
      <table className={style.table}>
        <thead>
          <tr className={style.tableHead}>
            <th className="dbn-w-[60%] dbn-text-left dbn-px-4" scope="col">
              <Ui.Text variant="heading">Tables</Ui.Text>
            </th>
            <th className="dbn-w-[40%]" scope="col">
              <Ui.Text variant="heading">Tables Access</Ui.Text>
            </th>
          </tr>
        </thead>
        <tbody className="dbn-w-full">
          {!isLoadingList &&
            !!schemaDataList.length &&
            schemaDataList
              .filter((table: { tableName: string }) =>
                table.tableName.toLowerCase().includes(searchKeyword)
              )
              .map(
                (table: {
                  tableName: string;
                  id: string;
                  columns: { name: string; datatype: string; as: string }[];
                  clientColumn: string;
                  type?: string;
                }) => (
                  <tr
                    className={style.data}
                    key={table.id}
                    onMouseOver={() => setHovered(table.tableName)}
                    onMouseOut={() => setHovered('')}
                  >
                    <td className="dbn-w-[60%] dbn-px-4">
                      <TableTab
                        name={table.tableName}
                        columnList={table.columns}
                      />
                    </td>
                    <td className="dbn-w-full dbn-relative dbn-px-4 dbn-py-5 dbn-flex dbn-justify-center dbn-items-center">
                      <Ui.Checkbox
                        onChange={({ target: { checked } }) => {
                          if (checked) {
                            setSelectedTable((prev) => [...prev, table]);
                          } else {
                            setSelectedTable((prev) =>
                              prev?.filter(
                                (value) => value.tableName !== table.tableName
                              )
                            );
                          }
                        }}
                        checked={
                          !!selectedTable?.filter(
                            (tab) => tab.tableName === table.tableName
                          ).length
                        }
                        isDisabled={
                          !getIsCanAccess('accessPermissions', 'Edit')
                        }
                      />
                      <div className="dbn-absolute dbn-top-[30%] dbn-right-3">
                        {getIsCanAccess('customDatasets', 'Edit') ||
                        (getIsCanAccess('customDatasets', 'Delete') &&
                          hoveredTable === table.tableName) ? (
                          <Ui.PopoverMenu
                            overFlowDetection={false}
                            position="right-start"
                            menuWidth="100px"
                            buttonContent={
                              <Ui.Icons name="kebab-menu-vertical" />
                            }
                          >
                            <div className={style.popoverMenuBtn}>
                              <AccessControl
                                feature="customDatasets"
                                permission="Edit"
                              >
                                <NavLink
                                  to={{
                                    pathname: `/externalDataset/${table.id}`,
                                    search: `?wid=${workspaceId}`,
                                  }}
                                >
                                  <Ui.Button
                                    variant="popover"
                                    fitContainer
                                    className="dbn-justify-start"
                                  >
                                    Edit
                                  </Ui.Button>
                                </NavLink>
                              </AccessControl>
                              <AccessControl
                                feature="customDatasets"
                                permission="Delete"
                              >
                                <Ui.Button
                                  variant="popover"
                                  className="dbn-justify-start"
                                  fitContainer
                                  onClick={() =>
                                    onDelete(
                                      table.id,
                                      table.type === 'view'
                                        ? table.tableName
                                        : undefined
                                    )
                                  }
                                >
                                  Delete
                                </Ui.Button>
                              </AccessControl>
                            </div>
                          </Ui.PopoverMenu>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )
              )}
          {isLoadingList && !schemaDataList.length && (
            <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-center dbn-items-center">
              <Ui.Icons name="not-found" /> {/* loading icon */}
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubsetTable;
