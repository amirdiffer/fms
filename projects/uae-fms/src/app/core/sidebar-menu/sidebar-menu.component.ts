import { Component, Injectable, Input, OnInit } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';

import { interval } from 'rxjs';
import { delayWhen } from 'rxjs/operators';
import { AppState } from '../core.state';
import { RouterStateUrl } from '../router/router.state';
import { SidebarMenuFacade } from './state/sidebar-menu.facade';
import {
  createFeatureSelector,
  createSelector,
  select,
  Store
} from '@ngrx/store';
import { WindowResizeService } from '../general-services';
import { assetsPath } from '@environments/environment';

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

  public activeGroup: string = 'root';
  toggleGroup(group: string): void {
    this.activeGroup = this.activeGroup == group ? 'root' : group;
    let checkMenuState = this.opened$.subscribe((x) => {
      !x ? (this.activeGroup = 'root') : null;
      checkMenuState.unsubscribe();
    });
    this.facade.openSidebarMenu();
  }

  usingMenu = [];
  mainMenu = [
    { name: 'Dashboard', icon: 'dashboard', route: 'main' },
    {
      name: 'Fleets',
      icon: 'fleets',
      route: 'main/vehicle',
      items: [
        { name: 'Assets', icon: 'car-solid', route: 'main' },
        { name: 'Sub Assets', icon: 'sub-assets', route: 'main' },
        { name: 'Accessory', icon: 'accessory', route: 'main' },
        { name: 'Operator', icon: 'operator', route: 'main' },
        { name: 'Organization', icon: 'organization', route: 'main' },
        { name: 'Movement', icon: 'movement', route: 'main' }
      ]
    },
    { name: 'Fuel Management', icon: 'fuel', route: 'main/booking-list' },
    { name: 'Traffic Fines', icon: 'traffic', route: 'main/reports' },
    { name: 'Toll', icon: 'toll', route: 'main/reports' },
    {
      name: 'Workshop',
      icon: 'workshop',
      route: 'main/vehicle',
      items: [
        { name: 'Body Shop', icon: 'body-shop', route: 'main' },
        { name: 'Service Shop', icon: 'service-shop', route: 'main' },
        {
          name: 'Inspections',
          icon: 'inspection',
          route: 'main',
          items: [
            { name: 'Technical Inspection', route: 'main' },
            { name: 'Action List', icon: 'file', route: 'main' }
          ]
        },
        { name: 'Task Master', icon: 'action-list', route: 'main' }
      ]
    },
    {
      name: 'Part Store',
      icon: 'part-store',
      route: 'main/vehicle',
      items: [
        { name: 'Parts List', icon: 'part-list', route: 'main' },
        { name: 'Order List', icon: 'order-list', route: 'main' },
        { name: 'Part Master', icon: 'part-master', route: 'main' }
      ]
    },
    { name: 'Reports', icon: 'report', route: 'main/reports' },
    { name: 'Configuration', icon: 'configuration', route: 'main/reports' },
    { name: 'Integrations', icon: 'integrations', route: 'main/reports' }
  ];

  opened$ = this.facade.opened$;
  show$ = this.facade.show$;
  type$ = this.facade.type$;
  showLabel$ = this.facade.opened$.pipe(
    delayWhen((x) => interval(x ? 1000 : 1))
  );

  insideProfile = false;
  assets = assetsPath;

  constructor(private store: Store, private facade: SidebarMenuFacade) {}

  ngOnInit() {
    this.usingMenu = this.mainMenu;

    this.route$.subscribe((x) => {
      if (x?.state?.url.indexOf('profile') >= 0) this.insideProfile = true;
      else this.insideProfile = false;
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
    if (screen.availWidth > 1200) this.facade.openSidebarMenu();
    else this.facade.closeSidebarMenu();

    if (screen.availWidth > 720) this.facade.showSidebarMenu();
    else this.facade.hideSidebarMenu();
  }
}
