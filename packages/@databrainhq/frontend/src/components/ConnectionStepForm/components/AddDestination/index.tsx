export {};
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useGetDestinationListQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// import { getCurrentUser } from 'helpers/application/auth';
// import Destination from './Destination';
// import styles from './addDestination.module.css';

// const AddDestination = ({
//   setDestinationId,
//   setDestinationDefinitionId,
//   setStep,
// }: any) => {
//   const [searchKeyword, setSearchKeyword] = useState('');

//   const user = getCurrentUser();

//   const { data } = useGetDestinationListQuery({
//     workspaceId: user?.workspaceId,
//   });

//   const connectedDestinationList =
//     data?.getDestinationList?.data?.destinations?.filter((d: any) =>
//       d.name.toLowerCase().includes(searchKeyword)
//     );

//   return (
//     <>
//       <div className={styles['addDestination-container']}>
//         <div className={styles['addDestination-header']}>
//           <Ui.Text>Add Destination</Ui.Text>
//         </div>
//         <div className={styles['addDestination-wrapper']}>
//           <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
//           <Ui.Text variant="body-text-sm">
//             Select from already connected Destinations
//           </Ui.Text>
//           <div className={styles['addDestination-destination-list']}>
//             {!!connectedDestinationList?.length &&
//               connectedDestinationList?.map((destination: any) => (
//                 <Destination
//                   destination={destination}
//                   key={destination?.destinationId}
//                   setDestinationId={setDestinationId}
//                   setDestinationDefinitionId={setDestinationDefinitionId}
//                   setStep={setStep}
//                 />
//               ))}
//             {!connectedDestinationList?.length && (
//               <Ui.Text variant="body-text-sm">No destination connected</Ui.Text>
//             )}
//           </div>
//         </div>
//       </div>
//       <div>
//         <Ui.Text variant="body-text-sm">-OR-</Ui.Text>
//         <Link to="/integrations/Destinations" className="">
//           <Ui.Text variant="body-text-sm">+ Link Destination</Ui.Text>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default AddDestination;
