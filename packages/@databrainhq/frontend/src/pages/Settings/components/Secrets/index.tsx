/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-relative-parent-imports */
import SettingsLayout from 'pages/Settings';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Ui } from '@databrainhq/plugin';
import { FieldValues, useForm } from 'react-hook-form';
import { decrypt, encrypt } from 'utils/encryption';
import { SECRET_NAME, SECRET_VALUE } from 'consts/labels';
import { required } from 'consts/validations';
import Flex from 'components/Flex';
import useSecrets from 'hooks/useSecrets';
import { getCurrentUser } from 'helpers/application/auth';
import styles from './secrets.module.css';

const Secrets = () => {
  const {
    secretValue,
    setSecretValue,
    editSecret,
    secrets,
    addSecret,
    updateSecret,
    deleteSecret,
    isAddingSecret,
    isUpdatingSecret,
    isDeletingSecret,
    isLoadingSecrets,
    errors,
    handleSubmit,
    register,
    setValue,
    watch,
    error,
    setEditSecret,
  } = useSecrets();

  useEffect(() => {
    if (editSecret?.id) {
      setValue('name', editSecret?.name?.replace('secrets_', ''));
      setValue('value', decrypt(editSecret?.value));
    } else {
      setValue('name', '');
      setValue('value', '');
    }
  }, [editSecret]);

  const onSubmit = useCallback(
    async (values: FieldValues) => {
      await addSecret({
        name: `secrets_${values.name}`,
        value: encrypt(values.value),
        companyId: getCurrentUser()?.companyId,
      });
    },
    [getCurrentUser()?.companyId]
  );

  const headers = useMemo(() => {
    return [
      {
        name: 'Name',
        columnKey: 'name',
        colSpan: 3,
      },
      {
        name: 'Value',
        columnKey: 'value',
        colSpan: 3,
        columnCell: (row: any) => '****',
      },
      // {
      //   name: 'Action',
      //   columnKey: 'action',
      //   colSpan: 1,
      //   columnCell: (row: any) => (
      //     <Flex className="dbn-gap-2">
      //       <Ui.Button
      //         variant="tertiary"
      //         type="button"
      //         onClick={() => {}}
      //         leftIcon={<Ui.Icons name="pencil-simple" />}
      //       />
      //       <Ui.Button
      //         variant="tertiary"
      //         type="button"
      //         leftIcon={<Ui.Icons name="delete" />}
      //       />
      //     </Flex>
      //   ),
      // },
    ];
  }, []);
  useEffect(() => {
    if (secretValue.action === 'delete') {
      deleteSecret(secretValue.id);
      setSecretValue({
        action: '',
        id: '',
      });
    }
  }, [secretValue]);

  return (
    <>
      <SettingsLayout>
        <section className={styles['secrets-container']}>
          <div className="dbn-flex dbn-flex-col">
            <Ui.Text variant="heading-lg">Secrets</Ui.Text>
            <Ui.Text variant="body-text-sm">
              Secret variables that you want to use in your python code.
            </Ui.Text>
          </div>
          <Flex direction="col" className="dbn-gap-[22px]">
            <Flex direction="col" className="dbn-gap-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="dbn-flex dbn-flex-col dbn-gap-[22px]"
              >
                <Flex className="dbn-gap-4 dbn-items-start">
                  <Ui.InputField
                    name="name"
                    label="Name"
                    placeholder={SECRET_NAME}
                    type="text"
                    required
                    register={register('name', required)}
                    error={errors.name?.message}
                    supportingText={
                      watch('name') ? `{{ secrets_${watch('name')} }}` : ''
                    }
                  />
                  <Ui.InputField
                    name="value"
                    label="Value"
                    placeholder={SECRET_VALUE}
                    type="text"
                    required
                    error={errors.value?.message}
                    register={register('value', required)}
                  />
                  <span className="dbn-py-6">
                    <Ui.Button
                      variant="primary"
                      type="submit"
                      fitContainer
                      isDisabled={isAddingSecret}
                    >
                      {isAddingSecret ? 'Adding...' : 'Add'}
                    </Ui.Button>
                  </span>
                </Flex>
              </form>
              {error ? (
                <Ui.Alert text="Something went wrong" variant="error" />
              ) : null}
            </Flex>
            <Flex direction="col" className="dbn-gap-1">
              <Ui.Text variant="label">Secret Variables</Ui.Text>
              <Ui.List
                headers={headers}
                data={secrets}
                isDataLoading={isLoadingSecrets || isDeletingSecret}
                isShowOptions
                setValue={setSecretValue}
              />
            </Flex>
          </Flex>
        </section>
        <Ui.Modal
          isOpen={secretValue.action === 'edit'}
          onClose={() => {
            setSecretValue({
              action: '',
              id: '',
            });
            setEditSecret(null);
          }}
          headerTitle="Edit Secret"
        >
          <form
            onSubmit={handleSubmit((values) =>
              updateSecret(
                editSecret.id,
                `secrets_${values.name}`,
                encrypt(values.value)
              )
            )}
            className="dbn-flex dbn-flex-col dbn-gap-[22px]"
          >
            {error ? (
              <Ui.Alert text="Something went wrong!" variant="error" />
            ) : null}
            <Flex direction="col" className="dbn-w-[400px] dbn-p-6 dbn-gap-4">
              <Ui.InputField
                name="name"
                label="Name"
                placeholder={SECRET_NAME}
                type="text"
                required
                register={register('name', required)}
                error={errors.name?.message}
                supportingText={
                  watch('name') ? `{{ secrets_${watch('name')} }}` : ''
                }
              />
              <Ui.InputField
                name="value"
                label="Value"
                placeholder={SECRET_VALUE}
                type="text"
                required
                error={errors.value?.message}
                register={register('value', required)}
              />
            </Flex>
            <div className={styles.optionButtons}>
              <Ui.Button
                variant="secondary"
                type="submit"
                fitContainer
                isDisabled={isUpdatingSecret}
                onClick={() => {
                  setSecretValue({
                    action: '',
                    id: '',
                  });
                  setEditSecret(null);
                }}
              >
                Cancel
              </Ui.Button>
              <Ui.Button
                variant="primary"
                type="submit"
                fitContainer
                isDisabled={isUpdatingSecret}
              >
                {isUpdatingSecret ? 'Updating...' : 'Update'}
              </Ui.Button>
            </div>
          </form>
        </Ui.Modal>
      </SettingsLayout>
    </>
  );
};

export default React.memo(Secrets);
