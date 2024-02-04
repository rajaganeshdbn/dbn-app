/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetIntegrationSpecificationQuery } from 'utils/generated/graphql';
import { Ui } from '@databrainhq/plugin';
import { NONE, TESTED } from 'consts/values';
import { PieChartIcon } from 'components/Graphics/Icons/Icons';
import IntegrationFormFields, {
  FormField,
} from 'components/IntegrationFormFields/IntegrationFormFields';
import useDestination from 'hooks/useDestination';
import styles from './destinationForm.module.css';

const DestinationForm = ({ id }: any) => {
  const { control, watch, register, handleSubmit } = useForm();
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [destinationState, setDestinationState] = useState(NONE);
  const navigate = useNavigate();
  const { testDestination, createDestination } = useDestination({
    id,
    setDisabled,
    setError,
    setDestinationState,
    navigate,
  });

  const { data: integrations } = useGetIntegrationSpecificationQuery({
    integrationId: id,
  });
  const specs = integrations?.integrationSpecifications[0];

  return (
    <>
      {specs ? (
        <div className={styles['destination-container']}>
          {/* destinationHeader */}
          <div className={styles['destination-header']}>
            <PieChartIcon />
            <Ui.Text variant="body-text-sm">
              Configure your {specs.integrationName} integration
            </Ui.Text>
          </div>
          {/* destinationBody */}
          <form
            className={styles.destinationForm}
            onSubmit={handleSubmit(testDestination)}
          >
            {/* destinationSetupGuide */}
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

            {/* destinationInputFields */}
            <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col">
              <IntegrationFormFields
                fields={specs.fields}
                register={register}
                watch={watch}
                control={control}
              />
              {error && <Ui.Text variant="body-text-sm">{error}</Ui.Text>}
            </div>
            {/* destinationInputControl */}

            <div className={styles.testDestinationButton}>
              {destinationState === NONE && (
                <>
                  <Ui.Button
                    type="submit"
                    variant="primary"
                    isDisabled={isDisabled}
                  >
                    Test Destination
                  </Ui.Button>
                  {isDisabled && (
                    <Ui.Text variant="body-text-sm">testing...</Ui.Text>
                  )}
                </>
              )}
              {destinationState === TESTED && (
                <>
                  <Ui.Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit(createDestination)}
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
        <div className={styles['destination-loader-container']}>
          <Ui.Icons name="not-found" />
          {/* loading icon */}
        </div>
      )}
    </>
  );
};

export default DestinationForm;
