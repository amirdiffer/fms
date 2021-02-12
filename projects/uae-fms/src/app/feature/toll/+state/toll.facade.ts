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

  constructor(private store: Store<TollPartialState>) {}

  loadAll() {
    this.store.dispatch(TollActions.loadAll());
  }
}
