import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubAssetSelectors } from './sub-asset.selectors';
import { SubAssetPartialState } from './sub-asset.entity';
import { SubAssetActions } from './sub-asset.actions';

@Injectable()
export class SubAssetFacade {
  subAsset$ = this.store.pipe(select(SubAssetSelectors.selectAll));

  statistics$ = this.store.pipe(select(SubAssetSelectors.selectStatistics));

  message$ = this.store.pipe(select(SubAssetSelectors.message));

  error$ = this.store.pipe(select(SubAssetSelectors.error));

  constructor(private store: Store<SubAssetPartialState>) {}

  loadAll() {
    this.store.dispatch(SubAssetActions.loadAll());
  }

  loadStatistics() {
    this.store.dispatch(SubAssetActions.loadStatistics());
  }
}
