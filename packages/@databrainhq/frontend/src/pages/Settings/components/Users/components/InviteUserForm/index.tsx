import { useCallback, useEffect } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import { UserData } from 'types/auth';
import { asWorkEmail, required } from 'consts/validations';
import Flex from 'components/Flex';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';
import useAccessControl from 'hooks/useAccessControl';
import styles from './inviteUserForm.module.css';

type InviteUserFormProps = {
  config: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    isAdmin?: boolean;
    userRoles?: UserData['userRoles'];
    userId?: string;
  };
  onSuccess?: () => void;
};
const InviteUserForm = ({ config, onSuccess }: InviteUserFormProps) => {
  const {
    onInviteSubmit,
    onEditUser,
    register,
    errors,
    error,
    isDisabledSubmitButton,
    isInvited,
    setValue,
    control,
    watch,
  } = useAuth();
  const {
    fields: roleFields,
    append,
    remove,
  } = useFieldArray({
    name: 'roles',
    control,
  });

  const { roles, setViewMode } = useAccessControl();
  const { workspaces } = useWorkspace();

  useEffect(() => {
    const { email, firstName, lastName, userRoles, isAdmin, userId } = config;
    if (email && firstName && lastName) {
      setValue('email', email);
      setValue('firstName', firstName);
      setValue('lastName', lastName);
    }
    if (userId) {
      setValue('userId', userId);
    }
    if (isAdmin || userRoles) {
      setValue('isAdmin', Boolean(isAdmin));
      const roleList = userRoles?.map((userRole) => {
        const role = {
          label: userRole.companyRole.name,
          value: userRole.companyRole.id,
        };
        const applyOn = {
          label: userRole.applyOn,
          value: userRole.applyOn,
        };
        const workspaceList = userRole.workspaces.map((id: string) => ({
          label: workspaces.find((wp: any) => wp.id === id)?.name,
          value: id,
        }));
        return {
          role,
          applyOn,
          workspaces: workspaceList,
        };
      });
      setValue('roles', roleList);
      setTimeout(() => {
        localStorage.removeItem('@app:viewModeConfig');
      }, 400);
    }
  }, [config, setValue]);

  const enterViewMode = useCallback(() => {
    const viewAsRoles = watch('roles')?.map((roleObj: any) => ({
      companyRoleId: roleObj.role?.value,
      applyOn: roleObj.applyOn?.value,
      workspaces: roleObj.workspaces?.map((wp: any) => wp.value) || [],
      companyRole: {
        id: roleObj.role?.value,
        name: roleObj.role?.label,
        permissions: roles.find((role) => role.id === roleObj.role?.value)
          ?.permissions,
      },
    }));
    setViewMode({
      viewAsRoles,
      config: {
        viewAsRoles,
        firstName: watch('firstName'),
        lastName: watch('lastName'),
        email: watch('email'),
        userId: watch('userId'),
      },
    });
  }, [watch, roles, setViewMode]);

  useEffect(() => {
    if (isInvited) {
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    }
  }, [isInvited]);

  return (
    <form
      onSubmit={config.userId ? onEditUser : onInviteSubmit}
      className={styles['InviteUserForm-container']}
    >
      <div className="dbn-flex dbn-flex-col dbn-gap-3">
        {error && <Ui.Alert variant="error" text={error} />}
        <Ui.InputField
          label="First Name"
          placeholder="first name"
          type="text"
          error={errors.firstName?.message}
          register={register('firstName', required)}
          className="dbn-gap-1.5"
        />

        <Ui.InputField
          label="Last Name"
          placeholder="last name"
          type="text"
          error={errors.lastName?.message}
          register={register('lastName', required)}
          className="dbn-gap-1.5"
        />

        <Ui.InputField
          label="Email"
          placeholder="email"
          type="email"
          isDisabled={Boolean(config.userId)}
          error={errors.email?.message}
          register={register('email', asWorkEmail)}
          className="dbn-gap-1.5"
        />
        <Flex direction="col">
          <Flex alignItems="center" justify="between" className="dbn-w-full">
            <Ui.Text variant="label">Roles</Ui.Text>
            <Ui.Checkbox
              name="isAdmin"
              register={register('isAdmin')}
              label="Admin"
              defaultChecked={config.isAdmin}
              isDisabled={watch('roles')?.length}
            />
          </Flex>
          {!watch('isAdmin') && (
            <Flex direction="col" className="dbn-w-full dbn-gap-3">
              {roleFields.map((roleField, index) => (
                <Flex
                  key={roleField.id}
                  direction="col"
                  className="dbn-border dbn-rounded dbn-border-secondary dbn-gap-5 dbn-p-2 dbn-pb-4"
                >
                  <Flex
                    alignItems="center"
                    justify="between"
                    className="dbn-w-full"
                  >
                    <Ui.Text variant="label">Role {index + 1}</Ui.Text>
                    <Ui.Button
                      variant="popover"
                      type="button"
                      className="dbn-text-alert-dark dbn-text-sm"
                      leftIcon={
                        <Ui.Icons color="alert-dark" size="sm" name="delete" />
                      }
                      onClick={() => remove(index)}
                      fitContainer
                    >
                      Remove
                    </Ui.Button>
                  </Flex>
                  <Controller
                    name={`roles.${index}.role`}
                    control={control}
                    render={({ field }) => (
                      <Ui.FloatingDropDown
                        label="Role"
                        labelVariant="floating"
                        options={
                          roles
                            ?.filter(
                              (r) =>
                                r.name !== 'Admin' &&
                                watch('roles').every(
                                  (role: any) => role.role?.label !== r.name
                                )
                            )
                            .map((cr) => ({
                              label: cr.name,
                              value: cr.id,
                            })) || []
                        }
                        selectedOption={field.value || { label: '', value: '' }}
                        onChange={field.onChange}
                        buttonWidth="100%"
                        menuWidth="100%"
                      />
                    )}
                  />
                  {watch(`roles.${index}.role`)?.label &&
                    watch(`roles.${index}.role`)?.label !== 'Admin' && (
                      <>
                        <Controller
                          name={`roles.${index}.applyOn`}
                          control={control}
                          render={({ field }) => (
                            <Ui.FloatingDropDown
                              label="Apply On"
                              labelVariant="floating"
                              options={[
                                {
                                  label: 'All Workspaces',
                                  value: 'All Workspaces',
                                },
                                {
                                  label: 'Specific Workspaces',
                                  value: 'Specific Workspaces',
                                },
                                {
                                  label: 'All Workspaces Except',
                                  value: 'All Workspaces Except',
                                },
                              ]}
                              selectedOption={
                                field.value || { label: '', value: '' }
                              }
                              onChange={field.onChange}
                              buttonWidth="100%"
                              menuWidth="100%"
                            />
                          )}
                        />
                        {watch(`roles.${index}.applyOn`)?.value &&
                        watch(`roles.${index}.applyOn`)?.value !==
                          'All Workspaces' ? (
                          <Controller
                            name={`roles.${index}.workspaces`}
                            control={control}
                            render={({ field }) => (
                              <Ui.MultiSelectDropdown
                                label="Workspaces"
                                labelVariant="floating"
                                options={workspaces.map((wp) => ({
                                  label: wp.name,
                                  value: wp.id,
                                }))}
                                selectedOption={field.value || []}
                                onChange={field.onChange}
                                isSearchEnabled
                                buttonWidth="100%"
                                menuWidth="100%"
                              />
                            )}
                          />
                        ) : null}
                      </>
                    )}
                </Flex>
              ))}
              {roles.length - 1 > watch('roles')?.length && (
                <Ui.Button
                  variant="tab"
                  leftIcon={<Ui.Icons name="plus" />}
                  type="button"
                  fitContainer
                  onClick={() => append(roleFields.length)}
                >
                  Add Role
                </Ui.Button>
              )}
            </Flex>
          )}
        </Flex>
      </div>
      <div className={styles['button-container']}>
        {isInvited && (
          <Ui.Alert
            text={`${config.userId ? 'Updated' : 'Invited'} Successfully!`}
            variant="success"
          />
        )}
        {!watch('isAdmin') && watch('roles')?.length ? (
          <Ui.NewTooltip
            text="To mimic the behaviour what this user will see in the app please click on the Enter View Mode."
            position="top"
            tooltipClass="dbn-w-[300px]"
          >
            <Ui.Button
              type="button"
              variant="secondary"
              fitContainer
              onClick={enterViewMode}
            >
              Enter View Mode
            </Ui.Button>
          </Ui.NewTooltip>
        ) : null}
        <Ui.Button
          type="submit"
          variant="primary"
          isDisabled={isDisabledSubmitButton}
          fitContainer
        >
          {config.userId ? 'Edit User' : 'Invite'}
        </Ui.Button>
      </div>
    </form>
  );
};

export default InviteUserForm;
