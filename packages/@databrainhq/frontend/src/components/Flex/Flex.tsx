import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';

const Flex = ({
  direction = 'row',
  justify = 'start',
  width = 'w-full',
  maxWidth,
  height = 'h-auto',
  className,
  alignItems = null,
  flexWrap = null,
  children,
}: {
  direction?: 'row' | 'col';
  justify?: 'between' | 'around' | 'evenly' | 'center' | 'start' | 'end';
  width?: string;
  maxWidth?: string;
  height?: string;
  className?: string;
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | null;
  flexWrap?: 'wrap' | 'reverse' | 'nowrap' | null;
  children: ReactNode;
}) => {
  const baseClass = 'dbn-flex';

  const JUSTIFY_VARIANT = {
    between: 'dbn-justify-between',
    around: 'dbn-justify-around',
    evenly: 'dbn-justify-evenly',
    center: 'dbn-justify-center',
    start: 'dbn-justify-start',
    end: 'dbn-justify-end',
  };
  const DIRECTION_VARIANT = {
    col: 'dbn-flex-col',
    row: 'dbn-flex-row',
  };

  const WRAP_VARIANT = {
    reverse: 'dbn-flex-wrap-reverse',
    wrap: 'dbn-flex-wrap',
    nowrap: 'dbn-flex-nowrap',
  };
  const ALIGN_VARIANT = {
    start: 'dbn-items-start',
    center: 'dbn-items-center',
    end: 'dbn-items-end',
    baseline: 'dbn-items-baseline',
    stretch: 'dbn-items-stretch',
  };

  const customClass = classNames(
    baseClass,
    className,
    DIRECTION_VARIANT[direction],
    JUSTIFY_VARIANT[justify],
    alignItems ? ALIGN_VARIANT[alignItems] : null,
    `${width}`,
    `${height}`,
    flexWrap ? WRAP_VARIANT[flexWrap] : null,
    maxWidth ? `${maxWidth}` : null
  );

  return <div className={customClass}>{children}</div>;
};

export default React.memo(Flex);
