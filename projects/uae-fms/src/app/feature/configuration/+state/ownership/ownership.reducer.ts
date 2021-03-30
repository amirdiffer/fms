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
  on(OwnershipActions.addOwnership, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(OwnershipActions.ownershipAddedSuccessfully, (state, { data }) =>
    ownershipAdapter.addOne(data, { ...state, submitted: true })
  ),
  on(OwnershipActions.editOwnership, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(OwnershipActions.ownershipEditedSuccessfully, (state, { data }) =>
    ownershipAdapter.updateOne({ changes: data, id: data.id }, state)
  )
);

export function reducer(state: OwnershipState, action: Action) {
  return ownershipReducer(state, action);
}
