import { IOperatorTrafficFine } from '@models/operator';
import { IOperatorTrafficFineStatistics } from '@models/statistics';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_OPERATOR_TRAFFIC_FINE_FEATURE_KEY = 'operator-traffic-fine';

export interface IOperatorTrafficFineState extends EntityState<IOperatorTrafficFine> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?: IOperatorTrafficFineStatistics;
  resultNumber?: number;
}

export interface IOperatorTrafficFinePartialState {
  [FLEET_OPERATOR_TRAFFIC_FINE_FEATURE_KEY]: IOperatorTrafficFineState;
}

export const trafficFineAdapter: EntityAdapter<IOperatorTrafficFine> = createEntityAdapter<IOperatorTrafficFine>({
  selectId: (trafficFine: IOperatorTrafficFine) => trafficFine.tcCode
});

export const initialState: IOperatorTrafficFineState = trafficFineAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  statistics: null,
  resultNumber: 0
} as IOperatorTrafficFineState);
