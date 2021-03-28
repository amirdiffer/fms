import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPeriodicService } from '@models/configuration';

export const CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY = 'periodic-service';

export interface PeriodicServiceState extends EntityState<IPeriodicService> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface PeriodicServicePartialState {
  [CONFIGURATION_PERIODIC_SERVICE_FEATURE_KEY]: PeriodicServiceState;
}

export const periodicServiceAdapter: EntityAdapter<IPeriodicService> = createEntityAdapter<
  IPeriodicService
>();

export const initialState: PeriodicServiceState = periodicServiceAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as PeriodicServiceState
);
