/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Ui } from '@databrainhq/plugin';
import { Link, useParams } from 'react-router-dom';
import { asPassword } from 'consts/validations';
import { SIGN_IN } from 'consts/labels';
import useAuth from 'hooks/useAuth';
import styles from './acceptInvitation.module.css';

const AcceptInvitationForm = () => {
  const {
    errors,
    register,
    isDisabledSubmitButton,
    watch,
    getValues,
    onAcceptSubmit,
    error,
    setValue,
  } = useAuth();
  const isPasswordMatch =
    watch('password_repeat') === watch('password') &&
    getValues('password_repeat');
  const token = useParams().token;
  useEffect(() => {
    setValue('token', token);
  }, []);

  return (
    <div className={styles['form-container']}>
      <div className={styles['signin-btn-container']}>
        <Ui.Text>Already have an account ?</Ui.Text>
        <Link to="/users/sign-in">
          <Ui.Button type="button" variant="primary">
            {SIGN_IN}
          </Ui.Button>
        </Link>
      </div>
      <div className="dbn-h-full dbn-grid dbn-place-content-center">
        <div className={styles.acceptInvitation}>
          <Ui.Text variant="heading-lg">Accept Invitation</Ui.Text>
          {error && (
            <div className={styles['error-container']}>
              <Ui.Text variant="body-text-sm">{error}</Ui.Text>
            </div>
          )}
          <form className={styles['form-wrapper']} onSubmit={onAcceptSubmit}>
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
              className="dbn-gap-2"
              autoFocus
            />
            {!isPasswordMatch ? (
              <Ui.Error message="Password did not match" />
            ) : null}
            <div className={styles['signin-button-container']}>
              <Ui.Button
                type="submit"
                variant="secondary"
                isDisabled={isDisabledSubmitButton || !isPasswordMatch}
              >
                Accept
              </Ui.Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitationForm;
