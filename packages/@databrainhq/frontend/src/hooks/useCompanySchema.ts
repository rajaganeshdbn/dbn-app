/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-param-reassign */
import { useMemo } from 'react';
import { useGetSchemaListQuery } from 'utils/generated/graphql';
import { GlobalFiltersDefaultValue } from 'types';
import useWorkspace from './useWorkspace';

export type TableColumn = {
  name: string;
  dataType: string;
  isDefault?: boolean;
  label?: string;
  isShowHorizontal?: boolean;
  defaultValue?: GlobalFiltersDefaultValue;
  isClientScoped?: boolean;
  clientColumn?: string;
  clientColumnType?: string;
  isManualOptions?: boolean;
  manualOptions?: string[];
  as: string;
  sql?: string;
  type?: 'custom' | 'default' | 'python';
  isAggregate?: boolean;
};

export type TableType = {
  id: string;
  columns: string[];
  companyId: string;
  tableName: string;
  schemaName: string;
  recentUpdatedAt: number;
  columnsWithDataType: TableColumn[];
  type?: string;
  alias?: string;
  sql?: string;
};
const getSchemaList = (schema: any) => {
  try {
    const list = JSON.parse(schema || '');
    return list?.filter((item: any) => !item.tableName.includes('_airbyte'));
  } catch (error) {
    return schema?.filter((item: any) => !item.tableName.includes('_airbyte'));
  }
};

/**
 * @returns schemaList - list of tables
 * @returns schemaMap - object of schemas
 */
const useCompanySchema = (isEnabled: boolean | undefined = true) => {
  const { workspace } = useWorkspace();
  const { data, isLoading: isLoadingSchema } = useGetSchemaListQuery(
    {
      workspaceId: workspace?.id,
    },
    { enabled: isEnabled && !!workspace?.id }
  );
  const schemaList: TableType[] = useMemo(() => {
    return getSchemaList(data?.companyCacheSchemas[0]?.schema) || [];
  }, [data?.companyCacheSchemas[0]?.schema]);
  const schemaMap: Record<string, TableType[]> = useMemo(() => {
    return schemaList?.reduce((schemas: any, item: any) => {
      const schema = schemas[item.schemaName] || [];
      schema.push(item);
      schemas[item.schemaName] = schema;
      return schemas;
    }, {});
  }, [schemaList]);
  return { schemaList, schemaMap, isLoadingSchema };
};

export default useCompanySchema;
