import { MSSQL } from '../../consts/application';

const caseInsensitiveReplace = (
  input: string,
  target: string,
  replacement: string
) => {
  const regex = new RegExp(target, 'i');
  return input.replace(regex, replacement);
};

const convertLimitToFetch = ({
  sqlQuery,
  existingOffset,
  existingLimit,
  outputQuery,
}: {
  sqlQuery: string;
  existingOffset: number;
  existingLimit: number;
  outputQuery: string;
}) => {
  let convertedQuery = sqlQuery;
  if (existingOffset) {
    convertedQuery = caseInsensitiveReplace(
      sqlQuery,
      `LIMIT ${existingLimit} OFFSET ${existingOffset}`,
      outputQuery
    );
  } else {
    convertedQuery = caseInsensitiveReplace(
      sqlQuery,
      `LIMIT ${existingLimit}`,
      outputQuery
    );
  }
  return convertedQuery;
};

const removeTopQuery = (sqlQuery: string, dbName?: string) => {
  if (dbName?.toLowerCase() == MSSQL) {
    // remove top {number}
    if (/TOP/i.test(sqlQuery)) {
      const topValue = parseInt(
        sqlQuery.toLowerCase().split(/TOP/i)[1]?.trim(),
        10
      );
      const topRegex = new RegExp(`top ${topValue}`, 'i');
      return sqlQuery.replace(topRegex, '');
    }
  }
  return sqlQuery;
};

const getLimitSqlQuery = ({
  query,
  limit,
  dbName,
  offset,
}: {
  query: string;
  limit: string;
  offset?: string;
  dbName?: string;
}) => {
  if (!offset) offset = '0';
  let sqlQuery = query.replace(/;\s*$/, '');
  sqlQuery = removeTopQuery(sqlQuery, dbName);
  const selectedLimit = parseInt(limit, 10);
  const isOrderBy = sqlQuery.toLowerCase().includes('order');
  const existingOffset = parseInt(
    sqlQuery.toLowerCase().split('offset')[1]?.trim(),
    10
  );
  if (sqlQuery.toLowerCase().includes('limit')) {
    const existingLimit = parseInt(
      sqlQuery.toLowerCase().split('limit')[1]?.trim(),
      10
    );
    const finalLimit =
      offset !== '0' ? limit : Math.min(existingLimit, selectedLimit);

    const outputQuery = `${
      isOrderBy ? '' : ' ORDER BY(SELECT NULL) '
    } ${`OFFSET ${existingOffset ? existingOffset : offset} ROWS`}
    FETCH NEXT ${finalLimit} ROWS ONLY`;

    if (dbName?.toLowerCase() == MSSQL) {
      sqlQuery = convertLimitToFetch({
        sqlQuery,
        existingOffset,
        existingLimit,
        outputQuery,
      });
    } else {
      sqlQuery = caseInsensitiveReplace(
        sqlQuery,
        `limit ${existingLimit}`,
        `limit ${finalLimit} ${offset !== '0' ? `OFFSET ${offset}` : ''}`
      );
    }
  } else {
    if (dbName?.toLowerCase() == MSSQL) {
      if (!(/fetch/i.test(sqlQuery) || /offset/i.test(sqlQuery))) {
        sqlQuery += ` order by(select null) ${`offset ${
          offset ? offset : 0
        } rows`} fetch next ${selectedLimit} rows only`;
      }
    } else
      sqlQuery += ` limit ${selectedLimit} ${
        offset !== '0' ? `OFFSET ${offset}` : ''
      }`;
  }
  return sqlQuery;
};

export const getLimitSqlSubQuery = ({
  query,
  dbName,
}: {
  query: string;
  dbName?: string;
}) => {
  let sqlQuery = query.replace(/;\s*$/, '');
  sqlQuery = removeTopQuery(sqlQuery, dbName);
  const isMsSql = dbName?.toLowerCase() == MSSQL;
  if (isMsSql && /LIMIT/i.test(sqlQuery)) {
    const existingLimit = parseInt(
      sqlQuery.toLowerCase()?.split('limit')[1]?.trim(),
      10
    );
    const isOrderBy = /order/i.test(sqlQuery);
    const existingOffset = parseInt(
      sqlQuery.toLowerCase().split('offset')[1]?.trim(),
      10
    );
    let convertedQuery: string = sqlQuery;
    const outputQuery = `${
      isOrderBy ? '' : ' ORDER BY(SELECT NULL) '
    } ${`OFFSET ${existingOffset ? existingOffset : 0} ROWS`}
    FETCH NEXT ${existingLimit} ROWS ONLY`;

    convertedQuery = convertLimitToFetch({
      sqlQuery,
      existingOffset,
      existingLimit,
      outputQuery,
    });
    // if (existingOffset) {
    //   convertedQuery = caseInsensitiveReplace(
    //     convertedQuery,
    //     `LIMIT ${existingLimit} OFFSET ${existingOffset}`,
    //     outputQuery
    //   );
    // } else {
    //   convertedQuery = caseInsensitiveReplace(
    //     convertedQuery,
    //     `LIMIT ${existingLimit}`,
    //     outputQuery
    //   );
    // }
    return convertedQuery;
  }
  return query.replace(/;\s*$/, '');
};

export default getLimitSqlQuery;
