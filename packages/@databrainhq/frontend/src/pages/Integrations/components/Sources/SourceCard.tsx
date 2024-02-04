export {};
// import { useGetSourceListQuery } from 'utils/generated/graphql';
// import { Link } from 'react-router-dom';
// import { Ui } from '@databrainhq/plugin';
// import { getCurrentUser } from 'helpers/application/auth';
// import styles from './sources.module.css';

// const SourceCard = ({ source, isOnlyConnected }: any) => {
//   const user = getCurrentUser();

//   const { data } = useGetSourceListQuery({
//     workspaceId: user?.workspaceId,
//   });
//   const connectedSource = data?.getSourceList?.data?.find(
//     (s) => s.sourceDefinitionId === source?.sourceDefinitionId
//   );

//   return (
//     <>
//       {connectedSource && (
//         <div className={styles['sourceCard-container']}>
//           <div className={styles['sourceCard-inner-container']}>
//             <img
//               src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                 source?.icon
//               )}`}
//               alt=""
//               className="dbn-max-h-[50px] dbn-max-w-[50px] dbn-h-full dbn-w-full"
//             />
//             <Ui.Text variant="heading">{source?.name}</Ui.Text>
//           </div>
//           <div className="dbn-flex dbn-justify-around dbn-items-center dbn-p-1">
//             <div className="dbn-flex dbn-items-center dbn-gap-2">
//               <div className="dbn-rounded-full dbn-bg-[#0CBE69]">
//                 <Ui.Icons name="not-found" />
//                 {/* active icon */}
//               </div>
//               <Ui.Text variant="body-text-sm" color="success">
//                 Connected
//               </Ui.Text>
//             </div>
//             <Link to={`/source/${connectedSource.sourceId}`}>
//               <Ui.Button variant="secondary" type="button">
//                 Configure
//               </Ui.Button>
//             </Link>
//           </div>
//         </div>
//       )}
//       {!connectedSource && !isOnlyConnected && (
//         <div className={styles['sourceCard-container']}>
//           <div className={styles['sourceCard-inner-container']}>
//             <img
//               src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
//                 source?.icon
//               )}`}
//               alt=""
//               className="dbn-max-h-[50px] dbn-max-w-[50px] dbn-h-full dbn-w-full"
//             />
//             <Ui.Text variant="heading">{source?.name}</Ui.Text>
//           </div>
//           <Link to={`/source/${source.sourceDefinitionId}`}>
//             <Ui.Button variant="tertiary" type="button">
//               Connect
//             </Ui.Button>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default SourceCard;
