import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FleetStatusAssetSelectors } from './fleet-status-asset.selectors';
import { FleetStatusAssetPartialState } from './fleet-status-asset.entity';
import { FleetStatusAssetActions } from './fleet-status-asset.actions';

@Injectable()
export class FleetStatusAssetFacade {
  fleetStatus$ = this.store.pipe(select(FleetStatusAssetSelectors.selectAll));

  message$ = this.store.pipe(select(FleetStatusAssetSelectors.message));

  error$ = this.store.pipe(select(FleetStatusAssetSelectors.error));

  constructor(private store: Store<FleetStatusAssetPartialState>) {}

  loadAll() {
    this.store.dispatch(FleetStatusAssetActions.loadAll());
  }
}
