/* eslint-disable react/forbid-elements */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import styles from './accordion.module.css';
import { Icons, Text } from '@/components';

type AccordionProps = {
  title: string;
  content: React.ReactNode;
  width?: string;
  isOpen?: boolean;
  badge?: React.ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  headerButton?: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  isOpen,
  setIsOpen,
  width,
  badge,
  headerButton,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsActive(isOpen!);
    }
  }, [isOpen]);
  return (
    <div className={styles.accordion} style={{ width }}>
      <div
        className={`${styles.accordionHeader} mt-1`}
        onClick={() => {
          setIsOpen ? setIsOpen(!isActive) : setIsActive(!isActive);
        }}
      >
        <div className={styles.headerContent}>
          <Text variant="heading">{title}</Text>
          {badge}
        </div>
        {headerButton}
        <div className={`${isActive ? styles.chevronUp : styles.chevronDown}`}>
          <Icons name="chevron-down" />
        </div>
      </div>
      {isActive && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

type AccordionV2Props = {
  footer?: React.ReactNode;
  isEnableEditBtn?: boolean;
  editBtnOnClick?: () => void;
} & AccordionProps;

export const AccordionV2: React.FC<AccordionV2Props> = ({
  title,
  content,
  isOpen,
  setIsOpen,
  width,
  badge,
  footer,
  headerButton,
  isEnableEditBtn = true,
  editBtnOnClick,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsActive(isOpen!);
    }
  }, [isOpen]);
  return (
    <>
      <div
        className={styles.accordionV2}
        style={{ width }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`${styles.accordionHeader} ${
            isActive && styles.AccordionExpanded
          }`}
          onClick={() => {
            setIsOpen ? setIsOpen(!isActive) : setIsActive(!isActive);
          }}
        >
          <div className={styles.headerContentV2}>
            <Text variant="heading" children={title} />
            {badge}
            {isEnableEditBtn && (isActive || isHover) ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  editBtnOnClick?.();
                }}
              >
                <Icons name="pencil-simple-line" />
              </div>
            ) : null}
          </div>
          <div className={styles.headerButtons}>
            {isHover || isActive ? headerButton : null}
            <div
              className={`${isActive ? styles.chevronUp : styles.chevronDown}`}
            >
              <Icons name="chevron-down" />
            </div>
          </div>
        </div>
        {isActive && (
          <>
            <div className={styles.accordionContentV2}>{content}</div>
            {footer ? (
              <div className={styles.accordionFooter}>
                <div className={styles.footerContent}>{footer}</div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

type AccordionV3Props = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  content: React.ReactNode;
  headerButton?: React.ReactNode;
  isOpen?: boolean;
  width?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AccordionV3 = ({
  content,
  footer,
  header,
  isOpen,
  width,
  setIsOpen,
  headerButton,
}: AccordionV3Props) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isHover] = React.useState(true);
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsActive(isOpen!);
    }
  }, [isOpen]);
  return (
    <>
      <div
        className={styles.accordionV3}
        style={{ width }}
        // onMouseEnter={() => setIsHover(true)}
        // onMouseLeave={() => setIsHover(false)}
      >
        <button
          className={`${styles.accordionHeaderV3} ${
            isActive && styles.accordionExpandedV3
          }`}
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(!isActive);
            } else {
              setIsActive(!isActive);
            }
          }}
          type="button"
        >
          <div className={styles.headerContentV3}>{header}</div>
          <div className={styles.headerButtons}>
            {isHover || isActive ? headerButton : null}
            <div
              className={`${isActive ? styles.chevronUp : styles.chevronDown}`}
            >
              <Icons name="chevron-down" />
            </div>
          </div>
        </button>
        {isActive && (
          <>
            <div className={styles.accordionContentV3}>{content}</div>
            {footer && (
              <div className={styles.accordionFooter}>
                <div className={styles.footerContent}>{footer}</div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
