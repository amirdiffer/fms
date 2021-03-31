import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '@feature/fleet/+state/fleet.reducer';

import { FLEET_FEATURE_KEY } from '@feature/fleet/+state/fleet.entity';
import { AssetMasterEffects } from '@feature/fleet/+state/assets/asset-master/asset-master.effects';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master/asset-master.facade';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master/asset-master.service';
import { CustomizationEffects } from '@feature/fleet/+state/assets/customization/customization.effects';
import { CustomizationFacade } from '@feature/fleet/+state/assets/customization/customization.facade';
import { CustomizationService } from '@feature/fleet/+state/assets/customization/customization.service';
import { RegistrationEffects } from '@feature/fleet/+state/assets/registration/registration.effects';
import {
  RegistrationFacade,
  RegistrationService
} from '@feature/fleet/+state/assets/registration';
import {
  MovementOverviewFacade,
  MovementOverviewService,
  MovementRequestsFacade,
  MovementRequestsService
} from './movement';
import { OperatorFacade, OperatorService, OperatorEffect } from './operator/index';
import { AccessoryFacade, AccessoryService } from './accessory/index';
import { SubAssetEffect } from './sub-asset/sub-asset.effect';
import { SubAssetFacade, SubAssetService } from './sub-asset';
import {
  OrganizationFacade,
  OrganizationService
} from '../+state/organization';
import { OrganizationEffects } from '../+state/organization/organization-effects.service';
import { AccessoryEffect } from './accessory/accessory.effect';
import { MovementRequestsEffect } from '@feature/fleet/+state/movement/requests/movement-requests.effect';
import { MovementOverviewEffect } from '@feature/fleet/+state/movement/overview/movement-overview.effect';
import { ConfigurationStateModule } from '@feature/configuration/+state';
import { MovementRequestsEffectTemporary } from '@feature/fleet/+state/movement/temporary/requests/movement-requests.effect';
import { MovementOverviewEffectTemporary } from '@feature/fleet/+state/movement/temporary/overview/movement-overview.effect';
import { MovementOverviewFacadeTemporary } from '@feature/fleet/+state/movement/temporary/overview/movement-overview.facade';
import { MovementOverviewServiceTemporary } from '@feature/fleet/+state/movement/temporary/overview/movement-overview.service';
import { MovementRequestsFacadeTemporary } from '@feature/fleet/+state/movement/temporary/requests/movement-requests.facade';
import { MovementRequestsServiceTemporary } from '@feature/fleet/+state/movement/temporary/requests/movement-requests.service';


@NgModule({
  imports: [
    StoreModule.forFeature(FLEET_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      AssetMasterEffects,
      CustomizationEffects,
      RegistrationEffects,
      OrganizationEffects,
      SubAssetEffect,
      AccessoryEffect,
      MovementRequestsEffect,
      MovementRequestsEffectTemporary,
      MovementOverviewEffect,
      MovementOverviewEffectTemporary,
      OperatorEffect
    ]),
    ConfigurationStateModule
  ],
  exports: [],
  declarations: [],
  providers: [
    AssetMasterFacade,
    AssetMasterService,
    CustomizationFacade,
    CustomizationService,
    RegistrationFacade,
    RegistrationService,
    MovementOverviewFacade,
    MovementOverviewFacadeTemporary,
    MovementOverviewService,
    MovementOverviewServiceTemporary,
    MovementRequestsFacade,
    MovementRequestsFacadeTemporary,
    MovementRequestsService,
    MovementRequestsServiceTemporary,
    OperatorFacade,
    OperatorService,
    AccessoryFacade,
    AccessoryService,
    OrganizationService,
    OrganizationFacade,
    SubAssetFacade,
    SubAssetService,

  ]
})
export class FleetStateModule { }
