import { Ui } from '@databrainhq/plugin';
import AccessControl from 'components/AccessControl';
import DeleteModal from 'components/DeleteModal';
import Flex from 'components/Flex';
import { FEATURE_PERMISSIONS } from 'consts/application';
import useAccessControl from 'hooks/useAccessControl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetCompanyRolesQuery } from 'utils/generated/graphql';

type RoleAccordionProps = {
  onEdit: () => void;
  onClone: () => void;
  isOpen: boolean;
  setIsOpen: () => void;
  role: GetCompanyRolesQuery['companyRoles'][number];
};

const RoleAccordion = ({
  onEdit,
  role,
  onClone,
  isOpen,
  setIsOpen,
}: RoleAccordionProps) => {
  const { setValue, watch, getValues, reset, resetField } = useForm();
  const [deleteModal, setDeleteModal] = useState<{
    type: 'Clear' | 'Delete';
    isOpen: boolean;
  }>({
    type: 'Clear',
    isOpen: false,
  });
  const {
    updateCompanyRole,
    isUpdatingCompanyRole,
    deleteCompanyRole,
    isDeletingCompanyRole,
    getIsCanAccess,
  } = useAccessControl();

  useEffect(() => {
    // looping through all the features and permissions and setting value based on saved values.
    Object.entries(FEATURE_PERMISSIONS).forEach(([feature, featureObj]) => {
      resetField(feature);
      const value = new Set(getValues(feature) || []);
      featureObj.permissions.forEach((permission) => {
        if (role.permissions?.[feature]?.includes(permission))
          value.add(permission);
      });
      setValue(feature, [...value]);
      setValue(`all-${feature}`, role.permissions?.[`all-${feature}`]);
    });
  }, [role]);

  return (
    <>
      <Ui.AccordionV2
        key={role.id}
        title={role.name}
        editBtnOnClick={onEdit}
        badge={<Ui.Text variant="body-text-sm">{role.description}</Ui.Text>}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        headerButton={
          role.name !== 'Admin' && (
            <div className="dbn-flex dbn-items-center dbn-gap-2">
              <AccessControl feature="roles" permission="Create">
                <Ui.NewTooltip
                  text="Clone Role"
                  position="top"
                  tooltipClass="dbn-min-w-[100px]"
                >
                  <Ui.Button
                    type="button"
                    variant="secondary"
                    onClick={onClone}
                  >
                    Clone
                  </Ui.Button>
                </Ui.NewTooltip>
              </AccessControl>
              <AccessControl feature="roles" permission="Delete">
                <Ui.NewTooltip
                  text="Delete Role"
                  position="top"
                  tooltipClass="dbn-min-w-[100px]"
                >
                  <Ui.Button
                    type="button"
                    variant="popover"
                    leftIcon={<Ui.Icons name="delete" color="alert" />}
                    onClick={() =>
                      setDeleteModal({
                        type: 'Delete',
                        isOpen: true,
                      })
                    }
                  />
                </Ui.NewTooltip>
              </AccessControl>
            </div>
          )
        }
        isEnableEditBtn={
          role.name !== 'Admin' && getIsCanAccess('roles', 'Edit')
        }
        footer={
          <AccessControl feature="roles" permission="Edit">
            <Ui.Button
              type="button"
              variant="secondary"
              className="dbn-mx-5"
              title="Clear All"
              onClick={() =>
                setDeleteModal({
                  isOpen: true,
                  type: 'Clear',
                })
              }
            >
              Clear All
            </Ui.Button>
            <Ui.Button
              type="button"
              variant="primary"
              title="Save"
              isDisabled={isUpdatingCompanyRole}
              onClick={async () =>
                await updateCompanyRole({
                  id: role.id,
                  set: {
                    permissions: getValues(),
                  },
                })
              }
            >
              {isUpdatingCompanyRole ? 'Saving...' : 'Save'}
            </Ui.Button>
          </AccessControl>
        }
        content={
          <>
            {Object.entries(FEATURE_PERMISSIONS).map(
              ([feature, featureObj]) => (
                <div
                  key={feature}
                  className="dbn-border-b dbn-border-secondary last-of-type:dbn-border-none dbn-py-2.5 first-of-type:dbn-pt-0 last-of-type:dbn-pb-0 dbn-px-5 dbn-flex dbn-items-center dbn-gap-2.5"
                >
                  <div className="dbn-min-w-[180px] dbn-gap-2 dbn-flex dbn-whitespace-nowrap">
                    <Ui.Checkbox
                      name={feature}
                      id={`${role.name}-${feature}`}
                      checked={watch(`all-${feature}`)}
                      isDisabled={!getIsCanAccess('roles', 'Edit')}
                      onChange={({ target: { checked } }) => {
                        setValue(`all-${feature}`, checked);
                        featureObj.permissions.forEach((permission) => {
                          const value = new Set(getValues(feature) || []);
                          if (checked) {
                            value.add(permission);
                          } else {
                            value.delete(permission);
                          }
                          setValue(feature, [...value]);
                        });
                      }}
                    />
                    <Ui.Text variant="heading">{featureObj.label}</Ui.Text>
                  </div>
                  <Flex className="dbn-gap-2.5 dbn-flex-wrap">
                    {featureObj.permissions.map((permission) => (
                      <Ui.Checkbox
                        key={permission}
                        id={`${role.name}-${feature}-${permission}`}
                        label={permission}
                        name={`${feature}--${permission}`}
                        checked={new Set(watch(feature) || []).has(permission)}
                        onChange={({ target: { checked } }) => {
                          const value = new Set(getValues(feature) || []);
                          if (checked) {
                            value.add(permission);
                          } else {
                            value.delete(permission);
                          }
                          setValue(feature, [...value]);
                        }}
                      />
                    ))}
                  </Flex>
                </div>
              )
            )}
          </>
        }
      />
      <DeleteModal
        isShowDeleteModal={deleteModal.isOpen}
        setShowDeleteModal={() =>
          setDeleteModal({
            type: 'Clear',
            isOpen: false,
          })
        }
        title={
          deleteModal.type === 'Clear' ? 'Clear Permissions' : 'Delete Role'
        }
        alertMessage={`Are you sure you want to ${
          deleteModal.type === 'Clear'
            ? 'clear all permissions'
            : 'delete the role'
        }?`}
        actionTitle={deleteModal.type}
        isLoading={isDeletingCompanyRole}
        onDelete={async () => {
          if (deleteModal.type === 'Delete') {
            await deleteCompanyRole({
              id: role.id,
            });
          } else {
            reset();
          }
          setDeleteModal({
            isOpen: false,
            type: 'Clear',
          });
        }}
      />
    </>
  );
};

export default RoleAccordion;
