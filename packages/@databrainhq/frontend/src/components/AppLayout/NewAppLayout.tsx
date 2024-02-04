import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Ui } from '@databrainhq/plugin';
import { workspaceAtom } from 'atoms/application';
import { HIDDEN_MAIN_SIDEBAR_ROUTES } from 'consts/application';
import { MainTopNavbar } from 'components/MainTopNavbar';
import useTheme from 'hooks/useTheme';
import useAccessControl from 'hooks/useAccessControl';
import { getCurrentWorkspace } from 'helpers/application/workspace';

const NewAppLayout = ({ children }: any) => {
  const [workspace, setWorkspace] = useAtom(workspaceAtom);
  const { pathname } = useLocation();
  const { setViewMode, isViewMode } = useAccessControl();
  const isShow = !HIDDEN_MAIN_SIDEBAR_ROUTES.some((route) =>
    pathname.includes(route)
  );

  useTheme();

  useEffect(() => {
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      setWorkspace(currentWorkspace);
    }
  }, [getCurrentWorkspace()?.id]);

  return (
    <>
      {isShow && <MainTopNavbar workspaceId={workspace?.id as string} />}
      <div className="dbn-h-screen dbn-w-full dbn-overflow-hidden dbn-overflow-y-auto dbn-relative">
        {children}
        {isViewMode && (
          <div className="dbn-absolute dbn-bottom-[70px] dbn-z-portal dbn-w-full dbn-flex dbn-justify-center dbn-items-center">
            <Ui.Alert
              variant="primary"
              text="You are viewing the app in the view role mode. Please click the Exit button to exit."
            >
              <Ui.Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setViewMode({
                    isExit: true,
                    viewAsRoles: undefined,
                  })
                }
              >
                Exit
              </Ui.Button>
            </Ui.Alert>
          </div>
        )}
      </div>
    </>
  );
};
export default NewAppLayout;
