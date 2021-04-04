import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { AccessoryActions } from './accessory.actions';
import {
  accessoryAdapter,
  initialState,
  IAccessoryState
} from './accessory.entity';

const accessoryReducer = createReducer(
  initialState,
  on(AccessoryActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(AccessoryActions.allDataLoaded, (state, { data }) =>
    accessoryAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),

  on(AccessoryActions.loadStatistics, (state) => ({
    ...state,
    statistics: null,
    loaded: false
  })),

  on(AccessoryActions.statisticsLoaded, (state, { data }) => ({
    ...state,
    statistics: data,
    loaded: true
  })),

  on(AccessoryActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),

  on(AccessoryActions.addAccessory, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(AccessoryActions.accessoryAddedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(AccessoryActions.editAccessory, (state, { data }) => ({
    ...state,
    submitted: false
  })),

  on(AccessoryActions.accessoryEditedSuccessfully, (state, { data }) => ({
    ...state,
    submitted: true
  })),

  on(AccessoryActions.reset, (state) => ({
    ...state,
    submitted: false,
    error: false,
    message: null
  }))
);

export function reducer(state: IAccessoryState, action: Action) {
  return accessoryReducer(state, action);
}
