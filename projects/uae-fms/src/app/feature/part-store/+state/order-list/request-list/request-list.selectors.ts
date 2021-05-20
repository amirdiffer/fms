import { requestListAdapter } from './request-list.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
const { selectAll } = requestListAdapter.getSelectors();

export class RequestListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.requestListSelector,
    selectAll
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
