import React from 'react';
import styles from './tab.module.css';
import { Button } from '@/components/Button';

type TabProps = {
  options: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  tabText?: string;
};
export const Tab = ({
  options,
  activeTab,
  setActiveTab,
  className = '',
  tabText = '',
}: TabProps) => {
  return (
    <div className={`${styles.tab} ${className}`}>
      {options.map((option) => (
        <div
          className={`${styles.button} ${
            activeTab === option && styles.activeTab
          } ${tabText}`}
        >
          <Button
            variant="popover"
            type="button"
            onClick={() => setActiveTab(option)}
            key={option}
            className="dbn-w-full dbn-flex dbn-items-center dbn-py-2"
          >
            {option}
          </Button>
        </div>
      ))}
    </div>
  );
};
