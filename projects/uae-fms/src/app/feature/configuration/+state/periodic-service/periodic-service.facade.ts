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

  submitted$ = this.store.pipe(select(PeriodicServiceSelectors.submitted));

  specificPeriodicService$ = this.store.pipe(
    select(PeriodicServiceSelectors.specificPeriodicService)
  );

  message$ = this.store.pipe(select(PeriodicServiceSelectors.message));

  error$ = this.store.pipe(select(PeriodicServiceSelectors.error));

  loaded$ = this.store.pipe(select(PeriodicServiceSelectors.loaded));

  constructor(private store: Store<PeriodicServicePartialState>) {}

  loadAll() {
    this.store.dispatch(PeriodicServiceActions.loadAll());
  }

  addPeriodicService(data: any) {
    this.store.dispatch(PeriodicServiceActions.addPeriodicService({ data }));
  }

  editPeriodicService(data: any) {
    this.store.dispatch(PeriodicServiceActions.editPeriodicService({ data }));
  }

  specificPeriodicService(id: number) {
    this.store.dispatch(PeriodicServiceActions.getPeriodicServiceById({ id }));
  }

  reset() {
    this.store.dispatch(PeriodicServiceActions.reset());
  }
}
