import { IPartListStatistics } from '@models/statistics';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
export const PARTSTORE_PARTLIST_FEATURE_KEY = 'partList';
export const PARTSTORE_ASSET_PARTLIST_FEATURE_KEY = 'assetPartList';
export const PARTSTORE_SUB_ASSET_PARTLIST_FEATURE_KEY = 'subAssetPartList';

/* For Asset */
export interface AssetPartListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?: IPartListStatistics;
  specificPart?: any;
  listPartForSpecificItem?: any;
  updated?: boolean;
}

export const assetPartListAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialAssetPartState: AssetPartListState = assetPartListAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    statistics: null,
    specificPart: null,
    listPartForSpecificItem: null,
    updated: false
  } as AssetPartListState
);

/* For Sub Asset */

export interface SubAssetPartListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?: IPartListStatistics;
  specificPart?: any;
  listPartForSpecificItem?: any;
  updated?: boolean;
}

export const subAssetPartListAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialSubAssetPartState: SubAssetPartListState = subAssetPartListAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null,
    statistics: null,
    specificPart: null,
    listPartForSpecificItem: null,
    updated: false
  } as SubAssetPartListState
);

export interface State {
  readonly [PARTSTORE_ASSET_PARTLIST_FEATURE_KEY]: AssetPartListState;
  readonly [PARTSTORE_SUB_ASSET_PARTLIST_FEATURE_KEY]: SubAssetPartListState;
}
export interface PartListPartialState {
  readonly [PARTSTORE_PARTLIST_FEATURE_KEY]: State;
}
