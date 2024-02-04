/* eslint-disable import/no-relative-parent-imports */
import { PropsWithChildren } from 'react';
import SettingsSidebar from './components/SettingsSidebar';
import style from './settings.module.css';
import SettingsHeader from './components/SettingsHeader';

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={style['settings-container']}>
      <SettingsSidebar />
      <div className={style['settings-content']}>
        <SettingsHeader />
        <div className={style['settings-body']}>{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
