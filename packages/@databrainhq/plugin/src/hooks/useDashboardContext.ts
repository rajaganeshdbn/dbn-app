import { createContext, useContext } from 'react';

interface DashboardContextType {
  isLoading: boolean | undefined;
  token: string | undefined;
  error?: string;
  data:
    | {
        token: string;
        companyId: string;
        sharingSettingsId: string | undefined;
        clientId: string | undefined;
        externalDashboardMetrics: any[];
        externalDashboard: any;
        rlsSettings: any | undefined;
        appFilters: any | undefined;
        companyTenancyType: any;
        isAllowedToCreateMetrics: boolean | undefined;
        isAllowedToDeleteMetrics: boolean | undefined;
        isAllowedToUpdateMetrics: boolean | undefined;
        isAllowedToChangeLayout: boolean | undefined;
        isAllowedToEmailReports: boolean | undefined;
        workspace: any;
        adminTheme: any;
        clientSubsetData?: any | undefined;
      }
    | undefined;
}

export const DashboardContext = createContext<DashboardContextType>({
  isLoading: undefined,
  data: undefined,
  token: undefined,
});

export const useDashboardContext = () => useContext(DashboardContext);
