import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TrafficFineTableSelectors } from './traffic-fine-table.selectors';
import { TrafficFineTablePartialState } from './traffic-fine-table.entity';
import { TrafficFineTableActions } from './traffic-fine-table.actions';

@Injectable()
export class TrafficFineTableFacade {
  trafficFine$ = this.store.pipe(select(TrafficFineTableSelectors.selectAll));

  message$ = this.store.pipe(select(TrafficFineTableSelectors.message));

  error$ = this.store.pipe(select(TrafficFineTableSelectors.error));

  constructor(private store: Store<TrafficFineTablePartialState>) {}

  loadAll() {
    this.store.dispatch(TrafficFineTableActions.loadAll());
  }
}
