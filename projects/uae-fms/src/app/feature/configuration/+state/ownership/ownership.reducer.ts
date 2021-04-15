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
  })),
  on(OwnershipActions.editOwnership, (state, { data }) => ({
    ...state,
    submitted: false
  })),
  on(OwnershipActions.ownershipEditedSuccessfully, (state) => {
    return { ...state, submitted: true }
  }
  ),
  on(OwnershipActions.addOwnership, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(OwnershipActions.ownershipAddedSuccessfully, (state, { data }) =>
    ({ ...state, submitted: true })
  ),
  on(OwnershipActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  }))
);

export function reducer(state: OwnershipState, action: Action) {
  return ownershipReducer(state, action);
}
