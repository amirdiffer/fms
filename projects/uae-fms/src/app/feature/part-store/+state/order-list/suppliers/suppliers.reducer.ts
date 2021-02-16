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
  on(SuppliersActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: SuppliersListState, action: Action) {
  return suppliersReducer(state, action);
}
