import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { movementRequestsAdapter } from './movement-requests.entity';
const { selectAll } = movementRequestsAdapter.getSelectors();

export class MovementRequestsSelectors {
  static selectAll = createSelector(
    FleetSelectors.movementRequestsSelector,
    selectAll
  );

  static message = createSelector(
    FleetSelectors.movementRequestsSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.movementRequestsSelector,
    (state) => state.error
  );
}
