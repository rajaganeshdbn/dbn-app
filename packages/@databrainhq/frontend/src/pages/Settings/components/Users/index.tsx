/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-relative-parent-imports */
import { useEffect, useMemo, useState } from 'react';
import { useUserListQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import SettingsLayout from 'pages/Settings';
import { useLocation } from 'react-router-dom';
import { UserData } from 'types/auth';
import Loader from 'components/Loader';
import { getCurrentUser } from 'helpers/application/auth';
import InviteUserForm from './components/InviteUserForm';
import UserTable from './components/UserTable';

const Users = () => {
  const [isShowUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState<UserData>();
  const {
    data: companyUserData,
    isLoading: isLoadingUsers,
    refetch,
  } = useUserListQuery(
    { companyId: getCurrentUser()?.companyId },
    { enabled: !!getCurrentUser()?.companyId }
  );
  useEffect(() => {
    refetch();
  }, [isShowUserModal, refetch]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewModeConfig = JSON.parse(
    localStorage.getItem('@app:viewModeConfig') || '{}'
  );
  const email = queryParams.get('email') || viewModeConfig.email;
  const firstName = queryParams.get('firstName') || viewModeConfig.firstName;
  const lastName = queryParams.get('lastName') || viewModeConfig.lastName;
  useEffect(() => {
    if (email && firstName && lastName) {
      setShowUserModal(true);
    }
  }, [email, firstName, lastName]);

  const { pendingUsers, approvedUsers } = useMemo(() => {
    const userList = companyUserData?.companies_by_pk?.users;
    const pendingUserList =
      userList?.filter(
        (u) => u.id !== getCurrentUser()?.id && !u.isAcceptedInvite
      ) || [];
    const pendingUsersWithURL = pendingUserList?.map((user) => ({
      ...user,
      invitationToken: user.invitationToken
        ? `${window?.location?.protocol}//${window?.location?.host}/users/acceptInvitation/${user.invitationToken}`
        : null,
    }));
    return {
      pendingUsers: pendingUsersWithURL || [],
      approvedUsers:
        userList?.filter(
          (u) => u.id !== getCurrentUser()?.id && u.isAcceptedInvite
        ) || [],
    };
  }, [companyUserData?.companies_by_pk?.users]);

  return (
    <SettingsLayout>
      <div className="dbn-w-full dbn-h-full dbn-px-5 dbn-pt-2">
        <Ui.Tabs.Context>
          <Ui.Tabs.List className="!dbn-px-5">
            <Ui.Tabs.Tab tabId="accepted" className="dbn-px-2">
              Accepted
            </Ui.Tabs.Tab>
            <Ui.Tabs.Tab tabId="pending" className="dbn-px-2">
              Pending
            </Ui.Tabs.Tab>
          </Ui.Tabs.List>
          <Ui.Tabs.Panel
            tabId="accepted"
            className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-5 dbn-py-10 dbn-px-5"
          >
            <UserTable
              isUsersTable
              userList={approvedUsers}
              onEditUser={(user) => {
                setEditUser(user);
                setShowUserModal(true);
              }}
              onInviteUser={() => setShowUserModal(true)}
              isLoading={isLoadingUsers}
            />
          </Ui.Tabs.Panel>
          <Ui.Tabs.Panel
            tabId="pending"
            className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-5 dbn-py-10 dbn-px-5"
          >
            <UserTable
              userList={pendingUsers}
              onEditUser={(user) => {
                setEditUser(user);
                setShowUserModal(true);
              }}
              onInviteUser={() => setShowUserModal(true)}
              isLoading={isLoadingUsers}
            />
          </Ui.Tabs.Panel>
        </Ui.Tabs.Context>
        <Ui.Panel
          isOpen={isShowUserModal}
          onClose={() => {
            setShowUserModal(false);
            setEditUser(undefined);
            localStorage.removeItem('@app:viewModeConfig');
          }}
          headerTitle="Invite User"
          hideFooter
        >
          <InviteUserForm
            config={{
              email: editUser?.email ?? email,
              firstName: editUser?.firstName ?? firstName,
              lastName: editUser?.lastName ?? lastName,
              isAdmin: editUser?.isAdmin,
              userRoles: editUser?.userRoles || viewModeConfig.viewAsRoles,
              userId: editUser?.id || viewModeConfig?.userId,
            }}
            onSuccess={() => {
              setShowUserModal(false);
              setEditUser(undefined);
              localStorage.removeItem('@app:viewModeConfig');
            }}
          />
        </Ui.Panel>
      </div>
    </SettingsLayout>
  );
};

export default Users;
