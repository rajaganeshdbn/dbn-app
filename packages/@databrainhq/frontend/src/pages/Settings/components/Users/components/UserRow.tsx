import React, { useEffect, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { UserData } from 'types/auth';
import Flex from 'components/Flex';
import useAuth from 'hooks/useAuth';

type ExtendedType = {
  setIsInvited?: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserRow = ({
  id,
  firstName,
  lastName,
  email,
  createdAt,
  invitedBy,
  isAcceptedInvite,
  setIsInvited,
}: UserData & ExtendedType) => {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const { isDisabledSubmitButton, removeUser, reInviteUser, isInvited, error } =
    useAuth();

  const reInvite = () => {
    reInviteUser(id, email, invitedBy as string);
  };

  useEffect(() => {
    setIsInvited?.(isInvited);
    setTimeout(() => {
      setIsInvited?.(false);
    }, 3000);
  }, [isInvited]);

  return (
    <>
      <tr key={id} className="dbn-border-t">
        <td className="dbn-px-4 dbn-text-left">
          <Ui.Text variant="body-text-sm">{`${firstName} ${lastName}`}</Ui.Text>
        </td>
        <td className="dbn-px-4 dbn-text-left">
          <Ui.Text variant="body-text-sm">{email}</Ui.Text>
        </td>
        <td className="dbn-px-4 dbn-text-left">
          <Ui.Text variant="body-text-sm">
            {createdAt === 'Unavailable' ? createdAt : createdAt.slice(0, 10)}
          </Ui.Text>
        </td>
        <td className="dbn-px-4 dbn-text-left">
          <Ui.Text variant="body-text-sm">{invitedBy || 'Admin'}</Ui.Text>
        </td>
        <td className="dbn-px-4 dbn-flex dbn-justify-start dbn-items-center dbn-text-[0.95rem] dbn-py-4">
          {isAcceptedInvite ? (
            <Ui.Button
              variant="tertiary"
              type="button"
              onClick={() => setIsModelOpen(true)}
              isDisabled={isDisabledSubmitButton || !invitedBy}
            >
              Remove User
            </Ui.Button>
          ) : (
            <div className="dbn-flex dbn-gap-5">
              <Ui.Tooltip
                position="top"
                content={
                  <Ui.Button
                    variant="tertiary"
                    type="button"
                    isDisabled={isDisabledSubmitButton}
                    onClick={reInvite}
                  >
                    <Ui.Icons name="not-found" />
                    {/* refresh icon */}
                  </Ui.Button>
                }
              >
                Resend Invitation
              </Ui.Tooltip>
              <Ui.Tooltip
                position="top"
                content={
                  <Ui.Button
                    variant="tertiary"
                    type="button"
                    isDisabled={isDisabledSubmitButton}
                    onClick={() => setIsModelOpen(true)}
                    leftIcon={<Ui.Icons name="delete" />}
                  />
                }
              >
                Delete Invitation
              </Ui.Tooltip>
            </div>
          )}
        </td>
      </tr>
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
              {isAcceptedInvite ? 'user' : 'invitation'}?
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
                if (!invitedBy) return;
                removeUser(id, email, () => setIsModelOpen(false));
              }}
              isDisabled={isDisabledSubmitButton || !invitedBy}
            >
              Delete
            </Ui.Button>
          </div>
        </Ui.ModalFooter>
      </Ui.Modal>
    </>
  );
};

export default React.memo(UserRow);
