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

  submitted$ = this.store.pipe(select(AssetTypeSelectors.submitted));

  constructor(private store: Store<AssetTypePartialState>) {}

  loadAll() {
    this.store.dispatch(AssetTypeActions.loadAll());
  }

  addAssetType(data: any) {
    this.store.dispatch(AssetTypeActions.addAssetType({ data }));
  }

  addMake(data: any) {
    this.store.dispatch(AssetTypeActions.addMake({ data }));
  }

  addModel(data: any) {
    this.store.dispatch(AssetTypeActions.addModel({ data }));
  }
}
