export const getForeCastTimeGrain = (value: string) => {
  let grain = 'D';
  switch (value) {
    case 'year':
      grain = 'Y';
      break;
    case 'month':
      grain = 'M';
      break;
    case 'week':
      grain = 'W';
      break;
    case 'day':
      grain = 'D';
      break;
    case 'quarter':
      grain = 'Q';
      break;
    default:
      grain = 'D';
      break;
  }
  return grain;
};

export const getTimeGrainDateFormat = (
  timeGrainStr: string,
  columnName: string
): string => {
  switch (timeGrainStr) {
    case 'day':
      return `DATE_FORMAT(${columnName}, '%Y-%m-%d')`;
    case 'week':
      return `DATE_FORMAT(DATE_ADD(${columnName}, INTERVAL (1 - WEEKDAY(${columnName})) DAY), '%Y-%m-%d')`;
    case 'month':
      return `DATE_FORMAT(${columnName}, '%Y-%m')`;
    case 'quarter':
      return `CONCAT(YEAR(${columnName}), '-Q', QUARTER(${columnName}))`;
    case 'year':
      return `DATE_FORMAT(${columnName}, '%Y-12-01')`;
    case 'NONE':
      return columnName;
    default:
      return columnName;
  }
};
