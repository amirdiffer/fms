import { IPartListStatistics } from '@models/statistics';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const PARTSTORE_ASSET_PARTLIST_FEATURE_KEY = 'assetPartList';
export const PARTSTORE_SUB_ASSET_PARTLIST_FEATURE_KEY = 'subAssetPartList';

/* For Asset */
export interface AssetPartListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?: IPartListStatistics;
  specificPart?:any;
  updated?:boolean;
}

export const assetPartListAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialAssetPartState: AssetPartListState = assetPartListAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null,
  statistics: null,
  specificPart:null,
  updated:false
} as AssetPartListState);

/* For Sub Asset */

export interface SubAssetPartListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?: IPartListStatistics;
  specificPart?:any;
  updated?:boolean;
}

export const subAssetPartListAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialSubAssetPartState: SubAssetPartListState = subAssetPartListAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null,
  statistics: null,
  specificPart:null,
  updated:false
} as SubAssetPartListState);

export interface PartListPartialState {
  [PARTSTORE_ASSET_PARTLIST_FEATURE_KEY]: AssetPartListState;
  [PARTSTORE_SUB_ASSET_PARTLIST_FEATURE_KEY]:SubAssetPartListState;
}

