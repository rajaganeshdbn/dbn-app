import { useForm } from 'react-hook-form';
import {
  useDefinitionsQuery,
  useGetConnectionJobsQuery,
  useGetConnectionQuery,
  useSyncConnectionMutation,
} from 'utils/generated/graphql';
import { DESTINATION_DEFINITIONS, SOURCE_DEFINITIONS } from 'consts/values';

const useJob = ({ id }: any) => {
  const { handleSubmit } = useForm();

  const syncConnectionMutation = useSyncConnectionMutation();
  const { data: jobData } = useGetConnectionJobsQuery({ connectionId: id });
  const { data: connectionData } = useGetConnectionQuery({ connectionId: id });
  const sourceDefinitionId =
    connectionData?.getConnection?.data.source.sourceDefinitionId;
  const destinationDefinitionId =
    connectionData?.getConnection?.data.destination.destinationDefinitionId;

  const { data: sourceDefData } = useDefinitionsQuery({
    definitionType: SOURCE_DEFINITIONS,
  });
  const { data: destinationDefData } = useDefinitionsQuery({
    definitionType: DESTINATION_DEFINITIONS,
  });

  const destination =
    destinationDefData?.definitions?.data?.destinationDefinitions?.find(
      (d: { destinationDefinitionId: any }) =>
        d.destinationDefinitionId === destinationDefinitionId
    );

  const source = sourceDefData?.definitions?.data?.sourceDefinitions?.find(
    (s: { sourceDefinitionId: any }) =>
      s.sourceDefinitionId === sourceDefinitionId
  );
  const connectionJobData = {
    source,
    destination,
    connectionName: connectionData?.getConnection?.data.name,
    sourceName: connectionData?.getConnection?.data.source.name,
    destinationName: connectionData?.getConnection?.data.destination.name,
    jobList: jobData?.getJobs?.data.jobs,
  };

  const onSync = () => {
    syncConnectionMutation.mutate({ connectionId: id });
  };
  const onSyncSubmit = handleSubmit(onSync);
  return { connectionJobData, onSyncSubmit };
};

export default useJob;
