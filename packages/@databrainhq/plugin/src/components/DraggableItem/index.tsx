import React from 'react';
import useDrag from '@/hooks/useDrag';
import { UseDragProps } from '@/types';

type DraggableItemProps = UseDragProps & {
  renderItem: (
    DragNodeRef: React.MutableRefObject<any>,
    isDragging?: boolean
  ) => JSX.Element;
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  identifier,
  data,
  renderItem,
  CustomDragPreview,
  modifiers,
  events,
}) => {
  const { DragNodeRef, isDragging } = useDrag({
    identifier,
    data,
    CustomDragPreview,
    modifiers,
    events,
  });
  return renderItem(DragNodeRef, isDragging);
};
