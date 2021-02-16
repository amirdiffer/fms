import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MyOrderSelectors } from '@feature/part-store/+state/order-list/my-order/my-order.selectors';
import { IMyOrderListPartialState } from '@feature/part-store/+state/order-list/my-order/my-order.entity';
import { MyOrderActions } from '@feature/part-store/+state/order-list/my-order/my-order.actions';

@Injectable()
export class MyOrderFacade {
  myOrder$ = this.store.pipe(select(MyOrderSelectors.selectAll));

  constructor(private store: Store<IMyOrderListPartialState>) {}

  loadAll() {
    this.store.dispatch(MyOrderActions.loadAll());
  }
}
