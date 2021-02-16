import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { SuppliersSelectors } from '@feature/part-store/+state/order-list/suppliers/suppliers.selectors';
import { ISuppliersPartialState } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
import { SuppliersActions } from '@feature/part-store/+state/order-list/suppliers/suppliers.actions';

@Injectable()
export class SuppliersFacade {

  suppliers$ = this.store.pipe(select(SuppliersSelectors.selectAll));

  constructor(private store: Store<ISuppliersPartialState>) {}

  loadAll() {
    this.store.dispatch(SuppliersActions.loadAll());
  }
}
