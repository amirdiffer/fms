import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY = 'fleetStatusAsset';

export interface FleetStatusAssetStateModel {
  statusCategoryItem: {
    statusCategory: string;
    statusCategoryColor: string;
  };
  status: string;
  tag: string;
  usage: string;
}

export interface FleetStatusAssetState
  extends EntityState<FleetStatusAssetStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FleetStatusAssetPartialState {
  [CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY]: FleetStatusAssetState;
}

export const fleetStatusAssetAdapter: EntityAdapter<FleetStatusAssetStateModel> = createEntityAdapter<
  FleetStatusAssetStateModel
>();

export const initialState: FleetStatusAssetState = fleetStatusAssetAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as FleetStatusAssetState
);
