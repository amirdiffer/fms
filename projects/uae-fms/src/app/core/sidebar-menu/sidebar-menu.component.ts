import { Component, OnDestroy, OnInit } from '@angular/core';
import { assetsPath } from '@environments/environment';

import { RouterReducerState } from '@ngrx/router-store';
import {
  createFeatureSelector,
  createSelector,
  select,
  Store
} from '@ngrx/store';

import { interval, Subscription } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

import { AppState } from '../core.state';
import { RouterStateUrl } from '../router/router.state';
import { SidebarMenuFacade } from './state/sidebar-menu.facade';
import { WindowResizeService, ResizeEvent } from '../general-services';

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

  urlGroup = [];

  public activeGroup: string = '';
  toggleGroup(item: MenuItem): void {
    this.activeGroup == item.name || this.activeGroup == ''
      ? (this.activeGroup = 'root')
      : (this.activeGroup = item.name);
  }

  usingMenu = [];
  mainMenu = [
    { name: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    {
      name: 'Fleets',
      icon: 'fleets',
      route: '/fleet',
      items: [
        { name: 'Assets', icon: 'car-solid', route: '/fleet/assets' },
        { name: 'Sub Assets', icon: 'sub-assets', route: '/fleet/sub-asset' },
        { name: 'Accessory', icon: 'accessory', route: '/fleet/accessory' },
        { name: 'Operator', icon: 'operator', route: '/fleet/operator' },
        {
          name: 'Organization',
          icon: 'organization',
          route: '/fleet/organization'
        },
        { name: 'Movement', icon: 'movement', route: '/fleet/movement' }
      ]
    },
    { name: 'Fuel Management', icon: 'fuel', route: '/fuel-management' },
    { name: 'Traffic Fines', icon: 'traffic', route: '/traffic-fine' },
    { name: 'Toll', icon: 'toll', route: '/toll' },
    {
      name: 'Workshop',
      icon: 'workshop',
      route: '/workshop',
      items: [
        { name: 'Body Shop', icon: 'body-shop', route: '/workshop/body-shop' },
        {
          name: 'Service Shop',
          icon: 'service-shop',
          route: '/workshop/service-shop'
        },
        {
          name: 'Inspections',
          icon: 'inspection',
          route: '/workshop/inspections',
          items: [
            {
              name: 'Technical Inspection',
              route: '/workshop/inspections/technical-inspection'
            },
            {
              name: 'Auction List',
              route: '/workshop/inspections/auction-list'
            }
          ]
        },
        {
          name: 'Task Master',
          icon: 'task-master',
          route: '/workshop/task-master'
        }
      ]
    },
    {
      name: 'Part Store',
      icon: 'part-store',
      route: '/part-store',
      items: [
        {
          name: 'Parts List',
          icon: 'part-list',
          route: '/part-store/part-list'
        },
        {
          name: 'Order List',
          icon: 'order-list',
          route: '/part-store/order-list'
        },
        {
          name: 'Part Master',
          icon: 'part-master',
          route: '/part-store/part-master'
        }
      ]
    },
    { name: 'Reports', icon: 'report', route: '/report' },
    {
      name: 'Configuration',
      icon: 'configuration',
      route: '/configuration',
      items: [
        {
          name: 'User Management',
          icon: 'userManagement',
          route: '/configuration/user-management',
          items: [
            {
              name: 'Role and Permission',
              icon: 'organization',
              route: '/configuration/user-management/role-permission'
            },
            {
              name: 'Users',
              icon: 'organization',
              route: '/configuration/user-management/users'
            },
            {
              name: 'Company Profile',
              icon: 'organization',
              route: '/configuration/user-management/company-setting'
            }
          ]
        },
        {
          name: 'Asset Policy',
          icon: 'asset-policy',
          route: '/configuration/asset-policy'
        },
        {
          name: 'Asset Configuration',
          icon: 'cog',
          route: '/configuration/asset-configuration'
        },
        {
          name: 'Business Category',
          icon: 'business',
          route: '/configuration/business-category'
        },
        {
          name: 'Ownership',
          icon: 'copyright-solid',
          route: '/configuration/ownership'
        },
        {
          name: 'Fleet Status',
          icon: 'flag-solid',
          route: '/configuration/fleet-status'
        },
        {
          name: 'Periodic Service',
          icon: 'periodic-service',
          route: '/configuration/periodic-service'
        }
      ]
    },
    { name: 'Integrations', icon: 'integrations', route: '/integration' }
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

  innerWidth: number = this.resizeService.getCurrent().innerWidth;

  constructor(
    private store: Store,
    private facade: SidebarMenuFacade,
    private resizeService: WindowResizeService
  ) {}

  ngOnInit() {
    this.usingMenu = this.mainMenu;

    this.route$.subscribe((x) => {
      if (x?.state?.url) this.urlGroup = x.state.url.split('/');
    });

    this.checkMenuState = this.opened$.subscribe((x) => {
      !x ? (this.activeGroup = 'root') : null;
    });

    let $this = this;
    this.resizeService.resized$.subscribe((x) => {
      this.onResize(x, $this);
    });
    this.onResize(this.resizeService.getCurrent(), this);
  }

  onResize(event: ResizeEvent, context) {
    if (event && event.innerWidth && event.innerWidth != 0)
      if (event.innerWidth != context.innerWidth) {
        if (event.innerWidth > 1200) context.facade.openSidebarMenu();
        else context.facade.closeSidebarMenu();

        if (event.innerWidth > 720) context.facade.showSidebarMenu();
        else context.facade.hideSidebarMenu();
        context.innerWidth = event.innerWidth;
      }
  }

  ngOnDestroy(): void {
    this.checkMenuState.unsubscribe();
  }

  activeMenuCheck(route: string) {
    let r = '';
    if (route[0] == '/') {
      r = route.substring(1, route.length);
    }
    return this.urlGroup.indexOf(r) >= 0 && this.activeGroup != 'root';
  }

  activeSubMenuCheck(route: string) {
    let r;
    if (route[0] == '/') {
      r = route.split('/');
      r = r[r.length - 1];
    }
    return this.urlGroup.indexOf(r) >= 0 && this.activeGroup != 'root';
  }
}

export abstract class MenuItem {
  name: string;
  items: object[];
  route: string;
}
