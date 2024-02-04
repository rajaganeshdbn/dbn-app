import React from 'react';
import { GetIsCanAccessParams } from 'types';
import useAccessControl from 'hooks/useAccessControl';

type AccessControlProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  feature: keyof GetIsCanAccessParams;
  permission: GetIsCanAccessParams[AccessControlProps['feature']][number];
  workspace?: string;
};

const AccessControl = ({
  children,
  fallback,
  feature,
  permission,
  workspace,
}: AccessControlProps) => {
  const { getIsCanAccess } = useAccessControl();
  if (!getIsCanAccess(feature, permission, workspace)) return <>{fallback}</>;
  return <>{children}</>;
};

export default AccessControl;
