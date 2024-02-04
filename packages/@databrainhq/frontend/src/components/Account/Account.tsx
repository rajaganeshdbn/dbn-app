import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import { getCurrentUser } from 'helpers/application/auth';
import styles from './account.module.css';

const Account = ({ isCollapsed }: any) => {
  const currentUser = getCurrentUser();
  const currentUserName = currentUser
    ? `${currentUser.username ? currentUser.username : ''}`
    : '';

  return (
    <div className={styles['account-container']}>
      {isCollapsed ? (
        <div className={`${styles['account-profile-icon']} dbn-w-12 dbn-h-12`}>
          {currentUser
            ? `${currentUser.firstName ? currentUser.firstName[0] : ''}${
                currentUser.lastName ? currentUser.lastName[0] : ''
              }`
            : ''}
        </div>
      ) : (
        <>
          <div className={`${styles['account-profile-icon']} dbn-w-12 dbn-h-8`}>
            {currentUser
              ? `${currentUser.firstName ? currentUser.firstName[0] : ''}${
                  currentUser.lastName ? currentUser.lastName[0] : ''
                }`
              : ''}
          </div>
          <div className={styles['account-profile-name']}>
            <span className="dbn-leading-[1.063rem] dbn-tracking-ls-1 dbn-font-light">
              {currentUserName}
            </span>
          </div>
          <Ui.PopoverMenu
            buttonContent={
              <Ui.Icons name="kebab-menu-vertical" color="white" />
            }
          >
            <Ui.Button
              variant="primary"
              type="button"
              onClick={() => {
                localStorage.clear();
                segmentEvent('logout', { email: currentUser?.email });
                window.location.reload();
              }}
              leftIcon={<Ui.Icons name="sign-out" />}
            >
              <span>Logout</span>
            </Ui.Button>
          </Ui.PopoverMenu>
        </>
      )}
    </div>
  );
};

export default Account;
