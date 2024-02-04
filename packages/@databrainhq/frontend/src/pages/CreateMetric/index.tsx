/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Link } from 'react-router-dom';
import { Ui, consts } from '@databrainhq/plugin';
import { DRAGDROP, TABLE } from 'consts/application';
import MetricCreateHeader from 'components/MetricComponents/MetricCreateHeader';
import SchemaSidebar from 'components/MetricComponents/SchemaSideBar';
import OutputTab from 'components/MetricComponents/OutputTab';
import ExternalMetricForm from 'components/ExternalMetricForm';
import SqlPanel from 'components/MetricSqlEditor/SqlPanel';
import Loader from 'components/Loader';
import PythonPanel from 'components/MetricSqlEditor/PythonPanel';
import useMetricConfig from 'hooks/useMetricConfig';
import useDatasetMetric from 'hooks/useDatasetMetric';
import useDatasetMetricNew from 'hooks/useDatasetMetricNew';
import { getLimitSqlSubQuery } from 'helpers/application/getLimitSqlQuery';
import styles from './createmetric.module.css';
import ChartTypePanel from './components/ChartTypePanel';
import ChartAppearancePanel from './components/ChartAppearancePanel';
import FiltersPanel from './components/FiltersPanel';
import SortPanel from './components/SortPanel';
import JoinPanel from './components/JoinPanel';
import DatasetCreateForm from './components/DatasetCreateForm';
import GroupByPanel from './components/GroupByPanel';
import PreviewCustomSqlResultModal from './components/PreviewCustomSqlResultModal';

const CreateMetric = () => {
  const {
    chartSettings,
    setModalShow,
    setClient,
    companyTenancyType,
    companyIntegration,
    isLoadingQueryData,
    isCompanyIntegrationLoading,
    isModalShow,
    createExternalMetric,
    setDashboardIds,
    dashboardIds,
    setSelectedColumns,
    saveError,
    isShowSchemaTab,
    selectedColumns,
    selectedSchemaList,
    setData,
    setShowSchemaTab,
    setLoading,
    setError,
    setQuery,
    rlsConditions,
    setTimeTaken,
    rlsFilters,
    setRlsConditions,
    setRlsFilters,
    appliedRlsFilters,
    limit,
    datasetSettings,
    setDatasetSettings,
    customSqlColumns,
    setDrillDownSettings,
    drillDownSettings,
    data,
    getGroupByString,
    filters,
    query,
    error,
    drillDownFunc,
    onChangePage,
    isLoading,
    client,
    timeTaken,
    onChangeFilterValue,
    setLimit,
    setChartSettings,
    groupbyList,
    isEnablePivotTable,
    isServerSidePagination,
    isEnableNextBtn,
    isEnablePrevBtn,
    paginationInfo,
    isSaving,
    hasNumberKeys,
    isEnableGauge,
    schemaList,
    schemaMap,
    setGroupByList,
    workspaceId,
    rlsFilterValues,
    isShowChartType,
    setShowChartType,
    enabledCharts,
    onRunSqlQuery,
    isOpenSqlPanel,
    setOpenSqlPanel,
    isShowResults,
    setShowResults,
    isShowChartProperties,
    setShowChartProperties,
    isShowChartActions,
    setShowChartActions,
    clickBehaviourConfigs,
    setClickBehaviourConfigs,
    isShowChartCustomProperties,
    setShowChartCustomProperties,
    setBarRadius,
    onChangeDrillDown,
    onDrillLevelClick,
    dataSecuritySettings,
    setDataSecuritySettings,
    isShowFiltersPanel,
    setShowFiltersPanel,
    isShowSortPanel,
    setShowSortPanel,
    isShowGroupByPanel,
    setShowGroupByPanel,
    isShowJoinPanel,
    setShowJoinPanel,
    id,
    importedMetricId,
    metric,
    updateExternalMetric,
    legendData,
    isCloneModalShow,
    setCloneModalShow,
    isEnableAutoSave,
    setEnableAutoSave,
    switchAxisOptions,
    datasetTableList,
    isResetPallete,
    setResetPallete,
    databaseName,
    isAllClient,
    isOpenPythonPanel,
    setOpenPythonPanel,
    pythonColumns,
    pythonResult,
    onExecutePython,
    isPythonMode,
    pythonCode,
    onChangePythonMode,
    pythonError,
    globalVariableFilters,
    showFormContainer,
    setShowFormContainer,
    currentMetricFilter,
    setCurrentMetricFilter,
    externalDashboardMetricList,
    setEnableDefaultTheme,
    isUpdatedChartTheme,
    setUpdatedChartTheme,
    dashboardId,
    creatorMode,
    setCreatorMode,
    setSqlModeResultState,
    sqlModeResultState,
    isShowCustomSqlModal,
    setShowCustomSqlModal,
    parentPage,
    isPublished,
  } = useMetricConfig();

  const {
    onSaveCreateDataset,
    isDatasetCreateModalShow,
    setDatasetCreateModalShow,
    isCreateVirtualTable,
    setCreateVirtualTable,
    datasetCreateState,
    comparisonLagSettings,
    setComparisonLagSettings,
    onSaveComparisonSettings,
    createNewColumnError,
    onDropColumn,
    selectedMetrics,
    selectedDims,
    functionOptions,
    onRemoveColumn,
    onChangeHelperFunction,
    onChangeAlias,
    selectedJoins,
    setSelectedJoins,
    onGenerateDatasetMetric,
    tableListOptions,
    configuration,
    columnOptions,
    selectedTable,
    isInvalidColModal,
    setInvalidColModal,
    customSql,
    setCustomSql,
    joinTableOption,
    onSaveCustomSQLColumn,
    currentSelectedTable,
    setCurrentSelectedTable,
    createdFilters,
    setCreatedFilters,
    onApplySort,
    isDatabaseTenancy,
    onSaveCustomFilter,
    savedFilterListOptions,
    createdSorts,
    setCreatedSorts,
    onApplyFilter,
    getFilterDropDownType,
    editorRef,
    sortColumnOptions,
    isSqlLoading,
    sqlColumnList,
    onSync,
    clearSelection,
    isSqlTab,
    setSqlTab,
    setChartFields,
    setForecast,
    forecast,
    timeColumn,
    setTimeColumn,
    timeGrainVal,
    setTimeGrainVal,
    dateTimeColumnList,
    onSaveForeCastAction,
    isAllowDrillDown,
    dimModifiers,
    metricModifiers,
    groupByColumOptions,
    selectedGroupBy,
    onSaveGroupBy,
    onChangeGroupColumnSelection,
    isAddRemainingCols,
    setAddRemainingCols,
    onRemainingColsSelection,
    setSubQuery,
    subQuery,
    schemaTableList,
    selectedMainTable,
    setSelectedMainTable,
    selectedAutoCompleteCols,
    setSelectedAutoCompleteCols,
    autoCompleteDropdownOptions,
    onChangeAutoCompleteHelperFunction,
    onChangeAutoCompleteAlias,
    onSubmitSearch,
    isDisableChartDrillDown,
    onUpdateCustomSqlColumn,
    arithmeticColumnOptions,
    onSaveArithMetricOption,
    filterColumnOptions,
    onPreview,
    onDeletCustomColumn,
    onSelectTimeSeries,
    onSelectPivotTable,
    onDrillPivotTable,
    pivotDrillState,
    resetCharSettings,
    onChangeTimeseriesFormat,
  } = useDatasetMetricNew({
    config: {
      tableList: schemaList,
      id,
      creatorMode,
      setCreatorMode,
      importedMetricId,
      clientId: client?.value || '',
      setDrillDown: setDrillDownSettings,
      companyIntegrationId: companyIntegration?.id || '',
      customSqlColumns,
      setChartSettings,
      workspaceId,
      datasetSettings,
      groupbyList,
      setGroupByList,
      drillDownSettings,
      chartSettings,
      dbName: companyIntegration?.name || '',
      selectedSchemaList,
      metricFilters: rlsConditions,
      setMetricFilters: setRlsConditions,
      appliedRlsFilters,
      tenancy: companyTenancyType || '',
      limit,
      setData,
      setError,
      setLoading,
      setQuery,
      setTimeTaken,
      setDatasetSettings,
      rlsValues: rlsFilterValues,
      query,
      data: data || [],
      customDatasetList: datasetTableList,
      databaseName,
      pythonResult,
      isPythonMode,
      pythonCode,
      globalFilters: globalVariableFilters,
      setSqlModeResultState,
      onChangeDrillDown,
    },
  });
  return (
    <div className={styles['main-container']}>
      <MetricCreateHeader
        isDisableBtn={
          !chartSettings.measure?.length &&
          !chartSettings.yAxisList?.filter((item) => item)?.length &&
          !chartSettings.singleValue
        }
        setModalShow={
          isCreateVirtualTable ? setDatasetCreateModalShow : setModalShow
        }
        mainBtnText={
          !isCreateVirtualTable ? 'Save to Dashboard' : 'Save to Dataset'
        }
        backBtnText="Back to Dashboard"
        client={client}
        setClient={setClient}
        companyTenancyType={companyTenancyType}
        id={id}
        autoSave={{
          isSaving,
          isEnabled: isEnableAutoSave,
        }}
        setEnableAutoSave={setEnableAutoSave}
        metricName={metric?.name}
        metricId={metric?.metricId}
        setCloneModalShow={setCloneModalShow}
        metricList={externalDashboardMetricList}
        parentPage={parentPage}
      />
      {isLoadingQueryData && (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      )}
      {!companyIntegration &&
        !isLoadingQueryData &&
        !isCompanyIntegrationLoading && (
          <div className={styles['alt-container']}>
            <div className={styles['alt-wrapper']}>
              <Ui.Text variant="heading">
                No Datawarehouse connected yet
              </Ui.Text>
              <Link to="/onboarding">
                <Ui.Button type="button" variant="primary">
                  Connect
                </Ui.Button>
              </Link>
            </div>
          </div>
        )}
      {!!companyIntegration &&
        !isLoadingQueryData &&
        !isCompanyIntegrationLoading && (
          <div className={styles['main-wrapper']}>
            <Ui.Modal
              isOpen={isModalShow}
              onClose={() => setModalShow(false)}
              headerTitle="Save To Dashboard"
            >
              {metric?.name ? (
                <ExternalMetricForm
                  defaultValues={{
                    name: metric?.name,
                    description: metric?.description,
                    metricId: metric?.metricId,
                    isLive: metric?.isLive,
                    about: '',
                  }}
                  onSubmit={updateExternalMetric}
                  onCancel={() => setModalShow(false)}
                  error={saveError}
                  isSaving={isSaving}
                  dashboardIds={dashboardIds}
                  onDashboardChange={setDashboardIds}
                  isPublished={isPublished}
                />
              ) : (
                <ExternalMetricForm
                  onCancel={() => setModalShow(false)}
                  onSubmit={createExternalMetric}
                  error={saveError}
                  isSaving={isSaving}
                  dashboardId={dashboardId}
                  dashboardIds={dashboardIds}
                  onDashboardChange={setDashboardIds}
                />
              )}
            </Ui.Modal>
            {creatorMode === DRAGDROP ? (
              <div
                className={`${
                  isShowSchemaTab ? 'dbn-w-1/4' : 'dbn-w-6'
                } dbn-border-r dbn-border-secondary dbn-relative`}
              >
                {isShowSchemaTab && (
                  <SchemaSidebar
                    customSqlColumns={customSqlColumns || []}
                    setSelectedColumns={setSelectedColumns}
                    selectedColumns={selectedColumns}
                    selectedDatabase={
                      companyTenancyType === TABLE ? undefined : client.value
                    }
                    dbName={companyIntegration?.name}
                    schemaList={schemaList}
                    schemaMap={schemaMap}
                    onClickVirtualTableCreate={
                      !id
                        ? () => {
                            setShowResults(true);
                            setCreateVirtualTable((prev) => !prev);
                          }
                        : undefined
                    }
                    isCreateVirtualTable={isCreateVirtualTable}
                    datasetTableList={datasetTableList}
                    selectedTable={selectedTable}
                    sqlParams={{
                      setOpenSqlPanel,
                      isSqlTab,
                      sqlColumnList,
                      query: getLimitSqlSubQuery({
                        query: subQuery,
                        dbName: companyIntegration?.name,
                      }),
                      isSqlLoading,
                      error,
                      setShowCustomSqlModal,
                      onPreview,
                      onDeletCustomColumn,
                    }}
                    pythonParams={{
                      setOpenPythonPanel,
                      isPythonMode,
                      isPythonLoading:
                        !pythonColumns?.length && isPythonMode && isLoading,
                      pythonColumns,
                      error: pythonError,
                    }}
                  />
                )}
                <div className={styles.collapseButton}>
                  {isShowSchemaTab ? (
                    <Ui.Button
                      variant="tertiary"
                      onClick={() => setShowSchemaTab(!isShowSchemaTab)}
                      fitContainer
                    >
                      <Ui.Icons name="double-arrow-left" size="xs" />
                    </Ui.Button>
                  ) : (
                    <Ui.Button
                      variant="tertiary"
                      onClick={() => setShowSchemaTab(!isShowSchemaTab)}
                      fitContainer
                    >
                      <Ui.Icons name="double-arrow-right" size="xs" />
                    </Ui.Button>
                  )}
                </div>
              </div>
            ) : null}
            <div
              className={
                isShowSchemaTab && creatorMode === DRAGDROP
                  ? 'dbn-w-3/4 dbn-h-full'
                  : 'dbn-w-full dbn-h-full'
              }
            >
              <OutputTab
                pivotDrillState={pivotDrillState}
                onDrillPivotTable={onDrillPivotTable}
                tenancyLevel={companyTenancyType}
                isAllClient={isAllClient}
                isPythonMode={isPythonMode}
                newMetricConfigProps={{
                  onChangeTimeseriesFormat,
                  onSelectPivotTable,
                  onSubmitSearch,
                  onChangeAutoCompleteAlias,
                  onChangeAutoCompleteHelperFunction,
                  onChangeHelperFunction,
                  onUpdateCustomSqlColumn,
                  onRemoveColumn,
                  onDropColumn,
                  selectedDims,
                  selectedMetrics,
                  functionOptions,
                  onChangeAlias,
                  isInvalidColModal,
                  setInvalidColModal,
                  customSql,
                  joinTableOption,
                  setCustomSql,
                  onSaveCustomSQLColumn,
                  dimModifiers,
                  metricModifiers,
                  isAddRemainingCols,
                  setAddRemainingCols,
                  onRemainingColsSelection,
                  limit,
                  onGenerateDatasetMetric,
                  setLimit,
                  tableList: schemaTableList,
                  currentMetricFilter,
                  setCurrentMetricFilter,
                  showFormContainer,
                  setShowFormContainer,
                  switchAxisOptions,
                  creatorMode,
                  selectedMainTable,
                  setSelectedMainTable,
                  selectedAutoCompleteCols,
                  setSelectedAutoCompleteCols,
                  autoCompleteDropdownOptions,
                  arithmeticColumnOptions,
                  onSaveArithMetricOption,
                }}
                legendData={legendData}
                drillType={drillDownSettings.drillType}
                isLoading={isLoading}
                outputHeaderProps={{
                  isShowResults,
                  setShowResults,
                  setShowChartType,
                  setShowChartActions,
                  setShowChartCustomProperties,
                  setShowFiltersPanel,
                  setShowSortPanel,
                  setShowGroupByPanel,
                  setShowJoinPanel,
                  isCreateVirtualTable,
                }}
                resultsProps={{
                  config: {
                    data: data || [],
                    error: error?.errorMessage || '',
                    isLoading,
                    isEnableNextBtn,
                    isEnablePrevBtn,
                    isExternalChart: isServerSidePagination,
                    onChangePage,
                    paginationInfo,
                  },
                }}
                metricConfig={{
                  createNewColumnError,
                  selectedTable,
                  editorRef,
                  isSqlTab,
                }}
                buttonBadgeProps={{
                  filters: datasetSettings?.configuration?.filters?.length || 0,
                  joins: selectedJoins.length,
                  sort: datasetSettings?.configuration?.orders?.length || 0,
                  groupBy:
                    datasetSettings?.configuration?.groupByColumnList?.length ||
                    0,
                }}
                onDrillLevelClick={onDrillLevelClick}
                data={data}
                dimensions={
                  datasetSettings?.selectedDimensions?.map((value) =>
                    getGroupByString(value || 'none')
                  ) || []
                }
                drillLevel={filters.length || 0}
                isEnableGroupBy={drillDownSettings?.isEnableGroupBy || false}
                onClickSqlTab={() => setOpenSqlPanel(true)}
                clientName={client.value}
                timeTaken={timeTaken}
                rlsConditions={rlsConditions.filter(
                  (rls) => rls.isAddOnMetrics
                )}
                setRlsConditions={setRlsConditions}
                onChangeFilterValue={onChangeFilterValue}
                chartSettings={chartSettings}
                setChartSettings={setChartSettings}
                groupbyList={groupbyList}
                isEnablePivotTable={isEnablePivotTable}
                hasNumberKeys={hasNumberKeys}
                isEnableGauge={isEnableGauge}
                datasetSettings={datasetSettings}
                drilldown={
                  drillDownSettings?.isEnableGroupBy
                    ? (params) => drillDownFunc(params)
                    : undefined
                }
                isExternalChart={isServerSidePagination}
                onChangePage={(isPrev) => {
                  onChangePage(isPrev);
                }}
                isEnableNextBtn={isEnableNextBtn}
                isEnablePrevBtn={isEnablePrevBtn}
                paginationInfo={paginationInfo}
                drillFilters={filters}
              />
            </div>
          </div>
        )}
      <PythonPanel
        isOpen={isOpenPythonPanel}
        onClose={() => setOpenPythonPanel(false)}
        code={pythonCode}
        onRunCode={(code) => {
          clearSelection();
          onExecutePython(code);
        }}
        isPythonMode={isPythonMode}
        isLoading={isLoading}
        onChangeMode={onChangePythonMode}
      />
      <SqlPanel
        databaseName={databaseName}
        isOpen={isOpenSqlPanel}
        onClose={() => setOpenSqlPanel(false)}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        isSqlTab={isSqlTab}
        setSqlTab={setSqlTab}
        onSync={onSync}
        selectedTable={selectedTable}
        onChangeMode={clearSelection}
        setLimit={setLimit}
        limit={limit}
        setSubQuery={setSubQuery}
        subQuery={subQuery}
        onGenerateChart={onGenerateDatasetMetric}
      />
      <ChartTypePanel
        chartTypePanelProps={{
          enabledCharts,
          isOpen: isShowChartType,
          onClose: () => setShowChartType(false),
          onChartChange: (option) => {
            if (option === consts.CHART_TYPES.timeSeries && !pythonCode)
              onSelectTimeSeries(option);
            else if (
              [
                consts.CHART_TYPES.pivotV2,
                consts.CHART_TYPES.timeSeries,
              ].includes(chartSettings.chartType)
            ) {
              resetCharSettings(option);
            } else if (option === consts.CHART_TYPES.pivotV2)
              onSelectPivotTable(option, []);
            else
              setChartFields({
                chartType: option,
              });
            setShowChartType(false);
          },
          selectedChart: chartSettings.chartType,
        }}
      />
      <ChartAppearancePanel
        ChartAppearancePanelProps={{
          onChangeTimeseriesFormat,
          isDisableChartDrillDown,
          tenancyType: companyTenancyType || 'TABLE',
          isSqlTab,
          joinTableOption,
          setChartSettings,
          chartSettings,
          setResetPallete,
          isPythonMode,
          isOpen: isShowChartCustomProperties,
          onClose: () => setShowChartCustomProperties(false),
          setBarRadius,
          comparisonLagProps: {
            comparisonLagSettings,
            setComparisonLagSettings,
            dateTimeColumnList,
            onSaveComparisonLag: onSaveComparisonSettings,
          },
          tableList: schemaList,
          setTimeColumn,
          timeColumn,
          setTimeGrainVal,
          dateTimeColumnList,
          timeGrainVal,
          clickBehaviourConfigs,
          setClickBehaviourConfigs,
          rlsConditions,
          setRlsConditions,
          selectedColumns: selectedColumns || [],
          groupbyList,
          drillDownSettings,
          setDrillDownSettings,
          onChangeDrillDown,
          setForecast,
          forecast,
          onSaveForeCastAction,
          dataSecuritySettings,
          setDataSecuritySettings,
          switchAxisOptions,
          isAllowDrillDown,
          setEnableDefaultTheme,
          isUpdatedChartTheme,
        }}
      />
      <JoinPanel
        JoinPanelProps={{
          columnOptions,
          isOpen: isShowJoinPanel,
          onClose: () => setShowJoinPanel(false),
          tableListOptions,
          selectedJoins,
          setSelectedJoins,
          selectedTable,
          onGenerateDatasetmetric: onGenerateDatasetMetric,
          configuration,
        }}
      />
      <GroupByPanel
        GroupByPanelProps={{
          isOpen: isShowGroupByPanel,
          onClose: () => setShowGroupByPanel(false),
          columnOptions: groupByColumOptions,
          selectedGroupBy,
          onChangeGroupColumnSelection,
          onSaveGroupBy,
          joinTableOption,
          currentSelectedTable,
          setCurrentSelectedTable,
        }}
      />
      <FiltersPanel
        filtersPanelProps={{
          isOpen: isShowFiltersPanel,
          onClose: () => setShowFiltersPanel(false),
          filters: createdFilters,
          setCreatedFilters,
          columnOptions: filterColumnOptions,
          getFilterDropDownType,
          editorRef,
          workspaceId,
          onApplyFilter,
          savedFilterListOptions,
          isDatabaseTenancy,
          joinTableOption,
          currentSelectedTable,
          setCurrentSelectedTable,
          onSaveCustomFilter,
          clientId: client?.value,
          globalFilters: globalVariableFilters,
          rlsConditions,
          rlsValues: rlsFilterValues,
        }}
      />
      <SortPanel
        SortPanelProps={{
          isOpen: isShowSortPanel,
          onClose: () => setShowSortPanel(false),
          createdSorts,
          setCreatedSorts,
          columnOptions: sortColumnOptions,
          onApplySort,
          joinTableOption,
          currentSelectedTable,
          setCurrentSelectedTable,
        }}
      />
      <Ui.Modal
        isOpen={isCloneModalShow}
        onClose={() => setCloneModalShow(false)}
        headerTitle="Clone To Dashboard"
      >
        <ExternalMetricForm
          defaultValues={{
            name: `Copy ${metric?.name}`,
            description: metric?.description,
            metricId: `copy_${metric?.metricId}`,
            isLive: metric?.isLive,
          }}
          onSubmit={createExternalMetric}
          onCancel={() => setCloneModalShow(false)}
          dashboardIds={dashboardIds}
          onDashboardChange={setDashboardIds}
          error={saveError}
        />
      </Ui.Modal>
      <DatasetCreateForm
        datasetCreateFormProps={{
          modalProps: {
            isOpen: isDatasetCreateModalShow,
            onClose: () => setDatasetCreateModalShow(false),
            headerTitle: 'Create Dataset',
          },
          onSaveCreateDataset,
          datasetCreateState,
          dbName: companyIntegration?.name || '',
        }}
      />
      <PreviewCustomSqlResultModal
        props={{
          config: {
            data: sqlModeResultState.data,
            error: sqlModeResultState.error,
            isLoading: sqlModeResultState.isLoading,
          },
          modalProp: {
            isOpen: isShowCustomSqlModal,
            onClose: () => setShowCustomSqlModal(false),
            headerTitle: consts.DBN_SQL_TABLE,
          },
        }}
      />
    </div>
  );
};

export default CreateMetric;
