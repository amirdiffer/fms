import { AppState } from '@core/core.state';

export interface SidebarMenuModel {
  opened: boolean;
  show: boolean;
  type: SidebarMenuTypes;
}

export interface SidebarMenuState {
  opened: boolean;
  show: boolean;
  type: SidebarMenuTypes;
}

export enum SidebarMenuTypes {
  sideMenu = 1,
  sideIcons = 2,
  slideBar = 3
}

export interface State extends AppState {
  pageAttributes: { sideMenu: SidebarMenuState };
}
