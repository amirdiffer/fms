import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BodyShopTechnicianActions } from './body-shop-technician.actions';
import { IBodyShopTechnicianPartialState } from './body-shop-technician.entity';
import { BodyShopTechnicianSelectors } from './body-shop-technician.selectors';

@Injectable()
export class BodyShopTechnicianFacade {
  bodyShop$ = this.store.pipe(select(BodyShopTechnicianSelectors.selectAll));

  message$ = this.store.pipe(select(BodyShopTechnicianSelectors.message));

  error$ = this.store.pipe(select(BodyShopTechnicianSelectors.error));

  constructor(private store: Store<IBodyShopTechnicianPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopTechnicianActions.loadAll());
  }
}
