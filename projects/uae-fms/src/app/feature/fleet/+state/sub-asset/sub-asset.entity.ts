import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ISubasset } from '@models/sub-asset';
import { ISubAssetStatistics } from '@models/statistics';

export const FLEET_SUB_ASSET_FEATURE_KEY = 'sub-asset';

export interface SubAssetState extends EntityState<ISubasset> {
  error?: any;
  loaded?: boolean;
  statistics: ISubAssetStatistics;
  message?: string;
}

export interface SubAssetPartialState {
  [FLEET_SUB_ASSET_FEATURE_KEY]: SubAssetState;
}

export const subAssetAdapter: EntityAdapter<ISubasset> = createEntityAdapter<
  ISubasset
>();

export const initialState: SubAssetState = subAssetAdapter.getInitialState({
  error: null,
  loaded: null,
  statistics: null,
  message: null
} as SubAssetState);
