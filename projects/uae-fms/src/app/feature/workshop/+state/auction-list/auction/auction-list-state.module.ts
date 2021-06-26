import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuctionListEffect } from './auction-list.effects';
import { WORKSHOP_AUCTION_LIST_FEATURE_KEY } from './auction-list.entity';
import * as auctionListReducer from './auction-list.reducer';
import { AuctionListFacade, AuctionListService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(
      WORKSHOP_AUCTION_LIST_FEATURE_KEY,
      auctionListReducer.reducer
    ),
    EffectsModule.forFeature([AuctionListEffect])
  ],
  providers: [AuctionListService, AuctionListFacade]
})
export class AuctionListStateModule {}
