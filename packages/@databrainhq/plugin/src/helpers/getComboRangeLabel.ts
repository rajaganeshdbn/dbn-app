/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// Function to get the range label for different axis of combo chart

export const getComboRangeLabel = (
  value: any,
  formatter: {
    upperLimit: number;
    lowerLimit: number;
    label: string;
  }[]
) => {
  const matchingRange = formatter.find((range) => {
    return value >= range.lowerLimit && value <= range.upperLimit;
  });
  const isUpperLimit = matchingRange && value === matchingRange.upperLimit;
  const valWithoutRange = matchingRange ? '' : value;
  return isUpperLimit && matchingRange
    ? `${matchingRange.label}\n(${matchingRange.lowerLimit}-${matchingRange.upperLimit})`
    : valWithoutRange;
};
