import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { movementHistoryAdapter } from './operator-movement-history.entity';
const { selectAll } = movementHistoryAdapter.getSelectors();

export class OperatorMovementHistorySelectors {
  static selectAll = createSelector(FleetSelectors.operatorMovementHistorySelector, selectAll);

  static message = createSelector(
    FleetSelectors.operatorMovementHistorySelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.operatorMovementHistorySelector,
    (state) => state.error
  );

  static submitted = createSelector(
    FleetSelectors.operatorMovementHistorySelector,
    (state) => state.submitted
  );

  static count = createSelector(
    FleetSelectors.operatorMovementHistorySelector,
    (state) => state.resultNumber
  );
}
