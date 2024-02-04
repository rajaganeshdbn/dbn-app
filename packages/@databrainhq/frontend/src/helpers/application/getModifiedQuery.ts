/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import { types } from '@databrainhq/plugin';
import groupArray from './groupArray';

const getConvertedColumn = (
  column: string,
  as: string | undefined,
  dbName: string
) => {
  const lowercaseDbName = dbName.toLowerCase();
  const isIntType = as === 'number';
  const isVarchar = as === 'string';
  const isDate = as === 'date';

  let castFunction = '';
  if (isIntType) {
    castFunction =
      lowercaseDbName === 'mongodb' ||
      lowercaseDbName === 'mysql' ||
      lowercaseDbName === 'mssql'
        ? 'AS SIGNED'
        : 'AS BIGINT';
  } else if (isVarchar) {
    if (
      lowercaseDbName === 'postgres' ||
      lowercaseDbName === 'redshift' ||
      lowercaseDbName === 'snowflake' ||
      lowercaseDbName === 'awss3'
    ) {
      castFunction = 'AS VARCHAR';
    } else if (
      lowercaseDbName === 'mongodb' ||
      lowercaseDbName === 'mysql' ||
      lowercaseDbName === 'mssql'
    ) {
      castFunction = 'AS CHAR';
    } else {
      castFunction = 'AS STRING';
    }
  } else if (isDate) {
    if (lowercaseDbName === 'mongodb') {
      castFunction = 'AS DATE';
    } else if (
      lowercaseDbName === 'postgres' ||
      lowercaseDbName === 'snowflake' ||
      lowercaseDbName === 'redshift'
    ) {
      castFunction = 'AS DATE';
    } else {
      castFunction = 'AS DATE';
    }
  }

  let columnString = '';
  if (lowercaseDbName === 'mongodb') {
    columnString = `\`${column}\``;
  } else if (
    lowercaseDbName === 'bigquery' ||
    lowercaseDbName === 'mysql' ||
    lowercaseDbName === 'awss3'
  ) {
    columnString = `${column}`;
  } else {
    columnString = `"${column}"`;
  }

  return castFunction ? `CAST(${columnString} ${castFunction})` : columnString;
};
const cteQuery = (
  queryStr: string,
  groupedConditions: Record<string, types.RlsCondition[]>,
  dbName: string
) => {
  const cteNames = Object.keys(groupedConditions).map(
    (key) =>
      `${groupedConditions[key][0].tableName.split('.').join('_')}_filter`
  );

  const asStrings = Object.keys(groupedConditions).map(
    (key, index) =>
      `${cteNames[index]} AS (
        SELECT * FROM ${
          groupedConditions[key][0].tableName
        } WHERE ${groupedConditions[key]
        .map((c) =>
          c.datatype === 'date'
            ? `${c.value}`
            : `${getConvertedColumn(c.columnName, c.datatype, dbName)} ${
                Array.isArray(c.value) ? 'IN' : '='
              } ${
                Array.isArray(c.value)
                  ? `(${c.value
                      .map((v) => (typeof v === 'string' ? `'${v}'` : v))
                      .join(', ')})`
                  : typeof c.value === 'string'
                  ? `'${c.value}'`
                  : c.value
              }`
        )
        .join(' AND ')}
      )`
  );

  let newQuery = queryStr;
  for (let i = 0; i < cteNames.length; i++) {
    newQuery = newQuery.replace(
      new RegExp(
        groupedConditions[Object.keys(groupedConditions)[i]][0].tableName,
        'g'
      ),
      cteNames[i]
    );
  }

  const string = `WITH ${asStrings.join(',\n')} ${newQuery}`;
  return string;
};

const getModifiedQuery = ({
  rlsConditions,
  dbName,
  query,
}: {
  rlsConditions: types.RlsCondition[];
  dbName: string;
  query: string;
}) => {
  const groupedConditions = groupArray(
    rlsConditions.filter((rls) => rls.isAddOnMetrics),
    'tableName'
  );
  const modifiedQuery = cteQuery(query, groupedConditions, dbName);
  return modifiedQuery;
};

export default getModifiedQuery;
