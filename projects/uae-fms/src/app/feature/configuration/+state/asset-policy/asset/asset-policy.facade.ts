import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetPolicySelectors } from './asset-policy.selectors';
import { AssetPolicyPartialState } from './asset-policy.entity';
import { AssetPolicyActions } from './asset-policy.actions';
import { IAssetPolicy } from '@models/asset-policy.model';

@Injectable()
export class AssetPolicyFacade {
  assetPolicy$ = this.store.pipe(select(AssetPolicySelectors.selectAll));

  message$ = this.store.pipe(select(AssetPolicySelectors.message));

  error$ = this.store.pipe(select(AssetPolicySelectors.error));

  submitted$ = this.store.pipe(select(AssetPolicySelectors.submitted));

  conut$ = this.store.pipe(select(AssetPolicySelectors.count));

  loaded$ = this.store.pipe(select(AssetPolicySelectors.loaded));

  constructor(private store: Store<AssetPolicyPartialState>) { }

  loadAll() {
    this.store.dispatch(AssetPolicyActions.loadAll());
  }
  addAssetPolicy(data: any) {
    this.store.dispatch(AssetPolicyActions.addAssetPolicy({ data }));
  }

  updateAssetPolicy(data: any) {
    this.store.dispatch(AssetPolicyActions.editAssetPolicy({ data }));
  }

  getById(id: number) {
    return this.store.pipe(select(AssetPolicySelectors.selectById, { id }));
  }

  reset() {
    this.store.dispatch(AssetPolicyActions.reset());
  }
}
