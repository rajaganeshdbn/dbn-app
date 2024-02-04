/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ui } from '@databrainhq/plugin';
import { asEmail, asPassword } from 'consts/validations';
import useAuth from 'hooks/useAuth';
import styles from './signInModal.module.css';

type SigninModalParamsType = {
  isShowModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const SigninModal = ({ isShowModal, setShowModal }: SigninModalParamsType) => {
  const { register, onSignInSubmit, errors, error, isDisabledSubmitButton } =
    useAuth(() => setShowModal(false));

  return (
    <Ui.Modal
      isOpen={isShowModal}
      onClose={() => {}}
      customHeader={
        <div className="">
          <Ui.Text variant="body-text-sm">Session Expired</Ui.Text>
        </div>
      }
    >
      <div className={styles['signin-container']}>
        <Ui.Alert
          text="Your session is expired please sign in again!"
          variant="warning"
        />
        {error && (
          <div className={styles['signup-error-container']}>
            <Ui.Text variant="body-text-sm">{error}</Ui.Text>
          </div>
        )}
        <form
          onSubmit={onSignInSubmit}
          className="dbn-mt-4 dbn-flex dbn-flex-col dbn-gap-4"
        >
          <Ui.InputField
            label="work email"
            placeholder="work email"
            type="email"
            register={register('email', asEmail)}
            error={errors?.email?.message}
            autoFocus
          />
          <Ui.InputField
            id="signin-password"
            label="password"
            placeholder="password"
            type="password"
            error={errors.password?.message}
            register={register('password', asPassword)}
          />
          <div className={styles['signin-button-container']}>
            <Ui.Button
              type="submit"
              variant="tertiary"
              isDisabled={isDisabledSubmitButton}
              className="disabled:dbn-cursor-progress disabled:dbn-opacity-50  dbn-bg-[#0D0D0D] dbn-shadow-[0px_4px_5px_rgba(0,0,0,0.15)] dbn-rounded-[10px] dbn-text-sm dbn-text-white dbn-px-10 dbn-py-3"
            >
              Sign in
            </Ui.Button>
          </div>
        </form>
      </div>
    </Ui.Modal>
  );
};

export default SigninModal;
