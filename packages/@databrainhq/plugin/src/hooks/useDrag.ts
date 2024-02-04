// /* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import useDragAndDropState from './useDragAndDropState';
import { UseDragProps } from '@/types';

const useDrag = ({
  identifier,
  data,
  modifiers,
  events,
  CustomDragPreview,
}: UseDragProps) => {
  const { dndState, setActive, setDndState, setDraggables } =
    useDragAndDropState();
  const [isDragging, setIsDragging] = useState(false);
  const [isEnableDrag, setIsEnableDrag] = useState(true);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const DragNodeRef = useRef<any>(null);
  const dragPreviewContainer = useRef<HTMLElement | null>(null);
  const attributes = {
    'data-type': identifier.type || identifier.id,
    id: `draggable-${identifier.id}`,
    role: 'button',
    tabindex: '0',
    draggable: isEnableDrag ? 'true' : 'false',
    'aria-grabbed': 'false',
  };

  const setAttributes = (dragNode: any) => {
    Object.entries(attributes).forEach(([key, value]) => {
      dragNode.setAttribute(key, value);
    });
  };

  const renderCustomDragPreview = () => {
    if (!dragPreviewContainer.current) return undefined;
    dndState.DragPreviewCreateRoot?.render(CustomDragPreview);
    return undefined;
  };

  useEffect(() => {
    if (!CustomDragPreview) return undefined;
    dragPreviewContainer.current = document.getElementById(
      'CustomDragPreviewContainer'
    );

    if (dragPreviewContainer.current === null) {
      dragPreviewContainer.current = document.createElement('div');
      dragPreviewContainer.current.setAttribute(
        'id',
        'CustomDragPreviewContainer'
      );
      document.body.appendChild(dragPreviewContainer.current);
      const DragPreviewCreateRoot = ReactDOM.createRoot(
        dragPreviewContainer.current
      );
      setDndState((prev) => ({ ...prev, DragPreviewCreateRoot }));
    }

    return undefined;
  }, []);

  useEffect(() => {
    if (DragNodeRef.current) {
      const containerRect = DragNodeRef.current.getBoundingClientRect();
      setRect(containerRect);
      setDraggables({
        identifier,
        data,
        modifiers,
        DragNodeRef,
        rect,
        events,
        isDragging,
        isEnableDrag,
      });
    }
  }, [
    DragNodeRef.current,
    JSON.stringify(identifier),
    JSON.stringify(data),
    JSON.stringify(modifiers),
    JSON.stringify(events),
    JSON.stringify(isDragging),
  ]);

  useEffect(() => {
    const dragNode = DragNodeRef.current;
    if (!dragNode) return undefined;

    setAttributes(dragNode);

    const handleDragStart = (event: DragEvent) => {
      setIsDragging(true);
      setActive({
        identifier,
        data,
        modifiers,
        DragNodeRef,
        rect,
        events,
        isDragging,
        isEnableDrag,
      });
      dragNode.setAttribute('aria-grabbed', 'true');

      event.dataTransfer?.setData('text/plain', JSON.stringify({ data }));
      events?.onDragStart?.(event, dndState);

      if (dragPreviewContainer.current) {
        const containerDimension =
          dragPreviewContainer.current.getBoundingClientRect();
        event.dataTransfer?.setDragImage(
          dragPreviewContainer.current,
          containerDimension.width / 2,
          containerDimension.height / 2
        );
      }
    };

    const handleDragEnd = (event: DragEvent) => {
      dragNode.setAttribute('aria-grabbed', 'false');
      setIsDragging(false);
      setActive(null);
      events?.onDragEnd?.(event, dndState);
    };

    dragNode.addEventListener('mousedown', () => {
      if (CustomDragPreview) renderCustomDragPreview();
    });
    dragNode.addEventListener('dragstart', handleDragStart);
    dragNode.addEventListener('dragend', handleDragEnd);

    return () => {
      dragNode.removeEventListener('dragstart', handleDragStart);
      dragNode.removeEventListener('dragend', handleDragEnd);
    };
  }, [
    DragNodeRef.current,
    JSON.stringify(identifier),
    JSON.stringify(data),
    dndState.DragPreviewCreateRoot,
  ]);

  useEffect(() => {
    const dragNode = DragNodeRef.current;
    if (!dragNode) return undefined;

    dragNode.setAttribute('draggable', isEnableDrag ? 'true' : 'false');
    return undefined;
  }, [isEnableDrag]);

  useEffect(() => {
    let droppableElements: HTMLElement[] = [];
    if (isDragging) {
      setActive({
        identifier,
        data,
        modifiers,
        DragNodeRef,
        rect,
        events,
        isDragging,
        isEnableDrag,
      });

      if (modifiers?.highlightDrop?.onDrag) {
        droppableElements =
          dndState.droppables
            ?.filter((droppable) => {
              const accepts = droppable?.identifier.accepts ?? [];
              return (
                accepts.includes(identifier.type ?? '') &&
                droppable?.isEnableDrop
              );
            })
            .map((droppable) => droppable?.setDropNodeRef.current) ?? [];

        if (modifiers?.highlightDrop?.onDrag) {
          droppableElements.forEach((element) => {
            element.classList.add(
              modifiers?.highlightDrop?.highlightClass ||
                'dnd-droppable-highlight'
            );
          });
        }
      }
    }

    return () => {
      droppableElements.forEach((element) => {
        element.classList.remove(
          modifiers?.highlightDrop?.highlightClass || 'dnd-droppable-highlight'
        );
      });
    };
  }, [isDragging]);

  return { isDragging, isEnableDrag, setIsEnableDrag, DragNodeRef };
};

export default useDrag;
export { useDrag };
