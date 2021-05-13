import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
import { suppliersAdapter } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
const { selectAll } = suppliersAdapter.getSelectors();

export class SuppliersSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.suppliersListSelector,
    selectAll
  );

  static message = createSelector(
    PartStoreSelectors.suppliersListSelector,
    (state) => state.message
  );

  static error = createSelector(
    PartStoreSelectors.suppliersListSelector,
    (state) => state.error
  );

  static submitted = createSelector(
    PartStoreSelectors.suppliersListSelector,
    (state) => state.submitted
  );
}
