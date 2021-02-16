import { requestListAdapter } from './request-list.entity';
import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';

export class RequestListSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.requestListSelector,
    requestListAdapter.setAll
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
