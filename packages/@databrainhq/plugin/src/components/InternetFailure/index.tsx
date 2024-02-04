/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Portal, Text, Button, Icons } from '@/components';
import checkIsOnline from '@/utils/checkIsOnline';

export const InternetFailure = () => {
  const [isOffline, setOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setOffline(true);
    };
    const handleOnline = () => {
      setOffline(false);
    };
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    const interval = setInterval(() => {
      checkIsOnline().then((isOnline) => {
        isOnline ? handleOnline() : handleOffline();
      });
    }, 12000);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Portal>
        {typeof window !== 'undefined' &&
        (!window.navigator.onLine || isOffline) ? (
          <dialog className={styles.dialog}>
            <div className={styles.container}>
              <Button
                variant="tertiary"
                type="button"
                onClick={() => setOffline(false)}
                leftIcon={<Icons name="cross" />}
              />
              <Icons name="not-found" />
              {/* plug in icon */}
              <Text variant="body-text-lg">
                No Internet Connection Detected.
              </Text>
            </div>
          </dialog>
        ) : null}
      </Portal>
    </>
  );
};
