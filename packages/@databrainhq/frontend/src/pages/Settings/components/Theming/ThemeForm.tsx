/* eslint-disable react/no-children-prop */
import React, { useEffect, useMemo, useState } from 'react';
import { FieldValues, useForm, useFieldArray } from 'react-hook-form';
import { useGetUserClientDataQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import Flex from 'components/Flex';
import useExternalDashboardThemes, {
  ThemeType,
} from 'hooks/useExternalDashboardThemes';
import { getCurrentUser } from 'helpers/application/auth';

type ThemeFormProps = {
  onSave: () => void;
  onCancel: () => void;
  defaultValues?: ThemeType;
  mode?: 'create' | 'edit' | 'delete';
};

const ThemeForm: React.FC<ThemeFormProps> = ({
  onSave,
  onCancel,
  defaultValues,
  mode = 'create',
}) => {
  const [limit, setLimit] = useState<number>(30);
  const companyId = getCurrentUser()?.companyId;
  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const { fields: colorFields, append } = useFieldArray({
    control,
    name: 'colors',
  });

  useEffect(() => {
    if (!defaultValues) return;
    setValue('name', defaultValues.name);
    setValue(
      'clients',
      defaultValues.clients.map((client) => client.clientId)
    );
    setValue('colors', defaultValues.colors);
  }, [defaultValues]);

  const {
    createExternalDashboardTheme,
    updateExternalDashboardTheme,
    deleteExternalDashboardTheme,
    isMutatingExternalDashboardTheme,
    errorMutatingExternalDashboardTheme,
  } = useExternalDashboardThemes();

  const { data: clientData } = useGetUserClientDataQuery(
    {
      companyId: getCurrentUser()?.companyId,
    },
    { enabled: !!getCurrentUser()?.companyId }
  );
  const clients = useMemo(
    () => clientData?.getUserClientData?.data,
    [clientData?.getUserClientData?.data]
  );

  const submitForm = async (values: FieldValues) => {
    if (
      mode !== 'delete' &&
      (!values.name || !values.colors.length || !values.clients.length)
    )
      return;

    switch (mode) {
      case 'edit': {
        await updateExternalDashboardTheme(
          {
            id: defaultValues?.id!,
            name: values.name,
            colors: values.colors,
            selectedClients: values.clients.map((value: any) => {
              const client = clients.find((c: any) => c.value === value);
              return {
                clientId: client.value,
                clientName: client.label,
              };
            }),
            clients: defaultValues?.clients || [],
          },
          {
            onSuccess: () => {
              onSave();
            },
          }
        );
        break;
      }
      case 'delete': {
        await deleteExternalDashboardTheme(
          {
            id: defaultValues?.id,
          },
          {
            onSuccess: () => {
              onSave();
            },
          }
        );
        break;
      }
      default: {
        await createExternalDashboardTheme(
          {
            companyId,
            name: values.name,
            colors: values.colors,
            clients: values.clients.map((value: any) => {
              const client = clients.find((c: any) => c.value === value);
              return {
                clientId: client.value,
                clientName: client.label,
              };
            }),
          },
          {
            onSuccess: () => {
              onSave();
            },
          }
        );
        break;
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="dbn-max-w-[600px] dbn-w-[80vw] dbn-p-5">
          {mode === 'delete' ? (
            <Flex
              justify="center"
              alignItems="center"
              direction="col"
              className="dbn-gap-2"
            >
              <span className="dbn-text-red-500 dbn-text-2xl">
                <Ui.Icons name="not-found" />
                {/* warning icon */}
              </span>
              <Ui.Text variant="body-text-sm">
                Are you sure you want to delete the theme?
              </Ui.Text>
            </Flex>
          ) : (
            <>
              <Ui.InputField
                label="Theme Name"
                name="themeName"
                type="text"
                defaultValue={defaultValues?.name}
                placeholder="e.g Databrain Theme"
                register={register('name', {
                  required: true,
                })}
                className="dbn-mb-5"
              />
              <Ui.Text variant="body-text-sm">Charts Color Palettes</Ui.Text>
              <div className="dbn-mb-5 dbn-flex dbn-gap-1 dbn-flex-col dbn-items-center">
                {colorFields.length ? (
                  colorFields.map((color, index) => (
                    <Ui.InputField
                      key={color.id}
                      type="color"
                      name={`colors.${index}`}
                      defaultValue={defaultValues?.colors[index]}
                      register={register(`colors.${index}`, {
                        required: true,
                      })}
                    />
                  ))
                ) : (
                  <Ui.InputField
                    type="color"
                    name="colors.0"
                    register={register('colors.0', {
                      required: true,
                    })}
                    defaultValue={defaultValues?.colors[0]}
                  />
                )}
                {colorFields.length < 11 && (
                  <Ui.Button
                    variant="secondary"
                    type="button"
                    onClick={() => append('')}
                  >
                    <Ui.Icons name="plus" />
                  </Ui.Button>
                )}
              </div>
              <Ui.HookMultiSelect
                label="Apply Theme To Users"
                name="clients"
                options={clients?.slice(0, limit) || []}
                defaultValue={getValues().clients || []}
                control={control}
                children={
                  limit <= clients?.length && (
                    <Ui.Button
                      variant="tertiary"
                      type="button"
                      onClick={() => setLimit(limit + 30)}
                    >
                      more...
                    </Ui.Button>
                  )
                }
              />
            </>
          )}
          {errorMutatingExternalDashboardTheme ? (
            <Ui.Text variant="body-text-sm">
              {errorMutatingExternalDashboardTheme}
            </Ui.Text>
          ) : null}
        </div>
        <Ui.ModalFooter>
          <Ui.Button type="reset" variant="tab" onClick={onCancel}>
            Cancel
          </Ui.Button>
          {mode === 'delete' ? (
            <Ui.Button type="submit" variant="secondary">
              {isMutatingExternalDashboardTheme ? 'Deleting...' : 'Delete'}
            </Ui.Button>
          ) : (
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={isMutatingExternalDashboardTheme}
            >
              {isMutatingExternalDashboardTheme ? 'Saving...' : 'Save'}
            </Ui.Button>
          )}
        </Ui.ModalFooter>
      </form>
    </>
  );
};

export default React.memo(ThemeForm);
