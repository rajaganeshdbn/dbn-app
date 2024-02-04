import React, { PropsWithChildren, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorFallback } from '@/components';
import { ThemeType, applyTheme } from '@/utils';
// import { InternetFailure } from '@/components/InternetFailure';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

type PluginProviderProps = PropsWithChildren & {
  theme?: ThemeType;
};

export const PluginProvider = ({ children, theme }: PluginProviderProps) => {
  useEffect(() => {
    if (!theme || !Object.keys(theme).length) return;
    applyTheme(theme);
  }, [theme]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {/* <InternetFailure /> */}
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
