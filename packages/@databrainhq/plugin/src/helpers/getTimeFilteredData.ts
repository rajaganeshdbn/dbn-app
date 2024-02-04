/* eslint-disable no-plusplus */

import { DateOptionType } from '@/types';

type Params = {
  timeColumn: string;
  data: Record<string, any>[];
  dimensionColumn: string;
  measureColumn: string;
  option: DateOptionType;
};

type RangeOptions = {
  range: string;
  count: number;
  time: string;
  from: Date | undefined;
  to: Date | undefined;
};
type GroupOptions = {
  format: string;
  data: Record<string, any>[];
  measureColumn: string;
  dimensionColumn: string;
  timeColumn: string;
  startDate: Date;
};
type FilteredDataListOptions = {
  dimensionColumn: string;
  endDate: Date;
  measureColumn: string;
  groupedDataList: any[];
  format: string;
  time: string;
  count: number;
  range: string;
};
const getStartAndEndDate = ({ range, count, time, from, to }: RangeOptions) => {
  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let startDate: Date;
  let endDate: Date;

  if (range === 'This') {
    switch (time) {
      case 'Year':
        startDate = new Date(currentYear, 0, 1);
        endDate = new Date(currentDate);
        break;
      case 'Month':
        startDate = new Date(currentYear, currentMonth, 1);
        endDate = new Date(currentDate);
        break;
      case 'Week': {
        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
        startDate = new Date(currentDate.setDate(firstDayOfWeek));
        endDate = new Date(currentDate.setDate(firstDayOfWeek + 6));
        break;
      }
      case 'Day':
        startDate = new Date(currentDate);
        endDate = new Date(currentDate);
        break;
      default: {
        startDate = new Date(0);
        endDate = new Date(currentDate);
      }
    }
    return { startDate, endDate };
  }
  if (range === 'Last') {
    switch (time) {
      case 'Year': {
        let yearsToGoBack;
        let endDateYear;
        if (count === 1) {
          yearsToGoBack = count;
          endDateYear = currentYear - 1;
        } else {
          yearsToGoBack = count - 1;
          endDateYear = currentYear;
        }
        startDate = new Date(currentYear - yearsToGoBack, 0, 1);
        endDate = new Date(endDateYear, 11, 31);
        break;
      }
      case 'Month': {
        const monthsToGoback =
          count === 1 ? currentMonth - 1 : currentMonth - count + 1;

        startDate = new Date(currentYear, monthsToGoback, 1);
        endDate = new Date(currentYear, currentMonth, count === 1 ? 0 : 31);
        break;
      }
      case 'Week': {
        const lastWeekEndDate = new Date(
          currentDate.setDate(
            currentDate.getDate() - ((currentDate.getDay() + 1) % 7)
          )
        );
        const lastWeekStartDate = new Date(
          lastWeekEndDate.getFullYear(),
          lastWeekEndDate.getMonth(),
          lastWeekEndDate.getDate() - 6
        );
        const weeksToGoBack = count - 1;
        startDate = new Date(
          lastWeekStartDate.setDate(
            lastWeekStartDate.getDate() - 7 * weeksToGoBack
          )
        );
        endDate = new Date(
          lastWeekEndDate.setDate(
            lastWeekEndDate.getDate() - 7 * (weeksToGoBack - 1)
          )
        );
        if (weeksToGoBack === 0) {
          endDate = new Date(currentDate);
        }
        break;
      }
      case 'Day':
        startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - count);
        endDate = new Date(currentDate);
        break;
      default: {
        startDate = new Date(0);
        endDate = new Date(currentDate);
      }
    }
    return { startDate, endDate };
  }
  return {
    startDate: from || new Date(0),
    endDate: to || new Date(currentDate),
  };
};

const groupDataByFornat = ({
  data,
  format,
  measureColumn,
  timeColumn,
  dimensionColumn,
  startDate,
}: GroupOptions) => {
  const groupedData = data.reduce((result, row) => {
    const measureValue = Number(row[measureColumn]);
    const date = new Date(row[timeColumn]);
    let groupValue: string;

    switch (format) {
      case 'Week': {
        const weekNumber = Math.ceil((date.getDate() + startDate.getDay()) / 7);
        groupValue = `Week ${weekNumber}`;
        break;
      }
      case 'Quarter': {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        const year = date.getFullYear();
        groupValue = `Q${quarter} ${year}`;

        break;
      }
      case 'Month': {
        groupValue = `${date.toLocaleString('default', {
          month: 'long',
        })} ${date.getFullYear()}`;
        break;
      }
      case 'Day': {
        const weekdayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        groupValue = weekdayNames[date.getDay()];

        break;
      }
      default: {
        groupValue = row[timeColumn];
      }
    }
    const existingRow = result.find(
      (r: Record<string, string>) => r[dimensionColumn] === groupValue
    );
    if (existingRow) {
      existingRow[measureColumn] += measureValue;
    } else {
      result.push({
        [dimensionColumn]: groupValue,
        [measureColumn]: measureValue,
      });
    }
    return result;
  }, []);
  return groupedData;
};
const getFilteredDataList = ({
  dimensionColumn,
  endDate,
  measureColumn,
  format,
  groupedDataList,
  time,
  count,
  range,
}: FilteredDataListOptions) => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  let allMonths: Record<string, string | number>[] = [];
  let allQuarters: Record<string, string | number>[] = [];

  if (count === 1 && range === 'This') {
    allMonths = Array.from({ length: 12 }, (_, i) => ({
      [dimensionColumn]: `${new Date(2000, i, 1).toLocaleString('default', {
        month: 'long',
      })} ${currentYear}`,
      [measureColumn]: 0,
    }));
    allQuarters = [
      {
        [dimensionColumn]: `Q1 ${currentYear}`,
        [measureColumn]: 0,
      },
      {
        [dimensionColumn]: `Q2 ${currentYear}`,
        [measureColumn]: 0,
      },
      {
        [dimensionColumn]: `Q3 ${currentYear}`,
        [measureColumn]: 0,
      },
      {
        [dimensionColumn]: `Q4 ${currentYear}`,
        [measureColumn]: 0,
      },
    ];
  }
  if (count === 1 && range === 'Last') {
    allMonths = Array.from({ length: 12 }, (_, i) => ({
      [dimensionColumn]: `${new Date(2000, i, 1).toLocaleString('default', {
        month: 'long',
      })} ${lastYear}`,
      [measureColumn]: 0,
    }));
    allQuarters = [
      {
        [dimensionColumn]: `Q1 ${lastYear}`,
        [measureColumn]: 0,
      },
      {
        [dimensionColumn]: `Q2 ${lastYear}`,
        [measureColumn]: 0,
      },
      {
        [dimensionColumn]: `Q3 ${lastYear}`,
        [measureColumn]: 0,
      },
      {
        [dimensionColumn]: `Q4 ${lastYear}`,
        [measureColumn]: 0,
      },
    ];
  }
  if (count > 1 && range === 'Last') {
    for (let i = currentYear - count + 1; i <= currentYear; i++) {
      for (let j = 0; j < 12; j++) {
        allMonths.push({
          [dimensionColumn]: `${new Date(i, j, 1).toLocaleString('default', {
            month: 'long',
          })} ${new Date(i, j, 1).getFullYear()}`,
          [measureColumn]: 0,
        });
      }
    }
    for (let i = currentYear - count; i <= currentYear; i++) {
      allQuarters.push(
        {
          [dimensionColumn]: `Q1 ${i}`,
          [measureColumn]: 0,
        },
        {
          [dimensionColumn]: `Q2 ${i}`,
          [measureColumn]: 0,
        },
        {
          [dimensionColumn]: `Q3 ${i}`,
          [measureColumn]: 0,
        },
        {
          [dimensionColumn]: `Q4 ${i}`,
          [measureColumn]: 0,
        }
      );
    }
  }
  const allWeeks = Array.from({ length: 4 }, (_, i) => ({
    [dimensionColumn]: `Week ${i + 1}`,
    [measureColumn]: 0,
  }));
  const allWeekDays = [
    {
      [dimensionColumn]: 'Sunday',
      [measureColumn]: 0,
    },
    {
      [dimensionColumn]: 'Monday',
      [measureColumn]: 0,
    },
    {
      [dimensionColumn]: 'Tuesday',
      [measureColumn]: 0,
    },
    {
      [dimensionColumn]: 'Wednesday',
      [measureColumn]: 0,
    },
    {
      [dimensionColumn]: 'Thursday',
      [measureColumn]: 0,
    },
    {
      [dimensionColumn]: 'Friday',
      [measureColumn]: 0,
    },
    {
      [dimensionColumn]: 'Saturday',
      [measureColumn]: 0,
    },
  ];

  let filteredDataList: Record<string, any>[] = [];
  switch (`${range}${count > 1 ? ` ${count} ` : ' '}${time} By ${format}`) {
    case 'This Year By Month':
    case 'Last Year By Month':
    case `Last ${count} Year By Month`: {
      filteredDataList = allMonths.map((month) => {
        const existingRow = groupedDataList.find((row) => {
          return row[dimensionColumn] === month[dimensionColumn];
        });
        if (existingRow) {
          return existingRow;
        }
        return month;
      });
      break;
    }
    case 'This Year By Quarter':
    case 'Last Year By Quarter':
    case `Last ${count} Year By Quarter`: {
      filteredDataList = allQuarters.map((quarter) => {
        const existingRow = groupedDataList.find(
          (row) => row[dimensionColumn] === quarter[dimensionColumn]
        );
        if (existingRow) {
          return existingRow;
        }
        return quarter;
      });
      break;
    }
    case 'This Month By Week':
    case 'Last Month By Week': {
      filteredDataList = allWeeks.map((week) => {
        const existingRow = groupedDataList.find(
          (row) => row[dimensionColumn] === week[dimensionColumn]
        );
        if (existingRow) {
          return existingRow;
        }
        return week;
      });
      break;
    }
    case 'This Week By Day':
    case 'Last Week By Day': {
      filteredDataList = allWeekDays.map((week) => {
        const existingRow = groupedDataList.find(
          (row) => row[dimensionColumn] === week[dimensionColumn]
        );
        if (existingRow) {
          return existingRow;
        }
        return week;
      });
      break;
    }

    case 'This Quarter By Month': {
      const currentQuarter = Math.ceil((endDate.getMonth() + 1) / 3);
      const startMonth = (currentQuarter - 1) * 3;
      const endMonth = startMonth + 2;
      const filteredMonths = allMonths.slice(startMonth, endMonth + 1);
      filteredDataList = filteredMonths.map((month) => {
        const existingRow = groupedDataList.find(
          (row) => row[dimensionColumn] === month[dimensionColumn]
        );
        if (existingRow) {
          return existingRow;
        }
        return month;
      });
      break;
    }
    case 'Last Quarter By Month': {
      const currentQuarter = Math.ceil((endDate.getMonth() + 1) / 3);
      const lastQuarter = currentQuarter === 1 ? 4 : currentQuarter - 1;
      const startMonth = (lastQuarter - 1) * 3;
      const endMonth = startMonth + 2;
      const filteredMonths = allMonths.slice(startMonth, endMonth + 1);
      filteredDataList = filteredMonths.map((month) => {
        const existingRow = groupedDataList.find(
          (row) => row[dimensionColumn] === month[dimensionColumn]
        );
        if (existingRow) {
          return existingRow;
        }
        return month;
      });
      break;
    }
    case `Last ${count} Month By Month`: {
      filteredDataList = Array.from({ length: count }, (_, i) => {
        const month = new Date(
          endDate.getFullYear(),
          endDate.getMonth() - i,
          1
        );
        return {
          [dimensionColumn]: `${month.toLocaleString('default', {
            month: 'long',
          })} ${month.getFullYear()}`,
          [measureColumn]: 0,
        };
      })
        .reverse()
        .map((month) => {
          const existingRow = groupedDataList.find(
            (row) => row[dimensionColumn] === month[dimensionColumn]
          );
          if (existingRow) {
            return existingRow;
          }
          return month;
        });
      break;
    }

    default:
      filteredDataList = groupedDataList;
  }
  return filteredDataList;
};
const getTimeFilteredData = ({
  data,
  dimensionColumn,
  measureColumn,
  timeColumn,
  option,
}: Params) => {
  const currentDate = new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const { endDate, startDate } = getStartAndEndDate({
    range: option.range,
    count: option.count,
    from: option.startDate,
    to: option.endDate,
    time: option.time,
  });

  const filteredData = data.filter((row) => {
    const saleDate = new Date(row[timeColumn]);
    return saleDate >= startDate && saleDate <= endDate;
  });
  if (option.time === 'Week' && option.count > 1) {
    return filteredData.map((row) => ({
      [dimensionColumn]: row[dimensionColumn],
      [measureColumn]: row[measureColumn],
    }));
  }
  const groupedData = groupDataByFornat({
    data: filteredData,
    dimensionColumn,
    format: option.format,
    measureColumn,
    startDate,
    timeColumn,
  });
  const groupedDataList = Object.values(groupedData);
  if (option.name === 'Custom') {
    return groupedDataList;
  }
  const filteredDataList = getFilteredDataList({
    dimensionColumn,
    endDate,
    format: option.format,
    groupedDataList,
    measureColumn,
    time: option.time,
    count: option.count,
    range: option.range,
  });
  return filteredDataList;
};

export default getTimeFilteredData;
export const getTimeGroupData = ({
  data,
  dimensionColumn,
  measureColumn,
  timeColumn,
  option,
}: Params) => {
  const { endDate, startDate } = getStartAndEndDate({
    range: option.range,
    count: option.count,
    from: option.startDate,
    to: option.endDate,
    time: option.time,
  });

  if (option.time === 'Week' && option.count > 1) {
    return data.map((row) => ({
      [dimensionColumn]: row[dimensionColumn],
      [measureColumn]: row[measureColumn],
    }));
  }
  const groupedData = groupDataByFornat({
    data,
    dimensionColumn,
    format: option.format,
    measureColumn,
    startDate,
    timeColumn,
  });
  const groupedDataList = Object.values(groupedData);
  if (option.name === 'Custom') {
    return groupedDataList;
  }
  const filteredDataList = getFilteredDataList({
    dimensionColumn,
    endDate,
    format: option.format,
    groupedDataList,
    measureColumn,
    time: option.time,
    count: option.count,
    range: option.range,
  });
  return filteredDataList;
};
