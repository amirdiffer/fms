import { createSelector } from '@ngrx/store';
import {
  movementRequestsAdapter,
  MovementRequestsState
} from './movement-requests.entity';
const { selectAll } = movementRequestsAdapter.getSelectors();
const permanentRequestState = (state) => state['movementRequests'];
export class MovementRequestsSelectors {
  static selectAll = createSelector(permanentRequestState, selectAll);
  static count = createSelector(
    permanentRequestState,
    (state) => state.resultNumber
  );

  static requestStatistic = createSelector(
    permanentRequestState,
    (state: MovementRequestsState) => state.statistic
  );

  static message = createSelector(
    permanentRequestState,
    (state) => state.message
  );

  static error = createSelector(permanentRequestState, (state) => state.error);

  static submitted = createSelector(
    permanentRequestState,
    (state) => state.submitted
  );

  static rejected = createSelector(
    permanentRequestState,
    (state) => state.rejected
  );

  static assigned = createSelector(
    permanentRequestState,
    (state) => state.assigned
  );
}
