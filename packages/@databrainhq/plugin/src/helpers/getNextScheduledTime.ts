import { WEEK_DAYS } from '@/consts';

interface ScheduleParams {
  frequency: string;
  weekDays: Record<string, boolean>;
  date: { value: string; label: string }[];
  hours: string;
  time: string;
  timezone: string;
}

const getTimezoneOffset = (timezone: string, date: Date): number => {
  const localOffset: number = date.getTimezoneOffset() * -1;
  const targetOffset: number =
    new Date(
      date.toLocaleString('en-US', { timeZone: timezone })
    ).getTimezoneOffset() * -1;
  const diff: number = targetOffset - localOffset;
  return diff;
};
const getNextScheduledTime = (params: ScheduleParams): Date => {
  const now: Date = new Date();
  let scheduledDate: Date | null = null;
  switch (params.frequency) {
    case 'Daily':
      scheduledDate = new Date(now);
      scheduledDate.setDate(now.getDate() + 1);
      break;
    case 'Weekly': {
      const selectedDays = Object.keys(params.weekDays).filter(
        (day) => params.weekDays[day]
      );
      let closestDate: Date | null = null;
      selectedDays.forEach((selectedDay) => {
        const dayIndex = WEEK_DAYS.findIndex(
          (day) => day.value === selectedDay
        );
        const dayDiff = (dayIndex + 7 - now.getDay()) % 7;
        const nextDate = new Date(now);
        nextDate.setDate(now.getDate() + dayDiff);
        if (nextDate.toDateString() === now.toDateString()) {
          nextDate.setDate(nextDate.getDate() + 7);
        }
        if (!closestDate || nextDate < closestDate) {
          closestDate = nextDate;
        }
      });
      scheduledDate = closestDate;
      break;
    }

    case 'Monthly': {
      const selectedDates = params.date.map((v) => parseInt(v.value, 10));
      let closestDate: Date | null = null;
      selectedDates.forEach((selectedDate) => {
        const nextDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          selectedDate
        );
        if (nextDate < now) {
          nextDate.setMonth(now.getMonth() + 1);
        }
        if (!closestDate || nextDate < closestDate) {
          closestDate = nextDate;
        }
      });
      scheduledDate = closestDate;
      break;
    }
    default:
      break;
  }

  if (scheduledDate !== null) {
    scheduledDate.setHours(parseInt(params.hours, 10), 0, 0, 0);

    if (params.time === 'PM') {
      scheduledDate.setHours(parseInt(params.hours, 10) + 12);
    } else if (params.time === 'AM' && params.hours === '12') {
      scheduledDate.setHours(0);
    }

    const timezoneOffset = getTimezoneOffset(params.timezone, scheduledDate);
    scheduledDate.setTime(scheduledDate.getTime() + timezoneOffset * 60000);
  }

  return scheduledDate as Date;
};

export default getNextScheduledTime;
