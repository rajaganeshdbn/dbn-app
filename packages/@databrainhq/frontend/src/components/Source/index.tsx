export {};
// import { Link, useParams } from 'react-router-dom';
// import { useGetSourceListQuery } from 'utils/generated/graphql';
// import { Ui } from '@databrainhq/plugin';
// import SourceForm from 'components/SourceForm/SourceForm';
// import { getCurrentUser } from 'helpers/application/auth';
// import styles from './source.module.css';
// import SourceConfigurationForm from './SourceConfigurationForm';

// const Source = () => {
//   const { id } = useParams();
//   const user = getCurrentUser();

//   const { data, isLoading } = useGetSourceListQuery({
//     workspaceId: user?.workspaceId,
//   });
//   const connectedSource = data?.getSourceList?.data?.find(
//     (s) => s.sourceId === id
//   );

//   return (
//     <div className={styles['source-container']}>
//       <div className={styles.backArrow}>
//         <Link to="/integrations/sources">
//           <Ui.Icons name="arrow-left" />
//         </Link>
//         <Ui.Text variant="heading-lg">Back</Ui.Text>
//       </div>
//       <div className={styles['source-alt-container']}>
//         {!connectedSource && !isLoading && <SourceForm id={id} />}
//         {connectedSource && !isLoading && (
//           <SourceConfigurationForm sourceData={connectedSource} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Source;
