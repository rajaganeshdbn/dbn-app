import { QueryClient, QueryClientProvider } from 'react-query';
import type { ChildrenProps } from 'types';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const ReactQuerySetting = ({ children }: ChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQuerySetting;
