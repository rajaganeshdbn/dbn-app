const generateTimeRangeWhereClause = ({
  isTimeColumn,
  timeColumnName,
  timeCount,
  timeGrain,
  timeRangeIndicator,
  databaseType,
  endDate,
  startDate,
}: {
  timeColumnName: string;
  timeRangeIndicator: string;
  timeCount: number;
  timeGrain: string;
  isTimeColumn: boolean;
  startDate?: Date;
  endDate?: Date;
  databaseType?: string;
}): string => {
  let whereClause = '';
  const isCommonDatabaseType =
    databaseType === 'snowflake' ||
    databaseType === 'redshift' ||
    databaseType === 'bigquery' ||
    databaseType === 'postgres';

  switch (timeRangeIndicator) {
    case 'last':
      if (isCommonDatabaseType) {
        const interval = `INTERVAL '${timeCount} ${timeGrain}s'`;

        whereClause = `${timeColumnName} >= ${
          isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
        } - ${interval}`;
      } else {
        const interval = `${timeCount} ${timeGrain}`;

        whereClause = `${timeColumnName} >= ${
          isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURDATE()'
        } - INTERVAL ${interval}`;
      }
      break;
    case 'this':
      switch (timeGrain) {
        case 'day': {
          whereClause = isCommonDatabaseType
            ? `${timeColumnName} >= ${
                isTimeColumn ? 'DATE_TRUNC' : 'CURRENT_DATE'
              }('day', ${
                isTimeColumn ? timeColumnName : 'CURRENT_TIMESTAMP'
              }) AND ${timeColumnName} < ${
                isTimeColumn ? 'DATE_TRUNC' : 'CURRENT_DATE'
              }('day', ${
                isTimeColumn ? timeColumnName : 'CURRENT_TIMESTAMP'
              }) + INTERVAL '1 day'`
            : `${timeColumnName} >= ${
                isTimeColumn ? 'DATE(timeColumnName)' : 'CURDATE()'
              } AND ${timeColumnName} < ${
                isTimeColumn ? 'DATE(timeColumnName)' : 'CURDATE()'
              } + INTERVAL 1 DAY`;

          break;
        }
        case 'year': {
          whereClause = isCommonDatabaseType
            ? `EXTRACT(year FROM ${timeColumnName}) = EXTRACT(year FROM ${
                isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
              })`
            : `YEAR(${timeColumnName}) = YEAR(${
                isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURDATE()'
              })`;

          break;
        }
        case 'quarter': {
          whereClause = isCommonDatabaseType
            ? `EXTRACT(quarter FROM ${timeColumnName}) = EXTRACT(quarter FROM ${
                isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
              })`
            : `QUARTER(${timeColumnName}) = QUARTER(${
                isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURDATE()'
              })`;
          break;
        }
        case 'week': {
          whereClause = isCommonDatabaseType
            ? `${timeColumnName} >= ${
                isTimeColumn ? 'DATE_TRUNC' : 'CURRENT_DATE'
              }('week', ${
                isTimeColumn ? timeColumnName : 'CURRENT_TIMESTAMP'
              }) AND ${timeColumnName} < ${
                isTimeColumn ? 'DATE_TRUNC' : 'CURRENT_DATE'
              }('week', ${
                isTimeColumn ? timeColumnName : 'CURRENT_TIMESTAMP'
              }) + INTERVAL '1 week'`
            : `${timeColumnName} >= ${
                isTimeColumn ? 'DATE(timeColumnName)' : 'CURDATE()'
              } - INTERVAL WEEKDAY(${
                isTimeColumn ? 'DATE(timeColumnName)' : 'CURDATE()'
              }) DAY AND ${timeColumnName} < ${
                isTimeColumn ? 'DATE(timeColumnName)' : 'CURDATE()'
              } - INTERVAL WEEKDAY(${
                isTimeColumn ? 'DATE(timeColumnName)' : 'CURDATE()'
              }) DAY + INTERVAL 1 WEEK`;

          break;
        }
        case 'month': {
          whereClause = isCommonDatabaseType
            ? `EXTRACT(year FROM ${timeColumnName}) = EXTRACT(year FROM ${
                isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
              }) AND EXTRACT(month FROM ${timeColumnName}) = EXTRACT(month FROM ${
                isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
              })`
            : `YEAR(${timeColumnName}) = YEAR(${
                isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURDATE()'
              }) AND MONTH(${timeColumnName}) = MONTH(${
                isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURDATE()'
              })`;

          break;
        }
        default: {
          whereClause = isCommonDatabaseType
            ? `EXTRACT(year FROM ${timeColumnName}) = EXTRACT(year FROM ${
                isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
              })`
            : `YEAR(${timeColumnName}) = YEAR(${
                isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURDATE()'
              })`;

          break;
        }
      }
      break;

    default:
      if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString().slice(0, 10);
        const formattedEndDate = endDate.toISOString().slice(0, 10);
        whereClause = `${timeColumnName} = BETWEEN'${formattedStartDate}' AND '${formattedEndDate}'`;
      }
      break;
  }

  return whereClause;
};

export default generateTimeRangeWhereClause;
