/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState, useEffect } from 'react';
import { Ui } from '@databrainhq/plugin';
import { FloatingDropDownOption } from '@databrainhq/plugin/src/types';
import { useSearchParams } from 'react-router-dom';
import { CreatorModes } from 'consts/values';
import AccessControl from 'components/AccessControl';
import useWorkspace from 'hooks/useWorkspace';
import useAccessControl from 'hooks/useAccessControl';
import useTheme from 'hooks/useTheme';

type GeneralSettingsProps = {
  onClose: () => void;
};

const GeneralSettings = ({ onClose }: GeneralSettingsProps) => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('wid');
  const { themesData, saveWorkspaceTheme, isLoadingTheme, workspaceTheme } =
    useTheme();
  const [selectedTheme, setSelectedTheme] = useState<FloatingDropDownOption>({
    value: '',
    label: '',
  });
  const [selectedCreatorMode, setSelectedCreatorMode] =
    useState<FloatingDropDownOption>({
      value: '',
      label: '',
    });
  const [isEnableEdit, setEnableEdit] = useState<boolean>(false);
  const {
    saveCreatorMode,
    isSaving,
    error,
    workspaces,
    saveSettings,
    setSelectedSetting,
    setSetingShow,
  } = useWorkspace();

  const [workspaceName, setWorkspaceName] = useState<string>(
    workspaces?.find((opt) => opt.id === workspaceId)?.name || ''
  );
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const handleSaveGeneralSettings = () => {
    if (selectedCreatorMode.value)
      saveCreatorMode(workspaceId || '', selectedCreatorMode.value);
    if (selectedTheme.value)
      saveWorkspaceTheme(selectedTheme.value, () => setSuccess(true));
    if (
      workspaceName !== workspaces?.find((opt) => opt.id === workspaceId)?.name
    )
      saveSettings({
        name: workspaceName,
        description: workspaces?.find((opt) => opt.id === workspaceId)
          ?.description,
      });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.location.reload();
    }, 1000);
  };
  useEffect(() => {
    const selectedWorkspace = workspaces?.find((opt) => opt.id === workspaceId);
    if (selectedWorkspace?.creatorMode)
      setSelectedCreatorMode(
        CreatorModes.find(
          (mode) => mode.value === selectedWorkspace.creatorMode
        ) || {
          value: '',
          label: '',
        }
      );
    else
      setSelectedCreatorMode({
        value: CreatorModes[0].value,
        label: CreatorModes[0].label,
      });
  }, [workspaceId, workspaces]);
  useEffect(() => {
    if (workspaceTheme)
      setSelectedTheme({
        value: workspaceTheme.id,
        label: workspaceTheme.general.name,
      });
  }, [workspaceTheme]);
  const themeList: FloatingDropDownOption[] = useMemo(() => {
    return (
      themesData?.themes.map((item) => ({
        label: item.general.name || 'default',
        value: item.id,
      })) || []
    );
  }, [themesData]);
  const { getIsCanAccess } = useAccessControl();

  return (
    <div className="dbn-w-full dbn-p-4 dbn-flex dbn-flex-col dbn-gap-4">
      {error ? <Ui.Alert text={error} variant="error" /> : null}
      <AccessControl feature="workspace" permission="Edit">
        <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1">
          <Ui.Text variant="heading-lg">Edit Workspace Name</Ui.Text>
          <Ui.Text variant="body-text-sm">Change your workspace name</Ui.Text>
        </div>
        <div className="dbn-w-[50%] dbn-flex dbn-justify-between dbn-items-end dbn-gap-4">
          <Ui.InputField
            type="text"
            placeholder="Product Development Staging"
            label="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            isDisabled={!isEnableEdit}
          />
          <Ui.Button
            leftIcon={<Ui.Icons name="pencil-simple-line" />}
            onClick={() => {
              setEnableEdit(!isEnableEdit);
              setSelectedSetting('Update Workspace');
              setSetingShow(true);
            }}
            variant="popover"
            className="dbn-mb-2"
          />
        </div>
      </AccessControl>
      <div className="dbn-w-full dbn-flex dbn-flex-col dbn-border-t dbn-border-secondary dbn-pt-4 dbn-gap-1">
        <Ui.Text variant="heading-lg">Creator Settings</Ui.Text>
        <Ui.Text variant="body-text-sm">
          Change the creator mode to suit your requirements
        </Ui.Text>
      </div>
      <Ui.FloatingDropDown
        label="Select Creator Mode"
        options={CreatorModes}
        selectedOption={selectedCreatorMode}
        onChange={setSelectedCreatorMode}
        isDisabled={
          !getIsCanAccess('generalSettings', 'Creator Mode') || isSaving
        }
      />
      <div className="dbn-w-full dbn-flex dbn-flex-col dbn-gap-1 dbn-border-t dbn-border-secondary dbn-pt-4">
        <Ui.Text variant="heading-lg">Theme Settings</Ui.Text>
        <Ui.Text variant="body-text-sm">
          Apply specific themes to your workspace to make them look more
          attractive
        </Ui.Text>
      </div>
      <Ui.FloatingDropDown
        label="Select Theme"
        options={themeList}
        selectedOption={selectedTheme}
        onChange={setSelectedTheme}
        isDisabled={
          !getIsCanAccess('generalSettings', 'Theme Settings') || isSaving
        }
      />
      <div className="dbn-w-full dbn-flex dbn-gap-4 dbn-justify-end dbn-items-center">
        {isSuccess ? (
          <Ui.Text variant="body-text-sm" color="success">
            Settings updated successfully!
          </Ui.Text>
        ) : null}
        <Ui.Button
          type="button"
          onClick={handleSaveGeneralSettings}
          variant="primary"
          isDisabled={isLoadingTheme || !workspaceName}
        >
          Save Changes
        </Ui.Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
