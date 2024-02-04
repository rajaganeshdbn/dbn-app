import { Ui } from '@databrainhq/plugin';
import { useMemo } from 'react';
import NoDataFound from 'components/MetricComponents/OutputTab/components/NoDataFound';
import styles from './manageColumns.module.css';

export type ResultsProp = {
  config: {
    data: Record<string, any>[];
    error: string;
    isLoading: boolean;
    isExternalChart?: boolean;
    isEnablePrevBtn?: boolean;
    isEnableNextBtn?: boolean;
    paginationInfo?: { limit: number; offset: number; totalRecords: number };
    onChangePage?: (isPrev: boolean, resetValue?: number) => void;
  };
};
const Results = ({
  config: {
    data,
    error,
    isLoading,
    isEnableNextBtn,
    isEnablePrevBtn,
    isExternalChart,
    onChangePage,
    paginationInfo,
  },
  className,
}: ResultsProp & {
  className?: string;
}) => {
  const isShowNoData = useMemo(
    () => !data.length && !error && !isLoading,
    [data, error, isLoading]
  );
  // TODO: extract pagination in footer
  return (
    <div className={`${styles.resultsContainer} ${className}`}>
      {isShowNoData ? (
        <div className={styles.metricChartEmpty}>
          <NoDataFound message="Choose a table to view the data here" />
          <Ui.Text variant="body-text-sm">
            Drag and Drop columns to visualize the table
          </Ui.Text>
        </div>
      ) : (
        <Ui.Table
          data={data}
          isLoading={isLoading}
          filterValues={[]}
          onMaximize={() => {}}
          error={error}
          tableSettings={{
            showTableTitle: true,
            hideVerticalDivider: true,
            hideHorizontalDivider: true,
            showRowHover: true,
            enableStripedRows: true,
            enableTableSearch: true,
            contentAlignment: 'left',
            enableFilter: false,
            enableSorting: true,
            lineGap: 'small',
            showTableDesc: false,
            isSortAlphabetically: true,
          }}
          isExternalChart={isExternalChart}
          onChangePage={onChangePage}
          isEnableNextBtn={isEnableNextBtn}
          isEnablePrevBtn={isEnablePrevBtn}
          paginationInfo={paginationInfo}
          headerAlignment="left"
        />
      )}
    </div>
  );
};

export default Results;
