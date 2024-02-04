import React from 'react';
import styles from './metric-chart.module.css';
import { objectArrayToCsvString } from '@/utils';
import { Icons } from '@/components/Icons';
import { IconConfig } from '@/types';

type CsvDownloadButtonProps = {
  className?: string;
  data: Record<string, string>[];
  fileName: string;
  iconConfig?: IconConfig;
  text?: string;
  icon?: JSX.Element;
};

export const CsvDownloadButton: React.FC<CsvDownloadButtonProps> = ({
  data = [],
  fileName = 'export',
  className,
  iconConfig,
  text = '',
  icon,
}) => {
  return (
    // eslint-disable-next-line
    <a
      href={objectArrayToCsvString(data)}
      download={`${fileName}.csv`}
      className={className ?? styles.csvlink}
      target="_self"
    >
      {icon || (
        <Icons name="table" size={iconConfig?.size} color={iconConfig?.color} />
      )}
      {/* csv-icon */}
      {text}
    </a>
  );
};
