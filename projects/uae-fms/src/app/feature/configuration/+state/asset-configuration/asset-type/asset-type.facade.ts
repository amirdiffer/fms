import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetTypeSelectors } from './asset-type.selectors';
import { AssetTypePartialState } from './asset-type.entity';
import { AssetTypeActions } from './asset-type.actions';

@Injectable()
export class AssetTypeFacade {
  assetType$ = this.store.pipe(select(AssetTypeSelectors.selectAll));

  message$ = this.store.pipe(select(AssetTypeSelectors.message));

  error$ = this.store.pipe(select(AssetTypeSelectors.error));

  constructor(private store: Store<AssetTypePartialState>) {}

  loadAll() {
    this.store.dispatch(AssetTypeActions.loadAll());
  }
}
