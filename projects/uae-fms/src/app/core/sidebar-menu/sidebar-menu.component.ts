import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';

import { interval, Observable, Subscribable, Subscription } from 'rxjs';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-manu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
  >('router');

  public route$ = this.store.pipe(
    select(createSelector(this.selectRouterState, (state) => state))
  );

  public activeGroup: string = 'root';
  toggleGroup(item: { name: string; items: object[]; route: string }): void {
    let group = item.name;
    this.activeGroup = this.activeGroup == group ? 'root' : group;
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
        { name: 'Sub Assets', icon: 'sub-assets', route: 'fleet/sub-asset' },
        { name: 'Accessory', icon: 'accessory', route: 'fleet/accessory' },
        { name: 'Operator', icon: 'operator', route: 'fleet/operator' },
        {
          name: 'Organization',
          icon: 'organization',
          route: 'fleet/organization'
        },
        { name: 'Movement', icon: 'movement', route: 'fleet/movement' }
      ]
    },
    { name: 'Fuel Management', icon: 'fuel', route: '#' },
    { name: 'Traffic Fines', icon: 'traffic', route: 'traffic-fine' },
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
              name: 'Auction List',
              route: 'workshop/inspections/auction-list'
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
    { name: 'Reports', icon: 'report', route: '#' },
    {
      name: 'Configuration',
      icon: 'configuration',
      route: 'configuration',
      items: [
        {
          name: 'User Management',
          icon: 'organization',
          route: 'configuration/user-management',
          items: [
            {
              name: 'Role and Permission',
              icon: 'organization',
              route: 'configuration/user-management/role-permission'
            },
            {
              name: 'Users',
              icon: 'organization',
              route: 'configuration/user-management/users'
            },
            {
              name: 'Company Profile',
              icon: 'organization',
              route: 'configuration/user-management/company-setting'
            }
          ]
        },
        {
          name: 'Asset Policy',
          icon: 'asset-policy',
          route: 'configuration/asset-policy'
        },
        {
          name: 'Asset Configuration',
          icon: 'cog',
          route: 'configuration/asset-configuration'
        },
        {
          name: 'Business Category',
          icon: 'business',
          route: 'configuration/business-category'
        },
        {
          name: 'Ownership',
          icon: 'copyright-solid',
          route: 'configuration/ownership'
        },
        {
          name: 'Fleet Status',
          icon: 'flag-solid',
          route: 'configuration/fleet-status'
        },
        {
          name: 'Periodic Service',
          icon: 'cogs-solid',
          route: 'configuration/periodic-service'
        }
      ]
    },
    { name: 'Integrations', icon: 'integrations', route: 'integration' }
  ];

  checkMenuState: Subscription;
  opened$ = this.facade.opened$;
  show$ = this.facade.show$;
  type$ = this.facade.type$;
  showLabel$ = this.facade.opened$.pipe(
    delayWhen((x) => interval(x ? 1000 : 1))
  );

  insideProfile = false;
  assets = assetsPath;

  constructor(
    private store: Store,
    private facade: SidebarMenuFacade,
    private _router: Router
  ) {}

  ngOnInit() {
    this.usingMenu = this.mainMenu;

    this.route$.subscribe((x) => {
      if (x?.state?.url.indexOf('profile') >= 0) this.insideProfile = true;
      else this.insideProfile = false;
    });

    this.checkScreenWidth();

    this.checkMenuState = this.opened$.subscribe((x) => {
      !x ? (this.activeGroup = 'root') : null;
    });
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

  ngOnDestroy(): void {
    this.checkMenuState.unsubscribe();
  }
}
