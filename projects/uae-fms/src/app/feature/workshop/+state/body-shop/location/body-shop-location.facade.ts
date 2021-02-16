import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BodyShopLocationActions } from './body-shop-location.actions';
import { IBodyShopLocationPartialState } from './body-shop-location.entity';
import { BodyShopLocationSelectors } from './body-shop-location.selectors';


@Injectable()
export class BodyShopLocationFacade {
  bodyShop$ = this.store.pipe(select(BodyShopLocationSelectors.selectAll));

  message$ = this.store.pipe(select(BodyShopLocationSelectors.message));

  error$ = this.store.pipe(select(BodyShopLocationSelectors.error));

  constructor(private store: Store<IBodyShopLocationPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopLocationActions.loadAll());
  }
}