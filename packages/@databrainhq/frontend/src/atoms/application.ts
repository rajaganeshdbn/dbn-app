import { types } from '@databrainhq/plugin';
import { atom } from 'jotai';
import { WorkspaceType, MetricVersionAtomType, RolesAtomType } from 'types';

// eslint-disable-next-line import/prefer-default-export
export const isLoggedInAtom = atom(false);
export const isTokenAvailable = atom(true);
export const workspaceAtom = atom<WorkspaceType | undefined>(undefined);
export const metricVersionsAtom = atom<MetricVersionAtomType>({
  id: '',
  versions: [],
  current: 1.0,
  latest: 1.0,
});
export const rolesAtom = atom<RolesAtomType>({
  isViewMode: false,
});
export const globalDashboardFiltersAtom = atom<types.GlobalFilterType[]>([]);
