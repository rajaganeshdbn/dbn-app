import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { workspaceAtom } from 'atoms/application';
import { HIDDEN_MAIN_SIDEBAR_ROUTES } from 'consts/application';
import Flex from 'components/Flex';
import MainSidebar from 'components/MainSidebar';
import useTheme from 'hooks/useTheme';
import { getCurrentWorkspace } from 'helpers/application/workspace';
import styles from './applayout.module.css';

const AppLayout = ({ children }: any) => {
  const [, setWorkspace] = useAtom(workspaceAtom);
  const { pathname } = useLocation();
  const isShow = !HIDDEN_MAIN_SIDEBAR_ROUTES.some((route) =>
    pathname.includes(route)
  );

  useTheme();

  useEffect(() => {
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      setWorkspace(currentWorkspace);
    }
  }, []);

  return (
    <Flex className={styles['app-layout']}>
      {isShow && <MainSidebar className={styles['sidebar-layout']} />}
      <Flex className={styles['content-layout']}>
        <div className="dbn-h-screen dbn-w-full dbn-overflow-hidden dbn-overflow-y-auto dbn-relative">
          {children}
        </div>
      </Flex>
    </Flex>
  );
};
export default AppLayout;
