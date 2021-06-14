import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PartMasterEffect } from './/part-master.effects';
import { reducers } from './part-master.reducer';
import { PartMasterFacade, PartMasterService } from './index';
import { PARTSTORE_PARTMASTER_FEATURE_KEY } from './part-master.entity';

@NgModule({
  imports: [
    StoreModule.forFeature(PARTSTORE_PARTMASTER_FEATURE_KEY, reducers),
    EffectsModule.forFeature([PartMasterEffect])
  ],
  providers: [PartMasterFacade, PartMasterService]
})
export class PartMasterStateModule {}
