import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SidebarMenuFacade } from '../sidebar-menu';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Language } from '@core/settings/settings.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserProfileFacade } from '@feature/user/state';
import { ThemeService } from 'ng2-charts';
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
  profile$: Observable<any>;

  logo = require('../../../assets/logo.svg').default;
  policeLogo = require('../../../assets/police-logo.svg').default;

  sidebarMenuOpened: boolean = false;
  theme: string;
  constructor(
    private store: Store,
    private sidebarMenuFacade: SidebarMenuFacade,
    private settingsFacade: SettingsFacade,
    private profileFacade: UserProfileFacade,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.profileFacade.loadCalled) this.profileFacade.loadAll();
    this.isAuthenticated$ = this.store.pipe(select(this.selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(
      select(this.selectSettingsStickyHeader)
    );
    this.language$ = this.store.pipe(select(this.selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(this.selectEffectiveTheme));
    this.profile$ = this.profileFacade.loadData$;

    this.sidebarMenuFacade.opened$.subscribe((x) => {
      this.sidebarMenuOpened = x;
    });
    this.language$.subscribe((data) => {
      this.changeRTLStyle(data);
    });
    this.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  changeLanguage(language: Language): void {
    this.settingsFacade.changeLanguage(language);
    this.languageBox.hide();
  }
  changeRTLStyle(language) {
    let htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  changeSidebarMenuState() {
    this.sidebarMenuOpened
      ? this.sidebarMenuFacade.closeSidebarMenu()
      : this.sidebarMenuFacade.openSidebarMenu();
  }
  changeTheme() {
    this.theme == 'green-theme'
      ? this.settingsFacade.changeTheme('BLACK-THEME')
      : this.settingsFacade.changeTheme('GREEN-THEME');
  }

  logOut() {
    this.router.navigate(['login'], { queryParams: { action: 'logout' } });
  }
}
