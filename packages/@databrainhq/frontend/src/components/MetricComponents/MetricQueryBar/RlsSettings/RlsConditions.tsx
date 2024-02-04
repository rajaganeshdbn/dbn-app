export {};
// import React from 'react';
// import { useCompanyRlsFilterListQuery } from 'utils/generated/graphql';
// import { Ui, types } from '@databrainhq/plugin';
// import { RLS_CONDITIONS } from 'consts/values';
// import CompletedStatus from 'components/CompletedStatus';
// import { getCurrentUser } from 'helpers/application/auth';

// export type RlsConditionsProps = {
//   appliedConditions: types.RlsFilterObjectType[];
//   onApply: (filter: types.RlsFilterObjectType) => void;
//   onRemove: (id: string) => void;
//   onSelectOperator: (filter: types.RlsFilterObjectType) => void;
// };

// const RlsConditions: React.FC<RlsConditionsProps> = ({
//   appliedConditions,
//   onRemove,
//   onApply,
//   onSelectOperator,
// }) => {
//   const { data: companyRlsData, isLoading } = useCompanyRlsFilterListQuery(
//     {
//       companyId: getCurrentUser()?.companyId,
//     },
//     { enabled: !!getCurrentUser()?.companyId }
//   );
//   const conditions = companyRlsData?.companyRlsFilters;
//   return (
//     <>
//       {appliedConditions.length ? (
//         <div className="dbn-border dbn-rounded-md dbn-my-3 dbn-px-2 dbn-py-5">
//           <Ui.Text variant="body-text-sm">Conditions</Ui.Text>
//           <ul className="dbn-flex dbn-flex-wrap dbn-gap-2 dbn-mb-2">
//             {appliedConditions.map((condition, index) => {
//               const isLast = index === appliedConditions.length - 1;
//               return (
//                 <li key={condition.id}>
//                   <span className="dbn-bg-slate-100 dbn-rounded-full dbn-py-3 dbn-px-5 dbn-mr-2">
//                     {condition.name.split('___').join(' ')}
//                   </span>
//                   {!isLast && (
//                     <select
//                       onChange={({ target: { value } }) =>
//                         onSelectOperator({ ...condition, operator: value })
//                       }
//                       defaultValue={condition.operator}
//                       defaultChecked
//                       className="dbn-border-b-2 dbn-border-gray-500 dbn-border-dashed dbn-outline-none dbn-w-14 dbn-cursor-pointer dbn-text-center"
//                     >
//                       <option>and</option>
//                       <option>or</option>
//                     </select>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       ) : null}
//       {isLoading ? (
//         <div className="dbn-flex dbn-justify-center dbn-items-center">
//           <Ui.Icons name="not-found" />
//           {/* Loading icon */}
//         </div>
//       ) : (
//         <>
//           <table className="dbn-w-full dbn-my-5" cellPadding={5}>
//             <thead className="dbn-text-left">
//               <tr className="dbn-bg-slate-200">
//                 <th className="dbn-p-2.5 dbn-text-[#182C60]">
//                   RLS Condition Name
//                 </th>
//                 <th className="dbn-p-2.5 dbn-text-[#182C60]">
//                   Condition Column
//                 </th>
//                 <th className="dbn-p-2.5 dbn-text-[#182C60]">Created By</th>
//                 <th className="dbn-p-2.5 dbn-text-[#182C60]">Creation Date</th>
//                 <th className="dbn-p-2.5 dbn-text-[#182C60]">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {conditions?.map((condition) => (
//                 <tr key={condition.id}>
//                   <td className="dbn-p-2.5 dbn-text-[#182C60]">
//                     {condition.name}
//                   </td>
//                   <td className="dbn-p-2.5 dbn-text-[#182C60]">
//                     {condition.columnName}
//                     {RLS_CONDITIONS[condition.condition]}
//                     {condition.defaultValue || `{{${condition.columnName}}}`}
//                   </td>
//                   <td className="dbn-p-2.5 dbn-text-[#182C60]">{`${condition.user.firstName} ${condition.user.lastName}`}</td>
//                   <td className="dbn-p-2.5 dbn-text-[#182C60]">
//                     {new Date(condition.createdAt).toDateString()}
//                   </td>
//                   <td className="dbn-p-2.5">
//                     {appliedConditions.find(
//                       (applied) => applied.id === condition.id
//                     ) ? (
//                       <span className="dbn-flex dbn-items-center dbn-justify-evenly dbn-py-1">
//                         <CompletedStatus text="Applied" />
//                         <Ui.Button
//                           onClick={() => onRemove(condition.id)}
//                           variant="tertiary"
//                           type="button"
//                           leftIcon={<Ui.Icons name="cross" />}
//                         />
//                       </span>
//                     ) : (
//                       <Ui.Button
//                         variant="primary"
//                         type="button"
//                         onClick={() => onApply(condition)}
//                       >
//                         Apply Condition
//                       </Ui.Button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {conditions?.length === 0 && (
//             <div className="dbn-text-center">No Data Available</div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default React.memo(RlsConditions);
