/* eslint-disable consistent-return */
/* eslint-disable max-params */
/* eslint-disable no-nested-ternary */
import { useSqlQueryMutation } from 'utils/generated/graphql';
import {
  CLIENT_NAME_VAR,
  DATABASE_NAME,
  CLIENT_NAME_VAR_NUM,
} from 'consts/values';
import { DATABASE } from 'consts/application';
import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';
import useTenancyLevel from './useTenancyLevel';

const getSqlStatement = (
  query: string,
  limit: string,
  dbName: string,
  clientName?: string,
  tenancyType?: string,
  values?: Record<string, string>
) => {
  const sqlQuery = getLimitSqlQuery({ query, limit, dbName });
  const str = clientName
    ? tenancyType === DATABASE
      ? sqlQuery.replace(new RegExp(DATABASE_NAME, 'g'), clientName)
      : Number(clientName)
      ? sqlQuery.replace(new RegExp(CLIENT_NAME_VAR_NUM, 'g'), clientName)
      : sqlQuery.replace(new RegExp(CLIENT_NAME_VAR, 'g'), clientName)
    : sqlQuery;
  if (!values) {
    return str;
  }
  const replacedStr = str.replace(/[^']+_variable/g, (match) => {
    const value = values[match];
    return `${value}`;
  });
  return replacedStr;
};

type ExecuteCompareQuery = {
  destinationId: string | undefined;
  dbName: string | undefined;
  clientName?: string;
  values?: Record<string, string>;
  filters?: { columnName: string; value: any }[];
  limit: string;
  setComparisonData: React.Dispatch<React.SetStateAction<any[]>>;
  queryValue: string;
};

const useCampareValue = () => {
  const { companyTenancyType } = useTenancyLevel();
  const sqlQueryMutation = useSqlQueryMutation();
  const executeCompareQuery = ({
    dbName,
    destinationId,
    limit,
    queryValue,
    setComparisonData,
    clientName,
    filters,
    values,
  }: ExecuteCompareQuery) => {
    if (dbName && destinationId)
      sqlQueryMutation.mutate(
        {
          id: destinationId,
          query: getSqlStatement(
            queryValue,
            limit,
            dbName,
            clientName,
            companyTenancyType,
            values
          ),
          dbName,
          filters,
        },
        {
          onSuccess: (res: any) => {
            const responseData =
              res?.sqlQuery?.data && typeof res.sqlQuery.data === 'string'
                ? JSON.parse(res.sqlQuery.data)
                : res?.sqlQuery?.data || [];

            setComparisonData(responseData);
          },
        }
      );
  };
  return { executeCompareQuery };
};

export default useCampareValue;
