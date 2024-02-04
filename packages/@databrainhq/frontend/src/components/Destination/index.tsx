export {};

// import { Link, useParams } from 'react-router-dom';
// import { useGetDestinationListQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// import DestinationForm from 'components/DestinationForm/DestinationForm';
// import { getCurrentUser } from 'helpers/application/auth';
// import DestinationConfigurationForm from './DestinationConfigurationForm';
// import styles from './destination.module.css';

// const Destination = () => {
//   const { id } = useParams();
//   const user = getCurrentUser();

//   const { data, isLoading } = useGetDestinationListQuery({
//     workspaceId: user?.workspaceId,
//   });
//   const connectedDestination =
//     data?.getDestinationList?.data?.destinations?.find(
//       (d: any) => d.destinationId === id
//     );

//   return (
//     <div className={styles['destination-container']}>
//       <div className={styles.backArrow}>
//         <Link to="/integrations/destinations">
//           <Ui.Icons name="arrow-left" />
//         </Link>
//         <Ui.Text variant="heading-lg">Back</Ui.Text>
//       </div>
//       <div className={styles['destinationConfig-alt-container']}>
//         {!connectedDestination && !isLoading && <DestinationForm id={id} />}
//         {connectedDestination && !isLoading && (
//           <DestinationConfigurationForm
//             destinationData={connectedDestination}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Destination;
