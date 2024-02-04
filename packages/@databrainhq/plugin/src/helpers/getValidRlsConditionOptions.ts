import { MetricFilterOptionsType, RlsCondition } from '@/types';

/**
 * @name getValidRlsConditionOptions - Filters out invalid options and return valid options and value;
 * @param {RlsCondition} rlsCondition (required) - A metric filter object.
 * @param {MetricFilterOptionsType} filterOptions (required) - Metric filter options prop object.
 * @returns value - A valid value or undefined.
 * @returns options - A valid options or undefined.
 * @returns 'undefined' - If not a valid props or options or value.
 */
export const getValidRlsConditionOptions = (
  rlsCondition: RlsCondition,
  filterOptions: MetricFilterOptionsType
) => {
  const value = filterOptions?.[rlsCondition.name]?.defaultOption?.toString();
  const options = ((
    filterOptions?.[rlsCondition.name]?.options as any[]
  )?.filter((opt: any) => {
    if (opt == null) return false;
    switch (rlsCondition.datatype) {
      case 'string': {
        if (typeof opt !== 'string' || !opt) return false;
        break;
      }
      case 'number': {
        if (typeof opt !== 'number' || !Number(opt)) return false;
        break;
      }
      case 'date': {
        if (typeof opt !== 'object') return false;
        if (!opt.name) return false;
        if (!['Last', 'This', 'Custom'].includes(opt.range)) return false;
        if (
          opt.range !== 'Custom' &&
          !opt.time &&
          !['Day', 'Week', 'Month', 'Quarter', 'Year'].includes(opt.time)
        )
          return false;
        break;
      }
      default: {
        break;
      }
    }
    return true;
  }) || []) as MetricFilterOptionsType['']['options'];

  return value && options.length ? { value, options } : undefined;
};
