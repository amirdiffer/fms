

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAssetType } from '@models/asset-type.model';

export const FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY = 'assetType';
export interface AssetTypeState extends EntityState<IAssetType> {
  error?: any;
  loaded?: boolean;
  submitted: boolean;
  message?: string;
  assetType?:any;
}

export interface AssetTypePartialState {
    [FLEET_CONFIGURATION_ASSET_TYPE_FEATURE_KEY]: AssetTypeState;
}

export const assetTypeAdapter: EntityAdapter<IAssetType> = createEntityAdapter<IAssetType>();

export const initialState: AssetTypeState = assetTypeAdapter.getInitialState({
    error: null,
    loaded: null,
    submitted: false,
    message: null,
    assetType: null
} as AssetTypeState);