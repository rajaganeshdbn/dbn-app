/* eslint-disable import/no-relative-parent-imports */
import { Ui } from '@databrainhq/plugin';
import SettingsLayout from 'pages/Settings';
import { useCompanyProfileQuery } from 'utils/generated/graphql';
import { useEffect } from 'react';
import { required } from 'consts/validations';
import useAuth from 'hooks/useAuth';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';
import style from './settings.module.css';

const CompanyProfile = () => {
  const currentUser = getCurrentUser();
  const { getIsCanAccess } = useAccessControl();
  const currentUserName = currentUser
    ? `${currentUser.username ? currentUser.username : ''}`
    : '';

  const {
    onSaveCompanyProfile,
    errors,
    error,
    register,
    isDisabledSubmitButton,
    setValue,
    isUpdated,
    setUpdated,
  } = useAuth();
  const { data, isLoading } = useCompanyProfileQuery(
    { id: getCurrentUser()?.companyId },
    { enabled: !!getCurrentUser()?.companyId }
  );
  useEffect(() => {
    if (data?.companies_by_pk?.name) {
      setValue('name', data?.companies_by_pk?.name);
      setValue('website', data?.companies_by_pk?.website);
    }
  }, [data?.companies_by_pk]);
  useEffect(() => {
    setUpdated?.(isUpdated);
    setTimeout(() => {
      setUpdated?.(false);
    }, 3000);
  }, [isUpdated]);
  return (
    <SettingsLayout>
      <form
        className={style['general-container']}
        onSubmit={onSaveCompanyProfile}
      >
        <div className="dbn-flex dbn-flex-col">
          <Ui.Text variant="heading-lg">Company Profile</Ui.Text>
          <Ui.Text variant="body-text-sm">
            Change your company related settings
          </Ui.Text>
        </div>
        <div className="dbn-w-full md:dbn-w-[70%] dbn-flex dbn-flex-col dbn-gap-[22px]">
          <Ui.InputField
            label="Company Name"
            type="text"
            placeholder="Databrain"
            name="name"
            defaultValue={currentUserName}
            isDisabled={
              !getIsCanAccess('companyProfile', 'Edit') ||
              isDisabledSubmitButton ||
              isLoading
            }
            register={register('name', required)}
            error={errors?.name?.message}
          />
          <Ui.InputField
            label="Company Website"
            placeholder="www.usedatabrain.com"
            type="text"
            name="website"
            isDisabled={
              !getIsCanAccess('companyProfile', 'Edit') ||
              isDisabledSubmitButton ||
              isLoading
            }
            register={register('website', required)}
            error={errors?.website?.message}
          />
          {error && <Ui.Alert text={error} variant="error" />}
          <Ui.Button
            type="submit"
            variant="primary"
            isDisabled={
              !getIsCanAccess('companyProfile', 'Edit') ||
              isDisabledSubmitButton ||
              isLoading
            }
          >
            Save
          </Ui.Button>
          {isUpdated && (
            <Ui.Alert text="Updated Successfully!" variant="success" />
          )}
        </div>
      </form>
    </SettingsLayout>
  );
};

export default CompanyProfile;
