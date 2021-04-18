import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubAssetPolicyActions } from './sub-asset-policy.actions';
import { SubAssetPolicyPartialState } from './sub-asset-policy.entity';
import { SubAssetPolicySelectors } from './sub-asset-policy.selectors';

@Injectable()
export class SubAssetPolicyFacade {
  subAssetPolicy$ = this.store.pipe(select(SubAssetPolicySelectors.selectAll));

  message$ = this.store.pipe(select(SubAssetPolicySelectors.message));

  error$ = this.store.pipe(select(SubAssetPolicySelectors.error));

  conut$ = this.store.pipe(select(SubAssetPolicySelectors.count));

  constructor(private store: Store<SubAssetPolicyPartialState>) {}

  loadAll() {
    this.store.dispatch(SubAssetPolicyActions.loadAll());
  }
  getById(id: number) {
    return this.store.pipe(select(SubAssetPolicySelectors.selectById, { id }));
  }
}
