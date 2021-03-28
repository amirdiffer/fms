import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IntegrationSelectors } from './integration.selectors';
import { IntegrationPartialState } from './integration.entity';
import { IntegrationActions } from './integration.actions';

@Injectable()
export class IntegrationFacade {
  integration$ = this.store.pipe(select(IntegrationSelectors.selectAll));

  message$ = this.store.pipe(select(IntegrationSelectors.message));

  error$ = this.store.pipe(select(IntegrationSelectors.error));

  constructor(private store: Store<IntegrationPartialState>) {}

  loadAll() {
    this.store.dispatch(IntegrationActions.loadAll());
  }
}
