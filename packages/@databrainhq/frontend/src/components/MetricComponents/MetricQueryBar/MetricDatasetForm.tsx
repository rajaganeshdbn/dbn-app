export {};
// /* eslint-disable @typescript-eslint/no-use-before-define */
// /* eslint-disable no-duplicate-case */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react';
// import { Ui, types, consts } from '@databrainhq/plugin';
// import {
//   Control,
//   FieldErrors,
//   FieldValues,
//   UseFieldArrayAppend,
//   UseFieldArrayRemove,
//   UseFormRegister,
// } from 'react-hook-form';
// import ReactAce from 'react-ace/lib/ace';
// import { DatasetMetricCreationProps } from 'types/metric';
// import { DATABASE } from 'consts/application';
// import {
//   AggregateList,
//   // DATASET_NUM_HELPER_FUNCTIONS,
//   DATASET_TIME_HELPER_FUNCTIONS,
//   NUMBER_OPERATOR_LIST,
//   STRING_OPERATOR_LIST,
//   TIME_GRAIN_OPTIONS,
//   TIME_OPERATOR_LIST,
//   configTabs,
//   operatorList,
// } from 'consts/values';
// import { required } from 'consts/validations';
// import AceEditorSql from 'components/AceEditorSql/AceEditorSql';
// import useDatasetMetric from 'hooks/useDatasetMetric';
// import { getForeCastTimeGrain } from 'helpers/application/datasetMetricCreation';
// import styles from './metricform.module.css';
// import RlsSettings from './RlsSettings';
// import MetricFilters from './MetricFilters';

// type Props = {
//   config: DatasetMetricCreationProps;
// };

// const MetricDatasetForm = ({ config }: Props) => {
//   const {
//     tableListOptions,
//     onChangeTableSelection,
//     selectedTable,
//     control,
//     columnOptions,
//     configModal,
//     setConfigModal,
//     configuration,
//     onRemoveJoin,
//     valueFields,
//     append,
//     remove,
//     clientColumn,
//     setClientColumn,
//     dateTimeColumnList,
//     setTimeColumn,
//     timeColumn,
//     setTimeFilter,
//     timeFilter,
//     onChangeSelectAllColumn,
//     selectedColumnList,
//     register,
//     onChangeColumnSelection,
//     onSaveConfig,
//     onRemoveColumn,
//     errors,
//     onRemoveAggregate,
//     selectedFilterColumnInfo,
//     filterFieldType,
//     onChangeFilterValue,
//     selectedfilterValue,
//     onRemoveFilter,
//     setTimeConfigFilter,
//     timeConfigFilter,
//     onRemoveSortConfig,
//     isIncludeTime,
//     setIncludeTime,
//     timeGrainVal,
//     setTimeGrainVal,
//     onChangeIncludeTime,
//     isAllowComparisonLag,
//     comparisonLag,
//     setComparisonLag,
//     setConfiguration,
//     isAllowDrillDown,
//     forecast,
//     setForecast,
//     isAllowForecast,
//     customSql,
//     onChangeCustomValue,
//     selectedTab,
//     setSeletedTab,
//     customColumnList,
//     onSaveCustomColumn,
//     selectedCustomColumnList,
//     setSelectedCustomColumnList,
//     onApplySavedCustomColumn,
//     alert,
//     setAlert,
//     editorRef,
//     workspaceId,
//     isShowMetricFilters,
//     isShowRlsSettings,
//     setShowMetricFilters,
//     setShowRlsSettings,
//     setDrillDown,
//     drillDownSettings,
//     chartSettings,
//     dbName,
//     setRlsFilters,
//     setMetricFilters,
//     rlsFilters,
//     metricFilters,
//     selectedSchemaList,
//     clientId: client,
//     tenancy,
//     onGenerateDatasetmetric,
//     isDisableGenerateMetric,
//   } = useDatasetMetric(config);

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.dataConfigContainer}>
//           <Ui.FloatingDropDown
//             // onChange={(option) => onChangeTableSelection(option.value)}
//             onChange={() => {}}
//             selectedOption={selectedTable}
//             options={tableListOptions}
//             labelVariant="static"
//             icon={<Ui.Icons name="table" />}
//           />
//           <div className={styles.selectedOptions}>
//             {configuration?.table?.joins.map((join) => (
//               <div className={styles.selectedOption}>
//                 <Ui.Text variant="body-text-sm">{join.alias}</Ui.Text>
//                 <Ui.Button
//                   type="button"
//                   variant="secondary"
//                   onClick={() => onRemoveJoin(join)}
//                 >
//                   <Ui.Icons name="cross" />
//                 </Ui.Button>
//               </div>
//             ))}
//           </div>
//           <div className="dbn-w-full dbn-flex dbn-justify-end dbn-items-center">
//             <Ui.Button
//               variant="tertiary"
//               onClick={() => {
//                 setConfigModal({ isShow: true, type: 'JOIN' });
//                 setSeletedTab('simple');
//               }}
//               isDisabled={tableListOptions.length <= 1}
//               title={
//                 tableListOptions.length <= 1
//                   ? 'select more than one table to join'
//                   : 'join table with selected table'
//               }
//             >
//               <Ui.Icons name="plus" /> Add a join
//             </Ui.Button>
//           </div>
//         </div>
//         {client && tenancy !== DATABASE && (
//           <div className={styles.dataConfigContainer}>
//             <Ui.FloatingDropDown
//               onChange={setClientColumn}
//               selectedOption={clientColumn}
//               options={columnOptions}
//               labelVariant="static"
//               label="client column"
//               isSearchEnabled
//             />
//           </div>
//         )}
//         {!!dateTimeColumnList.length && (
//           <>
//             <Ui.FloatingDropDown
//               onChange={setTimeColumn}
//               selectedOption={timeColumn}
//               options={dateTimeColumnList}
//               isDisabled={!dateTimeColumnList.length}
//               labelVariant="static"
//               label="Time Column"
//             />
//             <Ui.TimeGrainField
//               setTimeGrainValue={setTimeFilter}
//               timeGrainValue={timeFilter}
//               isShowlabel
//               isDisabled={!timeColumn.value}
//             />
//             <Ui.FloatingDropDown
//               onChange={(value) => {
//                 setTimeGrainVal(value);
//                 setForecast((prev) => ({
//                   ...prev,
//                   isEnable: false,
//                   timeGrain: getForeCastTimeGrain(value.value),
//                 }));
//                 setConfiguration((prev) => ({
//                   ...prev,
//                   dimensions: prev.dimensions.filter(
//                     (dim) => dim.alias !== '_timestamp'
//                   ),
//                 }));
//                 setIncludeTime(false);
//               }}
//               selectedOption={timeGrainVal}
//               options={TIME_GRAIN_OPTIONS}
//               isDisabled={!dateTimeColumnList.length}
//               labelVariant="static"
//               label="Time Grain"
//             />
//           </>
//         )}
//         <div className="dbn-flex dbn-flex-col dbn-gap-1">
//           <Ui.Text variant="body-text-sm">Columns</Ui.Text>
//           <div className={styles.selectedOptions}>
//             {configuration?.dimensions?.map((col) => (
//               <div className={styles.selectedOption}>
//                 <Ui.Text variant="body-text-sm">{col.alias}</Ui.Text>
//                 <Ui.Button
//                   type="button"
//                   variant="secondary"
//                   onClick={() => onRemoveColumn(col)}
//                 >
//                   <Ui.Icons name="cross" />
//                 </Ui.Button>
//               </div>
//             ))}
//           </div>
//           <Ui.Button
//             type="button"
//             variant="secondary"
//             className={`${styles.addButton} dbn-bg-[#CDCECE] dbn-bg-opacity-20`}
//             onClick={() => {
//               setConfigModal({ isShow: true, type: 'COLUMN' });
//             }}
//             isDisabled={!columnOptions.length}
//             title={
//               !columnOptions.length
//                 ? 'select tables & columns from dataset'
//                 : 'select columns to add fields in query'
//             }
//           >
//             <Ui.Icons name="plus" size="xs" /> Add New
//           </Ui.Button>
//         </div>

//         <div className="dbn-flex dbn-flex-col dbn-gap-1">
//           <div className="dbn-w-full dbn-flex dbn-gap-3">
//             Metrics
//             <Ui.InfoTooltip>Metrics</Ui.InfoTooltip>
//           </div>
//           <div className={styles.selectedOptions}>
//             {configuration?.aggregates?.map((col) => (
//               <div className={styles.selectedOption}>
//                 <Ui.Text variant="body-text-sm">{col.alias}</Ui.Text>
//                 <Ui.Button
//                   type="button"
//                   variant="secondary"
//                   onClick={() => onRemoveAggregate(col)}
//                 >
//                   <Ui.Icons name="cross" />
//                 </Ui.Button>
//               </div>
//             ))}
//           </div>
//           <Ui.Button
//             type="button"
//             variant="secondary"
//             className={`${styles.addButton} dbn-bg-[#CDCECE] dbn-bg-opacity-20`}
//             onClick={() => {
//               setConfigModal({ isShow: true, type: 'METRIC' });
//             }}
//             isDisabled={!columnOptions.length}
//             title={
//               !columnOptions.length
//                 ? 'select tables & columns from dataset'
//                 : 'select columns with aggregate functions to add in query'
//             }
//           >
//             <Ui.Icons name="plus" size="xs" /> Add New
//           </Ui.Button>
//         </div>

//         <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
//           <div className="dbn-w-full dbn-flex dbn-gap-3 dbn-text-sm">
//             Filters
//             <Ui.InfoTooltip>Filters</Ui.InfoTooltip>
//           </div>
//           <div className={styles.selectedOptions}>
//             {configuration?.filters?.map((filter) => (
//               <div className={styles.selectedOption}>
//                 <Ui.Text variant="body-text-sm">{filter.columnName}</Ui.Text>
//                 <Ui.Button
//                   type="button"
//                   variant="secondary"
//                   onClick={() => onRemoveFilter(filter)}
//                 >
//                   <Ui.Icons name="cross" />
//                 </Ui.Button>
//               </div>
//             ))}
//           </div>
//           <Ui.Button
//             type="button"
//             variant="secondary"
//             className={`${styles.addButton} dbn-bg-[#CDCECE] dbn-bg-opacity-20`}
//             onClick={() => {
//               setConfigModal({ isShow: true, type: 'FILTER' });
//             }}
//             isDisabled={!columnOptions.length}
//             title={
//               !columnOptions.length
//                 ? 'select tables & columns from dataset'
//                 : 'select filters to add in query'
//             }
//           >
//             <Ui.Icons name="plus" size="xs" /> Add New
//           </Ui.Button>
//         </div>
//         <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
//           <div className="dbn-w-full dbn-flex dbn-gap-3 dbn-text-sm">
//             Sort By
//             <Ui.InfoTooltip>Sort by</Ui.InfoTooltip>
//           </div>
//           {!!configuration.orders.length && (
//             <div className="dbn-w-full dbn-px-1 dbn-bg-blue-h20 dbn-border dbn-rounded-md dbn-divide-solid dbn-flex dbn-justify-between dbn-items-center">
//               <Ui.Text variant="body-text-sm">
//                 {`${configuration.orders[0].name}  ${configuration.orders[0].method}`}
//               </Ui.Text>
//               <Ui.Button
//                 type="button"
//                 variant="secondary"
//                 onClick={() => onRemoveSortConfig()}
//               >
//                 <Ui.Icons name="cross" />
//               </Ui.Button>
//             </div>
//           )}
//           <Ui.Button
//             type="button"
//             variant="secondary"
//             className={`${styles.addButton} dbn-bg-[#CDCECE] dbn-bg-opacity-20`}
//             onClick={() => {
//               setConfigModal({ isShow: true, type: 'SORT' });
//               setSeletedTab('simple');
//             }}
//             isDisabled={!columnOptions.length}
//             title={
//               !columnOptions.length
//                 ? 'select tables & columns from dataset'
//                 : 'select sort to order data in query'
//             }
//           >
//             <Ui.Icons name="plus" size="xs" />{' '}
//             {configuration.orders.length ? 'Edit Sort' : 'Add New'}
//           </Ui.Button>
//         </div>
//         {!!dateTimeColumnList.length && (
//           <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
//             <div className="dbn-w-full dbn-flex dbn-gap-3 dbn-text-sm">
//               Comparison period lag
//               <Ui.InfoTooltip>compare value with time grain</Ui.InfoTooltip>
//             </div>

//             <Ui.InputField
//               type="number"
//               isDisabled={!isAllowComparisonLag}
//               onChange={({ target: { value } }) => {
//                 const lagValue = parseInt(value, 10);

//                 setComparisonLag(lagValue);
//                 setConfiguration((prev) => ({
//                   ...prev,
//                   orders: [{ method: 'DESC', name: '_timestamp' }],
//                 }));
//               }}
//               value={comparisonLag}
//             />
//           </div>
//         )}
//         {!!dateTimeColumnList.length && (
//           <div className="dbn-w-full dbn-flex dbn-flex-row dbn-items-center dbn-gap-2 dbn-text-sm">
//             <Ui.Button
//               variant="tertiary"
//               onClick={() => onChangeIncludeTime(!isIncludeTime)}
//               isDisabled={!timeColumn.value}
//             >
//               {isIncludeTime ? (
//                 <Ui.Icons name="not-found" /> // check icon
//               ) : (
//                 <Ui.Icons name="not-found" /> // uncheck icon
//               )}
//             </Ui.Button>
//             Include Time
//           </div>
//         )}
//         <div className="dbn-w-full dbn-flex dbn-flex-row dbn-items-center dbn-gap-2 dbn-text-sm">
//           <Ui.Button
//             type="button"
//             variant="tertiary"
//             onClick={() => {
//               if (!isAllowDrillDown) {
//                 if (!drillDownSettings?.isEnableGroupBy) {
//                   setAlert({
//                     isEnable: true,
//                     message:
//                       'Drill down cannot be enabled as you have not added metrics & columns in metric creation. Please select columns(more than one) & metrics to enable drill down.',
//                   });
//                 }
//                 setDrillDown((s) => ({
//                   ...s,
//                   isEnableGroupBy: false,
//                   isEnableCrossFilter: false,
//                 }));
//               } else {
//                 setDrillDown((s) => ({
//                   ...s,
//                   isEnableGroupBy: !drillDownSettings?.isEnableGroupBy,
//                 }));
//               }
//             }}
//           >
//             {drillDownSettings?.isEnableGroupBy ? (
//               <Ui.Icons name="not-found" /> // check icon
//             ) : (
//               <Ui.Icons name="not-found" /> // uncheck icon
//             )}
//           </Ui.Button>
//           Enable Drill Down
//         </div>
//         {!!dateTimeColumnList.length && (
//           <div className="dbn-w-full dbn-flex dbn-flex-row dbn-items-center dbn-gap-2 dbn-text-sm">
//             <Ui.Button
//               type="button"
//               variant="tertiary"
//               onClick={() => {
//                 if (!isAllowForecast) {
//                   setForecast((prev) => ({
//                     ...prev,
//                     isEnable: false,
//                   }));
//                   setAlert({
//                     isEnable: true,
//                     message:
//                       'Time column with Time grain & measure column should be included in query to enable forecast timeseries',
//                   });
//                 } else {
//                   setAlert({
//                     isEnable: false,
//                     message: '',
//                   });
//                   setForecast((prev) => ({
//                     ...prev,
//                     isEnable: !prev.isEnable,
//                     measureColumnName: !prev.isEnable
//                       ? configuration.aggregates?.[0]?.alias
//                       : '',
//                   }));
//                 }
//               }}
//             >
//               {forecast?.isEnable ? (
//                 <Ui.Icons name="not-found" /> // check icon
//               ) : (
//                 <Ui.Icons name="not-found" /> // uncheck icon
//               )}
//             </Ui.Button>
//             Enable Forecast
//           </div>
//         )}
//         {forecast.isEnable && (
//           <div className="dbn-flex dbn-flex-col dbn-gap-3">
//             <Ui.FloatingDropDown
//               onChange={(value) =>
//                 setForecast((prev) => ({
//                   ...prev,
//                   modelName: value.value,
//                 }))
//               }
//               options={[
//                 { value: 'ARIMA', label: 'ARIMA' },
//                 { value: 'prophet', label: 'prophet' },
//               ]}
//               selectedOption={{
//                 value: forecast.modelName,
//                 label: forecast.modelName,
//               }}
//               label="Forecast Model"
//               labelVariant="static"
//             />
//             <Ui.InputField
//               type="number"
//               min={1}
//               label="Forecast periods"
//               onChange={({ target: { value } }) =>
//                 setForecast((prev) => ({
//                   ...prev,
//                   forecastPeriods: parseInt(value, 10),
//                 }))
//               }
//               value={forecast.forecastPeriods}
//             />
//             {forecast.modelName === 'prophet' ? (
//               <>
//                 <Ui.InputField
//                   type="number"
//                   min={0}
//                   max={1}
//                   label="Confidence Intervals"
//                   onChange={({ target: { value } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       confidenceInterval: Number(value),
//                     }))
//                   }
//                   value={forecast.confidenceInterval}
//                 />
//                 <Ui.FloatingDropDown
//                   onChange={(value) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       growth: value.value,
//                     }))
//                   }
//                   options={[
//                     { value: 'linear', label: 'linear' },
//                     { value: 'flat', label: 'flat' },
//                   ]}
//                   selectedOption={{
//                     value: forecast.growth,
//                     label: forecast.growth,
//                   }}
//                   label="Growth"
//                   labelVariant="static"
//                 />

//                 <Ui.Checkbox
//                   label="Yearly Seasonality"
//                   onChange={({ target: { checked } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       yearlySeasonality: checked,
//                     }))
//                   }
//                   checked={forecast.yearlySeasonality}
//                 />
//                 <Ui.Checkbox
//                   label="Weekly Seasonality"
//                   onChange={({ target: { checked } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       weeklySeasonality: checked,
//                     }))
//                   }
//                   checked={forecast.weeklySeasonality}
//                 />
//                 <Ui.Checkbox
//                   label="Daily Seasonality"
//                   onChange={({ target: { checked } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       dailySeasonality: checked,
//                     }))
//                   }
//                   checked={forecast.dailySeasonality}
//                 />
//               </>
//             ) : (
//               <>
//                 <Ui.FloatingDropDown
//                   onChange={(value) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       trend: value,
//                     }))
//                   }
//                   options={[
//                     { value: 't', label: 'linear' },
//                     { value: 'c', label: 'constant' },
//                     {
//                       value: 'ct',
//                       label: 'constant plus linear',
//                     },
//                   ]}
//                   selectedOption={forecast.trend}
//                   label="Trend"
//                   labelVariant="static"
//                 />
//                 <Ui.InputField
//                   type="number"
//                   min={0}
//                   label="Auto Regressive Order"
//                   onChange={({ target: { value } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       orderP: parseInt(value, 10),
//                     }))
//                   }
//                   value={forecast.orderP}
//                 />
//                 <Ui.InputField
//                   type="number"
//                   min={0}
//                   label="Order Of Differencing"
//                   onChange={({ target: { value } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       orderD: parseInt(value, 10),
//                     }))
//                   }
//                   value={forecast.orderD}
//                 />
//                 <Ui.InputField
//                   type="number"
//                   min={0}
//                   label="Moving Average Order"
//                   onChange={({ target: { value } }) =>
//                     setForecast((prev) => ({
//                       ...prev,
//                       orderQ: parseInt(value, 10),
//                     }))
//                   }
//                   value={forecast.orderQ}
//                 />
//               </>
//             )}
//           </div>
//         )}
//         {rlsFilters && setRlsFilters ? (
//           <div className="dbn-relative dbn-flex dbn-flex-col dbn-gap-3">
//             {rlsFilters.length > 0 && (
//               <Ui.Text variant="body-text-sm">Dynamic Test Input</Ui.Text>
//             )}
//             <div className="dbn-flex dbn-flex-col dbn-gap-2">
//               {rlsFilters.map((filter) => (
//                 <Ui.FilterDropDown
//                   key={filter.id}
//                   label={filter.columnName}
//                   selectedOption={{
//                     value: filter.value || '',
//                     label: filter.value || '',
//                   }}
//                   workspaceId={workspaceId}
//                   onChange={(option: types.FloatingDropDownOption) =>
//                     setRlsFilters((prev) => {
//                       const prevValue = prev;
//                       const index = prevValue.findIndex(
//                         (f) => f.id === filter.id
//                       );
//                       if (index === -1) return prev;
//                       prevValue[index].value = option.value;
//                       return [...prevValue];
//                     })
//                   }
//                   filter={{
//                     columnName: filter.columnName,
//                     tableName: filter.tableName,
//                     value: filter.value,
//                     defaultValue: filter.defaultValue,
//                   }}
//                 />
//               ))}
//             </div>
//             <div className="dbn-w-full dbn-flex dbn-flex-row dbn-justify-between dbn-items-center dbn-border-t dbn-relative dbn-py-2">
//               <Ui.Text variant="heading-lg">RLS Settings</Ui.Text>
//               <Ui.Button
//                 variant="tertiary"
//                 type="button"
//                 onClick={() => setShowRlsSettings(true)}
//               >
//                 Show
//               </Ui.Button>
//             </div>
//           </div>
//         ) : null}
//         {metricFilters && setMetricFilters ? (
//           <div className="dbn-relative dbn-flex dbn-flex-row dbn-justify-between dbn-items-center dbn-border-t dbn-py-2">
//             <Ui.Text variant="heading-lg">Metric Filters</Ui.Text>
//             <Ui.Button
//               variant="tertiary"
//               type="button"
//               onClick={() => setShowMetricFilters(true)}
//             >
//               Show
//             </Ui.Button>
//           </div>
//         ) : null}
//       </div>
//       <div className="dbn-w-full dbn-bg-white dbn-flex dbn-items-center dbn-justify-center dbn-sticky dbn-bottom-0 dbn-right-0 dbn-min-h-[10%]">
//         <Ui.Button
//           type="button"
//           variant="primary"
//           className="dbn-w-[50%] dbn-p-2 disabled:dbn-cursor-not-allowed"
//           isDisabled={isDisableGenerateMetric}
//           onClick={() => {
//             onGenerateDatasetmetric({});
//           }}
//         >
//           Generate
//         </Ui.Button>
//       </div>
//       {rlsFilters && setRlsFilters && (
//         <Ui.Modal
//           isOpen={isShowRlsSettings}
//           onClose={() => setShowRlsSettings(false)}
//           headerTitle="Row-level Security"
//         >
//           <RlsSettings
//             appliedFilters={rlsFilters}
//             selectedTables={Object.entries(selectedSchemaList ?? {}).map(
//               (v) => ({
//                 tableName: v[0],
//                 columns: v[1],
//               })
//             )}
//             setAppliedFilters={setRlsFilters}
//             onCancel={() => setShowRlsSettings(false)}
//             onSave={() => setShowRlsSettings(false)}
//             dbName={dbName}
//           />
//         </Ui.Modal>
//       )}
//       {metricFilters && setMetricFilters && (
//         <Ui.Modal
//           isOpen={isShowMetricFilters}
//           onClose={() => setShowMetricFilters(false)}
//           headerTitle="Metric Filters"
//         >
//           <MetricFilters
//             setMetricFilters={setMetricFilters}
//             onCancel={() => setShowMetricFilters(false)}
//             selectedColumns={Object.entries(selectedSchemaList ?? {}).map(
//               (v) => ({
//                 tableName: v[0],
//                 columns: v[1],
//               })
//             )}
//             metricFilters={metricFilters}
//             dbName={dbName}
//             xAxisColumn={chartSettings.xAxis || ''}
//           />
//         </Ui.Modal>
//       )}
//       {alert.isEnable && (
//         <Ui.Modal
//           isOpen={alert.isEnable}
//           onClose={() => setAlert({ isEnable: false, message: '' })}
//           headerTitle="Drilldown Settings"
//         >
//           <div className="dbn-w-[660px] dbn-p-4">
//             <div className="dbn-w-[98%] dbn-border dbn-rounded dbn-border-blue-h4 dbn-bg-blue-h1 dbn-divide-solid dbn-p-2 dbn-flex dbn-flex-row dbn-items-start dbn-justify-center dbn-gap-1 dbn-text-sm">
//               <Ui.Icons name="info" />
//               <div className="dbn-w-[96%] dbn-flex dbn-flex-col">
//                 <span className="dbn-font-semibold">Note:</span>
//                 <div className="dbn-w-full">{alert.message}</div>
//               </div>
//             </div>
//           </div>
//         </Ui.Modal>
//       )}

//       <Ui.Modal
//         headerTitle="Join tables"
//         isOpen={configModal.isShow}
//         onClose={() => setConfigModal({ isShow: false, type: 'JOIN' })}
//       >
//         <form className={styles.configModal} onSubmit={onSaveConfig}>
//           {configModal.type !== 'SORT' && configModal.type !== 'JOIN' ? (
//             <div>
//               <Ui.Tab
//                 activeTab={selectedTab}
//                 options={configTabs}
//                 setActiveTab={setSeletedTab}
//                 className="dbn-border-b dbn-divide-solid"
//               />
//             </div>
//           ) : null}
//           {selectedTab === 'simple' && (
//             <div className={styles.configModalWrapper}>
//               {configModal.type === 'JOIN' && (
//                 <JoinTableConfig
//                   tableListOptions={tableListOptions}
//                   control={control}
//                   valueFields={valueFields}
//                   columnOptions={columnOptions}
//                   remove={remove}
//                   append={append}
//                 />
//               )}
//               {configModal.type === 'COLUMN' && (
//                 <ColumnConfig
//                   columnOptions={columnOptions}
//                   onChangeColumnSelection={onChangeColumnSelection}
//                   selectedColumnList={selectedColumnList}
//                   onChangeSelectAllColumn={onChangeSelectAllColumn}
//                   register={register}
//                   control={control}
//                 />
//               )}
//               {configModal.type === 'METRIC' && (
//                 <MetricConfig
//                   control={control}
//                   columnOptions={columnOptions}
//                   register={register}
//                   errors={errors}
//                 />
//               )}
//               {configModal.type === 'FILTER' && (
//                 <FilterConfig
//                   columnOptions={columnOptions}
//                   control={control}
//                   selectedFilterColumnInfo={selectedFilterColumnInfo}
//                   filterFieldType={filterFieldType}
//                   workspaceId={workspaceId}
//                   selectedfilterValue={selectedfilterValue}
//                   onChangeFilterValue={onChangeFilterValue}
//                   timeConfigFilter={timeConfigFilter}
//                   timeColumn={timeColumn}
//                   setTimeConfigFilter={setTimeConfigFilter}
//                 />
//               )}
//               {configModal.type === 'SORT' && (
//                 <SortConfig
//                   control={control}
//                   columnOptions={columnOptions}
//                   register={register}
//                 />
//               )}
//             </div>
//           )}
//           {selectedTab === 'custom' &&
//             configModal.type !== 'SORT' &&
//             configModal.type !== 'JOIN' && (
//               <CustomConfig
//                 onChangeCustomValue={onChangeCustomValue}
//                 customSql={customSql}
//                 editorRef={editorRef}
//               />
//             )}
//           {selectedTab === 'saved' &&
//             configModal.type !== 'SORT' &&
//             configModal.type !== 'JOIN' && (
//               <SavedConfig
//                 setSelectedCustomColumnList={setSelectedCustomColumnList}
//                 selectedCustomColumnList={selectedCustomColumnList}
//                 customColumnList={customColumnList}
//               />
//             )}
//           <Ui.ModalFooter>
//             {selectedTab === 'custom' && (
//               <Ui.Button variant="primary" onClick={() => onSaveCustomColumn()}>
//                 Save
//               </Ui.Button>
//             )}
//             {selectedTab === 'simple' && (
//               <Ui.Button type="submit" variant="primary">
//                 Save
//               </Ui.Button>
//             )}
//             {selectedTab === 'saved' && (
//               <Ui.Button variant="primary" onClick={onApplySavedCustomColumn}>
//                 Save
//               </Ui.Button>
//             )}
//           </Ui.ModalFooter>
//         </form>
//       </Ui.Modal>
//     </div>
//   );
// };

// // Metric form config

// //  JoinTableConfig
// type JointTableConfigProps = {
//   tableListOptions: types.FloatingDropDownOption[];
//   control: Control<FieldValues, any>;
//   valueFields: Record<'id', string>[];
//   columnOptions: types.FloatingDropDownOption[];
//   remove: UseFieldArrayRemove;
//   append: UseFieldArrayAppend<FieldValues, 'field'>;
// };

// const JoinTableConfig = ({
//   tableListOptions,
//   control,
//   valueFields,
//   columnOptions,
//   remove,
//   append,
// }: JointTableConfigProps) => {
//   return (
//     <>
//       <div className={styles.joinConfig}>
//         <div className="dbn-w-full">
//           <Ui.HookSelect
//             options={tableListOptions}
//             control={control}
//             name="selectedJoinTable"
//             isSearchEnabled
//             label="Join Table"
//           />
//         </div>
//         <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-2">
//           <Ui.Text variant="body-text-sm">ON</Ui.Text>

//           {valueFields.map(({ id }, i) => (
//             <div
//               className="dbn-w-full dbn-flex dbn-gap-2 dbn-items-center"
//               key={id}
//             >
//               <Ui.HookSelect
//                 name={`field.${i}.firstOperand`}
//                 options={columnOptions}
//                 control={control}
//                 isSearchEnabled
//               />
//               <Ui.HookSelect
//                 name={`field.${i}.secondOperand`}
//                 options={columnOptions}
//                 control={control}
//                 isSearchEnabled
//               />
//               <Ui.Button
//                 type="button"
//                 variant="tertiary"
//                 className=""
//                 onClick={() => remove(i)}
//               >
//                 <Ui.Icons name="cross" />
//               </Ui.Button>
//             </div>
//           ))}
//           <div>
//             <Ui.Button
//               type="button"
//               variant="tertiary"
//               className="dbn-flex dbn-text-blue-700 dbn-items-center dbn-gap-1 dbn-w-fit dbn-text-sm"
//               onClick={() => append('')}
//             >
//               <Ui.Icons name="plus" /> Add Condition
//             </Ui.Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ColumnConfig
// type ColumnConfigProps = {
//   columnOptions: types.FloatingDropDownOption[];
//   onChangeColumnSelection: (value: string[]) => void;
//   selectedColumnList: types.FloatingDropDownOption[];
//   onChangeSelectAllColumn: (value: boolean) => void;
//   register: UseFormRegister<FieldValues>;
//   control: Control<FieldValues, any>;
// };

// const ColumnConfig = ({
//   columnOptions,
//   onChangeColumnSelection,
//   selectedColumnList,
//   onChangeSelectAllColumn,
//   register,
//   control,
// }: ColumnConfigProps) => {
//   return (
//     <div className="dbn-flex dbn-flex-col dbn-gap-2">
//       <Ui.MultiSelect
//         label="Columns"
//         options={columnOptions}
//         onChange={(value) => onChangeColumnSelection(value)}
//         value={selectedColumnList?.map((value: any) => value.name)}
//         placeHolder="Select Columns"
//         isSearchEnabled
//       />
//       {selectedColumnList?.length === columnOptions.length ? (
//         <Ui.Button
//           variant="tertiary"
//           type="button"
//           onClick={() => onChangeSelectAllColumn(false)}
//         >
//           <Ui.Text variant="body-text-sm">
//             {/* <CheckIcon /> */}
//             Select all columns
//           </Ui.Text>
//         </Ui.Button>
//       ) : (
//         <Ui.Button
//           variant="tertiary"
//           type="button"
//           onClick={() => onChangeSelectAllColumn(true)}
//         >
//           <Ui.Text variant="body-text-sm">
//             {/* <UnCheckIcon /> */}
//             Select all columns
//           </Ui.Text>
//         </Ui.Button>
//       )}
//       {selectedColumnList.length ? (
//         <div className="dbn-flex dbn-flex-col dbn-gap-4">
//           Save column as
//           {selectedColumnList?.map((item: any, i: number) => {
//             const [parentAlias, columnName, datatype] =
//               item?.name?.split('____');
//             return (
//               <div className="dbn-flex dbn-gap-3 ">
//                 <Ui.InputField
//                   label={columnName || item.alias}
//                   type="text"
//                   placeholder="Save as"
//                   name={item.alias}
//                   value={item.alias}
//                   register={register(`selectedColumns.${i}.alias`)}
//                 />
//                 {consts.DATE_TYPES.includes(datatype.toLowerCase()) && (
//                   <Ui.HookSelect
//                     name={`selectedColumns.${i}.helperFunction`}
//                     control={control}
//                     options={DATASET_TIME_HELPER_FUNCTIONS}
//                     label="function"
//                     labelVariant="static"
//                     isSearchEnabled
//                   />
//                 )}
//                 {/* TODO: bining integer values */}
//                 {/* {consts.NUMBER_TYPES.includes(datatype.toLowerCase()) && (
//                   <Ui.HookSelect
//                     name={`selectedColumns.${i}.helperFunction`}
//                     control={control}
//                     options={DATASET_NUM_HELPER_FUNCTIONS}
//                     label="function"
//                     labelVariant="static"
//                     defaultValue="NONE"
//                     isSearchEnabled
//                   />
//                 )} */}
//               </div>
//             );
//           })}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// // MetricConfig

// type MetricConfigProps = {
//   control: Control<FieldValues, any>;
//   columnOptions: types.FloatingDropDownOption[];
//   register: UseFormRegister<FieldValues>;
//   errors: FieldErrors<FieldValues>;
// };

// const MetricConfig = ({
//   control,
//   columnOptions,
//   register,
//   errors,
// }: MetricConfigProps) => {
//   return (
//     <div className="dbn-flex dbn-flex-col dbn-gap-2">
//       <Ui.HookSelect
//         name="metricAggregate"
//         control={control}
//         options={AggregateList}
//         label="Aggregate"
//         labelVariant="static"
//         isSearchEnabled
//       />
//       <Ui.HookSelect
//         control={control}
//         options={columnOptions}
//         label="Column"
//         labelVariant="static"
//         name="metricColumn"
//         isSearchEnabled
//       />

//       <Ui.InputField
//         label="As"
//         type="text"
//         placeholder="Save as"
//         register={register('metricAlias', required)}
//         error={errors.metricAlias?.message}
//       />
//     </div>
//   );
// };

// // FilterConfig

// type FilterConfigProps = {
//   columnOptions: types.FloatingDropDownOption[];
//   control: Control<FieldValues, any>;
//   selectedFilterColumnInfo:
//     | {
//         parentAlias: any;
//         columnName: any;
//         datatype: any;
//         schemaName: any;
//         tableName: any;
//       }
//     | undefined;
//   filterFieldType: string | undefined;
//   workspaceId: string;
//   selectedfilterValue: any;
//   onChangeFilterValue: (value: any, type: string) => void;
//   timeConfigFilter: string;
//   timeColumn: types.FloatingDropDownOption;
//   setTimeConfigFilter: React.Dispatch<React.SetStateAction<string>>;
// };

// const FilterConfig = ({
//   columnOptions,
//   control,
//   selectedFilterColumnInfo,
//   filterFieldType,
//   workspaceId,
//   selectedfilterValue,
//   onChangeFilterValue,
//   timeConfigFilter,
//   timeColumn,
//   setTimeConfigFilter,
// }: FilterConfigProps) => {
//   return (
//     <div className="dbn-flex dbn-flex-col dbn-gap-2">
//       <Ui.HookSelect
//         control={control}
//         options={columnOptions}
//         name="filterColumn"
//         labelVariant="static"
//         label="Column"
//         isSearchEnabled
//       />
//       <Ui.HookSelect
//         control={control}
//         name="filterOperator"
//         options={
//           consts.DATE_TYPES.includes(
//             selectedFilterColumnInfo?.datatype?.toLowerCase()
//           )
//             ? TIME_OPERATOR_LIST
//             : consts.NUMBER_TYPES.includes(
//                 selectedFilterColumnInfo?.datatype?.toLowerCase()
//               )
//             ? NUMBER_OPERATOR_LIST
//             : consts.STRING_TYPES.includes(
//                 selectedFilterColumnInfo?.datatype?.toLowerCase()
//               ) ||
//               selectedFilterColumnInfo?.datatype
//                 ?.toLowerCase()
//                 ?.includes('char')
//             ? STRING_OPERATOR_LIST
//             : operatorList
//         }
//         label="Operator"
//         labelVariant="static"
//       />
//       {selectedFilterColumnInfo && (
//         <>
//           {/* {filterFieldType === 'MULTI_FILTER_DROPDOWN' && (
//             <Ui.MultiFilterDropdown
//               label="Filter Values"
//               filter={{
//                 tableName: `${selectedFilterColumnInfo.schemaName}.${selectedFilterColumnInfo.tableName}`,
//                 columnName: `${selectedFilterColumnInfo.columnName}`,
//               }}
//               workspaceId={workspaceId}
//               selectedOptions={
//                 selectedfilterValue?.array?.map((value: any) => ({
//                   label: `${value}`,
//                   value: `${value}`,
//                 })) || []
//               }
//               onChange={(value) =>
//                 onChangeFilterValue(
//                   value.map((v) => v.value),
//                   'MULTI_FILTER_DROPDOWN'
//                 )
//               }
//               isSearchEnabled
//             />
//           )} */}
//           {filterFieldType === 'FILTER_DROPDOWN' && (
//             <Ui.FilterDropDown
//               label="Filter Values"
//               filter={{
//                 tableName: `${selectedFilterColumnInfo.schemaName}.${selectedFilterColumnInfo.tableName}`,
//                 columnName: `${selectedFilterColumnInfo.columnName}`,
//               }}
//               workspaceId={workspaceId}
//               selectedOption={{
//                 label: selectedfilterValue?.string || '',
//                 value: selectedfilterValue?.string || '',
//               }}
//               onChange={(value) =>
//                 onChangeFilterValue(value.value, 'FILTER_DROPDOWN')
//               }
//               isSearchEnabled
//               autoSelected={false}
//             />
//           )}
//           {filterFieldType === 'TIME_FILTER' && (
//             <Ui.TimeGrainField
//               timeGrainValue={timeConfigFilter}
//               isShowlabel
//               isDisabled={!timeColumn.value}
//               setTimeGrainValue={setTimeConfigFilter}
//             />
//           )}
//           {filterFieldType === 'INPUT_NUMBER_FIELD' && (
//             <Ui.InputField
//               type="number"
//               label="Value"
//               onChange={({ target: { value } }) =>
//                 onChangeFilterValue(value, 'INPUT_NUMBER_FIELD')
//               }
//               value={selectedfilterValue?.number || 0}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // sort config

// type SortConfigProps = {
//   control: Control<FieldValues, any>;
//   columnOptions: types.FloatingDropDownOption[];
//   register: UseFormRegister<FieldValues>;
// };

// const SortConfig = ({ control, columnOptions, register }: SortConfigProps) => {
//   return (
//     <div className="dbn-flex dbn-flex-col dbn-gap-2">
//       <Ui.HookSelect
//         control={control}
//         options={columnOptions}
//         label="Column"
//         labelVariant="static"
//         isSearchEnabled
//         name="sortColumn"
//       />
//       <Ui.InputField
//         register={register('sortDesc')}
//         type="checkbox"
//         label="sort descending"
//       />
//     </div>
//   );
// };

// // CustomConfig

// type CustomConfigProps = {
//   onChangeCustomValue: (value: Record<string, string>) => void;
//   customSql: {
//     name: string;
//     sql: string;
//   };
//   editorRef: React.RefObject<ReactAce>;
// };

// const CustomConfig = ({
//   onChangeCustomValue,
//   customSql,
//   editorRef,
// }: CustomConfigProps) => {
//   return (
//     <div className={styles.customConfigContainer}>
//       <Ui.InputField
//         label="Name"
//         type="text"
//         placeholder="name"
//         name="name"
//         onChange={(e) => onChangeCustomValue({ name: e.target.value })}
//         value={customSql.name}
//       />
//       <div className={styles.customConfigEditor}>
//         <Ui.Text variant="body-text-sm">SQL</Ui.Text>
//         <AceEditorSql
//           editorRef={editorRef}
//           onChange={(value: string) => {
//             onChangeCustomValue({ sql: value });
//           }}
//           value={customSql.sql}
//         />
//       </div>
//     </div>
//   );
// };

// // save config

// type SavedConfigProps = {
//   setSelectedCustomColumnList: React.Dispatch<
//     React.SetStateAction<types.FloatingDropDownOption[]>
//   >;
//   selectedCustomColumnList: types.FloatingDropDownOption[];
//   customColumnList: types.MetricsValue[];
// };

// const SavedConfig = ({
//   setSelectedCustomColumnList,
//   selectedCustomColumnList,
//   customColumnList,
// }: SavedConfigProps) => {
//   return (
//     <div className={styles.saveConfigContainer}>
//       {/* <Ui.MultiFloatingDropDown
//         onChange={(options) => setSelectedCustomColumnList(options)}
//         selectedOptions={selectedCustomColumnList}
//         options={customColumnList.map((value, index) => ({
//           label: value.as,
//           value: `${value.value}____${index}____${value.as}`,
//           key: `${value.as}_${value.value}`,
//         }))}
//         label="Saved"
//         labelVariant="static"
//       /> */}
//       {selectedCustomColumnList.map((c) => (
//         <div className={styles.selectedOption}>
//           <Ui.Text variant="body-text-sm">
//             {c.label}::{c.value.split('____')[0]}
//           </Ui.Text>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default React.memo(MetricDatasetForm);
