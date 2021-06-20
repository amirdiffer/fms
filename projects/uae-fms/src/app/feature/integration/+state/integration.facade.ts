import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IntegrationSelectors } from './integration.selectors';
import { IntegrationPartialState } from './integration.entity';
import { IntegrationActions } from './integration.actions';
import { IIntegration } from '@models/integration';

@Injectable()
export class IntegrationFacade {
  integration$ = this.store.pipe(select(IntegrationSelectors.selectAll));

  message$ = this.store.pipe(select(IntegrationSelectors.message));

  error$ = this.store.pipe(select(IntegrationSelectors.error));

  submitted$ = this.store.pipe(select(IntegrationSelectors.submitted));


  constructor(private store: Store<IntegrationPartialState>) {}

  loadAll() {
    this.store.dispatch(IntegrationActions.loadAll());
  }
  addIntegration(data: IIntegration) {
    this.store.dispatch(IntegrationActions.addintegration({ data }));
  }
}
