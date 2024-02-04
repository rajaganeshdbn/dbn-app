import React from 'react';
import { Text } from '@/components/Text';

type ErrorMessageProps = {
  message?: string;
};

export const Error = ({ message = '' }: ErrorMessageProps) => {
  return (
    <Text variant="body-text-sm" color="alert">
      {message}
    </Text>
  );
};
