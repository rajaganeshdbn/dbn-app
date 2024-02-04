export {};

// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useGetIntegrationSpecificationQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// import { NONE, TESTED } from 'consts/values';
// import IntegrationFormFields from 'components/IntegrationFormFields/IntegrationFormFields';
// import useSource from 'hooks/useSource';
// import styles from './source.module.css';

// const SourceConfigurationForm = ({ sourceData }: any) => {
//   const [sourceState, setSourceState] = useState(NONE);
//   const [error, setError] = useState('');
//   const [isDisabled, setDisabled] = useState(false);
//   const { handleSubmit, register, watch, control } = useForm();
//   const navigate = useNavigate();

//   const { testSource, updateSource, deleteSource } = useSource({
//     setDisabled,
//     id: sourceData.sourceDefinitionId,
//     setSourceState,
//     setError,
//     sourceId: sourceData.sourceId,
//     navigate,
//   });

//   const { data: integrations } = useGetIntegrationSpecificationQuery({
//     integrationId: sourceData.sourceDefinitionId,
//   });
//   const sourceSpecs = integrations?.integrationSpecifications[0];

//   return (
//     <div className={styles['sourceConfig-container']}>
//       <div className={styles['sourceConfig-header']}>
//         <Ui.Text variant="body-text-sm">
//           Configure {sourceData.sourceName}
//         </Ui.Text>
//       </div>
//       <form
//         className="dbn-w-full dbn-h-full dbn-p-5"
//         onSubmit={handleSubmit(testSource)}
//       >
//         {sourceSpecs && (
//           <IntegrationFormFields
//             fields={sourceSpecs.fields}
//             watch={watch}
//             register={register}
//             control={control}
//             defaultValues={{
//               name: sourceData.sourceName,
//               ...sourceData.connectionConfiguration,
//             }}
//           />
//         )}
//         {error && (
//           <Ui.Text variant="body-text-sm" color="alert">
//             {error}
//           </Ui.Text>
//         )}
//         <div className={styles['sourceConfig-btn-container']}>
//           <div className="dbn-flex dbn-gap-5 dbn-items-center dbn-mt-4">
//             {sourceState === NONE && (
//               <>
//                 <Ui.Button
//                   type="submit"
//                   variant="primary"
//                   isDisabled={isDisabled}
//                 >
//                   Test Source
//                 </Ui.Button>
//                 {isDisabled && (
//                   <Ui.Text variant="body-text-sm" color="info">
//                     testing...
//                   </Ui.Text>
//                 )}
//               </>
//             )}
//             {sourceState === TESTED && (
//               <>
//                 <Ui.Button
//                   type="button"
//                   variant="primary"
//                   onClick={handleSubmit(updateSource)}
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
//             onClick={handleSubmit(deleteSource)}
//           >
//             Delete Source
//           </Ui.Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SourceConfigurationForm;
