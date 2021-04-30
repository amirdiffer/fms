import { IOperator } from '@models/operator';
import { IOperatorStatistics } from '@models/statistics';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_OPERATOR_FEATURE_KEY = 'operator';

export interface IOperatorState extends EntityState<IOperator> {
  error?: any;
  loaded?: boolean;
  message?: string;
  submitted: boolean;
  statistics?: IOperatorStatistics;
  resultNumber?: number;
}

export interface IOperatorPartialState {
  [FLEET_OPERATOR_FEATURE_KEY]: IOperatorState;
}

export const operatorAdapter: EntityAdapter<IOperator> = createEntityAdapter<
  IOperator
>();

export const initialState: IOperatorState = operatorAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  submitted: false,
  statistics: null,
  resultNumber: 0
} as IOperatorState);
