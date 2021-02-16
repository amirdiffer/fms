import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IBodyshopJobCardPartialState } from './body-shop-job-card.entity';
import { BodyShopJobCardActions } from './body-shop-job-card.actions';
import { BodyShopJobCardSelectors } from './body-shop-job-card.selector';

@Injectable()
export class BodyShopJobCardFacade {
  bodyShop$ = this.store.pipe(select(BodyShopJobCardSelectors.selectAll));

  message$ = this.store.pipe(select(BodyShopJobCardSelectors.message));

  error$ = this.store.pipe(select(BodyShopJobCardSelectors.error));

  constructor(private store: Store<IBodyshopJobCardPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopJobCardActions.loadAll());
  }
}
