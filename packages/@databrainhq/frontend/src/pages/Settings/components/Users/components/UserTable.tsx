import { Ui } from '@databrainhq/plugin';
import { useMemo } from 'react';
import { UserData } from 'types/auth';
import AccessControl from 'components/AccessControl';
import style from './usertable.module.css';
import ManageUser from './ManageUser';

type Props = {
  userList: UserData[];
  isUsersTable?: boolean;
  onInviteUser: () => void;
  isLoading?: boolean;
  onEditUser: (user: UserData) => void;
};

const UserTable = ({
  userList,
  isUsersTable,
  onInviteUser,
  isLoading,
  onEditUser,
}: Props) => {
  const headers = useMemo(() => {
    return [
      {
        name: 'Name',
        columnKey: 'firstName',
        columnCell: ((row: UserData) =>
          `${row.firstName} ${row.lastName}`) as Ui.ListHeaderType['columnCell'],
        colSpan: 1,
      },
      {
        name: 'Email',
        columnKey: 'email',
        colSpan: 1,
      },
      {
        name: isUsersTable ? 'Joined on' : 'Invited on',
        columnKey: 'acceptedInviteAt',
        columnCell: ((row: UserData) =>
          (isUsersTable ? row.acceptedInviteAt : row.createdAt)?.slice(
            0,
            10
          )) as Ui.ListHeaderType['columnCell'],
        colSpan: 1,
      },
      {
        name: 'Invited By',
        columnKey: 'invitedBy',
        columnCell: ((row: UserData) =>
          row.invitedBy || 'Admin') as Ui.ListHeaderType['columnCell'],
        colSpan: 1,
      },
      {
        name: 'Invitation Link',
        columnKey: 'invitationToken',
        colSpan: 1,
      },
      {
        name: 'Roles',
        columnKey: 'roles',
        columnCell: ((row: UserData) => (
          <Ui.Menu
            buttonVariant="text-with-icon"
            buttonText={row.isAdmin ? '1' : row.userRoles.length.toString()}
            items={row.userRoles.map((role) => ({
              name: role.companyRole.name,
              leftIcon: <Ui.Icons name="roles" />,
            }))}
            menuWidth="200px"
          />
        )) as Ui.ListHeaderType['columnCell'],
        colSpan: 1,
      },
      {
        name: 'Action',
        columnKey: 'action',
        columnCell: ((row: UserData) => (
          <>
            <AccessControl feature="users" permission="Edit">
              <Ui.NewTooltip text="Edit User" position="top">
                <Ui.Button
                  type="button"
                  variant="popover"
                  leftIcon={<Ui.Icons name="pencil-simple" />}
                  onClick={() => onEditUser(row)}
                />
              </Ui.NewTooltip>
            </AccessControl>
            <ManageUser user={row} />
          </>
        )) as Ui.ListHeaderType['columnCell'],
        colSpan: 1,
      },
    ];
  }, [isUsersTable, onEditUser]);
  const tableHeaders = isUsersTable
    ? headers.filter((opt) => opt.name !== 'Invitation Link')
    : headers;

  return (
    <>
      <AccessControl feature="users" permission="Invite">
        <div className={style['invite-user-container']}>
          <div className={style['invite-user-text']}>
            <Ui.Text variant="heading-lg">Invite User</Ui.Text>
            <Ui.Text variant="body-text-sm">
              Start inviting user by clicking on the Invite User buton
            </Ui.Text>
          </div>
          <AccessControl feature="users" permission="Invite">
            <Ui.Button
              type="button"
              variant="primary"
              fitContainer
              onClick={onInviteUser}
            >
              Invite User
            </Ui.Button>
          </AccessControl>
        </div>
      </AccessControl>
      <Ui.List
        headers={tableHeaders}
        data={userList}
        isDataLoading={isLoading}
      />
    </>
  );
};

export default UserTable;
