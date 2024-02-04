/* eslint-disable no-restricted-globals */
const isIsoDateString = (str: string) => {
  return !isNaN(Date.parse(str));
};

const getColumnTypes = (data: Record<string, any>[]) => {
  const columnTypes: Record<string, string> = {};

  data.forEach((row) => {
    Object.entries(row).forEach(([key, value]) => {
      let type: string;

      if (typeof value === 'number' && Number.isFinite(value)) {
        type = 'number';
      } else if (isIsoDateString(value)) {
        type = 'date';
      } else if (Array.isArray(value)) {
        type = 'array';
      } else {
        type = 'string';
      }

      const currentType = columnTypes[key];

      if (!currentType || (type === 'number' && currentType === 'string')) {
        columnTypes[key] = type;
      }
    });
  });

  return columnTypes;
};

export default getColumnTypes;
