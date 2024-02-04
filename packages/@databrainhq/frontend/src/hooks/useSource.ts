import {
  useCreateSourceMutation,
  useDeleteSourceMutation,
  useTestSourceMutation,
  useUpdateSourceMutation,
} from 'utils/generated/graphql';
import {
  AUTHENTICATED,
  GOOGLEADS,
  HUBSPOT,
  INVALID_CREDS,
  POSTGRES,
  SALESFORCE,
  SOMETHING_WENT_WRONG,
  SOURCE_AIRBYTE_IDS,
  STRIPE,
  SUCCEEDED,
  TESTED,
} from 'consts/values';
import { getCurrentUser } from 'helpers/application/auth';

const useSource = ({
  id,
  setDisabled,
  setSourceState,
  setError,
  setSourceId,
  setSourceName,
  setSourceDefinitionId,
  navigate,
  sourceId,
}: any) => {
  const isSalesforce = id === SOURCE_AIRBYTE_IDS.Salesforce;
  const isHubSpot = id === SOURCE_AIRBYTE_IDS.HubSpot;
  const isPostgres = id === SOURCE_AIRBYTE_IDS.Postgres;
  const isGoogleAds = id === SOURCE_AIRBYTE_IDS.GoogleAds;
  const isStripe = id === SOURCE_AIRBYTE_IDS.Stripe;

  const testSourceMutation = useTestSourceMutation();
  const createSourceMutation = useCreateSourceMutation();
  const updateSourceMutation = useUpdateSourceMutation();
  const deleteSourceMutation = useDeleteSourceMutation();

  const user = getCurrentUser();
  const testSource = (data: any) => {
    setError('');
    setDisabled(true);
    let body;
    if (isSalesforce) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          client_id: data.client_id,
          client_secret: data.client_secret,
          refresh_token: data.refresh_token,
          is_sandbox: data.is_sandbox,
        },
      };
    }
    if (isHubSpot) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          start_date: data.start_date,
          credentials: {
            access_token: data.access_token,
            credentials_title: 'Private App Credentials',
          },
        },
      };
    }
    if (isPostgres) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          ssl: false,
          host: data.host,
          port: data.port,
          schemas: data.schemas.split(', '),
          database: data.database,
          password: data.password,
          ssl_mode: {
            mode: 'disable',
          },
          username: data.username,
          tunnel_method: {
            tunnel_method: 'NO_TUNNEL',
          },
          replication_method: {
            method: 'Standard',
          },
        },
      };
    }
    if (isGoogleAds) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          start_date: data.start_date,
          customer_id: data.customer_id,
          credentials: {
            developer_token: data.developer_token,
            client_id: data.client_id,
            client_secret: data.client_secret,
            refresh_token: data.refresh_token,
          },
        },
      };
    }
    if (isStripe) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          account_id: data.account_id,
          start_date: data.start_date,
          slice_range: parseInt(data.slice_range, 10),
          client_secret: data.client_secret,
          lookback_window_days: parseInt(data.lookback_window_days, 10),
        },
      };
    }
    testSourceMutation.mutate(
      { body },
      {
        onSuccess: (res) => {
          if (res.testSource?.data.status === SUCCEEDED) {
            setError('');
            setSourceState(TESTED);
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
  const createSource = (data: any) => {
    setError('');
    setDisabled(true);
    let body;
    if (isSalesforce) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          client_id: data.client_id,
          client_secret: data.client_secret,
          refresh_token: data.refresh_token,
          is_sandbox: data.is_sandbox,
          start_date: data.start_date,
        },
        name: SALESFORCE,
        workspaceId: user?.workspaceId,
      };
    }
    if (isHubSpot) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          start_date: data.start_date,
          credentials: {
            access_token: data.access_token,
            credentials_title: 'Private App Credentials',
          },
        },
        name: HUBSPOT,
        workspaceId: user?.workspaceId,
      };
    }
    if (isPostgres) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          ssl: false,
          host: data.host,
          port: data.port,
          schemas: ['public'],
          database: data.database,
          password: data.password,
          ssl_mode: {
            mode: 'disable',
          },
          username: data.username,
          tunnel_method: {
            tunnel_method: 'NO_TUNNEL',
          },
          replication_method: {
            method: 'Standard',
          },
        },
        name: POSTGRES,
        workspaceId: user?.workspaceId,
      };
    }
    if (isGoogleAds) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          start_date: data.start_date,
          customer_id: data.customer_id,
          credentials: {
            developer_token: data.developer_token,
            client_id: data.client_id,
            client_secret: data.client_secret,
            refresh_token: data.refresh_token,
          },
        },
        name: GOOGLEADS,
        workspaceId: user?.workspaceId,
      };
    }
    if (isStripe) {
      body = {
        sourceDefinitionId: id,
        connectionConfiguration: {
          account_id: data.account_id,
          start_date: data.start_date,
          slice_range: parseInt(data.slice_range, 10),
          client_secret: data.client_secret,
          lookback_window_days: parseInt(data.lookback_window_days, 10),
        },
        name: STRIPE,
        workspaceId: user?.workspaceId,
      };
    }
    createSourceMutation.mutate(
      { body },
      {
        onSuccess: (res) => {
          if (res.createSource?.data.sourceId) {
            if (setSourceId) setSourceId(res.createSource.data.sourceId);
            if (setSourceDefinitionId) {
              setSourceDefinitionId(id);
            }
            if (setSourceName) setSourceName(res.createSource.data.name);
            setError('');
            setSourceState(AUTHENTICATED);
            setDisabled(false);
            if (navigate) navigate('/integrations/sources');
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
  const updateSource = (data: any) => {
    setError('');
    setDisabled(true);
    let body;
    if (isSalesforce) {
      body = {
        sourceId,
        connectionConfiguration: {
          client_id: data.client_id,
          client_secret: data.client_secret,
          refresh_token: data.refresh_token,
          is_sandbox: data.is_sandbox,
          start_date: data.start_date,
        },
        name: SALESFORCE,
      };
    }
    if (isHubSpot) {
      body = {
        sourceId,
        connectionConfiguration: {
          start_date: data.start_date,
          credentials: {
            access_token: data.access_token,
            credentials_title: 'Private App Credentials',
          },
        },
        name: HUBSPOT,
      };
    }
    if (isPostgres) {
      body = {
        sourceId,
        connectionConfiguration: {
          ssl: false,
          host: data.host,
          port: data.port,
          schemas: ['public'],
          database: data.database,
          password: data.password,
          ssl_mode: {
            mode: 'disable',
          },
          username: data.username,
          tunnel_method: {
            tunnel_method: 'NO_TUNNEL',
          },
          replication_method: {
            method: 'Standard',
          },
        },
        name: POSTGRES,
      };
    }
    if (isGoogleAds) {
      body = {
        sourceId,
        connectionConfiguration: {
          start_date: data.start_date,
          customer_id: data.customer_id,
          credentials: {
            developer_token: data.developer_token,
            client_id: data.client_id,
            client_secret: data.client_secret,
            refresh_token: data.refresh_token,
          },
        },
        name: GOOGLEADS,
      };
    }
    if (isStripe) {
      body = {
        sourceId,
        connectionConfiguration: {
          account_id: data.account_id,
          start_date: data.start_date,
          slice_range: parseInt(data.slice_range, 10),
          client_secret: data.client_secret,
          lookback_window_days: parseInt(data.lookback_window_days, 10),
        },
        name: STRIPE,
      };
    }
    updateSourceMutation.mutate(
      { body },
      {
        onSuccess: (res) => {
          if (res.updateSource?.data.sourceId) {
            if (setSourceId) setSourceId(res.updateSource.data.sourceId);
            if (setSourceDefinitionId) {
              setSourceDefinitionId(id);
            }
            if (setSourceName) setSourceName(res.updateSource.data.name);
            setError('');
            setSourceState(AUTHENTICATED);
            setDisabled(false);
            if (navigate) navigate('/integrations/sources');
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

  const deleteSource = () => {
    deleteSourceMutation.mutate(
      { sourceId },
      {
        onSuccess: () => {
          if (navigate) navigate('/integrations/sources');
        },
        onError: () => {
          setDisabled(false);
          setError(SOMETHING_WENT_WRONG);
        },
      }
    );
  };
  return { testSource, createSource, updateSource, deleteSource };
};

export default useSource;
