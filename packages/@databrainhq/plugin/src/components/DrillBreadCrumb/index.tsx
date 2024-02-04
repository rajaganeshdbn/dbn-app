/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styles from './drillBreadCrumb.module.css';
import { Button } from '@/components/Button';

export const DrillBreadCrumb = ({
  dimensions,
  drilledLevel,
  onResetLevel,
  onDrillLevelClick,
  isMetricCard,
  isMetricFilter,
  drillType,
  drillFilters,
  isShowBreadCrumb,
}: {
  dimensions: string[];
  drilledLevel: number;
  onResetLevel: () => void;
  onDrillLevelClick: (value: number) => void;
  isMetricCard?: boolean;
  isMetricFilter?: boolean;
  drillType?: string;
  drillFilters?: { columnName: string; value: any }[];
  isShowBreadCrumb?: boolean;
}) => {
  return (
    <div
      className={`${styles['dbc-container']} ${
        drilledLevel === -1
          ? isMetricCard
            ? isMetricFilter
              ? styles.dbcLastMetricCardLevel
              : styles.dbcLastCardLevel
            : styles.dbcLastLevel
          : ''
      }`}
    >
      {drillType === 'table' ? (
        drillFilters?.length ? (
          <Button
            variant="popover"
            className="dbn-px-2 dbn-text-xs"
            type="button"
            onClick={onResetLevel}
          >
            Reset
          </Button>
        ) : null
      ) : drilledLevel === -1 ? (
        <Button
          variant="popover"
          className="dbn-px-2 dbn-text-xs"
          type="button"
          onClick={onResetLevel}
        >
          Reset
        </Button>
      ) : (
        isShowBreadCrumb && (
          <>
            {dimensions.map((dimension, index) => (
              <span
                className={`
                ${
                  index === drilledLevel
                    ? styles['active-dimension']
                    : styles.otherLevels
                }
                ${
                  drilledLevel - 1 !== index
                    ? styles.disabledLevel
                    : styles.clickableLevels
                }
              `}
                key={dimension}
                onClick={() => {
                  if (drilledLevel - 1 !== index) return;
                  onDrillLevelClick(index);
                }}
              >
                {dimension.toString()[0].toUpperCase() +
                  dimension.toString().substring(1)}
                {index === dimensions.length - 1 ? '' : ' / '}
              </span>
            ))}
          </>
        )
      )}
    </div>
  );
};

export default DrillBreadCrumb;
