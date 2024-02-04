export {};
// import { useState } from 'react';
// import TimeLine from './components/Timeline/Timeline';
// import AddSource from './components/AddSource';
// import AddDestination from './components/AddDestination';
// import styles from './connectionStepForm.module.css';
// import MapData from './components/MapData/MapData';

// type Step = 1 | 2 | 3 | 4;

// const ConnectionStepForm = () => {
//   const [step, setStep] = useState<Step>(1);
//   const [sourceId, setSourceId] = useState<String>('');
//   const [destinationId, setDestinationId] = useState<String>('');
//   const [sourceName, setSourceName] = useState<String>('');
//   const [sourceDefinitionId, setSourceDefinitionId] = useState<String>('');
//   const [destinationDefinitionId, setDestinationDefinitionId] =
//     useState<String>('');
//   return (
//     <div className={styles['connectionStepForm-container']}>
//       <div className={styles['connectionStepForm-wrapper']}>
//         <TimeLine step={step} />
//         <div className="">
//           {step === 1 && (
//             <AddSource
//               setSourceDefinitionId={setSourceDefinitionId}
//               setStep={setStep}
//               setSourceName={setSourceName}
//               setSourceId={setSourceId}
//             />
//           )}
//           {step === 2 && (
//             <AddDestination
//               setDestinationDefinitionId={setDestinationDefinitionId}
//               setStep={setStep}
//               setDestinationId={setDestinationId}
//             />
//           )}
//           {step === 3 && (
//             <MapData
//               sourceId={sourceId}
//               destinationId={destinationId}
//               sourceName={sourceName}
//               sourceDefinitionId={sourceDefinitionId}
//               destinationDefinitionId={destinationDefinitionId}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConnectionStepForm;
