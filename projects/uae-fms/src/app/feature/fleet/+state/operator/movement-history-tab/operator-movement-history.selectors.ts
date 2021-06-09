import { createSelector } from '@ngrx/store';
import { movementHistoryAdapter } from './operator-movement-history.entity';
const { selectAll } = movementHistoryAdapter.getSelectors();
const operatorMovementState = (state) => state['operator-movement-history']
export class OperatorMovementHistorySelectors {
  static selectAll = createSelector(operatorMovementState, selectAll);

  static message = createSelector(
    operatorMovementState,
    (state) => state.message
  );

  static error = createSelector(
    operatorMovementState,
    (state) => state.error
  );

  static submitted = createSelector(
    operatorMovementState,
    (state) => state.submitted
  );

  static count = createSelector(
    operatorMovementState,
    (state) => state.resultNumber
  );
}
