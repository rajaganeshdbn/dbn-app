import { DESTINATIONS } from '@/consts/app';

type Params = {
  timeGrainValue: string;
  isTimeStamp: boolean;
  col: string;
  database: string;
};

export const getTimeFilterValue = ({
  timeGrainValue,
  isTimeStamp,
  col,
  database,
}: Params) => {
  if (
    database === DESTINATIONS.Redshift ||
    database.toUpperCase() === 'POSTGRES' ||
    database === DESTINATIONS.Snowflake ||
    database === 'Bigquery'
  ) {
    if (timeGrainValue === 'Today') {
      const value = isTimeStamp
        ? `date_trunc('day', ${col}) = date_trunc('day', CURRENT_TIMESTAMP)`
        : `${col} = CURRENT_DATE`;
      return value;
    }
    if (timeGrainValue === 'Last 7 Days') {
      const value = isTimeStamp
        ? `date_trunc('day', ${col}) >= date_trunc('day', CURRENT_TIMESTAMP) - interval '6 days'`
        : `${col} >= CURRENT_DATE - 6`;
      return value;
    }
    if (timeGrainValue === 'Last Week') {
      const value = isTimeStamp
        ? `extract(week from ${col}) = case when extract(week from current_date) = 1 then 4 else extract(week from current_date) - 1 end
AND extract(year from ${col}) = case when extract(week from current_date) = 1 and extract(month from current_date) = 1 then extract(year from current_date) -1 else extract(year from current_date) end
AND extract(month from ${col}) = case when extract(week from current_date) = 1 then case when extract(week from current_date) - 1 = 0 then 12 else extract(week from current_date) - 1 end  else extract(month from current_date) end
`
        : `extract(week from ${col}) = case when extract(week from current_date) = 1 then 4 else extract(week from current_date) - 1 end
AND extract(year from ${col}) = case when extract(week from current_date) = 1 and extract(month from current_date) = 1 then extract(year from current_date) -1 else extract(year from current_date) end
AND extract(month from ${col}) = case when extract(week from current_date) = 1 then case when extract(week from current_date) - 1 = 0 then 12 else extract(week from current_date) - 1 end  else extract(month from current_date) end
`;
      return value;
    }
    if (timeGrainValue === 'This Week') {
      const value = isTimeStamp
        ? `extract(week from ${col}) = extract(week from current_date)
AND extract(year from ${col}) = extract(year from current_date) AND extract(month from ${col}) = extract(month from current_date)`
        : `extract(week from ${col}) = extract(week from current_date)
AND extract(year from ${col}) = extract(year from current_date) AND extract(month from ${col}) = extract(month from current_date)`;
      return value;
    }
    if (timeGrainValue === 'Yesterday') {
      const value = isTimeStamp
        ? `date_trunc('day', ${col}) = date_trunc('day', CURRENT_TIMESTAMP - INTERVAL '1 day')`
        : `${col} = CURRENT_DATE - INTERVAL '1 day'`;
      return value;
    }
    if (timeGrainValue === 'This Year') {
      const value = isTimeStamp
        ? `extract(year from ${col}) = extract(year from current_date)`
        : `extract(year from ${col}) = extract(year from current_date)`;
      return value;
    }
    if (timeGrainValue === 'Last Year') {
      const value = isTimeStamp
        ? `extract(year from ${col}) = extract(year from current_date) - 1`
        : `extract(year from ${col}) = extract(year from current_date) - 1`;
      return value;
    }
    if (timeGrainValue === 'Last Month') {
      const value = isTimeStamp
        ? `extract(month from ${col}) = case when extract(month from current_date) = 1 then 12 else extract(month from current_date) - 1 end  AND extract(year from ${col}) = case when extract(month from current_date) = 1 then extract(year from current_date) - 1 else extract(year from current_date) end`
        : `extract(month from ${col}) = case when extract(month from current_date) = 1 then 12 else extract(month from current_date) - 1 end  AND extract(year from ${col}) = case when extract(month from current_date) = 1 then extract(year from current_date) - 1 else extract(year from current_date) end`;
      return value;
    }
    if (timeGrainValue === 'Last 6 Months') {
      const value = isTimeStamp
        ? `extract(month from ${col}) >= extract(month from current_date - interval '6 month') AND extract(year from ${col}) = extract(year from current_date - interval '6 month') OR extract(year from ${col}) > extract(year from current_date - interval '6 month')`
        : `extract(month from ${col}) >= extract(month from current_date - interval '6 month') AND extract(year from ${col}) = extract(year from current_date - interval '6 month') OR extract(year from ${col}) > extract(year from current_date - interval '6 month')`;
      return value;
    }
    if (timeGrainValue === 'Last 3 Months') {
      const value = isTimeStamp
        ? `extract(month from ${col}) >= extract(month from current_date - interval '3 month') AND extract(year from ${col}) = extract(year from current_date - interval '3 month') OR extract(year from ${col}) > extract(year from current_date - interval '3 month')`
        : `extract(month from ${col}) >= extract(month from current_date - interval '3 month') AND extract(year from ${col}) = extract(year from current_date - interval '3 month') OR extract(year from ${col}) > extract(year from current_date - interval '3 month')`;
      return value;
    }
    if (timeGrainValue === 'This Month') {
      const value = isTimeStamp
        ? `extract(month from ${col}) = extract(month from current_date) AND extract(year from ${col}) = extract(year from current_date)`
        : `extract(month from ${col}) = extract(month from current_date) AND extract(year from ${col}) = extract(year from current_date)`;
      return value;
    }
    const from = timeGrainValue.split(' - ')[0];
    const to = timeGrainValue.split(' - ')[1];
    const value = isTimeStamp
      ? `${col} BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`
      : `${col} BETWEEN '${from}' AND '${to}'`;
    return value;
  }

  if (timeGrainValue === 'Today') {
    const value = isTimeStamp
      ? `DATE(${col}) = CURDATE()`
      : `${col} = CURDATE()`;
    return value;
  }
  if (timeGrainValue === 'Last 7 Days') {
    const value = isTimeStamp
      ? `${col} >= DATE(NOW() - INTERVAL 7 DAY)`
      : `${col} >= DATE(NOW() - INTERVAL 7 DAY)`;
    return value;
  }
  if (timeGrainValue === 'Last Week') {
    const value = isTimeStamp
      ? `WEEK(${col}) = 
CASE 
WHEN WEEK(${col}) = 1 THEN 4 
ELSE WEEK(CURRENT_DATE) - 1 
END
AND 
MONTH(${col}) = 
CASE 
           WHEN WEEK(CURRENT_DATE) = 1 
           THEN 
           CASE
              WHEN MONTH(CURRENT_DATE) -1 = 0 THEN 12
              ELSE MONTH(CURRENT_DATE) -1
           END
           ELSE MONTH(CURRENT_DATE)
        END
AND YEAR(${col}) = CASE WHEN MONTH(CURRENT_DATE) = 1 AND WEEK(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1
   ELSE YEAR(CURRENT_DATE) END`
      : `WEEK(${col}) = 
CASE 
WHEN WEEK(${col}) = 1 THEN 4 
ELSE WEEK(CURRENT_DATE) - 1 
END
AND 
MONTH(${col}) = 
CASE 
           WHEN WEEK(CURRENT_DATE) = 1 
           THEN 
           CASE
              WHEN MONTH(CURRENT_DATE) -1 = 0 THEN 12
              ELSE MONTH(CURRENT_DATE) -1
           END
           ELSE MONTH(CURRENT_DATE)
        END
AND YEAR(${col}) = CASE WHEN MONTH(CURRENT_DATE) = 1 AND WEEK(CURRENT_DATE) = 1 THEN YEAR(CURRENT_DATE) - 1
   ELSE YEAR(CURRENT_DATE) END`;
    return value;
  }
  if (timeGrainValue === 'This Week') {
    const value = isTimeStamp
      ? `WEEK(${col}) = WEEK(CURRENT_DATE)
AND 
MONTH(${col}) = MONTH(CURRENT_DATE)
AND
 YEAR(${col}) = YEAR(CURRENT_DATE)`
      : `WEEK(${col}) = WEEK(CURRENT_DATE)
AND 
MONTH(${col}) = MONTH(CURRENT_DATE)
AND
 YEAR(${col}) = YEAR(CURRENT_DATE)`;
    return value;
  }
  if (timeGrainValue === 'Yesterday') {
    const value = isTimeStamp
      ? `DATE(${col}) = CURDATE() - INTERVAL 1 DAY`
      : `${col} = DATE(NOW() - INTERVAL 1 DAY)`;
    return value;
  }
  if (timeGrainValue === 'This Year') {
    const value = isTimeStamp
      ? `YEAR(${col}) = YEAR(NOW())`
      : `YEAR(${col}) = YEAR(NOW())`;
    return value;
  }
  if (timeGrainValue === 'Last Year') {
    const value = isTimeStamp
      ? `YEAR(${col}) = YEAR(NOW()) - 1`
      : `YEAR(${col}) = YEAR(NOW()) - 1`;
    return value;
  }
  if (timeGrainValue === 'Last Month') {
    const value = isTimeStamp
      ? `MONTH(${col}) = 
CASE 
    WHEN MONTH(NOW()) = 1 THEN 12
    ELSE MONTH(NOW()) -1
  END
AND
YEAR(${col}) = 
  CASE 
    WHEN MONTH(NOW()) = 1 THEN YEAR(NOW())-1
    ELSE YEAR(NOW())
  END`
      : `MONTH(${col}) = 
CASE 
    WHEN MONTH(NOW()) = 1 THEN 12
    ELSE MONTH(NOW()) -1
  END
AND
YEAR(${col}) = 
  CASE 
    WHEN MONTH(NOW()) = 1 THEN YEAR(NOW())-1
    ELSE YEAR(NOW())
  END`;
    return value;
  }
  if (timeGrainValue === 'Last 6 Months') {
    const value = isTimeStamp
      ? `MONTH(${col}) >= MONTH(NOW()) - 5 AND YEAR(${col}) = YEAR(NOW()) OR YEAR(${col}) > YEAR(NOW()) - 1`
      : `MONTH(${col}) >= MONTH(NOW()) - 5 AND YEAR(${col}) = YEAR(NOW()) OR YEAR(${col}) > YEAR(NOW()) - 1`;
    return value;
  }
  if (timeGrainValue === 'Last 3 Months') {
    const value = isTimeStamp
      ? `MONTH(${col}) >= MONTH(NOW()) - 3 AND YEAR(${col}) = YEAR(NOW()) OR YEAR(${col}) > YEAR(NOW()) - 1`
      : `MONTH(${col}) >= MONTH(NOW()) - 3 AND YEAR(${col}) = YEAR(NOW()) OR YEAR(${col}) > YEAR(NOW()) - 1`;
    return value;
  }
  if (timeGrainValue === 'This Month') {
    const value = isTimeStamp
      ? `MONTH(${col}) = MONTH(NOW()) AND YEAR(${col}) = YEAR(NOW())`
      : `MONTH(${col}) = MONTH(NOW()) AND YEAR(${col}) = YEAR(NOW())`;
    return value;
  }
  const from = timeGrainValue.split(' - ')[0];
  const to = timeGrainValue.split(' - ')[1];
  const value = isTimeStamp
    ? `${col} BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`
    : `${col} BETWEEN '${from}' AND '${to}'`;
  return value;
};
