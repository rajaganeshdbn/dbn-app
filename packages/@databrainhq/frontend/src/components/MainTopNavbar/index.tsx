/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable import/no-relative-parent-imports */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-children-prop */
import { Ui } from '@databrainhq/plugin';
import { NavLink } from 'react-router-dom';
import AccessControl from 'components/AccessControl';
import { getCurrentUser } from 'helpers/application/auth';
import databrainLogo from '../../assets/BrandLogo/databrain-dark-full.svg';
import styles from './mainTopNav.module.css';
import { TopNavbarItem } from './TopNavbarItem';

type Props = {
  workspaceId?: string;
};

export const MainTopNavbar = ({ workspaceId }: Props) => {
  const loggedUser = getCurrentUser();

  return (
    <nav className={styles.navContainer}>
      <div className="dbn-flex dbn-gap-3">
        <NavLink to="/" className="dbn-flex dbn-items-center">
          <Ui.Button variant="tertiary">
            <img src={databrainLogo} alt="" width="115px" height="18px" />
          </Ui.Button>
        </NavLink>

        <ul className="dbn-flex dbn-gap-3">
          <li>
            <TopNavbarItem to={`/?wid=${workspaceId}`} title="Home" />
          </li>
          <AccessControl feature="datasources" permission="View">
            <li>
              <TopNavbarItem to="/datasources" title="Datasources" />
            </li>
          </AccessControl>
          <li>
            <TopNavbarItem to="/settings/me" title="Settings" />
          </li>
        </ul>
      </div>

      <div className="dbn-h-full dbn-flex dbn-items-center">
        <Ui.PopoverMenu
          offset={[-15, 18]}
          position="bottom-end"
          menuWidth="auto"
          buttonContent={
            <Ui.Button
              variant="tertiary"
              rightIcon={<Ui.Icons name="chevron-down" />}
            >
              <span className="dbn-w-8 dbn-h-8 dbn-bg-info/70 dbn-grid dbn-place-content-center dbn-rounded-full">
                <Ui.Text
                  variant="body-text-sm"
                  color="white"
                  children={`${loggedUser?.firstName[0]}${loggedUser?.lastName[0]}`}
                />
              </span>
              <span className="dbn-flex dbn-flex-col dbn-text-left dbn-w-auto dbn-truncate">
                <Ui.Text
                  variant="btn"
                  children={`${loggedUser?.firstName} ${loggedUser?.lastName}`}
                />
                <Ui.Text
                  variant="body-text-sm"
                  display="inline"
                  color="secondary-dark"
                  children={`${loggedUser?.email}`}
                />
              </span>
            </Ui.Button>
          }
        >
          <div className="dbn-p-1">
            <Ui.Button
              variant="popover"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              <div className="dbn-py-1 dbn-px-2 dbn-rounded-sm hover:dbn-bg-primary hover:dbn-text-white">
                Logout
              </div>
            </Ui.Button>
          </div>
        </Ui.PopoverMenu>
      </div>
    </nav>
  );
};
