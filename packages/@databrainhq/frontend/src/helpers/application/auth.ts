/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import jwtDecode from 'jwt-decode';
import { UserType } from 'types/auth';
import { TOKEN, USER } from 'consts/application';
import { DecodedToken } from './tokenValidation';

export type LoginResponse = {
  data: {
    email: string;
    onboarding_complete: boolean;
  };
  headers: {
    authorization: string;
  };
};

export const isLoggedIn = () => !!localStorage.getItem(TOKEN);
export const getToken = () => localStorage.getItem(TOKEN);
export const clearToken = () => localStorage.removeItem(TOKEN);

export const getCurrentUser = (newToken?: string): UserType | null => {
  const token = newToken || getToken();
  if (!token) return null;
  const decodedData = jwtDecode(token) as DecodedToken;
  return decodedData?.user ?? null;
};

export const setCurrentUser = (response: Omit<UserType, 'username'>) => {
  const user = {
    firstName: response.firstName,
    lastName: response.lastName,
    id: response.id,
    username: `${response.firstName} ${response.lastName}`,
    companyId: response.companyId,
    email: response.email,
    userRoles: response.userRoles,
  };

  localStorage.setItem(USER, JSON.stringify(user));
};

export const storeUserToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
