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

  MovementRequestStatistic = this.store.pipe(select(MovementRequestsSelectors.requestStatistic));

  message$ = this.store.pipe(select(MovementRequestsSelectors.message));

  error$ = this.store.pipe(select(MovementRequestsSelectors.error));

  submitted$ = this.store.pipe(select(MovementRequestsSelectors.submitted));

  rejected$ = this.store.pipe(select(MovementRequestsSelectors.rejected));

  assigned$ = this.store.pipe(select(MovementRequestsSelectors.assigned));

  constructor(private store: Store<MovementRequestsPartialState>) {}

  loadAll() {
    this.store.dispatch(MovementRequestsActions.loadAll());
  }

  loadRequestStatistic() {
    this.store.dispatch(MovementRequestsActions.loadStatistic());
  }

  addMovementRequest(data: any) {
    this.store.dispatch(MovementRequestsActions.addMovementRequest({ data }));
  }

  editMovementRequest(data: any) {
    this.store.dispatch(MovementRequestsActions.editMovementRequest({ data }));
  }

  rejecting(data: any) {
    this.store.dispatch(MovementRequestsActions.reject({ data }));
  }

  assigning(id, data: any) {
    this.store.dispatch(MovementRequestsActions.assign({ id, data }));
  }


  reset() {
    this.store.dispatch(MovementRequestsActions.reset());
  }

}
