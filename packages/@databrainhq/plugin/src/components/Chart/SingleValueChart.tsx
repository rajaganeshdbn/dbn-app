/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-dom-props */
import React, { useEffect, useMemo, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import styles from './chart.module.css';
import { Icons } from '@/components';
import { handleChartClick } from '@/helpers/cardActions';
import { ClickActionsConfig } from '@/types';

export type SingleValueChartProps = {
  settings?: {
    fontSize?: number;
    subHeaderFontSize?: number;
    subHeaderShow?: boolean;
    displayText?: string;
    comparisonValueFontSize?: number;
    comparisonTimePeriod?: number;
    comparisonTimeGrain?: string;
    comparisonSuffix?: string;
    fontColor?: string;
    suffix?: string;
    prefix?: string;
    conditionalFormatter?: { min: number; max: number; color: string }[];
  };
  value: string | number;
  hideBorder?: boolean;
  chartClickConfig?: ClickActionsConfig['chart'];
  className?: string;
  onChartReady?: () => void;
  comparisonValue?: string;
  trendLineOptions?: any;
  events?: any;
};

/**
 * @name SingleValueChart
 * @prop value - the single value to be displayed
 * @prop settings (optional) - the single value chart specific custom settings
 * @prop chartClickConfig (optional) - the chart click config
 * @prop hideBorder (optional) - a boolean whether to hide the border or not
 * @prop className (optional) - a usual className prop to provide styles
 * @returns JSX - single value containing jsx
 */
const SingleValueChart = ({
  value,
  settings,
  chartClickConfig,
  hideBorder,
  className = '',
  onChartReady,
  comparisonValue,
  trendLineOptions,
  events,
}: SingleValueChartProps) => {
  const [fontColor, setFontColor] = useState<string>('');
  const { valueFont, subHeaderFont, changeVariableFont } = useMemo(() => {
    const subHeaderFontSize = {
      fontSize: `${settings?.subHeaderFontSize || 14}px`,
    };
    const valueFontSize = {
      fontSize: `${settings?.fontSize || 30}px`,
      color: fontColor,
    };
    const comparisonValueFontSize = {
      fontSize: `${settings?.comparisonValueFontSize || 12}px`,
    };
    return {
      valueFont: valueFontSize,
      subHeaderFont: subHeaderFontSize,
      changeVariableFont: comparisonValueFontSize,
    };
  }, [settings?.subHeaderFontSize, settings?.fontSize, fontColor]);

  const isNumeric = (val: string) => {
    return !Number.isNaN(parseFloat(val)) && Number.isFinite(Number(val));
  };

  useEffect(() => {
    if (value || settings) onChartReady?.();
  }, [value, settings]);

  useEffect(() => {
    let isConditionTrue: boolean = false;
    if (settings?.conditionalFormatter?.length && isNumeric(value.toString())) {
      settings.conditionalFormatter.forEach((condition) => {
        if (condition.min <= Number(value) && condition.max >= Number(value)) {
          setFontColor(condition.color);
          isConditionTrue = true;
        }
      });
    }
    if (!isConditionTrue) setFontColor(settings?.fontColor || '#000000');
  }, [settings?.conditionalFormatter, settings?.fontColor]);
  return (
    <div
      className={`${className} ${
        hideBorder ? styles.borderLessContainer : styles.container
      }`}
    >
      <div
        className={styles.valueContainer}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          style={valueFont}
          onClick={events?.contextmenu}
          className={`{$chartClickConfig?.isEnable ? styles.chartClickAction : ''} ${styles.singleValue}`}
        >
          {settings?.prefix}
          {value}
          {settings?.suffix}
        </div>
        <div
          style={subHeaderFont}
          onClick={() => {
            if (chartClickConfig)
              handleChartClick(chartClickConfig, settings?.displayText || '');
          }}
          className={styles.subHeader}
        >
          {settings?.subHeaderShow && settings.displayText}
        </div>
      </div>
      {comparisonValue && !comparisonValue.includes('NaN') && (
        <div className={styles.comparisonDiv}>
          {settings?.comparisonTimePeriod && (
            <span className={styles.comparisonPeriod}>
              vs last {settings.comparisonTimePeriod}{' '}
              {settings.comparisonTimeGrain}
            </span>
          )}
          <div style={changeVariableFont} className={styles.comparisonValue}>
            <span
              style={changeVariableFont}
              className={
                parseFloat(comparisonValue.toString()) > 0
                  ? styles.positiveComparisonText
                  : styles.negativeComparisonText
              }
            >
              {parseFloat(comparisonValue.toString()) > 0 ? (
                <Icons name="arrow-up" />
              ) : (
                <Icons name="arrow-down" />
              )}
              {comparisonValue} {settings?.comparisonSuffix}
            </span>
          </div>
        </div>
      )}
      {comparisonValue &&
        !comparisonValue.includes('NaN') &&
        trendLineOptions && (
          <EChartsReact
            style={{
              width: '100%',
              height: '100%',
            }}
            option={trendLineOptions}
            notMerge
          />
        )}
    </div>
  );
};

export default React.memo(SingleValueChart);
