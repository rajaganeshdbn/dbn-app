const getOperatorList = (datatype: string) => {
  if (datatype === 'number') {
    return [
      {
        value: '=',
        label: 'Equal to (=)',
      },
      {
        value: '<>',
        label: 'Not equal to (!=)',
      },
      {
        value: '<',
        label: 'Less than (<)',
      },
      {
        value: '<=',
        label: 'Less or equal (<=)',
      },
      {
        value: '>',
        label: 'Greater than (>)',
      },
      {
        value: '>=',
        label: 'Greater or equal (>=)',
      },
      {
        value: 'IN',
        label: 'In',
      },
      {
        value: 'NOT IN',
        label: 'Not in',
      },
      {
        value: 'IS NOT NULL',
        label: 'Is not null',
      },
      {
        value: 'IS NULL',
        label: 'Is null',
      },
    ];
  }
  if (datatype === 'string') {
    return [
      {
        value: '=',
        label: 'Equal to (=)',
      },
      {
        value: '<>',
        label: 'Not equal to (!=)',
      },
      {
        value: 'IN',
        label: 'In',
      },
      {
        value: 'NOT IN',
        label: 'Not in',
      },
      {
        value: 'LIKE (case sensitive)',
        label: 'Like (case sensitive)',
      },
      {
        value: 'REGEX',
        label: 'Regex',
      },
      {
        value: 'IS NOT NULL',
        label: 'Is not null',
      },
      {
        value: 'IS NULL',
        label: 'Is null',
      },
    ];
  }
  if (datatype === 'boolean') {
    return [
      {
        value: '=',
        label: 'Equal to (=)',
      },
      {
        value: '<>',
        label: 'Not equal to (!=)',
      },
    ];
  }
  if (datatype === 'date') {
    return [
      {
        value: '=',
        label: 'Equal to (=)',
      },
      {
        value: '<>',
        label: 'Not equal to (!=)',
      },
    ];
  }
  return [
    {
      value: '=',
      label: 'Equal to (=)',
    },
    {
      value: '<>',
      label: 'Not equal to (!=)',
    },
    {
      value: '<',
      label: 'Less than (<)',
    },
    {
      value: '<=',
      label: 'Less or equal (<=)',
    },
    {
      value: '>',
      label: 'Greater than (>)',
    },
    {
      value: '>=',
      label: 'Greater or equal (>=)',
    },
    {
      value: 'IN',
      label: 'In',
    },
    {
      value: 'NOT IN',
      label: 'Not in',
    },
    {
      value: 'LIKE (case sensitive)',
      label: 'Like (case sensitive)',
    },
    {
      value: 'REGEX',
      label: 'Regex',
    },
    {
      value: 'IS NOT NULL',
      label: 'Is not null',
    },
    {
      value: 'IS NULL',
      label: 'Is null',
    },
  ];
};

export default getOperatorList;
