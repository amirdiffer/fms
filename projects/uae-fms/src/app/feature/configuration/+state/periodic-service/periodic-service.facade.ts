import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PeriodicServiceSelectors } from './periodic-service.selectors';
import { PeriodicServicePartialState } from './periodic-service.entity';
import { PeriodicServiceActions } from './periodic-service.actions';

@Injectable()
export class PeriodicServiceFacade {
  periodicService$ = this.store.pipe(
    select(PeriodicServiceSelectors.selectAll)
  );

  message$ = this.store.pipe(select(PeriodicServiceSelectors.message));

  error$ = this.store.pipe(select(PeriodicServiceSelectors.error));

  constructor(private store: Store<PeriodicServicePartialState>) {}

  loadAll() {
    this.store.dispatch(PeriodicServiceActions.loadAll());
  }

  addPeriodicService(data: any) {
    this.store.dispatch(PeriodicServiceActions.addPeriodicService({ data }));
  }
}
