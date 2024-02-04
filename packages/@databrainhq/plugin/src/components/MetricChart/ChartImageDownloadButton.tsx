/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import EChartsReact from 'echarts-for-react';
import styles from './metric-chart.module.css';
import handleSaveChartImage from '@/utils/getChartImage';
import { Icons } from '@/components/Icons';

type DownloadButtonProps = {
  className?: string;
  iconClass?: string;
  text?: string;
  chartRef: React.RefObject<EChartsReact>;
  fileName?: string;
};
export const ChartImageDownloadButton = ({
  className,
  iconClass,
  fileName = 'chart',
  text,
  chartRef,
}: DownloadButtonProps) => {
  return (
    // eslint-disable-next-line
    <a
      href={handleSaveChartImage(chartRef)}
      download={`${fileName}.png`}
      className={className ?? styles.csvlink}
      target="_self"
    >
      <Icons name="image" />
      {/* download image */}
      {text}
    </a>
  );
};
