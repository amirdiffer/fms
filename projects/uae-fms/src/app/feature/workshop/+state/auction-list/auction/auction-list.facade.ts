import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuctionListSelectors } from './auction-list.selectors';
import { IAuctionListPartialState } from './auction-list.entity';
import { AuctionListActions } from './auction-list.actions';
@Injectable()
export class AuctionListFacade {
  bodyShop$ = this.store.pipe(select(AuctionListSelectors.selectAll));

  constructor(private store: Store<IAuctionListPartialState>) {}

  loadAll() {
    this.store.dispatch(AuctionListActions.loadAll());
  }
}
