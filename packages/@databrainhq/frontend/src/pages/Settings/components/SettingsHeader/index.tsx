import { NavLink, useLocation } from 'react-router-dom';
import segmentEvent from 'utils/segmentEvent';
import AccessControl from 'components/AccessControl';
import style from './settingsHeader.module.css';

const SettingsHeader = () => {
  const { pathname } = useLocation();
  const onClick = (to: string, path: string) => {
    segmentEvent(`switched to ${to} settings`, {
      path,
    });
  };

  if (!pathname.includes('embed')) {
    return null;
  }

  return (
    <div className={style['settings-header']}>
      <div className={style['settings-links']}>
        {/* <NavLink
          end
          to="/settings/embed/accessPermissions"
          className={({ isActive }) =>
            `${style.link} ${isActive ? style.active : ''}`
          }
          onClick={() =>
            onClick('access permissions', '/settings/embed/accessPermissions')
          }
        >
          <span className={style.text}>Access Permissions</span>
        </NavLink> */}
        {/* <NavLink
              end
              to="/settings/workspace/cache"
              className={({ isActive }) =>
                `${style.link} ${isActive ? style.active : ''}`
              }
              onClick={() => onClick('cache', '/settings/workspace/cache')}
            >
              <span className={style.text}>Cache</span>
            </NavLink> */}
        <AccessControl feature="apiTokens" permission="View">
          <NavLink
            end
            to="/settings/embed/apiToken"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
            onClick={() => onClick('api token', '/settings/general/apiToken')}
          >
            <span className={style.text}>API Token</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="uiTheming" permission="View">
          <NavLink
            end
            to="/settings/embed/theming"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
            onClick={() => onClick('theming', '/settings/general/theming')}
          >
            <span className={style.text}>UI Theming</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="scheduledSettings" permission="View">
          <NavLink
            end
            to="/settings/embed/scheduledSettings"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
            onClick={() =>
              onClick('scheduled', '/settings/embed/scheduledSettings')
            }
          >
            <span className={style.text}>Email Settings</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="demoConfig" permission="View">
          <NavLink
            end
            to="/settings/embed/demoConfig"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
            onClick={() => onClick('demo config', '/settings/embed/demoConfig')}
          >
            <span className={style.text}>Demo Config</span>
          </NavLink>
        </AccessControl>
        <AccessControl feature="whitelistedDomains" permission="View">
          <NavLink
            end
            to="/settings/embed/whitelistDomains"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ''}`
            }
          >
            <span className={style.text}>Whitelist domains</span>
          </NavLink>
        </AccessControl>
        {/* <NavLink
          end
          to="/settings/embed/downloadSettings"
          className={({ isActive }) =>
            `${style.link} ${isActive ? style.active : ''}`
          }
          onClick={() =>
            onClick('download', '/settings/embed/downloadSettings')
          }
        >
          <span className={style.text}>Download Settings</span>
        </NavLink> */}
      </div>
    </div>
  );
};

export default SettingsHeader;
