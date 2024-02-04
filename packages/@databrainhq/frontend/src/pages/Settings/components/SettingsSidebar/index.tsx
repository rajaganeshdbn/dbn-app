import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Ui } from '@databrainhq/plugin';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';
import style from './settingsHeader.module.css';

const EMBED_SETTING_ROUTES = [
  { name: 'apiTokens', route: 'apiToken' },
  { name: 'uiTheming', route: 'theming' },
  { name: 'scheduledSettings', route: 'scheduledSettings' },
  { name: 'demoConfig', route: 'demoConfig' },
  { name: 'whitelistedDomains', route: 'whitelistDomains' },
] as const;

const SettingsSidebar = () => {
  const { pathname } = useLocation();
  const { getIsCanAccess } = useAccessControl();

  const embedSettingRoutes = useMemo(() => {
    return EMBED_SETTING_ROUTES.filter((route) =>
      getIsCanAccess(route.name, 'View')
    );
  }, []);

  return (
    <div className={style['settings-header']}>
      <div className="dbn-w-full dbn-h-full dbn-flex dbn-flex-col dbn-gap-1">
        <NavLink
          end
          to="/settings/me"
          className={({ isActive }) =>
            `${style.link} ${isActive ? style.active : ''}`
          }
        >
          <Ui.Icons name="profile" />
          <span className={style.text}>My Profile</span>
        </NavLink>
        <AccessControl feature="companyProfile" permission="View">
          <NavLink
            end
            to="/settings/company"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <Ui.Icons name="company" />
            <span className={style.text}>Company Profile</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="users" permission="View">
          <NavLink
            end
            to="/settings/users"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <span className="dbn-relative dbn-top-1">
              <Ui.Icons name="users" />
            </span>
            <span className={style.text}>Users</span>
          </NavLink>
        </AccessControl>
        {embedSettingRoutes.length ? (
          <NavLink
            end
            to={`/settings/embed/${embedSettingRoutes[0].route}`}
            className={({ isActive }) =>
              `${style.link} ${
                isActive || pathname.includes('embed') ? style.active : ''
              }`
            }
          >
            <Ui.Icons name="code" />
            <span className={style.text}>Embed Settings</span>
          </NavLink>
        ) : null}
        <AccessControl feature="metricsStore" permission="View">
          <NavLink
            end
            to="/settings/metricStore"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <Ui.Icons name="preview-file" />
            <span className={style.text}>Metric Store</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="archiveMetrics" permission="View">
          <NavLink
            end
            to="/settings/archiveMetrics"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <Ui.Icons name="archive" />
            <span className={style.text}>Archived Metrics</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="roles" permission="View">
          <NavLink
            end
            to="/settings/roles"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <Ui.Icons name="roles" />
            <span className={style.text}>Roles</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="secrets" permission="View">
          <NavLink
            end
            to="/settings/secrets"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <Ui.Icons name="radar" />
            <span className={style.text}>Secrets</span>
          </NavLink>
        </AccessControl>
      </div>
    </div>
  );
};

export default SettingsSidebar;
