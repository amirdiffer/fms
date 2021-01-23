import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { RouterFacade } from '../core/router';
import { SidebarMenuFacade } from '../core/sidebar-menu';

import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '../core/core.module';

import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';

@Component({
  selector: 'anms-root',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  animations: [routeAnimations]
})
export class TemplateComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  languages = ['en', 'ar'];

  selectIsAuthenticated = selectIsAuthenticated;
  selectSettingsStickyHeader = selectSettingsStickyHeader;
  selectSettingsLanguage = selectSettingsLanguage;
  selectEffectiveTheme = selectEffectiveTheme;

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  route$ = this.routerFacade.route$;
  showSideMenu$ = this.sidebarMenuFacade.show$;

  path: string[] = [];

  constructor(
    private store: Store,
    private routerFacade: RouterFacade,
    private storageService: LocalStorageService,
    private sidebarMenuFacade: SidebarMenuFacade
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (TemplateComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(this.selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(
      select(this.selectSettingsStickyHeader)
    );
    this.language$ = this.store.pipe(select(this.selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(this.selectEffectiveTheme));

    this.route$.subscribe((x) => {
      this.getPath(x?.url);
    });
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  getPath(url: string) {
    if (url && url[0] == '/') {
      url = url.substring(1, url.length);
      this.path = url.split('/');
    }
    for (var i = 0; i < this.path.length; i++) {
      if (this.path[i].split('-').length > 1) {
        let name = '';
        this.path[i].split('-').forEach((x, j) => {
          name += this.wordToUppercase(x) + ' ';
        });
        this.path[i] = name;
      } else this.path[i] = this.wordToUppercase(this.path[i]);
    }
  }

  wordToUppercase(word: string): string {
    let a = word && word[0] ? '' + word[0].toUpperCase() : '';

    for (var i = 1; i < word.length; i++) {
      a = a + word[i];
    }
    return a;
  }
}
