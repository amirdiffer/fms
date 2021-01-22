import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarMenuFacade } from '../sidebar-menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() selectIsAuthenticated;
  @Input() selectSettingsStickyHeader;
  @Input() selectSettingsLanguage;
  @Input() selectEffectiveTheme;

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  logo = require('../../../assets/logo.svg').default;
  policeLogo = require('../../../assets/police-logo.svg').default;

  sidebarMenuOpened: boolean = false;

  constructor(
    private store: Store,
    private sidebarMenuFacade: SidebarMenuFacade
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(this.selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(
      select(this.selectSettingsStickyHeader)
    );
    this.language$ = this.store.pipe(select(this.selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(this.selectEffectiveTheme));

    this.sidebarMenuFacade.opened$.subscribe((x) => {
      this.sidebarMenuOpened = x;
    });
  }

  changeSidebarMenuState() {
    this.sidebarMenuOpened
      ? this.sidebarMenuFacade.closeSidebarMenu()
      : this.sidebarMenuFacade.openSidebarMenu();
  }
}
