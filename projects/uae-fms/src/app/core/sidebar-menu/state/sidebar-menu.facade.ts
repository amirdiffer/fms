import { Injectable } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  select,
  Store
} from '@ngrx/store';
import { SidebarMenuActions } from './sidebar-menu.actions';
import { SidebarMenuState } from '..';
@Injectable()
export class SidebarMenuFacade {
  selectSidebarMenuState = createFeatureSelector<SidebarMenuState>(
    'sidebarMenu'
  );

  opened$ = this.store.pipe(
    select(createSelector(this.selectSidebarMenuState, (state) => state.opened))
  );

  show$ = this.store.pipe(
    select(createSelector(this.selectSidebarMenuState, (state) => state.show))
  );

  type$ = this.store.pipe(
    select(createSelector(this.selectSidebarMenuState, (state) => state.type))
  );

  constructor(private store: Store) {}

  openSidebarMenu() {
    this.store.dispatch(SidebarMenuActions.openMenu());
  }

  closeSidebarMenu() {
    this.store.dispatch(SidebarMenuActions.closeMenu());
  }

  showSidebarMenu() {
    this.store.dispatch(SidebarMenuActions.showMenu());
  }

  hideSidebarMenu() {
    this.store.dispatch(SidebarMenuActions.hideMenu());
  }
}
