const extractTablesFromQuery = (queryString: string) => {
  const fromIndex = queryString.search(/FROM/i);
  if (fromIndex < 0) {
    return [];
  }
  const tableNames = [];
  const tableRegex =
    /\bJOIN\b|\bFROM\b|\bUPDATE\b|\bINTO\b|\bTABLE\b|\bMERGE\b/gi;
  let match = tableRegex.exec(queryString.slice(fromIndex));

  while (match) {
    const tableNameStartIndex = match.index + match[0].length;
    let tableNameEndIndex = queryString
      .slice(fromIndex + tableNameStartIndex)
      .search(/[\s(]/);
    if (tableNameEndIndex < 0) {
      tableNameEndIndex = queryString.length - fromIndex;
    }
    const tableName = queryString.slice(
      fromIndex + tableNameStartIndex,
      fromIndex + tableNameStartIndex + tableNameEndIndex
    );
    if (tableName) {
      tableNames.push(tableName);
    }
    match = tableRegex.exec(queryString.slice(fromIndex));
  }
  return tableNames;
};

export default extractTablesFromQuery;
