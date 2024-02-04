/* eslint-disable consistent-return */
/* eslint-disable max-params */
/* eslint-disable no-nested-ternary */
import { useSqlQueryMutation } from 'utils/generated/graphql';
import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';

type FetchTotalRecordsCount = {
  destinationId: string | undefined;
  dbName: string | undefined;
  clientName?: string;
  limit: string;
  setTotalTableRecords: React.Dispatch<React.SetStateAction<number>>;
  queryValue: string;
};

const useFetchTotalRecordsCount = () => {
  const sqlQueryMutation = useSqlQueryMutation();
  const fetchTotalRecordsCount = ({
    dbName,
    destinationId,
    limit,
    queryValue,
    setTotalTableRecords,
  }: FetchTotalRecordsCount) => {
    let sqlQuery = getLimitSqlQuery({ query: queryValue, limit, dbName });

    sqlQuery = `SELECT COUNT(*) as total_count from (${sqlQuery.replace(
      /limit\s+\d+/i,
      ''
    )}) as derived_table`;
    if (dbName && destinationId)
      sqlQueryMutation.mutate(
        {
          id: destinationId,
          query: sqlQuery,
          dbName,
          filters: [],
        },
        {
          onSuccess: (res: any) => {
            const responseData =
              res?.sqlQuery?.data && typeof res.sqlQuery.data === 'string'
                ? JSON.parse(res.sqlQuery.data)
                : res?.sqlQuery?.data || [];

            setTotalTableRecords(
              responseData?.message ? 0 : responseData?.[0]?.total_count
            );
          },
        }
      );
  };
  return { fetchTotalRecordsCount };
};

export default useFetchTotalRecordsCount;
