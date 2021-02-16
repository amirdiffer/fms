import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BodyshopRequestPartialState } from './body-shop-request.entity';
import { BodyShopRequestActions } from './body-shop-request.actions';
import { BodyShopRequestSelectors } from './body-shop-request.selectors';

@Injectable()
export class BodyShopRequestFacade {
  bodyShop$ = this.store.pipe(select(BodyShopRequestSelectors.selectAll));

  message$ = this.store.pipe(select(BodyShopRequestSelectors.message));

  error$ = this.store.pipe(select(BodyShopRequestSelectors.error));

  constructor(private store: Store<BodyshopRequestPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopRequestActions.loadAll());
  }
}
