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
  extends EntityState<AssetConfigurationStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface AssetConfigurationPartialState {
  [CONFIGURATION_ASSET_CONFIGURATION_FEATURE_KEY]: AssetConfigurationState;
}

export const assetConfigurationAdapter: EntityAdapter<AssetConfigurationStateModel> = createEntityAdapter<
  AssetConfigurationStateModel
>();

export const initialState: AssetConfigurationState = assetConfigurationAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as AssetConfigurationState
);
