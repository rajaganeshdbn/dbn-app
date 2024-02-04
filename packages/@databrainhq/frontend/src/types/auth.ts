import { CompanyRoles } from 'utils/generated/graphql';

export type UserType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  id: string;
  companyId: string;
  workspaceId: string;
  isAdmin: boolean;
  userRoles: {
    id: string;
    workspaces: string[];
    applyOn: string;
    companyRole: Pick<CompanyRoles, 'id' | 'name' | 'permissions'>;
  }[];
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: any;
  invitedBy?: string | null | undefined;
  isAcceptedInvite?: boolean;
  acceptedInviteAt?: any;
  isAdmin: boolean;
  userRoles: {
    id: string;
    workspaces: string[];
    applyOn: string;
    companyRole: Pick<CompanyRoles, 'id' | 'name' | 'permissions'>;
  }[];
};
