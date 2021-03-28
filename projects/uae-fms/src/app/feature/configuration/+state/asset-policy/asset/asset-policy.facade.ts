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

  constructor(private store: Store<AssetPolicyPartialState>) {}

  loadAll() {
    this.store.dispatch(AssetPolicyActions.loadAll());
  }
  addAssetPolicy(data: any) {
    this.store.dispatch(AssetPolicyActions.addAssetPolicy({ data }));
    console.log(data);
  }

  updateAssetPolicy(data: IAssetPolicy) {
    this.store.dispatch(AssetPolicyActions.editAssetPolicy({ data }));
    console.log(data);
  }

  getById(id: number) {
    return this.store.pipe(select(AssetPolicySelectors.selectById, { id }));
  }
}
