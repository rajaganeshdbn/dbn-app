/* eslint-disable react/forbid-dom-props */
import React, { createContext, useContext, useState } from 'react';
import styles from './tabs.module.css';

type TabsContextType = [
  activeTab: string | number,
  setActiveTab: React.Dispatch<React.SetStateAction<string | number>>,
  variant: 'primary' | 'popoverTabs',
  setTab?: React.Dispatch<React.SetStateAction<string | number>>
];

export const TabsContext = createContext<TabsContextType | []>([]);

type TabsProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'popoverTabs';
  defaultActiveTab?: string | number;
  setTab?: React.Dispatch<React.SetStateAction<string | number>>;
  width?: string;
  className?: string;
};

const Context: React.FC<TabsProps> = ({
  children,
  variant = 'primary',
  defaultActiveTab,
  setTab,
  width = '100%',
  className,
}) => {
  const [activeTab, setActiveTab] = useState<string | number>(
    defaultActiveTab ||
      (children as unknown as any)?.[0].props.children?.[0].props.tabId
  );

  return (
    <TabsContext.Provider value={[activeTab, setActiveTab, variant, setTab]}>
      <div style={{ width }} className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const List: React.FC<{
  children: React.ReactNode;
  width?: string;
  background?: string;
  className?: string;
  headerButton?: React.ReactNode;
}> = ({
  children,
  width = '100%',
  background,
  className = '',
  headerButton,
}) => {
  const [, , variant] = useContext(TabsContext);

  return (
    <div
      className={`
      ${styles.tabList} 
      ${variant === 'primary' && styles.tabListPrimary}
      ${variant === 'popoverTabs' && styles.tabListPopoverTab}
      ${className}
      `}
      style={{ width, background }}
    >
      {children}
      {headerButton}
    </div>
  );
};

type TabProps = {
  children: React.ReactNode;
  tabId: string;
  width?: string;
  grow?: boolean;
  className?: string;
};
const Tab: React.FC<TabProps> = ({
  children,
  tabId,
  width = 'auto',
  grow = false,
  className = '',
}) => {
  const [activeTab, setActiveTab, variant, setTab] = useContext(TabsContext);
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        className={`
        ${
          tabId === activeTab &&
          variant === 'primary' &&
          styles.activeTabPrimary
        }
        ${
          tabId === activeTab &&
          variant === 'popoverTabs' &&
          styles.activePopoverTab
        }
        ${grow && styles.tabGrow} 
        ${styles.tab}
        ${variant === 'primary' && styles.tabPrimary}
        ${variant === 'popoverTabs' && styles.tabPopoverTab}
        ${className}
        `}
        onClick={() => {
          setActiveTab?.(tabId);
          setTab?.(tabId);
        }}
        style={{ width }}
      >
        {children}
      </div>
    </>
  );
};

const Panel: React.FC<{
  children: React.ReactNode;
  tabId: string;
  width?: string;
  className?: string;
}> = ({ children, tabId, width, className }) => {
  const [activeTab] = useContext(TabsContext);
  return (
    <>
      {activeTab === tabId ? (
        <div style={{ width }} className={className}>
          {children}
        </div>
      ) : null}
    </>
  );
};

export const Tabs = { Context, List, Tab, Panel };
