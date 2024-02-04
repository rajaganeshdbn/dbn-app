/* eslint-disable consistent-return */
/* eslint-disable max-params */
/* eslint-disable no-nested-ternary */
import { FieldValues, useForm } from 'react-hook-form';
import {
  useGetLineageDataMutation,
  useSqlQueryMutation,
} from 'utils/generated/graphql';
import { SqlError } from 'types/index';
import {
  SOMETHING_WENT_WRONG,
  CLIENT_NAME_VAR,
  DATABASE_NAME,
  CLIENT_NAME_VAR_NUM,
} from 'consts/values';
import { DATABASE } from 'consts/application';
import getLimitSqlQuery from 'helpers/application/getLimitSqlQuery';
import useTenancyLevel from './useTenancyLevel';

const getSqlStatement = ({
  limit,
  query,
  dbName,
  clientName,
  tenancyType,
  values,
  offset,
}: {
  query: string;
  limit: string;
  dbName: string;
  clientName?: string;
  tenancyType?: string;
  values?: Record<string, string>;
  offset?: string;
}) => {
  const sqlQuery = getLimitSqlQuery({ query, limit, offset, dbName });
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

type ExecuteSqlQuery = {
  query: string;
  setData?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<SqlError | undefined>>;
  destinationId: string | undefined;
  setEdgeList?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setNodeList?: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  dbName: string | undefined;
  clientName?: string;
  setTimeTaken?: React.Dispatch<React.SetStateAction<number>>;
  values?: Record<string, string>;
  filters?: { columnName: string; value: any }[];
  limit: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

const useExecuteSqlQuery = ({
  query,
  setData,
  setLoading,
  setError,
  destinationId,
  setEdgeList,
  setNodeList,
  dbName,
  clientName,
  setTimeTaken,
  values,
  filters,
  limit,
}: // setQuery,
ExecuteSqlQuery) => {
  const { companyTenancyType } = useTenancyLevel();
  const { handleSubmit } = useForm();
  const sqlQueryMutation = useSqlQueryMutation();
  const getLineageDataMutation = useGetLineageDataMutation();
  const executeQuery = (
    queryValue?: FieldValues | string,
    paginatedLimit?: string,
    offset?: string
  ) => {
    const isQueryValue =
      typeof queryValue === 'string' && queryValue.length > -1;
    setLoading?.(true);
    setError?.(undefined);
    setData?.([]);
    if (dbName && destinationId)
      sqlQueryMutation.mutate(
        {
          id: destinationId,
          query: isQueryValue
            ? getSqlStatement({
                query: queryValue,
                limit: paginatedLimit || limit,
                dbName,
                clientName,
                tenancyType: companyTenancyType,
                values,
                offset,
              })
            : getSqlStatement({
                query,
                limit,
                dbName,
                clientName,
                tenancyType: companyTenancyType,
                values,
                offset,
              }),
          dbName,
          filters,
        },
        {
          onSuccess: (res: any) => {
            setLoading?.(true);
            const responseData =
              res?.sqlQuery?.data && typeof res.sqlQuery.data === 'string'
                ? JSON.parse(res.sqlQuery.data)
                : res?.sqlQuery?.data || [];
            if (setTimeTaken) setTimeTaken(res.sqlQuery.timeTaken);
            if (
              responseData.message ||
              responseData.code ||
              responseData.errorObj
            ) {
              setError?.(responseData.errorObj);
              setData?.([]);
              setLoading?.(false);
            } else {
              const data = Array.isArray(responseData) ? responseData : [];
              setData?.(data);
              setError?.(undefined);
              setLoading?.(false);
            }
          },
          onError: () => {
            setError?.({
              errorMessage: SOMETHING_WENT_WRONG,
              explanation: '',
              solution: '',
            });
            setLoading?.(false);
          },
        }
      );
    if (setNodeList && setEdgeList) {
      getLineageDataMutation.mutate(
        { sqlQuery: isQueryValue ? queryValue : query },
        {
          onSuccess: (res) => {
            if (res.getLineageData?.result) {
              const nodeList = res.getLineageData.result?.from.map(
                (item: any) => ({
                  id: item.tablename,
                  data: {
                    value: item.tablename,
                    columns: item.columns,
                  },
                  width: 150,
                  height: 150,
                })
              );
              nodeList?.push({
                id: 'output',
                data: {
                  value: 'output',
                  columns: res.getLineageData.result?.columns,
                },
                width: 150,
                height: 150,
              });
              const edgesList = res.getLineageData.result?.from.map(
                (i: any, index: any) => ({
                  id: `${i.tablename}_${index}`,
                  from: i.tablename,
                  to: 'output',
                })
              );
              setEdgeList(edgesList);
              setNodeList(nodeList);
            }
          },
        }
      );
    }
  };
  const onSqlQuerySubmit = handleSubmit((value) => executeQuery(value));
  return { onSqlQuerySubmit, executeQuery };
};

export default useExecuteSqlQuery;
