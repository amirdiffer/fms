import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RequestListEffect } from './request-list.effects';
import * as requestListReducer from './request-list.reducer';
import { RequestListFacade, RequestListService } from './index';
import { PARTSTORE_REQUEST_LIST_FEATURE_KEY } from './request-list.entity';

@NgModule({
  imports: [
    StoreModule.forFeature(
      PARTSTORE_REQUEST_LIST_FEATURE_KEY,
      requestListReducer.reducer
    ),
    EffectsModule.forFeature([RequestListEffect])
  ],
  providers: [RequestListFacade, RequestListService]
})
export class RequestListStateModule {}
