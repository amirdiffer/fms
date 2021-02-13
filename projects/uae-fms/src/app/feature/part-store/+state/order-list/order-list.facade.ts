import { OrderListStateModel } from './order-list.entity';
import { OrderListActions } from './order-list.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderListSelectors } from './order-list.selectors';

@Injectable()
export class OrderListFacade {
  orderList$ = this.store.pipe(select(OrderListSelectors.selectAll));

  message$ = this.store.pipe(select(OrderListSelectors.message));

  error$ = this.store.pipe(select(OrderListSelectors.error));

  constructor(private store: Store<OrderListStateModel>) {}

  loadAll() {
    this.store.dispatch(OrderListActions.loadAll());
  }
}
