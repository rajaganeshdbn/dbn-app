/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-dom-props */
import React from 'react';
import styles from './menu.module.css';
import { PopoverMenu, PopoverMenuProps } from '@/components/PopoverMenu';
import { Icons } from '@/components/Icons';

export type MenuItem = {
  name: string;
  content?: React.ReactNode;
  isActive?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: (name: string) => void;
};

export type MenuProps = Pick<
  PopoverMenuProps,
  'position' | 'menuWidth' | 'offset' | 'children'
> & {
  buttonVariant?:
    | 'outlined-text'
    | 'icon'
    | 'text-with-icon'
    | 'outlined-icon'
    | 'outlined-text-with-icon';
  buttonText?: string;
  buttonIcon?: JSX.Element;
  buttonWidth?: string;
  buttonContent?: React.ReactNode;
  items: MenuItem[];
  disableAutoClose?: boolean;
};

const MenuButtonContent = ({
  buttonVariant = 'outlined-text',
  buttonIcon,
  buttonText,
  buttonWidth,
}: Pick<
  MenuProps,
  'buttonVariant' | 'buttonIcon' | 'buttonText' | 'buttonWidth'
>) => {
  if (buttonVariant === 'icon')
    return (
      <div className={styles.normal} style={{ width: buttonWidth }}>
        {buttonIcon || <Icons name="chevron-down" size="xl" />}
      </div>
    );

  if (buttonVariant === 'outlined-icon')
    return (
      <div className={styles.outlined} style={{ width: buttonWidth }}>
        {buttonIcon || <Icons name="chevron-down" size="xl" />}
      </div>
    );

  if (buttonVariant === 'outlined-text-with-icon')
    return (
      <div className={styles.outlined} style={{ width: buttonWidth }}>
        <span className={styles.buttonText}>{buttonText}</span>
        {buttonIcon || <Icons name="chevron-down" size="xl" />}
      </div>
    );

  if (buttonVariant === 'text-with-icon')
    return (
      <div className={styles.normal} style={{ width: buttonWidth }}>
        <span className={styles.buttonText}>{buttonText}</span>
        {buttonIcon || <Icons name="chevron-down" size="xl" />}
      </div>
    );

  return (
    <div className={styles.outlined} style={{ width: buttonWidth }}>
      <span className={styles.buttonText}>{buttonText}</span>
    </div>
  );
};

/**
 * @name Menu - Showing custom actionable list in a popup.
 * @prop buttonVariant - Showing the button variant which triggers the popup.
 * @prop buttonIcon - Icon to show in the button trigger.
 * @prop buttonText - Text to show in the button trigger.
 * @prop items - List of item object to show in the menu popup.
 * @prop menuWidth - Width of the popup menu.
 * @prop offset - Array of x and y position from the button to popup menu.
 * @prop position - Position of the popup menu.
 * @returns JSX to render the menu.
 */
export const Menu = ({
  buttonVariant = 'outlined-text',
  buttonIcon,
  buttonText,
  offset,
  position = 'bottom-start',
  menuWidth,
  buttonWidth,
  buttonContent,
  items,
  children,
  disableAutoClose,
}: MenuProps) => {
  return (
    <PopoverMenu
      buttonContent={
        buttonContent || (
          <MenuButtonContent
            buttonVariant={buttonVariant}
            buttonIcon={buttonIcon}
            buttonText={buttonText}
            buttonWidth={buttonWidth}
          />
        )
      }
      offset={offset}
      position={position}
      menuWidth={menuWidth}
      tabMenu={disableAutoClose}
    >
      <ul className={styles.menu}>
        {items.map((item) => (
          <li
            key={item.name}
            className={`${styles.menuItem} ${
              item.isActive ? styles.activeItem : ''
            }`}
            onClick={() => item.onClick?.(item.name)}
          >
            {item.content || (
              <>
                <span className={styles.menuItemLeftIcon}>{item.leftIcon}</span>
                <span className={styles.menuItemText}>{item.name}</span>
                <span className={styles.menuItemRightIcon}>
                  {item.rightIcon}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
      {children}
    </PopoverMenu>
  );
};
