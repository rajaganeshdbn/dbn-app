import { Link } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import { SIGN_UP, FORGOT_PASSWORD } from 'consts/labels';
import { asEmail, required } from 'consts/validations';
import useAuth from 'hooks/useAuth';
import styles from './signinForm.module.css';

const SigninForm = () => {
  const { register, onSignInSubmit, errors, error, isDisabledSubmitButton } =
    useAuth();

  return (
    <div className={styles['signin-container']}>
      <div className={styles.formLabel}>
        <Ui.Text variant="display">Sign In to DataBrain</Ui.Text>
        <div className={styles.formLabelWrapper}>
          <Ui.Text variant="body-text-sm" color="secondary-dark">
            Don&apos;t have an account ?
          </Ui.Text>
          <Link to="/users/sign-up">
            <Ui.Button variant="popover">{SIGN_UP}</Ui.Button>
          </Link>
        </div>
      </div>
      {error && (
        <div className={styles['signup-error-container']}>
          <Ui.Icons name="info" color="alert" />
          <Ui.Text variant="body-text-sm" color="alert">
            {error}
          </Ui.Text>
        </div>
      )}
      <form
        onSubmit={onSignInSubmit}
        className="dbn-flex dbn-flex-col dbn-gap-6 dbn-w-full dbn-px-8 dbn-pb-6 dbn-h-full"
      >
        <Ui.InputField
          label="Work Email"
          placeholder="Enter your work email"
          type="email"
          register={register('email', asEmail)}
          error={errors.email?.message}
          autoFocus
        />
        <Ui.InputField
          id="signin-password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register('password', required)}
          error={errors.password?.message}
        />
        <Ui.Button
          type="submit"
          variant="primary"
          isDisabled={isDisabledSubmitButton}
          fitContainer
        >
          Sign In
        </Ui.Button>

        <Link to="/password/forgot" className={styles['forgot-password-text']}>
          {FORGOT_PASSWORD}
        </Link>
      </form>
    </div>
  );
};

export default SigninForm;
