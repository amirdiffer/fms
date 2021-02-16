import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersEffect } from './users/users.effect';
import { reducers } from './configuration.reducer';
import { UsersFacade, UsersService } from './users';
import { OwnershipFacade, OwnershipService } from './ownership';
import { OwnershipEffect } from './ownership/ownership.effect';
import { CONFIGURATION_FEATURE_KEY } from './configuration.entity';
import {
  FleetStatusAssetFacade,
  FleetStatusAssetService,
  FleetStatusSubAssetFacade,
  FleetStatusSubAssetService
} from './fleet-status';
import { FleetStatusAssetEffect } from './fleet-status/asset/fleet-status-asset.effect';
import { AssetPolicyEffect } from './asset-policy/asset/asset-policy.effect';
import { SubAssetPolicyEffect } from './asset-policy/sub-asset/sub-asset-policy.effect';
import {
  AssetPolicyFacade,
  AssetPolicyService,
  SubAssetPolicyFacade,
  SubAssetPolicyService
} from './asset-policy';

import { RolePermissionEffect } from './role-permission/role-permission.effect';
import { RolePermissionFacade } from './role-permission/role-permission.facade';
import { RolePermissionService } from './role-permission/role-permission.service';
import { BusinessCategoryEffect } from './business-category/business-category.effect';
import {
  BusinessCategoryFacade,
  BusinessCategoryService
} from './business-category';

import {
  PeriodicServiceFacade,
  PeriodicServiceService
} from '../+state/periodic-service';
import { PeriodicServiceEffect } from '../+state/periodic-service/periodic-service.effect';
import { FleetStatusSubAssetEffect } from './fleet-status/sub-asset/fleet-status-sub-asset.effect';
import {
  AssetConfigurationFacade,
  AssetConfigurationService
} from '../+state/asset-configuration';
import { AssetConfigurationEffect } from '../+state/asset-configuration/asset-configuration.effect';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(CONFIGURATION_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      RolePermissionEffect,
      AssetPolicyEffect,
      SubAssetPolicyEffect,
      UsersEffect,
      BusinessCategoryEffect,
      FleetStatusAssetEffect,
      FleetStatusSubAssetEffect,
      OwnershipEffect,
      PeriodicServiceEffect,
      AssetConfigurationEffect
    ])
  ],
  providers: [
    RolePermissionFacade,
    RolePermissionService,
    AssetPolicyFacade,
    SubAssetPolicyFacade,
    AssetPolicyService,
    SubAssetPolicyService,
    UsersFacade,
    UsersService,
    BusinessCategoryService,
    BusinessCategoryFacade,
    FleetStatusAssetFacade,
    FleetStatusAssetService,
    FleetStatusSubAssetFacade,
    FleetStatusSubAssetService,
    OwnershipFacade,
    OwnershipService,
    PeriodicServiceFacade,
    PeriodicServiceService,
    AssetConfigurationFacade,
    AssetConfigurationService
  ]
})
export class ConfigurationStateModule {}
