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

  submitted$ = this.store.pipe(select(BodyShopLocationSelectors.submitted));
  constructor(private store: Store<IBodyShopLocationPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopLocationActions.loadAll());
  }
  addLocation(data: any) {
    this.store.dispatch(BodyShopLocationActions.addBodyShopLocation({ data }));
  }

  editLocation(bodyShopLocation: any) {
    this.store.dispatch(
      BodyShopLocationActions.editBodyShopLocation({ bodyShopLocation })
    );
  }

  getLocationById(id: number) {
    return this.store.pipe(
      select(BodyShopLocationSelectors.selectById, { id })
    );
  }

  resetParams() {
    this.store.dispatch(BodyShopLocationActions.resetParams());
  }
}
