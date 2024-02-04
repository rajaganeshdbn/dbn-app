/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-dom-props */
import React, { HTMLAttributes, useState } from 'react';
import { EmbeddedMetric } from './EmbeddedMetric';
import styles from './metric.module.css';
import { PluginProvider } from '@/containers/PluginProvider';
import { ThemeType, getValidJson } from '@/utils';
import { AdminThemeOptionsType, MetricFilterOptionsType } from '@/types';
import DbnStyles from '@/containers/DbnStyles';
import { BOTTOM_RIGHT } from '@/consts';

/**
 * token - The client based guest token (required).
 * metricId - The id of the dashboard you want to see.
 * width - The width of the metric card in number.
 * height - The height of the metric card in number.
 * isHideChartSettings - Whether to hide the chart settings in full screen view.
 * isHideTablePreview - Whether to hide the table preview in full screen view.
 * className - The usual className attribute to provide styles.
 * style - The usual style attribute to provide inline styles.
 * chartColors - array of colors where each color should be a valid color string e.g. color name, rgb value, hex value, etc.
 * theme - Theme customization.
 */
export interface MetricProps extends HTMLAttributes<HTMLElement> {
  token: string;
  chartColors?: string[];
  metricId: string;
  variant?: 'card' | 'fullscreen';
  isHideChartSettings?: boolean;
  isHideTablePreview?: boolean;
  enableDownloadCsv?: boolean;
  enableEmailCsv?: boolean;
  onMinimize?: () => void;
  chartRendererType?: 'svg' | 'canvas';
  theme?: ThemeType;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  metricFilterOptions?: MetricFilterOptionsType;
  enableMultiMetricFilters?: boolean;
  metricFilterPosition?: 'outside' | 'inside';
  disableFullscreen?: boolean;
  optionsIcon?: 'kebab-menu-vertical' | 'download';
  customMessages?: {
    tokenExpiry?: string;
  };
  themeName?: string;
  appearanceOptions?: {
    appearanceOptionsPosition?:
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right';
    dynamicBehaviour?: {
      isEnabled?: boolean;
      label?: string;
    };
    cumulativeBar?: {
      isEnabled?: boolean;
      label?: string;
    };
    stackedBars?: {
      isEnabled?: boolean;
      label?: string;
    };
  };
}

/**
 * @name Metric - A react component to display a single metric card.
 * @prop {string} token - A client based guest token.
 * @prop {string} metricId - A metric id (one which you have provided at the time of it's creation) of the metric you want to display.
 * @prop {boolean} isHideChartSettings - Whether to hide the chart settings in full screen view.
 * @prop {boolean} isHideTablePreview - Whether to hide the table preview in full screen view.
 * @prop {boolean} enableDownloadCsv (optional) - Whether to show download csv option in metric card.
 * @prop {boolean} enableEmailCsv (optional) - Whether to show email csv option in metric card.
 * @prop {boolean} enableMultiMetricFilters (optional) - Whether to allow multiple metric filters in metric card.
 * @prop {string} variant (optional) - The variant to render the metric it can be card (fullscreen included) or fullscreen.
 * @prop {object} metricFilterOptions (optional) - An optional metric filter options to be displayed in the metric filters.
 * @prop {function} onMinimize (optional) - An optional callback when minimize button is clicked.
 * @prop {array} chartColors (optional) - An array of colors to be used to visualize the chart.
 * @prop {string} chartRendererType (optional) - Whether to display chart as svg or canvas. In case of low end devices or in general svg is better and in case of frequent data changes or high size data visualization canvas is better. Defaults to canvas.
 * @prop {number} width (optional) - The width of the metric card e.g. 500, 200 etc. will be treated as pixel value.
 * @prop {number} height (optional) - The height of the metric card e.g. 500, 200 etc. will be treated as pixel value.
 * @prop {string} className (optional) - The usual className prop to provide styles.
 * @prop {object} style (optional) - The usual css style prop to provide inline styles.
 * @prop {object} theme (optional) - Theme config object to apply to the UI.
 */
export const Metric = React.memo(
  ({
    theme,
    width,
    height,
    style,
    className = '',
    metricFilterOptions,
    appearanceOptions,
    ...metricProps
  }: MetricProps) => {
    const [adminTheme, setAdminTheme] = useState<AdminThemeOptionsType>();
    return (
      <>
        <DbnStyles componentName="metric" adminTheme={adminTheme} />
        <div
          style={{
            ...style,
            width: width ? `${width}px` : undefined,
            height: height ? `${height}px` : undefined,
          }}
          className={`${styles.metric} ${className} dbn-metric`}
        >
          <PluginProvider theme={theme}>
            <EmbeddedMetric
              {...metricProps}
              appearanceOptions={{
                ...appearanceOptions,
                appearanceOptionsPosition:
                  appearanceOptions?.appearanceOptionsPosition || BOTTOM_RIGHT,
              }}
              setAdminTheme={setAdminTheme}
              metricFilterOptions={
                metricFilterOptions
                  ? getValidJson(metricFilterOptions as unknown as string)
                  : metricFilterOptions
              }
            />
          </PluginProvider>
        </div>
      </>
    );
  }
);
