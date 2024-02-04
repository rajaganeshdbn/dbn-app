export {};

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unnecessary-condition */
// import { useCallback, useEffect, useState } from 'react';
// import {
//   useCreateExternalDashboardMetricsMutation,
//   useCreateExternalMetricsMutation,
//   useGetOnboardingStatusQuery,
//   useOnboardingWithDemoDatabaseMutation,
//   useUpdateExternalDashboardLayoutMutation,
//   useUpdateOnboardStatusMutation,
// } from 'utils/generated/graphql';
// import { useNavigate } from 'react-router-dom';
// import { Ui } from '@databrainhq/plugin';
// import { useAtom } from 'jotai';
// import { workspaceAtom } from 'atoms/application';
// import segmentEvent from 'utils/segmentEvent';
// import { layout, metricList } from 'consts/demoMetrics';
// import AddIntegration from 'components/AddIntegration';
// import AddOrgTable from 'components/AddOrgTable';
// import Loader from 'components/Loader';
// import useStepper from 'hooks/useStepper';
// import useWorkspace from 'hooks/useWorkspace';
// import useExternalDashboards from 'hooks/useExternalDashboard';
// import { getCurrentUser } from 'helpers/application/auth';
// import { setCurrentWorkspace } from 'helpers/application/workspace';
// import styles from './onboarding.module.css';
// import TimeLine from './components/TimeLine';

// const OnboardingLayout = () => {
//   console.log('OnboardingLayout');

//   const navigate = useNavigate();
//   const user = getCurrentUser();
//   const { workspaces, workspace } = useWorkspace();
//   const [, setWorkspace] = useAtom(workspaceAtom);
//   const [isSkippingWithDemo, setSkipingWithDemo] = useState(false);
//   const { mutateAsync: updateOnboarding, isLoading } =
//     useUpdateOnboardStatusMutation({
//       onSuccess: () => {
//         segmentEvent('onboarding completed');
//         navigate('/');
//       },
//     });
//   const { createDashboard } = useExternalDashboards();
//   const { mutate: createExternalMetrics } = useCreateExternalMetricsMutation();
//   const { mutate: createExternalDashboardMetrics } =
//     useCreateExternalDashboardMetricsMutation();
//   const { mutate: updateExternalDashboardLayout } =
//     useUpdateExternalDashboardLayoutMutation();
//   const { mutate: skipAndProcessWithDemoDb, isLoading: isSkipping } =
//     useOnboardingWithDemoDatabaseMutation({
//       onSuccess: (res) => {
//         setSkipingWithDemo(true);

//         if (res.onboardingWithDemoDatabase?.status === 'success') {
//           createDashboard(
//             {
//               companyId: getCurrentUser()?.companyId,
//               externalDashboardId: 'ex-demo',
//               filters: [],
//               name: 'demo',
//               workspaceId: workspaces[0]?.id,
//             },
//             {
//               onSuccess({ insert_externalDashboards_one }) {
//                 if (insert_externalDashboards_one?.id) {
//                   createExternalMetrics(
//                     {
//                       objects: metricList.map((item, i) => ({
//                         ...item,
//                         createdBy: 'DataBrain',
//                         integrationName:
//                           insert_externalDashboards_one?.companyWorkspace
//                             ?.companyIntegrations?.[0].name,
//                         companyIntegrationId:
//                           insert_externalDashboards_one?.companyWorkspace
//                             ?.companyIntegrations?.[0].id,
//                         metricId: `${insert_externalDashboards_one?.companyWorkspace?.companyIntegrations?.[0].id}_${i}`,
//                         companyId: insert_externalDashboards_one?.companyId,
//                       })),
//                     },
//                     {
//                       onSuccess({ insert_externalMetrics }) {
//                         createExternalDashboardMetrics(
//                           {
//                             objects: insert_externalMetrics?.returning?.map(
//                               (item) => ({
//                                 externalDashboardId:
//                                   insert_externalDashboards_one?.id,
//                                 externalMetricId: item.id,
//                               })
//                             ),
//                           },
//                           {
//                             onSuccess({ insert_externalDashboardMetrics }) {
//                               if (insert_externalDashboardMetrics) {
//                                 updateExternalDashboardLayout(
//                                   {
//                                     id: insert_externalDashboards_one.id,
//                                     layout: layout.map((i, index) => ({
//                                       ...i,
//                                       i: insert_externalMetrics?.returning?.[
//                                         index
//                                       ]?.id,
//                                     })),
//                                   },
//                                   {
//                                     onSuccess({
//                                       update_externalDashboards_by_pk,
//                                     }) {
//                                       if (
//                                         update_externalDashboards_by_pk?.layout
//                                       ) {
//                                         setSkipingWithDemo(false);
//                                         segmentEvent(
//                                           'onboarded with demo dashboard',
//                                           {
//                                             company_id:
//                                               getCurrentUser()?.companyId,
//                                           }
//                                         );
//                                         navigate('/');
//                                       }
//                                     },
//                                   }
//                                 );
//                               }
//                             },
//                           }
//                         );
//                       },
//                       onError(e) {
//                         console.log(e);
//                       },
//                     }
//                   );
//                 }
//               },
//             }
//           );
//         }
//       },
//     });
//   const { data: onboardingData } = useGetOnboardingStatusQuery(
//     {
//       companyId: user?.companyId,
//     },
//     {
//       enabled: !!user?.companyId,
//     }
//   );

//   const [stepsCompleted, setStepsCompleted] = useState(0);

//   const updateOnboardingStatus = useCallback(() => {
//     updateOnboarding({
//       id: user?.companyId,
//       isOnboarded: true,
//     });
//   }, [user?.companyId, updateOnboarding]);

//   useEffect(() => {
//     if (!onboardingData?.companies_by_pk?.isOnboarded) {
//       if (workspaces[0] && !workspace) {
//         setWorkspace(workspaces[0]);
//         setCurrentWorkspace(workspaces[0]);
//       }
//       return;
//     }
//     navigate('/configuration');
//   }, [onboardingData?.companies_by_pk?.isOnboarded, workspaces[0]]);

//   const steps = [
//     <AddIntegration onComplete={() => setStepsCompleted(1)} />,
//     <AddOrgTable onComplete={() => setStepsCompleted(2)} />,
//   ];

//   const { stepCount, currentStep, goBack, goNext, isLastStep } = useStepper({
//     steps,
//   });

//   const handleNext = () => {
//     if (stepsCompleted >= 2) {
//       updateOnboardingStatus();
//     }
//     goNext();
//   };

//   const isFinishing = isLoading && 'Finishing...';

//   return (
//     <div className={styles['onboarding-layout']}>
//       {isSkipping || isSkippingWithDemo ? (
//         <div className="dbn-absolute dbn-top-0 dbn-left-0 dbn-right-0 dbn-bottom-0 dbn-z-50 dbn-bg-black dbn-bg-opacity-50">
//           <Loader />
//         </div>
//       ) : null}
//       <TimeLine step={stepCount} totalSteps={steps.length} />
//       <div className="dbn-w-full dbn-h-full">{currentStep}</div>
//       <div className="dbn-w-1/2 dbn-flex dbn-gap-5 dbn-py-5 dbn-px-10 dbn-fixed dbn-bottom-0 dbn-bg-white dbn-z-10">
//         {stepCount === 1 ? (
//           <Ui.Button
//             variant="secondary"
//             type="button"
//             onClick={() =>
//               skipAndProcessWithDemoDb({
//                 companyId: user?.companyId as string,
//                 workspaceId: workspaces?.[0]?.id,
//               })
//             }
//           >
//             Skip And Proceed With Demo Database
//           </Ui.Button>
//         ) : (
//           <Ui.Button
//             variant="secondary"
//             type="button"
//             onClick={goBack}
//             isDisabled={isLoading}
//           >
//             Back
//           </Ui.Button>
//         )}
//         <Ui.Button
//           variant="primary"
//           type="button"
//           isDisabled={stepsCompleted !== stepCount || isLoading}
//           onClick={handleNext}
//         >
//           {isLastStep ? isFinishing || 'Finish' : 'Next'}
//         </Ui.Button>
//       </div>
//     </div>
//   );
// };

// export default OnboardingLayout;
