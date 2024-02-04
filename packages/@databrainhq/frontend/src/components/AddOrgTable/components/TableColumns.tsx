export {};

// import React, { useEffect } from 'react';
// import { Ui } from '@databrainhq/plugin';
// import { SelectedOrgTable, StepProps } from 'types/integration';
// import { ELASTICSEARCH } from 'consts/application';
// import styles from './SchemaTable/schemaTable.module.css';

// type TableColumnsProps = StepProps & {
//   setSelectedTable: React.Dispatch<React.SetStateAction<SelectedOrgTable>>;
//   selectedTable: SelectedOrgTable;
//   dbName?: string;
// };

// const TableColumns: React.FC<TableColumnsProps> = ({
//   selectedTable,
//   setSelectedTable,
//   onComplete,
//   dbName,
// }) => {
//   useEffect(() => {
//     if (!selectedTable.primaryKeyColumn || !selectedTable.clientNameColumn)
//       return;
//     onComplete?.();
//   }, [
//     selectedTable.primaryKeyColumn,
//     selectedTable.clientNameColumn,
//     onComplete,
//   ]);

//   return (
//     <>
//       <div className={styles['schemaTable-container']}>
//         <Ui.Text variant="body-text-sm">
//           Select the attributes such as your custumers identifiable unique id
//           and name.
//         </Ui.Text>
//         <Ui.Text variant="heading-lg">
//           <Ui.Icons name="table" />
//           {dbName?.toLowerCase() === ELASTICSEARCH
//             ? selectedTable.name.split('.').slice(1).join('.')
//             : selectedTable.name}
//         </Ui.Text>
//         <div>
//           <div className="">
//             <Ui.Select
//               label="Primary Key"
//               value={selectedTable.primaryKeyColumn}
//               onChange={(value) =>
//                 setSelectedTable((prev) => ({
//                   ...prev,
//                   primaryKeyColumn: value,
//                 }))
//               }
//               options={selectedTable.columnList.map((col) => ({
//                 value: col.name,
//                 label: col.name,
//               }))}
//             />
//             <Ui.Text variant="body-text-sm">
//               Choose the column that contains the primary key of the customer.
//               (i.e. id, user_id, client_id, org_id, etc)
//             </Ui.Text>
//           </div>
//           <div className="dbn-mt-5">
//             <Ui.Select
//               label="Customer Name"
//               value={selectedTable.clientNameColumn}
//               onChange={(value) => {
//                 setSelectedTable((prev) => ({
//                   ...prev,
//                   clientNameColumn: value,
//                 }));
//               }}
//               options={selectedTable.columnList.map((col) => ({
//                 value: col.name,
//                 label: col.name,
//               }))}
//             />
//             <Ui.Text variant="body-text-sm">
//               Choose the column that contains the name of the customer. (i.e.
//               name, client_name, org_name, company_name, etc)
//             </Ui.Text>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default React.memo(TableColumns);
