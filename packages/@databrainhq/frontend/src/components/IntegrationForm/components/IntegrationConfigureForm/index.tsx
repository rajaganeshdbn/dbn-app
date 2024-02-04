/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import { FloatingDropDownOption } from '@databrainhq/plugin/src/types';
import { INTEGRATION_SPECIFICATIONS } from 'consts/integrationSpecification';
import IntegrationFormFields from 'components/IntegrationFormFields/IntegrationFormFields';
import DeleteModal from 'components/DeleteModal';
import useCompanyIntegration from 'hooks/useCompanyIntegration';
import useWorkspace from 'hooks/useWorkspace';
import styles from './integrationConfigureForm.module.css';

type Props = {
  connectedIntegration: Record<string, any>;
};

const IntegrationConfigurationForm = ({ connectedIntegration }: Props) => {
  const [error, setError] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const { workspaces, setWorkspace } = useWorkspace();
  const workspace = workspaces.find(
    (w) => w.id === connectedIntegration.workspaceId
  );
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<FloatingDropDownOption>({
      label: '',
      value: '',
    });
  useEffect(() => {
    if (workspace) {
      setSelectedWorkspace({
        label: workspace.name,
        value: workspace.id,
      });
      setWorkspace(workspace);
    }
  }, [workspace]);
  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const defaultValues = {
    ...connectedIntegration,
  };
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const sourceSpecs: Record<string, any> | undefined =
    INTEGRATION_SPECIFICATIONS.find(
      (s) => s.integrationId === connectedIntegration.integrationId
    );

  useEffect(() => {
    if (!connectedIntegration?.isAuthenticated) {
      setError(
        'Unauthenticated Integration! please update credentials and retry'
      );
    } else {
      setError('');
    }
  }, [connectedIntegration]);
  const {
    updateCompanyIntegration,
    deleteCompanyIntegration,
    isAuthenticated,
    syncSchema,
  } = useCompanyIntegration({
    name: connectedIntegration.dbName,
    integrationId: connectedIntegration.integrationId,
    companyIntegrationId: connectedIntegration.id,
    setDisabled,
    setError,
  });

  return (
    <div className={styles['integrationFormConfig-container']}>
      <div className={styles['integrationFormConfig-header']}>
        <div className={styles.integrationCard}>
          <Ui.Logo
            name={connectedIntegration.dbName.toString().toLowerCase()}
            width={30}
          />
          {connectedIntegration.dbName}
        </div>
        <div className="dbn-flex dbn-flex-col dbn-gap-2">
          <Ui.Text variant="heading">
            Configure {connectedIntegration.dbName}
          </Ui.Text>
          <div className={styles.badge}>Watch Demo</div>
        </div>
      </div>
      <form
        className="dbn-w-full dbn-h-full dbn-p-5 dbn-flex dbn-flex-col dbn-gap-4 dbn-mb-8"
        onSubmit={handleSubmit(updateCompanyIntegration)}
      >
        <Ui.FloatingDropDown
          buttonWidth="100%"
          menuWidth="100%"
          label="Select Workspace"
          options={[]}
          selectedOption={selectedWorkspace}
          onChange={() => {}}
          isDisabled
        />
        {sourceSpecs && (
          <IntegrationFormFields
            fields={sourceSpecs.fields}
            watch={watch}
            register={register}
            control={control}
            errors={errors}
          />
        )}
        {error && (
          <Ui.Text variant="body-text-sm" color="alert">
            {error}
          </Ui.Text>
        )}
        <div className={styles['integrationFormConfig-btn-container']}>
          <div className="dbn-flex dbn-gap-5 dbn-items-center">
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={isDisabled || isAuthenticated}
            >
              Update
            </Ui.Button>
            <Ui.Button
              type="button"
              variant="popover"
              className="disabled:dbn-cursor-not-allowed dbn-w-fit"
              isDisabled={isDisabled}
              title="Refresh Schema"
              onClick={() => syncSchema()}
            >
              Sync
            </Ui.Button>
            {isDisabled && (
              <Ui.Text variant="body-text-sm">updating...</Ui.Text>
            )}
            {isAuthenticated && (
              <>
                <Ui.Text variant="body-text-sm" color="success">
                  Updated Successfully!. <br />
                  Redirecting to table settings.
                </Ui.Text>
              </>
            )}
          </div>
          <Ui.Button
            type="button"
            variant="secondary"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Ui.Button>
        </div>
        <DeleteModal
          isShowDeleteModal={isShowDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          onDelete={deleteCompanyIntegration}
          title="Delete Data Source"
          alertMessage="Are you sure you want to delete the data source and related data?"
        />
      </form>
    </div>
  );
};

export default IntegrationConfigurationForm;
