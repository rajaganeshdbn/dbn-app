/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import styles from './modal.module.css';
import { Button, Icons, Portal } from '@/components';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  headerTitle?: string;
  customHeader?: JSX.Element;
  enableFullScreenButton?: boolean;
  zIndex?: number;
  icon?: any;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  headerTitle,
  customHeader,
  enableFullScreenButton,
  icon,
  zIndex,
}) => {
  const modalRef = useRef() as React.RefObject<HTMLDivElement>;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMouseUpTarget, setMouseUpTarget] = useState(false);
  const [isMouseDownTarget, setMouseDownTarget] = useState(false);
  const handleMouseUpClick = (e: any) => {
    if (
      // modalRef.current?.contains(
      //   // 'composedPath' in e ? e.composedPath()[0] : (e as MouseEvent).target
      //   e.target
      // )
      e.target.classList.contains(styles.modal)
    ) {
      setMouseUpTarget(true);
    } else {
      setMouseUpTarget(false);
    }
  };
  const handleMouseDownClick = (e: any) => {
    if (
      // modalRef.current?.contains(
      //   // 'composedPath' in e ? e.composedPath()[0] : (e as MouseEvent).target
      //   e.target
      // )
      e.target.classList.contains(styles.modal)
    ) {
      setMouseDownTarget(true);
    } else {
      setMouseDownTarget(false);
    }
  };
  useEffect(() => {
    if (isMouseDownTarget && isMouseUpTarget) {
      onClose();
      setMouseDownTarget(false);
      setMouseUpTarget(false);
    }
  }, [isMouseDownTarget, isMouseUpTarget]);
  return (
    <Portal>
      {isOpen ? (
        <div
          className={styles.modal}
          onMouseDown={handleMouseDownClick}
          onMouseUp={handleMouseUpClick}
          ref={modalRef}
          style={{ zIndex }}
        >
          <div
            className={`${styles.popup} ${
              isFullScreen ? styles.popupFullScreen : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <section className={styles.header}>
              {customHeader || (
                <>
                  <span className={styles.headerTitle}>
                    {icon}
                    {headerTitle}
                  </span>
                  <Button
                    variant="tertiary"
                    type="button"
                    onClick={onClose}
                    leftIcon={<Icons name="cross" />}
                  />
                </>
              )}
            </section>
            <section className={styles.content}>{children}</section>
          </div>
        </div>
      ) : null}
    </Portal>
  );
};
