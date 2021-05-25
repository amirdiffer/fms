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

  specificSupplier$ = this.store.pipe(select(SuppliersSelectors.specificSupplier));

  constructor(private store: Store<ISuppliersPartialState>) {}

  /* '''''Load''''' Supplier */
  loadAll() {
    this.store.dispatch(SuppliersActions.loadAll());
  }


  /* ''''''Add'''''' Supplier */
  addSupplier(data: any) {
    this.store.dispatch(SuppliersActions.addSupplier({ data }));
  }


  /* '''''Get''''' Specific Supplier */
  getSpecificSupplier(id:number){
    this.store.dispatch(SuppliersActions.getSpecificSupplier({id}));
  };


  /* '''''Update''''' Supplier*/
  updateSupplier(data:any){
    this.store.dispatch(SuppliersActions.updateSupplier({data}))
  };


  
  reset() {
    this.store.dispatch(SuppliersActions.reset());
  }
}
