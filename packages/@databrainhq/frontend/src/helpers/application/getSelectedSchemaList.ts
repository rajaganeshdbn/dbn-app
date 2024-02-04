/* eslint-disable no-param-reassign */
import { SelectedColumns } from 'types';
import { ELASTICSEARCH } from 'consts/application';

const getSelectedSchemaList = (
  selectedColumns: SelectedColumns[] | undefined,
  dbName?: string
) => {
  if (dbName && dbName.toLowerCase() === ELASTICSEARCH) {
    const value = selectedColumns?.reduce((tables: any, item: any) => {
      const table = tables[`${item.tableName}`] || [];
      table.push(item);
      tables[`${item.tableName}`] = table;
      return tables;
    }, {});
    return value;
  }
  const value = selectedColumns?.reduce((tables: any, item: any) => {
    const tableName = `${item.schemaName}.${item.tableName}`;
    const table = tables[tableName] || [];
    table.push(item);
    tables[tableName] = table;
    return tables;
  }, {});
  return value;
};

export default getSelectedSchemaList;
