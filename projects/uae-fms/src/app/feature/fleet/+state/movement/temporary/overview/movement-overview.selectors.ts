import { createSelector } from '@ngrx/store';
import { movementOverviewAdapter } from '@feature/fleet/+state/movement/permanent/overview/movement-overview.entity';
const {
  selectAll,
  selectIds,
  selectEntities
} = movementOverviewAdapter.getSelectors();
const temporatyOverviewState = (state) => state['movementOverviewTemporary'];

export class MovementOverviewSelectorsTemporary {
  static selectAll = createSelector(temporatyOverviewState, selectAll);

  static count = createSelector(
    temporatyOverviewState,
    (state) => state.resultNumber
  );

  static message = createSelector(
    temporatyOverviewState,
    (state) => state.message
  );

  static error = createSelector(temporatyOverviewState, (state) => state.error);
}
