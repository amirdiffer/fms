import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuctionListSelectors } from './auction-list.selectors';
import {
  IAuctionListModel,
  IAuctionListPartialState
} from './auction-list.entity';
import { AuctionListActions } from './auction-list.actions';

@Injectable()
export class AuctionListFacade {
  auction$ = this.store.pipe(select(AuctionListSelectors.selectAll));

  message$ = this.store.pipe(select(AuctionListSelectors.message));

  error$ = this.store.pipe(select(AuctionListSelectors.error));

  constructor(private store: Store<IAuctionListPartialState>) {}

  loadAll() {
    this.store.dispatch(AuctionListActions.loadAll());
  }

  updateRow(data: IAuctionListModel) {
    this.store.dispatch(AuctionListActions.updateRow({ data: data }));
  }
}
