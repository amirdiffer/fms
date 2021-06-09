import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BodyshopRequestPartialState } from './body-shop-request.entity';
import { BodyShopRequestActions } from './body-shop-request.actions';
import { BodyShopRequestSelectors } from './body-shop-request.selectors';

@Injectable()
export class BodyShopRequestFacade {
  bodyShop$ = this.store.pipe(select(BodyShopRequestSelectors.selectAll));

  requestsById$ = this.store.pipe(select(BodyShopRequestSelectors.requests));

  assetRequest$ = this.store.pipe(
    select(BodyShopRequestSelectors.assetRequest)
  );

  spicificRequest$ = this.store.pipe(
    select(BodyShopRequestSelectors.specificRequest)
  );

  statistics$ = this.store.pipe(
    select(BodyShopRequestSelectors.selectStatistics)
  );

  message$ = this.store.pipe(select(BodyShopRequestSelectors.message));

  error$ = this.store.pipe(select(BodyShopRequestSelectors.error));

  submitted$ = this.store.pipe(select(BodyShopRequestSelectors.submitted));

  conut$ = this.store.pipe(select(BodyShopRequestSelectors.count));

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
    this.store.dispatch(BodyShopRequestActions.loadAllRequestsById({ id }));
  }

  getSpecificRequest(id: number) {
    this.store.dispatch(BodyShopRequestActions.getSpecificRequest({ id }));
  }

  getAssetRequest(assetId: number) {
    this.store.dispatch(
      BodyShopRequestActions.loadAllRequestByAssetId({ assetId })
    );
  }
  resetParams() {
    this.store.dispatch(BodyShopRequestActions.resetParams());
  }
}
