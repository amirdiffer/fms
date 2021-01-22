// import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import { Action, createReducer, on } from '@ngrx/store';
import { SidebarMenuActions } from './sidebar-menu.actions';
import { SidebarMenuState, SidebarMenuTypes } from './sidebar-menu.model';

export const initialState: SidebarMenuState = {
  opened: true,
  show: true,
  type: SidebarMenuTypes.sideMenu
};

const reducer = createReducer(
  initialState,
  on(SidebarMenuActions.openMenu, (state) => ({ ...state, opened: true })),
  on(SidebarMenuActions.closeMenu, (state) => ({ ...state, opened: false })),
  on(SidebarMenuActions.showMenu, (state) => ({ ...state, show: true })),
  on(SidebarMenuActions.hideMenu, (state) => ({ ...state, show: false }))
);

export function sidebarMenuReducer(
  state: SidebarMenuState | undefined,
  action: Action
) {
  return reducer(state, action);
}
