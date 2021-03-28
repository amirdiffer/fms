import { IAssetType } from '@models/asset-type.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY =
  'asset-configuration';

export interface AssetConfigurationStateModel {
  model: string;
  make: string;
  typeStatusItem: {
    status: string;
    statusColor: string;
  };
  description: string;
  number: string;
}

export interface AssetConfigurationState
  extends EntityState<IAssetType> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface AssetConfigurationPartialState {
  [CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY]: AssetConfigurationState;
}

export const assetConfigurationAdapter: EntityAdapter<IAssetType> = createEntityAdapter<
IAssetType
>();

export const initialState: AssetConfigurationState = assetConfigurationAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as AssetConfigurationState
);
