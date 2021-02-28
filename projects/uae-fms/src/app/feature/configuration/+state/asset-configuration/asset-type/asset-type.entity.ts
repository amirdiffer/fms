import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_ASSET_TYPE_FEATURE_KEY = 'assetType';

export interface AssetTypeStateModel {
  type: string;
}

export interface AssetTypeState extends EntityState<AssetTypeStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface AssetTypePartialState {
  [CONFIGURATION_ASSET_TYPE_FEATURE_KEY]: AssetTypeState;
}

export const assetTypeAdapter: EntityAdapter<AssetTypeStateModel> = createEntityAdapter<
  AssetTypeStateModel
>();

export const initialState: AssetTypeState = assetTypeAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null
} as AssetTypeState);
