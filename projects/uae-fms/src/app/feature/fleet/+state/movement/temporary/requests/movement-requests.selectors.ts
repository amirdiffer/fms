import { createSelector } from '@ngrx/store';
import {
  MovementRequestsState,
  movementRequestsTemporaryAdapter
} from './movement-requests.entity';
const { selectAll } = movementRequestsTemporaryAdapter.getSelectors();
const temporaryRequestState = (state) => state['movementRequestsTemporary'];

export class MovementRequestsSelectorsTemporary {
  static selectAll = createSelector(temporaryRequestState, selectAll);
  static count = createSelector(
    temporaryRequestState,
    (state) => state.resultNumber
  );

  static requestStatistic = createSelector(
    temporaryRequestState,
    (state: MovementRequestsState) => state.statistic
  );

  static message = createSelector(
    temporaryRequestState,
    (state) => state.message
  );

  static error = createSelector(temporaryRequestState, (state) => state.error);

  static submitted = createSelector(
    temporaryRequestState,
    (state) => state.submitted
  );

  static rejected = createSelector(
    temporaryRequestState,
    (state) => state.rejected
  );

  static assigned = createSelector(
    temporaryRequestState,
    (state) => state.assigned
  );
}
