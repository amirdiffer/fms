import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY =
  'trafficFineTable';

export interface TrafficFineTableStateModel {
  tcCode: string;
  type: string;
  department: string;
  operatorItem: {
    name: string;
    number: string;
  };
  plateNo: string;
  missionStatus: string;
  timeDate: string;
  duration: string;
  status: string;
  user: string;
  amount: string;
}

export interface TrafficFineTableState
  extends EntityState<TrafficFineTableStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface TrafficFineTablePartialState {
  [TRAFFIC_FINES_TRAFFIC_FINE_TABLE_FEATURE_KEY]: TrafficFineTableState;
}

export const trafficFineTableAdapter: EntityAdapter<TrafficFineTableStateModel> = createEntityAdapter<
  TrafficFineTableStateModel
>();

export const initialState: TrafficFineTableState = trafficFineTableAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as TrafficFineTableState
);
