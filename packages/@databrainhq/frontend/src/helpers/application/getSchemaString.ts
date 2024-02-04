/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectedColumns } from 'types';
import { DATABASE_NAME } from 'consts/values';

const getSchemaString = (
  selectedSchemaList: Record<string, SelectedColumns[]> | undefined,
  dbName: string | undefined,
  companyTenenacyType?: string
) => {
  if (!selectedSchemaList) {
    return '';
  }
  let schema: string[];
  if (companyTenenacyType && companyTenenacyType === 'DATABASE') {
    schema = Object.keys(selectedSchemaList).map(
      (key) =>
        `${`${DATABASE_NAME}.${key
          .split('.')
          .slice(1)
          .join('.')}`} ( ${selectedSchemaList[key].map(
          (column: { column: string; datatype: string }) =>
            ` ${column.column} ${column.datatype}`
        )} )`
    );
  } else {
    schema = Object.keys(selectedSchemaList).map(
      (key) =>
        `${key} ( ${selectedSchemaList[key].map(
          (column: { column: string; datatype: string }) =>
            ` ${column.column} ${column.datatype}`
        )} )`
    );
  }
  return schema;
};
export default getSchemaString;
