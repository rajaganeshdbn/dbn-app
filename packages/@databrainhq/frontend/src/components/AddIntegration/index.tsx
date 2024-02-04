export {};

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react';
// import { useIntegrationsListQuery } from 'utils/generated/graphql';
// import { StepProps } from 'types/integration';
// import IntegrationForm from 'components/IntegrationForm';
// import IntegrationList from './components/IntegrationList';

// const AddIntegration: React.FC<StepProps> = ({
//   onComplete,
//   onConfigurationAdded,
//   isConfig,
// }) => {
//   const [selectedIntegration, setSelectedIntegration] =
//     useState<string>('Redshift');
//   const { data } = useIntegrationsListQuery();
//   const integrationDataList = data?.integrations;
//   const selectedIntegrationData = integrationDataList?.find(
//     (int) => int.name === selectedIntegration
//   );
//   return (
//     <div className="dbn-flex dbn-h-full dbn-gap-5">
//       <IntegrationList
//         integrationDataList={integrationDataList ?? []}
//         selectedIntegration={selectedIntegration}
//         setSelectedIntegration={setSelectedIntegration}
//       />
//       <div className="dbn-w-1/2 dbn-h-full dbn-overflow-y-auto dbn-pt-8 dbn-pb-5">
//         <IntegrationForm
//           integrationId={selectedIntegrationData?.id}
//           onComplete={onComplete}
//           onConfigurationAdded={onConfigurationAdded}
//         />
//       </div>
//     </div>
//   );
// };

// export default AddIntegration;
