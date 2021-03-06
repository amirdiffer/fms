import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITrafficFine } from '@models/traffic-fine';

export const TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY = 'trafficFineTable';

export interface TrafficFineTableState
  extends EntityState<ITrafficFine> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface TrafficFineTablePartialState {
  [TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY]: TrafficFineTableState;
}

export const trafficFineTableAdapter: EntityAdapter<ITrafficFine> = createEntityAdapter<
  ITrafficFine
>();

export const initialState: TrafficFineTableState = trafficFineTableAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as TrafficFineTableState
);
