import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  ownershipAdapter,
  OwnershipState
} from './ownership.entity';
import { OwnershipActions } from './ownership.actions';

const ownershipReducer = createReducer(
  initialState,
  on(OwnershipActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(OwnershipActions.allDataLoaded, (state, { data }) =>
    ownershipAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(OwnershipActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: OwnershipState, action: Action) {
  return ownershipReducer(state, action);
}
