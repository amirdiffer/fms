import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FleetStatusSubAssetSelectors } from './fleet-status-sub-asset.selectors';
import { FleetStatusSubAssetPartialState } from './fleet-status-sub-asset.entity';
import { FleetStatusSubAssetActions } from './fleet-status-sub-asset.actions';

@Injectable()
export class FleetStatusSubAssetFacade {
  fleetStatus$ = this.store.pipe(
    select(FleetStatusSubAssetSelectors.selectAll)
  );

  message$ = this.store.pipe(select(FleetStatusSubAssetSelectors.message));

  error$ = this.store.pipe(select(FleetStatusSubAssetSelectors.error));

  constructor(private store: Store<FleetStatusSubAssetPartialState>) {}

  loadAll() {
    this.store.dispatch(FleetStatusSubAssetActions.loadAll());
  }
}
