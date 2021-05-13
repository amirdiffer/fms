import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  suppliersAdapter,
  SuppliersListState
} from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
import { SuppliersActions } from '@feature/part-store/+state/order-list/suppliers/suppliers.actions';

const suppliersReducer = createReducer(
  initialState,
  on(SuppliersActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(SuppliersActions.allDataLoaded, (state, { data }) =>
    suppliersAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),

  on(SuppliersActions.addSupplier, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(SuppliersActions.supplierAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(SuppliersActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(SuppliersActions.reset, (state) => ({
    ...state,
    submitted: false,
    error: false,
    message: null
  }))
);

export function reducer(state: SuppliersListState, action: Action) {
  return suppliersReducer(state, action);
}
