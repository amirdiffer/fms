import { Component, Input, OnInit } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';

import { interval } from 'rxjs';
import { delayWhen } from 'rxjs/operators';
import { AppState } from '../core.state';
import { RouterStateUrl } from '../router/router.state';
import { SidebarMenuFacade } from './state/sidebar-menu.facade';
import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { WindowResizeService } from "../general-services";

@Component({
  selector: 'app-sidebar-manu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
  >('router');

  public route$ = this.store.pipe(
    select(createSelector(this.selectRouterState, (state) => state))
  );

  usingMenu = [];
  mainMenu = [
    { name: 'Dashboard', icon: 'file', route: 'main' },
    { name: 'Vehicle', icon: 'car', route: 'main/vehicle' },
    { name: 'Booking List', icon: 'file', route: 'main/booking-list' },
    { name: 'Reports', icon: 'chart-line', route: 'main/reports' }
  ];

  opened$ = this.facade.opened$;
  show$ = this.facade.show$;
  type$ = this.facade.type$;
  showLabel$ = this.facade.opened$.pipe(
    delayWhen((x) => interval(x ? 1000 : 1))
  );

  insideProfile = false;

  constructor(
    private store: Store,
    private facade: SidebarMenuFacade
  ) { }

  ngOnInit() {
    this.usingMenu = this.mainMenu;


    this.route$.subscribe((x) => {
      if (x?.state?.url.indexOf('profile') >= 0)
        this.insideProfile = true;
      else
        this.insideProfile = false;
    });

    this.checkScreenWidth();
  }

  onResize(event) {
    if (event.currentTarget.screen.availWidth > 1200)
      this.facade.openSidebarMenu();
    else this.facade.closeSidebarMenu();

    if (event.currentTarget.screen.availWidth > 720)
      this.facade.showSidebarMenu();
    else this.facade.hideSidebarMenu();
  }

  checkScreenWidth() {
    if (screen.availWidth > 1200)
      this.facade.openSidebarMenu();
    else this.facade.closeSidebarMenu();

    if (screen.availWidth > 720)
      this.facade.showSidebarMenu();
    else this.facade.hideSidebarMenu();
  }
}
