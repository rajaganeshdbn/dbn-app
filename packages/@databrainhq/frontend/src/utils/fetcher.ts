/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/prefer-default-export */
import { isTokenAvailable } from 'atoms/application';
import { useAtom } from 'jotai';
import { getToken } from 'helpers/application/auth';
import tokenValidation from 'helpers/application/tokenValidation';
/* eslint-disable @typescript-eslint/naming-convention */
const selfHostedUrl = () =>
  `${window.location.protocol}//${window.location.hostname}:8082/v1/graphql`;
const VITE_HASURA_ENDPOINT =
  import.meta.env.VITE_HASURA_ENDPOINT || selfHostedUrl();

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  return async () => {
    let token = getToken();
    if (token) {
      const isInvalid = tokenValidation(token);
      if (isInvalid) {
        localStorage.clear();
        token = null;
      }
    }
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${getToken()}` } : {}),
    };
    const res = await fetch(VITE_HASURA_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};

export const useFetcher = <TData, TVariables>(
  query: string
  // options?: RequestInit['headers']
): (() => Promise<TData>) => {
  const [, setTokenAvailable] = useAtom(isTokenAvailable);
  return async (variables?: TVariables) => {
    let token = getToken();
    if (token) {
      const isInvalid = tokenValidation(token);
      if (isInvalid) {
        localStorage.clear();
        setTokenAvailable(false);
        token = null;
      }
    }
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${getToken()}` } : {}),
    };
    const res = await fetch(VITE_HASURA_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};
