import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './auth/auth.effects';
import { SettingsEffects } from './settings/settings.effects';
import { AppState, reducers, metaReducers, selectRouterState } from './core.state';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { CustomSerializer } from './router/custom-serializer';
import { RouterFacade } from './router';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([AuthEffects, SettingsEffects]),
        StoreRouterConnectingModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        RouterFacade
    ],
})
export class CoreStateModule { }
