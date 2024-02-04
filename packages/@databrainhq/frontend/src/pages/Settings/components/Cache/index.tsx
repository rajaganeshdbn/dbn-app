/* eslint-disable import/no-relative-parent-imports */
import SettingsLayout from 'pages/Settings';
import styles from './cache.module.css';
import ConnectRedisForm from './ConnectRedisForm';

const Cache = () => {
  return (
    <SettingsLayout>
      <div className={styles.container}>
        <ConnectRedisForm />
      </div>
    </SettingsLayout>
  );
};

export default Cache;
