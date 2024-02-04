/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import jwtDecode from 'jwt-decode';
import { UserType } from 'types/auth';

export interface DecodedToken {
  user?: UserType;
  exp: number;
  role: string;
  'https://hasura.io/jwt/claims':
    | Record<string, string | string[] | undefined>
    | undefined;
}

const tokenValidation = (token: string): boolean => {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const user = decodedToken?.user;
    const companyId =
      decodedToken?.['https://hasura.io/jwt/claims']?.['X-Hasura-Company-Id'];
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime || !user || !companyId;
  } catch {
    return true;
  }
};

export default tokenValidation;
