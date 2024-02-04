import { FieldValues } from 'react-hook-form';
import { useCreateCompanyRlsFilterMutation } from 'utils/generated/graphql';
import { getCurrentUser } from 'helpers/application/auth';

type Props = {
  condition: string;
  columnName: string;
  tableName: string; // schemaName.tableName
  defaultValue?: string;
};
const useCompanyRlsFilters = ({
  condition,
  columnName,
  tableName,
  defaultValue,
}: Props) => {
  const user = getCurrentUser();
  const createCompanyRlsFilterMutation = useCreateCompanyRlsFilterMutation();
  const createCompanyRlsFilter = (data: FieldValues) => {
    createCompanyRlsFilterMutation.mutate({
      companyId: user?.companyId,
      userId: user?.id,
      condition,
      columnName,
      tableName,
      name: data.name,
      defaultValue: defaultValue || null,
    });
  };
  return { createCompanyRlsFilter };
};

export default useCompanyRlsFilters;
