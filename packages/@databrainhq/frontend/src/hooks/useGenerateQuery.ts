import { useGenerateMetricQueryMutation } from 'utils/generated/graphql';
import { SOMETHING_WENT_WRONG } from 'consts/values';

const useGenerateQuery = ({
  setLoading,
  setQuery,
  schema,
  dbName,
  executeQuery,
  setData,
  setGenerating,
  setError,
  setMetricQuery,
  setOutputColumns,
}: any) => {
  const generateMetricQueryMutation = useGenerateMetricQueryMutation();
  const generateQuery = (data: any) => {
    setError('');
    setData([]);
    setGenerating(true);
    setLoading(true);
    generateMetricQueryMutation.mutate(
      {
        inputData: {
          schema: `${schema?.join('\n')}`,
          query: data.query,
          output_columns: data.output_columns,
          dbName,
        },
      },
      {
        onSuccess: (res) => {
          setQuery(res.generateMetricQuery?.query);
          executeQuery(res.generateMetricQuery?.query);
          setMetricQuery(data.query);
          setOutputColumns(data.output_columns);
          setGenerating(false);
        },
        onError: () => {
          setQuery(SOMETHING_WENT_WRONG);
          setGenerating(false);
          setLoading(false);
        },
      }
    );
  };
  return { generateQuery };
};

export default useGenerateQuery;
