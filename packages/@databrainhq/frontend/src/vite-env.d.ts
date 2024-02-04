/// <reference types="vite/client" />
export {};

declare global {
  interface Window {
    analytics: any;
    dbn: Record<string, string>;
  }
}
