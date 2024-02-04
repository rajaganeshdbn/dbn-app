import { atom, useAtom } from 'jotai';
import { DndStateProp } from '@/types';

const DnDStateAtom = atom<DndStateProp>({
  active: null,
  over: null,
  DragPreviewCreateRoot: null,
  draggables: [],
  droppables: [],
});

const useDragAndDropState = () => {
  const [dndState, setDndState] = useAtom(DnDStateAtom);

  const setActive = (active: DndStateProp['active']) => {
    setDndState((prev) => ({ ...prev, active }));
  };

  const setOver = (over: DndStateProp['over']) => {
    setDndState((prev) => ({ ...prev, over }));
  };

  const setDraggables = (draggable: DndStateProp['active']) => {
    setDndState((prev) => {
      const draggableIndex = prev.draggables?.findIndex(
        (item) => item?.identifier.id === draggable?.identifier.id
      );
      if (draggableIndex === -1) {
        return {
          ...prev,
          draggables: [...prev.draggables!, draggable],
        };
      }
      const list = [...prev.draggables!];
      list[draggableIndex!] = draggable;
      return {
        ...prev,
        draggables: list,
      };
    });
  };

  const setDropables = (droppable: DndStateProp['over']) => {
    setDndState((prev) => {
      const droppableIndex = prev.droppables?.findIndex(
        (item) => item?.identifier.id === droppable?.identifier.id
      );
      if (droppableIndex === -1) {
        return {
          ...prev,
          droppables: [...prev.droppables!, droppable],
        };
      }
      const list = [...prev.droppables!];
      list[droppableIndex!] = droppable;
      return {
        ...prev,
        droppables: list,
      };
    });
  };

  return {
    dndState,
    setActive,
    setOver,
    setDraggables,
    setDropables,
    setDndState,
  };
};

export default useDragAndDropState;
