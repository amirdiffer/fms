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
import {
  WindowResizeService,
  ResizeEvent,
  RouterService
} from '../general-services';
import { ActivatedRoute, Router } from '@angular/router';

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
  collapsedMenu = '';

  public activeGroup: string = '';

  usingMenu = [];
  mainMenu = [
    {
      name: 'sidebar.dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      disabled: true
    },
    {
      name: 'sidebar.fleets.~',
      icon: 'fleets',
      route: '/fleet',
      items: [
        {
          name: 'sidebar.fleets.assets',
          icon: 'car-solid',
          route: '/fleet/assets'
        },
        {
          name: 'sidebar.fleets.sub_assets',
          icon: 'sub-assets',
          route: '/fleet/sub-asset'
        },
        {
          name: 'sidebar.fleets.accessory',
          icon: 'accessory',
          route: '/fleet/accessory'
        },
        {
          name: 'sidebar.fleets.operator',
          icon: 'operator',
          route: '/fleet/operator'
        },
        {
          name: 'sidebar.fleets.department',
          icon: 'organization',
          route: '/fleet/department'
        },
        {
          name: 'sidebar.fleets.movement.~',
          icon: 'movement',
          route: '/fleet/movement',
          items: [
            {
              name: 'sidebar.fleets.movement.permanent',
              route: '/fleet/movement'
            },
            {
              name: 'sidebar.fleets.movement.temporary',
              route: '/fleet/movement/temporary'
            }
            /* {
              name: 'sidebar.fleets.movement.iserve',
              route: '/fleet/movement/iserve'
            } */
          ]
        }
      ]
    },
    {
      name: 'sidebar.fuel_management',
      icon: 'fuel',
      route: '/fuel-management',
      disabled: true
    },
    {
      name: 'sidebar.traffic_fine',
      icon: 'traffic',
      route: '/traffic-fine',
      disabled: true
    },
    { name: 'sidebar.toll', icon: 'toll', route: '/toll', disabled: true },
    {
      name: 'sidebar.workshop.~',
      icon: 'workshop',
      route: '/workshop',
      items: [
        {
          name: 'sidebar.workshop.body_shop',
          icon: 'body-shop',
          route: '/workshop/body-shop'
        },
        {
          name: 'sidebar.workshop.service_shop',
          icon: 'service-shop',
          route: '/workshop/service-shop',
          disabled: true
        },
        /*         {
                  name: 'sidebar.workshop.inspection.~',
                  icon: 'inspection',
                  route: '/workshop/inspections',
                  items: [
                    {
                      name: 'sidebar.workshop.inspection.technical_inspection',
                      route: '/workshop/inspections/technical-inspection'
                    },
                    {
                      name: 'sidebar.workshop.inspection.auction_list',
                      route: '/workshop/inspections/auction-list'
                    }
                  ]
                }, */
        {
          name: 'sidebar.workshop.task_master',
          icon: 'task-master',
          route: '/workshop/task-master'
        }
      ]
    },
    {
      name: 'sidebar.part_store.~',
      icon: 'part-store',
      route: '/part-store',
      disabled: true
      /* items: [
        {
          name: 'sidebar.part_store.part_list',
          icon: 'part-list',
          route: '/part-store/part-list'
        },
        {
          name: 'sidebar.part_store.order_list',
          icon: 'order-list',
          route: '/part-store/order-list'
        },
        {
          name: 'sidebar.part_store.part_master',
          icon: 'part-master',
          route: '/part-store/part-master'
        }
      ] */
    },
    /*{
        name: 'sidebar.report',
        icon: 'report',
        route: '/report',
        disabled: true
      }, */
    {
      name: 'sidebar.configuration.~',
      icon: 'configuration',
      route: '/configuration',
      items: [
        {
          name: 'sidebar.configuration.user_management.~',
          icon: 'userManagement',
          route: '/configuration/user-management',
          items: [
            {
              name: 'sidebar.configuration.user_management.role_permission',
              icon: 'organization',
              route: '/configuration/user-management/role-permission',
              disabled: true
            },
            {
              name: 'sidebar.configuration.user_management.users',
              icon: 'organization',
              route: '/configuration/user-management/users'
            }
            /* {
              name: 'sidebar.configuration.user_management.company_profile',
              icon: 'organization',
              route: '/configuration/user-management/company-setting',
              disabled: true
            } */
          ]
        },
        {
          name: 'sidebar.configuration.asset_policy',
          icon: 'asset-policy',
          route: '/configuration/asset-policy'
        },
        {
          name: 'sidebar.configuration.asset_configuration',
          icon: 'cog',
          route: '/configuration/asset-configuration'
        },
        {
          name: 'sidebar.configuration.business_category',
          icon: 'business',
          route: '/configuration/business-category'
        },
        {
          name: 'sidebar.configuration.ownership',
          icon: 'copyright-solid',
          route: '/configuration/ownership'
        },
        {
          name: 'sidebar.configuration.fleet_status',
          icon: 'flag-solid',
          route: '/configuration/fleet-status',
          disabled: true
        },
        {
          name: 'sidebar.configuration.periodic_service',
          icon: 'periodic-service',
          route: '/configuration/periodic-service'
        }
      ]
    },
    {
      name: 'sidebar.integrations',
      icon: 'integrations',
      route: '/integration',
      disabled: true
    }
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
    private resizeService: WindowResizeService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usingMenu = this.mainMenu;
    this.route.url.subscribe(x => {
      let url = this.router.url;
      if (url.indexOf('?') >= 0) {
        url = url.split('?')[0]
      }
      this.urlGroup = url.split('/');
      this.collapsedMenu = '/' + url.split('/')[1];
    })

    this.opened$.subscribe((x) => {
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

  toggleGroup(item: MenuItem): void {
    if (item.items) {
      /* this.activeGroup == item.name || this.activeGroup == ''
        ? (this.activeGroup = 'root')
        : (this.activeGroup = item.name); */
      if (this.collapsedMenu == item.route) this.collapsedMenu = 'root';
      else this.collapsedMenu = item.route;
    } else {
      if (!item.disabled) this.routerService.navigate(item.route);
    }
  }
}

export abstract class MenuItem {
  name: string;
  items: object[];
  route: string;
  disabled?: boolean;
}
