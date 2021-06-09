import { createSelector } from '@ngrx/store';
import { movementOverviewAdapter } from '@feature/fleet/+state/movement/permanent/overview/movement-overview.entity';
const {
  selectAll,
  selectIds,
  selectEntities
} = movementOverviewAdapter.getSelectors();

const permanentOverviewState = (state) => state['movementOverview']

export class MovementOverviewSelectors {
  static selectAll = createSelector(
    permanentOverviewState,
    selectAll
  );

  static message = createSelector(
    permanentOverviewState,
    (state) => state.message
  );

  static error = createSelector(
    permanentOverviewState,
    (state) => state.error
  );
  static count = createSelector(
    permanentOverviewState,
    (state) => state.resultNumber
  );
}
