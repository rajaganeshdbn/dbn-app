import { FieldValues } from 'react-hook-form';
import { useGenerateExternalMetricQueryMutation } from 'utils/generated/graphql';
import { JoinField, RlsFilterObjectType, SqlError } from 'types';
import { types } from '@databrainhq/plugin';
import { SOMETHING_WENT_WRONG } from 'consts/values';
import getModifiedQuery from 'helpers/application/getModifiedQuery';

type GenerateExternalMetricQueryParams = {
  schema: string[] | '';
  executeSqlQuery: any;
  setError: React.Dispatch<React.SetStateAction<SqlError | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setMetricQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOutputColumns: React.Dispatch<React.SetStateAction<string | undefined>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  dbName: string;
  setJoinFields: React.Dispatch<React.SetStateAction<JoinField[]>>;
  rlsConditions: types.RlsCondition[] | undefined;
  tenancyLevel: string;
  filters: Pick<
    RlsFilterObjectType,
    'columnName' | 'condition' | 'name' | 'operator' | 'tableName'
  >[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        columnName: string;
        value: string | number;
      }[]
    >
  >;
};
const useGenerateExternalMetricQuery = ({
  schema,
  executeSqlQuery,
  setError,
  setLoading,
  setData,
  setGenerating,
  setQuery,
  setMetricQuery,
  setOutputColumns,
  dbName,
  setJoinFields,
  rlsConditions,
  filters,
  tenancyLevel,
  setFilters,
}: GenerateExternalMetricQueryParams) => {
  const generateExternalMetricMutation =
    useGenerateExternalMetricQueryMutation();
  const generateExternalQuery = (data: FieldValues) => {
    const joinFields = data.join.filter(
      (j: { a: string | undefined; b: string | undefined }) => j.a && j.b
    );
    setGenerating(true);
    setLoading(true);
    setError(undefined);
    setData([]);
    setFilters([]);
    if (schema)
      generateExternalMetricMutation.mutate(
        {
          inputData: {
            schemaList: schema,
            query: data.query,
            output_columns: data.output_columns,
            timeGrain: data.timeGrain,
            dbName,
            joinList: data.join.length ? joinFields : [],
            filters,
            tenancyLevel,
          },
        },
        {
          onSuccess: (res) => {
            if (res.generateExternalMetricQuery?.query) {
              const query = res.generateExternalMetricQuery.query;
              let modifiedStr: string = query;
              setMetricQuery(data.query);
              setOutputColumns(data.output_columns);
              if (
                query &&
                rlsConditions?.filter((rls) => rls.isAddOnMetrics).length
              ) {
                modifiedStr = getModifiedQuery({
                  rlsConditions,
                  query,
                  dbName,
                });
              }
              setQuery(query);
              executeSqlQuery(modifiedStr);
              setJoinFields(joinFields);
              setGenerating(false);
            } else {
              setGenerating(false);
              setLoading(false);
              setError({
                errorMessage: SOMETHING_WENT_WRONG,
                explanation: '',
                solution: '',
              });
              setQuery('');
            }
          },
          onError: () => {
            setGenerating(false);
            setLoading(false);
            setError({
              errorMessage: SOMETHING_WENT_WRONG,
              explanation: '',
              solution: '',
            });
          },
        }
      );
  };
  return { generateExternalQuery };
};

export default useGenerateExternalMetricQuery;
