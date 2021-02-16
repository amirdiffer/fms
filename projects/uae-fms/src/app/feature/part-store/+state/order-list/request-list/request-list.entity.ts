import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

export const PARTSTORE_REQUEST_LIST_FEATURE_KEY = 'request-list';

export interface RequestListStateModel {
  statusColor: string,
  Item: string,
  Part_ID: string,
  Status: string,
  Cost: string,
  Quantity: string,
  Department: string,
  Description: string,
  Date: string,
  Total: string,
  ButtonReject: string,
  ButtonApprove: string
}

export interface RequestListState extends EntityState<RequestListStateModel> {
  error?: any;
  loaded: boolean;
  message: string;
}

export interface IRequestListPartialState {
  [PARTSTORE_REQUEST_LIST_FEATURE_KEY]: RequestListState;
}

export const requestListAdapter: EntityAdapter<RequestListStateModel> = createEntityAdapter<
  RequestListStateModel
>();

export const initialState: RequestListState = requestListAdapter.getInitialState({
  loaded: null,
  message: null,
  error: null
} as RequestListState);
