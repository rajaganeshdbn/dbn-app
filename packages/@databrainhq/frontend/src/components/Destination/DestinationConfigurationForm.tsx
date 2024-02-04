export {};
// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useGetIntegrationSpecificationQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// import { NONE, TESTED } from 'consts/values';
// import IntegrationFormFields from 'components/IntegrationFormFields/IntegrationFormFields';
// import useDestination from 'hooks/useDestination';
// import styles from './destination.module.css';

// const DestinationConfigurationForm = ({ destinationData }: any) => {
//   const [destinationState, setDestinationState] = useState(NONE);
//   const [error, setError] = useState('');
//   const [isDisabled, setDisabled] = useState(false);
//   const { handleSubmit, register, watch, control } = useForm();
//   const navigate = useNavigate();

//   const { testDestination, updateDestination, deleteDestination } =
//     useDestination({
//       setDisabled,
//       id: destinationData.destinationDefinitionId,
//       setDestinationState,
//       setError,
//       destinationId: destinationData.destinationId,
//       navigate,
//     });

//   const { data: integrations } = useGetIntegrationSpecificationQuery({
//     integrationId: destinationData.destinationDefinitionId,
//   });
//   const destinationSpecs = integrations?.integrationSpecifications[0];

//   return (
//     <div className={styles['destinationConfig-container']}>
//       <div className={styles['destinationConfig-header']}>
//         <Ui.Text variant="body-text-sm">
//           Configure {destinationData.destinationName}
//         </Ui.Text>
//       </div>
//       <form
//         className="dbn-w-full dbn-h-full dbn-p-5"
//         onSubmit={handleSubmit(testDestination)}
//       >
//         {destinationSpecs && (
//           <IntegrationFormFields
//             fields={destinationSpecs.fields}
//             watch={watch}
//             control={control}
//             register={register}
//             defaultValues={{
//               name: destinationData.name,
//               ...destinationData.connectionConfiguration,
//             }}
//           />
//         )}
//         {error && <Ui.Text variant="body-text-sm">{error}</Ui.Text>}
//         <div className={styles['destinationConfig-btn-container']}>
//           <div className="dbn-flex dbn-gap-5 dbn-items-center dbn-mt-4">
//             {destinationState === NONE && (
//               <>
//                 <Ui.Button
//                   type="submit"
//                   variant="primary"
//                   isDisabled={isDisabled}
//                 >
//                   Test destination
//                 </Ui.Button>
//                 {isDisabled && (
//                   <Ui.Text variant="body-text-sm">testing...</Ui.Text>
//                 )}
//               </>
//             )}
//             {destinationState === TESTED && (
//               <>
//                 <Ui.Button
//                   type="button"
//                   variant="primary"
//                   onClick={handleSubmit(updateDestination)}
//                   isDisabled={isDisabled}
//                 >
//                   Update
//                 </Ui.Button>
//                 {isDisabled ? (
//                   <Ui.Text variant="body-text-sm" color="info">
//                     updating...
//                   </Ui.Text>
//                 ) : (
//                   <Ui.Text variant="body-text-sm" color="success">
//                     Test successful
//                   </Ui.Text>
//                 )}
//               </>
//             )}
//           </div>
//           <Ui.Button
//             type="button"
//             variant="secondary"
//             onClick={handleSubmit(deleteDestination)}
//           >
//             Delete destination
//           </Ui.Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DestinationConfigurationForm;
