// Provides an object with start date and end date values
export const setOnDateChange = (
  start: Date | null | undefined,
  end: Date | null | undefined,
  timeGrain?: string
) => {
  if (start && end) {
    const startDateValue = new Date(
      start.getTime() - start.getTimezoneOffset() * 60 * 1000
    );
    const endDateValue = new Date(
      end.getTime() - end.getTimezoneOffset() * 60 * 1000
    );
    const startDateFormat = startDateValue.toISOString().slice(0, 10);
    const endDateFormat = endDateValue.toISOString().slice(0, 10);
    return {
      value: `${startDateFormat} - ${endDateFormat}`,
      startDate: startDateValue,
      endDate: endDateValue,
      timeGrainValue: timeGrain || `${startDateFormat} - ${endDateFormat}`,
    };
  }
  return {};
};
