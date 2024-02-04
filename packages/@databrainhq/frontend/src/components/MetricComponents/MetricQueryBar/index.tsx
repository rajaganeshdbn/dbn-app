export {};
// import React, { useState } from 'react';
// import { Ui, types } from '@databrainhq/plugin';
// import { DatasetMetricCreationProps } from 'types/metric';
// import { ClientDropDownProps } from 'components/ClientDropDown';
// import styles from './metricQueryBar.module.css';
// import MetricDatasetForm from './MetricDatasetForm';
// import MetricAiForm from './MetricAiForm';
// import { RlsSettingsProps } from './RlsSettings';

// type Props = {
//   selectedSchemaList: Record<string, types.SelectedColumns[]> | undefined;
//   onSubmit: (data: any) => void;
//   isLoading: boolean;
//   outputColumns?: string;
//   metricQuery?: string;
//   isDisable: boolean;
//   client?: ClientDropDownProps['client'];
//   setClient?: ClientDropDownProps['setClient'];
//   timeGrainValue?: string;
//   setTimeGrainValue?: React.Dispatch<React.SetStateAction<string>>;
//   companyId?: string;
//   setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
//   setError?: React.Dispatch<React.SetStateAction<types.SqlError | undefined>>;
//   setQuery?: React.Dispatch<React.SetStateAction<string>>;
//   setData?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
//   database?: string;
//   joinColumnList?: types.FloatingDropDownOption[];
//   joinFields?: types.JoinField[];
//   rlsConditions?: types.RlsCondition[];
//   setRlsConditions?: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
//   rlsFilters?: RlsSettingsProps['appliedFilters'];
//   setRlsFilters?: RlsSettingsProps['setAppliedFilters'];
//   chartSettings: types.ChartSettingsType;
//   datasetMetricConfig: DatasetMetricCreationProps['config'];
// };
// const MetricQueryBar = ({
//   selectedSchemaList,
//   isLoading,
//   metricQuery,
//   outputColumns,
//   onSubmit,
//   isDisable,
//   client,
//   setClient,
//   timeGrainValue,
//   setTimeGrainValue,
//   companyId,
//   setData,
//   setError,
//   setLoading,
//   setQuery,
//   database,
//   joinColumnList,
//   joinFields,
//   rlsConditions,
//   setRlsConditions,
//   rlsFilters,
//   setRlsFilters,
//   chartSettings,
//   datasetMetricConfig,
// }: Props) => {
//   const FIRST_TAB = 'Visual Mode';
//   const SECOND_TAB = 'AI Mode';
//   const [activeTab, setActiveTab] = useState(FIRST_TAB);
//   const isExternal =
//     companyId && setData && setError && setLoading && setQuery && database;

//   const switchTabs = () =>
//     activeTab === FIRST_TAB
//       ? setActiveTab(SECOND_TAB)
//       : setActiveTab(FIRST_TAB);

//   if (!isExternal) {
//     return (
//       <div className={styles['metricQueryBar-container']}>
//         <Ui.Text variant="heading-lg">
//           <Ui.Icons name="not-found" /> Data Explorer
//           {/* data-exploration-icon */}
//         </Ui.Text>
//         <MetricAiForm
//           selectedSchemaList={selectedSchemaList}
//           isLoading={isLoading}
//           onSubmit={onSubmit}
//           isDisable={isDisable}
//           client={client}
//           setClient={setClient}
//           timeGrainValue={timeGrainValue}
//           setTimeGrainValue={setTimeGrainValue}
//           metricQuery={metricQuery}
//           outputColumns={outputColumns}
//           xAxisColumn={chartSettings.xAxis || ''}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className={styles['main-container']}>
//       <div className={styles['metricQueryBar-header']}>
//         <Ui.Switch
//           placeholder={FIRST_TAB}
//           enabled={activeTab === SECOND_TAB}
//           onChange={switchTabs}
//         />
//       </div>

//       <div className="dbn-grow dbn-overflow-hidden dbn-overflow-y-auto">
//         {activeTab === SECOND_TAB && (
//           <MetricAiForm
//             selectedSchemaList={selectedSchemaList}
//             isLoading={isLoading}
//             onSubmit={onSubmit}
//             isDisable={isDisable}
//             client={client}
//             setClient={setClient}
//             timeGrainValue={timeGrainValue}
//             setTimeGrainValue={setTimeGrainValue}
//             metricQuery={metricQuery}
//             outputColumns={outputColumns}
//             joinColumnList={joinColumnList}
//             joinFields={joinFields}
//             metricFilters={rlsConditions}
//             setMetricFilters={setRlsConditions}
//             rlsFilters={rlsFilters}
//             setRlsFilters={setRlsFilters}
//             dbName={database}
//             xAxisColumn={chartSettings.xAxis || ''}
//           />
//         )}
//         {activeTab === FIRST_TAB && (
//           <MetricDatasetForm config={{ config: datasetMetricConfig }} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default React.memo(MetricQueryBar);
