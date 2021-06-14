import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PartListEffect } from './part-list.effects';
import { reducers } from './part-list.reducer';
import { PartListFacade, PartListService } from './index';
import { PARTSTORE_PARTLIST_FEATURE_KEY } from './part-list.entity';

@NgModule({
  imports: [
    StoreModule.forFeature(PARTSTORE_PARTLIST_FEATURE_KEY, reducers),
    EffectsModule.forFeature([PartListEffect])
  ],
  providers: [PartListFacade, PartListService]
})
export class PartListStateModule {}
