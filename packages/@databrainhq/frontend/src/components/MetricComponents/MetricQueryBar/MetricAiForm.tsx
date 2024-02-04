export {};
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useFieldArray, useForm } from 'react-hook-form';
// import { useState, useEffect } from 'react';
// import { types, Ui } from '@databrainhq/plugin';
// import { ClientDropDownProps } from 'components/ClientDropDown';
// import useWorkspace from 'hooks/useWorkspace';
// import RlsSettings, { RlsSettingsProps } from './RlsSettings';
// import SelectedTableTab from './SelectedTableTab';
// import styles from './metricQueryBar.module.css';
// import MetricFilters from './MetricFilters';

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
//   joinColumnList?: { value: string; label: string }[];
//   joinFields?: types.JoinField[];
//   metricFilters?: types.RlsCondition[];
//   setMetricFilters?: React.Dispatch<React.SetStateAction<types.RlsCondition[]>>;
//   rlsFilters?: RlsSettingsProps['appliedFilters'];
//   setRlsFilters?: RlsSettingsProps['setAppliedFilters'];
//   dbName?: string;
//   xAxisColumn: string;
// };
// const MetricAiForm = ({
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
//   joinColumnList,
//   joinFields,
//   metricFilters,
//   setMetricFilters,
//   rlsFilters,
//   setRlsFilters,
//   dbName,
//   xAxisColumn,
// }: Props) => {
//   const { workspace } = useWorkspace();
//   const [isShowQuesModal, setShowQuesModal] = useState(false);
//   const [isShowRlsSettings, setShowRlsSettings] = useState(false);
//   const [isShowMetricFilters, setShowMetricFilters] = useState(false);
//   const [isOpenJoin, setOpenJoin] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     setFocus,
//     control,
//     formState: { errors },
//   } = useForm();
//   const {
//     fields: valueFields,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: `join`,
//   });
//   useEffect(() => {
//     if (joinFields?.length) {
//       append(joinFields);
//     }
//   }, [joinFields]);
//   useEffect(() => {
//     setValue('query', metricQuery);
//   }, [metricQuery]);

//   useEffect(() => {
//     setValue('output_columns', outputColumns);
//   }, [outputColumns]);
//   useEffect(() => {
//     setValue('timeGrain', timeGrainValue);
//   }, [timeGrainValue]);

//   useEffect(() => {
//     setFocus('query');
//   }, []);

//   return (
//     <div className={styles['metricQueryBar-wrapper']}>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="dbn-grow dbn-overflow-auto"
//       >
//         <div className={styles['query-tab']}>
//           <div className="dbn-relative dbn-w-full">
//             {client && setClient && (
//               <div className="dbn-flex dbn-flex-col dbn-gap-2">
//                 <Ui.Text variant="body-text-sm">Joins</Ui.Text>
//                 <div
//                   className={`${styles.addButton} dbn-bg-[#CDCECE] dbn-bg-opacity-20`}
//                 >
//                   <Ui.Button
//                     type="button"
//                     variant="tertiary"
//                     onClick={() => {
//                       setOpenJoin(true);
//                     }}
//                     leftIcon={<Ui.Icons name="plus" />}
//                   >
//                     Add New
//                   </Ui.Button>
//                 </div>
//                 <Ui.Modal
//                   headerTitle="Add a Join"
//                   isOpen={isOpenJoin}
//                   onClose={() => setOpenJoin(false)}
//                 >
//                   <div className="dbn-w-80 dbn-px-8 dbn-py-2 dbn-max-h-[400px]">
//                     {valueFields.map((field, index) => (
//                       <div
//                         className="dbn-w-full dbn-flex dbn-flex-col dbn-items-center dbn-gap-2 dbn-mt-4"
//                         key={field.id}
//                       >
//                         <div className="dbn-w-full">
//                           <Ui.Button
//                             type="button"
//                             variant="tertiary"
//                             onClick={() => remove(index)}
//                             rightIcon={<Ui.Icons name="cross" />}
//                           >
//                             Join {index + 1}
//                           </Ui.Button>
//                         </div>
//                         <div className="dbn-w-full">
//                           <Ui.HookSelect
//                             key={`field_a_${field.id}`}
//                             placeHolder="Select Field"
//                             name={`join.${index}.a`}
//                             options={joinColumnList}
//                             control={control}
//                           />
//                         </div>
//                         <Ui.Icons name="not-found" />
//                         {/* Join Icon */}
//                         <div className="dbn-w-full">
//                           <Ui.HookSelect
//                             key={`field_b_${field.id}`}
//                             placeHolder="Select Field"
//                             name={`join.${index}.b`}
//                             options={joinColumnList}
//                             control={control}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                     <div className="dbn-flex dbn-justify-end dbn-px-5 dbn-py-4">
//                       <Ui.Button
//                         type="button"
//                         variant="tertiary"
//                         onClick={() => append('')}
//                         leftIcon={<Ui.Icons name="plus" />}
//                       >
//                         Add {valueFields.length ? 'another' : 'a'} join
//                       </Ui.Button>
//                     </div>
//                   </div>
//                 </Ui.Modal>
//               </div>
//             )}
//             <div>
//               <Ui.Text variant="body-text-sm">
//                 Type your query
//                 <Ui.Button
//                   type="button"
//                   variant="tertiary"
//                   onClick={() => setShowQuesModal(true)}
//                 >
//                   <Ui.Icons name="not-found" />
//                   {/* question mark icon */}
//                 </Ui.Button>
//               </Ui.Text>
//               <Ui.TextAreaField
//                 id="query"
//                 rows={4}
//                 placeholder="Which customers have purchased the most number of products from the state of california and also paid the most tax? Include their name and city"
//                 register={register('query', {
//                   required: {
//                     value: true,
//                     message: 'Please add a valid query',
//                   },
//                 })}
//                 error={errors.query?.message}
//                 label=""
//               />
//             </div>
//           </div>
//           {timeGrainValue != null && setTimeGrainValue && (
//             <Ui.TimeGrainField
//               isShowlabel
//               timeGrainValue={timeGrainValue}
//               setTimeGrainValue={setTimeGrainValue}
//               register={register}
//             />
//           )}

//           <div className="dbn-flex dbn-flex-col dbn-gap-1">
//             <Ui.Text variant="body-text-sm">Output Column</Ui.Text>
//             <Ui.InputField
//               label=""
//               type="text"
//               placeholder="month, revenue"
//               register={register('output_columns')}
//             />
//           </div>
//         </div>
//         <Ui.Text variant="body-text-sm">Input fields</Ui.Text>
//         <div className="dbn-ml-2">
//           {selectedSchemaList &&
//             Object.keys(selectedSchemaList).map((key) => (
//               <SelectedTableTab
//                 name={key}
//                 list={selectedSchemaList[key]}
//                 key={key}
//               />
//             ))}
//         </div>
//         <div className="dbn-flex dbn-flex-col dbn-px-5">
//           {rlsFilters && setRlsFilters ? (
//             <div className="dbn-relative dbn-flex dbn-flex-col dbn-gap-2">
//               {rlsFilters.length > 0 && (
//                 <Ui.Text variant="body-text-sm">Dynamic Test Input</Ui.Text>
//               )}
//               <div className="dbn-flex dbn-flex-col dbn-gap-2">
//                 {rlsFilters.map((filter) => (
//                   <Ui.FilterDropDown
//                     workspaceId={workspace?.id}
//                     key={filter.id}
//                     label={filter.columnName}
//                     selectedOption={{
//                       value: filter.value || '',
//                       label: filter.value || '',
//                     }}
//                     onChange={(option: types.FloatingDropDownOption) =>
//                       setRlsFilters((prev) => {
//                         const prevValue = prev;
//                         const index = prevValue.findIndex(
//                           (f) => f.id === filter.id
//                         );
//                         if (index === -1) return prev;
//                         prevValue[index].value = option.value;
//                         return [...prevValue];
//                       })
//                     }
//                     filter={{
//                       columnName: filter.columnName,
//                       tableName: filter.tableName,
//                       value: filter.value,
//                       defaultValue: filter.defaultValue,
//                     }}
//                   />
//                 ))}
//               </div>
//               <div className="dbn-w-full dbn-flex dbn-flex-row dbn-justify-between dbn-items-center dbn-border-t dbn-relative dbn-py-2">
//                 <Ui.Text variant="heading-lg">RLS Settings</Ui.Text>
//                 <Ui.Button
//                   variant="tertiary"
//                   type="button"
//                   onClick={() => setShowRlsSettings(true)}
//                 >
//                   Show
//                 </Ui.Button>
//               </div>
//             </div>
//           ) : null}
//           {metricFilters && setMetricFilters ? (
//             <div className="dbn-relative dbn-flex dbn-flex-row dbn-justify-between dbn-items-center dbn-border-t dbn-py-2">
//               <Ui.Text variant="heading-lg">Metric Filters</Ui.Text>
//               <Ui.Button
//                 variant="tertiary"
//                 type="button"
//                 onClick={() => setShowMetricFilters(true)}
//               >
//                 Show
//               </Ui.Button>
//             </div>
//           ) : null}
//         </div>
//         <div className="dbn-w-full dbn-absolute dbn-bottom-0 dbn-min-h-[10%] dbn-border-t dbn-bg-white dbn-flex dbn-items-center dbn-justify-center">
//           {isLoading ? (
//             <div className="dbn-w-[50%] disabled:dbn-cursor-progress disabled:dbn-opacity-50">
//               <Ui.Button
//                 type="button"
//                 variant="secondary"
//                 isDisabled={isLoading}
//               >
//                 Generating...
//               </Ui.Button>
//             </div>
//           ) : (
//             <Ui.Button type="submit" variant="primary" isDisabled={isDisable}>
//               Generate
//             </Ui.Button>
//           )}
//         </div>
//       </form>

//       <Ui.Modal
//         isOpen={isShowQuesModal}
//         onClose={() => setShowQuesModal(false)}
//         headerTitle="Query Input Tips"
//         icon={
//           <Ui.Icons name="not-found" />
//           // blub icon
//         }
//       >
//         <div className="dbn-w-[500px] dbn-px-7 dbn-flex dbn-flex-col dbn-gap-2 dbn-py-4">
//           <Ui.Text variant="body-text-sm">
//             What are the top performing marketing channels?
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             When did the MRR reach the benchmark this year?
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             Show me the revenue for this month
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             Compare total sales last year vs this year
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             Show me the least performing ad channels?
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             Which state in USA had the most subscriptions this week?
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             Show me the cancelled customers for pricing tier A
//           </Ui.Text>
//         </div>
//       </Ui.Modal>
//       {rlsFilters && setRlsFilters && (
//         <Ui.Modal
//           isOpen={isShowRlsSettings}
//           onClose={() => setShowRlsSettings(false)}
//           headerTitle="Row-level Security"
//         >
//           <RlsSettings
//             appliedFilters={rlsFilters}
//             setAppliedFilters={setRlsFilters}
//             onCancel={() => setShowRlsSettings(false)}
//             onSave={() => setShowRlsSettings(false)}
//             dbName={dbName}
//             selectedTables={Object.entries(selectedSchemaList ?? {}).map(
//               (v) => ({
//                 tableName: v[0],
//                 columns: v[1],
//               })
//             )}
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
//             xAxisColumn={xAxisColumn}
//           />
//         </Ui.Modal>
//       )}
//     </div>
//   );
// };

// export default MetricAiForm;
