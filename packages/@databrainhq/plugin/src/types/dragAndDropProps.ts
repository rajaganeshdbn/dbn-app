export type Modifiers = {
  sorting?: {
    isEnabled: boolean;
    isEnabledAutoSort?: boolean;
    sortingType: 'vertical' | 'horizontal' | 'both-axis';
    list?: any[];
    setList?: any;
  };
};

export type UseDragProps = {
  identifier: {
    id: string;
    type?: string;
  };
  data?: any;
  modifiers?: {
    highlightDrop?: {
      onDrag?: boolean;
      onDragOver?: boolean;
      highlightClass?: string;
    };
  };
  events?: {
    onDragStart?: (event: DragEvent, data: DndStateProp) => void;
    onDragEnd?: (event: DragEvent, data: DndStateProp) => void;
  };
  CustomDragPreview?: any;
};

export type UseDropProps = {
  identifier: {
    id: string;
    accepts?: string[];
  };
  events?: {
    onDragOver?: (event: DragEvent, data: DndStateProp) => void;
    onDragEnter?: (event: DragEvent, data: DndStateProp) => void;
    onDragLeave?: (event: DragEvent, data: DndStateProp) => void;
    onDrop?: (event: DragEvent, data: DndStateProp) => void;
  };
  modifiers?: Modifiers;
};

export type DndStateProp = {
  active:
    | (UseDragProps & {
        DragNodeRef: any;
        isEnableDrag: boolean;
        isDragging: boolean;
        rect: DOMRect | null;
      })
    | null;
  over:
    | (UseDropProps & {
        setDropNodeRef: any;
        isEnableDrop: boolean;
        dragStatus: {
          isDragOver: boolean;
          isDrop: boolean;
        };
        rect: DOMRect | null;
      })
    | null;
  DragPreviewCreateRoot?: any;
  draggables?: DndStateProp['active'][];
  droppables?: DndStateProp['over'][];
  sorting?: {
    sortedList: any[];
    isSelfDrop: boolean;
    ArrayElementSwap: (before: number, after: number, list: any[]) => any[];
    sortingIndexes: {
      before: number;
      after: number;
    };
  };
};
