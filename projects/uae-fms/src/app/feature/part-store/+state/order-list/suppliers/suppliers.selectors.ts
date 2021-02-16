import { createSelector } from '@ngrx/store';
import { PartStoreSelectors } from '@feature/part-store/+state/part-store.selectors';
import { suppliersAdapter } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';

export class SuppliersSelectors {
  static selectAll = createSelector(
    PartStoreSelectors.suppliersListSelector,
    suppliersAdapter.setAll
  );
}
