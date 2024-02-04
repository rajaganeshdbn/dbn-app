export {};

// import { Link } from 'react-router-dom';
// import { useGetDestinationListQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// // import Ui.Button from 'components/Ui.Button/Ui.Button';
// // import Ui.Text from 'components/Ui.Text/Ui.Text';
// import { getCurrentUser } from 'helpers/application/auth';
// import styles from './destinations.module.css';

// const DestinationCard = ({ destination, isOnlyConnected }: any) => {
//   const user = getCurrentUser();

//   const { data } = useGetDestinationListQuery({
//     workspaceId: user?.workspaceId,
//   });
//   const connectedDestination =
//     data?.getDestinationList?.data?.destinations?.find(
//       (d: any) =>
//         d.destinationDefinitionId === destination?.destinationDefinitionId
//     );

//   return (
//     <>
//       {connectedDestination && (
//         <div className={styles['destinationCard-container']}>
//           <div className={styles['destinationCard-inner-container']}>
//             <img
//               src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                 destination?.icon
//               )}`}
//               alt=""
//               className="dbn-max-h-[50px] dbn-max-w-[50px] dbn-h-full dbn-w-full"
//             />
//             <Ui.Text variant="heading">{destination?.name}</Ui.Text>
//           </div>
//           <div className="dbn-flex dbn-justify-evenly dbn-pb-3">
//             <div className="dbn-flex dbn-items-center dbn-gap-2">
//               <div className="dbn-rounded-full dbn-bg-[#0CBE69]">
//                 <Ui.Icons name="not-found" />
//                 {/* active icon */}
//               </div>
//               <Ui.Text variant="body-text-sm" color="success">
//                 Connected
//               </Ui.Text>
//             </div>
//             <Link to={`/destination/${connectedDestination.destinationId}`}>
//               <Ui.Button variant="secondary" type="button">
//                 Configure
//               </Ui.Button>
//             </Link>
//           </div>
//         </div>
//       )}
//       {!connectedDestination && !isOnlyConnected && (
//         <div className={styles['destinationCard-container']}>
//           <div className={styles['destinationCard-inner-container']}>
//             <img
//               src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                 destination?.icon
//               )}`}
//               alt=""
//               className="dbn-max-h-[50px] dbn-max-w-[50px] dbn-h-full dbn-w-full"
//             />
//             <Ui.Text variant="heading">{destination?.name}</Ui.Text>
//           </div>
//           <Link to={`/destination/${destination.destinationDefinitionId}`}>
//             <Ui.Button variant="tertiary" type="button">
//               Connect
//             </Ui.Button>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default DestinationCard;
