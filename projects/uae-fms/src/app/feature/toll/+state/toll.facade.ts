import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TollSelectors } from './toll.selectors';
import { TollPartialState } from './toll.entity';
import { TollActions } from './toll.actions';

@Injectable()
export class TollFacade {
  toll$ = this.store.pipe(select(TollSelectors.selectAll));

  message$ = this.store.pipe(select(TollSelectors.message));

  error$ = this.store.pipe(select(TollSelectors.error));

  loaded$ = this.store.pipe(select(TollSelectors.loaded));

  assignNow$ = this.store.pipe(select(TollSelectors.assignNow));

  statistic$ = this.store.pipe(select(TollSelectors.tollStatistic))

  constructor(private store: Store<TollPartialState>) {}

  loadAll() {
    this.store.dispatch(TollActions.loadAll());
    this.store.dispatch(TollActions.loadStatistic())
  }

  loadAssignNow(data) {
    this.store.dispatch(TollActions.loadAssignNow(data))
  }

  assigningToll(data): void {
    this.store.dispatch(TollActions.assigningToll(data))
  }

  addToll(data){
    this.store.dispatch(TollActions.addToll({data}))
  }


}
