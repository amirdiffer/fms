import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersEffect } from './users/users.effect';
import { reducers } from './configuration.reducer';
import { UsersFacade, UsersService } from './users';
import { OwnershipFacade, OwnershipService } from './ownership';
import { OwnershipEffect } from './ownership/ownership.effect';
import { CONFIGURATION_FEATURE_KEY } from './configuration.entity';
import { AssetPolicyEffect } from './asset-policy/asset-policy.effect';
import { AssetPolicyFacade, AssetPolicyService } from './asset-policy';
import { FleetStatusFacade, FleetStatusService } from './fleet-status';
import { FleetStatusEffect } from './fleet-status/fleet-status.effect';
import { RolePermissionEffect } from './role-permission/role-permission.effect';
import { RolePermissionFacade } from './role-permission/role-permission.facade';
import { RolePermissionService } from './role-permission/role-permission.service';
import { BusinessCategoryEffect } from './business-category/business-category.effect';
import { BusinessCategoryFacade, BusinessCategoryService } from './business-category';

import { PeriodicServiceFacade, PeriodicServiceService } from '../+state/periodic-service';
import { PeriodicServiceEffect } from '../+state/periodic-service/periodic-service.effect';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(CONFIGURATION_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      RolePermissionEffect,
      AssetPolicyEffect,
      UsersEffect,
      BusinessCategoryEffect,
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
    BusinessCategoryService,
    BusinessCategoryFacade,
    FleetStatusFacade,
    FleetStatusService,
    OwnershipFacade,
    OwnershipService,
    PeriodicServiceFacade,
    PeriodicServiceService
  ]
})
export class ConfigurationStateModule { }
