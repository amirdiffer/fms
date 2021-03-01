import { IFleetStatus } from '@models/fleet-status.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY = 'fleetStatusAsset';

export interface FleetStatusAssetState extends EntityState<IFleetStatus> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FleetStatusAssetPartialState {
  [CONFIGURATION_FLEET_STATUS_ASSET_FEATURE_KEY]: FleetStatusAssetState;
}

export const fleetStatusAssetAdapter: EntityAdapter<IFleetStatus> = createEntityAdapter<
  IFleetStatus
>();

export const initialState: FleetStatusAssetState = fleetStatusAssetAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as FleetStatusAssetState
);
