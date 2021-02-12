import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FleetStatusSelectors } from './fleet-status.selectors';
import { FleetStatusPartialState } from './fleet-status.entity';
import { FleetStatusActions } from './fleet-status.actions';

@Injectable()
export class FleetStatusFacade {
  fleetStatus$ = this.store.pipe(select(FleetStatusSelectors.selectAll));

  message$ = this.store.pipe(select(FleetStatusSelectors.message));

  error$ = this.store.pipe(select(FleetStatusSelectors.error));

  constructor(private store: Store<FleetStatusPartialState>) {}

  loadAll() {
    this.store.dispatch(FleetStatusActions.loadAll());
  }
}
