import {
  useCreateDestinationMutation,
  useDeleteDestinationMutation,
  useTestDestinationMutation,
  useUpdateDestinationMutation,
} from 'utils/generated/graphql';
import {
  AUTHENTICATED,
  DESTINATIONS,
  DESTINATION_AIRBYTE_IDS,
  INVALID_CREDS,
  SOMETHING_WENT_WRONG,
  SUCCEEDED,
  TESTED,
} from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

const useDestination = ({
  id,
  setError,
  setDisabled,
  setDestinationState,
  setDestinationId,
  setDestinationDefinitionId,
  navigate,
  destinationId,
}: any) => {
  const testDestinationMutation = useTestDestinationMutation();
  const createDestinationMutation = useCreateDestinationMutation();
  const updateDestinationMutation = useUpdateDestinationMutation();
  const deleteDestinationMutation = useDeleteDestinationMutation();

  const user = getCurrentUser();

  const isSnowflake = id === DESTINATION_AIRBYTE_IDS.Snowflake;
  const isBigQuery = id === DESTINATION_AIRBYTE_IDS.BigQuery;
  const isRedshift = id === DESTINATION_AIRBYTE_IDS.Redshift;

  const testDestination = (data: any) => {
    setError('');
    setDisabled(true);
    let body;
    if (isSnowflake) {
      body = {
        destinationDefinitionId: id,
        connectionConfiguration: {
          host: data.host,
          role: data.role,
          schema: data.schema,
          warehouse: data.warehouse,
          database: data.database,
          username: data.username,
          credentials: {
            password: data.password,
          },
        },
      };
    }
    if (isBigQuery) {
      body = {
        destinationDefinitionId: id,
        connectionConfiguration: {
          dataset_id: data.dataset_id,
          project_id: data.project_id,
          loading_method: {
            method: 'Standard',
          },
          dataset_location: data.dataset_location,
          credentials_json: data.credentials_json,
          transformation_priority: 'interactive',
          big_query_client_buffer_size_mb: 15,
        },
      };
    }
    if (isRedshift) {
      body = {
        destinationDefinitionId: id,
        connectionConfiguration: {
          host: data.host,
          port: parseInt(data.port, 10),
          schema: data.schema,
          database: data.database,
          username: data.username,
          password: data.password,
        },
      };
    }
    testDestinationMutation.mutate(
      { body },
      {
        onSuccess: (res) => {
          if (res.testDestination?.data.status === SUCCEEDED) {
            setError('');
            setDestinationState(TESTED);
            setDisabled(false);
          } else {
            setError(INVALID_CREDS);
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
  const createDestination = (data: any) => {
    setError('');
    setDisabled(true);
    let body;
    if (isSnowflake) {
      body = {
        destinationDefinitionId: id,
        connectionConfiguration: {
          host: data.host,
          role: data.role,
          schema: data.schema,
          warehouse: data.warehouse,
          database: data.database,
          username: data.username,
          credentials: {
            password: data.password,
          },
        },
        name: DESTINATIONS.Snowflake,
        workspaceId: user?.workspaceId,
      };
    }
    if (isBigQuery) {
      body = {
        destinationDefinitionId: id,
        connectionConfiguration: {
          dataset_id: data.dataset_id,
          project_id: data.project_id,
          loading_method: {
            method: 'Standard',
          },
          dataset_location: data.dataset_location,
          credentials_json: data.credentials_json,
          transformation_priority: 'interactive',
          big_query_client_buffer_size_mb: 15,
        },
        name: DESTINATIONS.BigQuery,
        workspaceId: user?.workspaceId,
      };
    }
    if (isRedshift) {
      body = {
        destinationDefinitionId: id,
        connectionConfiguration: {
          host: data.host,
          port: parseInt(data.port, 10),
          schema: data.schema,
          database: data.database,
          username: data.username,
          password: data.password,
          uploading_method: {
            method: 'Standard',
          },
        },

        name: DESTINATIONS.Redshift,
        workspaceId: user?.workspaceId,
      };
    }
    createDestinationMutation.mutate(
      { body },
      {
        onSuccess: (res) => {
          if (res.createDestination?.data.destinationId) {
            setError('');
            if (setDestinationId)
              setDestinationId(res.createDestination.data.destinationId);
            if (setDestinationDefinitionId) {
              setDestinationDefinitionId(id);
            }
            setDestinationState(AUTHENTICATED);
            setDisabled(false);
            navigate('/integrations/destinations');
          } else {
            setError(INVALID_CREDS);
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

  const updateDestination = (data: any) => {
    setError('');
    setDisabled(true);
    let body;
    if (isSnowflake) {
      body = {
        destinationId,
        connectionConfiguration: {
          host: data.host,
          role: data.role,
          schema: data.schema,
          warehouse: data.warehouse,
          database: data.database,
          username: data.username,
          credentials: {
            password: data.password,
          },
        },
        name: DESTINATIONS.Snowflake,
      };
    }
    if (isBigQuery) {
      body = {
        destinationId,
        connectionConfiguration: {
          dataset_id: data.dataset_id,
          project_id: data.project_id,
          loading_method: {
            method: 'Standard',
          },
          dataset_location: data.dataset_location,
          credentials_json: data.credentials_json,
          transformation_priority: 'interactive',
          big_query_client_buffer_size_mb: 15,
        },
        name: DESTINATIONS.BigQuery,
      };
    }
    if (isRedshift) {
      body = {
        destinationId,
        connectionConfiguration: {
          host: data.host,
          port: parseInt(data.port, 10),
          schema: data.schema,
          database: data.database,
          username: data.username,
          password: data.password,
          uploading_method: {
            method: 'Standard',
          },
        },

        name: DESTINATIONS.Redshift,
      };
    }
    updateDestinationMutation.mutate(
      { body },
      {
        onSuccess: (res) => {
          if (res.updateDestination?.data.destinationId) {
            setError('');
            if (setDestinationId)
              setDestinationId(res.updateDestination.data.destinationId);
            if (setDestinationDefinitionId) {
              setDestinationDefinitionId(id);
            }
            setDestinationState(AUTHENTICATED);
            setDisabled(false);
            navigate('/integrations/destinations');
          } else {
            setError(INVALID_CREDS);
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

  const deleteDestination = () => {
    deleteDestinationMutation.mutate(
      { destinationId },
      {
        onSuccess: () => {
          if (navigate) navigate('/integrations/destinations');
        },
        onError: () => {
          setDisabled(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  return {
    testDestination,
    createDestination,
    updateDestination,
    deleteDestination,
  };
};

export default useDestination;
