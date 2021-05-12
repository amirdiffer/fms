import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '../part-store.selectors';
import { assetPartListAdapter, subAssetPartListAdapter } from './part-list.entity';


export const select = (adapter) =>{
  if(adapter = 'ASSET'){
    const { selectAll } = assetPartListAdapter.getSelectors();
    return selectAll;
  }else if((adapter = 'SUB-ASSET')){
    const { selectAll } = subAssetPartListAdapter.getSelectors();
    return selectAll;
  }
};

export class PartListSelectors {

  static selectAllAccumulatedAssetPartList = createSelector(
    PartStoreSelectors.assetPartList,
    select('ASSET')
  );

  static selectAllAccumulatedSubAssetPartList = createSelector(
    PartStoreSelectors.subAssetPartList,
    select('SUB-ASSET')
  );

  static listPartForSpecificItemAsset = createSelector(
    PartStoreSelectors.assetPartList,
    (state) => state.listPartForSpecificItem
  );

  static listPartForSpecificItemSubAsset = createSelector(
    PartStoreSelectors.subAssetPartList,
    (state) => state.listPartForSpecificItem
  );

  static specificAssetPart = createSelector(
    PartStoreSelectors.assetPartList,
    (state) => state.specificPart
  );

  static specificSubAssetPart = createSelector(
    PartStoreSelectors.subAssetPartList,
    (state) => state.specificPart
  );

  static statisticsAssetPart = createSelector(
    PartStoreSelectors.assetPartList,
    (state) => state.statistics
  );

  static statisticsSubAssetPart = createSelector(
    PartStoreSelectors.subAssetPartList,
    (state) => state.statistics
  );

  static updatedAssetPart = createSelector(
    PartStoreSelectors.assetPartList,
    (state) => state.updated
  );

  static updatedSubAssetPart = createSelector(
    PartStoreSelectors.subAssetPartList,
    (state) => state.updated
  );

  static messageAssetPart = createSelector(
    PartStoreSelectors.assetPartList,
    (state) => state.message
  );

  static messageSubAssetPart = createSelector(
    PartStoreSelectors.subAssetPartList,
    (state) => state.message
  );

  static errorAssetPart = createSelector(
    PartStoreSelectors.assetPartList,
    (state) => state.error
  );

  static errorSubAssetPart = createSelector(
    PartStoreSelectors.subAssetPartList,
    (state) => state.error
  );

}
