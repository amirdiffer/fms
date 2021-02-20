import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarMenuFacade } from '../sidebar-menu';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Language } from '@core/settings/settings.model';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('languageBox', { static: true }) languageBox: OverlayPanel;
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
    private sidebarMenuFacade: SidebarMenuFacade,
    private settingsFacade: SettingsFacade
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

  changeLanguage(language: Language): void {
    this.settingsFacade.changeLanguage(language);
    this.languageBox.hide();
  }

  changeSidebarMenuState() {
    this.sidebarMenuOpened
      ? this.sidebarMenuFacade.closeSidebarMenu()
      : this.sidebarMenuFacade.openSidebarMenu();
  }
}
