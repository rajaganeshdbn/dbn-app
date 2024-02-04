/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-nested-ternary */
import { helpers, types } from '@databrainhq/plugin';
import { MetricCardProps } from '@databrainhq/plugin/src/components';
import getLimitSqlQuery from './getLimitSqlQuery';

type GetSqlStatement = {
  query: string;
  clientId?: string;
  rlsConditions: types.RlsCondition[];
  dbName: string;
  tenancyLevel: string;
  values?: Record<string, string>;
  limit: string;
  offset?: string;
  isAllClient?: boolean;
  isDisableLimit?: boolean;
  globalFilters?: MetricCardProps['globalFilters'];
};

const getCustomSqlStatement = ({
  query: sqlQuery,
  clientId = '',
  rlsConditions,
  dbName,
  tenancyLevel,
  values,
  limit,
  offset,
  isAllClient,
  isDisableLimit,
  globalFilters,
}: GetSqlStatement) => {
  const query = isDisableLimit
    ? sqlQuery?.replace(/limit\s+\d+/i, '')
    : getLimitSqlQuery({ query: sqlQuery, limit, offset, dbName });
  const replacedRlsVariables = helpers.replaceVariable({
    isAllClient,
    query,
    rlsConditions,
    tenancyLevel,
    clientId,
    values,
    globalFilters,
  });
  const metricFilters = rlsConditions.filter(
    (rls) => rls.isAddOnMetrics && !rls.isVariableFilter
  );
  if (metricFilters.length === 0) {
    return replacedRlsVariables;
  }
  const replacedSubFilter = helpers.getModifiedQuery({
    rlsConditions: metricFilters,
    dbName,
    query: replacedRlsVariables,
  });
  return replacedSubFilter;
};

export default getCustomSqlStatement;
