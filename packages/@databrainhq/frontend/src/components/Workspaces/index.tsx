import { Ui } from '@databrainhq/plugin';
import { useEffect, useRef } from 'react';
import segmentEvent from 'utils/segmentEvent';
import { required } from 'consts/validations';
import useWorkspace from 'hooks/useWorkspace';
import { setCurrentWorkspace } from 'helpers/application/workspace';
import styles from './workspaces.module.css';

type WorkspacesProps = {
  isCollapsed: boolean;
};

const WorkSpaces = ({ isCollapsed }: WorkspacesProps) => {
  const {
    workspaces,
    isSettingShow,
    setSetingShow,
    selectedSetting,
    setSelectedSetting,
    register,
    onSubmit,
    isDisableButton,
    error,
    workspace,
    setWorkspace,
    setSelectedSpace,
    isSaving,
  } = useWorkspace();

  useEffect(() => {
    if (!workspaces.length || workspace) return;
    setWorkspace(workspaces[0]);
    setCurrentWorkspace(workspaces[0]);
  }, [workspaces]);
  const workspaceRef = useRef(null) as React.RefObject<HTMLDivElement>;
  return (
    <>
      <Ui.PopoverMenu
        buttonContent={
          <>
            <div
              ref={workspaceRef}
              className="dbn-h-[26px] dbn-w-[26px] dbn-group dbn-flex dbn-px-2 dbn-justify-center dbn-items-center dbn-rounded dbn-bg-white dbn-bg-opacity-20 dbn-mx-auto"
            >
              <span className="dbn-text-xxs dbn-uppercase dbn-tracking-widest dbn-text-white">
                {workspace && workspace.name.split(' ').length > 1
                  ? `${workspace.name.split(' ')[0]?.at(0)}${workspace.name
                      .split(' ')[1]
                      ?.at(0)}`
                  : workspace?.name.slice(0, 2)}
              </span>
              {isCollapsed && (
                <span className="dbn-bg-black group-hover:dbn-inline dbn-hidden dbn-capitalize dbn-text-white dbn-text-xs dbn-rounded dbn-px-2 dbn-py-0.5 dbn-absolute dbn-left-28 -dbn-translate-x-1/2 dbn-z-1000 dbn-text-center dbn-w-[100px]">
                  Workspaces
                </span>
              )}
            </div>
            {!isCollapsed && (
              <>
                <div className="dbn-flex dbn-flex-col dbn-h-[26px] dbn-w-full dbn-justify-center dbn-items-start dbn-px-2">
                  <span className="dbn-text-xxs dbn-text-[#849de9]">
                    Workspace
                  </span>
                  <span className="dbn-text-xs dbn-capitalize dbn-truncate dbn-text-white">
                    {workspace && workspace.name.length > 14
                      ? `${workspace.name.slice(0, 14)}...`
                      : workspace?.name}
                  </span>
                </div>
                <Ui.Icons name="arrow-right" />
              </>
            )}
          </>
        }
      >
        {workspaces.map((wp) => (
          <div
            className="dbn-group dbn-truncate dbn-text-black dbn-flex dbn-justify-between dbn-items-center dbn-w-full dbn-px-3 hover:dbn-bg-slate-200 dbn-rounded"
            key={wp.id}
          >
            <Ui.Button
              type="button"
              variant="tertiary"
              onClick={() => {
                setWorkspace(wp);
                setCurrentWorkspace(wp);
                segmentEvent(
                  `workspace switch - ${workspace?.name} to ${wp.name}`,
                  {
                    id: wp.id,
                    name: wp.name,
                    switchFrom: workspace?.name,
                    description: wp.description,
                  }
                );
                workspaceRef.current?.click();
              }}
              key={wp.id}
            >
              {wp.name}
            </Ui.Button>
            <div className="group-hover:dbn-inline-block dbn-hidden">
              <Ui.Button
                variant="tertiary"
                type="button"
                onClick={() => {
                  setSelectedSpace(wp);
                  setSelectedSetting('Update Workspace');
                  setSetingShow(true);
                }}
              >
                <Ui.Icons name="pencil-simple" />
              </Ui.Button>
            </div>
          </div>
        ))}
        <div className="dbn-border-t dbn-mt-2 dbn-py-2 dbn-flex dbn-justify-center dbn-items-center">
          <Ui.Button
            variant="primary"
            type="button"
            onClick={() => {
              setSelectedSpace(undefined);
              setSelectedSetting('Create Workspace');
              setSetingShow(true);
            }}
            leftIcon={<Ui.Icons name="plus" />}
          >
            Create New Workspace
          </Ui.Button>
        </div>
      </Ui.PopoverMenu>
      <Ui.Modal
        isOpen={isSettingShow}
        onClose={() => setSetingShow(false)}
        headerTitle={selectedSetting}
      >
        <form className={styles['workspace-settings-form']} onSubmit={onSubmit}>
          <div className={styles['workspace-settings-modal']}>
            <Ui.InputField
              type="text"
              placeholder="Product Development Staging"
              label="Workspace name"
              register={register('name', required)}
            />
            <Ui.TextAreaField
              label="Workspace Description"
              id="description"
              rows={6}
              register={register('description', required)}
              placeholder="This workspace is about Product’s engineering managing metrics."
            />
            <Ui.Error message={error} />
          </div>
          <Ui.ModalFooter>
            {/* <Ui.InputField
              label="Mark this workspace as default"
              name="isDefaultWorkspace"
              type="checkbox"
              className="dbn-mr-auto"
              inputClass="dbn-w-4 dbn-h-4"
              labelClass="dbn-text-sm"
            /> */}
            <Ui.Button
              type="button"
              variant="tab"
              isDisabled={isDisableButton}
              onClick={() => setSetingShow(false)}
            >
              Cancel
            </Ui.Button>
            <Ui.Button
              type="submit"
              variant="primary"
              isDisabled={isDisableButton || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Ui.Button>
          </Ui.ModalFooter>
        </form>
      </Ui.Modal>
    </>
  );
};
export default WorkSpaces;
