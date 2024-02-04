/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import {
  FloatingDropDownOption,
  LogoType,
} from '@databrainhq/plugin/src/types';
import { INTEGRATION_SPECIFICATIONS } from 'consts/integrationSpecification';
import IntegrationFormFields from 'components/IntegrationFormFields/IntegrationFormFields';
import useCompanyIntegration from 'hooks/useCompanyIntegration';
import useWorkspace from 'hooks/useWorkspace';
import styles from './integrationConnectForm.module.css';

type Props = {
  id: string | undefined;
  setIntegration?: React.Dispatch<React.SetStateAction<string>>;
};
const IntegrationConnectForm = ({ id, setIntegration }: Props) => {
  const { workspaces, setWorkspace, workspace } = useWorkspace();
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<FloatingDropDownOption>({
      label: workspaces[0]?.name,
      value: workspaces[0]?.id,
    });
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const specs: Record<string, any> | undefined =
    INTEGRATION_SPECIFICATIONS.find((s) => s.integrationId === id);
  useEffect(() => {
    if (specs) setIntegration?.(specs.integrationName.toString().toLowerCase());
  }, [setIntegration, specs]);

  useEffect(() => {
    if (workspaces?.length > 0) {
      setSelectedWorkspace({
        label: workspace?.name || '',
        value: workspace?.id,
      });
    }
  }, [workspaces?.length]);

  const { createCompanyIntegration, isAuthenticated } = useCompanyIntegration({
    name: specs?.integrationName,
    integrationId: id,
    setError,
    setDisabled,
  });

  return (
    <>
      {specs ? (
        <div className={styles['integrationConnectForm-container']}>
          <div className={styles['integrationConnectForm-header']}>
            <div className={styles.integrationCard}>
              <Ui.Logo
                name={
                  specs.integrationName.toString().toLowerCase() as LogoType
                }
                width={30}
              />
              {specs.integrationName}
            </div>
            <div className="dbn-flex dbn-flex-col dbn-gap-2">
              <Ui.Text variant="heading">
                Configure {specs.integrationName}
              </Ui.Text>
              <div className={styles.badge}>Watch Demo</div>
            </div>
          </div>
          <form
            className="dbn-w-full dbn-flex dbn-flex-col"
            onSubmit={handleSubmit(createCompanyIntegration)}
          >
            <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-4 dbn-p-5">
              <Ui.FloatingDropDown
                buttonWidth="100%"
                menuWidth="100%"
                label="Select Workspace"
                options={workspaces?.map((workSpace) => ({
                  label: workSpace.name,
                  value: workSpace.id,
                }))}
                selectedOption={selectedWorkspace}
                onChange={(option) => {
                  setSelectedWorkspace(option);
                  setWorkspace(workspaces.find((w) => w.id === option.value));
                }}
              />

              <IntegrationFormFields
                fields={specs.fields}
                register={register}
                watch={watch}
                control={control}
                errors={errors}
              />
              {error && (
                <Ui.Text variant="body-text-sm" color="alert">
                  {error}
                </Ui.Text>
              )}
            </div>

            <div className="dbn-flex dbn-gap-5 dbn-items-center dbn-pl-5 dbn-justify-start">
              <>
                <Ui.Button
                  type="submit"
                  variant="primary"
                  isDisabled={isDisabled || isAuthenticated}
                >
                  {isDisabled ? 'Authenticating...' : 'Authenticate'}
                </Ui.Button>

                {isAuthenticated && (
                  <>
                    <Ui.Text variant="body-text-sm" color="success">
                      Updated Successfully!. <br />
                      Redirecting to table settings.
                    </Ui.Text>
                  </>
                )}
              </>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles['integrationConnectForm-loader-container']}>
          <Ui.Icons name="not-found" />
        </div>
      )}
    </>
  );
};

export default IntegrationConnectForm;
