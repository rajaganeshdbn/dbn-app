import { Ui } from '@databrainhq/plugin';
// import { Link } from 'react-router-dom';
import { asEmail } from 'consts/validations';
import CompletedStatus from 'components/CompletedStatus';
import useAuth from 'hooks/useAuth';
import styles from './forgetPassword.module.css';

const ForgetPasswordForm = () => {
  const {
    error,
    errors,
    register,
    onForgetPassword,
    isDisabledSubmitButton,
    isMailShare,
  } = useAuth();
  return (
    <div className="sm:dbn-w-[448px] dbn-shadow-bs-8 dbn-border dbn-flex dbn-flex-col dbn-gap-6 dbn-border-gray-300 dbn-rounded-lg dbn-h-auto">
      <div className={styles.formLabel}>
        <Ui.Text variant="display">Forgot Password?</Ui.Text>
        <Ui.Text variant="body-text-sm" color="secondary-dark">
          We can send you a link to reset your password
        </Ui.Text>
      </div>
      {error && (
        <div className={styles['error-container']}>
          <Ui.Icons name="info" color="alert" />
          <Ui.Text variant="body-text-sm" color="alert">
            {error}
          </Ui.Text>
        </div>
      )}
      <form className={styles['form-wrapper']} onSubmit={onForgetPassword}>
        <Ui.InputField
          id="email"
          label="Work Email"
          placeholder="Enter your work email"
          type="email"
          register={register('email', asEmail)}
          error={errors.email?.message}
          autoFocus
        />

        <Ui.Button
          type="submit"
          variant="primary"
          isDisabled={isDisabledSubmitButton}
          fitContainer
        >
          Request Reset Link
        </Ui.Button>
        {isMailShare && (
          <div className="dbn-px-3 dbn-py-2 dbn-flex dbn-justify-center dbn-items-center">
            <CompletedStatus text="reset password mail shared successfully!" />
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
