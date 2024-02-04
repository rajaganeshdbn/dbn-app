import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import styles from "./MainSidebar.module.css";

type SidebarItemProps = NavLinkProps & {
  children?: React.ReactNode;
  menu?: React.ReactElement;
  colors?: {
    text: string;
    highlight: string;
  };
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  children,
  className,
  end,
  menu,
  colors,
}) => {
  return (
    <li className="my-2">
      <NavLink
        style={{ color: `${colors?.text && colors.text}` }}
        to={to}
        end={end}
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""} ${className ?? ""} `
        }
      >
        {children}
      </NavLink>
      {menu}
    </li>
  );
};

export default SidebarItem;
