export {};
// import { useRef, useState } from 'react';
// import { useDefinitionsQuery } from 'utils/generated/graphql';
// import { Ui, hooks } from '@databrainhq/plugin';
// import { SOURCE_AIRBYTE_IDS, SOURCE_DEFINITIONS } from 'consts/values';
// import SourceCard from './SourceCard';
// import OtherSources from './OtherSources';
// import styles from './sources.module.css';

// const Sources = () => {
//   const wrapperRef = useRef(null);
//   const [isShowFilterOption, setShowFilterOption] = useState(false);
//   const [isOnlyConnected, setOnlyConnected] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   hooks.useOutsideAlerter({
//     wrapRef: wrapperRef,
//     onOutsideClick: () => setShowFilterOption(false),
//   });
//   const { data: sources, isLoading } = useDefinitionsQuery({
//     definitionType: SOURCE_DEFINITIONS,
//   });

//   const sourceDefinitionList = sources?.definitions?.data?.sourceDefinitions;
//   const filteredSourceList = sourceDefinitionList?.filter(
//     (item: { sourceDefinitionId: string; name: string }) =>
//       (item.sourceDefinitionId === SOURCE_AIRBYTE_IDS.Salesforce ||
//         item.sourceDefinitionId === SOURCE_AIRBYTE_IDS.HubSpot ||
//         item.sourceDefinitionId === SOURCE_AIRBYTE_IDS.GoogleAds ||
//         item.sourceDefinitionId === SOURCE_AIRBYTE_IDS.Stripe ||
//         item.sourceDefinitionId === SOURCE_AIRBYTE_IDS.Postgres) &&
//       item.name.toLowerCase().includes(searchKeyword)
//   );

//   const otherSourceList = sourceDefinitionList?.filter(
//     (item: { sourceDefinitionId: string; name: string }) =>
//       item.sourceDefinitionId !== SOURCE_AIRBYTE_IDS.Salesforce &&
//       item.sourceDefinitionId !== SOURCE_AIRBYTE_IDS.HubSpot &&
//       item.sourceDefinitionId !== SOURCE_AIRBYTE_IDS.GoogleAds &&
//       item.sourceDefinitionId !== SOURCE_AIRBYTE_IDS.Stripe &&
//       item.sourceDefinitionId !== SOURCE_AIRBYTE_IDS.Postgres
//   );
//   const filteredOtherSourceList = otherSourceList?.filter(
//     (item: { name: string }) => item.name.toLowerCase().includes(searchKeyword)
//   );

//   return (
//     <>
//       <div ref={wrapperRef} className={styles['source-filter-container']}>
//         <Ui.Button
//           type="button"
//           variant="tertiary"
//           onClick={() => setShowFilterOption(!isShowFilterOption)}
//           leftIcon={<Ui.Icons name="funnel" />}
//         />
//         {isShowFilterOption && (
//           <div className={styles['source-filter-warapper']}>
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
//       <div className={styles['source-search-container']}>
//         <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
//       </div>
//       <div className={styles['sources-container']}>
//         <Ui.Text variant="heading">
//           {isOnlyConnected ? 'Connected' : 'All'}
//         </Ui.Text>
//         <div className={styles['sources-list-container']}>
//           {!!filteredSourceList?.length &&
//             filteredSourceList
//               .sort((a: { name: number }, b: { name: number }) =>
//                 a.name > b.name ? 1 : -1
//               )
//               .map((source: any) => (
//                 <SourceCard source={source} isOnlyConnected={isOnlyConnected} />
//               ))}
//           {!!filteredOtherSourceList?.length &&
//             filteredOtherSourceList
//               .sort((a: { name: number }, b: { name: number }) =>
//                 a.name > b.name ? 1 : -1
//               )
//               .map((source: any) => (
//                 <OtherSources
//                   source={source}
//                   isOnlyConnected={isOnlyConnected}
//                 />
//               ))}
//         </div>
//         {!filteredSourceList?.length && isLoading && !otherSourceList && (
//           <div className={styles['sources-loader-container']}>
//             <Ui.Icons name="not-found" />
//             {/* loading icon */}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sources;
