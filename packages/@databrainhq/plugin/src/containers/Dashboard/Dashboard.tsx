/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { EmbeddedDashboard } from './EmbededDashboard';
import DashboardProvider from './DashboardProvider';
import { PluginProvider } from '@/containers/PluginProvider';
import { ThemeType } from '@/utils/theme';
import 'simplebar-react/dist/simplebar.min.css';
import '@/index.css';
import { AdminThemeOptionsType } from '@/types';
import DbnStyles from '@/containers/DbnStyles';

/**
 * token - The client based guest token (required).
 * dashboardId - The id of the dashboard you want to see.
 * options - Access permissions and customization.
 * disableMetricCreation - boolean value to enable or disable metric creation
 * disableMetricUpdation - boolean value to enable or disable metric updation
 * disableMetricDeletion - boolean value to enable or disable metric deletion
 * disableScheduleEmailReports - boolean value to enable or disable schedule email reports
 * disableLayoutCustomization - boolean value to enable or disable dashboard layout customization
 * disableSaveLayout - boolean value to enable or disable to save layout
 * chartColors - array of colors where each color should be a valid color string e.g. color name, rgb value, hex value, etc.
 * theme - Theme customization.
 * isHideChartSettings - Whether to hide chart settings in full screen view.
 * isHideTablePreview - Whether to hide table preview in full screen view.
 */
export interface DashboardProps extends HTMLAttributes<HTMLElement> {
  token: string;
  dashboardId?: string;
  options?: {
    disableMetricCreation?: boolean;
    disableMetricUpdation?: boolean;
    disableMetricDeletion?: boolean;
    disableLayoutCustomization?: boolean;
    disableSaveLayout?: boolean;
    disableScheduleEmailReports?: boolean;
    chartColors?: string[];
  };
  theme?: ThemeType;
  isHideChartSettings?: boolean;
  isHideTablePreview?: boolean;
  enableDownloadCsv?: boolean;
  enableEmailCsv?: boolean;
  enableMultiMetricFilters?: boolean;
  disableFullscreen?: boolean;
  optionsIcon?: 'kebab-menu-vertical' | 'download';
  adminThemeOptions?: AdminThemeOptionsType;
  customMessages?: {
    tokenExpiry?: string;
  };
  themeName?: string;
}

/**
 * @name Dashboard - A react component to display the dashboard.
 * @prop {string} token - A client based guest token.
 * @prop {string} dashboardId (optional) - A dashboard id (one which you have provided at the time of creating it) of the dashboard you want to see.
 * @prop {object} options (optional) - Additional options like access permissions e.g. metric creation, updation, archiving and layout customization.
 * @prop {boolean} isHideChartSettings (optional) - Whether to hide chart settings in full screen view.
 * @prop {boolean} isHideChartSettings (optional) - Whether to hide chart settings in full screen view.
 * @prop {boolean} enableDownloadCsv (optional) - Whether to show download csv option in metric card.
 * @prop {boolean} enableEmailCsv (optional) - Whether to show email csv option in metric card.
 * @prop {boolean} enableMultiMetricFilters (optional) - Whether to allow multiple metric filters in metric card.
 * @prop {object} theme (optional) - A theme object to customize the theme.
 */
export const Dashboard = ({
  token,
  options,
  theme,
  dashboardId,
  isHideChartSettings,
  isHideTablePreview,
  enableDownloadCsv,
  enableEmailCsv,
  enableMultiMetricFilters,
  disableFullscreen,
  optionsIcon,
  adminThemeOptions,
  customMessages,
  themeName,
}: DashboardProps) => {
  const [adminTheme, setAdminTheme] = useState<AdminThemeOptionsType>();
  useEffect(() => {
    if (adminThemeOptions?.general.name) {
      setAdminTheme(adminThemeOptions);
    }
  }, [adminThemeOptions]);
  return (
    <>
      <DbnStyles componentName="dashboard" adminTheme={adminTheme} />
      <PluginProvider theme={theme}>
        <DashboardProvider token={token} dashboardId={dashboardId}>
          <EmbeddedDashboard
            options={{
              ...options,
              isHideChartSettings,
              isHideTablePreview,
              enableDownloadCsv,
              enableEmailCsv,
              enableMultiMetricFilters,
              disableFullscreen,
              optionsIcon,
            }}
            setAdminTheme={setAdminTheme}
            theme={theme}
            themeName={themeName}
            adminThemeOption={adminThemeOptions}
            customMessages={customMessages}
            token={token}
            dashboardId={dashboardId}
          />
        </DashboardProvider>
      </PluginProvider>
    </>
  );
};
