/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { Ui, types } from '@databrainhq/plugin';
import NoData from 'components/Svg/No_data.svg';
import styles from './outputTableTab.module.css';

type Props = {
  data: any[] | undefined;
  isLoading: boolean | undefined;
  error: types.SqlError | undefined;
  isPreview?: boolean;
};
const OutputTable = ({ data, isLoading, error, isPreview }: Props) => {
  const isLoadingData = isLoading && !error && !data?.length;
  const isNoDataToPreview = !data?.length && !isLoading && !error;
  const isData = !!data?.length && !isLoading && !error;
  const isError = error && !data?.length && !isLoading;

  return (
    <div className={styles['outputTable-container']}>
      <div className={styles['ouputTable-header']}>
        <div className={styles['ouputTable-header-features']}>
          {data?.length ? (
            <div className="dbn-w-full dbn-flex dbn-justify-end">
              <Ui.Button type="button" variant="popover">
                <Ui.CsvDownloadButton
                  data={data as Record<string, string>[]}
                  fileName="preview"
                  className="dbn-flex dbn-gap-2"
                  icon={
                    <Ui.NewTooltip text="Download CSV" position="left-bottom">
                      <Ui.Icons name="download" />
                    </Ui.NewTooltip>
                  }
                />
              </Ui.Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles['outputTable-body']}>
        {isLoadingData && (
          <div className={styles['table-loader-container']}>
            <Ui.SkeletonLoader variant="table" />
          </div>
        )}
        {isNoDataToPreview && !isPreview && (
          <div className={styles['ouputTable-no-data']}>
            <img src={NoData} alt="no-data" />
            <div className={styles['ouputTable-no-data-text']}>
              <Ui.Text variant="heading">No Data Tables Queried</Ui.Text>
              <Ui.Text variant="body-text-sm">
                Type your query and input fields beside to generate results and
                explore data
              </Ui.Text>
            </div>
          </div>
        )}
        {!isLoading && isNoDataToPreview && isPreview && (
          <div className="dbn-w-full dbn-h-full dbn-flex dbn-items-center dbn-justify-center">
            No data to preview
          </div>
        )}
        {isError && (
          <div className={styles['ouputTable-error']}>
            <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-5">
              <Ui.Text variant="body-text-sm" color="alert">
                Error: {error.errorMessage}
              </Ui.Text>
              {error.explanation ? (
                <Ui.Text variant="body-text-sm" color="alert">
                  Explanation: {error.explanation}
                </Ui.Text>
              ) : null}
              {error.solution ? (
                <Ui.Text variant="body-text-sm" color="alert">
                  Suggestion: {error.solution}
                </Ui.Text>
              ) : null}
            </div>
          </div>
        )}
        {isData && data.length && (
          <div className={styles['outputTable-table-container']}>
            <Ui.Table
              data={data}
              isLoading={false}
              filterValues={[]}
              onMaximize={() => {}}
              error=""
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
                defaultRowSize: '25',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputTable;
