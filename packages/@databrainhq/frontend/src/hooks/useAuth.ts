import { isLoggedInAtom } from 'atoms/application';
import { useAtom } from 'jotai';
import { useForm, FieldValues } from 'react-hook-form';
import {
  useAcceptInvitationMutation,
  useReInviteUserMutation,
  useChangePasswordMutation,
  useDeleteUserMutation,
  useForgetPasswordMutation,
  useInviteUserMutation,
  useResetPasswordMutation,
  useSignInMutation,
  useSignUpMutation,
  useSignUpVerificationMutation,
  useOnboardingWithDemoDatabaseMutation,
  useCreateExternalMetricsMutation,
  useCreateExternalDashboardMetricsMutation,
  useUpdateExternalDashboardLayoutMutation,
  useUpdateCompanyMutation,
  useUpdateUserMutation,
  useChangeUsernameMutation,
} from 'utils/generated/graphql';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import graphqlErrorHandler from 'utils/graphqlErrorHandler';
import { useQueryClient } from 'react-query';
import segmentEvent from 'utils/segmentEvent';
import { consts } from '@databrainhq/plugin';
import { UserType } from 'types/auth';
import DEFAULT_ROLES from 'consts/defaultRoles';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import { layout, metricList } from 'consts/demoMetrics';
import { SIGNUP_RES_CODE } from 'consts/application';
import useAccessControl from 'hooks/useAccessControl';
import {
  storeUserToken,
  setCurrentUser,
  getCurrentUser,
  clearToken,
} from 'helpers/application/auth';
import useExternalDashboards from './useExternalDashboard';
import useDefaultTheme from './useDefaultTheme';

const useAuth = (onComplete?: () => void) => {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [error, setError] = useState('');
  const { errorHandler } = graphqlErrorHandler();
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);
  const [isInvited, setInvited] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [isMailShare, setMailShare] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [isSkippingWithDemo, setSkipingWithDemo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
    control,
    reset,
  } = useForm({ mode: 'onChange' });
  const { saveDefaultTheme } = useDefaultTheme();
  const redirectOnSuccess = (route: string) => {
    navigate(route);
  };
  const queryClient = useQueryClient();
  const selfHostedUrl = () =>
    consts.IS_SELF_HOSTED
      ? `${window.location.protocol}//${window.location.host}`
      : '';
  const { createCompanyRoles, assignUserRoles, deleteUserRoles } =
    useAccessControl();
  const signInMutation = useSignInMutation();
  const signUpMutation = useSignUpMutation();
  const inviteUserMutation = useInviteUserMutation();
  const reInviteUserMutation = useReInviteUserMutation();
  const acceptInvitationMutation = useAcceptInvitationMutation();
  const deleteUserMutation = useDeleteUserMutation();
  const forgetPasswordMutation = useForgetPasswordMutation();
  const resetPasswordMutation = useResetPasswordMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const changeUsernameMutation = useChangeUsernameMutation();
  const signupVerificationMutation = useSignUpVerificationMutation();
  const updateCompanyMutation = useUpdateCompanyMutation();
  const { createDashboard } = useExternalDashboards();
  const { mutate: createExternalMetrics } = useCreateExternalMetricsMutation();
  const { mutate: createExternalDashboardMetrics } =
    useCreateExternalDashboardMetricsMutation();
  const { mutate: updateExternalDashboardLayout } =
    useUpdateExternalDashboardLayoutMutation();

  const { mutate: skipAndProcessWithDemoDb } =
    useOnboardingWithDemoDatabaseMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const signIn = (data: any): void => {
    setError('');

    if (signInMutation.isLoading) {
      setDisabledSubmitButton(true);
    }
    setDisabledSubmitButton(() => true);
    signInMutation.mutate(data, {
      onSuccess: (res: any) => {
        setError('');
        if (res.signIn.error) {
          errorHandler(res.signIn.error, setError);
          setDisabledSubmitButton(false);
          segmentEvent('log in unsuccessful', {
            email: data.email,
            error: res.signIn.error,
          });
        } else {
          storeUserToken(res.signIn.token);
          const UserDetails = getCurrentUser(res.signIn.token || '');
          setIsLoggedIn(true);
          segmentEvent(
            { id: UserDetails?.id, type: 'log in' },
            UserDetails,
            'identify'
          );
          setError('');
          setDisabledSubmitButton(false);
          if (onComplete) {
            onComplete();
          } else {
            redirectOnSuccess('/');
          }
        }
      },
      onError: () => {
        segmentEvent('log in unsuccessful', {
          email: data.email,
          error: 'Connection failure',
        });
        setError('Connection failure');
        setDisabledSubmitButton(false);
      },
    });
  };

  const signUp = (data: any) => {
    setDisabledSubmitButton(true);
    setError('');
    setMailShare(false);
    signUpMutation.mutate(data, {
      onSuccess: async ({ signUp: signUpRes }) => {
        const signUpError = signUpRes?.error;
        const success = signUpRes?.success;
        const token = signUpRes?.token;
        if (signUpError) {
          setError(signUpError?.message);
          setDisabledSubmitButton(false);
          segmentEvent('sign Up unsuccessful', {
            email: data.email,
            error: signUpError.message,
          });
        }
        // self hosted app user
        else if (
          success &&
          success.code === SIGNUP_RES_CODE.SIGNUP_SUCCEEDED &&
          token
        ) {
          setError('');
          setIsLoggedIn(true);
          storeUserToken(token || '');
          const userDetails = getCurrentUser(token || '');
          await createCompanyRoles({
            objects: DEFAULT_ROLES.map((role) => ({
              ...role,
              companyId: userDetails?.companyId,
            })),
          });
          setDisabledSubmitButton(false);
          setError('');
          redirectOnSuccess('/');
        }
        // user with existing company
        else if (
          success &&
          success.code === SIGNUP_RES_CODE.INVITE_REQUEST_SENT
        ) {
          setDisabledSubmitButton(false);
          setError('');
          redirectOnSuccess('/users/inviteRequest');
        }
        // user with new company
        else if (
          success &&
          success.code === SIGNUP_RES_CODE.VERIFICATION_REQUEST_SENT
        ) {
          setDisabledSubmitButton(false);
          setError('');
          setMailShare(true);
          setTimeout(() => {
            redirectOnSuccess('/users/sign-in');
          }, 10000);
          reset();
        } else {
          segmentEvent('sign Up unsuccessful', {
            email: data.email,
            error: 'Connection failure',
          });
          setError('Connection failure');
          setDisabledSubmitButton(false);
        }
      },
      onError: () => {
        segmentEvent('sign Up unsuccessful', {
          email: data.email,
          error: 'Connection failure',
        });
        setError('Connection failure');
        setDisabledSubmitButton(false);
      },
    });
  };

  const signUpVerification = (token: string) => {
    clearToken();
    setDisabledSubmitButton(true);
    setError('');
    setMailShare(false);
    signupVerificationMutation.mutate(
      { token },
      {
        onSuccess: async ({ signUpVerification: signUpVerificationRes }) => {
          const signUpVerificationError = signUpVerificationRes?.error;

          if (signUpVerificationError) {
            setError(signUpVerificationError?.message);
            setDisabledSubmitButton(false);
            segmentEvent('sign Up verification unsuccessful', {
              email: token,
              error: signUpVerificationError.message,
            });
            onComplete?.();
          } else {
            setError('');
            setIsLoggedIn(true);
            storeUserToken(signUpVerificationRes?.token || '');
            const userDetails = getCurrentUser(
              signUpVerificationRes?.token || ''
            );
            await createCompanyRoles({
              objects: DEFAULT_ROLES.map((role) => ({
                ...role,
                companyId: userDetails?.companyId,
              })),
            });

            segmentEvent(
              { userId: userDetails?.id, type: 'sign up' },
              userDetails,
              'identify'
            );
            setDisabledSubmitButton(false);
            setError('');
            redirectOnSuccess('/');
          }
        },
        onError: () => {
          segmentEvent('sign Up verification unsuccessful', {
            email: token,
            error: 'Connection failure',
          });
          setError('Connection failure');
          setDisabledSubmitButton(false);
          onComplete?.();
        },
      }
    );
  };
  const inviteUser = (data: FieldValues) => {
    if (
      (!data.isAdmin && !data.roles?.length) ||
      !data.roles?.every(({ role, applyOn, workspaces }: any) => {
        if (!role.value) return false;
        if (!applyOn.value) return false;
        if (applyOn.value !== 'All Workspaces' && !workspaces.length)
          return false;
        return true;
      })
    ) {
      setError('Please provide roles to the user.');
      return;
    }
    setInvited(false);
    setError('');
    if (inviteUserMutation.isLoading) {
      setDisabledSubmitButton(true);
    }
    setDisabledSubmitButton(true);
    const inviteDetails = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      invitedBy: getCurrentUser()?.email,
      companyId: getCurrentUser()?.companyId,
      isAdmin: Boolean(data.isAdmin),
      appUrl: selfHostedUrl(),
    };
    inviteUserMutation.mutate(
      {
        ...inviteDetails,
      },
      {
        onSuccess: async (res) => {
          setError('');
          const errorMessage = res.inviteUser?.error;
          if (errorMessage) {
            segmentEvent('invite unsuccessful', {
              ...inviteDetails,
              name: `${data.firstName} ${data.lastName}`,
              error: errorMessage,
            });
            setError(errorMessage);
            setDisabledSubmitButton(false);
          } else {
            if (!data.isAdmin) {
              await assignUserRoles({
                userRoleObjects: data.roles?.map((roleObj: any) => ({
                  userId: res.inviteUser?.id,
                  companyRoleId: roleObj.role?.value,
                  applyOn: roleObj.applyOn?.value,
                  workspaces:
                    roleObj.workspaces?.map((wp: any) => wp.value) || [],
                })),
              });
            }
            segmentEvent('invite successful', inviteDetails);
            setDisabledSubmitButton(false);
            setError('');
            setInvited(true);
          }
        },
        onError: () => {
          segmentEvent('invite unsuccessful', {
            ...inviteDetails,
            name: `${data.firstName} ${data.lastName}`,
            error: 'Connection failure',
          });
          setError('Connection failure');
          setDisabledSubmitButton(false);
        },
      }
    );
  };

  const reInviteUser = (id: string, email: string, invitedBy: string) => {
    setInvited(false);
    setError('');
    if (reInviteUserMutation.isLoading) {
      setDisabledSubmitButton(true);
    }
    setDisabledSubmitButton(true);
    const reInviteDetails = {
      id,
      email,
      invitedBy,
      companyId: getCurrentUser()?.companyId,
    };
    reInviteUserMutation.mutate(
      {
        id,
        appUrl: selfHostedUrl(),
      },
      {
        onSuccess: (res) => {
          setError('');
          const errorMessage = res.reInviteUser?.error;
          if (errorMessage) {
            setError(errorMessage);
            setDisabledSubmitButton(false);
            segmentEvent('re invite unsuccessful', {
              ...reInviteDetails,
              error: errorMessage,
            });
          } else {
            segmentEvent('re invite successful', reInviteDetails);
            setDisabledSubmitButton(false);
            setError('');
            setInvited(true);
          }
        },
        onError: () => {
          segmentEvent('re invite unsuccessful', {
            ...reInviteDetails,
            error: 'Connection failure',
          });
          setError('Connection failure');
          setDisabledSubmitButton(false);
        },
      }
    );
  };

  const acceptInvitation = (data: FieldValues) => {
    clearToken();
    if (inviteUserMutation.isLoading) {
      setDisabledSubmitButton(true);
    }
    setError('');
    setDisabledSubmitButton(true);
    const inviteDetails = {
      email: data.email,
      invitedBy: getCurrentUser()?.email,
      companyId: getCurrentUser()?.companyId,
    };
    acceptInvitationMutation.mutate(
      {
        password: data.password,
        token: data.token,
      },
      {
        onSuccess: (res) => {
          setError('');
          const errorMessage = res.acceptInvitation?.error;
          const user = res.acceptInvitation?.user;
          if (errorMessage) {
            segmentEvent('accept invitation unsuccessful', {
              ...inviteDetails,
              error: errorMessage,
            });
            setError(errorMessage);
            setDisabledSubmitButton(false);
          } else if (user) {
            setIsLoggedIn(true);
            storeUserToken(user.token as string);
            const userDetails = getCurrentUser(user.token || '');
            setCurrentUser(userDetails as UserType);
            segmentEvent(
              { userId: user.id, type: 'invitation accepted' },
              userDetails,
              'identify'
            );
            setError('');
            setDisabledSubmitButton(false);
            redirectOnSuccess('/');
          }
        },
        onError: () => {
          segmentEvent('accept invitation unsuccessful', {
            ...inviteDetails,
            error: 'Connection failure',
          });
          setError('Connection failure');
          setDisabledSubmitButton(false);
        },
      }
    );
  };

  const removeUser = (id: string, email: string, onSuccess: () => void) => {
    setDisabledSubmitButton(true);
    setError('');

    const removeUserDetails = {
      id,
      email,
      invitedBy: getCurrentUser()?.email,
      companyId: getCurrentUser()?.companyId,
    };
    deleteUserMutation.mutate(
      { id },
      {
        onSuccess({ delete_users }) {
          setDisabledSubmitButton(false);

          if (delete_users?.returning.length) {
            const deletedUsers = delete_users.returning.map((user) => user.id);
            queryClient.setQueryData(
              ['UserList', { companyId: getCurrentUser()?.companyId }],
              (prev: any) => {
                const updatedUserList = prev.companies_by_pk.users.filter(
                  (u: any) => !deletedUsers.includes(u.id)
                );
                return {
                  ...prev,
                  companies_by_pk: { users: updatedUserList },
                };
              }
            );
            segmentEvent('delete user successful', removeUserDetails);
            onSuccess();
          } else {
            segmentEvent('delete user unsuccessful', {
              ...removeUserDetails,
              error: 'User not allowed to delete',
            });
            setError('you are not allowed to delete');
          }
        },
      }
    );
  };
  const forgetPassword = (data: FieldValues) => {
    setDisabledSubmitButton(true);
    setError('');
    setMailShare(false);
    forgetPasswordMutation.mutate(
      {
        email: data.email,
        appUrl: selfHostedUrl(),
      },
      {
        onSuccess: (res) => {
          setError('');
          const errorMessage = res.forgetPassword?.error?.message;
          const isSuccess = res.forgetPassword?.success;
          if (errorMessage) {
            segmentEvent('forget password unsuccessful', {
              email: data.email,
              error: errorMessage,
            });
            setError(errorMessage);
            setDisabledSubmitButton(false);
          } else if (isSuccess) {
            segmentEvent('forget password successful', {
              email: data.email,
              message: 'Password reset link sent to email',
            });
            setDisabledSubmitButton(false);
            setError('');
            setMailShare(true);
          } else {
            segmentEvent('forget password set unsuccessful', {
              email: data.email,
              error: SOMETHING_WENT_WRONG,
            });
            setError(SOMETHING_WENT_WRONG);
            setDisabledSubmitButton(false);
          }
        },
        onError: () => {
          segmentEvent('forget password set unsuccessful', {
            email: data.email,
            error: 'Connection failure',
          });
          setError('Connection failure');
          setDisabledSubmitButton(false);
        },
      }
    );
  };
  const resetPassword = (data: FieldValues) => {
    setDisabledSubmitButton(true);
    setError('');
    resetPasswordMutation.mutate(
      { password: data.password, token: data.token },
      {
        onSuccess: (res) => {
          setError('');
          const user = res.resetPassword?.data;
          if (res.resetPassword?.error) {
            segmentEvent('reset password unsuccessful', {
              email: data.email,
              error: res.resetPassword?.error || 'invalid or expired token',
            });
            setError('invalid or expired token');
            setDisabledSubmitButton(false);
          } else if (user) {
            setIsLoggedIn(true);
            storeUserToken(user.token as string);
            const userDetails = getCurrentUser();
            segmentEvent(
              { userId: user.id, type: 'reset password' },
              userDetails,
              'identify'
            );
            setError('');
            setDisabledSubmitButton(false);
            redirectOnSuccess('/');
          } else {
            segmentEvent('reset password unsuccessful', {
              email: data.email,
              error: SOMETHING_WENT_WRONG,
            });
            setError(SOMETHING_WENT_WRONG);
            setDisabledSubmitButton(false);
          }
        },
        onError: () => {
          segmentEvent('reset password unsuccessful', {
            email: data.email,
            error: 'Connection failure',
          });
          setError(SOMETHING_WENT_WRONG);
          setDisabledSubmitButton(false);
        },
      }
    );
  };
  const changePassword = (data: FieldValues) => {
    setDisabledSubmitButton(true);
    setError('');
    const changePassDetails = {
      email: getCurrentUser()?.email,
      firstName: getCurrentUser()?.firstName,
      lastName: getCurrentUser()?.lastName,
    };
    changePasswordMutation.mutate(
      {
        id: getCurrentUser()?.id as unknown as string,
        password: data.password,
      },
      {
        onSuccess: (res) => {
          setError('');
          const token = res.changePassword?.token;
          if (res.changePassword?.error) {
            segmentEvent('change password unsuccessful', {
              ...changePassDetails,
              error: res.changePassword?.error || 'invalid or expired token',
            });
            setError(SOMETHING_WENT_WRONG);
            setDisabledSubmitButton(false);
          } else if (token) {
            segmentEvent('change password successful', changePassDetails);
            storeUserToken(token as string);
            setError('');
            setDisabledSubmitButton(false);
            setShowModal(false);
          } else {
            segmentEvent('change password unsuccessful', {
              ...changePassDetails,
              error: SOMETHING_WENT_WRONG,
            });
            setError(SOMETHING_WENT_WRONG);
            setDisabledSubmitButton(false);
          }
        },
        onError: () => {
          segmentEvent('change password unsuccessful', {
            ...changePassDetails,
            error: 'Connection failure',
          });
          setError(SOMETHING_WENT_WRONG);
          setDisabledSubmitButton(false);
        },
      }
    );
  };

  const onboardWithDemoDb = async (workspaceId: string) => {
    if (!workspaceId) return;
    setSkipingWithDemo(true);
    await saveDefaultTheme(workspaceId);
    skipAndProcessWithDemoDb(
      { companyId: getCurrentUser()?.companyId || '', workspaceId },
      {
        onSuccess: (res) => {
          if (res.onboardingWithDemoDatabase?.status === 'success') {
            createDashboard(
              {
                companyId: getCurrentUser()?.companyId,
                externalDashboardId: 'dbn-demo',
                filters: [],
                name: 'demo dashboard',
                workspaceId,
              },
              {
                onSuccess({ insert_externalDashboards_one }) {
                  if (insert_externalDashboards_one?.id) {
                    createExternalMetrics(
                      {
                        objects: metricList.map((item, i) => ({
                          ...item,
                          createdBy: 'DataBrain',
                          integrationName:
                            insert_externalDashboards_one?.companyWorkspace
                              ?.companyIntegrations?.[0].name,
                          companyIntegrationId:
                            insert_externalDashboards_one?.companyWorkspace
                              ?.companyIntegrations?.[0].id,
                          metricId: `${insert_externalDashboards_one?.companyWorkspace?.companyIntegrations?.[0].id}_${i}`,
                          companyId: insert_externalDashboards_one?.companyId,
                        })),
                      },
                      {
                        onSuccess({ insert_externalMetrics }) {
                          createExternalDashboardMetrics(
                            {
                              objects: insert_externalMetrics?.returning?.map(
                                (item) => ({
                                  externalDashboardId:
                                    insert_externalDashboards_one?.id,
                                  externalMetricId: item.id,
                                })
                              ),
                            },
                            {
                              onSuccess({ insert_externalDashboardMetrics }) {
                                if (insert_externalDashboardMetrics) {
                                  updateExternalDashboardLayout(
                                    {
                                      id: insert_externalDashboards_one.id,
                                      layout: layout.map((i, index) => ({
                                        ...i,
                                        i: insert_externalMetrics?.returning?.[
                                          index
                                        ]?.id,
                                      })),
                                    },
                                    {
                                      onSuccess({
                                        update_externalDashboards_by_pk,
                                      }) {
                                        if (
                                          update_externalDashboards_by_pk?.layout
                                        ) {
                                          segmentEvent(
                                            'onboarded with demo dashboard',
                                            {
                                              company_id:
                                                getCurrentUser()?.companyId,
                                            }
                                          );
                                          createDashboard(
                                            {
                                              companyId:
                                                getCurrentUser()?.companyId,
                                              externalDashboardId: 'dbn-empty',
                                              filters: [],
                                              name: 'empty dashboard',
                                              workspaceId,
                                            },
                                            {
                                              onSuccess() {
                                                queryClient.setQueryData(
                                                  [
                                                    'GetOnboardingStatus',
                                                    {
                                                      companyId:
                                                        getCurrentUser()
                                                          ?.companyId,
                                                    },
                                                  ],
                                                  (prev: any) => {
                                                    return {
                                                      ...prev,
                                                      companies_by_pk: {
                                                        ...(prev?.companies_by_pk ||
                                                          {}),
                                                        isOnboarded: true,
                                                      },
                                                    };
                                                  }
                                                );
                                                setSkipingWithDemo(false);
                                                navigate('/');
                                              },
                                            }
                                          );

                                          // navigate('/');
                                        }
                                      },
                                    }
                                  );
                                }
                              },
                            }
                          );
                        },
                        onError(e) {
                          console.log(e);
                        },
                      }
                    );
                  }
                },
              }
            );
          }
        },
      }
    );
  };
  const onUpdateUserName = (
    data: {
      id: string;
      firstName: string;
      lastName: string;
    },
    onSuccess: (token: string) => void
  ) => {
    setError('');
    setDisabledSubmitButton(true);
    changeUsernameMutation.mutate(
      {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
      },
      {
        onSuccess: (res) => {
          if (res.changeUserName?.error) {
            setError(res.changeUserName.error.message);
            setDisabledSubmitButton(false);
          }
          if (res.changeUserName?.token) {
            storeUserToken(res.changeUserName.token);
            setDisabledSubmitButton(false);
            onSuccess(res.changeUserName.token);
          }
        },
        onError: () => {
          setError(SOMETHING_WENT_WRONG);
          setDisabledSubmitButton(false);
        },
      }
    );
  };
  const editUser = async (data: FieldValues) => {
    if (
      (!data.isAdmin && !data.roles?.length) ||
      !data.roles?.every(({ role, applyOn, workspaces }: any) => {
        if (!role.value) return false;
        if (!applyOn.value) return false;
        if (applyOn.value !== 'All Workspaces' && !workspaces.length)
          return false;
        return true;
      })
    ) {
      setError('Please provide roles to the user.');
      return;
    }
    setError('');
    setDisabledSubmitButton(true);
    const user = getCurrentUser();
    await updateUser(
      {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        isAdmin: Boolean(data.isAdmin),
      },
      {
        onSuccess: (res) => {
          if (res.update_users_by_pk) {
            queryClient.setQueryData(
              ['UserList', { companyId: user?.companyId }],
              (prev: any) => {
                return {
                  ...prev,
                  companies_by_pk: {
                    ...prev.companies_by_pk,
                    users: prev.companies_by_pk.users.map((usr: any) => {
                      return usr.id === data.userId
                        ? {
                            ...usr,
                            ...res.update_users_by_pk,
                          }
                        : usr;
                    }),
                  },
                };
              }
            );
          }
        },
      }
    );
    if (data.roles.length && !data.isAdmin) {
      await Promise.all([
        deleteUserRoles({
          userId: data.userId,
        }),
        assignUserRoles(
          {
            userRoleObjects: data.roles?.map((roleObj: any) => ({
              userId: data.userId,
              companyRoleId: roleObj.role?.value,
              applyOn: roleObj.applyOn?.value,
              workspaces: roleObj.workspaces?.map((wp: any) => wp.value) || [],
            })),
          },
          {
            onSuccess: (res) => {
              if (res.insert_userRoles?.returning.length) {
                queryClient.setQueryData(
                  ['UserList', { companyId: user?.companyId }],
                  (prev: any) => {
                    return {
                      ...prev,
                      companies_by_pk: {
                        ...prev.companies_by_pk,
                        users: prev.companies_by_pk.users.map((usr: any) => {
                          return usr.id === data.userId
                            ? {
                                ...usr,
                                userRoles: res.insert_userRoles?.returning,
                              }
                            : usr;
                        }),
                      },
                    };
                  }
                );
              }
            },
          }
        ),
      ]);
    }
    setError('');
    setInvited(true);
  };
  const updateCompanyDetails = (values: FieldValues) => {
    setError('');
    setDisabledSubmitButton(true);

    const website = values.website;
    const name = values.name;
    if (website && name && getCurrentUser()?.companyId) {
      updateCompanyMutation.mutate(
        {
          id: getCurrentUser()?.companyId,
          name,
          website,
        },
        {
          onSettled() {
            setDisabledSubmitButton(false);
          },
          onSuccess(data) {
            if (!data.update_companies_by_pk)
              queryClient.setQueryData(
                ['CompanyProfile', { id: getCurrentUser()?.companyId }],
                (prev: any) => {
                  return {
                    ...prev,
                    companies_by_pk: {
                      ...prev,
                      name: data.update_companies_by_pk?.name,
                      website: data.update_companies_by_pk?.website,
                    },
                  };
                }
              );
            setUpdated(true);
            setError('');
          },
          onError() {
            setError(SOMETHING_WENT_WRONG);
          },
        }
      );
    }
  };
  const onSignInSubmit = handleSubmit(signIn);
  const onSignUpSubmit = handleSubmit(signUp);
  const onInviteSubmit = handleSubmit(inviteUser);
  const onAcceptSubmit = handleSubmit(acceptInvitation);
  const onForgetPassword = handleSubmit(forgetPassword);
  const onResetPassword = handleSubmit(resetPassword);
  const onChangePassword = handleSubmit(changePassword);
  const onEditUser = handleSubmit(editUser);
  const onSaveCompanyProfile = handleSubmit(updateCompanyDetails);

  return {
    isSkippingWithDemo,
    onSignInSubmit,
    register,
    errors,
    onSignUpSubmit,
    error,
    isDisabledSubmitButton,
    onInviteSubmit,
    reInviteUser,
    isInvited,
    watch,
    getValues,
    onAcceptSubmit,
    setValue,
    removeUser,
    onForgetPassword,
    isMailShare,
    onResetPassword,
    onChangePassword,
    isShowModal,
    setShowModal,
    signUpVerification,
    onboardWithDemoDb,
    onEditUser,
    control,
    onSaveCompanyProfile,
    isUpdated,
    setUpdated,
    onUpdateUserName,
  };
};

export default useAuth;
