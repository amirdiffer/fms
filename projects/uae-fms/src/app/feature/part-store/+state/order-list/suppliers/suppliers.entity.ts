import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface SuppliersListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  submitted?: boolean;
}

export const PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY = 'suppliers';

export interface ISuppliersPartialState {
  [PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY]: SuppliersListState;
}

export const suppliersAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialState: SuppliersListState = suppliersAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null,
    submitted: false
  } as SuppliersListState
);
