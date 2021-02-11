import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CONFIGURATION_FEATURE_KEY } from './configuration.entity';
import { reducers } from './configuration.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RolePermissionEffect } from './role-permission/role-permission.effect';
import { RolePermissionFacade } from './role-permission/role-permission.facade';
import { RolePermissionService } from './role-permission/role-permission.service';
import { AssetPolicyEffect } from './asset-policy/asset-policy.effect';
import { AssetPolicyFacade, AssetPolicyService } from './asset-policy';
import { UsersFacade, UsersService } from './users';
import { UsersEffect } from './users/users.effect';
import { FleetStatusEffect } from './fleet-status/fleet-status.effect';
import { FleetStatusFacade, FleetStatusService } from './fleet-status';
import { OwnershipFacade, OwnershipService } from './ownership';
import { OwnershipEffect } from './ownership/ownership.effect';
import { PeriodicServiceEffect } from '../+state/periodic-service/periodic-service.effect';
import {
  PeriodicServiceFacade,
  PeriodicServiceService
} from '../+state/periodic-service';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(CONFIGURATION_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      RolePermissionEffect,
      AssetPolicyEffect,
      UsersEffect,
      FleetStatusEffect,
      OwnershipEffect,
      PeriodicServiceEffect
    ])
  ],
  providers: [
    RolePermissionFacade,
    RolePermissionService,
    AssetPolicyFacade,
    AssetPolicyService,
    UsersFacade,
    UsersService,
    FleetStatusFacade,
    FleetStatusService,
    OwnershipFacade,
    OwnershipService,
    PeriodicServiceFacade,
    PeriodicServiceService
  ]
})
export class ConfigurationStateModule {}
