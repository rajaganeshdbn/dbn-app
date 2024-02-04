import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { popoverMenuStateAtom } from '@/components';

type UseOutsideAlerterProps = {
  onOutsideClick: () => void;
  wrapRef: React.RefObject<any>;
  portalRef?: any;
};

export const useOutsideAlerter = ({
  onOutsideClick,
  wrapRef,
  portalRef,
}: UseOutsideAlerterProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isClickOutsideMainContainer =
        wrapRef.current &&
        !wrapRef.current.contains(
          'composedPath' in e ? e.composedPath()[0] : (e as MouseEvent).target
        );

      const isClickOutsidePortalContainer =
        portalRef &&
        !portalRef.contains(
          'composedPath' in e ? e.composedPath()[0] : (e as MouseEvent).target
        );

      if (portalRef) {
        if (isClickOutsideMainContainer && isClickOutsidePortalContainer) {
          onOutsideClick();
        }
      } else if (isClickOutsideMainContainer) {
        onOutsideClick();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [wrapRef, onOutsideClick, portalRef]);
};

type UsePopoverOutsideAlerterProps = {
  wrapRef: React.RefObject<any>;
  portalRef?: any;
  autoCloseParent?: boolean;
};

export const usePopoverOutsideAlerter = ({
  wrapRef,
  portalRef,
  autoCloseParent = false,
}: UsePopoverOutsideAlerterProps) => {
  const [popoverMenuState] = useAtom(popoverMenuStateAtom);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      popoverMenuState?.forEach((popover) => {
        const isClickOutside =
          (popover.popperElement as any)?.contains(
            'composedPath' in e ? e.composedPath()[0] : (e as MouseEvent).target
          ) ||
          (popover.referenceElement as any)?.contains(
            'composedPath' in e ? e.composedPath()[0] : (e as MouseEvent).target
          );

        if (!isClickOutside) {
          const NestedPopoverChild = popoverMenuState.find((itm) => {
            const isNestedChild =
              popover.popperElement?.contains(itm.referenceElement as Node) &&
              (itm.isOpen === true || itm.isMenuOpen === true);

            return autoCloseParent
              ? isNestedChild &&
                  (itm.popperElement as any)?.contains(
                    'composedPath' in e
                      ? e.composedPath()[0]
                      : (e as MouseEvent).target
                  )
              : isNestedChild;
          });

          if (NestedPopoverChild) {
            NestedPopoverChild?.setOpen?.(true);
            NestedPopoverChild?.setMenuOpen?.(true);
          } else {
            popover.setOpen?.(false);
            popover.setMenuOpen?.(false);
          }
        }
      });
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [wrapRef, portalRef, popoverMenuState]);
};
