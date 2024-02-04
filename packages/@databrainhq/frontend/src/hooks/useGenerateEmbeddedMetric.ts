import { FieldValues } from 'react-hook-form';
import { useGenerateEmbeddedMeticMutation } from 'utils/generated/graphql';
import { SqlError } from 'types';
import { SOMETHING_WENT_WRONG } from 'consts/values';

type Params = {
  clientId: string | null;
  companyId: string | null;
  setError: React.Dispatch<React.SetStateAction<SqlError | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setMetricQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const useGenerateEmbeddedMetric = ({
  clientId,
  companyId,
  setData,
  setError,
  setLoading,
  setQuery,
  setMetricQuery,
}: Params) => {
  const generateEmbeddedMetricMutation = useGenerateEmbeddedMeticMutation();
  const generateEmbeddedMetric = (data: FieldValues) => {
    setLoading(true);
    setQuery('');
    setError(undefined);
    setData(undefined);
    generateEmbeddedMetricMutation.mutate(
      {
        clientId,
        companyId,
        queryPrompt: data.queryPrompt,
        timeGrain: data.timeGrain,
      },
      {
        onSuccess: (res) => {
          if (res.generateEmbeddedMetic?.error) {
            setLoading(false);
            setQuery('');
            setData(undefined);
            setError({
              errorMessage: res.generateEmbeddedMetic.error.message,
              explanation: '',
              solution: '',
            });
          } else {
            setMetricQuery(data.queryPrompt);
            setError(undefined);
            setLoading(false);
            setQuery(res.generateEmbeddedMetic?.query || '');
            setData(res.generateEmbeddedMetic?.result);
          }
        },
        onError: () => {
          setLoading(false);
          setQuery('');
          setData(undefined);
          setError({
            errorMessage: SOMETHING_WENT_WRONG,
            solution: '',
            explanation: '',
          });
        },
      }
    );
  };
  return { generateEmbeddedMetric };
};

export default useGenerateEmbeddedMetric;
