import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OperatorSelectors } from './operator.selectors';
import { IOperatorPartialState } from './operator.entity';
import { OperatorActions } from './operator.actions';

@Injectable()
export class OperatorFacade {
  operator$ = this.store.pipe(
    select(OperatorSelectors.selectAll)
  );

  message$ = this.store.pipe(select(OperatorSelectors.message));

  error$ = this.store.pipe(select(OperatorSelectors.error));

  constructor(private store: Store<IOperatorPartialState>) {}

  loadAll() {
    this.store.dispatch(OperatorActions.loadAll());
  }
}
