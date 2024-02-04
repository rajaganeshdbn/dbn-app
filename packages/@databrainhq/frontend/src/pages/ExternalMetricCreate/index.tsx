export {};
// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { Link } from 'react-router-dom';
// import { Ui } from '@databrainhq/plugin';
// import { TABLE } from 'consts/application';
// import MetricCreateHeader from 'components/MetricComponents/MetricCreateHeader';
// import SchemaSidebar from 'components/MetricComponents/SchemaSideBar';
// import OutputTab from 'components/MetricComponents/OutputTab';
// import MetricQueryBar from 'components/MetricComponents/MetricQueryBar';
// import ExternalMetricForm from 'components/ExternalMetricForm';
// import useMetricConfig from 'hooks/useMetricConfig';
// import styles from './externalmetricreate.module.css';

// const ExternalMetricCreate = () => {
//   const {
//     chartSettings,
//     setModalShow,
//     setClient,
//     companyTenancyType,
//     companyIntegration,
//     isLoadingQueryData,
//     isCompanyIntegrationLoading,
//     isModalShow,
//     createExternalMetric,
//     setDashboardIds,
//     dashboardIds,
//     setSelectedColumns,
//     saveError,
//     isShowSchemaTab,
//     selectedColumns,
//     selectedSchemaList,
//     isGenerating,
//     generateExternalQuery,
//     schema,
//     timeGrainValue,
//     setTimeGrainValue,
//     user,
//     setData,
//     setShowSchemaTab,
//     setLoading,
//     setError,
//     setQuery,
//     rlsConditions,
//     setTimeTaken,
//     rlsFilters,
//     setRlsConditions,
//     setRlsFilters,
//     appliedRlsFilters,
//     limit,
//     datasetSettings,
//     setDatasetSettings,
//     customSqlColumns,
//     setDrillDownSettings,
//     drillDownSettings,
//     isShowTimeGroupData,
//     data,
//     timeGroupData,
//     getGroupByString,
//     filters,
//     query,
//     error,
//     drillDownFunc,
//     onChangePage,
//     previewTableDataList,
//     isLoading,
//     client,
//     timeTaken,
//     onChangeFilterValue,
//     setLimit,
//     setChartSettings,
//     groupbyList,
//     isEnablePivotTable,
//     isServerSidePagination,
//     isEnableNextBtn,
//     isEnablePrevBtn,
//     paginationInfo,
//     isSaving,
//     hasNumberKeys,
//     isEnableGauge,
//     schemaList,
//     schemaMap,
//     setGroupByList,
//     workspaceId,
//     rlsFilterValues,
//     onDrillLevelClick,
//     isShowChartType,
//     setShowChartType,
//     onRunSqlQuery
//   } = useMetricConfig();
//   return (
//     <div className={styles['main-container']}>
//       <MetricCreateHeader
//         isDisableBtn={
//           !chartSettings.measure?.length &&
//           !chartSettings.yAxisList?.filter((item) => item)?.length &&
//           !chartSettings.singleValue
//         }
//         setModalShow={setModalShow}
//         mainBtnText="Save to Dashboard"
//         backBtnText="Back to Dashboard"
//         client={client}
//         setClient={setClient}
//         companyTenancyType={companyTenancyType}
//       />
//       {isLoadingQueryData && (
//         <div className={styles['loader-container']}>
//           <Ui.Icons name="not-found" /> {/* loading icon */}
//         </div>
//       )}
//       {!companyIntegration &&
//         !isLoadingQueryData &&
//         !isCompanyIntegrationLoading && (
//           <div className={styles['alt-container']}>
//             <div className={styles['alt-wrapper']}>
//               <Ui.Text variant="heading">
//                 No Datawarehouse connected yet
//               </Ui.Text>
//               <Link to="/onboarding">
//                 <Ui.Button type="button" variant="primary">
//                   Connect
//                 </Ui.Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       {!!companyIntegration &&
//         !isLoadingQueryData &&
//         !isCompanyIntegrationLoading && (
//           <div className={styles['main-wrapper']}>
//             <Ui.Modal
//               isOpen={isModalShow}
//               onClose={() => setModalShow(false)}
//               headerTitle="Save To Dashboard"
//             >
//               <ExternalMetricForm
//                 onCancel={() => setModalShow(false)}
//                 onSubmit={createExternalMetric}
//                 dashboardIds={dashboardIds}
//                 onDashboardChange={setDashboardIds}
//                 error={saveError}
//                 isSaving={isSaving}
//               />
//             </Ui.Modal>
//             <div
//               className={`${
//                 isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-1/4'
//               } dbn-flex`}
//             >
//               <div
//                 className={`${
//                   isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-4'
//                 } dbn-border-r dbn-divide-solid dbn-relative`}
//               >
//                 {isShowSchemaTab && (
//                   <SchemaSidebar
//                     setSelectedColumns={setSelectedColumns}
//                     selectedColumns={selectedColumns}
//                     selectedDatabase={
//                       companyTenancyType === TABLE ? undefined : client.value
//                     }
//                     dbName={companyIntegration?.name}
//                     schemaList={schemaList}
//                     schemaMap={schemaMap}
//                   />
//                 )}
//                 <div
//                   className={`${styles.collapseButton} dbn-bg-gray-300 ${
//                     isShowSchemaTab ? '' : 'dbn-rotate-180'
//                   }`}
//                 >
//                   <Ui.Button
//                     type="button"
//                     variant="primary"
//                     onClick={() => setShowSchemaTab(!isShowSchemaTab)}
//                   >
//                     <Ui.Icons name="not-found" />
//                     {/* collapse left */}
//                   </Ui.Button>
//                 </div>
//               </div>
//               <div
//                 className={`${
//                   isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-full'
//                 } dbn-border-r dbn-divide-solid`}
//               >
//                 <MetricQueryBar
//                   selectedSchemaList={selectedSchemaList}
//                   isLoading={isGenerating}
//                   onSubmit={generateExternalQuery}
//                   isDisable={!schema.length}
//                   client={client}
//                   setClient={setClient}
//                   timeGrainValue={timeGrainValue}
//                   setTimeGrainValue={setTimeGrainValue}
//                   companyId={user?.companyId as string}
//                   setData={setData}
//                   setLoading={setLoading}
//                   setError={setError}
//                   setQuery={setQuery}
//                   database={companyIntegration?.name as string}
//                   joinColumnList={selectedColumns?.map((c) => ({
//                     value: `${c.schemaName}.${c.tableName}.${c.column}`,
//                     label: `${c.schemaName}.${c.tableName}.${c.column}`,
//                   }))}
//                   rlsConditions={rlsConditions}
//                   setRlsConditions={setRlsConditions}
//                   rlsFilters={rlsFilters}
//                   setRlsFilters={setRlsFilters}
//                   chartSettings={chartSettings}
//                   datasetMetricConfig={{
//                     clientId: client?.value || '',
//                     selectedColumns: selectedColumns || [],
//                     setDrillDown: setDrillDownSettings,
//                     companyIntegrationId: companyIntegration?.id || '',
//                     customSqlColumns,
//                     setChartSettings,
//                     workspaceId,
//                     datasetSettings,
//                     setGroupByList,
//                     drillDownSettings,
//                     chartSettings,
//                     dbName: companyIntegration?.name || '',
//                     selectedSchemaList,
//                     rlsFilters,
//                     setRlsFilters,
//                     metricFilters: rlsConditions,
//                     setMetricFilters: setRlsConditions,
//                     appliedRlsFilters,
//                     tenancy: companyTenancyType || '',
//                     limit,
//                     setData,
//                     setError,
//                     setLoading,
//                     setQuery,
//                     setTimeTaken,
//                     setDatasetSettings,
//                     rlsValues: rlsFilterValues,
//                   }}
//                 />
//               </div>
//             </div>
//             <div className={isShowSchemaTab ? 'dbn-w-1/2' : 'dbn-w-3/4'}>
//               <OutputTab
//                 onDrillLevelClick={onDrillLevelClick}
//                 data={isShowTimeGroupData ? timeGroupData : data}
//                 dimensions={
//                   datasetSettings?.selectedDimensions?.map((value) =>
//                     getGroupByString(value || 'none')
//                   ) || []
//                 }
//                 // onRunSqlQuery={onRunSqlQuery}
//                 drillLevel={filters.length || 0}
//                 isEnableGroupBy={drillDownSettings?.isEnableGroupBy || false}
//                 // query={query}
//                 // error={error}
//                 isLoading={isLoading}
//                 // setQuery={setQuery}
//                 // setData={setData}
//                 // setLoading={setLoading}
//                 // setError={setError}
//                 // destinationId={companyIntegration.id}
//                 // dbName={companyIntegration.name}
//                 previewTableDataList={previewTableDataList?.filter(
//                   (table) => table
//                 )}
//                 clientName={client.value}
//                 timeTaken={timeTaken}
//                 setTimeTaken={setTimeTaken}
//                 rlsConditions={rlsConditions.filter(
//                   (rls) => rls.isAddOnMetrics
//                 )}
//                 onChangeFilterValue={onChangeFilterValue}
//                 setLimit={setLimit}
//                 limit={limit}
//                 chartSettings={chartSettings}
//                 setChartSettings={setChartSettings}
//                 groupbyList={groupbyList}
//                 isEnablePivotTable={isEnablePivotTable}
//                 hasNumberKeys={hasNumberKeys}
//                 isEnableGauge={isEnableGauge}
//                 datasetSettings={datasetSettings}
//                 drilldown={
//                   drillDownSettings?.isEnableGroupBy
//                     ? (params) => drillDownFunc(params)
//                     : undefined
//                 }
//                 isExternalChart={isServerSidePagination}
//                 onChangePage={(isPrev) => {
//                   onChangePage(isPrev);
//                 }}
//                 isEnableNextBtn={isEnableNextBtn}
//                 isEnablePrevBtn={isEnablePrevBtn}
//                 paginationInfo={paginationInfo}
//                 isShowChartType={isShowChartType}
//                 setShowChartType={setShowChartType}
//               />
//             </div>
//           </div>
//         )}
//     </div>
//   );
// };

// export default ExternalMetricCreate;
