/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// type DataItem = Record<string, any>;

export interface ResultItem {
  name: string | number;
  count: number;
  parent: string;
}

// type ResultData = Record<string, ResultItem[] | number[]>;

const transformData = (
  inputData: Record<string, any>[],
  dimensions: string[],
  metrics: string[]
): Record<string, ResultItem[]> => {
  const sortedData = inputData.sort((a, b) => {
    for (let i = 0; i < dimensions.length; i++) {
      const dimension = dimensions[i];

      if (a[dimension] < b[dimension]) {
        return -1;
      }
      if (a[dimension] > b[dimension]) {
        return 1;
      }
    }

    return 0;
  });
  const output: Record<string, any> = {};
  // Initialize the output object with empty arrays for each dimension and metric
  dimensions.forEach((dimension) => {
    output[dimension] = [];
  });
  metrics.forEach((metric) => {
    output[metric] = [];
  });

  // Process each data entry
  sortedData.forEach((entry) => {
    dimensions.forEach((dimension, index) => {
      const value = entry[dimension];
      const parent =
        index > 0
          ? dimensions
              .slice(0, index)
              .map((dim) => entry[dim])
              .join('/')
          : null;

      // Check if the current value exists in the output array for the current dimension
      const existingValue = output[dimension].find(
        (obj: any) => obj.name === value && obj.parent === parent
      );

      if (existingValue) {
        // Increment the count if the value already exists
        existingValue.count++;
      } else {
        // Add a new entry for the value if it doesn't exist
        output[dimension].push({
          name: value,
          count: 1,
          parent,
        });
      }
    });

    // Calculate the sum of sales for each combination of dimensions
    metrics.forEach((metric) => {
      const metricValue = entry[metric];

      const existingMetric = output[metric].find((obj: any) => {
        const metricDimensions = dimensions.map(
          (dimension) => entry[dimension]
        );
        const metricParent = metricDimensions.join('/');
        return obj.parent === metricParent;
      });

      if (existingMetric) {
        existingMetric.name += metricValue;
      } else {
        const metricDimensions = dimensions.map(
          (dimension) => entry[dimension]
        );
        const metricParent = metricDimensions.join('/');

        output[metric].push({
          name: metricValue,
          parent: metricParent,
        });
      }
    });
  });

  return output;
};

export default transformData;
