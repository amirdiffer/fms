import { requestListAdapter } from './request-list.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
const { selectAll } = requestListAdapter.getSelectors();

export class RequestListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.requestListSelector,
    selectAll
  );

  static specificRequest = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.specificRequest
  );

  static statistics = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.statistics
  );

  static submitted = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.submitted
  );

  static approved = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.approved
  );

  static rejected = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.rejected
  );

  static message = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.requestListSelector,
    (state) => state.error
  );
}
