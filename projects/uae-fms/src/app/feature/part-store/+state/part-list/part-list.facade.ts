import { PartListActions } from './part-list.actions';
import { PartListStateModel } from './part-list.entity';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PartListSelectors } from './part-list.selectors';

@Injectable()
export class PartListFacade {
  partList$ = this.store.pipe(select(PartListSelectors.selectAll));

  assetStatistics$ = this.store.pipe(
    select(PartListSelectors.selectAssetStatistics)
  );

  subAssetStatistics$ = this.store.pipe(
    select(PartListSelectors.selectSubAssetStatistics)
  );

  message$ = this.store.pipe(select(PartListSelectors.message));

  error$ = this.store.pipe(select(PartListSelectors.error));

  constructor(private store: Store<PartListStateModel>) {}

  loadAllAsset() {
    this.store.dispatch(PartListActions.loadAllAsset());
  }

  loadAllSubAsset() {
    this.store.dispatch(PartListActions.loadAllSubAsset());
  }

  loadAssetStatistics() {
    this.store.dispatch(PartListActions.loadAssetStatistics());
  }

  loadSubAssetStatistics() {
    this.store.dispatch(PartListActions.loadSubAssetStatistics());
  }
}
