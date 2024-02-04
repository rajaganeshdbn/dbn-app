export {};
// import React, { useCallback, useState } from 'react';
// import { useCreateCompanyRlsFilterMutation } from 'utils/generated/graphql';
// import { Ui, types } from '@databrainhq/plugin';
// import { ELASTICSEARCH } from 'consts/application';
// import { getCurrentUser } from 'helpers/application/auth';
// import CreateNewFilter, { RlsFilterType } from './CreateNewFilter';
// import RlsConditions, { RlsConditionsProps } from './RlsConditions';

// export type RlsSettingsProps = {
//   appliedFilters: RlsConditionsProps['appliedConditions'];
//   setAppliedFilters: React.Dispatch<
//     React.SetStateAction<RlsConditionsProps['appliedConditions']>
//   >;
//   selectedTables: { tableName: string; columns: types.SelectedColumns[] }[];
//   onCancel: () => void;
//   onSave: () => void;
//   dbName?: string;
// };

// const RlsSettings: React.FC<RlsSettingsProps> = ({
//   selectedTables,
//   appliedFilters,
//   setAppliedFilters,
//   onCancel,
//   onSave,
//   dbName,
// }) => {
//   const user = getCurrentUser();
//   const [tabTitle, setTabTitle] = useState('RLS Conditions');
//   const [rlsFilter, setRlsFilter] = useState<RlsFilterType>({
//     name: '',
//     table: '',
//     column: '',
//     condition: '',
//     defaultValue: '',
//   });

//   const updateFilter = useCallback((filter: types.RlsFilterObjectType) => {
//     setAppliedFilters((prev) => {
//       const prevValue = prev;
//       const index = prevValue.findIndex((f) => f.id === filter.id);
//       if (index === -1) return prev;
//       prevValue[index] = filter;
//       return [...prevValue];
//     });
//   }, []);

//   const rlsTabs = [
//     {
//       title: 'RLS Conditions',
//       element: (
//         <RlsConditions
//           appliedConditions={appliedFilters}
//           onApply={(filter) => setAppliedFilters((prev) => [...prev, filter])}
//           onRemove={(id) =>
//             setAppliedFilters((prev) =>
//               prev.filter((appliedFilter) => appliedFilter.id !== id)
//             )
//           }
//           onSelectOperator={updateFilter}
//         />
//       ),
//     },
//     {
//       title: 'Create New',
//       element: (
//         <CreateNewFilter
//           value={rlsFilter}
//           onChange={(value) => setRlsFilter((prev) => ({ ...prev, ...value }))}
//           selectedTables={selectedTables}
//         />
//       ),
//     },
//   ];

//   const { mutateAsync: createCompanyRlsFilter, isLoading } =
//     useCreateCompanyRlsFilterMutation();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (
//       !rlsFilter.name ||
//       !rlsFilter.table ||
//       !rlsFilter.column ||
//       !rlsFilter.condition
//     )
//       return;
//     await createCompanyRlsFilter(
//       {
//         columnName: rlsFilter.column,
//         companyId: user?.companyId,
//         condition: rlsFilter.condition,
//         defaultValue: rlsFilter.defaultValue,
//         name: rlsFilter.name,
//         tableName:
//           dbName?.toLowerCase() === ELASTICSEARCH
//             ? rlsFilter.table.split('.').slice(1).join('.')
//             : rlsFilter.table,
//         userId: user?.id,
//       },
//       {
//         onSuccess: () => {
//           onSave();
//         },
//       }
//     );
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className="dbn-w-[900px] dbn-h-[400px] dbn-pt-2.5">
//           <ul className="dbn-flex dbn-gap-5 dbn-px-5 dbn-border-b">
//             {rlsTabs.map((tab) => (
//               <li
//                 key={tab.title}
//                 className={`dbn-text-center dbn-text-[#182C60] dbn-font-semibold dbn-cursor-pointer dbn-px-2 dbn-pb-1 dbn-border-b-2 ${
//                   tabTitle === tab.title
//                     ? 'dbn-text-blue-h4 dbn-border-blue-h4'
//                     : 'dbn-border-transparent'
//                 }`}
//               >
//                 <Ui.Button
//                   variant="tertiary"
//                   type="button"
//                   onClick={() => setTabTitle(tab.title)}
//                 >
//                   {tab.title}
//                 </Ui.Button>
//               </li>
//             ))}
//           </ul>
//           <div className="dbn-p-5 dbn-h-[95%] dbn-text-[#182C60] dbn-flex dbn-flex-col dbn-gap-[22px] dbn-overflow-y-auto">
//             {rlsTabs.find((tab) => tab.title === tabTitle)?.element}
//           </div>
//         </div>
//         {tabTitle === 'Create New' && (
//           <Ui.ModalFooter>
//             <>
//               <Ui.Button type="button" variant="tab" onClick={onCancel}>
//                 <Ui.Text variant="body-text-sm">Cancel</Ui.Text>
//               </Ui.Button>
//               <Ui.Button type="submit" variant="primary" isDisabled={isLoading}>
//                 <Ui.Text variant="body-text-sm">
//                   {isLoading ? 'Saving...' : 'Save'}
//                 </Ui.Text>
//               </Ui.Button>
//             </>
//           </Ui.ModalFooter>
//         )}
//       </form>
//     </>
//   );
// };

// export default React.memo(RlsSettings);
