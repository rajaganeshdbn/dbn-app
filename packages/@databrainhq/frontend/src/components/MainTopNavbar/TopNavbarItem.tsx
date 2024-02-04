/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-children-prop */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';

type TopNavItemProps = NavLinkProps & {
  children?: React.ReactNode;
  icon?: React.ReactElement;
  title?: string;
  hoverText?: string;
};

export const TopNavbarItem: React.FC<TopNavItemProps> = ({
  to,
  icon,
  title,
  end,
  children,
}) => {
  const { pathname } = useLocation();
  const isSettingRoute =
    pathname.includes('settings') && (to as string).includes('settings');

  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => {
        return (
          <div
            className={`dbn-h-16 dbn-flex dbn-items-center ${
              isActive || isSettingRoute
                ? 'dbn-border-b-2 dbn-border-primary'
                : ''
            }`}
          >
            {children || (
              <Ui.Button
                leftIcon={icon}
                children={title}
                variant="tertiary"
                className="dbn-w-[100px] dbn-text-base"
              />
            )}
          </div>
        );
      }}
    </NavLink>
  );
};
