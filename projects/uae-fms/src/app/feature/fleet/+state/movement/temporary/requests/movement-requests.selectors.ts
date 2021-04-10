import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../../fleet.selectors';
import { MovementRequestsState, movementRequestsTemporaryAdapter } from './movement-requests.entity';
const { selectAll } = movementRequestsTemporaryAdapter.getSelectors();

export class MovementRequestsSelectorsTemporary {
  static selectAll = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    selectAll
  );

  static requestStatistic = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state: MovementRequestsState) => state.statistic
  );

  static message = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state) => state.error
  );

  static submitted = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state) => state.submitted
  );

  static rejected = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state) => state.rejected
  );

  static assigned = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state) => state.assigned
  );
}
