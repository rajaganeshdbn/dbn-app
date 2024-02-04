import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './sidebarItem.module.css';

const SidebarItem = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  const resolved = useResolvedPath(url);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link to={url}>
      <div
        role="presentation"
        className={`${styles['tab-container']} ${
          match ? styles['tab-active'] : styles['tab-notActive']
        }`}
      >
        <div className={styles['tab-text']}>{children}</div>
      </div>
    </Link>
  );
};

export default SidebarItem;
