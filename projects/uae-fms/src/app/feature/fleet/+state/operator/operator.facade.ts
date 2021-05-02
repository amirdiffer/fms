import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OperatorSelectors } from './operator.selectors';
import { IOperatorPartialState } from './operator.entity';
import { OperatorActions } from './operator.actions';

@Injectable()
export class OperatorFacade {
  operator$ = this.store.pipe(select(OperatorSelectors.selectAll));

  message$ = this.store.pipe(select(OperatorSelectors.message));

  error$ = this.store.pipe(select(OperatorSelectors.error));
  statistics$ = this.store.pipe(select(OperatorSelectors.selectStatistics));

  conut$ = this.store.pipe(select(OperatorSelectors.count));

  submitted$ = this.store.pipe(select(OperatorSelectors.submitted));

  constructor(private store: Store<IOperatorPartialState>) {}

  loadAll() {
    this.store.dispatch(OperatorActions.loadAll());
  }

  loadStatistics() {
    this.store.dispatch(OperatorActions.loadStatistics());
  }

  addOperator(data: any) {
    this.store.dispatch(OperatorActions.addOperator({ data }));
  }

  editOperator(operator: any) {
    this.store.dispatch(OperatorActions.editOperator({ operator }));
  }

  getOperatorById(id: number) {
    return this.store.pipe(select(OperatorSelectors.selectById, { id }));
  }

  resetParams() {
    this.store.dispatch(OperatorActions.resetParams());
  }
}
