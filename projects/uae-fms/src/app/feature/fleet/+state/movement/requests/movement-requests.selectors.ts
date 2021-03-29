import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { movementRequestsAdapter } from './movement-requests.entity';
const { selectAll } = movementRequestsAdapter.getSelectors();

export class MovementRequestsSelectors {
  static selectAll = createSelector(
    FleetSelectors.movementRequestsSelector,
    selectAll
  );

  static requestStatistic = createSelector(
    FleetSelectors.movementRequestsSelector,
    (state) => state.statistic
  );

  static message = createSelector(
    FleetSelectors.movementRequestsSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.movementRequestsSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    FleetSelectors.movementRequestsSelector,
    (state) => state.submitted
  );

  static rejected = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.rejected
  );

  static assigned = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.assigned
  );

}
