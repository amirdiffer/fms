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

  constructor(private store: Store<AssetPolicyPartialState>) {}

  loadAll() {
    this.store.dispatch(AssetPolicyActions.loadAll());
  }
  addAssetPolicy(data: IAssetPolicy) {
    this.store.dispatch(AssetPolicyActions.addAssetPolicy({ data }));
    console.log(data);
  }
}
