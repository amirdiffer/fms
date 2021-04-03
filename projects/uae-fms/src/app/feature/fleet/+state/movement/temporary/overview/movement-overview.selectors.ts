import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../../fleet.selectors';
import { movementOverviewAdapter } from '@feature/fleet/+state/movement/overview/movement-overview.entity';
const {
  selectAll,
  selectIds,
  selectEntities
} = movementOverviewAdapter.getSelectors();

export class MovementOverviewSelectorsTemporary {
  static selectAll = createSelector(
    FleetSelectors.movementOverviewSelectorTemporary,
    selectAll
  );

  static message = createSelector(
    FleetSelectors.movementRequestsSelectorTemporary,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.movementOverviewSelectorTemporary,
    (state) => state.error
  );
}
