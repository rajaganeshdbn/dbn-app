export {};

// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { Link, useParams } from 'react-router-dom';
// import { useGetConnectionQuery } from 'utils/generated/graphql';
// import { useEffect, useState } from 'react';
// import { Ui } from '@databrainhq/plugin';
// import { STATUS_TAB, STREAM_TAB } from 'consts/values';
// import ModeDropDown from 'components/ModeDropDown';
// import useJob from 'hooks/useJob';
// import styles from './connection.module.css';
// import SyncJob from './components/SyncJob';

// const Connection = () => {
//   const { id } = useParams();
//   const { data } = useGetConnectionQuery(
//     {
//       connectionId: id,
//     },
//     { enabled: !!id }
//   );
//   const [streamDataList, setStreamDataList] = useState<any[]>([]);
//   const [selectedStreams, setSelectedStreams] = useState<any[]>([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [selectedTab, setSelectedTab] = useState(STATUS_TAB);
//   const { connectionJobData, onSyncSubmit } = useJob({ id });
//   useEffect(() => {
//     setStreamDataList(data?.getConnection?.data?.syncCatalog?.streams);
//   }, [data]);
//   useEffect(() => {
//     setSelectedStreams(streamDataList);
//   }, [streamDataList]);
//   const fileteredStreamList = streamDataList?.filter((s) =>
//     s.stream.name.toLowerCase().includes(searchKeyword)
//   );

//   return (
//     <>
//       {connectionJobData && (
//         <div className={styles['connection-container']}>
//           <Link
//             to="/integrations/connections"
//             className={styles['connection-back-btn']}
//           >
//             <Ui.Icons name="arrow-left" /> Back
//           </Link>
//           <div className="">
//             <div className={styles['connection-header']}>
//               <div className="dbn-flex dbn-items-center dbn-gap-5">
//                 <img
//                   src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                     connectionJobData?.source?.icon
//                   )}`}
//                   alt=""
//                   width={30}
//                   height={30}
//                 />
//                 <div>
//                   <Ui.Text variant="heading">
//                     {connectionJobData?.source?.name}
//                   </Ui.Text>
//                   <Ui.Text variant="body-text-sm">
//                     {connectionJobData?.sourceName}
//                   </Ui.Text>
//                 </div>
//               </div>
//               <Ui.Icons name="not-found" />
//               <div className="dbn-flex dbn-items-center dbn-gap-5">
//                 <img
//                   src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                     connectionJobData?.destination?.icon
//                   )}`}
//                   alt=""
//                   width={30}
//                   height={30}
//                 />
//                 <div>
//                   <Ui.Text variant="heading">
//                     {connectionJobData?.destination?.name}
//                   </Ui.Text>
//                   <Ui.Text variant="body-text-sm">
//                     {connectionJobData?.destinationName}
//                   </Ui.Text>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="dbn-flex dbn-items-center dbn-gap-5">
//             <Ui.Button type="button" variant="primary">
//               <Ui.Text variant="body-text-sm">Status</Ui.Text>
//             </Ui.Button>
//             <Ui.Button
//               type="button"
//               variant="primary"
//               onClick={() => setSelectedTab(STREAM_TAB)}
//             >
//               <Ui.Text variant="body-text-sm">Streams</Ui.Text>
//             </Ui.Button>
//           </div>
//           {selectedTab === STATUS_TAB && (
//             <div className={styles['connection-body']}>
//               <div className={styles['connection-body-head']}>
//                 <Ui.Text variant="heading">Sync History</Ui.Text>
//                 <Ui.Button
//                   type="button"
//                   variant="primary"
//                   className={styles['connection-sync-button']}
//                   onClick={onSyncSubmit}
//                 >
//                   <Ui.Icons name="not-found" /> sync now
//                 </Ui.Button>
//               </div>
//               {connectionJobData?.jobList?.map((job: any) => (
//                 <SyncJob job={job} key={job.job.id} />
//               ))}
//             </div>
//           )}
//           {selectedTab === STREAM_TAB && (
//             <div className={styles['connection-body']}>
//               <div className={styles['mapdata-table-container']}>
//                 <div>
//                   <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
//                 </div>
//                 <div className={styles['mapdata-table-wrapper']}>
//                   <div className={styles['mapdata-table-head']}>
//                     <div className={styles['mapdata-table-first-col']}>
//                       <Ui.Text>Sync</Ui.Text>
//                     </div>
//                     <div className={styles['mapdata-table-main-col']}>
//                       <Ui.Text>Name</Ui.Text>
//                     </div>
//                     <div className={styles['mapdata-table-col']}>
//                       <Ui.Text>Source mode</Ui.Text>
//                     </div>
//                     <div className={styles['mapdata-table-col']}>
//                       <Ui.Text>Destination mode</Ui.Text>
//                     </div>
//                     <div className={styles['mapdata-table-col']}>
//                       <Ui.Text>Cursor field</Ui.Text>
//                     </div>
//                     <div className={styles['mapdata-table-col']}>
//                       <Ui.Text>primary key</Ui.Text>
//                     </div>
//                   </div>
//                   <div className={styles['mapdata-table-body']}>
//                     {fileteredStreamList?.map((item: any) => (
//                       <div
//                         className={styles['mapdata-table-body-wrapper']}
//                         key={`${item.stream.name}`}
//                       >
//                         <div className={styles['mapdata-table-first-col']}>
//                           {!item.config.selected ? (
//                             <Ui.Button
//                               type="button"
//                               variant="tertiary"
//                               onClick={() => {
//                                 setSelectedStreams((prevStreams) => [
//                                   ...prevStreams,
//                                   item,
//                                 ]);
//                               }}
//                             >
//                               <Ui.Icons name="not-found" />
//                               {/* uncheck icon */}
//                             </Ui.Button>
//                           ) : (
//                             <Ui.Button
//                               type="button"
//                               variant="tertiary"
//                               onClick={() => {
//                                 setSelectedStreams(
//                                   selectedStreams.filter(
//                                     (s) => s.stream.name !== item.stream.name
//                                   )
//                                 );
//                               }}
//                             >
//                               <Ui.Icons name="not-found" />
//                               {/* check icon */}
//                             </Ui.Button>
//                           )}
//                         </div>
//                         <div className={styles['mapdata-table-main-col']}>
//                           <Ui.Text variant="body-text-sm">
//                             {item.stream.name}
//                           </Ui.Text>
//                         </div>
//                         <div className={styles['mapdata-table-col']}>
//                           <div className="dbn-w-full">
//                             <ModeDropDown
//                               options={item.stream.supportedSyncModes?.map(
//                                 (mode: string) => mode
//                               )}
//                               name={item.stream.name}
//                               selectedStreams={selectedStreams}
//                               setSelectedStreams={setSelectedStreams}
//                               changeField="source"
//                               defaultValue={item.config.syncMode}
//                               isDisabled={item.config.selected}
//                             />
//                           </div>
//                         </div>
//                         <div className={styles['mapdata-table-col']}>
//                           <div className="dbn-w-full dbn-flex dbn-items-center">
//                             <ModeDropDown
//                               options={['append', 'overwrite']}
//                               name={item.stream.name}
//                               selectedStreams={selectedStreams}
//                               setSelectedStreams={setSelectedStreams}
//                               changeField="destination"
//                               defaultValue={item.config.destinationSyncMode}
//                               isDisabled={item.config.selected}
//                             />
//                           </div>
//                         </div>
//                         <div className={styles['mapdata-table-col']}>
//                           <Ui.Text variant="body-text-sm">
//                             {item.stream.sourceDefinedCursor
//                               ? item.config.cursorField.map(
//                                   (field: string) => field
//                                 )
//                               : 'none'}
//                           </Ui.Text>
//                         </div>
//                         <div className={styles['mapdata-table-col']}>
//                           <Ui.Text variant="body-text-sm">
//                             {item.stream.sourceDefinedPrimaryKey?.map(
//                               (keyArray: string[]) =>
//                                 keyArray.map((key: string) => key)
//                             )}
//                           </Ui.Text>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className={styles['mapdata-schedule-container']}>
//                   <Ui.Text variant="heading">Scheduled:</Ui.Text>
//                   <Ui.Text variant="body-text-sm">
//                     {`${data?.getConnection?.data?.schedule?.units} ${data?.getConnection?.data?.schedule?.timeUnit} once`}
//                   </Ui.Text>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Connection;
