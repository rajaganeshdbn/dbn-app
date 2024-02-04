import {
  DATABASE,
  DATASET_NUMBER_HELPER_FUNCTIONS,
  DATASET_OTHER_HELPER_FUNCTIONS,
  DATASET_STRING_HELPER_FUNCTIONS,
  DATASET_TIME_HELPER_FUNCTIONS,
  DATE_TYPES,
  LEAST_USED_STRING_FUNCTIONS,
  NUMBER_TYPES,
  REDSHIFT,
  STRING_TYPES,
} from '@/consts';
import {
  Aggregate,
  CastColumn,
  Dimension,
  FloatingDropDownOption,
  RlsCondition,
  SelectedColumn,
} from '@/types';
import { isAppliedFilter } from './getModifiedQuery';

export const functionOptions = (
  col?: SelectedColumn,
  dataType?: string
): FloatingDropDownOption[] => {
  const castedDataType =
    col?.cast?.value === 'NONE' ? undefined : col?.cast?.value;
  const datatype = dataType || castedDataType || col?.datatype;
  if (datatype) {
    if (DATE_TYPES.includes(datatype?.toLowerCase()))
      return DATASET_TIME_HELPER_FUNCTIONS;
    if (NUMBER_TYPES.includes(datatype?.toLowerCase()))
      return DATASET_NUMBER_HELPER_FUNCTIONS;
    if (
      STRING_TYPES.includes(datatype?.toLowerCase()) ||
      datatype?.toLowerCase()?.includes('char')
    )
      if (dataType)
        return DATASET_STRING_HELPER_FUNCTIONS.filter(
          (f) => !LEAST_USED_STRING_FUNCTIONS.includes(f.value)
        );
    return DATASET_STRING_HELPER_FUNCTIONS;
  }
  return DATASET_OTHER_HELPER_FUNCTIONS;
};

export const getColumnType = (column: SelectedColumn) => {
  switch (column.type) {
    case 'CUSTOM':
      return 'custom';
    case 'ARITHMETIC':
      return 'arithmetic_column';
    default:
      return 'default';
  }
};

export const getDimensionsAndAggregates = (columns: SelectedColumn[]) => {
  const dimensions: Dimension[] = [];
  const aggregates: Aggregate[] = [];
  columns.forEach((dim) => {
    if (dim.configType === 'AGGREGATE') {
      if (dim.type === 'ARITHMETIC' && !!dim.arithmeticConfig) {
        const { firstOperand, operator, secondOperand } = dim.arithmeticConfig;
        const config: Aggregate['arithmeticConfig'] = {
          firstOperand: {
            alias: firstOperand.alias,
            columnName:
              firstOperand.type.toLowerCase() === 'custom'
                ? firstOperand.sql || ''
                : firstOperand.name,
            dataType: firstOperand.datatype,
            parentAlias: firstOperand.parentAlias,
            type: getColumnType(firstOperand),
            method: firstOperand.helperFunction || 'SUM',
            cast: (firstOperand.cast?.value as CastColumn) || undefined,
          },
          operator: operator.value,
          secondOperand: {
            alias: secondOperand.alias,
            columnName:
              secondOperand.type.toLowerCase() === 'custom'
                ? secondOperand.sql || ''
                : secondOperand.name,
            dataType: secondOperand.datatype,
            parentAlias: secondOperand.parentAlias,
            type: getColumnType(secondOperand),
            method: secondOperand.helperFunction || 'SUM',
            cast: (secondOperand.cast?.value as CastColumn) || undefined,
          },
        };
        const aggregate: Aggregate = {
          alias: dim.alias,
          columnName:
            dim.type.toLowerCase() === 'custom' ? dim.sql || '' : dim.name,
          dataType: dim.datatype,
          parentAlias: dim.parentAlias,
          type: getColumnType(dim),
          method: dim.helperFunction || 'SUM',
          cast: (dim.cast?.value as CastColumn) || undefined,
          arithmeticConfig: config,
        };
        aggregates.push(aggregate);
      } else {
        const aggregate: Aggregate = {
          alias: dim.alias,
          columnName:
            dim.type.toLowerCase() === 'custom' ? dim.sql || '' : dim.name,
          dataType: dim.datatype,
          parentAlias: dim.parentAlias,
          type: getColumnType(dim),
          method: dim.helperFunction || 'SUM',
          cast: (dim.cast?.value as CastColumn) || undefined,
        };
        aggregates.push(aggregate);
      }
    } else if (dim.type === 'ARITHMETIC' && !!dim.arithmeticConfig) {
      const { firstOperand, operator, secondOperand } = dim.arithmeticConfig;
      const config: Dimension['arithmeticConfig'] = {
        firstOperand: {
          alias: firstOperand.alias,
          columnName:
            firstOperand.type.toLowerCase() === 'custom'
              ? firstOperand.sql || ''
              : firstOperand.name,
          dataType: firstOperand.datatype,
          parentAlias: firstOperand.parentAlias,
          type: getColumnType(firstOperand),
          helperFunction: firstOperand.helperFunction,
          timeGrain: undefined,
          functionConfiguration: firstOperand.functionConfiguration,
          cast: (firstOperand.cast?.value as CastColumn) || undefined,
        },
        operator: operator.value,
        secondOperand: {
          alias: secondOperand.alias,
          columnName:
            secondOperand.type.toLowerCase() === 'custom'
              ? secondOperand.sql || ''
              : secondOperand.name,
          dataType: secondOperand.datatype,
          parentAlias: secondOperand.parentAlias,
          type: getColumnType(secondOperand),
          helperFunction: secondOperand.helperFunction,
          timeGrain: undefined,
          functionConfiguration: secondOperand.functionConfiguration,
          cast: (secondOperand.cast?.value as CastColumn) || undefined,
        },
      };
      const dimension: Dimension = {
        alias: dim.alias,
        columnName:
          dim.type.toLowerCase() === 'custom' ? dim.sql || '' : dim.name,
        dataType: dim.datatype,
        parentAlias: dim.parentAlias,
        type: getColumnType(dim),
        helperFunction: dim.helperFunction,
        timeGrain: undefined,
        functionConfiguration: dim.functionConfiguration,
        cast: (dim.cast?.value as CastColumn) || undefined,
        arithmeticConfig: config,
      };
      dimensions.push(dimension);
    } else {
      const dimension: Dimension = {
        alias: dim.alias,
        columnName:
          dim.type.toLowerCase() === 'custom' ? dim.sql || '' : dim.name,
        dataType: dim.datatype,
        parentAlias: dim.parentAlias,
        type: getColumnType(dim),
        helperFunction: dim.helperFunction,
        timeGrain: undefined,
        functionConfiguration: dim.functionConfiguration,
        cast: (dim.cast?.value as CastColumn) || undefined,
      };
      dimensions.push(dimension);
    }
  });
  return { dimensions, aggregates };
};

export const getChartFields = (
  colList: SelectedColumn[],
  dbName: string
): string[] => {
  return colList.map((col) =>
    dbName?.toLowerCase() === REDSHIFT ? col.alias.toLowerCase() : col.alias
  );
};

export const getAppliedFilters = (
  filterList: RlsCondition[],
  companyTenancyType: string,
  clientId: string
) => {
  const filteredConditionsList =
    filterList.filter(
      (filter) => filter.isAddOnMetrics && isAppliedFilter(filter)
    ) || [];
  const modifiedConditionsList = filteredConditionsList.map((filter) =>
    companyTenancyType === DATABASE
      ? {
          ...filter,
          tableName: `${clientId}.${filter.tableName
            .split('.')
            .slice(1)
            .join('.')}`,
        }
      : filter
  );
  return modifiedConditionsList;
};
