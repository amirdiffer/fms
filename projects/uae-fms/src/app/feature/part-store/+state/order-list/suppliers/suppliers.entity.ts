import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ISuppliersListModel {
  Company: string,
  Name: string,
  Email: string,
  Phone: string,
  Address: string,
  Quotation: string
}

export interface SuppliersListState extends EntityState<ISuppliersListModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export const PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY = 'suppliers';

export interface ISuppliersPartialState {
  [PARTSTORE_SUPPLIERS_LIST_FEATURE_KEY]: SuppliersListState;
}

export const suppliersAdapter: EntityAdapter<ISuppliersListModel> = createEntityAdapter<
  ISuppliersListModel
>();

export const initialState: SuppliersListState = suppliersAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as SuppliersListState
);
