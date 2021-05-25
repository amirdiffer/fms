import { Action, createReducer, on } from '@ngrx/store';
import { RequestListActions } from '@feature/part-store/+state/order-list/request-list/request-list.actions';
import {
  initialState,
  requestListAdapter,
  RequestListState
} from '@feature/part-store/+state/order-list/request-list/request-list.entity';

const RequestListReducer = createReducer(
  initialState,
  on(RequestListActions.loadAllAssetRequest, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(RequestListActions.allAssetRequestsLoaded, (state, { data }) =>
    requestListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(RequestListActions.loadAllSubAssetRequest, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(RequestListActions.allSubAssetRequestsLoaded, (state, { data }) =>
    requestListAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(RequestListActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: RequestListState, action: Action) {
  return RequestListReducer(state, action);
}
