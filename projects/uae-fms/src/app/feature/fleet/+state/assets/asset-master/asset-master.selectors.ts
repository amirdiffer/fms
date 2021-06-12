import { createSelector } from '@ngrx/store';
import { assetMasterAdapter , IAssetMasterState } from './asset-master.entity';
const { selectAll } = assetMasterAdapter.getSelectors();
const assetMasterState = (state) => state['assetMaster']
export class AssetMasterSelectors {

  static selectAll = createSelector(
    assetMasterState,
    selectAll
  );

  static specificAsset = createSelector(
    assetMasterState,
    (state) => state.asset
  );
  static selectStatistics = createSelector(
    assetMasterState,
    (state: IAssetMasterState) => state.statistics
  );

  static error = createSelector(
    assetMasterState,
    (state) => state.error
  );

  static count = createSelector(
    assetMasterState,
    (state) => state.resultNumber
  );

  static submitted = createSelector(
    assetMasterState,
    (state) => state.submitted
  );
}
