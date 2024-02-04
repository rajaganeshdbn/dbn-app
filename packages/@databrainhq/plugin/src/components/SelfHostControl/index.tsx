import React from 'react';
import { IS_SELF_HOSTED } from '@/consts';

export const SelfHostControl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return IS_SELF_HOSTED ? <></> : <>{children}</>;
};
