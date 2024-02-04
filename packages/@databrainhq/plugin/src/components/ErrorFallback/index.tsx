/* eslint-disable no-restricted-globals */
import React from 'react';
import styles from './fallback.module.css';
import { Button, Text, Icons } from '@/components';

export const ErrorFallback = () => {
  return (
    <div role="alert" className={styles.container}>
      <Icons name="info" size="xl" />
      <Text variant="body-text-lg">Something went wrong!</Text>
      <Button variant="primary" type="button" onClick={() => location.reload()}>
        Try again
      </Button>
    </div>
  );
};
