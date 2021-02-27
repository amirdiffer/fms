import { Action, createReducer, on } from '@ngrx/store';
import { AccessoryActions } from './accessory.actions';
import {accessoryAdapter, initialState ,IAccessoryState} from './accessory.entity'
const accessoryReducer = createReducer(
    initialState ,
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
    })),
    on(AccessoryActions.error, (state, { reason }) => ({
        ...state,
        error: reason,
        loaded: true
    }))
);



export function reducer(state: IAccessoryState, action: Action) {
    return accessoryReducer(state, action);
  }