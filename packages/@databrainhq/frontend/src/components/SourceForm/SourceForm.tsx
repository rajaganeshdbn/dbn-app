/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetIntegrationSpecificationQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import { NONE, TESTED } from 'consts/values';
import { PieChartIcon } from 'components/Graphics/Icons/Icons';
import IntegrationFormFields, {
  FormField,
} from 'components/IntegrationFormFields/IntegrationFormFields';
import useSource from 'hooks/useSource';
import styles from './sourceForm.module.css';

const SourceForm = ({ id }: any) => {
  const { control, watch, register, handleSubmit } = useForm();
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [sourceState, setSourceState] = useState(NONE);
  const navigate = useNavigate();
  const { testSource, createSource } = useSource({
    setDisabled,
    id,
    setSourceState,
    setError,
    navigate,
  });

  const { data: integrations } = useGetIntegrationSpecificationQuery({
    integrationId: id,
  });
  const specs = integrations?.integrationSpecifications[0];

  return (
    <>
      {specs ? (
        <div className={styles['source-container']}>
          {/* sourceHeader */}
          <div className={styles['source-header']}>
            <PieChartIcon />
            <Ui.Text variant="body-text-sm">
              Configure your {specs.integrationName} integration
            </Ui.Text>
          </div>
          {/* sourceBody */}
          <form
            className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-p-5"
            onSubmit={handleSubmit(testSource)}
          >
            {/* sourceSetupGuide */}
            <div className="dbn-w-full dbn-h-full">
              <Ui.Text variant="body-text-sm">Set-up Guide</Ui.Text>
              <Ui.Text variant="body-text-sm">
                Follow our set-up guide to connect to your{' '}
                {specs.integrationName} account and start pulling tables into
                your desired warehouse.
              </Ui.Text>
              <Ui.Text variant="body-text-sm">
                To get started, you will need the following:
              </Ui.Text>
              <ul className="dbn-list-disc dbn-text-xs dbn-p-5">
                {specs.fields.map(
                  (item: FormField) => item.required && <li>{item.name}</li>
                )}
              </ul>
              <Ui.Text variant="body-text-sm">
                Read our
                <Link to="/" className="dbn-text-blue-600 dbn-px-1">
                  documentation
                </Link>
                for extensive information on syncing your{' '}
                {specs.integrationName}
                to DataBrain or
                <Link to="/" className="dbn-text-blue-600 dbn-px-1">
                  invite a team member
                </Link>
                for help.
              </Ui.Text>
            </div>

            {/* sourceInputFields */}
            <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col">
              <IntegrationFormFields
                fields={specs.fields}
                register={register}
                watch={watch}
                control={control}
              />
              {error && (
                <Ui.Text variant="body-text-sm" color="alert">
                  {error}
                </Ui.Text>
              )}
            </div>
            {/* sourceInputControl */}

            <div className="dbn-flex dbn-gap-5 dbn-items-center dbn-h-full dbn-pb-5 dbn-mt-4">
              {sourceState === NONE && (
                <>
                  <Ui.Button
                    type="submit"
                    variant="primary"
                    isDisabled={isDisabled}
                  >
                    Test Source
                  </Ui.Button>
                  {isDisabled && (
                    <Ui.Text variant="body-text-sm" color="info">
                      testing...
                    </Ui.Text>
                  )}
                </>
              )}
              {sourceState === TESTED && (
                <>
                  <Ui.Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit(createSource)}
                    isDisabled={isDisabled}
                  >
                    Authenticate
                  </Ui.Button>
                  {isDisabled ? (
                    <Ui.Text variant="body-text-sm" color="info">
                      Authenticating...
                    </Ui.Text>
                  ) : (
                    <Ui.Text variant="body-text-sm" color="success">
                      Test successful
                    </Ui.Text>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className={styles['source-loader-container']}>
          <Ui.Icons name="not-found" />
          {/* loading icon */}
        </div>
      )}
    </>
  );
};

export default SourceForm;
