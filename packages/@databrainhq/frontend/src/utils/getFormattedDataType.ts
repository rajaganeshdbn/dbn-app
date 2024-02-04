import { BOOLEAN_TYPES, NUMBER_TYPES, STRING_TYPES } from 'consts/application';

const getFormattedDataType = (
  datatype: string
): 'text' | 'number' | 'boolean' => {
  if (NUMBER_TYPES.includes(datatype.toLowerCase())) return 'number';

  if (
    STRING_TYPES.includes(datatype.toLowerCase()) ||
    datatype.toLowerCase().includes('char')
  )
    return 'text';

  if (BOOLEAN_TYPES.includes(datatype.toLowerCase())) return 'boolean';

  return 'text';
};

export default getFormattedDataType;
