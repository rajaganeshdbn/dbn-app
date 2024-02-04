/* eslint-disable no-lonely-if */
export const isValidDate = (date: any): boolean => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};

const MY_SQL_GROUP = new Set([
  'mysql',
  'mssql',
  'mongodb',
  'clickhouse',
  'awss3',
]);

const isFirstMonthOfYear = (): boolean => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return currentMonth === 0; // January is represented by 0 in JavaScript's Date object
};
const isFirstDayOfYear = (): boolean => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return currentMonth === 0 && currentDay === 1; // January is represented by 0, and the first day is 1
};
const isFirstWeekOfYear = (): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const firstDayOfYear = new Date(currentYear, 0, 1); // January is represented by 0

  const daysDifference = Math.floor(
    (+currentDate - +firstDayOfYear) / (24 * 60 * 60 * 1000)
  ); // Explicitly cast to number
  const weekNumber = Math.ceil(
    (daysDifference + firstDayOfYear.getDay() + 1) / 7
  );

  return weekNumber === 1;
};
const generateTimeRangeWhereClause = ({
  isTimeColumn,
  timeColumnName,
  timeCount,
  timeGrain,
  timeRangeIndicator,
  databaseType,
  endDate = new Date(),
  startDate = new Date(),
  comparsionOperator,
}: {
  timeColumnName: string;
  timeRangeIndicator: string;
  timeCount: number;
  timeGrain: string;
  isTimeColumn: boolean;
  startDate?: Date;
  endDate?: Date;
  databaseType?: string;
  comparsionOperator?: string;
}): string => {
  const db = databaseType?.toLowerCase();
  let whereClause = '';
  const isMysqlGroup = MY_SQL_GROUP.has(db || '');

  switch (timeRangeIndicator) {
    case 'last':
      if (timeCount === 1) {
        const isFirstMonOfYear = isFirstMonthOfYear();
        const lastYear = `${isFirstMonOfYear ? '- 1' : ''}`;
        if (timeGrain === 'day') {
          const isFirstDOfYear = isFirstDayOfYear();

          if (db === 'bigquery') {
            const dayCount = `${
              isFirstDOfYear
                ? `365`
                : `EXTRACT(DAYOFYEAR  FROM ${
                    isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
                  }) - ${timeCount}`
            }`;
            whereClause = `EXTRACT(DAYOFYEAR  FROM ${timeColumnName}) = ${dayCount} AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) ${isFirstDOfYear ? lastYear : ''}`;
          } else if (isMysqlGroup) {
            const dayCount = `${
              isFirstDOfYear
                ? `365`
                : `DAYOFYEAR(${
                    isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
                  }) - ${timeCount}`
            }`;
            whereClause = `DAYOFYEAR(${timeColumnName}) = ${dayCount}  AND YEAR(${timeColumnName}) = YEAR(${
              isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
            }) ${isFirstDOfYear ? lastYear : ''}`;
          } else {
            const dayCount = `${
              isFirstDOfYear
                ? `365`
                : `EXTRACT('doy'  FROM ${
                    isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
                  }) - ${timeCount}`
            }`;
            whereClause = `EXTRACT('doy'  FROM ${timeColumnName}) = ${dayCount} AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) ${isFirstDOfYear ? lastYear : ''}`;
          }
        } else if (timeGrain === 'year') {
          if (db === 'bigquery') {
            whereClause = `EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) - ${timeCount}`;
          } else if (isMysqlGroup) {
            whereClause = `YEAR(${timeColumnName}) = YEAR(${
              isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
            }) - ${timeCount}`;
          } else {
            whereClause = `EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) - ${timeCount}`;
          }
        } else if (timeGrain === 'quarter') {
          if (db === 'bigquery') {
            whereClause = `EXTRACT(QUARTER  FROM ${timeColumnName}) = EXTRACT(QUARTER  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) - ${timeCount} AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            })`;
          } else if (isMysqlGroup) {
            whereClause = `QUARTER(${timeColumnName}) = QUARTER(${
              isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
            }) - ${timeCount} AND YEAR(${timeColumnName}) = YEAR(${
              isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
            })`;
          } else {
            whereClause = `EXTRACT('quarter'  FROM ${timeColumnName}) = EXTRACT('quarter'  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) - ${timeCount} AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            })`;
          }
        } else if (timeGrain === 'week') {
          const isFirstWkOfYear = isFirstWeekOfYear();
          if (db === 'bigquery') {
            const weekCount = `${
              isFirstWkOfYear
                ? `4`
                : `EXTRACT(WEEK  FROM ${
                    isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
                  }) - ${timeCount}`
            }`;
            whereClause = `EXTRACT(WEEK  FROM ${timeColumnName}) = ${weekCount} AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) ${lastYear}`;
          } else if (isMysqlGroup) {
            const weekCount = `${
              isFirstWkOfYear
                ? `4`
                : `WEEK(${
                    isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
                  }) - ${timeCount}`
            }`;
            whereClause = `WEEK(${timeColumnName}) = ${weekCount} AND YEAR(${timeColumnName}) = YEAR(${
              isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
            }) ${lastYear}`;
          } else {
            const weekCount = `${
              isFirstWkOfYear
                ? `4`
                : `EXTRACT('week'  FROM ${
                    isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
                  }) - ${timeCount}`
            }`;
            whereClause = `EXTRACT('week'  FROM ${timeColumnName}) = ${weekCount} AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) ${lastYear}`;
          }
        } else if (timeGrain === 'month') {
          if (db === 'bigquery') {
            const monthCount = `${
              isFirstMonOfYear
                ? `12`
                : `EXTRACT(MONTH  FROM ${
                    isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
                  }) - ${timeCount}`
            }`;
            whereClause = `EXTRACT(MONTH  FROM ${timeColumnName}) = ${monthCount} AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) ${lastYear}`;
          } else if (isMysqlGroup) {
            const monthCount = `${
              isFirstMonOfYear
                ? `12`
                : `MONTH(${
                    isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
                  }) - ${timeCount}`
            }`;
            whereClause = `MONTH(${timeColumnName}) = ${monthCount} AND YEAR(${timeColumnName}) = YEAR(${
              isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
            }) ${lastYear}`;
          } else {
            const monthCount = `${
              isFirstMonOfYear
                ? `12`
                : `EXTRACT('month'  FROM ${
                    isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
                  }) - ${timeCount}`
            }`;
            whereClause = `EXTRACT('month'  FROM ${timeColumnName}) = ${monthCount} AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
              isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
            }) ${lastYear}`;
          }
        }
      } else {
        if (db === 'bigquery') {
          const interval = `INTERVAL ${timeCount} ${timeGrain.toUpperCase()}`;

          whereClause = `${timeColumnName} >= DATE_SUB( CURRENT_DATE(), ${interval})`;
        } else if (!isMysqlGroup) {
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
      }
      break;
    case 'this':
      if (timeGrain === 'day') {
        if (db === 'bigquery') {
          whereClause = `EXTRACT(DAYOFYEAR  FROM ${timeColumnName}) = EXTRACT(DAYOFYEAR  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        } else if (isMysqlGroup) {
          whereClause = `DAYOFYEAR(${timeColumnName}) = DAYOFYEAR(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          }) AND YEAR(${timeColumnName}) = YEAR(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          })`;
        } else {
          whereClause = `EXTRACT('doy'  FROM ${timeColumnName}) = EXTRACT('doy'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        }
      } else if (timeGrain === 'year') {
        if (db === 'bigquery') {
          whereClause = `EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        } else if (isMysqlGroup) {
          whereClause = `YEAR(${timeColumnName}) = YEAR(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          })`;
        } else {
          whereClause = `EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        }
      } else if (timeGrain === 'quarter') {
        if (db === 'bigquery') {
          whereClause = `EXTRACT(QUARTER  FROM ${timeColumnName}) = EXTRACT(QUARTER  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        } else if (isMysqlGroup) {
          whereClause = `QUARTER(${timeColumnName}) = QUARTER(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          }) AND YEAR(${timeColumnName}) = YEAR(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          })`;
        } else {
          whereClause = `EXTRACT('quarter'  FROM ${timeColumnName}) = EXTRACT('quarter'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        }
      } else if (timeGrain === 'week') {
        if (db === 'bigquery') {
          whereClause = `EXTRACT(WEEK  FROM ${timeColumnName}) = EXTRACT(WEEK  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        } else if (isMysqlGroup) {
          whereClause = `WEEK(${timeColumnName}) = WEEK(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          }) AND YEAR(${timeColumnName}) = YEAR(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          })`;
        } else {
          whereClause = `EXTRACT('week'  FROM ${timeColumnName}) = EXTRACT('week'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        }
      } else if (timeGrain === 'month') {
        if (db === 'bigquery') {
          whereClause = `EXTRACT(MONTH  FROM ${timeColumnName}) = EXTRACT(MONTH  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT(YEAR  FROM ${timeColumnName}) = EXTRACT(YEAR  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        } else if (isMysqlGroup) {
          whereClause = `MONTH(${timeColumnName}) = MONTH(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          }) AND YEAR(${timeColumnName}) = YEAR(${
            isTimeColumn ? 'CURRENT_TIMESTAMP()' : 'CURRENT_DATE()'
          })`;
        } else {
          whereClause = `EXTRACT('month'  FROM ${timeColumnName}) = EXTRACT('month'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          }) AND EXTRACT('year'  FROM ${timeColumnName}) = EXTRACT('year'  FROM ${
            isTimeColumn ? 'CURRENT_TIMESTAMP' : 'CURRENT_DATE'
          })`;
        }
      }
      break;
    case 'custom date': {
      const startDateObj = new Date(startDate);
      const formattedStartDate = startDateObj.toISOString().slice(0, 10);

      whereClause = `${timeColumnName} ${
        comparsionOperator || '='
      } '${formattedStartDate}'`;
      break;
    }
    default: {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      if (isValidDate(startDateObj) && isValidDate(endDateObj)) {
        const formattedStartDate = startDateObj.toISOString().slice(0, 10);
        const formattedEndDate = endDateObj.toISOString().slice(0, 10);
        whereClause = `${timeColumnName} BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'`;
      } else {
        const formattedStartDate = new Date().toISOString().slice(0, 10);
        const formattedEndDate = new Date().toISOString().slice(0, 10);
        whereClause = `${timeColumnName} BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'`;
      }
      break;
    }
  }

  return whereClause;
};

export default generateTimeRangeWhereClause;
