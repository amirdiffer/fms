import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';

import {
  AppState,
  reducers,
  metaReducers,
  selectRouterState
} from './core.state';
import { selectIsAuthenticated, selectAuth } from './auth/auth.selectors';
import { authLogin, authLogout } from './auth/auth.actions';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthEffects } from './auth/auth.effects';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { NotificationService } from './notifications/notification.service';
import { CustomSerializer } from './router/custom-serializer';

import { TitleService } from './title/title.service';
import { AnimationsService } from './animations/animations.service';

import {
  selectSettingsLanguage,
  selectEffectiveTheme,
  selectSettingsStickyHeader
} from './settings/settings.selectors';
import { SettingsEffects } from './settings/settings.effects';

import { RouterFacade } from './router';

export {
  TitleService,
  selectAuth,
  authLogin,
  authLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService,
  AuthGuardService,
  selectRouterState,
  NotificationService,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
};

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,

    // material
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatButtonModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, SettingsEffects]),

    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'Angular NgRx Material Starter'
      }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    //Other
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    RouterFacade
  ],
  exports: [
    // angular
    FormsModule,

    // material
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatButtonModule,

    // 3rd party
    TranslateModule,
  ]
})
export class CoreModule {
}
