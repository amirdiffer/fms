import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RequestListSelectors } from '@feature/part-store/+state/order-list/request-list/request-list.selectors';
import { IRequestListPartialState } from '@feature/part-store/+state/order-list/request-list/request-list.entity';
import { RequestListActions } from '@feature/part-store/+state/order-list/request-list/request-list.actions';

@Injectable()
export class RequestListFacade {
  requestList$ = this.store.pipe(select(RequestListSelectors.selectAll));

  message$ = this.store.pipe(select(RequestListSelectors.message));

  error$ = this.store.pipe(select(RequestListSelectors.error));

  constructor(private store: Store<IRequestListPartialState>) {}

  loadAll() {
    this.store.dispatch(RequestListActions.loadAll());
  }
}
