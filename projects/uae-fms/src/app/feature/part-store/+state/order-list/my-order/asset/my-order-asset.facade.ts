import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MyOrderAssetActions } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.actions';
import { IMyOrderAssetListPartialState } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.entity';
import { MyOrderAssetSelectors } from '@feature/part-store/+state/order-list/my-order/asset/my-order-asset.selectors';

@Injectable()
export class MyOrderAssetFacade {
  myOrderSubAsset$ = this.store.pipe(select(MyOrderAssetSelectors.selectAll));

  message$ = this.store.pipe(select(MyOrderAssetSelectors.message));

  error$ = this.store.pipe(select(MyOrderAssetSelectors.error));

  submitted$ = this.store.pipe(select(MyOrderAssetSelectors.submitted));

  constructor(private store: Store<IMyOrderAssetListPartialState>) {this.loadAll()}

  loadAll() {
    this.store.dispatch(MyOrderAssetActions.loadAll());
  }

  addOrder(data: any) {
    this.store.dispatch(MyOrderAssetActions.addOrder({ data }));
  }

  addRequest(data: any) {
    this.store.dispatch(MyOrderAssetActions.addRequest({ data }));
  }

  updateOrder(data: any) {
    this.store.dispatch(MyOrderAssetActions.updateOrder({ data }));
  }

  receiveOrder(data: any) {
    this.store.dispatch(MyOrderAssetActions.receiveOrder({ data }));
  }

  reset() {
    this.store.dispatch(MyOrderAssetActions.reset());
  }
}
