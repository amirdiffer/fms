import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetTrafficFineSelectors } from './asset-traffic-fine.selectors';
import { IAssetTrafficFinePartialState } from './asset-traffic-fine.entity';
import { AssetTrafficFineActions } from './asset-traffic-fine.actions';

@Injectable()
export class AssetTrafficFineFacade {
  trafficFine$ = this.store.pipe(select(AssetTrafficFineSelectors.selectAll));

  message$ = this.store.pipe(select(AssetTrafficFineSelectors.message));

  error$ = this.store.pipe(select(AssetTrafficFineSelectors.error));

  constructor(private store: Store<IAssetTrafficFinePartialState>) {}

  loadAll() {
    this.store.dispatch(AssetTrafficFineActions.loadAll());
  }
}