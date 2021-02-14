import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetConfigurationSelectors } from './asset-configuration.selectors';
import { AssetConfigurationPartialState } from './asset-configuration.entity';
import { AssetConfigurationActions } from './asset-configuration.actions';

@Injectable()
export class AssetConfigurationFacade {
  assetConfiguration$ = this.store.pipe(
    select(AssetConfigurationSelectors.selectAll)
  );

  message$ = this.store.pipe(select(AssetConfigurationSelectors.message));

  error$ = this.store.pipe(select(AssetConfigurationSelectors.error));

  constructor(private store: Store<AssetConfigurationPartialState>) {}

  loadAll() {
    this.store.dispatch(AssetConfigurationActions.loadAll());
  }
}
