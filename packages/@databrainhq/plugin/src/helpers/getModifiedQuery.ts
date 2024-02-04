/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React from 'react';
import generateTimeRangeWhereClause from './generateTimeRangeWhereClause';
import { groupArray } from './groupArray';
import { FilterFieldType, MetricCardProps } from '@/components';
import {
  DATABASE_NAME,
  CLIENT_NAME_VAR_NUM,
  CLIENT_NAME_VAR,
  DATABASE,
  NUMBER,
  IS_NOT_NULL,
  STRING,
  BOOLEAN,
  DEFAULT,
  DATE,
  AND,
  AS_SIGNED,
  AS_BIGINT,
  AS_VARCHAR,
  AS_CHAR,
  AS_STRING,
  AS_DATE,
  CAST,
  IN,
  EQUAL_OPERATOR,
  YEAR,
  LAST,
  LIKE,
  MULTI_SELECT,
  SINGLE_SELECT,
  SEARCH,
  NUMBER_FIELD,
  DATE_PICKER,
} from '@/consts';
import {
  BIGQUERY,
  CLICKHOUSE,
  DATABRICKS,
  MONGODB,
  MSSQL,
  MYSQL,
  POSTGRES,
  REDSHIFT,
  SNOWFLAKE,
  AWSS3,
} from '@/consts/metricOptions';
import { DateOptionType, GlobalFilterColumn, RlsCondition } from '@/types/app';

type OnChangeGlobalFilterParams = {
  value: any;
  setAppliedFilters: React.Dispatch<React.SetStateAction<FilterFieldType[]>>;
  column: GlobalFilterColumn;
  operator: string;
  type: string;
};
type GetSqlStatement = {
  query: string;
  clientId?: string;
  rlsConditions: RlsCondition[];
  globalFilters?: MetricCardProps['globalFilters'];
  dbName: string;
  tenancyLevel: string;
  values?: Record<string, string>;
  isAllClient?: boolean;
};
export type ReplaceVariable = {
  query: string;
  clientId?: string;
  rlsConditions: RlsCondition[];
  tenancyLevel: string;
  values?: Record<string, string>;
  isAllClient?: boolean;
  globalFilters?: MetricCardProps['globalFilters'];
};
type ReplaceClientVariableParams = {
  query: string;
  clientId?: string | number | null;
  tenancyLevel: string;
  isAllClient?: boolean;
};

// replaceClientVariable replace client variables e.g. {{DATABASE_NAME}}, 'client_id_variable' based on the tenancy & value
export const replaceClientVariable = ({
  clientId,
  query,
  tenancyLevel,
  isAllClient,
}: ReplaceClientVariableParams): string => {
  // If no clientId is provided, return the original query unchanged
  if (!clientId) return query;
  // Check if the tenancyLevel is set to DATABASE
  if (tenancyLevel === DATABASE) {
    // Replace occurrences of DATABASE_NAME in the query with the provided clientId
    return query.replace(new RegExp(DATABASE_NAME, 'g'), clientId.toString());
  }

  // Check if the type of clientId is NUMBER
  if (typeof clientId === NUMBER) {
    const clientIdVariableWithOperatorRegx = new RegExp(
      `=\\s*['"]?${CLIENT_NAME_VAR_NUM}['"]?`,
      'g'
    );
    // If isAllClient is true, replace placeholders with IS_NOT_NULL,
    // otherwise, replace placeholders with the provided clientId
    return isAllClient
      ? query.replace(clientIdVariableWithOperatorRegx, IS_NOT_NULL)
      : query.replace(
          new RegExp(CLIENT_NAME_VAR_NUM, 'g'),
          clientId.toString()
        );
  }
  const clientIdVariableWithOperatorRegx = new RegExp(
    `=\\s*['"]?${CLIENT_NAME_VAR_NUM}['"]?`,
    'g'
  );
  // If isAllClient is true, replace placeholders with IS_NOT_NULL,
  // otherwise, replace placeholders with the provided clientId
  return isAllClient
    ? query.replace(clientIdVariableWithOperatorRegx, IS_NOT_NULL)
    : query.replace(new RegExp(CLIENT_NAME_VAR, 'g'), `${clientId}`);
};

const getStringWithVariantVariableFilterValue = (
  value: string | string[],
  variant: string
) => {
  // If the value is an array, format it as a list of quoted strings
  if (Array.isArray(value)) {
    return ` ( ${value.map((val) => `'${val}'`).join(' , ')} ) `;
  }
  if (variant === LIKE) {
    // If the variant is LIKE, add wildcard characters around the value
    return `${value}`;
  }
  // Otherwise, treat the value as a single quoted string
  return ` '${value}' `;
};

const replaceStringVariable = (
  query: string,
  variableString: string,
  value: string
) => {
  return query.replace(new RegExp(variableString, 'g'), value as string);
};
const getDateVariableFilterValue = (value: Record<string, any>) => {
  const selectedStartDate =
    value?.startDate || new Date(new Date().setFullYear(1, 0, 1))?.toJSON();
  const selectedEndDate = value?.endDate || new Date()?.toJSON();
  const startDateObj = new Date(selectedStartDate);
  const endDateObj = new Date(selectedEndDate);
  const startDate = ` '${startDateObj?.toISOString().slice(0, 10)}' `;
  const endDate = ` '${endDateObj?.toISOString().slice(0, 10)}' `;
  return { startDate, endDate };
};
const replaceDateVariable = (
  query: string,
  value: Record<string, any>,
  variableStrings: {
    startVariable: string | undefined;
    endVariable: string | undefined;
  }
) => {
  let modefiedQuery = query;
  const { endDate, startDate } = getDateVariableFilterValue(value);

  if (variableStrings.startVariable)
    modefiedQuery = replaceStringVariable(
      modefiedQuery,
      variableStrings.startVariable,
      startDate
    );
  if (variableStrings.endVariable)
    modefiedQuery = replaceStringVariable(
      modefiedQuery,
      variableStrings.endVariable,
      endDate
    );
  return modefiedQuery;
};
const replaceMetricFilterVariables = (
  query: string, // Input query string to be modified
  metricVariableFilters: RlsCondition[] // Array of metric variable filters
): string => {
  let replacedMetricFilterVariablesQuery = query;

  // Iterate through each metric variable filter
  metricVariableFilters.forEach((v) => {
    const datatype = v.datatype;
    const variant = v.filterVariant?.value;
    const isStringWithFilterVariant = datatype === STRING && variant;
    const selectedValue = v.value;
    const variableFirstString = v.variableStrings?.[0];
    const variableSecondString = v.variableStrings?.[1];
    const isSingleValueFilter = [STRING, BOOLEAN, DEFAULT, NUMBER].includes(
      datatype
    );
    const isNumberDatatype = datatype === NUMBER;
    const isDateDatatype = datatype === DATE;

    // Check if the filter has a valid first variable string and is either a string with filter variant or a single value filter
    if (
      variableFirstString &&
      !!(isStringWithFilterVariant || isSingleValueFilter || isDateDatatype)
    ) {
      const isUndefinedValue =
        !selectedValue && !v.selectedVariableValue?.value;

      // Check if it's a date datatype and has a second variable string
      if (isDateDatatype && variableSecondString) {
        // Extract start and end dates from the date variable filter
        replacedMetricFilterVariablesQuery = replaceDateVariable(
          replacedMetricFilterVariablesQuery,
          v.selectedVariableValue as Record<string, any>,
          {
            startVariable: variableFirstString,
            endVariable: variableSecondString,
          }
        );
      } else if (isUndefinedValue) {
        const variableWithOperatorRegx = new RegExp(
          `(\\S+)\\s*['"]?\\S*${variableFirstString}\\S*['"]?`,
          'g'
        );
        replacedMetricFilterVariablesQuery =
          replacedMetricFilterVariablesQuery.replace(
            variableWithOperatorRegx,
            IS_NOT_NULL
          );
      } else {
        // Initialize a variable to store the value to replace the variable string
        let value = ` '${v.selectedVariableValue?.value}' `;

        // Adjust the value based on the filter type
        if (isStringWithFilterVariant)
          value = getStringWithVariantVariableFilterValue(
            selectedValue as string | string[],
            variant
          );
        if (isNumberDatatype)
          value = `${Number(v.selectedVariableValue?.value) || 0}`;
        // Replace the first variable string with the computed value in the query
        replacedMetricFilterVariablesQuery = replaceStringVariable(
          replacedMetricFilterVariablesQuery,
          variableFirstString,
          value
        );
      }
    }
  });

  // Return the final modified query
  return replacedMetricFilterVariablesQuery;
};

const replaceGlobalFilterVariables = (
  query: string,
  globalVariableFilters: FilterFieldType[]
) => {
  let replacedGlobalFilterVariableQuery = query;

  globalVariableFilters.forEach((v) => {
    const datatype = v.as;
    const isNumberDataType = datatype === NUMBER;
    const variableFirstString = v.variableStrings?.[0];
    const variableSecondString = v.variableStrings?.[1];
    const selectedValue = v.value as any;
    const isDateDatatype = datatype === DATE;
    const variant = v.filterVariant?.value;
    const isStringWithFilterVariant = datatype === STRING && variant;
    const isSingleValueFilter = [STRING, BOOLEAN, DEFAULT].includes(
      datatype || ''
    );
    const isUndefinedValue = !selectedValue;
    if (isNumberDataType) {
      const min = isUndefinedValue
        ? ' 0 '
        : ` ${selectedValue?.split(AND)?.[0]} `;
      const max = isUndefinedValue
        ? ` ${Number.MAX_SAFE_INTEGER} `
        : ` ${selectedValue?.split(AND)?.[1]} `;
      if (variableFirstString)
        replacedGlobalFilterVariableQuery = replaceStringVariable(
          replacedGlobalFilterVariableQuery,
          variableFirstString,
          min
        );
      if (variableSecondString)
        replacedGlobalFilterVariableQuery = replaceStringVariable(
          replacedGlobalFilterVariableQuery,
          variableSecondString,
          max
        );
    } else if (
      !!(isStringWithFilterVariant || isSingleValueFilter) &&
      variableFirstString
    ) {
      if (isUndefinedValue) {
        const variableWithOperatorRegx = new RegExp(
          `(\\S+)\\s*['"]?\\S*${variableFirstString}\\S*['"]?`,
          'g'
        );
        replacedGlobalFilterVariableQuery =
          replacedGlobalFilterVariableQuery.replace(
            variableWithOperatorRegx,
            IS_NOT_NULL
          );
      } else {
        let value = Array.isArray(v.value)
          ? ` (${v?.value?.map((val) => `${val}`).join(', ')}) `
          : ` ${v.value} `;
        if (variant === LIKE) {
          value = `${value?.replace(/'/g, '').replace(/%/g, '')}`;
        }
        replacedGlobalFilterVariableQuery = replaceStringVariable(
          replacedGlobalFilterVariableQuery,
          variableFirstString,
          value
        );
      }
    } else if (isDateDatatype) {
      replacedGlobalFilterVariableQuery = replaceDateVariable(
        replacedGlobalFilterVariableQuery,
        selectedValue,
        {
          startVariable: variableFirstString,
          endVariable: variableSecondString,
        }
      );
    }
  });

  // Return the final modified query
  return replacedGlobalFilterVariableQuery;
};
export const replaceVariable = ({
  query,
  rlsConditions,
  tenancyLevel,
  clientId,
  values,
  isAllClient,
  globalFilters,
}: ReplaceVariable) => {
  let variableReplacedQuery = replaceClientVariable({
    clientId,
    query,
    tenancyLevel,
    isAllClient,
  });
  const metricVariableFilters = rlsConditions.filter(
    (rls) => rls.isAddOnMetrics && rls.isVariableFilter
  );
  if (metricVariableFilters.length)
    variableReplacedQuery = replaceMetricFilterVariables(
      variableReplacedQuery,
      metricVariableFilters
    );
  const globalVariableFilters =
    globalFilters?.filters?.filter((f) => f.isVariableFilter) || [];
  if (globalVariableFilters.length)
    variableReplacedQuery = replaceGlobalFilterVariables(
      variableReplacedQuery,
      globalVariableFilters
    );
  // replace custom rls filter variable
  if (values) {
    variableReplacedQuery = variableReplacedQuery.replace(
      /[^']+_variable/g,
      (match) => {
        const value = values[match];
        return `${value}`;
      }
    );
  }
  return variableReplacedQuery;
};

export const nameSpace = (name: string, dbName: string): string => {
  const database = dbName.toLowerCase();
  switch (database) {
    case POSTGRES:
    case REDSHIFT:
    case SNOWFLAKE:
      return `"${name}"`;
    case BIGQUERY:
    case MYSQL:
    case MONGODB:
    case DATABRICKS:
    case CLICKHOUSE:
      return `\`${name}\``;
    default:
      return `${name.replace(' ', '_')}`;
  }
};

export const nameSpaceSpecification = (
  parentAlias: string,
  columnName: string,
  dbName: string
): string => {
  if (dbName.toLowerCase() === AWSS3) return `${nameSpace(columnName, dbName)}`;
  return `${nameSpace(parentAlias, dbName)}.${nameSpace(columnName, dbName)}`;
};
const getConvertedColumn = (
  column: string,
  as: string | undefined,
  dbName: string
) => {
  const lowercaseDbName = dbName.toLowerCase();
  const isIntType = as === NUMBER;
  const isVarchar = as === STRING;
  const isDate = as === DATE;

  let castFunction = '';
  if (isIntType) {
    castFunction =
      lowercaseDbName === MONGODB ||
      lowercaseDbName === MYSQL ||
      lowercaseDbName === MSSQL
        ? AS_SIGNED
        : AS_BIGINT;
  } else if (isVarchar) {
    if (
      lowercaseDbName === POSTGRES ||
      lowercaseDbName === REDSHIFT ||
      lowercaseDbName === SNOWFLAKE ||
      lowercaseDbName === AWSS3
    ) {
      castFunction = AS_VARCHAR;
    } else if (
      lowercaseDbName === MONGODB ||
      lowercaseDbName === MYSQL ||
      lowercaseDbName === MSSQL
    ) {
      castFunction = AS_CHAR;
    } else {
      castFunction = AS_STRING;
    }
  } else if (isDate) {
    if (lowercaseDbName === MONGODB) {
      castFunction = AS_DATE;
    } else if (
      lowercaseDbName === POSTGRES ||
      lowercaseDbName === SNOWFLAKE ||
      lowercaseDbName === REDSHIFT ||
      lowercaseDbName === AWSS3
    ) {
      castFunction = AS_DATE;
    } else {
      castFunction = AS_DATE;
    }
  }

  return castFunction
    ? `${CAST}(${nameSpace(column, lowercaseDbName)} ${castFunction})`
    : nameSpace(column, lowercaseDbName);
};

export const getReplacedQuery = (
  table: { tableName: string; condition: string },
  query: string,
  dbName: string
) => {
  let newQuery = query;
  // if where is present after tableName then add conditions with and else add a  where clause after tableName with
  const tablePlaceHolder1 = table.tableName
    .split(/\.(?=[^.]*$)/)
    .map((value) => `${nameSpace(value, dbName)}`)
    .join('.');
  const tablePlaceHolder2 = table.tableName;
  const schemaName = table.tableName?.split(/\.(?=[^.]*$)/)?.[0] || '';
  const tableName = table.tableName?.split(/\.(?=[^.]*$)/)?.[1] || '';
  const tablePlaceHolder3 = `${nameSpace(schemaName, dbName)}.${tableName}`;
  const tablePlaceHolder4 = `${schemaName}.${nameSpace(tableName, dbName)}`;
  const tablePlaceholders = [
    tablePlaceHolder1,
    tablePlaceHolder2,
    tablePlaceHolder3,
    tablePlaceHolder4,
  ];
  const validPlaceHolder = tablePlaceholders.find((t) => newQuery.includes(t));
  if (validPlaceHolder) {
    const whereClauseRegX = new RegExp(`${validPlaceHolder}\\s*WHERE`, 'gi');
    const whereWithAlias = `\\s*AS\\s*['"]?[^"'\\s]+['"]?\\s*WHERE`;
    const asWhereClauseRegX = new RegExp(
      `${validPlaceHolder}${whereWithAlias}`,
      'gi'
    );
    const asTableRegX = new RegExp(
      `FROM\\s*${validPlaceHolder}\\s*AS\\s*['"]?[^"'\\s]+['"]?\\s*`,
      'gi'
    );
    const asJOINTableRegX = new RegExp(
      `\\s*${validPlaceHolder}\\s*AS\\s*['"]?[^"'\\s]+['"]?\\s*(?:\\s*[^"'\\s]+)?\\s*?JOIN`,
      'gi'
    );
    const joinTableRegX = new RegExp(
      `\\s*${validPlaceHolder}\\s*(?:\\s*[^"'\\s]+)?\\s*?JOIN`,
      'gi'
    );
    const asOnTableRegX = new RegExp(
      `\\s*${validPlaceHolder}\\s*AS\\s*['"]?[^"'\\s]+['"]?\\s*ON`,
      'gi'
    );
    const onTableRegX = new RegExp(`\\s*${validPlaceHolder}\\s*ON`, 'gi');
    const isWhereClause = whereClauseRegX.test(newQuery);
    const isAsWhereClause = asWhereClauseRegX.test(newQuery);
    const isAsTable = asTableRegX.test(newQuery);
    const isAsJoinTable = asJOINTableRegX.test(newQuery);
    const isJoinTable = joinTableRegX.test(newQuery);
    const isOnJoinTable = asOnTableRegX.test(newQuery);
    const isOnTable = onTableRegX.test(newQuery);
    if (isWhereClause || isAsWhereClause) {
      newQuery = newQuery.replace(
        isAsWhereClause ? asWhereClauseRegX : whereClauseRegX,
        (match) => `${match} ${table.condition} AND `
      );
    } else if (isAsJoinTable || isJoinTable || isOnJoinTable || isOnTable) {
      newQuery =
        isJoinTable || isOnTable
          ? newQuery.replace(
              validPlaceHolder,
              (match) =>
                ` ( SELECT * from ${match} WHERE ${
                  table.condition
                } ) AS ${nameSpace(tableName, dbName)} `
            )
          : newQuery.replace(
              validPlaceHolder,
              (match) => ` ( SELECT * from ${match} WHERE ${table.condition} ) `
            );
    } else {
      const stringToReplace = isAsTable ? asTableRegX : validPlaceHolder;
      newQuery = newQuery.replace(
        stringToReplace,
        (match) => ` ${match} WHERE ${table.condition} `
      );
    }
  }
  return newQuery;
};

export const dateWhereClause = (condition: RlsCondition, dbName: string) => {
  const options = (condition.options as DateOptionType[]) || [];
  const value = condition.value as string;
  const isApplyOnColumns = condition.applyOnColumns?.length;

  const conditionString = (
    timeColumnName: string,
    comparsionOperator?: string
  ) =>
    generateTimeRangeWhereClause({
      isTimeColumn: !!condition.datatype,
      timeColumnName: getConvertedColumn(timeColumnName, DATE, dbName),
      timeCount: options?.find((o) => o.name === value)?.count || 1,
      timeGrain:
        options?.find((o) => o.name === value)?.time?.toLowerCase() || YEAR,
      timeRangeIndicator:
        options?.find((o) => o.name === value)?.range?.toLowerCase() || LAST,
      databaseType: dbName?.toLowerCase(),
      endDate: options?.find((o) => o.name === value)?.endDate,
      startDate: options?.find((o) => o.name === value)?.startDate,
      comparsionOperator,
    });
  const applyOnColumnConditions = isApplyOnColumns
    ? ` ${condition.applyOnColumns
        ?.map((col) => {
          const operator = col.logicalOperator.value || AND;
          const conditionClause = conditionString(
            col.columnName.value,
            col.comparisonOperator?.value
          );
          return ` ${operator} ${conditionClause} `;
        })
        .join(' ')} `
    : '';
  return ` ${conditionString(
    condition.columnName,
    condition.comparisonOperator?.value
  )} ${applyOnColumnConditions}`;
};
export const otherWhereClause = (condition: RlsCondition, dbName: string) => {
  let value = condition.value as any;
  const isMultipleValue = Array.isArray(value);
  const isStringValue = typeof value === STRING;

  // Check if the value is an array, and format it accordingly
  // e.eg ('a', 'b'), (1, 2)
  if (isMultipleValue) {
    value = ` (${value
      ?.map((v: string | number) => (typeof v === STRING ? `'${v}'` : v))
      .join(', ')}) `;
  }

  // Check if the value is a string, and wrap it with single quotes
  if (isStringValue) {
    value = ` '${value}' `;
  }

  // Construct and return the WHERE clause
  return ` ${getConvertedColumn(
    condition.columnName,
    condition.datatype,
    dbName
  )} ${isMultipleValue ? IN : EQUAL_OPERATOR} ${value} `;
};

export const stringClause = (condition: RlsCondition, dbName: string) => {
  if (!condition.value) return '';
  const columnName = getConvertedColumn(
    condition.columnName,
    condition.datatype,
    dbName
  );
  const operator = condition.filterVariant?.value || '';
  const isArray = Array.isArray(condition.value);
  let value: string | string[] = condition.value as string[];
  switch (operator) {
    case EQUAL_OPERATOR:
      value = isArray ? value?.[0] : ` '${value}' `;
      break;
    case IN:
      value = ` ( ${(isArray ? value : [value])
        ?.map((v) => `'${v}'`)
        .join(' , ')} ) `;
      break;
    case LIKE:
      value = ` '%${isArray ? value?.[0] : value}%' `;
      break;
    default:
      value = condition.value as string[];
      break;
  }
  return ` ${columnName} ${operator} ${value} `;
};
export const replaceWhereClauses = (
  queryStr: string,
  groupedConditions: Record<string, RlsCondition[]>,
  dbName: string
) => {
  let newQuery = queryStr;
  const clauses = Object.keys(groupedConditions).map((tableName) => {
    const conditions = groupedConditions[tableName].map((c) => {
      switch (c.datatype) {
        case DATE:
          return ` ${dateWhereClause(c, dbName)} `;
        case STRING:
          if (c.filterVariant?.value) return `${stringClause(c, dbName)}`;
          return ` ${otherWhereClause(c, dbName)} `;
        default:
          return ` ${otherWhereClause(c, dbName)} `;
      }
    });
    return { tableName, condition: conditions.join(' AND ') };
  });
  clauses.forEach((table) => {
    newQuery = getReplacedQuery(table, newQuery, dbName);
  });
  return newQuery;
};

export const getModifiedQuery = ({
  rlsConditions,
  dbName,
  query,
}: {
  rlsConditions: RlsCondition[];
  dbName: string;
  query: string;
}) => {
  const groupedConditions = groupArray(
    rlsConditions.filter((rls) => rls.isAddOnMetrics),
    'tableName'
  );
  // const modifiedQuery = cteQuery(query, groupedConditions, dbName);
  const modifiedQuery = replaceWhereClauses(query, groupedConditions, dbName);
  return modifiedQuery;
};

export const getSqlStatement = ({
  query,
  clientId = '',
  rlsConditions,
  globalFilters = { filters: [], tableName: '' },
  dbName,
  tenancyLevel,
  values,
  isAllClient,
}: GetSqlStatement) => {
  const modifiedSqlQuery = replaceVariable({
    isAllClient,
    query,
    rlsConditions,
    tenancyLevel,
    clientId,
    values,
    globalFilters,
  });
  const metricFilters = rlsConditions.filter(
    (filter) => filter.isAddOnMetrics && !filter.isVariableFilter
  );
  if (globalFilters?.filters?.length === 0 && metricFilters.length === 0) {
    return modifiedSqlQuery;
  }
  const replacedSubFilter = getModifiedQuery({
    rlsConditions: metricFilters,
    dbName,
    query: modifiedSqlQuery,
  });
  const { filters, tableName } = globalFilters;
  const globalFilterList = filters?.filter((f) => !f.isVariableFilter) || [];
  if (globalFilterList.length === 0) {
    return replacedSubFilter;
  }
  const applyOnGlobalFilters = globalFilterList.map((f) =>
    f?.applyOnTables?.length
      ? f
      : {
          ...f,
          applyOnTables: [{ tableName, columnName: f.column, dataType: f.as }],
        }
  );
  const globalFilterOptions =
    applyOnGlobalFilters.flatMap((f) =>
      f.applyOnTables?.map((t) => ({
        ...f,
        tableName: t.tableName,
        column: t.columnName,
        dataType: t.dataType,
      }))
    ) || [];
  const groupedGlobalFilters = groupArray(
    globalFilterOptions?.filter((f) => f?.column) as Record<string, any>[],
    'tableName'
  );
  const conditions = Object.keys(groupedGlobalFilters).map((key) => {
    const condition = groupedGlobalFilters[key]
      .map(({ column, operator, value, as }) => {
        const isDate = as === DATE;
        const isFormattedValue = isDate && typeof value === STRING;
        const isMultipleValue = Array.isArray(value);
        const formattedColumn = getConvertedColumn(column, as, dbName);
        let formattedValue = value;

        if (!isFormattedValue) {
          if (isMultipleValue)
            formattedValue = ` (${value.map((v) => `${v}`).join(', ')}) `;
          else if (isDate) {
            const { endDate, startDate } = getDateVariableFilterValue(value);
            formattedValue = ` ${startDate} AND ${endDate} `;
          }
        }

        return as === DATE && typeof value === STRING
          ? ` ${value} `
          : ` ${formattedColumn} ${operator} ${formattedValue} `;
      })
      .join(' AND ');
    return { condition, tableName: key };
  });
  let newQuery = replacedSubFilter;
  conditions.forEach((table) => {
    newQuery = getReplacedQuery(table, newQuery, dbName);
  });
  return newQuery;
};

// filter rls conditions if no value selected based on datatype and component used
export const isAppliedFilter = (filter: RlsCondition) => {
  if (!filter?.filterType) {
    if (!filter?.isVariableFilter) {
      if (!filter.value) return false;
      if (filter.datatype === STRING) {
        return Array.isArray(filter.value) && filter.value.length;
      }
      if (filter.datatype === DATE) {
        const selectedDateOption = (
          filter?.options as unknown as DateOptionType[]
        )?.find((opt: any) => opt.name === filter?.value);
        if (
          ['Custom', 'Custom Date'].includes(
            (selectedDateOption as DateOptionType)?.range || ''
          )
        ) {
          return (
            (selectedDateOption as DateOptionType)?.startDate &&
            (selectedDateOption as DateOptionType)?.endDate
          );
        }
      }
    }
  }
  if (filter?.filterType) {
    if (!filter?.isVariableFilter) {
      if (!filter.value) return false;
      if (
        [LIKE, '='].includes(filter.filterVariant?.value || '') &&
        filter.datatype === STRING
      ) {
        return !!filter.value;
      }
      if (
        ['auto', 'custom'].includes(filter?.filterType) ||
        filter?.datatype !== DATE
      ) {
        return Array.isArray(filter.value) && filter.value.length;
      }
      if (filter.datatype === DATE) {
        const selectedDateOption = (
          filter?.options as unknown as DateOptionType[]
        )?.find((opt: any) => opt.name === filter?.value);
        if (
          ['Custom', 'Custom Date', 'Date Range'].includes(
            (selectedDateOption as DateOptionType)?.range || ''
          )
        ) {
          return (
            (selectedDateOption as DateOptionType)?.startDate &&
            (selectedDateOption as DateOptionType)?.endDate
          );
        }
      }
    }
  }

  return true;
};

export const onChangeGlobalFilter = ({
  column,
  setAppliedFilters,
  value,
  operator,
  type,
}: OnChangeGlobalFilterParams) => {
  const isVariableFilter = column.isVariableFilter;
  const isFilterApplied =
    !(!isVariableFilter && !value) && column.isShowHorizontal;
  let appliedValue: any = '';
  const appliedLabel: any = !Array.isArray(value) ? value?.label : '';
  const appliedValueLabels = Array.isArray(value) ? value : [];
  switch (type) {
    case MULTI_SELECT:
      {
        const isValidValue = Array.isArray(value) && value.length;
        if (isValidValue) {
          appliedValue = value.map((v) => v.value);
        } else appliedValue = isVariableFilter ? undefined : [];
      }
      break;
    case SINGLE_SELECT:
      {
        const isValidValue = typeof value?.value === 'string' && value?.value;
        if (isValidValue) appliedValue = value?.value;
        else appliedValue = isVariableFilter ? undefined : '';
      }
      break;
    case SEARCH:
      {
        const isValidValue = typeof value === 'string' && value;
        if (isValidValue) appliedValue = value;
        else appliedValue = isVariableFilter ? undefined : '*';
      }
      break;
    case NUMBER_FIELD:
      {
        const isValidValue = !!value;
        if (isValidValue) appliedValue = value;
        else appliedValue = undefined;
      }
      break;
    case DATE_PICKER:
      {
        const isValidValue = value?.startDate && value?.endDate;
        if (isValidValue) appliedValue = value;
        else appliedValue = undefined;
      }
      break;
    default:
      appliedValue = undefined;
      break;
  }
  setAppliedFilters((prev: any[]) => {
    const field = {
      column: column.name,
      labelColumnName: column.labelColumnName,
      operator,
      value: appliedValue,
      as: column.as,
      defaultValues: value,
      filterType: column.isShowHorizontal ? 'horizontal' : 'global',
      isFilterApplied,
      applyOnTables: column.applyOnTables,
      isVariableFilter,
      variableStrings: column.variableStrings || [],
      label: column.label || column.name,
      filterVariant: column.filterVariant,
      selectedDropdownValue: !Array.isArray(value)
        ? {
            value: appliedValue,
            label: appliedLabel,
          }
        : appliedValueLabels,
    };
    const index = prev.findIndex((f) => f.label === column.label);
    if (index === -1) return [...prev, field];
    const updated = [...prev];
    updated[index] = field;
    return updated;
  });
};

export const getColumnNameKeyString = (
  columnName: string,
  dbName: string
): string => {
  const integrationName = dbName.toLowerCase();
  switch (integrationName) {
    // redshift db return column name in small case
    case REDSHIFT:
      return columnName.toLowerCase();
    // snowflake db return column name in UPPER CASE
    case SNOWFLAKE:
      return columnName.toUpperCase();
    // haven't noticed above behaviour in other DB
    default:
      return columnName;
  }
};

export const getExecuteSqlResponseData = (data: any) => {
  const responseData =
    typeof data?.sqlQuery?.data === 'string'
      ? JSON.parse(data?.sqlQuery?.data)
      : data?.sqlQuery?.data || [];
  return responseData;
};
