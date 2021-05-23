import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  suppliersAdapter,
  SuppliersListState
} from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
import { SuppliersActions } from '@feature/part-store/+state/order-list/suppliers/suppliers.actions';

const suppliersReducer = createReducer(
  initialState,


  /* '''''Load''''' Supplier */
  on(SuppliersActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),

  on(SuppliersActions.allSupplierLoaded, (state, { data }) =>
  suppliersAdapter.setAll(data, 
      { ...state, 
        loaded: true, 
        error: null 
      }
    )
  ),


  /* ''''''Add'''''' Supplier */
  on(SuppliersActions.addSupplier, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(SuppliersActions.supplierAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),


  /* '''''Get''''' Specific Supplier */
  on(SuppliersActions.getSpecificSupplier, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null,
    specificSupplier:null
  })),

  on(SuppliersActions.specificSupplierLoaded, (state, { data }) => ({
    ...state,
    loaded: true,
    error: null,
    specificSupplier: data
  })),


  /* '''''Update''''' Supplier*/
  on(SuppliersActions.updateSupplier, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),

  on(SuppliersActions.supplierUpdatedSuccessfully, (state, { data }) =>
    suppliersAdapter.updateOne(
      { changes: data, id: data.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  ),


  /* ERROR */
  on(SuppliersActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  /* RESET */
  on(SuppliersActions.reset, (state) => ({
    ...state,
    loaded: false,
    message: null,
    error: null,
    submitted:false,
    specificSupplier:null
  })),
);

export function reducer(state: SuppliersListState, action: Action) {
  return suppliersReducer(state, action);
}
