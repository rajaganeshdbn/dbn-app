/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-relative-parent-imports */
import React from 'react';
import styles from './metric-chart.module.css';
import { objectArrayToCsvString } from '@/utils';
import { Icons } from '@/components/Icons';
import { ChartSettingsType } from '@/types';
import { pivotDataTransform } from '@/utils/pivotDataTransform';

type PivotDownloadButtonProps = {
  className?: string;
  data: Record<string, string>[];
  fileName: string;
  iconClass?: string;
  text?: string;
  chartOptions?: ChartSettingsType;
};

export const PivotDownloadButton: React.FC<PivotDownloadButtonProps> = ({
  data = [],
  fileName = 'export',
  className,
  text = '',
  chartOptions,
}) => {
  const dataArr = pivotDataTransform(chartOptions, data);
  return (
    // eslint-disable-next-line
    <a
      href={objectArrayToCsvString(dataArr)}
      download={`${fileName}.csv`}
      className={className ?? styles.csvlink}
      target="_self"
    >
      <Icons name="task-done-file" />
      {/* csv-icon */}
      {text}
    </a>
  );
};
