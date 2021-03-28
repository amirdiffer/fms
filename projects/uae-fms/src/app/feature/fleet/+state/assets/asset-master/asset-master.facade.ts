import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AssetMasterSelectors } from '@feature/fleet/+state/assets/asset-master/asset-master.selectors';
import { AssetMasterActions } from '@feature/fleet/+state/assets/asset-master/asset-master.actions';
import { IAssetMasterPartialState } from '@feature/fleet/+state/assets/asset-master/asset-master.entity';
@Injectable()
export class AssetMasterFacade {
  assetMaster$ = this.store.pipe(select(AssetMasterSelectors.selectAll));

  constructor(private store: Store<IAssetMasterPartialState>) {}

  loadAll() {
    this.store.dispatch(AssetMasterActions.loadAll());
  }
}
