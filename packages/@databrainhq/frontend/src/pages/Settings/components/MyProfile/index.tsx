/* eslint-disable import/no-relative-parent-imports */
import { Ui } from '@databrainhq/plugin';
import SettingsLayout from 'pages/Settings';
import { useEffect, useState } from 'react';
import { asPassword } from 'consts/validations';
import useAuth from 'hooks/useAuth';
import { getCurrentUser } from 'helpers/application/auth';
import style from './settings.module.css';

const MyProfile = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [token, setToken] = useState<string>('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isEmptyField, setEmptyField] = useState<boolean>(false);
  const {
    isShowModal,
    setShowModal,
    onChangePassword,
    error,
    errors,
    isDisabledSubmitButton,
    watch,
    getValues,
    setValue,
    register,
    onUpdateUserName,
  } = useAuth();
  const isPasswordMatch =
    watch('password_repeat') === watch('password') &&
    getValues('password_repeat');
  const handleUpdateName = () => {
    if (watch('firstName') && watch('lastName')) {
      const userDetails = {
        id: currentUser?.id || '',
        firstName: watch('firstName'),
        lastName: watch('lastName'),
      };
      onUpdateUserName(userDetails, (t) => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        setToken(t);
        setEmptyField(false);
      });
    } else {
      setEmptyField(true);
      setTimeout(() => {
        setEmptyField(false);
      }, 2000);
    }
  };
  useEffect(() => {
    if (token) {
      setCurrentUser(getCurrentUser(token));
    }
  }, [token]);
  useEffect(() => {
    if (currentUser?.firstName && currentUser?.lastName) {
      setValue('firstName', currentUser?.firstName);
      setValue('lastName', currentUser?.lastName);
    }
  }, [currentUser]);

  return (
    <SettingsLayout>
      <div className={style['general-container']}>
        <div className="dbn-flex dbn-flex-col">
          <Ui.Text variant="heading-lg">My Profile</Ui.Text>
          <Ui.Text variant="body-text-sm">
            Change your profile related settings
          </Ui.Text>
        </div>
        <div className="dbn-w-full md:dbn-w-[70%] dbn-flex dbn-flex-col dbn-gap-[22px]">
          <Ui.InputField
            label="First Name"
            type="text"
            name="firstName"
            defaultValue={currentUser?.firstName}
            onChange={(e) => setValue('firstName', e.target.value)}
          />
          <Ui.InputField
            label="Last Name"
            type="text"
            name="lastName"
            defaultValue={currentUser?.lastName}
            onChange={(e) => setValue('lastName', e.target.value)}
          />
          <div className="dbn-w-full dbn-flex dbn-items-center">
            <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-items-center">
              <Ui.Button
                type="button"
                variant="primary"
                onClick={handleUpdateName}
              >
                Save
              </Ui.Button>
              {isSuccess ? (
                <Ui.Text variant="body-text-sm" color="success">
                  Username updated successfully!
                </Ui.Text>
              ) : null}
              {isEmptyField ? (
                <Ui.Text variant="body-text-sm" color="alert">
                  Please provide a suitable firstName and lastName
                </Ui.Text>
              ) : null}
              {error ? (
                <Ui.Text variant="body-text-sm" color="alert">
                  {error}
                </Ui.Text>
              ) : null}
            </div>
            <Ui.Button
              type="button"
              variant="popover"
              onClick={() => setShowModal(true)}
              className="dbn-text-blue-600 hover:dbn-text-blue-950"
            >
              Change password
            </Ui.Button>
          </div>
        </div>
        <Ui.Modal
          isOpen={isShowModal}
          onClose={() => setShowModal(false)}
          headerTitle="Change Password"
        >
          <form onSubmit={onChangePassword}>
            <div className="dbn-w-[500px] dbn-p-5 dbn-flex dbn-flex-col dbn-gap-[22px]">
              <Ui.InputField
                type="password"
                label="Enter your current password"
                name="currentPassword"
                register={register('current_password', asPassword)}
                error={errors.password?.message}
              />
              <Ui.InputField
                type="password"
                label="Enter a new password"
                name="newPassword"
                register={register('password', asPassword)}
                error={errors.password?.message}
              />
              <Ui.InputField
                type="password"
                label="Confirm your new password"
                name="confirmPassword"
                register={register('password_repeat', asPassword)}
                error={errors.password_repeat?.message}
              />
              {watch('password') && !isPasswordMatch ? (
                <Ui.Error message="password not match" />
              ) : null}
              {error ? <Ui.Error message={error} /> : null}
            </div>
            <Ui.ModalFooter>
              <Ui.Button
                type="reset"
                variant="tab"
                onClick={() => setShowModal(false)}
                isDisabled={isDisabledSubmitButton}
              >
                Cancel
              </Ui.Button>
              <Ui.Button
                type="submit"
                variant="primary"
                isDisabled={isDisabledSubmitButton}
              >
                Save
              </Ui.Button>
            </Ui.ModalFooter>
          </form>
        </Ui.Modal>
      </div>
    </SettingsLayout>
  );
};

export default MyProfile;
