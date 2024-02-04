import { WorkspaceType } from 'types';
import { WORKSPACE } from 'consts/application';

export const getCurrentWorkspace = () => {
  const currentWorkspace = localStorage.getItem(WORKSPACE);
  return currentWorkspace
    ? (JSON.parse(currentWorkspace) as WorkspaceType)
    : null;
};

export const setCurrentWorkspace = (workspace: WorkspaceType) => {
  localStorage.setItem(WORKSPACE, JSON.stringify(workspace));
};
