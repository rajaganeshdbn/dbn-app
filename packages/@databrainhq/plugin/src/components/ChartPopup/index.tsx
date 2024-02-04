/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import React, { useEffect, useRef, useState } from 'react';
import styles from './chartpopup.module.css';
import UnderlyingData from './components/UnderlyingData';
import { useOutsideAlerter } from '@/hooks';
import { Button, Text, Icons } from '@/components';

import { ClickActionsConfig, GetUnderlyingData } from '@/types';
import { handleChartClick } from '@/helpers/cardActions';
import {
  getPopoverPosition,
  setPopoverPosition,
} from '@/utils/popoverPosition';

export type ChartPopupProps = React.PropsWithChildren & {
  getUnderlyingData: GetUnderlyingData;
  value: any;
  columnName: string | undefined;
  menuClass?: string;
  menuContainerClass?: string;
  isOpen: boolean;
  clickBehaviourConfigs: ClickActionsConfig['chart'];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  elementRef?: {
    containerRef: React.RefObject<HTMLDivElement>;
    event: any;
  };
  isSingleValueChart: boolean;
  position?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'left-bottom-end'
    | 'right-bottom-end'
    | 'left-top-end'
    | 'right-top-end'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'left-bottom'
    | 'left-top'
    | 'right-bottom'
    | 'right-top'
    | 'center'
    | 'dynamic';
};
export const ChartPopup = ({
  position = 'center',
  menuContainerClass,
  menuClass,
  isOpen,
  setOpen,
  value,
  columnName,
  getUnderlyingData,
  clickBehaviourConfigs,
  elementRef,
  isSingleValueChart,
}: ChartPopupProps) => {
  const [isShowUnderlyingData, setShowUnderlyingData] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    wrapRef: wrapperRef,
    onOutsideClick: () => setOpen(false),
  });

  useEffect(() => {
    if (!elementRef || position !== 'dynamic') return;
    const { containerRef, event } = elementRef;
    const e: any = event;

    if (!containerRef.current || !wrapperRef.current || !e) return;
    const parentDimension = containerRef.current.getBoundingClientRect();
    const popupDimension = wrapperRef.current.getBoundingClientRect();
    const [x, y] = getPopoverPosition(e, parentDimension, popupDimension);
    setPopoverPosition(wrapperRef.current, x, y);
  }, [elementRef, isOpen, position]);

  return (
    <>
      {!isSingleValueChart ? (
        <>
          <div
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            ref={wrapperRef}
            className={`${position === 'dynamic' && styles.popupContainer}`}
          >
            <div
              className={`${styles.popover} ${
                position === 'dynamic' || styles[position]
              }  ${menuContainerClass}`}
            >
              {isOpen && (
                <div className={`${styles.menu} ${menuClass}`}>
                  <div className={styles.chartpopup}>
                    <Button
                      variant="tertiary"
                      type="button"
                      onClick={() => {
                        setShowUnderlyingData(true);
                      }}
                    >
                      <Icons name="arrow-down" /> {/* view underlying data */}
                      <Text variant="body-text-sm">View underlying data</Text>
                    </Button>
                    {clickBehaviourConfigs.isEnable && (
                      <Button
                        variant="tertiary"
                        type="button"
                        onClick={() => {
                          handleChartClick(
                            clickBehaviourConfigs,
                            value || 'undefined'
                          );
                        }}
                      >
                        <Icons name="link" />
                        {/* Go to icon */}
                        <Text variant="body-text-sm">Go to</Text>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <UnderlyingData
            isShowUnderlyingData={isShowUnderlyingData}
            setShowUnderlyingData={setShowUnderlyingData}
            columnName={columnName}
            value={value}
            getUnderlyingData={getUnderlyingData}
            isSingleValueChart={isSingleValueChart}
          />
        </>
      ) : (
        <UnderlyingData
          isShowUnderlyingData={isOpen}
          setShowUnderlyingData={setOpen}
          columnName={columnName}
          value={value}
          getUnderlyingData={getUnderlyingData}
          isSingleValueChart={isSingleValueChart}
        />
      )}
    </>
  );
};

export default React.memo(ChartPopup);
