import { createAction } from '@ngrx/store';

export class SidebarMenuActions {
  static openMenu = createAction('[SideBarMenu] Open Sidebar Menu');
  static closeMenu = createAction('[SideBarMenu] Close Sidebar Menu');

  static showMenu = createAction('[SideBarMenu] Show Sidebar Menu');
  static hideMenu = createAction('[SideBarMenu] Hide Sidebar Menu');
}
