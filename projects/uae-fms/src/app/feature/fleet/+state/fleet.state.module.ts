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

@NgModule({
  imports: [
    StoreModule.forFeature(FLEET_FEATURE_KEY, reducers),
    EffectsModule.forFeature([
      AssetMasterEffects,
      CustomizationEffects,
      RegistrationEffects
    ])
  ],
  exports: [],
  declarations: [],
  providers: [
    AssetMasterFacade,
    AssetMasterService,
    CustomizationFacade,
    CustomizationService,
    RegistrationFacade,
    RegistrationService
  ]
})
export class FleetStateModule {}