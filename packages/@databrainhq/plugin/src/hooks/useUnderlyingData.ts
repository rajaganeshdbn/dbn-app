/* eslint-disable no-nested-ternary */

import {
  CLIENT_NAME_VAR,
  CLIENT_NAME_VAR_NUM,
  DATABASE,
  DATABASE_NAME,
  MSSQL,
} from '@/consts';
import { useMetricUnderlyingDataMutation } from '@/queries/metric.mutation';

const getLimitSqlQuery = ({
  query,
  limit,
  offset,
  dbName,
}: {
  query: string;
  limit: string;
  offset?: string;
  dbName?: string;
}) => {
  let sqlQuery = query.replace(/;(^;]*)$/, '');
  const selectedLimit = parseInt(limit, 10);

  if (sqlQuery.toLowerCase().includes('limit')) {
    const existingLimit = parseInt(
      sqlQuery.toLowerCase().split('limit')[1].trim(),
      10
    );
    const finalLimit = offset ? limit : Math.min(existingLimit, selectedLimit);
    if (dbName?.toLowerCase() == MSSQL) {
      sqlQuery = sqlQuery.replace(
        `limit ${existingLimit}`,
        `order by(select null) ${`offset ${
          offset ? offset : 0
        } rows`} fetch next ${finalLimit} rows only`
      );
      sqlQuery = sqlQuery.replace(
        `LIMIT ${existingLimit}`,
        `ORDER BY(SELECT NULL) ${`OFFSET ${offset ? offset : 0} ROWS`}
        FETCH NEXT ${finalLimit} ROWS ONLY`
      );
    } else {
      sqlQuery = sqlQuery.replace(
        `limit ${existingLimit}`,
        `limit ${finalLimit} ${offset ? `OFFSET ${offset}` : ''}`
      );
      sqlQuery = sqlQuery.replace(
        `LIMIT ${existingLimit}`,
        `LIMIT ${finalLimit} ${offset ? `OFFSET ${offset}` : ''}`
      );
    }
  } else {
    if (dbName?.toLowerCase() == MSSQL)
      sqlQuery += ` order by(select null) ${`offset ${
        offset ? offset : 0
      } rows`} fetch next ${selectedLimit} rows only`;
    else
      sqlQuery += ` limit ${selectedLimit} ${offset ? `OFFSET ${offset}` : ''}`;
  }
  // console.log(sqlQuery);
  return sqlQuery;
};

const getSqlStatement = ({
  limit,
  query,
  dbName,
  clientName,
  tenancyType,
  values,
}: {
  query: string;
  limit: string;
  dbName: string;
  clientName?: string;
  tenancyType?: string;
  values?: Record<string, string>;
}) => {
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
export const useUnderlyingData = ({
  clientName,
  dbName,
  tenancyType,
  values,
  query,
  companyId,
  workspaceId,
  metricId,
}: {
  clientName?: string;
  dbName: string;
  tenancyType?: string;
  values?: Record<string, string>;
  query: string;
  companyId: string;
  workspaceId: string;
  metricId: string;
}) => {
  const { mutate: underlyingDataMutate } = useMetricUnderlyingDataMutation();
  const getUnderlyingData = ({
    columnName,
    value,
    setData,
    setLoading,
    isSingleValueChart,
  }: {
    columnName: string | undefined;
    value: any | undefined;
    isSingleValueChart: boolean;
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const sqlQuery = getSqlStatement({
      query,
      limit: '5000',
      clientName,
      tenancyType,
      values,
      dbName,
    });
    setData([]);
    setLoading(true);
    underlyingDataMutate(
      {
        columnName: isSingleValueChart ? undefined : columnName,
        companyId,
        query: sqlQuery,
        value: isSingleValueChart ? undefined : value?.replace(/'/g, "''"),
        workspaceId,
        metricId,
      },
      {
        onSuccess(data: any) {
          const resData = data?.data;
          if (resData && Array.isArray(resData) && resData.length) {
            setData(resData);
            setLoading(false);
          } else {
            setData([]);
            setLoading(false);
          }
        },
        onError() {
          setData([]);
          setLoading(false);
        },
      }
    );
  };
  return { getUnderlyingData };
};

export default useUnderlyingData;
