import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MovementRequestsSelectors } from './movement-requests.selectors';
import { MovementRequestsPartialState } from './movement-requests.entity';
import { MovementRequestsActions } from './movement-requests.actions';

@Injectable()
export class MovementRequestsFacade {
  MovementRequests$ = this.store.pipe(
    select(MovementRequestsSelectors.selectAll)
  );

  message$ = this.store.pipe(select(MovementRequestsSelectors.message));

  error$ = this.store.pipe(select(MovementRequestsSelectors.error));

  constructor(private store: Store<MovementRequestsPartialState>) {}

  loadAll() {
    this.store.dispatch(MovementRequestsActions.loadAll());
  }
}
