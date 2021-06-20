import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RolePermissionEffect } from './role-permission.effect';
import { CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY } from './role-permission.entity';
import * as rolePermissionReducer from './role-permission.reducer';
import { RolePermissionFacade, RolePermissionService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_ROLE_PERMISSION_FEATURE_KEY, rolePermissionReducer.reducer),
    EffectsModule.forFeature([RolePermissionEffect])
  ],
  providers: [
    RolePermissionService,
    RolePermissionFacade
  ]
})

export class RolePermissionStateModule {
}
