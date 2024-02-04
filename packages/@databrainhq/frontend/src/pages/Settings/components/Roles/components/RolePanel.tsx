import { useCallback, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import { GetCompanyRolesQuery } from 'utils/generated/graphql';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentUser } from 'helpers/application/auth';

type RolePanelProps = {
  rolePanel: {
    type: 'Create' | 'Clone' | 'Edit';
    role?: GetCompanyRolesQuery['companyRoles'][number];
    isOpen: boolean;
  };
  setRolePanel: React.Dispatch<
    React.SetStateAction<RolePanelProps['rolePanel']>
  >;
};

const RolePanel = ({ setRolePanel, rolePanel }: RolePanelProps) => {
  const companyId = getCurrentUser()?.companyId;
  const { register, handleSubmit, setValue, reset } = useForm();
  const {
    createCompanyRoles,
    updateCompanyRole,
    isCreatingCompanyRole,
    isUpdatingCompanyRole,
    error,
  } = useAccessControl();

  useEffect(() => {
    if (!rolePanel.role) reset();
    else {
      setValue('name', rolePanel.role.name);
      setValue('description', rolePanel.role.description);
    }
  }, [rolePanel.role]);

  const onSubmit = useCallback(
    async (values: FieldValues) => {
      if (rolePanel.type === 'Edit') {
        await updateCompanyRole(
          {
            id: rolePanel.role?.id,
            set: {
              name: values.name,
              description: values.description,
            },
          },
          {
            onSuccess: (data) => {
              if (data.update_companyRoles_by_pk?.id) {
                setRolePanel({
                  isOpen: false,
                  type: 'Create',
                });
              }
            },
          }
        );
      } else {
        await createCompanyRoles(
          {
            objects: [
              {
                name: values.name,
                description: values.description,
                companyId,
                permissions:
                  rolePanel.type === 'Clone' ? rolePanel.role?.permissions : {},
              },
            ],
          },
          {
            onSuccess: (data) => {
              if (data.insert_companyRoles?.returning?.length) {
                setRolePanel({
                  isOpen: false,
                  type: 'Create',
                });
              }
            },
          }
        );
      }
    },
    [createCompanyRoles, updateCompanyRole, rolePanel, companyId, setRolePanel]
  );

  return (
    <Ui.Panel
      size="small"
      side="right"
      isOpen={rolePanel.isOpen}
      onClose={() =>
        setRolePanel({
          role: undefined,
          isOpen: false,
          type: 'Create',
        })
      }
      headerTitle={`${rolePanel.type} Role`}
      hideFooter
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dbn-overflow-hidden dbn-p-5 dbn-h-full dbn-flex dbn-flex-col dbn-justify-between"
      >
        <div className="dbn-w-full dbn-overflow-y-auto dbn-flex dbn-flex-col dbn-gap-[22px]">
          <Ui.InputField
            id="role-name"
            name="name"
            type="text"
            defaultValue={
              rolePanel.type === 'Clone'
                ? `Clone ${rolePanel.role?.name}`
                : rolePanel.role?.name
            }
            placeholder="Give a name to this role"
            label="Name"
            register={register('name', { required: true })}
          />
          <Ui.TextAreaField
            id="role-description"
            placeholder="Describe what this role is about"
            defaultValue={
              rolePanel.type === 'Clone'
                ? `Clone ${rolePanel.role?.description}`
                : rolePanel.role?.description
            }
            label="Description"
            rows={4}
            register={register('description')}
          />
          <Ui.Alert
            variant="primary"
            text="You can set the permissions later."
          />
          {error ? <Ui.Alert variant="error" text={error} /> : null}
        </div>
        <Ui.Button
          fitContainer
          type="submit"
          variant="primary"
          isDisabled={isCreatingCompanyRole || isUpdatingCompanyRole}
        >
          {isCreatingCompanyRole || isUpdatingCompanyRole
            ? 'Saving Role...'
            : 'Save Role'}
        </Ui.Button>
      </form>
    </Ui.Panel>
  );
};

export default RolePanel;
