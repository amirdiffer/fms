import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY =
  'fleetStatusSubAsset';

export interface FleetStatusSubAssetStateModel {
  statusCategoryItem: {
    statusCategory: string;
    statusCategoryColor: string;
  };
  status: string;
  tag: string;
  usage: string;
}

export interface FleetStatusSubAssetState
  extends EntityState<FleetStatusSubAssetStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FleetStatusSubAssetPartialState {
  [CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY]: FleetStatusSubAssetState;
}

export const fleetStatusSubAssetAdapter: EntityAdapter<FleetStatusSubAssetStateModel> = createEntityAdapter<
  FleetStatusSubAssetStateModel
>();

export const initialState: FleetStatusSubAssetState = fleetStatusSubAssetAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as FleetStatusSubAssetState
);
