import { useMemo } from 'react';
import { useDatasetListQuery } from 'utils/generated/graphql';
import { DatasetMetricCreationConfiguration } from 'types/metric';
import { TableType } from './useCompanySchema';

export type Table = {
  id: string;
  tableName: string;
  schemaName: string;
  columnList: { name: string; datatype: string }[];
  type: string;
  query: string;
  configuration: DatasetMetricCreationConfiguration;
};

const useDatasets = (id: string) => {
  const { data, isLoading, error } = useDatasetListQuery(
    { companyIntegrationId: id },
    { enabled: !!id }
  );
  const tableList: TableType[] = useMemo(
    () =>
      data?.dataModels?.map((d) => {
        const table: TableType = {
          columnsWithDataType: d?.lineageData?.columnList || [],
          columns: d?.lineageData?.columnList?.map((c: any) => c.name) || [],
          id: d.id,
          schemaName: d.databaseName || '',
          tableName: d.name,
          type: d.modelType,
          sql: d.query || '',
          companyId: '',
          recentUpdatedAt: 0,
          alias: d.name,
        };
        return table;
      }) || [],
    [data?.dataModels]
  );
  return {
    data,
    isLoading,
    error,
    tableList,
  };
};

export default useDatasets;
