export {};
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { Ui } from '@databrainhq/plugin';
// import { useGetConnectionsListQuery } from 'utils/generated/graphql';
// import EmptyConnection from 'components/Svg/Empty Integrations.svg';
// import { getCurrentUser } from 'helpers/application/auth';
// import ConnectionItem from './ConnectionItem';
// import styles from './connections.module.css';

// const Connections = () => {
//   const [connectionsList, setConnectionsList] = useState([]);
//   const user = getCurrentUser();
//   const { data, isLoading } = useGetConnectionsListQuery({
//     workspaceId: user?.workspaceId,
//   });
//   useEffect(() => {
//     setConnectionsList(data?.getConnectionsList?.data.connections || []);
//   }, [data]);
//   return (
//     <>
//       <div className={styles['connections-btn']}>
//         <Link to="/connection">
//           <Ui.Button type="button" variant="primary">
//             + New Connection
//           </Ui.Button>
//         </Link>
//       </div>
//       <div className={styles['connections-container']}>
//         {!!connectionsList.length && !isLoading && (
//           <div className={styles['connections-wrapper']}>
//             <Ui.Text variant="heading">All</Ui.Text>
//             <div className={styles['connections-list-container']}>
//               <div className={styles['connections-list-header']}>
//                 <Ui.Text variant="heading">Source</Ui.Text>
//                 <Ui.Text variant="heading">Destination</Ui.Text>
//                 <Ui.Text variant="heading">Frequency of Sync</Ui.Text>
//                 <Ui.Text variant="heading">Last Synced</Ui.Text>
//                 <Ui.Text variant="heading">Synced Status</Ui.Text>
//               </div>
//               {connectionsList.map(
//                 (connection: {
//                   connectionId: string;
//                   status: string;
//                   schedule: any;
//                   name: string;
//                 }) => (
//                   <ConnectionItem
//                     connection={connection}
//                     key={connection.name}
//                   />
//                 )
//               )}
//             </div>
//           </div>
//         )}
//         {!connectionsList.length && !isLoading && (
//           <div className={styles['connections-alt-container']}>
//             <div className={styles['connections-alt-wrapper']}>
//               <div className="dbn-w-[600px] dbn-h-[600px]">
//                 <img src={EmptyConnection} alt="" />
//               </div>
//               <div
//                 className={`${styles['connections-alt-wrapper']} -dbn-mt-[200px]`}
//               >
//                 <Ui.Text variant="heading">
//                   No Connections established yet
//                 </Ui.Text>
//                 <Ui.Text variant="body-text-sm">
//                   Start creating a new connection or simply connect to your
//                   sources & destinations to establish a connection later
//                 </Ui.Text>
//               </div>
//             </div>
//           </div>
//         )}
//         {isLoading && (
//           <div className={styles['connections-loader-container']}>
//             <Ui.Icons name="not-found" /> {/* loading icon */}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Connections;
