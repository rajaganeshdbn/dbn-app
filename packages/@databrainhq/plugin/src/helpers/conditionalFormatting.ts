import { ConditionalFormattingParam } from '@/types';

const conditionalFormattingStyles = ({
  rules,
  value: columnValue,
}: ConditionalFormattingParam) => {
  const matchingRule = rules.find((rule) => {
    const { operator, value: comparisonValue } = rule;

    if (operator === 'isEqualTo' && columnValue === comparisonValue) {
      return true;
    }

    if (operator === 'isNotEqualTo' && columnValue !== comparisonValue) {
      return true;
    }

    if (operator === 'isNull' && columnValue === null) {
      return true;
    }

    if (operator === 'isNotNull' && columnValue !== null) {
      return true;
    }

    if (
      typeof columnValue === 'string' &&
      operator === 'contains' &&
      columnValue.includes(comparisonValue)
    ) {
      return true;
    }

    if (
      typeof columnValue === 'string' &&
      operator === 'doesNotContain' &&
      !columnValue.includes(comparisonValue)
    ) {
      return true;
    }

    if (
      typeof columnValue === 'string' &&
      operator === 'startsWith' &&
      columnValue.startsWith(comparisonValue)
    ) {
      return true;
    }

    if (
      typeof columnValue === 'string' &&
      operator === 'endsWith' &&
      columnValue.endsWith(comparisonValue)
    ) {
      return true;
    }

    if (operator === 'isLessThan' && columnValue < comparisonValue) {
      return true;
    }

    if (operator === 'isGreaterThan' && columnValue > comparisonValue) {
      return true;
    }

    if (operator === 'isLessThanOrEqualTo' && columnValue <= comparisonValue) {
      return true;
    }

    if (
      operator === 'isGreaterThanOrEqualTo' &&
      columnValue >= comparisonValue
    ) {
      return true;
    }

    return false;
  });

  if (matchingRule) {
    return matchingRule.styles;
  }

  return {};
};

export default conditionalFormattingStyles;
