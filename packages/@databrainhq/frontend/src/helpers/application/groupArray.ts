/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const groupArray = <T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
): Record<T[K], T[]> => {
  return array.reduce((acc, item) => {
    const group = item[key];
    if (group) {
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
    }
    return acc;
  }, {} as Record<T[K], T[]>);
};

export default groupArray;
