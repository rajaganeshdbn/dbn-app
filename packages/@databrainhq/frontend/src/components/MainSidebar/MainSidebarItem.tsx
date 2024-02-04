/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import segmentEvent from 'utils/segmentEvent';
import styles from './MainSidebar.module.css';

type SidebarItemProps = NavLinkProps & {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  title?: string;
  menu?: React.ReactElement;
  isCollapsed?: boolean;
  hoverText?: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  children,
  icon,
  title,
  className,
  menu,
  isCollapsed,
  hoverText,
  end,
}) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <li className="dbn-my-2">
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ''} ${className ?? ''}`
        }
        onClick={() => {
          segmentEvent(
            `${hoverText?.toLowerCase()} clicked`,
            {
              path: to,
            },
            'page'
          );
        }}
      >
        <div
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
          className={`dbn-flex dbn-items-center dbn-justify-center ${
            isCollapsed ? 'dbn-text-2xl dbn-w-full' : 'dbn-text-lg'
          }`}
        >
          {icon}
        </div>
        {isHovered && isCollapsed ? (
          <span className="dbn-bg-black dbn-text-white dbn-text-xs dbn-rounded dbn-px-2 dbn-py-0.5 dbn-absolute dbn-left-28 -dbn-translate-x-1/2 dbn-z-1000 dbn-text-center dbn-w-[100px]">
            {hoverText}
          </span>
        ) : null}
        {!isCollapsed && (
          <span className={styles.text}>{title ?? children}</span>
        )}
      </NavLink>
      {!isCollapsed && menu}
    </li>
  );
};

export default SidebarItem;
