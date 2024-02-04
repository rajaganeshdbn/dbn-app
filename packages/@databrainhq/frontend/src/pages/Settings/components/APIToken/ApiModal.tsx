/* eslint-disable react/no-unescaped-entities */
import { FieldValues, useForm } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import segmentEvent from 'utils/segmentEvent';
import useAPITokens from 'hooks/useAPITokens';
import { getCurrentUser } from 'helpers/application/auth';
import style from './apiToken.module.css';

// const SCOPE = [
//   'Access Metrics',
//   'Access Dashboards',
//   'Create Data Models',
//   'Connect to Integrations',
//   'Manage Users & Teams',
// ];

const ApiModal = ({ setShowApiModal, isShowApiModal }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createAPIToken, isCreatingAPIToken, errorCreatingAPIToken } =
    useAPITokens();

  const generateToken = (values: FieldValues) => {
    createAPIToken(
      {
        companyId: getCurrentUser()?.companyId,
        name: values.name,
        description: values.description,
        scope: 'Access Metrics,Access Dashboards',
        updatedBy: getCurrentUser()?.id,
        isTest: false,
      },
      {
        onSuccess: () => {
          segmentEvent('api token generated', {
            name: values.name,
            description: values.description,
            scope: 'Access Metrics,Access Dashboards',
          });
          setShowApiModal(false);
        },
      }
    );
  };

  return (
    <Ui.Panel
      headerTitle="API token setings"
      isOpen={isShowApiModal}
      onClose={() => setShowApiModal(false)}
      side="right"
      hideFooter
    >
      <form
        onSubmit={handleSubmit(generateToken)}
        className="dbn-overflow-hidden dbn-p-5 dbn-h-full dbn-flex dbn-flex-col dbn-justify-between"
      >
        <div className={`${style['tokenModal-body']}`}>
          <Ui.InputField
            id="name"
            name="company"
            type="text"
            placeholder="Company Name"
            label="Name"
            register={register('name', { required: true })}
            error={errors.name?.message}
          />
          <Ui.TextAreaField
            id="desc"
            placeholder="Your company description that would be visible to your customers when accessing api tokens"
            label="Description"
            rows={4}
            register={register('description')}
          />
          {errorCreatingAPIToken ? (
            <Ui.Text variant="label">
              Something went wrong! Please try again later!
            </Ui.Text>
          ) : null}
        </div>
        <Ui.Button type="submit" variant="primary" fitContainer>
          {isCreatingAPIToken ? 'Generating...' : 'Generate API Key'}
        </Ui.Button>
      </form>
    </Ui.Panel>
  );
};

export default ApiModal;
