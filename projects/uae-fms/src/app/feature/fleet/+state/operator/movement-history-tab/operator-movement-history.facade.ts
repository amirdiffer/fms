import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OperatorMovementHistorySelectors } from './operator-movement-history.selectors';
import { IOperatorMovementHistoryPartialState } from './operator-movement-history.entity';
import { OperatorMovementHistoryActions } from './operator-movement-history.actions';

@Injectable()
export class OperatorMovementHistoryFacade {
  movementHistory$ = this.store.pipe(select(OperatorMovementHistorySelectors.selectAll));

  message$ = this.store.pipe(select(OperatorMovementHistorySelectors.message));

  error$ = this.store.pipe(select(OperatorMovementHistorySelectors.error));

  count$ = this.store.pipe(select(OperatorMovementHistorySelectors.count));

  constructor(private store: Store<IOperatorMovementHistoryPartialState>) {}

  loadAll(id: number) {
    this.store.dispatch(OperatorMovementHistoryActions.loadAll({ id }));
  }

  resetParams() {
    this.store.dispatch(OperatorMovementHistoryActions.resetParams());
  }
}
