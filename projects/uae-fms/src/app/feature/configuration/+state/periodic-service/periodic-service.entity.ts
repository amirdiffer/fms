import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY = 'periodic-service';

export interface PeriodicServiceStateModel {
  name: string;
  number: string;
}

export interface PeriodicServiceState
  extends EntityState<PeriodicServiceStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface PeriodicServicePartialState {
  [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: PeriodicServiceState;
}

export const periodicServiceAdapter: EntityAdapter<PeriodicServiceStateModel> = createEntityAdapter<
  PeriodicServiceStateModel
>();

export const initialState: PeriodicServiceState = periodicServiceAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as PeriodicServiceState
);
