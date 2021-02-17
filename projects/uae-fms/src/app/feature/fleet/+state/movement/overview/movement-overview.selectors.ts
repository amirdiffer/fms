import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { movementOverviewAdapter } from './movement-overview.entity';

export class MovementOverviewSelectors {
  static selectAll = createSelector(
    FleetSelectors.movementOverviewSelector,
    movementOverviewAdapter.setAll
  );

  static message = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.error
  );
}
