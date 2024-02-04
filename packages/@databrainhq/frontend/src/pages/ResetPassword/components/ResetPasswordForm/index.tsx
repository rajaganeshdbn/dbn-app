import { Ui } from '@databrainhq/plugin';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { asPassword } from 'consts/validations';
import useAuth from 'hooks/useAuth';
import styles from './resetPassword.module.css';

const ResetPasswordForm = () => {
  const {
    isDisabledSubmitButton,
    watch,
    getValues,
    setValue,
    error,
    errors,
    register,
    onResetPassword,
  } = useAuth();
  const isPasswordMatch =
    watch('password_repeat') === watch('password') &&
    getValues('password_repeat');
  const token = useParams().token;
  useEffect(() => {
    setValue('token', token);
  }, [token]);
  return (
    <div className={styles['form-container']}>
      <div className={styles['signin-btn-container']}>
        <Ui.Text>Already have an account ?</Ui.Text>
        <Link to="/users/sign-in">
          <Ui.Button type="button" variant="primary">
            Log in
          </Ui.Button>
        </Link>
      </div>
      <div className="dbn-h-full dbn-grid dbn-place-content-center">
        <div className="dbn-flex dbn-flex-col dbn-justify-center dbn-gap-2 dbn-mx-auto sm:dbn-w-[40rem] dbn-min-w-[300px] dbn-border dbn-border-gray-300 dbn-p-8 dbn-rounded-lg dbn-shadow-[0px_20px_50px_0px_#00000026] dbn-relative -dbn-top-10">
          <Ui.Text variant="heading-lg">Reset Password</Ui.Text>
          {error && (
            <div className={styles['error-container']}>
              <Ui.Text variant="body-text-sm">{error}</Ui.Text>
            </div>
          )}
          <form className={styles['form-wrapper']} onSubmit={onResetPassword}>
            <Ui.InputField
              id="new-password"
              label="create new password"
              placeholder="password"
              type="password"
              register={register('password', asPassword)}
              error={errors.password?.message}
              className="dbn-gap-2"
              autoFocus
            />
            <Ui.InputField
              id="confirm-password"
              label="confirm password"
              placeholder="confirm password"
              type="password"
              register={register('password_repeat', asPassword)}
              error={errors.password_repeat?.message}
            />
            {!isPasswordMatch ? (
              <Ui.Error message="password not match" />
            ) : null}
            <div className={styles['signin-button-container']}>
              <Ui.Button
                type="submit"
                variant="secondary"
                isDisabled={isDisabledSubmitButton || !isPasswordMatch}
              >
                Submit
              </Ui.Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
