import { requestListAdapter } from './request-list.entity';
import { createSelector } from '@ngrx/store';
const { selectAll } = requestListAdapter.getSelectors();
const requestListState = (state) => state['RequestList']
export class RequestListSelectors {
  static selectAll = createSelector(
    requestListState,
    selectAll
  );

  static specificRequest = createSelector(
    requestListState,
    (state) => state.specificRequest
  );

  static statistics = createSelector(
    requestListState,
    (state) => state.statistics
  );

  static submitted = createSelector(
    requestListState,
    (state) => state.submitted
  );

  static approved = createSelector(
    requestListState,
    (state) => state.approved
  );

  static rejected = createSelector(
    requestListState,
    (state) => state.rejected
  );

  static message = createSelector(
    requestListState,
    (state) => state.message
  );

  static error = createSelector(
    requestListState,
    (state) => state.error
  );
}
