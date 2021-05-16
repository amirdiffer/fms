import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const PARTSTORE_REQUEST_LIST_FEATURE_KEY = 'request-list';

export interface RequestListState extends EntityState<any> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface IRequestListPartialState {
  [PARTSTORE_REQUEST_LIST_FEATURE_KEY]: RequestListState;
}

export const requestListAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialState: RequestListState = requestListAdapter.getInitialState(
  {
    loaded: null,
    message: null,
    error: null
  } as RequestListState
);
