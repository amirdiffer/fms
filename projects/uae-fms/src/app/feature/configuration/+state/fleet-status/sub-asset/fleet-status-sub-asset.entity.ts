import { IFleetStatus } from '@models/fleet-status.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY =
  'fleetStatusSubAsset';

export interface FleetStatusSubAssetState extends EntityState<IFleetStatus> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FleetStatusSubAssetPartialState {
  [CONFIGURATION_FLEET_STATUS_SUB_ASSET_FEATURE_KEY]: FleetStatusSubAssetState;
}

export const fleetStatusSubAssetAdapter: EntityAdapter<IFleetStatus> = createEntityAdapter<
  IFleetStatus
>();

export const initialState: FleetStatusSubAssetState = fleetStatusSubAssetAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as FleetStatusSubAssetState
);
