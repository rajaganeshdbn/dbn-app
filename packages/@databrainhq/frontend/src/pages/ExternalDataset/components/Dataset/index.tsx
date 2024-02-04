/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Ui } from '@databrainhq/plugin';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { required } from 'consts/validations';
import OutputTable from 'components/OutputTable';
import SchemaSidebar from 'components/MetricComponents/SchemaSideBar';
import SqlEditor from 'components/MetricSqlEditor/SqlEditor';
import NoData from 'components/Svg/No_data.svg';
import useExternalDataset from 'hooks/useExternalDataset';
import styles from './dataset.module.css';

const Dataset = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('wid');
  const {
    onSumbitQuery,
    executeQuery,
    query,
    setQuery,
    selectedTab,
    setSelectedTab,
    TABS,
    data,
    error,
    isLoading,
    onPreview,
    columns,
    setColumns,
    selectedTableName,
    setSelectedTableName,
    isOpen,
    setOpen,
    control,
    type,
    register,
    clientColumnOptions,
    isDisableSave,
    onSave,
    isDisabledButton,
    createError,
    limit,
    setLimit,
    schemaList,
    schemaMap,
    setValue,
    watch,
  } = useExternalDataset(id as string, workspaceId);

  return (
    <div className="dbn-h-screen dbn-overflow-hidden dbn-bg-white">
      <div className={styles['dataset-header']}>
        <div className="dbn-flex dbn-gap-2 dbn-items-center">
          <Link to="/">
            <Ui.Button type="button" variant="tab">
              <Ui.Icons name="arrow-left" />
            </Ui.Button>
          </Link>
          <Ui.Text variant="heading-lg">
            {id !== 'new' ? 'Update' : 'Create'} Dataset
          </Ui.Text>
          {/* {type === 'view' && (
            <Ui.Text variant="body-text-sm">
              <Ui.Icons name="table" />
              materialised
            </Ui.Text>
          )} */}
          {/* {type === 'raw' && (
            <Ui.Text variant="body-text-sm">
              <Ui.Icons name="not-found" />
              raw table
            </Ui.Text>
          )} */}
        </div>
        <div className="dbn-flex dbn-items-center dbn-gap-2">
          <Ui.Button
            type="button"
            variant="primary"
            isDisabled={isDisableSave}
            onClick={() => setOpen(true)}
          >
            Save
          </Ui.Button>
        </div>
      </div>
      <div className={styles.datasetContainer}>
        <div className="dbn-h-full dbn-col-span-1 dbn-border-r dbn-border-secondary dbn-overflow-y-auto">
          <SchemaSidebar
            schemaList={schemaList}
            schemaMap={schemaMap}
            sqlParams={{}}
            onSelectTable={(table) =>
              setSelectedTableName(`${table.schemaName}.${table.tableName}`)
            }
            isDatasetMode
            selectedDataset={selectedTableName}
          />
        </div>
        <div className="dbn-col-span-2 dbn-h-full dbn-border-r dbn-border-secondary dbn-flex dbn-flex-col dbn-overflow-hidden">
          <div className="dbn-w-full dbn-h-16 dbn-border-b dbn-border-secondary dbn-flex dbn-items-end">
            <Ui.Tab
              activeTab={selectedTab}
              options={TABS}
              setActiveTab={setSelectedTab}
              className="dbn-flex dbn-w-1/2 dbn-justify-center"
            />
          </div>
          {selectedTab === TABS[0] && (
            <div className="dbn-w-full dbn-h-[calc(100%-4rem)] dbn-flex dbn-flex-col">
              <SqlEditor
                query={query}
                setQuery={setQuery}
                limit={limit}
                setLimit={setLimit}
                isLoading={isLoading}
                onSubmit={onSumbitQuery}
                onExecute={executeQuery as any}
              />
            </div>
          )}
          {selectedTab === TABS[1] && (
            <form
              className="dbn-w-full dbn-h-[calc(100%-4rem)] dbn-p-5 dbn-flex dbn-flex-col dbn-items-center dbn-gap-2 dbn-overflow-hidden dbn-overflow-y-auto"
              onSubmit={onPreview}
            >
              <div className="dbn-w-full dbn-h-[calc(100%-3rem)] dbn-flex dbn-flex-col dbn-gap-5">
                {/* <Ui.FloatingDropDown
                  label="Select Table"
                  placeholder="Select table"
                  options={tableList}
                  selectedOption={{
                    value: selectedTableName,
                    label: selectedTableName,
                  }}
                  onChange={(option) => setSelectedTableName(option.value)}
                  isSearchEnabled
                /> */}
                {selectedTableName ? (
                  <Ui.Button
                    variant="secondary"
                    leftIcon={<Ui.Icons name="table" />}
                  >
                    {selectedTableName}
                  </Ui.Button>
                ) : null}

                <Ui.Text variant="body-text-sm">Configure Columns</Ui.Text>
                <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2 dbn-overflow-y-auto dbn-px-5">
                  {columns.map((c, index: number) => (
                    <div
                      key={c.name}
                      className="dbn-grid dbn-grid-cols-12 dbn-items-center"
                    >
                      <Ui.Button
                        type="button"
                        variant="tertiary"
                        onClick={() => {
                          const updatedColumns = [...columns];
                          updatedColumns[index] = {
                            ...c,
                            selected: !c.selected,
                          };
                          setColumns(updatedColumns);
                        }}
                      >
                        <Ui.Checkbox
                          checked={c.selected}
                          onClick={() => {
                            const updatedColumns = [...columns];
                            updatedColumns[index] = {
                              ...c,
                              selected: !c.selected,
                            };
                            setColumns(updatedColumns);
                          }}
                        />
                      </Ui.Button>
                      <div className="dbn-col-span-6 dbn-flex dbn-items-center dbn-gap-2">
                        {/* <div>
                          <Ui.DataType datatype={c.datatype} />
                        </div> */}
                        <Ui.Text variant="body-text-sm">{c.name}</Ui.Text>
                      </div>
                      <div className="dbn-col-span-5">
                        <Ui.InputField
                          type="text"
                          label="alias"
                          value={c.as}
                          onChange={({ target: { value } }) => {
                            const updatedColumns = [...columns];
                            updatedColumns[index] = {
                              ...c,
                              as: value,
                            };
                            setColumns(updatedColumns);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {columns.length === 0 && (
                    <div className="dbn-h-[400px] dbn-flex dbn-flex-col dbn-gap-2 dbn-items-center dbn-justify-center">
                      <img src={NoData} alt="No table selected" />
                      <Ui.Text>No Table Selected Yet</Ui.Text>
                      <Ui.Text variant="body-text-sm">
                        Select a table from dataset to configure columns
                      </Ui.Text>
                    </div>
                  )}
                </div>
              </div>
              <div className="dbn-w-full dbn-flex dbn-justify-end dbn-px-5">
                <Ui.Button
                  variant="primary"
                  type="submit"
                  isDisabled={!selectedTableName}
                >
                  Preview
                </Ui.Button>
              </div>
            </form>
          )}
        </div>
        <div className="dbn-col-span-2 dbn-h-full dbn-overflow-hidden">
          <OutputTable
            data={data}
            error={error.errorMessage ? error : undefined}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Ui.Modal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        headerTitle={`${id !== 'new' ? 'Update' : 'Create'} Dataset`}
      >
        <form onSubmit={onSave}>
          <div className="dbn-w-96 dbn-h-64 dbn-p-5 dbn-flex dbn-flex-col dbn-gap-[22px] dbn-overflow-y-auto">
            <Ui.HookSelect
              control={control}
              name="type"
              label="Dataset Type"
              options={[
                { value: 'raw', label: 'save existing table' },
                { value: 'view', label: 'create virtual table' },
              ]}
            />
            {type === 'view' && (
              <>
                <Ui.InputField
                  type="text"
                  label="Table name"
                  register={register('tableName', required)}
                  isDisabled={id !== 'new'}
                />
                {id === 'new' && (
                  <Ui.FloatingDropDown
                    options={
                      Object.keys(schemaMap || {}).map((v) => ({
                        value: v,
                        label: v,
                      })) || []
                    }
                    selectedOption={{
                      value: watch('databaseName') || '',
                      label: watch('databaseName') || '',
                    }}
                    onChange={(option) =>
                      setValue('databaseName', option.value)
                    }
                    buttonWidth="100%"
                    menuWidth="300px"
                    label="Schema"
                  />
                )}
              </>
            )}
            <Ui.HookSelect
              control={control}
              name="clientColumn"
              label="Client Column"
              options={clientColumnOptions}
            />
            <Ui.Error message={createError} />
          </div>
          <Ui.ModalFooter>
            <Ui.Button
              variant="tab"
              type="button"
              onClick={() => setOpen(false)}
              isDisabled={isDisabledButton}
            >
              Cancel
            </Ui.Button>
            <Ui.Button
              variant="primary"
              type="submit"
              isDisabled={isDisabledButton}
            >
              Save
            </Ui.Button>
          </Ui.ModalFooter>
        </form>
      </Ui.Modal>
    </div>
  );
};

export default Dataset;
