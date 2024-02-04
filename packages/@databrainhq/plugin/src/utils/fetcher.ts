import { API_BASE_URL } from '@/consts/api';

type ApiResponse<T> = {
  data: T;
};

type FetcherOptions = {
  method: 'GET' | 'POST';
  token?: string;
  data?: object;
  isFrontend?: boolean;
  clientId?: string;
};

const fetcher = async <T>(
  url: string,
  options: FetcherOptions = { method: 'GET' }
): Promise<ApiResponse<T>> => {
  const requestOptions: RequestInit = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      'X-Plugin-Token': options.token || '',
      'X-Plugin-Origin': window.location.host,
      // api call from frontend
      ...(options.isFrontend ? { 'X-Dbn-Secret': options.clientId } : {}),
    },
  };
  if (options.data) {
    requestOptions.body = JSON.stringify(options.data);
  }
  const res = await fetch(
    `${window.dbn?.baseUrl || API_BASE_URL}${url}`,
    requestOptions
  );

  const json = await res.json();
  if (json.error) {
    const { message } = json.error;

    throw new Error(message);
  }

  return json.data;
};

export default fetcher;
