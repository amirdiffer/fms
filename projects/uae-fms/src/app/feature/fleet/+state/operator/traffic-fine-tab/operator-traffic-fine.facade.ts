import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OperatorTrafficFineSelectors } from './operator-traffic-fine.selectors';
import { IOperatorTrafficFinePartialState } from './operator-traffic-fine.entity';
import { OperatorTrafficFineActions } from './operator-traffic-fine.actions';

@Injectable()
export class OperatorTrafficFineFacade {
  trafficFine$ = this.store.pipe(select(OperatorTrafficFineSelectors.selectAll));

  message$ = this.store.pipe(select(OperatorTrafficFineSelectors.message));

  error$ = this.store.pipe(select(OperatorTrafficFineSelectors.error));

  statistics$ = this.store.pipe(select(OperatorTrafficFineSelectors.selectStatistics));

  count$ = this.store.pipe(select(OperatorTrafficFineSelectors.count));

  constructor(private store: Store<IOperatorTrafficFinePartialState>) {}

  loadAll(id: number) {
    this.store.dispatch(OperatorTrafficFineActions.loadAll({ id }));
  }

  loadStatistics() {
    this.store.dispatch(OperatorTrafficFineActions.loadStatistics());
  }

  resetParams() {
    this.store.dispatch(OperatorTrafficFineActions.resetParams());
  }
}
