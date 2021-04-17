import { createSelector } from '@ngrx/store';
import { FleetSelectors } from '../../fleet.selectors';
import { movementOverviewAdapter } from '@feature/fleet/+state/movement/overview/movement-overview.entity';
const { selectAll, selectIds, selectEntities } = movementOverviewAdapter.getSelectors();


export class MovementOverviewSelectors {
  static selectAll = createSelector(
    FleetSelectors.movementOverviewSelector,
    selectAll
  );

  static message = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.message
  );

  static error = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.error
  );
  static count = createSelector(
    FleetSelectors.movementOverviewSelector,
    (state) => state.resultNumber
  );


}
