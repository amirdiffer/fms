import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ServiceShopRequestActions } from './service-shop-request.actions';
import { ServiceshopRequestPartialState } from './service-shop-request.entity';
import { ServiceShopRequestSelectors } from './service-shop-request.selectors';


@Injectable()
export class ServiceShopRequestFacade {
  serviceShop$ = this.store.pipe(select(ServiceShopRequestSelectors.selectAll));
  requestsById$ = this.store.pipe(select(ServiceShopRequestSelectors.requests));
  assetRequest$ = this.store.pipe(select(ServiceShopRequestSelectors.assetRequest));

  statistics$ = this.store.pipe(
    select(ServiceShopRequestSelectors.selectStatistics)
  );

  message$ = this.store.pipe(select(ServiceShopRequestSelectors.message));

  error$ = this.store.pipe(select(ServiceShopRequestSelectors.error));

  submitted$ = this.store.pipe(select(ServiceShopRequestSelectors.submitted));
  constructor(private store: Store<ServiceshopRequestPartialState>) {}

  loadAll() {
    this.store.dispatch(ServiceShopRequestActions.loadAll());
  }
  loadStatistics() {
    this.store.dispatch(ServiceShopRequestActions.loadStatistics());
  }

  addRequest(data: any) {
    this.store.dispatch(ServiceShopRequestActions.addRequest({ data }));
  }

  editRequest(request: any) {
    this.store.dispatch(ServiceShopRequestActions.editRequest({ request }));
  }

  getRequestById(id: number) {
    return this.store.pipe(select(ServiceShopRequestSelectors.selectById, { id }));
  }

  getRequestsById(id: number) {
    this.store.dispatch(ServiceShopRequestActions.loadAllRequestsById({ id } ));
  }

  getAssetRequest (assetId:number) {
    this.store.dispatch(ServiceShopRequestActions.loadAllRequestByAssetId({assetId}))
  }
  resetParams() {
    this.store.dispatch(ServiceShopRequestActions.resetParams());
  }
}
