/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  ARRAY_TYPES,
  BOOLEAN_TYPES,
  DATE_TYPES,
  NUMBER_TYPES,
  STRING_TYPES,
} from '@/consts/metricOptions';
import { Icons } from '@/components/Icons';

type Props = {
  datatype: string;
  className?: string;
};

export const DataType = ({ datatype = 'unknown', className }: Props) => {
  if (NUMBER_TYPES.includes(datatype.toLowerCase())) {
    return <Icons name="number" size="sm" />;
  }
  if (
    STRING_TYPES.includes(datatype.toLowerCase()) ||
    datatype.toLowerCase().includes('char')
  ) {
    return <Icons name="string" size="sm" />;
  }
  if (ARRAY_TYPES.includes(datatype.toLowerCase())) {
    return <Icons name="array" size="sm" />;
  }
  if (DATE_TYPES.includes(datatype.toLowerCase())) {
    return <Icons name="date" size="sm" />;
  }
  if (BOOLEAN_TYPES.includes(datatype.toLowerCase())) {
    return <Icons name="boolean" size="sm" />;
  }
  return <Icons name="unknown" size="sm" />;
};
