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

  loaded$ = this.store.pipe(select(AssetTypeSelectors.loaded));

  constructor(private store: Store<AssetTypePartialState>) {
    this.loadAll();
  }

  loadAll() {
    this.store.dispatch(AssetTypeActions.loadAll());
  }

  addAssetType(data: any) {
    this.store.dispatch(AssetTypeActions.addAssetType({ data }));
  }

  addMake(data: any, assetId: number) {
    this.store.dispatch(AssetTypeActions.addMake({ data, assetId }));
  }

  addModel(data: any, assetId: number, makeId: number) {
    this.store.dispatch(AssetTypeActions.addModel({ data, assetId, makeId }));
  }

  addTrim(data: any, assetId: number, makeId: number, modelId: number) {
    this.store.dispatch(AssetTypeActions.addTrim({ data, assetId, makeId, modelId }));
  }

  resetParams() {
    this.loadAll();
    this.store.dispatch(AssetTypeActions.resetParams());
  }
}
