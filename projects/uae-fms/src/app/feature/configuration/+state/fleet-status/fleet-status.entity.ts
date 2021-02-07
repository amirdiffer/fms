import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_FLEET_STATUS_FEATURE_KEY = 'fleet-status';

export interface FleetStatusStateModel {
  statusCategoryItem: {
    statusCategory: string;
    statusCategoryColor: string;
  };
  status: string;
  tag: string;
  usage: string;
}

export interface FleetStatusState extends EntityState<FleetStatusStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface FleetStatusPartialState {
  [CONFIGURATION_FLEET_STATUS_FEATURE_KEY]: FleetStatusState;
}

export const fleetStatusAdapter: EntityAdapter<FleetStatusStateModel> = createEntityAdapter<
  FleetStatusStateModel
>();

export const initialState: FleetStatusState = fleetStatusAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as FleetStatusState
);
