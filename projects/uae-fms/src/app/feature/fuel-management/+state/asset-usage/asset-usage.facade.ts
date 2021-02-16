import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetUsageSelectors } from './asset-usage.selectors';
import { AssetUsageActions } from './asset-usage.actions';
import { IAssetUsagePartialState } from './asset-usage.entity';

@Injectable()
export class AssetUsageFacade {
  assetUsage$ = this.store.pipe(select(AssetUsageSelectors.selectAll));

  message$ = this.store.pipe(select(AssetUsageSelectors.message));

  error$ = this.store.pipe(select(AssetUsageSelectors.error));

  constructor(private store: Store<IAssetUsagePartialState>) {}

  loadAll() {
    this.store.dispatch(AssetUsageActions.loadAssetUsage());
  }
}
