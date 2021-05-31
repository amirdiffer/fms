import { IOperatorMovementHistory } from '@models/operator';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FLEET_OPERATOR_MOVEMENT_HISTORY_FEATURE_KEY = 'operator-movement-history';

export interface IOperatorMovementHistoryState extends EntityState<IOperatorMovementHistory> {
  error?: any;
  loaded?: boolean;
  message?: string;
  resultNumber?: number;
}

export interface IOperatorMovementHistoryPartialState {
  [FLEET_OPERATOR_MOVEMENT_HISTORY_FEATURE_KEY]: IOperatorMovementHistoryState;
}

export const movementHistoryAdapter: EntityAdapter<IOperatorMovementHistory> = createEntityAdapter<IOperatorMovementHistory>({
  selectId: (movementHistory) => movementHistory.asset.id
});

export const initialState: IOperatorMovementHistoryState = movementHistoryAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  resultNumber: 0
} as IOperatorMovementHistoryState);
