export {};

// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import {
//   useDefinitionsQuery,
//   useGetConnectionQuery,
// } from 'utils/generated/graphql';
// import { Link } from 'react-router-dom';
// import { Ui } from '@databrainhq/plugin';
// import { DESTINATION_DEFINITIONS, SOURCE_DEFINITIONS } from 'consts/values';
// import styles from './connections.module.css';

// const getSourceData = (
//   sources: [
//     {
//       sourceDefinitionId: string;
//       icon: string;
//       name: string;
//       sourceType: string;
//     }
//   ],
//   id: string
// ) => {
//   const data = sources?.find((s) => s.sourceDefinitionId === id);
//   return data;
// };

// const getDestinationData = (
//   destinations: [
//     { destinationDefinitionId: string; icon: string; name: string }
//   ],
//   id: string
// ) => {
//   const data = destinations?.find((s) => s.destinationDefinitionId === id);
//   return data;
// };
// const ConnectionItem = ({ connection }: any) => {
//   const { data, isLoading } = useGetConnectionQuery({
//     connectionId: connection.connectionId,
//   });
//   const connectionData = data?.getConnection?.data;
//   const { data: sources } = useDefinitionsQuery({
//     definitionType: SOURCE_DEFINITIONS,
//   });
//   const { data: destinations } = useDefinitionsQuery({
//     definitionType: DESTINATION_DEFINITIONS,
//   });
//   const sourceData = getSourceData(
//     sources?.definitions?.data?.sourceDefinitions,
//     connectionData?.source.sourceDefinitionId
//   );
//   const destinationData = getDestinationData(
//     destinations?.definitions?.data.destinationDefinitions,
//     connectionData?.destination.destinationDefinitionId
//   );

//   return (
//     <>
//       {connectionData && !isLoading && (
//         <div className={styles['connections-list-wrapper']}>
//           <div className={styles['connections-list-source']}>
//             <div className="dbn-flex dbn-gap-2 dbn-items-center">
//               <img
//                 src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                   sourceData?.icon as string
//                 )}`}
//                 alt=""
//                 width={30}
//                 height={30}
//               />
//               <div>
//                 <Ui.Text variant="heading">{sourceData?.name}</Ui.Text>
//                 <Ui.Text variant="body-text-sm">
//                   {sourceData?.sourceType}
//                 </Ui.Text>
//               </div>
//             </div>
//             <Ui.Icons name="double-arrow-right" />
//           </div>
//           <div className={styles['connections-list-destination']}>
//             <img
//               src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                 destinationData?.icon as string
//               )}`}
//               alt=""
//               width={30}
//               height={30}
//             />
//             <div>
//               <Ui.Text variant="heading">{destinationData?.name}</Ui.Text>
//               <Ui.Text variant="body-text-sm">datawarehouse</Ui.Text>
//             </div>
//           </div>
//           <Ui.Text variant="body-text-sm">
//             {`${connectionData?.schedule.units} ${connectionData?.schedule.timeUnit} once`}
//           </Ui.Text>
//           <Ui.Text variant="body-text-sm">
//             {/* // TODO: convert to hours ago */}
//             {new Date(
//               connectionData?.latestSyncJobCreatedAt * 1000
//             ).toUTCString()}
//           </Ui.Text>
//           <div className="dbn-flex dbn-gap-5">
//             {connectionData?.isSyncing && (
//               <div className={styles['connections-item-status-inprogress']}>
//                 <div className="dbn-rounded-full dbn-bg-[#5865F6]">
//                   <Ui.Icons name="not-found" />
//                   {/* active icon */}
//                 </div>
//                 <Ui.Text variant="body-text-sm" color="info">
//                   in progress
//                 </Ui.Text>
//               </div>
//             )}
//             {connectionData?.latestSyncJobStatus === 'failed' &&
//               connectionData?.status === 'active' && (
//                 <div className={styles['connections-item-status-failed']}>
//                   <div className="dbn-rounded-full dbn-bg-[#9C3F0F]">
//                     <Ui.Icons name="not-found" />
//                     {/* active icon */}
//                   </div>
//                   <Ui.Text variant="body-text-sm" color="alert">
//                     Failed
//                   </Ui.Text>
//                 </div>
//               )}
//             {connectionData?.status === 'inactive' && (
//               <div className={styles['connections-item-status-pause']}>
//                 <div className="dbn-rounded-full dbn-bg-[#FDB915]">
//                   <Ui.Icons name="not-found" />
//                   {/* paused icon */}
//                 </div>
//                 <Ui.Text variant="body-text-sm">Paused</Ui.Text>
//               </div>
//             )}
//             {connectionData?.latestSyncJobStatus === 'succeeded' &&
//               connectionData?.status === 'active' &&
//               !connectionData?.isSyncing && (
//                 <div className={styles['connections-item-status-active']}>
//                   <div className="dbn-rounded-full dbn-bg-[#0CBE69]">
//                     <Ui.Icons name="not-found" />
//                     {/* active icon */}
//                   </div>
//                   <Ui.Text variant="body-text-sm" color="success">
//                     Active
//                   </Ui.Text>
//                 </div>
//               )}
//             <Link to={`/connection/${connectionData.connectionId}`}>
//               <Ui.Text variant="body-text-sm" color="info">
//                 <Ui.Icons name="pencil-simple" />
//                 Edit
//               </Ui.Text>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ConnectionItem;
