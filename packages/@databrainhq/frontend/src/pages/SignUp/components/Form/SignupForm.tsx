/* eslint-disable react/forbid-elements */
import { Link } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import { SIGN_IN } from 'consts/labels';
import { asName, asPassword, asWorkEmail, required } from 'consts/validations';
import useAuth from 'hooks/useAuth';
import styles from './signupForm.module.css';

const SignUpForm = () => {
  const {
    onSignUpSubmit,
    register,
    errors,
    error,
    isDisabledSubmitButton,
    isMailShare,
  } = useAuth();

  return (
    <div className={styles['signup-container']}>
      <div className={styles.formLabel}>
        <Ui.Text variant="display">Create your account</Ui.Text>
        <div className={styles.formLabelWrapper}>
          <Ui.Text variant="body-text-sm" color="secondary-dark">
            Already have an account?
          </Ui.Text>
          <Link to="/users/sign-in">
            <Ui.Button variant="popover">{SIGN_IN}</Ui.Button>
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
      {isMailShare && (
        <Ui.Alert
          text="Please check email for verification"
          variant="success"
        />
      )}
      <form
        onSubmit={onSignUpSubmit}
        className="dbn-flex dbn-flex-col dbn-gap-6 dbn-w-full dbn-px-8 dbn-pb-6 dbn-h-full"
      >
        <Ui.InputField
          label="First name"
          placeholder="Enter your first name"
          type="text"
          error={errors.firstName?.message}
          register={register('firstName', required)}
          autoFocus
          key="first"
        />
        <Ui.InputField
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          error={errors.lastName?.message}
          register={register('lastName', required)}
          key="last"
        />
        <Ui.InputField
          label="Email"
          placeholder="Enter your company email"
          type="email"
          error={errors.email?.message}
          register={register('email', asWorkEmail)}
          key="email"
        />
        <Ui.InputField
          label="Company name"
          placeholder="Enter your company name"
          type="text"
          error={errors.companyName?.message}
          register={register('companyName', asName)}
          key="company"
        />
        <Ui.InputField
          id="signup-password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register('password', asPassword)}
          error={errors.password?.message}
          key="password"
        />
        <Ui.Button
          type="submit"
          variant="primary"
          isDisabled={isDisabledSubmitButton}
          fitContainer
        >
          Create Account
        </Ui.Button>
      </form>
    </div>
  );
};

export default SignUpForm;
