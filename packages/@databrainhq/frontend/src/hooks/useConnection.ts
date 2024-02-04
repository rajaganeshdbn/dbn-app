import { useNavigate } from 'react-router-dom';
/* eslint-disable no-template-curly-in-string */
import {
  useCreateConnectionMutation,
  useCreateOperationMutation,
} from 'utils/generated/graphql';
import { DATABRAIN, INVALID_INPUT, SOMETHING_WENT_WRONG } from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

const useConnection = ({
  sourceId,
  destinationId,
  setError,
  setDisabled,
  sourceName,
  updateOnboardingStatus,
  selectedStreams,
}: any) => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const createConnectionMutation = useCreateConnectionMutation();
  const createOperationMutation = useCreateOperationMutation();
  const createConnection = (inputData: any) => {
    setError('');
    setDisabled(true);

    const operationBody = {
      workspaceId: user?.workspaceId,
      name: 'normalization',
      operatorConfiguration: {
        operatorType: 'normalization',
        normalization: {
          option: 'basic',
        },
      },
    };
    createOperationMutation.mutate(
      { body: operationBody },
      {
        onSuccess: (res) => {
          if (res.createOperation?.data.operationId) {
            setError('');
            setDisabled(false);
            const body = {
              name: inputData.name,
              namespaceDefinition: 'source',
              namespaceFormat: '${SOURCE_NAMESPACE}',
              prefix: `${DATABRAIN}_${sourceName}_`,
              sourceId,
              destinationId,
              operationIds: [res.createOperation.data.operationId],
              syncCatalog: {
                streams: selectedStreams,
              },
              schedule: {
                // TODO: make schedule units dynamic
                // units: parseInt(inputData.sync_time, 10),
                units: 24,
                timeUnit: 'hours',
              },

              status: 'active',
            };
            createConnectionMutation.mutate(
              { body },
              {
                onSuccess: (response) => {
                  if (response.createConnection?.data.connectionId) {
                    setError('');
                    setDisabled(false);
                    if (updateOnboardingStatus) updateOnboardingStatus();
                    navigate('/integrations/connections');
                  } else {
                    setError(INVALID_INPUT);
                    setDisabled(false);
                  }
                },
                onError: () => {
                  setDisabled(false);
                  setError(SOMETHING_WENT_WRONG);
                },
              }
            );
          } else {
            setError(INVALID_INPUT);
            setDisabled(false);
          }
        },
        onError: () => {
          setDisabled(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  return { createConnection };
};

export default useConnection;
