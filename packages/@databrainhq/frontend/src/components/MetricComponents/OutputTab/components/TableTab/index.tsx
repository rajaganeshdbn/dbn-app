/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-relative-parent-imports */
import { Ui, types } from '@databrainhq/plugin';
import { useState } from 'react';
import MetricSqlEditor from 'components/MetricSqlEditor';
import useExecuteSqlQuery from 'hooks/useExecuteSqlQuery';
import NoDataFound from '../NoDataFound';
import styles from './tableTab.module.css';

type Props = {
  previewTableDataList: any[] | undefined;
  outpuTableData: any[] | undefined;
  isOutputLoading: boolean;
  outputError: string;
  query: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  setData?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<types.SqlError | undefined>>;
  destinationId?: string;
  dbName?: string;
  clientName?: string;
  isLoading?: boolean;
  setTimeTaken?: React.Dispatch<React.SetStateAction<number>>;
  setLimit?: React.Dispatch<React.SetStateAction<string>>;
  limit?: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onChangePage?: (isPrev: boolean) => void;
  isExternalChart?: boolean;
  isEnablePrevBtn?: boolean;
  isEnableNextBtn?: boolean;
  paginationInfo?: { limit: number; offset: number; totalRecords: number };
};
const TableTab = ({
  outpuTableData,
  outputError,
  isOutputLoading,
  previewTableDataList,
  query,
  clientName,
  dbName,
  destinationId,
  isLoading,
  limit,
  setData,
  setError,
  setLimit,
  setLoading,
  setQuery,
  setTimeTaken,
  isExpanded,
  onToggleExpand,
  isEnableNextBtn,
  isEnablePrevBtn,
  isExternalChart,
  onChangePage,
  paginationInfo,
}: Props) => {
  const tabs = ['Results', 'Sample'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isShowSqlEditor, setShowSqlEditor] = useState(false);
  const { onSqlQuerySubmit, executeQuery } = useExecuteSqlQuery({
    query,
    setData,
    setLoading,
    setError,
    destinationId,
    dbName,
    clientName,
    setTimeTaken,
    limit: limit || '100',
    setQuery,
  });
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <div className={styles.tab}>
          <Ui.Tab
            activeTab={selectedTab}
            options={tabs}
            setActiveTab={setSelectedTab}
          />
        </div>
        <div className="dbn-flex dbn-items-center dbn-gap-2">
          <Ui.Button
            variant="tertiary"
            type="button"
            onClick={() => setShowSqlEditor(true)}
          >
            <div className="dbn-flex dbn-items-center dbn-gap-1">
              <Ui.Icons name="file-sql" />{' '}
              <Ui.Text variant="body-text-sm">Show SQL</Ui.Text>
            </div>
          </Ui.Button>
          <Ui.Button variant="tertiary" type="button" onClick={onToggleExpand}>
            <Ui.Tooltip
              content={
                isExpanded ? (
                  <Ui.Icons name="not-found" /> // expand down icon
                ) : (
                  <Ui.Icons name="not-found" /> // expand up icon
                )
              }
              position="bottom-right"
            >
              Toggle expand table.
            </Ui.Tooltip>
          </Ui.Button>
        </div>
      </div> */}
      <div className={styles.tableContainer}>
        {previewTableDataList?.length && !outpuTableData?.length
          ? previewTableDataList.map((table: any) => (
              <div className={styles.table}>
                <Ui.Table
                  data={table.data}
                  error={table.isError}
                  filterValues={[]}
                  onMaximize={() => {}}
                  isLoading={false}
                  tableName={table.name}
                  key={table.name}
                  tableSettings={{
                    showTableTitle: true,
                    hideVerticalDivider: false,
                    showRowHover: true,
                    enableStripedRows: true,
                    enableTableSearch: true,
                    contentAlignment: 'center',
                    enableFilter: false,
                    enableSorting: true,
                    lineGap: '',
                    showTableDesc: false,
                  }}
                />
              </div>
            ))
          : !outpuTableData?.length && (
              <div className={styles.metricChartEmpty}>
                <NoDataFound message="Choose a table to view the data here" />
                <Ui.Text variant="body-text-sm">
                  Drag and Drop columns to visualize the table
                </Ui.Text>
              </div>
            )}
        {(outpuTableData?.length || outputError) && (
          <Ui.Table
            data={outpuTableData}
            isLoading={isOutputLoading}
            filterValues={[]}
            onMaximize={() => {}}
            error={outputError}
            tableSettings={{
              showTableTitle: true,
              hideVerticalDivider: false,
              showRowHover: true,
              enableStripedRows: true,
              enableTableSearch: true,
              contentAlignment: 'center',
              enableFilter: false,
              enableSorting: true,
              lineGap: '',
              showTableDesc: false,
            }}
            isExternalChart={isExternalChart}
            onChangePage={onChangePage}
            isEnableNextBtn={isEnableNextBtn}
            isEnablePrevBtn={isEnablePrevBtn}
            paginationInfo={paginationInfo}
          />
        )}
      </div>
      <Ui.Modal
        isOpen={isShowSqlEditor}
        onClose={() => setShowSqlEditor(false)}
        enableFullScreenButton
      >
        <div className="dbn-w-[600px] dbn-h-[400px]">
          {setQuery &&
            setData &&
            setLoading &&
            setError &&
            destinationId &&
            dbName && (
              <MetricSqlEditor
                query={query || ''}
                setQuery={setQuery}
                isLoading={isLoading}
                setLimit={setLimit}
                limit={limit}
                onExecute={executeQuery}
                onSubmit={onSqlQuerySubmit}
              />
            )}
        </div>
      </Ui.Modal>
    </div>
  );
};
export default TableTab;
