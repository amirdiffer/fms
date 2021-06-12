import { createFeatureSelector, createSelector } from '@ngrx/store';
import { assetPartListAdapter, PARTSTORE_PARTLIST_FEATURE_KEY, subAssetPartListAdapter } from './part-list.entity';


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
  static featureSelector = createFeatureSelector(PARTSTORE_PARTLIST_FEATURE_KEY);

  static assetPartList = createSelector(
    PartListSelectors.featureSelector,
    (state) => state['assetPartList']
  );
  static subAssetPartList = createSelector(
    PartListSelectors.featureSelector,
    (state) => state['subAssetPartList']
  );
  static selectAllAccumulatedAssetPartList = createSelector(
    PartListSelectors.assetPartList,
    select('ASSET')
  );

  static selectAllAccumulatedSubAssetPartList = createSelector(
    PartListSelectors.subAssetPartList,
    select('SUB-ASSET')
  );

  static listPartForSpecificItemAsset = createSelector(
    PartListSelectors.assetPartList,
    (state) => state.listPartForSpecificItem
  );

  static listPartForSpecificItemSubAsset = createSelector(
    PartListSelectors.subAssetPartList,
    (state) => state.listPartForSpecificItem
  );

  static specificAssetPart = createSelector(
    PartListSelectors.assetPartList,
    (state) => state.specificPart
  );

  static specificSubAssetPart = createSelector(
    PartListSelectors.subAssetPartList,
    (state) => state.specificPart
  );

  static statisticsAssetPart = createSelector(
    PartListSelectors.assetPartList,
    (state) => state.statistics
  );

  static statisticsSubAssetPart = createSelector(
    PartListSelectors.subAssetPartList,
    (state) => state.statistics
  );

  static updatedAssetPart = createSelector(
    PartListSelectors.assetPartList,
    (state) => state.updated
  );

  static updatedSubAssetPart = createSelector(
    PartListSelectors.subAssetPartList,
    (state) => state.updated
  );

  static messageAssetPart = createSelector(
    PartListSelectors.assetPartList,
    (state) => state.message
  );

  static messageSubAssetPart = createSelector(
    PartListSelectors.subAssetPartList,
    (state) => state.message
  );

  static errorAssetPart = createSelector(
    PartListSelectors.assetPartList,
    (state) => state.error
  );

  static errorSubAssetPart = createSelector(
    PartListSelectors.subAssetPartList,
    (state) => state.error
  );

}
