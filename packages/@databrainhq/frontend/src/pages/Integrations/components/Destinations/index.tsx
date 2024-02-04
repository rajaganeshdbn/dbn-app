export {};
// import { useRef, useState } from 'react';
// import { useDefinitionsQuery } from 'utils/generated/graphql';
// import { Ui, hooks } from '@databrainhq/plugin';
// import {
//   DESTINATION_AIRBYTE_IDS,
//   DESTINATION_DEFINITIONS,
// } from 'consts/values';
// import DestinationCard from './DestinationCard';
// import OtherDestinations from './OtherDestinations';
// import styles from './destinations.module.css';

// const Destinations = () => {
//   const wrapperRef = useRef(null);
//   const [isShowFilterOption, setShowFilterOption] = useState(false);
//   const [isOnlyConnected, setOnlyConnected] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   hooks.useOutsideAlerter({
//     wrapRef: wrapperRef,
//     onOutsideClick: () => setShowFilterOption(false),
//   });

//   const { data: destinations, isLoading } = useDefinitionsQuery({
//     definitionType: DESTINATION_DEFINITIONS,
//   });
//   const destinationDefinitionList =
//     destinations?.definitions?.data.destinationDefinitions;

//   const filteredDestinationList = destinationDefinitionList?.filter(
//     (item: { destinationDefinitionId: string; name: string }) =>
//       (item.destinationDefinitionId === DESTINATION_AIRBYTE_IDS.Snowflake ||
//         item.destinationDefinitionId === DESTINATION_AIRBYTE_IDS.Redshift ||
//         item.destinationDefinitionId === DESTINATION_AIRBYTE_IDS.BigQuery) &&
//       item.name.toLowerCase().includes(searchKeyword)
//   );

//   const otherDestinationList = destinationDefinitionList?.filter(
//     (item: { destinationDefinitionId: string; name: string }) =>
//       item.destinationDefinitionId !== DESTINATION_AIRBYTE_IDS.Snowflake &&
//       item.destinationDefinitionId !== DESTINATION_AIRBYTE_IDS.BigQuery &&
//       item.destinationDefinitionId !== DESTINATION_AIRBYTE_IDS.Redshift
//   );
//   const filteredOtherDestinationList = otherDestinationList?.filter(
//     (item: { name: string }) => item.name.toLowerCase().includes(searchKeyword)
//   );
//   return (
//     <>
//       <div ref={wrapperRef} className={styles['destination-filter-container']}>
//         <Ui.Button
//           type="button"
//           variant="tertiary"
//           onClick={() => setShowFilterOption(!isShowFilterOption)}
//           leftIcon={<Ui.Icons name="funnel" />}
//         />
//         {isShowFilterOption && (
//           <div className={styles['destination-filter-warapper']}>
//             <Ui.Button
//               type="button"
//               variant="tertiary"
//               onClick={() => setOnlyConnected(false)}
//             >
//               All
//             </Ui.Button>
//             <Ui.Button
//               type="button"
//               variant="tertiary"
//               onClick={() => setOnlyConnected(true)}
//             >
//               Connected
//             </Ui.Button>
//           </div>
//         )}
//       </div>
//       <div className={styles['destination-search-container']}>
//         <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
//       </div>
//       <div className={styles['destinations-container']}>
//         <Ui.Text variant="heading">
//           {isOnlyConnected ? 'Connected' : 'All'}
//         </Ui.Text>
//         <div className={styles['destinations-list-container']}>
//           {!!filteredDestinationList?.length &&
//             filteredDestinationList
//               .sort((a: { name: number }, b: { name: number }) =>
//                 a.name > b.name ? 1 : -1
//               )
//               .map((destination: any) => (
//                 <DestinationCard
//                   destination={destination}
//                   isOnlyConnected={isOnlyConnected}
//                 />
//               ))}
//           {!!filteredOtherDestinationList?.length &&
//             filteredOtherDestinationList
//               .sort((a: { name: number }, b: { name: number }) =>
//                 a.name > b.name ? 1 : -1
//               )
//               .map((destination: any) => (
//                 <OtherDestinations
//                   destination={destination}
//                   isOnlyConnected={isOnlyConnected}
//                 />
//               ))}
//         </div>
//         {!filteredDestinationList?.length &&
//           isLoading &&
//           !otherDestinationList && (
//             <div className={styles['destinations-loader-container']}>
//               <Ui.Icons name="not-found" /> {/* loadig icon */}
//             </div>
//           )}
//       </div>
//     </>
//   );
// };

// export default Destinations;
