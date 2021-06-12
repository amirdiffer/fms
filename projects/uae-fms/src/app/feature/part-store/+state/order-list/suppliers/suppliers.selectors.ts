import { createSelector } from '@ngrx/store';
import { suppliersAdapter } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
const { selectAll } = suppliersAdapter.getSelectors();
const suppliersState = (state) => state['supplierList']

export class SuppliersSelectors {
  static selectAll = createSelector(
    suppliersState,
    selectAll
  );

  static specificSupplier = createSelector(
    suppliersState,
    (state) => state.specificSupplier
  );

  static message = createSelector(
    suppliersState,
    (state) => state.message
  );

  static error = createSelector(
    suppliersState,
    (state) => state.error
  );

  static submitted = createSelector(
    suppliersState,
    (state) => state.submitted
  );
}
