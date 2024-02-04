export {};
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useGetSourceListQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// import { getCurrentUser } from 'helpers/application/auth';
// import styles from './addSource.module.css';
// import Source from './Source';

// const AddSource = ({
//   setSourceId,
//   setSourceDefinitionId,
//   setSourceName,
//   setStep,
// }: any) => {
//   const user = getCurrentUser();
//   const [searchKeyword, setSearchKeyword] = useState('');

//   const { data } = useGetSourceListQuery({
//     workspaceId: user?.workspaceId,
//   });

//   const connectedSourceList = data?.getSourceList?.data?.filter((s) =>
//     s.name.toLowerCase().includes(searchKeyword)
//   );

//   return (
//     <>
//       <div className={styles['addSource-container']}>
//         <div className={styles['addSource-header']}>
//           <Ui.Text>Add Source</Ui.Text>
//         </div>
//         <div className={styles['addSource-wrapper']}>
//           <Ui.SearchTab setSearchKeyword={setSearchKeyword} />
//           <Ui.Text variant="body-text-sm">
//             Select from already connected sources
//           </Ui.Text>
//           <div className={styles['addSource-source-list']}>
//             {!!connectedSourceList?.length &&
//               connectedSourceList.map((source) => (
//                 <Source
//                   source={source}
//                   key={source?.sourceId}
//                   setSourceId={setSourceId}
//                   setSourceName={setSourceName}
//                   setSourceDefinitionId={setSourceDefinitionId}
//                   setStep={setStep}
//                 />
//               ))}
//             {!connectedSourceList?.length && (
//               <Ui.Text variant="body-text-sm">No source connected</Ui.Text>
//             )}
//           </div>
//         </div>
//       </div>
//       <div>
//         <Ui.Text variant="body-text-sm">-OR-</Ui.Text>
//       </div>
//       <Link to="/integrations/sources" className="dbn-w-[200px]">
//         <Ui.Text variant="body-text-sm">+ Link Source</Ui.Text>
//       </Link>
//     </>
//   );
// };

// export default AddSource;
