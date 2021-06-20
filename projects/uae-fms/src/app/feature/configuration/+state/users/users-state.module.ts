import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffect } from './users.effect';
import { CONFIGURATION_USERS_FEATURE_KEY } from './users.entity';
import * as usersReducer from './users.reducer';
import { UsersFacade, UsersService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_USERS_FEATURE_KEY, usersReducer.reducer),
    EffectsModule.forFeature([UsersEffect])
  ],
  providers: [
    UsersService,
    UsersFacade
  ]
})

export class UsersStateModule {
}
