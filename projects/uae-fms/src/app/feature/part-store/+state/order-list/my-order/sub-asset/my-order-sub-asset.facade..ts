import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MyOrderSubAssetSelectors } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.selectors';
import { IMyOrderSubAssetListPartialState } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.entity';
import { MyOrderSubAssetActions } from '@feature/part-store/+state/order-list/my-order/sub-asset/my-order-sub-asset.actions';

@Injectable()
export class MyOrderSubAssetFacade {
  myOrderAsset$ = this.store.pipe(select(MyOrderSubAssetSelectors.selectAll));

  message$ = this.store.pipe(select(MyOrderSubAssetSelectors.message));

  error$ = this.store.pipe(select(MyOrderSubAssetSelectors.error));

  submitted$ = this.store.pipe(select(MyOrderSubAssetSelectors.submitted));

  constructor(private store: Store<IMyOrderSubAssetListPartialState>) {
    this.loadAll();
  }

  loadAll() {
    this.store.dispatch(MyOrderSubAssetActions.loadAll());
  }

  addOrder(data: any) {
    this.store.dispatch(MyOrderSubAssetActions.addOrder({ data }));
  }

  addRequest(data: any) {
    this.store.dispatch(MyOrderSubAssetActions.addRequest({ data }));
  }

  updateOrder(data: any) {
    this.store.dispatch(MyOrderSubAssetActions.updateOrder({ data }));
  }

  receiveOrder(data: any) {
    this.store.dispatch(MyOrderSubAssetActions.receiveOrder({ data }));
  }

  reset() {
    this.store.dispatch(MyOrderSubAssetActions.reset());
  }
}
