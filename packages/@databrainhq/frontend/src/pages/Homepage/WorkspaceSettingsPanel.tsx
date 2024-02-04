/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react';
import { Ui, consts, types } from '@databrainhq/plugin';
import AccessPermissions from 'pages/Settings/components/AccessPermissions';
import RawCsvSettings from 'pages/Settings/components/RawCsvSettings';
import ConnectRedisForm from 'pages/Settings/components/Cache/ConnectRedisForm';
import { GetIsCanAccessParams } from '@root/types';
import GeneralSettings from 'pages/Settings/components/GeneralSettings';
import AccessControl from 'components/AccessControl';
import useAccessControl from 'hooks/useAccessControl';

const SETTINGS = [
  'accessPermissions',
  'cacheSettings',
  'downloadSettings',
  'generalSettings',
];
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WorkspaceSettingsPanel = ({
  WorkspaceSettingsProps: { isOpen, onClose },
}: {
  WorkspaceSettingsProps: Props;
}) => {
  const { getIsCanAccess } = useAccessControl();
  const settings = useMemo(
    () =>
      consts.IS_SELF_HOSTED
        ? // remove download settings panel for self hosted app
          SETTINGS.filter((setting) => setting !== SETTINGS[2])
        : SETTINGS,
    []
  );
  const allowedRole = useMemo(
    () =>
      settings.find((setting) =>
        getIsCanAccess(setting as keyof GetIsCanAccessParams, 'View')
      ),
    [getIsCanAccess, settings]
  );
  return (
    <Ui.Panel
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      side="right"
      hideFooter
      headerTitle="Workspace Settings"
    >
      <div className="dbn-h-[500px] dbn-w-full">
        <Ui.Tabs.Context defaultActiveTab={allowedRole}>
          <Ui.Tabs.List>
            <AccessControl feature="accessPermissions" permission="View">
              <Ui.Tabs.Tab tabId="accessPermissions" grow>
                <Ui.Text variant="body-text-sm">Access Permissions</Ui.Text>
              </Ui.Tabs.Tab>
            </AccessControl>
            <AccessControl feature="cacheSettings" permission="View">
              <Ui.Tabs.Tab tabId="cacheSettings" grow>
                <Ui.Text variant="body-text-sm">Cache Settings</Ui.Text>
              </Ui.Tabs.Tab>
            </AccessControl>
            <Ui.SelfHostControl>
              <AccessControl feature="downloadSettings" permission="View">
                <Ui.Tabs.Tab tabId="downloadSettings" grow>
                  <Ui.Text variant="body-text-sm">Download Settings</Ui.Text>
                </Ui.Tabs.Tab>
              </AccessControl>
            </Ui.SelfHostControl>
            <AccessControl feature="generalSettings" permission="View">
              <Ui.Tabs.Tab tabId="generalSettings" grow>
                <Ui.Text variant="body-text-sm">General Settings</Ui.Text>
              </Ui.Tabs.Tab>
            </AccessControl>
          </Ui.Tabs.List>
          <AccessControl feature="accessPermissions" permission="View">
            <Ui.Tabs.Panel tabId="accessPermissions">
              <AccessPermissions isShowLayout={false} />
            </Ui.Tabs.Panel>
          </AccessControl>
          <AccessControl feature="cacheSettings" permission="View">
            <Ui.Tabs.Panel tabId="cacheSettings">
              <div className="dbn-p-4">
                <ConnectRedisForm />
              </div>
            </Ui.Tabs.Panel>
          </AccessControl>
          <Ui.SelfHostControl>
            <AccessControl feature="downloadSettings" permission="View">
              <Ui.Tabs.Panel tabId="downloadSettings">
                <RawCsvSettings isShowLayout={false} />
              </Ui.Tabs.Panel>
            </AccessControl>
          </Ui.SelfHostControl>
          <AccessControl feature="generalSettings" permission="View">
            <Ui.Tabs.Panel tabId="generalSettings">
              <GeneralSettings onClose={onClose} />
            </Ui.Tabs.Panel>
          </AccessControl>
        </Ui.Tabs.Context>
      </div>
    </Ui.Panel>
  );
};

export default WorkspaceSettingsPanel;
