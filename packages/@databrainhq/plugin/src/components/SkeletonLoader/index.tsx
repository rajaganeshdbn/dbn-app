import React from 'react';
import styles from './skeletonloader.module.css';

type Props = {
  height?: string;
  className?: string;
  variant?: 'table' | 'card' | 'list';
  tableRows?: number;
};

export const SkeletonLoader = ({
  height = '6',
  className,
  variant,
  tableRows,
}: Props) => {
  if (variant === 'table') {
    const numItems = tableRows || 6;

    const items: any = [];
    for (let i = 0; i < numItems; i += 1) {
      items.push(<div key={i}>Item {i + 1}</div>);
    }
    return (
      <div className="dbn-w-full">
        <table className="dbn-w-full">
          <thead className="dbn-bg-white dbn-border-b dbn-border-secondary dbn-p-2">
            <tr className="dbn-w-full">
              {items.map(() => (
                <th className="dbn-p-4 dbn-border-r dbn-border-secondary dbn-bg-gray">
                  <div
                    className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(() => (
              <tr>
                {items.map(() => (
                  <td className="dbn-p-4">
                    <div
                      className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (variant === 'list') {
    return (
      <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-3">
        <div
          className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
        />
        <div
          className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
        />
        <div
          className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
        />
        <div
          className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
        />
        <div
          className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
        />
      </div>
    );
  }
  return (
    <div
      className={`${styles.shimmer} dbn-bg-gray dbn-rounded-md dbn-w-full dbn-h-${height} ${className}`}
    />
  );
};
