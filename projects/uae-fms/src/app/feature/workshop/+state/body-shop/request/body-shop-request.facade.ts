import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BodyshopRequestPartialState } from './body-shop-request.entity';
import { BodyShopRequestActions } from './body-shop-request.actions';
import { BodyShopRequestSelectors } from './body-shop-request.selectors';

@Injectable()
export class BodyShopRequestFacade {
  bodyShop$ = this.store.pipe(select(BodyShopRequestSelectors.selectAll));
  requestsById$ = this.store.pipe(select(BodyShopRequestSelectors.requests));
  statistics$ = this.store.pipe(
    select(BodyShopRequestSelectors.selectStatistics)
  );

  message$ = this.store.pipe(select(BodyShopRequestSelectors.message));

  error$ = this.store.pipe(select(BodyShopRequestSelectors.error));

  submitted$ = this.store.pipe(select(BodyShopRequestSelectors.submitted));
  constructor(private store: Store<BodyshopRequestPartialState>) {}

  loadAll() {
    this.store.dispatch(BodyShopRequestActions.loadAll());
  }
  loadStatistics() {
    this.store.dispatch(BodyShopRequestActions.loadStatistics());
  }

  addRequest(data: any) {
    this.store.dispatch(BodyShopRequestActions.addRequest({ data }));
  }

  editRequest(request: any) {
    this.store.dispatch(BodyShopRequestActions.editRequest({ request }));
  }

  getRequestById(id: number) {
    return this.store.pipe(select(BodyShopRequestSelectors.selectById, { id }));
  }

  getRequestsById(id: number) {
    this.store.dispatch(BodyShopRequestActions.loadAllRequestsById({ id } ));
  }

  resetParams() {
    this.store.dispatch(BodyShopRequestActions.resetParams());
  }
}
