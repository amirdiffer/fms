import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { SuppliersSelectors } from '@feature/part-store/+state/order-list/suppliers/suppliers.selectors';
import { ISuppliersPartialState } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
import { SuppliersActions } from '@feature/part-store/+state/order-list/suppliers/suppliers.actions';

@Injectable()
export class SuppliersFacade {
  suppliers$ = this.store.pipe(select(SuppliersSelectors.selectAll));

  message$ = this.store.pipe(select(SuppliersSelectors.message));

  error$ = this.store.pipe(select(SuppliersSelectors.error));

  submitted$ = this.store.pipe(select(SuppliersSelectors.submitted));

  constructor(private store: Store<ISuppliersPartialState>) {}

  loadAll() {
    this.store.dispatch(SuppliersActions.loadAll());
  }

  addSupplier(data: any) {
    this.store.dispatch(SuppliersActions.addSupplier({ data }));
  }

  reset() {
    this.store.dispatch(SuppliersActions.reset());
  }
}
