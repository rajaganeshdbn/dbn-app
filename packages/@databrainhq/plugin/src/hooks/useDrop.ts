/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState } from 'react';
import useDragAndDropState from './useDragAndDropState';
import { UseDropProps } from '@/types';

const useDrop = ({ identifier, events, modifiers }: UseDropProps) => {
  const { dndState, setOver, setDropables } = useDragAndDropState();
  const [rect, setRect] = useState<DOMRect | null>(null);

  const [dragStatus, setDragStatus] = useState({
    isDragOver: false,
    isDrop: false,
  });
  const [sortingIndexes, setSortingIndexes] = useState({
    before: -1,
    after: -1,
  });

  const [isEnableDrop, setIsEnableDrop] = useState(true);
  const setDropNodeRef = useRef<any>(null);

  const attributes = {
    'data-type': identifier.accepts?.join('-') ?? '',
    id: `droppable-${identifier.id}`,
    droppable: isEnableDrop ? 'true' : 'false',
  };

  const setAttributes = (dragNode: any) => {
    Object.entries(attributes).forEach(([key, value]) => {
      dragNode.setAttribute(key, value);
    });
  };

  const ArrayElementSwap = (before: number, after: number, list: any[]) => {
    const array = [...list];
    before = before === -1 ? array.length - 1 : before;
    const [removed] = array.splice(before, 1);

    if (after === -1) {
      array.push(removed);
    } else {
      array.splice(after, 0, removed);
    }
    return array;
  };

  const sortList = (
    container: any,
    axis: any,
    sortingType: 'horizontal' | 'vertical'
  ) => {
    const draggableElements = [
      ...container.querySelectorAll(
        '[draggable="true"]:not([aria-grabbed="true"])'
      ),
    ];

    const sorted = draggableElements.reduce(
      (closest, child, index) => {
        const box = child.getBoundingClientRect();
        const offset =
          axis -
          box[sortingType === 'horizontal' ? 'left' : 'top'] -
          box[sortingType === 'horizontal' ? 'width' : 'height'] / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child, index };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY, element: null, index: -1 }
    );

    return sorted;
  };

  const sortListOnBothAxis = (
    container: any,
    axis: any,
    draggedElementDimension: { width: number; height: number }
  ) => {
    const draggableElements = [
      ...container.querySelectorAll('[draggable="true"]'),
    ];

    const grabbedElement = container.querySelector('[aria-grabbed="true"]');

    const { width: draggedWidth, height: draggedHeight } =
      draggedElementDimension;

    const getDraggedCorners = (cursor: any, width: any, height: any) => {
      const centerX = cursor.x - width / 2;
      const centerY = cursor.y - height / 2;
      return [
        { x: centerX, y: centerY },
        { x: centerX + width, y: centerY },
        { x: centerX, y: centerY + height },
        { x: centerX + width, y: centerY + height },
      ];
    };

    const sorted = draggableElements.reduce(
      (closest, element, index) => {
        const box = element.getBoundingClientRect();
        const corners = [
          { x: box.left, y: box.top },
          { x: box.left + box.width, y: box.top },
          { x: box.left, y: box.top + box.height },
          { x: box.left + box.width, y: box.top + box.height },
        ];

        const draggedCorners = getDraggedCorners(
          axis,
          draggedWidth,
          draggedHeight
        );

        let minDistance = Number.POSITIVE_INFINITY;
        let closestIndex = index;
        let closestBasedOnCorner = Number.POSITIVE_INFINITY;
        let closestBasedonCursor = Number.POSITIVE_INFINITY;

        corners.forEach((corner, cornerIndex) => {
          draggedCorners.forEach((draggedCorner) => {
            let distance = Number.POSITIVE_INFINITY;
            closestBasedOnCorner = Math.sqrt(
              (corner.x - draggedCorner.x) ** 2 +
                (corner.y - draggedCorner.y) ** 2
            );
            closestBasedonCursor = Math.sqrt(
              (corner.x - axis.x) ** 2 + (corner.y - axis.y) ** 2
            );

            distance = Math.min(closestBasedOnCorner, closestBasedonCursor);

            if (distance < minDistance) {
              minDistance = distance;
              if (cornerIndex === 1 || cornerIndex === 3) {
                if (grabbedElement !== element) closestIndex = index + 1;
              } else {
                closestIndex = index;
              }
            }
          });
        });

        if (minDistance < closest.minDistance) {
          return {
            minDistance,
            element,
            index: closestIndex,
            closestBasedOnCorner,
            closestBasedonCursor,
          };
        }

        return closest;
      },
      {
        minDistance: Number.POSITIVE_INFINITY,
        element: null,
        index: -1,
        closestBasedOnCorner: 0,
        closestBasedonCursor: 0,
      }
    );

    return sorted;

    // draggableElements.forEach((element, index) => {
    //   if (index === sorted.index) {
    //     element.classList.add('dnd-drag-over');
    //   } else {
    //     element.classList.remove('dnd-drag-over');
    //   }
    // });

    // get the closest element using center of the element
    // Works but as the elements are not square it is not accurate
    // commented for future reference
    // const sorted = draggableElements.reduce(
    //   (closest, element, index) => {
    //     const box = element.getBoundingClientRect();
    //     const elementCenterX = box.left + box.width / 2;
    //     const elementCenterY = box.top + box.height / 2;
    //     const offsetX = axis.x - elementCenterX;
    //     const offsetY = axis.y - elementCenterY;
    //     const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

    //     if (distance < Math.sqrt(closest.offsetX ** 2 + closest.offsetY ** 2)) {
    //       return { offsetX, offsetY, element, index };
    //     }

    //     return closest;
    //   },
    //   {
    //     offsetX: Number.POSITIVE_INFINITY,
    //     offsetY: Number.POSITIVE_INFINITY,
    //     element: null,
    //     index: -1,
    //   }
    // );

    // get the closest element using left and right side of the element
    // does not work but commented for reference
    // const sorted = draggableElements.reduce(
    //   (closest, element, index) => {
    //     const box = element.getBoundingClientRect();
    //     const leftDistance = Math.abs(axis.x - box.left);
    //     const rightDistance = Math.abs(axis.x - (box.left + box.width));

    //     if (
    //       leftDistance < closest.leftDistance &&
    //       leftDistance < rightDistance
    //     ) {
    //       return { leftDistance, element, index };
    //     }
    //     if (rightDistance < closest.rightDistance) {
    //       return { rightDistance, element, index };
    //     }

    //     return closest;
    //   },
    //   {
    //     leftDistance: Number.POSITIVE_INFINITY,
    //     rightDistance: Number.POSITIVE_INFINITY,
    //     element: null,
    //     index: -1,
    //   }
    // );
  };

  useEffect(() => {
    const dropNode = setDropNodeRef.current;
    if (!dropNode) return undefined;
    const containerRect = dropNode.getBoundingClientRect();
    setRect(containerRect);
    setDropables({
      identifier,
      setDropNodeRef,
      events,
      modifiers,
      rect,
      isEnableDrop,
      dragStatus,
    });

    return undefined;
  }, [
    setDropNodeRef.current,
    isEnableDrop,
    dragStatus.isDragOver,
    dragStatus.isDrop,
    JSON.stringify(identifier),
    JSON.stringify(events),
    JSON.stringify(modifiers),
  ]);

  useEffect(() => {
    const dropNode = setDropNodeRef.current;
    setAttributes(dropNode);
    if (!dropNode || !isEnableDrop) {
      return undefined;
    }

    if (
      identifier.accepts?.length &&
      !identifier.accepts.includes(dndState.active?.identifier.type ?? '')
    )
      return undefined;

    const { sorting } = modifiers || {};

    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      setOver({
        identifier,
        setDropNodeRef,
        events,
        modifiers,
        rect,
        isEnableDrop,
        dragStatus,
      });
      events?.onDragEnter?.(event, dndState);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (dndState.active?.modifiers?.highlightDrop?.onDragOver) {
        setDropNodeRef.current.classList.add(
          dndState.active?.modifiers?.highlightDrop?.highlightClass ||
            'dnd-droppable-highlight'
        );
      }
      if (!dragStatus.isDragOver) {
        setDragStatus((prev) => ({ ...prev, isDragOver: true }));
      }
      if (dndState.over === null) {
        setOver({
          identifier,
          setDropNodeRef,
          events,
          modifiers,
          rect,
          isEnableDrop,
          dragStatus,
        });
      }

      if (sorting?.isEnabled && sorting.list?.length) {
        const currentElmIndex =
          dndState.active?.DragNodeRef?.current?.getAttribute(
            'data-dbn-sorting-index'
          );

        let sortedElement = null;

        if (
          sorting.sortingType === 'vertical' ||
          sorting.sortingType === 'horizontal'
        ) {
          sortedElement = sortList(
            dropNode,
            sorting?.sortingType === 'horizontal'
              ? event.clientX
              : event.clientY,
            sorting?.sortingType
          );
        }

        if (sorting.sortingType === 'both-axis') {
          const draggedPreviewRect = document
            .getElementById('CustomDragPreviewContainer')
            ?.getBoundingClientRect();

          sortedElement = sortListOnBothAxis(
            dropNode,
            {
              x: event.clientX,
              y: event.clientY,
            },
            {
              width: draggedPreviewRect?.width ?? 0,
              height: draggedPreviewRect?.height ?? 0,
            }
          );
        }

        const indexes = {
          before: parseInt(currentElmIndex ?? -1, 10),
          after: sortedElement.index,
        };

        if (
          indexes.before !== sortingIndexes.before ||
          indexes.after !== sortingIndexes.after
        ) {
          setSortingIndexes(indexes);
        }
      }

      events?.onDragOver?.(event, dndState);
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      if (dndState.active?.modifiers?.highlightDrop?.onDragOver) {
        setDropNodeRef.current.classList.remove(
          dndState.active?.modifiers?.highlightDrop?.highlightClass ||
            'dnd-droppable-highlight'
        );
      }
      setDragStatus((prev) => ({ ...prev, isDragOver: false }));
      events?.onDragLeave?.(event, dndState);
      setOver(null);
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      // const draggableElements = [
      //   ...setDropNodeRef.current.querySelectorAll(
      //     '[draggable="true"]:not([aria-grabbed="true"])'
      //   ),
      // ];

      // draggableElements.forEach((element) => {
      //   element.classList.remove('dnd-drag-over');
      // });

      const isSelfDrop = setDropNodeRef.current.contains(
        dndState.active?.DragNodeRef?.current
      );

      let dropData: any = {
        ...dndState,
      };

      if (dndState.active?.modifiers?.highlightDrop?.onDragOver) {
        setDropNodeRef.current.classList.remove(
          dndState.active?.modifiers?.highlightDrop?.highlightClass ||
            'dnd-droppable-highlight'
        );
      }

      // eslint-disable-next-line prefer-const
      let { before, after } = sortingIndexes;
      if (sorting?.isEnabled && sorting.list?.length) {
        let list = [...sorting.list];
        if (isSelfDrop) {
          list = ArrayElementSwap(before, after, list);
        } else {
          before = -1;
        }

        dropData = {
          ...dndState,
          sorting: {
            sortedList: list,
            isSelfDrop,
            ArrayElementSwap,
            sortingIndexes: {
              before,
              after,
            },
          },
        };
        if (sorting.isEnabledAutoSort && isSelfDrop) sorting.setList(list);
      }

      setDragStatus((prev) => ({ ...prev, isDrop: true }));

      events?.onDrop?.(event, dropData);
      setOver(null);
    };

    dropNode.addEventListener('dragenter', handleDragEnter);
    dropNode.addEventListener('dragover', handleDragOver);
    dropNode.addEventListener('dragleave', handleDragLeave);
    dropNode.addEventListener('drop', handleDrop);

    return () => {
      dropNode.removeEventListener('dragenter', handleDragEnter);
      dropNode.removeEventListener('dragover', handleDragOver);
      dropNode.removeEventListener('dragleave', handleDragLeave);
      dropNode.removeEventListener('drop', handleDrop);
    };
  }, [
    setDropNodeRef.current,
    identifier,
    isEnableDrop,
    modifiers,
    events,
    sortingIndexes,
  ]);

  useEffect(() => {
    const dragNode = setDropNodeRef.current;
    if (!dragNode) return undefined;

    dragNode.setAttribute('droppable', isEnableDrop ? 'true' : 'false');
    return undefined;
  }, [isEnableDrop]);

  return { dragStatus, isEnableDrop, setIsEnableDrop, setDropNodeRef };
};

export default useDrop;
export { useDrop };
