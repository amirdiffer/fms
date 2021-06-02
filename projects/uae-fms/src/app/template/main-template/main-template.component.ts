import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { RouterFacade } from '@core/router';
import { SidebarMenuFacade } from '@core/sidebar-menu';
import {
  authLogin,
  authLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from '@core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '@core/settings/settings.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss'],
  animations: [routeAnimations]
})
export class MainTemplateComponent implements OnInit {
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

  translations = {};
  breadcrumb = [];

  path: string[] = [];

  constructor(
    private store: Store,
    private routerFacade: RouterFacade,
    private storageService: LocalStorageService,
    private sidebarMenuFacade: SidebarMenuFacade,
    private translationService: TranslateService
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (MainTemplateComponent.isIEorEdgeOrSafari()) {
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

    this.language$.subscribe((x) => {
      if (Object.keys(this.translations).length > 0) this.getTranslations();
    });

    this.route$.subscribe((x) => {
      let pathByQueryParam = '';
      if (x?.queryParams) {
        let arrPath2 = Object.values(x?.queryParams);
        arrPath2.forEach(p => {
          if (!isNaN(parseInt(p)))
            pathByQueryParam = pathByQueryParam + '/' + p;
        })
      }
      x?.queryParams ?
      this.getPath(x?.url.split('?').shift() + pathByQueryParam) :
      this.getPath(x?.url);
      this.translations = {};
      this.translations = Object.assign.apply(
        null,
        this.path.map((x) => ({
          ['breadcrumb.' + x.toLowerCase().split(' ').join('_')]: ''
        }))
      );
      this.getTranslations();
    });
  }

  getTranslations() {
    const translationLabels = Object.keys(this.translations);
    this.translationService.get(translationLabels).subscribe((translation) => {
      this.translations = translation;
      let y = Object.entries(this.translations).map(x => {
        if (x[0] == x[1]) {
          x[1] = (<string>x[1]).split('.')[1];
          if (!this.existUnderline((<string>x[1]))) {
            x[1] = 'item_' + x[1];
          }
        }
        return x;
      });
      this.breadcrumb = y.map(x => x[1]);
    });
  }

  existUnderline(part: string): boolean {
    return part.includes('_')
  }
  splitPart(part: string) {
    return part.split('_');
  }

  onLoginClick() {
    this.store.dispatch(authLogin());
  }

  getPartLink(index) {
    let mainPath = this.path;
    let baseUrl = '';
    if (mainPath.length > 0) {
      baseUrl = '/' + mainPath[1].toLowerCase().replace(' ', '-');
    }
    let h = mainPath.filter((x, i) => {
      return i <= index;
    }).map(x => {
      return x.toLowerCase().replace(' ', '-');
    });
    let result = '';
    h.forEach(x => {
      result = result + '/' + x;
    });
    return h.length == 1 ? result + baseUrl : result;
  }

  onLogoutClick() {
    this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
    this.getTranslations();
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
          let separator = this.path[i].split('-').length > j + 1 ? ' ' : '';
          name += this.wordToUppercase(x) + separator;
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

  type(param: any) {
    return typeof param;
  }
}
