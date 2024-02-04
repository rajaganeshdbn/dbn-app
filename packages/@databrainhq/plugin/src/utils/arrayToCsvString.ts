/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/**
 * @name objectArrayToCsvString - converts array of objects to csv file downloadable link
 * @param array - array of objects with key value pairs
 * @returns uri encoded csv data string
 */
export const objectArrayToCsvString = (
  array: Record<string, string>[]
): string => {
  const csvHeader = 'data:text/csv;charset=utf-8,';

  if (!array.length) return csvHeader;

  const columns: string[] = [];
  const objSchema = array[0];

  // get keys of object as csv header row i.e ['id,name,age,phone,...']
  const headers = Object.keys(objSchema);
  columns.push(`S.NO,${headers.join(',').toUpperCase()}`);

  // get values of object as csv content rows i.e ['<comma separated header string>', '1,abc,12,1234,...']
  array.forEach((rowObj: Record<string, string>, index) => {
    const row = Object.values(rowObj).map((value) => {
      // return value if it's a number
      if (typeof value === 'number') {
        return value;
        // wrap value in double-quotes if it contains a comma and escape characters
      }
      try {
        if (
          typeof value === 'string' &&
          (value.includes(',') ||
            value.includes('\n') ||
            value.includes('\r') ||
            value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
      } catch {
        return value;
      }
      return value;
    });
    columns.push(`${index + 1},${row.join(',')}`);
  });

  // joining columns into a string combining with next line character i.e '<comma separated header row string>\n<comma separated content row string>\n ...'
  const csvContent = columns.join('\n');

  const csvText = encodeURI(csvHeader + csvContent);

  return csvText;
};
