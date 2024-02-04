import { useGenerateMetricMutation } from '@/queries/externalDashboard.mutation';
import { useMetricColumnMutation } from '@/queries/metric.mutation';

export const useGenerateDatasetMetrics = () => {
  const {
    mutate: generateDatasetMetric,
    isLoading: isGeneratingDataset,
    error: generateError,
  } = useGenerateMetricMutation();
  const { mutate: fetchColumnValues } = useMetricColumnMutation();
  return {
    generateDatasetMetric,
    isGeneratingDataset,
    generateError,
    fetchColumnValues,
  };
};
