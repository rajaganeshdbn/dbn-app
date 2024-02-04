/* eslint-disable no-param-reassign */
export const getPopoverPosition = (
  e: any,
  parentDimension: DOMRect,
  popupDimension: DOMRect
): [number, number] => {
  const absX = e.clientX - parentDimension.left + 5;
  const absY = e.clientY - parentDimension.top - 50;

  const maxX = parentDimension.width - popupDimension.width;
  const maxY = parentDimension.height - popupDimension.height;

  const x = Math.max(0, Math.min(absX, maxX));
  const y = Math.max(0, Math.min(absY, maxY));

  return [x, y];
};

export const setPopoverPosition = (
  popoverDiv: HTMLDivElement,
  x: number,
  y: number
) => {
  popoverDiv.style.left = `${x}px`;
  popoverDiv.style.top = `${y}px`;
};
