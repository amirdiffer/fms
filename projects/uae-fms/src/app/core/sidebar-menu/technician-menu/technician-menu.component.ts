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

import { AppState } from '../../core.state';
import { RouterStateUrl } from '../../router/router.state';
import { SidebarMenuFacade } from '../state/sidebar-menu.facade';
import {
  WindowResizeService,
  ResizeEvent,
  RouterService
} from '../../general-services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technician-sidebar-manu',
  templateUrl: './technician-menu.component.html',
  styleUrls: ['./technician-menu.component.scss']
})
export class TechnicianSidebarMenuComponent implements OnInit, OnDestroy {
  selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
  >('router');

  public route$ = this.store.pipe(
    select(createSelector(this.selectRouterState, (state) => state))
  );

  urlGroup = [];
  collapsedMenu = '';
  collapsedSubMenu = '';

  public activeGroup: string = '';

  usingMenu = [];
  mainMenu = [
    {
      name: 'sidebar.dashboard',
      icon: 'home',
      route: '/dashboard/technician'
    },
    {
      name: 'sidebar.mytasks',
      icon: 'tasks',
      route: '/dashboard/technician/my-tasks'
    },
    {
      name: 'sidebar.myrequests',
      icon: 'list',
      route: '/dashboard/technician/my-requests'
    },
    {
      name: 'sidebar.reminder',
      icon: 'stopwatch',
      // route: '/dashboard',
      disabled:true
    },
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
    private router: Router
  ) { }

  ngOnInit() {
    this.usingMenu = this.mainMenu;
    this.route.url.subscribe((x) => {
      let url = this.router.url;
      if (url.indexOf('?') >= 0) {
        url = url.split('?')[0];
      }
      this.activeRoute = url;
      this.urlGroup = url.split('/');
      this.collapsedMenu = '/' + url.split('/')[1];
    });

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

  ngOnDestroy(): void { }

  activeMenuCheck(route: string) {
      // let r = '';
      // if (route[0] == '/') {
      //   r = route.substring(1, route.length);
      // }
    return false;//this.urlGroup.indexOf(r) >= 0 && this.activeGroup != 'root';
  }

  activeRoute = '';
  activeSubMenuCheck(route: string) {
    /* let r;
    if (route[0] == '/') {
      r = route.split('/');
      r = r[r.length - 1];
    }
    return (
      this.urlGroup.indexOf(r) >= 0 &&
      this.activeGroup != 'root' &&
      this.collapsedSubMenu != 'root'
    ); */
    return false;
  }

  activeToggleSubGroup(route): boolean {
    return false;//this.activeRoute.includes(route);
  }

  toggleGroup(item: MenuItem): void {
    if (item.items) {
      if (this.collapsedMenu == item.route) this.collapsedMenu = 'root';
      else this.collapsedMenu = item.route;
    } else {
      if (!item.disabled) this.routerService.navigate(item.route);
    }
  }

  toggleSubGroup(item: MenuItem) {
    if (this.collapsedSubMenu == '/' + item.route.split('/')[2])
      this.collapsedSubMenu = 'root';
    else this.collapsedSubMenu = '/' + item.route.split('/')[2];
  }
}

export abstract class MenuItem {
  name: string;
  items: object[];
  route: string;
  disabled?: boolean;
}
