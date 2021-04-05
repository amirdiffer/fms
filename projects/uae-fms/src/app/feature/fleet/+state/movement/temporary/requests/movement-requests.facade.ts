import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MovementRequestsSelectorsTemporary } from './movement-requests.selectors';
import { MovementRequestsPartialState } from './movement-requests.entity';
import { MovementRequestsActionsTemporary } from './movement-requests.actions';

@Injectable()
export class MovementRequestsFacadeTemporary {
  MovementRequests$ = this.store.pipe(
    select(MovementRequestsSelectorsTemporary.selectAll)
  );

  MovementRequestStatistic = this.store.pipe(
    select(MovementRequestsSelectorsTemporary.requestStatistic)
  );

  message$ = this.store.pipe(
    select(MovementRequestsSelectorsTemporary.message)
  );

  error$ = this.store.pipe(select(MovementRequestsSelectorsTemporary.error));

  submitted$ = this.store.pipe(
    select(MovementRequestsSelectorsTemporary.submitted)
  );

  rejected$ = this.store.pipe(
    select(MovementRequestsSelectorsTemporary.rejected)
  );

  assigned$ = this.store.pipe(
    select(MovementRequestsSelectorsTemporary.assigned)
  );

  constructor(private store: Store<MovementRequestsPartialState>) {}

  loadAll() {
    this.store.dispatch(MovementRequestsActionsTemporary.loadAll());
  }

  loadRequestStatistic() {
    this.store.dispatch(MovementRequestsActionsTemporary.loadStatistic());
  }

  addMovementRequest(data: any) {
    this.store.dispatch(
      MovementRequestsActionsTemporary.addMovementRequest({ data })
    );
  }

  editMovementRequest(data: any) {
    this.store.dispatch(
      MovementRequestsActionsTemporary.editMovementRequest({ data })
    );
  }

  rejecting(data: any) {
    this.store.dispatch(MovementRequestsActionsTemporary.reject({ data }));
  }

  assigning(id, data: any) {
    this.store.dispatch(MovementRequestsActionsTemporary.assign({ id, data }));
  }

  reset() {
    this.store.dispatch(MovementRequestsActionsTemporary.reset());
  }
}
