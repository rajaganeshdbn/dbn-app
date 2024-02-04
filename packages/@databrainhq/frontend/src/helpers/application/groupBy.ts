/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-params */
export const groupByMultipleKeys = (
  rawData: any[] | undefined,
  keys: string[],
  measureKey: string
) => {
  const data = rawData?.map((d) => ({
    ...d,
    [measureKey]: Number(d[measureKey]),
  }));
  return data?.reduce((result, currentValue) => {
    const key = keys.reduce((key, k) => (key += currentValue[k]), '');
    if (!result[key]) {
      result[key] = { [measureKey]: 0 };
      keys.forEach((k) => (result[key][k] = currentValue[k]));
    }
    result[key][measureKey] += currentValue[measureKey];
    return result;
  }, {});
};
export const updateGroupData = (
  data: any[] | undefined,
  keys: string[],
  selectedGroupBy: string[],
  setGroupedData: (value: React.SetStateAction<Record<string, any>[]>) => void
) => {
  const measureKey = Object.keys(data?.[0] ?? []).filter(
    (key) => !selectedGroupBy.includes(key)
  );

  const groupedData = groupByMultipleKeys(data, keys, measureKey[0]);
  setGroupedData(Object.values(groupedData));
};

export const findKeys = (arr: Record<string, any>[]) => {
  const first10Objects = arr.slice(0, 10);
  const allEntries = first10Objects.flatMap((obj) => Object.entries(obj));
  const keyCounts: Record<string, Record<string, number>> = {}; // A map of key -> value type counts

  // Count the number of occurrences of each value type for each key
  allEntries.forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (keyCounts[key]) {
      keyCounts[key][typeof value] = (keyCounts[key][typeof value] || 0) + 1;
    } else {
      keyCounts[key] = { [typeof value]: 1 };
    }
  });

  // Group keys by the majority value type
  const numberKeys: string[] = [];
  const stringKeys: string[] = [];
  Object.entries(keyCounts).forEach(([key, counts]) => {
    const majorityType = Object.entries(counts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    if (majorityType === 'number') {
      numberKeys.push(key);
    } else if (majorityType === 'string') {
      stringKeys.push(key);
    }
  });

  return { numberKeys, stringKeys };
};
