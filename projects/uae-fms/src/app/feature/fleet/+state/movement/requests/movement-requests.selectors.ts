import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { movementRequestsAdapter } from './movement-requests.entity';

export class MovementRequestsSelectors {
  static selectAll = createSelector(
    FleetSelectors.movementRequestsSelector,
    movementRequestsAdapter.setAll
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
