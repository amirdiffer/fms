import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CONFIGURATION_FEATURE_KEY } from './configuration.entity';
import { reducers } from './configuration.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RolePermissionEffect } from './role-permission/role-permission.effect';
import { RolePermissionFacade } from './role-permission/role-permission.facade';
import { RolePermissionService } from './role-permission/role-permission.service';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(CONFIGURATION_FEATURE_KEY, reducers),
    EffectsModule.forFeature([RolePermissionEffect])
  ],
  providers: [RolePermissionFacade, RolePermissionService]
})
export class ConfigurationStateModule {}
