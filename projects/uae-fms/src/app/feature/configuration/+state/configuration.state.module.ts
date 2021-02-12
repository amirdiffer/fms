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
<<<<<<< HEAD
import {
  BusinessCategoryFacade,
  BusinessCategoryService
} from './business-category';
import { BusinessCategoryEffect } from './business-category/business-category.effect';
=======
import { FleetStatusEffect } from './fleet-status/fleet-status.effect';
import { FleetStatusFacade, FleetStatusService } from './fleet-status';
import { OwnershipFacade, OwnershipService } from './ownership';
import { OwnershipEffect } from './ownership/ownership.effect';
import { PeriodicServiceEffect } from '../+state/periodic-service/periodic-service.effect';
import {
  PeriodicServiceFacade,
  PeriodicServiceService
} from '../+state/periodic-service';
>>>>>>> 44636e5d6b8dc59a2eb4dd46a91ef727e91ae33c

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(CONFIGURATION_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      RolePermissionEffect,
      AssetPolicyEffect,
      UsersEffect,
<<<<<<< HEAD
      BusinessCategoryEffect
=======
      FleetStatusEffect,
      OwnershipEffect,
      PeriodicServiceEffect
>>>>>>> 44636e5d6b8dc59a2eb4dd46a91ef727e91ae33c
    ])
  ],
  providers: [
    RolePermissionFacade,
    RolePermissionService,
    AssetPolicyFacade,
    AssetPolicyService,
    UsersFacade,
    UsersService,
<<<<<<< HEAD
    BusinessCategoryService,
    BusinessCategoryFacade
=======
    FleetStatusFacade,
    FleetStatusService,
    OwnershipFacade,
    OwnershipService,
    PeriodicServiceFacade,
    PeriodicServiceService
>>>>>>> 44636e5d6b8dc59a2eb4dd46a91ef727e91ae33c
  ]
})
export class ConfigurationStateModule {}
