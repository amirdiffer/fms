import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetMasterSelectors } from './asset-master.selectors';
import { AssetMasterActions } from './asset-master.actions';
import { IAssetMasterPartialState } from './asset-master.entity';
import { IAssetMaster } from '@models/asset-master.model';

@Injectable()
export class AssetMasterFacade {
  assetMaster$ = this.store.pipe(select(AssetMasterSelectors.selectAll));

  specificAsset$ = this.store.pipe(select(AssetMasterSelectors.specificAsset));

  statistics$ = this.store.pipe(select(AssetMasterSelectors.selectStatistics));

  submitted$ = this.store.pipe(select(AssetMasterSelectors.submitted));

  error$ = this.store.pipe(select(AssetMasterSelectors.error));

  conut$ = this.store.pipe(select(AssetMasterSelectors.count));

  constructor(private store: Store<IAssetMasterPartialState>) {}

  loadAll() {
    this.reset();
    this.store.dispatch(AssetMasterActions.loadAll());
  }

  loadStatistics() {
    this.store.dispatch(AssetMasterActions.loadStatistics());
  }

  addAsset(data: any) {
    this.store.dispatch(AssetMasterActions.addAsset({ data }));
  }

  editAsset(data: any) {
    this.store.dispatch(AssetMasterActions.editAsset({ data }));
  }

  getAssetByID(id: number) {
    this.store.dispatch(AssetMasterActions.assetById({ id }));
  }
  reset() {
    this.store.dispatch(AssetMasterActions.reset());
  }
}
