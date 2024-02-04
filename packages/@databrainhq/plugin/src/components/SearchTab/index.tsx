/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-elements */
import React, { useEffect, useState } from 'react';
import styles from './searchTab.module.css';
import { Icons } from '@/components/Icons';

export const SearchTab = ({
  setSearchKeyword,
  className = '',
  placeholder = 'Search',
}: any) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setSearchKeyword(query.toLowerCase());
  }, [setSearchKeyword, query]);

  return (
    <div className={`${styles['searchTab-container']} ${className}`}>
      <input
        placeholder={placeholder}
        value={query}
        name="search"
        onChange={(e) => setQuery(e.target.value)}
        onClick={(e) => e.preventDefault()}
        className={styles['searchTab-input']}
      />
      <span className={styles.search}>
        <Icons name="magnifying-glass" size="lg" />
      </span>
    </div>
  );
};
