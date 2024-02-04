// Helps to find out if an object has unique values for two keys or not
// Checks for an entire array of objects
export const hasUniqueKeyValues = (
  array: Record<string, any>[],
  key1: string,
  key2: string
) => {
  let hasVal: boolean = true;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][key1]?.toString() === array[i][key2]?.toString()) {
      hasVal = false;
      break;
    }
  }
  return hasVal;
};
