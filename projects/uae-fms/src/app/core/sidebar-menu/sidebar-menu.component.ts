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
    { name: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    {
      name: 'Fleets',
      icon: 'fleets',
      route: 'fleet',
      items: [
        { name: 'Assets', icon: 'car-solid', route: 'fleet/assets' },
        { name: 'Sub Assets', icon: 'sub-assets', route: 'fleet/sub-assets' },
        { name: 'Accessory', icon: 'accessory', route: 'fleet/accessory' },
        { name: 'Operator', icon: 'operator', route: 'fleet/operator' },
        {
          name: 'Organization',
          icon: 'organization',
          route: 'fleet/organization'
        },
        { name: 'Movement', icon: 'movement', route: 'fleet/movment' }
      ]
    },
    { name: 'Fuel Management', icon: 'fuel', route: 'fuel-management' },
    { name: 'Traffic Fines', icon: 'traffic', route: 'taffic-fines' },
    { name: 'Toll', icon: 'toll', route: 'toll' },
    {
      name: 'Workshop',
      icon: 'workshop',
      route: 'workshop',
      items: [
        { name: 'Body Shop', icon: 'body-shop', route: 'workshop/body-shop' },
        {
          name: 'Service Shop',
          icon: 'service-shop',
          route: 'workshop/service-shop'
        },
        {
          name: 'Inspections',
          icon: 'inspection',
          route: 'workshop/inspections',
          items: [
            {
              name: 'Technical Inspection',
              route: 'workshop/inspections/technical-inspection'
            },
            {
              name: 'Action List',
              icon: 'file',
              route: 'workshop/inspections/action-list'
            }
          ]
        },
        {
          name: 'Task Master',
          icon: 'action-list',
          route: 'workshop/task-master'
        }
      ]
    },
    {
      name: 'Part Store',
      icon: 'part-store',
      route: 'part-store',
      items: [
        {
          name: 'Parts List',
          icon: 'part-list',
          route: 'part-store/part-list'
        },
        {
          name: 'Order List',
          icon: 'order-list',
          route: 'part-store/order-list'
        },
        {
          name: 'Part Master',
          icon: 'part-master',
          route: 'part-store/part-master'
        }
      ]
    },
    { name: 'Reports', icon: 'report', route: 'report' },
    { name: 'Configuration', icon: 'configuration', route: 'configuration' },
    { name: 'Integrations', icon: 'integrations', route: 'integration' }
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
