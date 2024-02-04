import { Ui } from '@databrainhq/plugin';
import { useState } from 'react';
import { GetCompanyRolesQuery } from 'utils/generated/graphql';
import SettingsLayout from 'pages/Settings';
// import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';
import RoleAccordion from './components/RoleAccordion';
import RolePanel from './components/RolePanel';

const Roles = () => {
  const { roles } = useAccessControl();
  const [activeAccordion, setActiveAccordion] = useState('');
  const [rolePanel, setRolePanel] = useState<{
    type: 'Create' | 'Clone' | 'Edit';
    role?: GetCompanyRolesQuery['companyRoles'][number];
    isOpen: boolean;
  }>({
    isOpen: false,
    type: 'Create',
    role: undefined,
  });
  // TODO: enable custom role
  return (
    <SettingsLayout>
      <div className="dbn-w-full dbn-p-10 dbn-flex dbn-flex-col dbn-gap-[22px] dbn-h-full dbn-overflow-auto">
        <div className="dbn-flex dbn-justify-between dbn-items-center">
          <Ui.Text variant="heading-lg">Roles</Ui.Text>
          {/* <AccessControl feature="roles" permission="Create">
            <Ui.Button
              type="button"
              variant="primary"
              onClick={() =>
                setRolePanel({
                  type: 'Create',
                  isOpen: true,
                  role: undefined,
                })
              }
            >
              Custom Role
            </Ui.Button>
          </AccessControl> */}
        </div>
        <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-[22px]">
          {roles
            ?.sort((a, b) => (a.name > b.name ? 1 : -1))
            ?.map((role) => (
              <RoleAccordion
                key={role.id}
                role={role}
                onEdit={() =>
                  setRolePanel({
                    type: 'Edit',
                    isOpen: true,
                    role,
                  })
                }
                onClone={() =>
                  setRolePanel({
                    type: 'Clone',
                    isOpen: true,
                    role,
                  })
                }
                isOpen={activeAccordion === role.id}
                setIsOpen={() =>
                  setActiveAccordion((prev) =>
                    prev === role.id ? '' : role.id
                  )
                }
              />
            ))}
        </div>
      </div>
      <RolePanel rolePanel={rolePanel} setRolePanel={setRolePanel} />
    </SettingsLayout>
  );
};

export default Roles;
