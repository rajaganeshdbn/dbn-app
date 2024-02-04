import { Ui } from '@databrainhq/plugin';
import { useState } from 'react';
import { UserData } from 'types/auth';
import Flex from 'components/Flex';
import AccessControl from 'components/AccessControl';
import useAuth from 'hooks/useAuth';

const ManageUser = ({ user }: { user: UserData }) => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const { isDisabledSubmitButton, removeUser, reInviteUser, error } = useAuth();

  const reInvite = () => {
    reInviteUser(user.id, user.email, user.invitedBy as string);
  };

  return (
    <>
      {user.isAcceptedInvite ? (
        <AccessControl feature="users" permission="Delete">
          <Ui.NewTooltip position="top" text="Remove User">
            <Ui.Button
              variant="tertiary"
              type="button"
              onClick={() => setIsModelOpen(true)}
              isDisabled={isDisabledSubmitButton || !user.invitedBy}
              leftIcon={<Ui.Icons name="delete" />}
            />
          </Ui.NewTooltip>
        </AccessControl>
      ) : (
        <div className="dbn-flex dbn-gap-5">
          <AccessControl feature="users" permission="Invite">
            <Ui.NewTooltip position="top" text="Resend Invitation">
              <Ui.Button
                variant="tertiary"
                type="button"
                isDisabled={isDisabledSubmitButton}
                onClick={reInvite}
              >
                <Ui.Icons name="share" />
                {/* refresh icon */}
              </Ui.Button>
            </Ui.NewTooltip>
          </AccessControl>
          <AccessControl feature="users" permission="Delete">
            <Ui.NewTooltip position="top" text="Delete Invitation">
              <Ui.Button
                variant="tertiary"
                type="button"
                isDisabled={isDisabledSubmitButton}
                onClick={() => setIsModelOpen(true)}
                leftIcon={<Ui.Icons name="delete" />}
              />
            </Ui.NewTooltip>
          </AccessControl>
        </div>
      )}
      <Ui.Modal
        headerTitle="Irreversible action"
        isOpen={isModalOpen}
        onClose={() => setIsModelOpen(false)}
      >
        <div className="dbn-p-10">
          <Flex
            justify="center"
            alignItems="center"
            direction="col"
            className="dbn-gap-2"
          >
            <span className="dbn-text-red-500 dbn-text-2xl">
              <Ui.Icons name="not-found" />
              {/* warning icon */}
            </span>
            <Ui.Text variant="body-text-sm">
              Are you sure you want to delete this{' '}
              {user.isAcceptedInvite ? 'user' : 'invitation'}?
            </Ui.Text>
            {error && <Ui.Alert text={error} variant="error" />}
          </Flex>
        </div>
        <Ui.ModalFooter className="dbn-justify-between">
          <div className="dbn-ml-auto dbn-flex dbn-gap-4">
            <Ui.Button
              type="reset"
              variant="tab"
              onClick={() => setIsModelOpen(false)}
            >
              Cancel
            </Ui.Button>

            <Ui.Button
              type="button"
              variant="primary"
              onClick={() => {
                if (!user.invitedBy) return;
                removeUser(user.id, user.email, () => setIsModelOpen(false));
              }}
              isDisabled={isDisabledSubmitButton || !user.invitedBy}
            >
              Delete
            </Ui.Button>
          </div>
        </Ui.ModalFooter>
      </Ui.Modal>
    </>
  );
};

export default ManageUser;
