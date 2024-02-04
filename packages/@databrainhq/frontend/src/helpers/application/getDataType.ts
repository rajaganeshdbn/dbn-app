import {
  BOOLEAN_TYPES,
  DATE_TYPES,
  NUMBER_TYPES,
  STRING_TYPES,
} from 'consts/application';

const getDataType = (datatype: string) => {
  if (NUMBER_TYPES.includes(datatype.toLowerCase())) {
    return 'number';
  }
  if (
    STRING_TYPES.includes(datatype.toLowerCase()) ||
    datatype.toLowerCase().includes('char')
  ) {
    return 'string';
  }

  if (DATE_TYPES.includes(datatype.toLowerCase())) {
    return 'date';
  }
  if (BOOLEAN_TYPES.includes(datatype.toLowerCase())) {
    return 'boolean';
  }
  return 'string';
};

export default getDataType;
