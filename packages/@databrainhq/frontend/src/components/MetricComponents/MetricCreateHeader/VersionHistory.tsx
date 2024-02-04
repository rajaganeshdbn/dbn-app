import { useState, useCallback } from 'react';
import { Ui } from '@databrainhq/plugin';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import useMetricVersions from 'hooks/useMetricVersions';
import AccessControl from 'components/AccessControl';

const VersionHistory = ({
  isShowVersionModal,
  setShowVersionModal,
}: {
  isShowVersionModal: boolean;
  setShowVersionModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleSubmit, control, watch } = useForm();
  const [isShowSwitchVersionModal, setShowSwitchVersionModal] = useState(false);

  const {
    switchVersion,
    isLoading,
    error,
    loadMore,
    hasMoreData,
    versionsSelectOptions,
    versionsTableData,
  } = useMetricVersions({
    isEnabled: isShowVersionModal,
  });

  const handleFormSubmit = useCallback(
    async (values: FieldValues) => {
      await switchVersion({
        version: Number(values.version),
        onSuccess: () => {
          setShowSwitchVersionModal(false);
          setShowVersionModal(false);
        },
      });
    },
    [switchVersion]
  );

  return (
    <>
      <Ui.Modal
        headerTitle="Version History"
        isOpen={isShowVersionModal}
        onClose={() => setShowVersionModal(false)}
      >
        <div className="dbn-p-5 dbn-max-w-[1200px] dbn-w-[75vw] dbn-max-h-[600px] dbn-h-[75vh] dbn-flex dbn-flex-col dbn-gap-5">
          <AccessControl feature="versionHistory" permission="Switch">
            <Ui.Button
              type="button"
              variant="secondary"
              title="Switch Version"
              onClick={() => setShowSwitchVersionModal(true)}
            >
              Switch Version
            </Ui.Button>
          </AccessControl>
          <Ui.Table
            data={versionsTableData}
            filterValues={[]}
            onMaximize={() => {}}
            tableName="Metric Versions"
            isLoading={isLoading}
            error={error}
            isInfiniteScroll
            hasMoreData={hasMoreData}
            onLoadMore={loadMore}
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
              conditionalFormatting: [
                {
                  columnName: 'Version',
                  rules: [
                    {
                      operator: 'contains',
                      value: 'current',
                      styles: {
                        color: '#5865f6',
                      },
                    },
                    {
                      operator: 'contains',
                      value: 'latest',
                      styles: {
                        color: '#22c55e',
                      },
                    },
                  ],
                },
              ],
            }}
            className="dbn-h-[90%]"
          />
        </div>
      </Ui.Modal>
      <Ui.Modal
        headerTitle="Switch Version"
        isOpen={isShowSwitchVersionModal}
        onClose={() => {
          if (!isLoading) setShowSwitchVersionModal(false);
        }}
      >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="dbn-relative"
        >
          {isLoading && (
            <div className="dbn-absolute dbn-top-0 dbn-bottom-0 dbn-left-0 dbn-right-0 dbn-z-10 dbn-bg-white dbn-bg-opacity-50">
              <Ui.Loader />
            </div>
          )}
          <div className="dbn-w-[400px] dbn-h-[250px] dbn-p-5 dbn-flex dbn-flex-col dbn-gap-[22px] dbn-overflow-y-auto">
            <div className="dbn-flex dbn-flex-col dbn-gap-2">
              <Controller
                control={control}
                name="version"
                render={({ field }) => (
                  <Ui.FloatingDropDown
                    label="Version"
                    placeholder="Select a version"
                    isSearchEnabled
                    options={versionsSelectOptions}
                    selectedOption={{
                      value: field.value,
                      label: field.value,
                    }}
                    onChange={(option) => field.onChange(option.value)}
                    buttonWidth="100%"
                    menuWidth="100%"
                  />
                )}
              />
              <Ui.Text variant="label">
                Select a version to switch or rollback.
              </Ui.Text>
            </div>
            {error ? <Ui.Text variant="label">{error}</Ui.Text> : null}
          </div>
          <Ui.ModalFooter>
            <Ui.Button
              type="button"
              variant="secondary"
              onClick={() => setShowSwitchVersionModal(false)}
            >
              Cancel
            </Ui.Button>
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={!watch('version')}
            >
              Switch
            </Ui.Button>
          </Ui.ModalFooter>
        </form>
      </Ui.Modal>
    </>
  );
};

export default VersionHistory;
