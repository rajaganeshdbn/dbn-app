/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-dom-props */
import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import type { Placement } from '@popperjs/core';
import { atom, useAtom } from 'jotai';
import styles from './PopoverMenu.module.css';
import { Portal } from '@/components';
import { usePopoverOutsideAlerter } from '@/hooks';
import { Colors } from '@/types';
import { isInViewport } from '@/helpers';

type PopoverMenuStateProp = {
  id: string;
  isOpen?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  popperElement?: Node | HTMLDivElement | null;
  referenceElement?: Node | HTMLDivElement | null;
};

export const popoverMenuStateAtom = atom<PopoverMenuStateProp[]>([]);

export type PopoverMenuProps = React.PropsWithChildren & {
  buttonContent: React.ReactNode;
  isDisabled?: boolean;
  position?: Placement;
  buttonWidth?: string;
  menuWidth?: string;
  offset?: [number, number];
  overFlowDetection?: boolean;
  tabMenu?: boolean;
  bgColor?: Colors;
  autoCloseParent?: boolean;
  getIsOpen?: (isOpen: boolean) => void;
  isClearEnabled?: boolean;
  isMenuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopoverMenu: React.FC<PopoverMenuProps> = ({
  children,
  buttonContent,
  position = 'auto',
  isDisabled,
  menuWidth = '208px',
  offset = [0, 10],
  overFlowDetection = true,
  tabMenu = false,
  bgColor = 'white',
  autoCloseParent = false,
  buttonWidth = 'auto',
  getIsOpen,
  isClearEnabled,
  isMenuOpen,
  setMenuOpen,
}) => {
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [popperPosition, setPopperPosition] = useState<Placement>(position);
  const [, setPopoverMenuState] = useAtom(popoverMenuStateAtom);
  const [popoverId] = useState<string>(Math.random().toString(36).substring(7));
  const [menuWidthState, setMenuWidthState] = useState<string>(menuWidth);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: popperPosition,
      modifiers: [
        { name: 'offset', options: { offset } },
        overFlowDetection
          ? {
              name: 'flip',
              options: {
                fallbackPlacements: [
                  'top-start',
                  'top-end',
                  'bottom-start',
                  'bottom-end',
                  'right-start',
                  'right-end',
                  'left-start',
                  'left-end',
                  'auto',
                ],
              },
            }
          : {},
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            tether: false,
            padding: 10,
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (popperElement) {
      if (!isInViewport(popperElement)) {
        setPopperPosition('auto');
      }
    }
    if (isOpen || isMenuOpen) {
      setPopoverMenuState((prev) => {
        const popover = prev.find(
          (popoverMenu) => popoverMenu.id === popoverId
        );
        return popover
          ? prev.map((popoverMenu) => {
              if (popoverMenu.id === popoverId) {
                return {
                  ...popoverMenu,
                  isOpen,
                  setOpen,
                  isMenuOpen,
                  setMenuOpen,
                  popperElement,
                  referenceElement,
                };
              }
              return popoverMenu;
            })
          : [
              ...prev,
              {
                id: popoverId,
                isOpen,
                setOpen,
                isMenuOpen,
                setMenuOpen,
                popperElement,
                referenceElement,
              },
            ];
      });
    }

    return () => {
      setPopoverMenuState((prev) =>
        prev.filter((popover) => popover.id !== popoverId)
      );
    };
  }, [isOpen, popoverId, popperElement, referenceElement, isMenuOpen]);

  useEffect(() => {
    if (menuWidth === '100%') {
      setMenuWidthState(`${referenceElement?.clientWidth}px`);
    }
  }, [referenceElement?.clientWidth]);

  useEffect(() => {
    if (getIsOpen) getIsOpen(isOpen);
  }, [isOpen]);

  const popoverStyle = {
    width: menuWidthState,
    ...popperStyles.popper,
  };

  usePopoverOutsideAlerter({
    wrapRef: wrapperRef,
    portalRef: popperElement,
    autoCloseParent,
  });

  const popoverStyles = [styles[`bg-${bgColor}`], styles.menu].join(' ');

  return (
    <>
      <div className={styles.container} tabIndex={-1} ref={wrapperRef}>
        <div
          role="button"
          tabIndex={-1}
          onKeyDown={() => {}}
          className={`${isOpen ? styles.buttonOpen : ''} ${styles.button}`}
          style={{ width: buttonWidth }}
          onClick={() =>
            !isDisabled && !isClearEnabled && setOpen((prev) => !prev)
          }
          ref={setReferenceElement}
        >
          {buttonContent}
        </div>
        {!isDisabled && (isMenuOpen || isOpen) ? (
          <Portal>
            <div
              role="button"
              id={styles.popperMenu}
              tabIndex={0}
              onKeyDown={() => {}}
              className={styles.popover}
              style={popoverStyle}
              ref={setPopperElement}
              {...attributes.popper}
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                className={popoverStyles}
                onClick={(e: any) => {
                  const closePopover = e.target.closest('[data-closepopover]')
                    ?.attributes?.['data-closepopover']?.value;
                  if (e.target?.tagName !== 'INPUT' && !tabMenu) {
                    setOpen(false);
                    setMenuOpen?.(false);
                  }
                  if (closePopover) {
                    setOpen(false);
                    setMenuOpen?.(false);
                  }
                  if (closePopover === 'remainOpen') {
                    setOpen(true);
                    setMenuOpen?.(true);
                  }
                }}
              >
                {children}
              </div>
            </div>
          </Portal>
        ) : null}
      </div>
    </>
  );
};
